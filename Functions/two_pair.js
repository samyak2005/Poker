// const hand1 = [
//     { rank: "A", suit: "spades" },
//     { rank: "K", suit: "spades" },
//     { rank: "Q", suit: "spades" },
//     { rank: "10", suit: "spades" },
//     { rank: "J", suit: "spades" },
// ];

function twoPair(hand){
    const ranks = hand.map((card) => card.rank); // creates an array of ranks
    let map = new Map(); //  creates a new hashmap
    for(let i =0;i<ranks.length;i++){ // loop to add ranks in map
       if(map.has(ranks[i])){
         map.set(ranks[i] , map.get(ranks[i])+1);// increments the count of cards if repeated
       }else{
         map.set(ranks[i] , 1);// adds rank with initial count 1 to the map
       }
    }
    let count = 0; // declares count variable with initial count 0
    for(let i = 0;i<ranks.length;i++){
        if(map.get(ranks[i]) == 2){
            count++; // if the count of card is exactly two thw count variable increments by one
        }
    }
    
    if(count == 4){
        return true; // if the value of count variable is exactly 4 it returns two
    }

   return false 
}

// twoPair(hand1);