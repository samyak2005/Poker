const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");
const { findBestHand } = require("./Main_working/best_hand");
const { END_WINNING } = require("./END");
const { shuffleAndDealHandler } = require("./shuffle_and_deal");
const { getDeck } = require('./deck');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: process.env.NODE_ENV === 'production' ? process.env.FRONTEND_URL : "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

app.use(cors());
app.use(express.json());



app.post("/hand-array", (req, res) => {
  const { usercards, flopcards } = req.body;

  if (!Array.isArray(usercards) || !Array.isArray(flopcards)) {
    return res.status(400).json({ error: "Input should be an array" });
  }

  const ans = findBestHand(usercards, flopcards);

  res.json({ result: ans });
});

app.post("/end-game", (req, res) => {
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

app.get("/api/shuffle-and-deal", shuffleAndDealHandler);

app.get("/api/rooms", (req, res) => {
  const roomList = Array.from(rooms.values()).map(room => ({
    id: room.id,
    playerCount: room.players.length,
    maxPlayers: room.maxPlayers,
    gameStarted: room.gameStarted
  }));
  
  res.json({ rooms: roomList });
});

const rooms = new Map();
const players = new Map();

const SMALL_BLIND = 10;
const BIG_BLIND = 20;
const STARTING_CHIPS = 1000;

function shuffle(deck) {
  const arr = [...deck];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function dealCards(roomId) {
  const deck = shuffle(getDeck());
  const room = rooms.get(roomId);
  
  room.players.forEach((player, index) => {
    player.cards = deck.splice(0, 2);
    player.folded = false;
    player.bet = 0;
    player.hasActed = false;
  });
  
  room.communityCards = deck.splice(0, 5);
  room.deck = deck;
  
  return room;
}

function postBlinds(room) {
  const smallBlindIndex = (room.dealerIndex + 1) % room.players.length;
  const bigBlindIndex = (room.dealerIndex + 2) % room.players.length;
  
  room.players[smallBlindIndex].bet = SMALL_BLIND;
  room.players[smallBlindIndex].chips -= SMALL_BLIND;
  room.players[smallBlindIndex].hasActed = true;
  
  room.players[bigBlindIndex].bet = BIG_BLIND;
  room.players[bigBlindIndex].chips -= BIG_BLIND;
  room.players[bigBlindIndex].hasActed = true;
  
  room.pot = SMALL_BLIND + BIG_BLIND;
  room.currentBet = BIG_BLIND;
  room.minimumRaise = BIG_BLIND;
  
  return { smallBlindIndex, bigBlindIndex };
}

function getCurrentBetAmount(room, player) {
  return room.currentBet - player.bet;
}
function isBettingRoundComplete(room) {
  const activePlayers = room.players.filter(p => !p.folded);
  const playersWithEqualBets = activePlayers.filter(p => p.bet === room.currentBet);
  const allPlayersActed = activePlayers.every(p => p.hasActed);
  
  return allPlayersActed && playersWithEqualBets.length === activePlayers.length;
}

function nextBettingRound(room) {
  room.bettingRound++;
  room.currentBet = 0;
  room.minimumRaise = BIG_BLIND;
  
  room.players.forEach(player => {
    player.bet = 0;
    player.hasActed = false;
  });
  
  if (room.bettingRound === 1) {
    room.revealedCards = 3;
  } else if (room.bettingRound === 2) {
    room.revealedCards = 4;
  } else if (room.bettingRound === 3) {
    room.revealedCards = 5;
  }
}

function determineWinner(room) {
  const activePlayers = room.players.filter(p => !p.folded);
  
  if (activePlayers.length === 1) {
    return {
      winner: {
        player: activePlayers[0],
        handName: "Last Player Standing"
      },
      pot: room.pot
    };
  }
  const playerHands = activePlayers.map(player => {
    const hand = findBestHand(player.cards, room.communityCards.slice(0, room.revealedCards));
    return {
      player,
      hand: hand.hand,
      priority: hand.priority,
      handName: getHandName(hand.priority)
    };
  });
  
  playerHands.sort((a, b) => a.priority - b.priority);
  
  const bestHand = playerHands[0];
  const tiedPlayers = playerHands.filter(hand => hand.priority === bestHand.priority);
  
  if (tiedPlayers.length === 1) {
    return {
      winner: bestHand,
      pot: room.pot
    };
  } else {
    const splitAmount = Math.floor(room.pot / tiedPlayers.length);
    return {
      winners: tiedPlayers.map(winner => ({
        ...winner,
        splitAmount
      })),
      pot: room.pot
    };
  }
}

function getHandName(priority) {
  const handNames = {
    1: "Royal Flush",
    2: "Straight Flush", 
    3: "Four of a Kind",
    4: "Full House",
    5: "Flush",
    6: "Straight",
    7: "Three of a Kind",
    8: "Two Pair",
    9: "One Pair",
    10: "High Card"
  };
  return handNames[priority] || "Unknown";
}

function startNewHand(room) {
  room.dealerIndex = (room.dealerIndex + 1) % room.players.length;
  
  room.bettingRound = 0;
  room.pot = 0;
  room.currentBet = 0;
  room.minimumRaise = BIG_BLIND;
  room.revealedCards = 0;
  room.communityCards = [];
  
  room.players.forEach(player => {
    player.cards = [];
    player.folded = false;
    player.bet = 0;
    player.hasActed = false;
  });
  
  dealCards(room.id);
  
  const { smallBlindIndex, bigBlindIndex } = postBlinds(room);
  
  room.currentTurnIndex = (bigBlindIndex + 1) % room.players.length;
  
  return { smallBlindIndex, bigBlindIndex };
}

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);
  
    socket.on('joinRoom', ({ roomId, playerName, avatar }) => {
    socket.join(roomId);
    
    if (!rooms.has(roomId)) {
      rooms.set(roomId, {
        id: roomId,
        players: [],
        gameStarted: false,
        dealerIndex: 0,
        currentTurnIndex: 0,
        bettingRound: 0,
        pot: 0,
        currentBet: 0,
        minimumRaise: BIG_BLIND,
        communityCards: [],
        revealedCards: 0,
        deck: [],
        maxPlayers: 7
      });
    }
    
    const room = rooms.get(roomId);
    
    if (room.players.length >= room.maxPlayers) {
      socket.emit('roomFull');
      return;
    }
    
    const player = {
      id: socket.id,
      name: playerName,
      avatar: avatar,
      chips: STARTING_CHIPS,
      bet: 0,
      folded: false,
      hasActed: false,
      cards: []
    };
    
    room.players.push(player);
    players.set(socket.id, { roomId, playerIndex: room.players.length - 1 });
    
    io.to(roomId).emit('playerJoined', {
      players: room.players.map(p => ({
        id: p.id,
        name: p.name,
        avatar: p.avatar,
        chips: p.chips,
        bet: p.bet,
        folded: p.folded
      })),
      gameStarted: room.gameStarted
    });
    
    console.log(`Player ${playerName} joined room ${roomId}`);
  });
  
  socket.on('startGame', () => {
    const playerData = players.get(socket.id);
    if (!playerData) return;
    
    const room = rooms.get(playerData.roomId);
    if (!room || room.gameStarted) return;
    
    if (room.players.length < 2) {
      socket.emit('error', { message: 'Need at least 2 players to start' });
      return;
    }
    
    try {
      room.gameStarted = true;
      
      dealCards(room.id);
      
      const { smallBlindIndex, bigBlindIndex } = postBlinds(room);
      
      room.currentTurnIndex = (bigBlindIndex + 1) % room.players.length;
      io.to(room.id).emit('gameStarted', {
        players: room.players.map(p => ({
          id: p.id,
          name: p.name,
          avatar: p.avatar,
          chips: p.chips,
          bet: p.bet,
          folded: p.folded
        })),
        communityCards: room.communityCards,
        pot: room.pot,
        currentBet: room.currentBet,
        minimumRaise: room.minimumRaise,
        bettingRound: room.bettingRound,
        currentTurnIndex: room.currentTurnIndex,
        dealerIndex: room.dealerIndex,
        smallBlindIndex,
        bigBlindIndex
      });
      
      console.log(`Game started in room ${room.id}`);
    } catch (error) {
      console.error('Error starting game:', error);
      socket.emit('error', { message: 'Failed to start game' });
    }
  });
  
  socket.on('playerAction', ({ action, amount }) => {
    const playerData = players.get(socket.id);
    if (!playerData) return;
    
    const room = rooms.get(playerData.roomId);
    if (!room || !room.gameStarted) return;
    const playerIndex = room.players.findIndex(p => p.id === socket.id);
    if (playerIndex === -1 || playerIndex !== room.currentTurnIndex) return;
    
    const player = room.players[playerIndex];
    
    switch (action) {
      case 'check':
        if (room.currentBet > player.bet) {
          socket.emit('error', { message: 'Cannot check when there is a bet to call' });
          return;
        }
        player.hasActed = true;
        break;
        
      case 'call':
        const callAmount = room.currentBet - player.bet;
        if (callAmount > player.chips) {
          socket.emit('error', { message: 'Not enough chips to call' });
          return;
        }
        player.chips -= callAmount;
        player.bet = room.currentBet;
        player.hasActed = true;
        room.pot += callAmount;
        break;
        
      case 'raise':
        if (amount < room.minimumRaise) {
          socket.emit('error', { message: `Raise must be at least $${room.minimumRaise}` });
          return;
        }
        if (amount > player.chips) {
          socket.emit('error', { message: 'Not enough chips to raise' });
          return;
        }
        const totalBet = player.bet + amount;
        player.chips -= amount;
        player.bet = totalBet;
        player.hasActed = true;
        room.pot += amount;
        room.currentBet = totalBet;
        room.minimumRaise = amount;
        
        room.players.forEach((p, index) => {
          if (index !== playerIndex) {
            p.hasActed = false;
          }
        });
        break;
        
      case 'fold':
        player.folded = true;
        player.hasActed = true;
        break;
    }
    
    do {
      room.currentTurnIndex = (room.currentTurnIndex + 1) % room.players.length;
    } while (room.players[room.currentTurnIndex].folded);
    
    if (isBettingRoundComplete(room)) {
      if (room.bettingRound >= 3) {
        const result = determineWinner(room);
        io.to(room.id).emit('gameEnd', result);
        setTimeout(() => {
          if (room.gameStarted) {
            const { smallBlindIndex, bigBlindIndex } = startNewHand(room);
            io.to(room.id).emit('newHand', {
              players: room.players.map(p => ({
                id: p.id,
                name: p.name,
                avatar: p.avatar,
                chips: p.chips,
                bet: p.bet,
                folded: p.folded
              })),
              communityCards: room.communityCards,
              pot: room.pot,
              currentBet: room.currentBet,
              minimumRaise: room.minimumRaise,
              bettingRound: room.bettingRound,
              currentTurnIndex: room.currentTurnIndex,
              dealerIndex: room.dealerIndex,
              smallBlindIndex,
              bigBlindIndex
            });
          }
        }, 3000);
      } else {
        nextBettingRound(room);
      }
    }
    io.to(room.id).emit('playerAction', {
      players: room.players.map(p => ({
        id: p.id,
        name: p.name,
        avatar: p.avatar,
        chips: p.chips,
        bet: p.bet,
        folded: p.folded
      })),
      pot: room.pot,
      currentBet: room.currentBet,
      minimumRaise: room.minimumRaise,
      bettingRound: room.bettingRound,
      currentTurnIndex: room.currentTurnIndex,
      communityCards: room.communityCards.slice(0, room.revealedCards)
    });
  });
  
  socket.on('disconnect', () => {
    const playerData = players.get(socket.id);
    if (playerData) {
      const room = rooms.get(playerData.roomId);
      if (room) {
        room.players = room.players.filter(p => p.id !== socket.id);
        
        if (room.players.length === 0) {
          rooms.delete(playerData.roomId);
        } else {
          io.to(playerData.roomId).emit('playerLeft', {
            players: room.players.map(p => ({
              id: p.id,
              name: p.name,
              avatar: p.avatar,
              chips: p.chips,
              bet: p.bet,
              folded: p.folded
            }))
          });
        }
      }
      players.delete(socket.id);
    }
    console.log('User disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`🚀 Merged Server running on port ${PORT}`);
  console.log(`📡 API endpoints available at http://localhost:${PORT}`);
  console.log(`🎮 Socket.IO multiplayer ready at ws://localhost:${PORT}`);
}); 