"use client";

import React from "react";

const storyData = {
  storyTitle: "Our Experience",
  storyText: [
    "For over 12 years, Adarsh Auto Consultants has been helping buyers discover reliable vehicles across Gujarat.",
    "Our goal is to maintain a diverse vehicle inventory and provide accurate information so buyers can make confident decisions when purchasing their next vehicle."
  ],
  storyImages: [
    "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=800&q=80",
    "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=600&q=80",
    "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=600&q=80",
    "https://images.unsplash.com/photo-1542362567-b07e54358753?w=600&q=80",
    "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=600&q=80",
  ],
};

export default function OurStory() {
  return (
    <section className="relative py-12">
      <div className=" mx-auto px-4">   

        {/* ── Flex row replacing grid ───────────────────────────────── */}
        <div className="flex flex-col lg:flex-row gap-6 items-stretch justify-center">

          {/* LEFT: text — ~41% width */}
          <div
            className="flex flex-col justify-center lg:w-[41%] animate-[fadeInLeft_0.8s_ease_forwards]"
          >
            <p className="text-sm tracking-[0.4em] uppercase text-third font-semibold">
              About Us
            </p>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.05] text-primary font-[Montserrat] mt-4">
              Our <span className="text-fourth/80">Experience</span>
            </h2>

            <div className="flex flex-col gap-6 mt-8 max-w-md">
              <p className="text-primary/75 text-lg leading-relaxed font-[Poppins]">
                {storyData.storyText[0]}
              </p>
              <p className="text-third/50 text-md leading-relaxed font-[Poppins]">
                {storyData.storyText[1]}
              </p>
            </div>
          </div>

          {/* CENTER: big image — ~26.5% width */}
          <div
            className="relative overflow-hidden rounded-2xl group lg:w-[26.5%] min-h-[500px] animate-[fadeInUp_0.8s_ease_0.15s_forwards] opacity-0"
          >
            <img
              src={storyData.storyImages[0]}
              alt=""
              className="absolute inset-0 w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-black/20" />
            
          </div>

          {/* RIGHT: two stacked images — ~26% width */}
          <div
            className="flex lg:flex-col gap-4 lg:w-[26%] animate-[fadeInRight_0.8s_ease_0.3s_forwards] opacity-0"
          >
            {storyData.storyImages.slice(1, 3).map((src, i) => (
              <div
                key={i}
                className="relative flex-1 overflow-hidden rounded-2xl group min-h-60"
              >
                <img
                  src={src}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-linear-to-br from-transparent to-black/60" />
              </div>
            ))}
          </div>

        </div>
      </div>

      <style>{`
        @keyframes fadeInLeft {
          from { opacity: 0; transform: translateX(-32px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(32px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInRight {
          from { opacity: 0; transform: translateX(32px); }
          to   { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </section>
  );
}