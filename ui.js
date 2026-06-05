/* ============================================================================
 * HOW THIS FILE WORKS
 * ============================================================================
 *
 * This file is the BRIDGE between the player and the game logic.
 *
 * In game.js you wrote pure functions that only deal with numbers and arrays.
 * They don't know the web page exists. This file is the opposite: it talks to
 * the page all the time. It:
 *
 *   1. READS from the page   — what number did the player type?
 *   2. CALLS Game functions  — is that guess too high? is the game over?
 *   3. WRITES to the page    — show a message, update the attempts counter, etc.
 *
 * The game's "state" — the facts that change as you play — lives HERE, not in
 * game.js. State is just a few variables we keep up to date:
 *
 *   secretNumber  - the number the player is trying to find
 *   attemptsUsed  - how many guesses they've made this round
 *   hasWon        - whether they've guessed correctly
 *   scoreHistory  - the list of results from games they've finished
 *
 * A few page-reading / page-writing tools you'll use a lot:
 *   document.getElementById('some-id')  - grab an element by its id
 *   element.textContent = 'hello'       - set the visible text of an element
 *   element.classList.add('message-win')    - add a CSS class
 *   element.classList.remove('message-low')  - remove a CSS class
 *   element.disabled = true             - switch a button/input off
 *   element.hidden = false              - show an element hidden with `hidden`
 *
 * Your job: fill in the three functions below (initGame, handleGuess,
 * renderHistory). Search for "TODO:" to find your work. The event listeners at
 * the very bottom are already done for you — leave them alone.
 * ========================================================================== */


/* --- Game state. These start empty and get filled in by initGame(). --- */
let secretNumber;
let attemptsUsed;
let hasWon;
let scoreHistory;

/* How many guesses the player gets. Used in a couple of places below. */
const MAX_ATTEMPTS = 10;


/**
 * Start (or restart) a game. This runs once when the page loads, and again
 * every time the player clicks "Play Again".
 *
 * It must reset everything back to a fresh, ready-to-play state:
 *   - set `secretNumber` to a new random number from 1 to 100
 *     (use Game.generateSecretNumber(1, 100))
 *   - set `attemptsUsed` back to 0
 *   - set `hasWon` back to false
 *   - clear the #message element's text, and remove any message-* classes
 *     left over from the previous game
 *   - set #attempts-display text back to "Attempts left: 10"
 *   - clear the #guess-input value (set it to an empty string '')
 *   - hide the #restart-btn (set its .hidden to true)
 *   - re-enable #guess-input and #guess-btn (set their .disabled to false)
 *
 * Note: scoreHistory is NOT reset here. We want the history of past games to
 * survive across restarts. Initialise it once though — see the TODO below.
 */
function initGame() {
  if (!scoreHistory) {
    scoreHistory = [];
  }

  secretNumber = Game.generateSecretNumber(1, 100);
  attemptsUsed = 0;
  hasWon = false;


  document.getElementById("message").textContent = "";
  document.getElementById('attempts-display').textContent = 'Attempts left: ' + MAX_ATTEMPTS;

  const guessInput = document.getElementById('guess-input');
  guessInput.value = '';
  guessInput.disabled = false;

  document.getElementById('guess-btn').disabled = false;
  document.getElementById('restart-btn').hidden = true;
}


function handleGuess() {
  const value = document.getElementById('guess-input').value;
  const guess = parseInt(value, 10);

  if (Number.isNaN(guess) || guess < 1 || guess > 100) {
    setMessage('Please enter a number from 1 to 100.');
    return;
  }

  const result = Game.checkGuess(guess, secretNumber);
  attemptsUsed += 1;

  if (result === 'high') {
    setMessage('Too high!', 'message-high');
  } else if (result === 'low') {
    setMessage('Too low!', 'message-low');
  } else {
    hasWon = true;
  }

  document.getElementById('attempts-display').textContent = 'Attempts left: ' + (MAX_ATTEMPTS - attemptsUsed);

  if (Game.isGameOver(attemptsUsed, MAX_ATTEMPTS, hasWon)) {
    if (hasWon) {
      setMessage('Correct! You got it in ' + attemptsUsed + ' attempts.', 'message-win');
    } else {
      setMessage('Out of guesses! The number was ' + secretNumber + '.', 'message-lose');
    }

    const score = hasWon ? attemptsUsed : 11;
    scoreHistory = Game.addToHistory(scoreHistory, score);
    renderHistory();

    document.getElementById('guess-input').disabled = true;
    document.getElementById('guess-btn').disabled = true;
    document.getElementById('restart-btn').hidden = false;
  }

  const guessInput = document.getElementById('guess-input');
  guessInput.value = '';
  guessInput.focus();
}


function renderHistory() {
  const recent = Game.getLastFiveScores(scoreHistory);
  const historyList = document.getElementById('history-list');
  historyList.textContent = '';

  for (const score of recent) {
    const li = document.createElement('li');
    li.textContent = score === 11 ? 'Did not finish' : 'Guessed in ' + score + ' attempts';
    historyList.appendChild(li);
  }
}


/* ----------------------------------------------------------------------------
 * A little helper for setting the message. It puts your text on screen and
 * makes sure only the colour class you asked for is applied (clearing the
 * others first). You're welcome to use this inside your functions above.
 * -------------------------------------------------------------------------- */
function setMessage(text, className) {
  const message = document.getElementById('message');
  message.textContent = text;
  message.classList.remove('message-high', 'message-low', 'message-win', 'message-lose');
  if (className) {
    message.classList.add(className);
  }
}


/* ----------------------------------------------------------------------------
 * Event wiring. This is already done for you — no need to change it.
 * It connects the buttons and the keyboard to your functions above.
 * -------------------------------------------------------------------------- */
document.getElementById('guess-btn').addEventListener('click', handleGuess);
document.getElementById('restart-btn').addEventListener('click', initGame);
document.getElementById('guess-input').addEventListener('keydown', function (e) {
  if (e.key === 'Enter') handleGuess();
});
document.addEventListener('DOMContentLoaded', initGame);
