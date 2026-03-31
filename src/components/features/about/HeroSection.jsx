"use client";

import Image from "next/image";
import Button from "@/components/ui/button";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden min-h-[75vh]">
      <div className="absolute inset-0 " />
      <div className="absolute right  -[-200px] top-[-200px] w-[600px] h-[600px] rounded-full" />

      <div className="relative  mx-auto w-full pt-14 lg:pt-10 pb-5">
        <div className="flex flex-col  lg:flex-row items-center gap-6 lg:gap-4 ">
          {/* LEFT TEXT */}
          <div className="w-full  lg:w-[40%]">
            <p className="text-sm tracking-[0.4em] uppercase text-third font-semibold mb-6">
              About Reecomm
            </p>

            <h2
              className="
            text-3xl sm:text-4xl lg:text-5xl
              font-semibold
              leading-[1.05]
              text-primary
              font-[Montserrat]
            "
            >
              Indias Premium
              <br />
              <span className="text-fourth/80">Pre-Owned Vehicle Platform</span>
            </h2>

            <p className="mt-8 text-lg text-third max-w-lg leading-relaxed">
              AVX brings structure, performance visibility, and trust into the
              used vehicle ecosystem — connecting serious buyers with verified
              consultants and inspected inventory.
            </p>

            {/* CTA */}
            <div className="flex flex-wrap gap-5 mt-10">
              <Button variant="ghost" size="md">
                {" "}
                Browse Vehicles
              </Button>
              <Button variant="outlineSecondary" size="md">
                {" "}
                Browse Vehicles
              </Button>
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="w-full  lg:w-[60%] relative h-[260px] sm:h-[340px] md:h-[420px] lg:h-[480px]">
            <Image
              src="https://images.pexels.com/photos/35917021/pexels-photo-35917021.jpeg"
              alt="Vehicle"
              fill
              className="object-cover rounded-2xl"
              sizes="(max-width: 1024px) 100vw, 60vw"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
