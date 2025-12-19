"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ConsultantCard from "@/components/ui/const/ConsultCard";
import Button from "@/components/ui/button";

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
          <Button
            onClick={() => scroll("left")}
            variant="roundedOutline"
            showIcon={false}
          >
            <ChevronLeft size={18} />
          </Button>

          <Button
            onClick={() => scroll("right")}
            variant="roundedOutline"
            showIcon={false}
          >
            <ChevronRight size={18} />
          </Button>
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
