const { OnePair } = require("../Tie_Breaker_Functions/one_pair.js");
const { HighCard } = require("../Tie_Breaker_Functions/High_Card.js");
const { TwoPair } = require("../Tie_Breaker_Functions/Two_pair.js");
const { ThreeKind } = require("../Tie_Breaker_Functions/Three_kind.js");
const { FourKind } = require("../Tie_Breaker_Functions/Four_Kind.js");
const { FullHouse } = require("../Tie_Breaker_Functions/Full_House.js");
/**
 * @param {Integer} priority - Integer value of priority
 * @param {Array} hand1 - Array of 5 card objects, each with rank and suit properties.
 * @param {Array} hand2 - Array of 5 card objects, each with rank and suit properties.
 * @returns {Array} - Higher hand among two hands with same priority.
 */

function TieBreaker(priority, hand1, hand2) {
  // For debugging
  // console.log("TieBreaker called with priority:", priority);
  // console.log("Hand1:", hand1);
  // console.log("Hand2:", hand2);

  switch (priority) {
    case 10: // High Card
      return HighCard(hand1, hand2);
    case 9: // One Pair
      return OnePair(hand1, hand2);
    case 8: // Two Pair
      return TwoPair(hand1, hand2);
    case 7: // Three of a Kind
      return ThreeKind(hand1, hand2);
    case 6: // Straight
      return HighCard(hand1, hand2);
    case 5: // Flush
      return HighCard(hand1, hand2);
    case 4: // Full House
      return FullHouse(hand1, hand2);
    case 3: // Four of a Kind
      return FourKind(hand1, hand2);
    case 2: // Straight Flush
      return HighCard(hand1, hand2);
    case 1: // Royal Flush
      return hand1; // Both are royal flush, so either is fine
    default:
      return hand1; // Fallback, should never happen
  }
}

module.exports = { TieBreaker };
