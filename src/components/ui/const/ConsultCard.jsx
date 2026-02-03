import { MapPin, Star } from "lucide-react";
import Image from "next/image";
import Button from "@/components/ui/button";

export default function ConsultantCard({
  image,
  logo,
  name,
  location,
  id,

  rating,
  reviews,

  vehicleCount,
  priceRange,

  vehicleTypes = [],
  services = [],

  tierTitle,
  tierBadgeUrl,

  isSponsored = false,
}) {
  return (
    <div className="group/card relative w-[340px] h-[514px] rounded-2xl overflow-hidden border border-third/40 bg-secondary/90 mx-auto transition-all duration-300 hover:shadow-[0_10px_40px_-10px_rgba(255,255,255,0.25)]">
      <div className="relative z-10 h-40 w-full">
        <Image src={image} alt={name} fill className="object-cover" />

        {isSponsored && (
          <div className="absolute top-3 left-3 flex items-center gap-2 bg-primary text-secondary text-[11px] font-semibold px-3 py-1 rounded-full">
            {tierBadgeUrl && (
              <img src={tierBadgeUrl} alt="tier" className="w-4 h-4" />
            )}
            {tierTitle || "Premium Consultant"}
          </div>
        )}

        <div className="absolute -bottom-7 left-4 w-14 h-14 rounded-full bg-primary border border-third/40 flex items-center justify-center shadow-md overflow-hidden">
          {logo ? (
            <Image src={logo} alt="logo" fill className="object-contain p-2" />
          ) : (
            <span className="text-xs font-bold text-secondary">LOGO</span>
          )}
        </div>
      </div>
      
      <div className="bg-secondary/10  z-0 rounded-b-4xl h-188 w-full absolute bottom-16  border border-third/40 "></div>

      <div className="relative pt-10 px-4 pb-4 text-primary flex flex-col h-[calc(100%-160px)]">
        <h3 className="text-base font-semibold mb-1">{name}</h3>

        <div className="flex items-center gap-1.5 text-xs text-third mb-1">
          <MapPin className="w-3.5 h-3.5" />
          <span>{location}</span>
        </div>

        <div className="flex items-center gap-1.5 mb-3">
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          <span className="text-xs font-medium">
            {rating} • {reviews} Reviews
          </span>
        </div>

        <div className="grid grid-cols-3 gap-3 text-xs border-y border-third/30 py-3 mb-3 text-center">
          <div>
            <p className="text-third">Categories</p>
            <p className="font-medium text-[11px]">
              {vehicleTypes.length > 0
                ? vehicleTypes.join(", ")
                : "Not available"}
            </p>
          </div>

          <div>
            <p className="text-third ">Available Vehicles</p>
            <p className="font-medium">{vehicleCount}</p>
          </div>

          <div>
            <p className="text-third">Price</p>
            <p className="font-medium text-[11px]">{priceRange}</p>
          </div>
        </div>

        <div className="mb-3">
          <p className="text-[11px] uppercase text-third mb-1">Services</p>

          <div className="flex flex-wrap gap-2">
            {services.length > 0 ? (
              services.slice(0, 4).map((service) => (
                <span
                  key={service}
                  className="text-[10px] border border-third/40 px-2 py-1 rounded-full"
                >
                  {service.replaceAll("_", " ")}
                </span>
              ))
            ) : (
              <span className="text-[10px] text-third">No services listed</span>
            )}
          </div>
        </div>

        <div className="mt-auto">
          <Button href={`/store-front/${id}`} full size="sm" variant="outline">
            View Consultant
          </Button>
        </div>
      </div>
    </div>
  );
}
