# 🔺 Vercel Deployment - Step by Step

## ⚠️ Common Vercel Error & Fix

**Error**: `ERESOLVE could not resolve` - React 19 dependency conflict

**Cause**: `react-card-flip` package doesn't officially support React 19 yet

**Fix**: ✅ Already fixed! Project now uses `.npmrc` with `legacy-peer-deps=true`

---

## 📝 Complete Vercel Setup

### Step 1: Create Vercel Project

1. Go to https://vercel.com
2. Click "Login" → Sign in with GitHub
3. Click "Add New" → "Project"
4. Find and import your **Poker** repository
5. Click "Import"

### Step 2: Configure Project ⚠️ **CRITICAL**

1. **Root Directory**: Set to `client`
2. **Framework Preset**: Vite (should auto-detect)
3. **Build Command**: `npm run build` (or leave blank, Vercel auto-detects)
4. **Output Directory**: `dist`

> **Note**: The `.npmrc` file in the client folder automatically handles React 19 compatibility during `npm install`

### Step 3: Add Environment Variables

Click "Environment Variables" and add:

```
VITE_API_URL = https://your-railway-url.railway.app
VITE_POKER_API_URL = https://your-railway-url.railway.app
```

**Important**: Both point to the SAME Railway backend URL!

### Step 4: Deploy

1. Click "Deploy"
2. Wait for build to complete (2-3 minutes)
3. Vercel will show "Congratulations!" when done
4. Copy your Vercel URL (e.g., `your-poker.vercel.app`)

### Step 5: Update Railway

Go back to Railway and add the environment variable:
```
CLIENT_URL = https://your-poker.vercel.app
```

This allows the backend to accept connections from your frontend!

---

## 🔍 Verify Deployment

Once deployed:

1. Visit your Vercel URL
2. Check browser console (F12) - should see:
   ```
   Multiplayer API URL: https://your-railway-url
   Poker Game API URL: https://your-railway-url
   ```
3. Try creating a room
4. No CORS errors = Success! ✅

---

## 🐛 Troubleshooting

### "ERESOLVE could not resolve" Error

**Already Fixed!** The project includes:
- ✅ `.npmrc` with `legacy-peer-deps=true` (auto-applied during install)
- ✅ Simple build process that Vercel handles

If you still see this:
1. Make sure `.npmrc` exists in `client` folder
2. Verify it's pushed to GitHub
3. Check Root Directory is set to `client`
4. Redeploy on Vercel

### Build Fails with "npm ERR!"

**Solution**:
1. Check build logs in Vercel dashboard
2. Verify `package.json` is correct
3. Make sure `.npmrc` exists in `client` folder
4. Try "Redeploy" button

### "Failed to compile" - Vite errors

**Solution**:
1. Check that all imports are correct
2. Verify `vite.config.js` exists
3. Make sure `client/index.html` exists

### Frontend can't connect to backend

**Solution**:
1. Verify environment variables are set correctly
2. Both should point to Railway URL
3. Make sure Railway URL uses `https://` (not `http://`)
4. Redeploy after fixing env vars

### "Network Error" or "CORS" in browser

**Solution**:
1. Go to Railway dashboard
2. Verify `CLIENT_URL` matches your Vercel URL exactly
3. Redeploy Railway backend
4. Hard refresh browser (Ctrl+Shift+R)

---

## 📊 Build Logs Explained

**Good deployment:**
```
✓ Building
✓ Installing dependencies (legacy-peer-deps)
✓ Building with Vite
✓ Build completed
✓ Deployment ready
```

**Bad deployment:**
```
✗ ERESOLVE could not resolve  ← .npmrc missing
✗ Module not found            ← Wrong import paths
✗ Failed to compile           ← Syntax errors
```

---

## ✅ Deployment Checklist

Before deploying:
- [ ] `.npmrc` exists in client folder
- [ ] `vercel.json` exists in project root
- [ ] All code pushed to GitHub
- [ ] Railway backend is deployed first
- [ ] You have Railway URL ready

Configure Vercel:
- [ ] Root directory set to `client`
- [ ] Framework preset: Vite
- [ ] Both env vars added (`VITE_API_URL` and `VITE_POKER_API_URL`)
- [ ] Both env vars point to Railway URL

After deploying:
- [ ] Build succeeded
- [ ] No console errors in browser
- [ ] Can create/join rooms
- [ ] Update `CLIENT_URL` in Railway

---

## 🔄 Updating Your Deployment

When you make frontend changes:

1. Push to GitHub
2. Vercel auto-deploys (usually instant)
3. OR click "Redeploy" in Vercel dashboard

---

## 🎯 What Vercel Does Automatically

- ✅ Detects Vite project
- ✅ Runs `npm install --legacy-peer-deps`
- ✅ Builds with `vite build`
- ✅ Provides HTTPS domain
- ✅ CDN distribution (fast worldwide)
- ✅ Auto-redeploys on push
- ✅ Preview deployments for PRs

---

## 💡 Pro Tips

### Fast Rebuilds
- Vercel caches dependencies
- Subsequent builds are much faster
- First build: 2-3 min, Later builds: 30-60 sec

### Environment Variables
- Changes require redeploy
- Can set different vars for Production/Preview
- Use Vercel dashboard to manage

### Custom Domain (Optional)
1. Go to Vercel project → Settings → Domains
2. Add your domain
3. Update DNS records
4. Done!

---

## 🚨 Common Mistakes

1. ❌ Forgetting to set Root Directory to `client`
2. ❌ Not adding environment variables
3. ❌ Using `http://` instead of `https://` in env vars
4. ❌ Not updating `CLIENT_URL` in Railway after deployment
5. ❌ Deleting `.npmrc` file

---

**Next Steps:**
1. ✅ Frontend deployed on Vercel
2. ✅ Backend deployed on Railway
3. ✅ Update `CLIENT_URL` in Railway
4. 🎮 Start playing!

**See also**: [DEPLOYMENT.md](./DEPLOYMENT.md) for complete guide
