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
import { createSlug, generateVehicleUrl } from "@/lib/helper";

import { useDebouncedCallback } from "@/hooks/useDebounce";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { event as metaEvent } from "@/lib/fpixel";
import {
    resolveVehicleImageSrc,
    VEHICLE_IMAGE_FALLBACK,
} from "@/lib/vehicleImage";

export default function NavratriVehicleCard({
    data,
    onWishlistChange,
    source = "search",
    isSold = false,
}) {
    const { push } = useRouter();
    const queryClient = useQueryClient();

    //  Initial Favorite State From Backend
    const [isFavorite, setIsFavorite] = useState(
        () => data?.isWishlisted || false,
    );
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
            trackWishlistLoginRequired({
                vehicle_id: data?.id,
                vehicle_name:
                    `${data?.yearOfMfg || data?.year || ""} ${data?.makerName || ""} ${data?.modelName || ""} ${data?.variantName || ""}`.trim() ||
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
        image: resolvedImage,

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
        cursor-pointer
        ${!isSold ? "" : "opacity-60 "}
        transition-shadow duration-300
        h-full md:min-h-[420px]`}
            >
                <div className="relative z-10 flex flex-row md:flex-col w-full h-full">
                    {/* IMAGE */}
                    <NoPrefetchLink
                        href={detailHref}
                        onClick={(e) => {
                            e.stopPropagation();
                        }}
                        className="relative w-42 sm:w-40 min-h-45 md:min-h-0 md:h-52 md:w-full shrink-0 p-2 block"
                        aria-label={`View details for ${mapped.title}`}
                    >
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

                            {imageSrc ? (
                                <Image
                                    src={imageSrc}
                                    alt={mapped.title}
                                    fill
                                    sizes="(max-width: 768px) 168px, 320px"
                                    className="h-full w-full object-cover"
                                    onError={() => {
                                        if (imageSrc !== VEHICLE_IMAGE_FALLBACK) {
                                            setImageSrc(VEHICLE_IMAGE_FALLBACK);
                                        }
                                    }}
                                />
                            ) : (
                                <div className="absolute inset-0 flex items-center justify-center bg-[#1B1A1A]">
                                    <CarFront className="w-12 h-12 text-gray-400" />
                                </div>
                            )}

                            {/* Navratri Special Badges */}
                            <div className="absolute top-1 left-1  z-30 pointer-events-none">
                                <img
                                    src="/navratri-badge.png"
                                    alt="Navratri Deal"
                                    className="w-24 md:w-28 h-auto object-contain drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
                                />
                            </div>

                            {/* Navratri Starburst Rosette Discount Badge (% OFF) Matching User Design */}
                            {mapped.rawDisplayPrice && discountPercent ? (
                                <div className="absolute top-1 right-1 z-30 w-11 h-11 md:w-12 md:h-12 flex items-center justify-center pointer-events-none drop-shadow-[0_3px_8px_rgba(0,0,0,0.65)]">
                                    <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <defs>
                                            <linearGradient id={`goldBorder-${data?.id || 'deal'}`} x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
                                                <stop offset="0%" stopColor="#FDE047" />
                                                <stop offset="45%" stopColor="#F59E0B" />
                                                <stop offset="100%" stopColor="#D97706" />
                                            </linearGradient>
                                            <linearGradient id={`maroonBg-${data?.id || 'deal'}`} x1="50" y1="8" x2="50" y2="92" gradientUnits="userSpaceOnUse">
                                                <stop offset="0%" stopColor="#9F1239" />
                                                <stop offset="50%" stopColor="#881337" />
                                                <stop offset="100%" stopColor="#700836" />
                                            </linearGradient>
                                        </defs>

                                        {/* Outer 12-Point Gold Starburst Border */}
                                        <polygon
                                            points="50.0,2.0 59.4,14.7 74.0,8.4 75.8,24.2 91.6,26.0 85.3,40.6 98.0,50.0 85.3,59.4 91.6,74.0 75.8,75.8 74.0,91.6 59.4,85.3 50.0,98.0 40.6,85.3 26.0,91.6 24.2,75.8 8.4,74.0 14.7,59.4 2.0,50.0 14.7,40.6 8.4,26.0 24.2,24.2 26.0,8.4 40.6,14.7"
                                            fill={`url(#goldBorder-${data?.id || 'deal'})`}
                                        />

                                        {/* Inner 12-Point Festive Maroon Star Fill */}
                                        <polygon
                                            points="50.0,8.0 58.2,19.6 71.0,13.6 72.3,27.7 86.4,29.0 80.4,41.8 92.0,50.0 80.4,58.2 86.4,71.0 72.3,72.3 71.0,86.4 58.2,80.4 50.0,92.0 41.8,80.4 29.0,86.4 27.7,72.3 13.6,71.0 19.6,58.2 8.0,50.0 19.6,41.8 13.6,29.0 27.7,27.7 29.0,13.6 41.8,19.6"
                                            fill={`url(#maroonBg-${data?.id || 'deal'})`}
                                        />

                                        {/* Delicate Golden Laurel / Dashed Circular Rings */}
                                        <circle cx="50" cy="50" r="28" stroke="#FBBF24" strokeWidth="1.2" strokeDasharray="2.5 2.5" opacity="0.85" />
                                        <circle cx="50" cy="50" r="25.5" stroke="#F59E0B" strokeWidth="0.8" opacity="0.55" />

                                        {/* Bold Percentage Number */}
                                        <text
                                            x="50"
                                            y="45"
                                            fill="#FFFFFF"
                                            fontWeight="900"
                                            fontSize="23"
                                            textAnchor="middle"
                                            dominantBaseline="central"
                                            style={{ filter: "drop-shadow(0px 1.5px 2px rgba(0,0,0,0.6))" }}
                                        >
                                            {discountPercent}%
                                        </text>

                                        {/* Bold OFF Label */}
                                        <text
                                            x="50"
                                            y="66"
                                            fill="#FBBF24"
                                            fontWeight="900"
                                            fontSize="16"
                                            letterSpacing="0.05em"
                                            textAnchor="middle"
                                            style={{ filter: "drop-shadow(0px 1.5px 2px rgba(0,0,0,0.6))" }}
                                        >
                                            OFF
                                        </text>
                                    </svg>
                                </div>
                            ) : null}

                            {/* ✅ Compare Button */}
                            {!isSold && (
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
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
                            )}

                            {/* ✅ Wishlist Button (Bottom-Right of Image) */}
                            {!isSold && (
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation(); // prevent card click
                                        handleWishlist();
                                    }}
                                    className="absolute bottom-2 right-2 shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-black/50 transition-all cursor-pointer z-20 hover:bg-black/70"
                                >
                                    <Heart
                                        className={`w-5 h-5 transition-colors ${isFavorite ? "fill-red-500 text-red-500" : "text-white"}`}
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
                    </NoPrefetchLink>

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
      hover:text-fourth transition-colors
    "
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
                                </div>

                                {/* USER */}
                                <div className="flex items-center gap-1.5 mt-1">
                                    <p className="text-xs md:text-sm text-primary/90 flex items-center gap-1.5 truncate" title={mapped.userName || "john doe"}>
                                        <User className="w-3.5 h-3.5 shrink-0" />{" "}
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
                                    className="text-xs md:text-sm text-[#CBD5E1] mt-1 flex items-center gap-1.5"
                                    title={mapped.location || "Chhapi, Gujarat"}
                                >
                                    <MapPinned className="w-3.5 h-3.5 shrink-0" />
                                    <span className="truncate capitalize">{mapped.location || "Chhapi, Gujarat"}</span>
                                </p>
                            </div>
                        </div>

                        {/* SPECS */}
                        <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-x-2 md:gap-x-4 gap-y-1 text-xs md:text-sm text-[#9CA3AF] font-medium">
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
                        <div className="flex flex-col gap-3 mt-auto pt-2 border-t border-white/5">
                            <div className="flex flex-wrap items-baseline gap-1 md:gap-2 min-w-0">
                                <h3 className="text-lg md:text-2xl font-black text-[#FBBF24] leading-none drop-shadow-[0_0_5px_rgba(251,191,36,0.5)] whitespace-nowrap">
                                    ₹ {mapped.price}
                                </h3>
                                {mapped.rawDisplayPrice && (
                                    <span className="text-xs md:text-sm text-[#9CA3AF] line-through leading-none mb-0.5 whitespace-nowrap">
                                        ₹ {mapped.rawDisplayPrice.toLocaleString("en-IN")}
                                    </span>
                                )}
                            </div>

                            <div className="flex flex-wrap items-center justify-between w-full gap-2">
                                {mapped.rawDisplayPrice && mapped.rawPrice ? (
                                    <div className="bg-[#BE185D] border border-[#F472B6]/60 text-white text-[10px] md:text-[11px] font-bold px-2.5 py-1 md:px-3 md:py-1.5 rounded-full shadow-[0_2px_6px_rgba(190,24,93,0.35)] whitespace-nowrap tracking-wide">
                                        Save ₹ {(mapped.rawDisplayPrice - mapped.rawPrice).toLocaleString("en-IN")}
                                    </div>
                                ) : <div />}

                                <div className="shrink-0 ml-auto">
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
                                        className="whitespace-nowrap bg-transparent border border-white/20 text-white hover:bg-[#FBBF24]/10 hover:border-[#FBBF24]/60 hover:text-[#FBBF24] text-[10px] md:text-xs px-2.5 md:px-4 py-1 md:py-1.5 rounded-full flex items-center transition-all duration-200"
                                    >
                                        View Details <ArrowRight className="w-3.5 h-3.5 md:w-4 md:h-4 ml-1 transition-transform group-hover:translate-x-0.5" />
                                    </Button>
                                </div>
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
