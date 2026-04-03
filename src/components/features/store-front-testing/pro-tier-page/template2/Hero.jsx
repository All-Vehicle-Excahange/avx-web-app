"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ─────────────────────────────────────────────
   DATA  (flat structure matching WHY_BUY_HERE_PREMIUM_1 schema)
───────────────────────────────────────────── */
const data = {
  whyBuyHeroTitle: "Why Choose Adarsh Auto Consultants",
  whyBuyHeroDescription:
    "Buyers trust Adarsh Auto Consultants for transparent communication, reliable vehicle options, and a smooth buying experience.",
  whyBuyHeroTemplate1: { id: 1, imageUrl: "https://images.unsplash.com/photo-1550355291-bbee04a92027?w=500&auto=format" },
  whyBuyHeroTemplate2: { id: 2, imageUrl: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=500&auto=format" },
  whyBuyHeroTemplate3: { id: 3, imageUrl: "https://images.unsplash.com/photo-1493238792000-8113da705763?w=500&auto=format" },
  whyBuyHeroTemplate4: { id: 4, imageUrl: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=500&auto=format" },
  whyBuyHeroTemplate5: { id: 5, imageUrl: "https://images.unsplash.com/photo-1550355291-bbee04a92027?w=500&auto=format" },
  processTitle: "How Buying Works",
  processDescription:
    "Buying a vehicle through our storefront is designed to be simple, transparent, and convenient for buyers.",
  processTemplate1: { id: 1, imageUrl: "https://images.unsplash.com/photo-1550355291-bbee04a92027?w=500&auto=format" },
  processTemplate2: { id: 2, imageUrl: "https://images.unsplash.com/photo-1515168833906-d2a3b82b302a?w=500&auto=format" },
  processTemplate3: { id: 3, imageUrl: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=500&auto=format" },
  processTemplate4: { id: 4, imageUrl: "https://images.unsplash.com/photo-1493238792000-8113da705763?w=500&auto=format" },
  processSteps: [
    {
      title: "Discover Vehicles",
      description:
        "Browse our inventory and shortlist vehicles that match your requirements.",
      icon: `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"/></svg>`,
    },
    {
      title: "Connect With Our Team",
      description:
        "Use AVX chat to discuss vehicle condition, pricing, and availability.",
      icon: `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M240-400h480v-80H240v80Zm0-120h480v-80H240v80Zm0-120h480v-80H240v80ZM80-80v-720q0-33 23.5-56.5T160-880h640q33 0 56.5 23.5T880-800v480q0 33-23.5 56.5T800-240H240L80-80Zm126-240h594v-480H160v525l46-45Zm-46 0v-480 480Z"/></svg>`,
    },
    {
      title: "AVX Inspection Option",
      description:
        "Buyers can request AVX inspection to receive an independent condition report.",
      icon: `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="m424-296 282-282-56-56-226 226-114-114-56 56 170 170Zm56 216q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80ZM160-480q0 133 93.5 226.5T480-160q133 0 226.5-93.5T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480Zm320 0Z"/></svg>`,
    },
    {
      title: "Decision & Purchase",
      description:
        "Once satisfied with the vehicle details and inspection, finalize the purchase directly with the consultant.",
      icon: `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M480-80q-75 0-140.5-28.5t-114-77q-48.5-48.5-77-114T120-440q0-121 76-214t197-120l15 79q-91 22-144.5 94T110-440q0 61 23 115t63 95q40 40 94.5 63T406-144l-26 79q25 5 50 7.5t50 2.5Zm120-40-23-76q46-15 85-42.5t68-65.5l64 48q-43 51-95 86.5T600-120Zm221-224-64-48q19-27 31-57.5t12-62.5l80-5q-3 47-19 89.5T821-344Zm-16-291-79 15q-13-54-41.5-101.5T620-808l48-64q54 51 91 113.5T805-635ZM360-320l-160-160 56-56 104 104 264-264 56 56-320 320Z"/></svg>`,
    },
  ],
  vehicleSelectionTitle: "Our Approach to Vehicle Selection",
  vehicleSelectionDescription:
    "Every vehicle listed through our storefront goes through a basic internal evaluation before being presented to buyers. This helps ensure that vehicles listed are suitable for serious buyers and provides a smoother vehicle buying experience.",
  vehicleSelectionTemplate1: { id: 1, imageUrl: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=500&auto=format" },
  vehicleSelectionTemplate2: { id: 2, imageUrl: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=500&auto=format" },
  vehicleSelectionTemplate3: { id: 3, imageUrl: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=500&auto=format" },
  inspectionTitle: "AVX Inspection Assurance",
  inspectionText:
    "AVX inspection services provide additional transparency by documenting key aspects of the vehicle's condition before purchase.",
  inspectionTemplate1: { id: 1, imageUrl: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=500&auto=format" },
  inspectionTemplate2: { id: 2, imageUrl: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=500&auto=format" },
  inspectionTemplate3: { id: 3, imageUrl: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=500&auto=format" },
  inspectionTemplate4: { id: 4, imageUrl: "https://images.unsplash.com/photo-1493238792000-8113da705763?w=500&auto=format" },
  inspectionPoints: [
    "Exterior condition check",
    "Interior condition check",
    "Visible mechanical components",
    "Photo & video documentation",
  ],
  storyTitle: "Our Experience",
  storyDescription:
    "For over 12 years, Adarsh Auto Consultants has been helping buyers discover reliable vehicles across Gujarat.\n\nOur goal is to maintain a diverse vehicle inventory and provide accurate information so buyers can make confident decisions when purchasing their next vehicle.",
  storyTemplate1: { id: 1, imageUrl: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=500&auto=format" },
  storyTemplate2: { id: 2, imageUrl: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=500&auto=format" },
  storyTemplate3: { id: 3, imageUrl: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=500&auto=format" },
  storyTemplate4: { id: 4, imageUrl: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=500&auto=format" },
  customerCommitmentTitle: "Customer Commitment",
  customerCommitmentDescription:
    "Our goal is to maintain transparent communication and assist buyers throughout the vehicle discovery and purchase process. We aim to provide honest guidance and reliable information for every buyer.",
  customerCommitmentTemplate1: { id: 1, imageUrl: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=500&auto=format" },
  customerCommitmentTemplate2: { id: 2, imageUrl: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=500&auto=format" },
  customerCommitmentTemplate3: { id: 3, imageUrl: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=500&auto=format" },
  galleryTitle: "Our Showroom & Team",
  galleryTemplate1: { id: 1, imageUrl: "https://images.unsplash.com/photo-1503376780353-7e6692767b70" },
  galleryTemplate2: { id: 2, imageUrl: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7" },
  galleryTemplate3: { id: 3, imageUrl: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c" },
  galleryTemplate4: { id: 4, imageUrl: "https://images.unsplash.com/photo-1515168833906-d2a3b82b302a" },
  galleryTemplate5: { id: 5, imageUrl: "https://images.unsplash.com/photo-1550355291-bbee04a92027" },
  testimonialTitle: "Customer Experience",
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
  testimonialIcon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21c3 0 7-1 7-8V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v6c0 1.1.9 2 2 2h4c0 2.2-1.8 4-4 4H3c-.6 0-1 .4-1 1s.4 1 1 1Z"/><path d="M15 21c3 0 7-1 7-8V5c0-1.1-.9-2-2-2h-3c-1.1 0-2 .9-2 2v6c0 1.1.9 2 2 2h4c0 2.2-1.8 4-4 4h-2c-.6 0-1 .4-1 1s.4 1 1 1Z"/></svg>`,
};

/* ─────────────────────────────────────────────
   DATA  (flat structure matching WHY_BUY_HERE_PREMIUM_1 schema)
───────────────────────────────────────────── */

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

  /* ── Prepare Arrays from Template Objects ── */
  const heroImages = [
    data.whyBuyHeroTemplate1?.imageUrl,
    data.whyBuyHeroTemplate2?.imageUrl,
    data.whyBuyHeroTemplate3?.imageUrl,
    data.whyBuyHeroTemplate4?.imageUrl,
    data.whyBuyHeroTemplate5?.imageUrl,
  ].filter(Boolean);

  const storyImages = [
    data.storyTemplate1?.imageUrl,
    data.storyTemplate2?.imageUrl,
    data.storyTemplate3?.imageUrl,
    data.storyTemplate4?.imageUrl,
  ].filter(Boolean);

  const selectionImages = [
    data.vehicleSelectionTemplate1?.imageUrl,
    data.vehicleSelectionTemplate2?.imageUrl,
    data.vehicleSelectionTemplate3?.imageUrl,
  ].filter(Boolean);

  const commitmentImages = [
    data.customerCommitmentTemplate1?.imageUrl,
    data.customerCommitmentTemplate2?.imageUrl,
    data.customerCommitmentTemplate3?.imageUrl,
  ].filter(Boolean);

  const galleryImages = [
    data.galleryTemplate1?.imageUrl,
    data.galleryTemplate2?.imageUrl,
    data.galleryTemplate3?.imageUrl,
    data.galleryTemplate4?.imageUrl,
    data.galleryTemplate5?.imageUrl,
  ].filter(Boolean);

  const processImages = [
    data.processTemplate1?.imageUrl,
    data.processTemplate2?.imageUrl,
    data.processTemplate3?.imageUrl,
    data.processTemplate4?.imageUrl,
  ].filter(Boolean);

  const inspectionImages = [
    data.inspectionTemplate1?.imageUrl,
    data.inspectionTemplate2?.imageUrl,
    data.inspectionTemplate3?.imageUrl,
    data.inspectionTemplate4?.imageUrl,
  ].filter(Boolean);

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
                {data.whyBuyHeroTitle}
              </motion.h1>
              <div
                className="text-third/70 text-[15px] leading-[1.9]"
                dangerouslySetInnerHTML={{ __html: data.whyBuyHeroDescription }}
              />
            </div>

            {/* RIGHT — polaroid scatter */}
            <div className="w-full">
              {/* MOBILE: 2-col polaroid grid */}
              <div className="grid grid-cols-2 gap-3 lg:hidden pt-2 pb-4">
                {heroImages.map((src, i) => (
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
                {heroImages.map((src, i) => (
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
                {data.storyTitle}
              </h2>
              <div
                className="text-primary/90 text-[15px] leading-[1.9] whitespace-pre-line"
                dangerouslySetInnerHTML={{ __html: data.storyDescription }}
              />
            </motion.div>

            {/* RIGHT — stacked images */}
            <motion.div
              className="flex flex-col gap-4"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              {storyImages.slice(0, 2).map((img, i) => (
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
                Vehicle Selection
              </h2>
              <div className="w-8 h-px bg-primary/15 my-3" />
              <div
                className="text-third/70 text-[15px] leading-[1.9]"
                dangerouslySetInnerHTML={{ __html: data.vehicleSelectionDescription }}
              />
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
                    src={selectionImages[0]}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-col gap-3">
                  {selectionImages.slice(1, 3).map((img, i) => (
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
              How Buying Works
            </h2>
            <div
              className="text-third/60 text-[15px] max-w-md"
              dangerouslySetInnerHTML={{ __html: data.processDescription }}
            />
          </div>

          <div className="relative">
            {/* timeline line */}
            <div className="hidden lg:block absolute top-8 left-0 right-0 h-px bg-third/10" />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
              {data.processSteps.map((step, i) => {
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
                        src={processImages[i % processImages.length]}
                        alt={step.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-full border border-third/20 flex items-center justify-center overflow-hidden">
                        {typeof step.icon === "string" && step.icon.startsWith("<svg") ? (
                          <div
                            className="text-primary [&>svg]:w-5 [&>svg]:h-5 transition-colors duration-300"
                            dangerouslySetInnerHTML={{ __html: step.icon }}
                          />
                        ) : (
                          <div className="w-5 h-5 bg-third/20 rounded flex items-center justify-center text-[10px] text-third">
                            Icon
                          </div>
                        )}
                      </div>
                      <span className="text-[11px] tracking-[0.2em] text-third/40 font-semibold">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-[14px] text-primary mb-1">
                        {step.title}
                      </p>
                      <div
                        className="text-[13px] text-third/65 leading-[1.7]"
                        dangerouslySetInnerHTML={{ __html: step.description }}
                      />
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
                {data.inspectionTitle}
              </h2>
            </div>
            <div>
              <div className="w-8 h-px bg-primary/15 my-2" />
              <div
                className="text-third/70 text-[15px] leading-[1.9]"
                dangerouslySetInnerHTML={{ __html: data.inspectionText }}
              />
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
                  className={`flex justify-between items-center px-6 py-5 cursor-pointer transition ${i === activeIndex
                    ? "bg-primary/5 border-l-4 border-primary"
                    : "hover:bg-primary/3"
                    }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-bold text-primary tracking-[0.2em]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div
                      className="text-sm text-third/80"
                      dangerouslySetInnerHTML={{ __html: item }}
                    />
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
                src={inspectionImages[activeIndex % inspectionImages.length]}
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
                {data.customerCommitmentTitle}
              </h2>
              <div className="w-10 h-px bg-primary/20 mx-auto my-4" />
              <div
                className="text-primary/90 text-[15px] leading-[1.9] max-w-5xl"
                dangerouslySetInnerHTML={{ __html: data.customerCommitmentDescription }}
              />
            </motion.div>

            {/* image strip */}
            <motion.div
              className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              viewport={{ once: true }}
            >
              {commitmentImages.map((img, i) => (
                <div
                  key={i}
                  className={`relative rounded-xl overflow-hidden ${i === 1 ? "lg:scale-105 lg:-translate-y-2 z-10" : ""
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
              {data.galleryTitle}
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
                src={galleryImages[0]}
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
                src={galleryImages[1]}
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
                src={galleryImages[2]}
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
                src={galleryImages[3]}
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
                {data.testimonialTitle}
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.testimonials.slice(0, 2).map((t, i) => (
              <div
                key={`${t.name}-${i}`}
                className="group relative rounded-2xl p-7 bg-white/5 backdrop-blur-md border border-white/10 hover:border-primary/30 transition-all duration-300 overflow-hidden"
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-linear-to-br from-primary/10 via-transparent to-transparent" />
                <div className="text-primary [&>svg]:w-[22px] [&>svg]:h-[22px] mb-4 relative z-10">
                  {typeof data.testimonialIcon === "string" && data.testimonialIcon.startsWith("<svg") ? (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: data.testimonialIcon,
                      }}
                    />
                  ) : (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21c3 0 7-1 7-8V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v6c0 1.1.9 2 2 2h4c0 2.2-1.8 4-4 4H3c-.6 0-1 .4-1 1s.4 1 1 1Z"/><path d="M15 21c3 0 7-1 7-8V5c0-1.1-.9-2-2-2h-3c-1.1 0-2 .9-2 2v6c0 1.1.9 2 2 2h4c0 2.2-1.8 4-4 4h-2c-.6 0-1 .4-1 1s.4 1 1 1Z"/></svg>`,
                      }}
                    />
                  )}
                </div>
                <div
                  className="font-[Poppins] text-[14px] leading-[1.9] text-third/80 italic relative z-10 mb-6"
                  dangerouslySetInnerHTML={{ __html: t.review }}
                />
                <div className="w-full h-px bg-primary/10 mb-5 relative z-10" />
                <div className="flex items-center gap-3 relative z-10">
                  <div className="w-10 h-10 rounded-full bg-linear-to-br from-primary/20 to-primary/5 flex items-center justify-center font-bold text-[14px] text-primary">
                    {t.name?.[0] || "?"}
                  </div>
                  <div>
                    <p className="font-[Montserrat] font-semibold text-[13px] text-primary">
                      {t.name}
                    </p>
                    <p className="text-[11px] text-third/50">Verified Buyer</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
