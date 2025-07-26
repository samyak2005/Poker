# 🃏 ChipInn Poker - Multiplayer Texas Hold'em

A modern, real-time multiplayer poker game built with React, Node.js, and Socket.IO. Features beautiful Gen Z aesthetics, multiple themes, and advanced hand evaluation.

## ✨ Features

- **🎮 Real-time Multiplayer** - Up to 7 players per room
- **🎨 Multiple Themes** - Purple, Blue, Green, and Pink table themes
- **🤖 Advanced AI** - Professional hand evaluation and tie-breaking
- **💫 Modern UI** - Gen Z aesthetic with glass morphism and animations
- **🎯 Smart Betting** - Complete betting system with blinds, raises, and pot management
- **📱 Responsive Design** - Works on desktop and mobile devices

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd Poker
   ```

2. **Install dependencies**
   ```bash
   # Install client dependencies
   cd client
   npm install
   
   # Install server dependencies
   cd ../server
   npm install
   ```

3. **Start the development servers**
   ```bash
   # Start the merged server (API + Socket.IO)
   cd server
   npm run merged
   
   # In a new terminal, start the client
   cd client
   npm run dev
   ```

4. **Open your browser**
   - Frontend: http://localhost:5173
   - Backend: http://localhost:3001

## 🏗️ Project Structure

```
Poker/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   │   ├── gamerooms/  # Game room themes
│   │   │   ├── pages/      # Main pages
│   │   │   └── pageComponents/ # UI components
│   │   ├── config.js       # Environment configuration
│   │   └── App.jsx         # Main app component
│   └── package.json
├── server/                 # Node.js backend
│   ├── merged_server.js    # Combined API + Socket.IO server
│   ├── Main_working/       # Hand evaluation logic
│   ├── Priority_Functions/ # Poker hand detection
│   ├── Tie_Breaker_Functions/ # Tie-breaking logic
│   └── package.json
└── README.md
```

## 🌐 Deployment

### Frontend Deployment (Vercel/Netlify)

1. **Build the project**
   ```bash
   cd client
   npm run build
   ```

2. **Update environment variables**
   - Set `VITE_API_URL` to your backend URL
   - Set `VITE_SOCKET_URL` to your backend URL

3. **Deploy to your preferred platform**
   - **Vercel**: Connect your GitHub repo and deploy
   - **Netlify**: Drag and drop the `dist` folder

### Backend Deployment (Railway/Render/Heroku)

1. **Update the config file**
   ```javascript
   // In server/config.js, update production URLs
   production: {
     apiUrl: 'https://your-backend-domain.com',
     socketUrl: 'https://your-backend-domain.com'
   }
   ```

2. **Deploy to your preferred platform**
   - **Railway**: Connect your GitHub repo
   - **Render**: Connect your GitHub repo
   - **Heroku**: Use Heroku CLI or GitHub integration

3. **Set environment variables**
   - `PORT`: Your server port (usually auto-set)
   - `NODE_ENV`: `production`

### Environment Variables

**Frontend (.env)**
```env
VITE_API_URL=https://your-backend-domain.com
VITE_SOCKET_URL=https://your-backend-domain.com
```

**Backend (.env)**
```env
PORT=3001
NODE_ENV=production
```

## 🎯 Game Features

### Poker Hand Rankings
1. **Royal Flush** - A, K, Q, J, 10 of same suit
2. **Straight Flush** - Five consecutive cards of same suit
3. **Four of a Kind** - Four cards of same rank
4. **Full House** - Three of a kind + pair
5. **Flush** - Five cards of same suit
6. **Straight** - Five consecutive cards
7. **Three of a Kind** - Three cards of same rank
8. **Two Pair** - Two pairs of different ranks
9. **One Pair** - Two cards of same rank
10. **High Card** - Highest card wins

### Betting System
- **Small Blind**: $10
- **Big Blind**: $20
- **Starting Chips**: $1000 per player
- **Betting Rounds**: Pre-flop, Flop, Turn, River

## 🛠️ Technology Stack

### Frontend
- **React 19** - UI framework
- **Vite** - Build tool and dev server
- **TailwindCSS** - Styling framework
- **Socket.IO Client** - Real-time communication
- **React Router** - Navigation
- **FontAwesome** - Icons

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **Socket.IO** - Real-time communication
- **Custom Poker Logic** - Hand evaluation and game rules

## 🎨 Themes

The game features four beautiful themes:
- **Purple Theme** - Classic poker atmosphere
- **Blue Theme** - Modern casino vibes
- **Green Theme** - Traditional felt table
- **Pink Theme** - Vibrant and energetic

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🎮 How to Play

1. **Enter the lobby** - Choose your avatar and theme
2. **Join or create a room** - Wait for other players
3. **Start the game** - Cards are dealt automatically
4. **Place your bets** - Check, call, raise, or fold
5. **Win the pot** - Best hand takes all!

## 🐛 Troubleshooting

### Common Issues

1. **Socket connection failed**
   - Check if the backend server is running
   - Verify the SOCKET_URL in config.js

2. **API calls failing**
   - Ensure the backend is accessible
   - Check CORS settings on the server

3. **Build errors**
   - Clear node_modules and reinstall
   - Check Node.js version compatibility

### Support

For issues and questions, please open an issue on GitHub.

---

**Made with ❤️ for poker enthusiasts everywhere!** 