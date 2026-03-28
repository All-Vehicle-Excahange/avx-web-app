"use client";

import { motion } from "framer-motion";

const data = {
  statsDesc: `Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec. Sapien platea nec urna ut est sed.
    Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec. Sapien platea nec urna ut est sed.
    Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec. Sapien platea nec urna ut est sed.
    Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec. Lorem ipsum dolor sit amet consectetur.
    Odio at dolor ut donec. Sapien platea nec urna ut est sed. Lorem ipsum dolor sit amet consectetur.
    Odio at dolor ut donec. Sapien platea nec`,

  stats: [
    { number: "150K+", label: "Active Users Worldwide" },
    { number: "$2B+", label: "Transactions Processed" },
    { number: "98%", label: "Customer Satisfaction" },
    { number: "100+", label: "Team Members" },
  ],
};

const EyeBrow = ({ children }) => (
  <motion.p
    className="text-sm tracking-[0.4em] uppercase text-primary/60 font-semibold font-[Montserrat] mb-2"
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true }}
  >
    {children}
  </motion.p>
);

const Divider = () => <div className="w-8 h-px bg-primary/20 my-2" />;

export default function Stats() {
  return (
    <section className="py-12 lg:py-16 bg-fourth">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center px-10">

        {/* left — desc */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <EyeBrow>By The Numbers</EyeBrow>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.05] text-primary font-[Montserrat] mb-4">
            Our Growth <span className="text-secondary">in Numbers</span>
          </h2>
          <Divider />
          <p className="text-primary/80 text-[15px] leading-[1.9] font-[Poppins]">
            {data.statsDesc}
          </p>
        </motion.div>

        {/* right — 2×2 stat grid */}
        <div className="grid grid-cols-2 gap-3">
          {data.stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.09 }}
              className="group flex flex-col gap-2 p-6 border border-primary/20 rounded-2xl hover:border-primary/40 hover:bg-primary/5 transition-all duration-300"
            >
              <span className="text-3xl font-bold text-primary font-[Montserrat]">
                {stat.number}
              </span>
              <span className="text-[12px] text-primary/70 font-[Poppins] leading-[1.5]">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}