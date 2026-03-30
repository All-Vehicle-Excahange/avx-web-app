
"use client";

import React from "react";

function Hero() {
  const data = {
    heroTitle: "Our Story Built for Buy & Selling a Vehicle",
    heroDesc: `
      <p>
        Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec.
        Sapien platea nec urna ut est sed. Lorem ipsum dolor sit amet consectetur.
        Odio at dolor ut donec. Sapien platea nec urna ut est sed.
      </p>
    `,
    videoSrc:
      "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    images: [
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200&q=90",
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=1200&q=90",
    ],
  };

  return (
    <section className="w-full min-h-screen grid lg:grid-cols-[58%_6px_1fr] bg-secondary overflow-hidden ">

      {/* ── LEFT (VIDEO) ── */}
      <div className="relative">

        <video
          src={data.videoSrc}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover brightness-50"
        />

        {/* overlays */}
        <div className="absolute inset-0 bg-linear-to-r from-secondary/30 via-transparent to-secondary/80" />
        <div className="absolute inset-0 bg-linear-to-b from-secondary to-transparent via-transparent" />

        {/* CONTENT */}
        <div className="relative z-10 h-full flex flex-col justify-center px-6 lg:px-12 py-12">

          {/* LABEL */}
          <p className="mb-4 text-sm tracking-[0.4em] uppercase text-third font-semibold">
            Hero
          </p>

          {/* HEADING (UNCHANGED) */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.05] text-primary font-[Montserrat]">
            Our{" "}
            <span className="text-fourth/80">Story</span>
            <br />
            Built for Buy & Selling a Vehicle
          </h2>

          {/* DESC */}
          <div
            className="mt-6 text-third/60 text-lg font-[Poppins] leading-relaxed max-w-lg"
            dangerouslySetInnerHTML={{ __html: data.heroDesc }}
          />

        </div>
      </div>

      {/* ── RED SPINE ── */}
      <div className="hidden lg:block bg-third" />

      {/* ── RIGHT (IMAGES) ── */}
      <div className="relative grid grid-rows-2">

        {/* IMAGE 1 */}
        <div className="relative overflow-hidden">
          <img
            src={data.images[0]}
            alt="car"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-b from-secondary via-secondary/40 to-secondary" />
        </div>

        {/* IMAGE 2 */}
        <div className="relative overflow-hidden">
          <img
            src={data.images[1]}
            alt="car"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-b from-secondary via-secondary/20 to-secondary" />
        </div>

      </div>

    </section>
  );
}

export default Hero;

