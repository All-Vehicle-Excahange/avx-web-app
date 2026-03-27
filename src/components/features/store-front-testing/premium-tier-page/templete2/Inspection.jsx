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
        image:
          "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=700&auto=format",
      },
      {
        title: "Interior condition check",
        image:
          "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=700&auto=format",
      },
      {
        title: "Visible mechanical components",
        image:
          "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=700&auto=format",
      },
      {
        title: "Photo & video documentation",
        image:
          "https://images.unsplash.com/photo-1493238792000-8113da705763?w=700&auto=format",
      },
    ],
  };

  return (
    <section className="py-16 lg:py-20">
      <div className="px-5">
        {/* HEADER */}
        <div className="grid lg:grid-cols-2 gap-10 mb-14">
          <div>
            <p className="text-sm tracking-[0.4em] uppercase text-third mb-3">
              Inspection
            </p>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-primary leading-[1.1]">
              AVX Inspection <br />
              <span className="text-fourth/80">Assurance</span>
            </h2>
          </div>

          <div className="flex items-end">
            <p className="text-third/70 text-[15px] leading-[1.9] max-w-md">
              {data.inspectionText}
            </p>
          </div>
        </div>

        {/* MAIN */}
<div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-12 items-center">

  {/* LEFT — BIG IMAGE */}
  <motion.div
    key={activeIndex}
    className="w-full h-[240px] sm:h-[300px] md:h-[340px] lg:h-[270px] rounded-2xl overflow-hidden"
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5 }}
  >
    <img
      src={data.inspectionPoints[activeIndex].image}
      loading="lazy"
      className="w-full h-full object-cover"
    />
  </motion.div>

  {/* RIGHT — STACKED TITLES */}
  <div className="flex flex-col gap-8">

    {data.inspectionPoints.map((item, i) => (
      <div
        key={i}
        onClick={() => setActiveIndex(i)}
        className="cursor-pointer group"
      >
        <div className="flex items-start gap-4">

          {/* number */}
          <span
            className={`text-[14px] font-bold ${
              i === activeIndex
                ? "text-fourth"
                : "text-primary/40 group-hover:text-primary"
            }`}
          >
            {String(i + 1).padStart(2, "0")}
          </span>

          {/* title */}
          <span
            className={`text-[16px] leading-[1.6] transition ${
              i === activeIndex
                ? "text-primary font-medium"
                : "text-primary/60 group-hover:text-primary"
            }`}
          >
            {item.title}
          </span>

        </div>

        {/* underline */}
        <div
          className={`mt-3 h-[1px] transition-all duration-300 ${
            i === activeIndex
              ? "bg-fourth w-full"
              : "bg-primary/10 w-0 group-hover:w-full"
          }`}
        />
      </div>
    ))}

  </div>

</div>
      </div>
    </section>
  );
}
