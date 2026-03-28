"use client";

import React from "react";

export default function Hero() {
  return (
    <section className="relative flex items-center justify-center py-12 min-h-screen">

      <div className="w-full mx-auto flex flex-col items-center text-center gap-10">

        {/* Top Label */}
        <p className="text-sm tracking-[0.4em] uppercase text-third font-semibold">
          Our Story
        </p>

        {/* Main Heading */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.1] text-primary font-[Montserrat] max-w-3xl">
          Our Story Built for 
          <span className="text-fourth/80"> Buy & Selling</span> a Vehicle
        </h1>

        {/* Description */}
        <div className="flex flex-col gap-5 max-w-xl">
          <p className="text-third/70 text-lg md:text-xl font-[Poppins] leading-relaxed">
            Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec.
            Sapien platea nec urna ut est sed. Lorem ipsum dolor sit amet consectetur.
            Odio at dolor ut donec. Sapien platea nec urna ut est sed.
           Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec.
            Sapien platea nec urna ut est sed. Lorem ipsum dolor sit amet consectetur.
            Odio at dolor ut donec. Sapien platea nec urna ut est sed.
          </p>
        </div>

      </div>

    </section>
  );
}