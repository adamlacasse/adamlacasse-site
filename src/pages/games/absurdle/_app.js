import dict3Url from './dicts/dict-3.json?url';
import dict4Url from './dicts/dict-4.json?url';
import dict5Url from './dicts/dict-5.json?url';
import dict6Url from './dicts/dict-6.json?url';
import dict7Url from './dicts/dict-7.json?url';
import dict8Url from './dicts/dict-8.json?url';

const DICT_URLS = {
  3: dict3Url,
  4: dict4Url,
  5: dict5Url,
  6: dict6Url,
  7: dict7Url,
  8: dict8Url,
};

const $ = (s, e = document.body) => e.querySelector(s);
const $$ = (s, e = document.body) => [...e.querySelectorAll(s)];
const wait = (ms) => new Promise((done) => setTimeout(done, ms));
const clamp = (value, min, max, fallback) =>
  Math.min(Math.max(Number.parseInt(value, 10) || fallback, min), max);

const dom = (tag, attrs, ...children) => {
  const el = document.createElement(tag);
  if (attrs instanceof HTMLElement) {
    children.unshift(attrs);
  } else {
    Object.entries(attrs).forEach(([key, value]) => {
      if (key === 'class' && value instanceof Array) {
        value = value.join(' ');
      }
      el.setAttribute(key, value);
    });
  }
  el.append(...children.flat());
  return el;
};

const KEYS = ['QWERTYUIOP', 'ASDFGHJKL', '+ZXCVBNM-'];
const PRETTY_KEYS = {
  '+': 'Enter',
  '-': 'Del',
};
const STORAGE_KEYS = {
  instructions: 'absurdle-instructions-seen',
  stats: 'absurdle-stats',
};
const SETTINGS = {
  length: { min: 3, max: 8, fallback: 5 },
  rounds: { min: 3, max: 10, fallback: 6 },
};

let boardEl;
let keyboardEl;
let feedbackEl;
let lengthInput;
let roundsInput;
let hardModeInput;
let newGameButton;
let helpButton;
let instructionsDialog;
let instructionsClose;

let dictionaries = new Map();
let dictionaryPromises = new Map();
let kb;
let gameController = null;
let copyResetTimer = null;

function loadDictionaryForLength(length) {
  if (!dictionaryPromises.has(length)) {
    const url = DICT_URLS[length];
    if (!url) return Promise.reject(new Error(`Unsupported word length: ${length}`));
    dictionaryPromises.set(
      length,
      fetch(url).then((r) => {
        if (!r.ok) throw new Error(`Failed to load dictionary for length ${length}`);
        return r.json();
      })
    );
  }
  return dictionaryPromises.get(length);
}

if (typeof window !== 'undefined') {
  window.addEventListener('load', () => {
    boardEl = $('.board');
    keyboardEl = $('.keyboard');
    feedbackEl = $('.feedback');
    lengthInput = $('.settings__length');
    roundsInput = $('.settings__rounds');
    hardModeInput = $('.settings__hard-mode');
    newGameButton = $('.button--new-game');
    helpButton = $('.button--help');
    instructionsDialog = $('.instructions');
    instructionsClose = $('.instructions__close');

    kb = generateKeyboard();
    hydrateSettingsFromUrl();
    newGameButton.addEventListener('click', () =>
      init({ newSeed: true }).catch((e) => console.error(e))
    );
    helpButton.addEventListener('click', () => showInstructions());
    instructionsClose.addEventListener('click', () => closeInstructions());
    instructionsDialog.addEventListener('close', () => {
      localStorage.setItem(STORAGE_KEYS.instructions, 'true');
    });

    lengthInput.addEventListener('change', () => {
      if (!lengthInput.disabled) init().catch((e) => console.error(e));
    });
    roundsInput.addEventListener('change', () => {
      if (!roundsInput.disabled) init().catch((e) => console.error(e));
    });
    hardModeInput.addEventListener('change', () => {
      if (!hardModeInput.disabled) init().catch((e) => console.error(e));
    });

    if (!localStorage.getItem(STORAGE_KEYS.instructions)) showInstructions();
    init().catch((e) => console.error(e));
  });
}

async function init({ newSeed = false } = {}) {
  // Abort any in-progress game, cleaning up its event listeners
  if (gameController) gameController.abort();
  gameController = new AbortController();
  const { signal } = gameController;

  const length = clampInput(lengthInput, SETTINGS.length);
  const rounds = clampInput(roundsInput, SETTINGS.rounds);
  const hardMode = hardModeInput.checked;
  const seed = getGameSeed(newSeed);

  boardEl.innerHTML = '';
  feedbackEl.innerHTML = '';
  kb.reset();
  setSettingsDisabled(false);

  let dict = dictionaries.get(length);
  if (!dict) {
    feedbackEl.innerText = 'Loading dictionary...';
    try {
      dict = await loadDictionaryForLength(length);
      dictionaries.set(length, dict);
    } catch (e) {
      console.error('Failed to load dictionary', e);
      feedbackEl.innerText = 'Failed to load dictionary. Try refreshing the page.';
      dictionaryPromises.delete(length);
      return;
    }
  }

  const { targets, guesses } = dict;

  if (targets.length === 0) {
    feedbackEl.innerText = `No ${length}-letter target words found.`;
    return;
  }

  const board = generateBoard(rounds, length);
  feedbackEl.innerText = '';

  try {
    await startGame({ kb, board, targets, guesses, rounds, length, hardMode, seed, signal });
  } catch (e) {
    if (e.name !== 'AbortError') throw e;
    // AbortError means a new game was started; exit silently
  }
}

async function animate(el, name, ms) {
  el.style.animation = `${ms}ms ${name}`;
  await wait(ms * 1.2);
  el.style.animation = 'none';
}

async function startGame({ kb, board, targets, guesses, rounds, length, hardMode, seed, signal }) {
  let pool = [...targets];
  let sharecopy = `Absurdle ${length}x${rounds}${hardMode ? ' hard' : ''}\n${formatDate(new Date())}\n`;
  const guessedWords = new Map();
  const hardModeHints = createHardModeHints(length);

  for (let round = 0; round < rounds; round++) {
    const guess = await collectGuess({
      kb,
      board,
      round,
      words: guesses,
      length,
      hardMode,
      hardModeHints,
      signal,
      guessedWords,
    });
    guessedWords.set(guess.join(''), round);

    // Adversarial partitioning
    const partitions = new Map();
    for (const w of pool) {
      const hints = getHints(w.split(''), guess);
      const key = hints.join(',');
      if (!partitions.has(key)) {
        partitions.set(key, []);
      }
      partitions.get(key).push(w);
    }

    let maxCount = 0;
    let bestKeys = [];
    for (const [key, list] of partitions.entries()) {
      if (list.length > maxCount) {
        maxCount = list.length;
        bestKeys = [key];
      } else if (list.length === maxCount) {
        bestKeys.push(key);
      }
    }

    // Tie break: choose partition with least info revealed
    bestKeys.sort((a, b) => {
      const scoreA = getPatternScore(a);
      const scoreB = getPatternScore(b);
      if (scoreA !== scoreB) return scoreA - scoreB;
      return a.localeCompare(b);
    });

    const chosenKey = bestKeys[0];
    const hints = chosenKey.split(',');
    pool = partitions.get(chosenKey);

    sharecopy += addtoshare(hints);
    updateHardModeHints(hardModeHints, guess, hints);
    await board.revealHint(round, hints);
    kb.revealHint(guess, hints);

    const isCorrect = hints.every((h) => h === 'correct');
    if (isCorrect) {
      showEndGame(true, guess.join(''), sharecopy, {
        round: round + 1,
        rounds,
        seed,
        hardMode,
        length,
      });
      return;
    }
  }

  // If lost, pick a remaining word from the pool as the solution
  const solutionWord =
    pool[Math.floor(seededRandom(`${seed}:${pool.length}`) * pool.length)] || pool[0];
  showEndGame(false, solutionWord, sharecopy, { round: rounds, rounds, seed, hardMode, length });
}

function getPatternScore(key) {
  return key.split(',').reduce((sum, h) => {
    if (h === 'correct') return sum + 2;
    if (h === 'close') return sum + 1;
    return sum;
  }, 0);
}

function showEndGame(won, word, sharecopy, game) {
  boardEl.classList.remove('board--playing');
  $$('.round').forEach((row) => row.classList.remove('round--active'));
  setSettingsDisabled(false);
  feedbackEl.innerHTML = '';
  const stats = updateStats(won, game.round, game.seed);
  const shareLink = getShareLink(game.seed, game.length, game.rounds, game.hardMode);
  const shareText = `${sharecopy}\n${shareLink}`;

  const messageEl = document.createElement('div');
  messageEl.className = 'end-message';
  if (won) {
    messageEl.textContent = 'Nice Work!';
    messageEl.append(createConfetti());
  } else {
    messageEl.append('GAME OVER — The word was ');
    const strong = document.createElement('strong');
    strong.textContent = word;
    messageEl.append(strong);
  }

  const copyBtn = dom(
    'button',
    { type: 'button', class: 'button--share', id: 'copybutton' },
    'Copy results'
  );
  const playBtn = dom(
    'button',
    { type: 'button', class: 'button--new-game', id: 'playagain' },
    'Play Again'
  );
  const statsEl = dom(
    'div',
    { class: 'stats' },
    dom('span', {}, `Played ${stats.played}`),
    dom('span', {}, `Won ${stats.won}`),
    dom('span', {}, `Streak ${stats.currentStreak}`),
    dom('span', {}, `Best ${stats.bestStreak}`)
  );
  const controls = dom('div', { class: 'end-controls' }, copyBtn, playBtn);
  const shareBox = dom('textarea', { id: 'sharebox', readonly: '', rows: '6' });
  shareBox.value = shareText;

  feedbackEl.append(messageEl, statsEl, controls, shareBox);

  copyBtn.addEventListener('click', () => copytoshare(shareText, copyBtn));
  playBtn.addEventListener('click', () => init({ newSeed: true }).catch((e) => console.error(e)));
}

function collectGuess({
  kb,
  board,
  round,
  words,
  length,
  hardMode,
  hardModeHints,
  signal,
  guessedWords,
}) {
  return new Promise((submit, reject) => {
    let letters = [];
    let processing = false;
    board.setActiveRound(round);

    function cleanup() {
      board.setActiveRound(null);
      kb.off(keyHandler);
      document.removeEventListener('keydown', keyDownHandler);
    }

    signal.addEventListener(
      'abort',
      () => {
        cleanup();
        reject(new DOMException('Game cancelled', 'AbortError'));
      },
      { once: true }
    );

    function keyDownHandler(e) {
      if (instructionsDialog.hasAttribute('open')) return;
      const key = e.key.toLowerCase();
      if (key === 'enter') keyHandler('+');
      else if (key === 'backspace') keyHandler('-');
      else if (/^[a-z]$/.test(key)) {
        keyHandler(key.toUpperCase());
      }
    }
    document.addEventListener('keydown', keyDownHandler);

    async function keyHandler(key) {
      if (processing) return;
      if (key === '+') {
        if (letters.length === length) {
          const guessWord = letters.join('');
          const hardModeError = hardMode ? getHardModeError(letters, hardModeHints) : '';
          if (guessedWords.has(guessWord)) {
            processing = true;
            feedbackEl.innerText = 'Already guessed!';
            board.highlightRound(guessedWords.get(guessWord));
            await animate($$('.round')[round], 'shake', 800);
            processing = false;
          } else if (!words.includes(guessWord)) {
            processing = true;
            feedbackEl.innerText = 'Invalid word';
            await animate($$('.round')[round], 'shake', 800);
            processing = false;
          } else if (hardModeError) {
            processing = true;
            feedbackEl.innerText = hardModeError;
            await animate($$('.round')[round], 'shake', 800);
            processing = false;
          } else {
            feedbackEl.innerText = '';
            cleanup();
            submit(letters);
          }
        }
      } else if (key === '-') {
        if (letters.length > 0) letters.pop();
        board.updateGuess(round, letters);
        if (round === 0 && letters.length === 0) {
          setSettingsDisabled(false);
        }
      } else {
        if (letters.length < length) letters.push(key);
        board.updateGuess(round, letters);
        if (round === 0 && letters.length > 0) {
          setSettingsDisabled(true);
        }
      }
    }
    kb.on(keyHandler);
  });
}

function generateBoard(rounds, length) {
  for (let i = 0; i < rounds; i++) {
    const row = dom('div', { class: 'round', 'data-round': i });
    for (let j = 0; j < length; j++) {
      row.append(dom('div', { class: 'letter', 'data-pos': j }));
    }
    boardEl.append(row);
  }
  boardEl.classList.add('board--playing');
  return {
    updateGuess: (round, letters) => {
      const blanks = $$('.letter', $$('.round')[round]);
      blanks.forEach((b, i) => (b.innerText = letters[i] || ''));
    },
    revealHint: async (round, hints) => {
      const blanks = $$('.letter', $$('.round')[round]);
      for (const [i, hint] of hints.entries()) {
        if (hint) blanks[i].classList.add('letter--hint-' + hint);
        await wait(110);
      }
    },
    setActiveRound: (round) => {
      $$('.round').forEach((row, i) => row.classList.toggle('round--active', i === round));
    },
    highlightRound: async (round) => {
      const row = $$('.round')[round];
      if (!row) return;
      await animate(row, 'recall', 900);
    },
  };
}

function generateKeyboard() {
  keyboardEl.append(
    ...KEYS.map((row) =>
      dom(
        'div',
        { class: 'keyboard__row' },
        row.split('').map((key) =>
          dom(
            'button',
            {
              class: `key${PRETTY_KEYS[key] ? ' key--pretty' : ''}`,
              'data-key': key,
            },
            PRETTY_KEYS[key] || key
          )
        )
      )
    )
  );
  const keyListeners = new Set();
  keyboardEl.addEventListener('click', (e) => {
    e.preventDefault();
    const key = e.target.getAttribute('data-key');
    if (key) keyListeners.forEach((l) => l(key));
  });
  return {
    on: (l) => keyListeners.add(l),
    off: (l) => keyListeners.delete(l),
    reset: () => {
      $$('[data-key]', keyboardEl).forEach((el) => {
        el.classList.remove('key--hint-correct', 'key--hint-close', 'key--hint-wrong');
      });
    },
    revealHint: (guess, hints) => {
      hints.forEach((hint, i) => {
        const keyEl = $(`[data-key="${guess[i]}"]`, keyboardEl);
        if (!keyEl) return;
        if (keyEl.classList.contains('key--hint-correct')) return;
        if (keyEl.classList.contains('key--hint-close') && hint === 'wrong') return;
        keyEl.classList.remove('key--hint-close', 'key--hint-wrong');
        keyEl.classList.add('key--hint-' + hint);
      });
    },
  };
}

function getHints(solution, guess) {
  const hints = Array(guess.length).fill('wrong');
  const unmatched = new Map();

  solution.forEach((letter, i) => {
    if (guess[i] === letter) {
      hints[i] = 'correct';
    } else {
      unmatched.set(letter, (unmatched.get(letter) || 0) + 1);
    }
  });

  guess.forEach((letter, i) => {
    if (hints[i] === 'correct') return;
    const count = unmatched.get(letter) || 0;
    if (count > 0) {
      hints[i] = 'close';
      unmatched.set(letter, count - 1);
    }
  });

  return hints;
}

function createHardModeHints(length) {
  return {
    correct: Array(length).fill(''),
    required: new Map(),
  };
}

function updateHardModeHints(hardModeHints, guess, hints) {
  const revealedCounts = new Map();
  hints.forEach((hint, i) => {
    if (hint === 'correct') hardModeHints.correct[i] = guess[i];
    if (hint === 'correct' || hint === 'close') {
      revealedCounts.set(guess[i], (revealedCounts.get(guess[i]) || 0) + 1);
    }
  });
  revealedCounts.forEach((count, letter) => {
    hardModeHints.required.set(letter, Math.max(hardModeHints.required.get(letter) || 0, count));
  });
}

function getHardModeError(guess, hardModeHints) {
  for (const [i, letter] of hardModeHints.correct.entries()) {
    if (letter && guess[i] !== letter) return `Position ${i + 1} must be ${letter}.`;
  }

  const guessCounts = new Map();
  guess.forEach((letter) => guessCounts.set(letter, (guessCounts.get(letter) || 0) + 1));
  for (const [letter, count] of hardModeHints.required.entries()) {
    if ((guessCounts.get(letter) || 0) < count) {
      return `Guess must include ${count > 1 ? count : 'the'} ${letter}${count > 1 ? "'s" : ''}.`;
    }
  }

  return '';
}

function addtoshare(hints) {
  return (
    hints
      .map((hint) => {
        if (hint === 'correct') return '🟩';
        if (hint === 'close') return '🟨';
        return '⬜';
      })
      .join('') + '\n'
  );
}

async function copytoshare(text, button) {
  try {
    await writeClipboard(text);
    setCopyButton(button, 'Copied!');
  } catch (e) {
    console.error('Failed to copy results', e);
    feedbackEl.append(
      dom('div', { class: 'copy-error' }, 'Copy failed. Select the results below instead.')
    );
    setCopyButton(button, 'Copy failed');
  }
}

async function writeClipboard(text) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const textarea = dom('textarea', { class: 'clipboard-fallback', readonly: '' });
  textarea.value = text;
  document.body.append(textarea);
  textarea.select();
  const copied = document.execCommand('copy');
  textarea.remove();
  if (!copied) throw new Error('document.execCommand("copy") returned false');
}

function setCopyButton(button, text) {
  window.clearTimeout(copyResetTimer);
  button.innerText = text;
  copyResetTimer = window.setTimeout(() => {
    button.innerText = 'Copy results';
  }, 2000);
}

function clampInput(input, config) {
  const value = clamp(input.value, config.min, config.max, config.fallback);
  input.value = value;
  return value;
}

function setSettingsDisabled(disabled) {
  lengthInput.disabled = disabled;
  roundsInput.disabled = disabled;
  hardModeInput.disabled = disabled;
  newGameButton.innerText = disabled ? 'Restart' : 'New Game';
}

function getGameSeed(newSeed) {
  const params = new URLSearchParams(window.location.search);
  let seed = newSeed ? '' : params.get('seed');
  if (!seed) seed = Math.random().toString(36).slice(2, 10);
  params.set('seed', seed);
  params.set('length', lengthInput.value);
  params.set('rounds', roundsInput.value);
  if (hardModeInput.checked) params.set('hard', '1');
  else params.delete('hard');
  window.history.replaceState({}, '', `${window.location.pathname}?${params.toString()}`);
  return seed;
}

function hydrateSettingsFromUrl() {
  const params = new URLSearchParams(window.location.search);
  if (params.has('length')) lengthInput.value = params.get('length');
  if (params.has('rounds')) roundsInput.value = params.get('rounds');
  hardModeInput.checked = params.get('hard') === '1';
}

function seededRandom(seed) {
  let hash = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    hash ^= seed.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return (hash >>> 0) / 4294967296;
}

function getShareLink(seed, length, rounds, hardMode) {
  const url = new URL(window.location.href);
  url.searchParams.set('seed', seed);
  url.searchParams.set('length', length);
  url.searchParams.set('rounds', rounds);
  if (hardMode) url.searchParams.set('hard', '1');
  else url.searchParams.delete('hard');
  return url.toString();
}

function updateStats(won, guesses, seed) {
  const stats = JSON.parse(localStorage.getItem(STORAGE_KEYS.stats) || '{}');
  const completedSeeds = stats.completedSeeds || [];
  if (completedSeeds.includes(seed)) {
    return stats;
  }
  const next = {
    played: (stats.played || 0) + 1,
    won: (stats.won || 0) + (won ? 1 : 0),
    currentStreak: won ? (stats.currentStreak || 0) + 1 : 0,
    bestStreak: stats.bestStreak || 0,
    guesses: { ...(stats.guesses || {}) },
    completedSeeds: [...completedSeeds, seed],
  };
  next.bestStreak = Math.max(next.bestStreak, next.currentStreak);
  if (won) next.guesses[guesses] = (next.guesses[guesses] || 0) + 1;
  localStorage.setItem(STORAGE_KEYS.stats, JSON.stringify(next));
  return next;
}

function createConfetti() {
  const confetti = dom('span', { class: 'confetti', 'aria-hidden': 'true' });
  for (let i = 0; i < 14; i++) {
    confetti.append(dom('span', { style: `--i:${i}` }));
  }
  return confetti;
}

function showInstructions() {
  if (instructionsDialog.showModal) instructionsDialog.showModal();
  else instructionsDialog.setAttribute('open', '');
}

function closeInstructions() {
  localStorage.setItem(STORAGE_KEYS.instructions, 'true');
  if (instructionsDialog.close) instructionsDialog.close();
  else instructionsDialog.removeAttribute('open');
}

function formatDate(date) {
  return new Intl.DateTimeFormat('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(date);
}
