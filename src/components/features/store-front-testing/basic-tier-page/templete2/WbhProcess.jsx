"use client";

import { motion } from "framer-motion";
import { Search, MessageCircle, ShieldCheck, Handshake } from "lucide-react";

const data = {
  processTitle:       "How Buying Works",
  processDescription: "Buying a vehicle through our storefront is designed to be simple, transparent, and convenient for buyers.",
  processSteps: [
    { title: "Discover Vehicles",     description: "Browse our inventory and shortlist vehicles that match your requirements.",                                               icon: Search        },
    { title: "Connect With Our Team", description: "Use AVX chat to discuss vehicle condition, pricing, and availability.",                                                  icon: MessageCircle },
    { title: "AVX Inspection Option", description: "Buyers can request AVX inspection to receive an independent condition report.",                                           icon: ShieldCheck   },
    { title: "Decision & Purchase",   description: "Once satisfied with the vehicle details and inspection, finalize the purchase directly with the consultant.",             icon: Handshake     },
  ],
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const stagger = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.1 } },
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


export default function Process() {
  return (
    <section className="py-12 lg:py-12">
      <div className="px-5">

        <div className="flex flex-col gap-3">
          <EyeBrow>Process</EyeBrow>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.05] text-primary">
            How Buying <span className="text-fourth/80">Works</span>
          </h2>
          <p className="text-third/60 text-[15px] font-[Poppins] leading-relaxed max-w-md">
            {data.processDescription}
          </p>
        </div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {data.processSteps.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={i}
                variants={fadeUp}
                className="group relative border mt-6 border-third/10 rounded-2xl p-7 flex flex-col gap-5 hover:border-primary/30 transition-all duration-300 hover:shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
              >
                <span className="font-[Montserrat] font-bold text-[11px] tracking-[0.18em] text-third/40 absolute top-5 right-5">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="w-10 h-10 border border-third/20 rounded-xl flex items-center justify-center shrink-0 group-hover:border-primary/30 transition-colors duration-300">
                  <Icon size={17} className="text-fourth" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="font-[Montserrat] font-semibold text-[13px] text-fourth mb-2">
                    {s.title}
                  </p>
                  <p className="font-[Poppins] text-[12px] text-third/65 leading-[1.8]">
                    {s.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}