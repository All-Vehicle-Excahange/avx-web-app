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
      image: "https://images.unsplash.com/photo-1550355291-bbee04a92027?w=500&auto=format",
    },
    {
      title: "Connect With Our Team",
      description:
        "Use AVX chat to discuss vehicle condition, pricing, and availability.",
      icon: "MessageCircle",
      image: "https://images.unsplash.com/photo-1515168833906-d2a3b82b302a?w=500&auto=format",
    },
    {
      title: "AVX Inspection Option",
      description:
        "Buyers can request AVX inspection to receive an independent condition report.",
      icon: "ShieldCheck",
      image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=500&auto=format",
    },
    {
      title: "Decision & Purchase",
      description:
        "Once satisfied with the vehicle details and inspection, finalize the purchase directly with the consultant.",
      icon: "Handshake",
      image: "https://images.unsplash.com/photo-1493238792000-8113da705763?w=500&auto=format",
    },
  ],
};

export default function Process() {
  return (
    <section className="py-12 lg:py-12">
      <div className="px-5">

        {/* HEADER */}
        <div className="flex flex-col gap-3 mb-10">
          <p className="text-sm tracking-[0.4em] uppercase text-third font-semibold">
            Process
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-primary">
            How Buying <span className="text-fourth/80">Works</span>
          </h2>
          <p className="text-third/60 text-[15px] max-w-md">
            {data.processDescription}
          </p>
        </div>

        {/* TIMELINE */}
        <div className="relative">

          {/* LINE */}
          <div className="hidden lg:block absolute top-8 left-0 right-0 h-px bg-third/10"></div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">

            {data.processSteps.map((step, i) => {
              const Icon = iconMap[step.icon];

              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.15 }}
                  className="relative flex flex-col gap-4"
                >

                  {/* IMAGE */}
                  <div className="w-full h-[140px] rounded-xl overflow-hidden">
                    <img
                      src={step.image}
                      alt={step.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>

                  {/* ICON + NUMBER */}
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-full border border-third/20 flex items-center justify-center">
                      <Icon size={16} className="text-fourth" strokeWidth={1.5} />
                    </div>

                    <span className="text-[11px] tracking-[0.2em] text-third/40 font-semibold">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>

                  {/* CONTENT */}
                  <div>
                    <p className="font-semibold text-[14px] text-fourth mb-1">
                      {step.title}
                    </p>
                    <p className="text-[13px] text-third/65 leading-[1.7]">
                      {step.description}
                    </p>
                  </div>

                </motion.div>
              );
            })}

          </div>
        </div>

      </div>
    </section>
  );
}