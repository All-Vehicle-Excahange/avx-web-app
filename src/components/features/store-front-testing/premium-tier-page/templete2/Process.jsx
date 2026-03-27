"use client";

import { motion } from "framer-motion";
import { Search, MessageCircle, ShieldCheck, Handshake } from "lucide-react";

const iconMap = {
  Search,
  MessageCircle,
  ShieldCheck,
  Handshake,
};

const data = {
  processTitle: "How Buying Works",
  processDescription:
    "Buying a vehicle through our storefront is designed to be simple, transparent, and convenient for buyers.",

  processSteps: [
    {
      title: "Discover Vehicles",
      description:
        "Browse our inventory and shortlist vehicles that match your requirements.",
      icon: "Search",
      image: "https://images.unsplash.com/photo-1550355291-bbee04a92027?w=700&auto=format",
    },
    {
      title: "Connect With Our Team",
      description:
        "Use AVX chat to discuss vehicle condition, pricing, and availability.",
      icon: "MessageCircle",
      image: "https://images.unsplash.com/photo-1515168833906-d2a3b82b302a?w=700&auto=format",
    },
    {
      title: "AVX Inspection Option",
      description:
        "Buyers can request AVX inspection to receive an independent condition report.",
      icon: "ShieldCheck",
      image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=700&auto=format",
    },
    {
      title: "Decision & Purchase",
      description:
        "Once satisfied with the vehicle details and inspection, finalize the purchase directly with the consultant.",
      icon: "Handshake",
      image: "https://images.unsplash.com/photo-1493238792000-8113da705763?w=700&auto=format",
    },
  ],
};

export default function Process() {
  return (
    <section className="py-16 lg:py-20">
      <div className="px-5">

        {/* HEADER */}
        <div className="mb-16 max-w-2xl">
          <p className="text-sm tracking-[0.4em] uppercase text-third mb-3">
            Process
          </p>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-primary mb-4">
            How Buying <span className="text-fourth/80">Works</span>
          </h2>

          <p className="text-third/60 text-[15px] leading-[1.9]">
            {data.processDescription}
          </p>
        </div>

        {/* TIMELINE */}
        <div className="flex flex-col gap-16">

          {data.processSteps.map((step, i) => {
            const Icon = iconMap[step.icon];
            const isLeft = i % 2 === 0;

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`grid lg:grid-cols-2 gap-10 items-center ${
                  !isLeft ? "lg:[&>*:first-child]:order-2" : ""
                }`}
              >

                {/* IMAGE */}
                <div className="w-full h-[260px] lg:h-80 rounded-2xl overflow-hidden">
                  <img
                    src={step.image}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* CONTENT */}
                <div className="flex flex-col gap-4">

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 border border-primary/20 flex items-center justify-center">
                      <Icon size={18} className="text-fourth" />
                    </div>

                    <span className="text-[11px] tracking-[0.2em] text-third/40">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <h3 className="text-xl font-semibold text-primary">
                    {step.title}
                  </h3>

                  <p className="text-third/65 text-[14px] leading-[1.8] max-w-md">
                    {step.description}
                  </p>

                </div>

              </motion.div>
            );
          })}

        </div>

      </div>
    </section>
  );
}