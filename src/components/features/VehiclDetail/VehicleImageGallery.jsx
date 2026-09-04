"use client";

import { ChevronLeft, ChevronRight, Play, Heart } from "lucide-react";
import Image from "next/image";
import { useMemo, useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { addWishList, removeWishList } from "@/services/user.service";
import { useAuthStore } from "@/stores/useAuthStore";
import LoginPopup from "@/components/auth/LoginPopup";
import SignupPopup from "@/components/auth/SignupPopup";
import { useDebouncedCallback } from "@/hooks/useDebounce";
import { useQueryClient } from "@tanstack/react-query";
import { event as metaEvent } from "@/lib/fpixel";

const optimizeVideoUrl = (src) => {
  if (!src) return "";
  return src;
};

const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? "100%" : "-100%",
  }),
  center: {
    zIndex: 1,
    x: 0,
  },
  exit: (direction) => ({
    zIndex: 0,
    x: direction > 0 ? "-100%" : "100%",
  }),
};

export default function VehicleImageGallery({ vehicle }) {
  const queryClient = useQueryClient();

  const vehicleId = vehicle?.id;
  const [isFavorite, setIsFavorite] = useState(vehicle?.isWishlisted || false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const pendingAction = useRef(null);
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const lastSyncedValue = useRef(vehicle?.isWishlisted || false);

  const imageAltBase = useMemo(() => {
    const year = vehicle?.yearOfMfg || vehicle?.year || "";
    const make = vehicle?.makerName || vehicle?.makeName || "";
    const model = vehicle?.modelName || "";
    const variant = vehicle?.variantName || "";
    const fuel = (vehicle?.fuelType || "").replace(/_/g, " ");
    const city = String(
      vehicle?.cityName ||
        vehicle?.city ||
        vehicle?.address?.city ||
        vehicle?.vehicleAddress?.city ||
        ""
    )
      .split(",")[0]
      .trim();
    const core = [year, make, model, variant, fuel].filter(Boolean).join(" ");
    const loc = city ? ` in ${city}` : "";
    return `${core || "Used vehicle"}${loc} | Reecomm`;
  }, [vehicle]);

  const debouncedSyncWishlist = useDebouncedCallback(async (nextState) => {
    try {
      if (!nextState) {
        const res = await removeWishList(vehicleId);
        if (!(res?.success || res?.status)) {
          throw new Error("Failed to remove");
        }
      } else {
        const res = await addWishList(vehicleId);
        if (!(res?.success || res?.status)) {
          throw new Error("Failed to add");
        }
        const contentName =
          `${vehicle?.yearOfMfg || vehicle?.year || ""} ${vehicle?.makerName || ""} ${vehicle?.modelName || ""}`.trim() ||
          "Vehicle";
        metaEvent("AddToWishlist", {
          content_type: "vehicle",
          content_ids: [String(vehicleId)],
          content_name: contentName,
          value: Number(vehicle?.price) || 0,
          currency: "INR",
        });
      }
      lastSyncedValue.current = nextState;
      queryClient.invalidateQueries({ queryKey: ["user-wishlist-infinite"] });
    } catch (err) {
      console.log("Wishlist sync error:", err);
      setIsFavorite(!nextState);
    }
  }, 1000);

  useEffect(() => {
    setIsFavorite(vehicle?.isWishlisted || false);
  }, [vehicle?.isWishlisted]);

  const handleWishlistToggle = () => {
    if (!isLoggedIn) {
      pendingAction.current = "wishlist";
      setIsLoginOpen(true);
      return;
    }

    if (!vehicleId) return;

    const nextState = !isFavorite;
    setIsFavorite(nextState);

    if (nextState === lastSyncedValue.current) {
      debouncedSyncWishlist.cancel();
    } else {
      debouncedSyncWishlist(nextState);
    }
  };

  const handleAuthSuccess = () => {
    setIsLoginOpen(false);
    setIsSignupOpen(false);
    if (pendingAction.current === "wishlist") {
      pendingAction.current = null;
      handleWishlistToggle();
    }
  };

  useEffect(() => {
    if (isLoggedIn && pendingAction.current === "wishlist") {
      pendingAction.current = null;
      handleWishlistToggle();
    }
  }, [isLoggedIn]);

  const media = useMemo(() => {
    const items = [];

    if (vehicle?.thumbnailUrl) {
      items.push({
        type: "image",
        src: vehicle.thumbnailUrl,
        thumbnail: vehicle.thumbnailUrl,
      });
    }

    if (vehicle?.vehicleImages?.length) {
      const sorted = [...vehicle.vehicleImages]
        .sort((a, b) => a.displayOrder - b.displayOrder)
        .map((item) => ({
          type: item.isVideo ? "video" : "image",
          src: item.imageUrl,
          thumbnail: item.isVideo ? item.videoThumbnailUrl : item.imageUrl,
        }));

      items.push(...sorted);
    }

    return items;
  }, [vehicle]);

  const [[page, direction], setPage] = useState([0, 0]);
  const thumbsContainerRef = useRef(null);

  const activeIndex = page;

  const paginate = (newDirection) => {
    if (media.length <= 1) return;
    let nextIndex = activeIndex + newDirection;
    if (nextIndex < 0) nextIndex = media.length - 1;
    if (nextIndex >= media.length) nextIndex = 0;
    setPage([nextIndex, newDirection]);
  };

  // Safe index reset when media list changes
  useEffect(() => {
    if (page >= media.length) {
      setPage([0, 0]);
    }
  }, [media.length, page]);

  // Center active thumbnail into view
  useEffect(() => {
    if (thumbsContainerRef.current) {
      const activeEl = thumbsContainerRef.current.children[activeIndex];
      if (activeEl) {
        activeEl.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        });
      }
    }
  }, [activeIndex]);

  if (!media.length) {
    return (
      <section className="w-full rounded-xl p-4 shadow border border-third/60">
        <div className="relative w-full aspect-video bg-third/10 rounded-lg overflow-hidden flex flex-col items-center justify-center gap-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-14 h-14 text-third/40"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <p className="text-sm text-third/60 font-medium">
            No images uploaded by the seller
          </p>
        </div>
      </section>
    );
  }

  const currentItem = media[activeIndex] || media[0];

  return (
    <section className="w-full rounded-xl p-4 shadow border border-third/60">
      {/* ===== MAIN PREVIEW ===== */}
      <div className="relative w-full aspect-video bg-black/95 rounded-lg overflow-hidden group select-none">
        {/* Top Right Actions */}
        <div className="absolute top-4 right-4 z-20 flex items-center gap-3">
          {/* Wishlist Button */}
          <button
            onClick={handleWishlistToggle}
            className="bg-black/50 hover:bg-black/70 text-white p-2.5 rounded-full hover:scale-105 transition cursor-pointer border border-white/20 shadow-md"
          >
            <Heart
              className={`w-4 h-4 md:w-5 md:h-5 transition-colors ${
                isFavorite ? "fill-red-500 text-red-500" : "text-white"
              }`}
            />
          </button>
        </div>

        {/* Slides Wrapper */}
        <div className="absolute inset-0 overflow-hidden">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={page}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "tween", ease: "easeInOut", duration: 0.35 },
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.6}
              onDragEnd={(e, info) => {
                const swipeThreshold = 50;
                if (info.offset.x < -swipeThreshold) {
                  paginate(1);
                } else if (info.offset.x > swipeThreshold) {
                  paginate(-1);
                }
              }}
              className="absolute inset-0 w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing"
            >
              {currentItem.type === "image" ? (
                <Image
                  src={currentItem.src}
                  alt={`${imageAltBase} — photo ${activeIndex + 1}`}
                  fill
                  className="object-contain pointer-events-none select-none"
                  priority
                />
              ) : (
                <div
                  className="w-full h-full flex items-center justify-center bg-black"
                  onPointerDown={(e) => e.stopPropagation()}
                >
                  <video
                    src={currentItem.src}
                    preload="metadata"
                    controls
                    autoPlay
                    playsInline
                    className="w-full h-full object-contain"
                  />
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* NAV BUTTONS */}
        <button
          onClick={() => paginate(-1)}
          className="absolute left-3 top-1/2 -translate-y-1/2 z-10 bg-primary/90 text-secondary p-2 rounded-full hover:scale-105 transition-all duration-300 cursor-pointer hidden md:block"
        >
          <ChevronLeft />
        </button>

        <button
          onClick={() => paginate(1)}
          className="absolute right-3 top-1/2 -translate-y-1/2 z-10 bg-primary/90 text-secondary p-2 rounded-full hover:scale-105 transition duration-300 cursor-pointer hidden md:block"
        >
          <ChevronRight />
        </button>
      </div>

      {/* ===== THUMBNAILS ===== */}
      <div className="mt-4">
        <div
          ref={thumbsContainerRef}
          className="flex overflow-x-auto no-scrollbar gap-3 py-1 scroll-smooth"
        >
          {media.map((item, idx) => {
            const isActive = activeIndex === idx;
            return (
              <div
                key={idx}
                onClick={() => setPage([idx, idx > activeIndex ? 1 : -1])}
                className="w-20 sm:w-24 shrink-0 rounded-md overflow-hidden cursor-pointer transition-all"
              >
                <div
                  className={`w-20 h-14 sm:w-24 sm:h-16 bg-black/5 flex items-center justify-center relative border transition rounded-md overflow-hidden ${
                    isActive
                      ? "border-primary border-2 shadow-sm"
                      : "border-primary/40 hover:border-primary/70"
                  }`}
                >
                  {item.type === "image" ? (
                    <Image
                      src={item.thumbnail}
                      width={100}
                      height={100}
                      alt={`${imageAltBase} — photo ${idx + 1}`}
                      className="w-full h-full object-cover pointer-events-none select-none"
                    />
                  ) : (
                    <>
                      <VideoThumbnail
                        videoUrl={item.src}
                        providedThumbnail={item.thumbnail}
                      />
                      <div className="absolute inset-0 bg-black/30" />
                      <Play size={18} className="absolute text-white" />
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Popups */}
      <LoginPopup
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onSuccess={handleAuthSuccess}
        onSignup={() => {
          setIsLoginOpen(false);
          setIsSignupOpen(true);
        }}
      />
      <SignupPopup
        isOpen={isSignupOpen}
        onClose={() => setIsSignupOpen(false)}
        onSuccess={handleAuthSuccess}
        onLogin={() => {
          setIsSignupOpen(false);
          setIsLoginOpen(true);
        }}
      />
    </section>
  );
}

const VideoThumbnail = ({ videoUrl, providedThumbnail }) => {
  if (providedThumbnail) {
    return (
      <Image
        src={providedThumbnail}
        width={100}
        height={100}
        alt="video-thumbnail"
        className="w-full h-full object-cover"
      />
    );
  }

  return (
    <div className="w-full h-full bg-neutral-900 overflow-hidden relative flex items-center justify-center">
      <video
        src={videoUrl}
        preload="metadata"
        muted
        playsInline
        className="w-full h-full object-cover pointer-events-none"
      />
    </div>
  );
};
