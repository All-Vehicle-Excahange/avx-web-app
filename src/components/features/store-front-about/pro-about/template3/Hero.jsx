"use client"
import React, { useEffect, useRef, useState } from "react"
import { ShieldCheck, Globe, TrendingUp, Cpu } from "lucide-react"
const iconMap = { ShieldCheck, Globe, TrendingUp, Cpu }
const data = {
  // ====== Hero Section Data ========
  aboutHeroTitle: "Our Story Built for Buy & Selling a Vehicle",
  aboutHeroDescription: ` Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec.
        Sapien platea nec urna ut est sed. Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec.
        Sapien platea nec urna ut est sed. `,
  aboutHeroTemplate1: { id: 1, imageUrl: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1600&q=80" },
  // ====== Mission & Vision Section Data ========
  aboutMissionTitle: "Our Mission",
  aboutMissionDescription: `Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec. Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec. Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec.Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec. Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec. Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec.`,
  aboutMissionTemplate1: { id: 1, imageUrl: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80" },
  aboutVisionTitle: "Our Vision",
  aboutVisionDescription: `Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec. Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec. Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec.Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec. Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec. Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec.`,
  aboutVisionTemplate1: { id: 1, imageUrl: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&q=80" },
  // ====== Stats Section Data ========
  aboutStatsDescription: `Lorem ipsum dolor sit amet consectetur.`,
  stats: [
    { number: "150K+", label: "Active Users Worldwide" },
    { number: "$2B+", label: "Transactions Processed" },
    { number: "98%", label: "Customer Satisfaction" },
    { number: "100+", label: "Team Members" },
  ],
  // ====== Services Section Data ========
  aboutServicesTitle: "What We Do",
  aboutServicesDescription: `Enterprise-grade digital products designed to scale globally with security, speed and reliability.`,
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
function Hero() {
  const [current, setCurrent] = useState(0)
  const timerRef = useRef(null)
  return (
    <>
      {/* HERO */}
      <section className="relative min-h-screen py-12 flex flex-col overflow-hidden ">
        <img src={data.aboutHeroTemplate1.imageUrl} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-secondary/65" />
        <div className="absolute inset-0 bg-linear-to-b from-secondary/20 via-secondary/40 to-secondary" />
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center gap-8 text-center px-2 lg:px-4 pt-16 pb-6">
          <p className="text-sm tracking-[0.45em] uppercase text-third font-semibold fade-up-1">
            Hero
          </p>
          <h2 className="flex flex-col gap-2 text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.05] text-primary font-[Montserrat] fade-up-2">
            <span>{data.aboutHeroTitle}</span>
          </h2>
          <div
            className="text-third/55 text-base sm:text-lg font-[Poppins] leading-relaxed max-w-6xl fade-up-3"
            dangerouslySetInnerHTML={{ __html: data.aboutHeroDescription }}
          />
        </div>
      </section>
      {/* MISSION / VISION */}
      <section className="relative py-8 overflow-hidden px-2 lg:px-4 ">
        <div className="container">
          <div className="flex flex-col items-center gap-3 mb-12 fade-up-1 ">
            <div className="flex flex-col items-center text-center gap-6 max-w-2xl mx-auto">
              <p className="text-sm tracking-[0.4em] uppercase text-third font-semibold">
                Mission / Vision
              </p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.05] text-primary font-[Montserrat]">
                {data.aboutMissionTitle} <span className="text-fourth/80">& {data.aboutVisionTitle}</span>
              </h2>
            </div>
          </div>
          <div className="flex flex-col gap-6 max-w-7xl mx-auto">
            <div className="mv-card relative rounded-2xl overflow-hidden shadow-2xl border border-third/10 py-14">
              <img src={data.aboutMissionTemplate1.imageUrl} className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-linear-to-r from-secondary/95 via-secondary/85 to-secondary/70" />
              <div className="relative z-10 px-8 sm:px-12 lg:px-16 max-w-2xl flex flex-col gap-4">
                <p className="text-sm tracking-[0.4em] uppercase text-third font-semibold">01</p>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-primary font-[Montserrat]">
                  {data.aboutMissionTitle}
                </h2>
                <div
                  className="text-third/70"
                  dangerouslySetInnerHTML={{ __html: data.aboutMissionDescription }}
                />
              </div>
            </div>
            <div className="mv-card relative rounded-2xl overflow-hidden shadow-2xl border border-third/10 py-14">
              <img src={data.aboutVisionTemplate1.imageUrl} className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-linear-to-l from-secondary/95 via-secondary/85 to-secondary/70" />
              <div className="relative z-10 px-8 sm:px-12 lg:px-16 text-right ml-auto max-w-2xl flex flex-col gap-4 w-full">
                <p className="text-sm tracking-[0.4em] uppercase text-third font-semibold">02</p>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-primary font-[Montserrat]">
                  {data.aboutVisionTitle}
                </h2>
                <div
                  className="text-third/70"
                  dangerouslySetInnerHTML={{ __html: data.aboutVisionDescription }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* STATS */}
      <section className="relative overflow-hidden px-2 lg:px-4 ">
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
              <div
                className="text-third/70"
                dangerouslySetInnerHTML={{ __html: data.aboutStatsDescription }}
              />
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
      <section className="relative px-2 lg:px-4 ">
        <div className="container">
          <div className="mx-auto w-full">
            <div className="mb-8 max-w-3xl">
              <p className="text-sm tracking-[0.4em] uppercase text-third font-semibold mb-8">
                Our Services
              </p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-primary font-[Montserrat]">
                {data.aboutServicesTitle}
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {data.services.map((item, i) => {
                const Icon = iconMap[item.icon]
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
                    <div
                      className="text-third/60 text-sm"
                      dangerouslySetInnerHTML={{ __html: item.desc }}
                    />
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