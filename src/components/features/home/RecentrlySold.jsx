import React from "react";
import VehicleCard from "@/components/ui/const/VehicleCard";
import Button from "@/components/ui/button";
import VehicleCardSkeleton from "@/components/ui/skeleton/VehicleCardSkeleton";
import { useQuery } from "@tanstack/react-query";
import { getRecentlySoldQuery } from "@/queries/user.queries";


const RecentrlySold = () => {
  const queryPayload = {
    pageNo: 1,
    size: 4,
  };

  const { data: vehicle = [], isLoading } = useQuery(
    getRecentlySoldQuery(queryPayload)
  );

  if (!isLoading && !vehicle.length) return null;

  return (
    <div className="w-full py-10">
      {/* Header */}
      <div className="flex justify-between items-end mb-6">
        <div className="flex flex-col items-start gap-2">
          <p className="mb-2 inline-block text-sm tracking-[0.4em] uppercase text-third font-semibold relative">
            Recently
            <span className="absolute left-0 -bottom-2 h-0.5 w-16 bg-linear-to-r from-neutral-100 to-transparent" />
          </p>

          <h2 className="text-2xl md:text-3xl font-bold font-primary tracking-tight text-primary">
            <span className="text-fourth">Recently</span>   Sold on Reecomm
          </h2>
          <p className="text-third w-4xl">
            Real cars. Real buyers. Real prices. See what&apos;s been selling on Reecomm lately.

          </p>
        </div>
      </div>

      <div className="flex-1 min-h-0 grid sm:items-center grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {isLoading
          ? [...Array(4)].map((_, i) => <VehicleCardSkeleton key={`skel-${i}`} />)
          : vehicle.map((car) => (
            <VehicleCard data={car} key={car.id} source="home" />
          ))
        }
      </div>
      {vehicle.length >= 4 && (
        <div className="mt-4 flex justify-end">
          <Button href="/search" variant="outlineAnimated" size="md">
            Explore All Vehicles
          </Button>
        </div>
      )}
    </div>
  );
};

export default RecentrlySold;
