"use client";

import { motion } from "framer-motion";
import { Search, FileText, ShieldCheck, MessageSquare, PlusCircle, Handshake } from "lucide-react";

const steps = [
  {
    title: "Discover verified vehicles",
    desc: "Browse consultant listed vehicles verified through platform quality and listing standards.",
    icon: Search,
  },
  {
    title: "Evaluate structured information",
    desc: "Review standardized vehicle data, history insights, and consultant performance indicators.",
    icon: FileText,
  },
  {
    title: "Review inspection data",
    desc: "Access inspection reports, condition insights, and transparency driven documentation.",
    icon: ShieldCheck,
  },
  {
    title: "Connect with consultants",
    desc: "Interact directly with consultants through structured platform communication channels.",
    icon: MessageSquare,
  },
  {
    title: "Request additional assurance (optional)",
    desc: "Request additional inspections or supporting validation before final decision making.",
    icon: PlusCircle,
  },
  {
    title: "Complete the deal directly",
    desc: "Finalize pricing, negotiation, and transaction directly with the consultant.",
    icon: Handshake,
  },
];

export default function AVXJourneySection() {
  return (
    <section className="relative overflow-hidden py-20 bg-transparent">
      
      <div className="relative max-w-5xl mx-auto px-6">
        {/* HEADER */}
        <div className="text-center mb-20">
          <p className="text-xs tracking-[0.4em] uppercase text-white/40 font-bold mb-3">
            The Complete Journey
          </p>

          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4 font-primary">
            The Reecomm Buying Flow
          </h2>

          <div className="w-12 h-1 bg-fourth mx-auto rounded-full mt-5 mb-4" />

          <p className="text-third max-w-lg mx-auto text-sm leading-relaxed">
            A structured, transparent, and accountable pathway designed to eliminate buying friction and build transaction trust.
          </p>
        </div>

        {/* FLOW RAIL CONTAINER */}
        <div className="relative">
          {/* TIMELINE VERTICAL RAIL */}
          {/* Desktop Rail (Center) */}
          <div
            className="
              hidden md:block absolute left-1/2 top-4 bottom-4
              w-[2px] -translate-x-1/2
              bg-linear-to-b from-fourth/80 via-fourth/30 to-fourth/5
            "
          />
          {/* Mobile Rail (Left) */}
          <div
            className="
              md:hidden absolute left-6 top-4 bottom-4
              w-[2px]
              bg-linear-to-b from-fourth/80 via-fourth/30 to-fourth/5
            "
          />

          {/* STEPS */}
          <div className="space-y-12 md:space-y-20">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40, scale: 0.98 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className={`
                    relative flex flex-col md:flex-row items-start md:items-center w-full
                    ${i % 2 === 0 ? "md:justify-start" : "md:justify-end"}
                  `}
                >
                  {/* CARD CONTAINER WITH ALTERNATING WIDTH */}
                  <div className={`w-full md:w-[calc(50%-40px)] ${i % 2 === 0 ? "md:pr-8" : "md:pl-8"} pl-16 md:pl-0`}>
                    {/* STEP CARD */}
                    <div
                      className="
                        group relative rounded-2xl border border-white/5
                        bg-white/[0.02] hover:bg-white/[0.04]
                        p-6 backdrop-blur-md
                        hover:border-fourth/30 transition-all duration-300
                        hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)]
                        hover:-translate-y-1
                      "
                    >
                      {/* Top Accent Gradient Border */}
                      <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-linear-to-r from-transparent via-fourth/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      {/* Header with step number & Icon */}
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-[10px] font-black uppercase tracking-wider text-fourth bg-fourth/10 px-2 py-0.5 rounded">
                          Step 0{i + 1}
                        </span>
                        <div className="w-8 h-8 rounded-lg bg-white/5 text-zinc-300 flex items-center justify-center group-hover:bg-fourth/10 group-hover:text-fourth transition-colors duration-300">
                          <Icon size={16} />
                        </div>
                      </div>

                      <h3 className="text-lg font-bold text-white tracking-tight mt-2 font-primary">
                        {step.title}
                      </h3>

                      <p className="text-xs md:text-sm text-third mt-2 leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  </div>

                  {/* MILESTONE / NODE POINT */}
                  {/* Desktop Milestone Center */}
                  <div
                    className="
                      hidden md:flex absolute left-1/2 -translate-x-1/2
                      w-9 h-9 rounded-full
                      bg-[#141416] border-[2px] border-fourth
                      items-center justify-center text-[10px] font-black text-fourth
                      shadow-[0_0_12px_rgba(0,123,255,0.3)]
                      z-10
                    "
                  >
                    0{i + 1}
                  </div>
                  {/* Mobile Milestone Left */}
                  <div
                    className="
                      md:hidden absolute left-2 top-6
                      w-8 h-8 rounded-full
                      bg-[#141416] border-[2px] border-fourth
                      flex items-center justify-center text-[9px] font-black text-fourth
                      shadow-[0_0_10px_rgba(0,123,255,0.3)]
                      z-10
                    "
                  >
                    0{i + 1}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
