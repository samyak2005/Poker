const express = require("express");
const cors = require("cors");
const { getDeck } = require('./deck');
const pokerApi = express();
const PORT = 3000;


pokerApi.use(cors());
pokerApi.use(express.json());

// Fisher-Yates shuffle
function shuffle(deck) {
    const arr = [...deck];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

// Deal cards: 2 to user, 5 to flop, 2 to computer
function deal() {
    const deck = shuffle(getDeck());
    const userCards = deck.splice(0, 2);
    const flopCards = deck.splice(0, 5);
    const compCards = deck.splice(0, 2);
    return { userCards, flopCards, compCards };
}

// Express handler
function shuffleAndDealHandler(req, res) {
    const { userCards, flopCards, compCards } = deal();
    // console.log({ userCards, flopCards, compCards });
    res.json({ userCards, flopCards, compCards });
}

module.exports = { shuffleAndDealHandler, deal }; 