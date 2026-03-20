"use client";

import Image from "next/image";

const features = [
  {
    id: 1,
    num: "01",
    tag: "Buyers",
    title: "Reach Verified Buyers",
    description:
      "Every buyer on AVX is verified before they can contact a seller. Your listing reaches only serious, qualified prospects — no spam, no time wasters, just real deals.",
    image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a4 4 0 00-4-4h-1M9 20H4v-2a4 4 0 014-4h1m4-4a4 4 0 100-8 4 4 0 000 8z" />
      </svg>
    ),
  },
  {
    id: 2,
    num: "02",
    tag: "Analytics",
    title: "Track Real Inquiries",
    description:
      "See exactly who's viewing your listing, how many inquiries you've received, and where your leads are coming from — all from a clean, real-time seller dashboard.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
  {
    id: 3,
    num: "03",
    tag: "Inspection",
    title: "Optional Inspection",
    description:
      "Get your vehicle inspected by an AVX-certified partner at your convenience. Inspected listings build instant buyer trust and consistently close faster than unverified ones.",
    image: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    id: 4,
    num: "04",
    tag: "Visibility",
    title: "Performance-Based Visibility",
    description:
      "Listings with complete details, verified documents, and inspection reports rank higher automatically. Serious sellers get a natural edge — no paid promotions ever needed.",
    image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
  },
];

function WhySellOnAvx() {
  return (
    <section className="py-12 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col gap-8">

        {/* ── Header ──────────────────────────────────    ─────────────── */}
        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-3">
            <p className="text-sm tracking-[0.4em] uppercase text-third font-semibold">
              Why AVX
            </p>
          </div>
          <div className="lg:flex-row lg:items-end lg:justify-between gap-4">
            <h2 className="  text-3xl sm:text-4xl lg:text-5xl
                font-semibold
                leading-[1.05]
                text-primary
                font-[Montserrat]">
              Why Sell on AVX?
              <br />
              <span className="text-fourth/80">Built for Serious Sellers</span>
            </h2>
            <p className="text-third text-lg font-[Poppins] max-w-xs leading-relaxed mt-4">
              A structured marketplace designed to give you full control, visibility, and trust.
            </p>
          </div>
        </div>

        {/* ── Alternating rows ─────────────────────────────────────── */}
        <div className="flex flex-col gap-4">
          {features.map((feature, i) => {
            const isReversed = i % 2 !== 0;
            return (
              <div
                key={feature.id}
                className={`group grid grid-cols-1 lg:grid-cols-2  border border-primary/10 hover:border-primary/20 rounded-2xl transition-all duration-300 overflow-hidden ${isReversed ? "" : ""}`}
              >
                {/* Image side */}
                <div className={`relative h-56 lg:h-72 overflow-hidden m-10 ${isReversed ? "lg:order-2" : "lg:order-1"}`}>
                  <Image
                    src={feature.image}
                    alt={feature.title}
                    fill
                    className="object-cover object-center transition-transform duration-700 group-hover:scale-105 border rounded-2xl"
                  />
                </div>

                {/* Content side */}
                <div className={`relative flex flex-col justify-center gap-6 p-8 lg:p-12 ${isReversed ? "lg:order-1" : "lg:order-2"}`}>

                  {/* Top accent line */}

                  {/* Tag + icon row */}
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 flex items-center justify-center border border-primary/15 group-hover:border-third/30 group-hover:bg-third/6 transition-all duration-300 text-third/50 group-hover:text-third">
                      {feature.icon}
                    </div>
                    <span className="text-[12px] font-semibold tracking-[2.5px] uppercase text-third/35 font-[Poppins] group-hover:text-third/60 transition-colors duration-200">
                      {feature.tag}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl sm:text-2xl font-semibold text-primary font-[Montserrat] leading-snug">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="text-third/70 text-md leading-[1.85] font-[Poppins] max-w-sm">
                    {feature.description}
                  </p>

                  {/* Bottom rule */}
                  <div className="w-8 h-px bg-third/30 group-hover:w-16 transition-all duration-500" />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

export default WhySellOnAvx;