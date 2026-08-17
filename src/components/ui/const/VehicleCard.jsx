import { useState, useEffect, useRef } from "react";
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
import { addClickEvent } from "@/services/ppc.service";
import { useAuthStore } from "@/stores/useAuthStore";
import LoginPopup from "@/components/auth/LoginPopup";
import { createSlug, generateVehicleUrl } from "@/lib/helper";
import SignupPopup from "@/components/auth/SignupPopup";
import { useDebouncedCallback } from "@/hooks/useDebounce";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export default function VehicleCard({
  data,
  onWishlistChange,
  source = "search",
}) {
  const { push } = useRouter();
  const queryClient = useQueryClient();

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

  const syncWishlist = async (nextState) => {
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
      queryClient.invalidateQueries({ queryKey: ["user-wishlist-infinite"] });
    } catch (err) {
      console.log("Wishlist sync error:", err);
      // Revert if API fails
      setIsFavorite(!nextState);
      onWishlistChange?.(data.id, !nextState);
      queryClient.invalidateQueries({ queryKey: ["user-wishlist-infinite"] });
      toast.error("Failed to update wishlist. Please try again.");
    }
  };

  const debouncedSyncWishlist = useDebouncedCallback(syncWishlist, 1000);

  const handleWishlist = () => {
    if (!isLoggedIn) {
      pendingAction.current = "wishlist";
      setIsLoginOpen(true);
      return;
    }

    const nextState = !isFavorite;
    setIsFavorite(nextState);

    console.log("VehicleCard: handleWishlist clicked. Vehicle ID:", data.id, "nextState:", nextState);

    // Call onWishlistChange immediately to allow immediate/optimistic updates in parent page
    onWishlistChange?.(data.id, nextState);

    if (nextState === lastSyncedValue.current) {
      debouncedSyncWishlist.cancel();
    } else {
      if (!nextState) {
        // Bypass debounce and sync immediately when unliking
        debouncedSyncWishlist.cancel();
        syncWishlist(nextState);
      } else {
        // Use debounce when liking (adding to wishlist) to prevent rapid spam clicks
        debouncedSyncWishlist(nextState);
      }
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

  const formatText = (text) => {
    if (!text) return "";
    if (text.toUpperCase() === "PETROL_PLUS_CNG") return "Petrol + CNG";
    if (text.toUpperCase() === "PETROL_PLUS_LPG") return "Petrol + LPG";
    return text
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  const baseFuel = formatText(data.fuelType) || formatText(data.fuel);
  const mapped = {
    image: data.thumbnailUrl || data.image,

    title: data.makerName
      ? `${data.makerName} ${data.modelName} ${data.variantName}`
      : data.title,

    year: data.yearOfMfg || data.year,
    transmission:
      formatText(data.transmissionType) || formatText(data.transmission),
    fuel:
      data.cngType &&
        data.cngType !== "NONE" &&
        data.cngType !== "null" &&
        !baseFuel.includes("CNG")
        ? `${baseFuel} + CNG`
        : baseFuel,
    seats: data.ownership || data.seats,
    rating: data.avxInspectionRating,
    userName: data.consultantName
      ? data.consultantName
      : data.vehicleOwner
        ? `${data.vehicleOwner.firstname ?? ""} ${data.vehicleOwner.lastname ?? ""}`.trim()
        : data.userName,

    location: (() => {
      if (data.address && typeof data.address === "object") {
        const townCity = [data.address.town, data.address.city]
          .map((s) => s?.trim())
          .filter(Boolean)
          .join(" ");
        const stateOrCountry = (data.address.state || data.address.country)?.trim();
        if (townCity && stateOrCountry) {
          return `${townCity}, ${stateOrCountry}`;
        }
        return townCity || stateOrCountry || data.location || "-";
      }
      return data.location || "-";
    })(),

    price: data.price ? Number(data.price).toLocaleString("en-IN") : data.price,

    sponsored: data.sponsored || false,
  };
  const brandPart = data.makerName
    ? data.makerName.toLowerCase().replace(/\s+/g, "-")
    : "";
  const modelPart = data.modelName
    ? data.modelName.toLowerCase().replace(/\s+/g, "-")
    : "";
  const yearPart = mapped.year || "";
  const cityPart = mapped.location
    .split(",")[0]
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-");

  const slug = `buy-used-${brandPart}-${modelPart}-${yearPart}-cars-${cityPart}`
    .replace(/-+/g, "-")
    .replace(/-$/, "")
    .replace(/^-/, "");

  const handleAdClick = async () => {
    if (data?.sponsored && data?.billingType === "CPC" && data?.adId) {
      try {
        await addClickEvent(data.adId, data.placement || "SEARCH_RESULT_PAGE");
      } catch (err) {
        console.error("Failed to register CPC click:", err);
      }
    }
  };

  const handleCardClick = () => {
    handleAdClick();
    let url = generateVehicleUrl(data);
    url += url.includes("?") ? `&source=${source}` : `?source=${source}`;
    if (data?.sponsored) {
      url += `&sponsored=true&adId=${data.adId || ""}&billingType=${data.billingType || ""}`;
    }
    push(url);
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
        border-2 border-third/30
        hover:shadow-[0_10px_40px_-10px_rgba(255,255,255,0.25)]
        transition-shadow duration-300
        h-full md:min-h-[420px] cursor-pointer"
      >
        <div className="relative z-10 flex flex-row md:flex-col w-full h-full">
          {/* IMAGE */}
          <div className="relative w-42 sm:w-40 min-h-45 md:min-h-0 md:h-52 md:w-full shrink-0 p-2">
            <div className="relative w-full h-full overflow-hidden rounded-xl">
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
                  ${isComparing
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

              {/* ✅ Rating Badge (Bottom-Left of Image) */}
              {mapped?.rating ? (
                data?.inspectionStatus === "AVX_INSPECTED" ? (
                  <div className="absolute -bottom-1.5 left-2.5 shrink-0 z-20 flex items-center justify-center w-16 h-16">
                    <Image
                      src="/inspection_vector.svg"
                      alt="Reecomm Inspected"
                      fill
                      className="object-contain drop-shadow-lg z-20"
                    />
                    <span className="absolute left-[33px] top-[24px] z-30 text-white font-semibold text-xs">
                      {mapped.rating}
                    </span>
                  </div>
                ) : (
                  <div className="absolute bottom-2 left-2 shrink-0 flex items-center justify-center gap-1 rounded-full bg-black/60 backdrop-blur-sm px-2.5 py-1.5 z-20">
                    <Star className="w-3.5 h-3.5 text-yellow-400" />
                    <span className="text-white text-[11px] leading-none font-bold">
                      {mapped.rating}
                    </span>
                  </div>
                )
              ) : null}
            </div>
          </div>

          {/* CONTENT */}
          <div className="flex flex-col flex-1 p-2.5 md:p-4 space-y-2 md:space-y-3 justify-between min-h-0 overflow-hidden relative">
            {/* TITLE + HEART */}
            <div className="flex justify-between items-start gap-2">
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-2 min-h-10 md:min-h-14">
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
                <div className="flex items-center gap-1.5 mt-1">
                  <p className="text-xs md:text-sm text-primary/90 flex items-center gap-1.5 truncate">
                    <User className="w-3.5 h-3.5 shrink-0" />{" "}
                    <span className="truncate">{mapped.userName || "john doe"}</span>
                  </p>
                  {data?.tierTitle === "PREMIUM" && (
                    <Image
                      src="/icons/trusted-icon.svg"
                      alt="Premium Consultant"
                      width={16}
                      height={16}
                      className="shrink-0"
                      title="Premium Consultant"
                    />
                  )}
                </div>

                {/* LOCATION */}
                <p
                  className="text-xs md:text-sm text-primary/90 mt-1 flex items-center gap-1.5"
                  title={mapped.location || "Chhapi, Gujarat"}
                >
                  <MapPinned className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">{mapped.location || "Chhapi, Gujarat"}</span>
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
            </div>

            {/* PRICE + BUTTON */}
            <div className="flex items-center justify-between gap-2 mt-auto">
              <h3 className="text-sm md:text-xl font-bold text-primary">
                ₹ {mapped.price}
              </h3>

              <div className="hidden md:block">
                <Button
                  href={`/vehicle/details/${slug}/${data.id}?source=${source}${data?.sponsored
                    ? `&sponsored=true&adId=${data.adId || ""}&billingType=${data.billingType || ""}`
                    : ""
                    }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAdClick();
                  }}
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
