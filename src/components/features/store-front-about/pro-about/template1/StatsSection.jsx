"use client";

import React from "react";

export default function StatsSection() {
  const data = {
    statsDesc: `
      <p>
        Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec. Sapien platea nec urna ut est sed.
        Lorem ipsum dolor sit amet consectetur.
      </p>
    `,
    stats: [
      { number: "150K+", label: "Active Users Worldwide" },
      { number: "$2B+", label: "Transactions Processed" },
      { number: "98%", label: "Customer Satisfaction" },
      { number: "100+", label: "Team Members" },
    ],
  };

  return (
    <section className="relative py-12 bg-primary text-secondary overflow-hidden">

      {/* subtle glow */}
      <div className="absolute inset-0 flex justify-center pointer-events-none">
        <div className="w-[600px] h-[600px] bg-fourth/10 blur-[140px] rounded-full"></div>
      </div>

      <div className="relative max-w-5xl mx-auto px-4 text-center">

        {/* ── HEADER ── */}
        <div className="flex flex-col gap-6 mb-20">

          <p className="text-sm tracking-[0.4em] uppercase text-secondary/60 font-semibold">
            Impact
          </p>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.05] font-[Montserrat]">
            Our <span className="text-fourth/80">Numbers</span>
          </h2>

          <div
            className="text-secondary/70 text-lg md:text-xl font-[Poppins] leading-relaxed max-w-2xl mx-auto"
            dangerouslySetInnerHTML={{ __html: data.statsDesc }}
          />

        </div>

        {/* ── STATS GRID ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 border border-secondary/10">

          {data.stats.map((item, index) => (
            <div
              key={index}
              className="relative p-10 group border border-secondary/10 hover:bg-secondary/5 transition-all duration-500"
            >
              {/* hover glow line */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 border border-fourth/30"></div>

              <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold font-[Montserrat] text-secondary mb-4">
                {item.number}
              </h3>

              <p className="text-secondary/60 text-sm md:text-base font-[Poppins] leading-relaxed">
                {item.label}
              </p>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}