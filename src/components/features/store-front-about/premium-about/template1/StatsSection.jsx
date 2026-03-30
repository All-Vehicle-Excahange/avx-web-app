
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
    <section className="relative py-12  bg-primary text-secondary overflow-hidden">

      <div className=" conatiner w-full max-w-7xl  mx-auto px-4 lg:px-8 grid lg:grid-cols-2 gap-16 items-center">

        {/* ── LEFT: TEXT ── */}
        <div className="flex flex-col gap-6 text-left">

          <p className="text-sm tracking-[0.4em] uppercase text-secondary/60 font-semibold">
            Impact
          </p>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.05] font-[Montserrat]">
            Our
            <span className="text-fourth/80"> Numbers</span>
          </h2>

          <div
            className="text-secondary/70 text-lg md:text-xl font-[Poppins] leading-relaxed max-w-xl"
            dangerouslySetInnerHTML={{ __html: data.statsDesc }}
          />

        </div>

        {/* ── RIGHT: RADIAL STATS ── */}
        <div className="relative flex justify-center">

          <div className="relative w-[320px] h-80 sm:w-[400px] sm:h-[400px]">

            {data.stats.map((item, index) => {
              const positions = [
                "top-0 left-1/2 -translate-x-1/2",
                "right-0 top-1/2 -translate-y-1/2",
                "bottom-0 left-1/2 -translate-x-1/2",
                "left-0 top-1/2 -translate-y-1/2",
              ];

              return (
                <div
                  key={index}
                  className={`absolute ${positions[index]} flex flex-col items-center gap-2`}
                >

                  <h3 className="text-3xl sm:text-4xl font-semibold font-[Montserrat]">
                    {item.number}
                  </h3>

                  <p className="text-secondary/60 text-sm font-[Poppins] text-center max-w-[120px]">
                    {item.label}
                  </p>

                </div>
              );
            })}

            {/* CENTER DOT */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-fourth/80" />
            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

