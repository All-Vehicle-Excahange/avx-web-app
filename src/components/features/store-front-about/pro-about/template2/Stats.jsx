"use client";

import { motion } from "framer-motion";

const data = {
  statsDesc: `Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec. Sapien platea nec urna ut est sed.
    Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec. Sapien platea nec urna ut est sed.
    Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec. Sapien platea nec urna ut est sed.
    Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec. Lorem ipsum dolor sit amet consectetur.
    Odio at dolor ut donec. Sapien platea nec urna ut est sed.`,

  statsImage: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=1400&auto=format",

  stats: [
    { number: "150K+", label: "Active Users Worldwide" },
    { number: "$2B+",  label: "Transactions Processed" },
    { number: "98%",   label: "Customer Satisfaction" },
    { number: "100+",  label: "Team Members" },
  ],
};

export default function Stats() {
  return (
    <section className="py-14 lg:py-20">
      <div className="px-5">

        {/* full-width image container with overlay content */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative rounded-2xl overflow-hidden min-h-[480px] lg:min-h-[520px] flex flex-col justify-end"
        >
          {/* bg image */}
          <img
            src={data.statsImage}
            alt="Stats background"
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/70 to-secondary/20" />

          {/* content */}
          <div className="relative z-10 p-8 lg:p-12 flex flex-col gap-10">

            {/* top — eyebrow + desc */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-20 items-end">
              <div>
                <motion.p
                  className="text-sm tracking-[0.4em] uppercase text-third font-semibold font-[Montserrat] mb-3"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                >
                  By The Numbers
                </motion.p>
                <h2 className="text-3xl sm:text-4xl font-semibold font-[Montserrat] text-primary leading-[1.1]">
                  Our Growth{" "}
                  <span className="text-fourth">in Numbers</span>
                </h2>
              </div>

              <motion.p
                className="text-primary/60 text-[14px] leading-[1.9] font-[Poppins]"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.15 }}
              >
                {data.statsDesc}
              </motion.p>
            </div>

            {/* stats row */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-primary/10 border border-primary/10 rounded-xl overflow-hidden">
              {data.stats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: i * 0.08 }}
                  className="flex flex-col gap-1 px-6 py-6 bg-secondary/60 backdrop-blur-sm hover:bg-fourth/15 transition-colors duration-300 group"
                >
                  <span className="text-3xl font-bold text-fourth font-[Montserrat] group-hover:text-primary transition-colors duration-300">
                    {stat.number}
                  </span>
                  <span className="text-[12px] text-primary/55 font-[Poppins] leading-[1.5]">
                    {stat.label}
                  </span>
                </motion.div>
              ))}
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}