export default function ConsultCta() {
  return (
    <section className="hero_car_half2 py-15">
      <div className="mx-auto max-w-7xl px-6 pb-10">
        {/* Heading */}
        <div className="text-center">
          <h2
            className="
            mx-auto max-w-3xl
            text-3xl sm:text-4xl xl:text-5xl
            font-semibold
            leading-[1.12]
            text-primary
            font-[Montserrat]
          "
          >
            Ready to build your presence
            <span className="block mt-3 text-fourth">on AVX?</span>
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
          {/* ================= BECOME CONSULTANT ================= */}
          <a
            href="/consultant/register"
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
                Get Started
              </span>
            </p>

            {/* TITLE */}
            <p
              className="
              text-2xl sm:text-3xl
              font-semibold
              text-fourth
              font-[Montserrat]
            "
            >
              Become a Consultant
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
              Join AVX to build visibility, gain trust, and grow your automotive
              business.
            </p>

            {/* BUTTON */}
            <div className="mt-10">
              <span
                className="
                inline-flex items-center justify-center
                px-6 py-3
                rounded-xl
                 text-primary
              underline underline-offset-8
              decoration-primary/40
              group-hover:decoration-fourth
              transition
              "
              >
                Become a Consultant →
              </span>
            </div>
          </a>

          {/* ================= VIEW PRICING ================= */}
          <a
            href="/pricing"
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
                Plans & Pricing
              </span>
            </p>

            {/* TITLE */}
            <p
              className="
              text-2xl sm:text-3xl
              font-semibold
              text-fourth
              font-[Montserrat]
            "
            >
              View Pricing
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
              Explore flexible subscription tiers designed for consultants at
              every growth stage.
            </p>

            {/* BUTTON */}
            <div className="mt-10">
              <span
                className="
                inline-flex items-center justify-center
                px-6 py-3
                rounded-xl
                text-primary
              underline underline-offset-8
              decoration-primary/40
              group-hover:decoration-fourth
              transition
              "
              >
                View Pricing →
              </span>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
