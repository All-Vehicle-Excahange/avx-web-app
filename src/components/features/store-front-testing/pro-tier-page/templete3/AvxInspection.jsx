"use client";

import React, { useState } from "react";
import { Check, ShieldAlert } from "lucide-react";

const data = {
    inspectionTitle: "AVX Inspection Assurance",
    inspectionText: `AVX inspection services provide additional transparency by documenting key aspects of the vehicle's condition before purchase.`,
    inspectionPoints: [
        "Exterior condition check",
        "Interior condition check",
        "Visible mechanical components",
        "Photo & video documentation",
    ],
    inspectionImages: [
 "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=1600&q=90",
        "https://images.unsplash.com/photo-1542362567-b07e54358753?w=1600&q=90",
        "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=1600&q=90",
        "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=1600&q=90",
    ],
};

function AvxInspection() {
    const [avxInspectionHovered, setAvxInspectionHovered] = useState(0);

    return (
        <section className="py-12">
            <div className=" mx-auto px-2 lg:px-4">

                {/* ── TOP HEADER ────────────────────────────────────────── */}
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 mb-16">
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <p className="text-sm tracking-[0.4em] uppercase text-third font-semibold">
                                Avx Inspection
                            </p>
                        </div>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.05] text-primary font-[Montserrat]">
                            {data.inspectionTitle.split("Assurance")[0]}
                            <span className="text-fourth/80">Assurance</span>
                        </h2>
                        <p className="max-w-xs text-third/55 text-sm font-[Poppins] leading-[1.8] border-l border-third/10 ">
                            {data.inspectionText}
                        </p>
                    </div>

                </div>

                {/* ── VERTICAL STEP GRID ──────────────────────────────────── */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-px bg-third/10 border border-third/10 rounded-2xl overflow-hidden">
                    {data.inspectionPoints.map((point, i) => (
                        <div
                            key={i}
                            onMouseEnter={() => setAvxInspectionHovered(i)}
                            className="relative bg-secondary/10 p-10 flex flex-col gap-12 transition-colors group cursor-default h-full min-h-60"
                        >
                            {/* Background Image Layer */}
                            <img
                                src={data.inspectionImages[i]}
                                alt={point}
                                className="absolute inset-0 w-full h-full object-cover grayscale brightness-[0.15] group-hover:brightness-[0.45] transition-all duration-700"
                            />

                            {/* Content Layer */}
                            <div className="relative z-10 flex flex-col justify-between h-full">
                                <div className="flex justify-between items-start">
                                    <span className="text-2xl font-black font-[Montserrat] text-third/10 group-hover:text-third/20 transition-colors">
                                        0{i + 1}
                                    </span>
                                    <div className={`w-10 h-10 rounded-xl border border-third/10 flex items-center justify-center transition-all ${avxInspectionHovered === i ? 'bg-third/5 border-third' : 'bg-black/40 backdrop-blur-md'}`}>
                                        <Check size={16} className={avxInspectionHovered === i ? 'text-primary' : 'text-third/20'} />
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <h3 className="text-lg font-bold font-[Montserrat] text-primary uppercase tracking-tight leading-tight">
                                        {point.split(" ").slice(0, 2).join(" ")}
                                    </h3>
                                    <p className="text-xs text-third/40 font-[Poppins] leading-relaxed uppercase tracking-wider">
                                        {point}
                                    </p>
                                </div>
                            </div>

                            {/* Bottom Accent */}
                            <div className={`absolute bottom-0 left-0 h-1 bg-third   transition-all duration-500 ${avxInspectionHovered === i ? 'w-full' : 'w-0'}`} />
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}

export default AvxInspection;