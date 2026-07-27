"use client";
import React from "react";
import { CheckCircle2, Rocket } from "lucide-react";

const liveFeaturesList = [
  "Verified Vehicle Marketplace",
  "Consultant Digital Storefronts",
  "Standardized Vehicle Inspection",
  "Direct Buyer-Consultant Chat",
  "Verified Customer Reviews",
  "Saved Vehicles & Favorites",
  "Consultant Verification Badges",
  "Android & iOS Mobile Apps",
  "Cross-Platform Web Engine"
];

export default function LaunchFeatures() {
  return (
    <section id="launch-features" className="py-24 bg-transparent text-primary border-b border-white/10 relative">
      <div className="max-w-[1440px] mx-auto px-6 md:px-[80px]">
        
        <div className="text-center max-w-[800px] mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold uppercase mb-4">
            <Rocket className="w-4 h-4" />
            Section 17 — Launch Capability
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight mb-4 font-[Montserrat] text-primary">
            Live Today in the Summer 2026 Release
          </h2>
          <p className="text-lg text-third">
            These features are live right now on Web, Android APK, and iOS.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-[1000px] mx-auto">
          {liveFeaturesList.map((item, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-white/5 border border-emerald-500/20 flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              <span className="text-sm font-semibold text-primary">{item}</span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
