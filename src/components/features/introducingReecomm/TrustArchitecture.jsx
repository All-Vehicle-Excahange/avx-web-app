"use client";
import React from "react";
import { ShieldCheck, CheckCircle2, UserCheck, Star, FileText, Store, Lock } from "lucide-react";

const trustSignals = [
  { title: "Verified Consultant Badge", desc: "Strict business & identity verification before badge issuance.", icon: ShieldCheck },
  { title: "Verified Vehicle Audit", desc: "Detailed inspection reports verifying chassis, OBD diagnostics & paint.", icon: CheckCircle2 },
  { title: "Standardized Technical Inspection", desc: "Independent 100+ point inspection checklist for every certified listing.", icon: FileText },
  { title: "Authentic Buyer Reviews", desc: "Verifiable customer reviews linked directly to completed vehicle transactions.", icon: Star },
  { title: "Transparent Profiles", desc: "Complete consultant history, location verification, and inventory track record.", icon: UserCheck },
  { title: "Professional Digital Storefront", desc: "Dedicated URL showcasing verified stock and real buyer ratings.", icon: Store }
];

export default function TrustArchitecture() {
  return (
    <section id="trust" className="py-24 bg-transparent text-primary border-b border-white/10 relative">
      <div className="max-w-[1440px] mx-auto px-6 md:px-[80px]">
        
        <div className="text-center max-w-[840px] mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold uppercase mb-4">
            <Lock className="w-4 h-4" />
            Section 13 — Built Around Trust
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight mb-4 font-[Montserrat] text-primary">
            Trust is Not Optional. It&apos;s Engineered.
          </h2>
          <p className="text-lg text-third">
            Every feature, workflow, and interface on Reecomm is designed around one question: Does this make buying and selling used vehicles more trustworthy?
          </p>
        </div>

        {/* 6 Large Icon Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {trustSignals.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl flex flex-col justify-between hover:border-emerald-500/40 transition-all group">
                <div>
                  <div className="p-4 rounded-xl bg-emerald-500/10 text-emerald-400 w-fit mb-6 border border-emerald-500/20 group-hover:scale-110 transition-transform">
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-primary mb-3">{item.title}</h3>
                  <p className="text-sm text-third leading-relaxed">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
