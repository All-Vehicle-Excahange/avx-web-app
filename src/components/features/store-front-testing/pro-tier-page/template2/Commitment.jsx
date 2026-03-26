"use client";

import { motion } from "framer-motion";

const data = {
  commitmentTitle: "Customer Commitment",
  commitmentText: `
    Our goal is to maintain transparent communication and assist buyers
    throughout the vehicle discovery and purchase process. We aim to
    provide honest guidance and reliable information for every buyer.
  `,
  commitmentImages: [
    "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=500&auto=format",
    "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=500&auto=format",
    "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=500&auto=format",
  ],
};

export default function Commitment() {
  return (
    <section className="py-14 lg:py-16 bg-fourth">
      <div className="px-5 max-w-5xl mx-auto text-center">

        {/* TEXT CENTERED */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-sm tracking-[0.4em] uppercase text-primary/60 font-semibold mb-3">
            Commitment
          </p>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-primary mb-5">
            Customer <span className="text-secondary">Commitment</span>
          </h2>

          <div className="w-10 h-px bg-primary/20 mx-auto my-4" />

          <p className="text-primary/90 text-[15px] leading-[1.9] max-w-5xl">
            {data.commitmentText}
          </p>
        </motion.div>

        {/* IMAGE STRIP */}
<motion.div
  className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.7, delay: 0.1 }}
>

  {data.commitmentImages.map((img, i) => {
    const isCenter = i === 1; // highlight middle image

    return (
      <div
        key={i}
        className={`
          relative rounded-xl overflow-hidden
          ${isCenter ? "lg:scale-105 lg:-translate-y-2 z-10" : ""}
        `}
      >
        <div className="w-full aspect-4/3">
          <img
            src={img}
            loading="lazy"
            className="w-full h-full object-cover transition duration-500 hover:scale-105"
          />
        </div>
      </div>
    );
  })}

</motion.div>

      </div>
    </section>
  );
}