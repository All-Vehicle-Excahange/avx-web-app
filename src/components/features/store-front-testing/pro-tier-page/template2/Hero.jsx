"use client";

import { motion } from "framer-motion";

const data = {
  heroTitle: "Why Choose Adarsh Auto Consultants",
  heroDescription:
    "Buyers trust Adarsh Auto Consultants for transparent communication, reliable vehicle options, and a smooth buying experience.",

  heroImages: [
    "https://images.unsplash.com/photo-1550355291-bbee04a92027?w=500&auto=format",
    "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=500&auto=format",
    "https://images.unsplash.com/photo-1493238792000-8113da705763?w=500&auto=format",
    "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=500&auto=format",
    "https://images.unsplash.com/photo-1550355291-bbee04a92027?w=500&auto=format",
  ],
};

// kept outside component — stable references, no recompute on render
const rotations = [-6, 8, 4, -5, 10];

const desktopPositions = [
  { top: "20px",   left: "20px"  },
  { top: "30px",   right: "40px" },
  { top: "200px",  left: "0px"   },
  { bottom: "10px", left: "160px" },
  { bottom: "120px", right: "30px" },
];

export default function Hero() {
  return (
    <section className="relative flex items-center justify-center overflow-hidden min-h-screen py-12">
      <div className="w-full px-6 sm:px-10 lg:px-14 grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

        {/* LEFT CONTENT */}
        <div>
          <motion.h1
            className="text-[clamp(28px,5vw,54px)] font-bold leading-[1.15] text-primary mb-5"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            Why Choose <span className="text-fourth">Adarsh</span> Auto Consultants
          </motion.h1>

          <motion.p
            className="text-third/70 text-[15px] leading-[1.9]"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {data.heroDescription}
          </motion.p>
        </div>

        {/* RIGHT */}
        <div className="w-full">

          {/* ── MOBILE: 2-col polaroid grid (hidden on lg+) ── */}
          <div className="grid grid-cols-2 gap-3 lg:hidden pt-2 pb-4">
            {data.heroImages.map((src, i) => (
              <motion.div
                key={i}
                className={i === 2 ? "col-span-2" : "col-span-1"}
                initial={{ opacity: 0, y: 20, scale: 0.92 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                viewport={{ once: true }}
              >
                <div
                  className="bg-white rounded-xs"
                  style={{
                    padding: "6px 6px 22px",
                    boxShadow: "0 4px 18px rgba(0,0,0,0.12), 0 1px 3px rgba(0,0,0,0.07)",
                    transform: `rotate(${rotations[i] * 0.4}deg)`,
                  }}
                >
                  <img
                    src={src}
                    alt="car"
                    loading="lazy"
                    className="w-full object-cover rounded-[1px] block"
                    style={{ height: i === 2 ? "140px" : "110px" }}
                  />
                </div>
              </motion.div>
            ))}
          </div>

          {/* ── DESKTOP: absolute scatter board (hidden below lg) ── */}
          <div className="relative h-[480px] hidden lg:block">
            {data.heroImages.map((src, i) => (
              <motion.div
                key={i}
                className="absolute cursor-pointer"
                style={{ ...desktopPositions[i], zIndex: 5 + i }}
                initial={{ opacity: 0, y: 30, scale: 0.9, rotate: rotations[i] - 3 }}
                whileInView={{ opacity: 1, y: 0, scale: 1, rotate: rotations[i] }}
                whileHover={{
                  scale: 1.06,
                  rotate: rotations[i] * 0.25,
                  zIndex: 20,
                  y: -6,
                  transition: { duration: 0.25, ease: "easeOut" },
                }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 0.68, 0, 1.2] }}
                viewport={{ once: true }}
              >
                <div
                  className="bg-white rounded-xs w-[180px]"
                  style={{
                    padding: "7px 7px 26px",
                    boxShadow: "0 6px 28px rgba(0,0,0,0.14), 0 1px 4px rgba(0,0,0,0.07)",
                  }}
                >
                  <img
                    src={src}
                    alt="car"
                    loading="lazy"
                    className="w-full h-[120px] object-cover rounded-[1px] block"
                  />
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}