const rankValues = require("../rankValues");

function arraysEqual(arr1, arr2) {
  return arr1.every((val, i) => val === arr2[i]);
}

function isStraightFlush(hand) {
  const suits = hand.map((card) => card.suit);
  const ranks = hand.map((card) => card.rank);

  const allSameSuit = suits.every((suit) => suit === suits[0]);
  if (!allSameSuit) return false;

  const values = ranks.map((rank) => rankValues[rank]);

  values.sort((a, b) => a - b);

  let isStraight = values.every((val, i, arr) => {
    if (i === 0) return true;
    return val === arr[i - 1] + 1;
  });

  const aceLow = [2, 3, 4, 5, 14];
  const ace_case = arraysEqual(values, aceLow);

  return isStraight || ace_case;
}

module.exports = { isStraightFlush };
