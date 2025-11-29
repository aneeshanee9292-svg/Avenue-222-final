# 🚀 QUICK START GUIDE

## 5-Minute Setup

### Step 1: Install Dependencies

**Backend:**
```powershell
cd backend
npm install
```

**Frontend:**
```powershell
cd ..
npm install
```

### Step 2: Create Environment Files

**Frontend (.env.local):**
```env
VITE_API_URL=http://localhost:5000
```

**Backend (.env):**
```env
PORT=5000
ADMIN_PIN=12345
```

### Step 3: Start Services

**Terminal 1 - Backend:**
```powershell
cd backend
npm start
```

**Terminal 2 - Frontend:**
```powershell
# In main folder (leave backend running)
npm run dev
```

### Step 4: Open Browser

Go to: **http://localhost:5173**

✅ Done! Everything is working locally.

---

## Test It Out

1. **View Menu:** Home → Chef's Menu
2. **Edit Menu:** Home → (admin access from URL bar: localhost:5173/edit-by-admin)
3. **Admin PIN:** 12345
4. **Try saving:** Edit a dish, click Save → Should work!

---

## Deployment Commands

### Deploy Backend
```bash
# Push to GitHub
git add .
git commit -m "Add backend and frontend"
git push

# Go to render.com
# Create Web Service
# Set root directory: backend
# Deploy!
```

### Deploy Frontend
```bash
# Update .env.production with backend URL
# Go to vercel.com
# Import project
# Deploy!
```

---

## Files & Folders

| Location | Purpose |
|----------|---------|
| `backend/` | Express API server |
| `src/pages/Menu.tsx` | Menu viewer (uses API) |
| `src/pages/EditByAdmin.tsx` | Admin panel (uses API) |
| `.env.local.example` | Frontend env template |
| `DEPLOYMENT_GUIDE.md` | Detailed deployment steps |
| `ARCHITECTURE_COMPLETE.md` | Technical architecture |

---

## Common Issues

| Issue | Solution |
|-------|----------|
| API not responding | Check backend is running on port 5000 |
| Menu not loading | Check `VITE_API_URL` in `.env.local` |
| Can't save | Check PIN is 12345 |
| CORS error | Check backend has CORS enabled |
| Build fails | Run `npm install` again |

---

## Production URLs (After Deployment)

| Service | URL |
|---------|-----|
| Frontend | https://avenue222.vercel.app |
| Backend | https://avenue222-api.onrender.com |

---

## Support

1. **Local issues:** Check browser console (F12)
2. **Backend issues:** Check terminal output
3. **API issues:** Test with: `curl http://localhost:5000/api/health`

---

## You're Ready! 🎉

- ✅ Frontend works locally
- ✅ Backend works locally
- ✅ APIs communicate
- ✅ Ready for deployment

**Next:** Follow DEPLOYMENT_GUIDE.md for production! 🚀
