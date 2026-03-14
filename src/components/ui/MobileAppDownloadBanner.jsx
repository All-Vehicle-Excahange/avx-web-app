import React from "react";
import { X } from "lucide-react";
import Button from "./button";

export default function MobileAppDownloadBanner({ onClose }) {
  return (
    <div className="relative flex w-full flex-col bg-[#007AFF] p-4 md:hidden shadow-lg">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute right-2 top-2 text-white/80 hover:text-white"
      >
        <X size={18} />
      </button>

      <div className="flex flex-col gap-1 pr-6">
        {/* Top Small Label */}
        <span className="text-[10px] font-medium uppercase tracking-wider text-white/90">
          REECOMM APP DOWNLOAD FOR
        </span>

        {/* Main Heading */}
        <h2 className="text-lg font-black uppercase leading-tight text-white">
          ALL VEHICLE SELL & BUY
        </h2>

        {/* Subtext */}
        <p className="text-[11px] leading-snug text-white/90">
          Unlock exclusive discounts, special offers, and price drops every day
        </p>
      </div>

      {/* Action Button */}
      <div className="mt-3">
        <Button
          variant="ghost"
          full 
          size="sm"
        >
          Download the App
        </Button>
      </div>
    </div>
  );
}