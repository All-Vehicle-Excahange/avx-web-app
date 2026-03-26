"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";

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
    {
      name: "Priya Mehta",
      review:
        "Very professional service. They answered all my questions patiently and helped me find the right vehicle within my budget.",
    },
    {
      name: "Suresh Joshi",
      review:
        "Honest and transparent throughout the entire process. The AVX inspection gave me confidence in my purchase.",
    },
  ],
};

const EyeBrow = ({ children }) => (
  <motion.p
    className="text-sm tracking-[0.4em] uppercase text-third font-semibold mb-2"
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true }}
  >
    {children}
  </motion.p>
);

/* 🔥 UPDATED CARD */
function TestimonialCard({ t }) {
  return (
    <div className="group relative rounded-2xl p-7 bg-white/5 backdrop-blur-md border border-white/10 hover:border-primary/30 transition-all duration-300 overflow-hidden">

      {/* glow effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-linear-to-br from-primary/10 via-transparent to-transparent" />

      <Quote size={22} className="text-fourth mb-4 relative z-10" strokeWidth={1.4} />

      <p className="font-[Poppins] text-[14px] leading-[1.9] text-third/80 italic relative z-10 mb-6">
        “{t.review}”
      </p>

      <div className="w-full h-px bg-primary/10 mb-5 relative z-10" />

      <div className="flex items-center gap-3 relative z-10">
        <div className="w-10 h-10 rounded-full bg-linear-to-br from-fourth/30 to-fourth/10 flex items-center justify-center font-bold text-[14px] text-fourth">
          {t.name[0]}
        </div>

        <div>
          <p className="font-[Montserrat] font-semibold text-[13px] text-primary">
            {t.name}
          </p>
          <p className="text-[11px] text-third/50">Verified Buyer</p>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const total = data.testimonials.length;
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const [isDesktop, setIsDesktop] = useState(() => {
    if (typeof window !== "undefined") {
      return window.matchMedia("(min-width: 1024px)").matches;
    }
    return true;
  });

  const intervalRef = useRef(null);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const handler = (e) => setIsDesktop(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const visible = isDesktop ? 2 : 1;
  const maxIndex = total - visible;

  const next = useCallback(() => {
    setDirection(1);
    setIndex((i) => (i >= maxIndex ? 0 : i + 1));
  }, [maxIndex]);

  const prev = useCallback(() => {
    setDirection(-1);
    setIndex((i) => (i <= 0 ? maxIndex : i - 1));
  }, [maxIndex]);

  useEffect(() => {
    intervalRef.current = setInterval(next, 3500);
    return () => clearInterval(intervalRef.current);
  }, [next]);

  const pause = () => clearInterval(intervalRef.current);
  const resume = () => {
    intervalRef.current = setInterval(next, 3500);
  };

  const variants = {
    enter: (dir) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
    center: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.45 },
    },
    exit: (dir) => ({
      x: dir > 0 ? -60 : 60,
      opacity: 0,
      transition: { duration: 0.35 },
    }),
  };

  const visibleItems = Array.from({ length: visible }, (_, i) => {
    const idx = (index + i) % total;
    return data.testimonials[idx];
  });

  return (
    <section className="py-12 lg:py-12">
      <div className="px-5">

        {/* HEADER */}
        <div className="flex items-end justify-between mb-12">
          <div className="flex flex-col gap-3">
            <EyeBrow>Reviews</EyeBrow>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-primary">
              Customer <span className="text-fourth/80">Experience</span>
            </h2>
          </div>

          <div className="flex gap-2">
            <button
              onClick={prev}
              onMouseEnter={pause}
              onMouseLeave={resume}
              className="w-10 h-10 rounded-xl border border-primary/30 flex items-center justify-center text-fourth hover:bg-primary/10"
            >
              <ChevronLeft size={18} />
            </button>

            <button
              onClick={next}
              onMouseEnter={pause}
              onMouseLeave={resume}
              className="w-10 h-10 rounded-xl border border-primary/30 flex items-center justify-center text-fourth hover:bg-primary/10"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* SLIDER WRAP */}
        <div
          className="relative overflow-hidden rounded-2xl p-4 "
          onMouseEnter={pause}
          onMouseLeave={resume}
        >
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={index}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              className="grid grid-cols-1 lg:grid-cols-2 gap-6"
            >
              {visibleItems.map((t, i) => (
                <TestimonialCard key={`${t.name}-${i}`} t={t} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* DOTS */}
        <div className="flex items-center gap-2 mt-8">
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setDirection(i > index ? 1 : -1);
                setIndex(i);
              }}
              className={`h-1 rounded-full transition-all duration-300 ${
                i === index
                  ? "w-6 bg-primary/60"
                  : "w-2 bg-primary/15"
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}