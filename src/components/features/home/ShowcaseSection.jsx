import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Clock, TrendingUp } from "lucide-react";
import RecentlyVisitedFixedCard from "./RecentlyVisitedFixedCard";
import Button from "@/components/ui/button";
import RecentlyVisitedCard from "./RecentlyVisitedCardScroll";

export default function ShowcaseSection() {
  const data = {
    leftFixed: [
      {
        id: "lf1",
        title: "Maruti Suzuki Baleno ZXI ",
        price: "11,25,000",
        image: "/small_car.jpg",
        badge: "Popular",
        rating: 4.5,
        reviews: 234,
      },
      {
        id: "lf2",
        title: "Kia Seltos",
        price: "12,10,000",
        image: "/small_car.jpg",
        badge: "Trending",
        rating: 4.3,
        reviews: 189,
      },
      {
        id: "lf3",
        title: "Tata Harrier",
        price: "14,80,000",
        image: "/small_car.jpg",
        rating: 4.6,
        reviews: 312,
      },
      {
        id: "lf4",
        title: "XUV700",
        price: "16,50,000",
        image: "/small_car.jpg",
        badge: "New",
        rating: 4.7,
        reviews: 156,
      },
    ],
    leftScroll: [
      {
        id: "ls1",
        title: "Maruti Swift",
        price: "6,50,000",
        image: "/small_car.jpg",
        rating: 4.2,
        reviews: 567,
      },
      {
        id: "ls2",
        title: "Honda Amaze",
        price: "7,80,000",
        image: "/small_car.jpg",
        rating: 4.4,
        reviews: 423,
      },
      {
        id: "ls3",
        title: "Venue",
        price: "9,20,000",
        image: "/small_car.jpg",
        badge: "Hot",
        rating: 4.3,
        reviews: 298,
      },
      {
        id: "ls4",
        title: "Nexon",
        price: "8,90,000",
        image: "/small_car.jpg",
        rating: 4.5,
        reviews: 389,
      },
    ],
    rightScroll: [
      {
        id: "rs1",
        title: "Fortuner",
        price: "32,10,000",
        image: "/small_car.jpg",
        badge: "Premium",
        rating: 4.8,
        reviews: 201,
      },
      {
        id: "rs2",
        title: "Honda City",
        price: "12,75,000",
        image: "/small_car.jpg",
        rating: 4.4,
        reviews: 445,
      },
      {
        id: "rs3",
        title: "Verna",
        price: "13,20,000",
        image: "/small_car.jpg",
        badge: "Popular",
        rating: 4.3,
        reviews: 356,
      },
      {
        id: "rs4",
        title: "Slavia",
        price: "14,10,000",
        image: "/small_car.jpg",
        rating: 4.5,
        reviews: 234,
      },
      {
        id: "rs5",
        title: "Compass",
        price: "19,50,000",
        image: "/small_car.jpg",
        rating: 4.6,
        reviews: 178,
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

  const handleClick = () => {
    router.push("/vehicle/details");
  };

  const leftScroll = useHorizontalScroll();
  const rightScroll = useHorizontalScroll();

  return (
    <section className="w-full px-4 md:px-10 py-8 bg-secondary">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6  ">
          {/* LEFT SIDE */}
          <div className="lg:col-span-5 p-6 flex flex-col gap-6 h-full bg-primary/20 rounded-3xl relative overflow-hidden">
            {/* BLUR BACKGROUND (NO INTERACTION) */}
            <div className="absolute inset-0 z-0 pointer-events-none">
              <div className="absolute inset-0 bg-[url('/bg_blur.jpg')] bg-cover bg-center opacity-40 blur-lg" />
            </div>

            {/* ACTUAL CONTENT */}
            <div className="relative z-10 flex flex-col gap-6">
              {/* Header */}
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-bold text-primary">
                  Recently Visited
                </h2>

                <Button
                  onClick={handleClick}
                  variant="outline"
                  size="sm"
                  className="ml-auto relative z-20 pointer-events-auto"
                >
                  View More
                </Button>
              </div>

              {/* FIXED GRID */}
              <div className="grid grid-cols-2 gap-6">
                {data.leftFixed.map((item) => (
                  <RecentlyVisitedFixedCard key={item.id} data={item} />
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="lg:col-span-7 flex flex-col gap-6 h-full">
            {/* BANNER */}
            <div className="relative h-48 rounded-xl overflow-hidden shadow-lg group cursor-pointer">
              <img
                src="https://rukminim2.flixcart.com/fk-p-flap/1600/350/image/023aa060cf896d38.jpg?q=80"
                alt="banner"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent flex flex-col justify-center px-8 text-primary">
                <span className="text-sm font-medium text-primary transition-colors duration-300 mb-1">
                  SPECIAL OFFER
                </span>
                <h3 className="text-3xl font-bold mb-2">Best Deals Near You</h3>
                <p className="text-sm text-gray-200 mb-4">
                  Up to 30% off on premium vehicles
                </p>
                <div>
                  <button className="bg-secondary  text-primary px-6 py-2 rounded-lg font-medium w-fit transition-colors cursor-pointer relative z-20 pointer-events-auto">
                    Explore Now
                  </button>
                </div>
              </div>
            </div>

            {/* TRENDING SECTION */}
            <div className="relative bg-primary/20 rounded-3xl p-4 shadow-sm overflow-hidden">
              {/* BLUR BACKGROUND */}
              <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute inset-0 bg-[url('/bg_blur.jpg')] bg-cover bg-center opacity-40 blur-lg" />
              </div>

              {/* ACTUAL CONTENT */}
              <div className="relative z-10">
                {/* HEADER */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-primary" />
                    <h3 className="font-semibold text-primary">
                      Trending Vehicles
                    </h3>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => rightScroll.scroll("left")}
                      disabled={!rightScroll.canLeft}
                      className="h-8 w-8 rounded-full bg-secondary/50 hover:bg-secondary/20 disabled:opacity-40 flex items-center justify-center"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => rightScroll.scroll("right")}
                      disabled={!rightScroll.canRight}
                      className="h-8 w-8 rounded-full bg-secondary/50 hover:bg-secondary/20 disabled:opacity-40 flex items-center justify-center"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* SCROLLABLE CARDS */}
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
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
