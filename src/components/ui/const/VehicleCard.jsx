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
        bg-secondary/90 text-primary
        md:max-w-sm w-[392px]
        border-2 border-third/60
        hover:shadow-[0_20px_60px_rgba(255,255,255,0.25)]
        transition-shadow duration-300
      "
    >
      {/* 🔥 BLURRED BACKGROUND */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[url('/bg_blur.jpg')] bg-cover bg-center opacity-40 blur-lg" />
      </div>

      {/* ================= CONTENT ================= */}
      <div className="relative z-10 flex flex-row md:flex-col w-full h-full">
        {/* Image Section */}
        <div className="relative w-32 sm:w-40 min-h-40 md:min-h-0 md:h-62 md:w-full shrink-0 overflow-hidden">
          {data.sponsored && <SponsoredRibbon />}
          <Image
            src={data.image}
            alt={data.title}
            fill
            className="h-full w-full object-cover transition-transform duration-500 group-hover/card:scale-110"
          />
        </div>

        {/* Content Section */}
        <div className="flex flex-col flex-1 p-2.5 md:p-4 space-y-1.5 md:space-y-4 justify-between">
          {/* Title + Price */}
          <div className="flex justify-between items-start gap-2">
            <div className="min-w-0">
              <h3 className="text-xs md:text-xl font-bold leading-tight tracking-wide line-clamp-2">
                {data.title}
              </h3>

              <p className="text-[9px] md:text-xs text-primary/90 mt-0.5 line-clamp-1 flex items-center gap-1">
                <User className="w-3 h-3" />
                {data.userName || "Nihal Chaudhary"}
              </p>

              <p className="text-[9px] md:text-xs text-primary/90 mt-0.5 line-clamp-1 flex items-center gap-1">
                <MapPinned className="w-3 h-3" />
                {data.location || "Chhapi, Gujarat"}
              </p>
            </div>

            <h3 className="text-xs md:text-xl whitespace-nowrap   font-bold leading-tight">
              ₹ {data.price}
            </h3>
          </div>

          {/* Specs */}
          <div className="flex flex-wrap items-center gap-x-1.5 md:gap-x-4 gap-y-0.5 md:gap-y-2 text-[10px] md:text-[11px] text-primary/70 font-medium">
            <span>{data.year}</span>

            <span className="flex items-center gap-1">
              <Settings2 className="w-3 h-3" />
              {data.transmission}
            </span>

            <span className="flex items-center gap-1">
              <Fuel className="w-3 h-3" />
              {data.fuel}
            </span>

            <span className="flex items-center gap-1">
              <Users className="w-3 h-3" />
              {data.seats}
            </span>

            <span className="flex items-center gap-1">
              <Star className="w-3 h-3 fill-primary text-primary" />
              {data.rating}
            </span>
          </div>

          {/* CTA */}
          <div className="flex items-center justify-between">
            <Button
              onClick={handleClick}
              variant="outline"
              size="sm"
              className="w-full md:w-auto h-6 md:h-9 text-[10px] md:text-sm"
            >
              View More
            </Button>

            <button
              onClick={() => setIsFavorite(!isFavorite)}
              className="flex items-center justify-center w-7 h-7 md:w-8 md:h-8 rounded-full bg-transparent text-secondary border border-third/60 hover:bg-third/30 transition-colors shrink-0 cursor-pointer"
            >
              <Heart
                className={`w-4 h-4 md:w-5 md:h-5 ${
                  isFavorite ? "fill-red-500 text-red-500" : "text-primary"
                }`}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
