# ✅ Deployment Checklist

Use this checklist to deploy ChipInn Poker step by step.

## 🔧 Pre-Deployment

- [x] Server configured with environment variables
- [x] Client configured with API URL config
- [x] `.gitignore` updated to exclude `.env` files
- [x] Dependencies installed (`dotenv` added to server)
- [x] Code tested locally

## 📤 Deployment Steps

### 1. GitHub Setup
- [ ] Create GitHub repository (if not already done)
- [ ] Push code to GitHub
  ```bash
  git add .
  git commit -m "Ready for deployment"
  git push origin main
  ```

### 2. Backend Deployment (Railway)
- [ ] Sign up at https://railway.app
- [ ] Create new project from GitHub
- [ ] Railway auto-detects Node.js
- [ ] Wait for initial deploy
- [ ] Copy Railway URL: `__________________.railway.app`

### 3. Frontend Deployment (Vercel)
- [ ] Sign up at https://vercel.com
- [ ] Import GitHub repository
- [ ] Set Root Directory: `client`
- [ ] Add environment variable:
  - `VITE_API_URL` = `https://[YOUR-RAILWAY-URL]`
- [ ] Deploy
- [ ] Copy Vercel URL: `__________________.vercel.app`

### 4. Backend Configuration
- [ ] Go back to Railway dashboard
- [ ] Add environment variable:
  - `CLIENT_URL` = `https://[YOUR-VERCEL-URL]`
- [ ] Wait for auto-redeploy

### 5. Testing
- [ ] Visit Vercel URL
- [ ] Check browser console for errors
- [ ] Create a test room
- [ ] Open incognito/another browser
- [ ] Join the room with second player
- [ ] Start game and test basic actions
- [ ] Verify WebSocket connection works

## 🎯 URLs to Save

```
Backend (Railway):  https://________________________
Frontend (Vercel):  https://________________________
GitHub Repo:        https://________________________
```

## 🐛 Common Issues & Fixes

| Issue | Solution |
|-------|----------|
| Frontend can't connect | Check `VITE_API_URL` in Vercel settings |
| CORS error | Verify `CLIENT_URL` in Railway matches Vercel URL |
| WebSocket fails | Ensure using `https://` in all URLs |
| Build fails | Check logs, verify `package.json` is correct |
| 502 error | Backend might be crashed - check Railway logs |

## 📝 Environment Variables Summary

### Railway (Backend)
```
CLIENT_URL=https://your-app.vercel.app
NODE_ENV=production
(PORT is auto-set by Railway)
```

### Vercel (Frontend)
```
VITE_API_URL=https://your-app.railway.app
```

## 🎉 Post-Deployment

- [ ] Test all game features
- [ ] Test with multiple players
- [ ] Check for console errors
- [ ] Test on mobile device
- [ ] Share with friends!

---

**Stuck?** See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions.
