"use client";

import Button from "@/components/ui/button";
import { motion } from "framer-motion";

const sellerTypes = [
  {
    index: "01",
    title: "Individual Vehicle Owners",
    desc: "You own it, you list it. No middlemen, no dealership overhead — just a direct, transparent path to the right buyer.",
  },
  {
    index: "02",
    title: "First-Time Sellers",
    desc: "Never sold a vehicle before? AVX walks you through every step — verification, pricing guidance, and buyer communication.",
  },
  {
    index: "03",
    title: "Buyers Reselling Their Car",
    desc: "Purchased a vehicle and moving on? List it with your existing ownership record already on file for instant credibility.",
  },
];

export default function WhoCanSell() {
  return (
    <section className="relative overflow-hidden py-4 lg:py-10 px-0">
      <div className="relative z-10 mx-auto w-full">
        {/* TOP ROW — asymmetric */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10 mb-10 lg:mb-10">
          {/* LEFT — label + heading */}
          <div>
            <motion.p
              className="text-sm tracking-[0.4em] uppercase text-third font-semibold mb-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              Eligibility
            </motion.p>

            <div className="overflow-hidden pb-1">
              <motion.h2
                className="text-[30px] sm:text-[40px] md:text-[48px] font-bold leading-tight text-primary"
                initial={{ y: "100%" }}
                whileInView={{ y: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true }}
              >
                <span>Who Can </span>
                <span className="text-blue-400">Sell?</span>
              </motion.h2>
            </div>
          </div>

          <motion.div
            className="lg:mb-3 max-w-xs"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            viewport={{ once: true }}
          >
            <div className="border border-primary/20 rounded-2xl px-6 py-5">
              <p className="text-[11px] tracking-[0.3em] uppercase text-tprimary mb-3">
                Important Note
              </p>
              <p className="text-[15px] leading-[1.8] text-primary/80">
                Individual sellers can list{" "}
                <span className="text-white font-semibold">
                  1 active vehicle
                </span>{" "}
                at a time on the AVX platform.
              </p>
            </div>
          </motion.div>
        </div>

        {/* SELLER TYPE ROWS */}
        <div className="flex flex-col">
          {sellerTypes.map((s, i) => (
            <motion.div
              key={i}
              className="group grid grid-cols-[40px_1fr] lg:grid-cols-[80px_1fr_1.2fr] items-start lg:items-center gap-3 lg:gap-7 py-5 lg:py-7 border-t border-primary/20 last:border-b cursor-default"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.12, duration: 0.6 }}
              viewport={{ once: true }}
            >
              {/* index */}
              <span className="font-mono text-[18px] text-white/80 group-hover:text-white pt-1 lg:pt-0">
                {s.index}
              </span>

              {/* title */}
              <h3 className="font-[Montserrat] text-lg sm:text-xl lg:text-2xl font-semibold text-primary/90 group-hover:text-white transition-colors duration-300 leading-snug">
                {s.title}
              </h3>

              {/* desc — hidden on mobile, shown on lg */}
              <p className="hidden lg:block text-[16px] leading-[1.85] text-third/60 group-hover:text-third/90 transition-colors duration-300">
                {s.desc}
              </p>

              {/* desc — shown on mobile only */}
              <p className="col-span-2 col-start-2 lg:hidden text-[16px] leading-[1.85] text-third/60 -mt-2">
                {s.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* BOTTOM — CTA strip */}
        <motion.div
          className="mt-8 lg:mt-10"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          viewport={{ once: true }}
        >
          <p className="text-[15px] text-center text-third/60 max-w-md leading-relaxed">
            All seller types go through the same verification process — ensuring
            every listing on AVX meets our standards of trust and transparency.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
