"use client";

import { useRef } from "react";
import PromoCard from "@/components/ui/const/PromoCard";

export default function PromoCardRow() {
  const scrollRef = useRef(null);

  return (
    <div className="relative w-full">
      {/* SCROLL AREA */}
      <div
        ref={scrollRef}
        className="
          flex gap-3 sm:gap-6
          items-center
          overflow-x-auto
          snap-x snap-mandatory
          scrollbar-hide

          justify-between
          lg:justify-between
        "
      >
        <PromoCard
          image="/promo_bg.png"
          title="Best Cars Available At AVX"
          description="Premium & verified listings"
        />

        <PromoCard
          image="/promo_bg.png"
          title="Luxury Cars Starting Today"
          description="Drive your dream ride"
        />

        <PromoCard
          image="/promo_bg.png"
          title="Top Deals On Used Cars"
          description="Limited time offers"
        />
      </div>
    </div>
  );
}
