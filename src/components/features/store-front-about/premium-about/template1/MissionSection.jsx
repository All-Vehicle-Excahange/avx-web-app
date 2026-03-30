"use client";

import React from "react";

export default function MissionSection() {
    const data = {
        missionTitle: "Our Mission",
        missionDesc: "To engineer the most transparent, elegant, and efficient automotive marketplace in existence. We bridge the gap between luxury and logic.",
        missionImage: "https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?w=1200&q=80",

        visionTitle: "Our Vision",
        visionDesc: "Defining the future of mobility. We envision a world where every vehicle transaction is a seamless, digital-first masterpiece.",
        visionImage: "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=1200&q=80",
    };

    return (
        <section className="relative  py-12  px-4 overflow-hidden">
            <style>{`
        .text-vertical {
          writing-mode: vertical-rl;
          text-orientation: mixed;
        }
        .mission-grid {
          display: grid;
          grid-template-columns: repeat(12, 1-fr);
          align-items: center;
        }
        .reveal-card {
          transition: all 0.8s cubic-bezier(0.23, 1, 0.32, 1);
        }
        .group:hover .reveal-card {
          transform: translateY(-20px);
          filter: saturate(1.2) brightness(1.1);
        }
        .outline-text {
          -webkit-text-stroke: 1px rgba(255,255,255,0.1);
          color: transparent;
        }
      `}</style>

            {/* ── BACKGROUND WATERMARK ── */}
            <div className="absolute top-10 left-0 w-full flex justify-center opacity-5 pointer-events-none select-none">
                <h1 className="text-[25vw] font-black outline-text leading-none uppercase">Spirit</h1>
            </div>

            <div className="max-w-[1600px] mx-auto relative z-10">

               {/* ── HEADING ── */}
      <div className="flex flex-col gap-6 max-w-2xl text-center mx-auto mb-16">
        <p className="text-sm tracking-[0.4em] uppercase text-third font-semibold">
          Purpose
        </p>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.05] text-primary font-[Montserrat]">
          Mission &
          <span className="text-fourth/80"> Vision</span>
        </h2>
      </div>

                {/* ── THE "NEW TYPE" ASYMMETRIC LAYOUT ── */}
                <div className="flex flex-col lg:flex-row gap-20 lg:gap-0 items-stretch">

                    {/* LEFT: MISSION (UPDATED WITH RIGHT STYLE) */}
                    <div className="lg:w-1/2 relative group">
                        <div className="relative h-[800px] lg:h-[600px] w-full lg:w-[90%] overflow-hidden rounded-tr-[100px] lg:rounded-tr-[200px] border-r border-t border-primary/10">

                            <img
                                src={data.missionImage}
                                className="reveal-card w-full h-full object-cover grayscale group-hover:grayscale-0"
                                alt="Mission"
                            />

                            <div className="absolute inset-0 bg-linear-to-t from-secondary via-transparent to-transparent" />
                        </div>

                        {/* ✨ NEW CONTENT (RIGHT SIDE STYLE APPLIED) */}
                        <div className="absolute bottom-12 left-0 lg:-left-12 max-w-md p-10 border border-primary/10 backdrop-blur-2xl bg-primary/5 transition-all duration-500 group-hover:border-primary/40">

                          

                           <h3 className="text-4xl font-bold font-[Montserrat] mb-6 text-primary uppercase">
  {data.missionTitle.split(" ")[0]}{" "}
  <span className="text-fourth/80">
    {data.missionTitle.split(" ")[1]}
  </span>
</h3>

                            <p className="text-third text-lg font-light leading-relaxed italic">
                                "{data.missionDesc}"
                            </p>

                            {/* same button vibe */}
                         

                        </div>

                        <div className="hidden lg:block absolute -right-6 top-1/2 -translate-y-1/2 text-vertical text-[10px] tracking-[1em] text-primary/20 uppercase font-bold">
                            Automotive Innovation — 2026
                        </div>
                    </div>

                    {/* RIGHT: VISION (The Wide Floating) */}
                    <div className="lg:w-1/2 lg:mt-64 relative group">
                        <div className="relative h-[400px] lg:h-[550px] w-full overflow-hidden rounded-bl-[100px] lg:rounded-bl-[200px] border-b border-l border-primary/10">
                            <img
                                src={data.visionImage}
                                className="reveal-card w-full h-full object-cover thirdscale group-hover:thirdscale-0"
                                alt="Vision"
                            />
                            <div className="absolute inset-0 bg-linear-to-b from-secondary via-transparent to-transparent" />
                        </div>

                        {/* Content Floating */}
                        <div className="mt-12 lg:mt-0 lg:absolute -top-24 right-0 lg:right-12 max-w-md p-10 border border-primary/10 backdrop-blur-2xl bg-primary/5 transition-all duration-500 group-hover:border-primary/40">
                            
                          <h3 className="text-4xl font-bold font-[Montserrat] mb-6 text-primary uppercase">
  {data.visionTitle.split(" ")[0]}{" "}
  <span className="text-fourth/80">
    {data.visionTitle.split(" ")[1]}
  </span>
</h3>
                            <p className="text-third text-lg font-light leading-relaxed italic">"{data.visionDesc}"</p>

                          
                        </div>
                    </div>

                </div>

                {/* ── DECORATIVE SIDE TEXT ── */}
              
            </div>
        </section>
    );
}