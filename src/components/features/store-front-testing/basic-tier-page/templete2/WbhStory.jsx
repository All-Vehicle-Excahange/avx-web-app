"use client";

import { motion } from "framer-motion";

const data = {
  storyTitle: "Our Experience",
  storyText:  "For over 12 years, Adarsh Auto Consultants has been helping buyers discover reliable vehicles across Gujarat.\n\nOur goal is to maintain a diverse vehicle inventory and provide accurate information so buyers can make confident decisions when purchasing their next vehicle.",
};

const EyeBrow = ({ children }) => (
  <motion.p
    className="text-sm tracking-[0.4em] uppercase text-third font-semibold mb-2"
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true }}
  >
    {children}
  </motion.p>
);


export default function Story() {
  return (
    <section className="py-12 lg:py-12 bg-fourth">
      <div className=" grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center px-10">

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <EyeBrow>Our Story</EyeBrow>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.05] text-primary">
            Our <span className="text-secondary">Experience</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.12 }}
          viewport={{ once: true }}
        >
          <p className="text-primary/90 text-[15px] leading-[1.9] whitespace-pre-line">
            {data.storyText}
          </p>
        </motion.div>

      </div>
    </section>
  );
}