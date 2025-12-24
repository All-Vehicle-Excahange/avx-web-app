import { useState } from "react";
import SponsoredRibbon from "@/components/ui/const/SponsoredRibbonMain";
import {
  Fuel,
  Heart,
  MapPinned,
  Settings2,
  Star,
  User,
  Users,
  CheckCircle,
  Pencil,
} from "lucide-react";
import Button from "@/components/ui/button";
import Image from "next/image";

export default function UserVehicleCard({
  data,
  status = "live", // live | sold | draft
  avxInspected = false,
  inquiries = 0,
  chats = 0,
  soldDate,
}) {
  const [isFavorite, setIsFavorite] = useState(false);

  const statusBg = {
    live: "bg-green-600",
    sold: "bg-gray-600",
    draft: "bg-[#F4CE14]",
  };

  return (
    <div
      className="
      group/card relative flex flex-row md:flex-col
      rounded-2xl overflow-hidden
      bg-secondary/90 text-primary
      md:max-w-sm w-[392px]
      border-2 border-third/60 py-2
    "
    >
      {/* STATUS PILL */}
      <div className="absolute top-2 left-2 z-20 overflow-hidden pointer-events-none">
        <div
          className={`py-1 px-4 shadow-sm text-center rounded-full tracking-wide text-[11px] font-semibold ${statusBg[status]} text-white`}
        >
          {status.toUpperCase()}
        </div>
      </div>

      {/* AVX BADGE */}
      {avxInspected && (
        <div className="absolute top-3 right-3 z-20 px-3 py-1 rounded-full bg-blue-600 text-white-400 text-xs font-bold flex items-center gap-1">
          AVX Inspected <CheckCircle size={14} />
        </div>
      )}

      {/* BLUR BG */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[url('/bg_blur.jpg')] bg-cover bg-center opacity-40 blur-lg" />
      </div>

      {/* CONTENT */}
      <div className="relative z-10 flex flex-row md:flex-col w-full h-full">
        {/* Image */}
        <div className="relative w-32 sm:w-40 min-h-40 md:h-62 md:w-full shrink-0 overflow-hidden">
          {data.sponsored && <SponsoredRibbon />}
          <Image
            src={data.image}
            alt={data.title}
            fill
            className="h-full w-full object-cover"
          />
        </div>

        {/* BODY */}
        <div className="flex flex-col flex-1 p-2.5 md:p-4 space-y-2 md:space-y-4 justify-between">
          {/* Title */}
          <div className="flex justify-between items-start gap-2">
            <div>
              <h3 className="text-xs md:text-xl font-bold">{data.title}</h3>
              <p className="text-[9px] md:text-xs flex items-center gap-1 text-primary/90">
                <User className="w-3 h-3" />{" "}
                {data.userName || "Nihal Chaudhary"}
              </p>
              <p className="text-[9px] md:text-xs flex items-center gap-1 text-primary/90">
                <MapPinned className="w-3 h-3" />{" "}
                {data.location || "Chhapi, Gujarat"}
              </p>
            </div>
            <h3 className="text-xs md:text-xl font-bold">₹ {data.price}</h3>
          </div>

          {/* Specs */}
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-[10px] md:text-[11px] text-primary/70">
            <span>{data.year}</span>
            <span className="flex items-center gap-1">
              <Settings2 className="w-3 h-3" />
              {data.transmission}
            </span>
            <span className="flex items-center gap-1">
              <Fuel className="w-3 h-3" />
              {data.fuel}
            </span>
            <span className="flex items-center gap-1">
              <Users className="w-3 h-3" />
              {data.seats}
            </span>
            <span className="flex items-center gap-1">
              <Star className="w-3 h-3 fill-primary" />
              {data.rating}
            </span>
          </div>

          {/* ACTIVITY */}
          {status === "live" && (
            <div className="text-xs text-primary/80 flex gap-4">
              <span>👁 {inquiries} Inquiries</span>
              <span>💬 {chats} Active Chats</span>
            </div>
          )}

          {status === "draft" && (
            <p className="text-xs text-yellow-400">
              This listing is in draft mode and not visible to buyers.
            </p>
          )}

          {status === "sold" && (
            <p className="text-xs text-third">Sold on: {soldDate}</p>
          )}

          {/* CTA */}
          <div className="space-y-2">
            <div className="flex items-center justify-between mb-4">
              <Button variant="outline" size="sm">
                View More
              </Button>

              <button
                onClick={() => setIsFavorite(!isFavorite)}
                aria-label={isFavorite ? "Remove favorite" : "Add to favorites"}
                className="w-8 h-8 border border-third/60 rounded-full flex items-center justify-center"
              >
                <Heart
                  className={
                    isFavorite ? "fill-red-500 text-red-500" : "text-primary"
                  }
                />
              </button>
            </div>

            {status === "live" && (
              <div className="flex gap-2">
                <Button variant="ghost" showIcon={false} size="sm">
                  <Pencil size={14}  className="mr-2"/> Edit
                </Button>
                <Button variant="ghost" showIcon={false} size="sm">
                  <CheckCircle size={14} className="mr-2" /> Mark as Sold
                </Button>
              </div>
            )}

            {status === "draft" && (
              <div className="flex gap-2">
                <Button variant="ghost" size="sm">
                  Publish Listing
                </Button>
                <Button variant="ghost" size="sm">
                  Edit Draft
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
