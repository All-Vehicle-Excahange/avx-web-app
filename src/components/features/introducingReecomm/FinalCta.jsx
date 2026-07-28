"use client";
import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  Download,
  Store,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import Button from "@/components/ui/button";

const seoInternalLinks = [
  { label: "Vehicle Marketplace", href: "/search" },
  { label: "Buy Used Cars India", href: "/search" },
  { label: "Buy Used Bikes", href: "/search" },
  { label: "Consultant Storefronts", href: "/become-consultant" },
  { label: "Vehicle Inspection Process", href: "/inspection-process" },
  { label: "Verified Consultants", href: "/why-chose-us" },
  { label: "Sell Your Vehicle", href: "/become-seller" },
  { label: "Pricing & Plans", href: "/consult" },
  { label: "Trust & Safety", href: "/safety-transparency" },
  { label: "Mobile Apps Download", href: "/download" },
  { label: "Reecomm How it Works", href: "/reecomm-works" },
  { label: "Help Centre & Support", href: "/help" },
  { label: "About Reecomm", href: "/aboutus" },
];

export default function FinalCta() {
  return (
    <section
      id="launch-cta"
      className="py-24 text-white bg-fourth relative overflow-hidden"
    >
      <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-[80px]">
        {/* Huge CTA Card */}
        <div className="rounded-3xl  p-10 sm:p-16 text-center max-w-[1100px] mx-auto mb-20  backdrop-blur-xs">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/30 text-white text-xs font-mono font-bold uppercase mb-6">
            <Sparkles className="w-4 h-4 text-white" />
            Section 20 — Summer Release Final Launch
          </div>

          <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tight mb-6 leading-tight font-[Montserrat] text-white">
            Ready to rethink <br />
            <span className="text-white">used vehicle buying?</span>
          </h2>

          <p className="text-lg sm:text-2xl text-white/90 max-w-[760px] mx-auto mb-10 font-normal leading-relaxed">
            Join thousands of buyers, sellers, verified consultants, and
            inspectors organizing India&apos;s vehicle marketplace.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
            <Button
              variant="ghost"
              href="/search"
              size="md"
              className="border-transparent hover:border-transparent hover:shadow-lg hover:shadow-black/30 transition-all duration-300"
            >
              Open Web Marketplace
            </Button>

            <Button
              href="/download"
              size="md"
              className="border border-white/30 text-white hover:text-white bg-white/10 hover:bg-white/20 hover:border-white/50 hover:shadow-md hover:shadow-white/15 font-medium transition-all duration-300"
            >
              <Download className="w-4 h-4 mr-1 text-white" />
              Download Mobile App
            </Button>

            <Button
              href="/become-consultant"
              size="md"
              className="border border-white/30 text-white hover:text-white bg-white/10 hover:bg-white/20 hover:border-white/50 hover:shadow-md hover:shadow-white/15 font-medium transition-all duration-300"
            >
              <Store className="w-4 h-4 mr-1 text-white" />
              Join as Consultant
            </Button>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-white/90 font-mono">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-white" /> Free Registration
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-white" /> Verified Listings
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-white" /> Instant App Launch
            </span>
          </div>
        </div>

        {/* SEO Internal Link Hub */}
        {/*         
        <div className="pt-12 border-t border-white/10">
          <div className="max-w-[1100px] mx-auto text-center">
            <p className="text-xs uppercase font-mono tracking-widest text-fourth font-bold mb-4">
              Reecomm Product & Topic Navigation Hub
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {seoInternalLinks.map((item, idx) => (
                <Link
                  key={idx}
                  href={item.href}
                  className="text-xs text-third bg-white/5 border border-white/10 hover:border-fourth hover:text-primary px-3.5 py-1.5 rounded-lg transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
 */}
      </div>
    </section>
  );
}
