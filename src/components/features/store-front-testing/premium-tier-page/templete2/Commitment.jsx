"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const data = {
  commitmentTitle: "Customer Commitment",
  commitmentText: `
    Our goal is to maintain transparent communication and assist buyers
    throughout the vehicle discovery and purchase process. We aim to
    provide honest guidance and reliable information for every buyer.
  `,
  commitmentImages: [
    "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&auto=format",
    "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=600&auto=format",
    "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=600&auto=format",
  ],
};

export default function Commitment() {
  const [active, setActive] = useState(1);

  return (
    <section className="py-16 lg:py-20 bg-fourth">
      <div className=" max-w-6xl mx-auto grid lg:grid-cols-2 gap-5 items-center">

        {/* LEFT — TEXT */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-md"
        >
          <p className="text-xs tracking-[0.35em] uppercase text-primary/60 mb-4">
            Commitment
          </p>

          <h2 className="text-4xl lg:text-5xl font-semibold text-primary leading-[1.1] mb-6">
            Customer <span className="text-secondary">Commitment</span>
          </h2>

          <p className="text-primary/90 text-[15px] leading-loose whitespace-pre-line">
            {data.commitmentText}
          </p>
        </motion.div>

        {/* RIGHT — INTERACTIVE IMAGES */}
        <div className="flex gap-3 h-80">

          {data.commitmentImages.map((img, i) => {
            const isActive = i === active;

            return (
              <motion.div
                key={i}
                onMouseEnter={() => setActive(i)}
                className="relative overflow-hidden rounded-2xl cursor-pointer transition-all duration-500"
                style={{
                  flex: isActive ? 3 : 1,
                }}
              >
                <img
                  src={img}
                  className="w-full h-full object-cover transition duration-700"
                  loading="lazy"
                />

                {/* subtle overlay */}
                <div
                  className={`absolute inset-0 transition duration-500 ${
                    isActive ? "bg-black/10" : "bg-black/30"
                  }`}
                />
              </motion.div>
            );
          })}

        </div>

      </div>
    </section>
  );
}