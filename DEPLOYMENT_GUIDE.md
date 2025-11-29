# 🚀 Avenue222 - Complete Deployment Guide

## ✅ What's Been Set Up

You now have a **complete separate backend and frontend architecture**:

```
FRONTEND                          BACKEND
(React + Vite)                    (Express.js)
  ↓                                 ↓
Vercel                           Render/Railway/Heroku
                                    ↓
                              File System (menu.csv)
```

---

## 📁 Your Project Structure

```
Avenue222-main/
├── frontend files (React/Vite)
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Menu.tsx        ✅ Uses GET /api/menu
│   │   │   ├── EditByAdmin.tsx ✅ Uses POST /api/save-menu
│   ├── .env.local.example      ✅ API URL config
│   └── package.json            ✅ Cleaned up
│
└── backend/                     ✅ NEW - Separate folder
    ├── server.js               ✅ Express API
    ├── package.json            ✅ Backend dependencies
    ├── .env.example            ✅ Environment variables
    └── README.md               ✅ Backend documentation
```

---

## 🎯 Quick Start - Local Development

### Terminal 1: Start Backend
```powershell
cd backend
npm install
npm start
```

Expected output:
```
🍽️  Avenue222 Backend API Server
📍 http://localhost:5000
```

### Terminal 2: Start Frontend
```powershell
# From main folder
npm install
npm run dev
```

Expected output:
```
VITE v5.4.8 ready in 301 ms
➜ Local: http://localhost:5173/
```

### Open Browser
Go to: **http://localhost:5173**

✅ Everything works locally!

---

## 🌐 Production Deployment (Step by Step)

### STEP 1: Deploy Backend to Render

1. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Add separate backend and frontend"
   git push
   ```

2. **Go to [render.com](https://render.com)**

3. **Create New Web Service:**
   - Click "New +" → "Web Service"
   - Connect GitHub account
   - Select your repository

4. **Configure Service:**
   - **Name:** `avenue222-api`
   - **Environment:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Root Directory:** `backend`

5. **Set Environment Variables:**
   - Click "Environment"
   - Add variables:
     ```
     PORT=10000
     ADMIN_PIN=12345
     ```

6. **Deploy!**
   - Click "Create Web Service"
   - Wait for deployment (3-5 minutes)
   - Your backend URL: `https://avenue222-api.onrender.com`

✅ Backend is live!

---

### STEP 2: Update Frontend with Backend URL

1. **Create `.env.production` in frontend:**
   ```env
   VITE_API_URL=https://avenue222-api.onrender.com
   ```

2. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Add production backend URL"
   git push
   ```

---

### STEP 3: Deploy Frontend to Vercel

1. **Go to [vercel.com](https://vercel.com)**

2. **Import Project:**
   - Click "Add New..." → "Project"
   - Select your GitHub repository
   - Click "Import"

3. **Configure:**
   - **Project Name:** `avenue222` (or your choice)
   - **Framework:** Vite
   - **Root Directory:** `.` (project root)

4. **Set Environment Variables:**
   - Click "Environment Variables"
   - Add:
     ```
     VITE_API_URL=https://avenue222-api.onrender.com
     ```

5. **Deploy!**
   - Click "Deploy"
   - Wait for build (2-3 minutes)
   - Your frontend URL: `https://avenue222.vercel.app`

✅ Frontend is live!

---

## 🔗 Final URLs

| Service | URL |
|---------|-----|
| **Frontend** | `https://avenue222.vercel.app` |
| **Backend API** | `https://avenue222-api.onrender.com` |
| **API Health Check** | `https://avenue222-api.onrender.com/api/health` |

---

## ✨ What Works Now

### Frontend (Vercel)
- ✅ Home page - responsive design
- ✅ Menu page - fetches from backend API
- ✅ Edit Admin - authenticates and saves to backend API
- ✅ All styling and animations

### Backend (Render)
- ✅ GET /api/menu - returns CSV
- ✅ POST /api/save-menu - saves CSV with PIN validation
- ✅ GET /api/health - health check
- ✅ CORS enabled for frontend domain
- ✅ Persistent file storage

---

## 🔐 Security Checklist

- ✅ Admin PIN required for saves (default: 12345) - **CHANGE THIS!**
- ✅ CORS configured for Vercel domain
- ✅ Environment variables for sensitive data
- ✅ Frontend doesn't access file system directly

### Important: Change Admin PIN

Before production, change the PIN:

**In Render dashboard:**
1. Select `avenue222-api` service
2. Go to "Environment"
3. Change `ADMIN_PIN` to a secure value
4. Service auto-redeploys

---

## 🧪 Test After Deployment

1. **Open frontend:** https://avenue222.vercel.app
2. **Check Health:** https://avenue222-api.onrender.com/api/health
3. **View Menu:** Works automatically
4. **Test Admin:**
   - Go to Edit By Admin
   - Enter PIN (12345 or your new PIN)
   - Try editing and saving
   - Should work! ✅

---

## 📊 Monitoring

### Backend Logs (Render)
1. Go to render.com dashboard
2. Select `avenue222-api`
3. Click "Logs" tab
4. Monitor for errors

### Frontend Logs
1. Open browser DevTools (F12)
2. Check Console tab
3. Should see API calls to backend

---

## 💡 Pro Tips

1. **Faster deployments:**
   - Make changes locally first
   - Test with `npm run dev` + `backend/npm start`
   - Push to GitHub when ready
   - Vercel/Render auto-deploy

2. **Common issues:**
   - API calls failing → Check `VITE_API_URL`
   - Menu not loading → Check backend is running
   - Save not working → Check PIN is correct

3. **Scale up later:**
   - Add database (PostgreSQL, MongoDB)
   - Add image uploads (Cloudinary, S3)
   - Add user authentication
   - Add order management

---

## 🎉 You're Done!

Your restaurant management system is now:
- ✅ Deployed on Vercel (frontend)
- ✅ Deployed on Render (backend)
- ✅ Using proper API architecture
- ✅ Scalable and maintainable
- ✅ Production-ready!

---

## 📞 Need Help?

Check the logs:
- Frontend: Browser DevTools (F12)
- Backend: Render dashboard → Logs
- API: Visit https://avenue222-api.onrender.com/api/health

---

## 🚀 Next Steps

1. Test everything works
2. Customize for your restaurant (colors, name, etc.)
3. Add your menu items
4. Change admin PIN
5. Monitor in production
6. Celebrate! 🎊

---

**Happy hosting!** 🍽️✨
