"use client";

import React, { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import NoPrefetchLink from "@/components/ui/NoPrefetchLink";
import {
  X,
  PhoneCall,
  MapPin,
  Calendar,
  Fuel,
  Gauge,
  Cog,
  Star,
  ShieldCheck,
  ExternalLink,
  Copy,
  Check,
  CarFront,
  Loader2,
} from "lucide-react";
import Button from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { trackInquiryClick, trackInquirySubmit } from "@/lib/gtag";
import { trackInquiryInitiated, trackInquirySubmitted, trackCallSubmitted } from "@/lib/amplitude";
import { event, customEvent } from "@/lib/fpixel";
import useEscapeKey from "@/hooks/useEscapeKey";
import {
  getVehicleOwnerContact,
} from "@/services/vehicle.service";

export default function CallSellerPopup({
  isOpen,
  onClose,
  vehicle,
  summary,
}) {
  const [isClosing, setIsClosing] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [logoError, setLogoError] = useState(false);

  const vehicleId = vehicle?.id || vehicle?._id;
  const vehicleOwnerRole =
    vehicle?.vehicleOwner?.userRole || vehicle?.sellerType || "USER";
  const isConsultant = vehicleOwnerRole === "CONSULTATION";

  const vehicleTitle = [
    vehicle?.yearOfMfg || vehicle?.year,
    vehicle?.makerName || vehicle?.makeName,
    vehicle?.modelName,
    vehicle?.variantName,
  ]
    .filter(Boolean)
    .join(" ") || "Vehicle Details";

  const vehicleImage =
    vehicle?.thumbnailUrl ||
    vehicle?.vehicleImages?.[0]?.imageUrl ||
    vehicle?.primaryImage ||
    vehicle?.images?.[0] ||
    "/request.webp";

  const sellerName = isConsultant
    ? summary?.consultationName || vehicle?.consultantName || "Auto Consultant"
    : [vehicle?.vehicleOwner?.firstname, vehicle?.vehicleOwner?.lastname]
      .filter(Boolean)
      .join(" ") || "Individual Seller";

  const sellerLogo =
    summary?.logoUrl ||
    summary?.logo ||
    vehicle?.consultantLogoUrl ||
    vehicle?.logoUrl ||
    vehicle?.vehicleOwner?.profilePicture ||
    vehicle?.vehicleOwner?.avatar ||
    null;

  // Fetch Owner Contact when Popup Opens via React Query
  const { data: ownerContactData, isLoading: isFetchingPhone } = useQuery({
    queryKey: ["vehicle-owner-contact", vehicleId],
    queryFn: () => getVehicleOwnerContact(vehicleId),
    enabled: Boolean(isOpen && vehicleId),
    staleTime: 5 * 60 * 1000,
  });

  const fetchedPhone =
    ownerContactData?.data?.phoneNumber ||
    ownerContactData?.data?.phone ||
    ownerContactData?.data?.mobile ||
    null;

  // Resolve Phone Number (priority: API fetched phone -> summary phone -> vehicle phone)
  const rawPhone =
    fetchedPhone ||
    summary?.phone ||
    summary?.phoneNumber ||
    summary?.mobileNumber ||
    summary?.mobile ||
    summary?.contactNumber ||
    summary?.user?.phoneNumber ||
    summary?.user?.phone ||
    vehicle?.vehicleOwner?.phone ||
    vehicle?.vehicleOwner?.phoneNumber ||
    vehicle?.vehicleOwner?.mobile ||
    vehicle?.phone ||
    vehicle?.mobile ||
    "";

  const cleanPhone = rawPhone ? String(rawPhone).replace(/[^0-9+]/g, "") : "";

  const displayPhone = rawPhone
    ? rawPhone.startsWith("+")
      ? rawPhone
      : `+91 ${rawPhone}`
    : isFetchingPhone
      ? "Fetching contact..."
      : "Contact on Request";

  const sellerAddress = isConsultant
    ? summary?.address
      ? [summary.address.address, summary.address.city, summary.address.state]
        .filter(Boolean)
        .join(", ")
      : [vehicle?.vehicleAddress?.city, vehicle?.vehicleAddress?.state]
        .filter(Boolean)
        .join(", ") || "Location not available"
    : [
      vehicle?.vehicleAddress?.town,
      vehicle?.vehicleAddress?.city,
      vehicle?.vehicleAddress?.state,
    ]
      .filter(Boolean)
      .join(", ") || "Location not available";

  const sellerRating = summary?.averageRating || 0;
  const soldCount = summary?.soldVehiclesCount || 0;
  const consultantUsername = summary?.username || 1;

  const handleClose = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 150);
  }, [onClose]);

  useEscapeKey(isOpen, handleClose);

  useEffect(() => {
    const preventScroll = (e) => {
      const isScrollableContent = e.target.closest('.custom-scrollbar');
      if (isScrollableContent) return;
      if (e.cancelable) {
        e.preventDefault();
      }
    };

    if (isOpen) {
      setImgError(false);
      setLogoError(false);
      window.addEventListener("wheel", preventScroll, { passive: false });
      window.addEventListener("touchmove", preventScroll, { passive: false });
    }

    return () => {
      window.removeEventListener("wheel", preventScroll);
      window.removeEventListener("touchmove", preventScroll);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  // Handle Direct Call
  const handleCallClick = () => {
    const inquiryType = isConsultant ? "Call Consultant" : "Call Seller";

    // Amplitude: call_submitted
    trackCallSubmitted({
      vehicle_id: vehicleId,
      vehicle_name: vehicleTitle,
      inquiry_type: inquiryType,
      seller_type: vehicleOwnerRole,
    });

    // Meta Pixel: Lead & Contact on call submit
    event("Lead", {
      content_type: "vehicle",
      content_ids: [String(vehicleId)],
      content_name: vehicleTitle || "Vehicle Call",
    });
    event("Contact", {
      content_type: "vehicle",
      content_ids: [String(vehicleId)],
      content_name: vehicleTitle || "Vehicle Call",
    });

    if (cleanPhone) {
      window.location.href = `tel:${cleanPhone}`;
    }
  };

  const handleCopyPhone = () => {
    if (!cleanPhone) return;
    navigator.clipboard.writeText(cleanPhone);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const initials = sellerName
    ? sellerName
      .split(" ")
      .filter(Boolean)
      .map((w) => w[0])
      .slice(0, 2)
      .join("")
      .toUpperCase()
    : "SC";

  const modalContent = (
    <div
      className="fixed inset-0 z-9999 flex items-center justify-center bg-black/70 backdrop-blur-md p-3 sm:p-4"
      onClick={handleClose}
      style={{
        animation: isClosing
          ? "modalBackdropOut 0.15s ease-in forwards"
          : "modalBackdropIn 0.15s ease-out",
      }}
    >
      <div
        className="relative flex flex-col md:flex-row w-full max-w-[860px] max-h-[90vh] overflow-y-auto custom-scrollbar overscroll-contain md:overflow-hidden bg-secondary border border-white/10 rounded-2xl shadow-2xl text-primary font-primary"
        onClick={(e) => e.stopPropagation()}
        style={{
          animation: isClosing
            ? "modalCardOut 0.15s ease-in forwards"
            : "modalCardIn 0.15s ease-out",
        }}
      >
        {/* CLOSE BUTTON */}
        <button
          onClick={handleClose}
          aria-label="Close"
          className="absolute top-3.5 right-3.5 z-40 p-1.5 rounded-full bg-white text-secondary hover:bg-white/90 shadow-lg transition-all cursor-pointer"
        >
          <X size={18} strokeWidth={2.5} />
        </button>

        {/* LEFT COLUMN: VEHICLE DETAILS */}
        <div className="w-full md:w-1/2 p-5 sm:p-6 bg-gradient-to-b from-white/[0.04] to-transparent border-b md:border-b-0 md:border-r border-white/10 flex flex-col justify-between gap-4">
          <div className="space-y-4">
            {/* Header Tag */}
            <div className="flex items-center justify-between pr-10 md:pr-0">
              <span className="text-[11px] font-bold uppercase tracking-wider text-third flex items-center gap-1.5">
                <CarFront size={14} className="text-primary" /> Vehicle Details
              </span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20 font-medium">
                {vehicle?.isVehicleSold ? "Sold Out" : "Available"}
              </span>
            </div>

            {/* Vehicle Thumbnail */}
            <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-zinc-900 border border-white/10 shadow-inner group">
              <Image
                src={imgError ? "/request.webp" : vehicleImage}
                alt={vehicleTitle}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                onError={() => setImgError(true)}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

              {/* Price Tag Overlay */}
              <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
                <div>
                  <p className="text-[10px] uppercase font-semibold text-white/70">
                    Offered Price
                  </p>
                  <p className="text-xl sm:text-2xl font-semibold text-white leading-none">
                    ₹{vehicle?.price?.toLocaleString("en-IN") || "0"}
                  </p>
                </div>
              </div>
            </div>

            {/* Vehicle Title */}
            <div>
              <h3 className="text-lg font-bold text-primary leading-snug line-clamp-2">
                {vehicleTitle}
              </h3>
            </div>

            {/* Spec Chips Grid */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              {vehicle?.yearOfMfg && (
                <div className="flex items-center gap-2 p-2 rounded-lg bg-white/[0.03] border border-white/5 text-third">
                  <Calendar size={14} className="text-primary shrink-0" />
                  <span className="truncate">
                    Year: <b className="text-primary">{vehicle.yearOfMfg}</b>
                  </span>
                </div>
              )}

              {vehicle?.kmDriven !== undefined && vehicle?.kmDriven !== null && (
                <div className="flex items-center gap-2 p-2 rounded-lg bg-white/[0.03] border border-white/5 text-third">
                  <Gauge size={14} className="text-primary shrink-0" />
                  <span className="truncate">
                    <b className="text-primary">
                      {Number(vehicle.kmDriven).toLocaleString("en-IN")}
                    </b>{" "}
                    km
                  </span>
                </div>
              )}

              {vehicle?.fuelType && (
                <div className="flex items-center gap-2 p-2 rounded-lg bg-white/[0.03] border border-white/5 text-third">
                  <Fuel size={14} className="text-primary shrink-0" />
                  <span className="truncate capitalize">
                    <b className="text-primary">
                      {vehicle.fuelType.replace(/_/g, " ").toLowerCase()}
                    </b>
                  </span>
                </div>
              )}

              {vehicle?.transmission && (
                <div className="flex items-center gap-2 p-2 rounded-lg bg-white/[0.03] border border-white/5 text-third">
                  <Cog size={14} className="text-primary shrink-0" />
                  <span className="truncate capitalize">
                    <b className="text-primary">
                      {vehicle.transmission.replace(/_/g, " ").toLowerCase()}
                    </b>
                  </span>
                </div>
              )}

              {(vehicle?.vehicleAddress?.city || vehicle?.cityName) && (
                <div className="flex items-center gap-2 p-2 rounded-lg bg-white/[0.03] border border-white/5 text-third col-span-2">
                  <MapPin size={14} className="text-primary shrink-0" />
                  <span className="truncate">
                    Location:{" "}
                    <b className="text-primary">
                      {vehicle?.vehicleAddress?.city || vehicle?.cityName}
                    </b>
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: SELLER DETAILS & CALL ACTION */}
        <div className="w-full md:w-1/2 p-5 sm:p-6 flex flex-col justify-between gap-5">
          <div className="space-y-4">
            {/* Header Badge */}
            <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400">
              <ShieldCheck size={16} />
              <span>
                {isConsultant
                  ? "Verified Auto Consultant"
                  : "Verified Direct Seller"}
              </span>
            </div>

            {/* Seller Profile Summary Card */}
            <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-white/[0.03] border border-white/10">
              {/* Avatar / Logo / Monogram */}
              {sellerLogo && !logoError ? (
                <div className="relative w-12 h-12 rounded-full overflow-hidden border border-white/15 bg-white/5 shrink-0 shadow-inner">
                  <Image
                    src={sellerLogo}
                    alt={sellerName}
                    fill
                    className="object-cover"
                    onError={() => setLogoError(true)}
                  />
                </div>
              ) : (
                <div className="w-12 h-12 rounded-full bg-linear-to-br from-primary/30 to-primary/10 border border-primary/30 flex items-center justify-center font-bold text-base text-primary shrink-0 shadow-inner">
                  {initials}
                </div>
              )}

              <div className="flex-1 min-w-0">
                <h4 className="text-base sm:text-lg font-bold text-primary truncate capitalize leading-tight">
                  {sellerName}
                </h4>

                {isConsultant && (
                  <div className="flex items-center gap-2 mt-1 text-xs text-third">
                    {sellerRating > 0 && (
                      <span className="flex items-center gap-1 text-yellow-400 font-medium">
                        <Star size={12} fill="currentColor" />
                        {sellerRating}
                      </span>
                    )}
                    {soldCount > 0 && (
                      <span>
                        • {soldCount} Sold
                      </span>
                    )}
                    {summary?.username && (
                      <NoPrefetchLink
                        href={`/auto-consultant/${consultantUsername}`}
                        target="_blank"
                        className="text-primary hover:underline flex items-center gap-0.5 ml-auto"
                      >
                        Storefront <ExternalLink size={10} />
                      </NoPrefetchLink>
                    )}
                  </div>
                )}

                <p className="flex items-start gap-1 text-xs text-third mt-1.5 line-clamp-1">
                  <MapPin size={12} className="shrink-0 mt-0.5" />
                  <span className="truncate">{sellerAddress}</span>
                </p>
              </div>
            </div>

            {/* Phone Number Display Box */}
            <div className="p-4 rounded-xl bg-gradient-to-br from-white/[0.05] to-white/[0.02] border border-white/10 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold text-third uppercase tracking-wider">
                  Contact Number
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Direct Connect
                </span>
              </div>

              <div className="flex items-center justify-between gap-2">
                {isFetchingPhone && !rawPhone ? (
                  <div className="flex items-center gap-2 text-sm text-third py-1 animate-pulse">
                    <Loader2 size={16} className="animate-spin text-primary" />
                    <span>Fetching contact number...</span>
                  </div>
                ) : (
                  <p className="text-lg sm:text-xl font-bold text-primary tracking-wide">
                    {displayPhone}
                  </p>
                )}

                {cleanPhone && (
                  <button
                    type="button"
                    onClick={handleCopyPhone}
                    className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-third hover:text-primary transition-colors flex items-center gap-1 text-xs font-medium cursor-pointer"
                    title="Copy Phone Number"
                  >
                    {isCopied ? (
                      <>
                        <Check size={14} className="text-emerald-400" />
                        <span className="text-emerald-400">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy size={14} />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                )}
              </div>

              <p className="text-[11px] text-third/80 leading-relaxed">
                Call directly to discuss vehicle condition, pricing, schedule a test drive or request an inspection.
              </p>
            </div>
          </div>

          {/* ACTION BUTTONS */}
          <div className="pt-2">
            {cleanPhone || isFetchingPhone ? (
              <Button
                variant="ghost"
                size="sm"
                showIcon={false}
                className="rounded-full w-full flex items-center justify-center gap-2 h-10"
                onClick={handleCallClick}
                disabled={!cleanPhone && isFetchingPhone}
              >
                <PhoneCall size={18} />
                <span>
                  {`Call ${isConsultant ? "Consultant" : "Seller"} Now`}
                </span>
              </Button>
            ) : (
              <Button
                variant="ghost"
                size="md"
                showIcon={false}
                className="w-full rounded-full"
                onClick={handleClose}
              >
                Close
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return typeof document !== "undefined"
    ? createPortal(modalContent, document.body)
    : null;
}
