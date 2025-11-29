import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// ✅ Ensure __dirname works properly in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json({ limit: "20mb" }));

// ✅ Configurable PIN and menu CSV path
const ADMIN_PIN = process.env.ADMIN_PIN || "12345";
const MENU_CSV_PATH = path.join(process.cwd(), "public", "menu.csv"); // safer on Windows

// ✅ Ensure directory exists before writing
function ensureDirectoryExistence(filePath) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

// ✅ API endpoint
app.post("/api/save-menu", (req, res) => {
  console.log("POST /api/save-menu received");
  const { csv, pin } = req.body;

  if (!csv) {
    console.error("Missing CSV in request body");
    return res.status(400).json({ error: "Missing csv body" });
  }

  if (pin !== ADMIN_PIN) {
    console.error("Invalid PIN");
    return res.status(403).json({ error: "Invalid PIN" });
  }

  ensureDirectoryExistence(MENU_CSV_PATH);

  fs.writeFile(MENU_CSV_PATH, csv, "utf8", (err) => {
    if (err) {
      console.error("Failed to write menu.csv:", err.message);
      return res.status(500).json({ error: "Failed to write file", details: err.message });
    }
    console.log("✅ menu.csv updated:", MENU_CSV_PATH);
    return res.json({ ok: true });
  });
});

// ✅ Start server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Save-menu server running on http://localhost:${port}`);
});
