import { useEffect, useState } from "react";
import Papa from "papaparse";
import {
  Home,
  UploadCloud,
  Download,
  Lock,
  Search,
  X,
  Trash2,
} from "lucide-react";

type Row = {
  Category: string;
  Type: string;
  "Dish Name": string;
  Price: string;
  Description?: string;
};

const ADMIN_PIN = "12345";

export default function EditByAdmin() {
  const [pin, setPin] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  const [toast, setToast] = useState<{
    visible: boolean;
    type: "success" | "error";
    message: string;
  }>({
    visible: false,
    type: "success",
    message: "",
  });

  // Simple toast helper
  const showToast = (type: "success" | "error", message: string, ms = 3000) => {
    setToast({ visible: true, type, message });
    setTimeout(() => setToast((t) => ({ ...t, visible: false })), ms);
  };

  useEffect(() => {
    if (authenticated) loadCsv();
  }, [authenticated]);

  // Load CSV from backend API
  const loadCsv = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/menu`);
      if (!res.ok) throw new Error("Failed to load CSV from server");
      const data = await res.json();
      const parsed = Papa.parse<Row>(data.csv, { header: true, skipEmptyLines: true });
      setRows(parsed.data || []);
      setStatus(null);
    } catch (e: any) {
      console.error("CSV load failed:", e);
      showToast("error", "Failed to load CSV: " + e.message);
      setError("Failed to load CSV: " + e.message);
    } finally {
      setLoading(false);
    }
  };

  // Validate PIN
  const validatePin = () => {
    if (!/^\d{5}$/.test(pin)) return showToast("error", "PIN must be 5 digits");
    if (pin === ADMIN_PIN) {
      setAuthenticated(true);
      setError(null);
    } else showToast("error", "Incorrect PIN");
  };

  // CRUD Helpers
  const updateCell = (i: number, key: keyof Row, value: string) => {
    setRows((prev) => {
      const copy = [...prev];
      copy[i] = { ...copy[i], [key]: value };
      return copy;
    });
  };

  const addRow = () =>
    setRows((prev) => [
      ...prev,
      {
        Category: "Uncategorized",
        Type: "Veg",
        "Dish Name": "New Item",
        Price: "0",
        Description: "",
      },
    ]);

  const deleteRow = (i: number) =>
    setRows((prev) => prev.filter((_, idx) => idx !== i));

  const getSortedRows = (rs: Row[]) =>
    [...rs].sort((a, b) =>
      (a.Category || "").localeCompare(b.Category || "", undefined, {
        sensitivity: "base",
      })
    );

  const onFileUpload = (f: File | null) => {
    if (!f) return;
    Papa.parse<Row>(f, {
      header: true,
      skipEmptyLines: true,
      complete: (r) => setRows(r.data || []),
    });
  };

  const downloadCsv = () => {
    const sorted = getSortedRows(rows);
    const csv = Papa.unparse(sorted, {
      columns: ["Category", "Type", "Dish Name", "Price", "Description"],
    });
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "menu-updated.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  // ✅ Save to Backend API
  const saveToServer = async () => {
    setStatus(null);
    setError(null);
    setLoading(true);
    try {
      const sorted = getSortedRows(rows);
      const csv = Papa.unparse(sorted, {
        columns: ["Category", "Type", "Dish Name", "Price", "Description"],
      });

      const res = await fetch(`${API_URL}/api/save-menu`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ csv, pin }),
      });

      let data: any = {};
      try {
        data = await res.json();
      } catch {
        console.warn("Non-JSON response from API");
      }

      if (!res.ok) throw new Error(data?.error || "Failed to save menu");

      showToast("success", "Menu saved successfully!");
      setStatus("Menu saved successfully!");
      console.log("✅ Menu saved:", data);
    } catch (e: any) {
      console.error("❌ Save failed:", e);
      showToast("error", e.message || "Save failed");
      setError(e.message || "Save failed");
    } finally {
      setLoading(false);
    }
  };

  const filteredRows = rows.filter((r) =>
    searchQuery
      ? Object.values(r)
          .join(" ")
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      : true
  );

  // 🔒 Login view
  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#071726] p-4 text-white">
        <div className="w-full max-w-sm bg-white/5 rounded-xl p-6 shadow-xl backdrop-blur-sm border border-white/10">
          <h2 className="text-lg font-semibold mb-3 text-[#FFD4C2]">Admin Login</h2>
          <input
            inputMode="numeric"
            value={pin}
            onChange={(e) =>
              setPin(e.target.value.replace(/\D/g, "").slice(0, 5))
            }
            className="w-full p-3 rounded-md bg-transparent border border-white/20 text-white placeholder-white/60 mb-3 focus:ring-2 focus:ring-[#FFD4C2]/50 outline-none"
            placeholder="Enter 5-digit PIN"
          />
          <div className="flex gap-2">
            <button
              onClick={validatePin}
              className="flex-1 px-3 py-2 rounded-full bg-gradient-to-r from-[#FFD4C2] to-[#FFB3B3] text-[#071726] font-semibold"
            >
              Unlock
            </button>
            <button
              onClick={() => setPin("")}
              className="px-3 py-2 rounded-full bg-white/10 hover:bg-white/20"
            >
              Clear
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 🧾 Editor view
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#071726] via-[#0b2233] to-[#133B56] text-white p-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between mb-4 gap-3">
          <div className="flex items-center gap-3">
            <button
              onClick={() => (window.location.href = "/")}
              className="p-2 rounded-md bg-white/10 hover:bg-white/20"
              title="Home"
            >
              <Home className="w-5 h-5 text-white" />
            </button>
            <h1 className="text-lg sm:text-xl font-semibold text-[#FFD4C2]">
              Edit Menu
            </h1>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <label
              title="Upload CSV"
              className="p-2 rounded-md bg-white/10 cursor-pointer hover:bg-white/20"
            >
              <input
                type="file"
                accept=".csv,text/csv"
                className="hidden"
                onChange={(e) => onFileUpload(e.target.files?.[0] ?? null)}
              />
              <UploadCloud className="w-5 h-5 text-white" />
            </label>
            <button
              onClick={downloadCsv}
              title="Download CSV"
              className="p-2 rounded-md bg-white/10 hover:bg-white/20"
            >
              <Download className="w-5 h-5 text-white" />
            </button>
            <button
              disabled={loading}
              onClick={saveToServer}
              className={`px-5 py-2 rounded-full bg-gradient-to-r from-[#FFD4C2] to-[#FFB3B3] text-[#071726] font-semibold transition ${
                loading ? "opacity-50 cursor-not-allowed" : "hover:scale-105"
              }`}
            >
              {loading ? "Saving..." : "Save"}
            </button>
            <button
              onClick={() => {
                setAuthenticated(false);
                setPin("");
                setRows([]);
              }}
              title="Lock"
              className="p-2 rounded-md bg-white/10 hover:bg-white/20"
            >
              <Lock className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-4 relative flex items-center">
          <Search className="absolute left-3 w-4 h-4 text-white/50" />
          <input
            type="text"
            placeholder="Search dish, category, or description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-10 py-2.5 rounded-full bg-white/10 text-white placeholder-white/60 outline-none focus:ring-2 focus:ring-[#FFD4C2]/50 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 text-white/60 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Data Table */}
        {loading ? (
          <div className="text-center text-white/70">Loading…</div>
        ) : (
          <div className="flex flex-col gap-3">
            {filteredRows.map((r, i) => (
              <div
                key={i}
                className="overflow-x-auto rounded-xl border border-white/10 bg-white/5 p-3 shadow-md hover:shadow-lg transition-all backdrop-blur-sm"
              >
                <div className="min-w-[750px] flex items-center gap-3">
                  <input
                    className="w-1/5 p-2 rounded-md bg-transparent border border-white/10 text-sm text-white focus:ring-1 focus:ring-[#FFD4C2]/50 outline-none"
                    value={r.Category}
                    onChange={(e) => updateCell(i, "Category", e.target.value)}
                  />
                  <input
                    className="w-1/6 p-2 rounded-md bg-transparent border border-white/10 text-sm"
                    value={r.Type}
                    onChange={(e) => updateCell(i, "Type", e.target.value)}
                  />
                  <input
                    className="flex-1 p-2 rounded-md bg-transparent border border-white/10 text-sm"
                    value={r["Dish Name"]}
                    onChange={(e) =>
                      updateCell(i, "Dish Name", e.target.value)
                    }
                  />
                  <input
                    className="w-1/6 p-2 rounded-md bg-transparent border border-white/10 text-sm text-right"
                    value={r.Price}
                    onChange={(e) => updateCell(i, "Price", e.target.value)}
                  />
                  <input
                    className="w-1/4 p-2 rounded-md bg-transparent border border-white/10 text-sm"
                    value={r.Description || ""}
                    onChange={(e) =>
                      updateCell(i, "Description", e.target.value)
                    }
                  />
                  <button
                    onClick={() => deleteRow(i)}
                    className="p-2 rounded-md bg-gradient-to-r from-[#FF6B6B] to-[#FF8E8E] hover:opacity-90 transition"
                    title="Delete Item"
                  >
                    <Trash2 className="w-4 h-4 text-white" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer Buttons */}
        <div className="mt-6 flex flex-wrap gap-3 justify-center">
          <button
            onClick={addRow}
            className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20"
          >
            Add Item
          </button>
          <button
            disabled={loading}
            onClick={saveToServer}
            className={`px-6 py-2 rounded-full bg-gradient-to-r from-[#FFD4C2] to-[#FFB3B3] text-[#071726] font-semibold transition ${
              loading ? "opacity-50 cursor-not-allowed" : "hover:scale-105"
            }`}
          >
            {loading ? "Saving..." : "Save"}
          </button>
          <button
            onClick={() => {
              setAuthenticated(false);
              setPin("");
              setRows([]);
            }}
            className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20"
          >
            Cancel
          </button>
        </div>

        {status && <div className="mt-3 text-sm text-green-300">{status}</div>}
        {error && <div className="mt-3 text-sm text-red-300">{error}</div>}
      </div>

      {/* Toast Notification */}
      {toast.visible && (
        <div
          className={`fixed left-1/2 bottom-6 transform -translate-x-1/2 z-50 px-4 py-2 rounded-lg shadow-lg ${
            toast.type === "success"
              ? "bg-green-600 text-white"
              : "bg-red-600 text-white"
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="text-sm">{toast.message}</div>
            <button
              onClick={() => setToast((t) => ({ ...t, visible: false }))}
              className="ml-3 text-xs opacity-80"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
