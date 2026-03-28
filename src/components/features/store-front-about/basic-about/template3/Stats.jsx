"use client";
import React from "react";

const statsData = {
    statsDesc: `Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec. Sapien platea nec urna ut est sed. Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec. Sapien platea nec urna ut est sed. Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec. Sapien platea nec urna ut est sed.`,
    stats: [
        { number: "150K+", label: "Active Users Worldwide" },
        { number: "$2B+", label: "Transactions Processed" },
        { number: "98%", label: "Customer Satisfaction" },
        { number: "100+", label: "Team Members" },
    ],
};

export default function Stats() {
    return (
        <section className="relative flex flex-col justify-center items-center py-12">
            <div className="mx-auto w-full">

                <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

                    {/* ── LEFT: eyebrow + title + desc ── */}
                    <div className="flex flex-col gap-8">

                        <div className="flex flex-col gap-6">
                            <p className="text-sm tracking-[0.4em] uppercase text-third font-semibold">
                                Stats
                            </p>
                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.05] text-primary font-[Montserrat]">
                                Numbers that
                                <br />
                                <span className="text-fourth/80">speak for us</span>
                            </h2>
                        </div>

                        <p className="text-third/70 text-md font-[Poppins] leading-relaxed max-w-md">
                            {statsData.statsDesc}
                        </p>

                    </div>

                    {/* ── RIGHT: 2x2 stats grid with cross dividers ── */}
                    <div className="relative grid grid-cols-2">

                        {/* Horizontal rule across center */}
                        <div className="absolute top-1/2 left-0 w-full h-px bg-third/20 -translate-y-1/2" />
                        {/* Vertical rule down center */}
                        <div className="absolute left-1/2 top-0 h-full w-px bg-third/20 -translate-x-1/2" />

                        {/* Top-left accent line */}
                        <div className="absolute top-0 right-1/2 w-8 h-px bg-fourth" />
                        {/* Bottom-right accent line */}
                        <div className="absolute bottom-0 left-1/2 w-8 h-px bg-fourth" />
                        {/* Top-right vertical accent */}
                        <div className="absolute top-0 left-1/2 w-px h-8 bg-fourth" />
                        {/* Bottom-left vertical accent */}
                        <div className="absolute bottom-0 right-1/2 w-px h-8 bg-fourth" />

                        {statsData.stats.map((stat, index) => (
                            <div
                                key={index}
                                className="flex flex-col gap-3 p-8 lg:p-10"
                            >
                                <p className="text-xl sm:text-2xl lg:text-3xl font-semibold leading-none text-primary font-[Montserrat]">
                                    {stat.number}
                                    
                                </p>
                                <p className="text-third/60 text-sm font-[Poppins] leading-snug">
                                    {stat.label}
                                </p>
                            </div>
                        ))}

                    </div>

                </div>

            </div>
        </section>
    );
}