const { evaluateHand } = require("./evaluate_hand");
const { generateCombinations } = require("./generate_Combinations");

/**
 * @param {Array} userCards - Array of 2 card objects (player's cards)
 * @param {Array} flopCards - Array of 5 card objects (community cards)
 * @returns {Object} Object containing the best hand and its priority
 */

function findBestHand(userCards, flopCards) {
  const allCards = [...userCards, ...flopCards];
  const combinations = generateCombinations(allCards);
  let bestPriority = 10;
  let bestHand = combinations[0];
  combinations.forEach((hand) => {
    const priority = evaluateHand(hand);
    if (priority < bestPriority) {
      bestPriority = priority;
      bestHand = hand;
    }
    //   need that if the piority is the same, compare the cards
  });

  return {
    hand: bestHand,
    priority: bestPriority,
  };
}

module.exports = { findBestHand };
