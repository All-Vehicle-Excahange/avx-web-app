"use client";
import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import Button from "@/components/ui/button";
import Image from "next/image";
import {
  complateInspectionPayment,
  createInpection,
} from "@/services/inspection.service";
import toast from "react-hot-toast";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getInspectionByVehicleIdQuery } from "@/queries/vehicle.queries";
import { getInspectionPriceAndCountQuery } from "@/queries/inspection.queries";
import { useAuthStore } from "@/stores/useAuthStore";

export default function InspectionRequestModal({
  isOpen,
  onClose,
  vehicle,
}) {
  const queryClient = useQueryClient();
  const [animate, setAnimate] = useState(false);
  const [step, setStep] = useState(1);
  const [createdInspectionId, setCreatedInspectionId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data: existingInspection } = useQuery({
    ...getInspectionByVehicleIdQuery(vehicle?.id),
    enabled: !!vehicle?.id && isOpen,
  });

  const { data: priceAndCountData } = useQuery({
    ...getInspectionPriceAndCountQuery(vehicle?.id),
    enabled: !!vehicle?.id && isOpen,
  });

  const freeInspectionCount = priceAndCountData?.freeInspectionRemainCount ?? 0;
  const totalFreeInspection = priceAndCountData?.totalFreeInspectionCount ?? 0;
  const originalPrice = priceAndCountData?.originalPrice ?? 1499;
  const discountPrice = priceAndCountData?.discountPrice ?? 1499;
  const discount = priceAndCountData?.discount ?? 0;
  const isFree = freeInspectionCount > 0;
  const displayPrice = isFree ? 0 : discountPrice;

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      const timer = setTimeout(() => setAnimate(true), 10);
      return () => {
        clearTimeout(timer);
        document.body.style.overflow = "";
      };
    } else {
      setAnimate(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleClose = () => {
    setAnimate(false);
    setTimeout(() => {
      onClose();
      setStep(1);
      setCreatedInspectionId("");
      setIsSubmitting(false);
    }, 300);
  };

  const handleConfirm = async () => {
    if (!vehicle?.id) {
      toast.error("Vehicle information is not available.");
      return;
    }
    setIsSubmitting(true);
    try {
      const payload = { inspectionType: "REPORT_ONLY" };
      const response = await createInpection(vehicle.id, payload);
      if (response?.success) {
        const id = response.data?.id || response.id;
        if (id) {
          setCreatedInspectionId(id);
          setStep(2); // Go to step 2 (summary page) for both free and paid
          queryClient.invalidateQueries({
            queryKey: ["inspection-by-vehicle", vehicle.id],
          });
        } else {
          toast.error("Failed to retrieve request ID.");
        }
      } else {
        toast.error(
          response?.message || "Failed to create inspection request.",
        );
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async (idToPay) => {
    const targetId =
      typeof idToPay === "string" ? idToPay : createdInspectionId;
    if (!targetId) {
      toast.error("Inspection request ID not found.");
      return;
    }
    setIsSubmitting(true);
    try {
      const response = await complateInspectionPayment(targetId);
      if (response?.success) {
        if (isFree) {
          setStep(3);
          queryClient.invalidateQueries({
            queryKey: ["inspection-by-vehicle", vehicle.id],
          });
          toast.success("Inspection request registered successfully!");
          setTimeout(() => {
            handleClose();
          }, 3000);
          return;
        }

        // For paid inspections, launch Razorpay payment workflow:
        const isScriptLoaded = await loadRazorpayScript();
        if (!isScriptLoaded) {
          toast.error(
            "Razorpay SDK failed to load. Please check your connection.",
          );
          return;
        }

        if (response.data) {
          const orderData = response.data;

          const storeUser = useAuthStore.getState().user;
          let prefillName = "";
          if (storeUser) {
            if (storeUser.firstname || storeUser.lastname) {
              prefillName = `${storeUser.firstname || ""} ${storeUser.lastname || ""}`.trim();
            } else {
              prefillName = storeUser.name || storeUser.fullName || storeUser.firstName || "";
            }
          }
          let prefillEmail = storeUser?.email || "";
          let prefillContact =
            storeUser?.phoneNumber ||
            storeUser?.phone ||
            storeUser?.mobile ||
            "";

          if (
            typeof window !== "undefined" &&
            (!prefillName || !prefillEmail || !prefillContact)
          ) {
            try {
              const savedUser = localStorage.getItem("user");
              if (savedUser) {
                const userObj = JSON.parse(savedUser);
                if (userObj) {
                  if (!prefillName) {
                    if (userObj.firstname || userObj.lastname) {
                      prefillName = `${userObj.firstname || ""} ${userObj.lastname || ""}`.trim();
                    } else {
                      prefillName = userObj.name || userObj.fullName || userObj.firstName || "";
                    }
                  }
                  if (!prefillEmail) prefillEmail = userObj.email || "";
                  if (!prefillContact)
                    prefillContact =
                      userObj.phoneNumber ||
                      userObj.phone ||
                      userObj.mobile ||
                      "";
                }
              }
            } catch (e) {
              console.error(
                "Error parsing user from localStorage for prefill",
                e,
              );
            }
          }

          const options = {
            key: orderData.keyId,
            amount: Math.round(orderData.amount * 100),
            currency: orderData.currency || "INR",
            name: "Reecomm",
            description: "Vehicle Inspection Payment",
            order_id: orderData.razorpayOrderId,
            prefill: {
              name: prefillName,
              email: prefillEmail,
              contact: prefillContact,
            },
            handler: async function (paymentResponse) {
              setStep(3);
              queryClient.invalidateQueries({
                queryKey: ["inspection-by-vehicle", vehicle.id],
              });
              toast.success("Payment completed successfully!");
              setTimeout(() => {
                handleClose();
              }, 3000);
            },
            theme: {
              color: "#007bff",
            },
            modal: {
              ondismiss: function () {
                toast.error("Payment cancelled.");
              },
            },
          };

          const rzp = new window.Razorpay(options);
          rzp.on("payment.failed", function (failResponse) {
            toast.error("Payment failed: " + failResponse.error.description);
          });
          rzp.open();
        } else {
          toast.error(response?.message || "Payment completion failed.");
        }
      } else {
        toast.error(response?.message || "Payment completion failed.");
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Payment completion failed.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className={`
          absolute inset-0 bg-black/60 backdrop-blur-sm
          transition-opacity duration-300
          ${animate ? "opacity-100" : "opacity-0"}
        `}
        onClick={handleClose}
      />

      {/* Modal Card */}
      <div
        className={`
          relative z-50 mx-3
          w-full md:w-[85%] lg:w-[70%]  
          max-w-md md:max-w-none
          h-[70vh] md:h-auto  
          md:max-h-[62%]
          flex md:flex
          rounded-2xl md:rounded-2xl
          bg-secondary overflow-hidden text-primary
          border border-third/50 shadow-2xl
          transition-all duration-300 ease-out
          ${
            animate
              ? "opacity-100 scale-100 translate-y-0"
              : "opacity-0 scale-95 translate-y-4"
          }
        `}
      >
        {/* CLOSE */}
        <div
          className="absolute right-3 top-3 cursor-pointer bg-primary text-secondary md:bg-secondary md:text-primary w-8 h-8 rounded-full flex items-center justify-center z-10"
          onClick={handleClose}
        >
          <X size={20} />
        </div>

        {/* CONTENT */}
        <div className="p-4 md:p-6 space-y-5 w-full md:w-[50%] overflow-y-auto custom-scrollbar">
          {/* ---- STEP 0: Already Submitted ---- */}
          {step === 0 && existingInspection && (
            <>
              <div className="flex flex-col items-center justify-center text-center py-6 space-y-3">
                <div className="w-16 h-16 rounded-full bg-yellow-500/10 flex items-center justify-center text-yellow-400 border border-yellow-500/20">
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h2 className="text-xl font-bold">Request Already Submitted</h2>
                <p className="text-sm text-third max-w-sm">
                  You have already submitted an inspection request for this
                  vehicle. Our team is processing it.
                </p>
              </div>

              <div className="border border-third/30 rounded-2xl p-5 space-y-3 bg-secondary/80">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-third">Inspection Type</span>
                  <span className="font-semibold">
                    {existingInspection.inspectionType ===
                    "VIDEO_CALL_WITH_REPORT"
                      ? "Video Call + Report"
                      : "Report Only"}
                  </span>
                </div>
                {existingInspection.inspectionType ===
                  "VIDEO_CALL_WITH_REPORT" && (
                  <>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-third">WhatsApp Number</span>
                      <span className="font-semibold">
                        {existingInspection.whatsappNumber}
                      </span>
                    </div>
                    {existingInspection.videoCallScheduledAt && (
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-third">Scheduled At</span>
                        <span className="font-semibold">
                          {new Date(existingInspection.videoCallScheduledAt)
                            .toLocaleDateString("en-GB")
                            .replace(/\//g, "/")}
                        </span>
                      </div>
                    )}
                  </>
                )}
                <div className="flex justify-between items-center text-sm">
                  <span className="text-third">Status</span>
                  <span className="px-2 py-0.5 rounded-full bg-yellow-500/15 text-yellow-400 font-medium text-xs">
                    {existingInspection.inspectionRequestStatus?.replace(
                      /_/g,
                      " ",
                    )}
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-third">Submitted On</span>
                  <span className="font-semibold">
                    {new Date(existingInspection.createdAt).toLocaleDateString(
                      "en-GB",
                    )}
                  </span>
                </div>
              </div>
            </>
          )}

          {/* ---- STEP 1: Inspection Form ---- */}
          {step === 1 && (
            <>
              <h2 className="text-xl font-semibold">
                Request Fresh Reecomm Inspection
              </h2>
              <div className="border-t border-third/40" />

              <div className="text-sm space-y-2">
                <p className="font-medium">A new inspection will:</p>
                <ul className="list-disc list-inside space-y-1 text-third">
                  <li>Re-verify current condition</li>
                  <li>Check for recent changes</li>
                  <li>Generate updated report</li>
                </ul>
              </div>

              <div className="space-y-3">
                <p className="text-sm font-medium">Choose inspection type</p>
                <div className="space-y-3">
                  <div className="p-4 rounded-xl border border-primary bg-primary/5">
                    <div className="flex-1">
                      <p className="text-sm font-semibold">
                        Inspection Report Only
                      </p>
                      <p className="text-xs text-third mt-0.5">
                        Complete physical inspection with digital report
                      </p>
                      <div className="flex items-center justify-between mt-3 gap-2">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-primary">
                            {isFree ? "Free" : `₹${discountPrice.toLocaleString("en-IN")}`}
                          </span>
                          {!isFree && discount > 0 && (
                            <>
                              <span className="text-xs text-third line-through">
                                ₹{originalPrice.toLocaleString("en-IN")}
                              </span>
                              <span className="text-xs text-green-500 font-medium">
                                ({discount}% off)
                              </span>
                            </>
                          )}
                        </div>
                        {priceAndCountData && (
                          <span className="text-xs text-third">
                            Free inspections remaining: {freeInspectionCount} / {totalFreeInspection}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <Button
                  variant="outline"
                  size="md"
                  onClick={handleConfirm}
                  showIcon={false}
                  loading={isSubmitting}
                >
                  Confirm & Proceed
                </Button>
              </div>
            </>
          )}

          {/* ---- STEP 2: Payment ---- */}
          {step === 2 && (
            <>
              <h2 className="text-2xl font-bold text-center">
                {isFree ? "Confirm your request" : "Complete your payment"}
              </h2>
              <div className="border border-third/30 rounded-2xl p-5 space-y-4 bg-secondary/80">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-third">Inspection Type</span>
                  <span className="font-semibold">
                    Inspection Report Only
                  </span>
                </div>
                <div className="border-t border-third/30 my-2" />
                <div className="flex justify-between items-center text-lg font-bold">
                  <span>Total Amount</span>
                  <div className="flex items-center gap-2">
                    <span className="text-primary font-bold">
                      {isFree ? "₹0 (Free)" : `₹${discountPrice.toLocaleString("en-IN")}`}
                    </span>
                    {!isFree && discount > 0 && (
                      <>
                        <span className="text-sm text-third line-through font-normal">
                          ₹{originalPrice.toLocaleString("en-IN")}
                        </span>
                        <span className="text-xs text-green-500 font-semibold">
                          ({discount}% off)
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <p className="text-xs text-third text-center">
                {isFree
                  ? "By clicking Confirm Request, you agree to submit the inspection request."
                  : "By clicking Confirm Payment, you agree to complete the payment workflow."}
              </p>
              <div className="flex justify-end gap-3 pt-2">
                <Button
                  variant="ghost"
                  size="md"
                  onClick={() => setStep(1)}
                  showIcon={false}
                  locked={isSubmitting}
                >
                  Back
                </Button>
                <Button
                  variant="outline"
                  size="md"
                  onClick={() => handlePayment()}
                  showIcon={false}
                  loading={isSubmitting}
                >
                  {isFree ? "Confirm Request" : "Confirm Payment"}
                </Button>
              </div>
            </>
          )}

          {/* ---- STEP 3: Success ---- */}
          {step === 3 && (
            <>
              <div className="flex flex-col items-center justify-center text-center py-8 space-y-4">
                <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center text-green-500 border border-green-500/20">
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold">
                  {isFree ? "Request Submitted!" : "Payment Completed!"}
                </h2>
                <p className="text-sm text-third max-w-sm">
                  Thank you! Your inspection request has been registered. Our
                  team will contact you shortly.
                </p>
              </div>
            </>
          )}
        </div>

        <div className="hidden md:block md:w-[50%]">
          <Image
            width={500}
            height={500}
            src="/bg.jpg"
            alt="reecomm-payment"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}
