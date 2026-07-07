import React, { useEffect, useState } from "react";
import { Car, Bike } from "lucide-react";
import VehicleCard from "@/components/ui/const/VehicleCard";
import Button from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { getVehiclesByTagQuery } from "@/queries/user.queries";
import VehicleCardSkeleton from "@/components/ui/skeleton/VehicleCardSkeleton";

const cn = (...classes) => classes.filter(Boolean).join(" ");

/* ============================= */
/* VEHICLE TAG MAPPING (NEW) */
/* ============================= */

const vehicleTagMap = {
  "4-Wheeler": {
    "urban-rides": "URBAN_RIDE",
    "city-compact": "CITY_COMPACT",
    "comfort-sedans": "COMFORT_SEDAN",
    "compact-suvs": "COMPACT_SUV",
    "fullsize-suvs-muvs": "FULL_SIZE_SUV_MUV",
    "premium-luxury": "PREMIUM_LUXURY",
  },
  "2-Wheeler": {
    scooters: "SCOOTER",
    "commuter-bikes": "COMMUTER_BIKE",
    "sports-bikes": "SPORTS_BIKE",
    "cruiser-retro": "CRUISER_AND_RETRO",
    "adventure-touring": "ADVENTURE_AND_TOURING",
    "electric-2w": "ELECTRIC_2WHEELER",
  },
};

const categoriesByType = {
  "4-Wheeler": [
    { id: "urban-rides", label: "Urban Rides", icon: Car, iconUrl: "/icons/car_URBAN RIDER.svg" },
    { id: "city-compact", label: "City Compact", icon: Car, iconUrl: "/icons/car_CITY COMPACT.svg" },
    { id: "comfort-sedans", label: "Comfort Sedans", icon: Car, iconUrl: "/icons/car_COMFERT SEDAN.svg" },
    { id: "compact-suvs", label: "Compact SUVs", icon: Car, iconUrl: "/icons/car_COMPACT SUVS.svg" },
    { id: "fullsize-suvs-muvs", label: "Full-Size SUVs & MUVs", icon: Car, iconUrl: "/icons/car_FULL SIZE SUV.svg" },
    { id: "premium-luxury", label: "Premium & Luxury", icon: Car },
  ],
  "2-Wheeler": [
    { id: "scooters", label: "Scooters", icon: Bike, iconUrl: "/icons/bike_Scooter.svg" },
    { id: "commuter-bikes", label: "Commuter Bikes", icon: Bike, iconUrl: "/icons/bike_Commuter Bike.svg" },
    { id: "sports-bikes", label: "Sports Bikes", icon: Bike, iconUrl: "/icons/bike_Sport Bike.svg" },
    { id: "cruiser-retro", label: "Cruiser & Retro", icon: Bike, iconUrl: "/icons/bike_Cruiser & Retro.svg" },
    { id: "adventure-touring", label: "Adventure & Touring", icon: Bike },
    { id: "electric-2w", label: "Electric 2W", icon: Bike, iconUrl: "/icons/bike_Electric 2W.svg" },
  ],
};

const CategoriesSections = () => {
  const [activeType, setActiveType] = useState("4-Wheeler");
  const [active, setActive] = useState("urban-rides");
  const checkedCategories = React.useRef(new Set());

  const selectedTag = vehicleTagMap[activeType]?.[active];
  const queryPayload = {
    pageNo: 1,
    size: 4,
    vehicleTag: selectedTag,
  };

  const { data: vehicles = [], isLoading } = useQuery(
    getVehiclesByTagQuery(activeType, queryPayload)
  );

  // Auto-play / switch to next category if currently loaded category is empty
  useEffect(() => {
    if (!isLoading && vehicles.length === 0 && selectedTag) {
      checkedCategories.current.add(selectedTag);

      // Find next category based on the category that just completed
      const categories = categoriesByType[activeType];
      const currentIndex = categories.findIndex((c) => c.id === active);

      if (currentIndex === -1) return;

      const nextCategoryIndex = (currentIndex + 1) % categories.length;
      const nextCategory = categories[nextCategoryIndex];
      const nextTag = vehicleTagMap[activeType]?.[nextCategory.id];

      // If we haven't checked the next tag yet, switch to it
      if (nextTag && !checkedCategories.current.has(nextTag)) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setActive(nextCategory.id);
      }
    }
  }, [
    vehicles,
    isLoading,
    active,
    activeType,
    selectedTag,
  ]);

  return (
    <section className="w-full h-full flex flex-col text-primary">
      <div className="container">
        <div className="shrink-0 flex flex-col md:flex-row md:items-end justify-between mb-4 gap-4">
          <div className="flex flex-col items-start gap-2">
            <p className="mb-2 inline-block text-sm tracking-[0.4em] uppercase text-third font-semibold relative">
              All Vehicles
              <span className="absolute left-0 -bottom-2 h-0.5 w-16 bg-linear-to-r from-neutral-100 to-transparent" />
            </p>

            <h2 className="text-2xl md:text-3xl font-bold font-primary tracking-tight text-primary">
              Not sure what to buy?{" "}
              <span className="text-fourth">Start here</span>
            </h2>

            <p className="text-third w-full max-w-2xl">
              Not sure where to start? Browse by the type of car that fits your
              life — and your budget.
            </p>
          </div>

          {/* Toggle Switch */}
          <div className="flex p-0.5 bg-neutral-950/80 border border-white/10 rounded-full w-fit mt-auto ml-auto sm:ml-0 shrink-0">
            <button
              type="button"
              onClick={() => {
                if (activeType !== "4-Wheeler") {
                  checkedCategories.current.clear();
                  setActiveType("4-Wheeler");
                  setActive("urban-rides");
                }
              }}
              className={cn(
                "px-3.5 py-1.5 text-xs sm:text-sm font-medium rounded-full cursor-pointer flex items-center justify-center gap-1.5 transition-all duration-300 whitespace-nowrap shrink-0",
                activeType === "4-Wheeler"
                  ? "bg-fourth text-white shadow-md"
                  : "text-third hover:text-primary",
              )}
            >
              <Car size={16} /> 4-Wheeler
            </button>
  
            <button
              type="button"
              onClick={() => {
                if (activeType !== "2-Wheeler") {
                  checkedCategories.current.clear();
                  setActiveType("2-Wheeler");
                  setActive("scooters");
                }
              }}
              className={cn(
                "px-3.5 py-1.5 text-xs sm:text-sm font-medium rounded-full cursor-pointer flex items-center justify-center gap-1.5 transition-all duration-300 whitespace-nowrap shrink-0",
                activeType === "2-Wheeler"
                  ? "bg-fourth text-white shadow-md"
                  : "text-third hover:text-primary",
              )}
            >
              <Bike size={16} /> 2-Wheeler
            </button>
          </div>
        </div>

        {/* Categories */}
        <div className="w-full my-6">
          <div className="flex items-center gap-3 overflow-x-auto no-scrollbar whitespace-nowrap">
            {categoriesByType[activeType].map((cat) => {
              const isActive = active === cat.id;

              return (
                <button
                  key={cat.id}
                  onClick={() => setActive(cat.id)}
                  className={cn(
                    "flex items-center gap-2 shrink-0 px-5 py-2 text-sm font-semibold rounded-full border transition-all cursor-pointer",
                    isActive
                      ? "bg-fourth text-primary border-fourth shadow-sm"
                      : "text-primary border-white/20 hover:border-primary/40",
                  )}
                >
                  {cat.iconUrl ? (
                    <img src={cat.iconUrl} alt={cat.label} className={`w-5 h-5 object-contain ${isActive ? "" : "opacity-80"}`} />
                  ) : cat.icon ? (
                    <cat.icon size={18} />
                  ) : null}
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Vehicle Grid */}
        <div className="flex-1 min-h-0 grid sm:items-center grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {isLoading ? (
            [...Array(4)].map((_, i) => (
              <VehicleCardSkeleton key={`skel-${i}`} />
            ))
          ) : vehicles.length === 0 ? (
            <div className="col-span-full text-center py-10">
              <h3 className="text-lg font-semibold text-primary/50">
                No Vehicles Found
              </h3>
              <p className="text-sm text-third/80 mt-2">
                Try selecting another category.
              </p>
            </div>
          ) : (
            vehicles.map((car) => (
              <VehicleCard
                key={car.id}
                data={car}
                className="lg:col-span-3"
                source="home"
              />
            ))
          )}
        </div>

        {/* Bottom Button */}
        {vehicles.length >= 4 && (
          <div className="mt-7 flex justify-end">
            <Button href="/search" variant="outlineAnimated" size="md">
              Explore All Vehicles
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default CategoriesSections;
