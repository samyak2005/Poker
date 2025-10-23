# 🚀 ChipInn Poker - Deployment Guide

This guide will help you deploy your multiplayer poker game to the cloud.

## 📋 Prerequisites

- Git repository (push your code to GitHub)
- Accounts on:
  - **Railway** or **Render** (for backend)
  - **Vercel** or **Netlify** (for frontend)

---

## 🎯 Recommended Deployment Strategy

### Option 1: Railway (Backend) + Vercel (Frontend) - **EASIEST**
- Free tier available
- Automatic deployments from GitHub
- Great for WebSocket support

### Option 2: Render (Backend) + Netlify (Frontend)
- Alternative free option
- Similar features

---

## 🔧 Step 1: Prepare Your Code

### 1.1 Create Environment Files

**Server** (`/server/.env`):
```env
PORT=3001
API_PORT=3000
CLIENT_URL=https://your-frontend-url.vercel.app
NODE_ENV=production
```

**Client** (`/client/.env`):
```env
VITE_API_URL=https://your-backend-url.railway.app
VITE_POKER_API_URL=https://your-backend-url.railway.app
```

> **Note**: Your backend runs TWO servers on different ports (3000 for game API, 3001 for multiplayer Socket.IO). When deployed, Railway will expose both through the same domain.

### 1.2 Push to GitHub

```bash
cd /Users/samyak/Desktop/Poker
git add .
git commit -m "Prepare for deployment"
git push origin main
```

---

## 🖥️ Step 2: Deploy Backend (Railway)

### 2.1 Sign Up & Create Project
1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your `Poker` repository

### 2.2 Configure Backend Service
1. Railway will auto-detect your Node.js app
2. Set **Root Directory** to `server`
3. Set **Start Command** to `npm start` (this runs both servers!)
4. Add environment variables in Railway dashboard:
   - `CLIENT_URL` = (leave empty for now, we'll add it after deploying frontend)
   - `NODE_ENV` = `production`

### 2.3 Deploy
1. Click "Deploy"
2. Wait for deployment to complete
3. Copy your backend URL (e.g., `https://your-app.railway.app`)

> **Important**: The backend runs BOTH game servers:
> - Port 3000: REST API for single-player mode
> - Port 3001: Socket.IO for multiplayer mode
> Railway automatically handles both ports!

---

## 🌐 Step 3: Deploy Frontend (Vercel)

### 3.1 Sign Up & Import Project
1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub
3. Click "Add New" → "Project"
4. Import your `Poker` repository

### 3.2 Configure Frontend
1. Set **Root Directory** to `client`
2. Framework Preset: **Vite**
3. Build Command: `npm run build`
4. Output Directory: `dist`

### 3.3 Add Environment Variables
In Vercel dashboard, add BOTH:
- `VITE_API_URL` = `https://your-backend-url.railway.app` (Multiplayer server)
- `VITE_POKER_API_URL` = `https://your-backend-url.railway.app` (Game API server)

### 3.4 Deploy
1. Click "Deploy"
2. Wait for deployment
3. Copy your frontend URL (e.g., `https://your-app.vercel.app`)

---

## 🔄 Step 4: Update Backend with Frontend URL

1. Go back to Railway dashboard
2. Add environment variable:
   - `CLIENT_URL` = `https://your-app.vercel.app` (from Step 3)
3. Redeploy backend (Railway will auto-redeploy)

---

## ✅ Step 5: Test Your Deployment

1. Visit your Vercel URL
2. Create a room
3. Open another browser/incognito window
4. Join the room
5. Start playing!

---

## 🛠️ Alternative: Deploy Both on Railway

If you prefer keeping everything in one place:

1. Create **two services** in Railway:
   - Service 1: Backend (root: `server`)
   - Service 2: Frontend (root: `client`, add build command: `npm run build && npm install -g serve && serve -s dist -l $PORT`)

2. Set environment variables for each service

---

## 📝 Important Notes

### CORS Issues?
Make sure your `CLIENT_URL` in backend matches your actual frontend URL (including https://)

### WebSocket Connection Issues?
- Railway and Render support WebSockets by default
- Make sure your frontend is using `https://` (not `http://`)

### Build Failures?
- Check that `node_modules` is in `.gitignore`
- Ensure `package.json` has correct dependencies
- Check build logs in deployment dashboard

---

## 🔥 Quick Deploy Commands

### Local Development
```bash
# Terminal 1 - Backend (runs BOTH servers)
cd server
npm install
npm start

# Terminal 2 - Frontend
cd client
npm install
npm run dev
```

> **Note**: `npm start` in the server folder now runs **both** the game API (port 3000) AND multiplayer server (port 3001)!

### Update Environment Variables
```bash
# Server
echo "PORT=3001" > server/.env
echo "CLIENT_URL=https://your-frontend.vercel.app" >> server/.env

# Client
echo "VITE_API_URL=https://your-backend.railway.app" > client/.env
```

---

## 🎉 Done!

Your ChipInn Poker game is now live! Share the Vercel URL with friends and start playing!

## 📊 Free Tier Limits

- **Railway**: 500 hours/month, $5 credit
- **Vercel**: Unlimited deployments, 100GB bandwidth
- **Render**: 750 hours/month (one instance)

---

## 🐛 Troubleshooting

### Frontend can't connect to backend
- Check `VITE_API_URL` is correct
- Verify backend is running (visit backend URL)
- Check browser console for CORS errors

### Backend crashes
- Check Railway/Render logs
- Verify `package.json` has all dependencies
- Ensure `dotenv` is installed

### Socket connection fails
- Verify WebSocket support is enabled
- Check that you're using `https://` URLs
- Clear browser cache and try again

---

Need help? Check the logs in your deployment dashboards!
