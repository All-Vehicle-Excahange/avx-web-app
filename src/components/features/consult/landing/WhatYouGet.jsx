"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import {
  FiHome,
  FiShield,
  FiGrid,
  FiStar,
  FiMessageSquare,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";

const features = [
  {
    number: "01",
    title: "Public Storefront Page",
    desc: "Showcase your vehicles with a professional branded presence that converts visitors into serious buyers.",
    icon: <FiHome className="w-5 h-5" />,
    bgImage: "/store-front.png",
  },
  {
    number: "02",
    title: "Verified Business Identity",
    desc: "Build instant trust with verified consultant credentials and an authenticated business badge.",
    icon: <FiShield className="w-5 h-5" />,
    bgImage: "/business-verification.webp",
  },
  {
    number: "03",
    title: "Structured Inventory Display",
    desc: "Organize listings with clear specifications, rich media, and intelligent filtering.",
    icon: <FiGrid className="w-5 h-5" />,
    bgImage: "/inventory-management.png",
  },
  {
    number: "04",
    title: "Ratings & Review Visibility",
    desc: "Strengthen credibility with transparent, verified buyer feedback displayed prominently.",
    icon: <FiStar className="w-5 h-5" />,
    bgImage: "/reviews.webp",
  },
  {
    number: "05",
    title: "Inquiry Dashboard",
    desc: "Manage every buyer inquiry with structured tracking, response tools, and real-time alerts.",
    icon: <FiMessageSquare className="w-5 h-5" />,
    bgImage: "/inquiry-chat.png",
  },
];

export default function WhatYouGetSpotlight() {
  const [activeFeature, setActiveFeature] = useState(0);
  const active = features[activeFeature];

  return (
    <section className="relative py-28 overflow-hidden">
      <div className="relative z-10 max-w-[1480px] mx-auto w-full">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <span className="text-sm tracking-[0.4em] uppercase text-third font-semibold mb-4">
            What You Get
          </span>

          <h2 className="text-[32px] sm:text-[40px] md:text-[48px] lg:text-[52px] font-semibold leading-[1.08] tracking-tight text-primary max-w-xl mt-5">
            Everything you need to{" "}
            <span className="bg-linear-to-r from-fourth via-[#60a5fa] to-fourth bg-clip-text text-transparent font-bold">
              dominate
            </span>{" "}
            your market.
          </h2>
        </motion.div>

        {/* MAIN */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
          {/* LEFT */}
          {/* LEFT — Improved Feature Nav */}
          <div className="lg:w-[360] shrink-0">
            <div className="flex flex-col gap-2.5">
              {features.map((f, i) => {
                const isActive = activeFeature === i;

                return (
                  <button
                    key={i}
                    onClick={() => setActiveFeature(i)}
                    className={`relative group text-left rounded-xl px-5 py-4 transition-all duration-300 border overflow-hidden hover:cursor-pointer
            ${
              isActive
                ? "border-fourth/40 bg-linear-to-r from-[#0d1b2e] to-[#0b1320] shadow-[0_0_0_1px_rgba(59,130,246,0.15),0_10px_30px_rgba(0,0,0,0.4)]"
                : "border-[#1f2937] bg-[#0f1117]/60 hover:border-[#2d3748] hover:bg-[#0f1117]"
            }`}
                  >
                    {/* Active glow accent */}
                    {isActive && (
                      <div className="absolute left-0 top-0 bottom-0 w-[3] bg-fourth rounded-r-full" />
                    )}

                    <div className="flex items-center gap-4">
                      {/* Title */}
                      <div className="flex-1">
                        <p
                          className={`text-[14px] font-semibold leading-snug transition-colors
                ${isActive ? "text-primary" : "text-third group-hover:text-primary/80"}`}
                        >
                          {f.title}
                        </p>
                      </div>

                      {/* Icon */}
                      <div
                        className={`transition-all duration-300
              ${isActive ? "text-fourth scale-105" : "text-[#4b5563] group-hover:text-third"}`}
                      >
                        {f.icon}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* RIGHT */}
          <motion.div
            key={active.bgImage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex-1 min-h-[300]"
       >
            <div className="relative h-full rounded-2xl border border-[#1f2937] overflow-hidden">
              {/* Dynamic Background */}
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `url(${active.bgImage})`,
                  filter: "grayscale(100%) brightness(0.2) contrast(0.85)",
                }}
              />

              {/* Overlay */}

              {/* Content */}
              <div className="relative p-8 flex flex-col h-full">
                <div className="h-0.5 w-full bg-linear-to-r from-fourth via-[#60a5fa] to-transparent mb-6" />

                <div className="flex items-start justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-fourth/10 border border-fourth/20 flex items-center justify-center text-fourth">
                    {active.icon}
                  </div>

                  <span className="text-[10px] font-bold tracking-[0.3em] text-[#374151] uppercase">
                    {active.number} / 05
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-bold text-primary mb-3">
                  {active.title}
                </h3>

                <p className="text-third text-[15px] leading-relaxed max-w-md">
                  {active.desc}
                </p>

                {/* Pagination */}
                <div className="mt-auto flex items-center justify-between">
                  <div className="flex gap-2 ">
                    {features.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveFeature(i)}
                        className={`rounded-full hover:cursor-pointer ${
                          activeFeature === i
                            ? "w-6 h-1.5 bg-fourth"
                            : "w-1.5 h-1.5 bg-[#1f2937]"
                        }`}
                      />
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() =>
                        setActiveFeature((i) => Math.max(0, i - 1))
                      }
                      disabled={activeFeature === 0}
                      className="w-8 h-8 rounded-lg border border-[#1f2937] flex items-center justify-center hover:cursor-pointer"
                    >
                      <FiChevronLeft />
                    </button>

                    <button
                      onClick={() =>
                        setActiveFeature((i) =>
                          Math.min(features.length - 1, i + 1),
                        )
                      }
                      disabled={activeFeature === features.length - 1}
                      className="w-8 h-8 rounded-lg border border-[#1f2937] flex items-center justify-center hover:cursor-pointer"
                    >
                      <FiChevronRight />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
