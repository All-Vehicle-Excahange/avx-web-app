"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Download,
  Sparkles,
  Share2,
  Calendar,
  Clock,
} from "lucide-react";

import Button from "@/components/ui/button";

export default function LaunchHero() {
  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center bg-transparent text-primary pt-16 pb-16 border-b border-white/10">
      <div className="relative z-10 max-w-[1200px] mx-auto px-6 w-full">
        {/* Newsroom Top Category & Byline */}
        <div className="mb-6">
          <h1 className="text-3xl sm:text-5xl lg:text-[58px] font-extrabold tracking-tight leading-[1.1] mt-4 mb-4 font-[Montserrat] text-primary">
            2026 Summer Release: Introducing Reecomm
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs text-third font-medium border-b border-white/10 pb-6 mb-8">
            <span>
              By{" "}
              <strong className="text-primary font-semibold">
                Reecomm Newsroom
              </strong>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-fourth" /> May 13, 2026
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-fourth" /> 8 min read
            </span>
            <div className="ml-auto flex items-center gap-2">
              <button className="p-1.5 rounded-full bg-white/5 border border-white/10 hover:border-fourth transition-colors text-third hover:text-primary">
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Intro Paragraph */}
        <div className="max-w-[860px] text-lg sm:text-xl text-third leading-relaxed mb-10 font-normal">
          <p className="mb-4">
            Today we are introducing{" "}
            <strong className="text-primary font-semibold">Reecomm</strong> —
            India&apos;s trusted used vehicle marketplace where buyers, sellers,
            consultants, and inspectors seamlessly come together on Web,
            Android, and iOS.
          </p>
          <p className="text-base text-third/80">
            Buy smarter. Sell fairly. Grow digitally. Designed from the ground
            up to bring transparent infrastructure to pre-owned cars and bikes
            across India.
          </p>
        </div>

        {/* Sticky Image Display (Natural Aspect Ratio - No Cropping) */}
        <div className="sticky top-24 flex justify-center mb-10 z-20">
          <div className="relative w-full max-w-[340px] sm:max-w-[400px] md:max-w-[440px] rounded-2xl overflow-hidden shadow-2xl transition-transform hover:scale-[1.01]">
            <Image
              src="/Chat-crop.webp"
              alt="Reecomm Mobile App Interface"
              width={800}
              height={1600}
              className="w-full h-auto object-contain rounded-2xl"
              priority
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-4">
          <Button variant="ghost" href="/search" size="md">
            Explore Marketplace
          </Button>

          <Button variant="outlineSecondary" href="/download" size="md">
            <Download className="w-4 h-4 mr-1 text-[#2F80FF]" />
            Download App
          </Button>
        </div>
      </div>
    </section>
  );
}
