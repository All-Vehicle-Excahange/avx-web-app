"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, ArrowRight } from "lucide-react";

const inspectionHighlights = [
  "Independent 100+ point technical audit covering engine, transmission & chassis.",
  "Digital PDF report with granular rating scores and photographic evidence.",
  "OBD-II computer diagnostics to detect hidden error codes & odometer tampering.",
  "Official 'Reecomm Inspected' trust badge awarded to verified vehicles."
];

export default function InspectionShowcase() {
  return (
    <section id="inspection" className="py-20 bg-transparent text-primary border-b border-white/10 relative">
      <div className="max-w-[1200px] mx-auto px-6">
        
        {/* Editorial Heading Block */}
        <div className="max-w-[860px] mb-8">
          <span className="text-xs font-mono font-bold uppercase text-emerald-400 tracking-widest block mb-2">
            RECOMM INSPECTION
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4 font-[Montserrat] text-primary">
            Uncompromised Technical Inspection
          </h2>
          <p className="text-base sm:text-lg text-third leading-relaxed">
            Never buy blind again. Reecomm brings standard, independent vehicle auditing so buyers know exactly what they are paying for before making a financial commitment.
          </p>
        </div>

        {/* Airbnb-Style Media Container (3 Floating Phones Side-by-Side) */}
        <div className="rounded-3xl border border-white/15 bg-white/5 p-8 sm:p-14 backdrop-blur-xl shadow-2xl overflow-hidden mb-10 flex flex-wrap items-center justify-center gap-6 sm:gap-8">
          
          {/* Phone Mockup 1 */}
          <div className="w-[200px] sm:w-[240px] aspect-[9/19] rounded-[36px] border-6 border-white/20 bg-black p-2 shadow-2xl relative hover:scale-[1.02] transition-transform">
            <div className="relative w-full h-full rounded-[28px] overflow-hidden border border-white/10">
              <Image
                src="/card4.webp"
                alt="Inspection Audit Checklist"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Phone Mockup 2 */}
          <div className="w-[200px] sm:w-[240px] aspect-[9/19] rounded-[36px] border-6 border-white/20 bg-black p-2 shadow-2xl relative hover:scale-[1.02] transition-transform">
            <div className="relative w-full h-full rounded-[28px] overflow-hidden border border-white/10">
              <Image
                src="/card5.webp"
                alt="Inspection Rating Scorecard"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Phone Mockup 3 */}
          <div className="w-[200px] sm:w-[240px] aspect-[9/19] rounded-[36px] border-6 border-white/20 bg-black p-2 shadow-2xl relative hover:scale-[1.02] transition-transform">
            <div className="relative w-full h-full rounded-[28px] overflow-hidden border border-white/10">
              <Image
                src="/card6.webp"
                alt="Verified Inspection Badge"
                fill
                className="object-cover"
              />
            </div>
          </div>

        </div>

        {/* Feature Highlights List */}
        <div className="max-w-[860px] space-y-3 mb-8">
          {inspectionHighlights.map((feat, idx) => (
            <div key={idx} className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <span className="text-sm sm:text-base text-third font-medium">{feat}</span>
            </div>
          ))}
        </div>

        <div>
          <Link
            href="/inspection-process"
            className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-400 hover:underline"
          >
            Learn About Inspection Standards
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
}
