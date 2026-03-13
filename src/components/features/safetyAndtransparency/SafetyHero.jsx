"use client";

import { motion } from "framer-motion";

const pillars = [
  { num: "01", label: "Verified Consultants" },
  { num: "02", label: "Inspection Visibility" },
  { num: "03", label: "Recorded Interaction" },
  { num: "04", label: "Fraud Monitoring" },
];

export default function SafetyHero() {
  return (
    <section className="relative h-fit flex flex-col justify-end overflow-hidden lg:min-h-screen">
      {/* BG IMAGE */}
      <div className="absolute inset-0">
        <img
          src="/safety-hero.avif"
          alt=""
          className="w-full h-full object-cover scale-100"
          style={{ objectPosition: "center 100%" }}
        />
      </div>

      <div className="absolute inset-0 bg-linear-to-t from-black via-black/35 to-black/10" />
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_70%_40%,rgba(59,130,246,0.12),transparent_60%)]" />

      <div className="relative z-10 mx-auto px-6 md:px-6 w-full pb-20">
        <div className="mb-12 pt-20 lg:pt-20 h-fit">
          <motion.p
            className="text-sm tracking-[0.4em] py-3 uppercase text-third font-semibold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            Safety & Transparency
          </motion.p>

          {/* Heading block */}
          <div className="overflow-visible pb-2">
            <h2 className="font-[Montserrat] text-3xl sm:text-4xl lg:text-5xl text-primary font-semibold leading-[1.05]">
              Built on
            </h2>
          </div>
          <div className="overflow-visible pb-2">
            <h2 className="font-[Montserrat] text-3xl sm:text-4xl lg:text-5xl text-fourth/80 font-semibold leading-[1.05]">
              Visibility & Trust
            </h2>
          </div>
        </div>

        {/* BOTTOM ROW */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10">
          {/* DESCRIPTION */}
          <motion.div
            className="max-w-[440px]"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55 }}
          >
            <div className="w-8 h-px bg-fourth/60 mb-4" />
            <p className="text-[15px] leading-[1.9] text-third">
              AVX brings structured verification and platform accountability to
              the pre-owned vehicle marketplace — reducing ambiguity through
              visibility before financial decisions are made.
            </p>
          </motion.div>

          {/* PILLARS */}
          <motion.div
            className="flex flex-wrap items-center gap-3"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            {pillars.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 * i + 0.6 }}
                className="flex items-center gap-2 px-4 py-2 rounded-full border-secondry/50 border-2 bg-white/4 backdrop-blur-md hover:bg-fourth/10 transition-all duration-300"
              >
                <span className="font-mono text-[10px] text-third/70">{p.num}</span>
                <span className="text-[12px] text-primary">{p.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}