"use client";

import { motion } from "framer-motion";
import { useRef, useState } from "react";
import {
  FiUserPlus,
  FiFileText,
  FiCreditCard,
  FiShield,
  FiZap,
  FiCheck,
} from "react-icons/fi";

const steps = [
  {
    number: "01",
    title: "Register",
    fullTitle: "Register as Consultant",
    desc: "Create your AVX consultant account with basic business details and contact information.",
    icon: <FiUserPlus />,
    color: "#3b82f6",
    time: "~2 min",
    detail: "Name · Email · Business type · Phone",
  },
  {
    number: "02",
    title: "KYC",
    fullTitle: "Submit KYC & Business Details",
    desc: "Verify your identity and business credentials to unlock full marketplace access.",
    icon: <FiFileText />,
    color: "#f43f5e"  ,
    time: "~5 min",
    detail: "Government ID · License · Address proof",
  },
  {
    number: "03",
    title: "Subscription",
    fullTitle: "Choose Subscription Tier",
    desc: "Select the plan that fits your business scale — from starter to premium.",
    icon: <FiCreditCard />,
    color: "#f59e0b",
    time: "~1 min",
    detail: "Starter · Professional · Enterprise",
  },
  {
    number: "04",
    title: "Verification",
    fullTitle: "Admin Verification",
    desc: "Our team reviews your submission and verifies your marketplace eligibility.",
    icon: <FiShield />,
    color: "#a78bfa",
    time: "24–48 hrs",
    detail: "Manual review · QA check",
  },
  {
    number: "05",
    title: "Go Live",
    fullTitle: "Activate Storefront",
    desc: "Your verified consultant profile and storefront go live across the AVX marketplace.",
    icon: <FiZap />,
    color:"#10b981",
    time: "Instant",
    detail: "Storefront live · Dashboard access",
  },
];

export default function OnboardingProcess() {
  const [activeStep, setActiveStep] = useState(2);
  const active = steps[activeStep];

  return (
    <section className="relative py-24 md:py-28 overflow-hidden">
      <div className="relative z-10 max-w-6xl mx-auto px-5 md:px-6">
        {/* HEADER */}
        <div className="text-center max-w-2xl mx-auto mb-14 md:mb-16">
          <span className="text-sm tracking-[0.4em] uppercase text-third font-semibold mb-4">
            How to Get Started
          </span>

          <h2 className="text-[30px] sm:text-[40px] md:text-[48px] font-bold leading-tight text-primary mb-3 mt-5">
            Onboarding in{" "}
            <span className="bg-linear-to-r from-fourth via-[#60a5fa] to-fourth bg-clip-text text-transparent">
              5 Simple Steps
            </span>
          </h2>

          <p className="text-third text-[14px] sm:text-[15px] leading-relaxed">
            Structured onboarding ensures marketplace quality — every consultant
            is verified before going live.
          </p>
        </div>

        {/* ===== MOBILE / TABLET TIMELINE ===== */}
        <div className="mb-10 md:mb-12 lg:hidden">
          <div className="flex justify-between relative">
            <div className="absolute top-6 left-6 right-6 h-px bg-fourth/70" />

            {steps.map((step, i) => {
              const isActive = activeStep === i;
              const isDone = i < activeStep;

              return (
                <button
                  key={i}
                  onClick={() => setActiveStep(i)}
                  className="flex flex-col items-center gap-1.5 z-10"
                >
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-lg border transition-all"
                    style={{
                      borderColor: isActive
                        ? step.color
                        : isDone
                          ? "#10b981"
                          : "#1f2937",
                      background: isActive ? `${step.color}20` : "#0f1117",
                      color: isActive
                        ? step.color
                        : isDone
                          ? "#10b981"
                          : "#4b5563",
                    }}
                  >
                    {isDone ? <FiCheck /> : step.icon}
                  </div>

                  <p className="text-[10px] font-bold">{step.number}</p>
                  <p className="text-[11px] text-primary/80">{step.title}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* ===== DESKTOP LAYOUT ===== */}
        <div className="lg:grid lg:grid-cols-[180px_1fr] lg:gap-10">
          {/* LEFT VERTICAL TIMELINE */}
          <div className="hidden lg:flex flex-col items-center relative">
            {/* vertical line */}
            <div className="absolute top-6 bottom-6 left-11.5 w-px bg-fourth/50" />

            <div className="flex flex-col gap-6 z-10">
              {steps.map((step, i) => {
                const isActive = activeStep === i;
                const isDone = i < activeStep;

                return (
                  <button
                    key={i}
                    onClick={() => setActiveStep(i)}
                    className="flex items-center gap-4 group transition-all hover:cursor-pointer"
                  >
                    {(isActive || isDone) && (
                      <div
                        className="absolute left-2.5 w-8 h-8 rounded-full blur-lg opacity-30"
                        style={{ background: isDone ? "#10b981" : step.color }}
                      />
                    )}

                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center border transition-all duration-300"
                      style={{
                        background: isDone
                          ? "#10b981" // solid green when done
                          : "#0f1117", // always dark otherwise
                        borderColor: isDone
                          ? "#10b981"
                          : isActive
                            ? step.color
                            : "#1f2937",
                        color: isDone
                          ? "#ffffff" // white icon when done
                          : isActive
                            ? step.color // colored icon when active
                            : "#4b5563",
                      }}
                    >
                      {isDone ? <FiCheck /> : step.icon}
                    </div>

                    {/* TEXT */}
                    <div className="text-left">
                      <p className="text-[10px] tracking-wider text-third font-semibold">
                        {step.number}
                      </p>

                      <p
                        className={`text-[13px] font-medium transition ${
                          isActive
                            ? "text-primary"
                            : "text-primary/70 group-hover:text-primary"
                        }`}
                      >
                        {step.title}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* RIGHT MAIN CARD */}
          <div className="rounded-2xl border border-[#1f2937] bg-[#0f1117]/90 backdrop-blur-xl shadow-[0_10px_40px_-10px_rgba(230,230,230,0.15)] overflow-hidden">
            <div className="grid lg:grid-cols-[1fr_260px]">
              {/* LEFT */}
              <div className="p-6 md:p-8 space-y-5">
                <div className="flex items-center gap-3">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center"
                    style={{
                      background: `${active.color}15`,
                      color: active.color,
                    }}
                  >
                    {active.icon}
                  </div>

                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-third">
                      Step {active.number} of 05
                    </p>
                    <h3 className="text-lg md:text-xl font-semibold text-primary">
                      {active.fullTitle}
                    </h3>
                  </div>
                </div>

                <p className="text-third text-[14px] leading-relaxed max-w-xl">
                  {active.desc}
                </p>

                <div className="flex flex-wrap gap-2">
                  {active.detail.split(" · ").map((d) => (
                    <span
                      key={d}
                      className="text-[11px] px-3 py-1 rounded-md border border-[#1f2937] bg-[#0b0e13] text-third"
                    >
                      {d}
                    </span>
                  ))}
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    onClick={() => setActiveStep((i) => Math.max(0, i - 1))}
                    disabled={activeStep === 0}
                    className="px-4 py-2 rounded-md border border-[#1f2937] text-xs text-third hover:cursor-pointer hover:text-primary transition disabled:opacity-30"
                  >
                    Previous
                  </button>

                  <button
                    onClick={() =>
                      setActiveStep((i) => Math.min(steps.length - 1, i + 1))
                    }
                    disabled={activeStep === steps.length - 1}
                    className="px-4 py-2 rounded-md text-xs font-semibold disabled:opacity-30 hover:cursor-pointer"
                    style={{
                      background: `${active.color}20`,
                      color: active.color,
                    }}
                  >
                    Next Step →
                  </button>
                </div>
              </div>

              {/* RIGHT SIDEBAR */}
              <div className="p-6 border-t lg:border-t-0 lg:border-l border-[#1f2937] space-y-5">
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-third mb-1">
                    Est. time
                  </p>
                  <p className="text-xl font-bold text-primary">
                    {active.time}
                  </p>
                </div>

                <div>
                  <p className="text-[10px] uppercase tracking-widest text-third mb-2">
                    Completion
                  </p>
                  <div className="h-1.5 bg-[#1f2937] rounded-full overflow-hidden">
                    <motion.div
                      className="h-full"
                      style={{
                        background: "linear-gradient(90deg,#3b82f6,#10b981)",
                      }}
                      initial={{ width: 0 }}
                      animate={{ width: `${(activeStep + 1) * 20}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
