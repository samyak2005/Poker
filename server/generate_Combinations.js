/**
 * Generates all possible 5-card combinations from 7 cards
 * @param {Array} cards - Array of 7 card objects (2 hole cards + 5 community cards)
 * @returns {Array} Array of all possible 5-card combinations
 */

function generateCombinations(cards) {
  const result = [];
  function combine(start = 0, combo = []) {
    if (combo.length === 5) {
      result.push([...combo]);
      return;
    }

    for (let i = start; i < cards.length; i++) {
      combo.push(cards[i]);
      combine(i + 1, combo);
      combo.pop();
    }
  }
  combine();
  return result;
}

module.exports = { generateCombinations };
