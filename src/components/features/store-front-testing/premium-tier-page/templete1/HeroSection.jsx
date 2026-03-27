"use client";

import { ArrowRight } from "lucide-react";

const heroData = {
  heroTitle: "Why Choose Adarsh Auto Consultants",
  heroDescription: `
    Buyers trust Adarsh Auto Consultants for transparent communication,
    reliable vehicle options, and a smooth buying experience. Our goal
    is to help every buyer make confident vehicle decisions with clear
    information and professional support.
  `,
};

const galleryImages = [
  { src: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&q=80" },
  { src: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&q=80" },
  { src: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80" },
  { src: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&q=80" },
];

function HeroSection() {
  return (
    <section className="relative w-full min-h-screen flex items-center overflow-hidden px-4 py-12">

      <div className="container mx-auto max-w-7xl grid lg:grid-cols-2 gap-12 items-center">

        {/* LEFT CONTENT */}
        <div>

          <p className="mb-4 text-sm tracking-[0.4em] uppercase text-third font-semibold">
            Trusted Auto Consultants
          </p>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.05] text-primary font-[Montserrat]">
            Why Choose Adarsh
            <span className="text-fourth/80"> Auto Consultants</span>
          </h2>

          <p className="text-[#a89f94] text-base md:text-lg leading-relaxed font-[Poppins] max-w-lg mb-10">
            {heroData.heroDescription.trim()}
          </p>

          {/* CTA */}
          <div className="mt-10">
            <a className="group inline-flex items-center gap-2 border border-primary px-7 py-3 text-sm font-semibold text-primary transition-all duration-300 hover:gap-4 hover:shadow-[0_0_25px_rgba(184,150,62,0.25)] font-[Montserrat]">
              See How It Works
              <ArrowRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-2"
              />
            </a>
          </div>

        </div>

        {/* RIGHT SIDE (NOW ALWAYS VISIBLE) */}
        <div className="flex flex-col gap-5 mt-10 lg:mt-0">

          {/* VIDEO */}
          <div className="group relative rounded-2xl overflow-hidden border border-[#b8963e]/20 transition-all duration-500 hover:shadow-[0_20px_60px_rgba(184,150,62,0.25)]">
            
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-[220px] sm:h-[260px] object-cover transition-transform duration-700 group-hover:scale-105"
              src="https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4"
            />

            <div className="absolute inset-0 bg-linear-to-t from-[#0a0a0c]/70 to-transparent" />
          </div>

          {/* IMAGE GRID */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {galleryImages.map((img, i) => (
              <div
                key={i}
                className="group relative rounded-xl overflow-hidden border border-[#b8963e]/15 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_15px_40px_rgba(0,0,0,0.6)]"
              >
                <img
                  src={img.src}
                  className="w-full h-[110px] sm:h-[130px] object-cover transition-transform duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-linear-to-t from-[#0a0a0c]/70 via-[#b8963e]/10 to-transparent opacity-70 group-hover:opacity-90 transition duration-300" />

                <div className="absolute inset-0 border border-transparent group-hover:border-[#b8963e]/40 transition-all duration-300 rounded-xl" />
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}

export default HeroSection;