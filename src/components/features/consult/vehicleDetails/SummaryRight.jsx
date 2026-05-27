"use client";

import Button from "@/components/ui/button";
import DownloadAppPopup from "@/components/ui/DownloadAppPopup";
import { getInspectionPriceAndCountQuery } from "@/queries/inspection.queries";
import { Star, MapPin, CheckCircle, Loader2, Pencil } from "lucide-react";
import { useEffect, useState } from "react";


export default function SummaryRight({
  vehicle,
  summary,
  onRequestInspection,
  isCheckingInspection,
}) {
  const vehicleId = vehicle?.id;
  const vehicleOwnerRole = vehicle?.vehicleOwner?.userRole || "USER";
  const [prevTotalInquiryCount, setPrevTotalInquiryCount] = useState(
    vehicle?.totalInquiryCount || 0,
  );
  const [localInquiryCount, setLocalInquiryCount] = useState(
    vehicle?.totalInquiryCount || 0,
  );

  const [isDownloadOpen, setIsDownloadOpen] = useState(false);

  if (vehicle?.totalInquiryCount !== prevTotalInquiryCount) {
    setPrevTotalInquiryCount(vehicle?.totalInquiryCount);
    setLocalInquiryCount(vehicle?.totalInquiryCount || 0);
  }

  return (
    <>
      <aside className="relative text-primary rounded-2xl shadow-xl overflow-hidden border border-third/60">
        <div className="relative z-10 p-6 space-y-5">
          {/* HEADER */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-md text-third">
                Register {vehicle?.yearOfMfg || "-"}
              </p>

              <h2 className="hidden text-2xl font-bold leading-tight">
                {[vehicle?.makerName, vehicle?.modelName, vehicle?.variantName]
                  .filter(Boolean)
                  .join(" ") || "-"}
              </h2>
            </div>

            <Button
              variant="ghost"
              onClick={() => setIsDownloadOpen(true)}
              size="sm"
            >
              <Pencil size={14} className="mr-2" /> Edit
            </Button>
          </div>

          <div className="border-t border-third/40" />

          {/* SELLER / DEALER INFO */}
          <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4">
            <div className="space-y-2 w-full">
              {/* Seller name: consultation name OR vehicle owner firstname+lastname */}
              <h3 className="text-md font-semibold">
                {vehicleOwnerRole === "CONSULTATION"
                  ? summary?.consultationName || "Auto Consultant"
                  : [
                      vehicle?.vehicleOwner?.firstname,
                      vehicle?.vehicleOwner?.lastname,
                    ]
                      .filter(Boolean)
                      .join(" ") || "Private Seller"}
              </h3>

              {vehicleOwnerRole === "CONSULTATION" ? (
                /* ── CONSULTATION-ONLY stats ── */
                <div className="flex justify-between items-start pt-1 gap-2">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-sm">
                      <Star className="text-yellow-400" size={16} />
                      <span className="font-medium text-primary">
                        {summary?.averageRating || 0}
                      </span>
                      <span className="text-third">
                        | {summary?.soldVehiclesCount || 0} Sold Vehicles
                      </span>
                    </div>

                    <p className="flex items-start gap-2 text-sm text-third">
                      <MapPin size={14} className="mt-0.5 shrink-0" />
                      <span className="line-clamp-2">
                        {summary?.address
                          ? `${summary.address.city}, ${summary.address.state}`
                          : "Location not available"}
                      </span>
                    </p>
                  </div>
                </div>
              ) : (
                /* ── NORMAL USER_SELLER info ── */
                <div className="space-y-2 pt-1">
                  {(vehicle?.vehicleAddress?.city ||
                    vehicle?.vehicleAddress?.state) && (
                    <p className="flex items-start gap-2 text-sm text-third">
                      <MapPin size={14} className="mt-0.5 shrink-0" />
                      <span className="line-clamp-2">
                        {[
                          vehicle.vehicleAddress.city,
                          vehicle.vehicleAddress.state,
                        ]
                          .filter(Boolean)
                          .join(", ")}
                      </span>
                    </p>
                  )}
                </div>
              )}

              {/* Services — only shown for consultants */}
              {vehicleOwnerRole === "CONSULTATION" && (
                <div className="space-y-2 mt-4">
                  <p className="text-sm font-medium text-primary">
                    Whats Included
                  </p>

                  <ul className="text-sm text-third">
                    {summary?.services?.length > 0 ? (
                      summary.services.map((service, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <CheckCircle size={14} className="text-green-500" />
                          {service.replaceAll("_", " ")}
                        </li>
                      ))
                    ) : (
                      <li className="flex items-center gap-2">
                        <CheckCircle size={14} className="text-green-500" />
                        No services listed
                      </li>
                    )}
                  </ul>
                </div>
              )}
            </div>
          </div>

          <div className="border-t border-third/40" />

          <div className="space-y-2">
            {(() => {
              const MAX_INQUIRIES = 15;
              const inquiries = localInquiryCount;

              const safeValue = Math.min(inquiries, MAX_INQUIRIES);
              let percentage = (safeValue / MAX_INQUIRIES) * 100;

              if (inquiries > 0 && percentage < 12) {
                percentage = 12;
              }

              return (
                <>
                  <div className="flex justify-between text-sm">
                    <span className="text-third">Current Inquiries</span>
                    <span className="font-semibold text-primary">
                      {inquiries}
                    </span>
                  </div>

                  <div className="w-full h-2 bg-third/30 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>

                  <p className="text-sm text-third">
                    {inquiries >= MAX_INQUIRIES
                      ? "Very high demand – Almost booked!"
                      : inquiries > 10
                        ? "High demand – Book soon!"
                        : inquiries > 0
                          ? "Getting attention"
                          : "Available now"}
                  </p>
                </>
              );
            })()}
          </div>

          <div className="border-t border-third/40" />

          {/* ACTION BUTTONS (DESKTOP) */}
          <div className="hidden lg:grid grid-cols-2 gap-3 pt-2">
            <Button
              variant="ghost"
              size="sm"
              showIcon={false}
              className="rounded-full"
              onClick={onRequestInspection}
              loading={isCheckingInspection}
            >
              Request Inspection
            </Button>

            <Button variant="outline" size="sm" showIcon={false}>
              Boost Listing
            </Button>
          </div>
        </div>
      </aside>

      {/* MOBILE STICKY BOTTOM BAR */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-secondary/95 border-t border-third/20 p-3 px-4 flex items-center justify-between lg:hidden backdrop-blur-md  shadow-[0_-10px_25px_rgba(0,0,0,0.15)]">
        <div className="flex flex-col">
          <p className="text-third text-[10px] uppercase tracking-wider font-semibold">
            Price
          </p>
          <p className="text-xl font-bold text-primary leading-tight">
            ₹{vehicle?.price?.toLocaleString("en-IN") || "0"}
          </p>
        </div>

        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            showIcon={false}
            className=""
            onClick={onRequestInspection}
            loading={isCheckingInspection}
          >
            Request Inspection
          </Button>

          <Button variant="outline" size="sm" showIcon={false} className="">
            Boost Listing
          </Button>
        </div>
      </div>

      <DownloadAppPopup
        isOpen={isDownloadOpen}
        onClose={() => setIsDownloadOpen(false)}
      />
    </>
  );
}
