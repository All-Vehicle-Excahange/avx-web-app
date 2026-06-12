"use client";
import { useState } from "react";
import StickyHeroNavbar from "./StickyHeroNavbar";
import VehicleFilterBar from "./VehicleFilterBar";
import { Car, User2 } from "lucide-react";

export default function HeroSection() {
  const [collapsed, setCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState("vehicles");

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="/intro_home.mp4" type="video/mp4" />
      </video>
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
        {/* <p className="text-primary tracking-widest uppercase font-primary">
          Welcome to reecomm
        </p>

        <h1 className="text-4xl font-bold text-primary drop-shadow-2xl font-primary">
          Pick Your Vehicle
        </h1> */}

        <div className="mt-[20vh] hidden lg:flex items-center gap-6 relative bottom-10 lg:bottom-5 xl:bottom-8 select-none">
          {/* Vehicles Tab Label */}
          <button
            onClick={() => setActiveTab("vehicles")}
            className={`flex items-center gap-2 cursor-pointer transition-all duration-300 ${
              activeTab === "vehicles"
                ? "text-primary scale-105 font-semibold"
                : "text-primary/50 hover:text-primary/80"
            }`}
          >
            <Car size={20} />
            <span className="text-base tracking-wide font-medium">Vehicle</span>
          </button>

          {/* Central Toggle Switch */}
          <button
            onClick={() =>
              setActiveTab((prev) =>
                prev === "vehicles" ? "consult" : "vehicles"
              )
            }
            aria-label="Toggle between vehicles and consultants"
            className="relative w-16 h-9 rounded-full bg-white/10 backdrop-blur-md border border-white/20 p-1 cursor-pointer transition-all duration-300 hover:border-white/40 focus:outline-none"
          >
            {/* Sliding circular knob */}
            <div
              className={`absolute top-1 w-7 h-7 rounded-full shadow-lg transition-all duration-300 ease-out flex items-center justify-center ${
                activeTab === "vehicles"
                  ? "left-1 bg-fourth"
                  : "left-[calc(100%-2rem)] bg-primary"
              }`}
            >
              <div className="w-2 h-2 rounded-full bg-secondary/30" />
            </div>
          </button>

          {/* Users Tab Label */}
          <button
            onClick={() => setActiveTab("consult")}
            className={`flex items-center gap-2 cursor-pointer transition-all duration-300 ${
              activeTab === "consult"
                ? "text-primary scale-105 font-semibold"
                : "text-primary/50 hover:text-primary/80"
            }`}
          >
            <User2 size={20} />
            <span className="text-base tracking-wide font-medium">Consultant</span>
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
