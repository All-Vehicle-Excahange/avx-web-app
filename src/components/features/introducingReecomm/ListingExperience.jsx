"use client";
import React from "react";
import Image from "next/image";
import { PlusCircle, UploadCloud, FileText, CheckCircle2, MessageSquare, DollarSign } from "lucide-react";

const listingSteps = [
  { step: "1", title: "Create Listing", desc: "Select vehicle category, brand, model & registration year.", icon: PlusCircle },
  { step: "2", title: "Upload Images & Video", desc: "Add high-res exterior, interior & engine photos.", icon: UploadCloud },
  { step: "3", title: "Add Details & Specs", desc: "Specify mileage, fuel type, ownership & price.", icon: FileText },
  { step: "4", title: "Publish Instantly", desc: "Listing goes live on web & mobile app simultaneously.", icon: CheckCircle2 },
  { step: "5", title: "Receive Buyer Inquiry", desc: "Get real-time app notifications & direct chat requests.", icon: MessageSquare },
  { step: "6", title: "Conclude Sale", desc: "Finalize deal with verified buyer or consultant.", icon: DollarSign }
];

export default function ListingExperience() {
  return (
    <section id="listing" className="py-24 bg-transparent text-primary border-b border-white/10 relative">
      <div className="max-w-[1440px] mx-auto px-6 md:px-[80px]">
        
        <div className="text-center max-w-[800px] mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-fourth/10 border border-fourth/30 text-fourth text-xs font-mono font-bold uppercase mb-4">
            Section 07 — Vehicle Listing Experience
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight mb-4 font-[Montserrat] text-primary">
            List in minutes. Sell with confidence.
          </h2>
          <p className="text-lg text-third">
            Our streamlined vehicle publishing workflow guides sellers and consultants step-by-step to create professional, high-converting vehicle listings.
          </p>
        </div>

        {/* Timeline Flow Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-16">
          {listingSteps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="relative p-5 rounded-2xl bg-white/5 border border-white/10 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono font-bold text-fourth">
                      0{item.step}
                    </span>
                    <Icon className="w-5 h-5 text-third" />
                  </div>
                  <h3 className="text-base font-bold text-primary mb-2">{item.title}</h3>
                  <p className="text-xs text-third leading-relaxed">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Phone Mockup Row */}
        <div className="flex flex-wrap items-center justify-center gap-8">
          <div className="w-[200px] sm:w-[240px] aspect-[9/19] rounded-[32px] border-4 border-white/20 bg-black p-2 shadow-2xl relative">
            <div className="relative w-full h-full rounded-[24px] overflow-hidden border border-white/10">
              <Image src="/card4.webp" alt="Listing Step 1" fill className="object-cover" />
            </div>
          </div>
          <div className="w-[200px] sm:w-[240px] aspect-[9/19] rounded-[32px] border-4 border-white/20 bg-black p-2 shadow-2xl relative">
            <div className="relative w-full h-full rounded-[24px] overflow-hidden border border-white/10">
              <Image src="/card5.webp" alt="Listing Step 2" fill className="object-cover" />
            </div>
          </div>
          <div className="w-[200px] sm:w-[240px] aspect-[9/19] rounded-[32px] border-4 border-white/20 bg-black p-2 shadow-2xl relative">
            <div className="relative w-full h-full rounded-[24px] overflow-hidden border border-white/10">
              <Image src="/card6.webp" alt="Listing Step 3" fill className="object-cover" />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
