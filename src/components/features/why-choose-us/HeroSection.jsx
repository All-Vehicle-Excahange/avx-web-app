"use client";
import React from "react";
import { ArrowUpRight, ShieldCheck, Activity } from "lucide-react";

export default function ProfessionalHero() {
    return (
        /* Change 1: Move bg-secondary to the root section to ensure the whole page is black */
        <section className="relative min-h-screen flex flex-col  overflow-hidden font-secondary">
            
            {/* 1. TECHNICAL BACKGROUND */}
            <div className="absolute inset-0 z-0 pointer-events-none bg-secondary">
                <div
                    className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
                        backgroundSize: '80px 40px'
                    }}
                />
            </div>

            {/* 2. MAIN INTERFACE GRID */}
            <div className="relative z-10 flex-1 grid lg:grid-cols-12 w-full max-w-7xl mx-auto items-center">

                {/* LEFT: CONTENT (6 Cols) */}
                <div className="lg:col-span-6 px-6 py-12 flex flex-col justify-center">
                    <div className="mb-6">
                        <div className="inline-flex items-center gap-2 mb-4">
                            <span className="w-1 h-1 rounded-full bg-fourth" />
                            <span className="text-fourth font-bold text-[10px] uppercase tracking-widest">
                                Premium Automotive Visual
                            </span>
                        </div>

                        <h1 className="font-primary text-3xl sm:text-4xl lg:text-5xl font-bold text-primary leading-tight tracking-tight uppercase font-primary">
                            A Structured Marketplace <br />
                            For Serious <span className="text-fourth">Vehicle Buyers</span>
                        </h1>
                    </div>

                    <p className="text-sm md:text-base text-third max-w-md leading-relaxed mb-8 opacity-80">
                        AVX is built for <span className="text-primary font-medium">clarity, accountability, and performance transparency</span> in the pre-owned vehicle ecosystem.
                        Unlike open classifieds, we operate through verified consultants and structured listings.
                    </p>

                    <div className="flex flex-wrap gap-4">
                        <button className="flex items-center gap-2 bg-fourth px-6 py-3 text-white font-bold uppercase tracking-widest text-[10px] transition-transform hover:scale-[1.02]">
                            Browse Vehicles <ArrowUpRight size={14} />
                        </button>
                        <button className="px-6 py-3 border border-white/10 text-primary font-bold uppercase tracking-widest text-[10px] hover:bg-white/5 transition-all">
                            Become a Consultant
                        </button>
                    </div>
                </div>

                {/* RIGHT: IMAGE CONTAINER (6 Cols) */}
                <div className="lg:col-span-6 p-10">
                    <div className="relative aspect-square w-full bg-zinc-900 border border-white/10 shadow-xl overflow-hidden group">
                        <img
                            src="https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?q=80&w=2070&auto=format&fit=crop"
                            alt="Premium Vehicle"
                            className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0"
                        />

                        {/* Discrete HUD Overlays */}
                        <div className="absolute top-4 right-4 bg-secondary/90 px-3 py-2 border border-white/10 flex items-center gap-2">
                            <Activity size={12} className="text-fourth" />
                            <span className="text-[8px] text-primary font-bold uppercase tracking-widest">System Stability: Active</span>
                        </div>

                        <div className="absolute bottom-0 left-0 bg-fourth px-5 py-3 flex items-center gap-4">
                            <div className="text-white border-r border-white/20 pr-4">
                                <p className="text-xl font-black italic">200+</p>
                                <p className="text-[7px] uppercase font-bold tracking-widest">Audit Framework</p>
                            </div>
                            <ShieldCheck size={20} className="text-white" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}