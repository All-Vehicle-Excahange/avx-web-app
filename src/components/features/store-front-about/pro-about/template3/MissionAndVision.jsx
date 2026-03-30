import React from 'react'

const data = {
  missionTitle: "Our Mission",
  missionDesc: `
      Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec. Sapien platea nec urna ut est sed.Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec. Sapien platea nec urna ut est sed.Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec. Sapien platea nec urna ut est sed.Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec. Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec. Sapien platea nec urna ut est sed.Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec. Sapien platea nec 
  `,
  missionImage: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80",

  visionTitle: "Our Vision",
  visionDesc: `
      Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec. Sapien platea nec urna ut est sed.Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec. Sapien platea nec urna ut est sed.Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec. Sapien platea nec urna ut est sed.Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec. Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec. Sapien platea nec urna ut est sed.Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec. Sapien platea nec. 
  `,
  visionImage: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&q=80",
}

function MissionAndVision() {
  return (
    <>
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .mv-fade { animation: fadeUp 0.7s ease both; }
        .mv-fade-2 { animation: fadeUp 0.7s 0.15s ease both; }

        .mv-card img {
          transition: transform 0.7s cubic-bezier(0.23,1,0.32,1);
        }
        .mv-card:hover img {
          transform: scale(1.05);
        }
      `}</style>

      <section className="relative py-12 overflow-hidden px-2 lg:px-4">

        {/* ── SECTION LABEL ── */}
        <div className="flex flex-col items-center gap-3 mb-12 mv-fade">
          <div className="flex flex-col items-center text-center gap-6 max-w-2xl mx-auto">
          <p className="text-sm tracking-[0.4em] uppercase text-third font-semibold">
            Mission / Vision
          </p>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.05] text-primary font-[Montserrat]">
            Direction We
            <span className="text-fourth/80"> Move</span>
          </h2>
        </div>
        </div>

        {/* ── TWO FULL-WIDTH STACKED CARDS ── */}
        <div className="flex flex-col gap-6 max-w-7xl mx-auto">

          {/* ── MISSION CARD ── */}
          <div className="mv-card relative rounded-2xl overflow-hidden shadow-2xl border border-third/10 py-14">

            {/* Background image */}
            <img
              src={data.missionImage}
              alt="Mission"
              className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Overlay: strong left gradient, lighter right */}
            <div className="absolute inset-0 bg-linear-to-r from-secondary/95 via-secondary/85 to-secondary/70" />


            {/* Content — left aligned */}
            <div className="relative z-10 h-full flex flex-col justify-center px-8 sm:px-12 lg:px-16 max-w-2xl gap-5">

              <div className="flex items-center gap-3">
                <p className="text-sm tracking-[0.4em] uppercase text-third font-semibold font-[Poppins]">
                  01
                </p>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold leading-[1.05] text-primary font-[Montserrat]">
                Our <span className="text-fourth/80">Mission</span>
              </h2>


              <div
                className="text-third/70 text-base md:text-md font-[Poppins] leading-relaxed"
                
              >
                <p>{data.visionDesc}</p>
              </div>

            </div>
          </div>

       

          {/* ── VISION CARD ── */}
          <div className="mv-card relative rounded-2xl overflow-hidden shadow-2xl border border-third/10 py-14">

            {/* Background image */}
            <img
              src={data.visionImage}
              alt="Vision"
              className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Overlay: strong right gradient, lighter left */}
            <div className="absolute inset-0 bg-linear-to-l from-secondary/95 via-secondary/85 to-secondary/70" />

            {/* Content — right aligned */}
            <div className="relative z-10 h-full flex flex-col justify-center items-end px-8 sm:px-12 lg:px-16 text-right ml-auto max-w-2xl gap-5 w-full">

              <div className="flex items-center gap-3 flex-row-reverse">
                <p className="text-sm tracking-[0.4em] uppercase text-third font-semibold font-[Poppins]">
                  02
                </p>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold leading-[1.05] text-primary font-[Montserrat]">
                Our <span className="text-fourth/80">Vision</span>
              </h2>


              <div
                className="text-third/70 text-base md:text-md font-[Poppins] leading-relaxed"
              >{data.visionDesc}</div>

            </div>
          </div>

        </div>

      </section>
    </>
  )
}

export default MissionAndVision