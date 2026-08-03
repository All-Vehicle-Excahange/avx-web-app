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

        {/* Single Image Display (Smart Section Crop) */}
        <div className="flex justify-center mb-16">
          <div className="relative w-full max-w-[850px] rounded-2xl overflow-hidden shadow-2xl transition-transform hover:scale-[1.005]">
            <Image
              src="/Smart section_crop.webp"
              alt="Reecomm Mobile & Multi-Device Experience"
              width={1200}
              height={700}
              className="w-full h-auto object-contain rounded-2xl"
              priority
            />
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
