"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { useQuery } from "@tanstack/react-query";
import { getDisplayImageQuery } from "@/queries/user.queries";

import "swiper/css";
import "swiper/css/pagination";

/**
 * Fallback search promo banners if API has no active items or is loading.
 */
const fallbackBanners = [
  {
    id: "fallback-1",
    desktopImage: "/banner1.webp",
    tabletImage: "/banner1.webp",
    mobileImage: "/mobile-banner-1.png",
    alt: "Search Promo Banner 1",
    redirectUrl: null,
  },
  {
    id: "fallback-2",
    desktopImage: "/banner2.webp",
    tabletImage: "/banner2.webp",
    mobileImage: "/mobile-banner-2.png",
    alt: "Search Promo Banner 2",
    redirectUrl: null,
  },
  {
    id: "fallback-3",
    desktopImage: "/banner3.webp",
    tabletImage: "/banner3.webp",
    mobileImage: "/mobile-banner-3.png",
    alt: "Search Promo Banner 3",
    redirectUrl: null,
  },
];

function BannerImage({
  desktopSrc,
  tabletSrc,
  mobileSrc,
  alt = "Search promo banner",
  redirectUrl,
}) {
  const finalDesktop = desktopSrc || tabletSrc || mobileSrc;
  const finalTablet = tabletSrc || finalDesktop;
  const finalMobile = mobileSrc || finalTablet || finalDesktop;

  if (!finalDesktop) return null;

  const hasSeparateImages =
    finalTablet !== finalDesktop || finalMobile !== finalDesktop;

  const content = (
    <div className="relative w-full h-full">
      {hasSeparateImages ? (
        <>
          {/* Desktop Banner (>= 1024px) */}
          <Image
            src={finalDesktop}
            alt={alt}
            fill
            className="hidden lg:block object-cover object-center"
            priority
          />
          {/* Tablet Banner (640px - 1023px) */}
          <Image
            src={finalTablet}
            alt={alt ? `${alt} tablet` : "Search promo banner tablet"}
            fill
            className="hidden sm:block lg:hidden object-cover object-center"
            priority
          />
          {/* Mobile Banner (< 640px) */}
          <Image
            src={finalMobile}
            alt={alt ? `${alt} mobile` : "Search promo banner mobile"}
            fill
            className="block sm:hidden object-cover object-center"
            priority
          />
        </>
      ) : (
        /* Single responsive banner for all viewports when no separate tablet/mobile URL is provided */
        <Image
          src={finalDesktop}
          alt={alt}
          fill
          className="w-full h-full object-cover object-center"
          priority
        />
      )}
    </div>
  );

  if (redirectUrl) {
    return (
      <a
        href={redirectUrl}
        target={redirectUrl.startsWith("http") ? "_blank" : "_self"}
        rel="noopener noreferrer"
        className="block w-full h-full cursor-pointer"
      >
        {content}
      </a>
    );
  }

  return content;
}

function PromoBanners() {
  // Fetch dynamic display images for SEARCH_PAGE on WEB platform
  const { data: displayImages = [] } = useQuery(
    getDisplayImageQuery({ placement: "SEARCH_PAGE", platform: "WEB" })
  );

  const slidesData = useMemo(() => {
    if (Array.isArray(displayImages) && displayImages.length > 0) {
      // 1. Filter active banners specifically for WEB platform with valid web image URLs
      const webBanners = displayImages.filter((item) => {
        const isActive = !item.status || item.status === "ACTIVE";
        const isWebPlatform = item.platform === "WEB" || item.platform === "BOTH";
        const hasWebImage = Boolean(
          item.webDesktopImageUrl || item.webTabletImageUrl || item.webMobileImageUrl
        );
        return isActive && isWebPlatform && hasWebImage;
      });

      // 2. Sort by displayOrder
      const sorted = [...webBanners].sort(
        (a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0)
      );

      // 3. Map into slide objects with dedicated web keys:
      // Desktop: webDesktopImageUrl
      // Tablet: webTabletImageUrl (if provided, otherwise fallback to webDesktopImageUrl)
      // Mobile: webMobileImageUrl (if provided, otherwise fallback to webTabletImageUrl or webDesktopImageUrl)
      const slides = sorted
        .map((item, idx) => {
          const desktopImage = item.webDesktopImageUrl;
          const tabletImage = item.webTabletImageUrl || desktopImage;
          const mobileImage =
            item.webMobileImageUrl || tabletImage || desktopImage;

          if (!desktopImage && !tabletImage && !mobileImage) {
            return null;
          }

          return {
            id: item.id || `promo-${item.displayOrder ?? idx}`,
            desktopImage,
            tabletImage,
            mobileImage,
            alt: item.title || `Search promo banner ${item.displayOrder ?? idx + 1}`,
            redirectUrl: item.redirectUrl || null,
          };
        })
        .filter(Boolean);

      if (slides.length > 0) {
        return slides;
      }
    }

    return fallbackBanners;
  }, [displayImages]);

  return (
    <div className="relative w-full h-[140px] sm:h-[200px] md:h-[240px] lg:h-[280px] rounded-xl sm:rounded-2xl overflow-hidden shadow-md bg-transparent">
      <Swiper
        key={slidesData.map((s) => s.id).join("-")}
        modules={[Autoplay, Pagination]}
        autoplay={
          slidesData.length > 1
            ? { delay: 3500, disableOnInteraction: false }
            : false
        }
        pagination={
          slidesData.length > 1
            ? {
              clickable: true,
              dynamicBullets: false,
            }
            : false
        }
        loop={slidesData.length > 1}
        className="w-full h-full promo-swiper"
      >
        {slidesData.map((slide) => (
          <SwiperSlide key={slide.id} className="w-full h-full relative">
            <BannerImage
              desktopSrc={slide.desktopImage}
              tabletSrc={slide.tabletImage}
              mobileSrc={slide.mobileImage}
              alt={slide.alt}
              redirectUrl={slide.redirectUrl}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default function PromoBanner() {
  return <PromoBanners />;
}
