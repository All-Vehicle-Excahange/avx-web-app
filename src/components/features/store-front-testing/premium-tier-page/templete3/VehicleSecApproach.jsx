"use client";

import React, { useState } from 'react'

function VehicleSecApproach() {

    const data = {
        selectionTitle: "Our Approach to Vehicle Selection",
        selectionDescription: `Every vehicle listed through our storefront goes through a basic
        internal evaluation before being presented to buyers. This helps
        ensure that vehicles listed are suitable for serious buyers and
        provides a smoother vehicle buying experience.`,
        selectionImages: [
            "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1400&q=85",
            "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=1400&q=85",
            "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=1400&q=85",
            "https://images.unsplash.com/photo-1542362567-b07e54358753?w=1400&q=85",
            "https://images.unsplash.com/photo-1520031441872-265e4ff70366?w=1400&q=85",
        ],
    }

    const [activeIndex, setActiveIndex] = useState(0)
    const [hoverIndex, setHoverIndex] = useState(null)

    const displayIndex = hoverIndex !== null ? hoverIndex : activeIndex

    return (
        <>
            <style>{`
                @keyframes fadeUp {
                    from { opacity: 0; transform: translateY(28px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to   { opacity: 1; }
                }
                @keyframes bgFade {
                    from { opacity: 0; }
                    to   { opacity: 1; }
                }

                .anim-label  { animation: fadeIn 0.6s ease 0.2s both; }
                .anim-title  { animation: fadeUp 1s   cubic-bezier(.22,1,.36,1) 0.35s both; }
                .anim-rule   { animation: fadeIn 0.5s ease 0.6s both; }
                .anim-desc   { animation: fadeUp 0.8s cubic-bezier(.22,1,.36,1) 0.55s both; }
                .anim-thumbs { animation: fadeUp 0.8s cubic-bezier(.22,1,.36,1) 0.75s both; }

                .bg-crossfade { transition: opacity 0.55s cubic-bezier(.22,1,.36,1); }

                .thumb-img img { transition: transform 0.7s cubic-bezier(.22,1,.36,1); }
                .thumb-img:hover img { transform: scale(1.1); }
            `}</style>

            <section className="relative flex flex-col justify-center items-center py-12 overflow-hidden">
                <div className="mx-auto w-full px-2 lg:px-4 ">

                    {/* ══ MAIN CINEMATIC BLOCK ══ */}
                    <div className="relative w-full h-[500px] sm:h-[460px] lg:h-[520px] rounded-3xl overflow-hidden">

                        {/* All images stacked — only active one is visible */}
                        {data.selectionImages.map((img, i) => (
                            <img
                                key={i}
                                src={img}
                                alt={`Vehicle ${i + 1}`}
                                className={`bg-crossfade absolute inset-0 w-full h-full object-cover object-center ${
                                    displayIndex === i ? 'opacity-100' : 'opacity-0'
                                }`}
                            />
                        ))}

                        {/* Layered overlays */}
                        <div className="absolute inset-0 bg-linear-to-t from-black/95 via-black/40 to-black/10" />
                        <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent" />

                        {/* ── CONTENT — pinned bottom ── */}
                        <div className="absolute bottom-0 left-0 right-0 flex flex-col gap-6 px-8 sm:px-12 lg:px-14 pb-8">

                            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">

                                {/* Left — label + title + desc */}
                                <div className="flex flex-col gap-5 max-w-xl">

                                    <div className="anim-label flex items-center gap-3">
                                           <p className="text-sm tracking-[0.4em] uppercase text-third font-semibold">Vehicle Approach</p>
                                    </div>

                                    <h2 className="anim-title text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.05] text-primary font-[Montserrat]">
                                        Our Approach to{" "}
                                        <span className="text-fourth/80">Vehicle Selection</span>
                                    </h2>

                                

                                    <p className="anim-desc text-third/60 text-sm sm:text-base font-[Poppins] leading-relaxed">
                                        {data.selectionDescription.trim()}
                                    </p>

                                </div>

                                {/* Right — thumbnail strip */}
                                <div className="anim-thumbs flex gap-3 shrink-0 overflow-x-scroll  no-scrollbar">
                                    {data.selectionImages.map((img, i) => (
                                        <div
                                            key={i}
                                            className={`thumb-img relative overflow-hidden rounded-xl border shrink-0 cursor-pointer transition-all duration-300 ${
                                                activeIndex === i
                                                    ? 'border-primary/30 w-24 h-[76px] sm:w-[108px] sm:h-[86px]'
                                                    : 'border-white/10 hover:border-third/40 w-[74px] h-[60px] sm:w-[84px] sm:h-[68px] opacity-50 hover:opacity-90'
                                            }`}
                                            onClick={() => setActiveIndex(i)}
                                            onMouseEnter={() => setHoverIndex(i)}
                                            onMouseLeave={() => setHoverIndex(null)}
                                        >
                                            <img
                                                src={img}
                                                alt={`Thumb ${i + 1}`}
                                                className="w-full h-full object-cover"
                                            />
                                            <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent pointer-events-none" />

                                            {/* Active indicator bar */}
                                            {activeIndex === i && (
                                                <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-5 h-0.5 rounded-full bg-third/80" />
                                            )}
                                        </div>
                                    ))}
                                </div>

                            </div>

                        </div>
                    </div>

                </div>

            </section>
        </>
    )
}

export default VehicleSecApproach