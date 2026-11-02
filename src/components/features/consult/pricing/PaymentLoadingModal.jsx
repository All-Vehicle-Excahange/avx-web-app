"use client";

import React, { useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";
import { ShieldCheck, Lock, Sparkles, CheckCircle2 } from "lucide-react";

export default function PaymentLoadingModal({
  isOpen,
  title = "Connecting to Secure Gateway",
  subtitle = "Please wait while we initialize your Razorpay checkout. Do not refresh or close this page.",
  tierName,
  planPrice,
  yearly,
  isActivation = false,
}) {
  const modalRef = useRef(null);
  const [stepIndex, setStepIndex] = useState(0);

  const steps = isActivation
    ? [
        "Verifying redeem credentials...",
        "Allocating Free Tier benefits...",
        "Activating consultation profile...",
        "Preparing KYC onboarding...",
      ]
    : [
        "Establishing secure connection...",
        "Validating plan details with Razorpay...",
        "Generating encrypted payment token...",
        "Launching checkout gateway...",
      ];

  // Rotate through steps every 750ms for high-tech feedback
  useEffect(() => {
    if (!isOpen) return;

    const interval = setInterval(() => {
      setStepIndex((prev) => (prev + 1) % steps.length);
    }, 750);

    return () => {
      clearInterval(interval);
      setStepIndex(0);
    };
  }, [isOpen, steps.length]);

  // Prevent background scroll while initializing
  useEffect(() => {
    if (!isOpen) return;

    const preventScroll = (e) => {
      if (e.cancelable) {
        e.preventDefault();
      }
    };

    window.addEventListener("wheel", preventScroll, { passive: false, capture: true });
    window.addEventListener("touchmove", preventScroll, { passive: false, capture: true });
    document.addEventListener("wheel", preventScroll, { passive: false, capture: true });
    document.addEventListener("touchmove", preventScroll, { passive: false, capture: true });

    return () => {
      window.removeEventListener("wheel", preventScroll, { capture: true });
      window.removeEventListener("touchmove", preventScroll, { capture: true });
      document.removeEventListener("wheel", preventScroll, { capture: true });
      document.removeEventListener("touchmove", preventScroll, { capture: true });
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const content = (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 font-secondary animate-in fade-in duration-200"
      style={{ zIndex: 999999 }}
      onWheel={(e) => e.preventDefault()}
      onTouchMove={(e) => e.preventDefault()}
    >
      <div
        ref={modalRef}
        className="relative flex flex-col items-center text-center w-full max-w-[420px] overflow-hidden rounded-3xl shadow-2xl bg-[#121212] border border-white/10 p-7 sm:p-8 text-white animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* AMBIENT BACKGROUND GLOWS */}
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-60 h-32 bg-[#007bff]/25 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 right-0 w-48 h-32 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />

        {/* FULLY ANIMATED PAYMENT / ACTIVATION VISUAL CONTAINER */}
        <div className="relative w-44 h-44 flex items-center justify-center my-2 select-none pointer-events-none">
          {/* TRIPLE CONCENTRIC RADAR RINGS */}
          <div className="absolute inset-0 rounded-full border border-[#007bff]/20 animate-radar-1" />
          <div className="absolute inset-3 rounded-full border border-[#007bff]/30 animate-radar-2" />
          <div className="absolute inset-6 rounded-full border border-cyan-400/25 animate-radar-3" />

          {/* DUAL ORBITAL RINGS WITH ROTATING ENERGY NODES */}
          <div className="absolute inset-4 rounded-full border border-dashed border-[#007bff]/40 animate-orbit-cw">
            <span className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-[#007bff] shadow-lg shadow-[#007bff] ring-2 ring-white/50" />
            <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-cyan-400 shadow-md shadow-cyan-400" />
          </div>

          <div className="absolute inset-8 rounded-full border border-dotted border-white/20 animate-orbit-ccw">
            <span className="absolute top-1/2 -right-1.5 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-cyan-300 shadow-md shadow-cyan-300" />
          </div>

          {/* CENTRAL 3D-STYLED GLOWING PAYMENT CARD WITH SCANNING LASER */}
          <div className="relative z-10 w-24 h-16 rounded-xl bg-linear-to-br from-[#1a1f2c] via-[#10141f] to-[#0c0f17] border border-white/20 shadow-xl shadow-black/80 flex flex-col justify-between p-2 overflow-hidden animate-card-float">
            {/* LASER SCAN LINE */}
            <div className="absolute inset-x-0 h-0.5 bg-linear-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_8px_#38bdf8] animate-laser-scan pointer-events-none" />

            {/* CARD TOP: CHIP & CONTACTLESS WAVE */}
            <div className="flex items-center justify-between">
              {/* EMV CHIP */}
              <div className="w-4 h-3 rounded-sm bg-linear-to-br from-amber-300 via-yellow-400 to-amber-600 border border-yellow-200/50 shadow-xs relative overflow-hidden">
                <div className="absolute inset-0 bg-white/20 animate-pulse" />
              </div>

              {/* WIRELESS WAVES */}
              <div className="flex items-center gap-0.5 opacity-70">
                <span className="w-1 h-2 rounded-full border-r-2 border-white/60" />
                <span className="w-1.5 h-3 rounded-full border-r-2 border-white/60" />
              </div>
            </div>

            {/* CARD BOTTOM: BRAND DOTS & EMBOSSED NUMBER MOCK */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <span className="w-1 h-1 rounded-full bg-white/50" />
                <span className="w-1 h-1 rounded-full bg-white/50" />
                <span className="w-1 h-1 rounded-full bg-white/50" />
                <span className="text-[7px] font-mono text-zinc-400 font-semibold tracking-wider">
                  {isActivation ? "FREE" : "PRO"}
                </span>
              </div>
              <div className="flex -space-x-1">
                <span className="w-2.5 h-2.5 rounded-full bg-[#007bff]/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400/80" />
              </div>
            </div>

            {/* SECURITY SHIELD CORNER BADGE */}
            <div className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-emerald-500/90 border border-white/40 shadow-md flex items-center justify-center">
              <Lock className="w-2.5 h-2.5 text-white" />
            </div>
          </div>
        </div>

        {/* HEADING */}
        <h3 className="text-xl font-bold text-white tracking-tight mt-1">
          {title}
        </h3>

        {/* PLAN DETAILS BADGE */}
        {tierName && (
          <div className="mt-2.5 inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs text-zinc-300 backdrop-blur-md">
            <span className="font-bold text-white uppercase tracking-wider text-[11px]">
              {tierName} Plan
            </span>
            {planPrice && (
              <>
                <span className="text-zinc-600">•</span>
                <span className="text-[#007bff] font-extrabold">
                  ₹{typeof planPrice === "number" || !isNaN(Number(planPrice))
                    ? Number(planPrice).toLocaleString("en-IN")
                    : planPrice}
                </span>
                <span className="text-zinc-400 text-[10px]">/{yearly ? "yr" : "mo"}</span>
              </>
            )}
            {isActivation && (
              <>
                <span className="text-zinc-600">•</span>
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <CheckCircle2 size={11} /> 100% Free
                </span>
              </>
            )}
          </div>
        )}

        {/* SUBTITLE */}
        <p className="text-xs text-zinc-400 mt-3 leading-relaxed max-w-[320px]">
          {subtitle}
        </p>

        {/* LIVE STEP TICKER */}
        <div className="mt-4 px-3 py-1.5 rounded-lg bg-[#007bff]/10 border border-[#007bff]/20 flex items-center justify-center gap-2 text-xs text-cyan-300 font-medium">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping shrink-0" />
          <span className="animate-in fade-in duration-300">{steps[stepIndex]}</span>
        </div>

        {/* SHIMMERING HORIZONTAL SCAN BAR */}
        <div className="w-full bg-white/[0.06] h-1.5 rounded-full mt-4 overflow-hidden relative">
          <div
            className="h-full bg-linear-to-r from-transparent via-[#007bff] to-cyan-300 rounded-full w-2/5"
            style={{
              animation: "shimmerSlide 1.5s ease-in-out infinite",
            }}
          />
        </div>

        {/* TRUST BADGE FOOTER */}
        <div className="mt-6 pt-4 border-t border-white/10 w-full flex items-center justify-center gap-3 text-[11px] text-zinc-400 font-medium">
          <span className="flex items-center gap-1 text-zinc-300">
            <ShieldCheck size={13} className="text-emerald-400" />
            <span>256-Bit SSL Encrypted</span>
          </span>
          <span className="text-zinc-700">•</span>
          <span className="flex items-center gap-1 text-zinc-300">
            <Sparkles size={11} className="text-[#007bff]" />
            <span>{isActivation ? "Instant Activation" : "Razorpay Secure"}</span>
          </span>
        </div>
      </div>

      <style jsx global>{`
        @keyframes radarPing {
          0% {
            transform: scale(0.85);
            opacity: 0.8;
          }
          100% {
            transform: scale(1.15);
            opacity: 0;
          }
        }
        @keyframes orbitCw {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes orbitCcw {
          from {
            transform: rotate(360deg);
          }
          to {
            transform: rotate(0deg);
          }
        }
        @keyframes laserScan {
          0% {
            top: 0%;
            opacity: 0.3;
          }
          50% {
            top: 95%;
            opacity: 1;
          }
          100% {
            top: 0%;
            opacity: 0.3;
          }
        }
        @keyframes cardFloat {
          0%, 100% {
            transform: translateY(0px) rotate(-2deg);
          }
          50% {
            transform: translateY(-4px) rotate(2deg);
          }
        }
        @keyframes shimmerSlide {
          0% {
            transform: translateX(-100%);
          }
          50% {
            transform: translateX(120%);
          }
          100% {
            transform: translateX(250%);
          }
        }
        .animate-radar-1 {
          animation: radarPing 2.4s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
        .animate-radar-2 {
          animation: radarPing 2.4s cubic-bezier(0, 0, 0.2, 1) 0.8s infinite;
        }
        .animate-radar-3 {
          animation: radarPing 2.4s cubic-bezier(0, 0, 0.2, 1) 1.6s infinite;
        }
        .animate-orbit-cw {
          animation: orbitCw 4s linear infinite;
        }
        .animate-orbit-ccw {
          animation: orbitCcw 6s linear infinite;
        }
        .animate-laser-scan {
          animation: laserScan 2s ease-in-out infinite;
        }
        .animate-card-float {
          animation: cardFloat 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );

  return typeof document !== "undefined" ? createPortal(content, document.body) : null;
}
