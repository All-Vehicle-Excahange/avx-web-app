"use client";

import { motion } from "framer-motion";

export default function WhyThisMattersSection() {
    const cards = [
        {
            title: "Seller Identity",
            desc: "Consultant performance and identity are always visible.",
            extra:
                "Every consultant is performance tracked, rating verified, and publicly accountable.",
        },
        {
            title: "Structured Information",
            desc: "Vehicle data is standardized for consistent buyer evaluation.",
            extra:
                "Every listing follows structured data rules to prevent misleading or incomplete vehicle details.",
        },
        {
            title: "Optional Assurance",
            desc: "Inspection and verification layers exist when buyers need them.",
            extra:
                "Buyers can request additional inspection confidence before finalizing purchase decisions.",
        },
    ];

    return (
        <section className="relative   overflow-hidden">
            {/* HORIZON LIGHT */}
            <div
                className="
        absolute left-0 right-0 top-1/2
        h-0.5
        bg-linear-to-r from-transparent via-blue-500/40 to-transparent
        blur-sm
      "
            />

            {/* AMBIENT LIGHT */}
            <div
                className="
        absolute -right-50 -top-50
        w-150 h-150
        bg-blue-500/10 blur-[180px] rounded-full
      "
            />

            <div className="relative w-full mx-auto py-16 ">
                <div className="grid lg:grid-cols-2 gap-16 items-center h-fit">
                    {/* LEFT //// */}
                    <div className="space-y-8 max-w-xl">
                        <p className="text-sm tracking-[0.4em] uppercase text-third font-semibold">
                            Why This Matters
                        </p>

                        <h2 className="text-3xl md:text-[46px] font-bold leading-[1.15] text-primary">
                            Confidence Comes
                            <span className="block  text-fourth">
                From Clarity
              </span>
                        </h2>

                        <p className="text-[17px] text-primary/85 leading-relaxed">
                            Buying a pre-owned vehicle is a significant financial decision.
                            AVX exists to reduce ambiguity — by making seller identity
                            visible, vehicle information structured, and inspection optional
                            but accessible.
                        </p>

                        <div className="pt-6 border-t border-primary/10">
                            <p className="text-lg font-semibold text-primary">
                                Trust is not claimed.
                            </p>
                            <p className="text-lg font-semibold text-fourth">
                                It is built into the system.
                            </p>
                        </div>
                    </div>

                    <div className="grid gap-6">
                        {cards.map((card, i) => (
                            <motion.div
                                key={i}
                                whileHover={{
                                    scale: 1.02,
                                    borderColor: "rgba(96,165,250,0.6)",
                                }}
                                className="
        group cursor-pointer relative overflow-hidden
        p-6 rounded-2xl border backdrop-blur-xl
        border-primary/10
        bg-[linear-gradient(90deg,#313131_0%,#1a1919_45%,#000000_100%)]
        transition
        hover:shadow-[0_10px_40px_-10px_rgba(230,230,230,0.15)]
      "
                            >
                                {/* LIGHT SWEEP */}
                                <div
                                    className="
        absolute inset-0 opacity-0 group-hover:opacity-100 transition
        bg-linear-to-r from-transparent via-blue-400/20 to-transparent
        -translate-x-full group-hover:translate-x-full
        duration-900
      "
                                />

                                <p className="relative text-fourth text-sm font-medium mb-2">
                                    {card.title}
                                </p>

                                <p className="relative text-primary text-sm">{card.desc}</p>

                                {/* HOVER EXPAND TEXT — CSS CONTROLLED */}
                                <div
                                    className="
    max-h-0 opacity-0
    group-hover:max-h-45
    group-hover:opacity-100
    transition-all duration-650
   ease-[cubic-bezier(0.22,1,0.36,1)]
    overflow-hidden
  "
                                >
                                    <p className="text-blue-200/80 text-sm mt-4">{card.extra}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}