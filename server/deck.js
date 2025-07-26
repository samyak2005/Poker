// Utility to generate a standard 52-card deck as objects with rank and suit
const suits = ["hearts", "diamonds", "clubs", "spades"];
const ranks = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

function getDeck() {
    const deck = [];
    for (const suit of suits) {
        for (const rank of ranks) {
            deck.push({ rank, suit });
        }
    }
    return deck;
}

module.exports = { getDeck };  