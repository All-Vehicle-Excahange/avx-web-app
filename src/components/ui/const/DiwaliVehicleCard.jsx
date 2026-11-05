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
// Dedicated Ornate Hanging Diwali Lanterns (Kandil / Lamps with Golden Chains)
const HangingDiwaliLamps = ({ side = "left" }) => {
  const isLeft = side === "left";
  return (
    <div
      className={`absolute -top-0.5 ${isLeft ? "left-1 sm:left-1.5" : "right-1 sm:right-1.5"} z-20 pointer-events-none select-none`}
    >
      <svg
        viewBox="0 0 46 68"
        className={`w-9 sm:w-10 h-14 sm:h-16 filter drop-shadow-[0_2px_8px_rgba(245,158,11,0.7)] group-hover/card:drop-shadow-[0_2px_12px_rgba(253,224,71,0.9)] transition-all duration-300 ${
          isLeft ? "" : "scale-x-[-1]"
        }`}
        fill="none"
      >
        <defs>
          <linearGradient id="kandilBrass" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFBEB" />
            <stop offset="30%" stopColor="#FDE047" />
            <stop offset="70%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#92400E" />
          </linearGradient>

          <radialGradient id="kandilCore" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFBEB" />
            <stop offset="35%" stopColor="#FEF08A" />
            <stop offset="70%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#D97706" />
          </radialGradient>

          <radialGradient id="kandilHalo" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FDE047" stopOpacity="0.8" />
            <stop offset="55%" stopColor="#F59E0B" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Top Draped Garland Chain */}
        <path
          d="M 0 1 Q 14 8 26 3 Q 36 0 46 4"
          stroke="url(#kandilBrass)"
          strokeWidth="0.9"
          strokeDasharray="2 1.5"
          fill="none"
          opacity="0.8"
        />

        {/* =================================================== */}
        {/* LAMP 1: PRIMARY LARGER HANGING LANTERN              */}
        {/* =================================================== */}
        {/* Chain 1 */}
        <line
          x1="16"
          y1="0"
          x2="16"
          y2="18"
          stroke="url(#kandilBrass)"
          strokeWidth="1.1"
          strokeDasharray="2.5 1.5"
        />

        {/* Halo Glow */}
        <circle cx="16" cy="35" r="13" fill="url(#kandilHalo)" />

        {/* Hanging Ring */}
        <circle cx="16" cy="19" r="1.8" stroke="url(#kandilBrass)" strokeWidth="0.9" />

        {/* Top Brass Cap */}
        <path
          d="M 10 24 Q 16 20 22 24 L 23 26 L 9 26 Z"
          fill="url(#kandilBrass)"
          stroke="#78350F"
          strokeWidth="0.5"
        />

        {/* Glowing Hexagonal Body */}
        <polygon
          points="9,26 23,26 26,34 23,44 9,44 6,34"
          fill="url(#kandilCore)"
        />

        {/* Brass Jali Cage */}
        <polygon
          points="9,26 23,26 26,34 23,44 9,44 6,34"
          stroke="url(#kandilBrass)"
          strokeWidth="1.1"
          fill="none"
        />
        <line x1="16" y1="26" x2="16" y2="44" stroke="url(#kandilBrass)" strokeWidth="0.8" />
        <line x1="9" y1="34" x2="23" y2="34" stroke="url(#kandilBrass)" strokeWidth="0.7" opacity="0.8" />
        <line x1="12" y1="26" x2="20" y2="44" stroke="url(#kandilBrass)" strokeWidth="0.5" opacity="0.6" />
        <line x1="20" y1="26" x2="12" y2="44" stroke="url(#kandilBrass)" strokeWidth="0.5" opacity="0.6" />

        {/* Inner Flame Spark */}
        <circle cx="16" cy="34" r="2.8" fill="#FFFFFF" opacity="0.95" className="animate-pulse" />

        {/* Pedestal Base */}
        <path
          d="M 11 44 L 21 44 L 19 48 L 13 48 Z"
          fill="url(#kandilBrass)"
          stroke="#78350F"
          strokeWidth="0.5"
        />

        {/* Bottom Droplet Finial */}
        <path
          d="M 16 48 L 18 53 C 18 54.5 16 56 16 56 C 16 56 14 54.5 14 53 Z"
          fill="url(#kandilBrass)"
        />

        {/* =================================================== */}
        {/* LAMP 2: SECONDARY ACCENT LANTERN (HANGING HIGHER)   */}
        {/* =================================================== */}
        {/* Chain 2 */}
        <line
          x1="34"
          y1="0"
          x2="34"
          y2="9"
          stroke="url(#kandilBrass)"
          strokeWidth="0.9"
          strokeDasharray="2 1.5"
        />

        {/* Halo Glow */}
        <circle cx="34" cy="20" r="9" fill="url(#kandilHalo)" />

        {/* Ring */}
        <circle cx="34" cy="10" r="1.3" stroke="url(#kandilBrass)" strokeWidth="0.7" />

        {/* Cap */}
        <path
          d="M 29 13 Q 34 10 39 13 L 40 15 L 28 15 Z"
          fill="url(#kandilBrass)"
        />

        {/* Glowing Body */}
        <polygon
          points="29,15 39,15 41,21 39,29 29,29 27,21"
          fill="url(#kandilCore)"
        />
        <polygon
          points="29,15 39,15 41,21 39,29 29,29 27,21"
          stroke="url(#kandilBrass)"
          strokeWidth="0.8"
          fill="none"
        />
        <line x1="34" y1="15" x2="34" y2="29" stroke="url(#kandilBrass)" strokeWidth="0.7" />

        {/* Spark */}
        <circle cx="34" cy="21" r="1.8" fill="#FFFFFF" opacity="0.9" className="animate-pulse" />

        {/* Base & Droplet */}
        <path
          d="M 30 29 L 38 29 L 36 32 L 32 32 Z"
          fill="url(#kandilBrass)"
        />
        <path
          d="M 34 32 L 35.5 35 C 35.5 36 34 37 34 37 C 34 37 32.5 36 32.5 35 Z"
          fill="url(#kandilBrass)"
        />
      </svg>
    </div>
  );
};

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
        {/* Hanging Festive Diwali Lamps on Left & Right Corners of the Card */}
        <HangingDiwaliLamps side="left" />
        <HangingDiwaliLamps side="right" />

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
          <div className="absolute top-2 left-2 z-20 pointer-events-none">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-bold bg-gradient-to-r from-[#dc2626] to-[#991b1b] text-white border border-[#F59E0B]/60 shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
              <span className="text-xs">🔥</span>
              <span>Diwali Deal</span>
            </span>
          </div>

          {/* Top-Right: 16-Point Festive Starburst Discount Badge */}
          {discountPercent ? (
            <div className="absolute -top-1 -right-1 sm:top-0 sm:right-0 z-20 pointer-events-none flex items-center justify-center filter drop-shadow-[0_2px_10px_rgba(0,0,0,0.7)]">
              <div className="relative w-12 h-12 sm:w-13 sm:h-13 flex items-center justify-center">
                {/* 16-Point Starburst Shape */}
                <svg
                  viewBox="0 0 100 100"
                  className="absolute inset-0 w-full h-full filter drop-shadow-[0_0_6px_rgba(253,224,71,0.55)]"
                >
                  <defs>
                    <linearGradient id="festiveBurstGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#FEF08A" />
                      <stop offset="35%" stopColor="#FDE047" />
                      <stop offset="70%" stopColor="#F59E0B" />
                      <stop offset="100%" stopColor="#D97706" />
                    </linearGradient>
                  </defs>
                  <polygon
                    points="50.0,1.0 57.0,14.7 68.8,4.7 70.0,20.1 84.6,15.4 79.9,30.0 95.3,31.2 85.3,43.0 99.0,50.0 85.3,57.0 95.3,68.8 79.9,70.0 84.6,84.6 70.0,79.9 68.8,95.3 57.0,85.3 50.0,99.0 43.0,85.3 31.2,95.3 30.0,79.9 15.4,84.6 20.1,70.0 4.7,68.8 14.7,57.0 1.0,50.0 14.7,43.0 4.7,31.2 20.1,30.0 15.4,15.4 30.0,20.1 31.2,4.7 43.0,14.7"
                    fill="url(#festiveBurstGrad)"
                    stroke="#78350F"
                    strokeWidth="1.2"
                  />
                </svg>

                {/* Text Inside Starburst */}
                <div className="relative z-10 flex flex-col items-center justify-center text-center leading-[0.85] text-zinc-950 font-black select-none">
                  <span className="text-[11px] sm:text-[12px] font-black tracking-tight drop-shadow-[0_1px_0_rgba(255,255,255,0.4)]">
                    {discountPercent}%
                  </span>
                  <span className="text-[7px] sm:text-[7.5px] font-black uppercase tracking-wider text-amber-950 mt-0.5">
                    OFF
                  </span>
                </div>
              </div>
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
