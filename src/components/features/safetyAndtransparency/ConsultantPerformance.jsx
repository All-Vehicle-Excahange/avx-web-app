"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const cards = [
  {
    label: "Inventory",
    heading: ["Active Inventory", "Overview"],
    highlight: "Overview",
    body: "View the consultant’s current stock mix, listing recency, and category coverage to understand availability and specialization.",
    flip: false,
    image: "/safety-inventry.jpg",
  },
  {
    label: "Ratings",
    heading: ["Verified Performance", "Rating"],
    highlight: "Rating",
    body: "Ratings reflect completed buyer interactions, helping you assess overall service consistency and reliability at a glance.",
    flip: true,
    image: "/safety-rating.webp",
  },
  {
    label: "Reviews",
    heading: ["Buyer Experience", "Feedback"],
    highlight: "Feedback",
    body: "Read detailed feedback from verified inquiries to understand communication quality and overall buyer experience.",
    flip: false,
    image: "/safety-buying.webp",
  },
  {
    label: "Response Performance",
    heading: ["Response Speed", "& Consistency"],
    highlight: "Consistency",
    body: "See how quickly consultants reply to inquiries and how consistently they maintain communication across interactions.",
    flip: true,
    image: "/safety-call.jpg",
  },
  {
    label: "Inspection Ratio",
    heading: ["Inspection", "Transparency Level"],
    highlight: "Transparency",
    body: "Understand what percentage of listings include inspection reports — a strong indicator of listing transparency.",
    flip: false,
    image: "/safety-car-inspect.jpg",
  },
];

export default function ConsultantPerformance() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  /* ───── DESKTOP CONSTANTS ───── */

  const CARD_H = 460;
  const TOP = 80;
  const GAP = 60;
  const SCROLL_PER_CARD = 600;
  const CONTAINER_H =
    SCROLL_PER_CARD * (cards.length - 1) + CARD_H + TOP + 20;

  return (
    <section className="py-10 md:py-10 px-4 md:px-6 bg-white">

      {/* HEADER */}
      <div className="text-left md:text-center max-w-xl mx-auto mb-16 md:mb-24">
        <p className="text-xs md:text-sm tracking-[0.4em] uppercase text-third font-semibold mb-4">
          Consultant Performance Visibility
        </p>

        <h2 className="text-[30px] sm:text-[38px] md:text-[48px] font-bold leading-[1.1] text-primary">
          Evaluate Who You're{" "}
          <span className="text-fourth">Dealing With</span>
        </h2>

        <p className="text-[14px] md:text-[16px] text-third leading-relaxed mt-3">
          Each consultant storefront displays verifiable data points so buyers can assess credibility before committing.
        </p>
      </div>

      {/* ───── MOBILE → NORMAL FLOW ───── */}

      {isMobile ? (
        <div className="max-w-2xl mx-auto space-y-10">
          {cards.map((card, index) => (
            <div
              key={index}
              className="rounded-3xl overflow-hidden border border-gray-200 bg-white shadow-sm"
            >
              <div className="h-[220] relative">
                <img
                  src={card.image}
                  alt=""
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 " />
              </div>

              <div className="p-6">
                <span className="inline-block px-4 py-1.5 rounded-full bg-fourth/10 text-fourth text-[12px] font-semibold mb-4">
                  {card.label}
                </span>

                <h3 className="text-[28px] font-extrabold text-secondary leading-tight mb-3">
                  {card.heading[0]} <br />
                  <span className="text-fourth">{card.highlight}</span>
                </h3>

                <p className="text-[15px] leading-[1.8] text-third">
                  {card.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* ───── DESKTOP STACK (UNCHANGED) ───── */
        <div
          className="relative mx-auto"
          style={{ maxWidth: 960, height: CONTAINER_H }}
        >
          {cards.map((card, index) => (
            <motion.div
              key={index}
              className="sticky grid grid-cols-2 rounded-3xl overflow-hidden border border-gray-200 bg-white"
              style={{
                top: TOP,
                zIndex: 10 + index,
                marginTop: index === 0 ? 0 : GAP,
                height: CARD_H,
                direction: card.flip ? "rtl" : "ltr",
                boxShadow:
                  "0 12px 48px -12px rgba(0,0,0,0.15), 0 4px 12px rgba(0,0,0,0.06)",
              }}
            >
              <div className="flex flex-col justify-center px-12 bg-white" style={{ direction: "ltr" }}>
                <span className="inline-block w-fit px-4 py-1.5 rounded-full bg-fourth/10 text-fourth text-[12px] font-semibold tracking-wide mb-5">
                  {card.label}
                </span>

                <h3 className="text-[44px] font-extrabold text-secondary leading-tight mb-4">
                  {card.heading[0]} <br />
                  <span className="text-fourth">{card.highlight}</span>
                </h3>

                <p className="text-[16px] leading-[1.9] text-third max-w-[360]">
                  {card.body}
                </p>
              </div>

              <div
                className="relative overflow-hidden"
                style={{
                  borderLeft: card.flip ? "none" : "1px solid #f3f4f6",
                  borderRight: card.flip ? "1px solid #f3f4f6" : "none",
                }}
              >
                <img
                  src={card.image}
                  alt=""
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 " />
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
}