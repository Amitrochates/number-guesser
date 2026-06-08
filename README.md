# Number Guesser

A small browser game for practising JavaScript. The computer picks a secret
number between **1 and 100**, and you get **10 attempts** to find it. After each
guess the game tells you whether you're too high or too low. When the game ends,
the result is saved to a running history and you can play again.

This project is an **assignment**: most of it is built for you, and you fill in
the missing pieces.

---

## How to run it

Open **`index.html`** in any web browser. That's it — no installation, no npm,
no build step. Just double-click the file (or right-click → Open With → your
browser).

---

## Your job

You will only edit **two files**:

- `game.js` — the game logic (pure functions)
- `ui.js` — the code that connects the game to the page

**Do not edit** `index.html`, `styles.css`, `tests.js`, or `tests.html`. They
are already complete.

Open each of your two files and read the big comment block at the top titled
**"HOW THIS FILE WORKS"** before you start. Then search for `// TODO:` to find
every spot that needs your code.

---

## The milestone sequence

Work through these in order. After each one, open `tests.html` to watch more
tests turn green.

### Milestone 1 — `generateSecretNumber` (in `game.js`)
Make the game able to pick a random number from 1 to 100, including both ends.

- **Turns green:** the three `generateSecretNumber` tests.
- **Hint:** `Math.random()` gives a decimal below 1; `Math.floor()` rounds down.
  To include both ends of the range, the span you scale by is `(max - min + 1)`.

### Milestone 2 — `checkGuess` (in `game.js`)
Compare a guess to the secret and report `'high'`, `'low'`, or `'correct'`.

- **Turns green:** the three `checkGuess` tests.
- **Hint:** three cases, three comparisons. Return the exact lowercase strings.

### Milestone 3 — `isGameOver`, `addToHistory`, `getLastFiveScores` (in `game.js`)
Finish the rest of the game logic: knowing when to stop, recording a score, and
trimming the history to the most recent five.

- **Turns green:** the three `isGameOver` tests, the three `addToHistory` tests,
  and the four `getLastFiveScores` tests.
- **Hint:** for the history functions, never `push()` onto the array you were
  given — copy first with `[...arr]` or `arr.slice()`. `slice` can count from
  the end with a negative number.

### Milestone 4 — `initGame` and `handleGuess` (in `ui.js`)
Now make the page actually play. `initGame` sets up a fresh round; `handleGuess`
reads the input, calls your game logic, and updates the screen.

- **Turns green:** no new automated tests turn green here (the logic was already
  covered in milestones 1–3), but the **game becomes playable** — open
  `index.html` and try it. The DOM tests in `tests.html` confirm the page wiring.
- **Hint:** read the numbered steps in the comments above each function and do
  them one at a time. Use the provided `setMessage(text, className)` helper.

### Milestone 5 — `renderHistory` (in `ui.js`)
Draw the list of past games under "Past games", showing only the latest five.

- **Turns green:** no new automated tests, but finished games now appear in the
  history list on the page.
- **Hint:** build each row with `document.createElement('li')` and
  `textContent`, then `appendChild` it. Clear the list first so rows don't pile
  up. A score of `11` means "Did not finish".

---

## How to check your work

Open **`tests.html`** in your browser (a different page from the game itself).
You'll see every test as a green (passing) or red (failing) row, plus a summary
line like `12 / 20 tests passing`.

At the very start, almost everything is red — that's expected. Re-open
`tests.html` after each milestone and watch the count climb. **Aim for all tests
green.** To play the actual game, open `index.html`.

---

## JavaScript concepts reference

| Concept | Used in | One-line description |
| --- | --- | --- |
| `Math.random()` | `generateSecretNumber` | Gives a random decimal from 0 up to (but not including) 1. |
| `Math.floor()` | `generateSecretNumber` | Rounds a number down to the nearest whole number. |
| Comparison operators `>` `<` `===` | `checkGuess`, `isGameOver` | Compare two values; produce `true` or `false`. |
| `return` | every function in `game.js` | Sends a value back out of a function to whoever called it. |
| Spread operator `[...arr]` | `addToHistory` | Makes a shallow copy of an array (so you don't change the original). |
| `arr.slice()` | `addToHistory`, `getLastFiveScores` | Returns a copy of part of an array; supports negative indexes from the end. |
| `parseInt()` | `handleGuess` | Turns a string like `"42"` into the number `42`. |
| `addEventListener` | event wiring (provided) | Runs a function when something happens, e.g. a click. |
| `getElementById` | `ui.js` | Finds an element on the page by its `id`. |
| `textContent` | `ui.js` | Reads or sets the plain text inside an element. |
| `classList.add` / `classList.remove` | `ui.js` | Adds or removes a CSS class to change styling. |
| `hidden` attribute | `ui.js` | When set, the element is not shown; clear it to reveal. |
| `disabled` property | `ui.js` | Switches an input or button on/off. |
| Template literals `` `...${x}...` `` | `ui.js` | Build strings with values slotted in, e.g. `` `Attempts left: ${n}` ``. |

---

## Rules

- Do not use any JS libraries or frameworks — vanilla JavaScript only.
- Do not modify `index.html`, `styles.css`, or `tests.js`.
- Do not use `innerHTML` to insert data; use `textContent`.
- Commit after each milestone so you can see your progress (and roll back if
  needed).


## POST completion 
- make a new branch 
- push that branch 'solution' to 'origin/solution'
- make a pull request ftrom origin/solution to origin/main 
- write in detail about your changes. 
- get it merged. 