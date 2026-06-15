import React from "react";
import Image from "next/image";
import Button from "@/components/ui/button";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      {/* Ambient Glow */}
      <div className="absolute right-[-200px] top-[-200px] w-[600px] h-[600px] rounded-full pointer-events-none" />

      <div className="relative mx-auto w-full py-16 lg:py-20">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
          {/* LEFT TEXT */}
          <div className="w-full lg:w-[48%]">
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
              We didn&apos;t build
              <br />
              <span className="text-fourth/80">another listing site.</span>
            </h2>

            <p className="mt-8 text-lg text-third max-w-lg leading-relaxed">
              The used vehicle market in India is one of the largest in the
              world — and one of the most unstructured. Buyers guess.
              Consultants hustle through WhatsApp groups and referral chains.
              Trust is a matter of luck, not design.
              <br />
              <br />
              Reecomm was built to change that. Not by adding more listings to
              the internet — but by creating the infrastructure that makes every
              interaction between a buyer and a consultant worth trusting.
            </p>

            {/* CTA */}
            <div className="flex flex-wrap gap-5 mt-10">
              <Button variant="ghost" href={"/search"} size="md">
                Browse Vehicles
              </Button>
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="w-full lg:w-[48%] relative h-[260px] sm:h-[340px] md:h-[420px] lg:h-[480px]">
            <Image
              src="https://images.pexels.com/photos/35917021/pexels-photo-35917021.jpeg"
              alt="Vehicle"
              fill
              className="object-cover rounded-2xl shadow-xl hover:shadow-2xl border border-white/5 transition-all duration-300"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
