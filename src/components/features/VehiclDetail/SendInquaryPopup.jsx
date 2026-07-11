"use client";

import React, { useEffect, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Select from "react-select";
import Button from "@/components/ui/button";
import { X, CheckCircle2, Loader2 } from "lucide-react";
import { sendInquary } from "@/services/vehicle.service";
import { trackInquary } from "@/services/ppc.service";
import { useQueryClient } from "@tanstack/react-query";

function SendInquaryPopup({
  onClose,
  consultName = "Consultant",
  vehicleId,
  onSuccess,
  adId,
  sponsored,
  billingType,
}) {
  const queryClient = useQueryClient();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 250);
  }, [onClose]);

  const inquiryOptions = [
    { value: "Need call back", label: "Need call back" },
    { value: "Vehicle available", label: "Vehicle available" },
    { value: "Test Drive available", label: "Test Drive available" },
    { value: "Other", label: "Other" },
  ];

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleSubmit = async () => {
    if (!vehicleId || isLoading) return;
    try {
      setIsLoading(true);
      const payload = {};
      if (title.trim()) payload.inquiryTitle = title.trim();
      if (description.trim()) payload.inquiryDescription = description.trim();
      await sendInquary(vehicleId, payload);
      setIsSuccess(true);

      // Invalidate query caches to trigger automatic UI updates
      queryClient.invalidateQueries({
        queryKey: ["inquiry-eligibility", vehicleId],
      });
      queryClient.invalidateQueries({
        queryKey: ["vehicle-overview", vehicleId],
      });

      if (onSuccess) onSuccess();

      // Track CPI Inquiry if sponsored & billingType is CPI
      if (
        (sponsored === "true" || sponsored === true) &&
        billingType === "CPI" &&
        adId
      ) {
        try {
          await trackInquary(vehicleId, { adId });
        } catch (trackError) {
          console.error("Failed to track CPI inquiry:", trackError);
        }
      }

      setTimeout(() => handleClose(), 60000);
    } catch (error) {
      console.error("Send inquiry error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const modalContent = (
    <div
      className="fixed inset-0 z-9999 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={handleClose}
      style={{
        animation: isClosing
          ? "modalBackdropOut 0.25s ease-in forwards"
          : "modalBackdropIn 0.25s ease-out",
      }}
    >
      {/* Popup Box */}
      <div
        className={`relative flex w-full ${
          isSuccess
            ? "max-w-[1050px] min-h-[450px] bg-cover bg-center bg-no-repeat border border-third/20"
            : "max-w-[900px] bg-secondary"
        } overflow-hidden rounded-2xl shadow-2xl`}
        onClick={(e) => e.stopPropagation()}
        style={{
          animation: isClosing
            ? "modalCardOut 0.25s ease-in forwards"
            : "modalCardIn 0.3s ease-out",
          ...(isSuccess ? { backgroundImage: "url('/sendPopupBg.png')" } : {}),
        }}
      >
        {/* CLOSE */}
        <button
          onClick={handleClose}
          className="absolute bg-white cursor-pointer top-4 right-4 z-20 p-1 rounded-full hover:opacity-70 text-secondary"
        >
          <X size={20} />
        </button>

        {/* LEFT IMAGE */}
        <div className="hidden md:block w-5/12 relative z-10">
          {isSuccess ? (
            <Image
              src="/leftDownlaodImage.webp"
              alt="Reecomm App"
              fill
              className="object-cover"
            />
          ) : (
            <>
              <Image src="/cs.webp" alt="Cars" fill className="object-cover" />
              <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent" />
              <div className="absolute bottom-8 left-8 pr-4">
                <h2 className="text-3xl font-bold text-primary leading-tight">
                  Find your
                  <br />
                  dream car
                </h2>
              </div>
            </>
          )}
        </div>

        <div
          className={`w-full md:w-7/12 p-8 md:p-12 flex flex-col justify-center relative z-10 ${
            isSuccess ? "bg-transparent" : "bg-secondary"
          }`}
        >
          {isSuccess ? (
            <div className="flex flex-col h-full justify-center text-left">
              {/* Headlines */}
              <h3 className="text-3xl font-bold text-primary tracking-tight mb-3 flex items-center gap-3">
                <CheckCircle2 className="text-green-500 w-8 h-8 shrink-0 animate-in zoom-in duration-500" />
                Inquiry Sent.
              </h3>
              <p className="text-third text-sm leading-relaxed mb-6">
                The consultant has been notified and will respond to your
                request.
              </p>
              <p className="text-third font-bold text-sm leading-relaxed mb-6">
                Replies happen inside the Reecomm app. Download it so you don't
                miss their response.
              </p>

              {/* QR Code Container */}
              <div className="flex items-center gap-5 mb-6 p-4 rounded-2xl bg-white/[0.03] border border-third/10 shadow-inner w-fit">
                <div className="p-2 bg-white rounded-xl shadow-lg flex items-center justify-center shrink-0">
                  <Image
                    src="/app_qr.png"
                    alt="App QR Code"
                    width={80}
                    height={80}
                    className="w-16 h-16 sm:w-20 sm:h-20 object-contain"
                  />
                </div>
                <span className="text-xs sm:text-sm font-bold text-third uppercase tracking-wider text-left leading-normal max-w-[120px]">
                  Scan to download
                </span>
              </div>

              {/* App Buttons */}
              <div className="flex flex-row items-center gap-2 sm:gap-4 w-full sm:px-0">
                {/* Google Play Button */}
                <button
                  type="button"
                  onClick={() =>
                    window.open(
                      "https://play.google.com/store/apps/details?id=com.reecomm.vehicle.marketplace",
                      "_blank",
                    )
                  }
                  className="flex-1 sm:flex-none sm:w-auto min-w-[120px] sm:min-w-[180px] flex items-center justify-center px-2 sm:px-3 py-1.5 sm:py-2 bg-[#000000] text-white rounded-lg border border-neutral-800 hover:bg-neutral-900 transition-all duration-300 cursor-pointer group/btn shadow-md"
                >
                  <div className="mr-2 sm:mr-3 transition-transform duration-300">
                    <svg
                      viewBox="30 336.7 120.9 129.2"
                      className="w-[16px] sm:w-5"
                    >
                      <path
                        fill="#FFD400"
                        d="M119.2,421.2c15.3-8.4,27-14.8,28-15.3c3.2-1.7,6.5-6.2,0-9.7  c-2.1-1.1-13.4-7.3-28-15.3l-20.1,20.2L119.2,421.2z"
                      ></path>
                      <path
                        fill="#FF3333"
                        d="M99.1,401.1l-64.2,64.7c1.5,0.2,3.2-0.2,5.2-1.3  c4.2-2.3,48.8-26.7,79.1-43.3L99.1,401.1L99.1,401.1z"
                      ></path>
                      <path
                        fill="#48FF48"
                        d="M99.1,401.1l20.1-20.2c0,0-74.6-40.7-79.1-43.1  c-1.7-1-3.6-1.3-5.3-1L99.1,401.1z"
                      ></path>
                      <path
                        fill="#3BCCFF"
                        d="M99.1,401.1l-64.3-64.3c-2.6,0.6-4.8,2.9-4.8,7.6  c0,7.5,0,107.5,0,113.8c0,4.3,1.7,7.4,4.9,7.7L99.1,401.1z"
                      ></path>
                    </svg>
                  </div>
                  <div className="text-left">
                    <div className="text-[8px] sm:text-[9px] font-semibold uppercase tracking-wider text-white/60 transition-colors whitespace-nowrap">
                      Get it on
                    </div>
                    <div className="text-[12px] sm:text-base font-semibold leading-none tracking-tight whitespace-nowrap text-white">
                      Google Play
                    </div>
                  </div>
                </button>

                {/* App Store Button */}
                <button
                  type="button"
                  onClick={() =>
                    window.open("https://www.apple.com/app-store", "_blank")
                  }
                  className="flex-1 sm:flex-none sm:w-auto min-w-[120px] sm:min-w-[180px] flex items-center justify-center px-2 sm:px-3 py-1.5 sm:py-2 bg-[#000000] text-white rounded-lg border border-neutral-800 hover:bg-neutral-900 transition-all duration-300 cursor-pointer group/btn shadow-md"
                >
                  <div className="mr-2 sm:mr-3 transition-transform text-white">
                    <svg viewBox="0 0 384 512" className="w-3.5 sm:w-4">
                      <path
                        fill="currentColor"
                        d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"
                      ></path>
                    </svg>
                  </div>
                  <div className="text-left">
                    <div className="text-[8px] sm:text-[9px] font-semibold uppercase tracking-wider text-white/60 transition-colors whitespace-nowrap">
                      Download on the
                    </div>
                    <div className="text-[12px] sm:text-base font-semibold leading-none tracking-tight whitespace-nowrap text-white">
                      App Store
                    </div>
                  </div>
                </button>
              </div>

              {/* FOOTNOTE */}
              {/* <div className="text-[10px] text-third/50 mt-8">
                By downloading, you agree to Reecomm&apos;s Terms & Privacy
                Policy.
              </div> */}
            </div>
          ) : (
            <>
              {/* Header */}
              <div className="mb-6 space-y-2">
                <h3 className="text-2xl font-bold text-primary leading-tight">
                  You are requesting this vehicle from
                </h3>
                <p className="text-sm text-third">
                  <span className="font-semibold text-primary">
                    {consultName}
                  </span>{" "}
                  consultant will contact you shortly.
                </p>
              </div>

              {/* Form Fields */}
              <div className="space-y-4">
                {/* Selector Field */}
                <div className="space-y-2">
                  <label className="text-sm text-third font-medium">
                    Select Inquiry Type
                  </label>
                  <Select
                    instanceId="inquiry-type-select"
                    options={inquiryOptions}
                    value={
                      inquiryOptions.find((opt) => opt.value === title) || null
                    }
                    onChange={(option) => {
                      setTitle(option.value);
                      if (option.value !== "Other") setDescription("");
                    }}
                    placeholder="Select an option..."
                    isSearchable={false}
                    className="text-sm"
                    styles={{
                      control: (base, state) => ({
                        ...base,
                        backgroundColor: "#111111",
                        borderColor: state.isFocused ? "#444" : "#2f2e2e",
                        borderRadius: "12px",
                        padding: "6px 8px",
                        boxShadow: "none",
                        "&:hover": {
                          borderColor: "#555",
                        },
                      }),
                      singleValue: (base) => ({
                        ...base,
                        color: "#ffffff",
                      }),
                      placeholder: (base) => ({
                        ...base,
                        color: "#aaaaaa",
                      }),
                      menu: (base) => ({
                        ...base,
                        backgroundColor: "#111111",
                        borderRadius: "12px",
                        overflow: "hidden",
                        marginTop: "6px",
                        zIndex: 9999,
                      }),
                      option: (base, state) => ({
                        ...base,
                        backgroundColor: state.isFocused
                          ? "#1f1f1f"
                          : state.isSelected
                            ? "#2a2a2a"
                            : "#111111",
                        color: "#ffffff",
                        cursor: "pointer",
                        padding: "10px 14px",
                      }),
                      dropdownIndicator: (base) => ({
                        ...base,
                        color: "#ffffff",
                        "&:hover": {
                          color: "#cccccc",
                        },
                      }),
                      indicatorSeparator: () => ({
                        display: "none",
                      }),
                    }}
                  />
                </div>

                {/* Description Field - Always Visible But Disabled if no Title */}
                <div className="space-y-2 relative">
                  <div className="w-full flex justify-start gap-1 items-center">
                    <label
                      className={`text-sm font-medium ${!title ? "text-third/50" : "text-third"}`}
                    >
                      Description
                    </label>
                    {!title && (
                      <span className="text-xs text-third/40">(Optional)</span>
                    )}
                    {title && title !== "Other" && (
                      <span className="text-xs text-third/70">(Optional)</span>
                    )}
                    {title === "Other" && (
                      <span className="text-xs text-red-500">
                        * (Required for Other)
                      </span>
                    )}
                  </div>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    disabled={!title}
                    placeholder={
                      !title
                        ? "Select an inquiry type first..."
                        : title === "Other"
                          ? "Please describe your inquiry..."
                          : `Please provide more details on '${title}'...`
                    }
                    rows={4}
                    className={`w-full rounded-xl border px-4 py-3 outline-none transition resize-none
                                            ${
                                              !title
                                                ? "bg-secondary/50 border-third/20 text-third/50 cursor-not-allowed"
                                                : "bg-secondary border-third/40 text-primary focus:border-primary"
                                            }
                                        `}
                  />
                </div>
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-3 pt-6 mt-auto">
                <Button
                  showIcon={false}
                  variant="outlineSecondary"
                  onClick={handleClose}
                  disabled={isLoading}
                >
                  Cancel
                </Button>
                <Button
                  showIcon={false}
                  variant="ghost"
                  onClick={handleSubmit}
                  loading={isLoading}
                  locked={!title || (title === "Other" && !description.trim())}
                >
                  Send Inquiry
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Preload success background and mockup images */}
      <div className="absolute w-1.5 h-1.5 opacity-0 pointer-events-none overflow-hidden">
        <Image
          src="/sendPopupBg.png"
          alt="preload success bg"
          width={6}
          height={6}
          priority
        />
        <Image
          src="/leftDownlaodImage.webp"
          alt="preload success mockup"
          width={6}
          height={6}
          priority
        />
        <Image
          src="/app_qr.png"
          alt="preload success qr"
          width={6}
          height={6}
          priority
        />
      </div>
      {typeof document !== "undefined"
        ? createPortal(modalContent, document.body)
        : null}
    </>
  );
}

export default SendInquaryPopup;
