"use client";

import {
  AlertTriangle,
  FileSearch,
  RefreshCcw,
  ShieldCheck,
} from "lucide-react";

export default function DisputeHandling() {
  const steps = [
    {
      title: "Buyer raises dispute",
      desc: "If discrepancies arise, the buyer may formally raise a dispute for review.",
      icon: AlertTriangle,
    },
    {
      title: "Inspection logs reviewed",
      desc: "AVX reviews inspection media, checklist data, and inspector notes.",
      icon: FileSearch,
    },
    {
      title: "Re-evaluation triggered",
      desc: "If required, a structured re-evaluation workflow may be initiated.",
      icon: RefreshCcw,
    },
  ];

  return (
    <section className="relative py-10 overflow-hidden">
      {/* subtle depth — softened */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_65%_0%,rgba(255,255,255,0.04),transparent_50%)]" />

      <div className="relative w-full mx-auto">
        {/* HEADER — aligned with home */}
        <div className="max-w-3xl mb-14">
          <p className="text-sm tracking-[0.4em] uppercase text-third font-semibold mb-5">
            Dispute Handling
          </p>

          <h2 className="text-4xl sm:text-5xl xl:text-6xl font-semibold text-primary leading-[1.05] mb-5">
            Structured Review Protocol
          </h2>

          <p className="text-lg text-third leading-relaxed">
            AVX maintains a defined review workflow to address inspection-related
            discrepancies with full audit visibility and procedural clarity.
          </p>
        </div>

        {/* MAIN CONSOLE */}
        <div className="relative rounded-3xl border border-white/10 bg-white/[0.035] backdrop-blur-md overflow-hidden">
          
          {/* top strip — calmer */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-black/25">
            <p className="text-xs tracking-widest uppercase text-third/70">
              Dispute Review Flow
            </p>

            <div className="flex items-center gap-2 text-xs text-third/70">
              <ShieldCheck className="w-4 h-4 text-fourth" />
              Audit Protected
            </div>
          </div>

          {/* FLOW */}
          <div className="p-6 lg:p-10 grid md:grid-cols-3 gap-6">
            {steps.map((step, index) => {
              const Icon = step.icon;

              return (
                <div
                  key={index}
                  className="
                    relative
                    group
                    rounded-2xl
                    border border-white/10
                    bg-black/25
                    p-6
                    transition-all duration-300
                    hover:border-white/20
                    hover:bg-white/5
                  "
                >
                  {/* step number */}
                  <div className="text-[10px] tracking-widest text-third/50 mb-3">
                    STEP {index + 1}
                  </div>

                  {/* icon */}
                  <div className="w-11 h-11 rounded-xl bg-fourth/10 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-fourth" />
                  </div>

                  <h3 className="text-base md:text-lg font-semibold text-primary mb-2">
                    {step.title}
                  </h3>

                  <p className="text-sm text-third leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* AUDIT STATEMENT */}
        <div className="mt-14 grid lg:grid-cols-12 gap-10 items-center">
          
          {/* LEFT TEXT */}
          <div className="lg:col-span-6">
            <h3 className="text-xl md:text-2xl font-semibold text-primary mb-3">
              Inspection audit trails are preserved
            </h3>

            <p className="text-sm text-third leading-relaxed">
              AVX maintains detailed inspection logs including media, checklist
              inputs, timestamps, and inspector attribution. This ensures every
              review is backed by verifiable historical data.
            </p>
          </div>

          {/* RIGHT VISUAL */}
          <div className="lg:col-span-6">
            <div className="relative rounded-2xl overflow-hidden border border-white/10">
              <img
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1600&auto=format&fit=crop"
                alt="AVX audit trail and inspection data review dashboard"
                className="w-full h-55 md:h-65 object-cover opacity-95"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
