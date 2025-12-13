import { MapPin, Star } from "lucide-react";
import SponsoredRibbonMain from "./SponsoredRibbonMain";
import Image from "next/image";
import Button from "@/components/ui/button";

export default function ConsultantCard({
  image,
  logo,
  name,
  location,
  rating,
  vehicleCount,
  priceRange,
  isSponsored,
}) {
  return (
    <div className="group relative w-full bg-secondary rounded-xl border border-third/40 hover:shadow-lg transition-shadow duration-300 flex flex-col overflow-hidden">
      <div className="relative h-28 w-full bg-third/20">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {isSponsored && <SponsoredRibbonMain />}

        {/* Gradient */}
        <div className="absolute inset-0 bg-linear-to-t from-secondary/30 to-transparent" />

        {/* LOGO */}
        <div
          className="
            absolute
            -bottom-6
            left-4
            z-30
            bg-primary
            p-2
            rounded-full
            border border-third/30
            shadow-md
            w-16 h-16
            flex items-center justify-center
          "
        >
          {logo ? (
            <div className="relative w-full h-full">
              <Image src={logo} alt="brand" fill className="object-contain" />
            </div>
          ) : (
            <span className="text-lg font-black text-secondary italic">
              AVX
            </span>
          )}
        </div>

        
      </div>

      <div className="relative z-10 pt-8 px-4 pb-4 flex-1 flex flex-col">
        <h3 className="text-base font-bold text-primary leading-tight mb-2">
          {name}
        </h3>

        <div className="text-sm font-semibold text-primary mb-2">
          Price Range:
          <span className="text-third ml-1">{priceRange}</span>
        </div>

        <div className="text-sm font-semibold text-primary mb-2">
          {vehicleCount} Vehicle Available
        </div>

        <div className="flex items-center text-third text-sm mb-2">
          <MapPin className="w-3.5 h-3.5 mr-1" />
          <span>{location}</span>
        </div>

        <div className="flex items-center mb-4">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < Math.floor(rating)
                  ? "fill-yellow-400 text-yellow-400"
                  : "fill-third text-third"
              }`}
            />
          ))}
        </div>

        <Button full variant="outline" size="md">
          View Consultant
        </Button>
      </div>
    </div>
  );
}
