"use client";

import React from "react";
import {
  ShieldAlert,
  XCircle,
  AlertTriangle,
  History,
  FileX2,
  Lock,
} from "lucide-react";

export default function InspectionNotCovered() {
  const exclusions = [
    {
      title: "Future Performance",
      desc: "Guaranteeing future mechanical performance or potential breakdowns.",
      icon: <History className="w-5 h-5 text-fourth" />,
      tag: "NON_PREDICTIVE",
    },
    {
      title: "Transaction Outcome",
      desc: "Guaranteeing or influencing the final sale outcome or negotiation.",
      icon: <ShieldAlert className="w-5 h-5 text-fourth" />,
      tag: "NEUTRAL_ENTITY",
    },
    {
      title: "Ownership Logistics",
      desc: "Handling payment processing, RTO legalities, or title transfers.",
      icon: <FileX2 className="w-5 h-5 text-fourth" />,
      tag: "EVAL_ONLY",
    },
    {
      title: "Warranty Provision",
      desc: "Providing insurance or a mechanical warranty on the vehicle.",
      icon: <Lock className="w-5 h-5 text-fourth" />,
      tag: "NO_INSURANCE",
    },
  ];

  return (
    <section className="relative py-10 overflow-hidden">
      {/* subtle brand ambient (NOT danger) */}
      <div className="absolute top-0 right-0 w-115 h-115 bg-fourth/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="relative w-full mx-auto ">
        <div className="grid lg:grid-cols-12 gap-16 items-start">

          {/* LEFT */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">

            {/* BADGE LABEL — premium advisory */}
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-fourth/15 rounded-lg border border-fourth/30">
                <AlertTriangle className="w-4 h-4 text-fourth" />
              </div>

              <span className="text-sm tracking-[0.4em] uppercase text-third font-semibold">
                Important Transparency
              </span>
            </div>

            {/* HEADING */}
            <h2 className="text-3xl md:text-5xl xl:text-6xl font-semibold text-primary leading-tight mb-8">
              What Inspection{" "}
              <span className="text-fourth">Does Not Cover</span>
            </h2>

            {/* BODY */}
            <div className="space-y-6">
              <p className="text-base md:text-lg text-third/85 leading-relaxed max-w-xl">
                AVX inspection maintains strict neutrality. To ensure full
                clarity for buyers and sellers, the following areas remain
                outside the scope of our evaluation.
              </p>

              {/* CALM ADVISORY STRIP */}
              <div className="p-6 rounded-2xl bg-fourth/6 border border-fourth/25 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1.5 h-full bg-fourth" />
                <p className="text-sm text-primary/95 leading-relaxed">
                  Inspection is an evaluation at the time of assessment. It
                  does not act as a future guarantee or warranty instrument.
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT GRID */}
          <div className="lg:col-span-7 grid sm:grid-cols-2 gap-5">
            {exclusions.map((item, i) => (
              <div
                key={i}
                className="group p-7 rounded-2xl bg-white/2 border border-white/10 transition-all duration-300 hover:border-fourth/40 hover:bg-fourth/4"
              >
                <div className="flex flex-col gap-6">
                  <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-fourth/15 transition-all duration-300">
                    {item.icon}
                  </div>

                  <div>
                    <div className="flex items-start justify-between mb-3 gap-4">
                      <h4 className="text-sm md:text-base font-semibold text-primary uppercase tracking-[0.12em]">
                        {item.title}
                      </h4>

                      <span className="text-[14px] font-mono text-third/50 whitespace-nowrap">
                        {item.tag}
                      </span>
                    </div>

                    <p className="text-sm text-third/75 leading-relaxed group-hover:text-third/95 transition-colors">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {/* TERMINAL STRIP */}
            <div className="sm:col-span-2 mt-4 p-5 rounded-xl bg-fourth/8 border border-fourth/25 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <XCircle className="w-4 h-4 text-fourth" />
                <span className="text-[11px] text-fourth uppercase tracking-[0.25em]">
                  Evaluation Only • No Warranty Implied
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
