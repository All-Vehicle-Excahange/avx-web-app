"use client";

export default function HeroSection() {
    return (
        // <section className="relative  flex items-center justify-center overflow-hidden mt-30 lg-mt-40 py-12">
             <section className="relative  flex items-center justify-center overflow-hidden min-h-screen   py-12">

           

            {/* ── Content ──────────────────────────────────────────────────── */}
            <div className="relative flex flex-col items-center text-center gap-8 max-w-3xl">

                {/* Eyebrow */}
                <p className="text-sm tracking-[0.4em] uppercase text-third font-semibold">
                    Pre-Owned Vehicle Verification
                </p>

                {/* Headline */}

                <h2
                    className="
             text-3xl sm:text-4xl lg:text-5xl
              font-semibold
              leading-[1.05]
              text-primary
              font-[Montserrat]
            "
                >
                    Why Choose
                    <span className="text-fourth/80"> Adarsh Auto</span>{" "}
                    <br />
                    <span className=" text-primary">Consultants
                    </span>
                </h2>
                {/* Description */}
                <p className="text-third/55 text-base sm:text-lg font-[Poppins] leading-relaxed max-w-xl">
                    Buyers trust Adarsh Auto Consultants for transparent communication,
                    reliable vehicle options, and a smooth buying experience. Our goal
                    is to help every buyer make confident vehicle decisions with clear
                    information and professional support.
                </p>

                {/* CTA — text link style, no button */}
                <a
                    href="#"
                    className="font-[Montserrat] font-bold text-sm tracking-[0.15em] uppercase text-primary border-b border-third/40 pb-0.5 hover:border-primary transition-colors duration-200"
                >
                    Explore Listings →
                </a>

            </div>

        </section>
    );
}   