"use client";

import { motion } from "framer-motion";

const data = {
  heroTitle: "Our Story Built for Buy & Selling a Vehicle",
  heroDesc: `Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec.
    Sapien platea nec urna ut est sed. Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec.
    Sapien platea nec urna ut est sed. Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec.
    Sapien platea nec urna ut est sed. Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec.
    Sapien platea nec urna ut est sed. Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec.
    Sapien platea nec urna ut est sed.`,
};

const EyeBrow = ({ children }) => (
  <motion.p
    className="text-sm tracking-[0.4em] uppercase text-third font-semibold font-[Montserrat] mb-4"
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true }}
  >
    {children}
  </motion.p>
);

export default function AboutHero() {
  return (
    <section className="relative flex items-center justify-center min-h-screen py-14 lg:py-24">
      <div className="px-5 flex flex-col items-center text-center gap-6 max-w-3xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <EyeBrow>About Us</EyeBrow>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.1] text-primary font-[Montserrat]">
            Our Story Built for{" "}
            <span className="text-fourth/80">Buy & Selling</span> a Vehicle
          </h1>
        </motion.div>

        {/* center divider */}
        <motion.div
          className="w-10 h-px bg-primary/15"
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        />

        <motion.p
          className="text-third/70 text-[15px]  leading-[1.9] font-[Poppins]"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          viewport={{ once: true }}
        >
          {data.heroDesc}
        </motion.p>

      </div>
    </section>
  );
}