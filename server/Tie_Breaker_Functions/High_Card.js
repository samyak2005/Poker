// const hand1 = [
//     {rank : "K" , suit : "spades"},
//     {rank : "Q" , suit : "spades"},
//     {rank : "4" , suit : "spades"},
//     {rank : "A" , suit : "spades"},
//     {rank : "4" , suit : "spades"},
// ]

// const hand2 = [
//     {rank : "K" , suit : "spades"},
//     {rank : "Q" , suit : "spades"},
//     {rank : "J" , suit : "spades"},
//     {rank : "A" , suit : "spades"},
//     {rank : "3" , suit : "spades"},
// ]

function HighCard(hand1, hand2) {
  const value1 = hand1.map((card) => card.rank);
  const value2 = hand2.map((card) => card.rank);

  const rankvalues = {
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9,
    10: 10,
    J: 11,
    Q: 12,
    K: 13,
    A: 14,
  };

  const ranks1 = value1.map((rank) => rankvalues[rank]);
  const ranks2 = value2.map((rank) => rankvalues[rank]);

  ranks1.sort((a, b) => b - a);
  ranks2.sort((a, b) => b - a);
  for (let i = 0; i < 5; i++) {
    if (ranks1[i] > ranks2[i]) {
      return hand1;
    } else if(ranks1[i] < ranks2[i]){
      return hand2;
    }
  }
}

// console.log(HighCard(hand1 , hand2));
module.exports = {HighCard};