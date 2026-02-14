import React from "react";

const ProblemWeAreSolve = () => {
  return (
      <section className="py-2">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="mb-14">
            <p className="text-sm tracking-[0.4em] uppercase text-third font-semibold mb-3">
              The Problem We Fix
            </p>

            <h2 className="text-3xl md:text-5xl font-bold leading-tight text-primary">
              The Used Vehicle Market <br />
              <span className="text-third">Needed Structure</span>
            </h2>

            <div className="w-14 h-0.5 bg-fourth mt-5 opacity-70"></div>
          </div>

          {/* Content Blocks */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="group p-10 bg-[#141414] rounded-xl border-2 border-third/10 transition-all duration-300 hover:border-third/5 hover:shadow-[0_10px_40px_-10px_rgba(230,230,230,0.15)]">
              <div className="text-third text-sm tracking-widest mb-6 opacity-70 group-hover:text-fourth transition-colors">
                ISSUE 01
              </div>

              <h3 className="text-lg md:text-xl font-semibold mb-3 text-primary">
                Fragmented Listings
              </h3>

              <p className="text-third text-sm md:text-base leading-relaxed">
                Vehicles scattered across platforms without consistency, making
                the search process exhausting and inefficient.
              </p>
            </div>

            {/* Card 2 */}
            <div className="group p-10 bg-[#141414] rounded-xl border-2 border-third/10 transition-all duration-300 hover:border-third/5 hover:shadow-[0_10px_40px_-10px_rgba(230,230,230,0.15)]">
              <div className="text-third text-sm tracking-widest mb-6 opacity-70 group-hover:text-fourth transition-colors">
                ISSUE 02
              </div>

              <h3 className="text-lg md:text-xl font-semibold mb-3 text-primary">
                Low Transparency
              </h3>

              <p className="text-third text-sm md:text-base leading-relaxed">
                Limited inspection clarity and unclear seller credibility often
                leave buyers feeling uncertain and unprotected.
              </p>
            </div>

            {/* Card 3 */}
            <div className="group p-10 bg-[#141414] rounded-xl border-2 border-third/10 transition-all duration-300 hover:border-third/5 hover:shadow-[0_10px_40px_-10px_rgba(230,230,230,0.15)]">
              <div className="text-third text-sm tracking-widest mb-6 opacity-70 group-hover:text-fourth transition-colors">
                ISSUE 03
              </div>

              <h3 className="text-lg md:text-xl font-semibold mb-3 text-primary">
                No Accountability Layer
              </h3>

              <p className="text-third text-sm md:text-base leading-relaxed">
                No performance visibility for consultants, creating a marketplace
                where quality and service arent measurable.
              </p>
            </div>
          </div>

          {/* Closing Line */}
          <div className="mt-10 text-center">
            <p className="text-lg md:text-xl font-medium text-primary">
              AVX was built to solve this
              <span className="text-fourth opacity-90">
              {" "}
                structurally
            </span>{" "}
              — not cosmetically.
            </p>
          </div>
        </div>
      </section>
  );
};

export default ProblemWeAreSolve;
