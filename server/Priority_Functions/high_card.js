const rankValues = require('../../rankValues');

function highCard(hand) {
  const ranks = hand.map((card) => card.rank);
  
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
