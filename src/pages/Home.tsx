// ...existing imports...
import { Phone, MessageCircle, MapPin, Instagram, Facebook, Mail } from "lucide-react";
import { useEffect } from "react";
import ImageCarousel from "../components/ImageCarousel";
import AnimatedText from "../components/AnimatedText";

interface HomeProps {
  onNavigateToMenu: () => void;
}

export default function Home({ onNavigateToMenu }: HomeProps) {
  const phoneNumber = "9063906920";
  const whatsappMessage = encodeURIComponent("Hi! I'd like to book a table at Avenue222.");
  const mapsUrl = "https://maps.google.com/?q=Avenue222+Restaurant";

  // Add structured data (Schema.org JSON-LD) for better SEO
  useEffect(() => {
    const schemaData = {
      "@context": "https://schema.org",
      "@type": "Restaurant",
      "name": "Avenue222",
      "image": "https://avenue222.in/og-image.jpg",
      "description": "A celebration of taste, crafted with passion and served with warmth. Avenue222 is where elegance meets taste.",
      "url": "https://avenue222.in",
      "telephone": "+91-9063906920",
      "priceRange": "₹₹₹",
      "addressCountry": "IN",
      "cuisineType": "Indian, Continental",
      "servesCuisine": ["Indian", "Continental", "Tandoori"],
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "Reservation",
        "telephone": "+91-9063906920",
        "contactOption": "TollFree"
      },
      "sameAs": [
        "https://instagram.com",
        "https://facebook.com"
      ]
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(schemaData);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const handlePhoneClick = () => window.location.href = `tel:${phoneNumber}`;
  const handleWhatsAppClick = () => window.open(`https://wa.me/${phoneNumber}?text=${whatsappMessage}`, "_blank");
  const handleDirectionsClick = () => window.open(mapsUrl, "_blank");

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a182e] via-[#11263d] to-[#1a3f5e] text-white">
      {/* 🌟 Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <ImageCarousel />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-[#0A2540]/80" />

        <div className="relative z-10 text-center px-6 py-16">
          <AnimatedText
            text="Welcome to Avenue222"
            className="text-6xl md:text-7xl font-extrabold mb-6 bg-gradient-to-r from-[#FFF1E1] to-[#FFD4C2] bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(255,200,150,0.3)]"
          />
          <p className="text-white/90 text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
            A celebration of taste, crafted with passion and served with warmth.
          </p>

          <button
            onClick={onNavigateToMenu}
            className="relative px-10 py-4 bg-gradient-to-r from-[#FFD4C2] via-[#FFE9E9] to-[#FFF9F5] text-[#0A2540] font-semibold rounded-full shadow-[0_8px_25px_rgba(255,200,180,0.4)] hover:shadow-[0_0_25px_rgba(255,180,180,0.7)] hover:scale-105 transition-all duration-300"
          >
            Chef’s Menu 🍽️
            <span className="absolute inset-0 rounded-full bg-white/30 blur-lg opacity-0 group-hover:opacity-100 transition-all duration-300" />
          </button>
        </div>

        {/* ↓ scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
            <div className="w-1.5 h-3 bg-white/70 rounded-full animate-pulse" />
          </div>
        </div>
      </section>

      {/* 📞 Booking Section */}
      <section className="relative bg-gradient-to-b from-[#0A2540] to-[#163757] py-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,255,255,0.05),_transparent_70%)]" />
        <div className="relative max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 bg-gradient-to-r from-[#FFF1E1] to-[#FFD4C2] bg-clip-text text-transparent">
            Reserve Your Culinary Journey
          </h2>
          <p className="text-white/80 text-lg md:text-xl mb-12">
            Book your table in advance and indulge in a one-of-a-kind dining experience.
          </p>

          <div className="flex flex-wrap justify-center gap-10 mb-16">
            {/* Phone */}
            <button
              onClick={handlePhoneClick}
              className="group flex flex-col items-center gap-3 hover:scale-110 transition-all duration-300"
            >
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#A2D2FF] to-[#4A9FF5] flex items-center justify-center shadow-lg group-hover:shadow-[0_0_25px_rgba(162,210,255,0.6)]">
                <Phone className="w-10 h-10 text-white" />
              </div>
              <span className="text-white font-medium tracking-wide">Call Us</span>
            </button>

            {/* WhatsApp */}
            <button
              onClick={handleWhatsAppClick}
              className="group flex flex-col items-center gap-3 hover:scale-110 transition-all duration-300"
            >
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#25D366] to-[#128C7E] flex items-center justify-center shadow-lg group-hover:shadow-[0_0_25px_rgba(37,211,102,0.6)]">
                <MessageCircle className="w-10 h-10 text-white" />
              </div>
              <span className="text-white font-medium tracking-wide">WhatsApp</span>
            </button>
          </div>

          <button
            onClick={handleDirectionsClick}
            className="inline-flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-[#FFD4C2] via-[#FFF1E1] to-[#FFF9F5] text-[#0A2540] font-semibold rounded-full shadow-[0_8px_25px_rgba(255,200,180,0.4)] hover:scale-105 transition-all duration-300"
          >
            <MapPin className="w-6 h-6" />
            Get Directions
          </button>
        </div>
      </section>

      {/* 🍽️ Explore Menu */}
      <section className="relative bg-gradient-to-b from-[#163757] to-[#0A2540] py-20 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <button
            onClick={onNavigateToMenu}
            className="group inline-flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-[#A2D2FF] via-[#BDE0FE] to-[#4A9FF5] text-[#071726] font-bold rounded-full shadow-[0_8px_25px_rgba(162,210,255,0.5)] hover:scale-105 hover:shadow-[0_0_35px_rgba(162,210,255,0.8)] transition-all duration-300"
          >
            Explore Our Chef’s Menu ✨
          </button>
        </div>
      </section>

      {/* 🥂 About Section */}
      <section className="relative bg-[#0A2540] py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-6 bg-gradient-to-r from-[#FFF1E1] to-[#FFD4C2] bg-clip-text text-transparent">
            About Avenue222
          </h2>
          <p className="text-white/80 text-lg leading-relaxed mb-12 max-w-2xl mx-auto">
            Avenue222 is where elegance meets taste. Our chefs blend authentic recipes with modern artistry, creating
            an unforgettable culinary journey in a cozy, refined ambiance.
          </p>

          <div className="flex justify-center gap-8 mb-10">
            <a
              href="https://instagram.com"
              target="_blank"
              className="group transform transition-all hover:scale-110"
            >
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#FFD4C2] to-[#FFF1E1] flex items-center justify-center shadow-lg group-hover:shadow-[0_0_15px_rgba(255,200,180,0.5)]">
                <Instagram className="w-8 h-8 text-[#071726]" />
              </div>
            </a>

            <a
              href="https://facebook.com"
              target="_blank"
              className="group transform transition-all hover:scale-110"
            >
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#A2D2FF] to-[#4A9FF5] flex items-center justify-center shadow-lg group-hover:shadow-[0_0_15px_rgba(162,210,255,0.5)]">
                <Facebook className="w-8 h-8 text-white" />
              </div>
            </a>

            <a
              href="mailto:avenue222@gmail.com"
              className="group transform transition-all hover:scale-110"
            >
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#FFD4C2] to-[#FFF1E1] flex items-center justify-center shadow-lg group-hover:shadow-[0_0_15px_rgba(255,200,180,0.5)]">
                <Mail className="w-8 h-8 text-[#071726]" />
              </div>
            </a>
          </div>

          <div className="mt-10 pt-8 border-t border-white/10 text-white/60 text-sm">
            © {new Date().getFullYear()} Avenue222 — All rights reserved.
          </div>
        </div>
      </section>
    </div>
  );
}
