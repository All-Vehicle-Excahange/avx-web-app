import React from "react";
import {
  Compass,
  FileCheck,
  Search,
  Store,
  Users,
} from "lucide-react";
import Button from "@/components/ui/button";

export default function PressBrandStory() {
  const pillars = [
    {
      icon: Search,
      title: "Vehicle Discovery",
      desc: "Comprehensive verified inventory search across Indian cities with real vehicle condition reports.",
    },
    {
      icon: Store,
      title: "Digital Storefronts",
      desc: "Empowering independent auto consultants with personalized digital presence and online inventory.",
    },
    {
      icon: FileCheck,
      title: "Independent Inspections",
      desc: "Multi-point unbiased structural, electrical, and mechanical assessments for absolute transparency.",
    },
    {
      icon: Users,
      title: "Direct Enquiries",
      desc: "Transparent and fair buyer-consultant communication without hidden broker middlemen.",
    },
  ];

  return (
    <section
      id="brand-story"
      className="relative py-8 md:py-10 border-b border-white/10 bg-transparent"
      aria-label="Why We Are Building Reecomm"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1200px]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left Narrative Column */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-semibold tracking-widest uppercase text-fourth mb-2.5">
              <Compass className="w-3.5 h-3.5" />
              <span>The Idea Behind Reecomm</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-extrabold text-primary tracking-tight leading-tight mb-3 font-[Montserrat]">
              Real Problems. Practical Solutions.{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-indigo-300">
                Better Connections.
              </span>
            </h2>

            <div className="space-y-3 text-xs sm:text-sm text-third leading-relaxed font-normal mb-6">
              <p>
                India&apos;s pre-owned vehicle market has always depended on
                relationships, local expertise and independent automobile
                consultants. But much of the industry still operates through
                fragmented networks, disconnected information and limited
                digital infrastructure.
              </p>
              <p>
                <strong className="text-primary font-semibold">Reecomm</strong> is
                building a digital marketplace that brings buyers, sellers and
                independent automobile consultants together.
              </p>
              <p>
                By combining vehicle discovery, digital storefronts, inventory
                management, direct enquiries and independent inspection
                services, we&apos;re working towards a more organised and
                transparent vehicle commerce ecosystem.
              </p>
              <p className="text-primary font-medium italic border-l-2 border-fourth pl-3 py-0.5">
                &ldquo;Our belief is simple: technology should create meaningful
                opportunities for businesses while helping people make more
                confident vehicle decisions.&rdquo;
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
              <Button
                variant="ghost"
                href="/introducing-reecomm"
                size="sm"
                showIcon={true}
                className="font-semibold shadow-sm text-xs sm:text-sm px-4 sm:px-5 py-2 sm:py-2.5"
              >
                Explore Reecomm Platform
              </Button>

              <Button
                variant="outlineSecondary"
                href="/aboutus"
                size="sm"
                className="border-white/20 text-primary hover:border-white/40 text-xs sm:text-sm px-4 sm:px-5 py-2 sm:py-2.5"
              >
                About Our Vision
              </Button>
            </div>
          </div>

          {/* Right Architecture Pillars Column - Black theme with clean border only */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
            {pillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/10 hover:border-white/20 transition-all duration-200"
                >
                  <div className="flex items-center gap-3 mb-1.5">
                    <div className="w-8 h-8 rounded-lg bg-fourth/10 border border-fourth/20 text-fourth flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4" />
                    </div>
                    <h3 className="text-sm font-bold text-primary font-[Montserrat]">
                      {pillar.title}
                    </h3>
                  </div>
                  <p className="text-xs text-third leading-relaxed pl-11">
                    {pillar.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
