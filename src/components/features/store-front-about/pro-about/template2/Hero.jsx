"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Globe, TrendingUp, Cpu, Target, Eye } from "lucide-react";

const iconMap = { ShieldCheck, Globe, TrendingUp, Cpu, Target, Eye };

const data = {
  /* ── HERO ── */
  heroTitle: "Our Story Built for Buy & Selling a Vehicle",
  heroDesc: `
    <p>
      Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec.
      Sapien platea nec urna ut est sed. Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec.
      Sapien platea nec urna ut est sed. Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec.
      Sapien platea nec urna ut est sed. Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec.
      Sapien platea nec urna ut est sed. Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec.
      Sapien platea nec urna ut est sed.
    </p>
  `,
  heroImages: [
    "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=800&auto=format&fit=crop",
  ],

  /* ── MISSION & VISION ── */
  missionTitle: "Our Mission",
  missionDesc: `Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec. Sapien platea nec urna ut est sed.
    Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec. Sapien platea nec urna ut est sed.
    Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec. Sapien platea nec urna ut est sed.
    Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec. Lorem ipsum dolor sit amet consectetur.
    Odio at dolor ut donec. Sapien platea nec urna ut est sed. Lorem ipsum dolor sit amet consectetur.
    Odio at dolor ut donec. Sapien platea nec`,
  missionImage:
    "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&auto=format",

  visionTitle: "Our Vision",
  visionDesc: `Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec. Sapien platea nec urna ut est sed.
    Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec. Sapien platea nec urna ut est sed.
    Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec. Sapien platea nec urna ut est sed.
    Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec. Lorem ipsum dolor sit amet consectetur.
    Odio at dolor ut donec. Sapien platea nec urna ut est sed. Lorem ipsum dolor sit amet consectetur.
    Odio at dolor ut donec. Sapien platea nec`,
  visionImage:
    "https://images.unsplash.com/photo-1485291571150-772bcfc10da5?w=800&auto=format",

  /* ── STATS ── */
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

  /* ── SERVICES ── */
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

const Divider = () => <div className="w-8 h-px bg-primary/15 my-2" />;

const missionVisionCards = [
  {
    tag: "01",
    icon: "Target",
    prefix: "Our",
    keyword: "Mission",
    desc: data.missionDesc,
    image: data.missionImage,
    flip: false,
  },
  {
    tag: "02",
    icon: "Eye",
    prefix: "Our",
    keyword: "Vision",
    desc: data.visionDesc,
    image: data.visionImage,
    flip: true,
  },
];

export default function AboutPage() {
  return (
    <>
      {/* ════════════════════════════════════════
          HERO
          ════════════════════════════════════════ */}
<section className="relative h-screen px-2 lg:px-4 overflow-hidden">

  {/* BACKGROUND IMAGE */}
  <div className="absolute inset-0">
    <img
      src={data.heroImages[0]}
      alt="Our story"
      className="w-full h-full object-cover object-center"
    />
    <div className="absolute inset-0 bg-black/50" />
  </div>

  <div className="container relative z-10 h-full flex flex-col justify-center">

    {/* heading + description (stacked) */}
    <div className="flex flex-col gap-6 max-w-2xl">

      <motion.div
        className="flex flex-col gap-5"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      >
        <EyeBrow>About Us</EyeBrow>

        <h1
          className="font-[Montserrat] font-bold text-white leading-[1.08]"
          style={{ fontSize: "clamp(30px, 4vw, 60px)" }}
        >
          Our Story Built for{" "}
          <span className="text-fourth">Buy &amp; Selling</span> a Vehicle
        </h1>

        <div className="w-10 h-0.5 bg-fourth/70" />
      </motion.div>

      {/* description */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.65,
          delay: 0.12,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <div
          className="font-[Poppins] text-[14px] text-white/80 leading-[1.9]"
          dangerouslySetInnerHTML={{ __html: data.heroDesc }}
        />
      </motion.div>

    </div>

  </div>
</section>

      {/* ════════════════════════════════════════
          MISSION & VISION
          ════════════════════════════════════════ */}
      <section className="py-12 px-2 lg:px-4">
        <div className="container">
          <div className="">
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
                  Mission &amp; <span className="text-fourth/80">Vision</span>
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
                  The principles behind everything we build and every decision
                  we make.
                </p>
              </motion.div>
            </div>

            {/* alternating rows */}
            <div className="flex flex-col gap-5">
              {missionVisionCards.map((item) => {
                const Icon = iconMap[item.icon];
                return (
                  <motion.div
                    key={item.tag}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.65 }}
                    className={`grid grid-cols-1 lg:grid-cols-2 gap-0 border border-third/10 rounded-2xl overflow-hidden
                    hover:border-primary/20 transition-colors duration-300 hover:shadow-[0_10px_40px_-10px_rgba(230,230,230,0.15)]
                    ${item.flip ? "lg:[&>*:first-child]:order-2 lg:[&>*:last-child]:order-1" : ""}`}
                  >
                    {/* image side */}
                    <div className="relative overflow-hidden min-h-[260px]">
                      <img
                        src={item.image}
                        alt={item.keyword}
                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-secondary/60 to-transparent" />
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
                      <div className="w-8 h-0.5 bg-fourth/50" />
                      <p className="text-third/65 text-[14px] leading-[1.95] font-[Poppins]">
                        {item.desc}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          STATS
          ════════════════════════════════════════ */}
      <section className="py-12  ">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className=" overflow-hidden bg-fourth"
        >
          <div className="container">
            <div className="px-2 lg:px-4">
              {/* ── TOP: heading + description ── */}
              <div className="grid grid-cols-1 lg:grid-cols-2 border-b border-primary/10">
                {/* left — eyebrow + title */}
                <div className="flex flex-col justify-center gap-5 py-14 lg:border-r border-primary/10">
                  <EyeBrow>By The Numbers</EyeBrow>
                  <h2
                    className="font-[Montserrat] font-bold text-primary leading-[1.08]"
                    style={{ fontSize: "clamp(28px, 3.5vw, 44px)" }}
                  >
                    Our Growth{" "}
                    <span className="text-secondary">in Numbers</span>
                  </h2>
                  <div className="w-8 h-px bg-primary/30" />
                </div>

                {/* right — statsDesc from json */}
                <div className="flex flex-col justify-center px-2 lg:px-4 py-14">
                  <div
                    className="font-[Poppins] text-[13.5px] text-primary/65 leading-[1.9]"
                    dangerouslySetInnerHTML={{ __html: data.statsDesc }}
                  />
                </div>
              </div>

              {/* ── BOTTOM: 4-col stat strip (unchanged) ── */}
              <div className="lg:px-4 grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-primary/10">
                {data.stats.map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: i * 0.08 }}
                    className="group relative flex flex-col gap-2 px-10 py-9 transition-colors duration-300 overflow-hidden"
                  >
                    {/* top accent line on hover */}
                    <div className="absolute top-0 left-0 right-0 h-0.5 bg-primary/0  transition-all duration-300" />

                    {/* step tag */}
                    <span className="absolute top-6 right-7 font-[Montserrat] font-bold text-[9px] tracking-[0.3em] uppercase text-primary/30">
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    <span
                      className="font-[Montserrat] font-bold text-primary leading-none"
                      style={{ fontSize: "clamp(30px, 3vw, 42px)" }}
                    >
                      {stat.number}
                    </span>
                    <span className="font-[Poppins] text-[11px] text-primary/55 uppercase tracking-widest font-medium">
                      {stat.label}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ════════════════════════════════════════
          SERVICES
          ════════════════════════════════════════ */}
      <section className="py-12 px-2 lg:px-4">
        {/* ── heading row — split with border ── */}
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2  mb-5">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="flex flex-col gap-4 pb-10 lg:pr-16 "
            >
              <EyeBrow>Services</EyeBrow>
              <h2
                className="font-[Montserrat] font-bold text-primary leading-[1.08]"
                style={{ fontSize: "clamp(28px, 3.5vw, 44px)" }}
              >
                What We <span className="text-fourth">Do</span>
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              viewport={{ once: true }}
              className="flex flex-col justify-center pb-10 lg:pl-16"
            >
              <p className="font-[Poppins] text-[13.5px] text-third/65 leading-[1.9]">
                {data.servicesDesc}
              </p>
            </motion.div>
          </div>

          {/* ── 2×2 pro cards ── */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 gap-[25px]"
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
                  className="group relative flex flex-col gap-5 p-7 border border-third/10 rounded-2xl overflow-hidden
                 transition-all duration-300 hover:shadow-[0_10px_40px_-10px_rgba(230,230,230,0.15)]"
                >
                  {/* top accent line on hover */}
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-transparent group-hover:bg-fourth transition-all duration-300" />

                  {/* icon + step */}
                  <div className="flex items-center justify-between">
                    <div className="w-[42px] h-[42px] rounded-xl border border-third/10 flex items-center justify-center group-hover:border-fourth/50 transition-colors duration-300">
                      <Icon size={17} className="text-fourth" />
                    </div>
                    <span className="font-[Montserrat] font-bold text-[9px] tracking-[0.2em] text-fourth/40">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>

                  {/* title */}
                  <h3 className="font-[Montserrat] font-semibold text-[15px] text-primary group-hover:text-fourth transition-colors duration-300">
                    {svc.title}
                  </h3>

                  {/* desc */}
                  <p className="font-[Poppins] text-[13px] text-third/65 leading-[1.8]">
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
