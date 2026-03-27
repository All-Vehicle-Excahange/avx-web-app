"use client";

import React, { useState } from "react";

const galleryData = {
  galleryTitle: "Our Showroom & Team",
  galleryImages: [
    "https://images.unsplash.com/photo-1503376780353-7e6692767b70",
    "https://images.unsplash.com/photo-1494976388531-d1058494cdd8",
    "https://images.unsplash.com/photo-1511919884226-fd3cad34687c",
    "https://images.unsplash.com/photo-1485463611174-f302f6a5c1c9",
  ],
};

const captions = [
  "Showroom Floor",
  "Vehicle Detail",
  "Our Team",
  "Showroom Interior",
];

const fanConfig = [
  { rotate: -8, translateX: -180, translateY: 12, scale: 0.88, zIndex: 1 },
  { rotate: -3, translateX: -70, translateY: 4, scale: 0.93, zIndex: 2 },
  { rotate: 3, translateX: 70, translateY: 4, scale: 0.93, zIndex: 3 },
  { rotate: 8, translateX: 180, translateY: 12, scale: 0.88, zIndex: 4 },
];

export default function Gallery() {
  const { galleryTitle, galleryImages } = galleryData;
  const [hovered, setHovered] = useState(null);
  const [spread, setSpread] = useState(false);

  return (
    <section className="w-full flex justify-center pt-12">
      <div className="max-w-7xl w-full flex flex-col gap-9 lg:gap-3 px-4 sm:px-6 lg:px-0">

        {/* HEADER */}
        <div className="flex flex-col gap-4 justify-center items-center">
          <p className="text-sm tracking-[0.4em] uppercase text-third font-semibold">
            Gallery
          </p>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.05] text-primary font-[Montserrat]">
            {galleryTitle.split("&")[0].trim()}
            <span className="text-fourth/80">
              {" "}
              &amp; {galleryTitle.split("&")[1].trim()}
            </span>
          </h2>
        </div>

        {/* DESKTOP FAN */}
        <div
          className="hidden md:flex relative items-center justify-center h-80 lg:h-[380px]"
          onMouseEnter={() => setSpread(true)}
          onMouseLeave={() => {
            setSpread(false);
            setHovered(null);
          }}
        >
          {galleryImages.map((src, i) => {
            const fan = fanConfig[i];
            const isHovered = hovered === i;

            const tx = spread ? fan.translateX * 1.8 : fan.translateX * 1;
            const ty = spread ? (isHovered ? -28 : fan.translateY) : fan.translateY;
            const rot = spread ? (isHovered ? 0 : fan.rotate * 1) : fan.rotate;
            const sc = spread ? (isHovered ? 1.05 : fan.scale) : fan.scale;

            return (
              <div
                key={i}
                className="absolute transition-all duration-500"
                style={{
                  width: "260px",
                  height: "320px",
                  zIndex: isHovered ? 10 : fan.zIndex,
                  transform: `translateX(${tx}px) translateY(${ty}px) rotate(${rot}deg) scale(${sc})`,
                }}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
              >
                <div className="relative w-full h-full rounded-2xl overflow-hidden cursor-pointer">
                  <img src={src} alt="" className="w-full h-full object-cover" />

                  <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent" />

                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-primary font-[Montserrat] font-semibold text-base">
                      {captions[i]}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* MOBILE SCROLL (REAL FIX) */}
        <div className="md:hidden flex gap-4 overflow-x-auto pb-4">

          {galleryImages.map((img, i) => (
            <div
              key={i}
              className="min-w-[260px] h-80 rounded-2xl overflow-hidden shrink-0"
            >
              <img
                src={img}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}