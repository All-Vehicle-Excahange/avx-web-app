"use client";

function SelectionSection() {
  return (
    <section className="w-full py-12">
      <div className="max-w-7xl mx-4 flex flex-col gap-8">

        {/* ── HEADER ───────────────── */}
        <p className="text-sm tracking-[0.4em] uppercase text-third font-semibold font-[Montserrat]">
          Our Standards
        </p>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.05] text-primary font-[Montserrat]">
          Our Approach to{" "}
          <span className="text-fourth/80">Vehicle Selection</span>
        </h2>

        {/* ── DESCRIPTION ───────────────── */}
        <div className="flex flex-col gap-4 border-l-2 border-primary/40 pl-5">

          {`
            Every vehicle listed through our storefront goes through a basic
            internal evaluation before being presented to buyers.

            This helps ensure that vehicles listed are suitable for serious buyers
            and provides a smoother vehicle buying experience.
          `
            .trim()
            .split("\n\n")
            .map((para, i) => (
              <p
                key={i}
                className="text-third text-lg font-[Poppins] leading-relaxed"
              >
                {para.trim()}
              </p>
            ))}

        </div>

      </div>
    </section>
  );
}

export default SelectionSection;