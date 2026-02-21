"use client";

import { useState } from "react";
import SponsoredRibbon from "@/components/ui/const/SponsoredRibbonMain";
import {
  Fuel,
  Heart,
  MapPinned,
  Settings2,
  Star,
  Users,
  CheckCircle,
  Pencil,
  AlertTriangle,
  Smartphone,
  ArrowUpRight,
} from "lucide-react";
import Button from "@/components/ui/button";
import Image from "next/image";

export default function UserVehicleCard({
                                          data,
                                          status = "live",
                                          avxInspected = false,
                                          inquiries = 0,
                                          chats = 0,
                                          soldDate,
                                          showBoostButton = false,
                                        }) {
  const [isFavorite, setIsFavorite] = useState(false);

  const statusBg = {
    live: "bg-green-600",
    sold: "bg-gray-600",
    draft: "bg-yellow-500",
    underinspection: "bg-orange-500",
  };

  return (
      <div className="group/card relative flex flex-row md:flex-col rounded-2xl overflow-hidden text-primary md:max-w-sm w-full border-2 border-third/60 hover:shadow-[0_20px_60px_rgba(255,255,255,0.25)] transition-shadow duration-300">

        {/* STATUS */}
        <div className="absolute top-2 left-2 z-30">
          <div
              className={`py-1 px-4 rounded-full text-[11px] font-bold text-white shadow-sm ${statusBg[status]}`}
          >
            {status?.toUpperCase() || "-"}
          </div>
        </div>

        {/* AVX BADGE */}
        {avxInspected && (
            <div className="absolute top-2 right-2 z-30 px-3 py-1 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center gap-1">
              AVX Inspected <CheckCircle size={14} />
            </div>
        )}

        <div className="relative z-10 flex flex-row md:flex-col w-full h-full">

          {/* IMAGE */}
          <div className="relative w-32 sm:w-40 min-h-40 md:h-60 md:w-full shrink-0 p-2">
            <div className="relative w-full h-full overflow-hidden rounded-xl">
              {data?.sponsored && <SponsoredRibbon />}

              <Image
                  src={data?.image || "/big_card_car.jpg"}
                  alt={data?.title || "Vehicle"}
                  fill
                  className="object-cover transition-transform duration-500 group-hover/card:scale-110"
              />
            </div>
          </div>

          {/* CONTENT */}
          <div className="flex flex-col flex-1 p-3 md:p-4 space-y-3 justify-between">

            {/* TITLE */}
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <h3 className="text-sm md:text-lg font-bold line-clamp-2">
                  {data?.title || "-"}
                </h3>

                <p className="text-xs text-primary/80 mt-1 flex items-center gap-1">
                  <MapPinned className="w-3.5 h-3.5" />
                  {data?.location || "-"}
                </p>
              </div>

              <button
                  onClick={() => setIsFavorite(!isFavorite)}
                  className="w-8 h-8 rounded-full bg-primary/10 hover:bg-primary/20 flex items-center justify-center transition-all"
              >
                <Heart
                    className={`w-5 h-5 ${
                        isFavorite ? "fill-red-500 text-red-500" : "text-primary"
                    }`}
                />
              </button>
            </div>

            {/* SPECS */}
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-primary/80 font-medium">
              <span>{data?.year || "-"}</span>

              <span className="flex items-center gap-1">
              <Settings2 className="w-4 h-4" />
                {data?.transmission || "-"}
            </span>

              <span className="flex items-center gap-1">
              <Fuel className="w-4 h-4" />
                {data?.fuel || "-"}
            </span>

              <span className="flex items-center gap-1">
              <Users className="w-4 h-4" />
                {data?.seats || "-"}
            </span>

              <span className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-primary text-primary" />
                {data?.rating || "-"}
            </span>
            </div>

            {/* LIVE INFO */}
            {status === "live" && (
                <div className="text-xs text-primary/80 flex gap-4">
                  <span>👁 {inquiries ?? 0} Inquiries</span>
                  <span>💬 {chats ?? 0} Chats</span>
                </div>
            )}

            {/* SOLD */}
            {status === "sold" && (
                <p className="text-xs text-third">
                  Sold on: {soldDate || "-"}
                </p>
            )}

            {/* BOTTOM */}
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-sm md:text-xl font-bold">
                  ₹ {data?.price || "-"}
                </h3>

                <Button variant="roundedOutline" size="sm">
                  <ArrowUpRight />
                </Button>
              </div>

              {status === "live" && (
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" showIcon={false}>
                      <Pencil size={14} className="mr-2" /> Edit
                    </Button>

                    <Button variant="ghost" size="sm" showIcon={false}>
                      <CheckCircle size={14} className="mr-2" /> Mark Sold
                    </Button>
                  </div>
              )}
            </div>

          </div>
        </div>
      </div>
  );
}