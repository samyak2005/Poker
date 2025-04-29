const rankValues = require("../rankValues");

function HighCard(hand1, hand2) {
  const value1 = hand1.map((card) => card.rank);
  const value2 = hand2.map((card) => card.rank);

  const ranks1 = value1.map((rank) => rankValues[rank]);
  const ranks2 = value2.map((rank) => rankValues[rank]);

  ranks1.sort((a, b) => b - a);
  ranks2.sort((a, b) => b - a);
  for (let i = 0; i < 5; i++) {
    if (ranks1[i] > ranks2[i]) {
      return hand1;
    } else if (ranks1[i] < ranks2[i]) {
      return hand2;
    }
  }
  return hand1;
}

module.exports = { HighCard };
