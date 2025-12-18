import SponsoredRibbon from "@/components/ui/const/SponsoredRibbon";
import {
  ArrowUpRight,
  Fuel,
  Heart,
  Settings2,
  Star,
  Users,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import Button from "@/components/ui/button";
import { useRouter } from "next/router";

export default function FeaturedVehicleCard({ data }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const router = useRouter();

  const handleClick = () => {
    router.push("/vehicle/details");
  };

  return (
    <div className="group relative w-full h-full rounded-xl overflow-hidden bg-transparent text-primary border-2 border-third/60 flex flex-col shadow-lg">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[url('/bg_blur.jpg')] bg-cover bg-center opacity-40 blur-lg" />
      </div>
      {/* Image */}
      <div className="relative flex-1 w-full overflow-hidden">
        {data.sponsored && <SponsoredRibbon />}

        <Image
          src={data.image}
          alt={data.title}
          fill
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="p-5 bg-transparent z-10 flex flex-col shrink-0">
        {/* Title + Heart */}
        <div className="flex justify-between items-start mb-4">
          <div className="space-y-1 pr-4">
            <h3 className="text-2xl font-bold leading-tight text-primary">
              {data.title}
            </h3>

            <p className="text-sm text-third">{data.subtitle}</p>
          </div>

          {/* Heart Button */}
          <button
            onClick={() => setIsFavorite(!isFavorite)}
            className="shrink-0 flex items-center justify-center w-9 h-9 rounded-full bg-transparent border-2 border-third/60 text-primary hover:bg-third/30 transition-colors"
          >
            <Heart
              className={`w-5 h-5 transition-colors ${
                isFavorite ? "fill-red-500 text-red-500" : "text-primary"
              }`}
            />
          </button>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-third/40 mb-4" />

        {/* Specs + Price */}
        <div className="flex items-center justify-between">
          {/* Specs */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-third font-medium">
            <span>{data.year}</span>

            <span className="flex items-center gap-1.5">
              <Settings2 className="w-4 h-4 text-third" />
              {data.transmission}
            </span>

            <span className="flex items-center gap-1.5">
              <Fuel className="w-4 h-4 text-third" />
              {data.fuel}
            </span>

            <span className="flex items-center gap-1.5">
              <Users className="w-4 h-4 text-third" />
              {data.seats}
            </span>

            <span className="hidden sm:inline-block text-third">
              {data.drivetrain}
            </span>

            <span className="flex items-center gap-1.5">
              <Star className="w-4 h-4 text-primary fill-primary" />
              {data.rating}
            </span>
          </div>

          {/* Price Button — NOW USING YOUR COMPONENT */}
          <div className="shrink-0 pl-2">
            <Button onClick={handleClick} variant="outline" size="md">
              ₹{data.price}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
