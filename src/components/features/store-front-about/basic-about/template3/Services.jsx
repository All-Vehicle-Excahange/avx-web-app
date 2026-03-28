"use client";
import React, { useState } from "react";
import { ShieldCheck, Globe, TrendingUp, Cpu } from "lucide-react";

const servicesData = {
    servicesTitle: "What We Do",
    servicesDesc: `Enterprise-grade digital products designed to scale globally with security, speed and reliability.`,
    services: [
        {
            icon: "ShieldCheck",
            title: "Secure Payments",
            desc: "PCI-DSS compliant global payment systems.",
        },
        {
            icon: "Globe",
            title: "Global Infrastructure",
            desc: "99.99% uptime cloud deployment in 12 regions.",
        },
        {
            icon: "TrendingUp",
            title: "Growth Tools",
            desc: "Smart CRM, analytics and automation funnels.",
        },
        {
            icon: "Cpu",
            title: "AI Optimization",
            desc: "AI powered performance & conversion engines.",
        },
    ],
};

const iconMap = { ShieldCheck, Globe, TrendingUp, Cpu };

export default function Services() {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <section className="relative flex flex-col justify-center items-center py-12">
            <div className="mx-auto w-full  flex flex-col gap-6">

                {/* ── Header ── */}
                <div className="grid gap-5 items-end">
                    <div className="flex flex-col gap-5">
                        <div className="flex items-center gap-4">
                            <p className="text-sm tracking-[0.4em] uppercase text-third font-semibold">
                                Our Services
                            </p>
                        </div>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.05] text-primary font-[Montserrat]">
                            What We
                            <span className="text-fourth/80"> Actually Do</span>
                        </h2>
                    </div>
                    <div className="flex flex-col gap-4 lg:pb-2">
                        <p className="text-third/70 text-lg md:text-md font-[Poppins] leading-relaxed">
                            {servicesData.servicesDesc}
                        </p>
                    </div>
                </div>

                {/* ── Services Panel ── */}
                <div className="grid lg:grid-cols-12 gap-0 border border-third/10 rounded-2xl overflow-hidden">

                    {/* Left: expandable rows — desktop only */}
                    <div className="lg:col-span-5 hidden lg:flex flex-col border-r border-third/10">
                        {servicesData.services.map((service, index) => {
                            const Icon = iconMap[service.icon];
                            const isActive = activeIndex === index;
                            return (
                                <button
                                    key={index}
                                    onClick={() => setActiveIndex(index)}
                                    onMouseEnter={() => setActiveIndex(index)}
                                    className={`group relative flex flex-col text-left border-b border-third/10 last:border-none transition-all duration-300 overflow-hidden ${isActive ? "bg-third/5 py-7 gap-3" : "py-7 gap-0 hover:bg-third/3"}`}
                                >
                                    {/* Active left bar */}
                                    <span className={`absolute left-0 top-0 w-0.5 h-full transition-all duration-300 ${isActive ? "bg-third" : "bg-transparent"}`} />

                                    {/* Row: number + icon + title + toggle */}
                                    <div className="flex items-center justify-between px-8">
                                        <div className="flex items-center gap-4">
                                            <span className={`text-xs tracking-[0.4em] font-semibold font-[Poppins] transition-colors duration-300 ${isActive ? "text-third" : "text-third/30"}`}>
                                                0{index + 1}
                                            </span>
                                            <span className={`transition-colors duration-300 ${isActive ? "text-third" : "text-third/30 group-hover:text-third/60"}`}>
                                                {Icon && <Icon size={16} strokeWidth={1.5} />}
                                            </span>
                                            <h3 className={`text-sm font-semibold font-[Montserrat] transition-colors duration-300 ${isActive ? "text-primary" : "text-third/50 group-hover:text-third/80"}`}>
                                                {service.title}
                                            </h3>
                                        </div>
                                        <span className={`text-sm font-[Poppins] transition-all duration-300 ${isActive ? "text-third" : "text-third/20"}`}>
                                            {isActive ? "—" : "+"}
                                        </span>
                                    </div>

                                    {/* Expanded desc */}
                                    
                                </button>
                            );
                        })}
                    </div>

                    {/* Tab bar — mobile only */}
                    <div className="lg:hidden flex flex-row w-full border-b border-third/10 overflow-x-auto">
                        {servicesData.services.map((service, index) => {
                            const Icon = iconMap[service.icon];
                            const isActive = activeIndex === index;
                            return (
                                <button
                                    key={index}
                                    onClick={() => setActiveIndex(index)}
                                    className={`relative flex items-center gap-2 px-5 py-4 whitespace-nowrap flex-1 justify-center transition-all duration-200 ${isActive ? "text-primary" : "text-third/40"}`}
                                >
                                    {Icon && <Icon size={14} strokeWidth={1.5} className={isActive ? "text-third" : ""} />}
                                    <span className="text-xs font-semibold font-[Poppins] tracking-wide">
                                        {service.title}
                                    </span>
                                    <span className={`absolute bottom-0 left-0 h-px w-full transition-all duration-300 ${isActive ? "bg-third" : "bg-transparent"}`} />
                                </button>
                            );
                        })}
                    </div>

                    {/* Right: large active display */}
                    <div className="lg:col-span-7 flex flex-col justify-between p-10 lg:p-14 gap-8">

                        {/* Icon + content */}
                        <div className="flex flex-col gap-4">

                            {/* Icon row */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center justify-center w-16 h-16 rounded-2xl border border-third/20 bg-third/5">
                                    {(() => {
                                        const Icon = iconMap[servicesData.services[activeIndex].icon];
                                        return Icon ? <Icon size={28} strokeWidth={1.3} className="text-third" /> : null;
                                    })()}
                                </div>
                                <p className="text-xs tracking-[0.5em] uppercase text-third/30 font-semibold font-[Poppins]">
                                    0{activeIndex + 1} / 0{servicesData.services.length}
                                </p>
                            </div>

                            {/* Title + divider + desc */}
                            <div className="flex flex-col gap-4">
                                <h3 className="text-xl sm:text-2xl lg:text-3xl font-semibold leading-[1.05] text-primary font-[Montserrat]">
                                    {servicesData.services[activeIndex].title}
                                </h3>
                                <p className="text-third/70 text-lg font-[Poppins] leading-relaxed max-w-sm">
                                    {servicesData.services[activeIndex].desc}
                                </p>
                            </div>
                        </div>

                        {/* Bottom dot indicators */}
                        <div className="flex items-center gap-3">
                            {servicesData.services.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setActiveIndex(i)}
                                    onMouseEnter={() => setActiveIndex(i)}
                                    className={`transition-all duration-300 rounded-full ${i === activeIndex ? "w-8 h-1.5 bg-third" : "w-1.5 h-1.5 bg-third/30 hover:bg-third/60"}`}
                                />
                            ))}
                        </div>

                    </div>

                </div>

            </div>
        </section>
    );
}