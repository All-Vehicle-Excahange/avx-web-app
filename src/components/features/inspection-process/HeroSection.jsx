"use client";
import Image from "next/image";

import Button from "@/components/ui/button";

export default function HeroSection() {
  return (
    <section className="relative w-full min-h-[75vh] sm:min-h-[85vh] lg:min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-10 sm:pt-24 sm:pb-14 lg:pt-28 lg:pb-20">
      {/* BACKGROUND IMAGE */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/engine-and-powertrain.webp"
          alt="Reecomm Inspection"
          fill
          priority
          className="w-full h-full object-cover object-center opacity-60 md:opacity-70"
        />

        {/* overlays */}
        <div className="absolute inset-0 bg-linear-to-r from-secondary via-secondary/70 to-secondary/30" />
        <div className="absolute inset-0 bg-linear-to-t from-secondary via-transparent to-secondary/40" />
      </div>

      <div className="relative z-20 mx-auto w-full max-w-7xl px-2.5 sm:px-4 md:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-8 md:gap-16 items-center">
          {/* LEFT */}
          <div className="lg:col-span-7 text-left">
            <div className="flex items-center gap-3 mb-4 md:mb-6 justify-start">
              <p className="text-xs sm:text-sm tracking-[0.35em] sm:tracking-[0.4em] uppercase text-third font-semibold">
                Reecomm Inspection Framework
              </p>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-semibold leading-[1.15] sm:leading-[1.1] text-primary font-montserrat">
              Structured Inspection
              <br />
              <span className="text-fourth/80">For Informed Decisions</span>
            </h1>

            <div className="max-w-xl space-y-4 md:space-y-6 mt-4 sm:mt-6">
              <p className="text-xs sm:text-base md:text-[18px] text-third leading-relaxed">
                Every vehicle on Reecomm can be independently inspected before a
                deal is discussed. A standardised, multi-point vehicle
                inspection — documented, scored, and delivered digitally.
              </p>

              <p className="text-[12px] sm:text-[14px] md:text-[15px] text-third/60 border-l-2 border-fourth/40 pl-3 md:pl-4 py-1 italic text-left">
                Inspection is optional but recommended for buyers seeking
                additional confidence and long-term performance visibility.
              </p>
            </div>

            {/* BUTTONS */}
            <div className="flex flex-row gap-4 mt-6 sm:mt-8 md:mt-10 justify-start">
              <Button
                href="/search?reccomInspected=true"
                variant="outlineSecondary"
                size="sm"
                className="px-4 py-2 sm:px-6 sm:py-2.5 text-xs sm:text-base w-fit"
              >
                Browse Inspection Reports
              </Button>
            </div>
          </div>

          {/* RIGHT WIDGET */}
          <div className="lg:col-span-5 hidden md:block">
            <div className="backdrop-blur-md bg-primary/5 border border-primary/10 p-6 md:p-8 rounded-2xl relative w-full max-w-md ml-auto">
              <div className="space-y-5 md:space-y-6">
                <div className="flex justify-between items-end border-b border-primary/10 pb-3 md:pb-4">
                  <span className="text-[10px] md:text-xs text-third uppercase tracking-widest">
                    Confidence Score
                  </span>
                  <span className="text-xl md:text-2xl font-mono text-primary">
                    86/100
                  </span>
                </div>

                <div className="space-y-3 md:space-y-4">
                  <p className="text-[9px] md:text-[10px] text-third/50 uppercase">
                    Category Scores
                  </p>

                  {[
                    { label: "Engine & Powertrain", val: "87/100" },
                    { label: "Mechanical System", val: "91/100" },
                    { label: "Exterior Panels & Body", val: "74/100" },
                    { label: "Interior & Cabin", val: "88/100" },
                    { label: "Structural History", val: "95/100" },
                  ].map((item, i) => {
                    const score = parseInt(item.val);
                    const colorClass =
                      score >= 80
                        ? "bg-green-500/20 text-green-400"
                        : "bg-fourth/20 text-primary";

                    return (
                      <div
                        key={i}
                        className="flex justify-between items-center bg-black/40 p-2.5 md:p-3 rounded"
                      >
                        <span className="text-[11px] md:text-xs text-primary/80">
                          {item.label}
                        </span>

                        <span
                          className={`text-[9px] md:text-[10px] font-bold px-2 py-0.5 rounded ${colorClass}`}
                        >
                          {item.val}
                        </span>
                      </div>
                    );
                  })}
                </div>

                <p className="text-[11px] md:text-[13px] leading-tight text-third/40 italic">
                  *Inspection is optional but recommended for buyers seeking
                  additional confidence and performance visibility.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
