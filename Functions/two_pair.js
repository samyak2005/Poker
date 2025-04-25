function twoPair(hand) {
  const ranks = hand.map((card) => card.rank);
  let map = new Map();
  for (let i = 0; i < ranks.length; i++) {
    if (map.has(ranks[i])) {
      map.set(ranks[i], map.get(ranks[i]) + 1);
    } else {
      map.set(ranks[i], 1);
    }
  }
  let count = 0;
  for (let i = 0; i < ranks.length; i++) {
    if (map.get(ranks[i]) == 2) {
      count++;
    }
  }

  if (count == 4) {
    return true;
  }

  return false;
}
