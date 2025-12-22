"use client";

import React from "react";
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
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      {/* CONTAINER */}
      <div className="relative flex w-full max-w-[1050px] min-h-[450px] overflow-hidden rounded-2xl shadow-2xl bg-secondary border border-third/20">
        {/* CLOSE */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-20 p-2 rounded-full bg-black/20 text-primary hover:opacity-70"
        >
          <X size={22} />
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
        <div className="w-full md:w-7/12 p-12 flex flex-col justify-center">
          <h3 className="text-3xl font-bold mb-6 text-primary tracking-tight">
            Get the full experience.
          </h3>

          <p className="text-third text-sm leading-7 mb-12">
            The AVX app is the fastest way to buy, sell, and manage your
            vehicles. Enjoy exclusive mobile-only features, instant price drop
            alerts, and seamless communication. Download now and experience the
            AVX
          </p>

          {/* STORE BUTTONS */}
          <div className="flex flex-col sm:flex-row gap-4">
            {/* GOOGLE PLAY */}
            <a
              href="https://play.google.com/store"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="w-[210px] h-14 flex items-center gap-3 px-4 rounded-xl bg-white hover:opacity-90 border-none">
                <div className="relative w-7 h-7 shrink-0">
                  <Image
                    src="/playstore.png"
                    alt="Google Play"
                    fill
                    className="object-contain"
                  />
                </div>

                <div className="flex flex-col items-start leading-none">
                  <span className="text-[10px] font-semibold tracking-wide text-gray-500 uppercase">
                    Android App On
                  </span>
                  <span className="text-[18px] font-bold text-black">
                    Google Play
                  </span>
                </div>
              </Button>
            </a>

            {/* APP STORE */}
            <a
              href="https://www.apple.com/app-store/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="w-[210px] h-14 flex items-center gap-3 px-4 rounded-xl bg-black hover:opacity-80 border border-white/20" showIcon={false}>
                <AppleLogo className="w-7 h-7 text-white shrink-0" />

                <div className="flex flex-col items-start leading-none text-white">
                  <span className="text-[10px] font-medium tracking-wide opacity-80">
                    Download on the
                  </span>
                  <span className="text-[18px] font-semibold">App Store</span>
                </div>
              </Button>
            </a>
          </div>

          {/* FOOTNOTE */}
          <div className="text-[11px] text-third/50 mt-12">
            By downloading, you agree to our Terms & Privacy Policy.
          </div>
        </div>
      </div>
    </div>
  );
}
