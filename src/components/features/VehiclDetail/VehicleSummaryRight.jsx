"use client";

import Button from "@/components/ui/button";
import { Star, MapPin, Loader2, ExternalLink, Pencil } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { useAuthStore } from "@/stores/useAuthStore";
import LoginPopup from "@/components/auth/LoginPopup";
import SendInquaryPopup from "./SendInquaryPopup";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getInquiryEligibilityQuery } from "@/queries/vehicle.queries";
import SignupPopup from "@/components/auth/SignupPopup";
import DownloadAppPopup from "@/components/ui/DownloadAppPopup";
import RequestAlredySentPopup from "./RequestAlredySentPopup";
import Link from "next/link";
import { useRouter } from "next/router";
import { trackInquiryClick } from "@/lib/gtag";
import { customEvent } from "@/lib/fpixel";

export default function VehicleSummaryRight({
  vehicle,
  summary,
  adId,
  sponsored,
  billingType,
  onRequestInspection,
  isCheckingInspection,
}) {
  const queryClient = useQueryClient();
  const { push } = useRouter();
  const vehicleId = vehicle?.id;
  const vehicleOwnerRole = vehicle?.vehicleOwner?.userRole || "USER";
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [isDownloadOpen, setIsDownloadOpen] = useState(false);
  const [isAlreadySentOpen, setIsAlreadySentOpen] = useState(false);
  const [inquiryStatus, setInquiryStatus] = useState(null);
  const [localInquiryCount, setLocalInquiryCount] = useState(
    vehicle?.totalInquiryCount || 0,
  );

  const [loading, setLoading] = useState(false);
  const pendingAction = useRef(null);
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const user = useAuthStore((state) => state.user);

  const isOwner = Boolean(
    user &&
    (
      (user?.id && vehicle?.vehicleOwner?.id && String(user.id) === String(vehicle.vehicleOwner.id)) ||
      (user?.id && vehicle?.userId && String(user.id) === String(vehicle.userId)) ||
      (user?.consultantId && vehicle?.consultantId && String(user.consultantId) === String(vehicle.consultantId)) ||
      (user?.consultationId && vehicle?.consultantId && String(user.consultationId) === String(vehicle.consultantId)) ||
      (user?.id && vehicle?.consultantId && String(user.id) === String(vehicle.consultantId)) ||
      (user?.id && vehicle?.consultationId && String(user.id) === String(vehicle.consultationId)) ||
      (user?.phone && vehicle?.vehicleOwner?.phone && user.phone === vehicle.vehicleOwner.phone) ||
      (user?.mobile && vehicle?.vehicleOwner?.phone && user.mobile === vehicle.vehicleOwner.phone) ||
      (user?.phoneNumber && vehicle?.vehicleOwner?.phone && user.phoneNumber === vehicle.vehicleOwner.phone)
    )
  );

  useEffect(() => {
    console.log("=== VehicleSummaryRight Owner Debug ===", {
      user,
      userId: user?.id,
      userConsultantId: user?.consultantId || user?.consultationId,
      userPhone: user?.phone || user?.mobile || user?.phoneNumber,
      vehicleOwner: vehicle?.vehicleOwner,
      vehicleOwnerId: vehicle?.vehicleOwner?.id,
      vehicleUserId: vehicle?.userId,
      vehicleConsultantId: vehicle?.consultantId || vehicle?.consultationId,
      vehicleOwnerPhone: vehicle?.vehicleOwner?.phone,
      isOwnerResult: isOwner,
    });
  }, [user, vehicle, isOwner]);

  const {
    data: eligibilityData,
    refetch: refetchEligibility,
    isFetching: isCheckingInquiry,
  } = useQuery({
    ...getInquiryEligibilityQuery(vehicleId),
    enabled: !!vehicleId && isLoggedIn,
  });

  const hasActiveInquiry = eligibilityData &&
    eligibilityData.inquiryStatus !== "CLOSED_BY_VEHICLE_OWNER" &&
    eligibilityData.inquiryStatus !== "CLOSED_BY_INQUIRER";

  useEffect(() => {
    setLocalInquiryCount(vehicle?.totalInquiryCount || 0);
  }, [vehicle?.totalInquiryCount]);

  const handleInquirySuccess = () => {
    setLocalInquiryCount((prev) => prev + 1);

    // Invalidate inquiry caches to reflect the new inquiry elsewhere immediately
    queryClient.invalidateQueries({ queryKey: ["inquiries"] });
    queryClient.invalidateQueries({ queryKey: ["my-inquiries"] });
    queryClient.invalidateQueries({ queryKey: ["inquiries-infinite"] });
    queryClient.invalidateQueries({ queryKey: ["my-inquiries-infinite"] });

    // Refresh eligibility state so it knows we have an active inquiry
    refetchEligibility();
  };

  const handleRequestInquiry = async () => {
    if (!vehicleId) return;

    // Track GA4 inquire_initiated Event
    const vehicleName = `${vehicle?.yearOfMfg || ""} ${vehicle?.makerName || ""} ${vehicle?.modelName || ""} ${vehicle?.variantName || ""}`.trim();
    trackInquiryClick({
      vehicle_id: vehicleId,
      vehicle_name: vehicleName || "Vehicle Details",
      seller_type: vehicle?.sellerType || vehicleOwnerRole,
    });

    customEvent("Inquiry", {
      content_type: "vehicle",
      content_ids: [String(vehicleId)],
      content_name: vehicleName || "Vehicle Details",
      seller_type: vehicle?.sellerType || vehicleOwnerRole || "",
    });

    setLoading(true);
    try {
      let data = eligibilityData;
      if (data === undefined || data === null) {
        const refetched = await refetchEligibility();
        data = refetched.data;
      }

      if (
        data === null ||
        data?.inquiryStatus === "CLOSED_BY_VEHICLE_OWNER" ||
        data?.inquiryStatus === "CLOSED_BY_INQUIRER"
      ) {
        setIsPopupOpen(true);
      } else {
        setInquiryStatus(data?.inquiryStatus || "PENDING");
        setIsAlreadySentOpen(true);
      }
    } catch (error) {
      console.error("Error checking inquiry eligibility:", error);
      setIsPopupOpen(true); // Fallback
    } finally {
      setLoading(false);
    }
  };

  const handleAuthSuccess = () => {
    setIsLoginOpen(false);
    setIsSignupOpen(false);
    if (pendingAction.current === "request") {
      pendingAction.current = null;
      handleRequestInquiry();
    }
  };

  useEffect(() => {
    if (isLoggedIn && pendingAction.current === "request") {
      pendingAction.current = null;
      handleRequestInquiry();
    }
  }, [isLoggedIn]);

  return (
    <>
      <aside className="relative text-primary rounded-2xl shadow-xl overflow-hidden border border-third/60">
        <div className="relative z-10 p-6 space-y-4">
          {/* HEADER + SELLER INFO — unified block with even spacing */}
          <div className="flex flex-col gap-3">

            {vehicleOwnerRole === "CONSULTATION" ? (
              <>
                {/* Label row + Visit Storefront + Edit button on same line */}
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs uppercase tracking-[0.1em] text-fourth font-bold">
                    Listed By Auto Consult
                  </span>
                  <div className="flex items-center gap-2">
                    {isOwner && (
                      <Button
                        variant="ghost"
                        onClick={() => setIsDownloadOpen(true)}
                        size="sm"
                        className="py-1 px-2.5 text-xs border border-white/20 hover:bg-white/10 rounded-lg flex items-center gap-1"
                      >
                        <Pencil size={12} className="mr-0.5" /> Edit
                      </Button>
                    )}
                    {summary?.consultationName && (
                      <Link
                        href={`/auto-consultant/${summary?.username || 1}`}
                        className="text-xs text-white font-semibold underline underline-offset-2 decoration-blue-400/70 hover:decoration-blue-400 transition-all flex items-center gap-0.5 shrink-0"
                      >
                        Visit Storefront
                        <ExternalLink size={11} className="inline" />
                      </Link>
                    )}
                  </div>
                </div>

                {/* Consultant name — clickable → storefront */}
                <Link
                  href={`/auto-consultant/${summary?.username || 1}`}
                  className="text-xl font-bold text-primary leading-tight -mt-1 hover:underline underline-offset-2 decoration-primary/50 transition-all capitalize"
                >
                  {summary?.consultationName || "Auto Consultant"}
                </Link>

                {/* Stats row */}
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
              </>
            ) : (
              <>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs uppercase tracking-[0.1em] text-third font-medium">
                    Private Seller
                  </span>
                  {isOwner && (
                    <Button
                      variant="ghost"
                      onClick={() => setIsDownloadOpen(true)}
                      size="sm"
                      className="py-1 px-2.5 text-xs border border-white/20 hover:bg-white/10 rounded-lg flex items-center gap-1"
                    >
                      <Pencil size={12} className="mr-0.5" /> Edit
                    </Button>
                  )}
                </div>
                <p className="text-xl font-bold text-primary leading-tight -mt-1">
                  {[
                    vehicle?.vehicleOwner?.firstname,
                    vehicle?.vehicleOwner?.lastname,
                  ]
                    .filter(Boolean)
                    .join(" ") || "Individual Seller"}
                </p>
                {(vehicle?.vehicleAddress?.city || vehicle?.vehicleAddress?.state) && (
                  <p className="flex items-start gap-2 text-sm text-third">
                    <MapPin size={14} className="mt-0.5 shrink-0" />
                    <span className="line-clamp-2">
                      {[
                        vehicle.vehicleAddress.town,
                        vehicle.vehicleAddress.city,
                        vehicle.vehicleAddress.state,
                      ]
                        .filter(Boolean)
                        .join(", ")}
                    </span>
                  </p>
                )}
              </>
            )}

            <h2 className="hidden text-2xl font-bold leading-tight">
              {[vehicle?.makerName, vehicle?.modelName, vehicle?.variantName]
                .filter(Boolean)
                .join(" ") || "-"}
            </h2>
          </div>

          {/* Services — only shown for consultants */}
          {vehicleOwnerRole === "CONSULTATION" && (
            <div className="space-y-2">
              <p className="text-sm font-medium text-primary">
                Services Offered
              </p>
              <div className="flex flex-wrap gap-2">
                {summary?.services?.length > 0 ? (
                  summary.services.map((service, index) => (
                    <span
                      key={index}
                      className="text-xs py-1 px-3 rounded-full border border-third/40 bg-primary/5 text-third font-medium whitespace-nowrap"
                    >
                      {service
                        .replaceAll("_", " ")
                        .toLowerCase()
                        .replace(/\b\w/g, (c) => c.toUpperCase())}
                    </span>
                  ))
                ) : (
                  <span className="text-xs text-third">-</span>
                )}
              </div>
            </div>
          )}


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
                    className={`text-sm font-medium ${inquiries >= MAX_INQUIRIES
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
          <div className={`hidden lg:${isOwner ? "grid grid-cols-2" : "flex justify-end"} gap-2 pt-2`}>
            {isOwner ? (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  showIcon={false}
                  className="rounded-full"
                  onClick={onRequestInspection || (() => setIsDownloadOpen(true))}
                  loading={isCheckingInspection}
                >
                  Request Inspection
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  showIcon={false}
                  onClick={() => push(`/consult/dashboard/ads/create?vehicleId=${vehicleId}`)}
                >
                  Boost Listing
                </Button>
              </>
            ) : (
              <>
                {!hasActiveInquiry && (
                  <Button
                    variant="ghost"
                    size="sm"
                    showIcon={false}
                    className="rounded-full"
                    loading={loading || isCheckingInquiry}
                    disabled={vehicle?.isVehicleSold}
                    onClick={() => {
                      if (!isLoggedIn) {
                        pendingAction.current = "request";
                        setIsLoginOpen(true);
                      } else {
                        handleRequestInquiry();
                      }
                    }}
                  >
                    {vehicle?.isVehicleSold ? "Sold Out" : "Send Inquiry"}
                  </Button>
                )}

                {hasActiveInquiry && (
                  <Button
                    variant="outline"
                    size="sm"
                    showIcon={false}
                    onClick={() => setIsDownloadOpen(true)}
                  >
                    {vehicleOwnerRole === "CONSULTATION" ? "Chat with Consult" : "Chat with Seller"}
                  </Button>
                )}
              </>
            )}
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
          {isOwner ? (
            <>
              <Button
                variant="ghost"
                size="sm"
                showIcon={false}
                onClick={onRequestInspection || (() => setIsDownloadOpen(true))}
                loading={isCheckingInspection}
              >
                Request Inspection
              </Button>

              <Button
                variant="outline"
                size="sm"
                showIcon={false}
                onClick={() => push(`/consult/dashboard/ads/create?vehicleId=${vehicleId}`)}
              >
                Boost
              </Button>
            </>
          ) : (
            <>
              {!hasActiveInquiry && (
                <Button
                  variant="ghost"
                  size="sm"
                  showIcon={false}
                  loading={loading || isCheckingInquiry}
                  onClick={() => {
                    if (!isLoggedIn) {
                      pendingAction.current = "request";
                      setIsLoginOpen(true);
                    } else {
                      handleRequestInquiry();
                    }
                  }}
                >
                  Request Vehicle
                </Button>
              )}

              {hasActiveInquiry && (
                <Button
                  variant="outline"
                  size="sm"
                  showIcon={false}
                  onClick={() => setIsDownloadOpen(true)}
                >
                  {vehicleOwnerRole === "CONSULTATION" ? "Chat with Consult" : "Chat with Seller"}
                </Button>
              )}
            </>
          )}
        </div>
      </div>

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
      {isPopupOpen && (
        <SendInquaryPopup
          onClose={() => setIsPopupOpen(false)}
          consultName={summary?.consultationName}
          vehicleId={vehicleId}
          vehicle={vehicle}
          onSuccess={handleInquirySuccess}
          adId={adId}
          sponsored={sponsored}
          billingType={billingType}
        />
      )}
      {isAlreadySentOpen && (
        <RequestAlredySentPopup
          onClose={() => setIsAlreadySentOpen(false)}
          status={inquiryStatus}
        />
      )}
      <DownloadAppPopup
        isOpen={isDownloadOpen}
        onClose={() => setIsDownloadOpen(false)}
      />
    </>
  );
}
