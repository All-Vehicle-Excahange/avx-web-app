"use client";

import React, { useState } from "react";
import { ShieldCheck, ClipboardCheck, Award, Store } from "lucide-react";

const HowAvxWorks = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      title: "Verified consultant identity",
      shortTitle: "Identity",
      icon: <ShieldCheck size={35} />,
      desc: "Every consultant is onboarded with a structured profile — not just an account. Business identity, credibility signals, and accountability are baked in from day one.",
      tag: "01",
    },
    {
      title: "Inspection-backed listings",
      shortTitle: "Inspections",
      icon: <ClipboardCheck size={35} />,
      desc: "Buyers can request independent inspections on any vehicle. We don't mandate it — we make it possible, because we believe that choice belongs to the buyer.",
      tag: "02",
    },
    {
      title: "Performance over promises",
      shortTitle: "Performance",
      icon: <Award size={35} />,
      desc: "Visibility on Reecomm is earned through structured participation and verifiable performance — not paid placement or boosted rankings.",
      tag: "03",
    },
    {
      title: "Professional storefronts",
      shortTitle: "Storefronts",
      icon: <Store size={35} />,
      desc: "Consultants get a public business presence — with inventory, reviews, analytics, and engagement tools — so they operate like a modern business, not an informal seller.",
      tag: "04",
    },
  ];

  return (
    <section className="pb-0 text-primary">
      <div className="max-w-7xl mx-auto px-6">
        {/* HEADER */}
        <div className="relative mb-10 text-center">
          <div className="relative z-10">
            <div className="inline-flex items-center gap-3 mb-4">
              <span className="text-sm tracking-[0.4em] uppercase text-third font-semibold">
                How We Work
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold font-[Montserrat] mb-6 from-primary   ">
              Built differently,
              <span className="text-fourth/80">on purpose</span>
            </h2>

            <div className="max-w-2xl mx-auto">
              <p className="text-third text-base md:text-lg leading-relaxed opacity-80">
                Reecomm is not a dealer. We don&apos;t own inventory. We don&apos;t
                process payments or take a cut from deals. We build the
                infrastructure that makes trust between buyers and consultants
                possible — and then we stay out of the way.
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
                ${activeStep === index ? "flex-3 " : "flex-1  "}`}
            >
              {/* Collapsed Title */}
              <div
                className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
                  activeStep === index ? "opacity-0" : "opacity-100"
                }`}
              >
                <span className="rotate-90 md:-rotate-90 whitespace-nowrap text-xs uppercase tracking-[0.35em] font-semibold text-third">
                  {step.shortTitle}
                </span>
              </div>

              {/* Active Content */}
              <div
                className={`p-7 md:p-8 h-full flex flex-col justify-between transition-opacity duration-500 
                ${activeStep === index ? "opacity-100" : "opacity-0"}`}
              >
                <div>
                  <div className="text-primary mb-5 opacity-80">
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
                    className="h-full bg-primary transition-all duration-700 ease-out"
                    style={{ width: activeStep === index ? "100%" : "0%" }}
                  ></div>
                </div>
              </div>

              <span
                className={`absolute bottom-19 right-6 text-6xl font-bold text-fourth/30 pointer-events-none transition-opacity duration-300 
                ${activeStep === index ? "opacity-100" : "opacity-0"}`}
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
                activeStep === i ? "w-14 bg-primary" : "w-5 bg-primary/10"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowAvxWorks;
