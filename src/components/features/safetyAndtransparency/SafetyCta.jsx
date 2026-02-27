export default function SafetyCta() {
  return (
    <section className="">
      <div className="mx-auto w-full  pb-10">
        {/* Heading */}
        <div className="text-center">
          <h2
            className="
            mx-auto max-w-3xl
            text-3xl sm:text-4xl xl:text-5xl
            font-semibold
            leading-[1.12]
            text-primary
            font-primary
          "
          >
            Need more clarity
            <span className="block mt-3 text-fourth">before deciding?</span>
          </h2>
        </div>

        {/* FLEX SPLIT CTA */}
        <div
          className="
          mt-12
          flex flex-col md:flex-row
          rounded-3xl
          overflow-hidden
          border border-primary/10
        "
        >
          {/* ================= LEFT ================= */}
          <a
            className="
              group
              flex-1
              transition-all duration-500 ease-out
              hover:bg-[linear-gradient(90deg,#313131_0%,#1a1919_45%,#000000_100%)]
              hover:flex-[1.3]
              px-10 py-16 lg:py-20
              text-center
              border-b md:border-b-0 md:border-r border-primary/80
            "
          >
            {/* TAG */}
            <p className="mb-6">
              <span
                className="
                bg-secondary/25
                text-natural-400
                px-4 py-1.5
                rounded-full
                border border-primary/30
                text-xs tracking-[0.35em] uppercase font-semibold
              "
              >
                Explore Listings
              </span>
            </p>

            {/* TITLE */}
            <p
              className="
              text-2xl sm:text-3xl
              font-semibold
              text-fourth
              font-primary
            "
            >
              Browse Verified Vehicles
            </p>

            {/* BODY TEXT */}
            <p
              className="
              mt-4
              text-base
              text-primary/90
              max-w-sm
              mx-auto
              leading-relaxed
            "
            >
              View structured listings with verified vehicle data and inspection
              visibility.
            </p>

            {/* LINK */}
            <span
              className="
              mt-10 inline-block
              text-primary
              underline underline-offset-8
              decoration-primary/40
              group-hover:decoration-fourth
              transition
            "
            >
              Enter Marketplace →
            </span>
          </a>

          {/* ================= RIGHT ================= */}
          <a
            href="/inspection-process"
            className="
              group
              flex-1
              transition-all duration-500 ease-out
              hover:bg-[linear-gradient(90deg,#313131_0%,#1a1919_45%,#000000_100%)]
              hover:flex-[1.3]
              px-10 py-16 lg:py-20
              text-center
            "
          >
            {/* TAG */}
            <p className="mb-6">
              <span
                className="
                bg-secondary/25
                text-natural-400
                px-4 py-1.5
                rounded-full
                border border-primary/30
                text-xs tracking-[0.35em] uppercase font-semibold
              "
              >
                Inspection Info
              </span>
            </p>

            {/* TITLE */}
            <p
              className="
              text-2xl sm:text-3xl
              font-semibold
              text-fourth
              font-primary
            "
            >
              Learn About Inspection
            </p>

            {/* BODY TEXT */}
            <p
              className="
              mt-4
              text-base
              text-primary/90
              max-w-sm
              mx-auto
              leading-relaxed
            "
            >
              Understand how AVX inspection reports improve clarity before
              commitment.
            </p>

            {/* LINK */}
            <span
              className="
              mt-10 inline-block
              text-primary
              underline underline-offset-8
              decoration-primary/40
              group-hover:decoration-fourth
              transition
            "
            >
              View Inspection Details →
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
