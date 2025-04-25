function isFullHouse(hand) {
  const rankCount = new Map();
  hand.forEach((card) => {
    rankCount.set(card.rank, (rankCount.get(card.rank) || 0) + 1);
  });
  const values = Array.from(rankCount.values());
  return values.includes(3) && values.includes(2);
}

module.exports = { isFullHouse };
