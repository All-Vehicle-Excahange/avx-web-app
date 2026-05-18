import React from "react";
import { Car, User } from "lucide-react";

export default function TypeStep({ selected, onChange }) {
  const options = [
    {
      id: "vehicle",
      title: "Vehicle Listing Boost",
      desc: "Promote a specific vehicle listing from your active inventory. Perfect for driving immediate buyer leads and inquiries directly to your car detail pages.",
      icon: Car,
    },
    {
      id: "profile",
      title: "Consultant Profile Boost",
      desc: "Promote your consultant profile page across the platform. Build brand credibility, gain local followers, and get general direct inquiries for your business.",
      icon: User,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-primary">Choose campaign type</h3>
        <p className="text-third text-sm mt-1">
          Select whether you want to promote a specific car or your overall consultant profile.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {options.map((item) => {
          const Icon = item.icon;
          const isSelected = selected === item.id;

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
            </button>
          );
        })}
      </div>
    </div>
  );
}
