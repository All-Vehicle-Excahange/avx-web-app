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
    "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=500&auto=format",
    "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=500&auto=format",
    "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=500&auto=format",
  ],
};

export default function Selection() {
  return (
    <section className="py-12 lg:py-12">
      <div className="pt-10 grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center px-5">
        {/* LEFT — TEXT */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-sm tracking-[0.4em] uppercase text-third font-semibold mb-2">
            Selection
          </p>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.05] text-primary mb-5">
            Our Approach to <br />
            <span className="text-fourth/80">Vehicle Selection</span>
          </h2>

          <div className="w-8 h-px bg-primary/15 my-3" />

          <p className="text-third/70 text-[15px] leading-[1.9] whitespace-pre-line">
            {data.selectionDescription}
          </p>
        </motion.div>

        <motion.div
          className=" p-3 rounded-2xl w-full h-full"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="grid grid-cols-3 gap-3 w-full h-full">
            {/* MAIN IMAGE */}
            <div className="col-span-2 aspect-4/3 rounded-xl overflow-hidden">
              <img
                src={data.selectionImages[0]}
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>

            {/* SIDE STACK */}
            <div className="flex flex-col gap-3">
              {data.selectionImages.slice(1, 3).map((img, i) => (
                <div
                  key={i}
                  className="aspect-4/3 rounded-xl overflow-hidden"
                >
                  <img src={img} loading="lazy" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
