"use client";

import Button from "@/components/ui/button";
import { motion } from "framer-motion";

export default function InspectionAdvantage() {
  return (
    <section className="relative overflow-hidden py-10 lg:py-10">

      <div className="relative z-10 mx-auto w-full">

        {/* LABEL */}
        <motion.p
          className="text-sm tracking-[0.4em] uppercase text-third font-semibold mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Inspection Advantage
        </motion.p>

        {/* MAIN GRID — image left, content right */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-0 items-stretch ">

          {/* LEFT — IMAGE BLOCK */}
          <motion.div
            className="relative h-[300px] lg:h-auto lg:max-h-[520px] overflow-hidden border-0 rounded-2xl"
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <img
              src="/car-inspection.avif"
              alt="Car inspection"
              className="w-full h-full object-cover "
              style={{ objectPosition: "center 55%" }}
            />
            {/* right fade so it bleeds into content */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black" />
            {/* bottom fade for mobile */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent lg:hidden" />

            {/* floating stat badge — sits over the image */}
            <motion.div
              className="absolute flex gap-2 bottom-8 left-8 border border-primary/20 rounded-2xl px-5 py-4 bg-black/60 backdrop-blur-md"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              viewport={{ once: true }}
            >
              <p className="font-[Montserrat] text-3xl font-bold text-white leading-none mb-1">
                3×
              </p>
              <p className="text-[11px] text-third/60 leading-snug">
                more inquiries on<br />inspected listings
              </p>
            </motion.div>
          </motion.div>

          {/* RIGHT — CONTENT */}
          <motion.div
            className="flex flex-col justify-start gap-5 lg:pl-8 xl:pl-10 pt-10 lg:pt-0"
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <div>
              <div className="overflow-hidden">
                <motion.h2
                  className="text-[30px] sm:text-[40px] md:text-[48px] font-bold leading-tight text-primary"
                  initial={{ y: "100%" }}
                  whileInView={{ y: 0 }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  Increase Buyer
                </motion.h2>
              </div>
              <div className="overflow-hidden pb-1">
                <motion.h2
                  className="text-[30px] sm:text-[40px] md:text-[48px] font-bold leading-tight text-fourth mb-3"
                  initial={{ y: "100%" }}
                  whileInView={{ y: 0 }}
                  transition={{ duration: 0.7, delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  Confidence
                </motion.h2>
              </div>
            </div>

            {/* divider */}
            <div className="w-8 h-px bg-white/15" />

            {/* copy */}
            <div className="space-y-5">
              <p className="text-[15px] leading-[1.9] text-third">
                Buyers make decisions under uncertainty. When your listing
                carries a certified AVX inspection — documented, timestamped,
                and publicly visible — that uncertainty collapses. What remains
                is confidence, and confidence converts.
              </p>
              <p className="text-[15px] leading-[1.9] text-third/60">
                {"Every report is permanently tied to your vehicle's record,accessible from first inquiry to final handover."}
              </p>
            </div>

            {/* feature rows */}
            <div className="space-y-0">
              {[
                { num: "01", text: "Certified report linked to vehicle history" },
                { num: "02", text: "Visible to all buyers on your listing" },
                { num: "03", text: "Request before or after going live" },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  className="flex items-center gap-5 py-3 border-t border-primary/20 last:border-b group"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  viewport={{ once: true }}
                >
                  <span className="font-mono text-[10px] text-primary/90 shrink-0">
                    {item.num}
                  </span>
                  <span className="text-sm text-primary/70 group-hover:text-primary transition-colors duration-300">
                    {item.text}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}