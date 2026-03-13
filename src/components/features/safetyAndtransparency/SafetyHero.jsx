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
            className="grid grid-cols-2 gap-4 max-w-[420px]"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            {pillars.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 * i + 0.6 }}
                className="group relative p-4 rounded-xl border border-white/10 
       backdrop-blur-md
      transition-all duration-300"
              >
                <div className="flex flex-col gap-2">
                  <span className="text-[11px] tracking-widest font-mono text-third/60">
                    {p.num}
                  </span>

                  <span className="text-[13px] leading-snug text-primary font-medium">
                    {p.label}
                  </span>
                </div>

                <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition pointer-events-none,transparent_70%)]" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
