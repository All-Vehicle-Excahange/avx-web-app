"use client";

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
    <section className="py-28 relative overflow-hidden">

      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">

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
            <span className="bg-linear-to-r from-fourth via-[#60a5fa] to-fourth bg-clip-text text-transparent font-bold">
              Your Scale
            </span>
          </h2>

          <p className="mt-6 text-third text-[15px] leading-relaxed">
            AVX operates on flexible subscription tiers designed to support
            consultants at every stage of growth.
          </p>
        </motion.div>

        {/* CARDS */}
        <div className="mt-20 grid md:grid-cols-3 gap-8">

          {tiers.map((tier, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              viewport={{ once: true }}
              className={`relative rounded-2xl p-8 text-left transition-all duration-300 backdrop-blur-xl ${
                tier.highlight
                  ? "bg-linear-to-b from-[#0b2a4a]/70 via-[#0d1b2e]/60 to-transparent border border-fourth/40 shadow-[0_40px_100px_rgba(0,0,0,0.9)] scale-[1.09]"
                  : "bg-white/4 border border-white/10"
              }`}
            >

              {/* glow halo for highlight */}
              {tier.highlight && (
                <div className="absolute -inset-0.5 rounded-2xl bg-fourth/10 blur-2xl opacity-40 pointer-events-none" />
              )}

              {/* glass inner gradient */}
              <div className="absolute inset-0 rounded-2xl bg-linear-to-b from-white/6 to-transparent pointer-events-none" />

              {/* highlight badge */}
              {tier.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-fourth text-[10px] font-semibold px-3 py-1 rounded-full text-white shadow">
                  Most Popular
                </div>
              )}

              <div className="relative">

                {/* NAME */}
                <h3 className="text-xl font-semibold text-primary">
                  {tier.name}
                </h3>

                <p className="text-fourth text-sm mt-1 font-medium">
                  {tier.subtitle}
                </p>

                <p className="mt-4 text-third text-[14px] leading-relaxed">
                  {tier.desc}
                </p>

                {/* divider */}
                <div className="my-7 h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />

                {/* FEATURES */}
                <div className="space-y-3">
                  {tier.features.map((f, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-fourth/10 border border-fourth/20 flex items-center justify-center">
                        <FiCheck className="text-fourth text-xs" />
                      </div>
                      <span className="text-[14px] text-primary/90">
                        {f}
                      </span>
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
          <a
            href="/pricing"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-sm font-semibold text-primary bg-linear-to-r from-[#044596] to-fourth shadow-lg shadow-blue-900/40 transition duration-300 hover:shadow-blue-600/40 hover:-translate-y-px"
          >
            View Full Pricing →
          </a>
        </motion.div>

      </div>
    </section>
  );
}
