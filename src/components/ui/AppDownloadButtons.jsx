"use client";

import React from "react";
import { useRouter } from "next/router";

const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.reecomm.vehicle.marketplace&pcampaignid=web_share";
const APP_STORE_URL =
  "https://apps.apple.com/in/app/reecomm/id6789502528";

const getButtonBaseClass = (variant) => {
  if (variant === "white" || variant === "light") {
    return "px-3 sm:px-6 py-2 flex items-center justify-center bg-white text-zinc-950 hover:bg-secondary hover:text-primary transition-all duration-300 rounded-lg cursor-pointer border border-transparent hover:border-white/60 shadow-md w-full sm:w-auto";
  }
  if (variant === "dark-outline" || variant === "dark-light-bg") {
    return "px-3 sm:px-6 py-2 flex items-center justify-center bg-secondary text-primary hover:bg-primary hover:text-secondary transition-all duration-300 rounded-lg cursor-pointer border border-gray-600 hover:border-gray-900 shadow-sm w-full sm:w-auto";
  }
  return "px-3 sm:px-6 py-2 flex items-center justify-center bg-secondary text-primary hover:bg-primary hover:text-secondary transition-all duration-300 rounded-lg cursor-pointer border border-primary/10 hover:border-white/40 shadow-sm w-full sm:w-auto";
};

function useDownloadClick(targetUrl, disableRedirect) {
  const router = useRouter();

  return (e) => {
    if (typeof window !== "undefined") {
      const isBigScreen = window.innerWidth >= 1024;
      const isDownloadPage = router?.pathname === "/download";

      if (!disableRedirect && isBigScreen && !isDownloadPage) {
        router.push("/download");
      } else {
        window.open(targetUrl, "_blank");
      }
    }
  };
}

export function GooglePlayButton({
  variant = "dark",
  className = "",
  disableRedirect = false,
  onClick,
  ...props
}) {
  const baseClass = getButtonBaseClass(variant);
  const handleDefaultClick = useDownloadClick(PLAY_STORE_URL, disableRedirect);

  const handleClick = (e) => {
    if (onClick) {
      onClick(e);
    }
    if (!e?.defaultPrevented) {
      handleDefaultClick(e);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`${baseClass} ${className}`}
      {...props}
    >
      <div className="mr-2 sm:mr-3 shrink-0">
        <svg viewBox="30 336.7 120.9 129.2" className="w-[18px] sm:w-[25px]">
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
      <div className="text-left shrink-0">
        <div className="text-[8px] sm:text-[10px] font-bold">GET IT ON</div>
        <div className="text-sm sm:text-lg font-semibold leading-none">
          Google Play
        </div>
      </div>
    </button>
  );
}

export function AppStoreButton({
  variant = "dark",
  className = "",
  disableRedirect = false,
  onClick,
  ...props
}) {
  const baseClass = getButtonBaseClass(variant);
  const handleDefaultClick = useDownloadClick(APP_STORE_URL, disableRedirect);

  const handleClick = (e) => {
    if (onClick) {
      onClick(e);
    }
    if (!e?.defaultPrevented) {
      handleDefaultClick(e);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`${baseClass} ${className}`}
      {...props}
    >
      <div className="mr-2 sm:mr-3 shrink-0">
        <svg viewBox="0 0 384 512" className="w-[16px] sm:w-[23px]">
          <path
            fill="currentColor"
            d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"
          ></path>
        </svg>
      </div>
      <div className="text-left shrink-0">
        <div className="text-[8px] sm:text-[10px] font-bold">
          Download on the
        </div>
        <div className="text-sm sm:text-lg font-semibold leading-none">
          App Store
        </div>
      </div>
    </button>
  );
}

export default function AppDownloadButtons({
  variant = "dark",
  direction = "responsive",
  className = "",
  buttonClassName = "",
  disableRedirect = false,
  ...props
}) {
  const directionClass =
    direction === "row"
      ? "flex flex-row"
      : direction === "col"
        ? "flex flex-col"
        : "flex flex-col sm:flex-row";

  return (
    <div
      className={`${directionClass} items-center gap-2 sm:gap-4 ${className}`}
      {...props}
    >
      <GooglePlayButton
        variant={variant}
        className={buttonClassName}
        disableRedirect={disableRedirect}
      />
      <AppStoreButton
        variant={variant}
        className={buttonClassName}
        disableRedirect={disableRedirect}
      />
    </div>
  );
}
