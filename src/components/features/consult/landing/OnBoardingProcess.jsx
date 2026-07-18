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
    desc: "Create your consultant account with your business name and contact details.",
    icon: <FiUserPlus />,
    color: "#3b82f6",
    time: "~2 min",
    detail: "Name · Email · Business type · Phone",
  },
  {
    number: "02",
    title: "KYC",
    fullTitle: "Submit KYC & Business Details",
    desc: "Submit your identity and business verification documents for review.",
    icon: <FiFileText />,
    color: "#f43f5e",
    time: "~5 min",
    detail: "Government ID · License · Address proof",
  },
  {
    number: "03",
    title: "Subscription",
    fullTitle: "Choose Subscription Tier",
    desc: "Choose the subscription tier that matches your current scale and needs.",
    caption: "Select the plan that fits your business scale — from starter to premium.",
    icon: <FiCreditCard />,
    color: "#f59e0b",
    time: "~1 min",
    detail: "Starter · Professional · Premium",
  },
  {
    number: "04",
    title: "Verification",
    fullTitle: "Admin Verification",
    desc: "Reecomm reviews your documents and confirms your consultant status.",
    icon: <FiShield />,
    color: "#a78bfa",
    time: "24–48 hrs",
    detail: "Manual review · QA check",
  },
  {
    number: "05",
    title: "Go Live",
    fullTitle: "Activate Storefront",
    desc: "Your storefront and listings go live on the marketplace — start receiving inquiries.",
    icon: <FiZap />,
    color: "#10b981",
    time: "Instant",
    detail: "Storefront live · Dashboard access",
  },
];

export default function OnboardingProcess() {
  const [activeStep, setActiveStep] = useState(2);
  const active = steps[activeStep];

  return (
    <section className="relative py-24 md:py-28 overflow-hidden">
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* HEADER */}
        <div className="text-center max-w-2xl mx-auto mb-14 md:mb-16">
          <span className="text-sm tracking-[0.4em] uppercase text-third font-semibold mb-4">
            How to Get Started
          </span>

          <h2 className="text-[30px] sm:text-[40px] md:text-[48px] font-bold leading-tight text-primary mb-3 mt-5">
            Onboarding in{" "}
            <span className="text-fourth">
              5 Simple Steps
            </span>
          </h2>

          <p className="text-third text-[14px] sm:text-[15px] leading-relaxed">
            This is the part that used to take weeks — building a website, setting up listings, briefing a designer. On Reecomm, setting up your storefront takes minutes. Structured onboarding ensures marketplace quality, with every consultant verified before going live.
          </p>

          <p className="text-third text-[13px] mt-4 font-medium">
            Setup takes minutes. Verification typically completes within 24–48 hours.
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
                      borderColor: isDone
                        ? "#10b981"
                        : isActive
                          ? step.color
                          : "rgba(255, 255, 255, 0.15)",
                      background: isDone
                        ? "#10b981"
                        : isActive
                          ? `linear-gradient(${step.color}15, ${step.color}15), linear-gradient(#1a1919, #1a1919)`
                          : "#1a1919",
                      color: isDone
                        ? "#ffffff"
                        : isActive
                          ? step.color
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
          <div className="hidden lg:flex flex-col items-start relative pl-6">
            {/* vertical line */}
            <div className="absolute top-6 bottom-6 left-12 w-px bg-fourth/50" />

            <div className="flex flex-col gap-6 z-10 w-full">
              {steps.map((step, i) => {
                const isActive = activeStep === i;
                const isDone = i < activeStep;

                return (
                  <button
                    key={i}
                    onClick={() => setActiveStep(i)}
                    className="flex items-center gap-4 group transition-all hover:cursor-pointer w-full"
                  >
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center border transition-all duration-300"
                      style={{
                        background: isDone
                          ? "#10b981"
                          : isActive
                            ? `linear-gradient(${step.color}15, ${step.color}15), linear-gradient(#1a1919, #1a1919)`
                            : "#1a1919",
                        borderColor: isDone
                          ? "#10b981"
                          : isActive
                            ? step.color
                            : "rgba(255, 255, 255, 0.15)",
                        color: isDone
                          ? "#ffffff"
                          : isActive
                            ? step.color
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
          <div className="rounded-2xl border border-primary/30 bg-transparent overflow-hidden">
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
                  {active.caption || active.desc}
                </p>

                <div className="flex flex-wrap gap-2">
                  {active.detail.split(" · ").map((d) => (
                    <span
                      key={d}
                      className="text-[11px] px-3 py-1 rounded-md border border-[#1f2937] bg-transparent text-third"
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
                    Next Step
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
                    Onboarding
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
