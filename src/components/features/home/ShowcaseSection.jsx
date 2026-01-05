import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Clock, TrendingUp } from "lucide-react";

// Card Component
function RecentlyVisitedCard({ data }) {
  return (
    <div className="group relative bg-white rounded-lg shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 flex-shrink-0 w-[220px]">
      {/* Quick View Badge */}
      <div className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
        <span className="bg-secondary text-white text-xs px-2 py-1 rounded-full">Quick View</span>
      </div>
      
      {/* Image Container */}
      <div className="relative h-40 bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
        <img
          src={data.image}
          alt={data.title}
          className="w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-300"
        />
      </div>
      
      {/* Content */}
      <div className="p-3">
        <h4 className="font-semibold text-primary text-sm mb-1 truncate transition-colors">
          {data.title}
        </h4>
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-secondary">₹{data.price}</span>
          {data.badge && (
            <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">
              {data.badge}
            </span>
          )}
        </div>
      
      </div>
      
      {/* Hover Action */}
      <div className="absolute inset-0 bg-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
    </div>
  );
}

export default function ShowcaseSection() {
  const data = {
    leftFixed: [
      { id: "lf1", title: "Hyundai Creta", price: "11,25,000", image: "/Car.png", badge: "Popular", rating: 4.5, reviews: 234 },
      { id: "lf2", title: "Kia Seltos", price: "12,10,000", image: "/Car.png", badge: "Trending", rating: 4.3, reviews: 189 },
      { id: "lf3", title: "Tata Harrier", price: "14,80,000", image: "/Car.png", rating: 4.6, reviews: 312 },
      { id: "lf4", title: "XUV700", price: "16,50,000", image: "/Car.png", badge: "New", rating: 4.7, reviews: 156 },
    ],
    leftScroll: [
      { id: "ls1", title: "Maruti Swift", price: "6,50,000", image: "/Car.png", rating: 4.2, reviews: 567 },
      { id: "ls2", title: "Honda Amaze", price: "7,80,000", image: "/Car.png", rating: 4.4, reviews: 423 },
      { id: "ls3", title: "Venue", price: "9,20,000", image: "/Car.png", badge: "Hot", rating: 4.3, reviews: 298 },
      { id: "ls4", title: "Nexon", price: "8,90,000", image: "/Car.png", rating: 4.5, reviews: 389 },
    ],
    rightScroll: [
      { id: "rs1", title: "Fortuner", price: "32,10,000", image: "/Car.png", badge: "Premium", rating: 4.8, reviews: 201 },
      { id: "rs2", title: "Honda City", price: "12,75,000", image: "/Car.png", rating: 4.4, reviews: 445 },
      { id: "rs3", title: "Verna", price: "13,20,000", image: "/Car.png", badge: "Popular", rating: 4.3, reviews: 356 },
      { id: "rs4", title: "Slavia", price: "14,10,000", image: "/Car.png", rating: 4.5, reviews: 234 },
      { id: "rs5", title: "Compass", price: "19,50,000", image: "/Car.png", rating: 4.6, reviews: 178 },
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

  const leftScroll = useHorizontalScroll();
  const rightScroll = useHorizontalScroll();

  return (
    <section className="w-full px-4 md:px-10 py-8 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* LEFT SIDE */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Section Header */}
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-5 h-5 text-secondary" />
              <h2 className="text-xl font-bold text-secondary">Recently Visited</h2>
              <span className="ml-auto text-sm text-secondary cursor-pointer hover:underline">View All</span>
            </div>

            {/* FIXED 4 CARDS GRID */}
            <div className="grid grid-cols-2 gap-4">
              {data.leftFixed.map((item) => (
                <div key={item.id} className="group relative bg-primary rounded-lg shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
                  {item.badge && (
                    <div className="absolute top-2 left-2 z-10">
                      {/* <span className="bg-secondary text-primary text-xs px-2 py-1 rounded-full font-medium">
                        {item.badge}
                      </span> */}
                    </div>
                  )}
                  
                  <div className="relative h-32 bg-gradient-to-br from-blue-50 to-gray-50 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-contain p-3 group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  
                  <div className="p-3">
                    <h4 className="font-semibold text-secondary text-sm mb-1 truncate group-hover:text-blue-600 transition-colors">
                      {item.title}
                    </h4>
                    <div className="text-lg font-bold text-secondary mb-2">₹{item.price}</div>
                   
                  </div>
                  
                  <div className="absolute inset-0 bg-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                </div>
              ))}
            </div>

           
          </div>

          {/* RIGHT SIDE */}
          <div className="lg:col-span-7 flex flex-col gap-6">

            {/* BANNER */}
            <div className="relative h-48 rounded-xl overflow-hidden shadow-lg group cursor-pointer">
              <img
                src="https://rukminim2.flixcart.com/fk-p-flap/1600/350/image/023aa060cf896d38.jpg?q=80"
                alt="banner"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent flex flex-col justify-center px-8 text-primary">
                <span className="text-sm font-medium text-primary transition-colors duration-300 mb-1">SPECIAL OFFER</span>
                <h3 className="text-3xl font-bold mb-2">Best Deals Near You</h3>
                <p className="text-sm text-gray-200 mb-4">Up to 30% off on premium vehicles</p>
                <button className="bg-secondary  text-primary px-6 py-2 rounded-lg font-medium w-fit transition-colors cursor-pointer">
                  Explore Now
                </button>
              </div>
            </div>

            {/* TRENDING SECTION */}
            <div className="relative bg-primary rounded-xl p-4 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-secondary" />
                  <h3 className="font-semibold text-secondary">Trending Vehicles</h3>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => rightScroll.scroll("left")}
                    disabled={!rightScroll.canLeft}
                    className="h-8 w-8 rounded-full bg-secondary/50 hover:bg-secondary/20 hover:text-secondary disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center transition-all"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => rightScroll.scroll("right")}
                    disabled={!rightScroll.canRight}
                    className="h-8 w-8 rounded-full bg-secondary/50 hover:bg-secondary/20 hover:text-secondary disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center transition-all"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div
                ref={rightScroll.ref}
                onScroll={rightScroll.update}
                className="flex gap-4 overflow-x-auto scrollbar-hide pb-2"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {data.rightScroll.map((item) => (
                  <RecentlyVisitedCard key={item.id} data={item} />
                ))}
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