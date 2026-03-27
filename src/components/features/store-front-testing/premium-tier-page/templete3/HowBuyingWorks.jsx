"use client";

import React from "react";
import { Search, MessageCircle, ShieldCheck, Handshake } from "lucide-react";

function HowBuyingWorks() {
  const data = {
    processTitle: "How Buying Works",
    processDescription: `
        Buying a vehicle through our storefront is designed to be simple,
        transparent, and convenient for buyers.
      `,
    processSteps: [
      {
        title: "Discover Vehicles",
        description: "Browse our inventory and shortlist vehicles that match your requirements.",
        icon: <Search className="w-5 h-5" />,
        image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=1200",
      },
      {
        title: "Connect With Our Team",
        description: "Use AVX chat to discuss vehicle condition, pricing, and availability.",
        icon: <MessageCircle className="w-5 h-5" />,
        image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=1200",
      },
      {
        title: "AVX Inspection Option",
        description: "Buyers can request AVX inspection to receive an independent condition report.",
        icon: <ShieldCheck className="w-5 h-5" />,
        image: "https://images.unsplash.com/photo-1517672651691-24622a91b550?auto=format&fit=crop&q=80&w=1200",
      },
      {
        title: "Decision & Purchase",
        description: "Once satisfied with the vehicle details and inspection, finalize the purchase directly with the consultant.",
        icon: <Handshake className="w-5 h-5" />,
        image: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&q=80&w=1200",
      },
    ],
  };

  return (
    <section className="bg-[#0A0A0A] py-24 flex flex-col items-center">
      <div className="max-w-7xl mx-auto w-full px-4 lg:px-0 flex flex-col gap-20">
        
        {/* SECTION HEADER */}
        <div className="flex flex-col gap-6 max-w-2xl border-l-2 border-fourth/40 pl-8">
          <p className="text-sm tracking-[0.6em] uppercase text-fourth font-bold">
            The Methodology
          </p>
          <h2 className="text-4xl lg:text-6xl font-semibold leading-[1.1] text-white font-[Montserrat]">
            {data.processTitle.split(" ").slice(0, 2).join(" ")}
            <span className="block text-white/30 italic font-light mt-2">
              {data.processTitle.split(" ").slice(2).join(" ")}
            </span>
          </h2>
          <p className="text-white/40 text-lg font-[Poppins] leading-relaxed">
            {data.processDescription}
          </p>
        </div>

        {/* STEP-BY-STEP CINEMATIC FLOW */}
        <div className="flex flex-col gap-32">
          {data.processSteps.map((step, index) => (
            <div 
              key={index} 
              className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-24 ${
                index % 2 !== 0 ? "lg:flex-row-reverse" : ""
              }`}
            >
              {/* IMAGE FRAME (Layered & Premium) */}
              <div className="w-full lg:w-1/2 group relative">
                <div className="relative aspect-[16/9] overflow-hidden rounded-sm shadow-2xl">
                  <img
                    src={step.image}
                    alt={step.title}
                    className="w-full h-full object-cover grayscale-[40%] group-hover:grayscale-0 transition-all duration-[1.5s] scale-110 group-hover:scale-100"
                  />
                  {/* Internal Outline for Detail */}
                  <div className="absolute inset-6 border border-white/10 pointer-events-none group-hover:inset-4 transition-all duration-700"></div>
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-all duration-700"></div>
                </div>
                
                {/* Floating Step Number */}
                <div className={`absolute -bottom-6 ${index % 2 !== 0 ? "-left-6" : "-right-6"} bg-fourth text-[#0A0A0A] px-6 py-4 font-[Montserrat] font-bold text-xl shadow-2xl`}>
                  0{index + 1}
                </div>
              </div>

              {/* CONTENT AREA */}
              <div className="w-full lg:w-1/2 flex flex-col gap-6">
                <div className="flex items-center gap-4 text-fourth">
                   <div className="p-3 bg-white/5 rounded-full ring-1 ring-white/10">
                     {step.icon}
                   </div>
                   <div className="h-[1px] w-12 bg-fourth/30" />
                </div>
                
                <h3 className="text-2xl lg:text-3xl font-semibold text-white font-[Montserrat] tracking-tight">
                  {step.title}
                </h3>
                
                <p className="text-white/50 text-lg font-[Poppins] leading-relaxed max-w-md">
                  {step.description}
                </p>

                {/* Decorative Bullet for Premium Visuals */}
                <div className="flex items-center gap-2 mt-4">
                    <div className="w-2 h-2 rounded-full bg-fourth"></div>
                    <span className="text-[10px] tracking-[0.4em] uppercase text-white/20 font-bold">
                        Phase Verified
                    </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default HowBuyingWorks;