const { generateCombinations } = require("./generate_Combinations");
const { evaluateHand } = require("./evaluate_hand");

function findBestHand(playerCards, communityCards) {
  const allCards = [...playerCards, ...communityCards];
  
  const combinations = generateCombinations(allCards);
  
  let bestHand = null;
  let bestPriority = 10;
  
  for (const combination of combinations) {
    const priority = evaluateHand(combination);
    
    if (priority < bestPriority) {
      bestPriority = priority;
      bestHand = combination;
    }
  }
  
  return {
    priority: bestPriority,
    hand: bestHand
  };
}

module.exports = { findBestHand }; 