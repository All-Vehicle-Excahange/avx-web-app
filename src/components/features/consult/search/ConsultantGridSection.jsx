"use client";

import ConsultantCard from "@/components/ui/const/ConsultCard";
import Button from "@/components/ui/button";

export default function ConsultantGridSection({
  title,
  data,
  i = 3,
  showViewAll = false,
}) {
  return (
    <section className="w-full mb-8">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl md:text-2xl lg:4xl  font-bold text-primary">
          {title}
        </h2>

        {showViewAll && (
          <Button variant="ghost" showIcon={false} className="text-sm">
            View all
          </Button>
        )}
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-4">
        {data.slice(0, i).map((c) => (
          <ConsultantCard
            key={c.id}
            image={c.image}
            logo={c.logo}
            name={c.name}
            location={c.location}
            rating={c.rating}
            vehicleCount={c.vehicleCount}
            priceRange={c.priceRange}
            isSponsored={c.isSponsored}
          />
        ))}
      
      </div>
    </section>
  );
}
