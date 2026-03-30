"use client"
import React from "react"

const data = {
    statsDesc: `
      Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec. Sapien platea nec urna ut est sed. Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec. Sapien platea nec urna ut est sed.
    `,
    stats: [
        { number: "150K+", label: "Active Users Worldwide" },
        { number: "$2B+", label: "Transactions Processed" },
        { number: "98%", label: "Customer Satisfaction" },
        { number: "100+", label: "Team Members" },
    ],
}

function Stats() {
    return (
        <section className="relative py-12 overflow-hidden">


            <div className="relative z-10 mx-auto w-full  flex flex-col gap-16">

                {/* ── TOP DESCRIPTION ── */}
                <div className="flex flex-col gap-6">
                    <p className="text-sm tracking-[0.4em] uppercase text-third font-semibold">
                        Stats
                    </p>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.05] text-primary font-[Montserrat]">
                        Numbers that 
                        <span className="text-fourth/80"> speak for us</span>
                    </h2>
                    <p className="text-third/70 text-md font-[Poppins] leading-relaxed max-w-md">
                        {data.statsDesc}
                    </p>
                </div>

                {/* ── STATS GRID ── */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-16">

                    {data.stats.map((item, i) => (
                        <div key={i} className="flex flex-col gap-3">

                            {/* Number */}
                            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-primary font-[Montserrat]">
                                {item.number}
                            </h3>

                            {/* Label */}
                            <p className="text-third/60 text-sm sm:text-base font-[Poppins]">
                                {item.label}
                            </p>

                        </div>
                    ))}

                </div>

            </div>

        </section>
    )
}

export default Stats