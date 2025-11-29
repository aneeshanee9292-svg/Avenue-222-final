import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json({ limit: '20mb' }));

// Admin PIN from environment
const ADMIN_PIN = process.env.ADMIN_PIN || '12345';
const MENU_CSV_PATH = path.join(__dirname, 'menu.csv');

// ============================================
// ROUTES
// ============================================

// GET /api/menu - Fetch current menu
app.get('/api/menu', (req, res) => {
  try {
    if (!fs.existsSync(MENU_CSV_PATH)) {
      return res.status(404).json({ error: 'Menu not found' });
    }

    const csv = fs.readFileSync(MENU_CSV_PATH, 'utf8');
    res.json({ csv });
  } catch (error: any) {
    console.error('❌ Error reading menu:', error);
    res.status(500).json({
      error: 'Failed to read menu',
      details: error.message,
    });
  }
});

// POST /api/save-menu - Save menu (requires PIN)
app.post('/api/save-menu', (req, res) => {
  console.log('📝 POST /api/save-menu received');
  const { csv, pin } = req.body;

  // Validate input
  if (!csv) {
    return res.status(400).json({ error: 'Missing csv in request body' });
  }

  // Validate PIN
  if (pin !== ADMIN_PIN) {
    console.warn('⚠️ Invalid PIN attempt');
    return res.status(403).json({ error: 'Invalid PIN' });
  }

  try {
    // Ensure directory exists
    const dir = path.dirname(MENU_CSV_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    // Write CSV file
    fs.writeFileSync(MENU_CSV_PATH, csv, 'utf8');
    console.log('✅ menu.csv updated:', MENU_CSV_PATH);

    res.json({
      ok: true,
      message: 'Menu saved successfully',
    });
  } catch (error: any) {
    console.error('❌ Error saving menu:', error);
    res.status(500).json({
      error: 'Failed to save menu',
      details: error.message,
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Avenue222 API is running' });
});

// ============================================
// START SERVER
// ============================================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════════╗
║  🍽️  Avenue222 Backend API Server          ║
║  📍 http://localhost:${PORT}                     ║
║  ✅ CORS Enabled                            ║
║  📝 Routes:                                 ║
║    GET  /api/menu          (fetch menu)    ║
║    POST /api/save-menu     (save menu)     ║
║    GET  /api/health        (health check)  ║
╚════════════════════════════════════════════╝
  `);
});

export default app;
