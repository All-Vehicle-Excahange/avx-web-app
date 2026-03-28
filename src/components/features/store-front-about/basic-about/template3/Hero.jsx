"use client";

import React from "react";

function Hero() {
  const data = {
    heroTitle: "Our Story Built for Buy & Selling a Vehicle",
    heroDesc: `
      Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec.
      Sapien platea nec urna ut est sed. Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec.
      Sapien platea nec urna ut est sed. Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec.
      Sapien platea nec urna ut est sed. Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec.
      Sapien platea nec urna ut est sed. Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec.
      Sapien platea nec urna ut est sed.
    `,
  };

  return (
    <section className="relative flex flex-col justify-center min-h-screen items-center py-12">

      <div className="mx-auto w-full flex flex-col gap-14">

        <div className="flex flex-col items-center text-center gap-10 max-w-3xl mx-auto">

          {/* Tag */}
          <p className="text-sm tracking-[0.45em] uppercase text-third font-semibold">
            Hero
          </p>

          {/* Title */}
          <h2 className="flex flex-col gap-2 text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.05] text-primary font-[Montserrat]">
            <span>Our Story Built for</span>
            <span className="text-fourth/80">Buy & Selling a Vehicle</span>
          </h2>


          {/* Description */}
          <p className="text-third/55 text-base sm:text-lg font-[Poppins] leading-relaxed max-w-xl">
            {data.heroDesc}
          </p>
          <a href="#" class="font-[Montserrat] font-bold text-sm tracking-[0.15em] uppercase text-primary border-b border-third/40 pb-0.5 hover:border-primary transition-colors duration-200">Explore Listings →</a>
        </div>

      </div>

    </section>
  );
}

export default Hero;