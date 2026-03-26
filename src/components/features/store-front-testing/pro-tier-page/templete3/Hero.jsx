"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";

const data = {
    heroTitle: "Why Choose Adarsh Auto Consultants",
    heroDescription: `Buyers trust Adarsh Auto Consultants for transparent communication,
reliable vehicle options, and a smooth buying experience. Our goal
is to help every buyer make confident vehicle decisions with clear
information and professional support.`,
    heroImages: [
        "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=1600&q=90",
        "https://images.unsplash.com/photo-1542362567-b07e54358753?w=1600&q=90",
        "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=1600&q=90",
        "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=1600&q=90",
        "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=1600&q=90",
    ],
};

const INTERVAL = 5000;

function Hero() {
    const [active, setActive] = useState(0);
    const [fading, setFading] = useState(false);
    const activeRef = useRef(0);
    const total = data.heroImages.length;

    const goTo = useCallback((index) => {
        setFading(true);
        setTimeout(() => {
            setActive(index);
            activeRef.current = index;
            setFading(false);
        }, 500);
    }, []);

    useEffect(() => {
        const id = setInterval(() => {
            goTo((activeRef.current + 1) % total);
        }, INTERVAL);
        return () => clearInterval(id);
    }, []);

    return (
        <section className="relative w-full overflow-hidden min-h-screen">

            {/* ── Background image ─────────────────────────────────────────── */}
            <img
                src={data.heroImages[active]}
                alt="vehicle"
                className="absolute inset-0 w-full h-full object-cover"
                style={{
                    opacity: fading ? 0 : 1,
                    transform: fading ? "scale(1.04)" : "scale(1)",
                    transition: "opacity 0.5s ease, transform 0.5s ease",
                }}
            />

            {/* ── Gradient overlay — dark center, lighter edges ─────────────── */}
            <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/50 to-black/30" />

            {/* ── Centered text — no card, no box ──────────────────────────── */}
            <div className="absolute inset-0 flex items-center justify-center px-8">
                <div className="max-w-3xl w-full flex flex-col items-center text-center gap-6">

                    <p className="text-sm tracking-[0.4em] uppercase text-third font-semibold ">
                        Why Choose Us
                    </p>

                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.05] text-primary font-[Montserrat]">
                        Why Choose
                        <span className="text-fourth"> Adarsh Auto</span>
                        <br />
                        <span className="text-primary">Consultants</span>
                    </h2>

                    <p className="text-primary/70 text-base font-[Poppins] leading-relaxed">
                        {data.heroDescription}
                    </p>

                    <div className="pt-4">
                        <a
                            href="#"
                            className="font-[Montserrat] font-bold text-sm tracking-[0.15em] uppercase text-primary border-b border-third/40 pb-0.5 hover:border-primary transition-colors duration-200"
                        >
                            Explore Listings →
                        </a>
                    </div>


                </div>
            </div>

        </section>
    );
}

export default Hero;