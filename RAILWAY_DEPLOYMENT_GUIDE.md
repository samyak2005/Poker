# 🚂 Railway Deployment - Step by Step

## ⚠️ Common Railway Error & Fix

**Error**: `sh: 1: cd: can't cd to server` or build fails

**Cause**: Railway is trying to cd into `server` directory but you're already in it!

**Fix**: Make sure you set **Root Directory** to `server` in Railway settings.

---

## 📝 Complete Railway Setup

### Step 1: Create Railway Project

1. Go to https://railway.app
2. Click "Login" → Sign in with GitHub
3. Click "New Project"
4. Choose "Deploy from GitHub repo"
5. Select your **Poker** repository
6. Click on the service that was created

### Step 2: Configure Root Directory ⚠️ **CRITICAL**

1. Click on your service
2. Go to **Settings** tab
3. Scroll to **Service Settings**
4. Find **Root Directory** field
5. Set it to: `server`
6. Click outside the field to save

### Step 3: Verify Configuration

Railway will automatically use your `railway.json` which sets:
- ✅ Build Command: `npm install`
- ✅ Start Command: `npm start`
- ✅ Restart Policy: ON_FAILURE

You should see these in **Settings** → **Deploy** section.

### Step 4: Add Environment Variables

1. Go to **Variables** tab
2. Click "Add Variable"
3. Add the following:

```
CLIENT_URL = (leave empty for now, add after Vercel deployment)
NODE_ENV = production
```

### Step 5: Deploy

1. Railway should auto-deploy after saving settings
2. If not, go to **Deployments** tab and click "Deploy"
3. Watch the build logs
4. Wait for "Success" status

### Step 6: Get Your URL

1. Go to **Settings** tab
2. Scroll to **Networking**
3. Click "Generate Domain"
4. Copy your Railway URL (e.g., `your-app-production.up.railway.app`)

---

## 🔍 Verify Deployment

Once deployed, test both servers:

```bash
# Test Multiplayer Server (port 3001)
curl https://your-railway-url.com/api/rooms

# Test Game API Server (port 3000)
curl https://your-railway-url.com/api/shuffle-and-deal
```

Both should return JSON responses!

---

## 🐛 Troubleshooting

### Build Fails with "can't cd to server"

**Solution**: You didn't set Root Directory to `server`. Go back to Step 2.

### "npm: not found" error

**Solution**: Railway didn't detect Node.js. Make sure `package.json` exists in `server` folder.

### "Cannot find module" errors

**Solution**:
1. Check that all dependencies are in `package.json`
2. Delete `node_modules` locally and push
3. Railway will reinstall fresh

### Port already in use

**Solution**: Railway handles ports automatically. Don't worry about this in production.

### WebSocket connection fails

**Solution**:
1. Make sure you added `CLIENT_URL` environment variable
2. Check it matches your Vercel URL exactly (with https://)
3. Redeploy after adding the variable

### "CORS error" in browser

**Solution**:
1. Verify `CLIENT_URL` in Railway matches your frontend URL
2. Make sure frontend is using `https://` (not `http://`)
3. Redeploy backend after fixing

---

## 📊 Build Logs Explained

**Good deployment looks like:**
```
✓ Building
✓ npm install
✓ Starting
✓ npm start
✓ Poker API server running on port 3000
✓ Multiplayer server running on port 3001
```

**Bad deployment looks like:**
```
✗ cd: can't cd to server  ← Root directory not set!
✗ npm: not found          ← Wrong directory
✗ Cannot find module      ← Missing dependencies
```

---

## ✅ Final Checklist

Before deploying, verify:
- [ ] Root Directory is set to `server`
- [ ] `railway.json` exists in project root
- [ ] `package.json` exists in `server` folder
- [ ] All code is pushed to GitHub
- [ ] No `.env` files are committed (check `.gitignore`)

After deploying:
- [ ] Build succeeded
- [ ] Both servers started (check logs)
- [ ] Domain is generated
- [ ] Test endpoints return data

---

## 🔄 Updating Your Deployment

When you make code changes:

1. Push to GitHub: `git push origin main`
2. Railway auto-deploys (if enabled in Settings)
3. OR manually click "Deploy" in Railway dashboard

---

## 🎯 What Railway Does Automatically

- ✅ Detects Node.js project
- ✅ Runs `npm install`
- ✅ Runs `npm start`
- ✅ Handles both ports (3000 & 3001)
- ✅ Provides HTTPS domain
- ✅ Auto-redeploys on push (if enabled)
- ✅ Restarts on crashes

---

**Next Step**: Deploy frontend to Vercel! See [QUICK_START.md](./QUICK_START.md)
