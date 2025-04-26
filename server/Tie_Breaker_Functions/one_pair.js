// const hand1 = [
//     {rank : "K" , suit : "spades"},
//     {rank : "K" , suit : "spades"},
//     {rank : "1" , suit : "spades"},
//     {rank : "2" , suit : "spades"},
//     {rank : "3" , suit : "spades"},
// ]

// const hand2 = [
//     {rank : "K" , suit : "spades"},
//     {rank : "K" , suit : "spades"},
//     {rank : "1" , suit : "spades"},
//     {rank : "2" , suit : "spades"},
//     {rank : "4" , suit : "spades"},
// ]

function OnePair(hand1 , hand2){
  const ranks1 = hand1.map((card) => card.rank);
  const ranks2 = hand2.map((card) => card.rank);

  let map1 = new Map();
  let map2 = new Map();

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
  }

   const value1 = ranks1.map((rank) => rankvalues[rank]);
   const value2 = ranks2.map((rank) => rankvalues[rank]);

  for(let i = 0; i < 5; i++){

    if (map1.has(value1[i])) {
      map1.set(value1[i], map1.get(value1[i]) + 1);
    } else {
      map1.set(value1[i], 1);
    }

    if (map2.has(value2[i])) {
        map2.set(value2[i], map2.get(value2[i]) + 1);
    } else {
        map2.set(value2[i], 1);
    }

  }

  let HighCard1 = 2;
  let HighCard2 = 2;

  for(let i = 0; i < 5; i++){
    if (map1.get(value1[i]) == 2) {
       HighCard1 = value1[i];
    }
    if (map2.get(value2[i]) == 2) {
        HighCard2 = value2[i];
    }
  }

  if(HighCard1 > HighCard2){
    return hand1;
  }else if(HighCard2 > HighCard1){
    return hand2;
  }

   value1.sort((a,b) => b-a);
   value2.sort((a,b) => b-a);

   for(let i = 0;i<5;i++){
      if(value1[i] > value2[i]){
        return hand1;
      }else if(value2[i] > value1[i]){
        return hand2;
      }
   }
}

// console.log(OnePair(hand1,hand2));