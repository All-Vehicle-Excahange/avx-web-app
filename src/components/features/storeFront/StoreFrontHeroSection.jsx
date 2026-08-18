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
} from "lucide-react";
import Button from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/router";
import { followConsultant, unFollowConsultant } from "@/services/user.service";
import LoginPopup from "@/components/auth/LoginPopup";
import { useAuthStore } from "@/stores/useAuthStore";
import SignupPopup from "@/components/auth/SignupPopup";
import DownloadAppPopup from "@/components/ui/DownloadAppPopup";
import SharePopup from "@/components/ui/SharePopup";
import StoreFrontHeroSkeleton from "@/components/ui/skeleton/StoreFrontHeroSkeleton";
import { useDebouncedCallback } from "@/hooks/useDebounce";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getStoreFrontByUsernameQuery } from "@/queries/user.queries";

export default function StoreFrontHeroSection() {
  const router = useRouter();
  const id = router.query?.id;
  const queryClient = useQueryClient();

  const { data: storeDetails, isLoading } = useQuery(
    getStoreFrontByUsernameQuery(id),
  );

  const [optimisticFollowState, setOptimisticFollowState] = useState(null);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [isDownloadAppOpen, setIsDownloadAppOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [currentUrl, setCurrentUrl] = useState("");
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const pendingAction = useRef(null);

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

  if (isLoading || !storeDetails) return <StoreFrontHeroSkeleton />;

  const formatServiceName = (service) =>
    service
      ?.toLowerCase()
      ?.split("_")
      ?.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      ?.join(" ");

  const formattedPrice =
    storeDetails.minVehiclePrice && storeDetails.maxVehiclePrice
      ? `₹${Number(storeDetails.minVehiclePrice).toLocaleString("en-IN")} - ₹${Number(
        storeDetails.maxVehiclePrice,
      ).toLocaleString("en-IN")}`
      : "-";

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
      <section className="w-full max-w-[1480px] mt-0 sm:mt-10 mx-auto border-0 sm:border border-third/40 rounded-none sm:rounded-2xl md:rounded-[2.5rem] overflow-hidden shadow-none sm:shadow-sm">
        {/* ================= BANNER ================= */}
        <div
          className="w-full h-54 md:h-80 bg-cover bg-center"
          style={{
            backgroundImage: `url(${storeDetails.bannerUrl})`,
          }}
        />

        {/* ================= CONTENT AREA ================= */}
        <div className="px-4 sm:px-6 md:px-10 py-4 relative">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* LEFT COLUMN */}
            <div className="flex flex-col items-center -mt-20 z-30 w-full lg:w-48 shrink-0">
              <div className="relative w-42 h-42 rounded-full overflow-hidden bg-primary border-4 border-white shadow-xl">
                <Image
                  src={storeDetails.logoUrl}
                  alt="Consultant Logo"
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              {/* subscribe & share buttons wrapper */}
              <div className="mt-6 w-full flex flex-row items-center gap-3 lg:block lg:space-y-0">
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
            <div className="flex-1 space-y-4 pt-2">
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-3xl font-semibold text-primary leading-tight capitalize">
                    {storeDetails.consultationName}
                  </h1>

                  <button
                    onClick={() => setIsShareOpen(true)}
                    type="button"
                    className="hidden lg:flex h-9 w-9 items-center justify-center rounded-full p-0 text-primary/80 hover:text-primary bg-transparent! cursor-pointer"
                  >
                    <Share2 className="h-5 w-5" />
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
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-y-5 gap-x-6 py-4">
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
                  <div key={label} className="flex items-center gap-3">
                    <div className="p-2 bg-primary/5 rounded-lg border border-primary/10">
                      <Icon className="w-4 h-4 text-third" />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase text-third font-semibold leading-none mb-1">
                        {label}
                      </p>
                      <p className="text-sm font-semibold text-primary leading-none">
                        {value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT COLUMN */}
            <div className="w-full lg:w-80 space-y-6">
              {storeDetails?.services?.length > 0 && (
                <div className="space-y-3">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-third">
                    Services Provided
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {storeDetails.services.map((service) => (
                      <span
                        key={service}
                        className="px-3 py-1.5 text-[11px] font-medium border border-third rounded-full text-primary hover:bg-primary/5 transition-colors cursor-default"
                      >
                        {formatServiceName(service)}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex gap-3 justify-end">
                <Button
                  size="sm"
                  variant="ghost"
                  href={directionUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Get Directions
                  <CornerUpRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
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
    </>
  );
}
