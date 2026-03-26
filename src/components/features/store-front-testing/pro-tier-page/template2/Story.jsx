"use client";

import { motion } from "framer-motion";

const data = {
  storyTitle: "Our Experience",
  storyText:
    "For over 12 years, Adarsh Auto Consultants has been helping buyers discover reliable vehicles across Gujarat.\n\nOur goal is to maintain a diverse vehicle inventory and provide accurate information so buyers can make confident decisions when purchasing their next vehicle.",

  storyImages: [
    "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=500&auto=format",
    "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=500&auto=format",
    "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=500&auto=format",
    "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=500&auto=format",
  ],
};

export default function Story() {
  return (
    <section className="py-12 lg:py-12 bg-fourth">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center px-10">

        {/* LEFT — TEXT */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-sm tracking-[0.4em] uppercase text-primary/60 font-semibold mb-2">
            Our Story
          </p>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.05] text-primary mb-5">
            Our <span className="text-secondary">Experience</span>
          </h2>

          <p className="text-primary/90 text-[15px] leading-[1.9] whitespace-pre-line">
            {data.storyText}
          </p>
        </motion.div>

        {/* RIGHT — IMAGE GRID */}
<motion.div
  className="flex flex-col gap-4"
  initial={{ opacity: 0, x: 20 }}
  whileInView={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.7 }}
>

  <div className="w-full h-40 rounded-xl overflow-hidden">
    <img
      src={data.storyImages[0]}
      loading="lazy"
      className="w-full h-full object-cover"
    />
  </div>

  {data.storyImages[1] && (
    <div className="w-full h-40 rounded-xl overflow-hidden">
      <img
        src={data.storyImages[1]}
        loading="lazy"
        className="w-full h-full object-cover"
      />
    </div>
  )}

</motion.div>
            
      </div>
    </section>
  );
}