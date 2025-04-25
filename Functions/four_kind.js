function isFourOfAKind(hand) {
  const rankCount = new Map();

  // Count occurrences of each rank
  hand.forEach((card) => {
    rankCount.set(card.rank, (rankCount.get(card.rank) || 0) + 1);
  });

  return Array.from(rankCount.values()).includes(4);
}
