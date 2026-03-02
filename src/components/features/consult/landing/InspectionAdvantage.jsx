"use client";

import { motion } from "framer-motion";
import { FiSearch, FiShield, FiRefreshCcw } from "react-icons/fi";

const steps = [
  {
    icon: <FiSearch />,
    title: "Request Inspection",
    desc: "Submit vehicles for professional condition verification.",
  },
  {
    icon: <FiShield />,
    title: "Inspection Verified",
    desc: "Listings receive a verified trust signal badge.",
  },
  {
    icon: <FiRefreshCcw />,
    title: "Re-Inspection",
    desc: "Maintain accuracy with updated inspection signals.",
  },
];

export default function InspectionFlow() {
  return (
    <section className="py-24">

      <div className="max-w-[1480px] mx-auto w-full text-center">

        {/* HEADER */}
        <p className="text-sm tracking-[0.4em] uppercase text-third font-semibold mb-4">
          Inspection Advantage
        </p>

        <h2 className="mt-4 text-[34px] sm:text-[42px] md:text-[48px] font-semibold leading-tight text-primary">
          Build Trust with{" "}
          <span className="text-fourth font-bold">
            Inspection Visibility
          </span>
        </h2>

        <p className="mt-6 text-third max-w-2xl mx-auto text-[15px] leading-relaxed">
          A simple inspection workflow helps consultants build credibility and improve listing performance.
        </p>

        {/* FLOW */}
        <div className="relative mt-16">

          {/* LINE */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-px bg-[#1f2937]" />

          <div className="grid md:grid-cols-3 gap-10 relative">

            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="relative flex flex-col items-center text-center"
              >

                {/* STEP NUMBER */}
                <div className="absolute -top-6 text-[11px] text-third font-medium">
                  Step {i + 1}
                </div>

                {/* ICON CIRCLE */}
                <div className="relative z-10 w-14 h-14 rounded-full bg-[#0f1117] border border-[#1f2937] flex items-center justify-center text-fourth shadow-md">
                  {step.icon}
                </div>

                {/* CONTENT */}
                <div className="mt-6 max-w-xs">
                  <h3 className="text-[16px] font-semibold text-primary">
                    {step.title}
                  </h3>

                  <p className="mt-2 text-[13px] text-third leading-relaxed">
                    {step.desc}
                  </p>
                </div>

              </motion.div>
            ))}

          </div>
        </div>

        {/* FOOT TEXT */}
        <p className="mt-14 text-primary font-medium max-w-2xl mx-auto text-[15px] leading-relaxed">
          Vehicles with inspection transparency consistently perform better in search visibility and attract more serious buyers.
        </p>

      </div>
    </section>
  );
}
