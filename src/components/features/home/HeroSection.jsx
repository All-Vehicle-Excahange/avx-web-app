"use client";
import { useEffect, useState } from "react";
import StickyHeroNavbar from "./StickyHeroNavbar";
import VehicleFilterBar from "./VehicleFilterBar";

export default function HeroSection() {
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const onScroll = () => setCollapsed(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      className={`relative transition-all duration-700 ease-in-out
      ${collapsed ? "h-24" : "h-[40vh]"}`}
    >
      <StickyHeroNavbar />

      {/* HERO CONTENT */}
      <div className="absolute inset-0 overflow-hidden bg-primary">
        <div
          className={`absolute inset-0 transition-all duration-700 ease-in-out
          ${collapsed ? "opacity-0 -translate-y-16 pointer-events-none" : "opacity-100 translate-y-0"}
        `}
        >
          <VehicleFilterBar />
        </div>

        <section
          className={`relative z-10 flex flex-col items-center pt-28 pb-40 transition-all duration-700
          ${collapsed ? "opacity-0 -translate-y-10" : "opacity-100 translate-y-0"}
        `}
        >
          <p className="text-secondary tracking-widest uppercase">
            Welcome to AVX
          </p>
          <h1 className="text-4xl font-bold text-secondary drop-shadow-2xl">
            Pick Your Vehicle
          </h1>
        </section>
      </div>
    </section>
  );
}
