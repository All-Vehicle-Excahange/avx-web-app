"use client";
import React, { useState, useEffect, useRef } from "react";

const inspectionData = {
    inspectionTitle: "AVX Inspection Assurance",
    inspectionText:
        "AVX inspection services provide additional transparency by documenting key aspects of the vehicle's condition before purchase.",
    inspectionPoints: [
        {
            label: "Exterior condition check",
            image: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=1200&q=85",
            tag: "01 — Exterior",
        },
        {
            label: "Interior condition check",
            image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=85",
            tag: "02 — Interior",
        },
        {
            label: "Visible mechanical components",
            image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=1200&q=85",
            tag: "03 — Mechanical",
        },
        {
            label: "Photo & video documentation",
            image: "https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=1200&q=85",
            tag: "04 — Documentation",
        },
    ],
};

const AUTOPLAY_DURATION = 4000;

export default function AvxInspection() {
    const { inspectionText, inspectionPoints } = inspectionData;
    const [active, setActive] = useState(0);
    const [progress, setProgress] = useState(0);
    const [paused, setPaused] = useState(false);
    const progressRef = useRef(null);
    const startTimeRef = useRef(null);
    const elapsedRef = useRef(0);

    const startProgress = () => {
        startTimeRef.current = performance.now() - elapsedRef.current;
        progressRef.current = requestAnimationFrame(function tick(now) {
            const elapsed = now - startTimeRef.current;
            const pct = Math.min((elapsed / AUTOPLAY_DURATION) * 100, 100);
            setProgress(pct);
            elapsedRef.current = elapsed;
            if (pct < 100) {
                progressRef.current = requestAnimationFrame(tick);
            } else {
                elapsedRef.current = 0;
                setActive((prev) => (prev + 1) % inspectionPoints.length);
            }
        });
    };

    const stopProgress = () => {
        if (progressRef.current) cancelAnimationFrame(progressRef.current);
    };

    useEffect(() => {
        if (!paused) startProgress();
        return () => stopProgress();
    }, [active, paused]);

    const handleSelect = (i) => {
        stopProgress();
        elapsedRef.current = 0;
        setProgress(0);
        setActive(i);
        setPaused(false);
    };

    const current = inspectionPoints[active];

    return (
        <section className="relative flex flex-col justify-center items-center py-12 overflow-hidden">
            {/* ambient glow */}

            <div className="max-w-7xl mx-auto w-full flex flex-col gap-8 relative z-10 px-2 lg:px-4">

                {/* ── Top header ── */}
                <div className="flex flex-col gap-4">
                    <p className="text-sm tracking-[0.4em] uppercase text-third font-semibold">
                        Avx Inspection
                    </p>
                    <div className="flex flex-col gap-4">
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.05] text-primary font-[Montserrat]">
                            {inspectionData.inspectionTitle.split("Assurance")[0]}
                            <span className="text-fourth/80">Assurance</span>
                        </h2>
                        <p className="text-third/60 text-base font-[Poppins] leading-relaxed max-w-md ">
                            {inspectionText}
                        </p>
                    </div>
                </div>

                {/* ── Cinematic main block ── */}
                <div className="grid lg:grid-cols-[1fr_360px] gap-4 items-stretch">

                    {/* Left — full-bleed cinematic image frame */}
                    <div
                        className="relative overflow-hidden rounded-2xl aspect-16/10 lg:aspect-auto bg-secondary cursor-pointer"
                        onMouseEnter={() => setPaused(true)}
                        onMouseLeave={() => setPaused(false)}
                    >
                        {inspectionPoints.map((point, i) => (
                            <img
                                key={i}
                                src={point.image}
                                alt={point.label}
                                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${i === active ? "opacity-100" : "opacity-0"
                                    }`}
                            />
                        ))}

                        {/* cinematic overlays */}
                        <div className="absolute inset-0 bg-linear-to-t from-black/75 via-black/10 to-transparent" />
                        <div className="absolute inset-0 bg-linear-to-r from-black/30 to-transparent" />

                        {/* Top-left: live tag */}
                        <div className="absolute top-5 left-5 flex items-center gap-2">
                            <span className="text-xs font-[Poppins] text-primary/80 tracking-[0.3em] uppercase">
                                {current.tag}
                            </span>
                        </div>

                        {/* Top-right: pause/play indicator */}
                        <div className="absolute top-5 right-5">
                            <div className="w-8 h-8 rounded-full border border-white/20 bg-black/30 backdrop-blur-sm flex items-center justify-center">
                                {paused ? (
                                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                        <path d="M4.5 2.5v7M7.5 2.5v7" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                                    </svg>
                                ) : (
                                    <svg width="10" height="12" viewBox="0 0 10 12" fill="none">
                                        <path d="M1.5 1.5l7 4.5-7 4.5V1.5z" fill="white" />
                                    </svg>
                                )}
                            </div>
                        </div>

                        {/* Bottom: label + scrubber + dots */}
                        <div className="absolute bottom-0 left-0 right-0 px-5 pb-5 flex flex-col gap-3">
                            <p className="text-primary font-[Montserrat] font-semibold text-lg sm:text-xl">
                                {current.label}
                            </p>
                            <div className="w-full h-0.5 bg-white/20 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-primary rounded-full"
                                    style={{ width: `${progress}%`, transition: "none" }}
                                />
                            </div>
                            <div className="flex items-center gap-2">
                                {inspectionPoints.map((_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => handleSelect(i)}
                                        className={`rounded-full transition-all duration-300 ${i === active
                                                ? "w-6 h-1.5 bg-primary"
                                                : "w-1.5 h-1.5 bg-white/30 hover:bg-white/60"
                                            }`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right — vertical checklist with thumbnails */}
                    <div className="flex flex-col justify-between gap-3">
                        {inspectionPoints.map((point, i) => (
                            <button
                                key={i}
                                onClick={() => handleSelect(i)}
                                className={`relative flex items-start gap-4 rounded-xl px-5 py-4 text-left transition-all duration-300 overflow-hidden border cursor-pointer ${i === active
                                        ? "border-third/30 bg-third/5"
                                        : "border-white/6 bg-white/2 hover:border-white/12"
                                    }`}
                            >
                                {/* active left accent bar */}
                                <div
                                    className={`absolute left-0 top-3 bottom-3 w-0.5 rounded-full transition-all duration-300 ${i === active ? "bg-third" : "bg-transparent"
                                        }`}
                                />

                                {/* thumbnail */}
                                <div className="shrink-0 w-14 h-14 rounded-lg overflow-hidden">
                                    <img
                                        src={point.image}
                                        alt={point.label}
                                        className={`w-full h-full object-cover transition-all duration-500 ${i === active ? "scale-110" : "scale-100 grayscale opacity-50"
                                            }`}
                                    />
                                </div>

                                <div className="flex flex-col gap-1 flex-1 min-w-0">
                                    <span
                                        className={`text-[10px] tracking-[0.3em] uppercase font-[Poppins] font-medium transition-colors duration-300 ${i === active ? "text-primary/90" : "text-third/40"
                                            }`}
                                    >
                                        {point.tag}
                                    </span>
                                    <span
                                        className={`text-sm font-[Poppins] leading-snug transition-colors duration-300 ${i === active ? "text-primary" : "text-third/60"
                                            }`}
                                    >
                                        {point.label}
                                    </span>
                                </div>
                            </button>
                        ))}

                    </div>
                </div>

            </div>
        </section>
    );
}