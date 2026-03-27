"use client";

import React from "react";
import { Camera, Minus } from "lucide-react";

const data = {
    galleryTitle: "Our Showroom & Team",
    galleryImages: [
        "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=1600&q=90",
        "https://images.unsplash.com/photo-1542362567-b07e54358753?w=1600&q=90",
        "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=1600&q=90",
        "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=1600&q=90",
    ],
};

function Gallery() {
    return (
        <section className="py-12 overflow-hidden">
            <div className=" mx-auto px-2 lg:px-4">
                
                {/* ── HEADER ────────────────────────────────────────────── */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex flex-col gap-6">
                        <div className="">
                            <p className="text-sm tracking-[0.4em] uppercase text-third font-semibold ">
                                Gallery
                            </p>
                        </div>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.05] text-primary font-[Montserrat]">
                            {data.galleryTitle.split(" & ")[0]} <br />
                            <span className="text-fourth/80">& {data.galleryTitle.split(" & ")[1]}</span>
                        </h2>
                    </div>
                    <Camera size={32} className="text-third/10 hidden md:block" />
                </div>

                {/* ── MAPPED MASONRY GRID ────────────────────────────────── */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {data.galleryImages.map((img, i) => (
                        <div 
                            key={i}
                            className={`relative rounded-2xl overflow-hidden border border-third/10 group
                                ${i % 3 === 0 ? "md:col-span-2 aspect-video" : "aspect-square"}
                            `}
                        >
                            {/* Image with no grayscale */}
                            <img 
                                src={img} 
                                className="w-full h-full object-cover brightness-50 group-hover:brightness-110 group-hover:scale-105 transition-all duration-1000"
                                alt={`Gallery item ${i + 1}`}
                            />
                            
                            
                        </div>
                    ))}
                </div>


            </div>
        </section>
    );
}

export default Gallery;