const rankValues = require("../rankValues");

function TwoPair(hand1, hand2) {
  const ranks1 = hand1.map((card) => card.rank);
  const ranks2 = hand2.map((card) => card.rank);

  let map1 = new Map();
  let map2 = new Map();

  const value1 = ranks1.map((rank) => rankValues[rank]);
  const value2 = ranks2.map((rank) => rankValues[rank]);

  for (let i = 0; i < 5; i++) {
    if (map1.has(value1[i])) {
      map1.set(value1[i], map1.get(value1[i]) + 1);
    } else {
      map1.set(value1[i], 1);
    }

    if (map2.has(value2[i])) {
      map2.set(value2[i], map2.get(value2[i]) + 1);
    } else {
      map2.set(value2[i], 1);
    }
  }

  value1.sort((a, b) => {
    ta = map1.get(a);
    tb = map1.get(b);

    if (tb == ta) {
      return b - a;
    }
    return tb - ta;
  });

  value2.sort((a, b) => {
    ta = map2.get(a);
    tb = map2.get(b);

    if (tb == ta) {
      return b - a;
    }
    return tb - ta;
  });

  for (let i = 0; i < 5; i++) {
    if (value1[i] > value2[i]) {
      return hand1;
    } else if (value2[i] > value1[i]) {
      return hand2;
    }
  }

  return hand1;
}

module.exports = { TwoPair };
