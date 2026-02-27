"use client";

import { motion } from "framer-motion";
import { MessageSquare, FileText, History, AlertTriangle } from "lucide-react";

export default function CommunicationAccountability() {
  const activities = [
    {
      icon: MessageSquare,
      title: "Inquiry Logs",
      desc: "All buyer questions and messages are recorded within the platform.",
    },
    {
      icon: FileText,
      title: "Chat Activity",
      desc: "Full conversation history remains available for reference.",
    },
    {
      icon: History,
      title: "Inspection Requests",
      desc: "Inspection requests and responses are tracked over time.",
    },
    {
      icon: AlertTriangle,
      title: "Listing Changes",
      desc: "Price updates and listing status changes are logged.",
    },
  ];

  return (
    <section className="relative py-10">
      <div className="w-full">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="text-left md:text-center max-w-xl mx-auto mb-24">
            <div className="inline-flex items-center gap-2 mb-4 text-third font-semibold uppercase tracking-[0.35em] text-sm">
              <History className="w-4 h-4 text-fourth" />
              Activity Trail
            </div>
            <h2 className="text-[34px] sm:text-[42px] md:text-[48px] font-bold leading-[1.08] text-primary">
              Platform-<span className="text-fourth">Recorded </span>
              Interaction
            </h2>

            <p className="text-[16px] text-third leading-relaxed">
              Buyer inquiries and consultant responses occur within the
              platform, creating an activity trail to support dispute review if
              required.
            </p>
          </div>
        </motion.div>

        {/* TIMELINE */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative"
        >
          {/* vertical line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-linear-to-br from-fourth/40 via-[#1f2937] to-transparent hidden lg:block" />

          <div className="grid lg:grid-cols-2 gap-8">
            {activities.map((activity, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className={`relative ${i % 2 === 1 ? "lg:mt-16" : ""}`}
              >
                <div className="p-6 rounded-2xl bg-[#0f1117]/70  border-third border-2  transition-all duration-300 backdrop-blur hover:shadow-[0_10px_40px_-10px_rgba(230,230,230,0.15)] bg-[linear-gradient(90deg,#313131_0%,#1a1919_45%,#000000_100%)]">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-fourth/10 border border-fourth/20 flex items-center justify-center shrink-0 text-fourth">
                      <activity.icon className="w-5 h-5" />
                    </div>

                    <div>
                      <h5 className="text-primary font-semibold mb-1">
                        {activity.title}
                      </h5>
                      <p className="text-third text-sm leading-relaxed">
                        {activity.desc}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* INFO BOX */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-14 p-7 rounded-2xl bg-fourth/5 border border-fourth/20 text-center max-w-3xl mx-auto"
        >
          <p className="text-third leading-relaxed">
            This creates an{" "}
            <span className="text-primary font-semibold">activity trail</span>{" "}
            to support dispute review if required. All interactions are
            time-stamped and preserved within the platform.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
