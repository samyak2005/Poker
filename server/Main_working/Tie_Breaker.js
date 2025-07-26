const { OnePair } = require("../Tie_Breaker_Functions/one_pair.js");
const { HighCard } = require("../Tie_Breaker_Functions/High_Card.js");
const { TwoPair } = require("../Tie_Breaker_Functions/Two_pair.js");
const { ThreeKind } = require("../Tie_Breaker_Functions/Three_kind.js");
const { FourKind } = require("../Tie_Breaker_Functions/Four_Kind.js");
const { FullHouse } = require("../Tie_Breaker_Functions/Full_House.js");

function TieBreaker(priority, hand1, hand2) {
  switch (priority) {
    case 10:
      return HighCard(hand1, hand2);
    case 9:
      return OnePair(hand1, hand2);
    case 8:
      return TwoPair(hand1, hand2);
    case 7:
      return ThreeKind(hand1, hand2);
    case 6:
      return HighCard(hand1, hand2);
    case 5:
      return HighCard(hand1, hand2);
    case 4:
      return FullHouse(hand1, hand2);
    case 3:
      return FourKind(hand1, hand2);
    case 2:
      return HighCard(hand1, hand2);
    case 1:
      return hand1;
    default:
      return hand1;
  }
}

module.exports = { TieBreaker };
