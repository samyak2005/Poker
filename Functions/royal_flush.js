// const hand1 = [
//   { rank: "A", suit: "spades" },
//   { rank: "K", suit: "spades" },
//   { rank: "Q", suit: "spades" },
//   { rank: "J", suit: "spades" },
//   { rank: "10", suit: "spades" },
// ];

function royal_flush(hand) {
  const requiredRanks = ["A", "K", "Q", "J", "10"];
  const rankSet = new Set(requiredRanks); //converted it to a set to check if all required ranks are present

  const suits = hand.map((card) => card.suit); //Array mein convert
  const ranks = hand.map((card) => card.rank);

  const sameSuit = suits.every((suit) => suit === suits[0]); //true false return
  if (!sameSuit) return false;

  // Check if all required ranks are present
  const rankCheck = requiredRanks.every((rank) => ranks.includes(rank));
  return rankCheck;
}

// console.log(royal_flush(hand1));
