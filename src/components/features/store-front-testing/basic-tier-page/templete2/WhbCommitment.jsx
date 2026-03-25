"use client";

import { motion } from "framer-motion";

const data = {
  commitmentTitle: "Customer Commitment",
  commitmentText:  "Our goal is to maintain transparent communication and assist buyers throughout the vehicle discovery and purchase process. We aim to provide honest guidance and reliable information for every buyer.",
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

const Divider = () => <div className="w-8 h-px bg-primary/15 my-2" />;


export default function Commitment() {
  return (
    <section className="py-12 lg:py-12 bg-fourth">
      <div className=" grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center px-10">

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <EyeBrow>Commitment</EyeBrow>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.05] text-primary font-[Montserrat]">
            Customer <span className="text-secondary">Commitment</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          viewport={{ once: true }}
        >
          <Divider />
          <p className="text-primary/90 text-[15px] leading-[1.9] font-[Poppins]">
            {data.commitmentText}
          </p>
        </motion.div>

      </div>
    </section>
  );
}