"use client";

import Button from "@/components/ui/button";
import { Star, MapPin, Loader2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { useAuthStore } from "@/stores/useAuthStore";
import LoginPopup from "@/components/auth/LoginPopup";
import SendInquaryPopup from "./SendInquaryPopup";
import { useQuery } from "@tanstack/react-query";
import { getInquiryEligibilityQuery } from "@/queries/vehicle.queries";
import SignupPopup from "@/components/auth/SignupPopup";
import DownloadAppPopup from "@/components/ui/DownloadAppPopup";
import RequestAlredySentPopup from "./RequestAlredySentPopup";

export default function VehicleSummaryRight({
  vehicle,
  summary,
  adId,
  sponsored,
  billingType,
}) {
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

  const {
    data: eligibilityData,
    refetch: refetchEligibility,
    isFetching: isCheckingInquiry,
  } = useQuery({
    ...getInquiryEligibilityQuery(vehicleId),
    enabled: !!vehicleId && isLoggedIn,
  });

  useEffect(() => {
    setLocalInquiryCount(vehicle?.totalInquiryCount || 0);
  }, [vehicle?.totalInquiryCount]);

  const handleInquirySuccess = () => {
    setLocalInquiryCount((prev) => prev + 1);
  };

  const handleRequestInquiry = async () => {
    if (!vehicleId) return;

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
        <div className="relative z-10 p-6 space-y-5">
          {/* HEADER */}
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              {vehicleOwnerRole === "CONSULTATION" ? (
                <>
                  <span className="text-xs uppercase tracking-[0.1em] text-fourth font-bold block mb-1">
                    Listed By Auto Consultant
                  </span>
                  <p className="text-xl font-bold text-primary truncate">
                    {summary?.consultationName || "Auto Consultant"}
                  </p>
                </>
              ) : (
                <>
                  <span className="text-xs uppercase tracking-[0.1em] text-third font-medium block mb-1">
                    Private Seller
                  </span>
                  <p className="text-xl font-bold text-primary truncate">
                    {[
                      vehicle?.vehicleOwner?.firstname,
                      vehicle?.vehicleOwner?.lastname,
                    ]
                      .filter(Boolean)
                      .join(" ") || "Individual Seller"}
                  </p>
                </>
              )}

              <h2 className="hidden text-2xl font-bold leading-tight">
                {[vehicle?.makerName, vehicle?.modelName, vehicle?.variantName]
                  .filter(Boolean)
                  .join(" ") || "-"}
              </h2>
            </div>

            {/* View Storefront — shown for consultants only, sits top-right of header */}
            {vehicleOwnerRole === "CONSULTATION" && summary?.consultationName && (
              <div className="shrink-0 mt-1">
                <Button
                  href={`/store-front/${summary?.username || 1}`}
                  variant="outline"
                  size="sm"
                  showIcon
                  className="h-8 py-0 px-3 text-xs whitespace-nowrap"
                >
                  Visit Storefront
                </Button>
              </div>
            )}
          </div>

          {/* SELLER / DEALER INFO */}
          <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4">
            <div className="space-y-2 w-full">
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
                          vehicle.vehicleAddress.town,
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
                <div className="space-y-3 mt-4">
                  <p className="text-sm font-medium text-primary">
                    Services Offered
                  </p>

                  <div className="flex flex-wrap gap-2 pt-1">
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

            <Button
              variant="outline"
              size="sm"
              showIcon={false}
              onClick={() => setIsDownloadOpen(true)}
            >
              Chat with Seller
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

          <Button
            variant="outline"
            size="sm"
            showIcon={false}
            className=""
            onClick={() => setIsDownloadOpen(true)}
          >
            Chat
          </Button>
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
