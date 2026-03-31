"use client";

import React, { useState } from "react";
import { ShieldCheck, Globe, TrendingUp, Cpu } from "lucide-react";

export default function AboutPage() {

  const data = {

    /* ───────── HERO ───────── */
    hero: {
      heroDesc: `
        <p>
          Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec.
          Sapien platea nec urna ut est sed. Lorem ipsum dolor sit amet consectetur.
        </p>
      `,
      videoSrc:
        "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
      images: [
        "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200&q=90",
        "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=1200&q=90",
      ],
    },

    /* ───────── STATS ───────── */
    stats: {
      statsDesc: `
        <p>
          Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec.
        </p>
      `,
      stats: [
        { number: "150K+", label: "Active Users Worldwide" },
        { number: "$2B+", label: "Transactions Processed" },
        { number: "98%", label: "Customer Satisfaction" },
        { number: "100+", label: "Team Members" },
      ],
    },

    /* ───────── MISSION ───────── */
    missionTitle: "Our Mission",
    missionDesc: "To engineer the most transparent, elegant, and efficient automotive marketplace in existence. We bridge the gap between luxury and logic.",
    missionImage: "https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?w=1200&q=80",

    visionTitle: "Our Vision",
    visionDesc: "Defining the future of mobility. We envision a world where every vehicle transaction is a seamless, digital-first masterpiece.",
    visionImage: "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=1200&q=80",

    /* ───────── SERVICES ───────── */
    servicesTitle: "What We Do",
    servicesDesc: "Enterprise-grade digital products designed to scale globally with security, speed and reliability.",
    services: [
      {
        icon: ShieldCheck,
        title: "Secure Payments",
        desc: "PCI-DSS compliant global payment systems engineered for high-volume automotive transactions.",
        color: "#007bff"
      },
      {
        icon: Globe,
        title: "Global Infrastructure",
        desc: "99.99% uptime cloud deployment across 12 global regions for seamless user experience.",
        color: "#00c3ff"
      },
      {
        icon: TrendingUp,
        title: "Growth Tools",
        desc: "Smart CRM, predictive analytics, and automated sales funnels to maximize conversion.",
        color: "#0056b3"
      },
      {
        icon: Cpu,
        title: "AI Optimization",
        desc: "AI-powered performance engines that learn from every interaction to optimize your fleet.",
        color: "#4e9eff"
      },
    ],
  };

  const [active, setActive] = useState(0);
   const [hovered, setHovered] = useState(null); // ✅ NEW

  const current = hovered !== null ? hovered : active; // ✅ NEW

  return (
    <>
      {/* ═════════ HERO (UNCHANGED) ═════════ */}
<section className="w-full min-h-screen  flex items-center justify-center py-12  pt-20">

  <div className="w-full max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">

    {/* LEFT CONTENT */}
    <div className="relative z-10">

      <p className="mb-4 text-xs tracking-[0.5em] uppercase text-third font-semibold">
        Hero
      </p>

      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.1] text-primary font-[Montserrat]">
        Our <span className="text-fourth/90">Story</span>
        <br />
        Built for Buy & Selling a Vehicle
      </h1>

      <div
        className="mt-6 text-third/70 text-lg font-[Poppins] leading-relaxed max-w-xl"
        dangerouslySetInnerHTML={{ __html: data.hero.heroDesc }}
      />

    </div>

    {/* RIGHT VIDEO */}
    <div className="relative">

      {/* ANGLED FRAME */}
      <div className="relative rounded-2xl overflow-hidden border border-primary/20 ">

        <video
          src={data.hero.videoSrc}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-[300px] sm:h-[400px] lg:h-[400px] object-cover"
        />

        {/* DARK OVERLAY */}
        <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent" />

      </div>

      {/* SMALL OFFSET EDGE (PREMIUM TOUCH) */}

    </div>

  </div>

</section>



      {/* ═════════ MISSION (UNCHANGED DESIGN) ═════════ */}
      <section className="relative  py-12  px-2 lg:px-4 overflow-hidden">
        <div className="container">
          <style>{`
        .text-vertical {
          writing-mode: vertical-rl;
          text-orientation: mixed;
        }
        .mission-grid {
          display: grid;
          grid-template-columns: repeat(12, 1-fr);
          align-items: center;
        }
        .reveal-card {
          transition: all 0.8s cubic-bezier(0.23, 1, 0.32, 1);
        }
        .group:hover .reveal-card {
          transform: translateY(-20px);
          filter: saturate(1.2) brightness(1.1);
        }
        .outline-text {
          -webkit-text-stroke: 1px rgba(255,255,255,0.1);
          color: transparent;
        }
      `}</style>

          {/* ── BACKGROUND WATERMARK ── */}
          <div className="absolute top-10 left-0 w-full flex justify-center opacity-5 pointer-events-none select-none">
            <h1 className="text-[25vw] font-black outline-text leading-none uppercase">Spirit</h1>
          </div>

          <div className="max-w-[1600px] mx-auto relative z-10">

            {/* ── HEADING ── */}
            <div className="flex flex-col gap-6 max-w-2xl text-center mx-auto mb-16">
              <p className="text-sm tracking-[0.4em] uppercase text-third font-semibold">
                Purpose
              </p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.05] text-primary font-[Montserrat]">
                Mission &
                <span className="text-fourth/80"> Vision</span>
              </h2>
            </div>

            {/* ── THE "NEW TYPE" ASYMMETRIC LAYOUT ── */}
            <div className="flex flex-col lg:flex-row gap-20 lg:gap-0 items-stretch">

              {/* LEFT: MISSION (UPDATED WITH RIGHT STYLE) */}
              <div className="lg:w-1/2 relative group">
                <div className="relative h-[800px] lg:h-[600px] w-full lg:w-[95%] overflow-hidden rounded-tr-[100px] lg:rounded-tr-[200px] border-r border-t border-primary/10">

                  <img
                    src={data.missionImage}
                    className="reveal-card w-full h-full object-cover grayscale group-hover:grayscale-0"
                    alt="Mission"
                  />

                  <div className="absolute inset-0 bg-linear-to-t from-secondary via-transparent to-transparent" />
                </div>

                {/* ✨ NEW CONTENT (RIGHT SIDE STYLE APPLIED) */}
                <div className="absolute bottom-12 left-0 lg:left-0 w-[520px]  p-5 border border-primary/10 backdrop-blur-2xl bg-primary/5 transition-all duration-500 group-hover:border-primary/40">



                  <h3 className="text-4xl font-bold font-[Montserrat] mb-6 text-primary uppercase">
                    {data.missionTitle.split(" ")[0]}{" "}
                    <span className="text-fourth/80">
                      {data.missionTitle.split(" ")[1]}
                    </span>
                  </h3>

                  <p className="text-third text-lg font-light leading-relaxed italic ">
                    {data.missionDesc}
                  </p>

                  {/* same button vibe */}


                </div>


              </div>

              {/* RIGHT: VISION (The Wide Floating) */}
              <div className="lg:w-1/2 lg:mt-64 relative group">
                <div className="relative h-[400px] lg:h-[550px] w-full overflow-hidden rounded-bl-[100px] lg:rounded-bl-[200px] border-b border-l border-primary/10">
                  <img
                    src={data.visionImage}
                    className="reveal-card w-full h-full object-cover thirdscale group-hover:thirdscale-0"
                    alt="Vision"
                  />
                  <div className="absolute inset-0 bg-linear-to-b from-secondary via-transparent to-transparent" />
                </div>

                {/* Content Floating */}
                <div className="mt-12 lg:mt-0 lg:absolute -top-24 right-0 lg:right-12 max-w-md p-10 border border-primary/10 backdrop-blur-2xl bg-primary/5 transition-all duration-500 group-hover:border-primary/40">

                  <h3 className="text-4xl font-bold font-[Montserrat] mb-6 text-primary uppercase">
                    {data.visionTitle.split(" ")[0]}{" "}
                    <span className="text-fourth/80">
                      {data.visionTitle.split(" ")[1]}
                    </span>
                  </h3>
                  <p className="text-third text-lg font-light leading-relaxed italic">{data.visionDesc}</p>


                </div>
              </div>

            </div>

            {/* ── DECORATIVE SIDE TEXT ── */}

          </div>
        </div>
      </section>

      {/* ═════════ STATS (UNCHANGED) ═════════ */}
      <section className="relative py-12 bg-primary text-secondary overflow-hidden">
        <div className="container">
          <div className=" px-4 lg:px-8 grid lg:grid-cols-2 gap-16 items-center">

            <div className="flex flex-col gap-6">
              <p className="text-sm tracking-[0.4em] uppercase text-secondary/60 font-semibold">
                Impact
              </p>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold font-[Montserrat]">
                Our <span className="text-fourth/80">Numbers</span>
              </h2>

              <div
                className="text-secondary/70 text-lg font-[Poppins]"
                dangerouslySetInnerHTML={{ __html: data.stats.statsDesc }}
              />
            </div>

            <div className="relative flex justify-center">
              <div className="relative w-[320px] h-80 sm:w-[400px] sm:h-[400px]">

                {data.stats.stats.map((item, index) => {
                  const pos = [
                    "top-0 left-1/2 -translate-x-1/2",
                    "right-0 top-1/2 -translate-y-1/2",
                    "bottom-0 left-1/2 -translate-x-1/2",
                    "left-0 top-1/2 -translate-y-1/2",
                  ];

                  return (
                    <div key={index} className={`absolute ${pos[index]} flex flex-col items-center`}>
                      <h3 className="text-3xl sm:text-4xl font-semibold font-[Montserrat]">
                        {item.number}
                      </h3>
                      <p className="text-secondary/60 text-sm text-center max-w-[120px]">
                        {item.label}
                      </p>
                    </div>
                  );
                })}

                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-fourth/80" />
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ═════════ SERVICES (UNCHANGED INTERACTIVE) ═════════ */}
      <section className="relative py-20 px-4 text-primary  font-[Poppins]">
        <div className="container mx-auto max-w-7xl">

          {/* HEADER */}
          <div className="max-w-2xl mb-16">
            <p className="text-sm tracking-[0.4em] uppercase text-third font-semibold mb-4">
              Services
            </p>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.05] text-primary font-[Montserrat]">
              What <span className="text-fourth/80">We Do</span>
            </h2>

            <p className="mt-6 text-third/70 text-lg leading-relaxed border-l-2 border-primary/30 pl-6">
              {data.servicesDesc}
            </p>
          </div>

          {/* MAIN GRID */}
          <div className="grid lg:grid-cols-2 gap-14 items-center">

            {/* LEFT: CARDS */}
            <div className="grid sm:grid-cols-2 gap-6">

              {data.services.map((service, i) => {
                const isActive = current === i; // ✅ changed

                return (
                  <div
                    key={i}
                    onClick={() => setActive(i)} // still works
                    onMouseEnter={() => setHovered(i)} // ✅ hover
                    onMouseLeave={() => setHovered(null)} // ✅ reset
                    className={`cursor-pointer rounded-2xl p-6 border transition-all duration-300 
                    ${isActive 
                      ? "border-primary/40 bg-primary/5 " 
                      : "border-primary/20 hover:border-primary/40 hover:bg-primary/5"}`}
                  >

                    <div className="flex items-center gap-4 mb-4">
                      <div className={`w-12 h-12 flex items-center justify-center rounded-xl 
                        ${isActive ? "bg-primary text-secondary" : "bg-primary/5 text-third"}`}>
                        <service.icon size={22} />
                      </div>

                      <h4 className="text-lg font-semibold font-[Montserrat]">
                        {service.title}
                      </h4>
                    </div>

                    <p className="text-third/60 text-sm leading-relaxed">
                      {service.desc.substring(0, 70)}...
                    </p>

                  </div>
                );
              })}

            </div>

            {/* RIGHT: CONTENT PANEL */}
            <div className="relative">

              <div className="rounded-3xl border border-primary/20 p-8 lg:p-10 bg-primary/5 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.4)] transition-all duration-500">

                <p className="text-xs tracking-[0.4em] uppercase text-third mb-3">
                  Selected Service
                </p>

                <h3 className="text-2xl lg:text-4xl font-bold font-[Montserrat] mb-6">
                  {data.services[current].title} {/* ✅ changed */}
                </h3>

                <p className="text-third/70 text-lg leading-relaxed border-l-2 border-primary pl-6">
                  {data.services[current].desc} {/* ✅ changed */}
                </p>

              </div>

            </div>

          </div>

        </div>
      </section>

    </>
  );
}