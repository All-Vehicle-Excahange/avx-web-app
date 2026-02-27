"use client";

import { motion } from "framer-motion";

const roles = [
  {
    title: "Verified Consultant Access",
    desc: "Every consultant passes credential and identity checks before going live on the platform.",
  },
  {
    title: "Structured Vehicle Data",
    desc: "Standardised specs, mileage records, and history references — no free-text ambiguity.",
  },
  {
    title: "Inspection Visibility",
    desc: "Condition reports and third-party outcomes attached to listings before buyer outreach.",
  },
  {
    title: "Platform-Recorded Interaction",
    desc: "All in-platform conversations are timestamped — giving both parties a tamper-evident record.",
  },
];

export default function MarketplaceModel() {
  return (
    <section className="py-10 relative overflow-hidden w-full">
      <div className="relative z-10 w-full mx-auto ">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55 }}
            viewport={{ once: true }}
            className="max-w-xl"
          >
            <span className="text-sm tracking-[0.4em] uppercase text-third font-semibold">
              Marketplace Transparency
            </span>

            <h2 className="text-[34px] sm:text-[42px] md:text-[50px] font-bold leading-[1.08] text-primary mt-4">
              AVX{" "}
              <span className="bg-linear-to-r from-fourth via-[#60a5fa] to-fourth bg-clip-text text-transparent">
                Marketplace Model
              </span>
            </h2>

            <p className="mt-5 text-third text-[15px] leading-relaxed">
              AVX is a discovery and interaction platform. Vehicle pricing,
              negotiation, and final transactions occur directly between buyers
              and consultants.
            </p>

            <p className="mt-4 text-third text-[15px] leading-relaxed">
              AVX does not process payments between parties. Our role is to
              provide visibility, structured data, and platform-level
              interaction support.
            </p>

            <div className="mt-8 mb-8 h-px bg-linear-to-r from-fourth/30 via-[#1f2937] to-transparent" />

            <div className="border-l-2 border-fourth pl-5">
              <p className="text-primary text-[15px] font-medium leading-relaxed">
                This structure avoids legal misrepresentation — AVX acts as a
                platform, not a transacting party.
              </p>
            </div>
          </motion.div>

          {/* RIGHT CARDS */}
          <div className="flex flex-col gap-5">
            {roles.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                viewport={{ once: true }}
                className="group relative rounded-2xl border border-[#1f2937] bg-[#0f1117]/80 p-5 overflow-hidden hover:border-[#1e3a5f] hover:bg-[#0d1b2e] hover:cursor-pointer transition-all duration-300"
              >
                {/* accent line */}
                <div className="absolute left-0 top-4 bottom-4 w-0.5 bg-fourth opacity-40 lg:opacity-0 lg:group-hover:opacity-60 transition-opacity duration-300" />

                {/* title */}
                <h3 className="text-[16px] font-semibold text-primary mb-2">
                  {item.title}
                </h3>

                {/* description */}
                <p
                  className="
                  text-[13px] text-third leading-relaxed
                  opacity-100 translate-y-0
                  lg:opacity-0 lg:translate-y-2
                  lg:group-hover:opacity-100 lg:group-hover:translate-y-0
                  transition-all duration-300
                "
                >
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
