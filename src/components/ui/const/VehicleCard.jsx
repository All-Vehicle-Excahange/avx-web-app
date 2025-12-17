import { useState } from "react";
import SponsoredRibbon from "./SponsoredRibbonMain";
import { Fuel, Heart, Settings2, Star, Users } from "lucide-react";
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
    <div className="group relative flex flex-row md:flex-col rounded-2xl overflow-hidden bg-secondary text-primary md:max-w-sm border border-third/40 shadow-lg w-[340px] ">
      {/* Image Section */}
      <div className="relative w-32 sm:w-40 min-h-40 md:min-h-0 md:h-48 md:w-full shrink-0 overflow-hidden">
        {data.sponsored && <SponsoredRibbon />}
        <Image
          src={data.image}
          alt={data.title}
          fill
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      {/* Content Section */}
      <div className="flex flex-col flex-1 p-3 md:p-4 space-y-2 md:space-y-4 justify-between">
        {/* Title + Heart */}
        <div className="flex justify-between items-start gap-2">
          <div className="min-w-0">
            <h3 className="text-sm md:text-xl font-bold leading-tight tracking-wide text-primary line-clamp-2 md:whitespace-normal">
              {data.title}
            </h3>
            <p className="text-[10px] md:text-xs text-third mt-1 line-clamp-1">
              {data.subtitle}
            </p>
          </div>

          {/* Heart Button */}
          <button
            onClick={() => setIsFavorite(!isFavorite)}
            className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-secondary hover:bg-third/30 transition-colors shrink-0"
          >
            <Heart
              className={`w-4 h-4 md:w-5 md:h-5 transition-colors ${
                isFavorite ? "fill-red-500 text-red-500" : "text-secondary"
              }`}
            />
          </button>
        </div>

        {/* Specs */}
        <div className="flex flex-wrap items-center gap-x-2 md:gap-x-4 gap-y-1 md:gap-y-2 text-[10px] md:text-[11px] text-third font-medium">
          <span>{data.year}</span>
          <span className="flex items-center gap-1 md:gap-1.5">
            <Settings2 className="w-3 h-3 md:w-3.5 md:h-3.5 text-third" />
            <span className="hidden sm:inline">{data.transmission}</span>
            <span className="sm:hidden">Auto</span>
          </span>
          <span className="flex items-center gap-1 md:gap-1.5">
            <Fuel className="w-3 h-3 md:w-3.5 md:h-3.5 text-third" />
            {data.fuel}
          </span>
          <span className="flex items-center gap-1 md:gap-1.5">
            <Users className="w-3 h-3 md:w-3.5 md:h-3.5 text-third" />
            {data.seats}
          </span>
          <span className="flex items-center gap-1 md:gap-1.5">
            <Star className="w-3 h-3 md:w-3.5 md:h-3.5 text-primary fill-primary" />
            {data.rating}
          </span>
        </div>

        {/* Divider */}
        <div className="hidden md:block h-px w-full bg-third/40" />

        {/* Price Button */}
        <div className="flex items-center justify-between pt-1 mt-auto md:mt-0">
          <Button
            onClick={handleClick}
            variant="outline"
            size="sm"
            className="w-full md:w-auto h-7 md:h-9 text-xs md:text-sm"
          >
            ₹{data.price}
          </Button>
        </div>
      </div>
    </div>
  );
}
