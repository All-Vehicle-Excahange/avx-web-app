"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const items = [
  {
    title: "Independent Car Consultants",
    desc: "Solo automotive professionals looking to build a stronger digital presence and generate qualified leads.",
    img: "/consultant.webp",
  },
  {
    title: "Multi-Vehicle Dealerships",
    desc: "Dealerships managing multiple listings who need structured visibility and performance tracking.",
    img: "/dealership.webp",
  },
  {
    title: "Growing Automotive Businesses",
    desc: "Businesses expanding operations and looking to scale visibility across cities and categories.",
    img: "/business.png",
  },
  {
    title: "City-Level Operators",
    desc: "Local automotive operators targeting regional markets with verified listings and insights.",
    img: "/car-operator.webp",
  },
];

export default function WhoItsFor() {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleToggle = (i) => {
    setActiveIndex(activeIndex === i ? null : i);
  };

  return (
    <section className="relative py-10 overflow-hidden">
      <div className="relative z-10 max-w-[1440px] mx-auto w-full">

        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-[28px] sm:text-[34px] md:text-[40px] lg:text-[44px] font-semibold leading-tight tracking-tight text-primary">
            Built for{" "}
            <span className="text-fourth font-bold">
              Professional Automotive Consultants
            </span>
          </h2>

          <p className="text-third mt-5 text-[15px] md:text-[16px] max-w-xl mx-auto leading-relaxed">
            If you sell vehicles seriously, AVX is structured for scale.
          </p>
        </div>

        {/* CARDS */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item, i) => {
            const isActive = activeIndex === i;

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                viewport={{ once: true }}
                onClick={() => handleToggle(i)}
                className="group relative rounded-2xl overflow-hidden border border-[#1f2937] h-80 cursor-pointer hover:shadow-[0_10px_40px_-10px_rgba(230,230,230,0.15)]"
              >
                {/* IMAGE */}
                <div
                  className="absolute inset-0 bg-cover bg-center scale-105 group-hover:scale-110 transition duration-700"
                  style={{ backgroundImage: `url(${item.img})` }}
                />

                {/* DEFAULT OVERLAY */}
                <div className="absolute inset-0 bg-linear-to-t from-secondary via-secondary/60 to-transparent" />

                {/* SLIDE OVERLAY */}
                <div
                  className={`absolute inset-0 bg-[#0f1117]/90 transition-transform duration-500 ease-out flex flex-col justify-end p-6
                  ${isActive ? "translate-y-0" : "translate-y-full"}
                  lg:group-hover:translate-y-0`}
                >
                  <h3 className="text-lg font-semibold text-fourth mb-2">
                    {item.title}
                  </h3>

                  <p className="text-[13px] text-third leading-relaxed mb-4">
                    {item.desc}
                  </p>

                  <div className="w-12 h-[2] bg-fourth opacity-80" />
                </div>

                {/* DEFAULT TITLE */}
                <div className="relative h-full p-6 flex flex-col justify-end pointer-events-none">
                  <h3
                    className={`text-lg font-semibold text-primary transition duration-300
                    ${isActive ? "opacity-0" : "opacity-100"}
                    lg:group-hover:opacity-0`}
                  >
                    {item.title}
                  </h3>

                  <div
                    className={`w-10 h-[2] bg-fourth mt-3 opacity-70 transition duration-300
                    ${isActive ? "opacity-0" : "opacity-70"}
                    lg:group-hover:opacity-0`}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}