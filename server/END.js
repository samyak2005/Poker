const { TieBreaker } = require("./Main_working/Tie_Breaker");

function END_WINNING(priority1, hand1, priority2, hand2) {
  if (priority1 > priority2) {
    return hand2;
  } else if (priority1 == priority2) {
    return TieBreaker(priority1, hand1, hand2);
  } else {
    return hand1;
  }
}

module.exports = {END_WINNING};