"use client";
import { motion } from "framer-motion";
const data = {
  /* ── HERO ── */
  aboutHeroTitle: "Our Story Built for Buy & Selling a Vehicle",
  aboutHeroDescription: `
    <p>
      Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec.
      Sapien platea nec urna ut est sed. Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec.
      Sapien platea nec urna ut est sed. Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec.
      Sapien platea nec urna ut est sed. Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec.
      Sapien platea nec urna ut est sed. Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec.
      Sapien platea nec urna ut est sed.
    </p>
  `,
  aboutHeroTemplate1: { id: 1, imageUrl: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1200&auto=format&fit=crop" },
  aboutHeroTemplate2: { id: 2, imageUrl: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&auto=format&fit=crop" },
  aboutHeroTemplate3: { id: 3, imageUrl: "https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=800&auto=format&fit=crop" },
  /* ── MISSION ── */
  aboutMissionTitle: "Our Mission",
  aboutMissionDescription: `Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec. Sapien platea nec urna ut est sed.
    Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec. Sapien platea nec urna ut est sed.
    Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec. Sapien platea nec urna ut est sed.
    Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec. Lorem ipsum dolor sit amet consectetur.
    Odio at dolor ut donec. Sapien platea nec urna ut est sed. Lorem ipsum dolor sit amet consectetur.
    Odio at dolor ut donec. Sapien platea nec`,
  aboutMissionTemplate1: { id: 1, imageUrl: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&auto=format" },
  /* ── VISION ── */
  aboutVisionTitle: "Our Vision",
  aboutVisionDescription: `Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec. Sapien platea nec urna ut est sed.
    Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec. Sapien platea nec urna ut est sed.
    Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec. Sapien platea nec urna ut est sed.
    Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec. Lorem ipsum dolor sit amet consectetur.
    Odio at dolor ut donec. Sapien platea nec urna ut est sed. Lorem ipsum dolor sit amet consectetur.
    Odio at dolor ut donec. Sapien platea nec`,
  aboutVisionTemplate1: { id: 1, imageUrl: "https://images.unsplash.com/photo-1485291571150-772bcfc10da5?w=800&auto=format" },
  /* ── STATS ── */
  aboutStatsDescription: `Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec. Sapien platea nec urna ut est sed.
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
  aboutServicesTitle: "What We Do",
  aboutServicesDescription: `Enterprise-grade digital products designed to scale globally with security, speed and reliability.`,
  services: [
    {
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>`,
      title: "Secure Payments",
      desc: "PCI-DSS compliant global payment systems.",
    },
    {
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`,
      title: "Global Infrastructure",
      desc: "99.99% uptime cloud deployment in 12 regions.",
    },
    {
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>`,
      title: "Growth Tools",
      desc: "Smart CRM, analytics and automation funnels.",
    },
    {
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/></svg>`,
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
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>`,
    prefix: "Our",
    keyword: "Mission",
    title: data.aboutMissionTitle,
    desc: data.aboutMissionDescription,
    image: data.aboutMissionTemplate1.imageUrl,
    flip: false,
  },
  {
    tag: "02",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`,
    prefix: "Our",
    keyword: "Vision",
    title: data.aboutVisionTitle,
    desc: data.aboutVisionDescription,
    image: data.aboutVisionTemplate1.imageUrl,
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
            src={data.aboutHeroTemplate1.imageUrl}
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
                {data.aboutHeroTitle}
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
                dangerouslySetInnerHTML={{ __html: data.aboutHeroDescription }}
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
                  The principles behind everything we build and every decision
                  we make.
                </p>
              </motion.div>
            </div>
            {/* alternating rows */}
            <div className="flex flex-col gap-5">
              {missionVisionCards.map((item) => {
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
                          <span className="text-fourth" dangerouslySetInnerHTML={{ __html: item.icon }} />
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
                    dangerouslySetInnerHTML={{ __html: data.aboutStatsDescription }}
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
                {data.aboutServicesTitle}
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
                {data.aboutServicesDescription}
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
                      <span className="text-fourth" dangerouslySetInnerHTML={{ __html: svc.icon }} />
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