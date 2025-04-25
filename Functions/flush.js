// const hand1 = [
//   { rank: "A", suit: "diamonds" },
//   { rank: "2", suit: "spades" },
//   { rank: "3", suit: "spades" },
//   { rank: "4", suit: "spades" },
//   { rank: "5", suit: "spades" },
// ];

function isFlush(hand) {
  const suits = hand.map((card) => card.suit); //new array formed

  const allSameSuit = suits.every((suit) => suit === suits[0]); //check on every index
  if (!allSameSuit) return false;
  return true;
}

// console.log(isFlush(hand1));
