"use client";
import React from "react";
import { motion } from "framer-motion";
import { Search, ShoppingBag, Store, ShieldCheck, ArrowUpRight } from "lucide-react";

const journeyPillars = [
  {
    role: "Buyer",
    action: "Find Verified Vehicles",
    desc: "Browse multi-point inspected vehicles with transparent pricing, full inspection reports, and direct consultant chat.",
    icon: Search,
    color: "from-fourth/20 to-fourth/5",
    accent: "text-fourth",
    badge: "100% Inspected Listings",
    link: "/search"
  },
  {
    role: "Seller",
    action: "Sell Faster",
    desc: "Connect directly with verified vehicle consultants and buyers without endless WhatsApp spam or low-ball offers.",
    icon: ShoppingBag,
    color: "from-emerald-500/20 to-emerald-600/5",
    accent: "text-emerald-400",
    badge: "Quick Direct Match",
    link: "/become-seller"
  },
  {
    role: "Consultant",
    action: "Grow Business",
    desc: "Claim a professional digital storefront, showcase your inventory online, collect customer reviews, and generate leads.",
    icon: Store,
    color: "from-indigo-500/20 to-indigo-600/5",
    accent: "text-indigo-400",
    badge: "Digital Showroom",
    link: "/become-consultant"
  },
  {
    role: "Inspector",
    action: "Build Credibility",
    desc: "Upload standardized inspection checklists, diagnostic photos, and build trust across India's automotive ecosystem.",
    icon: ShieldCheck,
    color: "from-amber-500/20 to-amber-600/5",
    accent: "text-amber-400",
    badge: "Standardized Audits",
    link: "/inspection-process"
  }
];

export default function JourneyPillars() {
  return (
    <section id="pillars" className="py-24 bg-transparent text-primary border-b border-white/10 relative">
      <div className="max-w-[1440px] mx-auto px-6 md:px-[80px]">
        
        {/* Section Header */}
        <div className="text-center max-w-[800px] mx-auto mb-16">
          <p className="text-xs uppercase tracking-[4px] font-mono text-fourth font-bold mb-3">
            Ecosystem Core
          </p>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight mb-4 font-[Montserrat] text-primary">
            Trusted by Every Vehicle Journey
          </h2>
          <p className="text-lg text-third">
            Reecomm is purpose-built to organize India&apos;s used vehicle market for everyone involved in buying, selling, consulting, and verifying.
          </p>
        </div>

        {/* 4 Premium Glass Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {journeyPillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="relative rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl flex flex-col justify-between overflow-hidden"
              >
                <div>
                  {/* Top Bar */}
                  <div className="flex items-center justify-between mb-6">
                    <div className={`p-3 rounded-xl bg-white/5 border border-white/10 ${item.accent}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-mono uppercase tracking-widest text-third bg-white/5 px-2.5 py-1 rounded-full border border-white/10">
                      {item.role}
                    </span>
                  </div>

                  {/* Title & Action */}
                  <h3 className="text-2xl font-bold text-primary mb-2">
                    {item.action}
                  </h3>

                  <p className="text-sm text-third leading-relaxed mb-6">
                    {item.desc}
                  </p>
                </div>

                {/* Bottom Badge & Arrow */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <span className={`text-xs font-semibold ${item.accent}`}>
                    {item.badge}
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-third" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
