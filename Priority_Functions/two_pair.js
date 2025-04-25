function isTwoPair(hand) {
  const ranks = hand.map((card) => card.rank);
  const rankCounts = {};
  ranks.forEach((rank) => {
    rankCounts[rank] = (rankCounts[rank] || 0) + 1;
  });
  const pairs = Object.values(rankCounts).filter((count) => count === 2);
  return pairs.length === 2;
}

module.exports = { isTwoPair };
