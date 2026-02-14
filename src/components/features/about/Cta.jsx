export default function Cta() {
  return (
    <section className="hero_car_half2 ">
      <div className="mx-auto w-full pb-10">
        {/* Heading */}
        <div className="text-center">
          <h2
            className="
            mx-auto max-w-3xl
            text-3xl sm:text-4xl xl:text-5xl
            font-semibold
            leading-[1.12]
            text-white
            font-[Montserrat]
          "
          >
            Ready to explore better
            <span className="block mt-3 text-white/60">used vehicles?</span>
          </h2>
        </div>

        {/* FLEX SPLIT CTA */}
        <div
          className="
          mt-12
          flex flex-col md:flex-row
          rounded-3xl
          overflow-hidden
          border border-white/10
        "
        >
          {/* ================= BUYERS ================= */}
          <a
            href="/vehicles"
            className="
              group
              flex-1
              transition-all duration-500 ease-out
              hover:bg-[linear-gradient(90deg,#313131_0%,#1a1919_45%,#000000_100%)]
              hover:flex-[1.3]
              px-10 py-16 lg:py-20
              text-center
              border-b md:border-b-0 md:border-r border-white/80
            "
          >
            {/* TAG */}
            <p className="mb-6">
              <span
                className="
                bg-black/25
                text-natural-400
                px-4 py-1.5
                rounded-full
                border border-white/30
                text-xs tracking-[0.35em] uppercase font-semibold
              "
              >
                For Buyers
              </span>
            </p>

            {/* TITLE */}
            <p
              className="
              text-2xl sm:text-3xl
              font-semibold
              text-white
              font-[Montserrat]
            "
            >
              Browse Vehicles
            </p>

            {/* BODY TEXT */}
            <p
              className="
              mt-4
              text-base
              text-white/90
              max-w-sm
              mx-auto
              leading-relaxed
            "
            >
              Discover verified vehicles through structured, transparent
              listings.
            </p>

            {/* LINK */}
            <span
              className="
              mt-10 inline-block
              text-white
              underline underline-offset-8
              decoration-white/40
              group-hover:decoration-fourth
              transition
            "
            >
              Enter Marketplace →
            </span>
          </a>

          {/* ================= CONSULTANTS ================= */}
          <a
            href="/consultant"
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
                bg-black/25
               text-natural-400
                px-4 py-1.5
                rounded-full
                border border-white/30
                text-xs tracking-[0.35em] uppercase font-semibold
              "
              >
                For Consultants
              </span>
            </p>

            {/* TITLE */}
            <p
              className="
              text-2xl sm:text-3xl
              font-semibold
              text-white
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
              text-white/90
              max-w-sm
              mx-auto
              leading-relaxed
            "
            >
              Build visibility and credibility on a structured, performance-led
              platform.
            </p>

            {/* LINK */}
            <span
              className="
              mt-10 inline-block
              text-white
              underline underline-offset-8
              decoration-white/40
              group-hover:decoration-fourth
              transition
            "
            >
              Start Your Storefront →
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
