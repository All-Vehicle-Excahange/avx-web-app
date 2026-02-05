"use client";
import { useState, useEffect, useRef } from "react";
import StickyHeroNavbar from "./StickyHeroNavbar";
import VehicleFilterBar from "./VehicleFilterBar";
import { Car, User2, ChevronDown } from "lucide-react";

export default function HeroSection() {
  const [collapsed, setCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState("vehicles");
  const heroRef = useRef(null);
  const hasScrolledPast = useRef(false);

  useEffect(() => {
    let isScrolling = false;

    const handleWheel = (e) => {
      // Only trigger if we're at the top of the page and scrolling down
      if (
        window.scrollY < 100 &&
        e.deltaY > 0 &&
        !hasScrolledPast.current &&
        !isScrolling
      ) {
        isScrolling = true;
        hasScrolledPast.current = true;

        // Smooth scroll to just past the hero section
        const heroHeight = heroRef.current?.offsetHeight || window.innerHeight;

        window.scrollTo({
          top: heroHeight,
          behavior: "smooth",
        });

        // Reset scrolling flag after animation completes
        setTimeout(() => {
          isScrolling = false;
        }, 800);
      }

      // Reset when user scrolls back to top
      if (window.scrollY < 50) {
        hasScrolledPast.current = false;
      }
    };

    // Also handle scroll event to reset flag when at top
    const handleScroll = () => {
      if (window.scrollY < 50) {
        hasScrolledPast.current = false;
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative h-screen bg-cover bg-center"
      style={{
        backgroundImage: "url(/hero-section-bg.png)",
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40 z-0" />

      {/* 🔥 TOP GRADIENT SCRIM (KEY FIX) */}
      <div
        className="absolute top-0 left-0 right-0 h-32 z-1
    bg-linear-to-b from-black/70 via-black/40 to-transparent"
      />

      {/* Navbar */}
      <StickyHeroNavbar onScrollChange={setCollapsed} />

      {/* Hero Content */}
      <div
        className={`relative z-10 flex flex-col items-center justify-center h-full transition-opacity duration-300 ${
          collapsed ? "opacity-0" : "opacity-100"
        }`}
      >
        <p className="text-primary tracking-widest uppercase font-primary">
          Welcome to AVX
        </p>

        <h1 className="text-4xl font-bold text-primary drop-shadow-2xl font-primary">
          Pick Your Vehicle
        </h1>

        <div className="mt-[20vh] flex gap-6">
          {/* Vehicles Tab */}
          <button
            onClick={() => setActiveTab("vehicles")}
            className="relative flex cursor-pointer flex-col items-center text-primary"
          >
            <Car size={18} />
            <span className="mt-1 text-sm font-medium">Vehicle</span>
            {activeTab === "vehicles" && (
              <span className="absolute -bottom-2 h-0.5 w-full bg-primary rounded-full" />
            )}
          </button>

          {/* Users Tab */}
          <button
            onClick={() => setActiveTab("users")}
            className="relative flex cursor-pointer flex-col items-center text-primary"
          >
            <User2 size={18} />
            <span className="mt-1 text-sm font-medium">Consultant</span>
            {activeTab === "users" && (
              <span className="absolute -bottom-2 h-0.5 w-full bg-primary rounded-full" />
            )}
          </button>
        </div>
      </div>

      {/* Filter Bar – sticks to bottom INSIDE hero */}
      <div className="absolute bottom-8 left-0 right-0 z-20">
        <VehicleFilterBar />
      </div>

      {/* Scroll Indicator - hints user to scroll */}
      <div className="absolute bottom-2 left-1/2 scroll-indicator z-20">
        <ChevronDown className="text-primary/70 w-6 h-6" />
      </div>
    </section>
  );
}
