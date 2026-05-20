import dictionaryUrl from './dictionary.txt?url';

const $ = (s, e = document.body) => e.querySelector(s);
const $$ = (s, e = document.body) => [...e.querySelectorAll(s)];
const wait = (ms) => new Promise((done) => setTimeout(done, ms));

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

const boardEl = $('.board');
const keyboardEl = $('.keyboard');

let allWords = [];
let kb;
let gameController = null;

window.addEventListener('load', () => {
  kb = generateKeyboard();
  $('.button--new-game').addEventListener('click', () => init().catch((e) => console.error(e)));
  init().catch((e) => console.error(e));
});

async function init() {
  // Abort any in-progress game, cleaning up its event listeners
  if (gameController) gameController.abort();
  gameController = new AbortController();
  const { signal } = gameController;

  const length = parseInt($('.settings__length').value) || 5;
  const rounds = parseInt($('.settings__rounds').value) || 6;

  boardEl.innerHTML = '';
  $('.feedback').innerHTML = '';
  kb.reset();

  if (!allWords.length) {
    allWords = await fetch(dictionaryUrl)
      .then((r) => r.text())
      .then((text) =>
        text
          .split('\n')
          .map((w) => w.trim().toUpperCase())
          .filter(Boolean)
      )
      .catch((e) => {
        console.error('Failed to load dictionary', e);
        alert('Failed to load dictionary');
        return [];
      });
  }

  const words = allWords.filter((w) => w.length === length);

  if (words.length === 0) {
    $('.feedback').innerText = `No ${length}-letter words found in dictionary.`;
    return;
  }

  const word = words[Math.floor(Math.random() * words.length)];
  const board = generateBoard(rounds, length);

  try {
    await startGame({ word, kb, board, words, rounds, length, signal });
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

async function startGame({ word, kb, board, words, rounds, length, signal }) {
  const solution = word.split('');
  let sharecopy = `Absurdle ${length}×${rounds}\n${formatDate(new Date())}\n`;
  const guessedWords = new Set();

  for (let round = 0; round < rounds; round++) {
    const guess = await collectGuess({ kb, board, round, words, length, signal, guessedWords });
    guessedWords.add(guess.join(''));
    const hints = guess.map((letter, i) => {
      if (solution[i] === letter) return 'correct';
      if (solution.includes(letter)) return 'close';
      return 'wrong';
    });

    sharecopy += addtoshare(hints);
    board.revealHint(round, hints);
    kb.revealHint(guess, hints);

    if (guess.join('') === word) {
      showEndGame(true, word, sharecopy);
      return;
    }
  }
  showEndGame(false, word, sharecopy);
}

function showEndGame(won, word, sharecopy) {
  const feedback = $('.feedback');
  feedback.innerHTML = '';

  const messageEl = document.createElement('div');
  if (won) {
    messageEl.textContent = 'Nice Work!';
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
  const controls = dom('div', {}, copyBtn, playBtn);
  const shareBox = dom('textarea', { id: 'sharebox', readonly: '' });
  shareBox.value = sharecopy;

  feedback.append(messageEl, controls, shareBox);

  copyBtn.addEventListener('click', () => copytoshare(sharecopy));
  playBtn.addEventListener('click', () => init().catch((e) => console.error(e)));
}

function collectGuess({ kb, board, round, words, length, signal, guessedWords }) {
  return new Promise((submit, reject) => {
    let letters = [];
    let processing = false;

    function cleanup() {
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
      const key = e.key.toLowerCase();
      if (key === 'enter') keyHandler('+');
      else if (key === 'backspace') keyHandler('-');
      else if (KEYS.some((k) => k.includes(key.toUpperCase()))) {
        keyHandler(key.toUpperCase());
      }
    }
    document.addEventListener('keydown', keyDownHandler);

    async function keyHandler(key) {
      if (processing) return;
      if (key === '+') {
        if (letters.length === length) {
          const guessWord = letters.join('');
          const guessIsValid = words.includes(guessWord) && !guessedWords.has(guessWord);
          if (!guessIsValid) {
            processing = true;
            $('.feedback').innerText = guessedWords.has(guessWord) ? 'Already guessed!' : 'Invalid Word';
            await animate($$('.round')[round], 'shake', 800);
            processing = false;
          } else {
            $('.feedback').innerText = '';
            cleanup();
            submit(letters);
          }
        }
      } else if (key === '-') {
        if (letters.length > 0) letters.pop();
        board.updateGuess(round, letters);
      } else {
        if (letters.length < length) letters.push(key);
        board.updateGuess(round, letters);
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
  return {
    updateGuess: (round, letters) => {
      const blanks = $$('.letter', $$('.round')[round]);
      blanks.forEach((b, i) => (b.innerText = letters[i] || ''));
    },
    revealHint: (round, hints) => {
      const blanks = $$('.letter', $$('.round')[round]);
      hints.forEach((hint, i) => {
        if (hint) blanks[i].classList.add('letter--hint-' + hint);
      });
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
        keyEl.classList.remove('key--hint-close', 'key--hint-wrong');
        keyEl.classList.add('key--hint-' + hint);
      });
    },
  };
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

function copytoshare(text) {
  navigator.clipboard.writeText(text);
  document.getElementById('copybutton').innerText = 'Copied!';
}

function formatDate(date) {
  return new Intl.DateTimeFormat('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(date);
}
