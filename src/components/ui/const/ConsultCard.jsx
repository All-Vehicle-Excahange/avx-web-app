import { ArrowUpRight, MapPin, Star } from "lucide-react";
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
    <div className="group relative w-full bg-primary rounded-xl border border-third/40 hover:shadow-lg transition-shadow duration-300 flex flex-col">
      {/* Image Section */}
      <div className="relative h-48 w-full bg-third/20 overflow-hidden rounded-t-xl">
        <Image
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          fill
        />

        {isSponsored && <SponsoredRibbonMain />}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-secondary/20 to-transparent" />
      </div>

      {/* Logo Badge */}
      <div className="absolute top-42 left-4 z-20 bg-primary p-2 rounded-lg border border-third/30 shadow-md w-16 h-10 flex items-center justify-center">
        {logo ? (
          <div className="relative w-full h-full">
            <Image src={logo} alt="brand" className="object-contain" fill />
          </div>
        ) : (
          <span className="text-xl font-black text-secondary italic leading-none">
            AVX
          </span>
        )}
      </div>

      {/* Content */}
      <div className="pt-8 px-4 pb-4 flex-1 flex flex-col">
        {/* Title */}
        <h3 className="text-lg font-bold text-secondary leading-tight mb-2">
          {name}
        </h3>

        {/* Location */}
        <div className="flex items-center text-third text-sm mb-2">
          <MapPin className="w-3.5 h-3.5 mr-1" />
          <span>{location}</span>
        </div>

        {/* Rating */}
        <div className="flex items-center mb-3">
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

        {/* Price Range */}
        <div className="text-sm font-semibold text-secondary mb-2">
          Price Range:
          <span className="text-third ml-1">{priceRange}</span>
        </div>

        {/* Vehicle Count */}
        <div className="text-sm font-semibold text-secondary mb-6">
          {vehicleCount} Vehicle Available
        </div>

        {/* CTA Button (FULL WIDTH using your component) */}
        <Button full size="md">
          View Consultant
        </Button>
      </div>
    </div>
  );
}
