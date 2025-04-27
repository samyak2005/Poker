function FourKind(hand1, hand2) {
  const ranks1 = hand1.map((card) => card.rank);
  const ranks2 = hand2.map((card) => card.rank);

  let map1 = new Map();
  let map2 = new Map();

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
  };

  const value1 = ranks1.map((rank) => rankvalues[rank]);
  const value2 = ranks2.map((rank) => rankvalues[rank]);

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

  let HighCard1 = 2;
  let HighCard2 = 2;

  for (let i = 0; i < 5; i++) {
    if (map1.get(value1[i]) == 4) {
      HighCard1 = value1[i];
    }
    if (map2.get(value2[i]) == 4) {
      HighCard2 = value2[i];
    }
  }

  if (HighCard1 > HighCard2) {
    return hand1;
  } else if (HighCard2 > HighCard1) {
    return hand2;
  }

  value1.sort((a, b) => b - a);
  value2.sort((a, b) => b - a);
  let CompareCard1;
  let CompareCard2;
  if (value1[0] == HighCard1) {
    CompareCard1 = value1[4];
  } else {
    CompareCard1 = value1[0];
  }

  if (value2[0] == HighCard2) {
    CompareCard2 = value2[4];
  } else {
    CompareCard2 = value2[0];
  }

  if (CompareCard1 > CompareCard2) {
    return hand1;
  } else if (CompareCard2 > CompareCard1) {
    return hand2;
  }

  return hand1;
}

module.exports = { FourKind };
