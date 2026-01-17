"use client";

import Image from "next/image";
import { Heart } from "lucide-react";

export default function RecentlyVisitedCard({ data }) {
  return (
    <div
      className="
        relative
        bg-primary/10
        rounded-lg
        shadow-sm
        transition-all duration-300
        overflow-hidden
        border border-primary/20
       shrink-0
        w-[220px]
      "
    >
      {/* IMAGE WITH PADDING */}
      <div className="p-2">
        <div className="relative h-[140px] rounded-md overflow-hidden">
          <Image
            src={data.image}
            alt={data.title}
            fill
            className="
              object-cover
              transition-transform duration-500
              hover:scale-105
            "
          />
        </div>
      </div>

      {/* CONTENT */}
      <div className="px-3 pb-3">
        {/* TITLE + HEART */}
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="text-xs md:text-[15px] font-bold leading-tight tracking-wide line-clamp-2">
            {data.title}
          </h3>

          {/* WISHLIST ICON */}
          <button className="text-primary hover:text-red-500 transition-colors">
            <Heart className="w-4 h-4" />
          </button>
        </div>

        {/* PRICE */}
        <div className="flex items-center justify-between">
          <div className="text-sm font-bold text-primary">₹{data.price}</div>
        </div>
      </div>

      {/* HOVER OVERLAY */}
      <div className="absolute inset-0 bg-blue-600/5 opacity-0 hover:opacity-100 transition-opacity pointer-events-none" />
    </div>
  );
}
