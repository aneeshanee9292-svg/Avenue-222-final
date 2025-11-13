import fs from "fs";
import path from "path";

const ADMIN_PIN = process.env.ADMIN_PIN || "12345";
const MENU_CSV_PATH = path.join(process.cwd(), "public", "menu.csv");

export async function handler(event) {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method Not Allowed" }),
    };
  }

  try {
    const { csv, pin } = JSON.parse(event.body);

    if (!csv) {
      return { statusCode: 400, body: JSON.stringify({ error: "Missing csv body" }) };
    }
    if (pin !== ADMIN_PIN) {
      return { statusCode: 403, body: JSON.stringify({ error: "Invalid PIN" }) };
    }

    fs.writeFileSync(MENU_CSV_PATH, csv, "utf8");
    console.log("✅ menu.csv updated:", MENU_CSV_PATH);

    return { statusCode: 200, body: JSON.stringify({ ok: true }) };
  } catch (err) {
    console.error("❌ Error saving menu:", err);
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
}
