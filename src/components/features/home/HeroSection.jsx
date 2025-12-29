"use client";
import { useState } from "react";
import StickyHeroNavbar from "./StickyHeroNavbar";
import VehicleFilterBar from "./VehicleFilterBar";

export default function HeroSection() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <section className="relative h-[40vh] overflow-hidden">
      <StickyHeroNavbar onScrollChange={setCollapsed} />

      {/* GPU BASED COLLAPSE LAYER */}
      <div
        className={`absolute inset-0 bg-primary transition-transform duration-450 ease-[cubic-bezier(.4,0,.2,1)]
        ${collapsed ? "-translate-y-full" : "translate-y-0"}
      `}
      >
        <VehicleFilterBar />

        <section
          className={`flex flex-col items-center pt-28 pb-40 transition-opacity duration-300
          ${collapsed ? "opacity-0" : "opacity-100"}
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
