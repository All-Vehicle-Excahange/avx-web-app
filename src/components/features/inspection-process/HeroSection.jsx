"use client";

import Button from "@/components/ui/button";

export default function HeroSection() {
  return (
    <section className="relative min-h-[90vh] lg:min-h-screen flex items-center justify-center overflow-hidden">
      {/* BACKGROUND IMAGE */}
      <div className="absolute inset-0 z-0 pt-16 md:pt-20">
        <img
          src="/car-hero-21.jpg"
          alt="AVX Inspection"
          className="w-full h-full object-cover object-center opacity-60 md:opacity-70"
        />

        {/* overlays */}
        <div className="absolute inset-0 bg-linear-to-r from-secondary via-secondary/70 md:via-secondary/60 to-transparent" />
        <div className="absolute inset-0 bg-linear-to-t from-secondary via-transparent to-secondary/40 md:to-secondary/30" />
      </div>

      {/* SCAN LINE */}
      <div className="absolute inset-0 z-10 opacity-20 pointer-events-none">
        <div className="w-full h-0.5 bg-fourth animate-[scan_5s_linear_infinite] shadow-[0_0_20px_#007bff]" />
      </div>

      <div className="relative z-20 mx-auto max-w-[1480px] px-4 sm:px-6  w-full">
        <div className="grid lg:grid-cols-12 gap-10 md:gap-16 items-center">
          {/* LEFT */}
          <div className="lg:col-span-7 text-center lg:text-left">
            <div className="flex items-center gap-3 mb-5 md:mb-6 justify-center lg:justify-start">
              <div className="w-2 h-2 rounded-full bg-fourth animate-pulse" />
              <p className="text-xs md:text-sm tracking-[0.35em] uppercase text-third font-semibold">
                AVX Inspection Framework
              </p>
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl xl:text-7xl font-bold text-primary leading-[1.05] tracking-tight mb-5 md:mb-6">
              Structured <span className="text-fourth">Inspection</span> <br />
              <span className="text-xl sm:text-3xl md:text-4xl xl:text-5xl font-light text-third/80">
                for Informed Decisions
              </span>
            </h1>

            <div className="max-w-xl mx-auto lg:mx-0 space-y-4 md:space-y-6">
              <p className="text-sm sm:text-base md:text-[18px] text-third leading-relaxed">
                AVX offers a{" "}
                <span className="text-primary font-medium">
                  standardized multi-point vehicle inspection
                </span>{" "}
                framework designed to improve transparency in the pre-owned
                vehicle ecosystem.
              </p>

              <p className="text-[13px] md:text-[15px] text-third/60 border-l-2 border-fourth/40 pl-3 md:pl-4 py-1 italic">
                Inspection is optional but recommended for buyers seeking
                additional confidence and long-term performance visibility.
              </p>
            </div>

            {/* BUTTONS */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 mt-8 md:mt-12 justify-center lg:justify-start">
              <Button variant="ghost">Request Inspection</Button>

              <Button variant="outlineSecondary">
                Browse Inspected Vehicles
              </Button>
            </div>
          </div>

          {/* RIGHT WIDGET */}
          <div className="lg:col-span-5 hidden md:block">
            <div className="backdrop-blur-md bg-white/5 border border-white/10 p-6 md:p-8 rounded-2xl relative max-w-md mx-auto lg:mx-0">
              {/* corners */}
              <div className="absolute -top-2 -left-2 w-5 h-5 md:w-6 md:h-6 border-t-2 border-l-2 border-fourth" />
              <div className="absolute -bottom-2 -right-2 w-5 h-5 md:w-6 md:h-6 border-b-2 border-r-2 border-fourth" />

              <div className="space-y-5 md:space-y-6">
                <div className="flex justify-between items-end border-b border-white/10 pb-3 md:pb-4">
                  <span className="text-[10px] md:text-xs text-third uppercase tracking-widest">
                    Confidence Score
                  </span>
                  <span className="text-xl md:text-2xl font-mono text-fourth">
                    98.4%
                  </span>
                </div>

                <div className="space-y-3 md:space-y-4">
                  <p className="text-[9px] md:text-[10px] text-third/50 uppercase">
                    Active Verification Modules
                  </p>

                  {[
                    { label: "Structural Integrity", val: "PASS" },
                    { label: "Engine Diagnostics", val: "ACTIVE" },
                    { label: "Electrical Systems", val: "PASS" },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="flex justify-between items-center bg-black/40 p-2.5 md:p-3 rounded"
                    >
                      <span className="text-[11px] md:text-xs text-primary/80">
                        {item.label}
                      </span>
                      <span
                        className={`text-[9px] md:text-[10px] font-bold px-2 py-0.5 rounded ${
                          item.val === "PASS"
                            ? "bg-green-500/20 text-green-400"
                            : "bg-fourth/20 text-fourth"
                        }`}
                      >
                        {item.val}
                      </span>
                    </div>
                  ))}
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

      <style jsx>{`
        @keyframes scan {
          0% {
            transform: translateY(-100%);
            opacity: 0;
          }
          20% {
            opacity: 0.5;
          }
          80% {
            opacity: 0.5;
          }
          100% {
            transform: translateY(100vh);
            opacity: 0;
          }
        }
      `}</style>
    </section>
  );
}
