/**
 * @param {number} priority1 - Priority of player 1's hand
 * @param {Array} hand1 - Player 1's hand
 * @param {number} priority2 - Priority of player 2's hand
 * @param {Array} hand2 - Player 2's hand
 * @returns {Array} - Winner's hand
 */

function END_WINNING(priority1, hand1, priority2, hand2) {
  if (priority1 > priority2) {
    return hand2;
  } else if (priority1 == priority2) {
    return TieBreaker(priority1, hand1, hand2);
  } else {
    return hand1;
  }
}
