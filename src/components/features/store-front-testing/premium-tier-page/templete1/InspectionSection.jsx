"use client";

import React from "react";
import { CheckCircle2, ShieldCheck, Search, FileText, Layers } from "lucide-react";

const inspectionData = {
  inspectionTitle: "AVX Inspection Assurance",
  inspectionText: `
    AVX inspection services provide additional transparency by documenting
    key aspects of the vehicle's condition before purchase.
  `,
  inspectionPoints: [
    "Exterior condition check",
    "Interior condition check",
    "Visible mechanical components",
    "Photo & video documentation",
  ],
  inspectionImages: [
    "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=1200&auto=format&fit=crop",
  ],
};

function InspectionSection() {
  return (
    <section className="w-full py-12  overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* ── TOP HEADER (Center-Aligned for Premium Focus) ───────────────── */}
        <div className="flex flex-col items-center text-center mb-20 gap-4">
          <p className="text-sm tracking-[0.5em] uppercase text-third font-semibold">
            Independent Verification
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight text-primary font-[Montserrat] max-w-3xl">
            AVX Inspection{" "}
            <span className="text-fourth/80">Assurance</span>
          </h2>
          <div className="h-1 w-20 bg-primary mt-2 rounded-full" />
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          
          {/* ── LEFT: DYNAMIC IMAGE ARCHITECTURE ───────────────── */}
          <div className="lg:col-span-7 relative h-[500px] lg:h-[650px]">
            
            {/* 1. The "Base" Image (Large, Back Layer) */}
            <div className="absolute top-0 left-0 w-[75%] h-[70%] rounded-4xl overflow-hidden shadow-2xl z-10 group">
              <img
                src={inspectionData.inspectionImages[0]}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                alt="Main"
              />
              <div className="absolute inset-0  group-hover:bg-transparent transition-colors" />
            </div>

            {/* 2. The "Focus" Image (Vertical, Middle Layer) */}
            <div className="absolute top-[20%] right-0 w-[45%] h-[60%] rounded-4xl overflow-hidden border-12 border-white shadow-[-20px_20px_60px_rgba(0,0,0,0.15)] z-20 group">
              <img
                src={inspectionData.inspectionImages[1]}
                className="w-full h-full object-cover"
                alt="Detail"
              />
             
            </div>

            {/* 3. The "Abstract" Image (Small, Front Layer) */}
            <div className="absolute bottom-0 left-[15%] w-[35%] h-[25%] rounded-2xl overflow-hidden border-4 border-white shadow-xl z-30 transition-transform hover:-translate-y-2.5">
              <img
                src={inspectionData.inspectionImages[2]}
                className="w-full h-full object-cover"
                alt="Mini Detail"
              />
            </div>

          
          </div>

          {/* ── RIGHT: INFO & INTERACTIVE LIST ───────────────── */}
          <div className="lg:col-span-5 flex flex-col gap-10 lg:pt-12">
            
            <p className="text-third text-[18px] font-[Poppins] leading-relaxed italic border-l-4 border-primary/30 pl-6">
              {inspectionData.inspectionText.trim()}
            </p>

            {/* ICON-BASED POINTS */}
            <div className="flex flex-col gap-6">
              {inspectionData.inspectionPoints.map((pt, i) => (
                <div key={i} className="flex items-center gap-5 group cursor-default">
                  <div className="shrink-0 w-12 h-12 rounded-2xl  border border-fourth/10 flex items-center justify-center  group-hover:rotate-10 transition-all duration-300">
                    <CheckCircle2
                      className="text-primary group-hover:text-white transition-colors"
                      size={22}
                    />
                  </div>
                  <div className="flex flex-col">
                    
                    <p className="text-third font-[Poppins] font-medium text-[16px] group-hover:text-primary transition-colors">
                      {pt}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* PREMIUM DATA BADGE */}
          

          </div>

        </div>
      </div>
    </section>
  );
}

export default InspectionSection;