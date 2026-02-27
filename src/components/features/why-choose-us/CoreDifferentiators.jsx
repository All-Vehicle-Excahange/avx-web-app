"use client";

import { ShieldCheck, FileText, SearchCheck, BarChart4 } from "lucide-react";

export default function CoreDifferentiatorsMatrix() {
  const pillars = [
    {
      id: "01",
      title: "Verified Consultant Ecosystem",
      desc: "Identity verification before listing vehicles. No anonymous sellers.",
      icon: <ShieldCheck size={20} />,
    },
    {
      id: "02",
      title: "Structured Vehicle Listings",
      desc: "Standardized format for ownership, specs, disclosures. No vague descriptions.",
      icon: <FileText size={20} />,
    },
    {
      id: "03",
      title: "Inspection Visibility",
      desc: "200-point inspection framework with re-verification support.",
      icon: <SearchCheck size={20} />,
    },
    {
      id: "04",
      title: "Performance Accountability",
      desc: "Ratings, response metrics, inspection ratios displayed publicly.",
      icon: <BarChart4 size={20} />,
    },
  ];

  return (
    <section>
      <div className="w-full mx-auto relative">
        {/* HEADER */}
        <div className="text-center mb-24">
          <p className="text-sm tracking-[0.4em] uppercase text-third font-semibold mb-4">
            CORE DIFFERENTIATORS
          </p>

          <h2 className=" font-primary text-3xl sm:text-4xl lg:text-5xl font-bold uppercase font-primary tracking-tight">
            Platform <span className="text-fourth">Infrastructure</span>
          </h2>
        </div>

        {/* MATRIX */}
        <div className="relative border border-white/10 rounded-3xl overflow-hidden">
          {/* Center Label */}
          <div className="hidden md:flex absolute inset-50 items-center justify-center pointer-events-none">
            <div className="px-8 py-3 border border-fourth/30 text-xs uppercase tracking-[0.3em] text-fourth bg-secondary">
              AVX SYSTEM CORE
            </div>
          </div>

          <div className="grid md:grid-cols-2">
            {pillars.map((item, i) => (
              <div
                key={i}
                className="p-12 border border-white/5 hover:bg-fourth/5 transition-all duration-500 group"
              >
                <div className="flex items-center justify-between mb-6">
                  <span className="text-sm tracking-[0.3em] text-third">
                    {item.id}
                  </span>
                  <span className="text-fourth">{item.icon}</span>
                </div>

                <h3 className="text-xl font-bold font-primary uppercase tracking-wide mb-4">
                  {item.title}
                </h3>

                <div className="h-px bg-white/10 mb-4 group-hover:bg-fourth/30 transition-all"></div>

                <p className="text-sm text-third leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
