"use client";

import { motion } from "framer-motion";

const data = {
  selectionTitle:       "Our Approach to Vehicle Selection",
  selectionDescription: "Every vehicle listed through our storefront goes through a basic internal evaluation before being presented to buyers. This helps ensure that vehicles listed are suitable for serious buyers and provides a smoother vehicle buying experience.",
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


export default function Selection() {
  return (
    <section className="py-12 lg:py-12">
      <div className=" pt-10 grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center px-5">

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <EyeBrow>Selection</EyeBrow>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.05] text-primary font-[Montserrat]">
            Our Approach to{" "}
            <br />
            <span className="text-fourth/80">Vehicle Selection</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.12 }}
          viewport={{ once: true }}
        >
          <Divider />
          <p className="text-third/70 text-[15px] leading-[1.9] font-[Poppins]">
            {data.selectionDescription}
          </p>
        </motion.div>

      </div>
    </section>
  );
}