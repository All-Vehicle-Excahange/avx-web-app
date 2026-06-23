import React from "react";

const ProblemWeAreSolve = () => {
  return (
    <section className="py-2">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-14">
          <p className="text-sm tracking-[0.4em] uppercase text-third font-semibold mb-3">
            The Problem We Saw
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
            An industry that outgrew
            <br />
            <span className="text-fourth/80"> its infrastructure</span>
          </h2>

          <div className="mt-8 text-third text-base md:text-lg leading-relaxed max-w-4xl space-y-4">
            <p>
              India&apos;s used vehicle market processes millions of
              transactions every year. Demand is real. Supply is real. But the
              system connecting buyers to sellers has barely evolved in a
              decade.
            </p>
            <p>
              Consultants with years of expertise had no way to display it
              credibly online. Buyers with serious intent had no way to verify
              who they were dealing with. And both sides kept paying for that
              gap — in wasted time, failed deals, and eroded confidence.
            </p>
            <p>
              That structural gap — between the scale of the industry and the
              maturity of its infrastructure — is exactly where Reecomm
              operates.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="group relative overflow-hidden p-10 rounded-xl border border-white/10 bg-white/1 transition-all duration-300 ">
            <span className="pointer-events-none absolute top-4 right-6 text-6xl md:text-7xl font-bold font-primary text-white/3 transition-all duration-300 select-none">
              01
            </span>

            <h3 className="text-3xl md:text-4xl font-bold mb-3 text-primary">
              ₹1.5T+
            </h3>

            <p className="text-third text-sm md:text-base leading-relaxed">
              Est. used vehicle market size in India
            </p>
          </div>

          {/* Card 2 */}
          <div className="group relative overflow-hidden p-10 rounded-xl border border-white/10 bg-white/1 transition-all duration-300 ">
            <span className="pointer-events-none absolute top-4 right-6 text-6xl md:text-7xl font-bold font-primary text-white/3 transition-all duration-300 select-none">
              02
            </span>

            <h3 className="text-3xl md:text-4xl font-bold mb-3 text-primary transition-colors">
              Fragmented
            </h3>

            <p className="text-third text-sm md:text-base leading-relaxed">
              Majority of consultants still undigitized
            </p>
          </div>

          {/* Card 3 */}
          <div className="group relative overflow-hidden p-10 rounded-xl border border-white/10 bg-white/1 transition-all duration-300">
            <span className="pointer-events-none absolute top-4 right-6 text-6xl md:text-7xl font-bold font-primary text-white/3 transition-all duration-300 select-none">
              03
            </span>

            <h3 className="text-3xl md:text-4xl font-bold mb-3 text-primary transition-colors">
              Low trust
            </h3>

            <p className="text-third text-sm md:text-base leading-relaxed">
              No. 1 buyer barrier in used vehicle purchases
            </p>
          </div>
        </div>

        {/* Closing Line */}
        <div className="mt-10 text-center">
          <p className="text-lg md:text-xl font-medium text-primary">
            Reecomm was built to solve this
            <span className="text-fourth opacity-90"> structurally</span> — not
            cosmetically.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProblemWeAreSolve;
