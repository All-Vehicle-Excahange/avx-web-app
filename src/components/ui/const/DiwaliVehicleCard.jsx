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
  ArrowRight,
  CarFront,
  Flame,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { useCompareStore } from "@/stores/useCompareStore";
import Image from "next/image";
import NoPrefetchLink from "@/components/ui/NoPrefetchLink";
import { useRouter } from "next/router";
import { addWishList, removeWishList } from "@/services/user.service";
import { addClickEvent } from "@/services/ppc.service";
import { useAuthStore } from "@/stores/useAuthStore";
import { trackWishlistLoginRequired } from "@/lib/amplitude";
import LoginPopup from "@/components/auth/LoginPopup";
import { generateVehicleUrl } from "@/lib/helper";
import { useDebouncedCallback } from "@/hooks/useDebounce";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { event as metaEvent } from "@/lib/fpixel";
import {
  resolveVehicleImageSrc,
  VEHICLE_IMAGE_FALLBACK,
} from "@/lib/vehicleImage";

/**
 * Premium Diwali Festive Vehicle Card.
 * Adheres strictly to the user's theme:
 * - Premium Obsidian Black, 24k Gold, and Warm Amber Glow (Zero wine/red clash)
 * - Top Royal Jharokha Arch Frame with golden filigree & hanging fairy lights
 * - Native 2-row Price alignment (no button collision or truncation)
 * - Balanced 4-col specs pills
 * - Zero hover zoom or border shifts
 */
export default function DiwaliVehicleCard({
  data,
  onWishlistChange,
  source = "diwali-home",
  isSold = false,
  isTierActive = true,
}) {
  const { push } = useRouter();
  const queryClient = useQueryClient();

  const isCardActive =
    isTierActive !== false &&
    data?.isActive !== false &&
    data?.active !== false &&
    data?.isActiveTier !== false &&
    data?.isTierActive !== false;

  const [isFavorite, setIsFavorite] = useState(() => data?.isWishlisted || false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const resolvedImage = resolveVehicleImageSrc(data);
  const [imageSrc, setImageSrc] = useState(resolvedImage);

  useEffect(() => {
    setImageSrc(resolvedImage);
  }, [resolvedImage]);

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
        const contentName =
          `${data?.yearOfMfg || data?.year || ""} ${data?.makerName || ""} ${data?.modelName || ""}`.trim() ||
          "Vehicle";
        metaEvent("AddToWishlist", {
          content_type: "vehicle",
          content_ids: [String(data.id)],
          content_name: contentName,
          value: Number(data?.price) || 0,
          currency: "INR",
        });
      }
      lastSyncedValue.current = nextState;
      queryClient.invalidateQueries({ queryKey: ["user-wishlist-infinite"] });
    } catch (err) {
      console.log("Wishlist sync error:", err);
      setIsFavorite(!nextState);
      onWishlistChange?.(data.id, !nextState);
      queryClient.invalidateQueries({ queryKey: ["user-wishlist-infinite"] });
      toast.error("Failed to update wishlist. Please try again.");
    }
  };

  const debouncedSyncWishlist = useDebouncedCallback(syncWishlist, 1000);

  const handleWishlist = () => {
    if (!isCardActive) return;
    if (!isLoggedIn) {
      pendingAction.current = "wishlist";
      trackWishlistLoginRequired({
        vehicle_id: data?.id,
        vehicle_name:
          `${data?.yearOfMfg || data?.year || ""} ${data?.makerName || ""} ${data?.modelName || ""} ${data?.variantName || ""}`.trim() ||
          data?.title ||
          undefined,
        source,
      });
      useAuthStore.getState().setAuthFunnelContext({
        entry_context: source,
        trigger_action: "wishlist",
        user_role_intent: "buyer",
      });
      setIsLoginOpen(true);
      return;
    }

    const nextState = !isFavorite;
    setIsFavorite(nextState);
    onWishlistChange?.(data.id, nextState);

    if (nextState === lastSyncedValue.current) {
      debouncedSyncWishlist.cancel();
    } else {
      if (!nextState) {
        debouncedSyncWishlist.cancel();
        syncWishlist(nextState);
      } else {
        debouncedSyncWishlist(nextState);
      }
    }
  };

  const handleCompare = () => {
    if (!isCardActive || !data?.id) return;
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
    if (text.toUpperCase() === "PETROL_PLUS_CNG") return "Petrol+CNG";
    if (text.toUpperCase() === "PETROL_PLUS_LPG") return "Petrol+LPG";
    return text
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  const baseFuel = formatText(data.fuelType) || formatText(data.fuel);
  const ownershipDisplay = data.ownership
    ? `${data.ownership} Owner`
    : data.seats
      ? (typeof data.seats === "number" ? `${data.seats} Seater` : data.seats)
      : "1 Owner";

  const mapped = {
    image: resolvedImage,
    title: data.makerName
      ? `${data.makerName} ${data.modelName} ${data.variantName || ""}`.trim()
      : data.title,
    year: data.yearOfMfg || data.year || "-",
    transmission: formatText(data.transmissionType) || formatText(data.transmission) || "-",
    fuel:
      data.cngType &&
        data.cngType !== "NONE" &&
        data.cngType !== "null" &&
        !baseFuel.includes("CNG")
        ? `${baseFuel}+CNG`
        : baseFuel || "-",
    seats: ownershipDisplay,
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
    rawPrice: Number(data.price) || 0,
    price: data.price ? Number(data.price).toLocaleString("en-IN") : data.price,
    rawDisplayPrice: data.displayPrice ? Number(data.displayPrice) : null,
  };

  const discountPercent = (() => {
    if (!mapped.rawPrice || !mapped.rawDisplayPrice) return null;
    const max = Math.max(mapped.rawPrice, mapped.rawDisplayPrice);
    const min = Math.min(mapped.rawPrice, mapped.rawDisplayPrice);
    if (max === min) return null;
    return Math.round(((max - min) / max) * 100);
  })();

  const savingsAmount =
    mapped.rawDisplayPrice && mapped.rawPrice && mapped.rawDisplayPrice > mapped.rawPrice
      ? (mapped.rawDisplayPrice - mapped.rawPrice).toLocaleString("en-IN")
      : null;

  const handleAdClick = async () => {
    if (data?.sponsored && data?.billingType === "CPC" && data?.adId) {
      try {
        await addClickEvent(data.adId, data.placement || "DIWALI_SECTION");
      } catch (err) {
        console.error("Failed to register CPC click:", err);
      }
    }
  };

  const detailHref = (() => {
    let url = generateVehicleUrl(data);
    url += url.includes("?") ? `&source=${source}` : `?source=${source}`;
    if (data?.sponsored) {
      url += `&sponsored=true&adId=${data.adId || ""}&billingType=${data.billingType || ""}`;
    }
    return url;
  })();

  const handleCardClick = (e) => {
    if (!isCardActive) {
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }
      return;
    }
    handleAdClick();
    push(detailHref);
  };

  return (
    <>
      <div
        onClick={handleCardClick}
        className={`group/card relative flex flex-col rounded-2xl p-2.5 sm:p-3 w-full border-2 border-[#FBBF24]/60 hover:border-[#FBBF24] bg-gradient-to-b from-[#181d52]/95 via-[#34164f]/95 to-[#1c082c]/95 shadow-[0_12px_35px_rgba(10,14,48,0.7),0_0_20px_rgba(110,24,130,0.25)] hover:shadow-[0_18px_45px_rgba(10,14,48,0.85),0_0_30px_rgba(245,158,11,0.4)] transition-all duration-300 ${
          isCardActive ? "cursor-pointer" : "cursor-default"
        } ${!isSold && isCardActive ? "" : "opacity-75 grayscale-[0.2]"}`}
      >
        {/* ============================================================== */}
        {/* TOP: VEHICLE IMAGE CONTAINER (INSET ROUNDED STAGING)          */}
        {/* ============================================================== */}
        <div className="relative w-full h-40 sm:h-44 md:h-48 overflow-hidden rounded-xl bg-[#0c1033] shrink-0">
          
          {/* Inner Vehicle Image */}
          <div className="absolute inset-0 z-0">
            {imageSrc ? (
              <Image
                src={imageSrc}
                alt={mapped.title}
                fill
                sizes="(max-width: 768px) 100vw, 320px"
                className="h-full w-full object-cover group-hover/card:scale-103 transition-transform duration-500 ease-out"
                onError={() => {
                  if (imageSrc !== VEHICLE_IMAGE_FALLBACK) {
                    setImageSrc(VEHICLE_IMAGE_FALLBACK);
                  }
                }}
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-[#190432]">
                <CarFront className="w-12 h-12 text-[#FFD700]/60" />
              </div>
            )}
          </div>

          {/* Top-Left: 🔥 Diwali Deal Ribbon Badge */}
          <div className="absolute top-2.5 left-2.5 z-20 pointer-events-none">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-bold bg-gradient-to-r from-[#dc2626] to-[#991b1b] text-white border border-[#F59E0B]/60 shadow-md">
              <span className="text-xs">🔥</span>
              <span>Diwali Deal</span>
            </span>
          </div>

          {/* Top-Right: Discount % Badge */}
          {discountPercent ? (
            <div className="absolute top-2.5 right-2.5 z-20 pointer-events-none">
              <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] sm:text-[11px] font-extrabold bg-[#FDE047] text-zinc-950 shadow-md">
                {discountPercent}% OFF
              </span>
            </div>
          ) : null}

          {/* Bottom-Right: Compare & Wishlist Action Buttons (Stacked) */}
          {!isSold && (
            <div className="absolute bottom-2 right-2 flex flex-col gap-1.5 z-20">
              {/* Compare Button */}
              <button
                type="button"
                disabled={!isCardActive}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  if (!isCardActive) return;
                  handleCompare();
                }}
                className={`shrink-0 flex items-center justify-center w-7 h-7 rounded-full transition-all ${
                  !isCardActive
                    ? "bg-black/40 text-white/30 cursor-not-allowed opacity-40 shadow-none border border-white/10"
                    : isComparing
                      ? "bg-[#FBBF24] text-zinc-950 font-bold shadow-lg scale-105 cursor-pointer"
                      : "bg-black/60 backdrop-blur-md text-white hover:bg-black/85 cursor-pointer border border-white/20"
                }`}
                title={!isCardActive ? "Unavailable" : "Add to compare"}
                aria-disabled={!isCardActive}
              >
                <ArrowLeftRight className="w-3.5 h-3.5" />
              </button>

              {/* Wishlist Heart Button */}
              <button
                type="button"
                disabled={!isCardActive}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  if (!isCardActive) return;
                  handleWishlist();
                }}
                className={`shrink-0 flex items-center justify-center w-7 h-7 rounded-full transition-all ${
                  !isCardActive
                    ? "bg-black/40 text-white/30 cursor-not-allowed opacity-40 shadow-none border border-white/10"
                    : "bg-black/60 backdrop-blur-md text-white hover:bg-black/85 cursor-pointer border border-white/20"
                }`}
                title={!isCardActive ? "Unavailable" : isFavorite ? "Remove from wishlist" : "Add to wishlist"}
                aria-disabled={!isCardActive}
              >
                <Heart
                  className={`w-3.5 h-3.5 transition-colors ${
                    !isCardActive ? "text-white/30" : isFavorite ? "fill-[#EF4444] text-[#EF4444]" : "text-white"
                  }`}
                />
              </button>
            </div>
          )}
        </div>

        {/* ============================================================== */}
        {/* BOTTOM: CARD DETAILS BODY                                      */}
        {/* ============================================================== */}
        <div className="flex flex-col flex-1 pt-3 justify-between gap-2 text-white">

          {/* 1. Vehicle Title */}
          <h3
            className="text-sm sm:text-base font-bold font-primary tracking-tight text-white line-clamp-1 group-hover/card:text-[#FDE047] transition-colors"
            title={mapped.title}
          >
            <NoPrefetchLink
              href={detailHref}
              onClick={(e) => e.stopPropagation()}
              title={mapped.title}
            >
              {mapped.title}
            </NoPrefetchLink>
          </h3>

          {/* 2. Seller / Consultant & Location */}
          <div className="flex items-center gap-3 text-[11px] text-zinc-300 overflow-hidden whitespace-nowrap">
            <div className="flex items-center gap-1 min-w-0 truncate">
              <User className="w-3.5 h-3.5 text-[#FBBF24] shrink-0" />
              <span className="truncate">{mapped.userName || "Verified Seller"}</span>
            </div>
            <div className="flex items-center gap-1 min-w-0 truncate">
              <MapPinned className="w-3.5 h-3.5 text-[#FBBF24] shrink-0" />
              <span className="truncate">{mapped.location || "India"}</span>
            </div>
          </div>

          {/* 3. 4 Outlined Specs Pills: [ Year ] [ Transmission ] [ Fuel ] [ Ownership ] */}
          <div className="grid grid-cols-4 gap-1.5 mt-0.5">
            <div className="rounded-md py-1 px-1 text-center text-[10px] sm:text-[11px] font-medium text-purple-200 border border-purple-400/30 bg-purple-950/40 truncate">
              {mapped.year || "-"}
            </div>
            <div className="rounded-md py-1 px-1 text-center text-[10px] sm:text-[11px] font-medium text-purple-200 border border-purple-400/30 bg-purple-950/40 truncate capitalize">
              {mapped.transmission || "-"}
            </div>
            <div className="rounded-md py-1 px-1 text-center text-[10px] sm:text-[11px] font-medium text-purple-200 border border-purple-400/30 bg-purple-950/40 truncate capitalize">
              {mapped.fuel || "-"}
            </div>
            <div className="rounded-md py-1 px-1 text-center text-[10px] sm:text-[11px] font-medium text-purple-200 border border-purple-400/30 bg-purple-950/40 truncate">
              {mapped.seats || "1 Owner"}
            </div>
          </div>

          {/* 4. Price & View Details CTA */}
          <div className="pt-2 border-t border-[#FBBF24]/20 flex items-center justify-between gap-2 mt-auto">
            {/* Left: Price Stack */}
            <div className="flex flex-col min-w-0">
              <span className="text-base sm:text-lg md:text-xl font-black text-[#FDE047] leading-tight whitespace-nowrap drop-shadow-[0_1px_6px_rgba(253,224,71,0.25)]">
                ₹{mapped.price}
              </span>
              <div className="flex items-center gap-1.5 whitespace-nowrap text-xs mt-0.5">
                {mapped.rawDisplayPrice && (
                  <span className="text-purple-200/50 line-through text-[11px]">
                    ₹{mapped.rawDisplayPrice.toLocaleString("en-IN")}
                  </span>
                )}
                {savingsAmount && (
                  <span className="text-[10px] font-bold text-emerald-400">
                    Save ₹{savingsAmount}
                  </span>
                )}
              </div>
            </div>

            {/* Right: View Details Button - Rounded Rectangle */}
            <NoPrefetchLink
              href={detailHref}
              onClick={(e) => {
                e.stopPropagation();
                handleAdClick();
              }}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg font-bold text-xs text-zinc-950 bg-gradient-to-r from-[#FDE047] via-[#FBBF24] to-[#F59E0B] hover:brightness-110 shadow-[0_2px_10px_rgba(245,158,11,0.35)] transition-all duration-200 shrink-0 cursor-pointer"
            >
              <span>View Details</span>
              <ArrowRight className="w-3.5 h-3.5 text-zinc-950" />
            </NoPrefetchLink>
          </div>

        </div>
      </div>

      <LoginPopup
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
      />
    </>
  );
}
