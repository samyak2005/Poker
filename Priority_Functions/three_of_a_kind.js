function isThreeOfAKind(hand) {
  const ranks = hand.map((card) => card.rank);
  const rankCounts = {};
  ranks.forEach((rank) => {
    rankCounts[rank] = (rankCounts[rank] || 0) + 1;
  });
  return Object.values(rankCounts).includes(3);
}

module.exports = { isThreeOfAKind };
