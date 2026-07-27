"use client";
import React from "react";
import Link from "next/link";
import { ArrowRight, Download, Store, Sparkles, CheckCircle2 } from "lucide-react";
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
  { label: "About Reecomm", href: "/aboutus" }
];

export default function FinalCta() {
  return (
    <section id="launch-cta" className="py-24 bg-transparent text-primary relative overflow-hidden">
      <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-[80px]">
        
        {/* Huge CTA Card */}
        <div className="rounded-3xl border border-white/15 p-10 sm:p-16 text-center max-w-[1100px] mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-fourth/10 border border-fourth/30 text-fourth text-xs font-mono font-bold uppercase mb-6">
            <Sparkles className="w-4 h-4" />
            Section 20 — Summer Release Final Launch
          </div>

          <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tight mb-6 leading-tight font-[Montserrat] text-primary">
            Ready to rethink <br />
            <span className="text-fourth">
              used vehicle buying?
            </span>
          </h2>

          <p className="text-lg sm:text-2xl text-third max-w-[760px] mx-auto mb-10 font-normal leading-relaxed">
            Join thousands of buyers, sellers, verified consultants, and inspectors organizing India&apos;s vehicle marketplace.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
            <Button variant="ghost" href="/search" size="md">
              Open Web Marketplace
            </Button>

            <Button variant="outlineSecondary" href="/download" size="md">
              <Download className="w-4 h-4 mr-1 text-fourth" />
              Download Mobile App
            </Button>

            <Button variant="outlineSecondary" href="/become-consultant" size="md">
              <Store className="w-4 h-4 mr-1 text-emerald-400" />
              Join as Consultant
            </Button>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-third font-mono">
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-fourth" /> Free Registration</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-fourth" /> Verified Listings</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-fourth" /> Instant App Launch</span>
          </div>
        </div>

        {/* SEO Internal Link Hub */}
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

      </div>
    </section>
  );
}
