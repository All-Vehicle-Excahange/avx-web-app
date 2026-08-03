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

        {/* Marketplace Image Showcase (No Container Box or Phone Frames) */}
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 mb-10">
          
          {/* Marketplace Search Screen */}
          <div className="relative w-[230px] sm:w-[270px] md:w-[290px] rounded-2xl overflow-hidden shadow-xl transition-transform hover:scale-[1.01]">
            <Image
              src="/card1.webp"
              alt="Vehicle Marketplace Search Screen"
              width={600}
              height={1000}
              className="w-full h-auto object-contain rounded-2xl"
              priority
            />
          </div>

          {/* Vehicle Details Screen */}
          <div className="relative w-[230px] sm:w-[270px] md:w-[290px] rounded-2xl overflow-hidden shadow-xl transition-transform hover:scale-[1.01]">
            <Image
              src="/card2.webp"
              alt="Vehicle Listing Details Screen"
              width={600}
              height={1000}
              className="w-full h-auto object-contain rounded-2xl"
              priority
            />
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
