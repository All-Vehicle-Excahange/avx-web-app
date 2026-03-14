"use client";

import { useState } from "react";
import {
  Star,
  MessageSquare,
  Zap,
  ClipboardCheck,
  Package,
  TrendingUp,
  ArrowUpRight,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";
import Button from "@/components/ui/button";

const metrics = [
  {
    icon: Package,
    label: "Inventory",
    value: "Active Listings",
    desc: "Full stock visibility per consultant — what;s available, what;s moving, and how fast.",
    stat: "124",
    unit: "vehicles",
    img: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800&q=80",
    imgAlt: "Row of cars in showroom",
  },
  {
    icon: Star,
    label: "Ratings",
    value: "Seller Score",
    desc: "Aggregate trust score calculated from verified buyer interactions across all transactions.",
    stat: "4.9",
    unit: "/ 5.0",
    img: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800&q=80",
    imgAlt: "Car interior luxury",
  },
  {
    icon: MessageSquare,
    label: "Reviews",
    value: "Buyer Feedback",
    desc: "Real written reviews from real transactions — unfiltered and timestamped for authenticity.",
    stat: "340+",
    unit: "reviews",
    img: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&q=80",
    imgAlt: "Sports car",
  },
  {
    icon: Zap,
    label: "Response",
    value: "Response Speed",
    desc: "Track how fast a consultant replies to enquiries — a direct signal of professionalism.",
    stat: "< 2h",
    unit: "avg reply",
    img: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80",
    imgAlt: "Car on road",
  },
  {
    icon: ClipboardCheck,
    label: "Inspection",
    value: "Inspection Ratio",
    desc: "Percentage of listings with completed multi-point inspections — the trust layer that matters.",
    stat: "98%",
    unit: "verified",
    img: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800&q=80",
    imgAlt: "Car being inspected",
  },
];

export default function ConsultantPerformanceVisibility() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const active = metrics[activeIndex];

  const handleSelect = (i) => {
    if (i === activeIndex || animating) return;
    setAnimating(true);
    setActiveIndex(i);
    setTimeout(() => setAnimating(false), 400);
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-center py-16 px-4 sm:px-8 overflow-hidden">

      {/* Ambient glows */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "20%", right: "-5%", width: "500px", height: "500px",
          background: "radial-gradient(circle, rgba(0,123,255,0.07) 0%, transparent 65%)",
          filter: "blur(60px)",
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: "10%", left: "-5%", width: "400px", height: "400px",
          background: "radial-gradient(circle, rgba(255,255,255,0.025) 0%, transparent 65%)",
          filter: "blur(60px)",
        }}
      />

      <div className="max-w-7xl mx-auto w-full relative">

        {/* ── HEADER ── */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <p
                className="text-sm tracking-[0.4em] uppercase text-third font-semibold "
              >
                Consultant Performance
              </p>
            </div>
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.05] text-primary font-[Montserrat]"
            >
              Evaluate Who<br />
              <span className="text-fourth/80">
                You;re Dealing
              With.
              </span>
            </h2>
          </div>

          <div className="flex flex-col items-start lg:items-end gap-3">
            <p
              className="max-w-xs text-[16px] leading-relaxed lg:text-right"
              style={{ color: "rgba(190,190,190,0.6)", fontFamily: "var(--font-secondary)" }}
            >
              Every storefront displays measurable signals so buyers can assess seller credibility before the first message.
            </p>
            <div
              className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] font-bold px-3 py-1.5 rounded-full text-third bg-third/15"
            >
              <ShieldCheck size={11} />
              Identity Verified Consultants
            </div>
          </div>
        </div>

        {/* ── MAIN GRID ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-4 lg:gap-5">

          {/* ── LEFT: Image hero card ── */}
          <div className="relative rounded-2xl overflow-hidden" style={{ minHeight: "480px" }}>

            {/* Background image */}
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `url(${active.img})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                opacity: animating ? 0 : 1,
                transition: "opacity 0.35s ease",
              }}
            />

            {/* Layered overlays */}
            <div
              className="absolute inset-0"
              style={{
                background: "linear-gradient(160deg, rgba(10,10,10,0.2) 0%, rgba(10,10,10,0.5) 40%, rgba(10,10,10,0.92) 100%)",
              }}
            />
           

         
          

            {/* Content */}
            <div className="relative h-full flex flex-col justify-between p-8 sm:p-10" style={{ minHeight: "480px" }}>

              {/* Live badge */}
              <div
                className="self-start flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] uppercase tracking-[0.3em] font-bold backdrop-blur-sm"
                style={{
                  fontFamily: "var(--font-secondary)",
                  color: "var(--color-primary)",
                  backgroundColor: "rgba(0,0,0,0.45)",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: "var(--color-fourth)", animation: "pulse 2s infinite" }}
                />
                Live Storefront Data
              </div>

              {/* Bottom info */}
              <div style={{ opacity: animating ? 0 : 1, transition: "opacity 0.3s ease 0.05s" }}>
                <p
                  className="text-[10px] uppercase tracking-[0.4em] font-semibold mb-2 text-primary  backdrop-blur-xs w-fit border rounded-md px-1 py-1"
                >
                  {active.value}
                </p>
                <h3
                  className="text-4xl sm:text-5xl font-black uppercase leading-none mb-3"
                  style={{ fontFamily: "var(--font-primary)", color: "var(--color-primary)" }}
                >
                  {active.label}
                </h3>
                <p
                  className="text-sm leading-relaxed max-w-sm mb-7"
                  style={{ fontFamily: "var(--font-secondary)", color: "rgba(190,190,190,0.75)" }}
                >
                  {active.desc}
                </p>

                {/* Stat + CTA row */}
                <div className="flex items-center gap-3 flex-wrap">
                  <div
                    className="flex items-baseline gap-2 px-5 py-3 rounded-xl backdrop-blur-sm border-thirdx"
                
                  >
                    <span
                      className="text-4xl font-black leading-none"
                      style={{ fontFamily: "var(--font-primary)", color: "var(--color-primary)" }}
                    >
                      {active.stat}
                    </span>
                    <span
                      className="text-xs pb-1"
                      style={{ fontFamily: "var(--font-secondary)", color: "rgba(190,190,190,0.5)" }}
                    >
                      {active.unit}
                    </span>
                  </div>

                  <Button variant = "ghost" className="bg-primary/95 ">
                     View Storefronts
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* ── RIGHT: Metric selector list with thumbnails ── */}
          <div className="flex flex-col gap-2.5">

            <div className="flex items-center gap-3 px-1 mb-2">
              <TrendingUp size={15} style={{ color: "var(--color-third)" }} />
              <span
                className="text-[13px] uppercase tracking-[0.4em] font-semibold"
                style={{ color: "rgba(190,190,190,0.35)", fontFamily: "var(--font-secondary)" }}
              >
                5 Storefront Signals
              </span>
            </div>

            {metrics.map((item, i) => {
              const Icon = item.icon;
              const isActive = activeIndex === i;
              return (
                <button
                  key={i}
                  onClick={() => handleSelect(i)}
                  className="w-full text-left rounded-xl overflow-hidden"
                  style={{
                    border: isActive ? "1px solid rgba(255,254,255,0.3)" : "1px solid rgba(255,255,255,0.05)",
                    backgroundColor: isActive ? "rgba(255,254,255,0.05)" : "rgba(255,255,255,0.02)",
                    transition: "all 0.25s ease",
                  }}
                >
                  <div className="flex items-stretch overflow-hidden">

                    {/* Thumbnail */}
                    <div className="shrink-0 relative overflow-hidden" style={{ width: "84px", height: "76px" }}>
                      <div
                        style={{
                          position: "absolute", inset: 0,
                          backgroundImage: `url(${item.img})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                          filter: isActive ? "brightness(0.85)" : "grayscale(70%) brightness(0.4)",
                          transition: "filter 0.3s ease",
                        }}
                      />
                      {/* Right fade */}
                      <div
                        style={{
                          position: "absolute", inset: 0,
                          background: isActive
                            ? "linear-gradient(90deg, transparent 50%, rgba(0,0,0,0.5))"
                            : "linear-gradient(90deg, transparent 40%, rgba(10,10,10,0.85))",
                          transition: "background 0.3s ease",
                        }}
                      />
                      {/* Active left bar */}
                      <div
                        className="absolute left-0 top-0 bottom-0 w-0.5"
                        style={{
                          backgroundColor: isActive ? "var(--color-third)" : "transparent",
                          transition: "background-color 0.25s ease",
                        }}
                      />
                    </div>

                    {/* Content */}
                    <div className="flex items-center gap-3 flex-1 min-w-0 px-4 py-3">

                      <span
                        className="text-[10px] font-black tabular-nums shrink-0"
                        style={{
                          fontFamily: "var(--font-primary)",
                          color: isActive ? "var(--color-primary)" : "rgba(190,190,190,0.2)",
                          transition: "color 0.25s ease",
                        }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>

                      <div
                        className="flex items-center justify-center w-8 h-8 rounded-lg shrink-0 bg-[rgba(255,255,255,0.04)]"
                        style={{
                          color: isActive ? "var(--color-primary)" : "rgba(190,190,190,0.3)",
                          transition: "all 0.25s ease",
                        }}
                      >
                        <Icon size={14} />
                      </div>

                      <div className="flex-1 min-w-0">
                        <p
                          className="text-[13px] font-semibold truncate"
                          style={{
                            fontFamily: "var(--font-secondary)",
                            color: isActive ? "var(--color-primary)" : "rgba(255,254,247,0.45)",
                            transition: "color 0.25s ease",
                          }}
                        >
                          {item.label}
                        </p>
                        <p
                          className="text-[10px] truncate mt-0.5"
                          style={{ fontFamily: "var(--font-secondary)", color: "rgba(190,190,190,0.3)" }}
                        >
                          {item.value}
                        </p>
                      </div>

                      <div className="text-right shrink-0">
                        <span
                          className="text-sm font-black"
                          style={{
                            fontFamily: "var(--font-primary)",
                            color: isActive ? "var(--color-primary)" : "rgba(255,254,247,0.18)",
                            transition: "color 0.25s ease",
                          }}
                        >
                          {item.stat}
                        </span>
                        <span
                          className="block text-[9px] uppercase tracking-wider mt-0.5"
                          style={{ fontFamily: "var(--font-secondary)", color: "rgba(190,190,190,0.25)" }}
                        >
                          {item.unit}
                        </span>
                      </div>

                      <ChevronRight
                        size={13}
                        style={{
                          color: isActive ? "var(--color-primary)" : "transparent",
                          transition: "color 0.25s ease",
                          flexShrink: 0,
                        }}
                      />
                    </div>
                  </div>
                </button>
              );
            })}

            {/* Step dots */}
            <div className="flex items-center gap-2 px-1 pt-2">
              {metrics.map((_, i) => (
                <button
                  key={i}
                  onClick={() => handleSelect(i)}
                  className="rounded-full"
                  style={{
                    height: "3px",
                    width: activeIndex === i ? "28px" : "10px",
                    backgroundColor: activeIndex === i ? "var(--color-fourth)" : "rgba(255,255,255,0.08)",
                    transition: "width 0.35s ease, background-color 0.35s ease",
                  }}
                />
              ))}
              <span
                className="ml-1 text-[9px] uppercase tracking-widest"
                style={{ fontFamily: "var(--font-secondary)", color: "rgba(190,190,190,0.2)" }}
              >
                {activeIndex + 1} / {metrics.length}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}