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
    "Buyers trust Adarsh Auto Consultants for transparent communication, reliable vehicle options, and a smooth buying experience.",
  heroImages: [
    "https://images.unsplash.com/photo-1550355291-bbee04a92027?w=500&auto=format",
    "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=500&auto=format",
    "https://images.unsplash.com/photo-1493238792000-8113da705763?w=500&auto=format",
    "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=500&auto=format",
    "https://images.unsplash.com/photo-1550355291-bbee04a92027?w=500&auto=format",
  ],

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
      image:
        "https://images.unsplash.com/photo-1550355291-bbee04a92027?w=500&auto=format",
    },
    {
      title: "Connect With Our Team",
      description:
        "Use AVX chat to discuss vehicle condition, pricing, and availability.",
      icon: "MessageCircle",
      image:
        "https://images.unsplash.com/photo-1515168833906-d2a3b82b302a?w=500&auto=format",
    },
    {
      title: "AVX Inspection Option",
      description:
        "Buyers can request AVX inspection to receive an independent condition report.",
      icon: "ShieldCheck",
      image:
        "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=500&auto=format",
    },
    {
      title: "Decision & Purchase",
      description:
        "Once satisfied with the vehicle details and inspection, finalize the purchase directly with the consultant.",
      icon: "Handshake",
      image:
        "https://images.unsplash.com/photo-1493238792000-8113da705763?w=500&auto=format",
    },
  ],

  /* VEHICLE SELECTION APPROACH */
  selectionTitle: "Our Approach to Vehicle Selection",
  selectionDescription:
    "Every vehicle listed through our storefront goes through a basic internal evaluation before being presented to buyers. This helps ensure that vehicles listed are suitable for serious buyers and provides a smoother vehicle buying experience.",
  selectionImages: [
    "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=500&auto=format",
    "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=500&auto=format",
    "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=500&auto=format",
  ],

  /* AVX INSPECTION */
  inspectionTitle: "AVX Inspection Assurance",
  inspectionText:
    "AVX inspection services provide additional transparency by documenting key aspects of the vehicle's condition before purchase.",
  inspectionPoints: [
    {
      title: "Exterior condition check",
      image:
        "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=500&auto=format",
    },
    {
      title: "Interior condition check",
      image:
        "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=500&auto=format",
    },
    {
      title: "Visible mechanical components",
      image:
        "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=500&auto=format",
    },
    {
      title: "Photo & video documentation",
      image:
        "https://images.unsplash.com/photo-1493238792000-8113da705763?w=500&auto=format",
    },
  ],

  /* CONSULTANT STORY */
  storyTitle: "Our Experience",
  storyText:
    "For over 12 years, Adarsh Auto Consultants has been helping buyers discover reliable vehicles across Gujarat.\n\nOur goal is to maintain a diverse vehicle inventory and provide accurate information so buyers can make confident decisions when purchasing their next vehicle.",
  storyImages: [
    "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=500&auto=format",
    "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=500&auto=format",
    "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=500&auto=format",
    "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=500&auto=format",
  ],

  /* CUSTOMER COMMITMENT */
  commitmentTitle: "Customer Commitment",
  commitmentText:
    "Our goal is to maintain transparent communication and assist buyers throughout the vehicle discovery and purchase process. We aim to provide honest guidance and reliable information for every buyer.",
  commitmentImages: [
    "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=500&auto=format",
    "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=500&auto=format",
    "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=500&auto=format",
  ],

  /* GALLERY */
  galleryTitle: "Our Showroom & Team",
  galleryImages: [
    "https://images.unsplash.com/photo-1503376780353-7e6692767b70",
    "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7",
    "https://images.unsplash.com/photo-1511919884226-fd3cad34687c",
    "https://images.unsplash.com/photo-1515168833906-d2a3b82b302a",
    "https://images.unsplash.com/photo-1550355291-bbee04a92027",
  ],

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
   CONSTANTS & MAPS
───────────────────────────────────────────── */
const iconMap = { Search, MessageCircle, ShieldCheck, Handshake };

const rotations = [-6, 8, 4, -5, 10];
const desktopPositions = [
  { top: "20px", left: "20px" },
  { top: "30px", right: "40px" },
  { top: "200px", left: "0px" },
  { bottom: "10px", left: "160px" },
  { bottom: "120px", right: "30px" },
];

/* ─────────────────────────────────────────────
   PAGE — SINGLE DEFAULT EXPORT
───────────────────────────────────────────── */
export default function WhyBuyHerePro2() {
  /* ── Inspection tab state ── */
  const [activeIndex, setActiveIndex] = useState(0);

  /* ── Testimonials slider state ── */
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
    center: { x: 0, opacity: 1, transition: { duration: 0.45 } },
    exit: (dir) => ({
      x: dir > 0 ? -60 : 60,
      opacity: 0,
      transition: { duration: 0.35 },
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
      <section className=" py-12 px-2 lg:px-4 relative flex items-center justify-center overflow-hidden min-h-screen">
        <div className="container">
        <div className=" grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* LEFT CONTENT */}
          <div>
            <motion.h1
              className="text-[clamp(28px,5vw,54px)] font-bold leading-[1.15] text-primary mb-5"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              Why Choose <span className="text-fourth">Adarsh</span> Auto
              Consultants
            </motion.h1>
            <motion.p
              className="text-third/70 text-[15px] leading-[1.9]"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              {data.heroDescription}
            </motion.p>
          </div>

          {/* RIGHT — polaroid scatter */}
          <div className="w-full">
            {/* MOBILE: 2-col polaroid grid */}
            <div className="grid grid-cols-2 gap-3 lg:hidden pt-2 pb-4">
              {data.heroImages.map((src, i) => (
                <motion.div
                  key={i}
                  className={i === 2 ? "col-span-2" : "col-span-1"}
                  initial={{ opacity: 0, y: 20, scale: 0.92 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.45, delay: i * 0.08 }}
                  viewport={{ once: true }}
                >
                  <div
                    className="bg-white rounded-xs"
                    style={{
                      padding: "6px 6px 22px",
                      boxShadow:
                        "0 4px 18px rgba(0,0,0,0.12), 0 1px 3px rgba(0,0,0,0.07)",
                      transform: `rotate(${rotations[i] * 0.4}deg)`,
                    }}
                  >
                    <img
                      src={src}
                      alt="car"
                      loading="lazy"
                      className="w-full object-cover rounded-[1px] block"
                      style={{ height: i === 2 ? "140px" : "110px" }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* DESKTOP: absolute scatter board */}
            <div className="relative h-[480px] hidden lg:block">
              {data.heroImages.map((src, i) => (
                <motion.div
                  key={i}
                  className="absolute cursor-pointer"
                  style={{ ...desktopPositions[i], zIndex: 5 + i }}
                  initial={{
                    opacity: 0,
                    y: 30,
                    scale: 0.9,
                    rotate: rotations[i] - 3,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    rotate: rotations[i],
                  }}
                  whileHover={{
                    scale: 1.06,
                    rotate: rotations[i] * 0.25,
                    zIndex: 20,
                    y: -6,
                    transition: { duration: 0.25, ease: "easeOut" },
                  }}
                  transition={{
                    duration: 0.5,
                    delay: i * 0.1,
                    ease: [0.22, 0.68, 0, 1.2],
                  }}
                  viewport={{ once: true }}
                >
                  <div
                    className="bg-white rounded-xs w-[180px]"
                    style={{
                      padding: "7px 7px 26px",
                      boxShadow:
                        "0 6px 28px rgba(0,0,0,0.14), 0 1px 4px rgba(0,0,0,0.07)",
                    }}
                  >
                    <img
                      src={src}
                      alt="car"
                      loading="lazy"
                      className="w-full h-[120px] object-cover rounded-[1px] block"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SECTION 2 — STORY
      ═══════════════════════════════════════ */}
      <section className="py-12 px-2 lg:px-4 bg-fourth">
        <div className="container">
          <div className="grid max-w-7xl mx-auto grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
            {/* LEFT — text */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              <p className="text-sm tracking-[0.4em] uppercase text-primary/60 font-semibold mb-2">
                Our Story
              </p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.05] text-primary mb-5">
                Our <span className="text-secondary">Experience</span>
              </h2>
              <p className="text-primary/90 text-[15px] leading-[1.9] whitespace-pre-line">
                {data.storyText}
              </p>
            </motion.div>

            {/* RIGHT — stacked images */}
            <motion.div
              className="flex flex-col gap-4"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              {data.storyImages.slice(0, 2).map((img, i) => (
                <div key={i} className="w-full h-40 rounded-xl overflow-hidden">
                  <img
                    src={img}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </div>
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
          <div className="pt-10 grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
            {/* LEFT — TEXT */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              <p className="text-sm tracking-[0.4em] uppercase text-third font-semibold mb-2">
                Selection
              </p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.05] text-primary mb-5">
                Our Approach to <br />
                <span className="text-fourth/80">Vehicle Selection</span>
              </h2>
              <div className="w-8 h-px bg-primary/15 my-3" />
              <p className="text-third/70 text-[15px] leading-[1.9]">
                {data.selectionDescription}
              </p>
            </motion.div>

            {/* RIGHT — image grid */}
            <motion.div
              className="p-3 rounded-2xl w-full h-full"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              <div className="grid grid-cols-3 gap-3 w-full h-full">
                <div className="col-span-2 aspect-4/3 rounded-xl overflow-hidden">
                  <img
                    src={data.selectionImages[0]}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-col gap-3">
                  {data.selectionImages.slice(1, 3).map((img, i) => (
                    <div
                      key={i}
                      className="aspect-4/3 rounded-xl overflow-hidden"
                    >
                      <img
                        src={img}
                        loading="lazy"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
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
            <p className="text-sm tracking-[0.4em] uppercase text-third font-semibold">
              Process
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-primary">
              How Buying <span className="text-fourth/80">Works</span>
            </h2>
            <p className="text-third/60 text-[15px] max-w-md">
              {data.processDescription}
            </p>
          </div>

          <div className="relative">
            {/* timeline line */}
            <div className="hidden lg:block absolute top-8 left-0 right-0 h-px bg-third/10" />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
              {data.processSteps.map((step, i) => {
                const Icon = iconMap[step.icon];
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.15 }}
                    viewport={{ once: true }}
                    className="relative flex flex-col gap-4"
                  >
                    <div className="w-full h-[140px] rounded-xl overflow-hidden">
                      <img
                        src={step.image}
                        alt={step.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-full border border-third/20 flex items-center justify-center">
                        <Icon
                          size={16}
                          className="text-fourth"
                          strokeWidth={1.5}
                        />
                      </div>
                      <span className="text-[11px] tracking-[0.2em] text-third/40 font-semibold">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-[14px] text-fourth mb-1">
                        {step.title}
                      </p>
                      <p className="text-[13px] text-third/65 leading-[1.7]">
                        {step.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SECTION 5 — INSPECTION
      ═══════════════════════════════════════ */}
      <section className="py-12 px-2 lg:px-4">
        <div className="container">
          {/* header */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-end mb-10">
            <div>
              <p className="text-sm tracking-[0.4em] uppercase text-third font-semibold mb-2">
                Inspection
              </p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-primary">
                AVX Inspection <span className="text-fourth/80">Assurance</span>
              </h2>
            </div>
            <div>
              <div className="w-8 h-px bg-primary/15 my-2" />
              <p className="text-third/70 text-[15px] leading-[1.9]">
                {data.inspectionText}
              </p>
            </div>
          </div>

          {/* main */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* LEFT — clickable list */}
            <div className="border border-third/10 rounded-2xl overflow-hidden">
              {data.inspectionPoints.map((item, i) => (
                <div
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={`flex justify-between items-center px-6 py-5 cursor-pointer transition ${
                    i === activeIndex
                      ? "bg-primary/5 border-l-4 border-fourth"
                      : "hover:bg-primary/3"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-bold text-fourth tracking-[0.2em]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-sm text-third/80">{item.title}</span>
                  </div>
                  <span className="text-[10px] uppercase font-bold text-primary">
                    View
                  </span>
                </div>
              ))}
            </div>

            {/* RIGHT — active image */}
            <motion.div
              key={activeIndex}
              className="w-full h-[260px] rounded-xl overflow-hidden"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              <img
                src={data.inspectionPoints[activeIndex].image}
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SECTION 6 — COMMITMENT  (bg-fourth)
      ═══════════════════════════════════════ */}
      <section className="py-12 px-2 lg:px-4 bg-fourth">
        <div className="container">
          <div className=" max-w-5xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              <p className="text-sm tracking-[0.4em] uppercase text-primary/60 font-semibold mb-3">
                Commitment
              </p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-primary mb-5">
                Customer <span className="text-secondary">Commitment</span>
              </h2>
              <div className="w-10 h-px bg-primary/20 mx-auto my-4" />
              <p className="text-primary/90 text-[15px] leading-[1.9] max-w-5xl">
                {data.commitmentText}
              </p>
            </motion.div>

            {/* image strip */}
            <motion.div
              className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              viewport={{ once: true }}
            >
              {data.commitmentImages.map((img, i) => (
                <div
                  key={i}
                  className={`relative rounded-xl overflow-hidden ${
                    i === 1 ? "lg:scale-105 lg:-translate-y-2 z-10" : ""
                  }`}
                >
                  <div className="w-full aspect-4/3">
                    <img
                      src={img}
                      loading="lazy"
                      className="w-full h-full object-cover transition duration-500 hover:scale-105"
                    />
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SECTION 7 — GALLERY
      ═══════════════════════════════════════ */}
      <section className="py-12 px-2 lg:px-4">
        <div className="container">
          <div className="flex flex-col gap-3 mb-10">
            <p className="text-sm tracking-[0.4em] uppercase text-third font-semibold">
              Gallery
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-primary">
              Our Showroom <span className="text-fourth/80">& Team</span>
            </h2>
          </div>

          {/* masonry grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 auto-rows-[120px]">
            <motion.div
              className="col-span-2 row-span-2 rounded-xl overflow-hidden"
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <img
                src={data.galleryImages[0]}
                loading="lazy"
                className="w-full h-full object-cover hover:scale-105 transition duration-500"
              />
            </motion.div>

            <motion.div
              className="col-span-1 row-span-1 rounded-xl overflow-hidden"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              viewport={{ once: true }}
            >
              <img
                src={data.galleryImages[1]}
                loading="lazy"
                className="w-full h-full object-cover hover:scale-105 transition duration-500"
              />
            </motion.div>

            <motion.div
              className="col-span-1 row-span-2 rounded-xl overflow-hidden"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
            >
              <img
                src={data.galleryImages[2]}
                loading="lazy"
                className="w-full h-full object-cover hover:scale-105 transition duration-500"
              />
            </motion.div>

            <motion.div
              className="col-span-1 row-span-1 rounded-xl overflow-hidden"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              viewport={{ once: true }}
            >
              <img
                src={data.galleryImages[3]}
                loading="lazy"
                className="w-full h-full object-cover hover:scale-105 transition duration-500"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SECTION 8 — TESTIMONIALS
      ═══════════════════════════════════════ */}
      <section className="py-12 px-2 lg:px-4">
        <div className="container">
          {/* header */}
          <div className="flex items-end justify-between mb-12">
            <div className="flex flex-col gap-3">
              <motion.p
                className="text-sm tracking-[0.4em] uppercase text-third font-semibold mb-2"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                Reviews
              </motion.p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-primary">
                Customer <span className="text-fourth/80">Experience</span>
              </h2>
            </div>
            <div className="flex gap-2">
              <button
                onClick={prev}
                onMouseEnter={pauseSlider}
                onMouseLeave={resumeSlider}
                className="w-10 h-10 rounded-xl border border-primary/30 flex items-center justify-center text-fourth hover:bg-primary/10"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={next}
                onMouseEnter={pauseSlider}
                onMouseLeave={resumeSlider}
                className="w-10 h-10 rounded-xl border border-primary/30 flex items-center justify-center text-fourth hover:bg-primary/10"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          {/* slider */}
          <div
            className="relative overflow-hidden rounded-2xl"
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
                className="grid grid-cols-1 lg:grid-cols-2 gap-6"
              >
                {visibleTestimonials.map((t, i) => (
                  <div
                    key={`${t.name}-${i}`}
                    className="group relative rounded-2xl p-7 bg-white/5 backdrop-blur-md border border-white/10 hover:border-primary/30 transition-all duration-300 overflow-hidden"
                  >
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-linear-to-br from-primary/10 via-transparent to-transparent" />
                    <Quote
                      size={22}
                      className="text-fourth mb-4 relative z-10"
                      strokeWidth={1.4}
                    />
                    <p className="font-[Poppins] text-[14px] leading-[1.9] text-third/80 italic relative z-10 mb-6">
                      {t.review}
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
                        <p className="text-[11px] text-third/50">
                          Verified Buyer
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* dots */}
          <div className="flex items-center gap-2 mt-8">
            {Array.from({ length: maxIndex + 1 }).map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setDirection(i > index ? 1 : -1);
                  setIndex(i);
                }}
                className={`h-1 rounded-full transition-all duration-300 ${
                  i === index ? "w-6 bg-primary/60" : "w-2 bg-primary/15"
                }`}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
