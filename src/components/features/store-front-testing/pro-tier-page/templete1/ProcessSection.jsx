"use client";

import { Search, MessageCircle, ShieldCheck, Handshake } from "lucide-react";

const steps = [
  {
    title: "Discover Vehicles",
    description:
      "Browse our inventory and shortlist vehicles that match your requirements.",
    icon: Search,
    image:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200",
  },
  {
    title: "Connect With Our Team",
    description:
      "Use AVX chat to discuss vehicle condition, pricing, and availability.",
    icon: MessageCircle,
    image:
      "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?q=80&w=1200",
  },
  {
    title: "AVX Inspection Option",
    description:
      "Buyers can request AVX inspection to receive an independent condition report.",
    icon: ShieldCheck,
    image:
      "https://images.unsplash.com/photo-1616422285623-13ff0162193c?q=80&w=1200",
  },
  {
    title: "Decision & Purchase",
    description:
      "Once satisfied with the vehicle details and inspection, finalize the purchase directly with the consultant.",
    icon: Handshake,
    image:
      "https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=1200",
  },
];

function ProcessSection() {
  return (
    <section className="w-full py-12">
      <div className="max-w-7xl mx-auto px-4 flex flex-col gap-16">

        {/* HEADER */}
        <div className="max-w-2xl flex flex-col gap-4">

          <p className="text-sm tracking-[0.4em] uppercase text-third font-semibold">
            Simple Process
          </p>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.05] text-primary font-[Montserrat]">
            How Buying <span className="text-fourth/80">Works</span>
          </h2>

          <p className="text-third text-lg font-[Poppins] leading-relaxed">
            Buying a vehicle through our storefront is designed to be simple,
            transparent, and convenient for buyers.
          </p>

        </div>

        {/* PROCESS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

          {steps.map((step, i) => {
            const Icon = step.icon;

            return (
              <div
                key={i}
                className="group flex flex-col justify-between border border-primary/20 rounded-xl overflow-hidden transition-all duration-300 hover:border-primary/40 hover:-translate-y-1"
              >

                {/* CONTENT (ONLY HERE PADDING) */}
                <div className="p-6 flex flex-col gap-3">

                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center border border-primary/20 rounded-full">
                      <Icon size={18} className="text-primary" />
                    </div>

                    <span className="text-xs tracking-[2px] text-third font-[Montserrat]">
                      0{i + 1}
                    </span>
                  </div>

                  <h3 className="text-base font-semibold text-primary font-[Montserrat]">
                    {step.title}
                  </h3>

                  <p className="text-sm text-third font-[Poppins] leading-relaxed">
                    {step.description}
                  </p>

                </div>

                {/* IMAGE (FULL WIDTH, NO X PADDING) */}
                <div className="h-40 w-full overflow-hidden">
                  <img
                    src={step.image}
                    alt={step.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
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