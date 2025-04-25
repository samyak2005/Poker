function isFlush(hand) {
  const suits = hand.map((card) => card.suit);
  const allSameSuit = suits.every((suit) => suit === suits[0]);
  if (!allSameSuit) return false;
  return true;
}

module.exports = { isFlush };
