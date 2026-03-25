"use client";

import { Search, MessageCircle, ShieldCheck, Handshake } from "lucide-react";

const data = {
    processTitle: "How Buying Works",
    processDescription: `Buying a vehicle through our storefront is designed to be simple,
transparent, and convenient for buyers.`,
    processSteps: [
        {
            title: "Discover Vehicles",
            description: "Browse our inventory and shortlist vehicles that match your requirements.",
            icon: Search,
        },
        {
            title: "Connect With Our Team",
            description: "Use AVX chat to discuss vehicle condition, pricing, and availability.",
            icon: MessageCircle,
        },
        {
            title: "AVX Inspection Option",
            description: "Buyers can request AVX inspection to receive an independent condition report.",
            icon: ShieldCheck,
        },
        {
            title: "Decision & Purchase",
            description: "Once satisfied with the vehicle details and inspection, finalize the purchase directly with the consultant.",
            icon: Handshake,
        },
    ],
};

function HowBuyingWorks() {
    return (
        <section className="py-12 ">
            <div className="max-w-7xl mx-auto flex flex-col gap-15">

                {/* ── Header ───────────────────────────────────────────────── */}
                <div className="flex flex-col  sm:justify-between gap-8 pb-12 border-b border-third/10">
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-3">
                            <p className="text-sm tracking-[0.4em] uppercase text-third font-semibold">
                                Buying Process
                            </p>
                        </div>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.05] text-primary font-[Montserrat]">
                            {data.processTitle.split("Works")[0]}
                            <span className="text-fourth/80">
                                Works
                            </span>
                        </h2>
                    </div>
                    <p className="text-third/55 text-base font-[Poppins] leading-relaxed max-w-xs ">
                        {data.processDescription}
                    </p>
                </div>

                {/* ── Alternating steps ────────────────────────────────────── */}
                <div className="flex flex-col gap-2">
                    {data.processSteps.map((step, i) => {
                        const Icon = step.icon;
                        const isEven = i % 2 === 0;
                        return (
                            <div
                                key={i}
                                className={`group flex flex-col sm:flex-row items-stretch gap-0 border border-third/10 rounded-2xl overflow-hidden hover:border-third/25 transition-all duration-300 ${isEven ? "" : "sm:flex-row-reverse"}`}
                            >
                                {/* Step number + icon panel */}
                                <div className="flex sm:flex-col items-center justify-between sm:justify-center gap-4 px-8 py-6 sm:py-10 sm:w-48 border-b sm:border-b-0 border-third/10 sm:border-r group-hover:bg-primary/4 transition-colors duration-300" style={isEven ? {} : { borderRight: 'none', borderLeft: '1px solid rgba(190,190,190,0.1)' }}>
                                    <span className="text-[13px] font-bold tracking-[3px] text-third/25 font-[Montserrat]">
                                        {String(i + 1).padStart(2, "0")}
                                    </span>
                                    <div className="w-10 h-10 rounded-xl border border-third/15 flex items-center justify-center group-hover:border-primary/30 transition-colors duration-300">
                                        <Icon className="w-4 h-4 text-third/40 group-hover:text-primary/60 transition-colors duration-300" />
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="flex flex-col justify-center gap-2 px-8 py-8 flex-1">
                                    <h3 className="text-lg font-semibold text-primary font-[Montserrat]">
                                        {step.title}
                                    </h3>
                                    <p className="text-third/55 text-sm font-[Poppins] leading-relaxed max-w-lg">
                                        {step.description}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>

            </div>
        </section>
    );
}

export default HowBuyingWorks;