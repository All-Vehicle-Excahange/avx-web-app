"use client";
import { Cpu, Globe, ShieldCheck, TrendingUp } from "lucide-react";
import React, { useState } from "react";

function Hero() {
  const data = {

    // ====== Hero Section Data ========
    heroTitle: "Our Story Built for Buy & Selling a Vehicle",
    heroDesc: `
       Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec.
        Sapien platea nec urna ut est sed. Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec.
        Sapien platea nec urna ut est sed.  Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec.
        Sapien platea nec urna ut est sed. 
    `,
    videoPath: "/video.mp4",

    // ====== Mission & Vision Section Data ========
    missionTitle: "Our Mission",
    missionDesc: `
  Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec. Sapien platea nec urna ut est sed.Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec. Sapien platea nec urna ut est sed.
`,
    missionImage: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=900&q=90",

    visionTitle: "Our Vision",
    visionDesc: `
   Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec. Sapien platea nec urna ut est sed.Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec.
`,
    visionImage: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=900&q=90",

    // ====== Stats Section Data ========
    statsDesc: `Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec. Sapien platea nec urna ut est sed. Lorem ipsum dolor sit amet consectetur. `,
    stats: [
      { number: "150K+", label: "Active Users Worldwide" },
      { number: "$2B+", label: "Transactions Processed" },
      { number: "98%", label: "Customer Satisfaction" },
      { number: "100+", label: "Team Members" },
    ],

    // ====== Services Section Data ========
    servicesTitle: "What We Do",
    servicesDesc: `Enterprise-grade digital products designed to scale globally with security, speed and reliability.`,
    services: [
      {
        icon: "ShieldCheck",
        title: "Secure Payments",
        desc: "PCI-DSS compliant global payment systems.",
      },
      {
        icon: "Globe",
        title: "Global Infrastructure",
        desc: "99.99% uptime cloud deployment in 12 regions.",
      },
      {
        icon: "TrendingUp",
        title: "Growth Tools",
        desc: "Smart CRM, analytics and automation funnels.",
      },
      {
        icon: "Cpu",
        title: "AI Optimization",
        desc: "AI powered performance & conversion engines.",
      },
    ]
  };

  const iconMap = { ShieldCheck, Globe, TrendingUp, Cpu };

  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <>
      <section className="relative w-full min-h-screen flex flex-col overflow-hidden py-12">

        {/* VIDEO BACKGROUND */}
        <div className="absolute inset-0 z-0">
          <video
            src={data.videoPath}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          />

          {/* overlays (no inline styles) */}
          <div className="absolute inset-0 bg-secondary/60" />
        </div>

        {/* CENTER CONTENT */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 sm:px-6 text-center pt-16 pb-8">

          {/* KEEPING YOUR EXACT TEXT STRUCTURE */}
          <div className="flex flex-col gap-8 mb-6">
            <p className="text-sm tracking-[0.45em] uppercase text-third font-semibold fade-up-1">
              Hero
            </p>

            <h2 className="flex flex-col gap-2 text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.05] text-primary font-[Montserrat] fade-up-2">
              Our Story Built for
              <span className="text-fourth/80">Buy & Selling a Vehicle</span>
            </h2>

            <p className="text-third/55 text-base sm:text-lg font-[Poppins] leading-relaxed max-w-6xl fade-up-3">
              {data.heroDesc}
            </p>
          </div>


        </div>

      </section>

      <section className="relative py-12 overflow-hidden px-2 lg:px-4">
        <div className="container">
          <div className="mx-auto w-full  relative">
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
            {/* ================= MISSION ================= */}
            <div className="relative mb-32">

              {/* BIG IMAGE (background style) */}
              <div className="w-[85%] lg:w-[70%] md:w-[75%] h-80 rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={data.missionImage}
                  alt=""
                  className="w-full h-full object-cover opacity-60"
                />
              </div>

              {/* FLOATING TEXT CARD */}
              <div className="absolute right-0 -bottom-16 w-[90%] md:w-[75%] lg:w-[45%] backdrop-blur-md bg-secondary/40 border border-third/10 rounded-2xl p-6 shadow-xl">
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-primary font-[Montserrat] mb-3">
                  {data.missionTitle.split("Mission")[0]}
                  <span className="text-fourth/80">Mission</span>
                </h3>

                <div
                  className="text-third/70 font-[Poppins] leading-relaxed">
                    <p>{data.missionDesc}</p>
                  </div>
              </div>
            </div>

            {/* ================= VISION ================= */}
            <div className="relative">

              {/* SMALL OFFSET IMAGE */}
              <div className="ml-auto w-[85%] lg:w-[70%] md:w-[75%] h-80 rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={data.visionImage}
                  alt=""
                  className="w-full h-full object-cover opacity-60"
                />
              </div>

              {/* TEXT BLOCK OFFSET LEFT */}
              <div className="absolute left-0 -bottom-16 w-[90%] md:w-[75%] lg:w-[45%]  backdrop-blur-md bg-secondary/40 border border-third/10 rounded-2xl p-6 shadow-xl">
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-primary font-[Montserrat] mb-3">
                  {data.missionTitle.split("Mission")[0]}
                  <span className="text-fourth/80">Mission</span>
                </h3>

                <div
                  className="text-third/70 font-[Poppins] leading-relaxed">
                    <p>{data.visionDesc}</p>
                  </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <section className="relative flex flex-col justify-center items-center py-4 px-2 lg:px-4">
        <div className="container">
          <div className="mx-auto w-full">

            <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

              {/* ── LEFT: eyebrow + title + desc ── */}
              <div className="flex flex-col gap-8">

                <div className="flex flex-col gap-6">
                  <p className="text-sm tracking-[0.4em] uppercase text-third font-semibold">
                    Stats
                  </p>
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.05] text-primary font-[Montserrat]">
                    Numbers that
                    <br />
                    <span className="text-fourth/80">speak for us</span>
                  </h2>
                  <p className="text-third/70 text-md font-[Poppins] leading-relaxed max-w-md">
                    {data.statsDesc}
                  </p>
                </div>

                <p className="text-third/70 text-md font-[Poppins] leading-relaxed max-w-md">
                  {data.statsDesc}
                </p>

              </div>

              {/* ── RIGHT: 2x2 stats grid with cross dividers ── */}
              <div className="relative grid grid-cols-2">

                {/* Horizontal rule across center */}
                <div className="absolute top-1/2 left-0 w-full h-px bg-third/20 -translate-y-1/2" />
                {/* Vertical rule down center */}
                <div className="absolute left-1/2 top-0 h-full w-px bg-third/20 -translate-x-1/2" />

                {/* Top-left accent line */}
                <div className="absolute top-0 right-1/2 w-8 h-px bg-fourth" />
                {/* Bottom-right accent line */}
                <div className="absolute bottom-0 left-1/2 w-8 h-px bg-fourth" />
                {/* Top-right vertical accent */}
                <div className="absolute top-0 left-1/2 w-px h-8 bg-fourth" />
                {/* Bottom-left vertical accent */}
                <div className="absolute bottom-0 right-1/2 w-px h-8 bg-fourth" />

                {data.stats.map((stat, index) => (
                  <div
                    key={index}
                    className="flex flex-col gap-3 p-8 lg:p-10"
                  >
                    <p className="text-xl sm:text-2xl lg:text-3xl font-semibold leading-none text-primary font-[Montserrat]">
                      {stat.number}

                    </p>
                    <p className="text-third/60 text-sm font-[Poppins] leading-snug">
                      {stat.label}
                    </p>
                  </div>
                ))}

              </div>

            </div>

          </div>
        </div>
      </section>

      <section className="relative flex flex-col justify-center items-center px-2 lg:px-4">
        <div className="container">
          <div className="mx-auto w-full  flex flex-col gap-6">

            {/* ── Header ── */}
            <div className="grid gap-5 items-end">
              <div className="flex flex-col gap-5">
                <div className="flex items-center gap-4">
                  <p className="text-sm tracking-[0.4em] uppercase text-third font-semibold">
                    Our Services
                  </p>
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.05] text-primary font-[Montserrat]">
                  What We
                  <span className="text-fourth/80"> Actually Do</span>
                </h2>
              </div>
              <div className="flex flex-col gap-4 lg:pb-2">
                <p className="text-third/70 text-lg md:text-md font-[Poppins] leading-relaxed">
                  {data.servicesDesc}
                </p>
              </div>
            </div>

            {/* ── Services Panel ── */}
            <div className="grid lg:grid-cols-12 gap-0 border border-third/10 rounded-2xl overflow-hidden">

              {/* Left: expandable rows — desktop only */}
              <div className="lg:col-span-5 hidden lg:flex flex-col border-r border-third/10">
                {data.services.map((service, index) => {
                  const Icon = iconMap[service.icon];
                  const isActive = activeIndex === index;
                  return (
                    <button
                      key={index}
                      onClick={() => setActiveIndex(index)}
                      onMouseEnter={() => setActiveIndex(index)}
                      className={`group relative flex flex-col text-left border-b border-third/10 last:border-none transition-all duration-300 overflow-hidden ${isActive ? "bg-third/5 py-7 gap-3" : "py-7 gap-0 hover:bg-third/3"}`}
                    >
                      {/* Active left bar */}
                      <span className={`absolute left-0 top-0 w-0.5 h-full transition-all duration-300 ${isActive ? "bg-third" : "bg-transparent"}`} />

                      {/* Row: number + icon + title + toggle */}
                      <div className="flex items-center justify-between px-8">
                        <div className="flex items-center gap-4">
                          <span className={`text-xs tracking-[0.4em] font-semibold font-[Poppins] transition-colors duration-300 ${isActive ? "text-third" : "text-third/30"}`}>
                            0{index + 1}
                          </span>
                          <span className={`transition-colors duration-300 ${isActive ? "text-third" : "text-third/30 group-hover:text-third/60"}`}>
                            {Icon && <Icon size={16} strokeWidth={1.5} />}
                          </span>
                          <h3 className={`text-sm font-semibold font-[Montserrat] transition-colors duration-300 ${isActive ? "text-primary" : "text-third/50 group-hover:text-third/80"}`}>
                            {service.title}
                          </h3>
                        </div>
                        <span className={`text-sm font-[Poppins] transition-all duration-300 ${isActive ? "text-third" : "text-third/20"}`}>
                          {isActive ? "—" : "+"}
                        </span>
                      </div>

                      {/* Expanded desc */}

                    </button>
                  );
                })}
              </div>

              {/* Tab bar — mobile only */}
              <div className="lg:hidden flex flex-row w-full border-b border-third/10 overflow-x-auto">
                {data.services.map((service, index) => {
                  const Icon = iconMap[service.icon];
                  const isActive = activeIndex === index;
                  return (
                    <button
                      key={index}
                      onClick={() => setActiveIndex(index)}
                      className={`relative flex items-center gap-2 px-5 py-4 whitespace-nowrap flex-1 justify-center transition-all duration-200 ${isActive ? "text-primary" : "text-third/40"}`}
                    >
                      {Icon && <Icon size={14} strokeWidth={1.5} className={isActive ? "text-third" : ""} />}
                      <span className="text-xs font-semibold font-[Poppins] tracking-wide">
                        {service.title}
                      </span>
                      <span className={`absolute bottom-0 left-0 h-px w-full transition-all duration-300 ${isActive ? "bg-third" : "bg-transparent"}`} />
                    </button>
                  );
                })}
              </div>

              {/* Right: large active display */}
              <div className="lg:col-span-7 flex flex-col justify-between p-10 lg:p-14 gap-8">

                {/* Icon + content */}
                <div className="flex flex-col gap-4">

                  {/* Icon row */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center justify-center w-16 h-16 rounded-2xl border border-third/20 bg-third/5">
                      {(() => {
                        const Icon = iconMap[data.services[activeIndex].icon];
                        return Icon ? <Icon size={28} strokeWidth={1.3} className="text-third" /> : null;
                      })()}
                    </div>
                    <p className="text-xs tracking-[0.5em] uppercase text-third/30 font-semibold font-[Poppins]">
                      0{activeIndex + 1} / 0{data.services.length}
                    </p>
                  </div>

                  {/* Title + divider + desc */}
                  <div className="flex flex-col gap-4">
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-semibold leading-[1.05] text-primary font-[Montserrat]">
                      {data.services[activeIndex].title}
                    </h3>
                    <p className="text-third/70 text-lg font-[Poppins] leading-relaxed max-w-sm">
                      {data.services[activeIndex].desc}
                    </p>
                  </div>
                </div>

                {/* Bottom dot indicators */}
                <div className="flex items-center gap-3">
                  {data.services.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveIndex(i)}
                      onMouseEnter={() => setActiveIndex(i)}
                      className={`transition-all duration-300 rounded-full ${i === activeIndex ? "w-8 h-1.5 bg-third" : "w-1.5 h-1.5 bg-third/30 hover:bg-third/60"}`}
                    />
                  ))}
                </div>

              </div>

            </div>
          </div>

        </div>
      </section>
    </>
  );
}

export default Hero;