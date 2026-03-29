"use client";

import { useState } from "react";
import SponsoredRibbon from "@/components/ui/const/SponsoredRibbonMain";
import {
  Fuel,
  Heart,
  MapPinned,
  Settings2,
  CheckCircle,
  Pencil,
  ArrowUpRight,
  Users,
  ShieldCheck,
  ShieldAlert,
} from "lucide-react";
import Button from "@/components/ui/button";
import Image from "next/image";
import DownloadAppPopup from "@/components/ui/DownloadAppPopup";
import { markAsSoldVehicle } from "@/services/vehicle.service";

export default function UserVehicleCard({
  data,
  status = "live",
  avxInspected = false,
  inquiries = 0,
  chats = 0,
  showBoostButton = false,
  onRefresh,
}) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isDownloadOpen, setIsDownloadOpen] = useState(false);

  const statusBg = {
    live: "bg-green-600",
    sold: "bg-gray-600",
    draft: "bg-yellow-500",
    underinspection: "bg-orange-500",
  };

  const verificationBadge = {
    VERIFIED: { label: "Verified", icon: <ShieldCheck size={12} />, cls: "bg-green-600/20 text-green-400 border border-green-500/30" },
    REQUESTED: { label: "Pending", icon: <ShieldAlert size={12} />, cls: "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30" },
    REJECTED: { label: "Rejected", icon: <ShieldAlert size={12} />, cls: "bg-red-500/20 text-red-400 border border-red-500/30" },
  };

  const verification = verificationBadge[data?.verificationStatus] || null;

  const handleSoldClick = async (id) => {
    try {
      const res = await markAsSoldVehicle(id);
      console.log(res);
      if (onRefresh) {
        onRefresh();
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="group/card relative flex flex-row md:flex-col rounded-2xl overflow-hidden text-primary w-full border-2 border-third/60 hover:shadow-[0_20px_60px_rgba(255,255,255,0.25)] transition-shadow duration-300">

        {/* STATUS PILL */}
        <div className="absolute top-2 left-2 z-30">
          <div className={`py-1 px-3 rounded-full text-[11px] font-bold text-white shadow-sm ${statusBg[status] || "bg-gray-600"}`}>
            {status?.toUpperCase() || "-"}
          </div>
        </div>

        {/* AVX INSPECTED BADGE */}
        {/* {avxInspected && (
        <div className="absolute top-2 right-2 z-30 px-3 py-1 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center gap-1">
          AVX Inspected <CheckCircle size={14} />
        </div>
      )} */}


        <div className="relative z-10 flex flex-row md:flex-col w-full h-full">

          {/* IMAGE */}
          <div className="relative w-40 sm:w-48 h-auto min-h-[160px] md:h-56 md:w-full shrink-0 p-2">
            <div className="relative w-full h-full overflow-hidden rounded-xl">
              {data?.sponsored && <SponsoredRibbon />}
              <Image
                src={data?.image || "/big_card_car.jpg"}
                alt={data?.title || "Vehicle"}
                fill
                className="object-cover transition-transform duration-500 group-hover/card:scale-110"
              />
            </div>

            {/* Inspection badge overlay (bottom-left of image) */}
            {data?.inspectionBadgeUrl && (
              <div className="absolute top-3 right-3 w-8 h-8 rounded-full overflow-hidden border-2 border-white/20 shadow-md">
                <Image
                  src={data.inspectionBadgeUrl}
                  alt="Inspection Badge"
                  fill
                  className="object-cover"
                />
              </div>
            )}
          </div>

          {/* CONTENT */}
          <div className="flex flex-col flex-1 p-3 md:p-4 space-y-2.5 justify-between">

            {/* TITLE + WISHLIST */}
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <h3 className="text-sm md:text-base font-bold line-clamp-2">
                  {data?.title || "-"}
                </h3>
                <p className="text-xs text-primary/70 mt-0.5 flex items-center gap-1">
                  <MapPinned className="w-3.5 h-3.5 shrink-0" />
                  {data?.location || "Location not set"}
                </p>
              </div>

              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className="w-8 h-8 rounded-full bg-primary/10 hover:bg-primary/20 flex items-center justify-center cursor-pointer transition-all shrink-0"
              >
                <Heart className={`w-5 h-5 ${isFavorite ? "fill-red-500 text-red-500" : "text-primary"}`} />
              </button>
            </div>

            {/* SPECS */}
            <div className="grid grid-cols-2 md:flex md:flex-wrap gap-x-3 gap-y-1.5 text-[10px] md:text-xs text-primary/75 font-medium">
              <span className="flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-primary/40 hidden md:block" />
                {data?.year || "-"}
              </span>
              <span className="flex items-center gap-1.5">
                <Settings2 className="w-3.5 h-3.5" />
                {data?.transmission || "-"}
              </span>
              <span className="flex items-center gap-1.5">
                <Fuel className="w-3.5 h-3.5" />
                {data?.fuel || "-"}
              </span>
              <span className="flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5" />
                {data?.ownership || "-"}
              </span>
            </div>

            {/* Verification Status + Consultant */}
            <div className="flex flex-wrap items-center gap-2">
              {verification && (
                <span className={`flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full font-semibold ${verification.cls}`}>
                  {verification.icon} {verification.label}
                </span>
              )}
              {data?.consultantName && (
                <span className="text-[10px] text-primary/50 truncate">
                  via {data.consultantName}
                </span>
              )}
            </div>

            {/* LIVE — inquiries & chats */}
            {status === "live" && (
              <div className="text-xs text-primary/70 flex gap-4">
                <span>👁 {inquiries ?? 0} Inquiries</span>
                <span>💬 {chats ?? 0} Chats</span>
              </div>
            )}

            {/* SOLD — closing price */}
            {status === "sold" && data?.closingPrice && (
              <p className="text-xs text-green-400 font-semibold">
                Closed at: ₹ {data.closingPrice}
              </p>
            )}

            {/* DRAFT notice */}
            {status === "draft" && (
              <p className="text-xs text-yellow-400/80">
                This listing is not yet published.
              </p>
            )}

            {/* BOTTOM — price + actions */}
            <div className="mt-auto space-y-2">
              <div className="flex items-center justify-between gap-2 border-t border-white/5 pt-2">
                <h3 className="text-sm md:text-lg font-bold text-third">
                  ₹ {data?.price || "-"}
                </h3>
                <Button href={`/vehicle/details/${data.id}`} variant="roundedOutline" size="sm" className="w-8 h-8 p-0">
                  <ArrowUpRight size={16} />
                </Button>
              </div>

              {status === "live" && (
                <div className="flex flex-col md:flex-row gap-2">
                  <Button variant="ghost" size="sm" showIcon={false} onClick={() => setIsDownloadOpen(true)}>
                    <Pencil size={14} className="mr-2" /> Improve Listing
                  </Button>
                  <Button onClick={() => handleSoldClick(data.id)} variant="ghost" size="sm" showIcon={false}>
                    <CheckCircle size={14} className="mr-2" /> Mark Sold
                  </Button>
                </div>
              )}

              {status === "draft" && (
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" showIcon={false}>
                    <Pencil size={14} className="mr-2" /> Edit Draft
                  </Button>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
      <DownloadAppPopup isOpen={isDownloadOpen} onClose={() => setIsDownloadOpen(false)} />
    </>
  );
}