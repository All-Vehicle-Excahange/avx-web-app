"use client";
import React, { useState } from "react";
import { Search, MessageCircle, ShieldCheck, Handshake } from "lucide-react";

const data = {
    processTitle: "How Buying Works",
    processDescription: `Buying a vehicle through our storefront is designed to be simple, transparent, and convenient for buyers.`,
    processSteps: [
        {
            title: "Discover Vehicles",
            description: "Browse our inventory and shortlist vehicles that match your requirements.",
            icon: "Search",
            image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=1600&q=90",
        },
        {
            title: "Connect With Our Team",
            description: "Use AVX chat to discuss vehicle condition, pricing, and availability.",
            icon: "MessageCircle",
            image: "https://images.unsplash.com/photo-1542362567-b07e54358753?w=1600&q=90",
        },
        {
            title: "AVX Inspection Option",
            description: "Buyers can request AVX inspection to receive an independent condition report.",
            icon: "ShieldCheck",
            image: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=1600&q=90",
        },
        {
            title: "Decision & Purchase",
            description: "Once satisfied with the vehicle details and inspection, finalize the purchase directly with the consultant.",
            icon: "Handshake",
            image: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=1600&q=90",
        },
    ],
};

const iconMap = { Search, MessageCircle, ShieldCheck, Handshake };

function HowBuyingWorks() {
    const [hovered, setHovered] = useState(null);
    const activeHovered = hovered ?? 0;

    return (
        <section className="relative py-12">
            <div className=" mx-auto px-2 lg:px-4">

                {/* ── OUTSIDE HEADER — top left ───────────────────────────────── */}
                <div className="flex flex-col gap-4 mb-8 max-w-lg">
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

                {/* ── MAIN BLOCK ──────────────────────────────────────────────── */}
                <div className="border border-third/10 rounded-3xl shadow-2xl overflow-hidden">

                    {/* ── IMAGE — smaller height ───────────────────────────────── */}
                    <div className="relative w-full h-[280px] md:h-80">

                        {/* Background images */}
                        {data.processSteps.map((step, i) => (
                            <img
                                key={i}
                                src={step.image}
                                alt={step.title}
                                className={`absolute inset-0 w-full h-full object-cover transition-all duration-700
                                    ${activeHovered === i ? "opacity-100 scale-100" : "opacity-0 scale-[1.02]"}`}
                            />
                        ))}

                        {/* Gradient overlay */}
                        <div className="absolute inset-0 bg-black/50 pointer-events-none" />

                        {/* ── CENTERED text inside image ───────────────────────── */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            {data.processSteps.map((step, i) => {
                                const Icon = iconMap[step.icon];
                                return (
                                    <div
                                        key={i}
                                        className={`absolute flex flex-col items-center gap-3 text-center px-8 max-w-sm transition-all duration-500
                                            ${activeHovered === i ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                                    >
                                        <div className="flex items-center justify-center w-11 h-11 rounded-xl border border-third/50 bg-third/10">
                                            <Icon size={18} strokeWidth={1.5} className="text-third/90" />
                                        </div>
                                        <h3 className="text-white text-xl md:text-2xl font-semibold font-[Montserrat] tracking-tighter leading-tight">
                                            {step.title}
                                        </h3>
                                        <p className="text-white/55 text-sm font-[Poppins] leading-[1.8]">
                                            {step.description}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>

                    </div>

                    {/* ── STEP CARDS ───────────────────────────────────────────── */}
                    <div className="grid grid-cols-2 md:grid-cols-4 border-t border-third/10">
                        {data.processSteps.map((step, i) => {
                            const Icon = iconMap[step.icon];
                            const isHovered = hovered === i;

                            return (
                                <button
                                    key={i}
                                    onMouseEnter={() => setHovered(i)}
                                    onMouseLeave={() => setHovered(null)}
                                    className={`group relative flex flex-col gap-2 px-5 py-5 text-left transition-all duration-400 cursor-pointer
                                        ${isHovered ? "bg-third/5" : "hover:bg-third/5"}`}
                                >
                                    {/* Top accent */}
                                    <div className={`absolute top-0 left-0 right-0 h-0.5 transition-all duration-500
                                        ${isHovered ? "bg-primary/60" : "bg-transparent"}`} />

                                    {/* Icon + number */}
                                    <div className="flex items-center justify-between">
                                        <div className={`flex items-center justify-center w-8 h-8 rounded-lg border transition-all duration-400
                                            ${isHovered
                                                ? "border-third/40 bg-third/10 text-third/80"
                                                : "border-third/15 text-third/35"}`}>
                                            <Icon size={14} strokeWidth={1.5} />
                                        </div>
                                        <span className={`text-[10px] font-bold font-[Montserrat] tabular-nums transition-colors duration-300
                                            ${isHovered ? "text-third/60" : "text-third/25"}`}>
                                            0{i + 1}
                                        </span>
                                    </div>

                                    {/* Title */}
                                    <h3 className={`text-xs font-semibold font-[Montserrat] leading-snug transition-colors duration-300
                                        ${isHovered ? "text-primary" : "text-third/45"}`}>
                                        {step.title}
                                    </h3>

                                    {/* Divider */}
                                    {i < data.processSteps.length - 1 && (
                                        <div className="absolute top-4 bottom-4 right-0 w-px bg-third/10" />
                                    )}
                                </button>
                            );
                        })}
                    </div>

                </div>
            </div>
        </section>
    );
}

export default HowBuyingWorks;