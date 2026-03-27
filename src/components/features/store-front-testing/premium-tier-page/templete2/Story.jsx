"use client";

import { motion } from "framer-motion";

const data = {
  storyTitle: "Our Experience",
  storyText:
    "For over 12 years, Adarsh Auto Consultants has been helping buyers discover reliable vehicles across Gujarat.\n\nOur goal is to maintain a diverse vehicle inventory and provide accurate information so buyers can make confident decisions when purchasing their next vehicle.",

  storyImages: [
    "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=900&auto=format",
    "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=600&auto=format",
  ],
};

export default function Story() {
  return (
    <section className="py-20 bg-fourth">
      <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">

        {/* TEXT */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs tracking-[0.35em] uppercase text-primary/60 mb-4">
            Our Story
          </p>

          <h2 className="text-4xl lg:text-5xl font-semibold text-primary leading-[1.1] mb-6">
            Our <span className="text-secondary">Experience</span>
          </h2>

          <p className="text-primary/85 text-[15px] leading-[2] whitespace-pre-line max-w-md">
            {data.storyText}
          </p>
        </motion.div>

        {/* VISUAL */}
        <motion.div
          className="relative w-full h-[420px]"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >

          {/* MAIN IMAGE (dominant) */}
          <div className="absolute inset-0 overflow-hidden rounded-2xl">
            <img
              src={data.storyImages[0]}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>

          {/* SMALL FLOAT IMAGE (subtle accent only) */}
          <div className="absolute bottom-6 right-6 w-[140px] h-[100px] overflow-hidden border rounded-2xl border-white/20">
            <img
              src={data.storyImages[1]}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>

        </motion.div>

      </div>
    </section>
  );
}