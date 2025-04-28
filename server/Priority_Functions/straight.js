const rankValues = require('../../rankValues');

// NOTE A2345 comes in straight
function arraysEqual(arr1, arr2) {
  return arr1.every((val, i) => val === arr2[i]);
}

function isStraight(hand) {
  const ranks = hand.map((card) => card.rank);
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

module.exports = { isStraight };

