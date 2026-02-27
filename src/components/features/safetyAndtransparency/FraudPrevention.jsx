"use client";

import { motion } from "framer-motion";
import { ShieldAlert, Eye, Repeat, AlertCircle, UserX } from "lucide-react";

export default function FraudPrevention() {
  const monitors = [
    {
      icon: Eye,
      title: "Listing Anomalies",
      desc: "Detection of unusual pricing or description patterns",
    },
    {
      icon: Repeat,
      title: "Repeated Re-posting",
      desc: "Flagging vehicles repeatedly listed and removed",
    },
    {
      icon: AlertCircle,
      title: "High Complaint Ratio",
      desc: "Monitoring consultants with elevated complaint rates",
    },
    {
      icon: UserX,
      title: "Suspicious Behavior",
      desc: "Identifying suspicious inquiry patterns",
    },
  ];

  return (
    <section className="w-full mx-auto py-10">
      <div className="w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="text-left md:text-center max-w-xl mx-auto mb-24">
            <div className="inline-flex items-center gap-2 mb-4 text-third font-semibold uppercase tracking-[0.35em] text-sm">
              <ShieldAlert className="w-4 h-4 text-red-400" />
              Automated Protection
            </div>
            <h2 className="text-[34px] sm:text-[42px] md:text-[48px] font-bold leading-[1.08] text-primary">
              <span className="text-fourth">Fraud </span>
              Prevention Measures
            </h2>

            <p className="text-[16px] text-third leading-relaxed">
              Buyer inquiries and consultant responses occur within the
              platform, creating an activity trail to support dispute review if
              required.
            </p>
          </div>
        </motion.div>

        {/* Monitoring Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid md:grid-cols-2 gap-6"
        >
          {monitors.map((monitor, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + i * 0.1 }}
              className="group p-6 rounded-2xl  border-2 border-white/10 hover:border-red-500/30 transition-all duration-300 hover:shadow-[0_10px_40px_-10px_rgba(255,255,255,0.25)]"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center shrink-0 group-hover:bg-red-500/20 transition-colors ">
                  <monitor.icon className="w-6 h-6 text-red-400" />
                </div>
                <div>
                  <h5 className="text-white font-semibold mb-2">
                    {monitor.title}
                  </h5>
                  <p className="text-white/40 text-sm">{monitor.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* System Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-12 p-6 rounded-2xl bg-linear-to-r from-red-500/5 via-white/5 to-red-500/5 border border-white/10"
        >
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center  gap-3">
              <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-white/80">
                Fraud Detection System Active
              </span>
            </div>
            <div className="text-white/40 text-sm">
              Listings or consultants may be flagged for review where necessary
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
