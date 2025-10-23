# 🎮 Dual Server Setup - Important!

## Why Two Servers?

Your ChipInn Poker project has **TWO game modes**, each requiring a different backend:

### 1. **Single Player / Practice Mode** (Port 3000)
- **File**: `server/best-hand_API.js`
- **Purpose**: REST API for single-player poker game
- **Endpoints**:
  - `GET /api/shuffle-and-deal` - Deal cards for practice game
  - `POST /hand-array` - Evaluate poker hands
  - `POST /end-game` - Determine winner

### 2. **Multiplayer Mode** (Port 3001)
- **File**: `server/multiplayer_server.js`
- **Purpose**: Real-time multiplayer game with Socket.IO
- **Features**:
  - WebSocket connections
  - Room management
  - Turn-based gameplay
  - Live player updates

---

## 🚀 Running Both Servers

### Development (Local)

**Option 1: Combined Server (Recommended)**
```bash
cd server
npm start
```
This runs `combined_server.js` which starts **both** servers automatically!

**Option 2: Run Separately**
```bash
# Terminal 1 - API Server
cd server
npm run api

# Terminal 2 - Multiplayer Server
cd server
npm run multiplayer
```

---

## 📦 What Changed?

### New Files Created:
- ✅ `server/combined_server.js` - Runs both servers together
- ✅ Updated `server/best-hand_API.js` - Added environment variable support
- ✅ Updated `client/src/config.js` - Added POKER_API_URL config
- ✅ Updated `client/src/components/pages/MainGameRoom.jsx` - Uses config

### Updated Commands:
```json
{
  "start": "node combined_server.js",     // Runs BOTH servers
  "api": "node best-hand_API.js",         // API server only
  "multiplayer": "node multiplayer_server.js", // Multiplayer only
  "dev": "node combined_server.js"        // Same as start
}
```

---

## 🌐 Deployment

When deploying to Railway/Render:

1. **Use `npm start`** as the start command
2. Railway will expose both ports through the **same domain**
3. The domain works for both APIs automatically!

### Environment Variables Needed:

**Server** (.env):
```env
PORT=3001          # Multiplayer server port
API_PORT=3000      # API server port
CLIENT_URL=https://your-frontend.vercel.app
NODE_ENV=production
```

**Client** (.env):
```env
VITE_API_URL=https://your-backend.railway.app         # Multiplayer
VITE_POKER_API_URL=https://your-backend.railway.app   # Game API
```

> **Note**: Both URLs point to the same domain! Railway handles routing to the correct port.

---

## 🔍 Testing

Test both servers are running:

```bash
# Terminal 1 - Start backend
cd server
npm start

# Terminal 2 - Test API server (port 3000)
curl http://localhost:3000/api/shuffle-and-deal

# Terminal 3 - Test multiplayer server (port 3001)
# (Visit http://localhost:5173 after starting frontend)
```

---

## 📊 Server Architecture

```
┌─────────────────────────────────────┐
│     Combined Server (npm start)     │
├─────────────────┬───────────────────┤
│                 │                   │
│  Port 3000      │    Port 3001      │
│  API Server     │  Multiplayer      │
│  (REST)         │  (Socket.IO)      │
│                 │                   │
│  • Shuffle      │  • Join Room      │
│  • Deal         │  • Game Actions   │
│  • Evaluate     │  • Turn Updates   │
│                 │  • Chat           │
└─────────────────┴───────────────────┘
```

---

## ✅ Summary

- **Development**: Just run `npm start` in server folder
- **Production**: Railway runs `npm start` and handles both ports
- **Client**: Set both `VITE_API_URL` and `VITE_POKER_API_URL` to the same backend URL
- **No extra work needed!** Everything is configured to work seamlessly

---

**Ready to deploy?** Check [QUICK_START.md](./QUICK_START.md) for deployment steps!
