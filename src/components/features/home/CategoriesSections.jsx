/* eslint-disable react-hooks/set-state-in-effect */


import React, { useEffect, useState } from "react";
import { Car, Bike } from "lucide-react";
import VehicleCard from "@/components/ui/const/VehicleCard";
import Button from "@/components/ui/button";
import {
  getFourWheelWithTag,
  getTwoWheelWithTag,
} from "@/services/user.service";
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
    { id: "urban-rides", label: "Urban Rides", icon: Car },
    { id: "city-compact", label: "City Compact", icon: Car },
    { id: "comfort-sedans", label: "Comfort Sedans", icon: Car },
    { id: "compact-suvs", label: "Compact SUVs", icon: Car },
    { id: "fullsize-suvs-muvs", label: "Full-Size SUVs & MUVs", icon: Car },
    { id: "premium-luxury", label: "Premium & Luxury", icon: Car },
  ],
  "2-Wheeler": [
    { id: "scooters", label: "Scooters", icon: Bike },
    { id: "commuter-bikes", label: "Commuter Bikes", icon: Bike },
    { id: "sports-bikes", label: "Sports Bikes", icon: Bike },
    { id: "cruiser-retro", label: "Cruiser & Retro", icon: Bike },
    { id: "adventure-touring", label: "Adventure & Touring", icon: Bike },
    { id: "electric-2w", label: "Electric 2W", icon: Bike },
  ],
};

const CategoriesSections = () => {
  const [activeType, setActiveType] = useState("4-Wheeler");
  const [active, setActive] = useState("urban-rides");
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const checkedCategories = React.useRef(new Set());
  const fetchVehicles = async () => {
    setLoading(true);
    try {
      const selectedTag = vehicleTagMap[activeType]?.[active];
      if (!selectedTag) return;

      const data = {
        pageNo: 1,
        size: 4,
        vehicleTag: selectedTag,
      };

      let res;

      if (activeType === "4-Wheeler") {
        res = await getFourWheelWithTag(data);
      } else {
        res = await getTwoWheelWithTag(data);
      }

      const fetchedVehicles = res?.data || [];
      checkedCategories.current.add(selectedTag);

      if (fetchedVehicles.length === 0) {
        // Find next category
        const categories = categoriesByType[activeType];
        const currentIndex = categories.findIndex((c) => c.id === active);
        const nextCategoryIndex = (currentIndex + 1) % categories.length;
        const nextCategory = categories[nextCategoryIndex];

        const nextTag = vehicleTagMap[activeType]?.[nextCategory.id];

        // If we haven't checked the next tag yet, switch to it
        if (!checkedCategories.current.has(nextTag)) {
          setActive(nextCategory.id);
          return; // The useEffect will re-trigger fetchVehicles
        }
      }

      setVehicles(fetchedVehicles);
    } catch (error) {
      console.error("Error fetching vehicles:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchVehicles();
  }, [active]);

  return (
    <section className="w-full h-full flex flex-col text-primary">
      <div className="container">
        <div className="shrink-0 flex flex-col md:flex-row md:items-end justify-between mb-4 gap-4">
          <div className="flex flex-col items-start gap-2">
            <p className="mb-2 inline-block text-sm tracking-[0.4em] uppercase text-third font-semibold relative">
              All Vehicles
              <span className="absolute left-0 -bottom-2 h-0.5 w-16 bg-gradient-to-r from-neutral-100 to-transparent" />
            </p>

            <h2 className="text-2xl md:text-3xl font-bold font-primary tracking-tight text-primary">
              Not sure what to buy? <span className="text-fourth">Start here</span>
            </h2>

            <p className="text-third ">
              Lorem ipsum dolor sit amet consectetur dolor sit amet consectetur..
            </p>
          </div>

          {/* Toggle Switch */}
          <div className="flex gap-1 sm:gap-2 mt-auto justify-end w-full sm:w-fit">
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
                "px-3 py-1 text-xs sm:text-sm font-medium rounded-full border cursor-pointer flex items-center justify-center gap-1 transition-all whitespace-nowrap shrink-0",
                activeType === "4-Wheeler"
                  ? "bg-fourth text-primary border-fourth shadow-sm"
                  : "text-primary border-white/20 hover:border-primary/40",
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
                "px-3 py-1 text-xs sm:text-sm font-medium rounded-full border cursor-pointer flex items-center justify-center gap-1 transition-all whitespace-nowrap shrink-0",
                activeType === "2-Wheeler"
                  ? "bg-fourth text-primary border-fourth shadow-sm"
                  : "text-primary border-white/20 hover:border-primary/40",
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
                      : "text-primary border-white/20 hover:border-primary/40"
                  )}
                >
                  {cat.icon && <cat.icon size={18} />}
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Vehicle Grid */}
        <div className="flex-1 min-h-0 grid sm:items-center grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {loading ? (
            [...Array(4)].map((_, i) => (
              <VehicleCardSkeleton key={`skel-${i}`} />
            ))
          ) : vehicles.length === 0 ? (
            <div className="col-span-full text-center py-10">
              <p className="text-lg font-semibold text-primary">
                No Vehicles Found
              </p>
              <p className="text-sm text-third mt-2">
                Try selecting another category.
              </p>
            </div>
          ) : (
            vehicles.map((car) => (
              <VehicleCard key={car.id} data={car} className="lg:col-span-3" source="home" />
            ))
          )}
        </div>


        {/* Bottom Button */}
        <div className="mt-7 flex justify-end">
          <Button href="/search" variant="outlineAnimated" size="md">
            Explore All Vehicles
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CategoriesSections;
