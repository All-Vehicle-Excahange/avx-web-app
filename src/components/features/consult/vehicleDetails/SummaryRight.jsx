"use client";

import Button from "@/components/ui/button";
import DownloadAppPopup from "@/components/ui/DownloadAppPopup";
import { getInspectionPriceAndCountQuery } from "@/queries/inspection.queries";
import { getActiveInspectionQuery } from "@/queries/vehicle.queries";
import { Star, MapPin, CheckCircle, Loader2, Pencil } from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import InspectionTrackingModal from "@/components/features/user/InspectionTrackingModal";
import InspectionRequestModal from "@/components/features/user/InspectionRequestModal";

export default function SummaryRight({ vehicle, summary }) {
  const queryClient = useQueryClient();
  const vehicleId = vehicle?.id;
  const vehicleOwnerRole = vehicle?.vehicleOwner?.userRole || "USER";
  const [prevTotalInquiryCount, setPrevTotalInquiryCount] = useState(
    vehicle?.totalInquiryCount || 0,
  );
  const [localInquiryCount, setLocalInquiryCount] = useState(
    vehicle?.totalInquiryCount || 0,
  );

  const [isDownloadOpen, setIsDownloadOpen] = useState(false);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [trackingInspection, setTrackingInspection] = useState(null);
  const [animateTrackingModal, setAnimateTrackingModal] = useState(false);
  const [isCheckingInspection, setIsCheckingInspection] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleOpenTracking = (data) => {
    setTrackingInspection(data);
    setTimeout(() => setAnimateTrackingModal(true), 10);
  };

  const handleCloseTracking = () => {
    setAnimateTrackingModal(false);
    setTimeout(() => {
      setTrackingInspection(null);
    }, 300);
  };

  const handleRequestInspection = async () => {
    if (!vehicleId) {
      toast.error("Vehicle information is not available.");
      return;
    }
    setIsCheckingInspection(true);
    try {
      const data = await queryClient.fetchQuery(
        getActiveInspectionQuery(vehicleId),
      );
      if (data) {
        if (data.inspectionRequestStatus === "PAYMENT_PENDING") {
          setShowRequestModal(true);
        } else {
          handleOpenTracking(data);
        }
      } else {
        setShowRequestModal(true);
      }
    } catch (error) {
      if (error?.response?.status === 404 || error?.status === 404) {
        setShowRequestModal(true);
      } else {
        toast.error(
          error?.response?.data?.message ||
            "Failed to check inspection status.",
        );
      }
    } finally {
      setIsCheckingInspection(false);
    }
  };

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
              {vehicleOwnerRole === "CONSULTATION" ? (
                <>
                  <span className="text-xs uppercase tracking-[0.1em] text-fourth font-bold block mb-1">
                    Listed By Auto Consultant
                  </span>
                  <h3 className="text-xl font-bold text-primary">
                    {summary?.consultationName || "Auto Consultant"}
                  </h3>
                </>
              ) : (
                <>
                  <span className="text-xs uppercase tracking-[0.1em] text-third font-medium block mb-1">
                    Private Seller
                  </span>
                  <h3 className="text-xl font-bold text-primary">
                    {[
                      vehicle?.vehicleOwner?.firstname,
                      vehicle?.vehicleOwner?.lastname,
                    ]
                      .filter(Boolean)
                      .join(" ") || "Individual Seller"}
                  </h3>
                </>
              )}

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
                    Services Offered
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

                  <p 
                    className={`text-sm font-medium ${
                      inquiries >= MAX_INQUIRIES
                        ? "text-red-500"
                        : inquiries > 10
                          ? "text-orange-500"
                          : inquiries > 0
                            ? "text-green-500"
                            : "text-primary"
                    }`}
                  >
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
              onClick={handleRequestInspection}
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
            onClick={handleRequestInspection}
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

      {mounted && typeof document !== "undefined"
        ? createPortal(
            <>
              <InspectionRequestModal
                isOpen={showRequestModal}
                onClose={() => setShowRequestModal(false)}
                vehicle={vehicle}
                initialInspectionType="report"
              />

              {trackingInspection && (
                <InspectionTrackingModal
                  inspection={trackingInspection}
                  onClose={handleCloseTracking}
                  animateModal={animateTrackingModal}
                />
              )}
            </>,
            document.body,
          )
        : null}
    </>
  );
}
