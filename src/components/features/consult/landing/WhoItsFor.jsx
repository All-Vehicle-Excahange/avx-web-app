"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const items = [
  {
    title: "Independent Car Consultants",
    desc: "Running your business solo? Reecomm gives you the same storefront, tools, and buyer trust as a full dealership — without the overhead.",
    img: "/consultant.webp",
  },
  {
    title: "Multi-Vehicle Dealerships",
    desc: "Manage your full inventory from a single dashboard. List, update, and track every vehicle without juggling spreadsheets or WhatsApp threads.",
    img: "/dealership.webp",
  },
  {
    title: "Growing Automotive Businesses",
    desc: "Scaling beyond a handful of vehicles? Reecomm's structured visibility and performance data help you grow predictably, not by guesswork.",
    img: "/performance-based-visibility.webp",
  },
  {
    title: "City-Level Operators",
    desc: "Operating across multiple locations or a wide service area? Reecomm's storefront and inquiry tools work the same way at any scale.",
    img: "/car-operator.webp",
  },
];

export default function WhoItsFor() {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleToggle = (i) => {
    setActiveIndex(activeIndex === i ? null : i);
  };

  return (
    <section className="relative py-10 overflow-hidden">
      <div className="relative z-10 max-w-[1440px] mx-auto w-full">
        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-[Montserrat] text-3xl sm:text-4xl lg:text-5xl text-primary font-semibold leading-[1.05]">
            Built for{" "}
            <span className="text-fourth font-bold">
              Professional Automotive Consultants
            </span>
          </h2>

          <p className="text-third mt-5 text-[15px] md:text-[16px] max-w-xl mx-auto leading-relaxed">
            Going digital used to mean hiring a developer for a website, a
            designer for your branding, and a marketer to bring you leads.
            Reecomm replaces all three — built for consultants who sell vehicles
            seriously, at any scale.
          </p>
        </div>

        {/* CARDS */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item, i) => {
            const isActive = activeIndex === i;

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                viewport={{ once: true }}
                onClick={() => handleToggle(i)}
                className="group relative rounded-2xl overflow-hidden border border-[#1f2937] h-80 cursor-pointer hover:shadow-[0_10px_40px_-10px_rgba(230,230,230,0.15)]"
              >
                {/* IMAGE */}
                <div
                  className="absolute inset-0 bg-cover bg-center scale-105 group-hover:scale-110 transition duration-700"
                  style={{ backgroundImage: `url(${item.img})` }}
                />

                {/* DEFAULT OVERLAY */}
                <div className="absolute inset-0 bg-linear-to-t from-secondary via-secondary/60 to-transparent" />

                {/* SLIDE OVERLAY */}
                <div
                  className={`absolute inset-0 bg-[#0f1117]/90 transition-transform duration-500 ease-out flex flex-col justify-end p-6
                  ${isActive ? "translate-y-0" : "translate-y-full"}
                  lg:group-hover:translate-y-0`}
                >
                  <h3 className="text-2xl font-semibold text-primary mb-2">
                    {item.title}
                  </h3>

                  <p className="text-[15px] text-third leading-relaxed mb-4">
                    {item.desc}
                  </p>

                  <div className="w-12 h-[2] bg-primary opacity-80" />
                </div>

                {/* DEFAULT TITLE */}
                <div className="relative h-full p-6 flex flex-col justify-end pointer-events-none">
                  <h3
                    className={`text-2xl font-semibold text-primary transition duration-300
                    ${isActive ? "opacity-0" : "opacity-100"}
                    lg:group-hover:opacity-0`}
                  >
                    {item.title}
                  </h3>

                  <div
                    className={`w-10 h-[2] bg-primary mt-3 opacity-70 transition duration-300
                    ${isActive ? "opacity-0" : "opacity-70"}
                    lg:group-hover:opacity-0`}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
