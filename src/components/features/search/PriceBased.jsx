/* eslint-disable react-hooks/set-state-in-effect */

import Button from "@/components/ui/button";
import VehicleCard from "@/components/ui/const/VehicleCard";
import React, { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Info } from "lucide-react";
import CommonSwiper from "@/components/ui/CommonSwiper";
import VehicleCardSkeleton from "@/components/ui/skeleton/VehicleCardSkeleton";

const PriceBased = ({ data, title, loading = false }) => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [cardData, setCardData] = useState(data || []);

  useEffect(() => {
    setCardData(data || []);
  }, [data]);

  return (
    <div className="">
      {/* Header */}
      <div className="flex justify-between items-end mb-6">
        <div className="flex flex-col items-start gap-2">
          <p className="mb-2 inline-block text-sm tracking-[0.4em] uppercase text-third font-semibold relative">
            Vehicle
            <span className="absolute left-0 -bottom-2 h-0.5 w-16 bg-linear-to-r from-neutral-100 to-transparent" />
          </p>

          <h2 className="text-2xl md:text-3xl font-bold font-primary tracking-tight text-primary">
            {title || "SUVs Between ₹8L – ₹12L"}
          </h2>
          <p className="text-third">
            Lorem ipsum dolor sit amet consectetur dolor sit amet
            consectetur..
          </p>
        </div>

        <div className="flex gap-3">
          <Button variant="roundedOutline" ref={prevRef}>
            <ChevronLeft className="w-5 h-5" />
          </Button>

          <Button variant="roundedOutline" ref={nextRef}>
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Swiper */}
      {loading ? (
        <CommonSwiper
          data={[{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }]}
          CardComponent={() => <VehicleCardSkeleton />}
          prevRef={prevRef}
          nextRef={nextRef}
        />
      ) : (
        <CommonSwiper
          data={cardData}
          CardComponent={VehicleCard}
          prevRef={prevRef}
          nextRef={nextRef}
        />
      )}
    </div>
  );
};

export default PriceBased;
