"use client";

import React, { useEffect, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import Image from "next/image";
import Button from "@/components/ui/button";

/* Apple Logo (Official Shape) */
const AppleLogo = ({ className }) => (
  <svg viewBox="0 0 384 512" fill="currentColor" className={className}>
    <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
  </svg>
);

export default function DownloadAppPopup({ isOpen, onClose }) {
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
      className="fixed inset-0 z-9999 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={handleClose}
      style={{ animation: isClosing ? 'modalBackdropOut 0.25s ease-in forwards' : 'modalBackdropIn 0.25s ease-out' }}
    >
      {/* CONTAINER */}
      <div
        className="relative flex w-full max-w-[1050px] min-h-[450px] overflow-hidden rounded-2xl shadow-2xl bg-secondary border border-third/20"
        onClick={(e) => e.stopPropagation()}
        style={{ animation: isClosing ? 'modalCardOut 0.25s ease-in forwards' : 'modalCardIn 0.3s ease-out' }}
      >
        {/* CLOSE */}
        <button
          onClick={handleClose}
          className="absolute bg-white cursor-pointer top-4 right-4 z-20 p-1 rounded-full hover:opacity-70 text-secondary"
        >
          <X size={20} />
        </button>

        {/* LEFT IMAGE */}
        <div className="hidden md:block w-5/12 relative">
          <Image
            src="/mobile_CTA_sm.png"
            alt="AVX App"
            fill
            className="object-cover"
          />
        </div>

        {/* RIGHT CONTENT */}
        <div className="w-full md:w-7/12 p-5 flex flex-col justify-center">
          <h3 className="text-3xl font-bold mb-6 text-primary tracking-tight">
            Get the full experience.
          </h3>

          <p className="text-third text-sm leading-7 mb-12">
            The AVX app is the fastest way to buy, sell, and manage your
            vehicles. Enjoy exclusive mobile-only features, instant price drop
            alerts, and seamless communication. Download now and experience the
            AVX
          </p>

          {/* App Buttons */}
          <div className="flex flex-row items-center  gap-2 sm:gap-4 w-full sm:px-0 mt-2 sm:mt-0">

            {/* Google Play Button */}
            <button type="button" className="flex-1 sm:flex-none sm:w-auto min-w-[130px] sm:min-w-[200px] flex items-center justify-center px-2 sm:px-3 py-2 sm:py-2 bg-primary text-secondary rounded-lg border border-gray-600 hover:border-gray-600 hover:bg-secondary hover:text-primary transition-all duration-300 cursor-pointer group/btn">
              <div className="mr-2 sm:mr-3 transition-transform duration-300 ">
                <svg viewBox="30 336.7 120.9 129.2" className="w-[18px] sm:w-[24px]">
                  <path fill="#FFD400" d="M119.2,421.2c15.3-8.4,27-14.8,28-15.3c3.2-1.7,6.5-6.2,0-9.7  c-2.1-1.1-13.4-7.3-28-15.3l-20.1,20.2L119.2,421.2z"></path>
                  <path fill="#FF3333" d="M99.1,401.1l-64.2,64.7c1.5,0.2,3.2-0.2,5.2-1.3  c4.2-2.3,48.8-26.7,79.1-43.3L99.1,401.1L99.1,401.1z"></path>
                  <path fill="#48FF48" d="M99.1,401.1l20.1-20.2c0,0-74.6-40.7-79.1-43.1  c-1.7-1-3.6-1.3-5.3-1L99.1,401.1z"></path>
                  <path fill="#3BCCFF" d="M99.1,401.1l-64.3-64.3c-2.6,0.6-4.8,2.9-4.8,7.6  c0,7.5,0,107.5,0,113.8c0,4.3,1.7,7.4,4.9,7.7L99.1,401.1z"></path>
                </svg>
              </div>
              <div className="text-left">
                <div className="text-[8px] sm:text-[10px] font-semibold uppercase tracking-wider text-secondary group-hover/btn:text-primary/80 transition-colors whitespace-nowrap">
                  Get it on
                </div>
                <div className="text-[14px] sm:text-lg font-semibold leading-none tracking-tight whitespace-nowrap">
                  Google Play
                </div>
              </div>
            </button>

            {/* App Store Button */}
            <button type="button" className="flex-1 sm:flex-none sm:w-auto min-w-[130px] sm:min-w-[200px] flex items-center justify-center px-2 sm:px-3 py-2 sm:py-2 bg-primary text-secondary rounded-lg border border-gray-600 hover:border-gray-600 hover:bg-secondary hover:text-primary transition-all duration-300 cursor-pointer group/btn">
              <div className="mr-2 sm:mr-3 transition-transform">
                <svg viewBox="0 0 384 512" className="w-[16px] sm:w-[22px]">
                  <path fill="currentColor" d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"></path>
                </svg>
              </div>
              <div className="text-left">
                <div className="text-[8px] sm:text-[10px] font-semibold uppercase tracking-wider text-secondary group-hover/btn:text-primary/80 transition-colors whitespace-nowrap">
                  Download on
                </div>
                <div className="text-[14px] sm:text-lg font-semibold leading-none tracking-tight whitespace-nowrap">
                  App Store
                </div>
              </div>
            </button>

          </div>

          {/* FOOTNOTE */}
          <div className="text-[11px] text-third/50 mt-12">
            By downloading, you agree to our Terms & Privacy Policy.
          </div>
        </div>
      </div>
    </div>
  );

  return typeof document !== "undefined"
    ? createPortal(modalContent, document.body)
    : null;
}
