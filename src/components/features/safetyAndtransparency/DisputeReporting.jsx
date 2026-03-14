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
    <section className="py-10" style={{ overflowX: "hidden" }}>
      <div className="w-full mx-auto ">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className=" max-w-2xl mx-auto mb-16"
        >
          <div className="text-left md:text-left max-w-xl mx-auto mb-20">
            <div className="inline-flex gap-2 text-sm tracking-[0.4em] uppercase text-third font-semibold mb-2">
              Resolution Process
            </div>
            <h2 className="text-[34px] sm:text-[42px] md:text-[48px] font-bold leading-[1.08] text-primary">
              <span className="text-fourth/80">Dispute </span>Reporting
            </h2>

            <p className="text-[16px] text-third leading-relaxed w-[50%] md-[100%]">
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
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-xs font-mono uppercase tracking-[0.3em] text-third mb-6">
              What You Can Report
            </p>

            <div className="space-y-4">
              {reportTypes.map((type, i) => (
                <div
                  key={i}
                  className="group p-5 rounded-xl border-primary/20 border   transition-all duration-300 hover:shadow-[0_10px_40px_-10px_rgba(230,230,230,0.15)] "
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg border border-primary/10 flex items-center justify-center text-fourth/80">
                      <type.icon className="w-5 h-5 text-primary" />
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
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-xs font-mono uppercase tracking-[0.3em] text-third mb-6">
              Possible Resolutions
            </p>

            <div className="space-y-4">
              {resolutions.map((resolution, i) => (
                <div
                  key={i}
                  className="group p-5 rounded-xl border-primary/20 border  transition-all duration-300 hover:shadow-[0_10px_40px_-10px_rgba(230,230,230,0.15)]"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg  border border-primary/10 flex items-center justify-center text-primary">
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
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-14 text-center"
        >
          <button className="inline-flex items-center gap-2 px-7 py-3 rounded-xl   border border-primary/30 text-fourth/80 font-medium  transition-all duration-300">
            <Flag className="w-5 h-5" />
            File a Dispute Report
          </button>
        </motion.div>
      </div>
    </section>
  );
}