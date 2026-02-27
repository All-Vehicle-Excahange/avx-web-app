"use client";

import React, { useState } from "react";
import {
  RefreshCw,
  Video,
  FileSearch,
  ChevronRight,
  MonitorPlay,
  ClipboardCheck,
  Zap,
} from "lucide-react";

export default function ReInspectionOptions() {
  const [activeTab, setActiveTab] = useState(0);

  const options = [
    {
      title: "Fresh Inspection",
      desc: "A full system reset. We perform the entire 200+ point diagnostic from scratch to capture every new detail since the last report.",
      icon: <RefreshCw className="w-5 h-5" />,
      visual: "SYSTEM_RECALIBRATION",
      feature: "Full Multi-Point Scan",
    },
    {
      title: "Video Walkthrough",
      desc: "Get a personalized 4K video tour. Our inspector focuses on the specific engine sounds, interior textures, or underbody areas you want to see.",
      icon: <Video className="w-5 h-5" />,
      visual: "VISUAL_STREAM_INIT",
      feature: "Personalized Media",
    },
    {
      title: "Report Re-verification",
      desc: "Fast-track audit. An expert inspector visits the vehicle specifically to verify the data points in the existing report.",
      icon: <FileSearch className="w-5 h-5" />,
      visual: "DATA_INTEGRITY_CHECK",
      feature: "Manual Audit",
    },
  ];

  return (
    <section className="relative py-10   overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-fourth/20 opacity-30" />

      <div className="relative w-full mx-auto F">
        <div className="flex flex-col lg:flex-row border border-white/20 rounded-4xl  backdrop-blur-md overflow-hidden">
          {/* LEFT PANEL */}
          <div className="lg:w-1/2 p-6 md:p-10 xl:p-14 lg:border-r border-white/10">
            <div className="flex items-center gap-3 mb-8 md:mb-10">
              <Zap className="w-4 h-4 text-fourth" />
              <span className="text-xs md:text-sm tracking-[0.35em] uppercase text-third font-semibold">
                Buyer Protocols
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl xl:text-5xl font-semibold text-primary leading-tight mb-8 md:mb-10">
              Existing Report <br />
              <span className="text-fourth">Upgrades</span>
            </h2>

            <div className="space-y-3">
              {options.map((opt, i) => (
                <button
                  key={i}
                  onMouseEnter={() => setActiveTab(i)} // desktop hover
                  onClick={() => setActiveTab(i)} // 📱 mobile tap
                  className={`w-full text-left p-4 md:p-5 rounded-xl transition-all duration-300 flex items-center justify-between group
                    ${
                      activeTab === i
                        ? "bg-fourth/10 border border-fourth/30"
                        : "hover:bg-white/5 border border-transparent"
                    }
                  `}
                >
                  <div className="flex items-center gap-4 md:gap-5">
                    <div
                      className={`transition-colors duration-300 ${
                        activeTab === i ? "text-fourth" : "text-third"
                      }`}
                    >
                      {opt.icon}
                    </div>

                    <span
                      className={`text-xs md:text-sm font-semibold tracking-[0.12em] uppercase transition-colors ${
                        activeTab === i ? "text-primary" : "text-third"
                      }`}
                    >
                      {opt.title}
                    </span>
                  </div>

                  <ChevronRight
                    className={`w-4 h-4 transition-all duration-300 ${
                      activeTab === i
                        ? "text-fourth translate-x-0 opacity-100"
                        : "opacity-0 -translate-x-3"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT PANEL */}
          <div className="lg:w-1/2 p-6 md:p-10 xl:p-14 bg-linear-to-br from-transparent to-fourth/5 flex flex-col justify-center relative">
            <div className="relative z-10 transition-all duration-500">
              <div className="mb-5 md:mb-6 inline-flex items-center gap-3 px-3 md:px-4 py-1.5 rounded-full bg-fourth/10 border border-fourth/20">
                <div className="w-1.5 h-1.5 rounded-full bg-fourth animate-pulse" />
                <span className="text-[10px] md:text-sm tracking-[0.35em] uppercase text-third font-semibold">
                  {options[activeTab].visual}
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl md:text-3xl xl:text-4xl font-semibold text-primary mb-4 md:mb-5">
                {options[activeTab].feature}
              </h3>

              <p className="text-sm md:text-base text-third/80 leading-relaxed mb-6 md:mb-8 max-w-xl">
                {options[activeTab].desc}
              </p>

              {/* ✅ responsive stats */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 md:p-6 rounded-xl bg-white/3 border border-white/10">
                  <MonitorPlay className="w-4 h-4 text-fourth mb-2" />
                  <p className="text-[11px] md:text-[12px] text-third uppercase tracking-widest font-semibold">
                    Priority Status
                  </p>
                  <p className="text-primary text-sm md:text-[15px] mt-1">
                    24H Turnaround
                  </p>
                </div>

                <div className="p-4 md:p-6 rounded-xl bg-white/3 border border-white/10">
                  <ClipboardCheck className="w-4 h-4 text-fourth mb-2" />
                  <p className="text-[11px] md:text-[12px] text-third uppercase tracking-widest font-semibold">
                    Verification
                  </p>
                  <p className="text-primary text-sm md:text-[15px] mt-1">
                    On-Site Expert
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* bottom note */}
        <div className="mt-8 md:mt-10 text-center px-2">
          <p className="text-[10px] md:text-[11px] text-third/40 uppercase tracking-[0.22em]">
            Re-inspection facilitates risk mitigation closer to transaction
            finalized date
          </p>
        </div>
      </div>
    </section>
  );
}
