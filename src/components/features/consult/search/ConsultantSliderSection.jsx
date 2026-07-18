"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight, Info } from "lucide-react";
import ConsultantCard from "@/components/ui/const/ConsultCard";
import Button from "@/components/ui/button";
import ConsultantCardSkeleton from "@/components/ui/skeleton/ConsultantCardSkeleton";
import EmptyState from "@/components/ui/EmptyState";

export default function ConsultantSliderSection({
  title,
  data,
  loading = false,
  emptyTitle,
  emptyDescription,
  showIsSponsored = false,
  description,
}) {
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
        <div className="flex flex-col items-start gap-2">
          <p className="mb-2 inline-block text-sm tracking-[0.4em] uppercase text-third font-semibold relative">
            Premium
            <span className="absolute left-0 -bottom-2 h-0.5 w-16 bg-linear-to-r from-neutral-100 to-transparent" />
          </p>

          <div>
            <h2 className="text-2xl md:text-3xl font-bold font-primary tracking-tight text-primary">
              {title}
            </h2>
            {showIsSponsored && (
              <div className="flex items-center gap-1 mt-1 text-xs text-third">
                <span>Sponsored</span>

                <button
                  type="button"
                  className="w-4 h-4 flex items-center justify-center rounded-full border border-third/40 hover:bg-third/10 transition"
                  aria-label="Sponsored info"
                >
                  <Info className="w-3 h-3" />
                </button>
              </div>
            )}
            <p className="text-third mt-1">
              {description || "Lorem ipsum dolor sit amet consectetur dolor sit amet consectetur.."}
            </p>
          </div>
        </div>
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
          {loading ? (
            [...Array(3)].map((_, idx) => (
              <div key={`skel-${idx}`} className="min-w-[350px]">
                <ConsultantCardSkeleton />
              </div>
            ))
          ) : data && data.length > 0 ? (
            data.map((c) => (
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
            ))
          ) : (
            <div className="w-full py-8">
              <EmptyState title={emptyTitle || "No consultants found"} description={emptyDescription || "Please check back later."} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
