"use client";
import Image from "next/image";
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
            className="relative h-[350px] lg:h-auto lg:max-h-[520px] overflow-hidden border-0 rounded-2xl"
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Image
              src="/increase-buyer-confidence-vehicle.webp"
              alt="Increase Buyer Confidence"
              width={800}
              height={500}
              className="w-full h-full object-cover "
              style={{ objectPosition: "center 55%" }}
            />
            {/* right fade so it bleeds into content */}
            <div className="absolute inset-0 bg-linear-to-r from-transparent via-transparent to-black" />
            {/* bottom fade for mobile */}
            <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent lg:hidden" />

            {/* Score Badge */}
            <div className="absolute top-6 left-6 border border-primary/20 rounded-xl px-4 py-2 bg-black/70 backdrop-blur-md flex items-center gap-2">
              <span className="text-fourth font-bold text-sm">5 ★</span>
              <span className="text-[10px] text-white uppercase tracking-widest font-semibold">Reecomm Inspected</span>
            </div>

            {/* floating stat badge — sits over the image */}
            <motion.div
              className="absolute flex gap-3 bottom-8 left-8 border border-primary/20 rounded-2xl px-5 py-4 bg-black/60 backdrop-blur-md max-w-[250px]"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              viewport={{ once: true }}
            >
              <p className="font-[Montserrat] text-3xl font-bold text-white leading-none mb-1">
                2.3x
              </p>
              <p className="text-[11px] text-third/80 leading-snug">
                more qualified inquiries
                <br />
                on average.
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
                  className="text-[30px] sm:text-[40px] md:text-[48px] font-bold leading-tight text-primary font-montserrat"
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
                  className="text-[30px] sm:text-[40px] md:text-[48px] font-bold leading-tight text-fourth mb-3 font-montserrat"
                  initial={{ y: "100%" }}
                  whileInView={{ y: 0 }}
                  transition={{ duration: 0.7, delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  Confidence.
                </motion.h2>
              </div>
            </div>

            {/* divider */}
            <div className="w-8 h-px bg-white/15" />

            {/* copy */}
            <div className="space-y-4">
              <p className="text-[15px] leading-[1.8] text-third font-[Poppins]">
                Buyers make decisions faster when they trust what they see. Getting your vehicle inspected by Reecomm before listing removes the biggest barrier in every used vehicle sale — doubt.
              </p>
              <p className="text-[15px] leading-[1.8] text-third/85 font-[Poppins]">
                Inspection puts the facts on the table. No negotiation games. No uncomfortable questions about condition. Buyers arrive informed and ready.
              </p>
            </div>

            {/* feature rows */}
            <div className="space-y-0 mt-2">
              {[
                "Verified report linked to your vehicle listing",
                "Covers 11 inspection categories with photos",
                "Report visible to all buyers before they contact you",
                "Fewer condition questions during negotiation",
              ].map((text, i) => (
                <motion.div
                  key={i}
                  className="flex items-center gap-4 py-3 border-t border-primary/20 last:border-b group"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  viewport={{ once: true }}
                >
                  <span className="text-fourth font-bold text-sm shrink-0">✓</span>
                  <span className="text-sm text-primary/70 group-hover:text-primary transition-colors duration-300">
                    {text}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Supporting note */}
            <p className="text-xs text-third/50 italic leading-relaxed">
              * Sellers who list with an inspection report receive, on average, 2.3x more qualified inquiries than unverified listings.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
