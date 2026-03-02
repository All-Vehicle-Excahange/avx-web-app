"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Link from "next/link";
import HeroGraph from "./HeroGraph";

function CountUp({ end, suffix = "" }) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let start = 0;
        const duration = 1200;
        const step = end / (duration / 16);

        const counter = setInterval(() => {
            start += step;
            if (start >= end) {
                setCount(end);
                clearInterval(counter);
            } else {
                setCount(Math.floor(start));
            }
        }, 16);

        return () => clearInterval(counter);
    }, [end]);

    return (
        <span>
      {count}
            {suffix}
    </span>
    );
}

export default function HeroSection() {
    return (
        <section className="relative min-h-screen flex items-center  overflow-hidden">
            {/* animated orb */}
            <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-40 -right-40 w-150 h-150 bg-fourth/10 blur-[160px] rounded-full"
            />

            <div className="relative z-10 mx-auto  py-16 w-full">
                <div className="grid lg:grid-cols-2 gap-8 items-center">

                    {/* ================= LEFT ================= */}

                    <div className="max-w-xl space-y-8"
                    >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#60a5fa]/30 text-sm tracking-[0.4em] uppercase text-third font-semibold bg-[#044596]/10 backdrop-blur-md">
              Our Process
            </span>

                        <div className="space-y-3">
                            <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-bold leading-[1.05] text-[#f8fafc] tracking-tight">
                                How AVX
                            </h1>
                            <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-bold leading-[1.05] tracking-tight text-fourth">
                                Works
                            </h1>
                        </div>

                        <p className="text-[15px] text-third leading-relaxed max-w-lg">
                            We connect verified consultants and serious buyers through
                            transparent listings, inspection visibility, and performance
                            accountability.
                        </p>

                        <div className="w-24 h-0.5 bg-fourth rounded-full" />

                        <div className="flex flex-col sm:flex-row gap-4 pt-3">
                            <Link
                              href="/vehicles"
                              scroll={false}
                              className="relative group inline-flex items-center justify-center px-7 py-3.5 rounded-xl text-sm font-semibold text-primary bg-linear-to-r from-[#044596] to-fourth shadow-lg shadow-blue-900/40 transition duration-300 hover:shadow-blue-600/40 hover:-translate-y-px"
                            >
                                Browse Vehicles
                            </Link>

                            <Link
                              href="/consultant"
                              scroll={false}
                              className="px-7 py-3.5 rounded-xl text-sm font-semibold border-[#374151] border-2 text-primary bg-[#111318] transition duration-300 hover:border-fourth hover:text-fourth hover:bg-[#151922] hover:shadow-[0_10px_40px_-10px_rgba(255,255,255,0.25)]"
                            >
                                Become a Consultant
                            </Link>
                        </div>
                    </div>

                    {/* ================= RIGHT ================= */}

                    <div className="relative h-115">

                        {/* glow layer */}
                        <div className="absolute inset-0 bg-linear-to-r from-fourth/10 to-transparent blur-3xl rounded-3xl" />

                        {/* MAIN CARD */}
                        <motion.div
                            initial={{ opacity: 0, x: 40 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="absolute left-[20%] top-0 w-[72%] h-[70%] rounded-2xl border border-[#1f2937] bg-[#0f1117]/95 backdrop-blur-xl shadow-[0_40px_100px_rgba(0,0,0,0.8)] p-6 z-20 overflow-hidden"
                        >

                            <HeroGraph />

                            {/* Animated metrics */}
                            <div className="grid grid-cols-3 text-center gap-4 mt-4">
                                <div>
                                    <p className="text-lg font-bold text-fourth">
                                        <CountUp end={100} suffix="+" />
                                    </p>
                                    <p className="text-[11px] text-third uppercase">Consultants</p>
                                </div>
                                <div>
                                    <p className="text-lg font-bold text-fourth">
                                        <CountUp end={500} suffix="+" />
                                    </p>
                                    <p className="text-[11px] text-third uppercase">Listings</p>
                                </div>
                                <div>
                                    <p className="text-lg font-bold text-fourth">
                                        <CountUp end={98} suffix="%" />
                                    </p>
                                    <p className="text-[11px] text-third uppercase">Visibility</p>
                                </div>
                            </div>
                        </motion.div>

                        {/* IMAGE */}
                        <div className="absolute left-0 top-[55%] w-[88%] h-[30%] rounded-xl overflow-hidden border border-[#1f2937] shadow-[0_30px_80px_rgba(0,0,0,0.8)] z-30"
                        >
                            <img src="/car-hero-21.jpg" className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-linear-to-t from-secondary/80 to-transparent" />
                        </div>

                        {/* PERFORMANCE CARD */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="absolute right-10 -bottom-2.5 w-[58%] rounded-xl border border-[#1f2937] bg-[#0b0e13]/95 backdrop-blur-xl p-5 shadow-xl z-30"
                        >
                            <p className="text-xs text-third mb-4 tracking-wide uppercase">
                                Performance Snapshot
                            </p>

                            <div className="grid grid-cols-3 gap-3">
                                {[
                                    { v: "98%", l: "Satisfaction" },
                                    { v: "12m", l: "Response" },
                                    { v: "95%", l: "Transparency" },
                                ].map((item, i) => (
                                    <div key={i} className="bg-[#0f1117] rounded-lg p-3 border border-[#1f2937] text-center hover:border-[#60a5fa]/40 transition">
                                        <p className="text-lg font-bold tex-fourth">{item.v}</p>
                                        <p className="text-[10px] text-third uppercase tracking-wide">{item.l}</p>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                    </div>
                </div>
            </div>
        </section>
    );
}