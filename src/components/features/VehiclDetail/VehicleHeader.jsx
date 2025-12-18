"use client";

import { Star } from "lucide-react";

export default function VehicleHeader() {
  return (
    <header className="w-full space-y-3 pt-6">
      {/* Breadcrumb */}
      <p className="text-xs sm:text-sm text-third">
        HOME › USED CARS IN AHMEDABAD › TATA CARS › USED 2021 TATA HARRIER
      </p>

      {/* Rating */}
      <div className="flex items-center gap-2">
        <Star className="text-yellow-400" size={16} />
        <span className="text-sm text-primary font-medium">CAR RATE 4.5</span>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl text-primary sm:text-3xl 3xl:text-4xl font-bold">
          Tata Harrier XZ Plus
        </h1>

        <div className="bg-secondary text-primary px-4 py-2 rounded-lg text-right  w-fit">
          <p className="text-lg font-semibold">₹13.15 Lakh</p>
        </div>
      </div>
    </header>
  );
}
