"use client";

import { useState } from "react";
import { Search, MessageCircle, ShieldCheck, Handshake } from "lucide-react";

const steps = [
  {
    title: "Discover Vehicles",
    description:
      "Browse our inventory and shortlist vehicles that match your requirements.",
    icon: Search,
    image:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Connect With Our Team",
    description:
      "Use AVX chat to discuss vehicle condition, pricing, and availability.",
    icon: MessageCircle,
    image:
      "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "AVX Inspection Option",
    description:
      "Buyers can request AVX inspection to receive an independent condition report.",
    icon: ShieldCheck,
    image:
      "https://images.unsplash.com/photo-1616422285623-13ff0162193c?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Decision & Purchase",
    description:
      "Once satisfied with the vehicle details and inspection, finalize the purchase directly with the consultant.",
    icon: Handshake,
    image:
      "https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=1200&auto=format&fit=crop",
  },
];

function ProcessSection() {
  const [active, setActive] = useState(0);

  return (
    <section className="w-full py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col gap-12 lg:gap-20">

        {/* HEADER */}
        <div className="max-w-2xl flex flex-col gap-4">
          <p className="text-xs tracking-[0.5em] uppercase text-third/60 font-semibold">
            Simple Process
          </p>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight text-primary font-[Montserrat]">
            How Buying <span className="text-fourth/80">Works</span>
          </h2>

          <p className="text-third text-sm sm:text-base lg:text-lg font-[Poppins] leading-relaxed">
            Buying a vehicle through our storefront is designed to be simple,
            transparent, and convenient for buyers.
          </p>
        </div>

        {/* MOBILE VIEW (STACKED) */}
        <div className="flex flex-col gap-6 lg:hidden">
          {steps.map((step, i) => {
            const Icon = step.icon;

            return (
              <div key={i} className="relative rounded-2xl overflow-hidden">

                <img
                  src={step.image}
                  className="w-full h-[220px] object-cover"
                />

                <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent" />

                <div className="absolute top-4 left-4">
                  <div className="w-10 h-10 flex items-center justify-center rounded-full border border-white/30 bg-white/10">
                    <Icon size={18} className="text-white" />
                  </div>
                </div>

                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-base font-semibold text-white font-[Montserrat] mb-1">
                    {step.title}
                  </h3>
                  <p className="text-xs text-white/80 font-[Poppins] leading-relaxed">
                    {step.description}
                  </p>
                </div>

              </div>
            );
          })}
        </div>

        {/* DESKTOP VIEW (INTERACTIVE) */}
        <div className="hidden lg:flex h-[420px] gap-4">
          {steps.map((step, i) => {
            const Icon = step.icon;
            const isActive = active === i;

            return (
              <div
                key={i}
                onMouseEnter={() => setActive(i)}
                className={`relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 ease-out
                  ${isActive ? "flex-3" : "flex-1"}
                `}
              >

                <img
                  src={step.image}
                  className={`absolute inset-0 w-full h-full object-cover transition duration-700
                    ${isActive ? "scale-105" : "scale-100 grayscale"}
                  `}
                />

                <div className={`absolute inset-0 transition duration-500
                  ${isActive 
                    ? "bg-linear-to-t from-black/70 via-black/40 to-transparent" 
                    : "bg-black/40"}
                `} />

                <div className="relative z-10 h-full p-6 flex flex-col justify-end">

                  <div className="absolute top-6 left-6">
                    <div className={`flex items-center justify-center w-10 h-10 rounded-full border transition
                      ${isActive ? "border-white/40 bg-white/10" : "border-white/20"}
                    `}>
                      <Icon size={18} className="text-white" />
                    </div>
                  </div>

                  <div className={`transition-all duration-500
                    ${isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
                  `}>
                    <h3 className="text-lg font-semibold text-white font-[Montserrat] mb-2">
                      {step.title}
                    </h3>

                    <p className="text-sm text-white/80 font-[Poppins] leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

export default ProcessSection;