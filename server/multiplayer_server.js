const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");
const { getDeck } = require('./deck');
const { findBestHand } = require('./Main_working/best_hand');

// Load environment variables
require('dotenv').config();

const app = express();
const server = http.createServer(app);

// Get client URL from environment or use default
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";

const io = socketIo(server, {
  cors: {
    origin: CLIENT_URL,
    methods: ["GET", "POST"]
  }
});

app.use(cors({
  origin: CLIENT_URL,
  credentials: true
}));
app.use(express.json());

// Game state management
const rooms = new Map();
const players = new Map();

// Game constants
const SMALL_BLIND = 10;
const BIG_BLIND = 20;
const STARTING_CHIPS = 1000;

// Fisher-Yates shuffle
function shuffle(deck) {
  const arr = [...deck];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Deal cards for a room
function dealCards(roomId) {
  const deck = shuffle(getDeck());
  const room = rooms.get(roomId);
  
  // Deal 2 cards to each player
  room.players.forEach((player, index) => {
    player.cards = deck.splice(0, 2);
    player.folded = false;
    player.bet = 0;
    player.hasActed = false;
  });
  
  // Deal 5 community cards
  room.communityCards = deck.splice(0, 5);
  room.deck = deck;
  
  return room;
}

// Post blinds
function postBlinds(room) {
  const smallBlindIndex = (room.dealerIndex + 1) % room.players.length;
  const bigBlindIndex = (room.dealerIndex + 2) % room.players.length;
  
  // Post small blind
  room.players[smallBlindIndex].bet = SMALL_BLIND;
  room.players[smallBlindIndex].chips -= SMALL_BLIND;
  room.players[smallBlindIndex].hasActed = true;
  
  // Post big blind
  room.players[bigBlindIndex].bet = BIG_BLIND;
  room.players[bigBlindIndex].chips -= BIG_BLIND;
  room.players[bigBlindIndex].hasActed = true;
  
  room.pot = SMALL_BLIND + BIG_BLIND;
  room.currentBet = BIG_BLIND;
  room.minimumRaise = BIG_BLIND;
  
  return { smallBlindIndex, bigBlindIndex };
}

// Get current bet amount for a player
function getCurrentBetAmount(room, player) {
  return room.currentBet - player.bet;
}

// Check if betting round is complete
function isBettingRoundComplete(room) {
  const activePlayers = room.players.filter(p => !p.folded);
  const playersWithEqualBets = activePlayers.filter(p => p.bet === room.currentBet);
  const allPlayersActed = activePlayers.every(p => p.hasActed);
  
  return allPlayersActed && playersWithEqualBets.length === activePlayers.length;
}

// Move to next betting round
function nextBettingRound(room) {
  room.bettingRound++;
  room.currentBet = 0;
  room.minimumRaise = BIG_BLIND;
  
  // Reset player bets and actions
  room.players.forEach(player => {
    player.bet = 0;
    player.hasActed = false;
  });
  
  // Deal community cards based on round
  switch (room.bettingRound) {
    case 1: // Flop
      room.communityCards = room.deck.splice(0, 3);
      break;
    case 2: // Turn
      room.communityCards.push(room.deck.splice(0, 1)[0]);
      break;
    case 3: // River
      room.communityCards.push(room.deck.splice(0, 1)[0]);
      break;
    case 4: // Showdown
      determineWinner(room);
      return;
  }
  
  // Set first player to act (left of dealer for pre-flop, first player for others)
  if (room.bettingRound === 0) {
    room.currentTurn = (room.dealerIndex + 3) % room.players.length; // UTG
  } else {
    room.currentTurn = (room.dealerIndex + 1) % room.players.length; // Small blind
  }
  
  // Skip folded players
  while (room.players[room.currentTurn].folded) {
    room.currentTurn = (room.currentTurn + 1) % room.players.length;
  }
}

// Determine winner
function determineWinner(room) {
  const activePlayers = room.players.filter(p => !p.folded);
  
  if (activePlayers.length === 1) {
    // Last player standing wins
    const winner = activePlayers[0];
    winner.chips += room.pot;
    room.pot = 0;
    
    io.to(room.id).emit("gameEnd", {
      winner: winner,
      pot: room.pot,
      players: room.players
    });
    
    // Start new hand
    setTimeout(() => startNewHand(room), 3000);
    return;
  }
  
  // Helper function to get hand name
  const getHandName = (priority) => {
    const handNames = {
      1: 'Royal Flush',
      2: 'Straight Flush', 
      3: 'Four of a Kind',
      4: 'Full House',
      5: 'Flush',
      6: 'Straight',
      7: 'Three of a Kind',
      8: 'Two Pair',
      9: 'One Pair',
      10: 'High Card'
    };
    return handNames[priority] || 'Unknown';
  };

  // Evaluate hands
  const playerHands = activePlayers.map(player => {
    const hand = findBestHand(player.cards, room.communityCards);
    
    return {
      player,
      hand,
      priority: hand.priority,
      cards: hand.hand, // Use hand.hand instead of hand.cards
      handName: getHandName(hand.priority)
    };
  });
  
  // Sort by hand strength (lowest priority number = best hand)
  playerHands.sort((a, b) => a.priority - b.priority);
  
  // Find players with the best priority
  const bestPriority = playerHands[0].priority;
  const playersWithBestHand = playerHands.filter(hand => hand.priority === bestPriority);
  
  // If only one player has the best hand, they win
  if (playersWithBestHand.length === 1) {
    const winner = playersWithBestHand[0];
    winner.player.chips += room.pot;
    room.pot = 0;
    
    io.to(room.id).emit("gameEnd", {
      winner: winner,
      pot: room.pot,
      players: room.players,
      playerHands: playerHands
    });
    
    setTimeout(() => startNewHand(room), 8000);
    return;
  }
  
  // Multiple players with same hand - need tie breaking
  // Import tie breaker
  const { TieBreaker } = require('./Main_working/Tie_Breaker');
  
  // Use tie breaker to find the best hand among tied players
  let bestHand = playersWithBestHand[0];
  
  for (let i = 1; i < playersWithBestHand.length; i++) {
    if (!bestHand.cards || !playersWithBestHand[i].cards) {
      continue;
    }
    
    const winner = TieBreaker(bestPriority, bestHand.cards, playersWithBestHand[i].cards);
    if (winner === playersWithBestHand[i].cards) {
      bestHand = playersWithBestHand[i];
    }
  }
  
  // Find all players with the same best hand after tie breaking
  const winners = playersWithBestHand.filter(hand => {
    const comparison = TieBreaker(bestPriority, bestHand.cards, hand.cards);
    return comparison === hand.cards; // If tie breaker returns this hand, it's a winner
  });
  
  // Split pot among winners
  const splitAmount = Math.floor(room.pot / winners.length);
  
  winners.forEach(winner => {
    winner.player.chips += splitAmount;
  });
  
  room.pot = 0;
  
  io.to(room.id).emit("gameEnd", {
    winners: winners,
    pot: room.pot,
    players: room.players,
    playerHands: playerHands // Include all player hands for debugging
  });
  
  // Start new hand
  setTimeout(() => startNewHand(room), 8000);
}

// Start new hand
function startNewHand(room) {
  // Rotate dealer
  room.dealerIndex = (room.dealerIndex + 1) % room.players.length;
  
  // Reset game state
  room.bettingRound = 0; // Pre-flop
  room.currentBet = 0;
  room.minimumRaise = BIG_BLIND;
  room.pot = 0;
  room.currentTurn = 0;
  
  // Deal new cards
  const gameState = dealCards(room.id);
  
  // Post blinds
  const { smallBlindIndex, bigBlindIndex } = postBlinds(room);
  
  // Set first player to act (UTG)
  room.currentTurn = (room.dealerIndex + 3) % room.players.length;
  
  io.to(room.id).emit("newHand", {
    players: gameState.players,
    communityCards: [],
    currentTurn: room.currentTurn,
    pot: room.pot,
    currentBet: room.currentBet,
    minimumRaise: room.minimumRaise,
    bettingRound: room.bettingRound,
    dealerIndex: room.dealerIndex
  });
}

// Socket connection handling
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // Join a room
  socket.on("joinRoom", ({ roomId, playerName, avatar }) => {
    console.log(`Player ${playerName} joining room ${roomId}`);
    
    // Create room if it doesn't exist
    if (!rooms.has(roomId)) {
      rooms.set(roomId, {
        id: roomId,
        players: [],
        communityCards: [],
        deck: [],
        currentTurn: 0,
        pot: 0,
        currentBet: 0,
        minimumRaise: BIG_BLIND,
        bettingRound: 0, // 0=pre-flop, 1=flop, 2=turn, 3=river, 4=showdown
        gameStarted: false,
        dealerIndex: 0,
        maxPlayers: 7
      });
    }
    
    const room = rooms.get(roomId);
    
    // Check if room is full
    if (room.players.length >= room.maxPlayers) {
      socket.emit("roomFull", { message: "Room is full" });
      return;
    }
    
    // Add player to room
    const player = {
      id: socket.id,
      name: playerName,
      avatar: avatar,
      cards: [],
      chips: STARTING_CHIPS,
      bet: 0,
      folded: false,
      hasActed: false,
      isDealer: room.players.length === 0
    };
    
    room.players.push(player);
    players.set(socket.id, { roomId, playerIndex: room.players.length - 1 });
    
    // Join socket room
    socket.join(roomId);
    
    // Notify all players in room
    io.to(roomId).emit("playerJoined", {
      player,
      players: room.players,
      roomId
    });
    
    console.log(`Player ${playerName} joined room ${roomId}. Total players: ${room.players.length}`);
  });

  // Start game
  socket.on("startGame", ({ roomId }) => {
    const room = rooms.get(roomId);
    if (!room) return;
    
    if (room.players.length < 2) {
      socket.emit("gameError", { message: "Need at least 2 players to start" });
      return;
    }
    
    room.gameStarted = true;
    room.bettingRound = 0;
    room.pot = 0;
    room.currentBet = 0;
    room.minimumRaise = BIG_BLIND;
    
    // Deal cards
    const gameState = dealCards(roomId);
    
    // Post blinds
    const { smallBlindIndex, bigBlindIndex } = postBlinds(room);
    
    // Set first player to act (UTG)
    room.currentTurn = (room.dealerIndex + 3) % room.players.length;
    
    // Send game state to all players
    io.to(roomId).emit("gameStarted", {
      players: gameState.players,
      communityCards: [],
      currentTurn: room.currentTurn,
      pot: room.pot,
      currentBet: room.currentBet,
      minimumRaise: room.minimumRaise,
      bettingRound: room.bettingRound,
      dealerIndex: room.dealerIndex
    });
    
    console.log(`Game started in room ${roomId}`);
  });

  // Player action (check, call, raise, fold)
  socket.on("playerAction", ({ roomId, action, amount }) => {
    const room = rooms.get(roomId);
    if (!room || !room.gameStarted) {
      return;
    }
    
    const playerData = players.get(socket.id);
    if (!playerData) {
      return;
    }
    
    const player = room.players[playerData.playerIndex];
    if (!player || player.folded) {
      return;
    }
    
    // Check if it's player's turn
    if (room.currentTurn !== playerData.playerIndex) {
      socket.emit("gameError", { message: "Not your turn" });
      return;
    }
    
    const currentBetAmount = getCurrentBetAmount(room, player);
    
    // Handle player action
    switch (action) {
      case "check":
        if (currentBetAmount > 0) {
          socket.emit("gameError", { message: "Cannot check when there's a bet to call" });
          return;
        }
        break;
        
      case "call":
        if (amount > player.chips) {
          socket.emit("gameError", { message: "Not enough chips" });
          return;
        }
        player.chips -= amount;
        player.bet += amount;
        room.pot += amount;
        break;
        
      case "raise":
        if (amount < room.minimumRaise) {
          socket.emit("gameError", { message: `Minimum raise is ${room.minimumRaise}` });
          return;
        }
        if (amount > player.chips) {
          socket.emit("gameError", { message: "Not enough chips" });
          return;
        }
        player.chips -= amount;
        player.bet += amount;
        room.pot += amount;
        room.currentBet = player.bet;
        room.minimumRaise = amount - room.currentBet + room.minimumRaise;
        break;
        
      case "fold":
        player.folded = true;
        break;
        
      default:
        socket.emit("gameError", { message: "Invalid action" });
        return;
    }
    
    player.hasActed = true;
    
    // Move to next player
    do {
      room.currentTurn = (room.currentTurn + 1) % room.players.length;
    } while (room.players[room.currentTurn].folded);
    
    // Check if betting round is complete
    if (isBettingRoundComplete(room)) {
      nextBettingRound(room);
    }
    
    // Notify all players
    io.to(roomId).emit("playerAction", {
      playerId: socket.id,
      action,
      amount,
      currentTurn: room.currentTurn,
      pot: room.pot,
      currentBet: room.currentBet,
      minimumRaise: room.minimumRaise,
      bettingRound: room.bettingRound,
      players: room.players,
      communityCards: room.communityCards
    });
  });

  // Disconnect handling
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
    
    const playerData = players.get(socket.id);
    if (playerData) {
      const room = rooms.get(playerData.roomId);
      if (room) {
        // Remove player from room
        room.players.splice(playerData.playerIndex, 1);
        
        // Update player indices
        room.players.forEach((player, index) => {
          const playerSocketData = players.get(player.id);
          if (playerSocketData) {
            playerSocketData.playerIndex = index;
          }
        });
        
        // Notify remaining players
        io.to(playerData.roomId).emit("playerLeft", {
          playerId: socket.id,
          players: room.players
        });
        
        // Remove room if empty
        if (room.players.length === 0) {
          rooms.delete(playerData.roomId);
        }
      }
      
      players.delete(socket.id);
    }
  });
});

// Get available rooms
app.get("/api/rooms", (req, res) => {
  const roomList = Array.from(rooms.values()).map(room => ({
    id: room.id,
    playerCount: room.players.length,
    maxPlayers: room.maxPlayers,
    gameStarted: room.gameStarted
  }));
  
  res.json({ rooms: roomList });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Multiplayer server running on port ${PORT}`);
  console.log(`Accepting connections from: ${CLIENT_URL}`);
}); 