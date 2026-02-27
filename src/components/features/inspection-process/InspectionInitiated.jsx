"use client";

import React from "react";
import {
  UserSquare2,
  Users2,
  ShieldCheck,
  CreditCard,
  MapPin,
  CalendarCheck,
  Zap,
} from "lucide-react";

export default function InspectionInitiated() {
  const steps = [
    {
      icon: <CreditCard className="w-5 h-5" />,
      title: "Secure Payment",
      desc: "Encrypted gateway validates the request before scheduling.",
    },
    {
      icon: <MapPin className="w-5 h-5" />,
      title: "Inspector Mapping",
      desc: "Smart geo-assignment connects the nearest certified inspector.",
    },
    {
      icon: <CalendarCheck className="w-5 h-5" />,
      title: "Inspection Confirmed",
      desc: "Vehicle availability verified for physical inspection.",
    },
  ];

  return (
    <section className="relative py-20  overflow-hidden">
      {/* ambient glow */}
      <div className="absolute left-1/2 top-0 -translate-x-1/2 w-175 h-100 bg-fourth/5 blur-3xl rounded-full pointer-events-none" />

      <div className="relative w-full mx-auto ">
        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl md:text-5xl font-semibold text-primary leading-tight">
            Inspection Initiated
          </h2>

          <p className="mt-5 text-third/70 text-lg">
            A precision-driven pipeline that activates once trust is requested.
          </p>
        </div>

        {/* AUTHORITY BADGES (floating style) */}
        <div className="flex flex-wrap justify-center gap-4 mb-20">
          {[
            { label: "Consultant", icon: <ShieldCheck className="w-5 h-5" /> },
            { label: "Buyer", icon: <UserSquare2 className="w-5 h-5" /> },
            { label: "Dual Approval", icon: <Users2 className="w-5 h-5" /> },
          ].map((item, i) => (
            <div
              key={i}
              className="
                group
                px-6 py-3
                rounded-full
                bg-white/4
                border border-white/10
                backdrop-blur-md
                flex items-center gap-3
                hover:border-fourth/40
                transition-all duration-300
              "
            >
              <div className="text-fourth">{item.icon}</div>
              <span className="text-sm font-medium text-primary">
                {item.label}
              </span>
            </div>
          ))}
        </div>

        {/* ===== UNIQUE HORIZONTAL FLOW ===== */}
        <div className="relative">
          {/* pipeline line */}
          <div className="absolute top-8 left-0 right-0 h-px bg-linear-to-r from-transparent via-white/20 to-transparent" />

          <div className="grid md:grid-cols-3 gap-10 relative">
            {steps.map((step, idx) => (
              <div key={idx} className="relative group text-center">
                {/* node */}
                <div
                  className="
                  mx-auto mb-6
                  w-16 h-16
                  rounded-2xl
                  bg-[#151515]
                  border border-white/10
                  flex items-center justify-center
                  text-fourth
                  group-hover:bg-fourth
                  group-hover:text-primary
                  transition-all duration-500
                  shadow-[0_0_0_0_rgba(0,0,0,0)]
                "
                >
                  {step.icon}
                </div>

                {/* title */}
                <h4 className="text-lg font-semibold text-primary mb-2">
                  {step.title}
                </h4>

                {/* desc */}
                <p className="text-sm text-third/60 leading-relaxed max-w-xs mx-auto">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* TRUST STATEMENT */}
        <div className="mt-24 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-start gap-3 px-6 py-4 rounded-2xl bg-white/3 border border-white/10">
            <Zap className="text-fourth w-5 h-5 mt-1 shrink-0" />
            <p className="text-sm text-primary/80 italic leading-relaxed">
              AVX inspected vehicles consistently convert faster and build
              stronger buyer confidence across the marketplace.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
