"use client";
import { motion } from "framer-motion";
import {
  ClipboardCheck,
  Camera,
  ListChecks,
  Clock,
  RefreshCw,
} from "lucide-react";

export default function InspectionTransparency() {
  const features = [
    {
      icon: ClipboardCheck,
      title: "Inspection Summary",
      desc: "Comprehensive overview of vehicle condition",
    },
    {
      icon: Camera,
      title: "Photo Documentation",
      desc: "Visual evidence of current vehicle state",
    },
    {
      icon: ListChecks,
      title: "Checklist Evaluation",
      desc: "Systematic assessment across key components",
    },
    {
      icon: Clock,
      title: "Timestamped Report",
      desc: "Verified report generation date and time",
    },
  ];

  return (
    <section className="py-10">
      <div className="w-full mx-auto ">

        {/* HEADER */}
        <div className="text-left md:text-center max-w-xl mx-auto mb-20">
          <p className="text-sm tracking-[0.4em] uppercase text-third font-semibold mb-4">
            Inspection Transparency
          </p>

          <h2 className="text-[40px] md:text-[48px] font-bold leading-tight text-primary">
            Inspection <span className="text-fourth">Transparency</span>
          </h2>

          <p className="text-[16px] text-third leading-relaxed mt-4">
            AVX supports a standardized inspection framework. Vehicles may include
            detailed inspection reports to improve clarity before commitment.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* LEFT — PREMIUM REPORT CARD */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative"
          >

            {/* glow */}
            <div className="absolute inset-0 bg-fourth/10 blur-3xl rounded-3xl opacity-40" />

            <div className="relative bg-[#0f1117]/90 border border-[#1f2937] rounded-3xl p-8 shadow-[0_20px_60px_rgba(0,0,0,0.45)]">

              {/* HEADER */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-primary text-lg font-semibold">
                    Inspection Report
                  </p>
                  <p className="text-third text-sm">
                    Standardized evaluation record
                  </p>
                </div>

                <span className="px-3 py-1 rounded-full bg-fourth/10 border border-fourth/20 text-fourth text-xs font-medium">
                  Verified
                </span>
              </div>

              {/* META GRID */}
              <div className="grid grid-cols-2 gap-4 mb-8">

                {[
                  ["Vehicle", "2021 Sedan — 48,000 km"],
                  ["Inspection Type", "Full mechanical"],
                  ["Inspector ID", "AVX-INSP-2041"],
                  ["Status", "Completed"],
                ].map((row, i) => (
                  <div key={i} className="bg-[#0b0f17] border border-[#1f2937] rounded-xl p-3">
                    <p className="text-third text-xs">{row[0]}</p>
                    <p className="text-primary font-medium text-sm">{row[1]}</p>
                  </div>
                ))}

              </div>

              {/* CHECKLIST */}
              <div className="space-y-4">

                {[
                  { label: "Engine Condition", score: 92 },
                  { label: "Braking System", score: 88 },
                  { label: "Structural Integrity", score: 95 },
                  { label: "Interior Condition", score: 90 },
                ].map((item, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-third">{item.label}</span>
                      <span className="text-primary">{item.score}%</span>
                    </div>

                    <div className="h-2 rounded-full bg-[#1f2937] overflow-hidden">
                      <div
                        className="h-full bg-fourth rounded-full"
                        style={{ width: `${item.score}%` }}
                      />
                    </div>
                  </div>
                ))}

              </div>

              {/* FOOTER */}
              <div className="mt-8 pt-4 border-t border-[#1f2937] flex items-center justify-between text-sm">
                <div className="flex items-center gap-2 text-third">
                  <Clock className="w-4 h-4" />
                  Jan 15, 2024 — 2:34 PM
                </div>

                <span className="text-fourth font-medium">
                  Timestamp Verified
                </span>
              </div>

            </div>
          </motion.div>

          {/* RIGHT CONTENT */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >

            <div className="space-y-5">
              {features.map((feature, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 p-5 rounded-xl bg-[#0f1117]/70 border border-[#1f2937]"
                >
                  <div className="w-11 h-11 rounded-lg bg-fourth/10 border border-fourth/20 flex items-center justify-center">
                    <feature.icon className="w-5 h-5 text-fourth" />
                  </div>

                  <div>
                    <h5 className="text-primary font-semibold mb-1">
                      {feature.title}
                    </h5>
                    <p className="text-third text-sm">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-8 p-5 rounded-xl bg-fourth/5 border border-fourth/20 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <RefreshCw className="w-5 h-5 text-fourth" />
                <span className="text-primary">Need a fresh inspection?</span>
              </div>

              <button className="px-4 py-2 rounded-lg bg-fourth/20 text-fourth text-sm font-medium hover:bg-fourth/30 transition">
                Request Re-inspection
              </button>
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
}