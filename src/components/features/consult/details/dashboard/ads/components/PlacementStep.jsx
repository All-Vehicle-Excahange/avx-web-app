import React from "react";
import { Home, Search, User, Car, Info } from "lucide-react";

const placements = [
  {
    id: "Homepage featured",
    title: "Homepage featured",
    desc: "Top visibility on the main feed. Seen by all users visiting Reecomm.",
    icon: Home,
    badge: "CPC Only",
    badgeType: "cpc",
  },
  {
    id: "Search result page",
    title: "Search result page",
    desc: "Shown at the top when buyers search for your vehicle make or model.",
    icon: Search,
    badge: "CPC or CPI",
    badgeType: "both",
  },
  {
    id: "Consultant profile page",
    title: "Consultant profile",
    desc: "Pinned to the top of your storefront profile page listing.",
    icon: User,
    badge: "CPC Only",
    badgeType: "cpc",
  },
  {
    id: "Vehicle detail page",
    title: "Vehicle detail page",
    desc: "Shown as \"similar vehicles\" on other listings. High buyer intent.",
    icon: Car,
    badge: "CPI Only",
    badgeType: "cpi",
  },
];

export default function PlacementStep({ selected = [], onChange, campaignType }) {
  const filteredPlacements = placements.filter(item => {
    if (campaignType === "vehicle" && item.id === "Consultant profile page") {
      return false;
    }
    return true;
  });

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-primary">Where should your ad appear?</h3>
        <p className="text-third text-sm mt-1">
          Choose one or more placements where your ad should run across the platform.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredPlacements.map((item) => {
          const Icon = item.icon;
          const isSelected = selected && Array.isArray(selected) ? selected.includes(item.id) : selected === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onChange(item.id)}
              className={`flex flex-col items-start text-left p-5 rounded-xl border transition-all duration-200 cursor-pointer ${
                isSelected
                  ? "border-fourth bg-fourth/10 shadow-[0_0_15px_rgba(0,123,255,0.15)]"
                  : "border-third/30 bg-transparent hover:border-third/50 hover:bg-white/5"
              }`}
            >
              <div
                className={`p-2.5 rounded-lg mb-4 transition-colors ${
                  isSelected ? "bg-fourth text-white" : "bg-white/5 text-third"
                }`}
              >
                <Icon size={20} />
              </div>
              <h4 className={`font-semibold text-sm transition-colors ${isSelected ? "text-fourth" : "text-primary"}`}>
                {item.title}
              </h4>
              <p className="text-third text-xs mt-2 flex-grow leading-relaxed">
                {item.desc}
              </p>
              
              {/* <span
                className={`mt-4 px-2.5 py-1 rounded text-[10px] font-bold ${
                  item.badgeType === "cpc"
                    ? "bg-fourth/10 text-fourth"
                    : item.badgeType === "cpi"
                    ? "bg-amber-500/10 text-amber-400"
                    : "bg-emerald-500/10 text-emerald-400"
                }`}
              >
                {item.badge}
              </span> */}
            </button>
          );
        })}
      </div>

      <div className="flex gap-3 p-4 rounded-xl border border-third/30 bg-transparent items-start">
        <Info className="text-fourth mt-0.5 shrink-0" size={16} />
        <p className="text-xs text-third leading-relaxed">
          Placements marked <strong className="text-primary">CPI (Cost Per Inquiry)</strong> charge only when a buyer submits a contact form or makes a call. Placements marked <strong className="text-primary">CPC (Cost Per Click)</strong> charge when a buyer clicks on your listing.
        </p>
      </div>
    </div>
  );
}
