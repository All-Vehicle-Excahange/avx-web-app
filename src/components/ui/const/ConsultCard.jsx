import { MapPin, Star } from "lucide-react";
import Image from "next/image";
import Button from "@/components/ui/button";

const SERVICES = ["Test Drive", "Financing", "Exchange", "Warranty"];

export default function ConsultantCard({
  image,
  logo,
  name,
  location,
  rating,
  vehicleCount,
  priceRange,
  isSponsored = false,
}) {
  return (
    <div
      className="
    group/card group-hover/card:scale-110 relative w-[340px] h-[480px]
    rounded-2xl overflow-hidden
    border border-third/40
    bg-secondary/90
    mx-auto
    transition-all duration-300
    hover:shadow-[0_20px_60px_rgba(255,255,255,0.25)]
  "
    >

      {/* TOP IMAGE */}
      <div className="relative z-10 h-40 w-full">
        <Image src={image} alt={name} fill className="object-cover" />

        {isSponsored && (
          <div className="absolute top-3 left-3 bg-primary text-secondary text-[11px] font-semibold px-3 py-1 rounded-full">
            Premium consultant
          </div>
        )}

        <div className="absolute -bottom-7 left-4 w-14 h-14 rounded-full bg-primary border border-third/40 flex items-center justify-center shadow-md">
          {logo ? (
            <Image src={logo} alt="logo" fill className="object-contain p-2" />
          ) : (
            <span className="text-xs font-bold text-secondary">AVX</span>
          )}
        </div>
      </div>

      <div className="bg-secondary/10  z-0 rounded-b-4xl h-86 w-full absolute bottom-16  border border-third/40 "></div>

      {/* CONTENT */}
      <div className="relative z-0 pt-10 px-4 pb-4 text-primary flex flex-col h-[calc(100%-160px)]">
        <h3 className="text-base font-semibold leading-snug mb-1">{name}</h3>

        <div className="flex items-center gap-1.5 text-xs text-third mb-1">
          <MapPin className="w-3.5 h-3.5" />
          <span>{location}</span>
        </div>

        <div className="flex items-center gap-1.5 mb-3">
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          <span className="text-xs font-medium">
            {rating} • {vehicleCount} reviews
          </span>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-3 gap-3 text-xs border-y border-third/30 py-3 mb-3 text-center">
          <div className="flex flex-col items-center">
            <p className="text-third uppercase whitespace-nowrap">Categories</p>
            <p className="font-medium">Cars, SUVs</p>
          </div>

          <div className="flex flex-col items-center">
            <p className="text-third whitespace-nowrap uppercase">
              Available Vehicles
            </p>
            <p className="font-medium">{vehicleCount}</p>
          </div>

          <div className="flex flex-col items-center">
            <p className="text-third uppercase whitespace-nowrap">Price</p>
            <p className="font-medium">{priceRange}</p>
          </div>
        </div>

        {/* SERVICES – CUSTOM SMALL CHIPS */}
        <div className="mb-3">
          <p className="text-[11px] uppercase text-third mb-1">Services</p>

          <div className="grid grid-cols-4 gap-2">
            {SERVICES.map((service) => (
              <span
                key={service}
                className="
                  text-[11px]
                  text-primary
                  border border-third/50
                  rounded-full
                  px-2 py-1
                  text-center
                  whitespace-nowrap
                "
              >
                {service}
              </span>
            ))}
          </div>
        </div>

        {/* GALLERY */}
        {/* <div className="grid grid-cols-2 gap-2 mb-4">
          {[1, 2].map((i) => (
            <div key={i} className="relative h-20 rounded-md overflow-hidden">
              <Image src={image} alt="vehicle" fill className="object-cover" />
            </div>
          ))}
        </div> */}

        {/* CTA */}
        <div className="mt-auto">
          <Button href="/store-front" full size="sm" variant="outline">
            View Consultant
          </Button>
        </div>
      </div>
    </div>
  );
}
