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
    image:
      "https://cdn.mos.cms.futurecdn.net/pdtizuU7fybQ9BTTJcCrKD.jpg",
    items: [
      "Engine performance",
      "Transmission condition",
      "Clutch operation",
      "Suspension",
      "Steering system",
      "Brake system",
    ],
  },
  {
    title: "Structural & Safety",
    subtitle: "Chassis integrity",
    icon: ShieldCheck,
    image:
      "https://thumbs.dreamstime.com/b/mechanic-inspecting-car-undercarriage-hydraulic-lift-garage-performing-inspection-under-lifted-vehicle-modern-professional-327177989.jpg",
    items: [
      "Chassis integrity",
      "Accident signs",
      "Frame alignment",
      "Airbag indicators",
      "Underbody condition",
    ],
  },
  {
    title: "Electrical & Electronics",
    subtitle: "Digital Health",
    icon: CircuitBoard,
    image:
      "https://ultrics.uk/wp-content/uploads/2024/10/Mechanic-hand-use-multimeter-voltmeter-to-check-the-voltage-level-in-a-car-battery.jpg",
    items: [
      "Battery health",
      "Instrument cluster",
      "Lighting systems",
      "Infotainment",
      "AC performance",
    ],
  },
  {
    title: "Exterior & Interior",
    subtitle: "Aesthetics",
    icon: Car,
    image:
      "https://cdn.prod.website-files.com/5897fc2c176071a2715ce48c/59ea06c668b8be0001f1c7c6_positestdft-main.jpg",
    items: [
      "Paint condition",
      "Panel gaps",
      "Scratch/dent visibility",
      "Seat condition",
      "Upholstery",
    ],
  },
  {
    title: "Documentation",
    subtitle: "Verification",
    icon: FileCheck2,
    image:
      "https://www.rtoofficedetails.app/_next/image?url=%2Fblog%2Flost-rc-book-apply-duplicate-rc-online-documents-fees-process-2025.webp&w=3840&q=75",
    items: [
      "RC details match",
      "Chassis validation",
      "Odometer consistency",
      "Insurance check",
    ],
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
              Diagnostic_Protocol
            </span>

          
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.05] text-primary font-montserrat">
            What AVX Inspection
              <br />
              <span className="text-fourth/80">
           Covers
              </span>
            </h2>

          </div>

          <p className="text-gray-400 max-w-sm text-sm leading-relaxed border-l border-primary/10 pl-6">
            A clean technical overview of the key systems analysed during our
            structured inspection process.
          </p>
        </div>

        {/* GRID */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">

          {categories.map((cat, idx) => (
            <div
              key={idx}
              className="relative group rounded-2xl overflow-hidden border border-primary/10 h-[260px] hover:border-primary/40 transition"
            >

              {/* IMAGE */}
              <img
                src={cat.image}
                alt={cat.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition duration-700 group-hover:grayscale-50"
              />

              {/* DARK OVERLAY */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/90 via-[#050505]/60 to-transparent" />

              {/* CONTENT */}
              <div className="relative z-10 h-full p-5 flex flex-col justify-between">

                <div className="flex justify-between items-start">

                  <div className="p-2.5  rounded-xl border border-primary/30 group-hover:bg-primary/20 transition">
                    <cat.icon size={18} className="text-primary" />
                  </div>

                  <ArrowUpRight className="text-primary/20 group-hover:text-primary transition" />

                </div>

                <div>

                  <h3 className="text-primary text-lg font-semibold mb-1">
                    {cat.title}
                  </h3>

                  <p className="text-primary text-xs font-mono uppercase tracking-widest mb-3">
                    {cat.subtitle}
                  </p>

                  <div className="space-y-1 opacity-0 group-hover:opacity-100 transition">

                    {cat.items.slice(0, 4).map((item, i) => (
                      <div key={i} className="flex items-start gap-2">

                        <CheckCircle2
                          size={13}
                          className="text-primary mt-[3px]"
                        />

                        <span className="text-primary/80 text-xs">
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
          <div className="rounded-2xl border border-dashed border-primary/20 flex flex-col items-center justify-center p-8 text-center hover:bg-primary/5 hover:border-primary/40 transition cursor-pointer">

            <div className="w-12 h-12 rounded-full bg-primary/5 flex items-center justify-center mb-4">
              <ArrowUpRight className="text-primary" />
            </div>

            <p className="text-primary text-sm font-semibold uppercase tracking-widest">
              Full 200+ Points
            </p>

            <p className="text-primary/40 text-xs mt-1">
              View Full Checklist
            </p>

          </div>

        </div>
      </div>
    </section>
  );
}