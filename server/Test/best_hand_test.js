const { findBestHand } = require("../best_hand");
const { evaluateHand } = require("../evaluate_hand"); // Assuming evaluateHand is already available

// Example 1: Royal Flush possible
const userCards = [
  { rank: "2", suit: "hearts" },
  { rank: "2", suit: "clubs" },
];

const flopCards = [
  { rank: "3", suit: "hearts" },
  { rank: "4", suit: "hearts" },
  { rank: "A", suit: "spades" },
  { rank: "K", suit: "clubs" },
  { rank: "8", suit: "diamonds" },
];

const result = findBestHand(userCards, flopCards);

console.log("Best Hand:", result.hand);
console.log("Priority:", result.priority);

// Expected Output:
// Best Hand: (should be the Royal Flush combination)
// Priority: 1
