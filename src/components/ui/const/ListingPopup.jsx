"use client";

import React, { useEffect, useState, useCallback, useRef } from "react";
import { createPortal } from "react-dom";
import { X, Car } from "lucide-react";
import Image from "next/image";
import useEscapeKey from "@/hooks/useEscapeKey";

/* SVG Logos */
const GooglePlayLogo = () => (
  <div className="mr-2.5 sm:mr-3 shrink-0">
    <svg viewBox="30 336.7 120.9 129.2" className="w-5 sm:w-[25px]">
      <path
        fill="#FFD400"
        d="M119.2,421.2c15.3-8.4,27-14.8,28-15.3c3.2-1.7,6.5-6.2,0-9.7  c-2.1-1.1-13.4-7.3-28-15.3l-20.1,20.2L119.2,421.2z"
      ></path>
      <path
        fill="#FF3333"
        d="M99.1,401.1l-64.2,64.7c1.5,0.2,3.2-0.2,5.2-1.3  c4.2-2.3,48.8-26.7,79.1-43.3L99.1,401.1L99.1,401.1z"
      ></path>
      <path
        fill="#48FF48"
        d="M99.1,401.1l20.1-20.2c0,0-74.6-40.7-79.1-43.1  c-1.7-1-3.6-1.3-5.3-1L99.1,401.1z"
      ></path>
      <path
        fill="#3BCCFF"
        d="M99.1,401.1l-64.3-64.3c-2.6,0.6-4.8,2.9-4.8,7.6  c0,7.5,0,107.5,0,113.8c0,4.3,1.7,7.4,4.9,7.7L99.1,401.1z"
      ></path>
    </svg>
  </div>
);

const AppStoreLogo = () => (
  <div className="mr-2.5 sm:mr-3 shrink-0">
    <svg viewBox="0 0 384 512" className="w-[18px] sm:w-[23px]">
      <path
        fill="currentColor"
        d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"
      ></path>
    </svg>
  </div>
);

export default function ListingPopup({ isOpen, onClose }) {
  const [isClosing, setIsClosing] = useState(false);
  const modalRef = useRef(null);

  const handleClose = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 150);
  }, [onClose]);

  useEscapeKey(isOpen, handleClose);

  // Prevent background scroll without layout shifts
  useEffect(() => {
    if (!isOpen) return;

    const preventBackgroundScroll = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        if (e.cancelable) {
          e.preventDefault();
        }
      }
    };

    window.addEventListener("wheel", preventBackgroundScroll, { passive: false, capture: true });
    window.addEventListener("touchmove", preventBackgroundScroll, { passive: false, capture: true });
    document.addEventListener("wheel", preventBackgroundScroll, { passive: false, capture: true });
    document.addEventListener("touchmove", preventBackgroundScroll, { passive: false, capture: true });

    return () => {
      window.removeEventListener("wheel", preventBackgroundScroll, { capture: true });
      window.removeEventListener("touchmove", preventBackgroundScroll, { capture: true });
      document.removeEventListener("wheel", preventBackgroundScroll, { capture: true });
      document.removeEventListener("touchmove", preventBackgroundScroll, { capture: true });
    };
  }, [isOpen]);

  if (!isOpen && !isClosing) return null;

  const modalContent = (
    <div
      className="fixed inset-0 z-9999 flex items-center justify-center bg-black/60 backdrop-blur-sm p-3 sm:p-4 overscroll-contain font-secondary"
      onClick={handleClose}
      onWheel={(e) => {
        if (!modalRef.current || !modalRef.current.contains(e.target)) {
          e.preventDefault();
        }
      }}
      onTouchMove={(e) => {
        if (!modalRef.current || !modalRef.current.contains(e.target)) {
          e.preventDefault();
        }
      }}
      style={{
        animation: isClosing
          ? "modalBackdropOut 0.15s ease-in forwards"
          : "modalBackdropIn 0.15s ease-out",
      }}
    >
      {/* CONTAINER */}
      <div
        ref={modalRef}
        className="relative flex w-full max-w-[820px] min-h-auto md:min-h-[380px] max-h-[94vh] overflow-hidden rounded-2xl shadow-2xl bg-secondary border border-third/15 overscroll-contain font-secondary"
        onClick={(e) => e.stopPropagation()}
        style={{
          animation: isClosing
            ? "modalCardOut 0.15s ease-in forwards"
            : "modalCardIn 0.15s ease-out",
        }}
      >
        {/* CLOSE BUTTON */}
        <button
          onClick={handleClose}
          aria-label="Close"
          className="absolute bg-white/10 hover:bg-white/25 text-white cursor-pointer top-3 right-3 sm:top-4 sm:right-4 z-20 p-1.5 rounded-full transition-all duration-200 border border-white/10"
        >
          <X size={16} />
        </button>

        {/* LEFT IMAGE */}
        <div className="hidden md:block w-5/12 relative bg-black shrink-0">
          <Image
            src="/auth-image-2.webp"
            priority
            alt="Seller Listing"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/25 to-black/80" />

          <div className="absolute bottom-8 right-6 z-10 flex flex-col items-end text-right">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-8 h-8 bg-fourth rounded-full flex items-center justify-center">
                <Car className="text-white" size={16} />
              </div>
              <h3 className="text-xl font-bold text-white">List Vehicle</h3>
            </div>
            <p className="text-white/90 text-xs max-w-[200px] mb-2 leading-snug">
              Adding details & photos is faster and easier from your phone.
            </p>
            <div className="w-7 h-[2.5px] bg-fourth rounded-full"></div>
          </div>

          {/* Swiper Indicators Dot simulation */}
          <div className="absolute bottom-4 right-6 flex gap-1.5 z-10">
            <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
            <span className="w-1.5 h-1.5 rounded-full bg-fourth" />
          </div>
        </div>

        {/* RIGHT CONTENT */}
        <div className="w-full md:w-7/12 p-4 sm:p-5 md:p-6 lg:p-7 flex flex-col justify-center gap-3 sm:gap-4 relative bg-secondary">
          <div className="space-y-1.5 pr-8 sm:pr-6">
            {/* HEADLINE */}
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-primary leading-snug text-left">
              Listing your vehicle happens in the app
            </h3>

            {/* BODY */}
            <p className="text-third text-xs sm:text-[13px] leading-relaxed text-left opacity-90">
              Adding photos, vehicle details, and documents is faster and easier from your phone — and lets you manage your listing on the go.
            </p>
          </div>

          {/* MIDDLE SECTION (QR CODES IN ONE LINE + APP BUTTONS IN ONE LINE) */}
          <div className="flex flex-col items-center gap-3.5 sm:gap-4 w-full">
            {/* QR Codes Container in ONE SINGLE ROW */}
            <div className="flex flex-row items-center justify-center gap-5 sm:gap-6 p-3 sm:p-4 rounded-2xl bg-white/[0.04] border border-white/10 shadow-inner w-full sm:w-auto">
              {/* Android QR */}
              <div className="flex flex-col items-center gap-1.5">
                <div className="p-2 bg-white rounded-xl shadow-md flex items-center justify-center shrink-0">
                  <Image
                    src="/app-qr.webp"
                    alt="Android App QR Code"
                    width={80}
                    height={80}
                    className="w-[72px] h-[72px] sm:w-[80px] sm:h-[80px] object-contain"
                  />
                </div>
                <span className="text-[11px] sm:text-xs font-bold text-third uppercase tracking-wider">
                  Android
                </span>
              </div>
              
              {/* iOS QR */}
              <div className="flex flex-col items-center gap-1.5">
                <div className="p-2 bg-white rounded-xl shadow-md flex items-center justify-center shrink-0">
                  <Image
                    src="/ios-qr.webp"
                    alt="iOS App QR Code"
                    width={80}
                    height={80}
                    className="w-[72px] h-[72px] sm:w-[80px] sm:h-[80px] object-contain"
                  />
                </div>
                <span className="text-[11px] sm:text-xs font-bold text-third uppercase tracking-wider">
                  iOS
                </span>
              </div>

              {/* Text instructions */}
              <span className="hidden md:block text-[11px] sm:text-xs font-semibold text-third uppercase tracking-wider text-left leading-snug max-w-[110px] pl-3 border-l border-white/10">
                Scan to start your listing
              </span>
            </div>

            {/* Play Store & App Store Buttons in ONE SINGLE ROW */}
            <div className="flex flex-row items-center justify-center gap-2 sm:gap-3 w-full">
              {/* Google Play Button */}
              <button
                type="button"
                onClick={() => {
                  window.open("https://play.google.com/store/apps/details?id=com.reecomm.vehicle.marketplace&pcampaignid=web_share", "_blank");
                }}
                className="flex-1 min-w-0 h-[42px] sm:h-[46px] px-2.5 sm:px-4 flex items-center justify-center bg-white text-zinc-950 hover:bg-transparent hover:text-white transition-all duration-300 rounded-lg cursor-pointer border border-transparent hover:border-white/30 shadow-md"
              >
                <GooglePlayLogo />
                <div className="text-left shrink-0">
                  <div className="text-[8px] sm:text-[9px] font-bold uppercase tracking-tight">GET IT ON</div>
                  <div className="text-xs sm:text-sm md:text-base font-semibold leading-none">
                    Google Play
                  </div>
                </div>
              </button>

              {/* App Store Button */}
              <button
                type="button"
                onClick={() => {
                  window.open("https://apps.apple.com/in/app/reecomm/id6789502528", "_blank");
                }}
                className="flex-1 min-w-0 h-[42px] sm:h-[46px] px-2.5 sm:px-4 flex items-center justify-center bg-white text-zinc-950 hover:bg-transparent hover:text-white transition-all duration-300 rounded-lg cursor-pointer border border-transparent hover:border-white/30 shadow-md"
              >
                <AppStoreLogo />
                <div className="text-left shrink-0">
                  <div className="text-[8px] sm:text-[9px] font-bold uppercase tracking-tight">Download on the</div>
                  <div className="text-xs sm:text-sm md:text-base font-semibold leading-none">
                    App Store
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return typeof document !== "undefined"
    ? createPortal(modalContent, document.body)
    : null;
}

