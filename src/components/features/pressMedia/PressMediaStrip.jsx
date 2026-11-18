import React from "react";
import Image from "next/image";
import { Award, ExternalLink } from "lucide-react";
import { RECOGNISED_PUBLICATIONS } from "@/data/pressMediaData";
import Button from "@/components/ui/button";

export default function PressMediaStrip() {
  return (
    <section
      id="recognised-by"
      className="relative py-8 md:py-10 border-b border-white/10 bg-transparent"
      aria-label="Recognised by Media Publications"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1200px]">
        {/* Header content */}
        <div className="max-w-3xl mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-semibold tracking-widest uppercase text-fourth mb-2.5">
            <Award className="w-3.5 h-3.5" />
            <span>Recognised By</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-primary tracking-tight leading-tight mb-2 font-[Montserrat]">
            Our journey, featured by.
          </h2>
          <p className="text-xs sm:text-sm text-third leading-relaxed">
            We&apos;re glad to have our story and vision featured across
            India&apos;s startup and business media landscape.
          </p>
        </div>

        {/* Publications Grid - Black theme with border only */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
          {RECOGNISED_PUBLICATIONS.map((pub) => (
            <div
              key={pub.id}
              className="group relative rounded-2xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/10 hover:border-white/20 transition-all duration-300 flex flex-col justify-between overflow-hidden"
            >
              {/* Image Preview Container - Clean Unobstructed Banner Graphic */}
              <a
                href={pub.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block relative w-full aspect-[16/9] bg-black/60 overflow-hidden border-b border-white/10 cursor-pointer"
              >
                <Image
                  src={pub.image}
                  alt={`${pub.name} - ${pub.highlight}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </a>

              {/* Publication Details - Normal Flow Below Banner Image */}
              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                <div>
                  {/* Badges in Normal Flow Below Banner (Keeps banner graphic completely unobstructed) */}
                  <div className="flex items-center gap-2 mb-3">
                    {pub.id === "startup-times" ? (
                      <div className="flex items-center px-2.5 py-1 rounded-lg bg-black/90 border border-amber-500/40">
                        <span className="font-semibold text-xs tracking-tight font-[Montserrat] text-amber-400">
                          Startup<span className="text-white font-semibold">Times</span>
                        </span>
                      </div>
                    ) : (
                      <div className="flex items-center px-2.5 py-1 rounded-lg bg-black/90 border border-red-500/40">
                        <span className="font-semibold text-xs tracking-tight font-[Montserrat] text-white">
                          INC<span className="text-red-500 font-semibold">91</span>
                        </span>
                      </div>
                    )}
                    <span className="text-[11px] font-medium text-white/90 px-2 py-0.5 rounded bg-white/[0.05] border border-white/10">
                      {pub.badge}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-primary mb-1.5 font-[Montserrat]">
                    <a
                      href={pub.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cursor-pointer hover:text-fourth transition-colors"
                    >
                      {pub.highlight}
                    </a>
                  </h3>
                  <p className="text-xs sm:text-sm text-third leading-relaxed mb-4">
                    {pub.tagline}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                  <Button
                    variant="outlineSecondary"
                    href={pub.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    size="sm"
                    showIcon={true}
                    className="px-3.5 sm:px-4 py-1.5 sm:py-2 text-[11px] sm:text-xs font-semibold border-white/20 text-primary hover:border-fourth hover:text-fourth transition-all"
                  >
                    Read Story
                  </Button>

                  <span className="text-[11px] text-third/70 flex items-center gap-1">
                    <ExternalLink className="w-3 h-3" />
                    Original {pub.name}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
