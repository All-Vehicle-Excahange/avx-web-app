import { useState, useEffect, useRef } from "react";
import SponsoredRibbon from "./SponsoredRibbonMain";
import {
  Fuel,
  Heart,
  MapPinned,
  Settings2,
  Star,
  User,
  Users,
  ArrowLeftRight,
} from "lucide-react";
import { useCompareStore } from "@/stores/useCompareStore";
import Button from "../button";
import Image from "next/image";
import { useRouter } from "next/router";
import { addWishList, removeWishList } from "@/services/user.service";
import { useAuthStore } from "@/stores/useAuthStore";
import LoginPopup from "@/components/auth/LoginPopup";
import { createSlug } from "@/lib/helper";
import SignupPopup from "@/components/auth/SignupPopup";
import { useDebouncedCallback } from "@/hooks/useDebounce";

export default function VehicleCard({
  data,
  onWishlistChange,
  source = "search",
}) {
  const router = useRouter();

  //  Initial Favorite State From Backend
  const [isFavorite, setIsFavorite] = useState(
    () => data?.isWishlisted || false,
  );
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const { addToCompare, compareVehicles } = useCompareStore();
  const isComparing = compareVehicles.some((v) => v.id === data.id);

  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const lastSyncedValue = useRef(data?.isWishlisted || false);
  const pendingAction = useRef(null);

  const debouncedSyncWishlist = useDebouncedCallback(async (nextState) => {
    try {
      if (!nextState) {
        const res = await removeWishList(data.id);
        if (!(res?.success || res?.status)) {
          throw new Error("Failed to remove");
        }
      } else {
        const res = await addWishList(data.id);
        if (!(res?.success || res?.status)) {
          throw new Error("Failed to add");
        }
      }
      lastSyncedValue.current = nextState;
      onWishlistChange?.();
    } catch (err) {
      console.log("Wishlist sync error:", err);
      // Revert if API fails
      setIsFavorite(!nextState);
    }
  }, 1000);

  const handleWishlist = () => {
    if (!isLoggedIn) {
      pendingAction.current = "wishlist";
      setIsLoginOpen(true);
      return;
    }

    const nextState = !isFavorite;
    setIsFavorite(nextState);

    if (nextState === lastSyncedValue.current) {
      debouncedSyncWishlist.cancel();
    } else {
      debouncedSyncWishlist(nextState);
    }
  };

  const handleCompare = () => {
    if (!data?.id) return;

    if (isComparing) {
      addToCompare(data);
      return;
    }

    if (compareVehicles.length >= 1 && !isLoggedIn) {
      pendingAction.current = "compare";
      setIsLoginOpen(true);
      return;
    }

    addToCompare(data);
  };

  useEffect(() => {
    if (isLoggedIn) {
      if (pendingAction.current === "wishlist") {
        pendingAction.current = null;
        handleWishlist();
      } else if (pendingAction.current === "compare") {
        pendingAction.current = null;
        handleCompare();
      }
    }
  }, [isLoggedIn]);

  const formatText = (text) =>
    text ? text.charAt(0).toUpperCase() + text.slice(1).toLowerCase() : "";

  const mapped = {
    image: data.thumbnailUrl || data.image,

    title: data.makerName
      ? `${data.makerName} ${data.modelName} ${data.variantName}`
      : data.title,

    year: data.yearOfMfg || data.year,
    transmission: formatText(data.transmissionType) || formatText(data.transmission),
    fuel: formatText(data.fuelType) || formatText(data.fuel),
    seats: data.ownership || data.seats,

    rating: data.avxInspectionRating || "-",

    userName: data.consultantName
      ? data.consultantName
      : data.vehicleOwner
        ? `${data.vehicleOwner.firstname ?? ""} ${data.vehicleOwner.lastname ?? ""}`.trim()
        : data.userName,

    location: data.address
      ? `${data.address.city ?? ""}${data.address.city && data.address.country ? ", " : ""}${data.address.country ?? ""}`.trim()
      : data.location || "-",

    price: data.price ? Number(data.price).toLocaleString("en-IN") : data.price,

    sponsored: data.sponsored || false,
  };
  const slug = createSlug(mapped.title);
  const handleCardClick = () => {
    router.push(`/vehicle/details/${slug}/${data.id}?source=${source}`);
  };

  return (
    <>
      <div
        onClick={handleCardClick}
        className="
        group/card relative flex flex-row md:flex-col
        rounded-2xl overflow-hidden
         text-primary
        md:max-w-sm w-full sm:w-[392px]
        border-2 border-third/60
        hover:shadow-[0_10px_40px_-10px_rgba(255,255,255,0.25)]
        transition-shadow duration-300
        h-full md:h-[500px] cursor-pointer"
      >
        <div className="relative z-10 flex flex-row md:flex-col w-full h-full">
          {/* IMAGE */}
          <div className="relative w-42 sm:w-40 min-h-45 md:min-h-0 md:h-62 md:w-full shrink-0 p-2">
            <div className="relative w-full h-full overflow-hidden rounded-xl">
              {mapped.sponsored && <SponsoredRibbon />}

              {/* Inspection Badge */}
              {data?.inspectionBadgeUrl && (
                <div className="hidden md:block absolute top-0 left-0 z-20">
                  <Image
                    src={data.inspectionBadgeUrl}
                    alt="Inspection Badge"
                    width={40}
                    height={40}
                    className="object-contain drop-shadow-lg"
                  />
                </div>
              )}
              {mapped.sponsored && <SponsoredRibbon />}

              <Image
                src={mapped.image}
                alt={mapped.title}
                fill
                className="h-full w-full object-cover transition-transform duration-500 group-hover/card:scale-110"
              />

              {/* ✅ Compare Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleCompare();
                }}
                className={`absolute bottom-12 right-2 shrink-0 flex items-center justify-center w-8 h-8 rounded-full transition-all cursor-pointer z-20 
                  ${
                    isComparing
                      ? "bg-fourth text-secondary shadow-lg scale-110"
                      : "bg-black/50 text-white hover:bg-black/70"
                  }`}
                title="Add to compare"
              >
                <ArrowLeftRight className="w-4 h-4" />
              </button>

              {/* ✅ Wishlist Button (Bottom-Right of Image) */}
              <button
                onClick={(e) => {
                  e.stopPropagation(); // prevent card click
                  handleWishlist();
                }}
                className="absolute bottom-2 right-2 shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-black/50 transition-all cursor-pointer z-20 hover:bg-black/70"
              >
                <Heart
                  className={`w-5 h-5 transition-colors ${isFavorite ? "fill-red-500 text-red-500" : "text-white"}`}
                />
              </button>
            </div>
          </div>

          {/* CONTENT */}
          <div className="flex flex-col flex-1 p-2.5 md:p-4 space-y-2 md:space-y-4 justify-between h-full relative">
            {/* TITLE + HEART */}
            <div className="flex justify-between items-start gap-2">
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-2 min-h-[40px] md:min-h-[56px]">
                  <h3
                    className="
      text-sm font-secondary md:text-xl font-bold 
      leading-tight tracking-wide 
      line-clamp-2 overflow-hidden
    "
                  >
                    {mapped.title}
                  </h3>
                </div>

                {/* USER */}
                <p className="text-xs md:text-sm text-primary/90 mt-1 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5" />{" "}
                  {mapped.userName || "Nihal Chaudhary"}
                </p>

                {/* LOCATION */}
                <p className="text-xs md:text-sm text-primary/90 mt-1 flex items-center gap-1.5">
                  <MapPinned className="w-3.5 h-3.5" />
                  {mapped.location || "Chhapi, Gujarat"}
                </p>
              </div>
            </div>

            {/* SPECS */}
            <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-x-2 md:gap-x-4 gap-y-1 text-xs md:text-sm text-primary/80 font-medium">
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
            <div className="flex items-center justify-end md:justify-between gap-2 mt-auto">
              <h3 className="text-sm md:text-xl font-bold text-primary">
                ₹ {mapped.price}
              </h3>

              <div className="hidden md:block">
                <Button
                  href={`/vehicle/details/${slug}/${data.id}?source=${source}`}
                  scroll={true}
                  variant="outline"
                  size="sm"
                >
                  View Details
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <LoginPopup
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onSignup={() => {
          setIsLoginOpen(false);
          setIsSignupOpen(true);
        }}
      />
      <SignupPopup
        isOpen={isSignupOpen}
        onClose={() => setIsSignupOpen(false)}
        onLogin={() => {
          setIsSignupOpen(false);
          setIsLoginOpen(true);
        }}
      />
    </>
  );
}
