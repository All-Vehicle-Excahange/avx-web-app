import {
  ArrowUpRight,
  Fuel,
  Heart,
  Settings2,
  Star,
  Users,
} from "lucide-react";
import { useState } from "react";
import SponsoredRibbon from "./SponsoredRibbon";
import Image from "next/image";
import Button from "@/components/ui/button";

export default function VehicleCard({ data }) {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <div className="group relative flex flex-col rounded-2xl overflow-hidden bg-secondary text-primary w-full max-w-sm border border-third/40 shadow-lg">
      {/* Image Section */}
      <div className="relative h-48 w-full overflow-hidden">
        {data.sponsored && <SponsoredRibbon />}

        <Image
          src={data.image}
          alt={data.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          fill
        />
      </div>

      {/* Content */}
      <div className="flex flex-col p-4 space-y-4">
        {/* Title + Heart */}
        <div className="flex justify-between items-start gap-2">
          <div>
            <h3 className="text-xl font-bold leading-tight tracking-wide text-primary">
              {data.title}
            </h3>
            <p className="text-xs text-third mt-1 line-clamp-1">
              {data.subtitle}
            </p>
          </div>

          {/* Heart Button */}
          <button
            onClick={() => setIsFavorite(!isFavorite)}
            className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-secondary hover:bg-third/30 transition-colors shrink-0"
          >
            <Heart
              className={`w-5 h-5 transition-colors ${
                isFavorite ? "fill-red-500 text-red-500" : "text-secondary"
              }`}
            />
          </button>
        </div>

        {/* Specs */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] text-third font-medium">
          <span>{data.year}</span>

          <span className="flex items-center gap-1.5">
            <Settings2 className="w-3.5 h-3.5 text-third" />
            {data.transmission}
          </span>

          <span className="flex items-center gap-1.5">
            <Fuel className="w-3.5 h-3.5 text-third" />
            {data.fuel}
          </span>

          <span className="flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-third" />
            {data.seats}
          </span>

          <span className="flex items-center gap-1.5">
            <Star className="w-3.5 h-3.5 text-primary fill-primary" />
            {data.rating}
          </span>
        </div>

        {/* Divider */}
        <div className="h-px w-full bg-third/40" />

        {/* Price Button using YOUR OUTLINE VARIANT */}
        <div className="flex items-center justify-between pt-1">
          <Button variant="outline" size="sm">
            ₹{data.price}
          </Button>
        </div>
      </div>
    </div>
  );
}
