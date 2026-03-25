"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";

const data = {
  testimonialsTitle: "Customer Experience",
  testimonials: [
    { name: "Rahul Patel", review: "Great experience buying my car here. The team explained everything clearly and helped me through the entire process." },
    { name: "Amit Shah",   review: "Transparent communication and good vehicle options. I appreciated the AVX inspection support." },
    { name: "Priya Mehta", review: "Very professional service. They answered all my questions patiently and helped me find the right vehicle within my budget." },
    { name: "Suresh Joshi", review: "Honest and transparent throughout the entire process. The AVX inspection gave me confidence in my purchase." },
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


/* ── single card ── */
function TestimonialCard({ t }) {
  return (
    <div className="group border border-primary/40 rounded-2xl p-8 flex flex-col gap-5 hover:border-primary/25 transition-all duration-300 hover:shadow-[0_8px_36px_rgba(0,0,0,0.4)] h-full">
      <Quote size={20} className="text-fourth" strokeWidth={1.4} />
      <p className="font-[Poppins] text-sm leading-[1.86] text-third/70 italic flex-1">
        <span>“{t.review}”</span>
      </p>
      <div className="w-full h-px bg-primary/[0.07]" />
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full border border-third/20 flex items-center justify-center font-bold text-[13px] text-fourth shrink-0">
          {t.name[0]}
        </div>
        <div>
          <p className="font-[Montserrat] font-semibold text-[13px] text-primary">{t.name}</p>
          <p className="font-[Poppins] text-[11px] text-third/50">Verified Buyer</p>
        </div>
      </div>
    </div>
  );
}

export default function WHB_Testimonials() {
  const total       = data.testimonials.length;
  const [index, setIndex]       = useState(0);
  const [direction, setDirection] = useState(1);  // 1 = forward, -1 = backward
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

  /* total slide positions */
  const maxIndex = total - visible;

  const next = useCallback(() => {
    setDirection(1);
    setIndex((i) => (i >= maxIndex ? 0 : i + 1));
  }, [maxIndex]);

  const prev = useCallback(() => {
    setDirection(-1);
    setIndex((i) => (i <= 0 ? maxIndex : i - 1));
  }, [maxIndex]);

  /* auto-play */
  useEffect(() => {
    intervalRef.current = setInterval(next, 3500);
    return () => clearInterval(intervalRef.current);
  }, [next]);

  /* pause on hover */
  const pause = () => clearInterval(intervalRef.current);
  const resume = () => { intervalRef.current = setInterval(next, 3500); };

  /* slide variants */
  const variants = {
    enter:  (dir) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
    center: { x: 0, opacity: 1, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
    exit:   (dir) => ({ x: dir > 0 ? -60 : 60, opacity: 0, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } }),
  };

  /* current slice */
  const visibleItems = Array.from({ length: visible }, (_, i) => {
    const idx = (index + i) % total;
    return data.testimonials[idx];
  });

  return (
    <section className="py-12 lg:py-12">
      <div className="px-5">

        {/* heading row — title left, arrows right */}
        <div className="flex items-end justify-between mb-12">
          <div className="flex flex-col gap-3">
            <EyeBrow>Reviews</EyeBrow>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.05] text-primary font-[Montserrat]">
              Customer <span className="text-fourth/80">Experience</span>
            </h2>
          </div>

          {/* arrow buttons */}
          <div className="flex items-center gap-2 pb-1">
            <button
              onClick={prev}
              onMouseEnter={pause}
              onMouseLeave={resume}
              className="w-10 h-10 rounded-xl border border-primary/40 bg-primary hover:bg-primary/40 flex items-center justify-center text-fourth hover:text-primary hover:cursor-pointer hover:border-primary/30  transition-all duration-200"
              aria-label="Previous"
            >
              <ChevronLeft size={18} strokeWidth={1.8} />
            </button>
            <button
              onClick={next}
              onMouseEnter={pause}
              onMouseLeave={resume}
              className="w-10 h-10 rounded-xl border border-primary/40 flex items-center bg-primary hover:bg-primary/40 justify-center text-fourth hover:border-primary/30 hover:text-primary hover:cursor-pointer transition-all duration-200"
              aria-label="Next"
            >
              <ChevronRight size={18} strokeWidth={1.8} />
            </button>
          </div>
        </div>

        {/* slider */}
        <div
          className="relative overflow-hidden"
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
              className="grid grid-cols-1 lg:grid-cols-2 gap-4"
            >
              {visibleItems.map((t, i) => (
                <TestimonialCard key={`${t.name}-${i}`} t={t} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* dot indicators */}
        <div className="flex items-center gap-2 mt-8">
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <button
              key={i}
              onClick={() => { setDirection(i > index ? 1 : -1); setIndex(i); }}
              className={`h-1 rounded-full transition-all duration-300 ${
                i === index
                  ? "w-6 bg-primary/60"
                  : "w-2 bg-primary/15 hover:bg-primary/30"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}