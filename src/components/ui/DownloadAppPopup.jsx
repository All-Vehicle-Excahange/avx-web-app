"use client";

import React, { useEffect, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import {
  X,
  Download,
  ShieldCheck,
  Send,
  MessageSquare,
  Key,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/router";
import Button from "@/components/ui/button";

/* Apple Logo (Official Shape) */
const AppleLogo = ({ className }) => (
  <svg viewBox="0 0 384 512" fill="currentColor" className={className}>
    <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
  </svg>
);

/* Inspection Icon (Official SVG style matching public/inspection_small.svg) */
const InspectionIcon = ({ className }) => (
  <svg
    viewBox="0 0 621 697"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill="currentColor"
      fillRule="evenodd"
      clipRule="evenodd"
      d="M310 0l1 0c9,11 97,106 306,101 0,0 60,417 -306,596l-1 0 0 0c-366,-179 -306,-596 -306,-596 209,5 297,-90 306,-101l0 0z M490 332l-31 10c0,2 0,4 0,6 0,87 -70,156 -156,156 -86,0 -156,-69 -156,-156 0,-86 70,-156 156,-156 31,0 60,9 84,25l31 -17c-32,-24 -72,-39 -115,-39 -103,0 -187,84 -187,187 0,104 84,188 187,188 104,0 187,-84 187,-188 0,-5 0,-10 0,-16zm-255 -41l-36 61 93 107c46,-74 110,-152 213,-176l-12 -77c-75,25 -157,75 -205,151l-53 -66z"
    />
  </svg>
);

export default function DownloadAppPopup({ isOpen, onClose }) {
  const router = useRouter();
  const [isClosing, setIsClosing] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

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

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  const handleGooglePlayClick = () => {
    if (isMobile) {
      window.open(
        "https://play.google.com/store/apps/details?id=com.reecomm.vehicle.marketplace&pcampaignid=web_share",
        "_blank",
      );
    } else {
      router.push("/download");
      handleClose();
    }
  };

  const handleAppStoreClick = () => {
    if (isMobile) {
      window.open("https://apps.apple.com/in/app/reecomm/id6789502528", "_blank");
    } else {
      router.push("/download");
      handleClose();
    }
  };

  const modalContent = (
    <div
      className="fixed inset-0 z-9999 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={handleClose}
      style={{
        animation: isClosing
          ? "modalBackdropOut 0.25s ease-in forwards"
          : "modalBackdropIn 0.25s ease-out",
      }}
    >
      {/* CONTAINER */}
      <div
        className="relative flex flex-col lg:flex-row w-full max-w-[1050px] min-h-[450px] max-h-[90vh] lg:max-h-none overflow-y-auto lg:overflow-hidden rounded-2xl shadow-2xl border border-third/20 bg-secondary bg-cover bg-center bg-no-repeat"
        onClick={(e) => e.stopPropagation()}
        style={{
          animation: isClosing
            ? "modalCardOut 0.25s ease-in forwards"
            : "modalCardIn 0.3s ease-out",
          backgroundImage: "url('/downlaodPopupbg.png')",
        }}
      >
        {/* CLOSE */}
        <button
          onClick={handleClose}
          className="absolute bg-white cursor-pointer top-4 right-4 z-20 p-1 rounded-full hover:opacity-70 text-secondary"
        >
          <X size={20} />
        </button>

        {/* LEFT IMAGE */}
        <div className="hidden lg:block w-5/12 relative z-10">
          <Image
            src="/leftDownlaodImage.webp"
            alt="Reecomm App"
            fill
            className="object-cover"
          />
        </div>

        {/* RIGHT CONTENT */}
        <div className="w-full lg:w-7/12 p-6 sm:p-8 flex flex-col justify-between gap-6 relative z-10">
          <div>
            <span className="text-xs font-black tracking-[0.2em] text-fourth uppercase mb-1.5 block">
              How it works
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-primary mb-2 tracking-tight">
              Chat. List. Track. It&apos;s all in the app.
            </h3>
            <p className="text-third text-xs sm:text-sm">
              The Reecomm app is where buyers chat with sellers, consultants
              manage their listings, and inspection reports land — the moment
              they&apos;re ready.
            </p>
          </div>

          {/* Desktop Horizontal Timeline (md and above) */}
          <div className="hidden md:flex items-start w-full px-2 py-4">
            {/* Step 1 */}
            <div className="flex flex-col items-center text-center w-[16.5%] relative z-10">
              <div className="w-12 h-12 rounded-full bg-primary/5 border border-primary/15 text-primary flex items-center justify-center mb-3">
                <Download size={18} />
              </div>
              <span className="text-[10px] font-bold text-primary mb-1">
                Download the app
              </span>
              <span className="text-[9px] text-third/75 leading-normal">
                Free on Android and iOS
              </span>
            </div>

            {/* Connector 1 */}
            <div className="flex-1 h-12 flex items-center justify-center relative z-0">
              <div className="absolute left-[-24px] right-[-16px] h-[1px] bg-white/15" />
              <svg
                className="w-2.5 h-2.5 text-white/40 absolute right-[-16px] top-1/2 -translate-y-1/2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth="4"
              >
                <path
                  d="M9 5l7 7-7 7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center text-center w-[16.5%] relative z-10">
              <div className="w-12 h-12 rounded-full bg-primary/5 border border-primary/15 text-primary flex items-center justify-center mb-3">
                <InspectionIcon className="w-5.5 h-6 object-contain" />
              </div>
              <span className="text-[10px] font-bold text-primary mb-1">
                Book an inspection
              </span>
              <span className="text-[9px] text-third/75 leading-normal">
                On any vehicle you like
              </span>
            </div>

            {/* Connector 2 */}
            <div className="flex-1 h-12 flex items-center justify-center relative z-0">
              <div className="absolute left-[-24px] right-[-16px] h-[1px] bg-white/15" />
              <svg
                className="w-2.5 h-2.5 text-white/40 absolute right-[-16px] top-1/2 -translate-y-1/2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth="4"
              >
                <path
                  d="M9 5l7 7-7 7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center text-center w-[16.5%] relative z-10">
              <div className="w-12 h-12 rounded-full bg-primary/5 border border-primary/15 text-primary flex items-center justify-center mb-3">
                <Send
                  size={16}
                  className="translate-x-[1px] -translate-y-[1px]"
                />
              </div>
              <span className="text-[10px] font-bold text-primary mb-1">
                Send an inquiry
              </span>
              <span className="text-[9px] text-third/75 leading-normal">
                To a verified consultant
              </span>
            </div>

            {/* Connector 3 */}
            <div className="flex-1 h-12 flex items-center justify-center relative z-0">
              <div className="absolute left-[-24px] right-[-16px] h-[1px] bg-white/15" />
              <svg
                className="w-2.5 h-2.5 text-white/40 absolute right-[-16px] top-1/2 -translate-y-1/2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth="4"
              >
                <path
                  d="M9 5l7 7-7 7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            {/* Step 4 */}
            <div className="flex flex-col items-center text-center w-[16.5%] relative z-10">
              <div className="w-12 h-12 rounded-full bg-primary/5 border border-primary/15 text-primary flex items-center justify-center mb-3">
                <MessageSquare size={18} />
              </div>
              <span className="text-[10px] font-bold text-primary mb-1">
                Chat with the seller
              </span>
              <span className="text-[9px] text-third/75 leading-normal">
                Negotiate and arrange a visit
              </span>
            </div>

            {/* Connector 4 */}
            <div className="flex-1 h-12 flex items-center justify-center relative z-0">
              <div className="absolute left-[-24px] right-[-16px] h-[1px] bg-white/15" />
              <svg
                className="w-2.5 h-2.5 text-white/40 absolute right-[-16px] top-1/2 -translate-y-1/2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth="4"
              >
                <path
                  d="M9 5l7 7-7 7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            {/* Step 5 */}
            <div className="flex flex-col items-center text-center w-[16.5%] relative z-10">
              <div className="w-12 h-12 rounded-full bg-primary/5 border border-primary/15 text-primary flex items-center justify-center mb-3">
                <Key size={18} />
              </div>
              <span className="text-[10px] font-bold text-primary mb-1">
                Get your vehicle
              </span>
              <span className="text-[9px] text-third/75 leading-normal">
                Close the deal with confidence
              </span>
            </div>
          </div>

          {/* Mobile Vertical Timeline (under md) */}
          <div className="flex md:hidden flex-col gap-4 pl-1">
            {/* Step 1 */}
            <div className="flex gap-3 items-start relative">
              <div className="absolute left-[18px] top-10 bottom-[-10px] w-[1px] bg-white/10">
                <svg
                  className="w-2 h-2 text-white/20 absolute bottom-0 -left-[3.5px] translate-y-[4px]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth="4"
                >
                  <path
                    d="M19 9l-7 7-7-7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="w-9 h-9 rounded-full bg-primary/5 border border-primary/15 text-primary flex items-center justify-center shrink-0 shadow-md">
                <Download size={15} />
              </div>
              <div className="flex flex-col pt-0.5">
                <span className="text-xs font-bold text-primary">
                  Download the app
                </span>
                <span className="text-[11px] text-third/80">
                  Free on Android and iOS
                </span>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex gap-3 items-start relative">
              <div className="absolute left-[18px] top-10 bottom-[-10px] w-[1px] bg-white/10">
                <svg
                  className="w-2 h-2 text-white/20 absolute bottom-0 -left-[3.5px] translate-y-[4px]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth="4"
                >
                  <path
                    d="M19 9l-7 7-7-7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="w-9 h-9 rounded-full bg-primary/5 border border-primary/15 text-primary flex items-center justify-center shrink-0 shadow-md">
                <InspectionIcon className="w-4.5 h-5 object-contain" />
              </div>
              <div className="flex flex-col pt-0.5">
                <span className="text-xs font-bold text-primary">
                  Book an inspection
                </span>
                <span className="text-[11px] text-third/80">
                  On any vehicle you like
                </span>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex gap-3 items-start relative">
              <div className="absolute left-[18px] top-10 bottom-[-10px] w-[1px] bg-white/10">
                <svg
                  className="w-2 h-2 text-white/20 absolute bottom-0 -left-[3.5px] translate-y-[4px]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth="4"
                >
                  <path
                    d="M19 9l-7 7-7-7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="w-9 h-9 rounded-full bg-primary/5 border border-primary/15 text-primary flex items-center justify-center shrink-0 shadow-md">
                <Send
                  size={13}
                  className="translate-x-[0.5px] -translate-y-[0.5px]"
                />
              </div>
              <div className="flex flex-col pt-0.5">
                <span className="text-xs font-bold text-primary">
                  Send an inquiry
                </span>
                <span className="text-[11px] text-third/80">
                  To a verified consultant
                </span>
              </div>
            </div>

            {/* Step 4 */}
            <div className="flex gap-3 items-start relative">
              <div className="absolute left-[18px] top-10 bottom-[-10px] w-[1px] bg-white/10">
                <svg
                  className="w-2 h-2 text-white/20 absolute bottom-0 -left-[3.5px] translate-y-[4px]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth="4"
                >
                  <path
                    d="M19 9l-7 7-7-7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="w-9 h-9 rounded-full bg-primary/5 border border-primary/15 text-primary flex items-center justify-center shrink-0 shadow-md">
                <MessageSquare size={15} />
              </div>
              <div className="flex flex-col pt-0.5">
                <span className="text-xs font-bold text-primary">
                  Chat with the seller
                </span>
                <span className="text-[11px] text-third/80">
                  Negotiate and arrange a visit
                </span>
              </div>
            </div>

            {/* Step 5 */}
            <div className="flex gap-3 items-start">
              <div className="w-9 h-9 rounded-full bg-primary/5 border border-primary/15 text-primary flex items-center justify-center shrink-0 shadow-md">
                <Key size={15} />
              </div>
              <div className="flex flex-col pt-0.5">
                <span className="text-xs font-bold text-primary">
                  Get your vehicle
                </span>
                <span className="text-[11px] text-third/80">
                  Close the deal with confidence
                </span>
              </div>
            </div>
          </div>

          {/* App Buttons */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full">
            <div className="flex flex-row items-center gap-2 sm:gap-4 w-full sm:w-auto">
              {/* Google Play Button */}
              <button
                type="button"
                onClick={handleGooglePlayClick}
                className="flex-1 sm:flex-none sm:w-auto min-w-[130px] sm:min-w-[200px] flex items-center justify-center px-2 sm:px-3 py-2 sm:py-2 bg-[#000000] text-white rounded-lg border border-neutral-800 hover:bg-neutral-900 transition-all duration-300 cursor-pointer group/btn shadow-md"
              >
                <div className="mr-2 sm:mr-3 transition-transform duration-300">
                  <svg
                    viewBox="30 336.7 120.9 129.2"
                    className="w-[18px] sm:w-6"
                  >
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
                <div className="text-left">
                  <div className="text-[8px] sm:text-[10px] font-semibold uppercase tracking-wider text-white/60 transition-colors whitespace-nowrap">
                    Get it on
                  </div>
                  <div className="text-[14px] sm:text-lg font-semibold leading-none tracking-tight whitespace-nowrap text-white">
                    Google Play
                  </div>
                </div>
              </button>

              {/* App Store Button */}
              <button
                type="button"
                onClick={handleAppStoreClick}
                className="flex-1 sm:flex-none sm:w-auto min-w-[130px] sm:min-w-[200px] flex items-center justify-center px-2 sm:px-3 py-2 sm:py-2 bg-[#000000] text-white rounded-lg border border-neutral-800 hover:bg-neutral-900 transition-all duration-300 cursor-pointer group/btn shadow-md"
              >
                <div className="mr-2 sm:mr-3 transition-transform text-white">
                  <AppleLogo className="w-4 sm:w-[22px]" />
                </div>
                <div className="text-left">
                  <div className="text-[8px] sm:text-[10px] font-semibold uppercase tracking-wider text-white/60 transition-colors whitespace-nowrap">
                    Download on the
                  </div>
                  <div className="text-[14px] sm:text-lg font-semibold leading-none tracking-tight whitespace-nowrap text-white">
                    App Store
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* FOOTNOTE */}
          <div className="text-[11px] text-third/40">
            By downloading, you agree to Reecomm&apos;s Terms & Privacy Policy.
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Preload images on page load */}
      <div className="absolute w-1.5 h-1.5 opacity-0 pointer-events-none overflow-hidden">
        <Image
          src="/downlaodPopupbg.png"
          alt="preload bg"
          width={6}
          height={6}
          priority
        />
        <Image
          src="/leftDownlaodImage.webp"
          alt="preload left img"
          width={6}
          height={6}
          priority
        />
      </div>

      {isOpen && typeof document !== "undefined"
        ? createPortal(modalContent, document.body)
        : null}
    </>
  );
}
