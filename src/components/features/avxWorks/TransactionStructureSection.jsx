"use client"

import { Users, Scale, CreditCard } from "lucide-react";

export default function TransactionStructureSection() {
    return (<section className="relative   overflow-hidden">

            <div className="relative w-full mx-auto  py-16">

                {/* ===== HEADER ===== */}
                <div className="max-w-3xl mb-8">
                    <p className="text-sm tracking-[0.4em] uppercase text-third font-semibold mb-4">
                        Transaction Structure
                    </p>

                    <h2 className="text-3xl md:text-[42px] font-bold leading-tight text-primary mb-5">
                        Marketplace
                        <span className="block text-fourth">
              Transparency
            </span>
                    </h2>
                </div>

                {/* ===== LEFT RIGHT BLOCK ===== */}
                <div className="grid lg:grid-cols-2 gap-14 items-center">

                    {/* LEFT TEXT */}
                    <div className="space-y-6 max-w-xl">

                        <p className="text-[15px] text-third leading-relaxed">
                            AVX operates as a structured marketplace connecting buyers and consultants
                            through verified listings, performance metrics, and transparent activity visibility.
                        </p>

                        <p className="text-[15px] text-primary leading-relaxed">
                            Vehicle pricing, negotiation, and transaction settlement occur directly between
                            buyers and consultants.
                        </p>

                    </div>

                    {/* RIGHT TRANSPARENCY CARD */}
                    <div className="flex w-full">
                        <div className="
              w-full
              rounded-2xl
              border border-primary/70
              bg-[linear-gradient(90deg,#313131_0%,#1a1919_45%,#000000_100%)]
              backdrop-blur-xl
              p-8
              shadow-xl
            ">

                            <p className="text-primary text-lg leading-relaxed">
                                AVX does
                                <span className="text-fourth font-semibold"> not process payments </span>
                                between parties.
                            </p>

                            <p className="text-third text-sm mt-4 leading-relaxed">
                                Instead, the platform provides structured visibility, consultant performance data,
                                and verified interaction tracking — helping buyers make informed decisions.
                            </p>

                        </div>

                    </div>

                </div>

                {/* ===== CARDS SECTION (FULL WIDTH BELOW) ===== */}
                <div className="grid md:grid-cols-3 gap-6 mt-10">

                    {/* Card 1 */}
                    <div className="
            rounded-2xl border border-primary/10
            bg-[linear-gradient(90deg,#313131_0%,#1a1919_45%,#000000_100%)] p-6 backdrop-blur-xl
            text-left hover:border-blue-400/30 transition hover:shadow-[0_10px_40px_-10px_rgba(230,230,230,0.15)]
          ">
                        <Users className="text-2xl text-fourth mb-4"/>
                        <h3 className="text-primary font-semibold mb-2">
                            Marketplace Connector
                        </h3>
                        <p className="text-sm text-third">
                            AVX connects verified buyers and professional consultants through structured listings.
                        </p>
                    </div>

                    {/* Card 2 */}
                    <div className="
            rounded-2xl border border-primary/10
            bg-[linear-gradient(90deg,#313131_0%,#1a1919_45%,#000000_100%)] p-6 backdrop-blur-xl
            text-left hover:border-blue-400/30 transition hover:shadow-[0_10px_40px_-10px_rgba(230,230,230,0.15)]
          ">
                        <Scale className="text-2xl text-fourth mb-4"/>
                        <h3 className="text-primary font-semibold mb-2">
                            Transparent Negotiation
                        </h3>
                        <p className="text-sm text-third">
                            Pricing and negotiation happen directly between parties with full visibility.
                        </p>
                    </div>

                    {/* Card 3 */}
                    <div className="
            rounded-2xl border border-primary/10
            bg-[linear-gradient(90deg,#313131_0%,#1a1919_45%,#000000_100%)] p-6 backdrop-blur-xl
            text-left hover:border-blue-400/30 transition hover:shadow-[0_10px_40px_-10px_rgba(230,230,230,0.15)]
          ">
                        <CreditCard className="text-2xl text-fourth mb-4"/>
                        <h3 className="text-primary font-semibold mb-2">
                            No Payment Handling
                        </h3>
                        <p className="text-sm text-third">
                            AVX does not process transactions between buyers and consultants.
                        </p>
                    </div>

                </div>

            </div>

        </section>)
}