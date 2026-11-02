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
  const mapped = {
    image: resolvedImage,
    title: data.makerName
      ? `${data.makerName} ${data.modelName} ${data.variantName || ""}`.trim()
      : data.title,
    year: data.yearOfMfg || data.year,
    transmission: formatText(data.transmissionType) || formatText(data.transmission),
    fuel:
      data.cngType &&
        data.cngType !== "NONE" &&
        data.cngType !== "null" &&
        !baseFuel.includes("CNG")
        ? `${baseFuel}+CNG`
        : baseFuel,
    seats: data.ownership ? `${data.ownership} Owner` : data.seats,
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
        className={`group/card relative flex flex-col rounded-2xl overflow-hidden w-full border border-[#FB923C]/30 hover:border-[#FB923C]/55 bg-[#120E0A] shadow-[0_4px_20px_rgba(0,0,0,0.7),0_0_12px_rgba(251,146,60,0.08)] transition-all duration-200 ${
          isCardActive ? "cursor-pointer" : "cursor-default"
        } ${!isSold && isCardActive ? "" : "opacity-75 grayscale-[0.2]"}`}
      >
        {/* ============================================================== */}
        {/* TOP: ROYAL FESTIVE ARCH IMAGE FRAME (NORMAL LIGHT ORANGE ACCENT) */}
        {/* ============================================================== */}
        <div className="relative w-full h-52 sm:h-56 md:h-60 overflow-hidden bg-gradient-to-b from-[#1E1712] via-[#14100C] to-[#0D0A08]">
          
          {/* Inner Vehicle Image (No Zoom On Hover) */}
          <div className="absolute inset-0 z-0">
            {imageSrc ? (
              <Image
                src={imageSrc}
                alt={mapped.title}
                fill
                sizes="(max-width: 768px) 100vw, 320px"
                className="h-full w-full object-cover"
                onError={() => {
                  if (imageSrc !== VEHICLE_IMAGE_FALLBACK) {
                    setImageSrc(VEHICLE_IMAGE_FALLBACK);
                  }
                }}
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-[#1B1A1A]">
                <CarFront className="w-12 h-12 text-zinc-500" />
              </div>
            )}
          </div>

          {/* ========================================================== */}
          {/* REFINED ROYAL FESTIVE CURVED ARCH (NORMAL LIGHT ORANGE TONES) */}
          {/* ========================================================== */}
          <svg
            viewBox="0 0 300 220"
            className="absolute inset-0 w-full h-full pointer-events-none z-10"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id={`goldStroke-${data?.id || 'd'}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FEF08A" />
                <stop offset="35%" stopColor="#FDE047" />
                <stop offset="70%" stopColor="#FBBF24" />
                <stop offset="100%" stopColor="#FB923C" />
              </linearGradient>
              {/* Refined Subtle Dark Obsidian Mask (No Harsh Reddish Orange) */}
              <linearGradient id={`festiveCornerTheme-${data?.id || 'd'}`} x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#1E1712" />
                <stop offset="50%" stopColor="#14100C" />
                <stop offset="100%" stopColor="#0D0A08" />
              </linearGradient>
            </defs>

            {/* Corner Mask: Smooth, Graceful Royal Archway Cutout */}
            <path
              d="M 0,0 
                 L 300,0 
                 L 300,220 
                 L 0,220 
                 Z 
                 M 8,214 
                 L 8,36 
                 C 8,16 45,10 85,14 
                 C 115,6 138,2 150,2 
                 C 162,2 185,6 215,14 
                 C 255,10 292,16 292,36 
                 L 292,214 
                 Z"
              fill={`url(#festiveCornerTheme-${data?.id || 'd'})`}
              fillRule="evenodd"
            />

            {/* Graceful Royal Golden Arch Stroke */}
            <path
              d="M 8,214 
                 L 8,36 
                 C 8,16 45,10 85,14 
                 C 115,6 138,2 150,2 
                 C 162,2 185,6 215,14 
                 C 255,10 292,16 292,36 
                 L 292,214"
              fill="none"
              stroke={`url(#goldStroke-${data?.id || 'd'})`}
              strokeWidth="1.75"
              strokeLinecap="round"
              style={{ filter: "drop-shadow(0px 0px 3px rgba(251, 146, 60, 0.35))" }}
            />

            {/* Delicate Inner Golden Dashed Filigree */}
            <path
              d="M 14,214 
                 L 14,40 
                 C 14,22 48,16 86,20 
                 C 116,12 138,8 150,8 
                 C 162,8 184,12 214,20 
                 C 252,16 286,22 286,40 
                 L 286,214"
              fill="none"
              stroke="#FDE047"
              strokeWidth="1"
              strokeDasharray="3 3"
              opacity="0.75"
            />

            {/* Festive Hanging Fairy Light Drops on Top Corners */}
            <line x1="24" y1="0" x2="24" y2="16" stroke="#FDE047" strokeWidth="1" opacity="0.85" />
            <circle cx="24" cy="16" r="2" fill="#FDE047" />

            <line x1="48" y1="0" x2="48" y2="12" stroke="#FDE047" strokeWidth="1" opacity="0.75" />
            <circle cx="48" cy="12" r="1.8" fill="#FDE047" />

            <line x1="276" y1="0" x2="276" y2="16" stroke="#FDE047" strokeWidth="1" opacity="0.85" />
            <circle cx="276" cy="16" r="2" fill="#FDE047" />

            <line x1="252" y1="0" x2="252" y2="12" stroke="#FDE047" strokeWidth="1" opacity="0.75" />
            <circle cx="252" cy="12" r="1.8" fill="#FDE047" />

            {/* Bottom Golden Ornamental Bar */}
            <line
              x1="0"
              y1="216"
              x2="300"
              y2="216"
              stroke={`url(#goldStroke-${data?.id || 'd'})`}
              strokeWidth="1.5"
            />
          </svg>

          {/* Top-Left: Diwali Special Ribbon Badge (Normal Light Orange Gradient) */}
          <div className="absolute top-2 left-2 z-20 pointer-events-none">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-semibold bg-gradient-to-r from-[#FDE047] via-[#FBBF24] to-[#FB923C] text-zinc-950 shadow-[0_2px_8px_rgba(251,146,60,0.25)]">
              <Flame className="w-3 h-3 text-[#B45309] fill-[#B45309]" />
              Diwali Deal
            </span>
          </div>

          {/* Top-Right: Discount % Badge */}
          {discountPercent ? (
            <div className="absolute top-2 right-2 z-20 pointer-events-none">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] sm:text-[11px] font-semibold bg-[#DC2626] text-white border border-[#FDE047]/50 shadow-sm">
                {discountPercent}% OFF
              </span>
            </div>
          ) : null}

          {/* Compare Button */}
          {!isSold && (
            <button
              type="button"
              disabled={!isCardActive}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                if (!isCardActive) return;
                handleCompare();
              }}
              className={`absolute bottom-11 right-2.5 shrink-0 flex items-center justify-center w-8 h-8 rounded-full transition-all z-20 ${!isCardActive
                  ? "bg-black/40 text-white/30 cursor-not-allowed opacity-40 shadow-none border border-white/10"
                  : isComparing
                    ? "bg-[#FB923C] text-zinc-950 shadow-lg scale-110 cursor-pointer"
                    : "bg-black/60 text-white hover:bg-black/85 cursor-pointer border border-[#FB923C]/30"
                }`}
              title={!isCardActive ? "Unavailable" : "Add to compare"}
              aria-disabled={!isCardActive}
            >
              <ArrowLeftRight className="w-3.5 h-3.5" />
            </button>
          )}

          {/* Wishlist Heart Button */}
          {!isSold && (
            <button
              type="button"
              disabled={!isCardActive}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                if (!isCardActive) return;
                handleWishlist();
              }}
              className={`absolute bottom-2 right-2.5 shrink-0 flex items-center justify-center w-8 h-8 rounded-full transition-all z-20 ${!isCardActive
                  ? "bg-black/40 text-white/30 cursor-not-allowed opacity-40 shadow-none border border-white/10"
                  : "bg-black/60 text-white hover:bg-black/85 cursor-pointer border border-[#FB923C]/30"
                }`}
              title={!isCardActive ? "Unavailable" : isFavorite ? "Remove from wishlist" : "Add to wishlist"}
              aria-disabled={!isCardActive}
            >
              <Heart
                className={`w-4 h-4 transition-colors ${!isCardActive ? "text-white/30" : isFavorite ? "fill-[#EF4444] text-[#EF4444]" : "text-white"
                  }`}
              />
            </button>
          )}

          {/* Inspection / Star Rating Badge */}
          {mapped.rating && (
            <div className="absolute bottom-2 left-2.5 z-20 flex items-center gap-1 rounded-full bg-black/70 backdrop-blur-sm px-2 py-0.5 border border-[#FB923C]/30">
              <Star className="w-3 h-3 text-[#FBBF24] fill-[#FBBF24]" />
              <span className="text-white text-[10px] font-bold">{mapped.rating}</span>
            </div>
          )}
        </div>

        {/* ============================================================== */}
        {/* BOTTOM: REFINED SUBTLE DARK OBSIDIAN BACKGROUND (NORMAL LIGHT ORANGE) */}
        {/* ============================================================== */}
        <div className="flex flex-col flex-1 p-3.5 sm:p-4 bg-gradient-to-b from-[#18130E] via-[#120E0A] to-[#0A0807] justify-between gap-3 text-white">

          {/* Vehicle Title & Dealer */}
          <div className="flex flex-col gap-1.5">
            <h3
              className="text-sm sm:text-base font-semibold font-primary tracking-tight text-white line-clamp-1 group-hover/card:text-[#FDE047] transition-colors"
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

            {/* Dealer & Location with Normal Light Orange / Golden Accents */}
            <div className="flex items-center justify-between text-xs text-zinc-300 gap-2">
              <span className="flex items-center gap-1 truncate" title={mapped.userName}>
                <User className="w-3.5 h-3.5 text-[#FB923C] shrink-0" />
                <span className="truncate capitalize">{mapped.userName || "Verified Dealer"}</span>
              </span>
              <span className="flex items-center gap-1 shrink-0 text-zinc-400 truncate" title={mapped.location}>
                <MapPinned className="w-3.5 h-3.5 text-[#FB923C] shrink-0" />
                <span className="truncate">{mapped.location?.split(",")[0] || "India"}</span>
              </span>
            </div>
          </div>

          {/* Compact 4-Column Specs Pills (Refined Dark with Light Orange Border) */}
          <div className="grid grid-cols-4 gap-1 text-[10px] sm:text-[11px] font-normal text-zinc-300">
            <span className="px-1 py-0.5 rounded-md bg-white/[0.04] border border-[#FB923C]/20 text-center truncate">
              {mapped.year}
            </span>
            <span className="px-1 py-0.5 rounded-md bg-white/[0.04] border border-[#FB923C]/20 text-center truncate">
              {mapped.transmission}
            </span>
            <span className="px-1 py-0.5 rounded-md bg-white/[0.04] border border-[#FB923C]/20 text-center truncate">
              {mapped.fuel}
            </span>
            <span className="px-1 py-0.5 rounded-md bg-white/[0.04] border border-[#FB923C]/20 text-center truncate">
              {mapped.seats}
            </span>
          </div>

          {/* Price, Savings & View Details Button - Clean font-semibold Styling */}
          <div className="pt-2.5 border-t border-[#FB923C]/20 flex items-center justify-between gap-2 mt-auto">

            {/* Left: 2-Row Clean Price Stack */}
            <div className="flex flex-col min-w-0">
              {/* Row 1: Main Price - font-semibold, normal warm gold */}
              <span className="text-lg sm:text-xl font-semibold text-[#FDE047] leading-tight whitespace-nowrap drop-shadow-[0_0_8px_rgba(251,146,60,0.25)]">
                ₹{mapped.price}
              </span>

              {/* Row 2: Struck Price + Savings Tag Cleanly Underneath */}
              <div className="flex items-center gap-1.5 whitespace-nowrap text-xs mt-0.5">
                {mapped.rawDisplayPrice && (
                  <span className="text-zinc-400 line-through font-normal leading-none text-[11px]">
                    ₹{mapped.rawDisplayPrice.toLocaleString("en-IN")}
                  </span>
                )}
                {savingsAmount && (
                  <span className="font-semibold text-emerald-400 leading-none text-[11px]">
                    Save ₹{savingsAmount}
                  </span>
                )}
              </div>
            </div>

            {/* Right: View Details Button - Refined Normal Light Orange Gradient */}
            <NoPrefetchLink
              href={detailHref}
              onClick={(e) => {
                e.stopPropagation();
                handleAdClick();
              }}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg font-semibold text-xs text-zinc-950 bg-gradient-to-r from-[#FDE047] via-[#FBBF24] to-[#FB923C] hover:brightness-105 shadow-[0_2px_10px_rgba(251,146,60,0.25)] transition-all duration-200 shrink-0 cursor-pointer"
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
