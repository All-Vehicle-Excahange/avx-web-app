"use client";

import { ShieldCheck, Globe, TrendingUp, Cpu } from "lucide-react";

const iconMap = { ShieldCheck, Globe, TrendingUp, Cpu };

const data = {
  heroTitle: "Our Story Built for Buy & Selling a Vehicle",
  heroDescription: `Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec.
    Sapien platea nec urna ut est sed. Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec.
    Sapien platea nec urna ut est sed. Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec.
    Sapien platea nec urna ut est sed. Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec.
    Sapien platea nec urna ut est sed. Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec.
    Sapien platea nec urna ut est sed.`,
  missionTitle: "Our Mission",
  missionDesc: `
    <p>
      Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec. Sapien platea nec urna ut est sed.
      Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec. Sapien platea nec urna ut est sed.
      Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec. Sapien platea nec urna ut est sed.
      Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec. Lorem ipsum dolor sit amet consectetur.
      Odio at dolor ut donec. Sapien platea nec urna ut est sed. Lorem ipsum dolor sit amet consectetur.
      Odio at dolor ut donec. Sapien platea nec
    </p>
  `,
  visionTitle: "Our Vision",
  visionDesc: `
    <p>
      Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec. Sapien platea nec urna ut est sed.
      Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec. Sapien platea nec urna ut est sed.
      Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec. Sapien platea nec urna ut est sed.
      Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec. Lorem ipsum dolor sit amet consectetur.
      Odio at dolor ut donec. Sapien platea nec urna ut est sed. Lorem ipsum dolor sit amet consectetur.
      Odio at dolor ut donec. Sapien platea nec
    </p>
  `,
  stats: [
    { number: "150K+", label: "Active Users Worldwide" },
    { number: "$2B+", label: "Transactions Processed" },
    { number: "98%", label: "Customer Satisfaction" },
    { number: "100+", label: "Team Members" },
  ],
  servicesTitle: "What We Do",
  servicesDesc: `
    <p>
      Enterprise-grade digital products designed to scale globally with security, speed and reliability.
    </p>
  `,
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
  <p className="text-sm tracking-[0.4em] uppercase text-third font-semibold font-[Montserrat] mb-4">
    {children}
  </p>
);

export default function AboutHero() {
  return (
    <>
      <section className="relative flex items-center justify-center min-h-screen py-14 lg:py-24">
        <div className="container">
        <div className="px-5 flex flex-col items-center text-center gap-6 max-w-3xl mx-auto">
          <div>
            <EyeBrow>About Us</EyeBrow>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.1] text-primary font-[Montserrat]">
              Our Story Built for{" "}
              <span className="text-fourth/80">Buy & Selling</span> a Vehicle
            </h1>
          </div>

          {/* center divider */}
          <div className="w-10 h-px bg-primary/15"/>

          <p className="text-third/70 text-[15px]  leading-[1.9] font-[Poppins]">
            {data.heroDescription}
          </p>
        </div>
        </div>
      </section>

      <section className="py-14 lg:py-20">
          <div className="container">
        <div className="px-2 lg:px-4">
          {/* heading row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-end mb-12">
            <div>
              <EyeBrow>What Drives Us</EyeBrow>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.05] text-primary font-[Montserrat]">
                Mission & <span className="text-fourth/80">Vision</span>
              </h2>
            </div>

            <div >
              <Divider />
              <p className="text-third/70 text-[15px] leading-[1.9] font-[Poppins]">
                The principles behind everything we build and every decision we
                make.
              </p>
            </div>
          </div>

          {/* cards */}
          <div
            className="grid grid-cols-1 lg:grid-cols-2 gap-4" >
            {cards.map((card, index) => (
              <div key={index}  className="group flex flex-col gap-5 p-8 border border-third/10 rounded-2xl hover:border-primary/25 transition-all duration-300 hover:shadow-[0_10px_40px_-10px_rgba(230,230,230,0.15)]">
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
              </div>
            ))}
          </div>
        </div>
        </div>
      </section>

      <section className="py-12 lg:py-16 bg-fourth">
          <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center px-2 lg:px-4">
          {/* left — desc */}
          <div>
            <EyeBrow>By The Numbers</EyeBrow>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.05] text-primary font-[Montserrat] mb-4">
              Our Growth <span className="text-secondary">in Numbers</span>
            </h2>
            <Divider />
            <p className="text-primary/80 text-[15px] leading-[1.9] font-[Poppins]">
              {data.statsDesc}
            </p>
          </div>

          {/* right — 2×2 stat grid */}
          <div className="grid grid-cols-2 gap-3">
            {data.stats.map((stat, i) => (
              <div
                key={i}
                className="group flex flex-col gap-2 p-6 border border-primary/20 rounded-2xl hover:border-primary/40 hover:bg-primary/5 transition-all duration-300"
              >
                <span className="text-3xl font-bold text-primary font-[Montserrat]">
                  {stat.number}
                </span>
                <span className="text-[12px] text-primary/70 font-[Poppins] leading-normal">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
        </div>
      </section>

      <section className="py-14 lg:py-20">
          <div className="container">
        <div className="px-2 lg:px-4">
          {/* heading row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-end mb-12">
            <div>
              <EyeBrow>Services</EyeBrow>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.05] text-primary font-[Montserrat]">
                What We <span className="text-fourth/80">Do</span>
              </h2>
            </div>

            <div>
              <Divider />
              <p className="text-third/70 text-[15px] leading-[1.9] font-[Poppins]">
                {data.servicesDesc}
              </p>
            </div>
          </div>

          {/* 2×2 service cards */}
          <div
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            variants={stagger} >
            {data.services.map((svc, i) => {
              const Icon = iconMap[svc.icon];
              return (
                <div
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
                </div>
              );
            })}
          </div>
        </div>
        </div>
      </section>
    </>
  );
}
