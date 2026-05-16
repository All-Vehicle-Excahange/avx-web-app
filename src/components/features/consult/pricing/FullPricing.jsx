"use client";

import { motion } from "framer-motion";
import {
  FiCheck,
  FiSearch,
  FiZap,
  FiStar,
  FiTarget,
  FiVideo,
} from "react-icons/fi";
import { useState } from "react";
import PricingHero from "./PricingHero";

const tiers = [
  {
    name: "Basic",
    tagline: "Start building your presence on AVX.",
    color: "#6b7280",
    priceMonth: "₹999 ",
    priceYear: "₹9,999",
    bestFor: "Small consultants & entry-level sellers",
    features: [
      "Up to 8 active listings",
      "Default storefront theme",
      "Public search visibility",
      "Receive inquiries",
      "Basic analytics",
      "Inspection request support",
      "Access to PPC (paid separately)",
    ],
    note: "No customization. No featured priority.",
    cta: "Get Started",
    ctaStyle: "border border-[#d1d5db] text-[#111827] hover:bg-[#f9fafb]",
  },
  {
    name: "Pro",
    tagline: "Everything you need to grow and compete.",
    highlight: true,
    color: "#2563eb",
    priceMonth: "₹2,999",
    priceYear: "₹19,999 ",
    bestFor: "Growing dealerships",
    features: [
      "25–40 active listings",
      "Enhanced search visibility",
      "Advanced analytics",
      "Performance metrics",
      "Higher inquiry limits",
      "Featured vehicle eligibility",
      "WhatsApp integration",
    ],
    note: "Designed for growth-focused consultants.",
    cta: "Get Started",
    ctaStyle: "bg-[#2563eb] text-white hover:bg-[#1d4ed8]",
  },
  {
    name: "Premium",
    tagline: "Maximum authority across the marketplace.",
    color: "#6b7280",
    priceMonth: "₹7,999",
    priceYear: "₹69,999",
    bestFor: "Large inventory dealers & brands",
    features: [
      "75+ active listings",
      "Premium customization",
      "Custom banners & media",
      "Top placement eligibility",
      "Dedicated support",
      "Free re-inspection",
      "Priority PPC slots",
      "Advanced analytics dashboard",
    ],
    note: "Premium visibility & authority positioning.",
    cta: "Get Started",
    ctaStyle: "border border-[#d1d5db] text-[#111827] hover:bg-[#f9fafb]",
  },
];

const addons = [
  {
    title: "Reecomm Inspection Fees",
    desc: "Professional third-party inspections to increase buyer confidence.",
    icon: <FiSearch />,
  },
  {
    title: "Sponsored Vehicle Boost",
    desc: "Promote selected listings to gain higher visibility in search.",
    icon: <FiZap />,
  },
  {
    title: "Featured Consultant Slot",
    desc: "Appear in premium consultant placements across the marketplace.",
    icon: <FiStar />,
  },
  {
    title: "Category Dominance Campaign",
    desc: "Own visibility in your segment with targeted exposure campaigns.",
    icon: <FiTarget />,
  },
  {
    title: "Video Inspection Add-on",
    desc: "Offer video walk-through inspections to increase buyer trust.",
    icon: <FiVideo />,
  },
];

export default function FullPricing() {
  const [yearly, setYearly] = useState(false);

  return (
    <div>
      {/* HERO */}
      <PricingHero yearly={yearly} setYearly={setYearly} />

      {/* CARDS — div NOT section, inline style beats global CSS */}
      <div
        id="pricing-table"
        className="relative z-10 -mt-64 mb-0"
        // style={{ background: "#ffffff" }}
      >
        <div className=" relative -top-40 max-w-7xl mx-auto px-5 sm:px-6 pt-0">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 items-end">
            {tiers.map((tier, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className={`relative flex flex-col rounded-2xl overflow-hidden ${
                  tier.highlight ? "lg:-translate-y-4" : ""
                }`}
                style={{
                  background: tier.highlight
                    ? "linear-gradient(180deg, #0069e0 0%, #0055b8 100%)"
                    : "linear-gradient(180deg, #ffffff 0%, #f9fafb 100%)",
                  border: tier.highlight
                    ? "1px solid rgba(255,255,255,0.30)"
                    : "1px solid rgba(0,0,0,0.08)",
                  boxShadow: tier.highlight
                    ? "0 20px 60px rgba(0,60,180,0.35)"
                    : "0 8px 30px rgba(0,0,0,0.08)",
                }}
              >
                {/* soft glow ring for highlight */}
                {tier.highlight && (
                  <div className="absolute -inset-0.5 rounded-2xl bg-white/10 blur-xl opacity-40 pointer-events-none" />
                )}

                {tier.highlight && (
                  <div className="text-white text-[10px] font-bold tracking-[0.2em] uppercase text-center py-2.5 bg-white/15 backdrop-blur-sm">
                    Recommended
                  </div>
                )}

                <div className="relative p-7 flex flex-col flex-1">
                  <h3
                    className={`text-[20px] font-bold mb-1 ${tier.highlight ? "text-white" : "text-[#111827]"}`}
                  >
                    {tier.name}
                  </h3>

                  <p
                    className={`text-[13px] mb-5 ${tier.highlight ? "text-white/60" : "text-[#6b7280]"}`}
                  >
                    {tier.tagline}
                  </p>

                  <div className="mb-1">
                    <span
                      className={`text-[26px] font-black ${tier.highlight ? "text-white" : "text-[#111827]"}`}
                    >
                      {yearly && tier.priceYear
                        ? tier.priceYear
                        : tier.priceMonth}
                    </span>
                    <span
                      className={`text-[12px] ml-1 ${tier.highlight ? "text-white/50" : "text-[#9ca3af]"}`}
                    >
                      / {yearly ? "year" : "month"}
                    </span>
                  </div>

                  <p
                    className={`text-[11px] mb-5 ${tier.highlight ? "text-white/50" : "text-[#9ca3af]"}`}
                  >
                    Best for: {tier.bestFor}
                  </p>

                  <div
                    className={`h-px mb-5 ${tier.highlight ? "bg-white/10" : "bg-[#eef2f7]"}`}
                  />

                  {/* FEATURES */}
                  <ul className="space-y-3 flex-1">
                    {tier.features.map((f, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <div
                          className="w-5 h-5 rounded-full flex items-center justify-center mt-0.5"
                          style={{
                            background: tier.highlight
                              ? "rgba(255,255,255,0.20)"
                              : "rgba(0,0,0,0.05)",
                          }}
                        >
                          <FiCheck
                            className="text-[10px]"
                            style={{
                              color: tier.highlight ? "#fff" : "#6b7280",
                            }}
                          />
                        </div>
                        <span
                          className={`text-[13px] ${tier.highlight ? "text-white/80" : "text-[#374151]"}`}
                        >
                          {f}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <p
                    className={`text-[11px] mt-5 italic ${tier.highlight ? "text-white/40" : "text-[#9ca3af]"}`}
                  >
                    {tier.note}
                  </p>

                  {/* BUTTON */}
                  <button
                    className="w-full py-3 rounded-full text-[14px] font-semibold transition-all duration-300 mt-8 hover:cursor-pointer"
                    style={{
                      background: tier.highlight
                        ? "#fff"
                        : "linear-gradient(90deg, #313131 0%, #1a1919 45%, #000000 100%)",
                      color: tier.highlight ? "#1f1f1f" : "#fff",
                      boxShadow: tier.highlight
                        ? "0 6px 20px rgba(255,255,255,0.2)"
                        : "0 6px 20px rgba(0,0,0,0.25)",
                    }}
                  >
                    {tier.cta}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ADD-ONS — div NOT section, inline style white */}
      <div>
        <div className=" pb-20">
          <div className="max-w-7xl mx-auto px-5 sm:px-6">
            <div className="text-center mb-12">
              <p className="inline-block px-3 py-1 rounded-full text-[10px] tracking-[0.25em] uppercase text-fourth border border-fourth/20 bg-fourth/5 mt-8 mb-4">
                Optional Add-ons
              </p>
              <h3 className="text-[26px] sm:text-[32px] font-semibold">
                Extend Your Growth{" "}
                <span className="text-fourth">Capabilities</span>
              </h3>
              <p className="text-[14px] mt-3 max-w-xl mx-auto text-third">
                Add specialized visibility and performance tools without
                changing your core plan.
              </p>
            </div>

            <div className="flex flex-col gap-4">
              {addons.map((addon, i) => (
                <div
                  key={i}
                  className="group relative flex flex-col sm:flex-row sm:items-center gap-6 p-6 sm:p-7 rounded-2xl bg-transparent border border-primary/15 hover:border-primary/20 transition-all duration-300 hover:bg-primary/5"
                >
                  {/* ICON */}
                  <div className="relative shrink-0">
                    <div className="w-14 h-14 rounded-2xl bg-fourth/10 border border-fourth/20 flex items-center justify-center text-2xl text-fourth group-hover:scale-110 group-hover:bg-fourth/20 transition-all duration-300">
                      {addon.icon}
                    </div>
                  </div>

                  {/* CONTENT */}
                  <div className="flex-1">
                    <h4 className="text-[17px] font-bold text-white group-hover:text-fourth transition-colors duration-300">
                      {addon.title}
                    </h4>
                    <p className="text-[14px] text-white/60 mt-1 leading-relaxed max-w-2xl">
                      {addon.desc}
                    </p>
                  </div>

                  {/* BADGE */}
                  <div className="shrink-0 mt-3 sm:mt-0">
                    <span className="text-[10px] font-bold tracking-widest uppercase text-fourth border border-fourth/20 bg-fourth/10 px-4 py-1.5 rounded-full whitespace-nowrap">
                      Optional
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
