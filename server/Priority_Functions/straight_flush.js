// NOTE A2345 comes in straight
function arraysEqual(arr1, arr2) {
  return arr1.every((val, i) => val === arr2[i]);
}

function isStraightFlush(hand) {
  const suits = hand.map((card) => card.suit);
  const ranks = hand.map((card) => card.rank);

  const allSameSuit = suits.every((suit) => suit === suits[0]);
  if (!allSameSuit) return false;

  const rankValues = {
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
  };
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
