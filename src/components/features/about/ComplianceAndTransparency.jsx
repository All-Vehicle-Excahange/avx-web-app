import React from "react";

const ComplianceAndTransparency = () => {
  return (
    <section className="relative overflow-hidden">
      {/* Ambient Glow */}
      <div className="absolute top-1/2 right-[-200px] -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto">
        {/* ===== MAIN PANEL ===== */}
        <div>
          {/* Edge Aura */}
          <div className="absolute -inset-px rounded-3xl" />

          {/* Card */}
          <div
            className="
              relative
              rounded-3xl
              border border-primary/20
              px-6 py-8 md:px-12 md:py-10
              hover:shadow-[0_10px_40px_-10px_rgba(255,255,255,0.25)]
            "
          >
            <div className="flex flex-col md:flex-row gap-6 md:gap-10">
              {/* ===== ICON BLOCK ===== */}
              <div className="shrink-0">
                <div
                  className="
                    relative
                    h-16 w-16
                    rounded-2xl
                    border border-primary 
                    flex items-center justify-center
                  "
                >
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    className="text-primary"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    <path d="m9 12 2 2 4-4" strokeWidth="2.5" />
                  </svg>
                </div>
              </div>

              {/* ===== TEXT CONTENT ===== */}
              <div className="flex-1">
                <h4
                  className="
                    text-sm tracking-[0.4em] uppercase text-third font-semibold
                    mb-4
                  "
                >
                  Compliance & Transparency
                </h4>

                <p
                  className="
                    text-primary
                    text-lg md:text-xl
                    leading-relaxed
                  "
                >
                  One verified consultant. One confident buyer. One transaction at a time.
                </p>

                <p
                  className="
                    mt-2
                    text-third
                    text-sm md:text-base
                    leading-relaxed
                  "
                >
                  India&apos;s used vehicle industry is at an inflection point. Reecomm is being built for what comes next — the organized, trusted, professional ecosystem this market deserves.
                </p>

                <p
                  className="
                    mt-6
                    text-third
                    font-semibold
                    uppercase
                    tracking-widest
                    text-xs
                  "
                >
                  Buy Smart. Sell Fair. Move Forward.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ===== LEGAL FOOTER ===== */}
        <div className="mt-12 flex items-center justify-center gap-8">
          <span
            className="
              text-[11px]
              uppercase
              tracking-[0.45em]
              text-primary/50
            "
          >
            Legal Independence Verified
          </span>
        </div>
      </div>
    </section>
  );
};

export default ComplianceAndTransparency;
