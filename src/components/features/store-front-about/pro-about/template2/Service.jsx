"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Globe, TrendingUp, Cpu } from "lucide-react";

const iconMap = { ShieldCheck, Globe, TrendingUp, Cpu };

const data = {
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
  show: { transition: { staggerChildren: 0.1 } },
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

export default function Services() {
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
  );
}