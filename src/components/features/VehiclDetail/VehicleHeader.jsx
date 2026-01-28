"use client";

import { ChevronRight, Star } from "lucide-react";

export default function VehicleHeader() {
  return (
    <header className="w-full space-y-3 pt-6">
      {/* Breadcrumb */}
      <p className="text-xs sm:text-sm text-third flex items-center gap-1">
        HOME <ChevronRight size={16} /> USED CARS IN AHMEDABAD <ChevronRight size={16} /> TATA CARS <ChevronRight size={16} /> USED 2021 TATA HARRIER
      </p>

      {/* Rating */}
      <div className="flex items-center gap-2">
        <Star className="text-yellow-400" size={16} />
        <span className="text-sm text-primary font-medium">Inspection Rating 4.5</span>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl text-primary sm:text-3xl 3xl:text-4xl font-bold">
          Tata Harrier XZ Plus
        </h1>

        <div className="bg-primary text-secondary px-4 py-2 rounded-lg text-right  w-fit">
          <p className="text-lg font-semibold">₹13.15 Lakh</p>
        </div>
      </div>
    </header>
  );
}
