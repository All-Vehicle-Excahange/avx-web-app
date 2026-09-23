"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import {
  MapPin,
  Star,
  Users,
  Briefcase,
  Car,
  CheckCircle,
  IndianRupee,
  CornerUpRight,
  ExternalLink,
  Share2,
  X,
  MessageCircle,
  Loader2,
} from "lucide-react";
import Button from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/router";
import { followConsultant, unFollowConsultant, getConsultationPhoneNumber } from "@/services/user.service";
import LoginPopup from "@/components/auth/LoginPopup";
import { useAuthStore } from "@/stores/useAuthStore";

import DownloadAppPopup from "@/components/ui/DownloadAppPopup";
import SharePopup from "@/components/ui/SharePopup";
import StoreFrontHeroSkeleton from "@/components/ui/skeleton/StoreFrontHeroSkeleton";
import { useDebouncedCallback } from "@/hooks/useDebounce";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getStoreFrontByUsernameQuery, getConsultationPhoneNumberQuery } from "@/queries/user.queries";
import { trackStorefrontViewed } from "@/lib/amplitude";
import useEscapeKey from "@/hooks/useEscapeKey";
import { Swiper, SwiperSlide } from "swiper/react";
import { Zoom } from "swiper/modules";
import "swiper/css";
import "swiper/css/zoom";
import { FaWhatsapp } from "react-icons/fa6";

export default function StoreFrontHeroSection() {
  const router = useRouter();
  const id = router.query?.id;
  const queryClient = useQueryClient();

  const { data: storeDetails, isLoading } = useQuery(
    getStoreFrontByUsernameQuery(id),
  );

  const [optimisticFollowState, setOptimisticFollowState] = useState(null);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isDownloadAppOpen, setIsDownloadAppOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [zoomImage, setZoomImage] = useState(null);
  const [currentUrl, setCurrentUrl] = useState("");
  const [isOpeningWhatsApp, setIsOpeningWhatsApp] = useState(false);
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

      if (!rawPhone) {
        return;
      }

      const cleanDigits = String(rawPhone).replace(/\D/g, "");
      if (!cleanDigits) {
        return;
      }

      const formattedPhone =
        cleanDigits.length === 10 ? `91${cleanDigits}` : cleanDigits;
      const consultationName = storeDetails?.consultationName || "Consultant";
      const message = `Hello ${consultationName}, I found your storefront on Reecomm and would like to connect.`;
      const waUrl = `https://wa.me/${formattedPhone}?text=${encodeURIComponent(message)}`;

      window.open(waUrl, "_blank", "noopener,noreferrer");
    } catch (error) {
      console.error("Failed to fetch consultation phone number:", error);
    } finally {
      setIsOpeningWhatsApp(false);
    }
  };

  // Close zoom modal with Escape key
  useEscapeKey(!!zoomImage, () => setZoomImage(null));

  // Lock body scroll when zoom image is open
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
          : 0),
  );

  const debouncedSyncFollow = useDebouncedCallback(async (nextState) => {
    try {
      if (nextState) {
        await followConsultant(storeDetails?.id);
      } else {
        await unFollowConsultant(storeDetails?.id);
      }
      setLastSyncState(nextState);
      // Invalidate query to sync back with actual server state
      await queryClient.invalidateQueries({
        queryKey: ["storefront-by-username", id],
      });
      await queryClient.invalidateQueries({
        queryKey: ["user-followed-consultants-infinite"],
      });
      setOptimisticFollowState(null);
    } catch (error) {
      console.log("Follow/Unfollow error:", error);
      // Revert UI if API fails
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

  useEffect(() => {
    if (isLoggedIn && pendingAction.current === "follow") {
      pendingAction.current = null;
      const timeoutId = setTimeout(() => {
        handleFollowToggle();
      }, 0);
      return () => clearTimeout(timeoutId);
    }
  }, [isLoggedIn, handleFollowToggle]);

  const trackedStorefrontIdRef = useRef(null);
  useEffect(() => {
    if (!storeDetails?.id || trackedStorefrontIdRef.current === storeDetails.id) {
      return;
    }
    trackedStorefrontIdRef.current = storeDetails.id;
    trackStorefrontViewed({
      consultant_id: storeDetails.id,
      consultation_name: storeDetails.consultationName,
      username: router.query?.id,
      available_vehicles: storeDetails.availableVehicles,
      average_rating: storeDetails.averageRating,
    });
  }, [storeDetails, router.query?.id]);

  if (isLoading || !storeDetails) return <StoreFrontHeroSkeleton />;

  const formatServiceName = (service) =>
    service
      ?.toLowerCase()
      ?.split("_")
      ?.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      ?.join(" ");

  const formattedPrice = (() => {
    if (!storeDetails?.minVehiclePrice || !storeDetails?.maxVehiclePrice) return "-";
    const min = Number(storeDetails.minVehiclePrice);
    const max = Number(storeDetails.maxVehiclePrice);
    if (!min && !max) return "-";
    if (min === max) {
      return `₹${min.toLocaleString("en-IN")}`;
    }
    return (
      <span className="inline-flex flex-wrap items-center gap-x-1">
        <span>₹{min.toLocaleString("en-IN")}</span>
        <span>-</span>
        <span>₹{max.toLocaleString("en-IN")}</span>
      </span>
    );
  })();

  const formatFollowerCount = (count) => {
    if (!count) return "0";
    if (count >= 1000) {
      // Using toFixed(1) means 1100 -> 1.1, 1000 -> 1.0
      // We can replace ".0" with nothing so 1000 -> 1K
      return (count / 1000).toFixed(1).replace(/\.0$/, "") + "K";
    }
    return count.toString();
  };

  const mapUrl = storeDetails?.mapUrl;
  const addressParts = [
    storeDetails?.address?.address,
    storeDetails?.address?.city,
    storeDetails?.address?.state,
  ].filter(Boolean);
  const locationString =
    addressParts.length > 0
      ? addressParts.join(", ")
      : "Kanodar, Ahmedabad, Gujarat";
  const directionUrl =
    mapUrl ||
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(locationString)}`;

  return (
    <>
      <section className="w-full max-w-[1480px] mt-0 sm:mt-10 mx-auto border-0 sm:border border-third/40 rounded-none sm:rounded-xl md:rounded-2xl overflow-hidden shadow-none sm:shadow-sm">
        {/* ================= BANNER ================= */}
        <div
          className="relative w-full h-[200px] sm:h-[290px] md:h-[350px] cursor-pointer group"
          onClick={() => storeDetails?.bannerUrl && setZoomImage(storeDetails.bannerUrl)}
        >
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors z-10" />
          <Image
            src={storeDetails.bannerUrl}
            alt="Store Banner"
            fill
            className="object-cover object-center block"
            priority
          />
        </div>

        {/* ================= CONTENT AREA ================= */}
        <div className="px-4 sm:px-6 md:px-10 py-4 relative">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* LEFT COLUMN */}
            <div className="flex flex-col items-center -mt-20 z-30 w-full lg:w-48 shrink-0">
              <div
                className="relative w-42 h-42 rounded-full overflow-hidden bg-white border-4 border-white shadow-xl cursor-pointer group"
                onClick={() => storeDetails?.logoUrl && setZoomImage(storeDetails.logoUrl)}
              >
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors z-10 rounded-full" />
                <Image
                  src={storeDetails.logoUrl}
                  alt="Consultant Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>

              {/* subscribe & share buttons wrapper */}
              <div className="mt-4 w-full flex flex-row items-center gap-3 lg:block lg:space-y-0">
                {/* subscribe btn */}
                <div className="flex-1 lg:w-full">
                  <button
                    onClick={handleFollowToggle}
                    type="button"
                    className={`group w-full rounded-full px-4 py-1.5 lg:py-2 border flex items-center justify-center gap-2 text-sm lg:text-base font-medium cursor-pointer transition-all duration-300 ease-in-out ${isFollower
                      ? "bg-fourth text-primary border-fourth hover:bg-transparent hover:text-fourth"
                      : "bg-primary text-secondary border-primary hover:bg-transparent hover:text-primary"
                      }`}
                  >
                    <span className="transition-colors duration-300">
                      {isFollower ? "Unsubscribe" : "Subscribe"}
                    </span>

                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] lg:text-xs font-semibold transition-all duration-300 ${isFollower
                        ? "bg-primary/10 text-primary group-hover:bg-fourth/10 group-hover:text-primary"
                        : "bg-secondary/10 text-secondary group-hover:bg-primary/10 group-hover:text-primary"
                        }`}
                    >
                      {formatFollowerCount(localFollowersCount)}
                    </span>
                  </button>
                </div>

                {/* Mobile share btn: visible only on mobile/tablet */}
                <button
                  onClick={() => setIsShareOpen(true)}
                  type="button"
                  className="lg:hidden flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary border border-white/15 cursor-pointer hover:bg-primary/20 transition-all"
                >
                  <Share2 className="h-4.5 w-4.5" />
                </button>
              </div>
            </div>

            {/* CENTER COLUMN */}
            <div className="flex-1 space-y-4">
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-3xl font-semibold text-primary leading-tight capitalize">
                    {storeDetails.consultationName || "Auto Consultant"}
                  </h1>

                  <button
                    onClick={() => setIsShareOpen(true)}
                    type="button"
                    className="hidden lg:inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-all cursor-pointer shadow-sm"
                    aria-label="Share Storefront"
                  >
                    <Share2 className="h-3.5 w-3.5" />
                  </button>
                </div>

                <p className="flex items-center gap-1.5 text-third mt-1">
                  <MapPin className="w-4 h-4 shrink-0" />
                  <span className="text-sm capitalize">
                    {[
                      storeDetails?.address?.address,
                      storeDetails?.address?.town,
                      storeDetails?.address?.city,
                      storeDetails?.address?.state,
                    ]
                      .filter(Boolean)
                      .join(", ") || "N/A"}
                  </span>
                </p>
              </div>

              {/* STATS GRID */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-3.5 gap-x-5 py-2">
                {[
                  {
                    label: "Rating",
                    value: storeDetails.averageRating ?? 0,
                    icon: Star,
                  },
                  {
                    label: "Available Vehicles",
                    value: storeDetails.availableVehicles ?? 0,
                    icon: Car,
                  },
                  {
                    label: "Sold Vehicles",
                    value: storeDetails.soldVehiclesCount ?? 0,
                    icon: CheckCircle,
                  },
                  {
                    label: "Price Range",
                    value: formattedPrice,
                    icon: IndianRupee,
                  },
                  {
                    label: "Since",
                    value: storeDetails.establishmentYear || "N/A",
                    icon: Briefcase,
                  },
                ].map(({ label, value, icon: Icon }) => (
                  <div key={label} className="flex items-center gap-2.5">
                    <div className="p-2 bg-primary/5 rounded-lg border border-primary/10 shrink-0">
                      <Icon className="w-4.5 h-4.5 text-third" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs text-third font-medium leading-normal mb-0.5 capitalize truncate">
                        {label}
                      </p>
                      <div className="text-sm sm:text-base font-semibold text-primary leading-tight flex flex-wrap items-center">
                        {value}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT COLUMN */}
            <div className="w-full lg:w-80 space-y-4">
              {storeDetails?.services?.length > 0 && (
                <div className="space-y-3">
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

              <div className="flex gap-3 justify-start lg:justify-end items-center flex-wrap">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={handleWhatsAppClick}
                  disabled={isOpeningWhatsApp}
                >
                  {isOpeningWhatsApp ? (
                    <Loader2 className="w-[18px] h-[18px] animate-spin" />
                  ) : (
                    <FaWhatsapp className="w-[18px] h-[18px] shrink-0" />
                  )}
                  <span>WhatsApp</span>
                </Button>

                <Button
                  size="sm"
                  variant="ghost"
                  href={directionUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>Get Directions</span>
                  <CornerUpRight className="w-[18px] h-[18px] shrink-0" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <LoginPopup
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
      />
      <DownloadAppPopup
        isOpen={isDownloadAppOpen}
        onClose={() => setIsDownloadAppOpen(false)}
      />
      <SharePopup
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
        shareUrl={currentUrl}
        title={storeDetails?.consultationName || "Check this store"}
      />

      {/* Image Zoom Modal */}
      {zoomImage && (
        <div
          className="fixed inset-0 z-[99999] bg-black/95 backdrop-blur-md flex flex-col select-none"
          onClick={() => setZoomImage(null)}
        >
          {/* Top Floating Close Button */}
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

          {/* Main Image Area — Full Width & Normal Spacing */}
          <div
            className="relative flex-1 w-full h-full flex items-center justify-center overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <Swiper
              zoom={{ maxRatio: 3, minRatio: 1 }}
              modules={[Zoom]}
              className="w-full h-full"
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
