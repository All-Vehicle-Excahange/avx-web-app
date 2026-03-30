import React, { useEffect, useRef } from 'react'

function Hero() {

  const data = {
    heroTitle: "Our Story Built for Buy & Selling a Vehicle",
    heroDesc: `Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec.
          Sapien platea nec urna ut est sed. Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec.
          Sapien platea nec urna ut est sed. Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec.
          Sapien platea nec urna ut est sed.`,
    storyImages: [
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200&q=90",
      "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=1200&q=90",
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=1200&q=90",
    ],
  }

  const activeRef = useRef(0)
  const intervalRef = useRef(null)

  useEffect(() => {
    const imgs = document.querySelectorAll('.bg-slide')
    imgs[0]?.classList.add('active-slide')

    intervalRef.current = setInterval(() => {
      imgs[activeRef.current]?.classList.remove('active-slide')
      activeRef.current = (activeRef.current + 1) % imgs.length
      imgs[activeRef.current]?.classList.add('active-slide')
    }, 4000)

    return () => clearInterval(intervalRef.current)
  }, [])

  useEffect(() => {
    const els = document.querySelectorAll('.fade-up')
    els.forEach((el, i) => {
      setTimeout(() => el.classList.add('fade-up-in'), 300 + i * 150)
    })
  }, [])

  return (
    <>
      <style>{`
                /* ── slide bg ── */
                .bg-slide {
                    position: absolute;
                    inset: 0;
                    background-size: cover;
                    background-position: center;
                    opacity: 0;
                    transition: opacity 1.4s ease;
                    transform: scale(1.04);
                    animation: slow-zoom 10s ease-in-out infinite alternate;
                }
                .active-slide { opacity: 1; }

                @keyframes slow-zoom {
                    from { transform: scale(1.04); }
                    to   { transform: scale(1.0); }
                }

                /* ── diagonal clip ── */
                .diag-panel {
                    clip-path: polygon(0 0, 100% 0, 100% 78%, 0 100%);
                }

                /* ── fade up ── */
                .fade-up {
                    opacity: 0;
                    transform: translateY(40px);
                    transition: opacity 1s cubic-bezier(0.16,1,0.3,1), transform 1s cubic-bezier(0.16,1,0.3,1);
                }
                .fade-up-in { opacity: 1; transform: translateY(0); }

                /* ── giant ghost word ── */
                .ghost-word {
                    font-family: 'Montserrat', sans-serif;
                    font-weight: 700;
                    font-size: clamp(5rem, 15vw, 13rem);
                    line-height: 1;
                    color: transparent;
                    -webkit-text-stroke: 1px rgba(255,254,247,0.06);
                    pointer-events: none;
                    user-select: none;
                    letter-spacing: -0.03em;
                }

                /* ── thumbnail strip hover ── */
                .thumb {
                    transition: transform 0.4s ease, box-shadow 0.4s ease, border-color 0.4s ease;
                    cursor: pointer;
                }
                .thumb:hover {
                    transform: translateY(-6px);
                    box-shadow: 0 20px 40px rgba(0,0,0,0.7);
                    border-color: rgba(0,123,255,0.6) !important;
                }

                /* ── scroll hint bounce ── */
                @keyframes bounce-y {
                    0%,100% { transform: translateY(0); }
                    50%      { transform: translateY(6px); }
                }
                .bounce { animation: bounce-y 1.8s ease-in-out infinite; }

                /* ── stat counter line ── */
                .stat-line {
                    position: relative;
                    padding-left: 1rem;
                }
                .stat-line::before {
                    content: '';
                    position: absolute;
                    left: 0; top: 0; bottom: 0;
                    width: 2px;
                    background: linear-gradient(to bottom, #007bff, transparent);
                    border-radius: 2px;
                }
            `}</style>

      {/* ══════════════════════════════════════════
                FULL-BLEED SECTION — tall cinematic hero
            ══════════════════════════════════════════ */}
      <section className="relative w-full min-h-screen overflow-hidden flex flex-col justify-end py-12 px-4 lg:px-8">

        {/* ── Slideshow background ── */}
        <div className="diag-panel absolute inset-0">
          {data.storyImages.map((src, i) => (
            <div
              key={i}
              className="bg-slide"
              style={{ backgroundImage: `url(${src})` }}
            />
          ))}
          {/* deep gradient overlays */}
          <div className="absolute inset-0 bg-linear-to-t from-secondary via-secondary/70 to-secondary/20" />
          <div className="absolute inset-0 bg-linear-to-r from-secondary/80 via-transparent to-transparent" />
        </div>

        {/* ── Giant ghost background word ── */}


        {/* ── Top label bar ── */}


        {/* ══════════════════════════════
                    BOTTOM CONTENT BLOCK
                ══════════════════════════════ */}
        <div className="relative z-10   flex flex-col justify-content gap-8 max-w-7xl mx-auto">

          {/* Main heading — massive, left-anchored */}
          <div className="max-w-4xl fade-up">
            <p className=" mb-4 text-sm tracking-[0.4em] uppercase text-third font-semibold">
              Hero
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.05] text-primary font-[Montserrat]">
              Our Story{' '}
              <span className="text-fourth/80">Built for</span>
              <br />
              Buy &amp; Selling a Vehicle
            </h2>
          </div>

          {/* ── Bottom row: desc left + stats center + thumbs right ── */}
          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_auto_1fr] gap-8 lg:gap-12 items-end fade-up">

            {/* Description */}
            <p className="text-third/60 text-sm font-[Poppins] leading-relaxed ">
              {data.heroDesc}
            </p>

            {/* Vertical divider */}
            <div className="hidden lg:block w-px h-24 bg-linear-to-b from-transparent via-third/20 to-transparent self-center" />

            {/* Stats + thumbnail row */}
            <div className="flex flex-col gap-6">

              {/* Stats inline */}


              {/* Thumbnail strip */}
              <div className="flex items-end gap-2">
                {data.storyImages.map((src, i) => (
                  <div
                    key={i}
                    className="thumb rounded-lg overflow-hidden border border-third/15 shadow-xl"
                    style={{ width: i === 0 ? '80px' : i === 1 ? '64px' : '50px', height: i === 0 ? '56px' : i === 1 ? '46px' : '38px' }}
                  >
                    <img src={src} alt={`thumb-${i}`} className="w-full h-full object-cover" />
                  </div>
                ))}

              </div>

            </div>
          </div>

          {/* bottom line */}
          <div className="h-px bg-linear-to-r from-fourth/30 via-third/10 to-transparent fade-up" />

        </div>

        {/* ── scroll hint ── */}


      </section>
    </>
  )
}

export default Hero