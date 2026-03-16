"use client";

import Button from "@/components/ui/button";
import { motion } from "framer-motion";
import { FiCheck } from "react-icons/fi";

const tiers = [
  {
    name: "Basic",
    subtitle: "Entry-level presence",
    desc: "Best for small consultants & entry-level sellers.",
    highlight: false,
    features: [
      "Up to 8 active listings",
      "Public search visibility",
      "Receive inquiries",
      "Basic analytics",
    ],
  },
  {
    name: "Pro",
    subtitle: "Growth-focused visibility",
    desc: "Ideal for growing dealerships expanding reach.",
    highlight: true,
    features: [
      "25–40 active listings",
      "Enhanced search visibility",
      "Advanced analytics",
      "Featured vehicle eligibility",
    ],
  },
  {
    name: "Premium",
    subtitle: "Brand-level dominance",
    desc: "For large inventory dealers & city-level brands.",
    highlight: false,
    features: [
      "75+ active listings",
      "Premium customization",
      "Top placement eligibility",
      "Dedicated support",
    ],
  },
];

export default function TierStructure() {
  return (
    <section className="py-20 relative overflow-hidden max-w-6xl">

      <div className="relative z-10  mx-auto text-center">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          <p className="text-sm tracking-[0.4em] uppercase text-third font-semibold mb-4">
            Tier Structure
          </p>

          <h2 className="text-[34px] sm:text-[42px] md:text-[48px] font-semibold leading-tight text-primary">
            Choose a Tier That Matches{" "}
            <span className="text-fourth font-bold">Your Scale</span>
          </h2>

          <p className="mt-6 text-third text-[15px] leading-relaxed">
            AVX operates on flexible subscription tiers designed to support
            consultants at every stage of growth.
          </p>
        </motion.div>

        {/* CARDS */}
        <div className="mt-20 grid md:grid-cols-3 gap-6">
          {tiers.map((tier, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              viewport={{ once: true }}
              className={`relative rounded-2xl p-8 text-left transition-all duration-300 ${
                tier.highlight
                  ? "border border-primary/20 bg-primary/[0.04] scale-[1.04] shadow-[0_32px_80px_rgba(0,0,0,0.6)]"
                  : "border border-white/[0.06] bg-transparent"
              }`}
            >
              {/* top edge line for highlight */}
              {tier.highlight && (
                <div className="absolute top-0 left-8 right-8 h-px bg-linear-to-r from-transparent via-primary/40 to-transparent" />
              )}

              {/* Most Popular badge */}
              {tier.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary/40 border border-primary/20 text-[10px] font-semibold px-3 py-1 rounded-full text-primary/80 tracking-widest uppercase">
                  Most Popular
                </div>
              )}

              <div className="relative">

                {/* tier index */}
                <p className="text-[10px] tracking-[0.3em] uppercase text-third mb-4 font-medium">
                  0{i + 1}
                </p>

                {/* NAME */}
                <h3 className="text-[22px] font-bold text-primary leading-none mb-1">
                  {tier.name}
                </h3>

                <p className={`text-sm mt-1 font-medium ${tier.highlight ? "text-fourth" : "text-third"}`}>
                  {tier.subtitle}
                </p>

                <p className="mt-4 text-third text-[13px] leading-relaxed">
                  {tier.desc}
                </p>

                {/* divider */}
                <div className="my-7 h-px bg-white/[0.06]" />

                {/* FEATURES */}
                <div className="space-y-3.5">
                  {tier.features.map((f, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div
                        className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${
                          tier.highlight
                            ? "bg-primary/15 border border-primary/25"
                            : "bg-white/5 border border-white/10"
                        }`}
                      >
                        <FiCheck
                          className={`text-[9px] ${tier.highlight ? "text-primary/80" : "text-third"}`}
                        />
                      </div>
                      <span className="text-[13px] text-primary/80">{f}</span>
                    </div>
                  ))}
                </div>

              </div>
            </motion.div>
          ))}
        </div>




        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          viewport={{ once: true }}
          className="mt-16"
        >
        <Button variant="ghost" className="bg-primary/95 text-secondary" >
           View Full Pricing
        </Button>
        </motion.div>

      </div>
    </section>
  );
}