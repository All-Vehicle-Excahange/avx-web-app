import React from 'react'

const data = {
  statsDesc: `
      Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec. Sapien platea nec urna ut est sed.Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec. Sapien platea nec urna ut est sed.Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec. Sapien platea nec urna ut est sed.
  `,
  stats: [
    { number: "150K+", label: "Active Users Worldwide" },
    { number: "$2B+",  label: "Transactions Processed" },
    { number: "98%",   label: "Customer Satisfaction" },
    { number: "100+",  label: "Team Members" },
  ],
}

function Stats() {
  return (
    <>
      <section className="relative py-12 overflow-hidden px-2 lg:px-4">

        <div className="max-w-7xl mx-auto">

          {/* ── TOP: label + desc left | stats grid right ── */}
          <div className="grid lg:grid-cols-[1fr_1fr] gap-12 lg:gap-20 items-center mb-0">

            {/* Left: text */}
            <div className="flex flex-col gap-5 ">

               <div className="flex flex-col gap-6">
                    <p className="text-sm tracking-[0.4em] uppercase text-third font-semibold">
                        Stats
                    </p>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.05] text-primary font-[Montserrat]">
                        Numbers that <br/>
                        <span className="text-fourth/80"> speak for us</span>
                    </h2>
                    <p className="text-third/70 text-md font-[Poppins] leading-relaxed max-w-md">
                        {data.statsDesc}
                    </p>
                </div>

            </div>

            {/* Right: 2x2 stats grid */}
            <div className="grid grid-cols-2 gap-4 ">
              {data.stats.map((stat, i) => (
                <div
                  key={i}
                  className="stat-card flex flex-col gap-2 border border-third/10 rounded-2xl p-6 lg:p-8 hover:border-third/20 hover:bg-third/3 shadow-2xl"
                >

                  <span className="text-xl sm:text-2xl lg:text-3xl font-semibold font-[Montserrat] text-primary leading-none">
                    {stat.number}
                  </span>

                  <span className="text-sm font-[Poppins] text-third/50 leading-snug">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>

          </div>

        </div>

      </section>
    </>
  )
}

export default Stats