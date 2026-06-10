/* ============================================================================
 * HOW THIS FILE WORKS
 * ============================================================================
 *
 * Welcome! This is the heart of the game — but it knows NOTHING about the web
 * page. There is no HTML in here, no buttons, no colours, no clicking.
 *
 * Everything in this file is a "pure function". A pure function is a simple,
 * predictable machine: you hand it some inputs, it hands you back an output,
 * and that's it. Give it the same inputs and you'll ALWAYS get the same output.
 * It never reaches out and changes anything else in the world.
 *
 *   inputs  ->  [ pure function ]  ->  output
 *
 * Why do we work this way? Because pure functions are easy to think about and
 * easy to test. The tests in tests.js call these functions directly with known
 * inputs and check the outputs. No clicking required.
 *
 * The other file, ui.js, is the part that DOES touch the page. It reads what
 * the player typed, calls YOUR functions here to figure out what should happen,
 * and then updates the screen. Think of this file as the "brain" and ui.js as
 * the "hands and eyes".
 *
 * Everything you write here gets attached to a single shared object called
 * `window.Game` (see the bottom of the file). That's how ui.js and tests.js
 * find your work — they call things like `Game.checkGuess(...)`.
 *
 * Your job: replace each stubbed function body with a real implementation.
 * Search this file for "TODO:" to find every spot that needs your attention.
 * ========================================================================== */


/**
 * Pick a random whole number between min and max — and both ends count.
 *
 * @param {number} min - the smallest number allowed (inclusive)
 * @param {number} max - the largest number allowed (inclusive)
 * @returns {number} a whole number N where min <= N <= max
 *
 * Example:
 *   generateSecretNumber(1, 100)  ->  could be 1, 100, 42, or anything between
 *   generateSecretNumber(5, 5)    ->  always 5 (only one possibility)
 *
 * You will need:
 *   - Math.random()  (gives a decimal from 0 up to, but not including, 1)
 *   - Math.floor()   (chops the decimals off a number, rounding down)
 *
 * Hint to think about: Math.random() never quite reaches 1. To include BOTH
 * ends of your range, the usual trick involves the span "(max - min + 1)".
 * Work out on paper what numbers you want, then build the formula to match.
 */
function generateSecretNumber(min, max){
  // TODO: implement this function.
  return Math.floor(Math.random() * (max - min + 1)) + min;
}



/**
 * Compare the player's guess to the secret number.
 *
 * @param {number} guess  - the number the player guessed
 * @param {number} secret - the secret number to compare against
 * @returns {string} 'high' if the guess is too big,
 *                   'low'  if the guess is too small,
 *                   'correct' if the guess matches the secret
 *
 * Example:
 *   checkGuess(80, 50)  ->  'high'      (80 is bigger than 50)
 *   checkGuess(20, 50)  ->  'low'       (20 is smaller than 50)
 *   checkGuess(50, 50)  ->  'correct'   (they match)
 *
 * You will need:
 *   - comparison operators:  >   <   ===
 *   - return    (to send a string back out)
 *
 * Note: return the lowercase strings exactly as shown — 'high', 'low',
 * 'correct'. The tests check for these exact words.
 */
function checkGuess(guess, secret) {
  // TODO: implement this function.
  if(guess<secret){
    return 'low';
  }else if(guess==secret){
    return 'correct';
  } else{
    return 'high'
  }
}


/**
 * Decide whether the game has ended.
 *
 * The game is over in two situations:
 *   1. The player has won, OR
 *   2. The player has used up all their attempts.
 *
 * @param {number} attemptsUsed - how many guesses the player has made so far
 * @param {number} maxAttempts  - the most guesses they're allowed (e.g. 10)
 * @param {boolean} hasWon      - true if the player already guessed correctly
 * @returns {boolean} true if the game should end, false if it can continue
 *
 * Example:
 *   isGameOver(3, 10, false)   ->  false  (still guesses left, hasn't won)
 *   isGameOver(3, 10, true)    ->  true   (won, so we stop)
 *   isGameOver(10, 10, false)  ->  true   (no guesses left)
 *
 * You will need:
 *   - the logical OR operator:  ||
 *   - the comparison:  >=
 *   - return
 */
function isGameOver(attemptsUsed, maxAttempts, hasWon) {
  // TODO: implement this function.
  if(attemptsUsed<maxAttempts && !hasWon){
    return false;
  } else if(attemptsUsed<=maxAttempts && hasWon){
    return true;
  } else{
    return true;
  } 
}


/**
 * Add one score to the history — WITHOUT changing the original array.
 *
 * @param {number[]} historyArray - the existing list of past scores
 * @param {number} score          - the new score to add on the end
 * @returns {number[]} a brand-new array: a copy of historyArray with `score`
 *                     added at the end
 *
 * Example:
 *   addToHistory([3, 7], 5)  ->  [3, 7, 5]
 *   addToHistory([], 4)      ->  [4]
 *   (and in both cases the array you passed IN stays exactly as it was)
 *
 * You will need:
 *   - the spread operator  [...arr]   OR   arr.slice()   to copy first
 *   - return
 *
 * ⚠️  IMPORTANT: Do NOT use push() directly on the input array — that mutates
 *     (permanently changes) the original, and a test specifically checks that
 *     the original is left untouched. Make a COPY first using the spread
 *     operator [...historyArray] or historyArray.slice(), then add to the copy.
 */
function addToHistory(historyArray, score) {
  // TODO: implement this function.
  return [...historyArray, score];
}


/**
 * Return just the most recent 5 scores from the history.
 *
 * @param {number[]} historyArray - the full list of past scores
 * @returns {number[]} a new array with only the LAST 5 items. If there are 5
 *                     or fewer items, return a copy of the whole list.
 *
 * Example:
 *   getLastFiveScores([1, 2, 3])               ->  [1, 2, 3]
 *   getLastFiveScores([1, 2, 3, 4, 5, 6, 7])   ->  [3, 4, 5, 6, 7]
 *                                                   (the last five, not the first)
 *
 * You will need:
 *   - arr.slice()   (it can take a negative number to count from the end!)
 *   - return
 *
 * ⚠️  IMPORTANT: Return a NEW array, not the original. Do not use push() on the
 *     input array. arr.slice() conveniently gives you back a fresh copy, so it
 *     is a great fit here. Look up what slice(-5) does.
 */
function getLastFiveScores(historyArray) {
  // TODO: implement this function.
  newArray= historyArray.slice(-5);
  return newArray;
}


/* ----------------------------------------------------------------------------
 * Publish the functions so the rest of the project can use them.
 * Do not change this part — just implement the functions above.
 * -------------------------------------------------------------------------- */
window.Game = {
  generateSecretNumber: generateSecretNumber,
  checkGuess: checkGuess,
  isGameOver: isGameOver,
  addToHistory: addToHistory,
  getLastFiveScores: getLastFiveScores,
};
