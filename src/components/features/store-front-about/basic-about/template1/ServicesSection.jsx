
"use client";

import React from "react";
import { ShieldCheck, Globe, TrendingUp, Cpu } from "lucide-react";

export default function ServicesSection() {
  const data = {
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
    <section className="relative py-24 px-2 lg:px-4">

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
  );
}

