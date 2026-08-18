"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import FeatureGroup from "@/components/ui/FeatureGroup";
import {
  Calendar,
  ChevronDown,
  Clock,
  X,
  Settings,
  Car,
  Armchair,
  Share2,
  CircleDashed,
  Cpu,
  Wrench,
  Shield,
  Lock,
} from "lucide-react";
import Button from "@/components/ui/button";
import Image from "next/image";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";
import {
  complateInspectionPayment,
  createInpection,
} from "@/services/inspection.service";
import toast from "react-hot-toast";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getInspectionByVehicleIdQuery,
  getActiveInspectionQuery,
} from "@/queries/vehicle.queries";
import InspectionTrackingModal from "@/components/features/user/InspectionTrackingModal";
import { getInspectionPricForBuyerQuery } from "@/queries/inspection.queries";
import { useAuthStore } from "@/stores/useAuthStore";
import { customEvent } from "@/lib/fpixel";

export default function VehicleSpec({
  open,
  setOpen,
  vehicle,
  inspectionDetails,
}) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [animateModal, setAnimateModal] = useState(false);
  const [inspectionType, setInspectionType] = useState("report");
  const [inspectionDate, setInspectionDate] = useState(null);
  const [inspectionTime, setInspectionTime] = useState(null);
  const [mobileNumber, setMobileNumber] = useState("");
  const [step, setStep] = useState(1);
  const [createdInspectionId, setCreatedInspectionId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const openLoginPopup = useAuthStore((state) => state.openLoginPopup);
  const pendingAction = useRef(null);
  const datePickerRef = useRef(null);
  const timeSelectRef = useRef(null);

  const minAllowedDate = new Date();
  minAllowedDate.setDate(minAllowedDate.getDate() + 2);
  minAllowedDate.setHours(0, 0, 0, 0);

  const renderDayContents = (day, date) => {
    const isDisabled = date < minAllowedDate;
    if (isDisabled) {
      return <span title="You can schedule from 2 days ahead.">{day}</span>;
    }
    return <span>{day}</span>;
  };

  const { data: existingInspection, isFetching: isCheckingInspection } =
    useQuery({
      ...getInspectionByVehicleIdQuery(vehicle?.id),
      enabled: !!vehicle?.id && open,
    });

  const { data: priceData } = useQuery({
    ...getInspectionPricForBuyerQuery(vehicle?.id),
    enabled: !!vehicle?.id && open,
  });

  const reportOnlyPrice = priceData?.reportOnlyPrice ?? 1499;
  const videoCallWithReportPrice = priceData?.videoCallWithReportPrice ?? 1999;

  useEffect(() => {
    const initUser = () => {
      if (typeof window !== "undefined") {
        const savedUser = localStorage.getItem("user");
        if (savedUser) {
          try {
            const userObj = JSON.parse(savedUser);
            if (userObj) {
              setMobileNumber(
                userObj.phoneNumber || userObj.phone || userObj.mobile || "",
              );
            }
          } catch (e) {
            console.error("Error parsing user from localStorage", e);
          }
        }
      }
    };
    initUser();
  }, []);

  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 9; hour <= 21; hour++) {
      for (let min of ["00", "30"]) {
        const h = hour > 12 ? hour - 12 : hour;
        const ampm = hour >= 12 ? "PM" : "AM";
        const label = `${h}:${min} ${ampm}`;
        slots.push({ value: label, label: label });
      }
    }
    return slots;
  };
  const timeOptions = generateTimeSlots();
  const inspectionAvailable = true;
  const reportUrl =
    inspectionDetails?.reportUrl || existingInspection?.reportUrl;
  const isSold = vehicle?.isVehicleSold || vehicle?.status === "SOLD";

  const closeModal = () => {
    setAnimateModal(false);
    setTimeout(() => {
      setShowModal(false);
      setStep(1);
      setCreatedInspectionId("");
      setIsSubmitting(false);
    }, 300);
  };

  const [trackingInspection, setTrackingInspection] = useState(null);
  const [animateTrackingModal, setAnimateTrackingModal] = useState(false);
  const [isCheckingActiveInspection, setIsCheckingActiveInspection] =
    useState(false);

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

  const handleOpenModal = async () => {
    if (!vehicle?.id) {
      toast.error("Vehicle information is not available.");
      return;
    }
    if (!isLoggedIn) {
      pendingAction.current = "requestInspection";
      openLoginPopup();
      return;
    }
    setIsCheckingActiveInspection(true);
    try {
      const data = await queryClient.fetchQuery(
        getActiveInspectionQuery(vehicle.id),
      );
      if (data) {
        if (data.inspectionRequestStatus === "PAYMENT_PENDING") {
          setStep(1);
          setShowModal(true);
          setTimeout(() => setAnimateModal(true), 10);
        } else {
          handleOpenTracking(data);
        }
      } else {
        setStep(1);
        setShowModal(true);
        setTimeout(() => setAnimateModal(true), 10);
      }
    } catch (error) {
      if (error?.response?.status === 404 || error?.status === 404) {
        setStep(1);
        setShowModal(true);
        setTimeout(() => setAnimateModal(true), 10);
      } else {
        toast.error(
          error?.response?.data?.message ||
            "Failed to check inspection status.",
        );
      }
    } finally {
      setIsCheckingActiveInspection(false);
    }
  };

  useEffect(() => {
    if (isLoggedIn && pendingAction.current === "requestInspection") {
      pendingAction.current = null;
      handleOpenModal();
    }
  }, [isLoggedIn]);

  const parseTime = (timeStr) => {
    if (!timeStr) return { hours: 0, minutes: 0 };
    const [time, modifier] = timeStr.split(" ");
    let [hoursStr, minutesStr] = time.split(":");
    let hours = parseInt(hoursStr, 10);
    const minutes = parseInt(minutesStr, 10);
    if (modifier === "PM" && hours < 12) hours += 12;
    if (modifier === "AM" && hours === 12) hours = 0;
    return { hours, minutes };
  };

  const formatLocalDateTime = (date, timeObj) => {
    if (!date || !timeObj) return "";
    const parsed = parseTime(timeObj.value);
    const d = new Date(date);
    d.setHours(parsed.hours, parsed.minutes, 0, 0);
    const pad = (n) => String(n).padStart(2, "0");
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
  };

  const handleConfirm = async () => {
    if (!vehicle?.id) {
      toast.error("Vehicle information is not available.");
      return;
    }
    if (inspectionType === "video") {
      if (!mobileNumber.trim()) {
        toast.error("Please enter your WhatsApp number.");
        return;
      }
      if (!inspectionDate) {
        toast.error("Please select a preferred date.");
        return;
      }
      if (!inspectionTime) {
        toast.error("Please select a preferred time.");
        return;
      }
    }
    setIsSubmitting(true);
    try {
      const payload =
        inspectionType === "video"
          ? {
              inspectionType: "VIDEO_CALL_WITH_REPORT",
              whatsappNumber: mobileNumber,
              videoCallScheduledAt: formatLocalDateTime(
                inspectionDate,
                inspectionTime,
              ),
            }
          : { inspectionType: "REPORT_ONLY" };
      const response = await createInpection(vehicle.id, payload);
      if (response?.success) {
        // Meta Pixel Custom Event: InspectionRequest
        customEvent("InspectionRequest", {
          content_type: "vehicle",
          content_ids: [String(vehicle.id)],
          content_name:
            `${vehicle?.yearOfMfg || ""} ${vehicle?.makerName || ""} ${vehicle?.modelName || ""}`.trim() ||
            "Vehicle Inspection Request",
        });

        const id = response.data?.id || response.id;
        if (id) {
          setCreatedInspectionId(id);
          setStep(2);
          queryClient.invalidateQueries({
            queryKey: ["inspection-by-vehicle", vehicle.id],
          });
        } else toast.error("Failed to retrieve request ID.");
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
      const isScriptLoaded = await loadRazorpayScript();
      if (!isScriptLoaded) {
        toast.error(
          "Razorpay SDK failed to load. Please check your connection.",
        );
        return;
      }

      const response = await complateInspectionPayment(targetId);
      if (response?.success && response?.data) {
        const orderData = response.data;

        const storeUser = useAuthStore.getState().user;
        let prefillName = "";
        if (storeUser) {
          if (storeUser.firstname || storeUser.lastname) {
            prefillName =
              `${storeUser.firstname || ""} ${storeUser.lastname || ""}`.trim();
          } else {
            prefillName =
              storeUser.name || storeUser.fullName || storeUser.firstName || "";
          }
        }
        let prefillEmail = storeUser?.email || "";
        let prefillContact =
          storeUser?.phoneNumber ||
          storeUser?.phone ||
          storeUser?.mobile ||
          mobileNumber ||
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
                    prefillName =
                      `${userObj.firstname || ""} ${userObj.lastname || ""}`.trim();
                  } else {
                    prefillName =
                      userObj.name ||
                      userObj.fullName ||
                      userObj.firstName ||
                      "";
                  }
                }
                if (!prefillEmail) prefillEmail = userObj.email || "";
                if (!prefillContact)
                  prefillContact =
                    userObj.phoneNumber ||
                    userObj.phone ||
                    userObj.mobile ||
                    mobileNumber ||
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
          amount: Math.round(orderData.amount * 100), // Razorpay expects amount in paise
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
              closeModal();
            }, 6000);
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
    } catch (err) {
      toast.error(err?.response?.data?.message || "Payment completion failed.");
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <section className="relative rounded-2xl overflow-hidden  text-primary border border-third/60">
      {/* <div className="absolute inset-0 bg-[url('/bg_blur.jpg')] bg-cover bg-center opacity-40 blur-lg z-0" /> */}

      <div className="relative z-10">
        <div
          className="flex justify-between items-center px-6 py-3 text-primary cursor-pointer"
          onClick={() => setOpen((prev) => !prev)}
        >
          <h3 className="text-xl font-semibold">Inspect Before You Buy</h3>
          <div className="text-xl">
            <ChevronDown
              size={20}
              className={`transition-transform duration-300 ${
                open ? "rotate-180" : "rotate-0"
              }`}
            />
          </div>
        </div>
        <div
          className={`grid transition-all duration-300 ease-in-out ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
        >
          <div className="overflow-hidden">
            <div className="mt-3 space-y-8">
              {/* ================= AVX INSPECTION REPORT ================= */}
              <div className="space-y-6 px-6 pb-6">
                {inspectionAvailable ? (
                  <>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <p className="text-sm text-third font-normal mt-1">
                        The report above reflects this vehicle&apos;s last
                        check-in. A fresh inspection re-checks everything that
                        matters, scheduled around your purchase — current,
                        complete, and yours.
                      </p>
                      {reportUrl && (
                        <div className="shrink-0">
                          <Button
                            variant="outline"
                            size="sm"
                            showIcon={true}
                            onClick={() => window.open(reportUrl, "_blank")}
                          >
                            View Inspection Report
                          </Button>
                        </div>
                      )}
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                      {[
                        { title: "Engine & powertrain", icon: Settings },
                        { title: "Mechanical & brakes", icon: Settings },
                        { title: "Exterior & body", icon: Car },
                        { title: "Interior & cabin", icon: Armchair },
                        { title: "Structural history", icon: Share2 },
                        { title: "Tyres & tread depth", icon: CircleDashed },
                        { title: "OBD diagnostics", icon: Cpu },
                        { title: "Modifications check", icon: Wrench },
                      ].map((feature, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-3 p-3 border border-third/20 rounded-xl transition-colors"
                        >
                          <feature.icon
                            className="w-5 h-5 shrink-0 text-primary"
                            strokeWidth={1.5}
                          />
                          <span className="font-semibold text-primary leading-tight">
                            {feature.title}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="md:col-span-3 border-t border border-third/40" />
                    <div>
                      <h3 className="text-lg font-normal">
                        Want extra assurance before booking?
                      </h3>
                      <p className="text-sm text-primary font-normal mt-1">
                        You can request a fresh inspection or a live video
                        walkthrough for added confidence.
                      </p>
                    </div>
                    {/* Inspection Type */}
                    <div className="space-y-3">
                      <p className="text-sm font-medium">
                        Choose inspection type
                      </p>

                      <div className="space-y-3">
                        {/* Only Report */}
                        <label
                          className={`
        flex items-start gap-3 p-4 rounded-xl border cursor-pointer
        transition-all
        ${
          inspectionType === "report"
            ? "border-primary bg-primary/5"
            : "border-third/40 hover:bg-secondary/80"
        }
      `}
                        >
                          <input
                            type="radio"
                            name="inspection"
                            value="report"
                            checked={inspectionType === "report"}
                            onChange={() => setInspectionType("report")}
                            className="mt-1 accent-primary"
                          />

                          <div className="flex-1">
                            <p className="text-sm font-semibold">
                              Inspection Report Only
                            </p>
                            <p className="text-xs text-third mt-0.5">
                              Complete physical inspection with digital report
                            </p>
                            <p className="text-sm font-medium mt-1">
                              ₹{reportOnlyPrice.toLocaleString("en-IN")}{" "}
                              <span className="text-xs text-third font-normal">
                                (+18% GST)
                              </span>
                            </p>
                          </div>
                        </label>
                        {/* Video Call + Report */}
                        <label
                          className={`
        flex items-start gap-3 p-4 rounded-xl border cursor-pointer
        transition-all
        ${
          inspectionType === "video"
            ? "border-primary bg-primary/5"
            : "border-third/40 hover:bg-secondary/80"
        }
      `}
                        >
                          <input
                            type="radio"
                            name="inspection"
                            value="video"
                            checked={inspectionType === "video"}
                            onChange={() => setInspectionType("video")}
                            className="mt-1 accent-primary"
                          />

                          <div className="flex-1">
                            <p className="text-sm font-semibold">
                              Personalize Video Call + Inspection Report
                            </p>
                            <p className="text-xs text-third mt-0.5">
                              Live video walkthrough with inspector + detailed
                              digital report
                            </p>
                            <p className="text-sm font-medium mt-1">
                              ₹
                              {videoCallWithReportPrice.toLocaleString("en-IN")}{" "}
                              <span className="text-xs text-third font-normal">
                                (+18% GST)
                              </span>
                            </p>
                          </div>
                        </label>
                      </div>
                    </div>
                    {!isSold && (
                      <div className="flex flex-col gap-3 md:flex-row justify-between items-center">
                        <p className="text-sm text-primary font-normal mt-1">
                          Recommended for high-value vehicles
                        </p>
                        <div>
                          <Button
                            variant="outline"
                            size="sm"
                            showIcon={false}
                            onClick={handleOpenModal}
                            loading={isCheckingActiveInspection}
                          >
                            Request New Reecomm Inspection
                          </Button>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="space-y-3">
                    {/* Status */}
                    <div className="flex items-center gap-2 text-sm">
                      <span className="px-2 py-0.5 rounded-full bg-yellow-500/15 text-yellow-400 font-medium">
                        Inspection not available
                      </span>
                      {/* <span className="text-third">
                    No recent Reecomm report found for this vehicle
                  </span> */}
                    </div>

                    {/* Heading */}
                    <div>
                      <p className="text-lg font-semibold text-primary">
                        Want deeper verification before deciding?
                      </p>
                      <p className="text-sm text-third mt-1">
                        Request a fresh Reecomm inspection to get a complete
                        picture of the vehicle’s condition.
                      </p>
                    </div>

                    {/* Benefits */}
                    <div className="rounded-lg bg-secondary/80 border border-third/30 p-4">
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-primary">
                        <li>✔ 200+ point physical inspection</li>
                        <li>✔ Engine, transmission & structure check</li>
                        <li>✔ Odometer & flood verification</li>
                        <li>✔ Detailed digital inspection report</li>
                      </ul>
                    </div>

                    {/* Turnaround */}
                    <div className="flex items-center justify-between text-sm">
                      <p className="font-medium text-primary">
                        Inspection within{" "}
                        <span className="font-semibold">24–48 hours</span>
                      </p>
                      <p className="text-third text-xs">
                        Fee adjusted if you purchase
                      </p>
                    </div>

                    {/* CTA */}
                    {!isSold && (
                      <div className="flex justify-end">
                        <Button
                          variant="outline"
                          size="md"
                          showIcon={false}
                          onClick={handleOpenModal}
                          loading={isCheckingActiveInspection}
                        >
                          Request Reecomm Inspection
                        </Button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* ================= MODAL ================= */}
      {showModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center">
          {/* Backdrop */}
          <div
            className={`
        absolute inset-0 bg-black/60 backdrop-blur-sm
        transition-opacity duration-300
        ${animateModal ? "opacity-100" : "opacity-0"}
      `}
            onClick={closeModal}
          />

          {/* Modal Card */}
          <div
            className={`
        relative z-50 mx-3
        w-full md:w-[85%] lg:w-[70%] max-w-3xl
        h-auto max-h-[80vh] md:max-h-[540px]
        flex flex-col md:flex-row items-stretch
        rounded-2xl
        bg-secondary overflow-hidden text-primary
        border border-third/50 shadow-2xl
        transition-all duration-300 ease-out
        ${
          animateModal
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-95 translate-y-4"
        }
      `}
          >
            {/* CLOSE */}
            <div
              className="absolute right-4 top-4 cursor-pointer border border-white/10 bg-zinc-900/50 hover:bg-zinc-900 text-zinc-400 hover:text-white w-9 h-9 rounded-full flex items-center justify-center transition-all z-10"
              onClick={closeModal}
            >
              <X size={18} />
            </div>

            {/* IMAGE (LEFT SIDE) */}
            <div className="hidden md:block md:w-[40%] shrink-0">
              <Image
                width={500}
                height={500}
                src="/inspection-payment.webp"
                alt="reecomm-payment"
                className="w-full h-full object-cover"
              />
            </div>

            {/* CONTENT (RIGHT SIDE) */}
            <div className="p-5 sm:p-6 space-y-5 w-full md:w-[60%] overflow-y-auto custom-scrollbar">
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
                    <h2 className="text-xl font-bold">
                      Request Already Submitted
                    </h2>
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
                        {new Date(
                          existingInspection.createdAt,
                        ).toLocaleDateString("en-GB")}
                      </span>
                    </div>
                  </div>

                  {/* <div className="flex justify-end gap-3 pt-2">
                    <Button variant="outline" size="md" onClick={closeModal} showIcon={false}>Close</Button>
                  </div> */}
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
                    <p className="text-sm font-medium">
                      Choose inspection type
                    </p>
                    <div className="space-y-3">
                      <label
                        className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all ${inspectionType === "report" ? "border-primary bg-primary/5" : "border-third/40 hover:bg-secondary/80"}`}
                      >
                        <input
                          type="radio"
                          name="inspection"
                          value="report"
                          checked={inspectionType === "report"}
                          onChange={() => setInspectionType("report")}
                          className="mt-1 accent-primary"
                        />
                        <div className="flex-1">
                          <p className="text-sm font-semibold">
                            Inspection Report Only
                          </p>
                          <p className="text-xs text-third mt-0.5">
                            Complete physical inspection with digital report
                          </p>
                          <p className="text-sm font-medium mt-1">
                            ₹{reportOnlyPrice.toLocaleString("en-IN")}{" "}
                            <span className="text-xs text-third font-normal">
                              (+18% GST)
                            </span>
                          </p>
                        </div>
                      </label>
                      <label
                        className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all ${inspectionType === "video" ? "border-primary bg-primary/5" : "border-third/40 hover:bg-secondary/80"}`}
                      >
                        <input
                          type="radio"
                          name="inspection"
                          value="video"
                          checked={inspectionType === "video"}
                          onChange={() => setInspectionType("video")}
                          className="mt-1 accent-primary"
                        />
                        <div className="flex-1">
                          <p className="text-sm font-semibold">
                            Personalize Video Call + Inspection Report
                          </p>
                          <p className="text-xs text-third mt-0.5">
                            Live video walkthrough with inspector + detailed
                            digital report
                          </p>
                          <p className="text-sm font-medium mt-1">
                            ₹{videoCallWithReportPrice.toLocaleString("en-IN")}{" "}
                            <span className="text-xs text-third font-normal">
                              (+18% GST)
                            </span>
                          </p>
                        </div>
                      </label>
                    </div>
                  </div>

                  {inspectionType === "video" && (
                    <>
                      <div className="rounded-xl border border-third/40 bg-secondary/60 p-4 space-y-4">
                        <p className="text-sm font-semibold">WhatsApp Number</p>
                        <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-third/40 bg-secondary focus-within:border-primary">
                          <input
                            type="tel"
                            value={mobileNumber}
                            onChange={(e) => {
                              const digitsOnly = e.target.value
                                .replace(/\D/g, "")
                                .slice(0, 10);
                              setMobileNumber(digitsOnly);
                            }}
                            maxLength={10}
                            placeholder="Enter WhatsApp number"
                            className="w-full text-sm bg-transparent focus:outline-none text-primary"
                          />
                        </div>
                      </div>
                      <div className="rounded-xl border border-third/40 bg-secondary/60 p-4 space-y-4">
                        <div className="flex items-center gap-2">
                          <Calendar size={16} className="text-primary" />
                          <p className="text-sm font-semibold">
                            Schedule Video Inspection
                          </p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-1.5">
                            <label className="text-xs font-medium text-third">
                              Preferred Date
                            </label>
                            <div
                              className="flex items-center gap-2 px-3 py-2 rounded-lg border border-third/40 bg-secondary focus-within:border-primary cursor-pointer"
                              onClick={(e) => {
                                // Prevent bubbling from calendar clicks re-opening the picker
                                if (
                                  e.target.tagName !== "INPUT" &&
                                  !e.target.closest(".react-datepicker")
                                ) {
                                  datePickerRef.current?.setOpen(true);
                                }
                              }}
                            >
                              <Calendar size={14} className="text-third" />
                              <DatePicker
                                ref={datePickerRef}
                                selected={inspectionDate}
                                onChange={(date) => {
                                  setInspectionDate(date);
                                  datePickerRef.current?.setOpen(false);
                                }}
                                onKeyDown={(e) => {
                                  if (e.key === "Enter") {
                                    e.preventDefault();
                                    datePickerRef.current?.setOpen(false);
                                  }
                                }}
                                shouldCloseOnSelect={true}
                                dateFormat="MMMM d, yyyy"
                                minDate={minAllowedDate}
                                renderDayContents={renderDayContents}
                                placeholderText="Select Date"
                                className="w-full text-sm bg-transparent focus:outline-none text-primary cursor-pointer"
                                wrapperClassName="w-full"
                                calendarClassName="dark-datepicker"
                                popperStrategy="fixed"
                              />
                            </div>
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-xs font-medium text-third">
                              Preferred Time
                            </label>
                            <div
                              className="flex items-center gap-2 px-3 py-1 rounded-lg border border-third/40 bg-secondary focus-within:border-primary cursor-pointer"
                              onClick={() => timeSelectRef.current?.focus()}
                            >
                              <Clock size={14} className="text-third" />
                              <Select
                                ref={timeSelectRef}
                                openMenuOnFocus={true}
                                options={timeOptions}
                                value={inspectionTime}
                                onChange={(option) => setInspectionTime(option)}
                                placeholder="Select Time"
                                className="w-full text-sm"
                                styles={{
                                  control: (b) => ({
                                    ...b,
                                    backgroundColor: "transparent",
                                    border: "none",
                                    boxShadow: "none",
                                    minHeight: "auto",
                                    cursor: "pointer",
                                  }),
                                  singleValue: (b) => ({
                                    ...b,
                                    color: "#ffffff",
                                  }),
                                  placeholder: (b) => ({
                                    ...b,
                                    color: "#bebebe",
                                  }),
                                  menu: (b) => ({
                                    ...b,
                                    backgroundColor: "#121212",
                                    borderRadius: "12px",
                                    border: "1px solid #2f2e2e",
                                    zIndex: 100,
                                    width: "calc(100% + 46px)", // Matches outer wrapper (34px left + 12px right padding offset)
                                    marginLeft: "-34px", // Pulls it left to align with the outer border
                                    marginTop: "12px", // Spacing from the wrapper
                                    boxShadow: "0 4px 24px rgba(0,0,0,0.6)",
                                  }),
                                  menuList: (b) => ({
                                    ...b,
                                    padding: "4px",
                                    maxHeight: "160px",
                                    "::-webkit-scrollbar": {
                                      width: "4px",
                                      height: "0px",
                                    },
                                    "::-webkit-scrollbar-track": {
                                      background: "transparent",
                                    },
                                    "::-webkit-scrollbar-thumb": {
                                      background: "#3f3e3e",
                                      borderRadius: "10px",
                                    },
                                    "::-webkit-scrollbar-thumb:hover": {
                                      background: "#555555",
                                    },
                                  }),
                                  option: (b, s) => ({
                                    ...b,
                                    backgroundColor: s.isSelected
                                      ? "var(--color-fourth)" // Uses brand color for selected
                                      : s.isFocused
                                        ? "rgba(255,255,255,0.05)"
                                        : "transparent",
                                    color: s.isSelected ? "#ffffff" : "#e5e5e5",
                                    cursor: "pointer",
                                    borderRadius: "6px",
                                    padding: "6px 12px",
                                    margin: "1px 0",
                                    ":active": {
                                      backgroundColor: "rgba(255,255,255,0.1)",
                                    },
                                  }),
                                  indicatorSeparator: () => ({
                                    display: "none",
                                  }),
                                  dropdownIndicator: (b) => ({
                                    ...b,
                                    color: "#bebebe",
                                    padding: "0 4px",
                                  }),
                                }}
                              />
                            </div>
                          </div>
                        </div>
                        <p className="text-xs text-third leading-relaxed">
                          Our inspector will confirm the exact slot based on
                          availability.
                        </p>
                      </div>
                    </>
                  )}

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
              {step === 2 && (() => {
                const baseInspectionAmount =
                  inspectionType === "video"
                    ? videoCallWithReportPrice
                    : reportOnlyPrice;
                const gstAmount = Number(
                  (baseInspectionAmount * 0.18).toFixed(2)
                );
                const selectedTotalPrice = Number(
                  (baseInspectionAmount + gstAmount).toFixed(2)
                );

                return (
                  <div className="space-y-6">
                    {/* Header with Shield Icon */}
                    <div className="flex items-start gap-4">
                      <div className="flex-1">
                        <h2 className="text-xl font-bold text-white">
                          Complete your payment
                        </h2>
                        <p className="text-xs text-zinc-400 mt-1">
                          Please review your details and confirm to complete the
                          payment.
                        </p>
                      </div>
                    </div>

                    {/* Details Box */}
                    <div className="border border-third/30 rounded-2xl p-5 space-y-4 bg-secondary/80 divide-y divide-third/20">
                      <div className="flex justify-between items-center text-sm pb-3">
                        <span className="text-third">Inspection Type</span>
                        <span className="font-semibold text-white">
                          {inspectionType === "video"
                            ? "Video Call + Report"
                            : "Inspection Report Only"}
                        </span>
                      </div>
                      {inspectionType === "video" && (
                        <>
                          <div className="flex justify-between items-center text-sm py-3">
                            <span className="text-third">WhatsApp Number</span>
                            <span className="font-semibold text-white">
                              {mobileNumber}
                            </span>
                          </div>
                          <div className="flex justify-between items-center text-sm py-3">
                            <span className="text-third">Scheduled Slot</span>
                            <div className="flex items-center gap-1.5 text-xs text-white font-semibold">
                              <Calendar size={14} className="text-third" />
                              <span>
                                {inspectionDate?.toLocaleDateString("en-GB", {
                                  day: "numeric",
                                  month: "short",
                                  year: "numeric",
                                })}
                              </span>
                              <span className="text-third/50 mx-0.5">|</span>
                              <Clock size={14} className="text-third" />
                              <span>{inspectionTime?.label}</span>
                            </div>
                          </div>
                        </>
                      )}
                      <div className="flex justify-between items-center text-sm py-3">
                        <span className="text-third">Inspection Amount</span>
                        <span className="font-semibold text-white">
                          ₹{baseInspectionAmount.toLocaleString("en-IN")}
                        </span>
                      </div>
                      <div className="flex justify-between items-center text-sm py-3">
                        <span className="text-third">18% GST Amount</span>
                        <span className="font-semibold text-white">
                          ₹{gstAmount.toLocaleString("en-IN", {
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 2,
                          })}
                        </span>
                      </div>
                      <div className="flex justify-between items-center pt-4 text-base font-bold">
                        <span>Total Amount</span>
                        <span className="text-white text-xl font-extrabold">
                          ₹{selectedTotalPrice.toLocaleString("en-IN", {
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 2,
                          })}
                        </span>
                      </div>
                    </div>

                    {/* Agree Text with Lock Icon */}
                    <div className="flex items-start gap-2.5 px-1 py-1 text-zinc-400">
                      <Lock size={14} className="text-zinc-500 shrink-0 mt-0.5" />
                      <p className="text-xs leading-normal">
                        By clicking Confirm Payment, you agree to complete the
                        payment workflow.
                      </p>
                    </div>

                    {/* Footer Buttons */}
                    <div className="flex justify-end gap-3 pt-2">
                      <Button
                        onClick={() => setStep(1)}
                        disabled={isSubmitting}
                        variant="outlineSecondary"
                      >
                        Back
                      </Button>
                      <Button
                        onClick={() => handlePayment()}
                        disabled={isSubmitting}
                        loading={isSubmitting}
                        variant="ghost"
                      >
                        <span className="mt-0.5">Confirm Payment</span>
                      </Button>
                    </div>
                  </div>
                );
              })()}

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
                    <h2 className="text-2xl font-bold">Inspection Booked.</h2>
                    <p className="text-sm text-third max-w-sm">
                      Your payment is confirmed and your inspection request is
                      now live. A Reecomm inspector will be assigned shortly —
                      you can track every step right here.
                    </p>
                    <div className="pt-2">
                      <Button
                        variant="ghost"
                        size="md"
                        onClick={() => {
                          closeModal();
                          router.push("/user/details/inspections");
                        }}
                        showIcon={false}
                      >
                        Track Your Inspection &rarr;
                      </Button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {trackingInspection && (
        <InspectionTrackingModal
          inspection={trackingInspection}
          onClose={handleCloseTracking}
          animateModal={animateTrackingModal}
          vehicle={vehicle}
        />
      )}
    </section>
  );
}
