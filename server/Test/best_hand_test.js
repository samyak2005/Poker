const { findBestHand } = require("../Main_working/best_hand");
const { evaluateHand } = require("../Main_working/evaluate_hand"); // Assuming evaluateHand is already available

// Example 1: Royal Flush possible
const userCards = [
  { rank: "A", suit: "hearts" },
  { rank: "A", suit: "diamonds" },
];

const flopCards = [
  { rank: "Q", suit: "clubs" },
  { rank: "2", suit: "spades" },
  { rank: "K", suit: "hearts" },
  { rank: "K", suit: "clubs" },
  { rank: "Q", suit: "diamonds" },
];

const result = findBestHand(userCards, flopCards);

console.log("Best Hand:", result.hand);
console.log("Priority:", result.priority);

// Expected Output:
// Best Hand: (should be the Royal Flush combination)
// Priority: 1
