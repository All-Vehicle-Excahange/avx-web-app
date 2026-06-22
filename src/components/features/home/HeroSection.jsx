"use client";
import { useState } from "react";
import StickyHeroNavbar from "./StickyHeroNavbar";
import VehicleFilterBar from "./VehicleFilterBar";
import { Car, User2 } from "lucide-react";
import Image from "next/image";

export default function HeroSection() {
  const [collapsed, setCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState("vehicles");

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Video Background */}
      <Image
        src="/hero_main_image.png"
        fill
        className="absolute inset-0 w-full h-full object-cover z-0"
        alt="Hero background"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/30 z-0" />

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
        <div className="text-center max-w-3xl px-4 select-none flex flex-col items-center gap-3 mb-8 animate-fade-up">
          <span className="text-xs text-fourth md:text-sm uppercase tracking-[0.3em]  font-semibold drop-shadow-md">
            One Ecosystem. Every Side.
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-white leading-none w-6xl tracking-tight drop-shadow-xl font-primary">
            Buyers. Sellers. Consultants.
          </h1>
          <p className="text-lg md:text-2xl text-white/80 font-medium tracking-wide drop-shadow-md">
            One trusted marketplace.
          </p>
        </div>

        {/* Tab Links with Bottom Border */}
        <div className="mt-4 hidden lg:flex items-center gap-8 relative bottom-10 lg:bottom-5 xl:bottom-8 select-none">
          <button
            onClick={() => setActiveTab("vehicles")}
            className={`flex items-center gap-2 pb-2 border-b-2 transition-all duration-300 cursor-pointer ${
              activeTab === "vehicles"
                ? "border-primary text-primary font-semibold"
                : "border-transparent text-primary/60 hover:text-primary hover:border-primary/50"
            }`}
          >
            <Car size={20} />
            <span className="text-base tracking-wide">Vehicle</span>
          </button>

          <button
            onClick={() => setActiveTab("consult")}
            className={`flex items-center gap-2 pb-2 border-b-2 transition-all duration-300 cursor-pointer ${
              activeTab === "consult"
                ? "border-primary text-primary font-semibold"
                : "border-transparent text-primary/60 hover:text-primary hover:border-primary/50"
            }`}
          >
            <User2 size={20} />
            <span className="text-base tracking-wide">Consultant</span>
          </button>
        </div>
      </div>

      {/* Filter Bar – sticks to bottom INSIDE hero */}
      <div className="absolute bottom-2 left-0 right-0 z-20">
        <VehicleFilterBar activeType={activeTab} />
      </div>

      {/* Scroll Indicator - hints user to scroll */}
      {/* <div className="absolute bottom-2 left-1/2 scroll-indicator z-20">
        <ChevronDown className="text-primary/70 w-6 h-6" />
      </div> */}
    </section>
  );
}
