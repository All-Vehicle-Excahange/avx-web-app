"use client";

import React, { useState } from "react";

export default function InspectionMatters() {
  const [activeStep, setActiveStep] = useState(0);

  const protocols = [
    {
      label: "Mechanical",
      detail: "Engine, Transmission & Drivetrain Performance",
    },
    { label: "Structural", detail: "Chassis Integrity & Frame Alignment" },
    { label: "Electrical", detail: "ECU Diagnostics & Sensor Array Health" },
    { label: "Cosmetic", detail: "Surface Analytics & Interior Ergonomics" },
    {
      label: "Documentation",
      detail: "Historical Validation & Paperwork Audit",
    },
  ];

  return (
    <section className="relative py-10  overflow-hidden border-t border-white/5">
      <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[40px_40px]" />

      <div className="relative mx-auto w-full">
        <div className="flex flex-col lg:flex-row gap-10 md:gap-16 items-start">
          {/* LEFT */}
          <div className="w-full lg:w-1/2 pt-25">
            {/* sticky only on large screens */}
            <div className="lg:sticky lg:top-24">
              <div className="inline-block px-3 py-1 text-xs md:text-sm tracking-[0.35em] uppercase text-third font-semibold mb-5 md:mb-6">
                ANALYSIS MODULE 01
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold text-primary mb-6 md:mb-8 leading-[0.95]">
                Clarity Before <br />
                <span className="text-third/40 font-light">Commitment</span>
              </h2>

              <div className="space-y-5 md:space-y-6 text-third/70 text-sm md:text-lg leading-relaxed max-w-md">
                <p>
                  Pre-owned vehicles vary in condition. Our system provides a{" "}
                  <span className="text-primary">structured evaluation</span>{" "}
                  before you proceed.
                </p>

                <p className="text-[13px] md:text-[15px] font-light leading-relaxed border-l border-fourth/40 pl-4 md:pl-6">
                  AVX inspection focuses on identifying hidden risks through a
                  data-driven protocol. Transparency is the core of our
                  ecosystem.
                </p>
              </div>

              {/* Terminal */}
              <div className="mt-8 md:mt-12 p-3 md:p-4  border border-white/10 rounded-md font-mono text-[12px] md:text-[14px] text-fourth/60">
                <span className="text-white">SYSTEM_NOTE:</span> Inspection adds
                transparency — not guarantees.
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="w-full lg:w-1/2">
            <div className="relative border border-white/10 bg-white/2 rounded-2xl p-5 sm:p-6 md:p-10 lg:p-12 overflow-hidden">
              {/* HUD line */}
              <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-fourth/40 to-transparent animate-[pan_3s_linear_infinite]" />

              <h3 className="text-[10px] md:text-xs font-bold text-third uppercase tracking-[0.2em] mb-8 md:mb-12 flex items-center gap-2">
                Inspection Focus Points
              </h3>

              <div className="space-y-3 md:space-y-4 relative">
                {protocols.map((item, idx) => (
                  <div
                    key={idx}
                    onMouseEnter={() => setActiveStep(idx)} // desktop
                    onClick={() => setActiveStep(idx)} // 📱 mobile tap
                    className={`group relative flex items-start md:items-center justify-between p-4 md:p-5 rounded-xl border transition-all duration-500 cursor-pointer
                      ${
                        activeStep === idx
                          ? "bg-fourth/10 border-fourth/40 md:translate-x-4"
                          : "bg-black/20 border-white/5 opacity-80 md:opacity-50 md:hover:opacity-100"
                      }`}
                  >
                    <div className="flex items-start md:items-center gap-4 md:gap-6">
                      <span
                        className={`font-mono text-xs md:text-sm ${
                          activeStep === idx ? "text-fourth" : "text-third/30"
                        }`}
                      >
                        0{idx + 1}
                      </span>

                      <div>
                        <h4 className="text-primary font-bold uppercase text-xs md:text-sm tracking-widest">
                          {item.label}
                        </h4>

                        {/* mobile always visible, desktop hover logic */}
                        <p
                          className={`text-[12px] md:text-[14px] mt-1 transition-all
                          ${
                            activeStep === idx
                              ? "text-third"
                              : "text-third/60 md:text-transparent"
                          }`}
                        >
                          {item.detail}
                        </p>
                      </div>
                    </div>

                    {activeStep === idx && (
                      <div className="h-2 w-2 bg-fourth rounded-full shadow-[0_0_15px_#007bff] mt-2 md:mt-0" />
                    )}
                  </div>
                ))}

                {/* connector */}
                <div className="absolute -left-3 md:-left-4 top-0 h-full w-px bg-white/10" />
              </div>

              {/* corner */}
              <div className="absolute bottom-3 right-3 md:bottom-4 md:right-4 text-third/10 font-mono text-[40px] md:text-[60px] select-none uppercase">
                AVX
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes pan {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </section>
  );
}
