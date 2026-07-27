"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, ArrowRight } from "lucide-react";

const storefrontHighlights = [
  "No website required — get a custom URL in under 5 minutes.",
  "Share your live inventory across WhatsApp and social media with one tap.",
  "Collect real customer reviews that build permanent digital reputation.",
  "Generate high-intent buyer inquiries directly to your phone."
];

export default function StorefrontShowcase() {
  return (
    <section id="storefront" className="py-20 bg-transparent text-primary border-b border-white/10 relative">
      <div className="max-w-[1200px] mx-auto px-6">
        
        {/* Editorial Heading Block */}
        <div className="max-w-[860px] mb-8">
          <span className="text-xs font-mono font-bold uppercase text-fourth tracking-widest block mb-2">
            CONSULTANT STOREFRONT
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4 font-[Montserrat] text-primary">
            Every consultant gets a digital showroom
          </h2>
          <p className="text-base sm:text-lg text-third leading-relaxed">
            Stop relying solely on WhatsApp status updates and casual group forwards. Build a permanent, professional online presence that earns instant buyer trust.
          </p>
        </div>

        {/* Airbnb-Style Media Container (2 Floating Phones Side-by-Side) */}
        <div className="rounded-3xl border border-white/15 bg-white/5 p-8 sm:p-14 backdrop-blur-xl shadow-2xl overflow-hidden mb-10 flex flex-wrap items-center justify-center gap-8 sm:gap-12">
          
          {/* Phone Mockup 1 */}
          <div className="w-[220px] sm:w-[270px] aspect-[9/19] rounded-[38px] border-6 border-white/20 bg-black p-2 shadow-2xl relative hover:scale-[1.02] transition-transform">
            <div className="relative w-full h-full rounded-[30px] overflow-hidden border border-white/10">
              <Image
                src="/card3.webp"
                alt="Consultant Digital Showroom Screen"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Phone Mockup 2 */}
          <div className="w-[220px] sm:w-[270px] aspect-[9/19] rounded-[38px] border-6 border-white/20 bg-black p-2 shadow-2xl relative hover:scale-[1.02] transition-transform">
            <div className="relative w-full h-full rounded-[30px] overflow-hidden border border-white/10">
              <Image
                src="/card4.webp"
                alt="Consultant Inventory Catalog Screen"
                fill
                className="object-cover"
              />
            </div>
          </div>

        </div>

        {/* Feature Highlights List */}
        <div className="max-w-[860px] space-y-3 mb-8">
          {storefrontHighlights.map((feat, idx) => (
            <div key={idx} className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-fourth shrink-0 mt-0.5" />
              <span className="text-sm sm:text-base text-third font-medium">{feat}</span>
            </div>
          ))}
        </div>

        <div>
          <Link
            href="/become-consultant"
            className="inline-flex items-center gap-2 text-sm font-semibold text-fourth hover:underline"
          >
            Create Your Digital Storefront
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
}
