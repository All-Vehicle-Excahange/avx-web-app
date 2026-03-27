"use client";

import { useState, useRef } from "react";

function ExperienceSection() {
  const storyData = {
    storyText: `
      For over 12 years, Adarsh Auto Consultants has been helping buyers
      discover reliable vehicles across Gujarat.

      Our goal is to maintain a diverse vehicle inventory and provide
      accurate information so buyers can make confident decisions when
      purchasing their next vehicle.
    `,
    storyImages: [
      "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=1200&auto=format&fit=crop",
    ],
  };

  const [hovered, setHovered] = useState(null);
  const rightRef = useRef(null);

  return (
    <section className="w-full py-12 bg-primary border-y border-secondary/10 px-8">
      <div className=" conatiner max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">

        {/* LEFT (UNCHANGED) */}
        <div className="flex flex-col gap-6">
          <p className="text-sm tracking-[0.4em] uppercase text-secondary/70 font-semibold">
            Consultant Story
          </p>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold leading-[1.1] text-secondary font-[Montserrat]">
            Our <span className="text-fourth">Experience</span>
          </h2>

          <div className="w-10 h-px bg-secondary/30" />

          {storyData.storyText.trim().split("\n\n").map((para, i) => (
            <p
              key={i}
              className="text-secondary/80 font-[Poppins] leading-relaxed text-base md:text-lg"
            >
              {para.trim()}
            </p>
          ))}
        </div>

        {/* RIGHT */}
        <div
          ref={rightRef}
          onMouseLeave={() => setHovered(null)}
          className="relative h-[500px] hidden md:block"
        >

          {storyData.storyImages.map((src, i) => {
            const positions = [
              "top-0 left-0 w-[68%] h-[62%]",
              "bottom-0 right-0 w-[60%] h-[58%]",
              "top-[28%] left-[22%] w-[52%] h-[44%]",
            ];

            return (
              <div
                key={i}
                onMouseEnter={() => setHovered(i)}
                className={`
                  absolute ${positions[i]}
                  rounded-xl overflow-hidden
                  transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]
                  ${hovered === i ? "z-20 scale-[1.03]" : "z-10"}
                `}
                style={{
                  transform:
                    hovered === i
                      ? "translateY(-10px) rotate(0deg)"
                      : i === 0
                      ? "rotate(-2deg)"
                      : i === 1
                      ? "rotate(2deg)"
                      : "rotate(-1deg)",
                }}
              >
                {/* IMAGE */}
                <img
                  src={src}
                  alt=""
                  className={`
                    w-full h-full object-cover
                    transition-all duration-700
                    ${hovered === i ? "brightness-105 saturate-110 scale-105" : "brightness-90 saturate-90"}
                  `}
                />

                {/* BORDER */}
                <div className="absolute inset-0 border border-white/10 rounded-xl pointer-events-none" />

                {/* OVERLAY */}
                <div
                  className={`absolute inset-0 bg-black/30 transition-opacity duration-500 ${
                    hovered === i ? "opacity-0" : "opacity-100"
                  }`}
                />
              </div>
            );
          })}

          {/* YEAR BADGE */}
          <div className="absolute bottom-6 right-6 flex flex-col items-end z-30 pointer-events-none">
            <span className="text-[52px] font-light text-white/10 leading-none tracking-tight">
              12
            </span>
            <span className="text-[10px] tracking-[0.3em] uppercase text-white/30">
              Years
            </span>
          </div>

        </div>

      </div>
    </section>
  );
}

export default ExperienceSection;