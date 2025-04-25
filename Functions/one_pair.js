// const hand1 = [
//   { rank: "A", suit: "spdades" },
//   { rank: "2", suit: "damonds" },
//   { rank: "2", suit: "spades" },
//   { rank: "A", suit: "clubs" },
//   { rank: "10", suit: "spades" },
// ];

function onePair(hand) {
  const ranks = hand.map((card) => card.rank);
  let map = new Map(); //  creates a new hashmap
  for (let i = 0; i < ranks.length; i++) {
    if (map.has(ranks[i])) {
      map.set(ranks[i], map.get(ranks[i]) + 1);
    } else {
      map.set(ranks[i], 1);
    }
  }
  for (let i = 0; i < ranks.length; i++) {
    if (map.get(ranks[i]) == 2) {
      return true; // returns the card which is repeated once in the hand
    }
  }
  return false;
}

// console.log(onePair(hand1));
