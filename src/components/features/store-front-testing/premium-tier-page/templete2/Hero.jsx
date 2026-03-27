"use client";

import { motion } from "framer-motion";

const data = {
  heroTitle: "Why Choose Adarsh Auto Consultants",
  heroDescription:
    "Buyers trust Adarsh Auto Consultants for transparent communication, reliable vehicle options, and a smooth buying experience.",

  video:
    "https://cdn.coverr.co/videos/coverr-a-black-sports-car-driving-fast-5176/1080p.mp4",
};

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/store-front-template2.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-black/55" />

      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />

      <div className="relative z-10 w-full px-6 lg:px-14 max-w-6xl">
        <motion.div
          className="max-w-xl"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className=" sm:text-4xl lg:text-5xl font-semibold leading-[1.05] text-primary font-[Montserrat] mb-6">
            Why Choose <span className="text-fourth">Adarsh</span> Auto
            Consultants
          </h1>

          <p className="text-white/80 leading-[1.9] text-[15px]">
            {data.heroDescription}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
