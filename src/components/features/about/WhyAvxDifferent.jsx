import React from "react";

const features = [
  {
    id: "01",
    title: "Verified Consultant Identity",
    desc: "Every consultant on AVX operates through a public storefront backed by structured business information and accountability signals.",
  },
  {
    id: "02",
    title: "Inspection Credibility Layer",
    desc: "Optional inspection visibility and re-verification options that prioritise buyer confidence without forcing friction.",
  },
  {
    id: "03",
    title: "Performance Transparency",
    desc: "Consultant activity, engagement, and outcomes are surfaced through real signals — not vanity metrics.",
  },
  {
    id: "04",
    title: "Structured Search & Discovery",
    desc: "Vehicles are ranked by relevance, quality, and trust indicators — ensuring the best value surfaces first.",
  },
];

export default function WhyAvxDifferent() {
  return (
    <section className="pb-20">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className=" mb-28">
          <p className="mb-6 text-sm tracking-[0.4em] uppercase text-[var(--color-third)] font-semibold ">
            Why AVX
          </p>

          <h2 className="text-4xl sm:text-5xl xl:text-5xl font-bold">
            Not another <span className=" text-fourth"> listing platform</span>
          </h2>

          <p className="mt-8 text-xl text-[var(--color-third)]  leading-relaxed">
            AVX is engineered to remove ambiguity from the used-vehicle market
            by introducing structure, accountability, and measurable trust.
          </p>
        </div>

        {/* Feature Strips */}
        <div className="space-y-24">
          {features.map((item, index) => {
            const isLeftContent = index % 2 === 0;

            return (
              <div
                key={item.id}
                className={`group relative flex flex-col ${
                  isLeftContent ? "md:flex-row" : "md:flex-row-reverse"
                } gap-16 items-center`}
              >
                {/* Number */}
                <div
                  className={`absolute top-1/2 -translate-y-1/2 text-[10rem] font-bold select-none pointer-events-none transition-colors duration-300
          ${isLeftContent ? "md:right-0 md:left-auto" : "md:left-0 md:right-auto"}
          text-white/15 group-hover:text-[var(--color-fourth)]/30`}
                >
                  {item.id}
                </div>

                {/* Content */}
                <div className="relative max-w-xl border rounded-2xl border-transparent p-6 transition-colors duration-300 group-hover:border-[var(--color-fourth)]">
                  <h3 className="text-2xl md:text-3xl font-semibold text-[var(--color-primary)]">
                    {item.title}
                  </h3>
                  <p className="mt-4 text-lg text-[var(--color-third)] leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                {/* Visual Bar */}
                <div
                  className={`hidden md:block h-px flex-1 transition-colors duration-300
          ${isLeftContent ? "bg-neutral-700" : "bg-neutral-700"}
          group-hover:bg-[var(--color-fourth)]/60`}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
