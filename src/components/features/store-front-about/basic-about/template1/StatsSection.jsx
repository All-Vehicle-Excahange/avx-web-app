"use client";

import React from "react";

export default function StatsSection() {
  const data = {
    statsDesc: `
      <p>
        Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec. Sapien platea nec urna ut est sed.
        Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec. Sapien platea nec urna ut est sed.
        Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec.
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
    <section className="relative py-12 px-2 lg:px-4   bg-primary text-secondary">
      <div className=" container  w-full flex flex-col items-center gap-16 text-center">

        {/* ── HEADING ───────────────── */}
        <div className="flex flex-col gap-6 max-w-2xl">
          <p className="text-sm tracking-[0.4em] uppercase text-secondary/60 font-semibold">
            Impact
          </p>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.05] font-[Montserrat]">
            Our 
            <span className="text-fourth/80"> Numbers</span>
          </h2>

          <div
            className="text-secondary/70 text-lg md:text-xl font-[Poppins] leading-relaxed"
            dangerouslySetInnerHTML={{ __html: data.statsDesc }}
          />
        </div>

        {/* ── STATS BOX LAYOUT ───────────────── */}
        <div className="w-full max-w-5xl grid sm:grid-cols-2 gap-8">

          {data.stats.map((item, index) => (
            <div
              key={index}
              className="flex flex-col gap-4 border border-secondary/10 p-8 rounded-2xl"
            >
              <h3 className="text-4xl lg:text-5xl font-semibold font-[Montserrat]">
                {item.number}
              </h3>

              <p className="text-secondary/70 text-base font-[Poppins]">
                {item.label}
              </p>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}