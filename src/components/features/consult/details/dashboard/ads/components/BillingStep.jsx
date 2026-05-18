import React from "react";
import { MousePointerClick, MessageSquare, Info } from "lucide-react";

export default function BillingStep({ selected, onChange, placement = [] }) {
  // If placement is CPC-only: Homepage featured, Consultant profile page
  const isCpcOnly = placement && placement.length > 0 && placement.every(p => p === "Homepage featured" || p === "Consultant profile page");
  // If placement is CPI-only: Vehicle detail page
  const isCpiOnly = placement && placement.length > 0 && placement.every(p => p === "Vehicle detail page");

  const placementLabel = placement && placement.length > 0 ? placement.join(", ") : "None selected";

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-primary">How do you want to be charged?</h3>
        <p className="text-third text-sm mt-1">
          Based on your placement ({placementLabel}), the following billing types are available.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* CPC Card */}
        <button
          disabled={isCpiOnly}
          onClick={() => onChange("CPC")}
          className={`flex flex-col items-start text-left p-5 rounded-xl border transition-all duration-200 ${
            isCpiOnly
              ? "opacity-40 cursor-not-allowed border-third/10 bg-transparent"
              : selected === "CPC"
              ? "border-fourth bg-fourth/10 shadow-[0_0_15px_rgba(0,123,255,0.15)] cursor-pointer"
              : "border-third/30 bg-transparent hover:border-third/50 hover:bg-white/5 cursor-pointer"
          }`}
        >
          <div
            className={`p-2.5 rounded-lg mb-4 transition-colors ${
              selected === "CPC" && !isCpiOnly ? "bg-fourth text-white" : "bg-white/5 text-third"
            }`}
          >
            <MousePointerClick size={20} />
          </div>
          <h4 className={`font-semibold text-sm transition-colors ${selected === "CPC" && !isCpiOnly ? "text-fourth" : "text-primary"}`}>
            CPC — Cost per click
          </h4>
          <span className="text-[#1D9E75] font-bold text-xs mt-1">Starting at ₹3/click</span>
          <p className="text-third text-xs mt-2 flex-grow leading-relaxed">
            Pay only when a buyer clicks on your boosted listing. Ideal for driving maximum traffic to new inventory.
          </p>
          {isCpiOnly && (
            <span className="mt-3 text-[10px] text-amber-400 font-medium">
              Not available for {placementLabel}
            </span>
          )}
        </button>

        {/* CPI Card */}
        <button
          disabled={isCpcOnly}
          onClick={() => onChange("CPI")}
          className={`flex flex-col items-start text-left p-5 rounded-xl border transition-all duration-200 ${
            isCpcOnly
              ? "opacity-40 cursor-not-allowed border-third/10 bg-transparent"
              : selected === "CPI"
              ? "border-fourth bg-fourth/10 shadow-[0_0_15px_rgba(0,123,255,0.15)] cursor-pointer"
              : "border-third/30 bg-transparent hover:border-third/50 hover:bg-white/5 cursor-pointer"
          }`}
        >
          <div
            className={`p-2.5 rounded-lg mb-4 transition-colors ${
              selected === "CPI" && !isCpcOnly ? "bg-fourth text-white" : "bg-white/5 text-third"
            }`}
          >
            <MessageSquare size={20} />
          </div>
          <h4 className={`font-semibold text-sm transition-colors ${selected === "CPI" && !isCpcOnly ? "text-fourth" : "text-primary"}`}>
            CPI — Cost per inquiry
          </h4>
          <span className="text-[#1D9E75] font-bold text-xs mt-1">Starting at ₹15/inquiry</span>
          <p className="text-third text-xs mt-2 flex-grow leading-relaxed">
            Pay only when a buyer sends a direct inquiry or calls. Maximizes return on investment by prioritizing quality leads.
          </p>
          {isCpcOnly && (
            <span className="mt-3 text-[10px] text-amber-400 font-medium">
              Not available for {placementLabel}
            </span>
          )}
        </button>
      </div>

      <div className="p-4 rounded-xl border border-third/30 bg-transparent space-y-2">
        <h5 className="text-xs font-semibold text-primary flex items-center gap-1.5">
          <Info size={14} className="text-fourth" /> Not sure which to pick?
        </h5>
        <p className="text-xs text-third leading-relaxed">
          Use <strong className="text-primary">CPC</strong> for new listings that need immediate exposure to build traction. Switch to <strong className="text-primary">CPI</strong> for high-value or niche listings where you only want to pay for high-intent, serious buyers who explicitly contact you.
        </p>
      </div>
    </div>
  );
}
