"use client";

import { useState } from "react";
import { MessageCircle, Navigation } from "lucide-react";
import Button from "@/components/ui/button";

export default function StoreSummaryAside() {
  const [vehicleType, setVehicleType] = useState(null);

  const vehicleTypes = [
    { label: "Two Wheelers", value: "2w" },
    { label: "Four Wheelers", value: "4w" },
    { label: "Commercial", value: "commercial" },
  ];

  return (
    <aside className="hidden lg:flex h-fit relative w-[340px] bg-secondary/90 border border-third/40 p-6 flex-col gap-6 overflow-y-auto shrink-0 rounded-2xl">
      {/* 🔥 Blurred background */}
      <div className="absolute inset-0 bg-[url('/bg_blur.jpg')] bg-cover opacity-40 blur-lg z-0" />

      {/* CONTENT */}
      <div className="relative z-10 space-y-6">
        {/* TITLE */}
        <h2 className="text-xl font-semibold text-primary">
          Filter Your Result
        </h2>

        {/* VEHICLE TYPE */}
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wider text-third">
            Vehicle Type
          </p>

          <div className="flex flex-wrap gap-2">
            {vehicleTypes.map((type) => {
              const isActive = vehicleType === type.value;

              return (
                <button
                  key={type.value}
                  onClick={() => setVehicleType(type.value)}
                  className={`px-3 py-1.5 rounded-full text-xs border transition ${
                    isActive
                      ? "bg-primary text-secondary border-primary"
                      : "border-third/40 text-primary hover:bg-primary/20"
                  }`}
                >
                  {type.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* ACTION BUTTONS */}
        <div className="space-y-3 pt-4">
          <Button full variant="ghost" showIcon>
            Apply Filter
          </Button>
        </div>
      </div>
    </aside>
  );
}
