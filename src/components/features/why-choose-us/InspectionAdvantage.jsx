"use client";

import { useState } from "react";
import {
  FileText,
  Video,
  RefreshCw,
  ShieldCheck,
  ChevronRight,
  CheckCircle2,
  Clock,
  Star,
} from "lucide-react";

const steps = [
  {
    step: "01",
    icon: ShieldCheck,
    title: "Report Included",
    tag: "Always",
    tagBlue: false,
    color: "rgba(255,254,247,0.15)",
    short: "200-point inspection report with every listing.",
    detail:
      "Every AVX listing comes with a structured 200-point inspection report as standard — covering engine health, bodywork, electricals, and documentation. No extra steps needed.",
    proof: [
      { icon: CheckCircle2, label: "200 checkpoints" },
      { icon: Star, label: "Condition rated" },
      { icon: Clock, label: "Date-stamped" },
    ],
  },
  {
    step: "02",
    icon: Video,
    title: "Video Walkthrough",
    tag: "On Request",
    tagBlue: true,
    short: "Ask for a narrated video tour from your consultant.",
    detail:
      "Not enough from photos? Request a personalized video walkthrough from the consultant — a narrated, detailed tour built around your exact questions and concerns.",
    proof: [
      { icon: CheckCircle2, label: "Buyer-requested" },
      { icon: Star, label: "Consultant-narrated" },
      { icon: Clock, label: "Delivered fast" },
    ],
  },
  {
    step: "03",
    icon: RefreshCw,
    title: "Fresh Inspection",
    tag: "Before You Decide",
    tagBlue: true,
    short: "Request a brand-new inspection at any point.",
    detail:
      "Need more certainty before committing? Request a fresh re-inspection at any point in the process. Your confidence is fully customizable — always on your terms.",
    proof: [
      { icon: CheckCircle2, label: "Re-verified" },
      { icon: Star, label: "Full 200-point redo" },
      { icon: Clock, label: "Pre-decision access" },
    ],
  },
];

export default function InspectionAdvantage() {
  const [active, setActive] = useState(0);
  const current = steps[active];
  const CurrentIcon = current.icon;

  return (
    <section className="relative py-10  overflow-hidden font-secondary text-primary">

      <div className="w-full px-2 mx-auto relative">

        {/* ── HEADER ── */}
        <div className="mb-16 max-w-xl">
          <div className="flex items-center gap-3 mb-5">
            <span className="text-sm tracking-[0.4em] uppercase text-third font-semibold">
              Inspection Advantage
            </span>
          </div>
          <h2 className="font-primary text-3xl sm:text-4xl lg:text-5xl font-bold uppercase leading-[0.9] tracking-[0.5px] mb-4">
            Optional
            <br />
            <span className="text-fourth">Re-Assurance.</span>
          </h2>
          <p className="text-third/70 text-m leading-relaxed max-w-sm">
            Confidence should be customizable — choose exactly how much verification you need, before any decision.
          </p>
        </div>

        {/* ═══════════════════════════════════════
            JOURNEY STEPPER — horizontal timeline
        ═══════════════════════════════════════ */}

        {/* Step selector row */}
        <div className="relative flex flex-col lg:flex-row items-start gap-10 lg:gap-0 mb-10">

          {steps.map((s, i) => {
            const Icon = s.icon;
            const isAct = active === i;
            const isDone = i < active;

            return (
              <div key={i} className="flex items-start flex-col lg:flex-row flex-1">

                {/* Step button */}
                <button
                  onClick={() => setActive(i)}
                  className="flex flex-col items-start gap-3 group w-full pr-6 cursor-pointer"
                >
                  {/* Node + connector line */}
                  <div className="flex items-center w-full gap-0">
                    {/* Circle node */}
                    <div
                      className={`relative flex items-center justify-center w-10 h-10 rounded-full border-2 shrink-0 transition-all duration-400 ${isAct
                        ? "border-fourth bg-fourth shadow-lg shadow-fourth/30 scale-110"
                        : isDone
                          ? "border-fourth/50 bg-fourth/15"
                          : "border-white/15 bg-white/4 group-hover:border-white/30"
                        }`}
                    >
                      {isDone ? (
                        <CheckCircle2 size={14} className="text-fourth" />
                      ) : (
                        <Icon
                          size={15}
                          className={isAct ? "text-primary" : "text-third/35 group-hover:text-third/60"}
                        />
                      )}
                      {/* Pulse ring on active */}
                      {isAct && (
                        <span className="absolute inset-0 rounded-full border-2 border-fourth/30 animate-ping" />
                      )}
                    </div>


                    {/* Connector line (except last) */}
                    {i < steps.length - 1 && (
                      <>
                        {/* Desktop Horizontal Line */}
                        <div className="hidden lg:flex flex-1 h-px mx-3 overflow-hidden rounded-full bg-white/[0.07]">
                          <div
                            className="h-full bg-fourth/50 rounded-full transition-all duration-500"
                            style={{
                              width: isDone ? "100%" : isAct ? "50%" : "0%",
                            }}
                          />
                        </div>

                        {/* Mobile Vertical Line */}
                        <div className="lg:hidden ml-5 my-2 w-px h-10 bg-white/[0.07] relative">
                          <div
                            className="absolute bottom-0 left-0 w-full bg-fourth/50 transition-all duration-500"
                            style={{
                              height: isDone ? "100%" : isAct ? "50%" : "0%",
                            }}
                          />
                        </div>
                      </>
                    )}
                  </div>

                  {/* Step label below node */}
                  <div className="flex flex-col gap-1 text-left pl-0.5">
                    <div className="flex items-center gap-2">
                      <span
                        className={`font-primary text-[11px] font-black tracking-[0.3em] transition-colors duration-300 ${isAct ? "text-fourth/70" : "text-white/15"
                          }`}
                      >
                        {s.step}
                      </span>
                      <span
                        className={`text-[10px] uppercase tracking-[0.18em] font-bold px-2 py-0.5 rounded-full border transition-all duration-300 ${isAct && s.tagBlue
                          ? "border-fourth/30 text-fourth/70 bg-fourth/8"
                          : isAct
                            ? "border-white/20 text-third/60 bg-white/5"
                            : "border-white/5 text-white/15"
                          }`}
                      >
                        {s.tag}
                      </span>
                    </div>
                    <span
                      className={`font-primary text-[13px] font-black uppercase tracking-wide leading-tight transition-colors duration-300 ${isAct ? "text-primary" : "text-primary/35 group-hover:text-primary/60"
                        }`}
                    >
                      {s.title}
                    </span>
                    <span
                      className={`text-[13px] leading-snug transition-colors duration-300 ${isAct ? "text-third/85" : "text-third/40 group-hover:text-third/60"
                        }`}
                    >
                      {s.short}
                    </span>
                  </div>
                </button>
              </div>
            );
          })}
        </div>

        {/* ═══════════════════════════════════
            DETAIL PANEL — expands below stepper
        ═══════════════════════════════════ */}
        <div
          key={active}
          className="grid lg:grid-cols-[1fr_300px] gap-4 border border-white/8 rounded-3xl overflow-hidden"
          style={{ animation: "panelIn 0.4s cubic-bezier(0.22,1,0.36,1) both" }}
        >

          {/* Left: content */}
          <div className="relative p-8 lg:p-12 flex flex-col justify-between overflow-hidden">

            {/* Shimmer top */}
            <div
              className="absolute top-0 left-0 right-0 h-px"
              style={{
                background:
                  "linear-gradient(90deg, rgba(0,123,255,0.6), rgba(0,123,255,0.15), transparent)",
              }}
            />

            {/* Ghost step number */}
            <div
              className="absolute -bottom-6 -right-4 font-primary font-black select-none leading-none pointer-events-none"
              style={{
                fontSize: "clamp(7rem,16vw,12rem)",
                color: "transparent",
                WebkitTextStroke: "1px rgba(0,123,255,0.05)",
                letterSpacing: "-0.04em",
              }}
            >
              {current.step}
            </div>

            <div className="relative z-10">
              {/* Icon + tag */}
              <div className="flex items-center gap-3 mb-7">
                <div className="flex items-center justify-center w-12 h-12 rounded-2xl border border-fourth/25 bg-fourth/9 relative">
                  <div
                    className="absolute inset-0 rounded-2xl blur-md pointer-events-none"
                    style={{ background: "rgba(0,123,255,0.18)" }}
                  />
                  <CurrentIcon size={20} className="relative z-10 text-fourth" />
                </div>
                <div>
                  <span
                    className={`text-[10px] uppercase tracking-[0.28em] font-bold px-2.5 py-1 rounded-full border ${current.tagBlue
                      ? "border-fourth/25 bg-fourth/[0.07] text-fourth/65"
                      : "border-white/15 bg-white/4 text-third/55"
                      }`}
                  >
                    {current.tag}
                  </span>
                </div>
              </div>

              <h3
                className="font-primary text-4xl font-black uppercase leading-tight tracking-tight mb-4 text-primary"
              >
                {current.title}
              </h3>

              <p className="text-third/55 text-sm leading-relaxed max-w-md">
                {current.detail}
              </p>
            </div>

            {/* Proof tags row */}
            <div className="relative z-10 flex flex-wrap gap-2 mt-8">
              {current.proof.map((pr, pi) => {
                const PIcon = pr.icon;
                return (
                  <div
                    key={pi}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl border border-fourth/15 bg-fourth/5"
                  >
                    <PIcon size={12} className="text-fourth/60" />
                    <span className="text-[11px] uppercase tracking-[0.18em] font-bold text-fourth/65">
                      {pr.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: visual status panel */}
          <div className="border-l border-white/6 bg-black/20 flex flex-col">

            {/* Status header */}
            <div className="px-6 py-5 border-b border-white/6">
              <p className="text-[11px] uppercase tracking-[0.3em] text-third/35 font-semibold mb-3">
                Your Confidence Level
              </p>
              <div className="flex flex-col gap-2">
                {steps.map((s, si) => {
                  const unlocked = si <= active;
                  const SIcon = s.icon;
                  return (
                    <div
                      key={si}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl border transition-all duration-300 ${unlocked
                        ? "border-fourth/20 bg-fourth/6"
                        : "border-white/4 bg-transparent opacity-35"
                        }`}
                    >
                      <div
                        className={`flex items-center justify-center w-6 h-6 rounded-lg shrink-0 ${unlocked ? "bg-fourth/20 text-fourth" : "bg-white/20 text-third/80"
                          }`}
                      >
                        {unlocked ? (
                          <CheckCircle2 size={11} />
                        ) : (
                          <SIcon size={11} />
                        )}
                      </div>
                      <span
                        className={`text-[12px] font-semibold leading-tight ${unlocked ? "text-primary/75" : "text-third/85"
                          }`}
                      >
                        {s.title}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Score bar */}
            <div className="px-6 py-5 flex-1 flex flex-col justify-center gap-4">
              <p className="text-[11px] uppercase tracking-[0.3em] text-third/35 font-semibold">
                Confidence Meter
              </p>
              <div className="flex flex-col gap-3">
                {["Standard", "Enhanced", "Maximum"].map((lbl, li) => {
                  const filled = li <= active;
                  return (
                    <div key={li} className="flex items-center gap-3">
                      <span className="text-[11px] text-third/35 w-16 shrink-0 uppercase tracking-wider font-medium">
                        {lbl}
                      </span>
                      <div className="flex-1 h-1.5 rounded-full bg-white/6 overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-700"
                          style={{
                            width: filled ? "100%" : "0%",
                            background: "rgba(0,123,255,0.7)",
                            boxShadow: filled ? "0 0 8px rgba(0,123,255,0.35)" : "none",
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Nav arrow */}
            {active < steps.length - 1 && (
              <button
                onClick={() => setActive(active + 1)}
                className="mx-5 mb-5 flex items-center justify-between px-4 py-3 rounded-xl border border-fourth/20 bg-fourth/6 hover:bg-fourth/12 hover:border-fourth/35 transition-all duration-250 group"
              >
                <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-fourth/65">
                  Next Level
                </span>
                <ChevronRight
                  size={13}
                  className="text-fourth/50 group-hover:translate-x-0.5 transition-transform duration-200"
                />
              </button>
            )}
            {active === steps.length - 1 && (
              <div className="mx-5 mb-5 flex items-center gap-2 px-4 py-3 rounded-xl border border-fourth/25 bg-fourth/8">
                <CheckCircle2 size={13} className="text-fourth" />
                <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-fourth/70">
                  Maximum confidence
                </span>
              </div>
            )}
          </div>
        </div>

      </div>

      <style>{`
        @keyframes panelIn {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}