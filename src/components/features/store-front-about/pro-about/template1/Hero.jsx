"use client";

import React, { useEffect, useRef } from "react";
import { ShieldCheck, Globe, TrendingUp, Cpu } from "lucide-react";

export default function AboutPage() {
  const aboutData = {
    heroTitle: "Our Story Built for Buy & Selling a Vehicle",
    heroDescription: `<p>Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec.
      Sapien platea nec urna ut est sed. Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec.
      Sapien platea nec urna ut est sed. Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec.
      Sapien platea nec urna ut est sed. Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec.
      Sapien platea nec urna ut est sed. </p>`,
    heroTemplate1: {
      imageUrl:
        "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200&q=90",
      id: 1,
    },
    // Mission
    missionTitle: "Our Mission",
    missionDesc: `<p>Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec.Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec.Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec.Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec.Lorem ipsum dolor sit amet consectetur.</p>`,
    missionTemplate1: {
      imageUrl:
        "https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?w=1200&q=80",
      id: 2,
    },
    // Vision
    visionTitle: "Our Vision",
    visionDesc: `<p>Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec.Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec.Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec.Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec.Lorem ipsum dolor sit amet consectetur.</p>`,
    visionTemplate1: {
      imageUrl:
        "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=1200&q=80",
      id: 3,
    },
    // Stats
    aboutUsDescription:
      "<p>Empowering millions through innovation and trust.</p>",
    stats: [
      { number: 150, label: "Active Users Worldwide" },
      { number: 2, label: "Transactions Processed" },
      { number: 98, label: "Customer Satisfaction" },
      { number: 100, label: "Team Members" },
    ],
    // Services
    servicesTitle: "What We Do",
    servicesDesc: `<p>Enterprise-grade digital products designed to scale globally.</p>`,
    services: [
      {
        icon: `<svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="currentColor"><path d="M480-80q-139-35-229.5-159.5T160-516v-244l320-120 320 120v244q0 152-90.5 276.5T480-80Zm0-84q104-33 172-132t68-220v-189l-240-90-240 90v189q0 121 68 220t172 132Zm0-316Z"/></svg>`,
        title: "Secure Payments",
        desc: "PCI-DSS compliant global payment systems.",
      },
      {
        icon: `<svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="currentColor"><path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm-40-360v-240h80v207l154 154-57 57-177-178Z"/></svg>`,
        title: "Global Infrastructure",
        desc: "99.99% uptime cloud deployment.",
      },
      {
        icon: `<svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="currentColor"><path d="M320-240 80-480l240-240 57 57-184 184 183 183-56 56Zm320 0-57-57 184-184-183-183 56-56 240 240-240 240Z"/></svg>`,
        title: "Growth Tools",
        desc: "Smart CRM, analytics and automation funnels.",
      },
      {
        icon: `<svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="currentColor"><path d="M300-360q-25 0-42.5-17.5T240-420v-40h60v40h60v-180h60v180q0 25-17.5 42.5T360-360h-60Zm220 0q-17 0-28.5-11.5T480-400v-40h60v20h80v-40H520q-17 0-28.5-11.5T480-500v-60q0-17 11.5-28.5T520-600h120q17 0 28.5 11.5T680-560v40h-60v-20h-80v40h100q17 0 28.5 11.5T680-460v60q0 17-11.5 28.5T640-360H520Z"/></svg>`,
        title: "AI Optimization",
        desc: "AI powered performance engines.",
      },
    ],
  };

  const activeRef = useRef(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    const imgs = document.querySelectorAll(".bg-slide");
    imgs[0]?.classList.add("active-slide");

    intervalRef.current = setInterval(() => {
      imgs[activeRef.current]?.classList.remove("active-slide");
      activeRef.current = (activeRef.current + 1) % imgs.length;
      imgs[activeRef.current]?.classList.add("active-slide");
    }, 4000);

    return () => clearInterval(intervalRef.current);
  }, []);



  return (
    <>
 

      {/* HERO */}
      <section className="relative w-full min-h-screen overflow-hidden flex  px-4 lg:px-8 py-12">
        {/* BACKGROUND IMAGE */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${aboutData.heroTemplate1?.imageUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        {/* LIGHT OVERLAY */}
        <div className="absolute inset-0 bg-black/40" />

        {/* CONTENT */}
        <div className="relative z-10 w-full flex items-center justify-center text-center flex-col gap-2 m-w-7xl">
          <p className="mb-6 text-sm tracking-[0.4em] uppercase text-third font-semibold">
            Hero
          </p>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.1] text-primary font-[Montserrat] max-w-[1200px]">
            {aboutData.heroTitle}
          </h2>

          <div
            className="mt-8 text-third/70 text-lg lg:text-xl font-[Poppins] leading-relaxed "
            dangerouslySetInnerHTML={{ __html: aboutData.heroDescription }}
          />
        </div>
      </section>

      {/* ═════════ MISSION / VISION (UNCHANGED) ═════════ */}
      <section className="relative py-12 px-2 lg:px-4">
        <div className="container">
          <div className="flex flex-col gap-6 max-w-2xl text-center mx-auto mb-16">
            <p className="text-sm tracking-[0.4em] uppercase text-third font-semibold">
              Purpose
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-primary font-[Montserrat]">
              Mission & <span className="text-fourth/80">Vision</span>
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* MISSION */}
            <div className="relative min-h-80 rounded-2xl overflow-hidden border border-third/10 shadow-2xl">
              <img
                src={aboutData.missionTemplate1?.imageUrl}
                className="absolute inset-0 w-full h-full object-cover"
              />

              <div className="relative bg-secondary/70 flex flex-col justify-end p-6 gap-4 h-full">
                <h2 className="text-3xl sm:text-4xl font-semibold text-primary font-[Montserrat]">
                  {aboutData.missionTitle}
                </h2>

                <div
                  className="text-third/70 text-base md:text-lg font-[Poppins]"
                  dangerouslySetInnerHTML={{
                    __html: aboutData.missionDesc,
                  }}
                />
              </div>
            </div>

            {/* VISION */}
            <div className="relative min-h-80 rounded-2xl overflow-hidden border border-third/10 shadow-2xl">
              <img
                src={aboutData.visionTemplate1?.imageUrl}
                className="absolute inset-0 w-full h-full object-cover"
              />

              <div className="relative bg-secondary/70 flex flex-col justify-end p-6 gap-4 h-full">
                <h2 className="text-3xl sm:text-4xl font-semibold text-primary font-[Montserrat]">
                  {aboutData.visionTitle}
                </h2>

                <div
                  className="text-third/70 text-base md:text-lg font-[Poppins]"
                  dangerouslySetInnerHTML={{
                    __html: aboutData.visionDesc,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═════════ STATS (WITH HOVER BACK) ═════════ */}
      <section className="relative py-12 px-2 lg:px-4 bg-primary text-secondary overflow-hidden">
        <div className="container">
          <div className="absolute inset-0 flex justify-center pointer-events-none">
            <div className="w-[600px] h-[600px] bg-fourth/10 blur-[140px] rounded-full"></div>
          </div>

          <div className="relative max-w-5xl mx-auto text-center">
            <div className="flex flex-col gap-6 mb-20">
              <p className="text-sm tracking-[0.4em] uppercase text-secondary/60 font-semibold">
                Impact
              </p>

              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-semibold font-[Montserrat]">
                Our <span className="text-fourth/80">Numbers</span>
              </h2>

              <div
                className="text-secondary/70 text-lg font-[Poppins]"
                dangerouslySetInnerHTML={{
                  __html: aboutData.aboutUsDescription,
                }}
              />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 border border-secondary/10">
              {(aboutData.stats || []).map((item, index) => (
                <div
                  key={index}
                  className="relative p-10 group border border-secondary/10 hover:bg-secondary/5 transition-all duration-500"
                >
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 border border-fourth/30"></div>

                  <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold font-[Montserrat] mb-4">
                    {item.number}
                  </h3>

                  <p className="text-secondary/60 text-sm md:text-base font-[Poppins]">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═════════ SERVICES (HOVER FIXED BACK) ═════════ */}
      <section className="relative py-12 px-2 lg:px-4">
        <div className="container">
          <div className="flex flex-col gap-16">
            <div className="flex flex-col gap-6 max-w-2xl">
              <p className="text-sm tracking-[0.4em] uppercase text-third font-semibold">
                Services
              </p>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-primary font-[Montserrat]">
                {aboutData.servicesTitle}
              </h2>

              <div
                className="text-third/70 text-lg font-[Poppins] border-l-2 border-primary/30 pl-6"
                dangerouslySetInnerHTML={{ __html: aboutData.servicesDesc }}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              {(aboutData.services || []).map((service, index) => {
                const colSpan =
                  index === 0 || index === 3
                    ? "md:col-span-7"
                    : "md:col-span-5";

                return (
                  <div
                    key={index}
                    className={`${colSpan} flex flex-col justify-between p-8 lg:p-12 border border-third/10 bg-primary/5 hover:bg-primary/10 transition-all duration-300 min-h-[300px]`}
                  >
                    <div className="flex flex-col gap-6">
                      {typeof service.icon === "string" &&
                      service.icon.startsWith("<svg") ? (
                        <div
                          className="text-third [&>svg]:w-10 [&>svg]:h-10 transition-colors duration-300"
                          dangerouslySetInnerHTML={{ __html: service.icon }}
                        />
                      ) : (
                        <div className="w-10 h-10 bg-third/20 rounded flex items-center justify-center text-xs text-third">
                          Icon
                        </div>
                      )}
                      <h3 className="text-2xl md:text-3xl font-semibold text-primary font-[Montserrat]">
                        {service.title}
                      </h3>
                    </div>

                    <p className="text-third/60 text-md md:text-lg font-[Poppins] max-w-xs">
                      {service.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
