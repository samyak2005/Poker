const { findBestHand } = require("./Main_working/best_hand");
const { END_WINNING } = require("./END");
const { shuffleAndDealHandler } = require("./shuffle_and_deal");
const express = require("express");
const cors = require('cors');

// Load environment variables
require('dotenv').config();

const pokerApi = express();

// Get configuration from environment or use defaults
const PORT = process.env.API_PORT || 3000;
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";

pokerApi.use(cors({
  origin: CLIENT_URL,
  credentials: true
}));
pokerApi.use(express.json());

pokerApi.post("/hand-array", (req, res) => {
  const { usercards, flopcards } = req.body;

  if (!Array.isArray(usercards) || !Array.isArray(flopcards)) {
    return res.status(400).json({ error: "Input should be an array" });
  }

  const ans = findBestHand(usercards, flopcards);

  res.json({ result: ans });
});

pokerApi.post("/end-game", (req, res) => {
  const { priority1, hand1, priority2, hand2 } = req.body;

  if (!Array.isArray(hand1) || !Array.isArray(hand2)) {
    return res.status(400).json({ error: "Input should be an array" });
  }

  if (!Number.isInteger(priority1) || !Number.isInteger(priority2)) {
    return res.status(400).json({ error: "Input should be a number" });
  }

  const ans = END_WINNING(priority1, hand1, priority2, hand2);

  res.json({ result: ans });
});

// New endpoint for shuffling and dealing cards
pokerApi.get("/api/shuffle-and-deal", shuffleAndDealHandler);

pokerApi.listen(PORT, () => {
  console.log(`Poker API server running on port ${PORT}`);
  console.log(`Accepting connections from: ${CLIENT_URL}`);
});
