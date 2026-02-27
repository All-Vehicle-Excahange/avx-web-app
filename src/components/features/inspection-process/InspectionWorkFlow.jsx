"use client";

import React, { useEffect, useState } from "react";
import {
  ClipboardSignature,
  CreditCard,
  UserCheck,
  Search,
  UploadCloud,
  Eye,
} from "lucide-react";

export default function InspectionWorkFlow() {
  const [isMobile, setIsMobile] = useState(false);
  const [radius, setRadius] = useState(340);

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;

      if (w < 768) {
        setIsMobile(true);
        setRadius(0);
      } else if (w < 1280) {
        setIsMobile(false);
        setRadius(260); // tighter orbit tablet
      } else {
        setIsMobile(false);
        setRadius(340); // full desktop
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const steps = [
    {
      title: "Request Submitted",
      desc: "Buyer or consultant selects inspection type.",
      icon: <ClipboardSignature className="w-5 h-5" />,
      color: "bg-blue-500",
    },
    {
      title: "Payment Confirmed",
      desc: "Inspection fee processed.",
      icon: <CreditCard className="w-5 h-5" />,
      color: "bg-fourth",
    },
    {
      title: "Inspector Assigned",
      desc: "City-based inspector scheduled.",
      icon: <UserCheck className="w-5 h-5" />,
      color: "bg-orange-500",
    },
    {
      title: "Physical Evaluation",
      desc: "Vehicle inspected using AVX checklist.",
      icon: <Search className="w-5 h-5" />,
      color: "bg-slate-500",
    },
    {
      title: "Report Uploaded",
      desc: "Media, checklist, summary uploaded.",
      icon: <UploadCloud className="w-5 h-5" />,
      color: "bg-slate-400",
    },
    {
      title: "Report Published",
      desc: "Visible on vehicle listing.",
      icon: <Eye className="w-5 h-5" />,
      color: "bg-red-500",
    },
  ];

  const totalSteps = steps.length;

  const renderArrows = () => {
    if (isMobile) return null; // hide on mobile

    return steps.map((_, idx) => {
      const nextIdx = (idx + 1) % totalSteps;
      const angle1 = (-90 + idx * 60) * (Math.PI / 180);
      const angle2 = (-90 + nextIdx * 60) * (Math.PI / 180);
      const midAngle = (-90 + (idx + 0.5) * 60) * (Math.PI / 180);

      const startX = Math.cos(angle1 + 0.15) * radius;
      const startY = Math.sin(angle1 + 0.15) * radius;
      const endX = Math.cos(angle2 - 0.15) * radius;
      const endY = Math.sin(angle2 - 0.15) * radius;
      const cpX = Math.cos(midAngle) * (radius * 1.05);
      const cpY = Math.sin(midAngle) * (radius * 1.05);

      return (
        <g key={idx} className="text-fourth/40">
          <path
            d={`M ${startX} ${startY} Q ${cpX} ${cpY} ${endX} ${endY}`}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeDasharray="6 6"
            strokeLinecap="round"
          />
        </g>
      );
    });
  };

  return (
    <section className="relative py-10  overflow-hidden">
      {/* rings */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 md:w-150 h-125 md:h-150 border border-fourth/20 rounded-full animate-[spin_60s_linear_infinite]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-175 md:w-212.5 h-175 md:h-212.5 border border-fourth/5 rounded-full animate-[spin_90s_linear_infinite_reverse]" />
      </div>

      <div className="relative z-20 mx-auto  w-full">
        {/* header */}
        <div className="text-center mb-16 md:mb-24">
          <p className="text-xs md:text-sm tracking-[0.4em] uppercase text-third font-semibold mb-4">
            System Operation
          </p>
          <h2 className="text-3xl sm:text-5xl md:text-7xl font-semibold text-primary">
            Inspection <span className="text-third/40">Workflow</span>
          </h2>
        </div>

        {/* ===== MOBILE STACK ===== */}
        {isMobile && (
          <div className="space-y-8">
            {steps.map((step, idx) => (
              <div
                key={idx}
                className="w-full rounded-3xl bg-[#151515] border border-white/5 p-6 flex gap-5"
              >
                <div
                  className={`w-14 h-14 rounded-2xl ${step.color} flex items-center justify-center text-primary shrink-0`}
                >
                  {step.icon}
                </div>

                <div>
                  <p className="text-[11px] text-fourth font-mono mb-1">
                    STEP {String(idx + 1).padStart(2, "0")}
                  </p>
                  <h4 className="text-base font-bold text-primary mb-1">
                    {step.title}
                  </h4>
                  <p className="text-sm text-third/60">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ===== DESKTOP CIRCLE ===== */}
        {!isMobile && (
          <div className="relative flex justify-center items-center min-h-162.5 md:min-h-187.5">
            {/* core */}
            <div className="absolute z-20 w-44 h-44 md:w-48 md:h-48 rounded-full border-2 border-fourth/30 flex items-center justify-center">
              <div className="text-center">
                <span className="text-fourth font-mono text-xs block mb-1">
                  CORE
                </span>
                <span className="text-primary font-bold text-2xl md:text-3xl">
                  AVX
                </span>
              </div>
            </div>

            {/* arrows */}
            <svg
              className="absolute inset-0 pointer-events-none overflow-visible z-0"
              style={{ width: "100%", height: "100%" }}
            >
              <g style={{ transform: "translate(50%, 50%)" }}>
                {renderArrows()}
              </g>
            </svg>

            {/* steps */}
            <div className="relative w-full max-w-5xl h-full">
              {steps.map((step, idx) => {
                const angle = (-90 + idx * 60) * (Math.PI / 180);

                return (
                  <div
                    key={idx}
                    className="absolute transition-all duration-500 hover:z-30 group"
                    style={{
                      left: `calc(50% + ${Math.cos(angle) * radius}px - 110px)`,
                      top: `calc(50% + ${Math.sin(angle) * radius}px - 110px)`,
                    }}
                  >
                    {/* ⚠️ YOUR LARGE CARD PRESERVED */}
                    <div className="relative w-55 h-55 rounded-full bg-[#151515] border border-white/5 backdrop-blur-xl flex flex-col items-center justify-center text-center p-6 transition-all duration-500 group-hover:border-fourth/50 group-hover:shadow-[0_0_30px_rgba(0,123,255,0.12)] group-hover:-translate-y-2">
                      <div className="absolute -top-2 left-1/2 -translate-x-1/2 bg-secondary px-3 py-1 rounded-full border border-white/10 text-[10px] font-mono text-fourth">
                        STEP {String(idx + 1).padStart(2, "0")}
                      </div>

                      <div
                        className={`w-14 h-14 mb-4 rounded-2xl ${step.color} flex items-center justify-center text-primary shadow-lg transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6`}
                      >
                        {step.icon}
                      </div>

                      <h4 className="text-sm font-bold text-primary mb-2 uppercase tracking-tight leading-tight">
                        {step.title}
                      </h4>

                      <p className="text-[11px] text-third/60 leading-relaxed max-w-37.5">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <div className="mt-14 md:mt-20 text-center">
          <p className="text-third/30 font-mono text-xs md:text-[20px] tracking-widest uppercase">
            Automated Real-Time Tracking Protocol Enabled
          </p>
        </div>
      </div>
    </section>
  );
}
