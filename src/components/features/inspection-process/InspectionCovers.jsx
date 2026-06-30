"use client";
import Image from "next/image";

import React from "react";
import {
  Wrench,
  ShieldCheck,
  CircuitBoard,
  Car,
  FileCheck2,
  CheckCircle2,
  ArrowUpRight,
} from "lucide-react";

const categories = [
  {
    title: "Engine & Powertrain",
    icon: Wrench,
    image: "/engine-and-powertrain.webp",
    description:
      "Assesses engine health, fuel system, oil and coolant leakage, exhaust condition, wiring harness, battery voltage, gearbox, clutch life, and drivetrain integrity.",
  },
  {
    title: "Mechanical System",
    icon: ShieldCheck,
    image: "/mechanical-system.webp",
    description:
      "Covers steering performance, suspension health, brake pad life, shock absorbers, ABS warning status, and all safety-critical mechanical components.",
  },
  {
    title: "Exterior Panels & Body",
    icon: Car,
    image: "/exterior-panels-and-body.webp",
    description:
      "Evaluates every exterior panel for repainting, dents, scratches, and rust — with individual severity ratings and photographic documentation per panel.",
  },
  {
    title: "Interior & Cabin",
    icon: CircuitBoard,
    image: "/intinor-and-cabin-2.webp",
    description:
      "Checks AC cooling and heating, infotainment, power windows, central locking, airbags, seat condition, dashboard condition, and odometer reading — with a full interior video.",
  },
  {
    title: "Structural History",
    icon: FileCheck2,
    image: "/structural-history.webp",
    description:
      "Identifies structural damage, flood damage confirmation, underbody condition, rust presence, and chassis alignment issues.",
  },
  {
    title: "Tyres & OBD Diagnostics",
    icon: CheckCircle2,
    image: "/tyres-and-obd-diagnostics.webp",
    description:
      "Measures tread depth in mm for all four tyres plus the spare, records tyre condition ratings, and captures full OBD diagnostic scan results including error codes and emission status.",
  },
];

export default function InspectionCovers() {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-4">
            <span className="text-xs tracking-[0.4em] uppercase text-third font-semibold">
              Inspection Coverage
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.05] text-primary font-montserrat">
              What Reecomm Inspection
              <br />
              <span className="text-fourth/80">Covers</span>
            </h2>
          </div>

          <p className="text-gray-400 w-2xl text-sm leading-relaxed border-l border-primary/10 pl-6">
            Our inspection is not a checklist of surface observations. It is a
            structured 11-category evaluation — scored, photographed, and
            documented by trained, independent inspectors. Here is what every
            report examines.
          </p>
        </div>

        {/* GRID */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, idx) => (
            <div
              key={idx}
              className="relative group rounded-2xl overflow-hidden border border-primary/10 min-h-[280px] hover:border-primary/40 transition"
            >
              {/* IMAGE */}
              <Image
                src={cat.image}
                alt={cat.title}
                fill
                unoptimized
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition duration-700 group-hover:grayscale-50"
              />

              {/* DARK OVERLAY */}
              <div className="absolute inset-0 bg-linear-to-t from-[#050505]/90 via-[#050505]/60 to-transparent" />

              {/* CONTENT */}
              <div className="relative z-10 h-full p-5 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <div className="p-2.5  rounded-xl border border-primary/30 group-hover:bg-primary/20 transition">
                    <cat.icon size={18} className="text-primary" />
                  </div>

                  <ArrowUpRight className="text-primary/20 group-hover:text-primary transition" />
                </div>

                <div>
                  <h3 className="text-primary text-lg font-semibold mb-2">
                    {cat.title}
                  </h3>

                  <div className="h-0 opacity-0 group-hover:h-auto group-hover:opacity-100 transition-all duration-300">
                    <p className="text-primary/80 text-xs leading-relaxed">
                      {cat.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Small Supporting Note */}
        <div className="mt-10 border-t border-primary/10 pt-6">
          <p className="text-xs md:text-sm text-third/60 italic text-center md:text-left max-w-3xl mx-auto md:mx-0">
            *EV Battery System inspection is included for electric vehicles —
            covering battery SoH %, SoC %, charging port condition, BMS
            warnings, and high-voltage wiring.
          </p>
        </div>
      </div>
    </section>
  );
}
