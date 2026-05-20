# Games TODO

## Absurdle

### Bugs

- [x] **Hint algorithm is wrong for duplicate letters** — `solution.includes(letter)` doesn't track
      how many times a letter has been "used." E.g. word ABBEY, guess KEEPS: both Es get marked
      'close' even though ABBEY only has one E. Correct algorithm: mark all `correct` positions first,
      then for `close` scan left-to-right and only award a 'close' for unmatched solution letters,
      decrementing a per-letter count. This is the standard Wordle algorithm.

- [x] **Physical `+` and `-` keys trigger Enter / Del** — `+` and `-` appear in the `KEYS` constant
      (as the virtual keyboard's Enter/Del symbols), so `keyDownHandler`'s fallthrough branch will
      fire `keyHandler('+')` or `keyHandler('-')` if the user physically presses those keys.

- [x] **`copytoshare` silently fails** — `navigator.clipboard.writeText()` returns a Promise that
      is never awaited or caught. Fails silently on non-HTTPS origins or when the Clipboard API
      permission is denied. Should handle the rejection and show an error message (or fall back to
      `document.execCommand('copy')` on the hidden textarea).

- [x] **Settings inputs accept out-of-range values without clamping** — `parseInt(...) || 5` only
      falls back when the value is NaN, not when it's outside min/max. A user can type 99 for word
      length and get "No 99-letter words found" with no other feedback. Clamp to min/max on `init()`.

### CSS / Style

- [x] **`.button--share` layout is broken** — has `align-items: center` but no `display: flex`, so
      `align-items` does nothing. Also missing `font: inherit` and `cursor: pointer` (both present on
      `.button--new-game`).

- [x] **`.button--share` spurious `transform: translateY(-50%)`** — shifts the button up by half
      its own height. Remove along with the `-ms-transform` vendor prefix (IE is gone).

- [x] **`.sharecopy--hidden` is dead CSS** — the class is defined but never applied anywhere in JS.
      Remove it.

- [x] **`field-sizing: content` has poor browser support** — not in Firefox as of mid-2026, silently
      ignored. Textarea falls back to the fixed `height: 150px` which is probably fine, but worth
      either removing `field-sizing` or providing a `rows` attribute fallback.

### UX / Polish

- [x] No loading state while the dictionary fetches on the first game — board and feedback are blank
      during the fetch. Show a "Loading…" message in the feedback div.

- [x] No visual indicator of which row is currently active — after a few guesses it's not obvious
      where you're typing. A border highlight or subtle background on the current row would help.

- [x] "Copied!" label on the copy button never resets — should revert to "Copy results" after ~2s.

- [x] Settings inputs stay editable mid-game — changing word length while playing does nothing until
      New Game, which is confusing. Disable the inputs (and maybe the New Game button becomes a
      restart prompt) once a game is in progress.

- [x] Tile flip animation on hint reveal (à la Wordle)

- [x] Winning animation / confetti on correct guess

- [x] Better mobile layout — keyboard keys are small on narrow viewports

- [x] Dark mode support for game tiles and keyboard (currently hardcoded light colors `#8d8`, `#cc4`,
      `#888`, `#eee`)

- [x] "Already guessed" shake should also highlight the previously-guessed row, not just show text

### Features

- [x] Hard mode — guesses must use all confirmed hints

- [x] Win/loss statistics with streak tracking (localStorage)

- [x] Shareable link with seed so two people can play the same word

- [x] Keyboard shortcut hint / instructions modal for first-time players

## Site / Games landing

- [x] Dictionary is a placeholder (one word: FARTS) — need a real word list before the game ships

- [x] Games index page is sparse — add descriptions or preview images per game

- [ ] Add more games (ideas: Connections clone, Spelling Bee, something original)
