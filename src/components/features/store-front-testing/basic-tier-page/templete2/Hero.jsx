"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  MessageCircle,
  ShieldCheck,
  Handshake,
  Quote,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

/* ─────────────────────────────────────────────
   DATA  (flat structure matching WHY_BUY_HERE_PREMIUM_1 schema)
───────────────────────────────────────────── */
const data = {
  /* HERO */
  heroTitle: "Why Choose Adarsh Auto Consultants",
  heroDescription:
    "Buyers trust Adarsh Auto Consultants for transparent communication, reliable vehicle options, and a smooth buying experience. Our goal is to help every buyer make confident vehicle decisions with clear information and professional support.",

  /* CONSULTANT STORY */
  storyTitle: "Our Experience",
  storyText:
    "For over 12 years, Adarsh Auto Consultants has been helping buyers discover reliable vehicles across Gujarat.\n\nOur goal is to maintain a diverse vehicle inventory and provide accurate information so buyers can make confident decisions when purchasing their next vehicle.",

  /* VEHICLE SELECTION APPROACH */
  selectionTitle: "Our Approach to Vehicle Selection",
  selectionDescription:
    "Every vehicle listed through our storefront goes through a basic internal evaluation before being presented to buyers. This helps ensure that vehicles listed are suitable for serious buyers and provides a smoother vehicle buying experience.",

  /* HOW BUYING WORKS */
  processTitle: "How Buying Works",
  processDescription:
    "Buying a vehicle through our storefront is designed to be simple, transparent, and convenient for buyers.",
  processSteps: [
    {
      title: "Discover Vehicles",
      description:
        "Browse our inventory and shortlist vehicles that match your requirements.",
      icon: "Search",
    },
    {
      title: "Connect With Our Team",
      description:
        "Use AVX chat to discuss vehicle condition, pricing, and availability.",
      icon: "MessageCircle",
    },
    {
      title: "AVX Inspection Option",
      description:
        "Buyers can request AVX inspection to receive an independent condition report.",
      icon: "ShieldCheck",
    },
    {
      title: "Decision & Purchase",
      description:
        "Once satisfied with the vehicle details and inspection, finalize the purchase directly with the consultant.",
      icon: "Handshake",
    },
  ],

  /* AVX INSPECTION */
  inspectionTitle: "AVX Inspection Assurance",
  inspectionText:
    "AVX inspection services provide additional transparency by documenting key aspects of the vehicle's condition before purchase.",
  inspectionPoints: [
    "Exterior condition check",
    "Interior condition check",
    "Visible mechanical components",
    "Photo & video documentation",
  ],

  /* CUSTOMER COMMITMENT */
  commitmentTitle: "Customer Commitment",
  commitmentText:
    "Our goal is to maintain transparent communication and assist buyers throughout the vehicle discovery and purchase process. We aim to provide honest guidance and reliable information for every buyer.",

  /* TESTIMONIALS */
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

/* ─────────────────────────────────────────────
   ICON MAP
───────────────────────────────────────────── */
const iconMap = { Search, MessageCircle, ShieldCheck, Handshake };

/* ─────────────────────────────────────────────
   ANIMATION VARIANTS
───────────────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};
const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

/* ─────────────────────────────────────────────
   SHARED ATOMS
───────────────────────────────────────────── */
const EyeBrow = ({ children, center = false }) => (
  <motion.p
    className={`text-sm tracking-[0.4em] uppercase text-third font-semibold font-[Montserrat] mb-2 ${center ? "text-center" : ""}`}
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true }}
  >
    {children}
  </motion.p>
);

const Divider = ({ light = false }) => (
  <div
    className={`w-8 h-px my-2 ${light ? "bg-primary/30" : "bg-primary/15"}`}
  />
);

/* ─────────────────────────────────────────────
   PAGE — SINGLE DEFAULT EXPORT
───────────────────────────────────────────── */
export default function WhyBuyHereBasic() {
  /* ── Testimonials state ── */
  const total = data.testimonials.length;
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isDesktop, setIsDesktop] = useState(() =>
    typeof window !== "undefined"
      ? window.matchMedia("(min-width: 1024px)").matches
      : true,
  );
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

  const pauseSlider = () => clearInterval(intervalRef.current);
  const resumeSlider = () => {
    intervalRef.current = setInterval(next, 3500);
  };

  const sliderVariants = {
    enter: (dir) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
    center: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
    },
    exit: (dir) => ({
      x: dir > 0 ? -60 : 60,
      opacity: 0,
      transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
    }),
  };

  const visibleTestimonials = Array.from(
    { length: visible },
    (_, i) => data.testimonials[(index + i) % total],
  );

  /* ── RENDER ── */
  return (
    <>
      {/* ═══════════════════════════════════════
          SECTION 1 — HERO
      ═══════════════════════════════════════ */}
      <section className="relative flex items-center justify-center overflow-hidden min-h-screen py-12">
        <div className="w-[70%] mx-auto text-center">
          <EyeBrow center>Why Choose Us</EyeBrow>
          <motion.h1
            className="text-[clamp(28px,5vw,54px)] font-bold leading-[1.15] text-primary font-[Montserrat] mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
          >
            {data.heroTitle.split("Adarsh")[0]}
            <span className="text-fourth">Adarsh</span>
            {data.heroTitle.split("Adarsh")[1]}
          </motion.h1>
          <motion.p
            className="text-third/70 text-[15px] leading-[1.9] font-[Poppins]"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {data.heroDescription}
          </motion.p>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SECTION 2 — STORY
      ═══════════════════════════════════════ */}
      <section className="py-12 px-2 lg:px-4 bg-fourth">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              <EyeBrow>Our Story</EyeBrow>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.05] text-primary font-[Montserrat]">
                Our <span className="text-secondary">Experience</span>
              </h2>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.12 }}
              viewport={{ once: true }}
              className="flex flex-col gap-4"
            >
              {data.storyText
                .split("\n\n")
                .filter(Boolean)
                .map((para, i) => (
                  <p
                    key={i}
                    className="text-primary/90 text-[15px] leading-[1.9] font-[Poppins]"
                  >
                    {para.trim()}
                  </p>
                ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SECTION 3 — SELECTION
      ═══════════════════════════════════════ */}
      <section className="py-12 px-2 lg:px-4">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              <EyeBrow>Selection</EyeBrow>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.05] text-primary font-[Montserrat]">
                Our Approach to
                <br />
                <span className="text-fourth/80">Vehicle Selection</span>
              </h2>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.12 }}
              viewport={{ once: true }}
            >
              <Divider />
              <p className="text-third/70 text-[15px] leading-[1.9] font-[Poppins]">
                {data.selectionDescription}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SECTION 4 — PROCESS
      ═══════════════════════════════════════ */}
      <section className="py-12 px-2 lg:px-4">
        <div className="container">
          <div className="flex flex-col gap-3 mb-10">
            <EyeBrow>Process</EyeBrow>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.05] text-primary font-[Montserrat]">
              How Buying <span className="text-fourth/80">Works</span>
            </h2>
            <p className="text-third/60 text-[15px] font-[Poppins] leading-relaxed max-w-md">
              {data.processDescription}
            </p>
          </div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3"
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {data.processSteps.map((s, i) => {
              const Icon = iconMap[s.icon];
              return (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className="group relative border border-third/10 rounded-2xl p-7 flex flex-col gap-5 hover:border-primary/30 transition-all duration-300 hover:shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
                >
                  <span className="font-[Montserrat] font-bold text-[11px] tracking-[0.18em] text-third/40 absolute top-5 right-5">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="w-10 h-10 border border-third/20 rounded-xl flex items-center justify-center shrink-0 group-hover:border-primary/30 transition-colors duration-300">
                    <Icon size={17} className="text-fourth" strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="font-[Montserrat] font-semibold text-[13px] text-fourth mb-2">
                      {s.title}
                    </p>
                    <p className="font-[Poppins] text-[12px] text-third/65 leading-[1.8]">
                      {s.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SECTION 5 — INSPECTION
      ═══════════════════════════════════════ */}
      <section className="py-12 px-2 lg:px-4">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-end mb-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              <EyeBrow>Inspection</EyeBrow>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.05] text-primary font-[Montserrat]">
                AVX Inspection <span className="text-fourth/80">Assurance</span>
              </h2>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <Divider />
              <p className="text-third/70 text-[15px] leading-[1.9] font-[Poppins]">
                {data.inspectionText}
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 items-stretch">
            {/* left — 2×2 tick cards */}
            <motion.div
              className="grid grid-cols-2 gap-3"
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              {data.inspectionPoints.map((pt) => (
                <motion.div
                  key={pt}
                  variants={fadeUp}
                  className="group flex flex-col gap-4 p-6 border border-third/10 rounded-2xl hover:border-primary/25 transition-all duration-300 hover:shadow-[0_6px_28px_rgba(0,0,0,0.35)]"
                >
                  <div className="w-8 h-8 rounded-lg border-[1.5px] border-fourth flex items-center justify-center shrink-0">
                    <svg width="12" height="10" viewBox="0 0 10 8" fill="none">
                      <path
                        d="M1 4L3.8 7L9 1"
                        stroke="#007bff"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <span className="font-[Poppins] text-sm text-third/70 leading-[1.7] group-hover:text-primary/80 transition-colors duration-300">
                    {pt}
                  </span>
                </motion.div>
              ))}
            </motion.div>

            {/* right — table card */}
            <motion.div
              className="border border-third/10 rounded-2xl overflow-hidden hover:border-primary/25 transition-all duration-300 hover:shadow-[0_8px_40px_rgba(0,0,0,0.4)]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              viewport={{ once: true }}
            >
              <div className="px-6 py-5 border-b border-primary/[0.07] flex items-center justify-between">
                <p className="font-[Montserrat] font-bold text-[9px] tracking-[0.26em] uppercase text-primary/50">
                  {"What's Covered"}
                </p>
                <span className="font-[Montserrat] font-bold text-[9px] tracking-[0.16em] uppercase text-primary">
                  Status
                </span>
              </div>
              {data.inspectionPoints.map((pt, i, arr) => (
                <motion.div
                  key={pt}
                  className={`flex justify-between items-center px-6 py-[18px] transition-colors duration-150 hover:bg-primary/4 ${
                    i < arr.length - 1 ? "border-b border-primary/6" : ""
                  }`}
                  initial={{ opacity: 0, x: 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.07 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center gap-3">
                    <span className="font-[Montserrat] font-bold text-[10px] tracking-[0.14em] text-fourth">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-[Poppins] text-sm text-third/70">
                      {pt}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-fourth" />
                    <span className="font-[Montserrat] font-bold text-[9px] tracking-[0.16em] uppercase text-primary">
                      Included
                    </span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SECTION 6 — COMMITMENT
      ═══════════════════════════════════════ */}
      <section className="py-12 px-2 lg:px-4 bg-fourth">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              <EyeBrow>Commitment</EyeBrow>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.05] text-primary font-[Montserrat]">
                Customer <span className="text-secondary">Commitment</span>
              </h2>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <Divider light />
              <p className="text-primary/90 text-[15px] leading-[1.9] font-[Poppins]">
                {data.commitmentText}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SECTION 7 — TESTIMONIALS
      ═══════════════════════════════════════ */}
      <section className="py-12 px-2 lg:px-4">
        <div className="container">
          <div className="flex items-end justify-between mb-12">
            <div className="flex flex-col gap-3">
              <EyeBrow>Reviews</EyeBrow>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.05] text-primary font-[Montserrat]">
                Customer <span className="text-fourth/80">Experience</span>
              </h2>
            </div>
            <div className="flex items-center gap-2 pb-1">
              <button
                onClick={prev}
                onMouseEnter={pauseSlider}
                onMouseLeave={resumeSlider}
                className="w-10 h-10 rounded-xl border border-primary/40 bg-primary hover:bg-primary/40 flex items-center justify-center text-fourth hover:text-primary hover:cursor-pointer hover:border-primary/30 transition-all duration-200"
                aria-label="Previous"
              >
                <ChevronLeft size={18} strokeWidth={1.8} />
              </button>
              <button
                onClick={next}
                onMouseEnter={pauseSlider}
                onMouseLeave={resumeSlider}
                className="w-10 h-10 rounded-xl border border-primary/40 flex items-center bg-primary hover:bg-primary/40 justify-center text-fourth hover:border-primary/30 hover:text-primary hover:cursor-pointer transition-all duration-200"
                aria-label="Next"
              >
                <ChevronRight size={18} strokeWidth={1.8} />
              </button>
            </div>
          </div>

          <div
            className="relative overflow-hidden"
            onMouseEnter={pauseSlider}
            onMouseLeave={resumeSlider}
          >
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={index}
                custom={direction}
                variants={sliderVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="grid grid-cols-1 lg:grid-cols-2 gap-4"
              >
                {visibleTestimonials.map((t, i) => (
                  <div
                    key={`${t.name}-${i}`}
                    className="group border border-primary/40 rounded-2xl p-8 flex flex-col gap-5 hover:border-primary/25 transition-all duration-300 hover:shadow-[0_8px_36px_rgba(0,0,0,0.4)] h-full"
                  >
                    <Quote
                      size={20}
                      className="text-fourth"
                      strokeWidth={1.4}
                    />
                    <p className="font-[Poppins] text-sm leading-[1.86] text-third/70 italic flex-1">
                      {t.review}
                    </p>
                    <div className="w-full h-px bg-primary/[0.07]" />
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full border border-third/20 flex items-center justify-center font-bold text-[13px] text-fourth shrink-0">
                        {t.name[0]}
                      </div>
                      <div>
                        <p className="font-[Montserrat] font-semibold text-[13px] text-primary">
                          {t.name}
                        </p>
                        <p className="font-[Poppins] text-[11px] text-third/50">
                          Verified Buyer
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

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
                    : "w-2 bg-primary/15 hover:bg-primary/30"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
