"use client";

import { motion } from "framer-motion";

const data = {
  selectionTitle: "Our Approach to Vehicle Selection",
  selectionDescription: `
    Every vehicle listed through our storefront goes through a basic
    internal evaluation before being presented to buyers. This helps
    ensure that vehicles listed are suitable for serious buyers and
    provides a smoother vehicle buying experience.
  `,
  selectionImages: [
    "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=700&auto=format",
    "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=600&auto=format",
    "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=600&auto=format",
  ],
};

export default function Selection() {
  return (
    <section className="py-14 lg:py-16">
      <div className="pt-10 grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center px-5">

        {/* LEFT — TEXT */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-sm tracking-[0.4em] uppercase text-third font-semibold mb-3">
            Selection
          </p>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.05] text-primary mb-5">
            Our Approach to <br />
            <span className="text-fourth/80">Vehicle Selection</span>
          </h2>

          <div className="w-10 h-px bg-primary/20 my-4" />

          <p className="text-third/70 text-[15px] leading-[1.9] whitespace-pre-line max-w-md">
            {data.selectionDescription}
          </p>
        </motion.div>

        {/* RIGHT — PREMIUM IMAGE COMPOSITION */}
        <motion.div
          className="relative w-full h-[320px] lg:h-[380px]"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >

          {/* MAIN IMAGE */}
          <div className="absolute top-0 left-0 w-[75%] h-full overflow-hidden">
            <img
              src={data.selectionImages[0]}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>

          {/* TOP RIGHT */}
          <div className="absolute top-0 right-0 w-[38%] h-[48%] overflow-hidden">
            <img
              src={data.selectionImages[1]}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>

          {/* BOTTOM RIGHT */}
          <div className="absolute bottom-0 right-0 w-[38%] h-[48%] overflow-hidden">
            <img
              src={data.selectionImages[2]}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>

        </motion.div>

      </div>
    </section>
  );
}