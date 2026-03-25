"use client";

import { motion } from "framer-motion";

const data = {
  heroTitle:       "Why Choose Adarsh Auto Consultants",
  heroDescription: "Buyers trust Adarsh Auto Consultants for transparent communication, reliable vehicle options, and a smooth buying experience. Our goal is to help every buyer make confident vehicle decisions with clear information and professional support.",
};

const EyeBrow = ({ children }) => (
  <motion.p
    className="text-sm tracking-[0.4em] uppercase text-third font-semibold font-[Montserrat] mb-6 text-center"
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true }}
  >
    {children}
  </motion.p>
);

export default function Hero() {
  return (
    <section className="relative  flex items-center justify-center overflow-hidden min-h-screen   py-12">
      <div className="w-[70%] mx-auto text-center m-auto">

        <motion.h1
          className="text-[clamp(28px,5vw,54px)] font-bold leading-[1.15] text-primary mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
        >
          Why Choose <span className="text-fourth">Adarsh</span> Auto Consultants
        </motion.h1>

        <motion.p
          className="text-third/70 text-[15px] leading-[1.9]"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {data.heroDescription}
        </motion.p>

      </div>
    </section>
  );
}