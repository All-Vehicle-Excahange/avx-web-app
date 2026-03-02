"use client";

import { motion } from "framer-motion";
import { TrendingUp, Star, Target, Layers, ArrowRight } from "lucide-react";
const tools = [
  {
    icon: <TrendingUp />,
    title: "Sponsored Vehicle Placements",
    desc: "Increase exposure with priority listing positions that attract high-intent buyers.",
    color: "#3b82f6",
    stat: "3× more views",
  },
  {
    icon: <Star />,
    title: "Featured Consultant Slots",
    desc: "Highlight your profile across key discovery areas to build brand authority.",
    color: "#f59e0b",
    stat: "Top 5% reach",
  },
  {
    icon: <Target />,
    title: "PPC Campaigns",
    desc: "Drive targeted traffic with performance-focused advertising campaigns.",
    color: "#10b981",
    stat: "Avg 4.2% CTR",
  },
  {
    icon: <Layers />,
    title: "Category-Level Prominence",
    desc: "Stand out within your vehicle category with elevated visibility signals.",
    color: "#a78bfa",
    stat: "+62% discovery",
  },
];

export default function GrowthTools() {
  return (
    <section className="py-10 relative overflow-hidden">
      <div className="relative z-10 max-w-[1440px] mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* ── LEFT ── */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55 }}
            viewport={{ once: true }}
            className="max-w-xl lg:sticky lg:top-28"
          >
            <span className="text-sm tracking-[0.4em] uppercase text-third font-semibold mb-4">
              Growth Tools
            </span>

            <h2 className="text-[34px] sm:text-[42px] md:text-[50px] font-bold leading-[1.08] text-primary">
              Boost Your{" "}
              <span className="bg-linear-to-r from-fourth via-[#60a5fa] to-fourth bg-clip-text text-transparent">
                Visibility
              </span>
            </h2>

            <p className="mt-5 text-third text-[15px] leading-relaxed">
              AVX provides structured growth tools designed to increase
              exposure, improve discovery, and drive measurable performance
              across the marketplace.
            </p>

            {/* divider */}
            <div className="mt-8 mb-8 h-px bg-linear-to-r from-fourth/30 via-[#1f2937] to-transparent" />

            {/* quote block */}
            <div className="border-l-2 border-fourth pl-5">
              <p className="text-primary text-[15px] font-medium leading-relaxed">
                Visibility is measurable and performance-based — giving
                consultants a clear path to scalable growth.
              </p>
            </div>

            {/* stats row */}
            <div className="mt-10 grid grid-cols-2 gap-4">
              {[
                { val: "12K+", label: "Active listings boosted" },
                { val: "89%", label: "Consultants saw growth" },
              ].map(({ val, label }) => (
                <div
                  key={label}
                  className="bg-[#0f1117]/80 border border-[#1f2937] rounded-xl p-4"
                >
                  <p className="text-[28px] font-black text-fourth leading-none mb-1">
                    {val}
                  </p>
                  <p className="text-[10px] text-third uppercase tracking-wide">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── RIGHT – tool cards ── */}
          <div className="flex flex-col gap-5">
            {tools.map((tool, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.09 }}
                viewport={{ once: true }}
                className="group relative flex items-start gap-4 p-5 rounded-2xl border border-[#1f2937] bg-[#0f1117]/80 backdrop-blur hover:border-[#1e3a5f] hover:bg-[#0d1b2e] transition-all duration-200 overflow-hidden cursor-default"
              >
                {/* left color accent */}
                <div
                  className="absolute left-0 top-4 bottom-4 w-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  style={{ background: tool.color }}
                />

                {/* icon */}
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center text-lg shrink-0 transition-all duration-200 group-hover:scale-105"
                  style={{
                    background: `${tool.color}12`,
                    border: `1px solid ${tool.color}28`,
                    color: tool.color,
                  }}
                >
                  {tool.icon}
                </div>

                {/* text */}
                <div className="flex-1 min-w-0 pt-0.5">
                  <div className="flex items-center justify-between gap-3 mb-1">
                    <h3 className="text-[14px] font-semibold text-primary group-hover:text-white transition-colors duration-200">
                      {tool.title}
                    </h3>
                    <span
                      className="text-[9px] font-bold px-2.5 py-1 rounded-full shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                      style={{
                        color: tool.color,
                        background: `${tool.color}12`,
                        border: `1px solid ${tool.color}25`,
                      }}
                    >
                      {tool.stat}
                    </span>
                  </div>
                  <p className="text-[12px] text-third leading-relaxed">
                    {tool.desc}
                  </p>
                </div>

                {/* arrow */}
                <ArrowRight
                  className="shrink-0 mt-1 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-200 text-sm"
                  style={{ color: tool.color }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
