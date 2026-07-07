# Absurdle — Backlog

## High priority

- [ ] **Show remaining pool size** — After each guess display "N words remain" (pool shrinks each round). Makes the adversarial mechanic visible. `pool.length` is already computed at `_app.js:230`, just needs a UI element updated after `board.revealHint`.

- [ ] **Guess distribution in stats** — `stats.guesses` histogram is tracked (`_app.js:654`) but never rendered. Add a bar chart to the end-game screen alongside played/won/streak.

## Medium priority

- [ ] **Daily challenge mode** — Seed off `new Date().toDateString()`, lock word-length/rounds settings for it, badge it "Daily." Trivial since seeding is already wired up.

- [ ] **Surrender button** — Mid-game "give up" that ends the game and reveals the word (picks from pool same as loss path at `_app.js:252`). Reduces frustration on obviously-lost games.

- [ ] **Reveal pool on game over** — On loss, show the words the game was hiding behind (collapsed by default, expandable). Uses the `pool` already in scope at loss time.

## Low priority / Nice to have

- [ ] **Pool size animation** — Flash the pool count red when it barely shrinks (<10% reduction), green when it drops hard. Drama tied to the core mechanic.
