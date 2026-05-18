import React from "react";
import { ShieldCheck, Calendar, SlidersHorizontal, User, DollarSign, Award } from "lucide-react";

export default function ReviewStep({
  placement,
  billing,
  vehicle,
  dailyBudget,
  maxBid,
  startDate,
  endDate,
  activeDays,
  campaignType,
}) {
  const isCPI = billing === "CPI";
  const total = dailyBudget * 30;
  const clicks = Math.round(total / maxBid);
  const impressions = Math.round(clicks * 25);

  const formatDate = (dateStr) => {
    if (!dateStr) return "—";
    try {
      const options = { day: "numeric", month: "short" };
      return new Date(dateStr).toLocaleDateString("en-IN", options);
    } catch {
      return dateStr;
    }
  };  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-primary">Review your boost</h3>
        <p className="text-third text-sm mt-1">
          Everything looks good? Launch your campaign.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Side Details */}
        <div className="space-y-5">
          {/* Placement & Billing */}
          <div className="space-y-3">
            <h4 className="text-[10px] font-bold text-third uppercase tracking-widest">
              Placement & Billing
            </h4>
            <div className="space-y-2 border-l border-white/5 pl-3">
              <div className="flex justify-between items-start text-xs gap-4">
                <span className="text-third shrink-0">Placement</span>
                <span className="text-primary font-semibold text-right whitespace-normal break-words leading-relaxed max-w-[200px]">
                  {placement && (Array.isArray(placement) ? placement.length > 0 : placement)
                    ? (Array.isArray(placement) ? placement.join(", ") : placement)
                    : "—"}
                </span>
              </div>
              <div className="flex justify-between items-start text-xs">
                <span className="text-third">Billing Type</span>
                <span className="text-primary font-semibold text-right">
                  {billing === "CPC"
                    ? "Cost per click (CPC)"
                    : billing === "CPI"
                    ? "Cost per inquiry (CPI)"
                    : "—"}
                </span>
              </div>
            </div>
          </div>

          {/* Vehicle / Target Detail */}
          <div className="space-y-3">
            <h4 className="text-[10px] font-bold text-third uppercase tracking-widest">
              {campaignType === "profile" ? "Target" : "Vehicle"}
            </h4>
            <div className="border-l border-white/5 pl-3">
              <div className="flex justify-between items-start text-xs">
                <span className="text-third">
                  {campaignType === "profile" ? "Boost Target" : "Selected Vehicle"}
                </span>
                <span className="text-primary font-semibold text-right max-w-[150px] truncate">
                  {campaignType === "profile" ? "Consultant Profile" : vehicle?.name || "—"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side Details */}
        <div className="space-y-5">
          {/* Budget & Schedule */}
          <div className="space-y-3">
            <h4 className="text-[10px] font-bold text-third uppercase tracking-widest">
              Budget & Schedule
            </h4>
            <div className="space-y-2 border-l border-white/5 pl-3">
              <div className="flex justify-between items-start text-xs">
                <span className="text-third">Daily Budget</span>
                <span className="text-primary font-semibold">₹{dailyBudget}/day</span>
              </div>
              <div className="flex justify-between items-start text-xs">
                <span className="text-third">{isCPI ? "Max CPI Bid" : "Max CPC Bid"}</span>
                <span className="text-primary font-semibold">₹{maxBid}</span>
              </div>
              <div className="flex justify-between items-start text-xs">
                <span className="text-third">Duration</span>
                <span className="text-primary font-semibold">
                  {formatDate(startDate)} – {formatDate(endDate)}
                </span>
              </div>
              <div className="flex justify-between items-start text-xs">
                <span className="text-third">Active Days</span>
                <span className="text-primary font-semibold truncate max-w-[120px]">
                  {activeDays.length === 7 ? "All days" : activeDays.join(", ")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Summary Box */}
      <div className="p-4 rounded-xl border border-third/30 bg-transparent space-y-3.5">
        <h4 className="text-xs font-semibold text-third">Estimated Monthly Performance</h4>
        
        <div className="space-y-2.5">
          <div className="flex justify-between items-center text-xs">
            <span className="text-third">{isCPI ? "Estimated inquiries" : "Estimated clicks"}</span>
            <span className="text-primary font-semibold">{clicks.toLocaleString()}</span>
          </div>
          
          <div className="flex justify-between items-center text-xs">
            <span className="text-third">Estimated impressions</span>
            <span className="text-primary font-semibold">{impressions.toLocaleString()}</span>
          </div>

          <div className="border-t border-white/5 pt-2.5 mt-1 flex justify-between items-center">
            <span className="text-sm font-semibold text-primary">Total budget (30 days)</span>
            <span className="text-base font-bold text-fourth">₹{total.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Wallet Balance Info */}
      <div className="flex items-center justify-between p-4 rounded-xl border border-third/30 bg-transparent">
        <div className="space-y-0.5">
          <span className="text-[10px] text-third block uppercase tracking-wider font-semibold">
            Wallet Balance
          </span>
          <span className="text-[#1D9E75] font-bold text-sm block">
            ₹8,240 available
          </span>
        </div>
        <span className="text-[10px] text-third text-right leading-relaxed block">
          Budget will be reserved<br />from your wallet on launch
        </span>
      </div>

      {/* Security Check */}
      <div className="flex gap-3 p-4 rounded-xl bg-fourth/5 border border-fourth/20 items-start">
        <ShieldCheck className="text-fourth shrink-0 mt-0.5" size={18} />
        <p className="text-xs text-fourth leading-relaxed font-medium">
          Your ad will go into review before going live. Typically approved within 2–4 hours. You will be notified once active.
        </p>
      </div>
    </div>
  );
}
