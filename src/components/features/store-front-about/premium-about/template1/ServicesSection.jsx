"use client";

import React, { useState } from "react";
import { ShieldCheck, Globe, TrendingUp, Cpu, ArrowRight } from "lucide-react";

export default function ServicesSection() {
  const [active, setActive] = useState(0);

  const data = {
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

  return (
    <section className="relative py-12  text-primary overflow-hidden font-[Poppins]">
      
      {/* ── BACKGROUND DEPTH ── */}

      <div className="container mx-auto px-6 relative z-10">
        
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

        {/* ── INTERACTIVE STAGE ── */}
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          
          {/* LEFT: THE INTERACTIVE CIRCLE NAVIGATION */}
          <div className="relative flex justify-center items-center h-[400px] lg:h-[600px]">
            {/* Outer Ring */}
            
            
            {/* Orbiting Icons */}
            {data.services.map((service, i) => {
              const isActive = active === i;
              const angle = (i * 360) / data.services.length;
              return (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`absolute w-16 h-16 lg:w-24 lg:h-24 rounded-full flex items-center justify-center transition-all duration-700 z-20 
                    ${isActive ? 'bg-primary shadow-[0_0_50px_rgba(0,123,255,0.4)] scale-125' : 'bg-[#111] border border-primary/10 hover:border-primary/30'}`}
                  style={{
                    transform: `rotate(${angle}deg) translate(${isActive ? 0 : 150}px) rotate(-${angle}deg)`,
                    transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)'
                  }}
                >
                  <service.icon size={isActive ? 32 : 24} className={isActive ? 'text-secondary' : 'text-third-500'} />
                  
                  {/* Label for satellite */}
                  {!isActive && (
                    <span className="absolute top-full mt-4 text-[9px] font-bold uppercase tracking-widest text-third-600 primaryspace-nowrap">
                      {service.title.split(" ")[0]}
                    </span>
                  )}
                </button>
              );
            })}

            {/* Central Active Detail */}
            <div className="relative w-48 h-48 lg:w-72 lg:h-72 rounded-full overflow-hidden border border-primary/10 flex items-center justify-center ">
                <div className="text-center p-6 animate-fadeIn">
                   <p className="text-[10px] font-black text-third tracking-[0.4em] mb-2 uppercase">Active Module</p>
                   <h4 className="text-xl lg:text-2xl font-bold font-[Montserrat] uppercase">{data.services[active].title.split(" ")[0]}</h4>
                </div>
                {/* Spinning inner border */}

            </div>
          </div>

          {/* RIGHT: THE CONTENT PANEL */}
          <div className="relative">
            <div className="space-y-8 lg:pl-12">
               <div className="flex flex-col gap-2">
               
                 <h3 className="text-2xl lg:text-4xl font-bold font-[Montserrat] text-primary relative z-10 transition-all duration-500">
                   {data.services[active].title}
                 </h3>
               </div>

               <p className="text-third-400 text-xl lg:text-xl font-light leading-relaxed border-l-2 border-primary pl-8 py-4 transition-all duration-500">
                 {data.services[active].desc}
               </p>

             
            </div>
          </div>

        </div>

      

      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.6s ease forwards;
        }
      `}</style>
    </section>
  );
}