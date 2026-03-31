"use client"
import React, { useEffect, useRef, useState } from "react"
import { ShieldCheck, Globe, TrendingUp, Cpu } from "lucide-react"

const data = {
  heroTitle: "Our Story Built for Buy & Selling a Vehicle",
  heroDesc: `Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec.`,
  storyImages: [
    "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1600&q=80",
    "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=1600&q=80",
    "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=1600&q=80",
  ],

  missionTitle: "Our Mission",
  missionDesc: `Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec. Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec. Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec.Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec. Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec. Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec.`,
  missionImage: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80",

  visionTitle: "Our Vision",
  visionDesc: `Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec. Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec. Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec.Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec. Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec. Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec.`,
  visionImage: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&q=80",

  statsDesc: `Lorem ipsum dolor sit amet consectetur.`,
  stats: [
    { number: "150K+", label: "Active Users Worldwide" },
    { number: "$2B+", label: "Transactions Processed" },
    { number: "98%", label: "Customer Satisfaction" },
    { number: "100+", label: "Team Members" },
  ],

  services: [
    {
      icon: ShieldCheck,
      title: "Secure Payments",
      desc: "PCI-DSS compliant global payment systems.",
    },
    {
      icon: Globe,
      title: "Global Infrastructure",
      desc: "99.99% uptime cloud deployment in 12 regions.",
    },
    {
      icon: TrendingUp,
      title: "Growth Tools",
      desc: "Smart CRM, analytics and automation funnels.",
    },
    {
      icon: Cpu,
      title: "AI Optimization",
      desc: "AI powered performance & conversion engines.",
    },
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
          0% { transform: scale(1) translateX(0px); }
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
          to { opacity: 1; transform: translateY(0); }
        }
        .fade-up-1 { animation: fadeUp 0.8s 0s ease both; }
        .fade-up-2 { animation: fadeUp 0.8s 0.15s ease both; }
        .fade-up-3 { animation: fadeUp 0.8s 0.28s ease both; }
        .fade-up-4 { animation: fadeUp 0.8s 0.42s ease both; }
        .fade-up-5 { animation: fadeUp 0.8s 0.55s ease both; }

        .mv-card img {
          transition: transform 0.7s cubic-bezier(0.23,1,0.32,1);
        }
        .mv-card:hover img {
          transform: scale(1.05);
        }
      `}</style>

      {/* HERO */}
      <section className="relative min-h-screen py-12 flex flex-col overflow-hidden ">
        {data.storyImages.map((src, i) => (
          <img key={i} src={src} className={`bg-slide${current === i ? " active" : ""}`} />
        ))}

        <div className="absolute inset-0 bg-secondary/65" />
        <div className="absolute inset-0 bg-linear-to-b from-secondary/20 via-secondary/40 to-secondary" />

        <div className="relative z-10 flex-1 flex flex-col items-center justify-center gap-8 text-center px-2 lg:px-4 pt-16 pb-6">
          <p className="text-sm tracking-[0.45em] uppercase text-third font-semibold fade-up-1">
            Hero
          </p>

          <h2 className="flex flex-col gap-2 text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.05] text-primary font-[Montserrat] fade-up-2">
            <span>Our Story Built for</span>
            <span className="text-fourth/80">Buy & Selling a Vehicle</span>
          </h2>

          <p className="text-third/55 text-base sm:text-lg font-[Poppins] leading-relaxed max-w-6xl fade-up-3">
            {data.heroDesc}
          </p>

          <a href="#" className="font-[Montserrat] font-bold text-sm tracking-[0.15em] uppercase text-primary border-b border-third/40 pb-0.5 hover:border-primary transition-colors duration-200">
            Explore Listings →
          </a>
        </div>
      </section>

      {/* MISSION / VISION */}
      <section className="relative py-4 overflow-hidden px-2 lg:px-4 ">
        <div className="container">
        <div className="flex flex-col items-center gap-3 mb-12 fade-up-1 ">
          <div className="flex flex-col items-center text-center gap-6 max-w-2xl mx-auto">
            <p className="text-sm tracking-[0.4em] uppercase text-third font-semibold">
              Mission / Vision
            </p>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.05] text-primary font-[Montserrat]">
              Direction We <span className="text-fourth/80">Move</span>
            </h2>
          </div>
        </div>

        <div className="flex flex-col gap-6 max-w-7xl mx-auto">

          <div className="mv-card relative rounded-2xl overflow-hidden shadow-2xl border border-third/10 py-14">
            <img src={data.missionImage} className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-linear-to-r from-secondary/95 via-secondary/85 to-secondary/70" />
            <div className="relative z-10 px-8 sm:px-12 lg:px-16 max-w-2xl gap-5">
              <p className="text-sm tracking-[0.4em] uppercase text-third font-semibold">01</p>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-primary font-[Montserrat]">
                Our <span className="text-fourth/80">Mission</span>
              </h2>
              <p className="text-third/70">{data.missionDesc}</p>
            </div>
          </div>

          <div className="mv-card relative rounded-2xl overflow-hidden shadow-2xl border border-third/10 py-14">
            <img src={data.visionImage} className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-linear-to-l from-secondary/95 via-secondary/85 to-secondary/70" />
            <div className="relative z-10 px-8 sm:px-12 lg:px-16 text-right ml-auto max-w-2xl gap-5 w-full">
              <p className="text-sm tracking-[0.4em] uppercase text-third font-semibold">02</p>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-primary font-[Montserrat]">
                Our <span className="text-fourth/80">Vision</span>
              </h2>
              <p className="text-third/70">{data.visionDesc}</p>
            </div>
          </div>

        </div>
        </div>
      </section>

      {/* STATS */}
      <section className="relative  overflow-hidden px-2 lg:px-4 ">
         <div className="container">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[1fr_1fr] gap-12 lg:gap-20 items-center">

          <div className="flex flex-col gap-6">
            <p className="text-sm tracking-[0.4em] uppercase text-third font-semibold">
              Stats
            </p>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-primary font-[Montserrat]">
              Numbers that <br />
              <span className="text-fourth/80">speak for us</span>
            </h2>

            <p className="text-third/70">{data.statsDesc}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {data.stats.map((stat, i) => (
              <div key={i} className="flex flex-col gap-2 border border-third/10 rounded-2xl p-6 lg:p-8 hover:border-third/20 hover:bg-third/3 shadow-2xl">
                <span className="text-xl lg:text-3xl text-primary">{stat.number}</span>
                <span className="text-sm text-third/50">{stat.label}</span>
              </div>
            ))}
          </div>

        </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="relative  px-2 lg:px-4 ">
         <div className="container">
        <div className="mx-auto w-full  ">

          <div className="mb-8 max-w-3xl">
            <p className="text-sm tracking-[0.4em] uppercase text-third font-semibold mb-8">
              Our Services
            </p>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-primary font-[Montserrat]">
              What We <span className="text-fourth/80">Do</span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {data.services.map((item, i) => {
              const Icon = item.icon
              return (
                <div key={i} className="group flex flex-col justify-between border border-third/10 rounded-2xl p-6 backdrop-blur-lg hover:border-third/30 transition">
                  <div>
                    <div className="w-12 h-12 flex items-center justify-center rounded-xl border border-third/10 mb-6">
                      <Icon className="w-5 h-5 text-third" />
                    </div>

                    <span className="text-third/40 text-sm mb-3 block">
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    <h3 className="text-xl font-semibold text-primary font-[Montserrat] mb-2">
                      {item.title}
                    </h3>
                  </div>

                  <p className="text-third/60 text-sm">
                    {item.desc}
                  </p>
                </div>
              )
            })}
          </div>

        </div>
        </div>
      </section>
    </>
  )
}

export default Hero