"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import {
  MapPin,
  Star,
  Car,
  CheckCircle,
  IndianRupee,
  CornerUpRight,
  Share2,
  X,
  Loader2,
  Maximize2,
  PhoneCall,
  AlertCircle,
  BadgeCheck,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import Button from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/router";
import {
  followConsultant,
  unFollowConsultant,
  getConsultationPhoneNumber,
} from "@/services/user.service";
import LoginPopup from "@/components/auth/LoginPopup";
import { useAuthStore } from "@/stores/useAuthStore";
import CallSellerPopup from "@/components/features/VehiclDetail/CallSellerPopup";
import DownloadAppPopup from "@/components/ui/DownloadAppPopup";
import SharePopup from "@/components/ui/SharePopup";
import StoreFrontHeroSkeleton from "@/components/ui/skeleton/StoreFrontHeroSkeleton";
import { useDebouncedCallback } from "@/hooks/useDebounce";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getStoreFrontByUsernameQuery,
  getConsultationPhoneNumberQuery,
} from "@/queries/user.queries";
import useEscapeKey from "@/hooks/useEscapeKey";
import { Swiper, SwiperSlide } from "swiper/react";
import { Zoom } from "swiper/modules";
import "swiper/css";
import "swiper/css/zoom";
import { FaWhatsapp } from "react-icons/fa6";

export default function ReecommStoreFrontHeroSection() {
  const router = useRouter();
  const id = router.query?.id;
  const queryClient = useQueryClient();

  const { data: storeDetails, isLoading } = useQuery(
    getStoreFrontByUsernameQuery(id)
  );

  const isActiveTier = storeDetails?.isActiveTier !== false;

  const [optimisticFollowState, setOptimisticFollowState] = useState(null);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isDownloadAppOpen, setIsDownloadAppOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [zoomImage, setZoomImage] = useState(null);
  const [currentUrl, setCurrentUrl] = useState("");
  const [isOpeningWhatsApp, setIsOpeningWhatsApp] = useState(false);
  const [isCallPopupOpen, setIsCallPopupOpen] = useState(false);
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const pendingAction = useRef(null);

  const { data: phoneData } = useQuery(getConsultationPhoneNumberQuery(id));

  const handleWhatsAppClick = async () => {
    try {
      setIsOpeningWhatsApp(true);
      let rawPhone =
        phoneData?.phoneNumber ||
        phoneData?.phone ||
        phoneData?.mobile ||
        phoneData?.contactNumber ||
        (typeof phoneData === "string" || typeof phoneData === "number"
          ? String(phoneData)
          : null);

      if (!rawPhone && id) {
        const res = await getConsultationPhoneNumber(id);
        const data = res?.data;
        rawPhone =
          data?.phoneNumber ||
          data?.phone ||
          data?.mobile ||
          data?.contactNumber ||
          (typeof data === "string" || typeof data === "number"
            ? String(data)
            : null);
      }

      if (!rawPhone) return;

      const cleanDigits = String(rawPhone).replace(/\D/g, "");
      if (!cleanDigits) return;

      const formattedPhone =
        cleanDigits.length === 10 ? `91${cleanDigits}` : cleanDigits;
      const consultationName =
        storeDetails?.consultationName || "Reecomm Inventory";
      const message = `Hello ${consultationName}, I found your Reecomm Inventory storefront on Reecomm and would like to connect.`;
      const waUrl = `https://wa.me/${formattedPhone}?text=${encodeURIComponent(
        message
      )}`;

      window.open(waUrl, "_blank", "noopener,noreferrer");
    } catch (error) {
      console.error("Failed to fetch consultation phone number:", error);
    } finally {
      setIsOpeningWhatsApp(false);
    }
  };

  const handleCallConsultantClick = async () => {
    try {
      let rawPhone =
        phoneData?.phoneNumber ||
        phoneData?.phone ||
        phoneData?.mobile ||
        phoneData?.contactNumber ||
        (typeof phoneData === "string" || typeof phoneData === "number"
          ? String(phoneData)
          : null);

      if (!rawPhone && id) {
        const res = await getConsultationPhoneNumber(id);
        const data = res?.data;
        rawPhone =
          data?.phoneNumber ||
          data?.phone ||
          data?.mobile ||
          data?.contactNumber ||
          (typeof data === "string" || typeof data === "number"
            ? String(data)
            : null);
      }

      if (!rawPhone) return;

      const cleanDigits = String(rawPhone).replace(/\D/g, "");
      if (!cleanDigits) return;

      if (window.innerWidth < 1024) {
        window.location.href = `tel:${cleanDigits}`;
      } else {
        setIsCallPopupOpen(true);
      }
    } catch (error) {
      console.error(
        "Failed to fetch consultation phone number for call:",
        error
      );
    }
  };

  useEscapeKey(!!zoomImage, () => setZoomImage(null));

  useEffect(() => {
    if (zoomImage) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [zoomImage]);

  const [lastSyncState, setLastSyncState] = useState(false);
  const [prevIsFollower, setPrevIsFollower] = useState(null);

  if (storeDetails && storeDetails.isFollower !== prevIsFollower) {
    setPrevIsFollower(storeDetails.isFollower || false);
    setLastSyncState(storeDetails.isFollower || false);
  }

  const isFollower =
    optimisticFollowState !== null
      ? optimisticFollowState
      : storeDetails?.isFollower || false;

  const localFollowersCount = Math.max(
    0,
    (storeDetails?.followersCount || 0) +
    (optimisticFollowState === null
      ? 0
      : optimisticFollowState
        ? storeDetails?.isFollower
          ? 0
          : 1
        : storeDetails?.isFollower
          ? -1
          : 0)
  );

  const debouncedSyncFollow = useDebouncedCallback(async (nextState) => {
    try {
      if (nextState) {
        await followConsultant(storeDetails?.id);
      } else {
        await unFollowConsultant(storeDetails?.id);
      }
      setLastSyncState(nextState);
      await queryClient.invalidateQueries({
        queryKey: ["storefront-by-username", id],
      });
      await queryClient.invalidateQueries({
        queryKey: ["user-followed-consultants-infinite"],
      });
      setOptimisticFollowState(null);
    } catch (error) {
      console.log("Follow/Unfollow error:", error);
      setOptimisticFollowState(null);
    }
  }, 800);

  const handleFollowToggle = useCallback(() => {
    if (!storeDetails?.id) return;

    if (!isLoggedIn) {
      pendingAction.current = "follow";
      setIsLoginOpen(true);
      return;
    }

    const nextState = !isFollower;
    setOptimisticFollowState(nextState);

    if (nextState === lastSyncState) {
      debouncedSyncFollow.cancel();
    } else {
      debouncedSyncFollow(nextState);
    }
  }, [
    storeDetails?.id,
    isLoggedIn,
    isFollower,
    lastSyncState,
    debouncedSyncFollow,
  ]);

  const handleLoginSuccess = () => {
    setIsLoginOpen(false);
    if (pendingAction.current === "follow") {
      pendingAction.current = null;
      handleFollowToggle();
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentUrl(window.location.href);
    }
  }, []);

  const formatServiceName = (service) =>
    service
      ?.toLowerCase()
      ?.split("_")
      ?.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      ?.join(" ");

  const formatPrice = (price) => {
    if (!price) return "0";
    if (price >= 10000000) {
      return `${(price / 10000000).toFixed(2)} Cr`;
    }
    if (price >= 100000) {
      return `${(price / 100000).toFixed(2)} Lakh`;
    }
    return price.toLocaleString("en-IN");
  };

  const formattedPrice = (() => {
    const min = storeDetails?.minVehiclePrice;
    const max = storeDetails?.maxVehiclePrice;

    if (!min && !max) return "N/A";

    const format = (p) => {
      if (p >= 10000000) return `${(p / 10000000).toFixed(2)} Cr`;
      if (p >= 100000) return `${(p / 100000).toFixed(2)} Lakh`;
      return p.toLocaleString("en-IN");
    };

    if (min && max && min !== max) {
      return (
        <span className="flex items-center gap-1 font-bold text-white">
          <IndianRupee className="w-4 h-4 text-sky-400" />
          <span>{format(min)}</span>
          <span className="text-sky-300/60">–</span>
          <span>{format(max)}</span>
        </span>
      );
    }

    const price = min || max;
    return (
      <span className="flex items-center gap-1 font-bold text-white">
        <IndianRupee className="w-4 h-4 text-sky-400" />
        <span>{format(price)}</span>
      </span>
    );
  })();

  const formatFollowerCount = (count) => {
    if (!count) return "0";
    if (count >= 1000) {
      return (count / 1000).toFixed(1).replace(/\.0$/, "") + "K";
    }
    return count.toString();
  };

  const mapUrl = storeDetails?.mapUrl;
  const addressParts = [
    storeDetails?.address?.address,
    storeDetails?.address?.town,
    storeDetails?.address?.city,
    storeDetails?.address?.state,
  ].filter(Boolean);
  const locationString =
    addressParts.length > 0
      ? addressParts.join(", ")
      : "Kanodar, Palanpur, Gujarat";
  const directionUrl =
    mapUrl ||
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      locationString
    )}`;

  if (isLoading || !storeDetails) {
    return <StoreFrontHeroSkeleton />;
  }

  return (
    <>
      <section className="relative w-full max-w-[1480px] mt-0 sm:mt-10 mx-auto border-0 sm:border border-third/40 rounded-none sm:rounded-xl md:rounded-2xl overflow-hidden shadow-none sm:shadow-sm">
        {/* ================= BANNER ================= */}
        <div
          className="relative w-full h-[200px] sm:h-[280px] md:h-[340px] cursor-pointer bg-neutral-900 group/banner"
          onClick={() =>
            storeDetails?.bannerUrl && setZoomImage(storeDetails.bannerUrl)
          }
        >
          {storeDetails?.bannerUrl ? (
            <Image
              src={storeDetails.bannerUrl}
              alt="Reecomm Inventory Banner"
              fill
              sizes="100vw"
              className="object-cover object-center block"
              priority
            />
          ) : (
            <div className="w-full h-full bg-secondary flex items-center justify-center">
              <span className="text-primary font-bold text-2xl">
                Reecomm Inventory
              </span>
            </div>
          )}

          {/* Top-Left Official Hub Pill */}
          <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-20 pointer-events-none">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-black/60 backdrop-blur-md border border-white/20 text-white shadow-lg">
              <ShieldCheck className="w-4 h-4 text-fourth shrink-0" strokeWidth={2.5} />
              <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider">
                Official Reecomm Certified Hub
              </span>
            </div>
          </div>

          {/* Fullscreen View Button */}
          <button
            type="button"
            aria-label="View banner full screen"
            onClick={(e) => {
              e.stopPropagation();
              if (storeDetails?.bannerUrl) {
                setZoomImage(storeDetails.bannerUrl);
              }
            }}
            className="absolute bottom-4 right-4 bg-black/50 hover:bg-black/70 active:scale-95 transition backdrop-blur-md rounded-md p-2.5 text-white shadow-md z-20 flex items-center justify-center cursor-pointer border border-white/20"
          >
            <Maximize2 className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          </button>
        </div>

        {/* ================= MAIN IDENTITY CONSOLE ================= */}
        <div className="relative z-20 px-4 sm:px-6 md:px-10 pb-6 pt-2">
          {/* Header Row: Logo + Info + Actions */}
          <div className="flex flex-col lg:flex-row items-center lg:items-end justify-between gap-6 -mt-16 sm:-mt-20">
            {/* Left: Brand Identity Pod */}
            <div className="flex flex-col sm:flex-row items-center sm:items-end gap-5 text-center sm:text-left">
              {/* Brand Emblem Logo */}
              <div
                className="relative w-32 h-32 sm:w-36 sm:h-36 rounded-md overflow-hidden bg-white border-2 border-white/20 shadow-xl cursor-pointer shrink-0 transition-transform hover:scale-102"
                onClick={() =>
                  storeDetails?.logoUrl && setZoomImage(storeDetails.logoUrl)
                }
                title="Click to view full logo"
              >
                {storeDetails?.logoUrl ? (
                  <Image
                    src={storeDetails.logoUrl}
                    alt="Reecomm Inventory Logo"
                    fill
                    className="object-contain scale-[1.04]"
                    priority
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <ShieldCheck className="w-14 h-14 text-fourth" />
                  </div>
                )}
              </div>

              {/* Title, Badges & Address */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-center sm:justify-start gap-2.5 flex-wrap">
                  <h1 className="text-2xl sm:text-3xl font-semibold text-primary leading-tight capitalize flex items-center gap-2">
                    <span>{storeDetails.consultationName || "Reecomm Inventory"}</span>
                    <BadgeCheck
                      className="w-7 h-7 text-fourth shrink-0 fill-fourth/20"
                      strokeWidth={2.5}
                      title="Verified Reecomm Inventory"
                    />
                  </h1>

                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-primary text-xs font-semibold shadow-xs">
                    <Sparkles className="w-3.5 h-3.5 text-fourth" />
                    Verified Storefront
                  </span>
                </div>

                <p className="flex items-center justify-center sm:justify-start gap-1.5 text-third text-xs sm:text-sm pt-0.5">
                  <MapPin className="w-4 h-4 text-third shrink-0" />
                  <span className="capitalize truncate font-medium">{locationString}</span>
                </p>
              </div>
            </div>

            {/* Right: Common Action Buttons Group */}
            <div className="flex items-center gap-2.5 flex-wrap justify-center w-full lg:w-auto">
              {/* Subscribe Button */}
              <button
                onClick={isActiveTier ? handleFollowToggle : undefined}
                disabled={!isActiveTier}
                type="button"
                title={!isActiveTier ? "Unavailable" : (isFollower ? "Unsubscribe" : "Subscribe")}
                className={`rounded-full h-10 px-5 border flex items-center justify-center gap-2 text-xs sm:text-sm font-semibold transition-all duration-300 ease-in-out shadow-sm ${!isActiveTier
                  ? "!bg-white/5 !text-white/40 !border-white/10 cursor-not-allowed opacity-50 pointer-events-none"
                  : isFollower
                    ? "cursor-pointer bg-fourth text-white border-fourth hover:bg-transparent hover:text-fourth"
                    : "cursor-pointer bg-primary text-secondary border-primary hover:bg-transparent hover:text-primary"
                  }`}
              >
                <span>{isFollower ? "Unsubscribe" : "Subscribe"}</span>
                <span
                  className={`px-2 py-0.5 rounded-full text-xs font-bold transition-all ${!isActiveTier
                    ? "bg-white/10 text-white/40"
                    : isFollower
                      ? "bg-white/20 text-white"
                      : "bg-secondary/10 text-secondary"
                    }`}
                >
                  {formatFollowerCount(localFollowersCount)}
                </span>
              </button>

              {/* Call Button */}
              <Button
                size="sm"
                variant="ghost"
                onClick={isActiveTier ? handleCallConsultantClick : undefined}
                disabled={!isActiveTier}
                className={`h-10 border shadow-sm px-4 rounded-full flex items-center gap-2 ${!isActiveTier
                  ? "!bg-white/5 !text-white/40 !border-white/10 cursor-not-allowed opacity-50 pointer-events-none"
                  : "bg-white text-black hover:bg-white/90 border-gray-300 font-semibold"
                  }`}
                title={!isActiveTier ? "Unavailable" : "Call Consultant"}
              >
                <PhoneCall className="w-4 h-4 shrink-0" />
                <span className="whitespace-nowrap text-xs sm:text-sm">Call</span>
              </Button>

              {/* WhatsApp Button */}
              <Button
                size="sm"
                onClick={isActiveTier ? handleWhatsAppClick : undefined}
                disabled={!isActiveTier || isOpeningWhatsApp}
                className={`h-10 border shadow-sm px-4 rounded-full flex items-center gap-2 transition-all ${!isActiveTier
                  ? "!bg-white/5 !text-white/40 !border-white/10 cursor-not-allowed opacity-50 pointer-events-none"
                  : "!bg-[#25D366] !text-white !border-[#25D366] hover:!bg-[#20bd5a] font-semibold"
                  }`}
                title={!isActiveTier ? "Unavailable" : "WhatsApp"}
              >
                {isOpeningWhatsApp ? (
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                ) : (
                  <FaWhatsapp className="w-4 h-4 shrink-0 text-white" />
                )}
                <span className="whitespace-nowrap text-xs sm:text-sm">WhatsApp</span>
              </Button>

              {/* Get Directions Button */}
              <Button
                size="sm"
                variant="ghost"
                href={isActiveTier ? directionUrl : undefined}
                target="_blank"
                rel="noopener noreferrer"
                disabled={!isActiveTier}
                className={`h-10 border shadow-sm px-4 rounded-full flex items-center gap-1.5 ${!isActiveTier
                  ? "!bg-white/5 !text-white/40 !border-white/10 cursor-not-allowed opacity-50 pointer-events-none"
                  : "bg-white text-black hover:bg-white/90 border border-gray-300 font-semibold"
                  }`}
                title={!isActiveTier ? "Unavailable" : "Get Directions"}
              >
                <span className="whitespace-nowrap text-xs sm:text-sm">Directions</span>
                <CornerUpRight className="w-4 h-4 shrink-0" />
              </Button>

              {/* Share Button */}
              <button
                onClick={isActiveTier ? () => setIsShareOpen(true) : undefined}
                disabled={!isActiveTier}
                type="button"
                title={!isActiveTier ? "Unavailable" : "Share Storefront"}
                className={`h-10 w-10 shrink-0 flex items-center justify-center rounded-full border transition-all shadow-sm ${!isActiveTier
                  ? "!bg-white/5 !text-white/40 !border-white/10 cursor-not-allowed opacity-50 pointer-events-none"
                  : "bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 cursor-pointer"
                  }`}
                aria-label="Share Storefront"
              >
                <Share2 className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* ================= SERVICES PROVIDED (if present in API) ================= */}
          {storeDetails?.services?.length > 0 && (
            <div className="pt-4 space-y-2">
              <p className="text-xs font-semibold capitalize text-third">
                Services Provided
              </p>

              <div className="flex flex-wrap gap-2">
                {storeDetails.services.map((service) => (
                  <span
                    key={service}
                    className="px-3.5 py-1.5 text-xs font-medium border border-primary/20 rounded-full text-primary bg-primary/5 hover:bg-primary/10 transition-colors cursor-default capitalize"
                  >
                    {formatServiceName(service)}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* ================= TELEMETRY STATS TILES ================= */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 pt-6">
            {[
              {
                label: "Rating",
                value: (
                  <span className="flex items-center gap-1 font-bold text-primary">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    {storeDetails.averageRating ? `${storeDetails.averageRating} / 5` : "0.0"}
                  </span>
                ),
                icon: Star,
              },
              {
                label: "Available Vehicles",
                value: `${storeDetails.availableVehicles ?? 0} Vehicles`,
                icon: Car,
              },
              {
                label: "Sold Vehicles",
                value: `${storeDetails.soldVehiclesCount ?? 0} Delivered`,
                icon: CheckCircle,
              },
              {
                label: "Price Range",
                value: formattedPrice,
                icon: IndianRupee,
              },
              {
                label: "Since",
                value: `Since ${storeDetails.establishmentYear || "2026"}`,
                icon: ShieldCheck,
              },
            ].map(({ label, value, icon: Icon }) => (
              <div
                key={label}
                className="flex items-center gap-3 p-3 rounded-md bg-primary/5 border border-primary/10 hover:border-primary/25 transition-all duration-300 shadow-xs"
              >
                <div className="p-2 rounded-md bg-primary/10 border border-primary/15 text-third shrink-0">
                  <Icon className="w-4.5 h-4.5 text-third" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] sm:text-[11px] text-third font-medium mb-0.5 truncate">
                    {label}
                  </p>
                  <div className="text-xs sm:text-sm font-bold text-primary leading-tight flex flex-wrap items-center truncate">
                    {value}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popups & Modals */}
      <CallSellerPopup
        isOpen={isCallPopupOpen}
        onClose={() => setIsCallPopupOpen(false)}
        isStorefrontCall={true}
        summary={storeDetails}
        storefrontPhone={
          phoneData?.phoneNumber ||
          phoneData?.phone ||
          phoneData?.mobile ||
          phoneData?.contactNumber ||
          (typeof phoneData === "string" || typeof phoneData === "number"
            ? String(phoneData)
            : null)
        }
      />
      <LoginPopup
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onSuccess={handleLoginSuccess}
      />
      <DownloadAppPopup
        isOpen={isDownloadAppOpen}
        onClose={() => setIsDownloadAppOpen(false)}
      />
      <SharePopup
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
        shareUrl={currentUrl}
        title={storeDetails?.consultationName || "Check this Reecomm Inventory Storefront"}
      />

      {/* Image Zoom Modal */}
      {zoomImage && (
        <div
          className="fixed inset-0 z-[99999] bg-black/95 backdrop-blur-md flex flex-col select-none"
          onClick={() => setZoomImage(null)}
        >
          <div className="absolute top-3 left-3 sm:top-4 sm:left-6 z-50 pointer-events-auto">
            <button
              type="button"
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-md transition-all text-xs sm:text-sm font-medium cursor-pointer shadow-lg active:scale-95 border border-white/20"
              onClick={(e) => {
                e.stopPropagation();
                setZoomImage(null);
              }}
            >
              <X className="w-4 h-4" />
              <span>Close</span>
              <kbd className="hidden sm:inline-block px-1.5 py-0.5 rounded bg-white/20 text-[10px] text-white/90 font-mono">
                ESC
              </kbd>
            </button>
          </div>

          <div
            className="relative flex-1 w-full h-full flex items-center justify-center overflow-hidden [&_.swiper-slide-zoomed_img]:!cursor-zoom-out [&_img]:!cursor-zoom-in"
            onClick={(e) => e.stopPropagation()}
          >
            <Swiper
              zoom={{ maxRatio: 3, minRatio: 1 }}
              modules={[Zoom]}
              className="w-full h-full"
              onClick={(swiper, e) => {
                if (swiper.zoom) {
                  swiper.zoom.toggle(e);
                }
              }}
            >
              <SwiperSlide className="flex items-center justify-center w-full h-full overflow-hidden">
                <div className="swiper-zoom-container relative w-full h-full flex items-center justify-center">
                  <Image
                    src={zoomImage}
                    alt="Zoomed image"
                    fill
                    className="object-contain select-none"
                    sizes="100vw"
                    priority
                  />
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      )}
    </>
  );
}
