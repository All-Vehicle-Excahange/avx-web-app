"use client";
import React from "react";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";

const inquirySteps = [
  "Buyer taps 'Inquire' on any verified vehicle listing.",
  "Consultant receives instant push notification & SMS alert.",
  "Direct in-app messaging with full communication records.",
  "Option to request a pre-purchase technical inspection before booking.",
  "Transparent deal completed with verified digital records.",
];

export default function InquiryWorkflow() {
  return (
    <section
      id="inquiry"
      className="py-20 bg-transparent text-primary border-b border-white/10 relative"
    >
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
            No lost messages, no missed leads. Our integrated inquiry system
            connects buyers directly to verified vehicle consultants in real
            time with recorded interaction history.
          </p>
        </div>

        {/* Single Image Display (Compact & Fits Perfectly) */}
        <div className="flex justify-center mb-10">
          <div className="relative w-full max-w-[420px] rounded-2xl overflow-hidden shadow-xl transition-transform hover:scale-[1.005] flex justify-center">
            <Image
              src="/Chatscreensa.webp"
              alt="Inquiry Experience & Inspection Workflow"
              width={600}
              height={500}
              className="w-full max-h-[420px] object-contain rounded-2xl"
              priority
            />
          </div>
        </div>

        {/* Workflow Steps Bullet List */}
        <div className="max-w-[860px] space-y-3">
          {inquirySteps.map((step, idx) => (
            <div key={idx} className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
              <span className="text-sm sm:text-base text-third font-medium">
                {step}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
