"use client";

import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { Crown } from "lucide-react";
import Image from "next/image";
import Button from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function UpgradeTierPopup({ isOpen }) {
  const { back, push } = useRouter();

  // Auto-lock body scroll when popup is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const modalContent = (
    <div className="fixed inset-0 z-9999 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-[fadeIn_0.25s_ease-out]">
      <div className="relative flex w-full max-w-[850px] overflow-hidden rounded-2xl shadow-2xl bg-secondary border border-white/10 animate-[scaleUp_0.3s_ease-out]">
        {/* LEFT IMAGE SIDE */}
        <div className="hidden md:block w-5/12 relative min-h-[420px]">
          <Image
            src="/cs.webp"
            priority
            alt="Boost Visibility"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/45 to-transparent" />
          <div className="absolute bottom-8 left-8 right-6 space-y-2">
            <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest bg-amber-400/10 px-2.5 py-1 rounded-full border border-amber-400/20">
              Premium Feature
            </span>
            <h2 className="text-3xl font-extrabold text-white leading-tight">
              Boost Your
              <br />
              Sales & Leads
            </h2>
            <p className="text-xs text-zinc-300 leading-relaxed">
              Unlock targeted ads, priority positioning, and advanced dashboard
              analytics.
            </p>
          </div>
        </div>

        {/* RIGHT CONTENT SIDE */}
        <div className="w-full md:w-7/12 p-8 sm:p-10 md:p-12 bg-secondary flex flex-col justify-center items-start text-left space-y-6">
          <div className="space-y-4 w-full">
            <div className="w-12 h-12 rounded-xl bg-amber-400/10 flex items-center justify-center text-amber-400 border border-amber-400/20 shadow-[0_0_15px_rgba(245,158,11,0.1)]">
              <Crown size={24} className="animate-pulse" />
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-primary">
                Upgrade to Pro or Premium
              </h3>
              <p className="text-sm text-third leading-relaxed">
                PPC & Visibility Boost campaigns are exclusive features for Pro
                and Premium tier consultants. Upgrade your plan now to access
                ads, bump features, and increase listing exposure.
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="w-full pt-2 flex flex-col sm:flex-row gap-3">
            <Button
              onClick={() => {
                back();
              }}
              variant="outlineSecondary"
              full
              className="py-3 font-semibold tracking-wide cursor-pointer order-2 sm:order-1"
            >
              Back
            </Button>
            <Button
              onClick={() => {
                push("/consult/dashboard/billing");
              }}
              variant="ghost"
              full
              className="py-3 font-semibold tracking-wide shadow-lg cursor-pointer order-1 sm:order-2"
            >
              Update Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  return typeof document !== "undefined"
    ? createPortal(modalContent, document.body)
    : null;
}
