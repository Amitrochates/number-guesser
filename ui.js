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
  // TODO: implement this function.
  //
  // Tip for scoreHistory: the very first time the page loads, scoreHistory is
  // `undefined`. Set it to an empty array [] only if it doesn't exist yet, so
  // that restarting a game doesn't wipe out your past scores. For example:
  //   if (!scoreHistory) { scoreHistory = []; }
  //
  // Then reset the rest of the state and the page as described above.

   if(!scoreHistory){
    scoreHistory=[];
   }
   secretNumber=Game.generateSecretNumber(1, 100);
   attemptsUsed=0;
   hasWon=false;
   document.getElementById('message').textContent='';
   document.getElementById('message').className='';

     
  document.getElementById('attempts-display').textContent = 'Attempts left: 10';
  document.getElementById('guess-input').value = '';
  document.getElementById('restart-btn').hidden=true;
  document.getElementById('guess-input').disabled= false;
  document.getElementById('guess-btn').disabled=false;

}

/**
 * Handle a single guess. This runs when the player clicks "Guess" (or presses
 * Enter in the input box).
 *
 * Step by step, it must:
 *   1. Read the value from #guess-input and turn it into a whole number.
 *      (use parseInt(value, 10))
 *   2. Validate it. If it is NOT a number, or is less than 1, or more than 100,
 *      show a helpful message (e.g. "Please enter a number from 1 to 100.") and
 *      `return` early so the rest of the function does not run.
 *      (Number.isNaN(...) is handy for the "not a number" check.)
 *   3. Ask the game logic about the guess:
 *        const result = Game.checkGuess(guess, secretNumber);
 *   4. Add 1 to attemptsUsed.
 *   5. Update #message and its colour class based on `result`:
 *        'high'    -> text "Too high!",  class "message-high"
 *        'low'     -> text "Too low!",   class "message-low"
 *        'correct' -> set hasWon = true  (the win message is handled in step 7)
 *      Remember to remove the OTHER message-* classes when you add one, so old
 *      colours don't linger. A small helper at the bottom of this file,
 *      setMessage(text, className), is provided to make this easy — use it!
 *   6. Update #attempts-display to show how many guesses are LEFT:
 *        "Attempts left: " + (MAX_ATTEMPTS - attemptsUsed)
 *   7. Ask whether the game is over:
 *        if (Game.isGameOver(attemptsUsed, MAX_ATTEMPTS, hasWon)) { ... }
 *      Inside that block:
 *        - if hasWon: show a win message that mentions how many attempts it
 *          took (e.g. "Correct! You got it in 4 attempts."), use class
 *          "message-win".
 *        - if NOT won (they ran out of guesses): show a lose message that
 *          reveals the secret number (e.g. "Out of guesses! The number was 57."),
 *          use class "message-lose".
 *        - work out the score: the number of attempts if they won, or 11 as a
 *          "did not finish" marker if they lost. For example:
 *            const score = hasWon ? attemptsUsed : 11;
 *        - record it:  scoreHistory = Game.addToHistory(scoreHistory, score);
 *          (note we REPLACE scoreHistory with the new array it returns)
 *        - call renderHistory() to redraw the list of past games
 *        - disable #guess-input and #guess-btn (.disabled = true)
 *        - show #restart-btn (.hidden = false)
 *   8. Clear the input box and (optionally) put the cursor back in it so the
 *      player can type their next guess quickly.
 */
function handleGuess() {
  // TODO: implement this function.
let guessno= document.getElementById("guess-input"); // guessno is an element of html id "guess-input"
  let guess=parseInt(guessno.value,10);
 if(isNaN(guess) || guess>100 || guess<1){
  return;
 }
 attemptsUsed++;
 const result = Game.checkGuess(guess, secretNumber);

 if(result=='correct'){
  hasWon= true;
  setMessage("You win!!", 'message-win')
 } else if (result == 'high'){
  setMessage("Too High!", 'message-high');
 } else{
   setMessage("Too Low!!",'message-low')
 }

 const attemptsLeft= MAX_ATTEMPTS - attemptsUsed;
 document.getElementById("attempts-display").textContent="Attempts left: "+ attemptsLeft;

 if (Game.isGameOver(attemptsUsed, MAX_ATTEMPTS, hasWon)) {
     guessno.disabled =true;
     document.getElementById("guess-btn").disabled= true;
     document.getElementById("restart-btn").hidden= false;

     const score = hasWon ? attemptsUsed : 11;

     const gameResult={
      score: score,
      secretNumber: secretNumber
     };

     scoreHistory = Game.addToHistory(scoreHistory, gameResult);


     if(hasWon){
      setMessage("Correct! You got it in "+attemptsUsed+" attempts", 'message-win');
     } else{
      setMessage("Out of guesses! The number was "+secretNumber, 'message-lose');
     }
    renderHistory();
    }
    guessno.value='';
    guessno.focus();
}

/**
 * Redraw the list of past game results in #history-list.
 *
 * It must:
 *   - get only the most recent scores:
 *       const recent = Game.getLastFiveScores(scoreHistory);
 *   - empty out the current #history-list (e.g. set its textContent to '',
 *     or remove its children) so old rows don't pile up
 *   - for each score in `recent`, create an <li> element, set its text, and
 *     append it to #history-list:
 *       const li = document.createElement('li');
 *       li.textContent = ...;
 *       historyList.appendChild(li);
 *   - the text for each row:
 *       score === 11  ->  "Did not finish"
 *       otherwise     ->  "Guessed in X attempts"   (X is the score)
 *
 * Use textContent (not innerHTML) so the page stays safe and simple.
 */
function renderHistory() {
  // TODO: implement this function.
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
