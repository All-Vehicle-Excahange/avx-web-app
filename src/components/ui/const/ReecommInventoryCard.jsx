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
  CarFront,
  ShieldCheck,
} from "lucide-react";
import { useCompareStore } from "@/stores/useCompareStore";
import Button from "../button";
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
} from "@/lib/vehicleImage";

// Identified strictly as Reecomm Inventory (AVX Tier API):
export const isReecommInventoryVehicle = (data, isReecommInventory = false) => {
  return Boolean(isReecommInventory || data?.isAvxTier === true);
};

export default function ReecommInventoryCard({
  data,
  onWishlistChange,
  source = "reecomm_inventory",
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

  // Initial Favorite State From Backend
  const [isFavorite, setIsFavorite] = useState(
    () => data?.isWishlisted || false,
  );
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const resolvedImage = resolveVehicleImageSrc(data);
  const [imageSrc, setImageSrc] = useState(resolvedImage || null);

  useEffect(() => {
    setImageSrc(resolvedImage || null);
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
      // Revert if API fails
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
          [data?.yearOfMfg || data?.year, data?.makerName, data?.modelName, data?.variantName]
            .filter((p) => p && String(p).toLowerCase() !== "null" && String(p).toLowerCase() !== "undefined")
            .join(" ") ||
          data?.title ||
          undefined,
        source: "search",
      });
      useAuthStore.getState().setAuthFunnelContext({
        entry_context: "search",
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    image: resolvedImage,

    title: data.makerName
      ? [data.makerName, data.modelName, data.variantName]
        .filter((part) => part && String(part).toLowerCase() !== "null" && String(part).toLowerCase() !== "undefined")
        .join(" ")
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

    rawPrice: Number(data.price) || 0,
    price: data.price ? Number(data.price).toLocaleString("en-IN") : data.price,
    rawDisplayPrice: data.displayPrice ? Number(data.displayPrice) : null,

    sponsored: data.sponsored || false,
  };

  const discountPercent = (() => {
    if (!mapped.rawPrice || !mapped.rawDisplayPrice) return null;
    const max = Math.max(mapped.rawPrice, mapped.rawDisplayPrice);
    const min = Math.min(mapped.rawPrice, mapped.rawDisplayPrice);
    if (max === min) return null;
    return Math.round(((max - min) / max) * 100);
  })();

  const handleAdClick = async () => {
    if (data?.sponsored && data?.billingType === "CPC" && data?.adId) {
      try {
        await addClickEvent(data.adId, data.placement || "SEARCH_RESULT_PAGE");
      } catch (err) {
        console.error("Failed to register CPC click:", err);
      }
    }
  };

  const handleCardClick = (e) => {
    if (!isCardActive) {
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }
      return;
    }
    handleAdClick();
    let url = generateVehicleUrl(data);
    url += url.includes("?") ? `&source=${source}` : `?source=${source}`;
    if (data?.sponsored) {
      url += `&sponsored=true&adId=${data.adId || ""}&billingType=${data.billingType || ""}`;
    }
    push(url);
  };

  const detailHref = (() => {
    let url = generateVehicleUrl(data);
    url += url.includes("?") ? `&source=${source}` : `?source=${source}`;
    if (data?.sponsored) {
      url += `&sponsored=true&adId=${data.adId || ""}&billingType=${data.billingType || ""}`;
    }
    return url;
  })();

  return (
    <>
      <div
        onClick={handleCardClick}
        className={`
        group/card relative flex flex-row md:flex-col
        rounded-2xl overflow-hidden
        text-primary
        w-full
        border
        ${isCardActive ? "cursor-pointer" : "cursor-default"}
        border-fourth/30
        bg-gradient-to-b from-[#004f9e]/35 via-[#002855]/55 to-[#00142e]/90
        backdrop-blur-md
        shadow-[0_4px_20px_rgba(0,0,0,0.35)]
        ${!isSold && isCardActive
            ? "hover:border-fourth/55 hover:shadow-[0_8px_24px_-4px_rgba(0,0,0,0.45),0_0_14px_rgba(0,123,255,0.14)]"
            : (!isCardActive ? "opacity-90" : "opacity-60 grayscale-[0.2]")
          }
        transition-all duration-300
        h-full md:min-h-[420px]`}
      >
        {/* Reecomm Inventory Top-Side Corner Shape Badge (Luminous Sky to Blue-Fourth Gradient) */}
        <div className="absolute top-0 left-0 z-30 pointer-events-none">
          <div className="flex items-center gap-1.5 pl-3 pr-3.5 py-1.5 bg-gradient-to-r from-sky-400 via-fourth to-blue-700 text-white rounded-tl-2xl rounded-br-2xl shadow-[0_2px_12px_rgba(0,123,255,0.4)] border-b border-r border-white/30 backdrop-blur-md">
            <ShieldCheck className="w-3.5 h-3.5 text-white shrink-0 drop-shadow-[0_0_4px_rgba(255,255,255,0.7)]" strokeWidth={2.5} />
            <span className="tracking-wider uppercase font-bold text-[9px] md:text-[10px] text-white drop-shadow-sm leading-none">
              Reecomm Inventory
            </span>
          </div>
        </div>

        {/* Luminous Shimmer & Visible Ambient Light Glows Across Card */}
        <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-sky-300/70 to-transparent pointer-events-none z-20" />
        <div className="absolute -top-10 -right-10 w-48 h-48 bg-fourth/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 -right-8 w-44 h-44 bg-blue-600/25 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-8 left-1/4 w-52 h-44 bg-sky-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-row md:flex-col w-full h-full">
          {/* IMAGE */}
          <div
            onClick={(e) => {
              if (!isCardActive) {
                e.stopPropagation();
                e.preventDefault();
              }
            }}
            className={`relative w-42 sm:w-40 min-h-45 md:min-h-0 md:h-52 md:w-full shrink-0 p-2 block ${!isCardActive ? "cursor-default" : "cursor-pointer"
              }`}
          >
            <div className="relative w-full h-full overflow-hidden rounded-xl border border-white/10 shadow-inner">
              {/* Inspection Badge */}
              {data?.inspectionBadgeUrl && (
                <div className="hidden md:block absolute left-0 z-20 top-8">
                  <Image
                    src={data.inspectionBadgeUrl}
                    alt="Inspection Badge"
                    width={40}
                    height={40}
                    className="object-contain drop-shadow-lg"
                  />
                </div>
              )}

              {imageSrc ? (
                <Image
                  src={imageSrc}
                  alt={`${[mapped.year, mapped.title].filter(Boolean).join(" ")}${mapped.location && mapped.location !== "-"
                    ? ` in ${mapped.location.split(",")[0].trim()}`
                    : ""
                    } | Reecomm`}
                  fill
                  sizes="(max-width: 768px) 168px, 320px"
                  className="h-full w-full object-cover"
                  onError={() => {
                    setImageSrc(null);
                  }}
                />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-[#1c1c1e] via-[#161618] to-[#0e0e10] p-3 text-center select-none">
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 mb-1.5 text-white/40">
                    <CarFront className="w-8 h-8 text-white/40" />
                  </div>
                  <span className="text-[11px] font-semibold text-white/40 tracking-wide">
                    No Image Available
                  </span>
                </div>
              )}

              {/* Sold / Discount Badge */}
              {isSold ? (
                <div className="absolute top-2 right-2 z-30">
                  <span className="inline-block bg-black/50 backdrop-blur-md border border-white/20 text-white font-semibold tracking-wider text-xs uppercase px-3 py-1 rounded-md shadow-[0_4px_10px_rgba(0,0,0,0.3)]">
                    Sold Out
                  </span>
                </div>
              ) : mapped.rawDisplayPrice && discountPercent !== null && discountPercent !== 0 ? (
                <div className="absolute top-2 right-2 z-30">
                  <span className="inline-block bg-gradient-to-r from-yellow-500 to-amber-600 text-white font-bold tracking-wide text-[9px] md:text-[10px] px-1.5 py-0.5 rounded shadow-md border border-yellow-400/20">
                    {discountPercent}% off
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
                  className={`absolute bottom-12 right-2 shrink-0 flex items-center justify-center w-8 h-8 rounded-full transition-all z-20 
                    ${!isCardActive
                      ? "bg-black/40 text-white/30 cursor-not-allowed opacity-40 shadow-none border border-white/10"
                      : isComparing
                        ? "bg-fourth text-white shadow-[0_0_10px_rgba(0,123,255,0.6)] scale-110 cursor-pointer"
                        : "bg-black/60 text-white hover:bg-black/80 hover:text-sky-200 cursor-pointer border border-white/10"
                    }`}
                  title={!isCardActive ? "Unavailable" : "Add to compare"}
                  aria-disabled={!isCardActive}
                >
                  <ArrowLeftRight className="w-4 h-4" />
                </button>
              )}

              {/* ✅ Wishlist Button (Bottom-Right of Image) */}
              {!isSold && (
                <button
                  type="button"
                  disabled={!isCardActive}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation(); // prevent card click
                    if (!isCardActive) return;
                    handleWishlist();
                  }}
                  className={`absolute bottom-2 right-2 shrink-0 flex items-center justify-center w-8 h-8 rounded-full transition-all z-20
                    ${!isCardActive
                      ? "bg-black/40 text-white/30 cursor-not-allowed opacity-40 shadow-none border border-white/10"
                      : "bg-black/50 text-white hover:bg-black/70 cursor-pointer"
                    }`}
                  title={!isCardActive ? "Unavailable" : (isFavorite ? "Remove from wishlist" : "Add to wishlist")}
                  aria-disabled={!isCardActive}
                >
                  <Heart
                    className={`w-5 h-5 transition-colors ${!isCardActive ? "text-white/30" : isFavorite ? "fill-red-500 text-red-500" : "text-white"}`}
                  />
                </button>
              )}

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
                    className={`
                      text-sm font-secondary md:text-xl font-bold 
                      leading-tight tracking-wide 
                      line-clamp-2 overflow-hidden
                      ${isTierActive ? "transition-colors group-hover/card:text-sky-200 cursor-pointer" : "text-primary cursor-default"}
                    `}
                    title={mapped.title}
                  >
                    {isTierActive ? (
                      <NoPrefetchLink
                        href={detailHref}
                        onClick={(e) => e.stopPropagation()}
                        title={mapped.title}
                      >
                        {mapped.title}
                      </NoPrefetchLink>
                    ) : (
                      <h3 className="cursor-default select-text">
                        {mapped.title}
                      </h3>
                    )}
                  </h3>
                </div>

                {/* USER */}
                <div className="flex items-center gap-1.5 mt-1">
                  <p className="text-xs md:text-sm text-primary/90 flex items-center gap-1.5 truncate" title={mapped.userName || "john doe"}>
                    <User className="w-3.5 h-3.5 text-sky-300/80 shrink-0" />{" "}
                    <span className="truncate capitalize">{mapped.userName || "john doe"}</span>
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
                  <MapPinned className="w-3.5 h-3.5 text-sky-300/80 shrink-0" />
                  <span className="truncate capitalize">{mapped.location || "Chhapi, Gujarat"}</span>
                </p>
              </div>
            </div>

            {/* SPECS */}
            <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-x-2 md:gap-x-4 gap-y-1 text-xs md:text-sm text-primary/80 font-medium">
              <span>{mapped.year}</span>

              <span className="flex items-center gap-1">
                <Settings2 className="w-4 h-4 text-sky-300/80" /> {mapped.transmission}
              </span>

              <span className="flex items-center gap-1">
                <Fuel className="w-4 h-4 text-sky-300/80" /> {mapped.fuel}
              </span>

              <span className="flex items-center gap-1">
                <Users className="w-4 h-4 text-sky-300/80" /> {mapped.seats}
              </span>
            </div>

            {/* PRICE + BUTTON */}
            <div className="flex items-center justify-between gap-2 mt-auto">
              <div className="flex flex-col justify-center min-w-0">
                <h3 className="text-[15px] md:text-xl font-bold text-primary leading-none mb-1 truncate">
                  ₹ {mapped.price}
                </h3>
                {mapped.rawDisplayPrice && (
                  <span className="text-[11px] md:text-xs text-third line-through leading-none truncate">
                    ₹ {mapped.rawDisplayPrice.toLocaleString("en-IN")}
                  </span>
                )}
              </div>

              <div className="hidden md:block shrink-0">
                <Button
                  href={isCardActive ? detailHref : undefined}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (isCardActive) {
                      handleAdClick();
                    } else {
                      e.preventDefault();
                    }
                  }}
                  disabled={!isCardActive}
                  scroll={true}
                  variant="outline"
                  size="sm"
                  className={`whitespace-nowrap border-fourth/30 hover:border-sky-300 hover:bg-fourth/20 hover:text-white text-sky-100 transition-all shadow-xs ${!isCardActive
                    ? "!opacity-40 !cursor-not-allowed !bg-white/5 !text-white/40 !border-white/10 pointer-events-none"
                    : "hover:shadow-[0_0_12px_rgba(0,123,255,0.35)]"
                    }`}
                  title={!isCardActive ? "Unavailable" : "View Details"}
                >
                  {!isCardActive ? "Unavailable" : "View Details"}
                </Button>
              </div>
            </div>
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
