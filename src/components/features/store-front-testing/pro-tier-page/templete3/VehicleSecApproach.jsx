"use client";

import React from "react";

const data = {
    selectionTitle: "Our Approach to Vehicle Selection",
    selectionDescription: `Every vehicle listed through our storefront goes through a basic
internal evaluation before being presented to buyers. This helps
ensure that vehicles listed are suitable for serious buyers and
provides a smoother vehicle buying experience.`,
    selectionImages: [
        "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=1600&q=90",
        "https://images.unsplash.com/photo-1542362567-b07e54358753?w=1600&q=90",
        "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=1600&q=90",
        "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=1600&q=90",
        "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=1600&q=90",
    ],
};

function VehicleSecApproach() {
    return (
        <section className="relative py-12">
            <div className=" mx-auto px-2 lg:px-4">

                {/* ── Content ───────────────── */}
                <div className="flex flex-col   gap-6 max-w-3xl mx-auto mb-14">
                    <span className="text-sm tracking-[0.4em] uppercase text-third font-semibold">
                        Vehicle Approach
                    </span>

                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.05] text-primary font-[Montserrat]">
                        {data.selectionTitle.split("Vehicle Selection")[0]}
                        <span className="text-fourth/80">Vehicle Selection</span>
                    </h2>

                    <p className="text-primary/70 text-base font-[Poppins] leading-relaxed max-w-2xl">
                        {data.selectionDescription}
                    </p>
                </div>

                {/* ── Split Focus Band ───────── */}

                <div className="flex gap-4 h-[260px]">

                    {/* Left Big */}
                    <div className="w-[35%] rounded-3xl overflow-hidden border border-third/10">
                        <img src={data.selectionImages[0]} className="w-full h-full object-cover" />
                    </div>

                    {/* Middle Stack */}
                    <div className="w-[25%] flex flex-col gap-4">
                        <div className="h-1/2 rounded-2xl overflow-hidden border border-third/10">
                            <img src={data.selectionImages[1]} className="w-full h-full object-cover" />
                        </div>
                        <div className="h-1/2 rounded-2xl overflow-hidden border border-third/10">
                            <img src={data.selectionImages[2]} className="w-full h-full object-cover" />
                        </div>
                    </div>

                    {/* Right Big */}
                    <div className="w-[40%] rounded-3xl overflow-hidden border border-third/10">
                        <img src={data.selectionImages[3]} className="w-full h-full object-cover" />
                    </div>

                </div>



            </div>
        </section>
    );
}

export default VehicleSecApproach;