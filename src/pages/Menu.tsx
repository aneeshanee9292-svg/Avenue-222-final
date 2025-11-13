import { useEffect, useRef, useState } from "react";
import { ArrowLeft, Leaf, Drumstick, Search, X } from "lucide-react";
import Papa from "papaparse";

interface MenuItem {
  Category: string;
  Type: string;
  "Dish Name": string;
  Price: string;
  Description: string;
}

interface MenuProps {
  onNavigateHome: () => void;
}

export default function Menu({ onNavigateHome }: MenuProps) {
  const [menuData, setMenuData] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<"all" | "veg" | "nonveg">("all");
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    fetch("/menu.csv")
      .then((response) => response.text())
      .then((csv) => {
        Papa.parse(csv, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            setMenuData(results.data as MenuItem[]);
            setLoading(false);
          },
        });
      })
      .catch((error) => {
        console.error("Error loading menu:", error);
        setLoading(false);
      });
  }, []);

  const categories = [
    "Soups",
    "Salads",
    "Appetizers",
    "Tandoori",
    "Continental",
    "Biryani & Pulao",
    "Currys",
    "Indian Breads",
    "Fried Rice",
    "Noodles",
    "Desserts",
    "Beverages",
  ];

  const getItemsByCategory = (category: string) =>
    menuData
      .filter((item) => item.Category === category)
      .filter((item) => {
        if (filter === "veg") return item.Type.toLowerCase() === "veg";
        if (filter === "nonveg") return item.Type.toLowerCase() !== "veg";
        return true;
      })
      .filter((item) =>
        searchQuery
          ? Object.values(item)
              .join(" ")
              .toLowerCase()
              .includes(searchQuery.toLowerCase())
          : true
      );

  // Observe active section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cat = entry.target.getAttribute("data-category") || "";
            setActiveCategory(cat);
          }
        });
      },
      { root: null, rootMargin: "-40% 0px -40% 0px", threshold: 0.01 }
    );

    Object.values(sectionRefs.current).forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [menuData]);

  const scrollToCategory = (category: string) => {
    const el = sectionRefs.current[category];
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Auto-scroll tabs
  useEffect(() => {
    const activeTab = document.querySelector("[aria-current='true']");
    if (activeTab && activeTab.parentElement) {
      const parent = activeTab.parentElement;
      const tabRect = activeTab.getBoundingClientRect();
      const parentRect = parent.getBoundingClientRect();
      parent.scrollTo({
        left:
          parent.scrollLeft +
          (tabRect.left - parentRect.left) -
          parentRect.width / 2 +
          tabRect.width / 2,
        behavior: "smooth",
      });
    }
  }, [activeCategory]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A2540] flex items-center justify-center">
        <div className="text-white text-lg animate-pulse">Loading Menu...</div>
      </div>
    );
  }

  // 🌈 Dynamic Backgrounds
  const bgColors = {
    all: "from-[#0A2540] via-[#11263d] to-[#1a3f5e]",
    veg: "from-[#0d291a] via-[#124d2e] to-[#19663d]",
    nonveg: "from-[#3f1c1c] via-[#5a2a2a] to-[#2c422a]",
  };

  // 🌈 Header Backgrounds
  const headerColors = {
    all: "bg-[#0A2540]/90",
    veg: "bg-[#10402b]/90",
    nonveg: "bg-[#422020]/90",
  };

  const accentColors = {
    all: "#FFD4C2",
    veg: "#9FFFCB",
    nonveg: "#FFB6A0",
  };

  return (
    <div
      className={`min-h-screen bg-gradient-to-br ${bgColors[filter]} text-white transition-all duration-700`}
    >
      {/* Top Header */}
      <div
        className={`sticky top-0 z-50 ${headerColors[filter]} backdrop-blur-sm border-b border-white/10 shadow-md transition-all duration-500`}
      >
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
          <button
            onClick={onNavigateHome}
            className="flex items-center gap-2 text-white hover:opacity-80 transition"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium text-sm">Home</span>
          </button>
          <h1
            className="text-base font-semibold tracking-wide"
            style={{
              backgroundImage: `linear-gradient(to right, ${accentColors[filter]}, #fff)`,
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}
          >
            Chef’s Menu
          </h1>
        </div>

        {/* Search Bar + Toggle */}
        <div className="max-w-3xl mx-auto px-4 pb-3 flex items-center gap-2">
          <div className="relative flex items-center flex-1">
            <Search className="absolute left-3 w-4 h-4 text-white/50" />
            <input
              type="text"
              placeholder="Search dishes"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-24 py-2.5 rounded-full bg-white/10 text-white placeholder-white/60 outline-none focus:ring-2 focus:ring-white/40 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-16 text-white/60 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}

            {/* Veg/Non-Veg Toggle */}
            <div className="absolute right-2 flex items-center gap-1 bg-white/10 rounded-full p-1">
              <button
                onClick={() => setFilter("veg")}
                className={`p-1.5 rounded-full transition-all ${
                  filter === "veg"
                    ? "bg-green-400 text-[#0b2b17] shadow"
                    : "text-white/70 hover:bg-white/10"
                }`}
                title="Show Veg"
              >
                <Leaf className="w-4 h-4" />
              </button>
              <button
                onClick={() => setFilter("nonveg")}
                className={`p-1.5 rounded-full transition-all ${
                  filter === "nonveg"
                    ? "bg-red-400 text-[#2e0000] shadow"
                    : "text-white/70 hover:bg-white/10"
                }`}
                title="Show Non-Veg"
              >
                <Drumstick className="w-4 h-4" />
              </button>
              <button
                onClick={() => setFilter("all")}
                className={`px-2 text-xs font-medium rounded-full transition-all ${
                  filter === "all"
                    ? "bg-gradient-to-r from-[#FFD4C2] to-[#FFF1E1] text-[#071726]"
                    : "text-white/70 hover:bg-white/10"
                }`}
                title="Show All"
              >
                All
              </button>
            </div>
          </div>
        </div>

        {/* Scrollable Tabs */}
        <div
          className={`relative border-t border-white/5 ${headerColors[filter]} backdrop-blur-sm`}
        >
          <div className="max-w-3xl mx-auto px-2 py-3 flex items-center gap-3 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => scrollToCategory(cat)}
                className={`flex-shrink-0 snap-center whitespace-nowrap text-sm font-semibold rounded-full transition-all duration-300 ${
                  activeCategory === cat
                    ? "px-5 py-2 bg-gradient-to-r from-[#FFD4C2] to-[#FFF1E1] text-[#071726] shadow-md scale-105"
                    : "px-4 py-1.5 bg-white/10 text-white/80 hover:bg-white/20"
                }`}
                aria-current={activeCategory === cat}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h2
            className="text-3xl font-extrabold drop-shadow-[0_0_8px_rgba(255,200,180,0.2)]"
            style={{
              backgroundImage: `linear-gradient(to right, ${accentColors[filter]}, #fff)`,
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}
          >
            Culinary Delights
          </h2>
          <p className="text-sm text-white/70 mt-2 tracking-wide">
            Crafted with passion, served with love
          </p>
        </div>

        {categories.map((category) => {
          const items = getItemsByCategory(category);
          if (items.length === 0) return null;

          return (
            <section
              key={category}
              data-category={category}
              ref={(el) => (sectionRefs.current[category] = el)}
              className="mb-10 scroll-mt-24"
            >
              <h3 className="text-xl font-semibold mb-3 pl-3 border-l-4 border-[#FFD4C2]">
                {category}
              </h3>
              <div className="flex flex-col gap-4">
                {items.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl border border-white/10 bg-white/5 shadow-sm hover:bg-white/10 transition-all duration-300"
                    style={{ backdropFilter: "blur(10px)" }}
                  >
                    <div className="flex items-start gap-4 flex-1 min-w-0">
                      <div
                        className={`flex items-center justify-center w-9 h-9 rounded-md flex-shrink-0 ${
                          item.Type === "Veg"
                            ? "bg-green-500/10 border border-green-500/20"
                            : "bg-red-500/10 border border-red-500/20"
                        }`}
                      >
                        {item.Type === "Veg" ? (
                          <Leaf className="w-4 h-4 text-green-400" />
                        ) : (
                          <Drumstick className="w-4 h-4 text-red-400" />
                        )}
                      </div>
                      <div className="min-w-0">
                        <div className="text-sm font-semibold text-white/95 break-words leading-snug">
                          {item["Dish Name"]}
                        </div>
                        {item.Description && (
                          <div className="text-xs text-white/60 mt-1 leading-tight break-words">
                            {item.Description}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="text-sm font-bold text-[#FFD4C2] bg-white/10 px-3 py-1 rounded-full shadow-inner self-start sm:self-center">
                      ₹{item.Price}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          );
        })}

        {/* Footer */}
        <div className="mt-10 text-center text-sm text-white/70">
          Menu items and prices are subject to change based on availability.
        </div>
      </main>
    </div>
  );
}
