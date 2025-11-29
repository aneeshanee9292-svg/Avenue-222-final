# Avenue222 Backend API

Express.js backend server for Avenue222 restaurant management system.

## Features

- ✅ Fetch menu (CSV format)
- ✅ Save menu (with PIN protection)
- ✅ CORS enabled for frontend
- ✅ Health check endpoint

## Installation

```bash
cd backend
npm install
```

## Environment Variables

Create a `.env` file (copy from `.env.example`):

```env
PORT=5000
ADMIN_PIN=12345
```

## Running Locally

```bash
# Development
npm run dev

# Production
npm start
```

Server runs on `http://localhost:5000`

## API Endpoints

### GET /api/menu
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

### POST /api/save-menu
Save menu (requires PIN)

```bash
curl -X POST http://localhost:5000/api/save-menu \
  -H "Content-Type: application/json" \
  -d '{"csv":"...","pin":"12345"}'
```

**Request:**
```json
{
  "csv": "Category,Type,Dish Name,Price,Description\n...",
  "pin": "12345"
}
```

**Response:**
```json
{
  "ok": true,
  "message": "Menu saved successfully"
}
```

### GET /api/health
Health check

```bash
curl http://localhost:5000/api/health
```

**Response:**
```json
{
  "status": "ok",
  "message": "Avenue222 API is running"
}
```

## Deployment

### Deploy to Render

1. Push your code to GitHub
2. Go to [render.com](https://render.com)
3. Create new Web Service
4. Connect GitHub repository (select `backend` folder)
5. Set environment variables:
   - `PORT`: 10000
   - `ADMIN_PIN`: your-secure-pin
6. Deploy!

Your API will be available at: `https://avenue222-api.onrender.com`

## File Structure

```
backend/
├── server.js          # Main Express server
├── menu.csv           # Menu data (created at runtime)
├── package.json
├── .env.example
└── README.md
```

## Notes

- Menu data is stored as `menu.csv` in the backend directory
- On production (Render), files persist between deployments
- CORS is enabled to allow requests from frontend
