"use client";
import React, { useState, useEffect } from "react";

const commitmentData = {
    commitmentTitle: "Customer Commitment",
    commitmentText:
        "Our goal is to maintain transparent communication and assist buyers throughout the vehicle discovery and purchase process. We aim to provide honest guidance and reliable information for every buyer.",
    commitmentImages: [
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=1600&q=90",
        "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1600&q=90",
        "https://images.unsplash.com/photo-1664575602554-2087b04935a5?w=1600&q=90",
    ],
};

export default function CustomerCommitment() {
    const { commitmentTitle, commitmentText, commitmentImages } = commitmentData;
    const [active, setActive] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setActive((prev) => (prev + 1) % commitmentImages.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="py-12">
            <div className="relative flex items-center justify-center mx-2 lg:mx-4">

                {/* ── Background layer — overflow-hidden isolated here so padding on parent works ── */}
                <div className="absolute inset-0 overflow-hidden rounded-2xl ">
                    {commitmentImages.map((src, i) => (
                        <img
                            key={i}
                            src={src}
                            alt=""
                            aria-hidden
                            className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ${i === active ? "opacity-100 scale-100" : "opacity-0 scale-[1.04]"
                                }`}
                        />
                    ))}
                    <div className="absolute inset-0 bg-black/55" />
                    <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-black/30" />
                </div>

                {/* ── Centered content ── */}
                <div className="relative z-10 max-w-3xl mx-auto w-full flex flex-col items-center gap-8 px-4 py-20 text-center">

                    <div className="flex items-center gap-3">
                        <p className="text-sm tracking-[0.4em] uppercase text-third font-semibold">
                            Our Promise
                        </p>
                    </div>

                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.05] text-primary font-[Montserrat]">
                        {commitmentTitle.split("Commitment")[0]}
                        <span className="text-fourth/80">Commitment</span>
                    </h2>


                    <p className="text-white/70 text-lg md:text-xl font-[Poppins] leading-relaxed max-w-2xl">
                        {commitmentText}
                    </p>

                    {/* dot indicators — display only, no interaction
                    <div className="flex items-center gap-2 mt-2">
                        {commitmentImages.map((_, i) => (
                            <span
                                key={i}
                                className={`rounded-full transition-all duration-700 ${i === active ? "w-8 h-1.5 bg-fourth" : "w-1.5 h-1.5 bg-white/25"
                                    }`}
                            />
                        ))}
                    </div> */}
                </div>
            </div>
        </section>
    );
}