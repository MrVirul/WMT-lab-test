# Deployment Guide

This guide outlines the steps to deploy your **Item Manager** application.

## 1. Backend Deployment (Render)

### Steps:
1.  **Create a New Web Service**: In the [Render Dashboard](https://dashboard.render.com/), click **New** -> **Web Service**.
2.  **Connect Repository**: Connect your GitHub/GitLab repository.
3.  **Configure Service**:
    *   **Name**: `item-manager-backend` (or any name you like)
    *   **Root Directory**: `backend`
    *   **Environment**: `Node`
    *   **Build Command**: `npm install`
    *   **Start Command**: `npm start`
4.  **Add Environment Variables**:
    *   `MONGO_URI`: Your MongoDB connection string.
    *   `PORT`: `5000` (Render will override this if needed, but good to have).
    *   `FRONTEND_URL`: Your Vercel frontend URL (once deployed).

---

## 2. Frontend Deployment (Vercel)

### Steps:
1.  **Create a New Project**: In the [Vercel Dashboard](https://vercel.com/dashboard), click **Add New** -> **Project**.
2.  **Import Repository**: Import your project repository.
3.  **Configure Project**:
    *   **Framework Preset**: `Vite`
    *   **Root Directory**: `frontend`
    *   **Build Command**: `npm run build`
    *   **Output Directory**: `dist`
4.  **Add Environment Variables**:
    *   `VITE_API_URL`: `https://your-backend-url.onrender.com/api` (the URL Render gives you).

---

## 3. Post-Deployment Troubleshooting

*   **CORS Issues**: Ensure the `FRONTEND_URL` in Render matches your Vercel URL exactly (no trailing slash).
*   **API Connection**: Ensure `VITE_API_URL` in Vercel ends with `/api` as expected by the frontend code.
*   **404 on Refresh**: The `frontend/vercel.json` file handles this by rewriting all requests to `index.html`.
