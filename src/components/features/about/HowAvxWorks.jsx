"use client";

import React, { useState } from "react";
import {
  Search,
  ShieldCheck,
  MessageSquare,
  ClipboardCheck,
  CheckCircle2,
} from "lucide-react";

const HowAvxWorks = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      title: "Discovery",
      icon: <Search size={35} />,
      desc: "Smart filters to find your perfect match based on budget and style.",
      tag: "Step 01",
    },
    {
      title: "Condition",
      icon: <ClipboardCheck size={35} />,
      desc: "Deep dive into transparent specs and high-resolution visual reports.",
      tag: "Step 02",
    },
    {
      title: "Contact",
      icon: <MessageSquare size={35} />,
      desc: "Instant direct line to consultants for test drives and negotiations.",
      tag: "Step 03",
    },
    {
      title: "Verification",
      icon: <ShieldCheck size={35} />,
      desc: "Optional multi-point inspections for absolute peace of mind.",
      tag: "Step 04",
    },
    {
      title: "Ownership",
      icon: <CheckCircle2 size={35} />,
      desc: "Finalize documents and payment directly with the seller.",
      tag: "Step 05",
    },
  ];

  return (
      <section className="pb-0 text-primary">
        <div className="max-w-7xl mx-auto px-6">
          {/* HEADER */}
          <div className="relative mb-10 text-center">
            {/* Decorative Background Text */}
            <div className="absolute inset-0 -top-8 flex justify-center items-center opacity-[0.03] pointer-events-none select-none">
              <h2 className="text-9xl font-bold tracking-tighter">
                PROCESS
              </h2>
            </div>

            <div className="relative z-10">
              <div className="inline-flex items-center gap-3 mb-4">
                <span className="h-px w-8 bg-fourth/50"></span>
                <span className="text-sm tracking-[0.4em] uppercase text-third font-semibold">
                The Journey
              </span>
                <span className="h-px w-8 bg-fourth/50"></span>
              </div>

              <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 bg-linear-to-b from-primary to-primary/60 bg-clip-text text-transparent">
                How AVX Works
              </h2>

              <div className="max-w-2xl mx-auto">
                <p className="text-third text-base md:text-lg leading-relaxed opacity-80">
                  A premium, direct-to-owner experience designed for the
                  <span className="text-primary font-medium">
                  {" "}
                    modern automotive market
                </span>
                  . Simple, transparent, and built for performance.
                </p>
              </div>
            </div>
          </div>

          {/* INTERACTIVE SLIDE DECK */}
          <div className="flex flex-col md:flex-row gap-3 min-h-[350px] md:h-[350px]">
            {steps.map((step, index) => (
                <div
                    key={index}
                    onMouseEnter={() => setActiveStep(index)}
                    className={`relative overflow-hidden transition-all duration-500 ease-in-out cursor-pointer rounded-2xl border border-primary/10 
                ${
                        activeStep === index
                            ? "flex-3 bg-[#111]"
                            : "flex-1 bg-[#0a0a0a] hover:bg-[#0f0f0f]"
                    }`}
                >
                  {/* Collapsed Title */}
                  <div
                      className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
                          activeStep === index ? "opacity-0" : "opacity-100"
                      }`}
                  >
                <span className="rotate-90 md:-rotate-90 whitespace-nowrap text-xs uppercase tracking-[0.35em] font-semibold text-third">
                  {step.title}
                </span>
                  </div>

                  {/* Active Content */}
                  <div
                      className={`p-7 md:p-8 h-full flex flex-col justify-between transition-opacity duration-500 
                ${
                          activeStep === index ? "opacity-100" : "opacity-0"
                      }`}
                  >
                    <div>
                      <div className="text-fourth mb-5 opacity-80">
                        {step.icon}
                      </div>

                      <span className="text-sm text-fourth/80 tracking-[0.25em] uppercase font-semibold">
                    {step.tag}
                  </span>

                      <h3 className="text-2xl font-semibold mt-2 mb-3">
                        {step.title}
                      </h3>

                      <p className="text-third text-base leading-relaxed max-w-xs">
                        {step.desc}
                      </p>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full h-0.5 bg-primary/5 mt-6 overflow-hidden">
                      <div
                          className="h-full bg-fourth transition-all duration-700 ease-out"
                          style={{ width: activeStep === index ? "100%" : "0%" }}
                      ></div>
                    </div>
                  </div>

                  <span
                      className={`absolute bottom-19 right-6 text-6xl font-bold text-fourth/30 pointer-events-none transition-opacity duration-300 
                ${
                          activeStep === index ? "opacity-100" : "opacity-0"
                      }`}
                  >
                0{index + 1}
              </span>
                </div>
            ))}
          </div>

          {/* Bottom Indicators */}
          <div className="mt-12 flex justify-center gap-3">
            {steps.map((_, i) => (
                <div
                    key={i}
                    className={`h-0.5 rounded-full transition-all duration-300 ${
                        activeStep === i
                            ? "w-14 bg-fourth"
                            : "w-5 bg-primary/10"
                    }`}
                />
            ))}
          </div>
        </div>
      </section>
  );
};

export default HowAvxWorks;
