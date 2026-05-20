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

window.onload = () => {
  kb = generateKeyboard();
  $('.button--new-game').addEventListener('click', () => init().catch((e) => console.error(e)));
  init().catch((e) => console.error(e));
};

async function init() {
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

  await startGame({ word, kb, board, words, rounds, length });
}

async function animate(el, name, ms) {
  el.style.animation = `${ms}ms ${name}`;
  await wait(ms * 1.2);
  el.style.animation = 'none';
}

async function startGame({ word, kb, board, words, rounds, length }) {
  const solution = word.split('');
  let sharecopy = `Absurdle ${length}×${rounds}\n${formatDate(Date(Date.now()))}\n`;

  for (let round = 0; round < rounds; round++) {
    const guess = await collectGuess({ kb, board, round, words, length });
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
  const message = won
    ? `<div>Nice Work!</div>`
    : `<div>GAME OVER — The word was <strong>${word}</strong></div>`;
  $('.feedback').innerHTML = `
   ${message}
   <div>
     <button type="button" class="button--share" id="copybutton">Copy results</button>
     <button type="button" class="button--new-game" id="playagain">Play Again</button>
   </div>
   <textarea id="sharebox" readonly></textarea>
 `;
  document.getElementById('sharebox').value = sharecopy;
  document.getElementById('copybutton').addEventListener('click', () => copytoshare(sharecopy));
  document
    .getElementById('playagain')
    .addEventListener('click', () => init().catch((e) => console.error(e)));
}

function collectGuess({ kb, board, round, words, length }) {
  return new Promise((submit) => {
    let letters = [];
    let processing = false;

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
          const guessIsValid = words.includes(letters.join(''));
          if (!guessIsValid) {
            processing = true;
            $('.feedback').innerText = 'Invalid Word';
            await animate($$('.round')[round], 'shake', 800);
            processing = false;
          } else {
            $('.feedback').innerText = '';
            kb.off(keyHandler);
            document.removeEventListener('keydown', keyDownHandler);
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
  const str = date.toString().substring(4, 15);
  const day = str.substring(4, 6).trim();
  const month = str.substring(0, 3);
  const year = str.substring(7, 11);
  return `${day} ${month} ${year}`;
}
