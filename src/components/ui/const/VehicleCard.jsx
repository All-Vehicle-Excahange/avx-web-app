import { useState, useEffect } from "react";
import SponsoredRibbon from "./SponsoredRibbonMain";
import { Fuel, Heart, MapPinned, Settings2, Star, Users } from "lucide-react";
import Button from "../button";
import Image from "next/image";
import { useRouter } from "next/router";
import { addWishList, removeWishList } from "@/services/user.service";

export default function VehicleCard({ data, onWishlistChange }) {
  const router = useRouter();

  // ✅ Initial Favorite State From Backend
  const [isFavorite, setIsFavorite] = useState(
    () => data?.isWishlisted || false,
  );

  const handleWishlist = async () => {
    try {
      // ✅ If Already Wishlisted → Remove
      if (isFavorite) {
        const res = await removeWishList(data.id);

        if (res?.success || res?.status) {
          setIsFavorite(false);
          onWishlistChange?.();
        }
      }

      // ✅ If Not Wishlisted → Add
      else {
        const res = await addWishList(data.id);

        if (res?.success || res?.status) {
          setIsFavorite(true);
          onWishlistChange?.();
        }
      }
    } catch (err) {
      console.log("Wishlist error:", err);
    }
  };

  const mapped = {
    image: data.thumbnailUrl || data.image,

    title: data.makerName
      ? `${data.makerName} ${data.modelName} ${data.variantName}`
      : data.title,

    year: data.yearOfMfg || data.year,
    transmission: data.transmissionType || data.transmission,
    fuel: data.fuelType || data.fuel,
    seats: data.ownership || data.seats,

    rating: data.rating || "-",

    userName: data.vehicleCardOwner
      ? `${data.vehicleCardOwner.firstname} ${data.vehicleCardOwner.lastname}`
      : data.userName,

    location: data.vehicleCardAddress
      ? `${data.vehicleCardAddress.city}, ${data.vehicleCardAddress.country}`
      : data.location,

    price: data.price ? Number(data.price).toLocaleString("en-IN") : data.price,

    sponsored: data.sponsored || false,
  };

  return (
    <div
      className="
        group/card relative flex flex-row md:flex-col
        rounded-2xl overflow-hidden
        bg-secondary text-primary
        md:max-w-sm w-full sm:w-[392px]
        border-2 border-third/60
        hover:shadow-[0_10px_40px_-10px_rgba(255,255,255,0.25)]
        transition-shadow duration-300
        h-full
      "
    >
      <div className="relative z-10 flex flex-row md:flex-col w-full h-full">
        {/* IMAGE */}
        <div className="relative w-32 sm:w-40 min-h-40 md:min-h-0 md:h-62 md:w-full shrink-0 p-2">
          <div className="relative w-full h-full overflow-hidden rounded-xl">
            {mapped.sponsored && <SponsoredRibbon />}

            <Image
              src={mapped.image}
              alt={mapped.title}
              fill
              className="h-full w-full object-cover transition-transform duration-500 group-hover/card:scale-110"
            />
          </div>
        </div>

        {/* CONTENT */}
        <div className="flex flex-col flex-1 p-2.5 md:p-4 space-y-2 md:space-y-4 justify-between h-full">
          {/* TITLE + HEART */}
          <div className="flex justify-between items-start gap-2">
            <div className="min-w-0 w-full">
              <div className="flex items-center justify-between pb-3">
                <h3
                  className="
                    text-sm font-secondary md:text-xl font-bold 
                    leading-tight tracking-wide 
                    line-clamp-2
                  "
                >
                  {mapped.title}
                </h3>

                {/* ✅ Wishlist Button */}
                <button
                  onClick={handleWishlist}
                  className="ml-2 flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 hover:bg-primary/20 transition-all cursor-pointer"
                >
                  <Heart
                    className={`w-5 h-5 transition-colors ${
                      isFavorite ? "fill-red-500 text-red-500" : "text-primary"
                    }`}
                  />
                </button>
              </div>

              {/* USER */}
              <p className="text-xs md:text-sm text-primary/90 mt-1 flex items-center gap-1.5">
                Listed By: {mapped.userName || "Nihal Chaudhary"}
              </p>

              {/* LOCATION */}
              <p className="text-xs md:text-sm text-primary/90 mt-1 flex items-center gap-1.5">
                <MapPinned className="w-3.5 h-3.5" />
                {mapped.location || "Chhapi, Gujarat"}
              </p>
            </div>
          </div>

          {/* SPECS */}
          <div className="flex flex-wrap items-center gap-x-2 md:gap-x-4 gap-y-1 text-xs md:text-sm text-primary/80 font-medium">
            <span>{mapped.year}</span>

            <span className="flex items-center gap-1">
              <Settings2 className="w-4 h-4" /> {mapped.transmission}
            </span>

            <span className="flex items-center gap-1">
              <Fuel className="w-4 h-4" /> {mapped.fuel}
            </span>

            <span className="flex items-center gap-1">
              <Users className="w-4 h-4" /> {mapped.seats}
            </span>

            <span className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-primary text-primary" />
              {mapped.rating}
            </span>
          </div>

          {/* PRICE + BUTTON */}
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-sm md:text-xl font-bold">₹ {mapped.price}</h3>

            <Button href="/vehicle/details" variant="outline" size="sm">
              View Details
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
