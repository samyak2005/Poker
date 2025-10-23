# 🚀 Quick Start Guide - Deploy in 10 Minutes!

## Option 1: Railway (Recommended - Free & Easy)

### Step 1: Push to GitHub
```bash
cd /Users/samyak/Desktop/Poker
git add .
git commit -m "Ready for deployment"
git push origin main
```

### Step 2: Deploy Backend to Railway
1. Go to https://railway.app
2. Sign up with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your Poker repository
5. Railway will detect Node.js - click "Add variables"
   - Skip for now, we'll add after frontend is deployed
6. Click "Deploy"
7. **Copy your Railway URL** (looks like: `poker-production-abc123.up.railway.app`)

### Step 3: Deploy Frontend to Vercel
1. Go to https://vercel.com
2. Sign up with GitHub
3. Click "Add New" → "Project"
4. Import your Poker repository
5. Configure:
   - Root Directory: `client`
   - Build Command: `npm run build`
   - Output Directory: `dist`
6. Add Environment Variable:
   - Name: `VITE_API_URL`
   - Value: `https://YOUR-RAILWAY-URL` (from Step 2)
7. Click "Deploy"
8. **Copy your Vercel URL** (looks like: `your-poker.vercel.app`)

### Step 4: Update Backend Environment
1. Go back to Railway
2. Click on your service → "Variables"
3. Add:
   - Name: `CLIENT_URL`
   - Value: `https://YOUR-VERCEL-URL` (from Step 3)
4. Railway will auto-redeploy

> **Note**: Your backend runs TWO servers automatically (game API + multiplayer)!

### Step 5: Play!
Visit your Vercel URL and start playing! 🎉

---

## Option 2: All-in-One Railway

Deploy both frontend and backend on Railway:

1. Create **two services** in Railway from the same repo
2. **Service 1 (Backend)**:
   - Root Directory: `server`
   - Start Command: `npm run multiplayer`
   - Add variable: `CLIENT_URL` = (Service 2 URL)

3. **Service 2 (Frontend)**:
   - Root Directory: `client`
   - Build Command: `npm run build`
   - Start Command: `npx serve -s dist -l $PORT`
   - Add variable: `VITE_API_URL` = (Service 1 URL)

---

## 🐛 Troubleshooting

### "Failed to connect"
- Check that `VITE_API_URL` in Vercel matches your Railway URL
- Make sure both URLs use `https://`

### "CORS error"
- Check `CLIENT_URL` in Railway matches your Vercel URL exactly
- Redeploy backend after adding `CLIENT_URL`

### Still having issues?
Check deployment logs in Railway/Vercel dashboard

---

## 📝 Local Development

```bash
# Terminal 1 - Backend (runs BOTH game API + multiplayer)
cd server && npm start

# Terminal 2 - Frontend
cd client && npm run dev
```

Visit http://localhost:5173

> **Tip**: `npm start` runs both servers (ports 3000 & 3001) automatically!

---

**Need detailed instructions?** See [DEPLOYMENT.md](./DEPLOYMENT.md)
