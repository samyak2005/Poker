const { findBestHand } = require("../best_hand");
const { evaluateHand } = require("../evaluate_hand"); // Assuming evaluateHand is already available

// Example 1: Royal Flush possible
const userCards = [
  { rank: "2", suit: "hearts" },
  { rank: "2", suit: "clubs" },
];

const flopCards = [
  { rank: "K", suit: "hearts" },
  { rank: "Q", suit: "hearts" },
  { rank: "K", suit: "spades" },
  { rank: "A", suit: "clubs" },
  { rank: "A", suit: "diamonds" },
];

const result = findBestHand(userCards, flopCards);

console.log("Best Hand:", result.hand);
console.log("Priority:", result.priority);

// Expected Output:
// Best Hand: (should be the Royal Flush combination)
// Priority: 1
