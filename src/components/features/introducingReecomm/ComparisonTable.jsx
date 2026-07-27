"use client";
import React from "react";
import { Check, X, ShieldAlert, Sparkles } from "lucide-react";

const comparisons = [
  { feature: "Primary Communication Channel", traditional: "WhatsApp Status / Casual Forward Chains", reecomm: "Professional Storefront & In-App Chat" },
  { feature: "Marketplace Listing Type", traditional: "Unverified Facebook / OLX Classified Spam", reecomm: "Verified Vehicle Marketplace" },
  { feature: "Seller Verification", traditional: "Unknown & Unverified Phone Contacts", reecomm: "Verified Consultant & GST Vetted Business" },
  { feature: "Vehicle Technical Audit", traditional: "No Inspection / Buyers Guess", reecomm: "Standardized 100+ Point Inspection Report" },
  { feature: "Inquiry Management", traditional: "Random Phone Calls & Lost Chats", reecomm: "Organized Inquiry & Lead Dashboard" },
  { feature: "Reputation & Reviews", traditional: "Zero Public Ratings or Reviews", reecomm: "Verifiable Customer Reviews & Ratings" }
];

export default function ComparisonTable() {
  return (
    <section id="comparison" className="py-24 bg-transparent text-primary border-b border-white/10 relative">
      <div className="max-w-[1440px] mx-auto px-6 md:px-[80px]">
        
        <div className="text-center max-w-[800px] mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-fourth/10 border border-fourth/30 text-fourth text-xs font-mono font-bold uppercase mb-4">
            <Sparkles className="w-4 h-4" />
            Section 15 — Why Reecomm
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight mb-4 font-[Montserrat] text-primary">
            Traditional Market vs. Reecomm
          </h2>
          <p className="text-lg text-third">
            See how Reecomm transforms the pre-owned automotive journey compared to unstructured traditional channels.
          </p>
        </div>

        {/* Comparison Table */}
        <div className="max-w-[1100px] mx-auto rounded-2xl border border-white/15  backdrop-blur-xl overflow-hidden shadow-2xl">
          <div className="grid grid-cols-12 bg-black/60 p-5 text-sm font-bold border-b border-white/10">
            <div className="col-span-4 text-third font-mono uppercase text-xs">Market Feature</div>
            <div className="col-span-4 text-red-400 font-mono uppercase text-xs flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4" /> Traditional Market
            </div>
            <div className="col-span-4 text-fourth font-mono uppercase text-xs flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" /> Reecomm Platform
            </div>
          </div>

          <div className="divide-y divide-white/10">
            {comparisons.map((row, idx) => (
              <div key={idx} className="grid grid-cols-12 p-5 text-sm items-center hover:bg-white/5 transition-colors">
                <div className="col-span-4 font-semibold text-primary">{row.feature}</div>
                <div className="col-span-4 text-third flex items-center gap-2 pr-4">
                  <X className="w-4 h-4 text-red-400 shrink-0" />
                  <span>{row.traditional}</span>
                </div>
                <div className="col-span-4 text-emerald-300 font-medium flex items-center gap-2 pl-2">
                  <Check className="w-4 h-4 text-fourth shrink-0" />
                  <span>{row.reecomm}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
