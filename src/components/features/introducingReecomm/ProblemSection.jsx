"use client";
import React from "react";
import { motion } from "framer-motion";
import { AlertTriangle, XCircle, ArrowRight, ShieldAlert } from "lucide-react";

const fragmentedIssues = [
  "WhatsApp Groups & Random Forward Chains",
  "Unverified Facebook & Olx Spam Listings",
  "Unknown Sellers with Zero Ratings or Records",
  "No Pre-Purchase Inspection or Diagnostic Audits",
  "Hidden Defects & Odometer Tampering",
  "Complete Lack of Trust & Verification"
];

export default function ProblemSection() {
  return (
    <section id="problem" className="py-24 bg-transparent text-primary border-b border-white/10 relative overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 md:px-[80px]">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Text Column */}
          <div>
          
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight mb-6 leading-tight font-[Montserrat] text-primary">
              Buying a used vehicle shouldn&apos;t feel like a <span className="text-red-400">gamble</span>.
            </h2>

            <p className="text-lg text-third leading-relaxed mb-8">
              India&apos;s pre-owned vehicle market is one of the largest in the world, yet millions of buyers and honest consultants struggle daily with uncertainty, fake listings, and unstructured communication channels.
            </p>

            {/* List of Pain Points */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {fragmentedIssues.map((issue, idx) => (
                <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-white/5 border border-white/5 text-sm text-third">
                  <XCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <span>{issue}</span>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-red-500/20 flex items-center gap-4">
              <ShieldAlert className="w-8 h-8 text-red-400 shrink-0" />
              <p className="text-xs text-third leading-relaxed">
                Result: Buyers overpay in uncertainty, genuine vehicle consultants look like spammers, and no digital infrastructure exists to guarantee accountability.
              </p>
            </div>
          </div>

          {/* Right Visual: Broken Journey Diagram */}
          <div className="relative">
            <div className="rounded-2xl border border-red-500/20  p-8 relative overflow-hidden backdrop-blur-xl">
              <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 rounded-full blur-3xl pointer-events-none" />

              <h3 className="text-lg font-bold text-primary mb-6 flex items-center justify-between">
                <span>Traditional Fragmented Process</span>
                <span className="text-xs font-mono text-red-400 uppercase font-bold">Unstructured</span>
              </h3>

              {/* Step Flow */}
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                  <span className="text-sm font-medium text-third">1. Search on Random FB / WhatsApp Groups</span>
                  <XCircle className="w-4 h-4 text-red-400" />
                </div>

                <div className="w-full flex justify-center">
                  <ArrowRight className="w-4 h-4 text-third/40 rotate-90" />
                </div>

                <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                  <span className="text-sm font-medium text-third">2. Deal with Unverified Phone Contacts</span>
                  <XCircle className="w-4 h-4 text-red-400" />
                </div>

                <div className="w-full flex justify-center">
                  <ArrowRight className="w-4 h-4 text-third/40 rotate-90" />
                </div>

                <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                  <span className="text-sm font-medium text-third">3. Zero Technical Inspection Report</span>
                  <XCircle className="w-4 h-4 text-red-400" />
                </div>

                <div className="w-full flex justify-center">
                  <ArrowRight className="w-4 h-4 text-third/40 rotate-90" />
                </div>

                <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center justify-between text-red-300">
                  <span className="text-sm font-bold">4. High Risk Purchase & No Post-Sale Support</span>
                  <AlertTriangle className="w-5 h-5 text-red-400" />
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
