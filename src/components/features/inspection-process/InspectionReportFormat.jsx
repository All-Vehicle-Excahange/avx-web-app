"use client";

import {
  ClipboardList,
  ImageIcon,
  GaugeCircle,
  FileText,
  Clock,
  UserCheck,
  Lock,
} from "lucide-react";

export default function InspectionReportFormat() {
  const items = [
    { label: "Structured checklist", icon: ClipboardList },
    { label: "High-resolution photos", icon: ImageIcon },
    { label: "Condition grading", icon: GaugeCircle },
    { label: "Observations summary", icon: FileText },
    { label: "Timestamp", icon: Clock },
    { label: "Inspector identification", icon: UserCheck },
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

  <h2 className="
    text-4xl sm:text-5xl xl:text-6xl 
    font-semibold 
    text-primary 
    leading-tight 
    mb-6
  ">
    Standardized Digital{" "}
    <span className="text-[#1f6feb]">Report</span>
  </h2>

  <p className="text-lg text-third/80 leading-relaxed max-w-3xl">
    Every AVX inspection generates a structured digital report built
    for clarity, traceability, and professional review.
  </p>
</div>


        {/* 🔥 MAIN VISUAL GRID */}
        <div className="grid lg:grid-cols-12 gap-10 items-start">
          
          {/* LEFT — BIG REPORT MOCK */}
          <div className="lg:col-span-7">
            <div className="relative rounded-3xl border border-white/10 bg-white/4 backdrop-blur-md overflow-hidden">

              {/* top bar */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-black/40">
                <div>
                  <p className="text-[10px] tracking-widest text-third/60 uppercase">
                    AVX Inspection Report
                  </p>
                  <p className="text-sm font-semibold text-primary">
                    Vehicle Condition Summary
                  </p>
                </div>

                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-fourth/15 text-fourth text-xs font-semibold">
                  <Lock className="w-3.5 h-3.5" />
                  Locked
                </div>
              </div>

              {/* fake report preview image */}
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1625047509168-a7026f36de04?q=80&w=1600&auto=format&fit=crop



"

                  alt="AVX inspection digital report preview"
                className="w-full h-60 md:h-112.5 object-cover opacity-90"

                />

                {/* overlay gradient */}
                <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent" />
              </div>

              {/* bottom meta strip */}
              <div className="grid grid-cols-3 gap-4 px-6 py-5 border-t border-white/10 text-xs text-third/70">
                <div>
                  <p className="uppercase tracking-wider">Report ID</p>
                  <p className="text-primary font-medium">AVX-IR-20481</p>
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
            {items.map((item, i) => {
              const Icon = item.icon;

              return (
                <div
                  key={i}
                  className="
                    group
                    flex items-center gap-4
                    p-4 rounded-xl
                    border border-white/10
                    bg-white/3
                    backdrop-blur-md
                    transition-all duration-300
                    hover:border-white/20
                    hover:bg-white/5
                  "
                >
                  <div className="w-11 h-11 rounded-lg bg-fourth/10 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-fourth" />
                  </div>

                  <p className="text-sm text-primary/90 leading-relaxed">
                    {item.label}
                  </p>
                </div>
              );
            })}

            {/* compliance note */}
            <div className="mt-6 p-5 rounded-2xl border border-white/10 bg-black/30">
              <p className="text-sm text-third/80 leading-relaxed">
                Reports are locked after submission. Any updates require a
                fresh inspection cycle to maintain platform integrity.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
