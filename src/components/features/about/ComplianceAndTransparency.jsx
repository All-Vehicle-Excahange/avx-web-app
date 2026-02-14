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
            px-8 py-12 md:px-14 md:py-16
            hover:shadow-[0_10px_40px_-10px_rgba(255,255,255,0.25)]
          "
            >
              <div className="flex flex-col md:flex-row gap-10 md:gap-14">
                {/* ===== ICON BLOCK ===== */}
                <div className="shrink-0">
                  <div
                      className="
                  relative
                  h-20 w-20
                  rounded-2xl
                  bg-gradient-to-br
                  from-fourth/20
                  to-transparent
                  border border-fourth/30
                  flex items-center justify-center
                "
                  >
                    <svg
                        width="40"
                        height="40"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        className="text-fourth"
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
                  text-fourth
                  font-semibold
                  uppercase
                  tracking-[0.4em]
                  text-xs
                  mb-6
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
                    AVX is a marketplace platform. Transactions, pricing, and
                    negotiation occur{" "}
                    <span className="text-fourth font-semibold">
                    directly
                  </span>{" "}
                    between buyers and consultants. AVX does not hold or process
                    payments between parties.
                  </p>

                  <p
                      className="
                  mt-8
                  text-fourth
                  font-semibold
                  uppercase
                  tracking-widest
                  text-xs
                "
                  >
                    This protects you legally.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ===== LEGAL FOOTER ===== */}
          <div className="mt-12 flex items-center justify-center gap-8">
            <div className="h-px w-24 bg-linear-to-r from-transparent via-fourth/40 to-transparent" />

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

            <div className="h-px w-24 bg-linear-to-r from-transparent via-fourth/40 to-transparent" />
          </div>
        </div>
      </section>
  );
};

export default ComplianceAndTransparency;
