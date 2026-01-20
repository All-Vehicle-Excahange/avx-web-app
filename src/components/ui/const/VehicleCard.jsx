import { useState } from "react";
import SponsoredRibbon from "./SponsoredRibbonMain";
import {
  Fuel,
  Heart,
  MapPinned,
  Settings2,
  Star,
  User,
  Users,
} from "lucide-react";
import Button from "../button";
import Image from "next/image";
import { useRouter } from "next/router";

export default function VehicleCard({ data }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const router = useRouter();

  const handleClick = () => {
    router.push("/vehicle/details");
  };

  return (
    <div
      className="
        group/card relative flex flex-row md:flex-col
        rounded-2xl overflow-hidden
        bg-secondary text-primary
        md:max-w-sm w-full sm:w-[392px]
        border-2 border-third/60
        hover:shadow-[0_20px_60px_rgba(255,255,255,0.25)]
        transition-shadow duration-300
      "
    >
      <div className="relative z-10 flex flex-row md:flex-col w-full h-full">
        <div className="relative w-32 sm:w-40 min-h-40 md:min-h-0 md:h-62 md:w-full shrink-0 p-2">
          <div className="relative w-full h-full overflow-hidden rounded-xl">
            {data.sponsored && <SponsoredRibbon />}

            <Image
              src={data.image}
              alt={data.title}
              fill
              className="h-full w-full object-cover transition-transform duration-500 group-hover/card:scale-110"
            />
          </div>
        </div>

        {/* ================= CONTENT SECTION ================= */}
        <div className="flex flex-col flex-1 p-2.5 md:p-4 space-y-2 md:space-y-4 justify-between">
          {/* Title Section */}
          <div className="flex justify-between items-start gap-2">
            <div className="min-w-0 w-full">
              {/* 👉 TITLE + WISHLIST IN SAME LINE */}
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-secondary md:text-xl font-bold leading-tight tracking-wide line-clamp-2">
                  {data.title}
                </h3>

                {/* 👉 MOVED HEART HERE */}
                <button
                  onClick={() => setIsFavorite(!isFavorite)}
                  className="ml-2 flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 hover:bg-primary/20 transition-all cursor-pointer"
                >
                  <Heart
                    className={`w-5 h-5 transition-colors ${
                      isFavorite ? "fill-red-500 text-red-500" : "text-primary"
                    }`}
                  />
                </button>
              </div>

              <p className="text-xs md:text-sm text-primary/90 mt-1 flex items-center gap-1.5">
                Listed By: {data.userName || "Nihal Chaudhary"}
              </p>

              <p className="text-xs md:text-sm text-primary/90 mt-1 flex items-center gap-1.5">
                <MapPinned className="w-3.5 h-3.5" />
                {data.location || "Chhapi, Gujarat"}
              </p>
            </div>
          </div>

          {/* ---- SPECS ---- */}
          <div className="flex flex-wrap items-center gap-x-2 md:gap-x-4 gap-y-1 text-xs md:text-sm text-primary/80 font-medium">
            <span>{data.year}</span>

            <span className="flex items-center gap-1">
              <Settings2 className="w-4 h-4" /> {data.transmission}
            </span>

            <span className="flex items-center gap-1">
              <Fuel className="w-4 h-4" /> {data.fuel}
            </span>

            <span className="flex items-center gap-1">
              <Users className="w-4 h-4" /> {data.seats}
            </span>

            <span className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-primary text-primary" />
              {data.rating}
            </span>
          </div>

          {/* ================= BOTTOM SECTION ================= */}
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-sm md:text-xl font-bold">₹ {data.price}</h3>

            <Button onClick={handleClick} variant="outline" size="sm">
              View Details
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
