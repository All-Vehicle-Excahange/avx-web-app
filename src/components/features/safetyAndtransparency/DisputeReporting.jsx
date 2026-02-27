"use client";

import { motion } from "framer-motion";
import {
  Flag,
  FileWarning,
  AlertTriangle,
  PauseCircle,
  Bell,
  RefreshCw,
} from "lucide-react";

export default function DisputeReporting() {
  const reportTypes = [
    {
      icon: FileWarning,
      title: "Listing Discrepancies",
      desc: "Report mismatches between listing and actual vehicle",
    },
    {
      icon: AlertTriangle,
      title: "Inspection Mismatch",
      desc: "Flag differences between inspection and reality",
    },
    {
      icon: AlertTriangle,
      title: "Consultant Misconduct",
      desc: "Report unprofessional behavior or fraud",
    },
  ];

  const resolutions = [
    {
      icon: PauseCircle,
      title: "Listing Suspension",
      desc: "Temporarily halt pending investigation",
    },
    {
      icon: Bell,
      title: "Consultant Warning",
      desc: "Issue formal warning to consultant",
    },
    {
      icon: RefreshCw,
      title: "Re-inspection Trigger",
      desc: "Request new inspection at consultant cost",
    },
  ];

  return (
    <section className="py-10">
      <div className="w-full mx-auto ">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className=" max-w-2xl mx-auto mb-16"
        >
          <div className="text-left md:text-center max-w-xl mx-auto mb-20">
            <div className="inline-flex items-center gap-2 mb-4 text-third font-semibold uppercase tracking-[0.35em] text-sm">
              <Flag className="w-4 h-4 text-fourth" />
              Resolution Process
            </div>
            <h2 className="text-[34px] sm:text-[42px] md:text-[48px] font-bold leading-[1.08] text-primary">
              <span className="text-fourth">Dispute </span>Reporting
            </h2>

            <p className="text-[16px] text-third leading-relaxed">
              Buyers can raise concerns through a structured dispute process.
              AVX reviews platform-recorded interactions to ensure fair and
              transparent resolution.
            </p>
          </div>
        </motion.div>

        {/* GRID */}
        <div className="grid lg:grid-cols-2 gap-12">
          {/* REPORT TYPES */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-xs font-mono uppercase tracking-[0.3em] text-third mb-6">
              What You Can Report
            </p>

            <div className="space-y-4">
              {reportTypes.map((type, i) => (
                <div
                  key={i}
                  className="group p-5 rounded-xl border-primary/10 border-2   transition-all duration-300 hover:shadow-[0_10px_40px_-10px_rgba(255,255,255,0.25)] "
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-fourth/10 border border-fourth/20 flex items-center justify-center text-fourth">
                      <type.icon className="w-5 h-5 text-red-400" />
                    </div>

                    <div>
                      <h5 className="text-primary font-semibold mb-1">
                        {type.title}
                      </h5>
                      <p className="text-third text-sm">{type.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* RESOLUTIONS */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-xs font-mono uppercase tracking-[0.3em] text-third mb-6">
              Possible Resolutions
            </p>

            <div className="space-y-4">
              {resolutions.map((resolution, i) => (
                <div
                  key={i}
                  className="group p-5 rounded-xl border-primary/10 border-2  transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-fourth/10 border border-fourth/20 flex items-center justify-center text-fourth">
                      <resolution.icon className="w-5 h-5" />
                    </div>

                    <div>
                      <h5 className="text-primary font-semibold mb-1">
                        {resolution.title}
                      </h5>
                      <p className="text-third text-sm">{resolution.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-14 text-center"
        >
          <button className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-fourth/10 border border-fourth/30 text-fourth font-medium hover:bg-fourth/20 transition-all duration-300">
            <Flag className="w-5 h-5" />
            File a Dispute Report
          </button>
        </motion.div>
      </div>
    </section>
  );
}
