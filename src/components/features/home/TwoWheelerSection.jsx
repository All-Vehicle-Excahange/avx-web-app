import React, { useState } from "react";
import { motion } from "framer-motion";
import { Bike } from "lucide-react";
import VehicleCard from "@/components/ui/const/VehicleCard";
import Button from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { getVehiclesByTagQuery } from "@/queries/user.queries";
import { useLocationStore } from "@/stores/useLocationStore";
import VehicleCardSkeleton from "@/components/ui/skeleton/VehicleCardSkeleton";

const cn = (...classes) => classes.filter(Boolean).join(" ");

const vehicleTagMap = {
  scooters: "SCOOTER",
  "commuter-bikes": "COMMUTER_BIKE",
  "sports-bikes": "SPORTS_BIKE",
  "cruiser-retro": "CRUISER_AND_RETRO",
  "adventure-touring": "ADVENTURE_AND_TOURING",
  "electric-2w": "ELECTRIC_2WHEELER",
};

const categories = [
  {
    id: "scooters",
    label: "Scooters",
    icon: Bike,
    iconUrl: "/icons/bike_Scooter.svg",
  },
  {
    id: "commuter-bikes",
    label: "Commuter Bikes",
    icon: Bike,
    iconUrl: "/icons/bike_Commuter Bike.svg",
  },
  {
    id: "sports-bikes",
    label: "Sports Bikes",
    icon: Bike,
    iconUrl: "/icons/bike_Sport Bike.svg",
  },
  {
    id: "cruiser-retro",
    label: "Cruiser & Retro",
    icon: Bike,
    iconUrl: "/icons/bike_Cruiser & Retro.svg",
  },
  {
    id: "adventure-touring",
    label: "Adventure & Touring",
    icon: Bike,
    iconUrl: "/icons/bike_Adventure.svg",
  },
  {
    id: "electric-2w",
    label: "Electric 2W",
    icon: Bike,
    iconUrl: "/icons/bike_Electric 2W.svg",
  },
];

export default function TwoWheelerSection() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const { cityId, stateId } = useLocationStore();

  const active = selectedCategory || categories[0].id;
  const activeTag = vehicleTagMap[active];

  // Fetch ONLY the currently active category (lazy loads on tab click, avoids multiple costly API calls)
  const { data: vehicles = [], isLoading } = useQuery(
    getVehiclesByTagQuery("2-Wheeler", {
      pageNo: 1,
      size: 4,
      vehicleTag: activeTag,
      ...(cityId ? { cityId } : {}),
      ...(stateId ? { stateId } : {}),
    })
  );

  return (
    <section className="w-full h-full flex flex-col text-primary py-4 md:py-6">
      {/* Header Section */}
      <div className="shrink-0 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="flex flex-col items-start gap-2">
          <p className="mb-2 inline-block text-sm tracking-[0.4em] uppercase text-third font-semibold relative">
            Two-Wheelers
            <span className="absolute left-0 -bottom-2 h-0.5 w-16 bg-linear-to-r from-neutral-100 to-transparent" />
          </p>

          <h2 className="text-2xl md:text-3xl font-bold font-primary tracking-tight text-primary">
            Explore Top <span className="text-fourth">Two-Wheelers</span>
          </h2>

          <p className="text-third w-full max-w-2xl">
            Find verified bikes and scooters that fit your ride and budget.
          </p>
        </div>
      </div>

      {/* Categories Tabs */}
      <div className="w-full my-6">
        <div className="flex items-center gap-3 overflow-x-auto no-scrollbar whitespace-nowrap">
          {categories.map((cat) => {
            const isActive = active === cat.id;

            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  setSelectedCategory(cat.id);
                }}
                className={cn(
                  "relative flex items-center gap-2 shrink-0 px-5 py-1 text-sm font-semibold rounded-full border transition-all cursor-pointer",
                  isActive
                    ? "text-primary border-transparent shadow-sm"
                    : "text-primary border-white/20 hover:border-primary/40 bg-transparent",
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTwoWheelerCategoryBg"
                    className="absolute inset-0 bg-fourth rounded-full border border-fourth"
                    transition={{ type: "tween", ease: "easeInOut", duration: 0.3 }}
                  />
                )}
                <div className="relative z-10 flex items-center gap-2">
                  {cat.iconUrl ? (
                    <img
                      src={cat.iconUrl}
                      alt={cat.label}
                      className="w-8 h-7 object-contain"
                    />
                  ) : cat.icon ? (
                    <cat.icon size={18} />
                  ) : null}
                  {cat.label}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Vehicle Grid */}
      <div className="flex-1 min-h-0 grid sm:items-center grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {isLoading ? (
          [...Array(4)].map((_, i) => (
            <VehicleCardSkeleton key={`skel-2w-${i}`} />
          ))
        ) : vehicles.length === 0 ? (
          <div className="col-span-full text-center py-10">
            <h3 className="text-lg font-semibold text-primary/50">
              No Two-Wheelers Found
            </h3>
            <p className="text-sm text-third/80 mt-2">
              Try selecting another category.
            </p>
          </div>
        ) : (
          vehicles.map((bike) => (
            <VehicleCard
              key={bike.id}
              data={bike}
              source="home"
            />
          ))
        )}
      </div>

      {/* Bottom Button */}
      {!isLoading && vehicles.length > 0 && (
        <div className="mt-7 flex justify-end">
          <Button
            href={`/search/buy-used-two-wheelers${active ? `?category=${active}` : ""}`}
            variant="outlineAnimated"
            size="md"
          >
            Explore All Two-Wheelers
          </Button>
        </div>
      )}
    </section>
  );
}
