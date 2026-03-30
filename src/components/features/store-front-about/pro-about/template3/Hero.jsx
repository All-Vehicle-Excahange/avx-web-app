import React, { useEffect, useRef, useState } from 'react'

const data = {
  heroTitle: "Our Story Built for Buy & Selling a Vehicle",
  heroDesc: `
      Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec.
      Sapien platea nec urna ut est sed. Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec.
      Sapien platea nec urna ut est sed. Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec.
      Sapien platea nec urna ut est sed. Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec.
      Sapien platea nec urna ut est sed. Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec.
      Sapien platea nec urna ut est sed.
  `,
  storyImages: [
    "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1600&q=80",
    "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=1600&q=80",
    "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=1600&q=80",
  ],
}

function Hero() {
  const [current, setCurrent] = useState(0)
  const timerRef = useRef(null)

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setCurrent(prev => (prev + 1) % data.storyImages.length)
    }, 3500)
    return () => clearInterval(timerRef.current)
  }, [])

  return (
    <>
      <style>{`
        @keyframes kenburns {
          0%   { transform: scale(1) translateX(0px); }
          100% { transform: scale(1.08) translateX(-18px); }
        }
        .bg-slide {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0;
          transition: opacity 1.2s ease-in-out;
          animation: kenburns 7s ease-in-out infinite alternate;
        }
        .bg-slide.active { opacity: 1; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .fade-up-1 { animation: fadeUp 0.8s 0s ease both; }
        .fade-up-2 { animation: fadeUp 0.8s 0.15s ease both; }
        .fade-up-3 { animation: fadeUp 0.8s 0.28s ease both; }
        .fade-up-4 { animation: fadeUp 0.8s 0.42s ease both; }
        .fade-up-5 { animation: fadeUp 0.8s 0.55s ease both; }

       

        }
      `}</style>

      <section className="relative min-h-screen py-12 flex flex-col overflow-hidden">

        {/* ── AUTO-SCROLL BACKGROUND — storyImages ── */}
        {data.storyImages.map((src, i) => (
          <img
            key={i}
            src={src}
            alt=""
            className={`bg-slide${current === i ? ' active' : ''}`}
          />
        ))}

        {/* ── OVERLAYS ── */}
        <div className="absolute inset-0 bg-secondary/65" />
        <div className="absolute inset-0 bg-linear-to-b from-secondary/20 via-secondary/40 to-secondary" />

        {/* ── UPPER: CENTERED TEXT ── */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center gap-8 text-center px-2 lg:px-4 pt-16 pb-6">

          {/* Label */}
          <div className="flex items-center gap-3 fade-up-1">
            <p className="text-sm tracking-[0.45em] uppercase text-third font-semibold">
              Hero
            </p>
          </div>

          {/* Title */}
          <h2 className="flex flex-col gap-2 text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.05] text-primary font-[Montserrat]">
            <span>Our Story Built for</span>
            <span className="text-fourth/80">Buy & Selling a Vehicle</span>
          </h2>

          {/* Description */}
          <p className="text-third/55 text-base sm:text-lg font-[Poppins] leading-relaxed max-w-6xl">
            {data.heroDesc}
          </p>
          <a href="#" class="font-[Montserrat] font-bold text-sm tracking-[0.15em] uppercase text-primary border-b border-third/40 pb-0.5 hover:border-primary transition-colors duration-200">Explore Listings →</a>



        </div>



      </section>
    </>
  )
}

export default Hero