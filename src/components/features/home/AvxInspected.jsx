import React, { useRef, useState, useEffect } from "react";
import VehicleCard from "@/components/ui/const/VehicleCard";
import Button from "@/components/ui/button";
import { Bike, Car, ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";

// --- Utility for Tailwind classes ---
const cn = (...classes) => classes.filter(Boolean).join(" ");

const smallCars = [
  {
    id: "1",
    title: "Maruti Fronx",
    subtitle: "35 D6 Powerful lorem isump",
    year: "2022",
    transmission: "Manual",
    fuel: "Diesel",
    seats: "5",
    rating: "4.3",
    price: "6,75,998",
    image: "/olx1.png",
    sponsored: false,
  },
  {
    id: "2",
    title: "Maruti Fronx",
    subtitle: "35 D6 Powerful lorem isump",
    year: "2022",
    transmission: "Manual",
    fuel: "Diesel",
    seats: "5",
    rating: "4.3",
    price: "6,75,998",
    image: "/olx2.png",
    sponsored: false,
  },
  {
    id: "3",
    title: "Maruti Fronx",
    subtitle: "35 D6 Powerful lorem isump",
    year: "2022",
    transmission: "Manual",
    fuel: "Diesel",
    seats: "5",
    rating: "4.3",
    price: "6,75,998",
    image: "/olx3.png",
    sponsored: false,
  },
  {
    id: "1",
    title: "Maruti Fronx",
    subtitle: "35 D6 Powerful lorem isump",
    year: "2022",
    transmission: "Manual",
    fuel: "Diesel",
    seats: "5",
    rating: "4.3",
    price: "6,75,998",
    image: "/olx1.png",
    sponsored: false,
  },
  {
    id: "2",
    title: "Maruti Fronx",
    subtitle: "35 D6 Powerful lorem isump",
    year: "2022",
    transmission: "Manual",
    fuel: "Diesel",
    seats: "5",
    rating: "4.3",
    price: "6,75,998",
    image: "/olx2.png",
    sponsored: false,
  },
  {
    id: "3",
    title: "Maruti Fronx",
    subtitle: "35 D6 Powerful lorem isump",
    year: "2022",
    transmission: "Manual",
    fuel: "Diesel",
    seats: "5",
    rating: "4.3",
    price: "6,75,998",
    image: "/olx3.png",
    sponsored: false,
  },
];

export default function AvxInspected() {
  const [activeType, setActiveType] = useState("4-Wheeler");
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const swiperRef = useRef(null);

  useEffect(() => {
    if (!swiperRef.current) return;

    const swiper = swiperRef.current;

    // Attach navigation AFTER mount
    swiper.params.navigation.prevEl = prevRef.current;
    swiper.params.navigation.nextEl = nextRef.current;

    swiper.navigation.init();
    swiper.navigation.update();
  }, []);


  return (
    <div className="w-full h-full flex flex-col bg-primary text-secondary font-sans rounded-lg">
      {/* Header Section */}
      <div className="shrink-0 flex flex-col md:flex-row items-center justify-between mb-4 gap-4 pt-3 pr-3">
        <div>
          <h2 className="text-3xl font-bold tracking-tight bg-secondary text-primary p-3 pr-12 inline-block clip-slanted">
            AVX Inspected Vehicles
          </h2>
        </div>
        <div className="flex gap-3 mt-2">
          <Button variant="roundedOutline" ref={prevRef}>
            <ChevronLeft className="w-5 h-5 text-secondary" />
          </Button>

          <Button variant="roundedOutline" ref={nextRef}>
            <ChevronRight className="w-5 h-5 text-secondary" />
          </Button>
        </div>

      </div>

      {/* Grid Layout */}
      <div className=" flex-1 min-h-0 grid sm:items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-3">
        {/* inspection info start */}
        {/* <div className="lg:col-span-1 lg:row-span-1 h-full">
          <ul className="list-disc list-inside mb-6 space-y-1 text-secondary">
            <li>Verified</li>
            <li>Transparent</li>
            <li>Trusted</li>
          </ul>
          <div className="bg-secondary p-1 rounded-lg flex flex-col items-center">
            <button
              onClick={() => setActiveType("4-Wheeler")}
              className={cn(
                "w-full py-2 text-sm font-semibold rounded-md flex item-center justify-center gap-2 transition-all cursor-pointer",
                activeType === "4-Wheeler"
                  ? "bg-primary text-secondary shadow-sm"
                  : "text-primary/60 hover:text-primary"
              )}
            >
              <Car size={18} /> 4-Wheeler
            </button>
 
            <button
              onClick={() => setActiveType("2-Wheeler")}
              className={cn(
                "w-full py-2 text-sm font-semibold rounded-md flex item-center justify-center gap-2 transition-all cursor-pointer",
                activeType === "2-Wheeler"
                  ? "bg-primary text-secondary shadow-sm"
                  : "text-primary/60 hover:text-primary"
              )}
            >
              <Bike size={18} /> 2-Wheeler
            </button>
          </div>
        </div> */}


        {/* inspection info start */}
        <div className="lg:col-span-1 lg:row-span-1 h-full flex flex-col">

          {/* Section label */}
          <div className="mb-6">
            <p className="text-xs uppercase tracking-widest text-secondary/60">
              Inspection Standard
            </p>
          </div>

          {/* Inspection Rail */}
          <div className="relative pl-8 mb-12">

            {/* Vertical rail */}
            <span className="absolute left-[15px] top-2 h-[calc(100%-1rem)] w-px bg-gradient-to-b from-secondary/70 via-secondary/30 to-secondary/10" />

            {[
              {
                step: "01",
                title: "Verified",
                desc: "Documents & ownership checked",
                color: "bg-green-500",
              },
              {
                step: "02",
                title: "Transparent",
                desc: "Clear pricing & inspection details",
                color: "bg-blue-500",
              },
              {
                step: "03",
                title: "Trusted",
                desc: "Quality checked by AVX experts",
                color: "bg-yellow-500",
              },
            ].map((item) => (
              <div key={item.step} className="relative mb-7 group">

                {/* Step dot */}
                <span className="absolute -left-[1px] top-1.5 flex items-center justify-center w-5 h-5 rounded-full border border-secondary/40 bg-primary transition-all group-hover:scale-105">
                  <span className={`w-2.5 h-2.5 rounded-full ${item.color}`} />
                </span>

                {/* Text */}
                <div className="flex items-baseline gap-3">
                  <span className="text-xs font-mono text-secondary/40">
                    {item.step}
                  </span>
                  <p className="text-sm font-semibold tracking-wide">
                    {item.title}
                  </p>
                </div>

                <p className="text-xs text-secondary/60 leading-relaxed ml-7">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Toggle Switch */}
          <div className="bg-secondary p-1 rounded-lg flex flex-col gap-1 mt-auto">
            <button
              onClick={() => setActiveType("4-Wheeler")}
              className={cn(
                "w-full py-2 text-sm font-semibold rounded-md flex items-center justify-center gap-2 transition-all",
                activeType === "4-Wheeler"
                  ? "bg-primary text-secondary shadow-sm"
                  : "text-primary/60 hover:text-primary"
              )}
            >
              <Car size={18} /> 4-Wheeler
            </button>

            <button
              onClick={() => setActiveType("2-Wheeler")}
              className={cn(
                "w-full py-2 text-sm font-semibold rounded-md flex items-center justify-center gap-2 transition-all",
                activeType === "2-Wheeler"
                  ? "bg-primary text-secondary shadow-sm"
                  : "text-primary/60 hover:text-primary"
              )}
            >
              <Bike size={18} /> 2-Wheeler
            </button>
          </div>

        </div>
        {/* inspection info end */}



        {/* inspection info emd */}
        <Swiper
          modules={[Navigation]}
          spaceBetween={16}
          slidesPerView={1}
          grabCursor
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="lg:col-span-3"
        >
          {smallCars.map((car) => (
            <SwiperSlide key={car.id}>
              <VehicleCard data={car} />
            </SwiperSlide>
          ))}
        </Swiper>

      </div>

      {/* Bottom Button */}
      <div className="mt-8 mb-3 mr-3 flex justify-end">
        <Button variant="outlineAnimated" size="md">
          Explore All Vehicles
        </Button>
      </div>
    </div>
  );
}
