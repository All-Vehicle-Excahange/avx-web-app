"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Compass, Sparkles, Newspaper, ShieldCheck } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import Button from "@/components/ui/button";

import "swiper/css";
import "swiper/css/effect-fade";

const HERO_SLIDES = [
  {
    id: "startup-times",
    title: "Anas Loriya's Entrepreneurial Journey",
    publication: "Startup Times",
    tag: "Founder Story",
    image: "/images/press/startup-times-feature.webp",
    url: "https://startuptimes.net/anas-loriyas-entrepreneurial-journey-building-reecomm-around-real-problems-in-the-used-vehicle-market",
    badgeLabel: "StartupTimes",
    highlight: "Founder Story Feature",
  },
  {
    id: "inc91",
    title: "Building a Digital Marketplace for Automobile Consultants",
    publication: "INC91",
    tag: "Marketplace Innovation",
    image: "/images/press/inc91-feature.webp",
    url: "https://www.inc91.com/reecomm-is-building-a-digital-marketplace-around-indias-independent-automobile-consultants",
    badgeLabel: "INC91",
    highlight: "Marketplace Innovation",
  },
];

export default function PressHero() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [swiperInstance, setSwiperInstance] = useState(null);

  return (
    <section
      id="hero"
      className="relative pt-[76px] pb-6 sm:pt-20 sm:pb-8 md:pt-20 md:pb-8 overflow-hidden border-b border-white/10"
      aria-label="Reecomm Newsroom Hero"
    >
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-[1200px]">
        {/* Main 2-Column Hero: Left Editorial + Right Unique Auto-Swipe Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center mb-6">
          {/* Left Column: Heading & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start">
            {/* Eyebrow badge */}
            <div className="flex items-center gap-3 mb-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-semibold tracking-wider uppercase text-third">
                <span className="w-2 h-2 rounded-full bg-fourth animate-pulse" />
                <span>The Reecomm Newsroom</span>
              </div>
              <span className="hidden sm:inline-flex items-center gap-1.5 text-xs text-third/70 border-l border-white/15 pl-3">
                <Newspaper className="w-3.5 h-3.5 text-fourth" />
                Official Press &amp; Media Hub
              </span>
            </div>

            {/* H1 Heading */}
            <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold tracking-tight text-primary leading-[1.15] mb-3 font-[Montserrat]">
              The stories shaping the future of{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-indigo-300">
                vehicle commerce.
              </span>
            </h1>

            {/* Description */}
            <p className="text-sm sm:text-base text-third leading-relaxed font-normal max-w-xl mb-5">
              From our founder&apos;s journey to the ideas transforming India&apos;s
              used-vehicle market, explore the stories, conversations and milestones
              that are shaping Reecomm.
            </p>

            {/* Dual CTAs using standard common Button - Responsive size="sm" */}
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
              <Button
                variant="ghost"
                href="#coverage"
                size="sm"
                showIcon={true}
                className="font-semibold shadow-md shadow-white/5 hover:shadow-lg hover:shadow-white/15 transition-all duration-300 text-xs sm:text-sm px-4 sm:px-5 py-2 sm:py-2.5"
              >
                Explore Media Coverage
              </Button>

              <Button
                variant="outlineSecondary"
                href="#brand-story"
                size="sm"
                className="border-white/20 text-primary hover:border-white/40 text-xs sm:text-sm px-4 sm:px-5 py-2 sm:py-2.5"
              >
                <Compass className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1 text-fourth" />
                Discover Our Journey
              </Button>
            </div>
          </div>

          {/* Right Column: Clean Auto-Swiping Banner Only (No Border, No Blue Shadow/Blur) */}
          <div className="lg:col-span-5 relative flex flex-col items-center justify-center">
            <div className="relative w-full max-w-md lg:max-w-none rounded-2xl overflow-hidden shadow-2xl">
              <Swiper
                modules={[Autoplay, EffectFade]}
                effect="fade"
                fadeEffect={{ crossFade: true }}
                autoplay={{ delay: 3500, disableOnInteraction: false }}
                loop={true}
                speed={600}
                allowTouchMove={true}
                onSwiper={setSwiperInstance}
                onSlideChange={(swiper) => setActiveSlide(swiper.realIndex)}
                className="w-full rounded-2xl overflow-hidden"
              >
                {HERO_SLIDES.map((slide) => (
                  <SwiperSlide key={slide.id}>
                    <a
                      href={slide.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block relative w-full aspect-[16/9] overflow-hidden rounded-2xl cursor-pointer"
                    >
                      <Image
                        src={slide.image}
                        alt={`${slide.publication} - ${slide.title}`}
                        fill
                        className="object-contain rounded-2xl"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 45vw, 460px"
                        priority
                      />
                    </a>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            {/* Subtle Minimal Slide Dots */}
            <div className="flex items-center justify-center gap-1.5 mt-3">
              {HERO_SLIDES.map((slide, idx) => (
                <button
                  key={slide.id}
                  type="button"
                  onClick={() => swiperInstance?.slideToLoop(idx)}
                  aria-label={`Slide to ${slide.publication}`}
                  className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                    activeSlide === idx
                      ? "w-5 bg-white"
                      : "w-1.5 bg-white/30 hover:bg-white/60"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Highlight strip cards - Black Theme with clean border */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3 pt-4 sm:pt-5 border-t border-white/10">
          <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white/[0.02] border border-white/10 hover:border-white/20 transition-colors">
            <div className="p-2 rounded-lg bg-fourth/10 text-fourth shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="text-sm font-semibold text-primary">Independent Coverage</div>
              <div className="text-xs text-third mt-0.5">Featured in Startup Times &amp; INC91</div>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white/[0.02] border border-white/10 hover:border-white/20 transition-colors">
            <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <div className="text-sm font-semibold text-primary">Founder Led Journey</div>
              <div className="text-xs text-third mt-0.5">Anas Loriya&apos;s vision for pre-owned trust</div>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white/[0.02] border border-white/10 hover:border-white/20 transition-colors">
            <div className="p-2 rounded-lg bg-sky-500/10 text-sky-400 shrink-0">
              <Newspaper className="w-4 h-4" />
            </div>
            <div>
              <div className="text-sm font-semibold text-primary">Editorial Newsroom</div>
              <div className="text-xs text-third mt-0.5">Official releases, interviews &amp; press</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
