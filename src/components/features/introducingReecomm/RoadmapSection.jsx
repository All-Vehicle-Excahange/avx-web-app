"use client";
import React from "react";
import { Sparkles, Brain, CreditCard, Shield, Clock, BarChart2 } from "lucide-react";

const futureRoadmap = [
  { quarter: "Q3 2026", title: "AI Valuation & Fair Price Estimator", desc: "Machine learning algorithms calculating real-time fair market value based on historical sales.", icon: Brain },
  { quarter: "Q3 2026", title: "Instant Auto Finance & EMI Calculator", desc: "In-app pre-approved vehicle loans from India's top partner banks.", icon: CreditCard },
  { quarter: "Q4 2026", title: "Integrated Vehicle Insurance & Warranty", desc: "One-click extended warranty coverage and instant insurance policy issuance.", icon: Shield },
  { quarter: "Q4 2026", title: "Official RTO & Service History Audit", desc: "Automated verification of service records, challans, and RTO transfer logs.", icon: Clock },
  { quarter: "Q1 2027", title: "Advanced Dealer Business Intelligence", desc: "Predictive inventory analytics, regional demand forecasting & pricing strategy tools.", icon: BarChart2 }
];

export default function RoadmapSection() {
  return (
    <section id="roadmap" className="py-24 bg-transparent text-primary border-b border-white/10 relative">
      <div className="max-w-[1440px] mx-auto px-6 md:px-[80px]">
        
        <div className="text-center max-w-[800px] mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-fourth/10 border border-fourth/30 text-fourth text-xs font-mono font-bold uppercase mb-4">
            <Sparkles className="w-4 h-4" />
            Section 18 — Coming Next
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight mb-4 font-[Montserrat] text-primary">
            The Future Roadmap of Reecomm
          </h2>
          <p className="text-lg text-third">
            We are just getting started. Here is what we are building next to make used vehicle ownership even simpler.
          </p>
        </div>

        {/* Roadmap Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 max-w-[1200px] mx-auto">
          {futureRoadmap.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="p-5 rounded-2xl bg-white/5 border border-white/10 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-mono font-bold text-fourth uppercase tracking-widest bg-fourth/10 px-2 py-0.5 rounded border border-fourth/20">
                    {item.quarter}
                  </span>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/5 w-fit my-4 text-fourth">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-primary mb-2">{item.title}</h3>
                  <p className="text-xs text-third leading-relaxed">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
