"use client";

import React from "react";
import { ShieldCheck, Globe, TrendingUp, Cpu } from "lucide-react";

export default function Hero() {
  const data = {
    heroTitle: "Our Story Built for",
    heroDescription: ` Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec.
              Sapien platea nec urna ut est sed. Lorem ipsum dolor sit amet
              consectetur. Odio at dolor ut donec. Sapien platea nec urna ut est
              sed. Lorem ipsum dolor sit amet consectetur. Odio at dolor ut
              donec. Sapien platea nec urna ut est sed. Lorem ipsum dolor sit
              amet consectetur. Odio at dolor ut donec. Sapien platea nec urna
              ut est sed.`,

    missionTitle: "Our Mission",
    missionDesc: `
      <p>
      Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec. Sapien platea nec urna ut est sed.Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec. Sapien platea nec urna ut est sed.Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec. Sapien platea nec urna ut est sed.Lorem ipsum dolor sit amet consectetur. 
      </p>
    `,
    visionTitle: "Our Vision",
    visionDesc: `
      <p>
       Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec. Sapien platea nec urna ut est sed.Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec. Sapien platea nec urna ut est sed.Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec. Sapien platea nec urna ut est sed.Lorem ipsum dolor sit amet consectetur.
      </p>
    `,
    statsDesc: `
      <p>
        Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec. Sapien platea nec urna ut est sed.
        Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec. Sapien platea nec urna ut est sed.
        Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec.
      </p>
    `,
    stats: [
      { number: "150K+", label: "Active Users Worldwide" },
      { number: "$2B+", label: "Transactions Processed" },
      { number: "98%", label: "Customer Satisfaction" },
      { number: "100+", label: "Team Members" },
    ],
     servicesTitle: "What We Do",
        servicesDesc: `
          <p>
            Enterprise-grade digital products designed to scale globally with security,
            speed and reliability.
          </p>
        `,
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
  };

  return (
    <>
      <section className="relative flex items-center justify-center py-12 min-h-screen">
        <div className="w-full mx-auto flex flex-col items-center text-center gap-10">
          {/* Top Label */}
          <p className="text-sm tracking-[0.4em] uppercase text-third font-semibold">
            Our Story
          </p>

          {/* Main Heading */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.1] text-primary font-[Montserrat] max-w-3xl">
            {data.heroTitle}
            <span className="text-fourth/80"> Buy & Selling</span> a Vehicle
          </h1>

          {/* Description */}
          <div className="flex flex-col gap-5 max-w-xl">
            <p className="text-third/70 text-lg md:text-xl font-[Poppins] leading-relaxed">
              {data.heroDescription}
            </p>
          </div>
        </div>
      </section>

      <section className="relative py-12 px-2 lg:px-4 ">
        <div className=" w-full flex flex-col gap-16">
          {/* ── MAIN HEADING ───────────────── */}
          <div className="flex flex-col gap-6 max-w-2xl text-center">
            <p className=" text-sm tracking-[0.4em] uppercase text-third font-semibold">
              Purpose
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.05] text-primary font-[Montserrat]">
              Mission &<span className="text-fourth/80"> Vision</span>
            </h2>
          </div>

          {/* Mission Row */}
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-20 items-start  pt-12">
            <div className="w-full lg:w-1/3">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.05] text-primary font-[Montserrat]">
                {data.missionTitle.split(" ")[0]}{" "}
                <span className="text-fourth/80">
                  {data.missionTitle.split(" ")[1]}
                </span>
              </h2>
            </div>
            <div className="w-full lg:w-2/3">
              <div
                className="text-third/70 text-lg md:text-xl font-[Poppins] leading-relaxed"
                dangerouslySetInnerHTML={{ __html: data.missionDesc }}
              />
            </div>
          </div>

          {/* Vision Row */}
          <div className="flex flex-col lg:flex-row-reverse gap-10 lg:gap-20 items-start pt-12">
            <div className="w-full lg:w-1/3">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.05] text-primary font-[Montserrat]">
                {data.visionTitle.split(" ")[0]}{" "}
                <span className="text-fourth/80">
                  {data.visionTitle.split(" ")[1]}
                </span>
              </h2>
            </div>
            <div className="w-full lg:w-2/3">
              <div
                className="text-third/70 text-lg md:text-xl font-[Poppins] leading-relaxed"
                dangerouslySetInnerHTML={{ __html: data.visionDesc }}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-12 px-2 lg:px-4   bg-primary text-secondary">
        <div className=" container  w-full flex flex-col items-center gap-16 text-center">
          {/* ── HEADING ───────────────── */}
          <div className="flex flex-col gap-6 max-w-2xl">
            <p className="text-sm tracking-[0.4em] uppercase text-secondary/60 font-semibold">
              Impact
            </p>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.05] font-[Montserrat]">
              Our
              <span className="text-fourth/80"> Numbers</span>
            </h2>

            <div
              className="text-secondary/70 text-lg md:text-xl font-[Poppins] leading-relaxed"
              dangerouslySetInnerHTML={{ __html: data.statsDesc }}
            />
          </div>

          {/* ── STATS BOX LAYOUT ───────────────── */}
          <div className="w-full max-w-5xl grid sm:grid-cols-2 gap-8">
            {data.stats.map((item, index) => (
              <div
                key={index}
                className="flex flex-col gap-4 border border-secondary/10 p-8 rounded-2xl"
              >
                <h3 className="text-4xl lg:text-5xl font-semibold font-[Montserrat]">
                  {item.number}
                </h3>

                <p className="text-secondary/70 text-base font-[Poppins]">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

       <section className="relative py-12 px-2 lg:px-4">

      <div className="w-full max-w-5xl mx-auto flex flex-col gap-20">

        {/* ── HEADER ── */}
        <div className="flex flex-col gap-6 max-w-2xl">
          <p className="text-sm tracking-[0.4em] uppercase text-third font-semibold">
            Services
          </p>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.05] text-primary font-[Montserrat]">
            What <span className="text-fourth/80">We Do</span>
          </h2>

          <div
            className="text-third/70 text-lg md:text-xl font-[Poppins] leading-relaxed"
            dangerouslySetInnerHTML={{ __html: data.servicesDesc }}
          />
        </div>

        {/* ── TIMELINE ── */}
        <div className="relative flex flex-col gap-16">

          {/* vertical line */}
          <div className="absolute left-1/2 top-0 h-full w-px bg-third/10 -translate-x-1/2 hidden md:block" />

          {data.services.map((service, index) => {
            const isLeft = index % 2 === 0;

            return (
              <div
                key={index}
                className={`w-full flex ${
                  isLeft ? "md:justify-start" : "md:justify-end"
                }`}
              >

                <div className="w-full md:w-[45%] flex flex-col gap-4">

                  {/* ICON */}
                  <div className="text-third">
                    <service.icon size={30} strokeWidth={1.4} />
                  </div>

                  {/* TITLE */}
                  <h3 className="text-2xl font-semibold text-primary font-[Montserrat]">
                    {service.title}
                  </h3>

                  {/* DESC */}
                  <p className="text-third/60 text-base font-[Poppins]">
                    {service.desc}
                  </p>

                </div>

              </div>
            );
          })}

        </div>

      </div>

    </section>
    </>
  );
}
