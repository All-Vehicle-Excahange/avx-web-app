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

        {/* 3 Inspection Showcase Images */}
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 mb-10">
          
          {/* Inspection Image 1 */}
          <div className="relative w-[220px] sm:w-[260px] md:w-[290px] rounded-2xl overflow-hidden shadow-xl transition-transform hover:scale-[1.01]">
            <Image
              src="/Inspection 1_crop.png"
              alt="Inspection Technical Audit"
              width={600}
              height={1000}
              className="w-full h-auto object-contain rounded-2xl"
              priority
            />
          </div>

          {/* Inspection Image 2 */}
          <div className="relative w-[220px] sm:w-[260px] md:w-[290px] rounded-2xl overflow-hidden shadow-xl transition-transform hover:scale-[1.01]">
            <Image
              src="/Inspection 2_crop.png"
              alt="Inspection Checklist Report"
              width={600}
              height={1000}
              className="w-full h-auto object-contain rounded-2xl"
              priority
            />
          </div>

          {/* Inspection Image 3 */}
          <div className="relative w-[220px] sm:w-[260px] md:w-[290px] rounded-2xl overflow-hidden shadow-xl transition-transform hover:scale-[1.01]">
            <Image
              src="/Inspection 3_crop.png"
              alt="Inspection Rating Scorecard"
              width={600}
              height={1000}
              className="w-full h-auto object-contain rounded-2xl"
              priority
            />
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
