function royal_flush(hand) {
  const requiredRanks = ["A", "K", "Q", "J", "10"];
  const rankSet = new Set(requiredRanks);
  const suits = hand.map((card) => card.suit);
  const ranks = hand.map((card) => card.rank);
  const sameSuit = suits.every((suit) => suit === suits[0]);
  if (!sameSuit) return false;
  const rankCheck = requiredRanks.every((rank) => ranks.includes(rank));
  return rankCheck;
}
