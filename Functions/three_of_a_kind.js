// const hand1 = [
//     { rank: "A", suit: "spades" },
//     { rank: "K", suit: "spades" },
//     { rank: "Q", suit: "spades" },
//     { rank: "J", suit: "spades" },
//     { rank: "10", suit: "spades" },
// ];

function threeOfaKind(hand){
    const ranks = hand.map((card) => card.rank); // creates an array of ranks
    let map = new Map(); //  creates a new hashmap
    for(let i =0;i<ranks.length;i++){ // loop to add ranks in map
       if(map.has(ranks[i])){
         map.set(ranks[i] , map.get(ranks[i])+1);// increments the count of cards if repeated
       }else{
         map.set(ranks[i] , 1);// adds rank with initial count 1 to the map
       }
    }
    for(let i = 0;i<ranks.length;i++){
        if(map.get(ranks[i]) == 3){
            return true;// returns the card which is repeated twice in the hand
        }
    }
    return false;
}

// threeOfaKind(hand1);