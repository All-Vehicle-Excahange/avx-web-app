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
    <section className="relative py-12 px-2 lg:px-4   ">
      <div className=" w-full flex flex-col gap-16">
        
        {/* Header Section: Vertical Stack */}
        <div className="flex flex-col gap-6 max-w-2xl">
          <p className="text-sm tracking-[0.4em] uppercase text-third font-semibold">
            Services
          </p>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.05] text-primary font-[Montserrat]">
            What     <span className="text-fourth/80">We Do</span>
          </h2>
          <div 
            className="text-third/70 text-lg md:text-xl font-[Poppins] leading-relaxed border-l-2 border-primary/30 pl-6"
            dangerouslySetInnerHTML={{ __html: data.servicesDesc }}
          />
        </div>

        {/* Services Layout: Asymmetrical Masonry Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {data.services.map((service, index) => {
            // Logic to make boxes asymmetrical: 1st and 4th are wider, 2nd and 3rd are narrower
            const colSpan = (index === 0 || index === 3) ? "md:col-span-7" : "md:col-span-5";
            
            return (
              <div 
                key={index} 
                className={`${colSpan} flex flex-col justify-between p-8 lg:p-12 border border-third/10 bg-primary/5 hover:bg-primary/10     transition-all duration-300 min-h-[300px]`}
              >
                <div className="flex flex-col gap-6">
                  <service.icon 
                    size={40} 
                    strokeWidth={1.2} 
                    className="text-third" 
                  />
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
    </section>
  );
}