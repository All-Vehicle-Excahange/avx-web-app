"use client";

import { motion } from "framer-motion";
import { Target, Eye } from "lucide-react";

const data = {
  missionTitle: "Our Mission",
  missionDesc: `Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec. Sapien platea nec urna ut est sed.
    Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec. Sapien platea nec urna ut est sed.
    Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec. Sapien platea nec urna ut est sed.
    Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec. Lorem ipsum dolor sit amet consectetur.
    Odio at dolor ut donec. Sapien platea nec urna ut est sed.`,
  missionImage: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&auto=format",

  visionTitle: "Our Vision",
  visionDesc: `Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec. Sapien platea nec urna ut est sed.
    Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec. Sapien platea nec urna ut est sed.
    Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec. Sapien platea nec urna ut est sed.
    Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec. Lorem ipsum dolor sit amet consectetur.
    Odio at dolor ut donec. Sapien platea nec urna ut est sed.`,
  visionImage: "https://images.unsplash.com/photo-1485291571150-772bcfc10da5?w=800&auto=format",
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

const items = [
  {
    tag: "01",
    prefix: "Our",
    keyword: "Mission",
    desc: data.missionDesc,
    image: data.missionImage,
    Icon: Target,
    flip: false,
  },
  {
    tag: "02",
    prefix: "Our",
    keyword: "Vision",
    desc: data.visionDesc,
    image: data.visionImage,
    Icon: Eye,
    flip: true,
  },
];

export default function MissionVision() {
  return (
    <section className="py-14 lg:py-20">
      <div className="px-5">

        {/* section heading */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-end mb-14">
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

        {/* alternating rows */}
        <div className="flex flex-col gap-6">
          {items.map((item) => {
            const { Icon } = item;
            return (
              <motion.div
                key={item.tag}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.65 }}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-0 border border-third/10 rounded-2xl overflow-hidden hover:border-primary/20 transition-colors duration-300 hover:shadow-[0_8px_36px_rgba(0,0,0,0.3)] ${
                  item.flip ? "lg:[&>*:first-child]:order-2 lg:[&>*:last-child]:order-1" : ""
                }`}
              >
                {/* image side */}
                <div className="relative overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.keyword}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                  {/* dark overlay + tag badge */}
                  <div className="absolute inset-0 bg-gradient-to-t from-secondary/60 to-transparent" />
                  <div className="absolute bottom-5 left-5 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl border border-fourth/50 bg-secondary/60 backdrop-blur-sm flex items-center justify-center">
                      <Icon size={15} className="text-fourth" />
                    </div>
                    <span className="font-[Montserrat] font-bold text-[10px] tracking-[0.28em] uppercase text-primary/60">
                      {item.tag}
                    </span>
                  </div>
                </div>

                {/* content side */}
                <div className="flex flex-col justify-center gap-5 p-8 lg:p-10">
                  <h3 className="text-2xl sm:text-3xl font-semibold font-[Montserrat] leading-[1.1]">
                    <span className="text-primary">{item.prefix} </span>
                    <span className="text-fourth">{item.keyword}</span>
                  </h3>
                  <div className="w-8 h-[2px] bg-fourth/50" />
                  <p className="text-third/65 text-[14px] leading-[1.95] font-[Poppins]">
                    {item.desc}
                  </p>
                </div>

              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}