"use client";

import React, { useEffect, useRef } from "react";
import { ShieldCheck, Globe, TrendingUp, Cpu } from "lucide-react";

export default function AboutPage() {

  const aboutData = {
    hero: {
      desc: `Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec.
 Sapien platea nec urna ut est sed. Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec.
 Sapien platea nec urna ut est sed. Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec.
 Sapien platea nec urna ut est sed. Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec.
 Sapien platea nec urna ut est sed. `,
      images: [
        "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200&q=90",
        
      ],
    },

    missionVision: {
      mission: {
        title: "Our Mission",
        desc: `<p>Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec.Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec.Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec.Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec.Lorem ipsum dolor sit amet consectetur.</p>`,
        image: "https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?w=1200&q=80",
      },
      vision: {
        title: "Our Vision",
        desc: `<p>Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec.Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec.Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec.Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet consectetur. Odio at dolor ut donec.Lorem ipsum dolor sit amet consectetur.</p>`,
        image: "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=1200&q=80",
      },
    },

    stats: {
      desc: `<p>Lorem ipsum dolor sit amet consectetur.</p>`,
      items: [
        { number: "150K+", label: "Active Users Worldwide" },
        { number: "$2B+", label: "Transactions Processed" },
        { number: "98%", label: "Customer Satisfaction" },
        { number: "100+", label: "Team Members" },
      ],
    },

    services: {
      desc: `<p>Enterprise-grade digital products designed to scale globally.</p>`,
      items: [
        { icon: ShieldCheck, title: "Secure Payments", desc: "PCI-DSS compliant global payment systems." },
        { icon: Globe, title: "Global Infrastructure", desc: "99.99% uptime cloud deployment." },
        { icon: TrendingUp, title: "Growth Tools", desc: "Smart CRM, analytics and automation funnels." },
        { icon: Cpu, title: "AI Optimization", desc: "AI powered performance engines." },
      ],
    },
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

  useEffect(() => {
    const els = document.querySelectorAll(".fade-up");
    els.forEach((el, i) => {
      setTimeout(() => el.classList.add("fade-up-in"), 300 + i * 150);
    });
  }, []);

  return (
    <>
      {/* HERO CSS (REQUIRED) */}
      <style>{`
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
          to { transform: scale(1); }
        }

        .diag-panel {
          clip-path: polygon(0 0, 100% 0, 100% 78%, 0 100%);
        }

        .fade-up {
          opacity: 0;
          transform: translateY(40px);
          transition: all 1s cubic-bezier(0.16,1,0.3,1);
        }
        .fade-up-in {
          opacity: 1;
          transform: translateY(0);
        }

        .thumb {
          transition: all 0.4s ease;
          cursor: pointer;
        }
        .thumb:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.7);
        }
      `}</style>

      {/* HERO */}
    <section className="relative w-full min-h-screen overflow-hidden flex  px-4 lg:px-8 py-12">

  {/* BACKGROUND IMAGE */}
  <div
    className="absolute inset-0"
    style={{
      backgroundImage: `url(${aboutData.hero.images[0]})`,
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
      Our Story{" "}
      <span className="text-fourth/80">Built for</span>{" "}
      Buy & Selling a Vehicle
    </h2>

    <p className="mt-8 text-third/70 text-lg lg:text-xl font-[Poppins] leading-relaxed ">
      {aboutData.hero.desc}
    </p>

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
              <img src={aboutData.missionVision.mission.image} className="absolute inset-0 w-full h-full object-cover" />

              <div className="relative bg-secondary/70 flex flex-col justify-end p-6 gap-4 h-full">
                <h2 className="text-3xl sm:text-4xl font-semibold text-primary font-[Montserrat]">
                  Our <span className="text-fourth/80">Mission</span>
                </h2>

                <div
                  className="text-third/70 text-base md:text-lg font-[Poppins]"
                  dangerouslySetInnerHTML={{
                    __html: aboutData.missionVision.mission.desc,
                  }}
                />
              </div>
            </div>

            {/* VISION */}
            <div className="relative min-h-80 rounded-2xl overflow-hidden border border-third/10 shadow-2xl">
              <img src={aboutData.missionVision.vision.image} className="absolute inset-0 w-full h-full object-cover" />

              <div className="relative bg-secondary/70 flex flex-col justify-end p-6 gap-4 h-full">
                <h2 className="text-3xl sm:text-4xl font-semibold text-primary font-[Montserrat]">
                  Our <span className="text-fourth/80">Vision</span>
                </h2>

                <div
                  className="text-third/70 text-base md:text-lg font-[Poppins]"
                  dangerouslySetInnerHTML={{
                    __html: aboutData.missionVision.vision.desc,
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
                dangerouslySetInnerHTML={{ __html: aboutData.stats.desc }}
              />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 border border-secondary/10">

              {aboutData.stats.items.map((item, index) => (
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
                What <span className="text-fourth/80">We Do</span>
              </h2>

              <div
                className="text-third/70 text-lg font-[Poppins] border-l-2 border-primary/30 pl-6"
                dangerouslySetInnerHTML={{ __html: aboutData.services.desc }}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

              {aboutData.services.items.map((service, index) => {
                const colSpan =
                  index === 0 || index === 3 ? "md:col-span-7" : "md:col-span-5";

                return (
                  <div
                    key={index}
                    className={`${colSpan} flex flex-col justify-between p-8 lg:p-12 border border-third/10 bg-primary/5 hover:bg-primary/10 transition-all duration-300 min-h-[300px]`}
                  >
                    <div className="flex flex-col gap-6">
                      <service.icon size={40} strokeWidth={1.2} className="text-third" />
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