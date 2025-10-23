# 🃏 ChipInn Poker - Multiplayer Texas Hold'em

A beautiful, real-time multiplayer Texas Hold'em poker game built with React, Node.js, and Socket.IO.

![ChipInn Poker](https://img.shields.io/badge/poker-texas%20hold'em-red)
![React](https://img.shields.io/badge/react-19.0.0-blue)
![Node.js](https://img.shields.io/badge/node.js-express-green)
![Socket.IO](https://img.shields.io/badge/socket.io-realtime-yellow)

## ✨ Features

- 🎮 **Real-time Multiplayer** - Play with up to 7 players
- 🎨 **4 Beautiful Themes** - Purple, Blue, Green, Pink
- 🃏 **Full Poker Logic** - Complete hand evaluation with tie-breaking
- 👥 **Room System** - Create or join custom rooms
- 🎭 **Avatar Selection** - Choose from 6 different avatars
- 🏆 **Winner Detection** - Automatic hand comparison and pot distribution
- 📱 **Responsive Design** - Beautiful UI with Tailwind CSS
- ⚡ **Fast & Smooth** - WebSocket-based real-time communication

## 🎯 Game Features

- Standard Texas Hold'em rules
- Small blind: 10, Big blind: 20
- Starting chips: 1000
- Actions: Check, Call, Raise, Fold
- Betting rounds: Pre-flop, Flop, Turn, River, Showdown
- Complete hand rankings (Royal Flush to High Card)
- Split pot support for ties

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Local Development

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd Poker
   ```

2. **Install dependencies**
   ```bash
   # Install server dependencies
   cd server
   npm install

   # Install client dependencies
   cd ../client
   npm install
   ```

3. **Start the servers**

   **Terminal 1 - Backend (runs BOTH game API + multiplayer):**
   ```bash
   cd server
   npm start
   ```

   **Terminal 2 - Frontend:**
   ```bash
   cd client
   npm run dev
   ```

   > **Note**: The backend runs TWO servers automatically:
   > - Port 3000: Game API (single-player mode)
   > - Port 3001: Multiplayer server (Socket.IO)
   >
   > See [DUAL_SERVER_SETUP.md](./DUAL_SERVER_SETUP.md) for details

4. **Play!**
   - Open http://localhost:5173
   - Create a room or join an existing one
   - Share the room ID with friends!

## 📦 Project Structure

```
Poker/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── gamerooms/      # Theme-specific game rooms
│   │   │   ├── pages/          # Main pages
│   │   │   └── pageComponents/ # Reusable UI components
│   │   ├── config.js           # API configuration
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── public/                 # Static assets (cards, avatars)
│   └── package.json
│
├── server/                 # Node.js backend
│   ├── Main_working/          # Poker hand evaluation
│   │   ├── best_hand.js       # Find best 5-card hand
│   │   ├── evaluate_hand.js   # Rank hands (1-10)
│   │   ├── generate_Combinations.js
│   │   └── Tie_Breaker.js
│   ├── Priority_Functions/    # Hand checking logic
│   ├── Tie_Breaker_Functions/ # Tie-breaking logic
│   ├── multiplayer_server.js  # Main game server
│   ├── deck.js                # Card deck utilities
│   └── package.json
│
├── DEPLOYMENT.md          # Deployment instructions
└── README.md             # This file
```

## 🌐 Deployment

Ready to deploy? Check out [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions on deploying to:

- **Railway** (Backend)
- **Vercel** (Frontend)
- **Render** (Alternative)

### Quick Deploy

1. Push to GitHub
2. Deploy backend to Railway
3. Deploy frontend to Vercel
4. Set environment variables
5. Play online! 🎉

## 🛠️ Tech Stack

### Frontend
- React 19
- Vite
- Tailwind CSS
- Socket.IO Client
- React Router
- FontAwesome Icons
- React Confetti

### Backend
- Node.js
- Express.js
- Socket.IO
- CORS
- dotenv

## 🎮 How to Play

1. **Join/Create Room** - Enter your name, pick an avatar and theme
2. **Wait for Players** - Minimum 2 players needed
3. **Start Game** - First player can start the game
4. **Play Poker** - Standard Texas Hold'em rules
   - Pre-flop: 2 hole cards
   - Flop: 3 community cards
   - Turn: 1 more community card
   - River: Final community card
   - Showdown: Best hand wins!

## 📝 Environment Variables

### Server (.env)
```env
PORT=3001
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

### Client (.env)
```env
VITE_API_URL=http://localhost:3001
```

## 🐛 Known Issues

- No turn timer (players can take unlimited time)
- No all-in support
- No side pots for complex betting
- Game state resets on server restart (no persistence)

## 🚧 Planned Features

- [ ] Turn timer with auto-fold
- [ ] All-in support
- [ ] Side pots
- [ ] Chat system
- [ ] Sound effects
- [ ] Game history
- [ ] Player statistics
- [ ] Spectator mode
- [ ] Tournament mode

## 🤝 Contributing

Feel free to contribute! This is a learning project.

## 📄 License

MIT License - Feel free to use this project for learning!

## 🎉 Credits

Built with ❤️ using React, Node.js, and Socket.IO

---

**Enjoy the game! May the best hand win! 🃏**
