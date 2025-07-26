const { evaluateHand } = require("../evaluate_hand");

// Test cases
const royalFlush = [
  { rank: "A", suit: "spades" },
  { rank: "K", suit: "spades" },
  { rank: "Q", suit: "spades" },
  { rank: "J", suit: "spades" },
  { rank: "10", suit: "spades" },
];

const fourOfAKind = [
  { rank: "A", suit: "spades" },
  { rank: "A", suit: "hearts" },
  { rank: "A", suit: "diamonds" },
  { rank: "A", suit: "clubs" },
  { rank: "K", suit: "spades" },
];

const onePair = [
  { rank: "A", suit: "spades" },
  { rank: "A", suit: "hearts" },
  { rank: "K", suit: "diamonds" },
  { rank: "Q", suit: "clubs" },
  { rank: "J", suit: "spades" },
];

const highCard = [
  { rank: "A", suit: "spades" },
  { rank: "K", suit: "hearts" },
  { rank: "Q", suit: "diamonds" },
  { rank: "J", suit: "clubs" },
  { rank: "9", suit: "spades" },
];

// Run tests
console.log("Royal Flush should return 1:", evaluateHand(royalFlush));
console.log("Four of a Kind should return 3:", evaluateHand(fourOfAKind));
console.log("One Pair should return 9:", evaluateHand(onePair));
console.log("High Card should return 10:", evaluateHand(highCard));
