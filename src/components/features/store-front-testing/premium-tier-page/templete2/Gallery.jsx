"use client";
import { motion } from "framer-motion";

const data = {
  galleryTitle: "Our Showroom & Team",
  galleryImages: [
    "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&auto=format",
    "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=600&auto=format",
    "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=600&auto=format",
    "https://images.unsplash.com/photo-1515168833906-d2a3b82b302a?w=600&auto=format",
    "https://images.unsplash.com/photo-1550355291-bbee04a92027?w=600&auto=format",
  ],
};

export default function Gallery() {
  return (
    <section className="py-16 lg:py-20">
      <div className="px-5">

        {/* HEADER */}
        <div className="flex flex-col gap-3 mb-14">
          <p className="text-sm tracking-[0.4em] uppercase text-third font-semibold">
            Gallery
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-primary">
            Our Showroom <span className="text-fourth/80">& Team</span>
          </h2>
        </div>

        {/* MOSAIC */}
        <div className="flex flex-col gap-3 lg:grid lg:grid-cols-12 lg:grid-rows-[400px_220px] lg:gap-3">

          {/* HERO */}
          <motion.div
            className="relative overflow-hidden rounded-2xl h-[300px] lg:h-auto lg:col-span-6 lg:row-span-2"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <img
              src={data.galleryImages[0]}
              className="absolute inset-0 w-full h-full object-cover transition duration-500 hover:scale-105"
              loading="lazy"
            />
          </motion.div>

          {/* TOP RIGHT PAIR */}
          <div className="flex gap-3 lg:contents">

            <motion.div
              className="relative overflow-hidden rounded-2xl h-[180px] flex-1 lg:h-auto lg:col-span-4 lg:row-span-1"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              <img
                src={data.galleryImages[1]}
                className="absolute inset-0 w-full h-full object-cover transition duration-500 hover:scale-105"
                loading="lazy"
              />
            </motion.div>

            <motion.div
              className="relative overflow-hidden rounded-2xl h-[180px] w-[30%] lg:h-auto lg:w-auto lg:col-span-2 lg:row-span-1"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15 }}
            >
              <img
                src={data.galleryImages[4]}
                className="absolute inset-0 w-full h-full object-cover transition duration-500 hover:scale-105"
                loading="lazy"
              />
            </motion.div>

          </div>

          {/* BOTTOM ROW */}
          <div className="flex gap-3 lg:contents">

            <motion.div
              className="relative overflow-hidden h-[160px] rounded-2xl flex-1 lg:h-auto lg:col-span-3 lg:row-span-1"
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <img
                src={data.galleryImages[2]}
                className="absolute inset-0 w-full h-full object-cover transition duration-500 hover:scale-105"
                loading="lazy"
              />
            </motion.div>

            <motion.div
              className="relative overflow-hidden h-[160px] rounded-2xl flex-1 lg:h-auto lg:col-span-3 lg:row-span-1"
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.25 }}
            >
              <img
                src={data.galleryImages[3]}
                className="absolute inset-0 w-full h-full object-cover transition duration-500 hover:scale-105"
                loading="lazy"
              />
            </motion.div>

          </div>

        </div>

      </div>
    </section>
  );
}