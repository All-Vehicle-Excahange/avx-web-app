"use client";
import Image from "next/image";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Button from "@/components/ui/button";
import HeroGraph from "./HeroGraph";

function CountUp({ end, suffix = "" }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1200;
    const step = end / (duration / 16);

    const counter = setInterval(() => {
      start += step;
      if (start >= end) {
        setCount(end);
        clearInterval(counter);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(counter);
  }, [end]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
}

export default function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden py-12 sm:py-16 lg:py-24">
      {/* animated orb */}
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-40 -right-40 w-72 h-72 sm:w-96 sm:h-96 md:w-[500px] md:h-[500px] bg-fourth/10 blur-[140px] rounded-full"
      />

      <div className="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12 w-full">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-center">
          {/* ================= LEFT ================= */}

          <div className="max-w-xl space-y-6 sm:space-y-8">
            <span className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full border border-[#60a5fa]/30 text-xs sm:text-sm tracking-[0.2em] sm:tracking-[0.4em] uppercase text-third font-semibold bg-[#044596]/10 backdrop-blur-md">
              For Buyers & Consultants
            </span>

            <div className="space-y-2 sm:space-y-3">
              <h1 className="text-3xl sm:text-5xl lg:text-[56px] font-bold leading-[1.1] text-[#f8fafc] tracking-tight">
                How Reecomm
              </h1>
              <h1 className="text-3xl sm:text-5xl lg:text-[56px] font-bold leading-[1.1] tracking-tight text-fourth">
                Works
              </h1>
            </div>

            <p className="text-sm sm:text-[15px] text-third leading-relaxed max-w-lg">
              We connect verified vehicle consultants with serious buyers
              through a structured, inspection-backed process that removes
              guesswork and builds confidence.
            </p>

            <div className="w-20 sm:w-24 h-0.5 bg-fourth rounded-full" />

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2 sm:pt-3">
              <Button href="/search" variant="ghost">
                Find a Vehicle
              </Button>

              <Button href="/become-consultant" variant="outlineSecondary">
                Become a Consultant
              </Button>
            </div>
          </div>

          {/* ================= RIGHT ================= */}

          <div className="flex flex-col gap-6 lg:block lg:relative lg:h-[480px] w-full">
            {/* MAIN CARD */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="w-full lg:absolute lg:left-[18%] lg:top-0 lg:w-[76%] lg:h-[68%] rounded-2xl border-0 lg:border lg:border-[#1f2937] bg-transparent lg:bg-[#0f1117]/95 lg:backdrop-blur-xl lg:shadow-[0_40px_100px_rgba(0,0,0,0.8)] p-0 lg:p-6 z-20 overflow-hidden"
            >
              <HeroGraph />

              {/* Mobile Image Inside First Card (Decreased Height & No BG) */}
              <div className="lg:hidden my-3 relative w-full h-24 sm:h-32 rounded-xl overflow-hidden border border-[#1f2937]/50">
                <Image
                  src="/car-hero-21.jpg"
                  alt="Reecomm Vehicle Marketplace Showcase"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Animated metrics */}
              <div className="grid grid-cols-3 text-center gap-2 sm:gap-4 mt-4">
                <div>
                  <p className="text-base sm:text-lg font-bold text-fourth">
                    <CountUp end={100} suffix="+" />
                  </p>
                  <p className="text-[10px] sm:text-[11px] text-third uppercase tracking-wider">
                    Consultants
                  </p>
                </div>
                <div>
                  <p className="text-base sm:text-lg font-bold text-fourth">
                    <CountUp end={500} suffix="+" />
                  </p>
                  <p className="text-[10px] sm:text-[11px] text-third uppercase tracking-wider">
                    Listings
                  </p>
                </div>
                <div>
                  <p className="text-base sm:text-lg font-bold text-fourth">
                    <CountUp end={98} suffix="%" />
                  </p>
                  <p className="text-[10px] sm:text-[11px] text-third uppercase tracking-wider">
                    Visibility
                  </p>
                </div>
              </div>
            </motion.div>

            {/* DESKTOP FLOATING IMAGE */}
            <div className="hidden lg:block lg:h-[32%] lg:w-[88%] lg:absolute lg:left-0 lg:top-[52%] rounded-xl overflow-hidden border border-[#1f2937] shadow-[0_30px_80px_rgba(0,0,0,0.8)] z-30 relative">
              <Image
                src="/car-hero-21.jpg"
                alt="Reecomm Vehicle Marketplace Showcase"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 to-transparent" />
            </div>

            {/* PERFORMANCE CARD */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="w-full lg:w-[62%] lg:absolute lg:right-4 lg:-bottom-2.5 rounded-xl border-0 lg:border lg:border-[#1f2937] bg-transparent lg:bg-[#0b0e13]/95 lg:backdrop-blur-xl p-0 lg:p-5 shadow-none lg:shadow-xl z-30"
            >
              <p className="text-xs text-third mb-3 tracking-wide uppercase font-semibold">
                Performance Snapshot
              </p>

              <div className="grid grid-cols-3 gap-2 sm:gap-3">
                {[
                  { v: "500+", l: "Verified Consultants" },
                  { v: "98%", l: "Buyer Satisfaction" },
                  { v: "10K+", l: "Vehicles Listed" },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="bg-transparent lg:bg-[#0f1117] rounded-lg p-1 sm:p-3 border-0 lg:border lg:border-[#1f2937] text-center hover:border-[#60a5fa]/40 transition"
                  >
                    <p className="text-sm sm:text-lg font-bold text-fourth">
                      {item.v}
                    </p>
                    <p className="text-[9px] sm:text-[10px] text-third uppercase tracking-wide leading-tight">
                      {item.l}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
