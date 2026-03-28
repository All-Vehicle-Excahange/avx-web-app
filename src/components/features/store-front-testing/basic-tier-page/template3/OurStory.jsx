"use client";

import React from "react";

export default function OurStory() {
    const commonValues = [
        { title: "Verified Trust", desc: "Every vehicle is vetted for transparency and history." },
        { title: "Diverse Range", desc: "A wide-reaching inventory across all major segments." },
        { title: "Expert Support", desc: "Professional guidance through every step of the purchase." }
    ];

    return (
        <section className="relative flex flex-col justify-center items-center py-12">

            <div className="mx-auto w-full flex flex-col gap-13">

                {/* Upper Row: Title and Description aligned horizontally */}
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-start">
                    <div className="flex flex-col  gap-6">
                        <p className="text-sm tracking-[0.4em] uppercase text-third font-semibold">
                           About Us
                        </p>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.05] text-primary font-[Montserrat]">
                            Our 
                            <span className="text-fourth/80"> Experience</span>
                        </h2>
                    </div>

                    <div className="flex flex-col gap-10">
                        <div className="flex flex-col gap-6">
                            <p className="text-third/70 text-lg md:text-xl font-[Poppins] leading-relaxed">
                                For over 12 years, Adarsh Auto Consultants has been helping buyers
                                discover reliable vehicles across Gujarat.
                            </p>
                            <p className="text-third/50 text-md font-[Poppins] leading-relaxed max-w-md">
                                Our goal is to maintain a diverse vehicle inventory and provide
                                accurate information so buyers can make confident decisions when
                                purchasing their next vehicle.
                            </p>
                        </div>
                    </div>
                </div>


            </div>

        </section>
    );
}