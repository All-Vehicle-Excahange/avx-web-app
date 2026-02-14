export default function TrustSignals() {
  return (
      <section>
        <div className="mx-auto w-full py-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
            {/* LEFT — CONTEXT */}
            <div>
              <p className="mb-6 inline-flex items-center gap-3 text-sm tracking-[0.4em] uppercase text-third font-semibold">
                <span className="h-0.5 w-10 bg-fourth" />
                Built for Accountability
              </p>

              <h2 className="text-4xl sm:text-5xl xl:text-5xl font-medium leading-tight text-primary">
                Trust is built
                <span className="block text-fourth mt-2">
                through measurable signals
              </span>
              </h2>

              <p className="mt-10 max-w-xl text-xl leading-relaxed text-third">
                AVX doesn’t rely on claims or testimonials. Trust emerges from
                structured participation, transparent performance, and verifiable
                activity across the marketplace.
              </p>
            </div>

            {/* RIGHT — SCHEMATIC */}
            <div className="relative h-[480px]">
              {/* AXES */}
              <span className="absolute left-1/2 top-0 h-[40%] w-px bg-primary/20" />
              <span className="absolute left-1/2 bottom-0 h-[40%] w-px bg-primary/20" />
              <span className="absolute top-1/2 left-0 w-[40%] h-px bg-primary/20" />
              <span className="absolute top-1/2 right-0 w-[40%] h-px bg-primary/20" />

              {/* AXIS END TICKS */}
              <span className="absolute left-1/2 top-0 h-3 w-0.5 bg-fourth -translate-x-1/2" />
              <span className="absolute left-1/2 bottom-0 h-3 w-0.5 bg-fourth -translate-x-1/2" />
              <span className="absolute left-0 top-1/2 w-3 h-0.5 bg-fourth -translate-y-1/2" />
              <span className="absolute right-0 top-1/2 w-3 h-0.5 bg-fourth -translate-y-1/2" />

              {/* CENTER SQUARE (OUTER) */}
              <span className="absolute left-1/2 top-1/2 h-6 w-6 bg-primary/40 -translate-x-1/2 -translate-y-1/2 z-10" />

              {/* CENTER SQUARE (INNER) */}
              <span className="absolute left-1/2 top-1/2 h-3 w-3 bg-secondary -translate-x-1/2 -translate-y-1/2 z-20" />

              {/* SIGNALS */}

              {/* TOP RIGHT */}
              <div className="absolute top-[20%] right-[23%]">
                <div className="text-2xl font-semibold text-fourth">
                  100K+
                </div>
                <p className="mt-1 text-base text-third">
                  Vehicles listed
                </p>
              </div>

              {/* TOP LEFT */}
              <div className="absolute top-[20%] left-[12%] text-right">
                <div className="text-2xl font-semibold text-fourth">
                  10K+
                </div>
                <p className="mt-1 text-base text-third">
                  Consultants onboarded
                </p>
              </div>

              {/* BOTTOM LEFT */}
              <div className="absolute bottom-[20%] left-[17.5%]">
                <div className="text-2xl font-semibold text-fourth text-end">
                  Growing
                </div>
                <p className="mt-1 text-base text-third">
                  Cities across India
                </p>
              </div>

              {/* BOTTOM RIGHT */}
              <div className="absolute bottom-[20%] right-[18%]">
                <div className="text-2xl font-semibold text-fourth">
                  In Progress
                </div>
                <p className="mt-1 text-base text-third">
                  Inspection rollout
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
  );
}
