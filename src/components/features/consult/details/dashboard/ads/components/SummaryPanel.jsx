import React from "react";

export default function SummaryPanel({ placement, billing, vehicle, dailyBudget, maxBid, campaignType }) {
  const isCPI = billing === "CPI";
  const totalSpend = dailyBudget * 30;

  return (
    <div className="w-full lg:w-[320px] flex-shrink-0 bg-transparent p-6 space-y-6 flex flex-col justify-between">
      <div className="space-y-5">
        <h3 className="text-xs font-bold text-third uppercase tracking-widest">
          Boost summary
        </h3>

        {/* Placement */}
        <div className="space-y-1">
          <span className="text-[11px] text-third font-medium block">Placement</span>
          <div className="text-sm font-semibold text-primary whitespace-normal break-words leading-relaxed">
            {placement && (Array.isArray(placement) ? placement.length > 0 : placement) ? (
              <span className="text-primary transition-all duration-300">
                {Array.isArray(placement) ? placement.join(", ") : placement}
              </span>
            ) : (
              <span className="text-third/50 italic font-normal">Not selected</span>
            )}
          </div>
        </div>

        {/* Billing */}
        <div className="space-y-1">
          <span className="text-[11px] text-third font-medium block">Billing</span>
          <div className="text-sm font-semibold truncate">
            {billing ? (
              <span className="text-primary transition-all duration-300">
                {billing === "CPC" ? "Cost per click" : "Cost per inquiry"}
              </span>
            ) : (
              <span className="text-third/50 italic font-normal">Not selected</span>
            )}
          </div>
        </div>

        {/* Target Vehicle/Profile */}
        <div className="space-y-1">
          <span className="text-[11px] text-third font-medium block">
            {campaignType === "profile" ? "Target" : "Vehicle"}
          </span>
          <div className="text-sm font-semibold truncate">
            {campaignType === "profile" ? (
              <span className="text-primary transition-all duration-300">Consultant Profile</span>
            ) : vehicle?.name ? (
              <span className="text-primary transition-all duration-300">{vehicle.name}</span>
            ) : (
              <span className="text-third/50 italic font-normal">Not selected</span>
            )}
          </div>
        </div>

        {/* Daily budget */}
        <div className="space-y-1">
          <span className="text-[11px] text-third font-medium block">Daily budget</span>
          <div className="text-sm font-semibold truncate">
            {dailyBudget ? (
              <span className="text-primary transition-all duration-300">₹{dailyBudget}/day</span>
            ) : (
              <span className="text-third/50 italic font-normal">Not set</span>
            )}
          </div>
        </div>

        {/* Max Bid */}
        <div className="space-y-1">
          <span className="text-[11px] text-third font-medium block">
            {isCPI ? "Max CPI bid" : "Max CPC bid"}
          </span>
          <div className="text-sm font-semibold truncate">
            {maxBid ? (
              <span className="text-primary transition-all duration-300">₹{maxBid}</span>
            ) : (
              <span className="text-third/50 italic font-normal">Not set</span>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-4 pt-6">
        <div>
          <span className="text-[11px] text-third font-medium block">Wallet balance</span>
          <span className="text-sm font-bold text-[#1D9E75] block mt-0.5">₹8,240</span>
        </div>
        
        <div>
          <span className="text-[11px] text-third font-medium block">Est. 30-day spend</span>
          <span className="text-lg font-bold text-primary block mt-0.5">
            {placement && (Array.isArray(placement) ? placement.length > 0 : placement) && billing && vehicle ? `₹${totalSpend.toLocaleString()}` : "—"}
          </span>
        </div>
      </div>
    </div>
  );
}
