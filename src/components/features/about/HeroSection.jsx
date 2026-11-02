import React from "react";
import Button from "@/components/ui/button";
import ReecommLogoLockup from "./ReecommLogoLockup";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden w-full">
      <div className="relative w-full pt-16 sm:pt-20 lg:pt-20 pb-12 sm:pb-16 lg:pb-20">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-14">
          {/* LEFT TEXT - Full Natural Width without artificial side constraints */}
          <div className="w-full lg:w-[48%] text-left flex flex-col items-start">
            <p className="text-xs sm:text-sm tracking-[0.4em] uppercase text-third font-semibold mb-3 sm:mb-6">
              About Reecomm
            </p>

            <h2
              className="
                text-3xl sm:text-4xl lg:text-5xl
                font-semibold
                leading-[1.1] sm:leading-[1.05]
                text-primary
                font-[Montserrat]
              "
            >
              We didn&apos;t build
              <br />
              <span className="text-fourth/80">another listing site.</span>
            </h2>

            <p className="mt-5 sm:mt-8 text-base sm:text-lg text-third max-w-xl leading-relaxed">
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
            <div className="flex flex-wrap justify-start gap-4 sm:gap-5 mt-6 sm:mt-10">
              <Button variant="ghost" href={"/search"} size="md">
                Browse Vehicles
              </Button>
            </div>
          </div>

          {/* RIGHT INTERACTIVE PARTICLE LOGO CANVAS - Large & Expansive */}
          <div className="w-full lg:w-[50%] flex items-center justify-center relative mt-6 lg:mt-0">
            <ReecommLogoLockup maxWidth={900} />
          </div>
        </div>
      </div>
    </section>
  );
}
