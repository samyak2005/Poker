const { isRoyalFlush } = require("./Priority_Functions/royal_flush");
const { isStraightFlush } = require("./Priority_Functions/straight_flush");
const { isFourOfAKind } = require("./Priority_Functions/four_kind");
const { isFullHouse } = require("./Priority_Functions/fullhouse");
const { isFlush } = require("./Priority_Functions/flush");
const { isStraight } = require("./Priority_Functions/straight");
const { isThreeOfAKind } = require("./Priority_Functions/three_of_a_kind");
const { isTwoPair } = require("./Priority_Functions/two_pair");
const { isOnePair } = require("./Priority_Functions/one_pair");
const { highCard } = require("./Priority_Functions/high_card");

/**
 * @param {Array} hand - Array of 5 card objects, each with rank and suit properties
 * @returns {number} Priority number of the hand
 */

function evaluateHand(hand) {
  if (isRoyalFlush(hand)) {
    return 1;
  }

  if (isStraightFlush(hand)) {
    return 2;
  }

  if (isFourOfAKind(hand)) {
    return 3;
  }

  if (isFullHouse(hand)) {
    return 4;
  }

  if (isFlush(hand)) {
    return 5;
  }

  if (isStraight(hand)) {
    return 6;
  }

  if (isThreeOfAKind(hand)) {
    return 7;
  }

  if (isTwoPair(hand)) {
    return 8;
  }

  if (isOnePair(hand)) {
    return 9;
  }

  return 10;
}

module.exports = { evaluateHand };
