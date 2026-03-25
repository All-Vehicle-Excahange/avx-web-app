import Button from "@/components/ui/button";
import React from "react";
import Link from "next/link";

function BecameBanner() {
    return (
        <section className="bg-fourth relative z-10 -mb-6 md:-mb-10">
            <div className="mx-auto w-full h-auto">
                <div
                    className="
          flex flex-col md:flex-row
          overflow-hidden
        "
                >
                    <Link
                        href="/consult"
                        className="
              group
              flex-1
              transition-all duration-500 ease-out
              hover:bg-white/20
              hover:flex-[1.3]
              px-10 py-16 lg:py-20
              text-center
              border-b md:border-b-0 md:border-r border-primary/30
            ">
                        <p className="mb-6">
                            <span
                                className="
                bg-primary
                text-secondary
                px-4 py-1.5
                rounded-full
                border border-white/30
                text-xs tracking-[0.35em] uppercase font-semibold
              "
                            >
                                For Consultants
                            </span>
                        </p>

                        <p className="text-2xl font-bold font-primary  sm:text-3xl  text-primary ">
                            Become a Consultant
                        </p>

                        <p className="mt-4 text-base text-primary/80 max-w-sm mx-auto leading-relaxed ">
                            List vehicles, manage inquiries, and grow your visibility on a
                            trusted marketplace.
                        </p>

                        <span
                            className="
              mt-10 inline-block
              text-white
              underline underline-offset-8
              decoration-white/40
              group-hover:decoration-white
              transition-all duration-500
            "
                        >
                            <Button variant="ghost">Become Consultant </Button>
                        </span>
                    </Link>

                    {/* SELL VEHICLES */}
                    <Link
                        href="/became-seller"
                        className="
              group
              flex-1
              transition-all duration-500 ease-out
              hover:bg-white/20
              hover:flex-[1.3]
              px-10 py-16 lg:py-20
              text-center
            "
                    >
                        <p className="mb-6">
                            <span
                                className="
                bg-primary
                text-secondary
                px-4 py-1.5
                rounded-full
                border border-white/30
                text-xs tracking-[0.35em] uppercase font-semibold
              "
                            >
                                For Sellers
                            </span>
                        </p>

                        <p className="text-2xl sm:text-3xl font-bold font-primary text-primary ">
                            Sell Your Vehicles
                        </p>

                        <p className="mt-4 text-base text-primary/80 max-w-sm mx-auto leading-relaxed">
                            Showcase your vehicles to thousands of buyers and manage
                            everything in one place.
                        </p>

                        <span
                            className="
              mt-10 inline-block
              text-white
              underline underline-offset-8
              decoration-white/40
              group-hover:decoration-white
              transition-all duration-500
            "
                        >
                            <Button variant="ghost">Become Seller </Button>
                        </span>
                    </Link>

                </div>
            </div>
        </section>
    );
}

export default BecameBanner;