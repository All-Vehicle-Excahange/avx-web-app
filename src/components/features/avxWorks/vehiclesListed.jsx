"use client";

import {
  CheckCircle2,
  ShieldCheck,
  UserCheck,
  FileText,
  Search,
} from "lucide-react";
import { motion } from "framer-motion";
import { Verified } from "lucide-react";

export default function VehiclesListed() {
  const points = [
    {
      text: "Government-issued identity verification",
      icon: <UserCheck size={18} />,
    },
    { text: "Business existence confirmation", icon: <FileText size={18} /> },
    { text: "Vehicle sourcing process audit", icon: <Search size={18} /> },
    {
      text: "Compliance with Reecomm conduct standards",
      icon: <ShieldCheck size={18} />,
    },
  ];

  return (
    <section className=" px-0  py-18  font-secondary">
      <div className="w-full mx-auto">
        <div className="relative overflow-hidden ">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            {/* LEFT CONTENT: Verification System */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <p className="text-sm tracking-[0.4em] uppercase text-third font-semibold">
                  Reecomm Consultant Checks
                </p>
              </div>

              <h2 className="text-3xl md:text-5xl font-primary font-bold leading-tight mb-6">
                Standardized <span className="text-fourth">Verification</span>
              </h2>

              <p className="text-third text-sm md:text-base leading-relaxed mb-10 max-w-lg">
                We hold every consultant on Reecomm to a consistent standard
                before they can list a single vehicle. This isn&apos;t just
                registration — it&apos;s credentialing.
              </p>

              {/* Verification "Scanner" UI */}
              <div className="space-y-3 mb-8">
                {points.map((point, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center justify-between gap-3 p-3.5 sm:p-4 rounded-xl border border-primary/5 bg-primary/3 group hover:border-fourth/50 transition-all"
                  >
                    <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                      <div className="text-fourth opacity-80 group-hover:opacity-100 shrink-0">
                        {point.icon}
                      </div>
                      <p className="text-xs sm:text-sm md:text-[15px] text-primary/85 font-medium leading-snug">
                        {point.text}
                      </p>
                    </div>
                    <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                      <span className="text-[8px] sm:text-[9px] font-bold text-third uppercase tracking-tight">
                        Verified
                      </span>
                      <CheckCircle2 size={16} className="text-fourth shrink-0" />
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="flex items-center gap-3.5 p-3.5 sm:p-4 rounded-xl bg-fourth/5 border border-fourth/20">
                <ShieldCheck className="text-fourth shrink-0" size={22} />
                <p className="text-xs sm:text-sm text-third leading-relaxed">
                  Consultants must maintain their rating to retain verified
                  status.
                </p>
              </div>
            </div>

            {/* RIGHT VISUAL: The Master Authentication Seal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotateY: 20 }}
              whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
              className="relative flex justify-center items-center perspective-1000 my-4 lg:my-0"
            >
              {/* Multi-layered Ambient Glow for depth */}

              <div className="relative group flex items-center justify-center">
                {/* ✨ THE MASTER BADGE */}
                <div className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-96 md:h-96 flex items-center justify-center">
                  {/* Outer Rotating Ring (Decorative) */}
                  <div className="absolute inset-0 border-2 border-dashed border-fourth/20 rounded-full animate-[spin_20s_linear_infinite]" />

                  {/* Middle Glass Ring */}
                  <div className="absolute inset-3 sm:inset-4 border border-primary/10 rounded-full bg-primary/2 backdrop-blur-sm shadow-[inset_0_0_40px_rgba(255,255,255,0.05)]" />

                  {/* Main Hexagonal / Circular Core */}
                  <div className="relative w-52 h-52 sm:w-60 sm:h-60 md:w-80 md:h-80 rounded-full bg-[#080808] border border-primary/20 shadow-2xl flex flex-col items-center justify-center overflow-hidden">
                    {/* Animated Scan Line across the Badge */}
                    <motion.div
                      animate={{ top: ["-10%", "110%"] }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="absolute left-0 right-0 h-16 sm:h-20 bg-gradient-to-b from-transparent via-fourth/10 to-transparent z-10"
                    />

                    {/* Top Branding */}
                    <div className="absolute top-6 sm:top-10 md:top-12 flex flex-col items-center">
                      <p className="text-[8px] sm:text-[10px] font-black text-fourth uppercase tracking-[0.3em] sm:tracking-[0.4em] mb-0.5 sm:mb-1">
                        Standardized
                      </p>
                      <div className="h-px w-8 sm:w-12 bg-fourth/40" />
                    </div>

                    {/* Center Icon & Title */}
                    <div className="flex flex-col items-center z-20">
                      <div className="relative mb-2 sm:mb-3">
                        <ShieldCheck
                          className="w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 text-primary drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]"
                        />
                        <motion.div className="absolute -top-1 -right-1">
                          <Verified className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-fourth" />
                        </motion.div>
                      </div>
                      <h3 className="text-2xl sm:text-3xl md:text-4xl font-primary font-black text-primary tracking-tighter mb-0.5 sm:mb-1">
                        Reecomm<span className="text-fourth">.</span>
                      </h3>
                      <p className="text-[9px] sm:text-[11px] font-bold text-primary/40 uppercase tracking-[0.15em] sm:tracking-[0.2em]">
                        Verified Asset
                      </p>
                    </div>

                    {/* Bottom Metadata */}
                    <div className="absolute bottom-5 sm:bottom-8 md:bottom-10 flex items-center gap-4 sm:gap-6">
                      <div className="text-center">
                        <p className="text-[9px] sm:text-[12px] text-primary/30 uppercase font-bold mb-0.5">
                          Confidence
                        </p>
                        <p className="text-[12px] sm:text-[15px] text-primary/90 font-mono">
                          100%
                        </p>
                      </div>
                      <div className="w-px h-5 sm:h-6 bg-primary/10" />
                      <div className="text-center">
                        <p className="text-[9px] sm:text-[12px] text-primary/30 uppercase font-bold mb-0.5">
                          Precision
                        </p>
                        <p className="text-[12px] sm:text-[15px] text-primary/90 font-mono">
                          A++
                        </p>
                      </div>
                    </div>

                    {/* Background "Verified" Text Watermark */}
                    <span className="absolute text-[50px] sm:text-[70px] md:text-[80px] font-black text-primary/2 -bottom-4 pointer-events-none select-none">
                      TRUST
                    </span>
                  </div>

                  {/* Outer Floating Accents */}
                  <div className="absolute -top-2 right-0 sm:-top-4 sm:-right-2 bg-black border border-primary/10 px-2.5 sm:px-4 py-1 sm:py-2 rounded-xl sm:rounded-2xl shadow-xl">
                    <p className="text-[8px] sm:text-[9px] font-mono text-fourth">
                      ISO:9001 COMPLIANT
                    </p>
                  </div>
                  <div className="absolute -bottom-1 left-0 sm:-bottom-2 sm:-left-2 bg-black border border-primary/10 px-2.5 sm:px-4 py-1 sm:py-2 rounded-xl sm:rounded-2xl shadow-xl">
                    <p className="text-[8px] sm:text-[9px] font-mono text-primary/60 uppercase tracking-widest">
                      Protocol 2.0
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
