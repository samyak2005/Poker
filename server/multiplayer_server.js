const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");
const { getDeck } = require('./deck');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:5173", // Vite dev server
    methods: ["GET", "POST"]
  }
});

app.use(cors());
app.use(express.json());

// Game state management
const rooms = new Map();
const players = new Map();

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
  });
  
  // Deal 5 community cards
  room.communityCards = deck.splice(0, 5);
  room.deck = deck;
  
  return room;
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
          gameStarted: false,
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
      chips: 1000,
      bet: 0,
      folded: false,
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
    room.currentTurn = 0;
    room.pot = 0;
    
    // Deal cards
    const gameState = dealCards(roomId);
    
    // Send game state to all players
    io.to(roomId).emit("gameStarted", {
      players: gameState.players,
      communityCards: gameState.communityCards,
      currentTurn: gameState.currentTurn,
      pot: gameState.pot
    });
    
    console.log(`Game started in room ${roomId}`);
  });

  // Player action (call, raise, fold)
  socket.on("playerAction", ({ roomId, action, amount }) => {
    const room = rooms.get(roomId);
    if (!room || !room.gameStarted) return;
    
    const playerData = players.get(socket.id);
    if (!playerData) return;
    
    const player = room.players[playerData.playerIndex];
    if (!player) return;
    
    // Handle player action
    switch (action) {
      case "call":
        player.bet = amount;
        player.chips -= amount;
        room.pot += amount;
        break;
      case "raise":
        player.bet = amount;
        player.chips -= amount;
        room.pot += amount;
        break;
      case "fold":
        player.folded = true;
        break;
    }
    
    // Move to next player
    room.currentTurn = (room.currentTurn + 1) % room.players.length;
    
    // Notify all players
    io.to(roomId).emit("playerAction", {
      playerId: socket.id,
      action,
      amount,
      currentTurn: room.currentTurn,
      pot: room.pot,
      players: room.players
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

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`Multiplayer server running on port ${PORT}`);
}); 