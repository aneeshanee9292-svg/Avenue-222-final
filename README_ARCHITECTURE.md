# Avenue222 - Restaurant Management System

A full-stack restaurant management system with separate frontend and backend services.

## 📋 Project Structure

```
Avenue222/
├── frontend/                    # React + Vite (this folder)
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Home.tsx        # Landing page
│   │   │   ├── Menu.tsx        # Menu viewer (fetches from API)
│   │   │   ├── EditByAdmin.tsx # Admin panel (saves to API)
│   │   ├── components/
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── package.json
│   ├── vite.config.ts
│   └── .env.local.example
│
└── backend/                     # Express.js API Server
    ├── server.js               # Main API server
    ├── menu.csv                # Menu data (created at runtime)
    ├── package.json
    └── .env.example
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 16+ installed
- npm or yarn

### Option 1: Run Both Services Locally

#### 1. Start Backend Server

```bash
cd backend
npm install
npm start

# Server runs on http://localhost:5000
```

Expected output:
```
╔════════════════════════════════════════════╗
║  🍽️  Avenue222 Backend API Server          ║
║  📍 http://localhost:5000                     ║
╚════════════════════════════════════════════╝
```

#### 2. Start Frontend (in another terminal)

```bash
# In the main Avenue222 folder
npm install
npm run dev

# Frontend runs on http://localhost:5173
```

Then open **http://localhost:5173** in your browser.

---

## 📝 Frontend Configuration

### Environment Variables

Create `.env.local` file in the frontend directory:

```env
# Backend API URL for local development
VITE_API_URL=http://localhost:5000

# For production
# VITE_API_URL=https://avenue222-api.onrender.com
```

---

## 🔌 API Endpoints

### Base URL
- **Local**: `http://localhost:5000`
- **Production**: `https://avenue222-api.onrender.com`

### Endpoints

#### GET /api/menu
Fetch the current menu (CSV format)

```bash
curl http://localhost:5000/api/menu
```

**Response:**
```json
{
  "csv": "Category,Type,Dish Name,Price,Description\n..."
}
```

#### POST /api/save-menu
Save menu (requires PIN)

```bash
curl -X POST http://localhost:5000/api/save-menu \
  -H "Content-Type: application/json" \
  -d '{"csv":"...","pin":"12345"}'
```

#### GET /api/health
Health check

```bash
curl http://localhost:5000/api/health
```

---

## 🎯 Features

### Frontend (React + Vite)
- ✅ Beautiful responsive UI
- ✅ Menu viewer with search and filters
- ✅ Admin panel for menu management
- ✅ API integration for all data operations
- ✅ Toast notifications

### Backend (Express.js)
- ✅ RESTful API endpoints
- ✅ CSV file management
- ✅ PIN-based authentication
- ✅ CORS enabled
- ✅ Error handling

---

## 🌐 Deployment

### Deploy Frontend to Vercel

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Select the project root folder
5. Set environment variables:
   - `VITE_API_URL`: Your backend API URL (e.g., `https://avenue222-api.onrender.com`)
6. Deploy!

### Deploy Backend to Render

1. Push `backend/` code to GitHub (or use this folder as a submodule)
2. Go to [render.com](https://render.com)
3. Create new **Web Service**
4. Connect GitHub repository
5. Set build command: `npm install`
6. Set start command: `npm start`
7. Set environment variables:
   - `PORT`: 10000
   - `ADMIN_PIN`: your-secure-pin
8. Deploy!

Your backend URL will be: `https://avenue222-api.onrender.com` (or similar)

Then update frontend `.env` with this URL.

---

## 📚 How It Works

### Menu Display Flow
```
1. User opens Menu page
2. Frontend calls: GET /api/menu
3. Backend reads menu.csv
4. Backend returns CSV content
5. Frontend parses CSV and displays
```

### Menu Save Flow
```
1. Admin authenticates (PIN)
2. Admin edits menu items
3. Admin clicks Save
4. Frontend calls: POST /api/save-menu (with CSV + PIN)
5. Backend validates PIN
6. Backend writes to menu.csv
7. Confirmation sent to frontend
```

---

## 🔐 Security

- Admin PIN required for menu updates
- CORS configured for frontend domain
- Environment variables for sensitive data
- No direct file system access from frontend

---

## 🛠️ Development

### Frontend Development

```bash
npm run dev      # Start dev server
npm run build    # Build for production
npm run lint     # Check code style
npm run typecheck # TypeScript check
```

### Backend Development

```bash
npm start        # Start server
npm run dev      # Same as start
```

---

## 📦 Dependencies

### Frontend
- React 18
- Vite 5
- PapaParse (CSV parsing)
- Lucide React (icons)
- Tailwind CSS

### Backend
- Express 5
- CORS
- Node.js fs/path (built-in)

---

## 🐛 Troubleshooting

### Frontend can't connect to API
- Check backend is running: `curl http://localhost:5000/api/health`
- Verify `VITE_API_URL` in `.env.local`
- Check CORS is enabled in backend

### Menu not loading
- Check menu.csv exists in backend folder
- Check admin PIN is correct (default: `12345`)
- Check browser console for errors

### Can't save menu
- Verify PIN is correct
- Check backend has write permissions
- Check backend logs for errors

---

## 📞 Support

For issues or questions, check the logs:

**Frontend**: Browser console (F12)
**Backend**: Server terminal output

---

## 📄 License

ISC

---

## 🎉 You're All Set!

1. ✅ Frontend is ready for Vercel
2. ✅ Backend is ready for Render
3. ✅ All APIs configured
4. ✅ Both services communicate seamlessly

Happy deployment! 🚀
