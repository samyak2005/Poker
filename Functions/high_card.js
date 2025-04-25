// const hand1 = [
//   { rank: "A", suit: "spdades" },
//   { rank: "2", suit: "damonds" },
//   { rank: "2", suit: "spades" },
//   { rank: "J", suit: "clubs" },
//   { rank: "10", suit: "spades" },
// ];

function highCard(hand) {
  const ranks = hand.map((card) => card.rank); // creates an array of ranks
  const rankvalues = {
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9,
    10: 10,
    J: 11,
    Q: 12,
    K: 13,
    A: 14,
  }; // creates an array to give you the numerical value of the rank

  const values = ranks.map((rank) => rankvalues[rank]); // creates an array which includes all the numerical value of the rannks
  let high = 2;
  let index;
  for (let i = 0; i < values.length; i++) {
    // loop to check the high card
    if (high < values[i]) {
      high = values[i]; // stores the high card value
      index = i; // stores the index value of high card
    }
  }
  return hand[index];
}

// console.log(highCard(hand1));
