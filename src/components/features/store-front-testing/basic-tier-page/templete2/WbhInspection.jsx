"use client";

import { motion } from "framer-motion";

const data = {
  inspectionTitle:  "AVX Inspection Assurance",
  inspectionText:   "AVX inspection services provide additional transparency by documenting key aspects of the vehicle's condition before purchase.",
  inspectionPoints: [
    "Exterior condition check",
    "Interior condition check",
    "Visible mechanical components",
    "Photo & video documentation",
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

const Divider = () => <div className="w-8 h-px bg-primary/15 my-2" />;


export default function Inspection() {
  return (
    <section className="py-14 lg:py-14">
      <div className="pt-10 px-5">

        {/* heading row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-end mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <EyeBrow>Inspection</EyeBrow>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.05] text-primary font-[Montserrat]">
              AVX Inspection <span className="text-fourth/80">Assurance</span>
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
              {data.inspectionText}
            </p>
          </motion.div>
        </div>

        {/* 2×2 tick cards left + table right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 items-stretch">

          {/* left — 2×2 grid */}
          <motion.div
            className="grid grid-cols-2 gap-3"
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {data.inspectionPoints.map((pt) => (
              <motion.div
                key={pt}
                variants={fadeUp}
                className="group flex flex-col gap-4 p-6 border border-third/10 rounded-2xl hover:border-primary/25 transition-all duration-300 hover:shadow-[0_6px_28px_rgba(0,0,0,0.35)]"
              >
                {/* blue tick — only blue usage in component */}
                <div className="w-8 h-8 rounded-lg border-[1.5px] border-fourth flex items-center justify-center shrink-0">
                  <svg width="12" height="10" viewBox="0 0 10 8" fill="none">
                    <path d="M1 4L3.8 7L9 1" stroke="#007bff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span className="font-[Poppins] text-sm text-third/70 leading-[1.7] group-hover:text-primary/80 transition-colors duration-300">
                  {pt}
                </span>
              </motion.div>
            ))}
          </motion.div>

          {/* right — table card */}
          <motion.div
            className="border border-third/10 rounded-2xl overflow-hidden hover:border-primary/25 transition-all duration-300 hover:shadow-[0_8px_40px_rgba(0,0,0,0.4)]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            viewport={{ once: true }}
          >
            <div className="px-6 py-5 border-b border-primary/[0.07] flex items-center justify-between">
              <p className="font-[Montserrat] font-bold text-[9px] tracking-[0.26em] uppercase text-primary/50">
                What's Covered
              </p>
              <span className="font-[Montserrat] font-bold text-[9px] tracking-[0.16em] uppercase text-primary">
                Status
              </span>
            </div>
            {data.inspectionPoints.map((pt, i, arr) => (
              <motion.div
                key={pt}
                className={`flex justify-between items-center px-6 py-[18px] transition-colors duration-150 hover:bg-primary/4 ${i < arr.length - 1 ? "border-b border-primary/6" : ""}`}
                initial={{ opacity: 0, x: 10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + i * 0.07 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-3">
                  <span className="font-[Montserrat] font-bold text-[10px] tracking-[0.14em] text-fourth">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-[Poppins] text-sm text-third/70">{pt}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-fourth" />
                  <span className="font-[Montserrat] font-bold text-[9px] tracking-[0.16em] uppercase text-primary">
                    Included
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
}