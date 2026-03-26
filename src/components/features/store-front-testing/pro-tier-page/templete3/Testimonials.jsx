"use client";

import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const data = {
  testimonialsTitle: "Customer Experience",
  testimonials: [
    {
      name: "Rahul Patel",
      review:
        "Great experience buying my car here. The team explained everything clearly and helped me through the entire process.",
    },
    {
      name: "Amit Shah",
      review:
        "Transparent communication and good vehicle options. I appreciated the AVX inspection support.",
    },
  ],
};

function Testimonials() {
  const [active, setActive] = useState(0);
  const [visible, setVisible] = useState(true);
  const total = data.testimonials.length;
  const timeoutRef = useRef(null);

  const transition = (newIndex) => {
    setVisible(false);
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setActive(newIndex);
      setVisible(true);
    }, 350);
  };

  const prev = () => transition((active - 1 + total) % total);
  const next = () => transition((active + 1) % total);

  useEffect(() => () => clearTimeout(timeoutRef.current), []);

  const item = data.testimonials[active];

  return (
    <section className="relative py-12">
      <div className=" mx-auto w-full px-4">
        <div className="flex flex-col items-center gap-10">

          {/* ── Header ─────────────────────────────────────────────── */}
          <div className="flex flex-col items-center gap-4 text-center">
            <span className="text-sm tracking-[0.4em] uppercase text-third font-semibold">
              Feedback
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.05] text-primary font-[Montserrat]">
              {data.testimonialsTitle.split("Experience")[0]}
               <span className="text-fourth/80">Experience</span>
            </h2>
          </div>

          {/* ── Slide ──────────────────────────────────────────────── */}
          <div
            className="w-full"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0px)" : "translateY(12px)",
              transition: "opacity 0.35s ease, transform 0.35s ease",
            }}
          >
            {/* Bordered review card */}
            <div className="relative flex flex-col items-center text-center gap-8 px-10 py-12 border border-third/15 rounded-2xl">

              {/* Quote icon — top right */}
              <div className="absolute top-5 right-6 w-9 h-9 rounded-full   flex items-center justify-center">
                <Quote className="w-6 h-6 text-third/30" />
              </div>

              <span className="text-[13px] font-bold text-third/30 font-[Montserrat] tracking-[0.5em]">
                {String(active + 1).padStart(2, "0")}
              </span>

              <p className="text-xl md:text-2xl lg:text-3xl font-light text-primary/70 font-[Poppins] leading-[1.6] max-w-3xl italic">
                {item.review}
              </p>

                <span className="text-xs font-semibold text-primary/90 font-[Montserrat] uppercase tracking-widest">
                  {item.name}
                </span>

            </div>
          </div>

          {/* ── Controls ───────────────────────────────────────────── */}
          <div className="flex items-center gap-6">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full border border-third/20 flex items-center justify-center hover:border-third/40 hover:bg-third/5 transition-all duration-300 group"
            >
              <ChevronLeft className="w-4 h-4 text-third/50 group-hover:text-third/70 transition-colors duration-300" />
            </button>

            <div className="flex items-center gap-2">
              {data.testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => transition(i)}
                  className={`rounded-full transition-all duration-500 ${
                    i === active
                      ? "w-6 h-1.5 bg-primary"
                      : "w-1.5 h-1.5 bg-third/20 hover:bg-third/40"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-10 h-10 rounded-full border border-third/20 flex items-center justify-center hover:border-third/40 hover:bg-third/5 transition-all duration-300 group"
            >
              <ChevronRight className="w-4 h-4 text-third/50 group-hover:text-third/70 transition-colors duration-300" />
            </button>
          </div>


        </div>
      </div>
    </section>
  );
}

export default Testimonials;