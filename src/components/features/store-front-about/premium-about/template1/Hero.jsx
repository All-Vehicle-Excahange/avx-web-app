"use client";
import React, { useState } from "react";
export default function AboutPage() {
  const data = {
    /* ───────── HERO ───────── */
    heroTitle: "Our Story Built for Buy & Selling a Vehicle",
    heroDescription: `<p>Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec.
     Sapien platea nec urna ut est sed. Lorem ipsum dolor sit amet consectetur.</p>`,
    heroTemplate1: {
      imageUrl: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200&q=90",
      id: 1,
    },
    heroTemplate2: {
      imageUrl: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=1200&q=90",
      id: 2,
    },
    /* ───────── STATS ───────── */
    aboutUsDescription: "<p>Empowering millions through innovation and trust.</p>",
    stats: [
      { number: 150, label: "Active Users Worldwide" },
      { number: 2, label: "Transactions Processed" },
      { number: 98, label: "Customer Satisfaction" },
      { number: 100, label: "Team Members" },
    ],
    /* ───────── MISSION ───────── */
    missionTitle: "Our Mission",
    missionDesc: `<p>To engineer the most transparent, elegant, and efficient automotive marketplace in existence. We bridge the gap between luxury and logic.</p>`,
    missionTemplate1: {
      imageUrl: "https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?w=1200&q=80",
      id: 3,
    },
    /* ───────── VISION ───────── */
    visionTitle: "Our Vision",
    visionDesc: `<p>Defining the future of mobility. We envision a world where every vehicle transaction is a seamless, digital-first masterpiece.</p>`,
    visionTemplate1: {
      imageUrl: "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=1200&q=80",
      id: 4,
    },
    /* ───────── SERVICES ───────── */
    servicesTitle: "What We Do",
    servicesDesc: `<p>Enterprise-grade digital products designed to scale globally with security, speed and reliability.</p>`,
    services: [
      {
        icon: `<svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="currentColor"><path d="M480-80q-139-35-229.5-159.5T160-516v-244l320-120 320 120v244q0 152-90.5 276.5T480-80Zm0-84q104-33 172-132t68-220v-189l-240-90-240 90v189q0 121 68 220t172 132Zm0-316Z"/></svg>`,
        title: "Secure Payments",
        desc: "PCI-DSS compliant global payment systems engineered for high-volume automotive transactions.",
      },
      {
        icon: `<svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="currentColor"><path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm-40-360v-240h80v207l154 154-57 57-177-178Z"/></svg>`,
        title: "Global Infrastructure",
        desc: "99.99% uptime cloud deployment across 12 global regions for seamless user experience.",
      },
      {
        icon: `<svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="currentColor"><path d="M320-240 80-480l240-240 57 57-184 184 183 183-56 56Zm320 0-57-57 184-184-183-183 56-56 240 240-240 240Z"/></svg>`,
        title: "Growth Tools",
        desc: "Smart CRM, predictive analytics, and automated sales funnels to maximize conversion.",
      },
      {
        icon: `<svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="currentColor"><path d="M300-360q-25 0-42.5-17.5T240-420v-40h60v40h60v-180h60v180q0 25-17.5 42.5T360-360h-60Zm220 0q-17 0-28.5-11.5T480-400v-40h60v20h80v-40H520q-17 0-28.5-11.5T480-500v-60q0-17 11.5-28.5T520-600h120q17 0 28.5 11.5T680-560v40h-60v-20h-80v40h100q17 0 28.5 11.5T680-460v60q0 17-11.5 28.5T640-360H520Z"/></svg>`,
        title: "AI Optimization",
        desc: "AI-powered performance engines that learn from every interaction to optimize your fleet.",
      },
    ],
  };
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState(null);
  const current = hovered !== null ? hovered : active;
  return (
    <>
      {/* ═════════ HERO ═════════ */}
      <section className="w-full min-h-screen flex items-center justify-center py-12 pt-20">
        <div className="w-full max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
          {/* LEFT CONTENT */}
          <div className="relative z-10">
            <p className="mb-4 text-xs tracking-[0.5em] uppercase text-third font-semibold">
              Hero
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.1] text-primary font-[Montserrat]">
              {data.heroTitle}
            </h1>
            <div
              className="mt-6 text-third/70 text-lg font-[Poppins] leading-relaxed max-w-xl"
              dangerouslySetInnerHTML={{ __html: data.heroDescription }}
            />
          </div>
          {/* RIGHT IMAGE */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden border border-primary/20">
              <img
                src={data.heroTemplate1.imageUrl}
                alt="Hero"
                className="w-full h-[300px] sm:h-[400px] lg:h-[400px] object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent" />
            </div>
          </div>
        </div>
      </section>
      {/* ═════════ MISSION & VISION ═════════ */}
      <section className="relative py-12 px-2 lg:px-4 overflow-hidden">
        <div className="container">
          <div className="max-w-[1600px] mx-auto relative z-10">
            {/* ── HEADING ── */}
            <div className="flex flex-col gap-6 max-w-2xl text-center mx-auto mb-16">
              <p className="text-sm tracking-[0.4em] uppercase text-third font-semibold">
                Purpose
              </p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.05] text-primary font-[Montserrat]">
                {data.missionTitle} &{" "}
                {data.visionTitle}
              </h2>
            </div>
            {/* ── MAIN LAYOUT ── */}
            <div className="flex flex-col lg:flex-row gap-20 lg:gap-0 items-stretch">
              {/* LEFT: MISSION */}
              <div className="lg:w-1/2 relative group">
                <div className="relative h-[800px] lg:h-[600px] w-full lg:w-[95%] overflow-hidden rounded-tr-[100px] lg:rounded-tr-[200px] border-r border-t border-primary/10">
                  <img
                    src={data.missionTemplate1.imageUrl}
                    className="w-full h-full object-cover grayscale transition-all duration-800 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:grayscale-0 group-hover:-translate-y-5 group-hover:brightness-110 group-hover:saturate-125"
                    alt="Mission"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-secondary via-transparent to-transparent" />
                </div>
                {/* CONTENT */}
                <div className="absolute bottom-12 left-0 w-[520px] p-5 border border-primary/10 backdrop-blur-2xl bg-primary/5 transition-all duration-500 group-hover:border-primary/40">
                  <h3 className="text-4xl font-bold font-[Montserrat] mb-6 text-primary uppercase">
                    {data.missionTitle}
                  </h3>
                  <div
                    className="text-third text-lg font-light leading-relaxed italic"
                    dangerouslySetInnerHTML={{ __html: data.missionDesc }}
                  />
                </div>
              </div>
              {/* RIGHT: VISION */}
              <div className="lg:w-1/2 lg:mt-64 relative group">
                <div className="relative h-[400px] lg:h-[550px] w-full overflow-hidden rounded-bl-[100px] lg:rounded-bl-[200px] border-b border-l border-primary/10">
                  <img
                    src={data.visionTemplate1.imageUrl}
                    className="w-full h-full object-cover transition-all duration-800 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-105"
                    alt="Vision"
                  />
                  <div className="absolute inset-0 bg-linear-to-b from-secondary via-transparent to-transparent" />
                </div>
                {/* CONTENT */}
                <div className="mt-12 lg:mt-0 lg:absolute -top-24 right-0 lg:right-12 max-w-md p-10 border border-primary/10 backdrop-blur-2xl bg-primary/5 transition-all duration-500 group-hover:border-primary/40">
                  <h3 className="text-4xl font-bold font-[Montserrat] mb-6 text-primary uppercase">
                    {data.visionTitle}
                  </h3>
                  <div
                    className="text-third text-lg font-light leading-relaxed italic"
                    dangerouslySetInnerHTML={{ __html: data.visionDesc }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ═════════ STATS ═════════ */}
      <section className="relative py-12 bg-primary text-secondary overflow-hidden">
        <div className="container">
          <div className="px-4 lg:px-8 grid lg:grid-cols-2 gap-16 items-center">
            <div className="flex flex-col gap-6">
              <p className="text-sm tracking-[0.4em] uppercase text-secondary/60 font-semibold">
                Impact
              </p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold font-[Montserrat]">
                Our <span className="text-secondary">Numbers</span>
              </h2>
              <div
                className="text-secondary/70 text-lg font-[Poppins]"
                dangerouslySetInnerHTML={{ __html: data.aboutUsDescription }}
              />
            </div>
            <div className="relative flex justify-center">
              <div className="relative w-[320px] h-80 sm:w-[400px] sm:h-[400px]">
                {data.stats.map((item, index) => {
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
      {/* ═════════ SERVICES ═════════ */}
      <section className="relative py-20 px-4 text-primary font-[Poppins]">
        <div className="container mx-auto max-w-7xl">
          {/* HEADER */}
          <div className="max-w-2xl mb-16">
            <p className="text-sm tracking-[0.4em] uppercase text-third font-semibold mb-4">
              Services
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.05] text-primary font-[Montserrat]">
              {data.servicesTitle}
            </h2>
            <div
              className="mt-6 text-third/70 text-lg leading-relaxed border-l-2 border-primary/30 pl-6"
              dangerouslySetInnerHTML={{ __html: data.servicesDesc }}
            />
          </div>
          {/* MAIN GRID */}
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            {/* LEFT: CARDS */}
            <div className="grid sm:grid-cols-2 gap-6">
              {data.services.map((service, i) => {
                const isActive = current === i;
                return (
                  <div
                    key={i}
                    onClick={() => setActive(i)}
                    onMouseEnter={() => setHovered(i)}
                    onMouseLeave={() => setHovered(null)}
                    className={`cursor-pointer rounded-2xl p-6 border transition-all duration-300 
                    ${isActive
                        ? "border-primary/40 bg-primary/5"
                        : "border-primary/20 hover:border-primary/40 hover:bg-primary/5"}`}
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div className={`w-12 h-12 flex items-center justify-center rounded-xl 
                        ${isActive ? "bg-primary text-secondary" : "bg-primary/5 text-third"}`}
                        dangerouslySetInnerHTML={{ __html: service.icon }}
                      />
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
                  {data.services[current].title}
                </h3>
                <p className="text-third/70 text-lg leading-relaxed border-l-2 border-primary pl-6">
                  {data.services[current].desc}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}