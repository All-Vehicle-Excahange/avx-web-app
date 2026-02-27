"use client";

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
    title: "Mechanical Systems",
    subtitle: "Core Performance",
    icon: Wrench,
    items: [
      "Engine performance",
      "Transmission condition",
      "Clutch operation",
      "Suspension",
      "Steering system",
      "Brake system",
    ],
    image: "https://cdn.mos.cms.futurecdn.net/pdtizuU7fybQ9BTTJcCrKD.jpg",
    className: "md:col-span-2 md:row-span-2",
  },
  {
    title: "Structural & Safety",
    subtitle: "Chassis integrity",
    icon: ShieldCheck,
    items: [
      "Chassis integrity",
      "Accident signs",
      "Frame alignment",
      "Airbag indicators",
      "Underbody condition",
    ],
    image:
      "https://thumbs.dreamstime.com/b/mechanic-inspecting-car-undercarriage-hydraulic-lift-garage-performing-inspection-under-lifted-vehicle-modern-professional-327177989.jpg",
    className: "md:col-span-1 md:row-span-1",
  },
  {
    title: "Electrical & Electronics",
    subtitle: "Digital Health",
    icon: CircuitBoard,
    items: [
      "Battery health",
      "Instrument cluster",
      "Lighting systems",
      "Infotainment",
      "AC performance",
    ],
    image:
      "https://ultrics.uk/wp-content/uploads/2024/10/Mechanic-hand-use-multimeter-voltmeter-to-check-the-voltage-level-in-a-car-battery.jpg",
    className: "md:col-span-1 md:row-span-1",
  },
  {
    title: "Exterior & Interior",
    subtitle: "Aesthetics",
    icon: Car,
    items: [
      "Paint condition",
      "Panel gaps",
      "Scratch/dent visibility",
      "Seat condition",
      "Upholstery",
    ],
    image:
      "https://cdn.prod.website-files.com/5897fc2c176071a2715ce48c/59ea06c668b8be0001f1c7c6_positestdft-main.jpg",
    className: "md:col-span-1 md:row-span-2",
  },
  {
    title: "Documentation",
    subtitle: "Verification",
    icon: FileCheck2,
    items: [
      "RC details match",
      "Chassis number validation",
      "Odometer consistency",
      "Insurance check",
    ],
    image:
      "https://www.rtoofficedetails.app/_next/image?url=%2Fblog%2Flost-rc-book-apply-duplicate-rc-online-documents-fees-process-2025.webp&w=3840&q=75",
    className: "md:col-span-1 md:row-span-1",
  },
];

export default function InspectionCovers() {
  return (
    <section className="py-10  ">
      <div className="w-full mx-auto">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-6">
          <div className="space-y-4">
            <span className="text-xs md:text-sm tracking-[0.4em] uppercase text-third font-semibold">
              Diagnostic_Protocol
            </span>

            <h2 className="text-white text-3xl sm:text-4xl md:text-6xl font-bold tracking-tighter uppercase">
              What AVX <span className="text-white/20">Inspection Covers</span>
            </h2>
          </div>

          <p className="text-gray-400 max-w-sm text-xs md:text-sm font-light leading-relaxed border-l border-white/10 pl-4 md:pl-6">
            A clean, technical breakdown of our multi-layered vehicle diagnostic
            matrix.
          </p>
        </div>

        {/* ✅ RESPONSIVE GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[240px] md:auto-rows-[280px]">
          {categories.map((cat, idx) => (
            <div
              key={idx}
              className={`group relative rounded-4xl overflow-hidden border border-white/10 bg-[#0f0f0f] transition-all duration-500 hover:border-fourth/40 ${cat.className}`}
            >
              {/* IMAGE */}
              <div className="absolute inset-0 z-0">
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="w-full h-full object-cover opacity-70 md:group-hover:opacity-90 md:group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-linear-to-t from-[#050505]/80 via-transparent to-transparent" />
              </div>

              {/* CONTENT */}
              <div className="relative z-10 h-full p-4 md:p-5 flex flex-col justify-between">
                {/* TOP */}
                <div className="flex justify-between items-start">
                  <div className="p-2.5 md:p-3 bg-black/40 backdrop-blur-md rounded-xl md:rounded-2xl border border-white/10 md:group-hover:bg-fourth/20 transition-colors duration-300">
                    <cat.icon size={20} className="text-white" />
                  </div>

                  <ArrowUpRight className="text-white/20 md:group-hover:text-fourth transition-colors" />
                </div>

                {/* TITLE */}
                <div>
                  <h3 className="text-white text-base md:text-lg font-bold mb-1">
                    {cat.title}
                  </h3>

                  <p className="text-fourth text-[11px] md:text-[14px] font-mono uppercase tracking-widest mb-2 md:mb-3">
                    {cat.subtitle}
                  </p>

                  {/* ✅ MOBILE: always visible | DESKTOP: hover */}
                  <div className="space-y-1 opacity-100 md:opacity-0 md:group-hover:opacity-100 transform translate-y-0 md:translate-y-4 md:group-hover:translate-y-0 transition-all duration-300">
                    {cat.items.map((item, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <CheckCircle2
                          size={13}
                          className="text-fourth mt-0.5 shrink-0"
                        />
                        <span className="text-white/80 text-[12px] md:text-[13px] leading-snug">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* CTA */}
          <div className="sm:col-span-2 md:col-span-1 md:row-span-1 rounded-4xl border border-dashed border-white/20 flex flex-col items-center justify-center p-6 md:p-8 text-center hover:bg-fourth/5 hover:border-fourth/40 transition-all cursor-pointer group min-h-50">
            <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-4 group-hover:bg-fourth/30 transition-all">
              <ArrowUpRight className="text-white group-hover:rotate-45 transition-transform" />
            </div>

            <p className="text-white text-sm font-bold uppercase tracking-widest">
              Full 200+ Points
            </p>
            <p className="text-white/40 text-[10px] mt-1">
              View Full Checklist
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
