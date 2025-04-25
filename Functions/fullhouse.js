function isFullHouse(hand) {
  const rankCount = new Map();

  // Count occurrences of each rank
  hand.forEach((card) => {
    rankCount.set(card.rank, (rankCount.get(card.rank) || 0) + 1);
  });

  // Check if there is a "three of a kind" (3 same ranks) and a "pair" (2 same ranks)
  const values = Array.from(rankCount.values());
  return values.includes(3) && values.includes(2);
}
