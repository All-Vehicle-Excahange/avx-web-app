"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function Inspection() {
  const [activeIndex, setActiveIndex] = useState(0);

  const data = {
    inspectionTitle: "AVX Inspection Assurance",
    inspectionText:
      "AVX inspection services provide additional transparency by documenting key aspects of the vehicle's condition before purchase.",

    inspectionPoints: [
      {
        title: "Exterior condition check",
        image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=500&auto=format",
      },
      {
        title: "Interior condition check",
        image: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=500&auto=format",
      },
      {
        title: "Visible mechanical components",
        image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=500&auto=format",
      },
      {
        title: "Photo & video documentation",
        image: "https://images.unsplash.com/photo-1493238792000-8113da705763?w=500&auto=format",
      },
    ],
  };

  return (
    <section className="py-14 lg:py-14">
      <div className="pt-10 px-5">

        {/* HEADER */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-end mb-10">
          <div>
            <p className="text-sm tracking-[0.4em] uppercase text-third font-semibold mb-2">
              Inspection
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-primary">
              AVX Inspection <span className="text-fourth/80">Assurance</span>
            </h2>
          </div>

          <div>
            <div className="w-8 h-px bg-primary/15 my-2" />
            <p className="text-third/70 text-[15px] leading-[1.9]">
              {data.inspectionText}
            </p>
          </div>
        </div>

        {/* MAIN */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* LEFT — LIST */}
          <div className="border border-third/10 rounded-2xl overflow-hidden">
            {data.inspectionPoints.map((item, i) => (
              <div
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`flex justify-between items-center px-6 py-5 cursor-pointer transition ${
                  i === activeIndex
                    ? "bg-primary/5 border-l-4 border-fourth"
                    : "hover:bg-primary/3"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-bold text-fourth tracking-[0.2em]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-sm text-third/80">{item.title}</span>
                </div>

                <span className="text-[10px] uppercase font-bold text-primary">
                  View
                </span>
              </div>
            ))}
          </div>

          {/* RIGHT — SINGLE IMAGE */}
          <motion.div
            key={activeIndex}
            className="w-full h-[260px] rounded-xl overflow-hidden"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            <img
              src={data.inspectionPoints[activeIndex].image}
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </motion.div>

        </div>

      </div>
    </section>
  );
}