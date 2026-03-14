"use client";

import { useState } from "react";
import {
  Star,
  MessageSquare,
  Zap,
  ClipboardCheck,
  Package,
  TrendingUp,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";
import Button from "@/components/ui/button";

const metrics = [
  {
    icon: Package,
    label: "Inventory",
    value: "Active Listings",
    desc: "Full stock visibility per consultant — what's available, what's moving, and how fast.",
    stat: "124",
    unit: "vehicles",
    img: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800&q=80",
  },
  {
    icon: Star,
    label: "Ratings",
    value: "Seller Score",
    desc: "Aggregate trust score calculated from verified buyer interactions across all transactions.",
    stat: "4.9",
    unit: "/ 5.0",
    img: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800&q=80",
  },
  {
    icon: MessageSquare,
    label: "Reviews",
    value: "Buyer Feedback",
    desc: "Real written reviews from real transactions — unfiltered and timestamped for authenticity.",
    stat: "340+",
    unit: "reviews",
    img: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&q=80",
  },
  {
    icon: Zap,
    label: "Response",
    value: "Response Speed",
    desc: "Track how fast a consultant replies to enquiries — a direct signal of professionalism.",
    stat: "< 2h",
    unit: "avg reply",
    img: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80",
  },
  {
    icon: ClipboardCheck,
    label: "Inspection",
    value: "Inspection Ratio",
    desc: "Percentage of listings with completed multi-point inspections — the trust layer that matters.",
    stat: "98%",
    unit: "verified",
    img: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800&q=80",
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
    <section className="relative min-h-screen flex flex-col justify-center py-16 px-4 sm:px-8 overflow-hidden ">
      
      <div className="max-w-7xl mx-auto w-full relative">
        {/* ── HEADER ── */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <p className="text-sm tracking-[0.4em] uppercase text-third font-semibold">
                Consultant Performance
              </p>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.05] text-primary font-primary">
              Evaluate Who<br />
              <span className="text-fourth/80">You;re Dealing With.</span>
            </h2>
          </div>

          <div className="flex flex-col items-start lg:items-end gap-3">
            <p className="max-w-xs text-[16px] leading-relaxed lg:text-right text-third/60 font-secondary">
              Every storefront displays measurable signals so buyers can assess seller credibility before the first message.
            </p>
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] font-bold px-3 py-1.5 rounded-full text-third bg-third/15">
              <ShieldCheck size={11} />
              Identity Verified Consultants
            </div>
          </div>
        </div>

        {/* ── MAIN GRID ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-4 lg:gap-5">
          
          {/* ── LEFT: Image hero card ── */}
          <div className="relative rounded-2xl overflow-hidden min-h-[480px]">
            {/* Background image */}
            <div
              className={`absolute inset-0 transition-opacity duration-350 bg-cover bg-center ${animating ? "opacity-0" : "opacity-100"}`}
              style={{ backgroundImage: `url(${active.img})` }}
            />

            {/* Layered overlays */}
            <div className="absolute inset-0 bg-linear-to-br from-black/20 via-black/50 to-black/90" />

            {/* Content */}
            <div className="relative h-full flex flex-col justify-between p-8 sm:p-10 min-h-[480px]">
              {/* Live badge */}
              <div className="self-start flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] uppercase tracking-[0.3em] font-bold backdrop-blur-sm font-secondary text-primary bg-black/45 border border-white/10">
                <span className="w-1.5 h-1.5 rounded-full bg-fourth animate-pulse" />
                Live Storefront Data
              </div>

              {/* Bottom info */}
              <div className={`transition-opacity duration-300 delay-75 ${animating ? "opacity-0" : "opacity-100"}`}>
                <p className="text-[10px] uppercase tracking-[0.4em] font-semibold mb-2 text-primary backdrop-blur-xs w-fit border border-white/50 rounded-md px-1.5 py-1.5">
                  {active.value}
                </p>
                <h3 className="text-4xl sm:text-5xl font-black uppercase leading-none mb-3 font-primary text-primary">
                  {active.label}
                </h3>
                <p className="text-sm leading-relaxed max-w-sm mb-7 font-secondary text-third/75">
                  {active.desc}
                </p>

                <div className="flex items-center gap-3 flex-wrap">
                  <div className="flex items-baseline gap-2 px-5 py-3 rounded-xl backdrop-blur-xs border border-white/40">
                    <span className="text-2xl font-black leading-none font-primary text-primary">
                      {active.stat}
                    </span>
                    <span className="text-xs pb-1 font-secondary text-primary/90">
                      {active.unit}
                    </span>
                  </div>
                  <Button variant="ghost" className="bg-primary/95 text-secondary">
                    View Storefronts
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* ── RIGHT: Metric selector list ── */}
          <div className="flex flex-col gap-2.5">
            <div className="flex items-center gap-3 px-1 mb-2">
              <TrendingUp size={15} className="text-third" />
              <span className="text-[13px] uppercase tracking-[0.4em] font-semibold text-third/35 font-secondary">
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
                  className={`w-full text-left rounded-xl overflow-hidden transition-all duration-250 border ${
                    isActive ? "border-white/30 bg-white/5" : "border-white/5 bg-white/2"
                  }`}
                >
                  <div className="flex items-stretch overflow-hidden">
                    {/* Thumbnail */}
                    <div className="shrink-0 relative w-[84px] h-[76px] overflow-hidden">
                      <div
                        className={`absolute inset-0 bg-cover bg-center transition-all duration-300 ${
                          isActive ? "brightness-90" : "grayscale-70 brightness-[0.4]"
                        }`}
                        style={{ backgroundImage: `url(${item.img})` }}
                      />
                      <div className={`absolute inset-0 transition-all duration-300 ${
                        isActive 
                          ? "bg-linear-to-r from-transparent via-black/25 to-black/50" 
                          : "bg-linear-to-r from-transparent via-black/40 to-black/85"
                      }`} />
                      <div className={`absolute left-0 top-0 bottom-0 w-0.5 transition-colors duration-250 ${isActive ? "bg-third" : "bg-transparent"}`} />
                    </div>

                    {/* Content */}
                    <div className="flex items-center gap-3 flex-1 min-w-0 px-4 py-3">
                      <span className={`text-[10px] font-black tabular-nums shrink-0 font-primary transition-colors duration-250 ${isActive ? "text-primary" : "text-third/20"}`}>
                        {String(i + 1).padStart(2, "0")}
                      </span>

                      <div className={`flex items-center justify-center w-8 h-8 rounded-lg shrink-0 bg-white/5 transition-all duration-250 ${isActive ? "text-primary" : "text-third/30"}`}>
                        <Icon size={14} />
                      </div>

                      <div className="flex-1 min-w-0">
                        <p className={`text-[13px] font-semibold truncate font-secondary transition-colors duration-250 ${isActive ? "text-primary" : "text-white/45"}`}>
                          {item.label}
                        </p>
                        <p className="text-[10px] truncate mt-0.5 font-secondary text-third/30">
                          {item.value}
                        </p>
                      </div>

                      <div className="text-right shrink-0">
                        <span className={`text-sm font-black font-primary transition-colors duration-250 ${isActive ? "text-primary" : "text-white/20"}`}>
                          {item.stat}
                        </span>
                        <span className="block text-[9px] uppercase tracking-wider mt-0.5 font-secondary text-third/25">
                          {item.unit}
                        </span>
                      </div>

                      <ChevronRight size={13} className={`shrink-0 transition-colors duration-250 ${isActive ? "text-primary" : "text-transparent"}`} />
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
                  className={`h-[3px] rounded-full transition-all duration-350 ${activeIndex === i ? "w-7 bg-fourth" : "w-2.5 bg-white/10"}`}
                />
              ))}
              <span className="ml-1 text-[9px] uppercase tracking-widest font-secondary text-third/20">
                {activeIndex + 1} / {metrics.length}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}