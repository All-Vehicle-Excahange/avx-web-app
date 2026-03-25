"use client";

import { Search, MessageCircle, ShieldCheck, Handshake } from "lucide-react";

const steps = [
  {
    title: "Discover Vehicles",
    description:
      "Browse our inventory and shortlist vehicles that match your requirements.",
    icon: Search,
  },
  {
    title: "Connect With Our Team",
    description:
      "Use AVX chat to discuss vehicle condition, pricing, and availability.",
    icon: MessageCircle,
  },
  {
    title: "AVX Inspection Option",
    description:
      "Buyers can request AVX inspection to receive an independent condition report.",
    icon: ShieldCheck,
  },
  {
    title: "Decision & Purchase",
    description:
      "Once satisfied with the vehicle details and inspection, finalize the purchase directly with the consultant.",
    icon: Handshake,
  },
];

function ProcessSection() {
  return (
    <section className="w-full py-12 ">
      <div className="max-w-7xl mx-auto px-4 flex flex-col gap-12 md:gap-16">

        {/* HEADER */}
        <div className="flex flex-col gap-3 sm:gap-4 max-w-xl md:max-w-2xl">

          <p className="text-xs sm:text-sm tracking-[0.3em] sm:tracking-[0.4em] uppercase text-third font-semibold font-[Montserrat]">
            Simple Process
          </p>

          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold leading-[1.1] text-primary font-[Montserrat]">
            How Buying <span className="text-fourth/80">Works</span>
          </h2>

          <p className="text-sm sm:text-base md:text-lg text-third leading-relaxed font-[Poppins]">
            Buying a vehicle through our storefront is designed to be simple,
            transparent, and convenient — so you can move forward with clarity,
            not confusion.
          </p>

        </div>

        {/* STEPS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">

          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <div
                key={i}
                className="flex flex-col gap-3 md:gap-4 p-5 sm:p-6 md:p-6 lg:p-8 border border-primary/20 rounded-xl md:rounded-2xl hover:border-primary/40 transition-all duration-300"
              >
                {/* ICON */}
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 md:h-11 md:w-11 lg:h-12 lg:w-12 items-center justify-center border border-primary/20 rounded-lg">
                    <Icon className="text-primary" size={18} />
                  </div>
                </div>

                {/* TITLE */}
                <h3 className="text-base sm:text-lg font-semibold text-primary font-[Montserrat] leading-snug">
                  {step.title}
                </h3>

                {/* DESCRIPTION */}
                <p className="text-sm md:text-[15px] text-third/70 leading-relaxed font-[Poppins]">
                  {step.description}
                </p>
              </div>
            );
          })}

        </div>
      </div>
    </section>
  );
}

export default ProcessSection;