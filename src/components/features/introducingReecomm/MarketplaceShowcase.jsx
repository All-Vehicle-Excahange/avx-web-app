"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, ArrowRight } from "lucide-react";

const marketplaceFeatures = [
  "Smart Search with Instant Keyword & Spec Filtering",
  "Verified Vehicle Badges Backed by Real Inspections",
  "Saved Searches & Instant New Listing Alerts",
  "One-Click Social & WhatsApp Listing Share",
  "AI-Driven Smart Recommendations for Buyers"
];

export default function MarketplaceShowcase() {
  return (
    <section id="marketplace" className="py-20 bg-transparent text-primary border-b border-white/10 relative">
      <div className="max-w-[1200px] mx-auto px-6">
        
        {/* Editorial Heading Block */}
        <div className="max-w-[860px] mb-8">
          <span className="text-xs font-mono font-bold uppercase text-fourth tracking-widest block mb-2">
            VEHICLE MARKETPLACE
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4 font-[Montserrat] text-primary">
            Discover vehicles the smarter way
          </h2>
          <p className="text-base sm:text-lg text-third leading-relaxed">
            No endless scrolling through duplicate listings or unverified posts. Reecomm brings high-resolution media, structured specs, and complete inspection visibility directly to your screen.
          </p>
        </div>

        {/* Airbnb-Style Media Container (2 Floating Phones Side-by-Side) */}
        <div className="rounded-3xl border border-white/15 bg-white/5 p-8 sm:p-14 backdrop-blur-xl shadow-2xl overflow-hidden mb-10 flex flex-wrap items-center justify-center gap-8 sm:gap-12">
          
          {/* Phone Mockup 1 */}
          <div className="w-[220px] sm:w-[270px] aspect-[9/19] rounded-[38px] border-6 border-white/20 bg-black p-2 shadow-2xl relative hover:scale-[1.02] transition-transform">
            <div className="relative w-full h-full rounded-[30px] overflow-hidden border border-white/10">
              <Image
                src="/card1.webp"
                alt="Marketplace Search Screen"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Phone Mockup 2 */}
          <div className="w-[220px] sm:w-[270px] aspect-[9/19] rounded-[38px] border-6 border-white/20 bg-black p-2 shadow-2xl relative hover:scale-[1.02] transition-transform">
            <div className="relative w-full h-full rounded-[30px] overflow-hidden border border-white/10">
              <Image
                src="/card2.webp"
                alt="Marketplace Listing Details Screen"
                fill
                className="object-cover"
              />
            </div>
          </div>

        </div>

        {/* Feature Highlights Bullet List */}
        <div className="max-w-[860px] space-y-3 mb-8">
          {marketplaceFeatures.map((feat, idx) => (
            <div key={idx} className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-fourth shrink-0 mt-0.5" />
              <span className="text-sm sm:text-base text-third font-medium">{feat}</span>
            </div>
          ))}
        </div>

        <div>
          <Link
            href="/search"
            className="inline-flex items-center gap-2 text-sm font-semibold text-fourth hover:underline"
          >
            Explore Vehicle Marketplace
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
}
