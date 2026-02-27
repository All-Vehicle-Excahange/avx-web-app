"use client";

import { useState } from "react";
import {
  Fingerprint,
  Database,
  BookOpen,
  Activity,
  ArrowRight,
} from "lucide-react";

const pillars = [
  {
    id: "01",
    icon: Fingerprint,
    title: "Verified Identities",
    body: "Every consultant on AVX undergoes identity verification before listing a single vehicle. No anonymous actors.",
    tag: "KYC Layer",
  },
  {
    id: "02",
    icon: Database,
    title: "Structured Data",
    body: "Listings follow a fixed schema. No freeform descriptions — only standardized, comparable, machine-readable entries.",
    tag: "Schema-locked",
  },
  {
    id: "03",
    icon: BookOpen,
    title: "Recorded Interactions",
    body: "Key touchpoints between buyers and consultants are logged, creating an auditable trail for every transaction.",
    tag: "Audit trail",
  },
  {
    id: "04",
    icon: Activity,
    title: "Public Performance",
    body: "Consultant metrics are openly visible. Ranking, response rate, and deal history — transparent by default.",
    tag: "Open metrics",
  },
];

export default function TrustVerification() {
  const [hovered, setHovered] = useState(null);

  return (
    <section className="relative py-10  overflow-hidden font-secondary text-primary">


      {/* Blue glow — bottom center */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-175 h-65 pointer-events-none blur-[90px]"
        style={{ background: "radial-gradient(ellipse, rgba(0,123,255,0.1) 0%, transparent 70%)" }}
      />

      <div className="max-w-7xl mx-auto relative">

        {/* ── HEADER ROW ── */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-20">

          <div className="max-w-xl">

            {/* Eyebrow with animated line */}
            <div className="flex items-center gap-3 mb-5">
              <p className="text-sm tracking-[0.4em] uppercase text-third font-semibold">
                Trust & Verification
              </p>
            </div>

            <h2 className="font-primary md:text-5xl text-3xl  lg:text-6xl font-black uppercase leading-[0.95] tracking-tight">
              Built on
              <br />
              <span
                className="relative inline-block"
                style={{ WebkitTextStroke: "1.5px rgba(255,254,247,0.25)", color: "transparent" }}
              >
                Account
                <span style={{ WebkitTextStroke: "1.5px #007bff", color: "transparent" }}>
                  ability
                </span>
              </span>
            </h2>
          </div>

          {/* Right statement */}
          <div className="lg:max-w-xs">
            <p className="text-third/60 text-sm leading-relaxed border-l-2 border-fourth/30 pl-4">
              AVX focuses on reducing ambiguity before financial decisions. Every layer below exists to protect that commitment.
            </p>
          </div>
        </div>

        {/* ── PILLAR STRIP ── */}
        <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">

          {/* Connecting top rule */}
          <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />

          {pillars.map((p, i) => {
            const Icon = p.icon;
            const isHovered = hovered === i;
            const isLast = i === pillars.length - 1;

            return (
              <div
                key={p.id}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                className={`relative group flex flex-col gap-6 px-8 py-10 transition-all duration-300 cursor-default
                  ${!isLast ? "border-r border-white/6" : ""}
                  ${isHovered ? "bg-white/3" : "bg-transparent"}
                `}
              >
                {/* Top active indicator */}
                <div
                  className={`absolute top-0 left-8 right-8 h-px transition-all duration-500 ${
                    isHovered ? "bg-fourth opacity-100" : "opacity-0"
                  }`}
                />

                {/* Index + Tag row */}
                <div className="flex items-center justify-between">
                  <span className="font-primary text-[11px] font-black text-third/20 tracking-widest">
                    {p.id}
                  </span>
                  <span
                    className={`text-[9px] font-bold uppercase tracking-[0.2em] px-2 py-1 rounded-md transition-all duration-300 ${
                      isHovered
                        ? "bg-fourth/15 text-fourth/80"
                        : "bg-white/4 text-third/30"
                    }`}
                  >
                    {p.tag}
                  </span>
                </div>

                {/* Icon */}
                <div
                  className={`relative flex items-center justify-center w-12 h-12 rounded-2xl border transition-all duration-400 ${
                    isHovered
                      ? "border-fourth/40 bg-fourth/10"
                      : "border-white/[0.07] bg-white/3"
                  }`}
                >
                  {/* icon glow */}
                  {isHovered && (
                    <div
                      className="absolute inset-0 rounded-2xl blur-md"
                      style={{ background: "rgba(0,123,255,0.2)" }}
                    />
                  )}
                  <Icon
                    size={20}
                    className={`relative z-10 transition-all duration-300 ${
                      isHovered ? "text-fourth" : "text-third/35"
                    }`}
                  />
                </div>

                {/* Text */}
                <div className="flex flex-col gap-2 flex-1">
                  <h4
                    className={`font-primary text-base font-bold uppercase tracking-wide leading-tight transition-colors duration-300 ${
                      isHovered ? "text-primary" : "text-primary/70"
                    }`}
                  >
                    {p.title}
                  </h4>
                  <p
                    className={`text-[13px] leading-relaxed transition-colors duration-300 ${
                      isHovered ? "text-third/70" : "text-third/40"
                    }`}
                  >
                    {p.body}
                  </p>
                </div>

                {/* Bottom arrow — slides in on hover */}
                <div
                  className={`flex items-center gap-1.5 transition-all duration-300 ${
                    isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
                  }`}
                >
                  <span className="text-[10px] uppercase tracking-[0.2em] text-fourth/70 font-semibold">
                    Learn more
                  </span>
                  <ArrowRight size={11} className="text-fourth/70" />
                </div>
              </div>
            );
          })}
        </div>

        {/* ── BOTTOM STAT BAR ── */}
        <div
          className="mt-0 border border-t-0 border-white/6 rounded-b-2xl overflow-hidden grid grid-cols-2 md:grid-cols-4 divide-x divide-white/5"
        >
          {[
            { value: "100%", label: "Consultants Verified" },
            { value: "0",    label: "Anonymous Listings" },
            { value: "200+", label: "Inspection Checkpoints" },
            { value: "Open", label: "Performance Metrics" },
          ].map((s, i) => (
            <div
              key={i}
              className="px-7 py-5 bg-black/20 flex items-center gap-4"
            >
              <div>
                <p className="font-primary text-xl font-black text-fourth leading-none mb-0.5">
                  {s.value}
                </p>
                <p className="text-[9px] uppercase tracking-[0.22em] text-third/40 font-semibold">
                  {s.label}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}