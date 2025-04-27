const { OnePair } = require("./Tie_Breaker_Functions/one_pair.js");
const { HighCard } = require("./Tie_Breaker_Functions/High_Card.js");
const { TwoPair } = require("./Tie_Breaker_Functions/Two_pair.js");
const { ThreeKind } = require("./Tie_Breaker_Functions/Three_kind.js");
const { FourKind } = require("./Tie_Breaker_Functions/Four_Kind.js");
const { FullHouse } = require("./Tie_Breaker_Functions/Full_House.js");

// const hand1 = [
//     {rank : "2" , suit : "spades"},
//     {rank : "2" , suit : "spades"},
//     {rank : "3" , suit : "spades"},
//     {rank : "4" , suit : "spades"},
//     {rank : "5" , suit : "spades"},
// ]

// const hand2 = [
//     {rank : "K" , suit : "spades"},
//     {rank : "K" , suit : "spades"},
//     {rank : "2" , suit : "spades"},
//     {rank : "3" , suit : "spades"},
//     {rank : "4" , suit : "spades"},
// ]

/**
 * @param {Integer} priority - Integer value of priority
 * @param {Array} hand1 - Array of 5 card objects, each with rank and suit properties.
 * @param {Array} hand2 - Array of 5 card objects, each with rank and suit properties.
 * @returns {Array} - Higher hand among two hands with same priority.
 */

function TieBreaker(priority , hand1 , hand2){
    if(priority == 10){
        return HighCard(hand1,hand2);
    }

   if(priority == 9){
      return OnePair(hand1,hand2);
   }
   
   if(priority == 8){
     return TwoPair(hand1,hand2);
   }
   
   if(priority == 7){
     return ThreeKind(hand1,hand2);
   }
   
   if(priority == 6){
     return HighCard(hand1,hand2);
   }
   
   if(priority == 5){
    return HighCard(hand1,hand2);
  }
  
  if(priority == 4){
    return FullHouse(hand1,hand2);
  }

  if(priority == 3){
    return FourKind(hand1,hand2);
  }

  if(priority == 2){
    return HighCard(hand1,hand2);
  }
}

// console.log(TieBreaker(2,hand1,hand2));