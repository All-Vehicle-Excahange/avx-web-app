"use client";
import Image from "next/image";

import {
  User,
  FileSignature,
  RefreshCw,
  ShieldCheck,
} from "lucide-react";

export default function DisputeHandling() {
  const steps = [
    {
      title: "Buyer Value Report",
      desc: "Every report is written with the buyer's decision in mind. Inspectors document what a buyer needs to know — condition, scores, flags, and photographs — in a format that is clear without being technical.",
      icon: User,
    },
    {
      title: "Inspector Sign-off",
      desc: "Every report carries the inspector's digital sign-off, date of inspection, and location. Inspection identity is recorded on the platform and cannot be modified after submission.",
      icon: FileSignature,
    },
    {
      title: "Re-evaluation Support",
      desc: "If a buyer raises a concern about the inspection findings, they can flag it through the platform. Reecomm will review the report and, if warranted, arrange a re-evaluation at no additional cost.",
      icon: RefreshCw,
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
            Inspector Standards
          </p>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.05] text-primary font-montserrat mb-8 md:mb-10">
            Structured Review
            <span className="text-fourth/80"> Protocol.</span>
          </h2>

          <p className="text-lg text-third leading-relaxed">
            Reecomm inspectors are not random third parties. Every inspector assigned through the platform operates under a defined review protocol — ensuring consistency, accountability, and report quality across every inspection.
          </p>
        </div>

        {/* MAIN CONSOLE */}
        <div className="relative rounded-3xl border border-primary/20  backdrop-blur-md overflow-hidden">
          {/* top strip — calmer */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-primary/10 ">
            <p className="text-xs tracking-widest uppercase text-third/70">
              Protocol Pillars
            </p>

            <div className="flex items-center gap-2 text-xs text-third/70">
              <ShieldCheck className="w-4 h-4 text-primary" />
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
                    border border-primary/10
                    p-6
                    transition-all duration-300
                    hover:border-primary/40
                  "
                >
                  {/* step number */}
                  <div className="text-[10px] tracking-widest text-third/50 mb-3">
                    PILLAR 0{index + 1}
                  </div>

                  {/* icon */}
                  <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-primary" />
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
            <h3 className="text-xl md:text-2xl font-semibold text-primary mb-3 font-montserrat">
              Inspection audit trails are preserved.
            </h3>

            <p className="text-sm text-third leading-relaxed">
              Every inspection request, assignment, report submission, and flag is logged on the platform. If a dispute arises, the full audit trail is available for review.
            </p>
          </div>

          {/* RIGHT VISUAL */}
          <div className="lg:col-span-6">
            <div className="relative rounded-2xl overflow-hidden border border-primary/10">
              <Image
                src="/inspection-audit-trails-are-preserved.webp"
                alt="Reecomm audit trail and inspection data review dashboard"
                width={800}
                height={500}
                unoptimized
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
