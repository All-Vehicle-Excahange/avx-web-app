import React from "react";
import Image from "next/image";
import { Smartphone, Monitor, Tablet } from "lucide-react";
import Button from "@/components/ui/button";

export default function MobileExperience() {
  return (
    <section id="mobile" className="py-24 bg-transparent text-primary border-b border-white/10 relative overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 md:px-[80px]">
        
        {/* Header */}
        <div className="text-center max-w-[840px] mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-fourth/10 border border-fourth/30 text-fourth text-xs font-mono font-bold uppercase mb-4">
            <Smartphone className="w-4 h-4" />
            Section 11 & 12 — Mobile & Multi-Device
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight mb-4 font-[Montserrat] text-primary">
            Available Everywhere. Built for Speed.
          </h2>
          <p className="text-lg text-third">
            Tailored native mobile experiences for Buyers, Consultants, and Technical Inspectors across Web, Desktop, Android, and iOS.
          </p>
        </div>

        {/* 3 Phones Animated Display */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-[1000px] mx-auto mb-16">
          
          {/* Phone 1: Buyer App */}
          <div className="flex flex-col items-center">
            <div className="w-full max-w-[260px] aspect-[9/19] rounded-[36px] border-4 border-white/20 bg-black p-2 shadow-2xl relative mb-4">
              <div className="relative w-full h-full rounded-[28px] overflow-hidden border border-white/10">
                <Image src="/card1.webp" alt="Buyer App Screen" fill className="object-cover" />
              </div>
            </div>
            <h3 className="text-lg font-bold text-primary mb-1">Buyer Mobile App</h3>
            <p className="text-xs text-third text-center">Instant Search, Saved Favorites & Direct Chat</p>
          </div>

          {/* Phone 2: Consultant App */}
          <div className="flex flex-col items-center">
            <div className="w-full max-w-[260px] aspect-[9/19] rounded-[36px] border-4 border-white/20 bg-black p-2 shadow-2xl relative mb-4">
              <div className="relative w-full h-full rounded-[28px] overflow-hidden border border-white/10">
                <Image src="/card2.webp" alt="Consultant App Screen" fill className="object-cover" />
              </div>
            </div>
            <h3 className="text-lg font-bold text-primary mb-1">Consultant Storefront App</h3>
            <p className="text-xs text-third text-center">Manage Inventory, Lead Alerts & Customer Ratings</p>
          </div>

          {/* Phone 3: Inspector App */}
          <div className="flex flex-col items-center">
            <div className="w-full max-w-[260px] aspect-[9/19] rounded-[36px] border-4 border-white/20 bg-black p-2 shadow-2xl relative mb-4">
              <div className="relative w-full h-full rounded-[28px] overflow-hidden border border-white/10">
                <Image src="/card3.webp" alt="Inspector App Screen" fill className="object-cover" />
              </div>
            </div>
            <h3 className="text-lg font-bold text-primary mb-1">Inspector Audit App</h3>
            <p className="text-xs text-third text-center">Multi-Point Checklists, Media Upload & Audit PDF</p>
          </div>

        </div>

        {/* Section 12: Device Matrix Grid */}
        <div className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl max-w-[1000px] mx-auto text-center">
          <h3 className="text-xl font-bold text-primary mb-6">Cross-Platform Synchronization</h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="p-4 rounded-xl bg-white/5 border border-white/5 flex flex-col items-center">
              <Monitor className="w-6 h-6 text-fourth mb-2" />
              <span className="text-sm font-bold text-primary">Desktop Web</span>
              <span className="text-[11px] text-third">Chrome, Safari, Edge</span>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/5 flex flex-col items-center">
              <Tablet className="w-6 h-6 text-fourth mb-2" />
              <span className="text-sm font-bold text-primary">Tablet Responsive</span>
              <span className="text-[11px] text-third">iPad & Android Tabs</span>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/5 flex flex-col items-center">
              <Smartphone className="w-6 h-6 text-fourth mb-2" />
              <span className="text-sm font-bold text-primary">Android Application</span>
              <span className="text-[11px] text-third">Google Play & APK</span>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/5 flex flex-col items-center">
              <Smartphone className="w-6 h-6 text-fourth mb-2" />
              <span className="text-sm font-bold text-primary">iOS Application</span>
              <span className="text-[11px] text-third">Apple App Store</span>
            </div>
          </div>

          <Button variant="ghost" href="/download" size="md">
            Download Official Reecomm Apps
          </Button>
        </div>

      </div>
    </section>
  );
}
