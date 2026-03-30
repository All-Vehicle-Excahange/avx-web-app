"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Globe, TrendingUp, Cpu } from "lucide-react";

const iconMap = { ShieldCheck, Globe, TrendingUp, Cpu };
const data = {
  heroTitle: "Our Story Built for Buy & Selling a Vehicle",
  heroDesc: `Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec.
    Sapien platea nec urna ut est sed. Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec.
    Sapien platea nec urna ut est sed. Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec.
    Sapien platea nec urna ut est sed. Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec.
    Sapien platea nec urna ut est sed. Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec.
    Sapien platea nec urna ut est sed.`,
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
  servicesTitle: "What We Do",
  servicesDesc: `Enterprise-grade digital products designed to scale globally with security, speed and reliability.`,

  services: [
    {
      icon: "ShieldCheck",
      title: "Secure Payments",
      desc: "PCI-DSS compliant global payment systems.",
    },
    {
      icon: "Globe",
      title: "Global Infrastructure",
      desc: "99.99% uptime cloud deployment in 12 regions.",
    },
    {
      icon: "TrendingUp",
      title: "Growth Tools",
      desc: "Smart CRM, analytics and automation funnels.",
    },
    {
      icon: "Cpu",
      title: "AI Optimization",
      desc: "AI powered performance & conversion engines.",
    },
  ],
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

// const EyeBrow = ({ children }) => (
//   <motion.p
//     className="text-sm tracking-[0.4em] uppercase text-third font-semibold font-[Montserrat] mb-2"
//     initial={{ opacity: 0 }}
//     whileInView={{ opacity: 1 }}
//     viewport={{ once: true }}
//   >
//     {children}
//   </motion.p>
// );

const Divider = () => <div className="w-8 h-px bg-primary/15 my-2" />;

const cards = [
  { tag: "01", prefix: "Our", keyword: "Mission", desc: data.missionDesc },
  { tag: "02", prefix: "Our", keyword: "Vision", desc: data.visionDesc },
];

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
    <>
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
                Mission & <span className="text-fourth/80">Vision</span>
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
                The principles behind everything we build and every decision we
                make.
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
                <div className="w-8 h-0.5 bg-fourth/50" />

                <p className="text-third/65 text-[13.5px] leading-[1.9] font-[Poppins]">
                  {card.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

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
                <span className="text-[12px] text-primary/70 font-[Poppins] leading-normal">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

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
              <EyeBrow>Services</EyeBrow>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.05] text-primary font-[Montserrat]">
                What We <span className="text-fourth/80">Do</span>
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
                {data.servicesDesc}
              </p>
            </motion.div>
          </div>

          {/* 2×2 service cards */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {data.services.map((svc, i) => {
              const Icon = iconMap[svc.icon];
              return (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className="group flex flex-col gap-5 p-7 border border-third/10 rounded-2xl hover:border-primary/25 transition-all duration-300 hover:shadow-[0_10px_40px_-10px_rgba(230,230,230,0.15)]"
                >
                  {/* icon + step number row */}
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl border border-third/10 flex items-center justify-center group-hover:border-fourth/40 transition-colors duration-300">
                      <Icon size={17} className="text-fourth" />
                    </div>
                    <span className="font-[Montserrat] font-bold text-[10px] tracking-[0.2em] text-fourth/50">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>

                  {/* title */}
                  <h3 className="text-[15px] font-semibold text-primary font-[Montserrat] group-hover:text-fourth transition-colors duration-300">
                    {svc.title}
                  </h3>

                  {/* desc */}
                  <p className="text-third/65 text-[13px] leading-[1.8] font-[Poppins]">
                    {svc.desc}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>
    </>
  );
}
