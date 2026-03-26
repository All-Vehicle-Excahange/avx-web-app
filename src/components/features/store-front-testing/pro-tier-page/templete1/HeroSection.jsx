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
  heroImages: [
    "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?q=80&w=1200",
    "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=1200",
    "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200",
    "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=1200",
    "https://images.unsplash.com/photo-1583267746897-2cf415887172?q=80&w=1200",
  ],
};

function HeroSection() {
  return (
    <section className="relative px-4 w-full min-h-screen flex items-center overflow-hidden py-12 md:py-32">

      <div className="container  relative grid md:grid-cols-2 gap-1 items-center">

        {/* ── LEFT CONTENT ───────────────── */}
        <div className="relative z-10 md:pr-10">

          <p className="mb-4 text-sm tracking-[0.4em] uppercase text-third font-semibold">
            Trusted Auto Consultants
          </p>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.05] text-primary font-[Montserrat]">
            Why Choose Adarsh
            <span className="text-fourth/80"> Auto Consultants</span>
          </h2>

          {heroData.heroDescription
            .trim()
            .split("\n")
            .map((line, i) => (
              <p
                key={i}
                className="max-w-2xl text-base leading-relaxed text-third md:text-lg font-[Poppins] mt-2"
              >
                {line.trim()}
              </p>
            ))}

          <div className="mt-10">
            <a className="group inline-flex items-center gap-2 border border-primary px-7 py-3 text-sm font-semibold text-primary transition-all duration-300 hover:gap-3 font-[Montserrat]">
              See How It Works
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </a>
          </div>

        </div>

        {/* ── RIGHT VISUAL (SCATTERED COLLAGE) ───────────────── */}
        <div className="relative hidden md:block h-[500px]">

          {/* center main */}
          <div className="absolute top-[10%] left-[20%] w-[55%] h-[60%] rounded-2xl overflow-hidden shadow-xl z-10">
            <img src={heroData.heroImages[0]} className="w-full h-full object-cover" />
          </div>

          {/* tilted left */}
          <div className="absolute top-[0%] left-[0%] w-[38%] h-[38%] rounded-2xl overflow-hidden rotate-[-8deg] opacity-90">
            <img src={heroData.heroImages[1]} className="w-full h-full object-cover" />
          </div>

          {/* tilted right */}
          <div className="absolute top-[5%] right-[0%] w-[38%] h-[42%] rounded-2xl overflow-hidden rotate-6 opacity-90">
            <img src={heroData.heroImages[2]} className="w-full h-full object-cover" />
          </div>

          {/* bottom left */}
          <div className="absolute bottom-[0%] left-[10%] w-[40%] h-[35%] rounded-2xl overflow-hidden rotate-[4deg] opacity-90">
            <img src={heroData.heroImages[3]} className="w-full h-full object-cover" />
          </div>

          {/* floating top card */}
          <div className="absolute top-[55%] right-[10%] w-[30%] h-[30%] rounded-2xl overflow-hidden shadow-2xl -rotate-6 z-20">
            <img src={heroData.heroImages[4]} className="w-full h-full object-cover" />
          </div>

        </div>

      </div>
    </section>
  );
}

export default HeroSection;