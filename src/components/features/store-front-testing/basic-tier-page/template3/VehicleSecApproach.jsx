"use client";

import React from "react";

const data = {
    selectionTitle: "Our Approach to Vehicle Selection",
    selectionDescription: `Every vehicle listed through our storefront goes through a basic
internal evaluation before being presented to buyers. This helps
ensure that vehicles listed are suitable for serious buyers and
provides a smoother vehicle buying experience.`,
};

function VehicleSecApproach() {
    return (
        <section className="relative py-12 ">
            {/* Background Gradient from Global CSS */}

            <div className="max-w-6xl mx-auto">

                {/* ── Main All-Side Border Frame ────────────────────────────── */}
                <div className="border border-third/10 rounded-3xl p-10 md:p-16 relative shadow-2xl">



                    {/* ── Centered Content ─────────────────────────────────────── */}
                    <div className="flex flex-col items-center text-center gap-8 max-w-3xl mx-auto">
                        <div className="flex items-center gap-3 ">
                            <p className="text-sm tracking-[0.4em] uppercase text-third font-semibold">Vehicle Approach</p>
                        </div>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.05] text-primary font-[Montserrat]">
                            {data.selectionTitle.split("Vehicle Selection")[0]}
                            <span className="text-fourth/80">Vehicle Selection</span>
                        </h2>

                        <p className="text-third/60 text-base md:text-lg font-[Poppins] leading-[1.9] max-w-2xl">
                            {data.selectionDescription}
                        </p>

                    </div>



                </div>

            </div>
        </section>
    );
}

export default VehicleSecApproach;