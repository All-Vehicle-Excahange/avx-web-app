"use client";

import { motion } from "framer-motion";

const data = {
  missionTitle: "Our Mission",
  missionDesc: `Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec. Sapien platea nec urna ut est sed.
    Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec. Sapien platea nec urna ut est sed.
    Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec. Sapien platea nec urna ut est sed.
    Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec. Lorem ipsum dolor sit amet consectetur.
    Odio at dolor ut donec. Sapien platea nec urna ut est sed. Lorem ipsum dolor sit amet consectetur.
    Odio at dolor ut donec. Sapien platea nec`,

  visionTitle: "Our Vision",
  visionDesc: `Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec. Sapien platea nec urna ut est sed.
    Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec. Sapien platea nec urna ut est sed.
    Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec. Sapien platea nec urna ut est sed.
    Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec. Lorem ipsum dolor sit amet consectetur.
    Odio at dolor ut donec. Sapien platea nec urna ut est sed. Lorem ipsum dolor sit amet consectetur.
    Odio at dolor ut donec. Sapien platea nec`,
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const EyeBrow = ({ children }) => (
  <motion.p
    className="text-sm tracking-[0.4em] uppercase text-third font-semibold font-[Montserrat] mb-2"
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true }}
  >
    {children}
  </motion.p>
);

const Divider = () => <div className="w-8 h-px bg-primary/15 my-2" />;

const cards = [
  { tag: "01", prefix: "Our", keyword: "Mission", desc: data.missionDesc },
  { tag: "02", prefix: "Our", keyword: "Vision",  desc: data.visionDesc  },
];

export default function MissionVision() {
  return (
    <section className="py-14 lg:py-20">
      <div className="px-2 lg:px-4">

        {/* heading row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-end mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <EyeBrow>What Drives Us</EyeBrow>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.05] text-primary font-[Montserrat]">
              Mission &{" "}
              <span className="text-fourth/80">Vision</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <Divider />
            <p className="text-third/70 text-[15px] leading-[1.9] font-[Poppins]">
              The principles behind everything we build and every decision we make.
            </p>
          </motion.div>
        </div>

        {/* cards */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-4"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {cards.map((card) => (
            <motion.div
              key={card.tag}
              variants={fadeUp}
              className="group flex flex-col gap-5 p-8 border border-third/10 rounded-2xl hover:border-primary/25 transition-all duration-300 hover:shadow-[0_10px_40px_-10px_rgba(230,230,230,0.15)]"
            >
              {/* tag + title */}
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-xl font-semibold font-[Montserrat]">
                  <span className="text-primary">{card.prefix} </span>
                  <span className="text-fourth">{card.keyword}</span>
                </h3>
                <span className="text-[11px] tracking-[0.25em] text-fourth/60 font-[Montserrat] font-bold mt-1 shrink-0">
                  {card.tag}
                </span>
              </div>

              {/* accent bar */}
              <div className="w-8 h-[2px] bg-fourth/50" />

              <p className="text-third/65 text-[13.5px] leading-[1.9] font-[Poppins]">
                {card.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}