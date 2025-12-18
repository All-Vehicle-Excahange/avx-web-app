"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ConsultantCard from "@/components/ui/const/ConsultCard";

export default function ConsultantSliderSection({ title, data }) {
  const sliderRef = useRef(null);

  const scroll = (dir) => {
    sliderRef.current?.scrollBy({
      left: dir === "left" ? -360 : 360,
      behavior: "smooth",
    });
  };

  return (
    <section className="w-full mb-8 overflow-hidden">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl md:text-2xl lg:4xl  font-bold text-primary">
          {title}
        </h2>

        <div className="flex gap-2">
          <button
            onClick={() => scroll("left")}
            className="h-9 w-9 rounded-full border bg-primary border-third/40 flex items-center justify-center"
          >
            <ChevronLeft size={18} />
          </button>

          <button
            onClick={() => scroll("right")}
            className="h-9 w-9 rounded-full bg-primary border border-third/40 flex items-center justify-center"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* SLIDER */}
      <div className="w-full overflow-hidden">
        <div
          ref={sliderRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide max-w-full"
        >
          {data.map((c) => (
            <div key={c.id} className="min-w-[350px]">
              <ConsultantCard
                image={c.image}
                logo={c.logo}
                name={c.name}
                location={c.location}
                rating={c.rating}
                vehicleCount={c.vehicleCount}
                priceRange={c.priceRange}
                isSponsored={c.isSponsored}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
