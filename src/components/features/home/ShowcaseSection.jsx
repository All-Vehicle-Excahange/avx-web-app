"use client";

import { useRef, useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  TrendingUp,
  Heart,
} from "lucide-react";
import Button from "@/components/ui/button";
import Image from "next/image";

/* ========================================================= */
/* =============== CARD COMPONENT - SCROLL ================= */
/* ========================================================= */

function RecentlyVisitedCard({ data }) {
  return (
    <div
      className="
        relative
        bg-white/5 backdrop-blur-md
        border border-white/10
        rounded-lg
        shadow-sm
        transition-all duration-300
        overflow-hidden
        shrink-0
        w-[220px]
      "
    >
      <div className="p-2">
        <div className="relative h-[140px] rounded-md overflow-hidden">
          <Image
            src={data.image}
            alt={data.title}
            fill
            className="object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>
      </div>

      <div className="px-3 pb-3">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="text-xs md:text-[15px] font-bold leading-tight tracking-wide line-clamp-2">
            {data.title}
          </h3>

          <button className="text-primary hover:text-red-500 transition-colors">
            <Heart className="w-4 h-4" />
          </button>
        </div>

        <div className="text-sm font-bold text-primary">₹{data.price}</div>
      </div>

      <div className="absolute inset-0 bg-blue-600/5 opacity-0 hover:opacity-100 transition-opacity pointer-events-none" />
    </div>
  );
}

/* ========================================================= */
/* =============== CARD COMPONENT - FIXED ================== */
/* ========================================================= */

function RecentlyVisitedFixedCard({ data }) {
  return (
    <div
      className="
        relative
        bg-white/5 backdrop-blur-md
        border border-white/10
        rounded-lg
        shadow-sm
        transition-all duration-300
        overflow-hidden
      "
    >
      <div className="p-2">
        <div className="relative h-32 rounded-md overflow-hidden">
          <Image
            src={data.image}
            alt={data.title}
            fill
            className="object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>
      </div>

      <div className="px-3 pb-3">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="text-xs md:text-[15px] font-bold leading-tight tracking-wide line-clamp-2">
            {data.title}
          </h3>

          <button className="text-primary hover:text-red-500 transition-colors">
            <Heart className="w-4 h-4" />
          </button>
        </div>

        <div className="text-sm font-bold text-primary">₹{data.price}</div>
      </div>

      <div className="absolute inset-0 bg-blue-600/5 opacity-0 hover:opacity-100 transition-opacity pointer-events-none" />
    </div>
  );
}

/* ========================================================= */
/* ================= MAIN SECTION ========================== */
/* ========================================================= */

export default function ShowcaseSection() {
  const data = {
    leftFixed: [
      {
        id: "lf1",
        title: "Maruti Suzuki Baleno ZXI ",
        price: "11,25,000",
        image: "/small_car.jpg",
      },
      {
        id: "lf2",
        title: "Kia Seltos",
        price: "12,10,000",
        image: "/small_car.jpg",
      },
      {
        id: "lf3",
        title: "Tata Harrier",
        price: "14,80,000",
        image: "/small_car.jpg",
      },
      {
        id: "lf4",
        title: "XUV700",
        price: "16,50,000",
        image: "/small_car.jpg",
      },
    ],

    rightScroll: [
      {
        id: "rs1",
        title: "Fortuner",
        price: "32,10,000",
        image: "/small_car.jpg",
      },
      {
        id: "rs2",
        title: "Honda City",
        price: "12,75,000",
        image: "/small_car.jpg",
      },
      {
        id: "rs3",
        title: "Verna",
        price: "13,20,000",
        image: "/small_car.jpg",
      },  {
        id: "rs1",
        title: "Fortuner",
        price: "32,10,000",
        image: "/small_car.jpg",
      },
      {
        id: "rs2",
        title: "Honda City",
        price: "12,75,000",
        image: "/small_car.jpg",
      },
      {
        id: "rs3",
        title: "Verna",
        price: "13,20,000",
        image: "/small_car.jpg",
      },  {
        id: "rs1",
        title: "Fortuner",
        price: "32,10,000",
        image: "/small_car.jpg",
      },
      {
        id: "rs2",
        title: "Honda City",
        price: "12,75,000",
        image: "/small_car.jpg",
      },
      {
        id: "rs3",
        title: "Verna",
        price: "13,20,000",
        image: "/small_car.jpg",
      },  {
        id: "rs1",
        title: "Fortuner",
        price: "32,10,000",
        image: "/small_car.jpg",
      },
      {
        id: "rs2",
        title: "Honda City",
        price: "12,75,000",
        image: "/small_car.jpg",
      },
      {
        id: "rs3",
        title: "Verna",
        price: "13,20,000",
        image: "/small_car.jpg",
      },
    ],
  };

  const useHorizontalScroll = () => {
    const ref = useRef(null);
    const [canLeft, setCanLeft] = useState(false);
    const [canRight, setCanRight] = useState(false);

    const update = () => {
      const el = ref.current;
      if (!el) return;

      setCanLeft(el.scrollLeft > 0);
      setCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 5);
    };

    useEffect(() => {
      update();
      window.addEventListener("resize", update);
      return () => window.removeEventListener("resize", update);
    }, []);

    const scroll = (dir) => {
      ref.current.scrollBy({
        left: dir === "right" ? 480 : -480,
        behavior: "smooth",
      });
    };

    return { ref, canLeft, canRight, scroll, update };
  };

  const rightScroll = useHorizontalScroll();

  return (
    <section className="w-full px-4 md:px-10 py-8 bg-[linear-gradient(180deg,#02050B_0%,#0A55A5_100%)]">
      {/* ===== SINGLE GLASS WRAPPER FOR ALL THREE ===== */}
      <div
        className="
        max-w-[1480px] mx-auto
       p-4 md:p-6
        flex flex-col gap-6
      "
      >
        {/* ===== TRENDING SECTION ===== */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              <h3 className="font-semibold text-primary">
                Top picks Vehicle for you
              </h3>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => rightScroll.scroll("left")}
                disabled={!rightScroll.canLeft}
                className="h-8 w-8 rounded-full bg-secondary/50"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <button
                onClick={() => rightScroll.scroll("right")}
                disabled={!rightScroll.canRight}
                className="h-8 w-8 rounded-full bg-secondary/50"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div
            ref={rightScroll.ref}
            onScroll={rightScroll.update}
            className="flex gap-4 overflow-x-auto scrollbar-hide pb-2"
          >
            {data.rightScroll.map((item) => (
              <RecentlyVisitedCard key={item.id} data={item} />
            ))}
          </div>
        </div>

        {/* ===== BANNER + RECENT ===== */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-6">
          {/* BANNER */}
          <div className="relative h-[340px] lg:h-[380px] rounded-3xl overflow-hidden">
            <Image
              src="/homeBanner.jpg"
              fill
              priority
              alt="side banner"
              className="object-cover"
            />
          </div>

          {/* RECENTLY VISITED */}
          <div className="p-2 md:p-4">
            <div className="flex items-center gap-2 mb-4">
              <Clock className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-bold text-primary">
                Recently Visited
              </h2>

              <Button variant="outline" size="sm" className="ml-auto">
                View More
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {data.leftFixed.map((item) => (
                <RecentlyVisitedFixedCard key={item.id} data={item} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
