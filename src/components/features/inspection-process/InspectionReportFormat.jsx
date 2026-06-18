"use client";
import Image from "next/image";

import {
  Car,
  Zap,
  Battery,
  Wrench,
  Layers,
  Tv,
  Armchair,
  History as HistoryIcon,
  Disc,
  Cpu,
  Sliders,
  Lock,
} from "lucide-react";

export default function InspectionReportFormat() {
  const items = [
    { label: "Vehicle Identity & Odometer", icon: Car },
    { label: "Engine & Powertrain Score", icon: Zap },
    { label: "EV Battery System (if applicable)", icon: Battery },
    { label: "Mechanical System Score", icon: Wrench },
    { label: "Exterior Panel Assessment", icon: Layers },
    { label: "Glass & Exterior Electronics", icon: Tv },
    { label: "Interior & Cabin Score", icon: Armchair },
    { label: "Structural History Score", icon: HistoryIcon },
    { label: "Tyre Condition & Tread Depth", icon: Disc },
    { label: "OBD Diagnostics Results", icon: Cpu },
    { label: "Modifications Detected", icon: Sliders },
  ];

  return (
    <section className="relative py-10  overflow-hidden">
      {/* ambient depth */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_75%_10%,rgba(255,255,255,0.05),transparent_45%)]" />

      <div className="relative max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="max-w-4xl mb-20">
          <p className="text-sm tracking-[0.45em] uppercase text-third font-semibold mb-6">
            Inspection Report Format
          </p>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.05] text-primary font-montserrat mb-8 md:mb-10">
            Standardized Digital <span className="text-fourth/80">Report</span>
          </h2>

          <p className="text-lg text-third/80 leading-relaxed max-w-3xl">
            Every Reecomm inspection produces a structured digital report —
            scored, categorised, and formatted consistently across every
            vehicle. What you see is what the inspector found. Nothing more.
            Nothing less.
          </p>
        </div>

        {/* 🔥 MAIN VISUAL GRID */}
        <div className="grid lg:grid-cols-12 gap-10 items-start">
          {/* LEFT — BIG REPORT MOCK */}
          <div className="lg:col-span-7">
            <div className="relative rounded-3xl border border-primary/10 bg-primary/4 backdrop-blur-md overflow-hidden">
              {/* top bar */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-primary/20 ">
                <div>
                  <p className="text-[10px] tracking-widest text-third/60 uppercase">
                    Reecomm Inspection Report
                  </p>
                  <p className="text-sm font-semibold text-primary">
                    Vehicle Condition Summary
                  </p>
                </div>

                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-fourth/15 text-primary text-xs font-semibold">
                  <Lock className="w-3.5 h-3.5" />
                  Locked
                </div>
              </div>

              {/* fake report preview image */}
              <div className="relative">
                <Image
                  src="https://images.unsplash.com/photo-1625047509168-a7026f36de04?q=80&w=1600&auto=format&fit=crop"
                  alt="Reecomm inspection digital report preview"
                  width={800}
                  height={500}
                  unoptimized
                  className="w-full h-60 md:h-112.5 object-cover opacity-90"
                />

                {/* overlay gradient */}
                <div className="absolute inset-0 bg-linear-to-t from-secondary/70 via-transparent to-transparent" />
              </div>

              {/* bottom meta strip */}
              <div className="grid grid-cols-3 gap-4 px-6 py-5 border-t border-primary/20 text-xs text-third/70">
                <div>
                  <p className="uppercase tracking-wider">Report ID</p>
                  <p className="text-primary font-medium">RC-IR-20481</p>
                </div>
                <div>
                  <p className="uppercase tracking-wider">Inspector</p>
                  <p className="text-primary font-medium">Verified</p>
                </div>
                <div>
                  <p className="uppercase tracking-wider">Timestamp</p>
                  <p className="text-primary font-medium">Auto-logged</p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT — FEATURE STACK */}
          <div className="lg:col-span-5 space-y-4">
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-primary font-montserrat">
                Report Sections
              </h3>
              <p className="text-sm text-third/75 mt-1">
                Report structure summary (what the report includes):
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {items.map((item, i) => {
                const Icon = item.icon;

                return (
                  <div
                    key={i}
                    className="
                      group
                      flex items-center gap-3
                      p-3 rounded-xl
                      border border-primary/10
                      bg-primary/3
                      backdrop-blur-md
                      transition-all duration-300
                      hover:border-primary/40
                    "
                  >
                    <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4 text-primary" />
                    </div>

                    <p className="text-xs font-medium text-primary/90 leading-snug">
                      {item.label}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* compliance note */}
            <div className="mt-6 p-5 rounded-2xl border border-primary/20 ">
              <p className="text-sm text-third/80 leading-relaxed">
                Reports are locked after submission. Any updates require a fresh
                inspection cycle to maintain platform integrity.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
