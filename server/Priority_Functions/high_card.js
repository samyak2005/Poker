const rankValues = require('../../rankValues');

function highCard(hand) {
  const ranks = hand.map((card) => card.rank);
  // const rankvalues = {
  //   2: 2,
  //   3: 3,
  //   4: 4,
  //   5: 5,
  //   6: 6,
  //   7: 7,
  //   8: 8,
  //   9: 9,
  //   10: 10,
  //   J: 11,
  //   Q: 12,
  //   K: 13,
  //   A: 14,
  // };

  const values = ranks.map((rank) => rankValues[rank]);
  let index;
  for (let i = 0; i < values.length; i++) {
    if (high < values[i]) {
      high = values[i];
      index = i;
    }
  }
  return hand[index];
}

module.exports = { highCard };
