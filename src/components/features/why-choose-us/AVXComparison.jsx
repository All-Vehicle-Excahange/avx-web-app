"use client";

import { useState } from "react";
import {
  ShieldOff,
  ShieldCheck,
  FileQuestion,
  FileCheck2,
  EyeOff,
  Eye,
  TrendingDown,
  TrendingUp,
  Shuffle,
  Layers,
  X,
  Check,
} from "lucide-react";

const rows = [
  {
    label: "Seller Identity",
    generic: { text: "Anonymous sellers", icon: <ShieldOff size={17} /> },
    avx: { text: "Verified consultants", icon: <ShieldCheck size={17} /> },
  },
  {
    label: "Listing Structure",
    generic: {
      text: "Unstructured descriptions",
      icon: <FileQuestion size={17} />,
    },
    avx: { text: "Standardized listings", icon: <FileCheck2 size={17} /> },
  },
  {
    label: "Inspection Layer",
    generic: {
      text: "Limited inspection visibility",
      icon: <EyeOff size={17} />,
    },
    avx: { text: "200-point inspection layer", icon: <Eye size={17} /> },
  },
  {
    label: "Ranking Logic",
    generic: {
      text: "No ranking transparency",
      icon: <TrendingDown size={17} />,
    },
    avx: { text: "Performance-based ranking", icon: <TrendingUp size={17} /> },
  },
  {
    label: "Visibility Model",
    generic: { text: "Random visibility", icon: <Shuffle size={17} /> },
    avx: { text: "Tier + quality driven exposure", icon: <Layers size={17} /> },
  },
];

const stats = [
  { stat: "200pt", label: "Inspection Standard" },
  { stat: "100%", label: "Seller Verified" },
  { stat: "0x", label: "Random Placement" },
  { stat: "Tier+", label: "Quality-Led Exposure" },
];

export default function AVXComparison() {
  const [hovered, setHovered] = useState(null);

  return (
    <section className="relative py-10  overflow-hidden text-primary font-secondary">
      {/* Decorative grid background */}

      {/* Glow blob */}

      <div className="w-full mx-auto relative">
        {/* Header */}
        <div className="mb-16">
          <p className="text-sm tracking-[0.4em] uppercase text-third font-semibold mb-3">
            Platform Comparison
          </p>
          <h2 className="font-primary text-3xl sm:text-4xl lg:text-5xl  font-extrabold uppercase leading-none tracking-tight mb-4">
            Why{" "}
            <span
              className="text-fourth pb-0.5"
              style={{ borderBottom: "3px solid rgba(0,123,255,0.35)" }}
            >
              AVX
            </span>{" "}
            is Different
          </h2>
          <p className="text-third opacity-70 max-w-120 leading-relaxed text-sm">
            Every feature gap below is a trust problem solved. See exactly where
            generic platforms fall short.
          </p>
        </div>

        {/* Comparison Table */}
        <div className="border border-white/8 rounded-[20px] overflow-hidden">
          {/* Column Headers */}
          <div className="hidden md:grid md:grid-cols-3 border-b border-white/8">
            {/* Feature label col */}
            <div className="px-7 py-5 text-[12px] tracking-[0.3em] uppercase text-third/50 font-semibold">
              Feature
            </div>

            {/* Generic col header */}
            <div className="px-7 py-5 bg-white/2 border-l border-r border-white/6">
              <div className="inline-flex items-center gap-2 text-[12px] tracking-[0.25em] uppercase text-third font-bold">
                <X size={13} className="text-third/40" />
                Generic Platforms
              </div>
            </div>

            {/* AVX col header */}
            <div className="px-7 py-5 bg-fourth/5">
              <div className="inline-flex items-center gap-2 text-[12px] tracking-[0.25em] uppercase text-fourth font-bold">
                <Check size={13} />
                AVX Platform
              </div>
            </div>
          </div>

          {/* Rows */}
          {rows.map((row, i) => {
            const isHovered = hovered === i;
            const isLast = i === rows.length - 1;
            return (
              <div
                key={i}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                className={`grid grid-cols-1 md:grid-cols-3 transition-colors duration-200 cursor-default ${
                  !isLast ? "border-b border-white/5" : ""
                } ${isHovered ? "bg-white/2" : "bg-transparent"}`}
              >
                {/* Label cell */}
                <div className="px-6 md:px-7 py-4 md:py-5.5 flex items-center">
                  <span
                    className={`text-[11px] uppercase tracking-[0.2em] font-semibold transition-colors duration-200 ${
                      isHovered ? "text-primary" : "text-third/55"
                    }`}
                  >
                    {row.label}
                  </span>
                </div>

                {/* Generic cell */}
                <div
                  className={`px-6 md:px-7 py-4 md:py-5.5 
  md:border-l md:border-r border-white/5 
  flex items-center gap-2.5 
  ${isHovered ? "bg-white/1.5" : "bg-white/1"}
`}
                >
                  <span className="text-third/30 shrink-0">
                    {row.generic.icon}
                  </span>
                  <span
                    className={`text-[14.5px] text-third/55 leading-snug transition-all duration-200 ${
                      isHovered ? "line-through decoration-third/25" : ""
                    }`}
                  >
                    {row.generic.text}
                  </span>
                </div>

                {/* AVX cell */}
                <div
                  className={`px-6 md:px-7 py-4 md:py-5.5 
  flex items-center gap-2.5 relative 
  ${isHovered ? "bg-fourth/10" : "bg-fourth/4"}
`}
                >
                  {/* Active left border indicator */}
                  {isHovered && (
                    <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-fourth rounded-r-sm" />
                  )}
                  <span
                    className={`shrink-0 transition-colors duration-200 ${
                      isHovered ? "text-fourth" : "text-fourth/60"
                    }`}
                  >
                    {row.avx.icon}
                  </span>
                  <span
                    className={`text-[14.5px] leading-snug transition-all duration-200 ${
                      isHovered
                        ? "text-primary font-semibold"
                        : "text-primary/75 font-normal"
                    }`}
                  >
                    {row.avx.text}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom stats strip */}
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 border border-white/8 rounded-2xl overflow-hidden bg-white/6">
          {stats.map((item, i) => (
            <div
              key={i}
              className={`px-5 py-6 bg-black/30 text-center ${
                i < stats.length - 1 ? "border-r border-white/5" : ""
              }`}
            >
              <div className="font-primary text-2xl md:text-3xl font-extrabold text-fourth tracking-tight leading-none mb-1.5">
                {item.stat}
              </div>
              <div className="text-[9px] uppercase tracking-[0.25em] text-third/55 font-semibold">
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
