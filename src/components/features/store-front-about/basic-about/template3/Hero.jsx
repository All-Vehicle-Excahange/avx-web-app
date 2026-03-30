"use client";

import React, { useState } from "react";
import { ShieldCheck, Globe, TrendingUp, Cpu } from "lucide-react";

function Hero() {
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
    missionTitle: "Our Mission",
    missionDesc: `Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec. Sapien platea nec urna ut est sed.Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec. Sapien platea nec urna ut est sed.`,
    visionTitle: "Our Vision",
    visionDesc: `Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec. Sapien platea nec urna ut est sed.Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec. Sapien platea nec urna ut est sed.`,
    statsDesc: `Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec. Sapien platea nec urna ut est sed. Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec. Sapien platea nec urna ut est sed. Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec. Sapien platea nec urna ut est sed.`,
    stats: [
      { number: "150K+", label: "Active Users Worldwide" },
      { number: "$2B+", label: "Transactions Processed" },
      { number: "98%", label: "Customer Satisfaction" },
      { number: "100+", label: "Team Members" },
    ],
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
    ],
  };

  const iconMap = { ShieldCheck, Globe, TrendingUp, Cpu };

  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <>
      <section className="relative flex flex-col justify-center min-h-screen items-center py-12">
        <div className="mx-auto w-full flex flex-col gap-14">
          <div className="flex flex-col items-center text-center gap-10 max-w-3xl mx-auto">
            {/* Tag */}
            <p className="text-sm tracking-[0.45em] uppercase text-third font-semibold">
              Hero
            </p>

            {/* Title */}
            <h2 className="flex flex-col gap-2 text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.05] text-primary font-[Montserrat]">
              <span>Our Story Built for</span>
              <span className="text-fourth/80">Buy & Selling a Vehicle</span>
            </h2>

            {/* Description */}
            <p className="text-third/55 text-base sm:text-lg font-[Poppins] leading-relaxed max-w-xl">
              {data.heroDesc}
            </p>
            <a
              href="#"
              class="font-[Montserrat] font-bold text-sm tracking-[0.15em] uppercase text-primary border-b border-third/40 pb-0.5 hover:border-primary transition-colors duration-200"
            >
              Explore Listings →
            </a>
          </div>
        </div>
      </section>

      <section className="relative flex flex-col items-center py-12">
        <div className="mx-auto w-full flex flex-col gap-16">
          {/* HEADER */}
          <div className="flex flex-col items-center text-center gap-6 max-w-2xl mx-auto">
            <p className="text-sm tracking-[0.4em] uppercase text-third font-semibold">
              Mission / Vision
            </p>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.05] text-primary font-[Montserrat]">
              Direction We
              <span className="text-fourth/80"> Move</span>
            </h2>
          </div>

          {/* TIMELINE */}
          <div className="relative max-w-4xl mx-auto flex flex-col gap-16">
            {/* vertical line */}
            <div className="hidden lg:block absolute left-1/2 top-0 w-px h-full bg-third/20 -translate-x-1/2" />

            {/* MISSION (LEFT) */}
            <div className="relative grid grid-cols-1 lg:grid-cols-2 items-center">
              {/* LEFT CONTENT */}
              <div className="lg:col-start-1 flex flex-col gap-4 pr-0 lg:pr-10 text-left lg:text-right">
                <p className="text-xs tracking-[0.4em] uppercase text-third font-semibold">
                  Mission
                </p>

                <h3 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-primary font-[Montserrat]">
                  {data.missionTitle.split("Mission")[0]}
                  <span className="text-fourth/80">Mission</span>
                </h3>

                <p className="text-third/70 text-sm sm:text-base font-[Poppins] leading-relaxed max-w-md">
                  {data.missionDesc}
                </p>
              </div>

              {/* DOT CENTER */}
              <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2">
                <div className="w-3 h-3 rounded-full bg-third" />
              </div>
            </div>

            {/* VISION (RIGHT) */}
            <div className="relative grid grid-cols-1 lg:grid-cols-2 items-center">
              {/* EMPTY LEFT SPACE (important for alignment) */}
              <div className="hidden lg:block" />

              {/* RIGHT CONTENT */}
              <div className="lg:col-start-2 flex flex-col gap-4 pl-0 lg:pl-10 text-left">
                <p className="text-xs tracking-[0.4em] uppercase text-third font-semibold">
                  Vision
                </p>

                <h3 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-primary font-[Montserrat]">
                  {data.visionTitle.split("Vision")[0]}
                  <span className="text-fourth/80">Vision</span>
                </h3>

                <p className="text-third/70 text-sm sm:text-base font-[Poppins] leading-relaxed max-w-md">
                  {data.visionDesc}
                </p>
              </div>

              {/* DOT CENTER */}
              <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2">
                <div className="w-3 h-3 rounded-full bg-third" />
              </div>
            </div>
          </div>
        </div>
      </section>

       <section className="relative flex flex-col justify-center items-center py-12">


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

       <section className="relative flex flex-col justify-center items-center py-12">

            <div className="mx-auto w-full max-w-6xl grid lg:grid-cols-2 gap-16">

                {/* ── LEFT: STRONG TEXT ── */}
                <div className="flex flex-col gap-6 max-w-xl">

                    <p className="text-sm tracking-[0.4em] uppercase text-third font-semibold">
                        Our Services
                    </p>

                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.05] text-primary font-[Montserrat]">
                        What We
                        <span className="text-fourth/80"> Do</span>
                    </h2>

                    <p className="text-third/70 text-md font-[Poppins] leading-relaxed">
                        {data.servicesDesc}
                    </p>

                </div>

                {/* ── RIGHT: STAGGERED SERVICES ── */}
                <div className="flex flex-col gap-12">

                    {data.services.map((service, i) => {
                        const Icon = iconMap[service.icon];
                        return (
                            <div
                                key={i}
                                className={`flex items-start gap-5 ${i % 2 !== 0 ? "lg:ml-10" : ""
                                    }`}
                            >

                                {/* Icon */}
                                <div className="w-12 h-12 flex items-center justify-center border border-third/10 rounded-xl">
                                    <Icon className="w-5 h-5 text-third" />
                                </div>

                                {/* Content */}
                                <div className="flex flex-col gap-2 max-w-sm">

                                    <h3 className="text-xl font-semibold text-primary font-[Montserrat]">
                                        {service.title}
                                    </h3>

                                    <p className="text-third/60 text-sm font-[Poppins] leading-relaxed">
                                        {service.desc}
                                    </p>

                                </div>

                            </div>
                        )
                    })}

                </div>

            </div>

        </section>
    </>
  );
}

export default Hero;
