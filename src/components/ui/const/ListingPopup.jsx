"use client";

import React, { useEffect, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import { X, Car } from "lucide-react";
import Image from "next/image";

/* SVG Logos */
const GooglePlayLogo = () => (
  <svg viewBox="30 336.7 120.9 129.2" className="w-[22px] h-[22px] mr-2.5 shrink-0">
    <path fill="#FFD400" d="M119.2,421.2c15.3-8.4,27-14.8,28-15.3c3.2-1.7,6.5-6.2,0-9.7 c-2.1-1.1-13.4-7.3-28-15.3l-20.1,20.2L119.2,421.2z"></path>
    <path fill="#FF3333" d="M99.1,401.1l-64.2,64.7c1.5,0.2,3.2-0.2,5.2-1.3 c4.2-2.3,48.8-26.7,79.1-43.3L99.1,401.1L99.1,401.1z"></path>
    <path fill="#48FF48" d="M99.1,401.1l20.1-20.2c0,0-74.6-40.7-79.1-43.1 c-1.7-1-3.6-1.3-5.3-1L99.1,401.1z"></path>
    <path fill="#3BCCFF" d="M99.1,401.1l-64.3-64.3c-2.6,0.6-4.8,2.9-4.8,7.6 c0,7.5,0,107.5,0,113.8c0,4.3,1.7,7.4,4.9,7.7L99.1,401.1z"></path>
  </svg>
);

const AppStoreLogo = () => (
  <svg viewBox="0 0 384 512" fill="currentColor" className="w-5 h-5 mr-2.5 shrink-0">
    <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
  </svg>
);

/* Vector Mock QR Code (High-Density & Clean 29x29 Scanner Representation) */
const QR_MATRIX = [
  "11111110100100110101001111111",
  "10000010110111010010001000001",
  "10111010001101000110101011101",
  "10111010111010001100001011101",
  "10111010101001011011101011101",
  "10000010010111100010011000001",
  "11111110101010101010101111111",
  "00000000111010001101100000000",
  "11011110001011101001111001010",
  "10010001110101100100100010101",
  "01110100101100111010001101110",
  "10010110100101010111010010001",
  "01001101101000010001001011101",
  "11100101110011100111001001011",
  "00101010011100111011011100010",
  "10110010100101001101000110100",
  "01101110110110101101100111011",
  "10010010010010110101001010001",
  "00000000101001100101110101100",
  "11111110010100110011101111011",
  "10000010111011011101010101110",
  "10111010011000100011010100101",
  "10111010101111011101100011010",
  "10111010001001000110111011001",
  "10000010111000011110010010110",
  "11111110010101010111010110010",
  "00000000110110110010101001101",
  "10110111001100111010011011010",
  "01101001110010101110110010101"
];

const MockQRCode = () => (
  <svg viewBox="0 0 29 29" className="w-20 h-20 sm:w-24 sm:h-24 text-zinc-950" fill="currentColor">
    {QR_MATRIX.map((row, rIdx) =>
      row.split("").map((cell, cIdx) =>
        cell === "1" ? (
          <rect key={`${rIdx}-${cIdx}`} x={cIdx} y={rIdx} width={1} height={1} />
        ) : null
      )
    )}
  </svg>
);

export default function ListingPopup({ isOpen, onClose }) {
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 250);
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const modalContent = (
    <div
      className="fixed inset-0 z-9999 flex items-center justify-center bg-black/60 backdrop-blur-md p-4"
      onClick={handleClose}
      style={{
        animation: isClosing
          ? "modalBackdropOut 0.25s ease-in forwards"
          : "modalBackdropIn 0.25s ease-out",
      }}
    >
      {/* CONTAINER */}
      <div
        className="relative flex w-full max-w-[900px] min-h-[400px] md:min-h-[460px] overflow-hidden rounded-2xl shadow-2xl bg-secondary border border-third/15"
        onClick={(e) => e.stopPropagation()}
        style={{
          animation: isClosing
            ? "modalCardOut 0.25s ease-in forwards"
            : "modalCardIn 0.3s ease-out",
        }}
      >
        {/* LEFT IMAGE */}
        <div className="hidden md:block w-5/12 relative bg-black">
          <Image
            src="/auth-image-2.webp"
            priority
            alt="Seller Listing"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-black/80" />
          
          <div className="absolute bottom-12 right-8 z-10 flex flex-col items-end text-right">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-10 h-10 bg-fourth rounded-full flex items-center justify-center">
                <Car className="text-white" size={20} />
              </div>
              <h3 className="text-2xl font-bold text-white">List Vehicle</h3>
            </div>
            <p className="text-white/90 text-[13px] max-w-[220px] mb-3 leading-snug">
              Adding details & photos is faster and easier from your phone.
            </p>
            <div className="w-8 h-[3px] bg-fourth rounded-full"></div>
          </div>

          {/* Swiper Indicators Dot simulation for Slide 2 consistency */}
          <div className="absolute bottom-6 right-8 flex gap-1.5 z-10">
            <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
            <span className="w-1.5 h-1.5 rounded-full bg-fourth" />
          </div>
        </div>

        {/* RIGHT CONTENT */}
        <div className="w-full md:w-7/12 p-8 md:p-12 flex flex-col justify-center gap-6 md:gap-8 relative bg-secondary">
          {/* CLOSE BUTTON */}
          <button
            onClick={handleClose}
            className="absolute bg-white cursor-pointer top-4 right-4 z-20 p-1.5 rounded-full hover:opacity-70 text-secondary"
          >
            <X size={18} className="text-black" />
          </button>

          <div className="space-y-4">
            {/* HEADLINE */}
            <h3 className="text-3xl font-bold text-primary leading-snug text-left">
              Listing your vehicle happens <br /> in the app
            </h3>

            {/* BODY */}
            <p className="text-third text-sm leading-relaxed text-left opacity-90">
              Adding photos, vehicle details, and documents is faster and easier from your phone — and lets you manage your listing on the go, wherever you are.
            </p>
          </div>

          {/* MIDDLE SECTION (QR CODE CENTERED + BADGES BELOW IN FLEX ROW) */}
          <div className="flex flex-col items-center gap-6 w-full">
            {/* QR Code Container centered */}
            <div className="flex items-center gap-5 p-4 sm:p-5 rounded-2xl bg-white/[0.03] border border-white/10 shadow-inner w-auto">
              <div className="p-3 bg-white rounded-xl shadow-lg flex items-center justify-center shrink-0">
                <MockQRCode />
              </div>
              <span className="text-xs sm:text-sm font-bold text-third uppercase tracking-wider text-left leading-normal max-w-[140px]">
                Scan to start your listing
              </span>
            </div>

            {/* Play Store & App Store Badges (White backgrounds with black text) */}
            <div className="flex flex-row items-center justify-center gap-4 w-full flex-wrap">
              {/* Google Play */}
              <button
                type="button"
                onClick={() => {
                  window.open("https://play.google.com/store", "_blank");
                }}
                className="flex items-center justify-center px-5 py-3 sm:py-3.5 bg-white text-zinc-950 hover:bg-zinc-100 rounded-xl transition-all duration-300 cursor-pointer text-sm font-bold min-w-[165px] shadow-lg border border-transparent"
              >
                <GooglePlayLogo />
                <div className="text-left text-zinc-950">
                  <div className="text-[9px] font-bold uppercase tracking-wider text-zinc-500 leading-none">
                    Get it on
                  </div>
                  <div className="text-[14px] font-extrabold leading-none mt-1 text-zinc-950">
                    Google Play
                  </div>
                </div>
              </button>

              {/* App Store */}
              <button
                type="button"
                onClick={() => {
                  window.open("https://www.apple.com/app-store", "_blank");
                }}
                className="flex items-center justify-center px-5 py-3 sm:py-3.5 bg-white text-zinc-950 hover:bg-zinc-100 rounded-xl transition-all duration-300 cursor-pointer text-sm font-bold min-w-[165px] shadow-lg border border-transparent"
              >
                <AppStoreLogo />
                <div className="text-left text-zinc-950">
                  <div className="text-[9px] font-bold uppercase tracking-wider text-zinc-500 leading-none">
                    Download on
                  </div>
                  <div className="text-[14px] font-extrabold leading-none mt-1 text-zinc-950">
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
