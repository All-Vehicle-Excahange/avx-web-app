export default function TrustSignals() {
  return (
    <section className="">
      <div className="mx-auto w-full  py-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
          {/* LEFT — CONTEXT */}
          <div>
            <p className="mb-6 inline-flex items-center gap-3 text-sm tracking-[0.4em] uppercase text-[var(--color-third)] font-semibold">
              <span className="h-[2px] w-10 bg-[var(--color-fourth)]" />
              Built for Accountability
            </p>

            <h2 className="text-4xl sm:text-5xl xl:text-5xl font-medium leading-tight text-[var(--color-primary)]">
              Trust is built
              <span className="block text-[var(--color-fourth)] mt-2">
                through measurable signals
              </span>
            </h2>

            <p className="mt-10 max-w-xl text-xl leading-relaxed text-[var(--color-third)] font-[var(--font-secondary)]">
              AVX doesn’t rely on claims or testimonials. Trust emerges from
              structured participation, transparent performance, and verifiable
              activity across the marketplace.
            </p>
          </div>

          {/* RIGHT — EXACT SCHEMATIC */}
          {/* RIGHT — TRUE REFERENCE CENTER */}
          <div className="relative h-[480px]">
            {/* MAIN AXES — STOP AT SQUARE CORNERS */}

            {/* vertical top */}
            <span className="absolute left-1/2 top-0 h-[40%] w-px bg-neutral-600/50" />

            {/* vertical bottom */}
            <span className="absolute left-1/2 bottom-0 h-[40%] w-px bg-neutral-600/50" />

            {/* horizontal left */}
            <span className="absolute top-1/2 left-0 w-[40%] h-px bg-neutral-600/50" />

            {/* horizontal right */}
            <span className="absolute top-1/2 right-0 w-[40%] h-px bg-neutral-600/50" />

            {/* AXIS END TICKS */}
            <span className="absolute left-1/2 top-0 h-3 w-[2px] bg-[var(--color-fourth)] -translate-x-1/2" />
            <span className="absolute left-1/2 bottom-0 h-3 w-[2px] bg-[var(--color-fourth)] -translate-x-1/2" />
            <span className="absolute left-0 top-1/2 w-3 h-[2px] bg-[var(--color-fourth)] -translate-y-1/2" />
            <span className="absolute right-0 top-1/2 w-3 h-[2px] bg-[var(--color-fourth)] -translate-y-1/2" />

            {/* CENTER SQUARE (OUTER) */}
            <span className="absolute left-1/2 top-1/2 h-6 w-6 bg-neutral-500 -translate-x-1/2 -translate-y-1/2 z-10" />

            {/* CENTER SQUARE (INNER) */}
            <span className="absolute left-1/2 top-1/2 h-3 w-3 bg-[var(--color-secondary)] -translate-x-1/2 -translate-y-1/2 z-20" />

            {/* SIGNALS */}

            {/* TOP RIGHT */}
            <div className="absolute top-[20%] right-[23%]">
              <div className="text-2xl font-semibold text-[var(--color-fourth)]">
                100K+
              </div>
              <p className="mt-1 text-m text-[var(--color-third)]">
                Vehicles listed
              </p>
            </div>

            {/* TOP LEFT */}
            <div className="absolute top-[20%] left-[12%] text-right">
              <div className="text-2xl font-semibold text-[var(--color-fourth)]">
                10K+
              </div>
              <p className="mt-1 text-m text-[var(--color-third)]">
                Consultants onboarded
              </p>
            </div>

            {/* BOTTOM LEFT */}
            <div className="absolute bottom-[20%] left-[17.5%]">
              <div className="text-2xl font-semibold text-[var(--color-fourth)] text-end">
                Growing
              </div>
              <p className="mt-1 text-m text-[var(--color-third)]">
                Cities across India
              </p>
            </div>

            {/* BOTTOM RIGHT */}
            <div className="absolute bottom-[20%] right-[18%]">
              <div className="text-2xl font-semibold text-[var(--color-fourth)]">
                In Progress
              </div>
              <p className="mt-1 text-m text-[var(--color-third)]">
                Inspection rollout
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
