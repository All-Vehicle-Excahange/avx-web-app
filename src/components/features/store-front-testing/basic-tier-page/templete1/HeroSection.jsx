"use client";

import { ArrowRight } from "lucide-react";

function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden flex items-center min-h-screen py-12 md:py-36">

     



      <div className="container relative">

        <p className="mb-4 text-sm tracking-[0.4em] uppercase text-third font-semibold">
          Trusted Auto Consultants
        </p>

  <h2 className="   text-3xl sm:text-4xl lg:text-5xl
              font-semibold
              leading-[1.05]
              text-primary
              font-[Montserrat]">
            Why Choose Adarsh
                <span className="text-fourth/80"> Auto Consultants</span>
          </h2>
     

        <p className="max-w-2xl text-base leading-relaxed text-third md:text-lg font-[Poppins]">
          Buyers trust Adarsh Auto Consultants for transparent communication, reliable vehicle options, and a smooth buying experience.
        </p>

        <div className="mt-10 flex flex-wrap gap-4">
          <a className="inline-flex items-center gap-2 border border-primary px-7 py-3 text-sm font-semibold text-primary transition-all  hover:border-third  font-[Montserrat]">
            See How It Works <ArrowRight size={16} />
          </a>
        </div>

      </div>
    </section>
  );
}

export default HeroSection;