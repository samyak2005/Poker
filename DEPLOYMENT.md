# Deployment Guide for Render

## Backend Deployment (Node.js)

1. **Create a new Web Service on Render**
   - Go to [render.com](https://render.com)
   - Click "New +" → "Web Service"
   - Connect your GitHub repository

2. **Configure the Backend Service**
   - **Name**: `poker-backend` (or your preferred name)
   - **Root Directory**: `server`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Environment**: `Node 18`

3. **Environment Variables for Backend**
   - `NODE_ENV`: `production`
   - `FRONTEND_URL`: `https://your-frontend-app-name.onrender.com` (update after frontend deployment)

## Frontend Deployment (Static Site)

1. **Create a new Static Site on Render**
   - Go to [render.com](https://render.com)
   - Click "New +" → "Static Site"
   - Connect your GitHub repository

2. **Configure the Frontend Service**
   - **Name**: `poker-frontend` (or your preferred name)
   - **Root Directory**: `client`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`

3. **Environment Variables for Frontend**
   - `VITE_API_URL`: `https://your-backend-app-name.onrender.com`
   - `VITE_SOCKET_URL`: `https://your-backend-app-name.onrender.com`

## Deployment Steps

### Step 1: Deploy Backend
1. Push your code to GitHub
2. Create the backend web service on Render
3. Set the environment variables
4. Deploy and note the URL (e.g., `https://poker-backend.onrender.com`)

### Step 2: Deploy Frontend
1. Create the frontend static site on Render
2. Set the environment variables with your backend URL
3. Deploy

### Step 3: Update Backend CORS
1. Go back to your backend service
2. Update the `FRONTEND_URL` environment variable with your frontend URL
3. Redeploy the backend

## Important Notes

- The backend will be available at: `https://your-backend-name.onrender.com`
- The frontend will be available at: `https://your-frontend-name.onrender.com`
- Make sure to update the URLs in the environment variables accordingly
- The backend needs to know the frontend URL for CORS, and the frontend needs to know the backend URL for API calls

## Troubleshooting

- If you get CORS errors, make sure the `FRONTEND_URL` in the backend environment variables matches your frontend URL exactly
- If the frontend can't connect to the backend, check that the `VITE_API_URL` and `VITE_SOCKET_URL` are set correctly
- Render may take a few minutes to build and deploy your application 