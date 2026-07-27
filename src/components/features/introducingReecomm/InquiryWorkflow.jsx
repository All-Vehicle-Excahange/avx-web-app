"use client";
import React from "react";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";

const inquirySteps = [
  "Buyer taps 'Inquire' on any verified vehicle listing.",
  "Consultant receives instant push notification & SMS alert.",
  "Direct in-app messaging with full communication records.",
  "Option to request a pre-purchase technical inspection before booking.",
  "Transparent deal completed with verified digital records."
];

export default function InquiryWorkflow() {
  return (
    <section id="inquiry" className="py-20 bg-transparent text-primary border-b border-white/10 relative">
      <div className="max-w-[1200px] mx-auto px-6">
        
        {/* Editorial Heading Block */}
        <div className="max-w-[860px] mb-8">
          <span className="text-xs font-mono font-bold uppercase text-purple-400 tracking-widest block mb-2">
            INQUIRY EXPERIENCE
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4 font-[Montserrat] text-primary">
            Seamless Buyer-Consultant Communication
          </h2>
          <p className="text-base sm:text-lg text-third leading-relaxed">
            No lost messages, no missed leads. Our integrated inquiry system connects buyers directly to verified vehicle consultants in real time with recorded interaction history.
          </p>
        </div>

        {/* Airbnb-Style Media Container (Centered Floating Phone) */}
        <div className="rounded-3xl border border-white/15 bg-white/5 p-8 sm:p-14 backdrop-blur-xl shadow-2xl overflow-hidden mb-10 flex items-center justify-center">
          
          <div className="w-[220px] sm:w-[280px] aspect-[9/19] rounded-[38px] border-6 border-white/20 bg-black p-2 shadow-2xl relative hover:scale-[1.02] transition-transform">
            <div className="relative w-full h-full rounded-[30px] overflow-hidden border border-white/10">
              <Image
                src="/card1.webp"
                alt="Inquiry & Chat Screen"
                fill
                className="object-cover"
              />
            </div>
          </div>

        </div>

        {/* Workflow Steps Bullet List */}
        <div className="max-w-[860px] space-y-3">
          {inquirySteps.map((step, idx) => (
            <div key={idx} className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
              <span className="text-sm sm:text-base text-third font-medium">{step}</span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
