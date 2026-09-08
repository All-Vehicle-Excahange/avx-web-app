import React, { useRef } from "react";
import VehicleCard from "@/components/ui/const/VehicleCard";
import CommonSwiper from "@/components/ui/CommonSwiper";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Button from "@/components/ui/button";
import VehicleCardSkeleton from "@/components/ui/skeleton/VehicleCardSkeleton";
import { useQuery } from "@tanstack/react-query";
import { getRecentlySoldQuery } from "@/queries/user.queries";


const RecentrlySold = () => {
  const queryPayload = {
    pageNo: 1,
    size: 15,
  };

  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const { data: vehicle = [], isLoading } = useQuery(
    getRecentlySoldQuery(queryPayload)
  );

  if (!isLoading && (!Array.isArray(vehicle) || vehicle.length === 0)) {
    return null;
  }

  return (
    <div className="w-full py-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end mb-6 gap-4">
        <div className="flex flex-col items-start gap-2 flex-1">
          <p className="mb-2 inline-block text-sm tracking-[0.4em] uppercase text-third font-semibold relative">
            Recently
            <span className="absolute left-0 -bottom-2 h-0.5 w-16 bg-linear-to-r from-neutral-100 to-transparent" />
          </p>

          <h2 className="text-2xl md:text-3xl font-bold font-primary tracking-tight text-primary">
            <span className="text-fourth">Recently</span>   Sold on Reecomm
          </h2>
          <p className="text-third max-w-3xl">
            Real cars. Real buyers. Real prices. See what&apos;s been selling on Reecomm lately.
          </p>
        </div>

        {/* ARROWS */}
        {!isLoading && vehicle.length > 0 && (
          <div className="flex gap-2 shrink-0 justify-end">
            <Button variant="roundedOutline" showIcon={false} ref={prevRef}>
              <ChevronLeft size={18} />
            </Button>
            <Button variant="roundedOutline" showIcon={false} ref={nextRef}>
              <ChevronRight size={18} />
            </Button>
          </div>
        )}
      </div>

      <div className="w-full">
        {isLoading ? (
          <div className="flex gap-4 overflow-hidden">
            {[...Array(4)].map((_, i) => (
              <div key={`skel-${i}`} className="min-w-[340px]">
                <VehicleCardSkeleton />
              </div>
            ))}
          </div>
        ) : (
          <CommonSwiper
            data={vehicle}
            CardComponent={VehicleCard}
            prevRef={prevRef}
            nextRef={nextRef}
            extraCardProps={{ source: "home", isSold: true }}
          />
        )}
      </div>
    </div>
  );
};

export default RecentrlySold;
