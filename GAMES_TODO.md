# Games TODO

## Absurdle

### Bugs
- [ ] Dictionary is a placeholder (6 bytes) — need a real word list before the game is playable

### Polish
- [ ] Tile flip animation on hint reveal (à la Wordle)
- [ ] Winning animation / confetti on correct guess
- [ ] Better mobile layout — keyboard keys are small on narrow viewports
- [ ] `.button--share` has a stray `transform: translateY(-50%)` from old layout; visually off
- [ ] Dark mode support for game tiles and keyboard (currently hardcoded light colors)
- [ ] "Already guessed" shake should also highlight the previously-guessed row, not just show the message

### Features
- [ ] Hard mode — guesses must use all confirmed hints
- [ ] Win/loss statistics with streak tracking (localStorage)
- [ ] Shareable link with seed so two people can play the same word
- [ ] Keyboard shortcut hint / instructions modal for first-time players

## Site / Games landing
- [ ] Games index page is sparse — add descriptions or preview images per game
- [ ] Add more games (ideas: Connections clone, Spelling Bee, something original)
