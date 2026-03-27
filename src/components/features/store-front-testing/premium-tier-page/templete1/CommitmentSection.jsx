"use client";

import React from "react";

function CommitmentSection() {
  const commitmentData = {
    commitmentTitle: "Customer Commitment",
    commitmentText: `
      Our goal is to maintain transparent communication and assist buyers
      throughout the vehicle discovery and purchase process. We aim to
      provide honest guidance and reliable information for every buyer.
    `,
    commitmentImages: [
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1583267746897-2cf415887172?q=80&w=1200&auto=format&fit=crop",
    ],
  };

  return (
    <section className="relative w-full min-h-[800px] flex items-center px-3 justify-center py-12 overflow-hidden bg-secondary">
      
      {/* BACKGROUND */}
      <div className="absolute inset-0 z-0">
        <img
          src={commitmentData.commitmentImages[0]}
          className="w-full h-full object-cover opacity-40"
          alt="Main Background"
        />
        <div className="absolute inset-0 bg-linear-to-b from-secondary via-transparent to-secondary" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* ── LEFT SIDE: CONTENT (NOW LEFT) */}
        <div className="flex flex-col items-start gap-6 text-left">
          
          <div className="flex flex-col gap-2">
            <p className="text-sm tracking-[0.4em] uppercase text-third font-semibold">
              Our Promise
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-primary font-[Montserrat]">
              Customer <span className="text-fourth/80">Commitment</span>
            </h2>
            <div className="w-20 h-1 bg-primary mt-2 rounded-full" />
          </div>

          <div className="backdrop-blur-md p-8 rounded-3xl border border-primary/10 shadow-xl">
            <p className="text-primary/90 text-base sm:text-lg md:text-[16px] font-[Poppins] leading-relaxed">
              {commitmentData.commitmentText}
            </p>
          </div>

        </div>

        {/* ── RIGHT SIDE: IMAGE STACK (NOW RIGHT) */}
        <div className="relative h-[500px] hidden md:block">
          
          {/* Main image */}
          <div className="absolute top-0 left-0 w-4/5 h-[350px] rounded-2xl overflow-hidden border-4 border-primary shadow-2xl z-20 group">
            <img
              src={commitmentData.commitmentImages[1]}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              alt=""
            />

            {/* Circle overlap */}
            <div className="absolute bottom-4 left-4 w-28 h-28 rounded-full border-4 border-primary overflow-hidden z-40 transition-transform duration-500 group-hover:translate-x-2 group-hover:-translate-y-1 shadow-xl">
              <img
                src={commitmentData.commitmentImages[3]}
                className="w-full h-full object-cover"
                alt=""
              />
            </div>
          </div>

          {/* Offset image */}
          <div className="absolute bottom-0 right-0 w-3/5 h-[280px] rounded-2xl overflow-hidden border-4 border-primary shadow-2xl z-30 transform translate-x-4 -translate-y-10">
            <img
              src={commitmentData.commitmentImages[2]}
              className="w-full h-full object-cover"
              alt=""
            />
          </div>

          {/* Small accent */}
          <div className="absolute -top-6 right-20 w-24 h-24 rounded-2xl rotate-12 border-2 border-primary overflow-hidden z-10 opacity-60">
            <img
              src={commitmentData.commitmentImages[4]}
              className="w-full h-full object-cover"
              alt=""
            />
          </div>
        </div>

      </div>

      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-fourth/10 rounded-full blur-[120px] pointer-events-none" />
    </section>
  );
}

export default CommitmentSection;