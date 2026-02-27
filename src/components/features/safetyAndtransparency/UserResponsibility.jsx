"use client";

import { motion } from "framer-motion";
import { UserCheck, FileText, Eye, Ban, Info } from "lucide-react";

export default function UserResponsibility() {
  const responsibilities = [
    {
      icon: UserCheck,
      title: "Verify Documents",
      desc: "Cross-reference vehicle documentation with listing details",
    },
    {
      icon: Eye,
      title: "Inspect Vehicles",
      desc: "Request professional inspection before commitment",
    },
    {
      icon: Ban,
      title: "Stay On-Platform",
      desc: "Avoid off-platform negotiation or payment discussions",
    },
    {
      icon: FileText,
      title: "Review Reports",
      desc: "Read inspection reports thoroughly before deciding",
    },
  ];

  return (
    <section className="py-10">
      <div className="w-full mx-auto   ">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-16 "
        >
          <div className="text-left md:text-center max-w-xl mx-auto mb-15">
            <div className="inline-flex items-center gap-2 mb-4 text-third font-semibold uppercase tracking-[0.35em] text-sm">
              <Info className="w-4 h-4 text-yellow-400" />
              Informed Participation
            </div>
            <h2 className="text-[34px] sm:text-[42px] md:text-[48px] font-bold leading-[1.08] text-primary">
              User<span className="text-fourth"> Responsibility </span>
            </h2>

            <p className="text-[16px] text-third leading-relaxed">
              AVX encourages all users to take an active role in due diligence.
              Informed decisions lead to safer and more transparent outcomes.
            </p>
          </div>
        </motion.div>

        {/* RESPONSIBILITY CARDS */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {responsibilities.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.08 }}
              viewport={{ once: true }}
              className="group p-6 rounded-2xl bg-secondary/30 border border-primary/10 hover:border-fourth/40 transition-all duration-300 text-center hover:shadow-[0_10px_40px_-10px_rgba(255,255,255,0.25)]"
            >
              <div className="w-14 h-14 rounded-2xl bg-fourth/10 border border-fourth/20 flex items-center justify-center mx-auto mb-4 transition-colors">
                <item.icon className="w-7 h-7 text-fourth" />
              </div>

              <h5 className="text-primary font-semibold mb-2">{item.title}</h5>

              <p className="text-third text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-12 p-6 rounded-2xl bg-amber-500/5 border border-amber-500/20"
        >
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center shrink-0">
              <Ban className="w-5 h-5 text-amber-400" />
            </div>

            <div>
              <h5 className="text-white font-medium mb-2">
                Avoid Off-Platform Transactions
              </h5>

              <p className="text-white/50 text-sm leading-relaxed">
                Never agree to transactions outside of AVX. Off-platform
                payments are not covered by our verification and dispute
                resolution systems. Report any consultant who suggests moving
                communication or payment off-platform.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
