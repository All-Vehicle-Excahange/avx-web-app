import React from "react";
import {
  Linkedin,
  Instagram,
  Sparkles,
  Share2,
  Users,
  Cpu,
} from "lucide-react";
import { SOCIAL_UPDATES } from "@/data/pressMediaData";
import Button from "@/components/ui/button";

export default function PressSocialSection() {
  return (
    <section
      id="social"
      className="relative py-8 md:py-10 border-b border-white/10 bg-transparent"
      aria-label="Beyond The Headlines"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1200px]">
        {/* Header */}
        <div className="max-w-3xl mb-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-semibold tracking-widest uppercase text-fourth mb-2.5">
            <Share2 className="w-3.5 h-3.5" />
            <span>Beyond The Headlines</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-primary tracking-tight leading-tight mb-2 font-[Montserrat]">
            More Than Just Stories. It&apos;s Our Journey.
          </h2>
          <p className="text-xs sm:text-sm text-third leading-relaxed">
            From product developments and company milestones to the people and
            businesses within our ecosystem, follow Reecomm as we continue
            building.
          </p>
        </div>

        {/* Social & Update Cards Grid - Black Theme with Clean Border */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {SOCIAL_UPDATES.map((card) => {
            const isExternal = card.url.startsWith("http");

            return (
              <div
                key={card.id}
                className="group relative flex flex-col justify-between p-4 sm:p-5 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/10 hover:border-white/20 transition-all duration-300"
              >
                <div>
                  {/* Platform / Type pill */}
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${card.accent}`}
                    >
                      {card.platform === "LinkedIn" && (
                        <Linkedin className="w-3 h-3" />
                      )}
                      {card.platform === "Instagram" && (
                        <Instagram className="w-3 h-3" />
                      )}
                      {card.platform === "Leadership" && (
                        <Sparkles className="w-3 h-3" />
                      )}
                      {card.platform === "Product" && (
                        <Cpu className="w-3 h-3" />
                      )}
                      <span>{card.type}</span>
                    </span>

                    <span className="text-[10px] font-medium text-third/60">
                      {card.platform}
                    </span>
                  </div>

                  <h3 className="text-sm sm:text-base font-bold text-primary mb-1.5 font-[Montserrat]">
                    <a
                      href={card.url}
                      target={isExternal ? "_blank" : undefined}
                      rel={isExternal ? "noopener noreferrer" : undefined}
                      className="cursor-pointer hover:text-fourth transition-colors"
                    >
                      {card.title}
                    </a>
                  </h3>

                  <p className="text-xs text-third leading-relaxed mb-4">
                    {card.description}
                  </p>
                </div>

                {/* Card Action Button with proper padding */}
                <div className="pt-3 border-t border-white/10">
                  <Button
                    variant="outlineSecondary"
                    href={card.url}
                    target={isExternal ? "_blank" : undefined}
                    rel={isExternal ? "noopener noreferrer" : undefined}
                    size="sm"
                    showIcon={true}
                    className="px-3.5 sm:px-4 py-1.5 sm:py-2 text-[11px] sm:text-xs font-semibold border-white/20 text-primary hover:border-fourth hover:text-fourth transition-all"
                  >
                    {card.actionText}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Global Social Follow Strip */}
        <div className="mt-5 p-4 sm:p-5 rounded-xl bg-white/[0.02] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <div className="w-10 h-10 rounded-xl bg-fourth/10 border border-fourth/20 text-fourth flex items-center justify-center shrink-0">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-primary font-[Montserrat]">
                Follow Reecomm Across Verified Channels
              </div>
              <div className="text-xs text-third">
                Real-time updates, hiring announcements, and product notes.
              </div>
            </div>
          </div>

          {/* Clean Icon-Only Buttons matching official Footer links */}
          <div className="flex items-center gap-3">
            <Button
              variant="roundedOutline"
              href="https://www.linkedin.com/company/reecomm"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow Reecomm on LinkedIn"
              className="border-[#0A66C2]/40 bg-[#0A66C2]/10 text-[#0A66C2] hover:bg-[#0A66C2] hover:text-white hover:border-[#0A66C2] transition-all duration-300"
            >
              <Linkedin className="w-4 h-4" />
            </Button>

            <Button
              variant="roundedOutline"
              href="https://www.instagram.com/reecommindia"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow Reecomm on Instagram"
              className="border-pink-500/40 bg-pink-500/10 text-pink-400 hover:bg-gradient-to-tr hover:from-amber-500 hover:via-pink-500 hover:to-purple-600 hover:text-white hover:border-transparent transition-all duration-300"
            >
              <Instagram className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
