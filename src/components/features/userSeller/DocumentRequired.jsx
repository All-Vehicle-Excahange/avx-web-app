"use client";

import { useEffect, useRef, useState } from "react";
import { User, CreditCard, Car, ShieldCheck } from "lucide-react";

const docs = [
  {
    name: "Aadhaar Card",
    icon: User,
    required: true,
    bg: "https://uidai.gov.in/images/advertisement/Aadhaar_Verify_creative_English.jpg", // id/doc style
  },
  {
    name: "PAN Card",
    icon: CreditCard,
    required: true,
    bg: "https://media.assettype.com/outlookmoney/2024-12-07/3cguwiua/111121552.jpg.webp?w=801&auto=format%2Ccompress&fit=max&format=webp&dpr=1.0", // card/payment doc vibe
  },
  {
    name: "Vehicle RC",
    icon: Car,
    required: true,
    bg: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5jmtGW1d0xI-jM5Rfy4yliHAXogWhhwc14A&sttps://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200", // car doc vibe
  },
  {
    name: "Insurance",
    icon: ShieldCheck,
    required: false,
    bg: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=1200", // paperwork/protection
  },
];

export default function DocumentsRequired() {
  const [inView, setInView] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setInView(true),
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden py-16">
      
      {/* CONTENT */}
      <div className="relative z-10 max-w-[1200px] mx-auto px-4">
        
        {/* Heading */}
        <div
          className={`mb-16 transition-all duration-1000 ${
            inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
          }`}
        >
          <span className="text-sm tracking-[0.4em] uppercase text-third font-semibold">
            Verification Protocol
          </span>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.05] text-primary font-montserrat mt-4">
            Documents <span className="text-fourth/80">Required</span>
          </h2>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {docs.map((doc, i) => {
            const Icon = doc.icon;

            return (
              <div
                key={i}
                className="group relative h-[220px] p-6 rounded-2xl overflow-hidden border border-white/10 hover:border-white/30 transition duration-300"
              >
                {/* 🖼 FULL IMAGE */}
                <img
                  src={doc.bg}
                  alt={doc.name}
                  className="absolute inset-0 w-full h-full object-cover"
                />

                {/* 🌑 DARK OVERLAY */}
                <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition duration-300" />

                {/* ✨ CONTENT */}
                <div className="relative z-10 h-full flex flex-col justify-end">
                  
                  {/* icon */}
                  <div className="mb-3 w-10 h-10 flex items-center justify-center rounded-lg bg-white/10 backdrop-blur-md text-white border border-white/20">
                    <Icon className="w-4 h-4" />
                  </div>

                  {/* title */}
                  <h3 className="text-white text-lg font-semibold uppercase tracking-tight">
                    {doc.name}
                  </h3>

                  {/* tag */}
                  <p className="text-[10px] tracking-widest uppercase text-white/70 font-bold">
                    {doc.required ? "Mandatory" : "Optional"}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* FOOTER */}
        <div
          className={`mt-14 p-6 rounded-xl border-l-2 border-primary flex items-center justify-between flex-wrap gap-4 transition-all duration-1000 delay-700 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <p className="text-third text-sm md:text-base italic max-w-2xl">
            KYC helps improve listing authenticity and ensures a secure structural marketplace for all sellers.
          </p>

          <span className="text-[10px] tracking-[0.3em] uppercase text-third font-bold px-3 py-1 rounded-full border border-primary/20">
            Trust Layer Verified
          </span>
        </div>
      </div>
    </section>
  );
}