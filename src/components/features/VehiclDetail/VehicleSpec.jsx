"use client";
import { useState } from "react";
import FeatureGroup from "@/components/ui/FeatureGroup";
import { Calendar, ChevronDown, Clock, X } from "lucide-react";
import Button from "@/components/ui/button";
import Image from "next/image";

export default function VehicleSpec({ open, setOpen }) {
  const [showModal, setShowModal] = useState(false);
  const [animateModal, setAnimateModal] = useState(false);
  const [inspectionType, setInspectionType] = useState("report");
  const [inspectionDate, setInspectionDate] = useState("");
  const [inspectionTime, setInspectionTime] = useState("");
  const inspectionAvailable = true;

  const closeModal = () => {
    setAnimateModal(false);
    setTimeout(() => setShowModal(false), 300); // match duration
  };

  const handleConfirm = () => {
    const payload = {
      inspectionType,
      ...(inspectionType === "video" && {
        inspectionDate,
        inspectionTime,
      }),
    };

    console.log(payload);
  };
  return (
    <section className="relative rounded-2xl overflow-hidden  text-primary border border-third/60">
      {/* <div className="absolute inset-0 bg-[url('/bg_blur.jpg')] bg-cover bg-center opacity-40 blur-lg z-0" /> */}

      <div className="relative z-10">
        <div
          className="flex justify-between items-center px-6 py-3 text-primary cursor-pointer"
          onClick={() => setOpen((prev) => !prev)}
        >
          <h3 className="text-xl font-semibold">AVX Inspection Report</h3>
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
          className={`${open ? "block" : "hidden"} mt-3 space-y-8 transition-all duration-500 ease-in-out`}
        >
          {/* ================= AVX INSPECTION REPORT ================= */}
          <div className="space-y-6 px-6 pb-6">
            {inspectionAvailable ? (
              <>
                <p className="text-xs text-third font-normal mt-1">
                  AVX Inspection Available Last verified on: 12 Jan 2025
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                  <FeatureGroup
                    title="SAFETY"
                    items={["Side airbags", "Airbags"]}
                  />

                  <FeatureGroup
                    title="COMFORT & CONVENIENCE"
                    items={[
                      "Puddle lamp",
                      "Cruise control",
                      "Ventilated seats",
                      "Keyless start",
                      "Wireless phone charging",
                    ]}
                  />

                  <FeatureGroup title="EXTERIOR" items={["Sunroof"]} />
                </div>
                <div className="flex justify-end">
                  <Button variant="outline" showIcon={true} locked={true}>
                    View Inspection Report
                  </Button>
                </div>
                <div className="md:col-span-3 border-t border border-third/40" />
                <div>
                  <h3 className="text-xl font-semibold">
                    AVX Inspection Avialable
                  </h3>
                </div>
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
                  <p className="text-sm font-medium">Choose inspection type</p>

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
                        <p className="text-sm font-medium mt-1">₹1,499</p>
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
                        <p className="text-sm font-medium mt-1">₹1,999</p>
                      </div>
                    </label>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-sm text-primary font-normal mt-1">
                    Recommended for high-value vehicles
                  </p>
                  <div>
                    <Button
                      variant="outline"
                      size="md"
                      showIcon={false}
                      onClick={() => {
                        setShowModal(true);
                        setTimeout(() => setAnimateModal(true), 10);
                      }}
                    >
                      Request New AVX Inspection
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="space-y-3">
                {/* Status */}
                <div className="flex items-center gap-2 text-sm">
                  <span className="px-2 py-0.5 rounded-full bg-yellow-500/15 text-yellow-400 font-medium">
                    Inspection not available
                  </span>
                  {/* <span className="text-third">
                    No recent AVX report found for this vehicle
                  </span> */}
                </div>

                {/* Heading */}
                <div>
                  <p className="text-lg font-semibold text-primary">
                    Want deeper verification before deciding?
                  </p>
                  <p className="text-sm text-third mt-1">
                    Request a fresh AVX inspection to get a complete picture of
                    the vehicle’s condition.
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
                <div className="flex justify-end">
                  <Button
                    variant="outline"
                    size="md"
                    showIcon={false}
                    onClick={() => {
                      setShowModal(true);
                      setTimeout(() => setAnimateModal(true), 10);
                    }}
                  >
                    Request AVX Inspection
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* ================= MODAL ================= */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
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
    relative z-50 w-[60%] max-w-md md:flex rounded-2xl
    bg-secondary overflow-hidden text-primary
    border border-third/50 shadow-2xl
    transition-all duration-300 ease-out max-h-[60%]
    ${
      animateModal
        ? "opacity-100 scale-100 translate-y-0"
        : "opacity-0 scale-95 translate-y-4"
    }
  `}
          >
            <div
              className="absolute right-3 top-3 cursor-pointer bg-secondary w-10 h-10 rounded-full flex items-center justify-center"
              onClick={closeModal}
            >
              <X size={20} />
            </div>
            <div className="p-6 space-y-5 md:w-[50%] overflow-y-scroll custom-scrollbar">
              {/* Header */}
              <h2 className="text-xl font-semibold">
                Request Fresh AVX Inspection
              </h2>

              <div className="border-t border-third/40" />

              {/* Existing inspection */}
              <div className="text-sm flex gap-1 items-center">
                <p className="font-medium">Existing inspection :</p>
                <p className="text-third">12 Jan 2025 (35 days ago)</p>
              </div>

              {/* Benefits */}
              <div className="text-sm space-y-2">
                <p className="font-medium">A new inspection will:</p>
                <ul className="list-disc list-inside space-y-1 text-third">
                  <li>Re-verify current condition</li>
                  <li>Check for recent changes</li>
                  <li>Generate updated report</li>
                </ul>
              </div>

              {/* Inspection Type */}
              <div className="space-y-3">
                <p className="text-sm font-medium">Choose inspection type</p>

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
                      <p className="text-sm font-medium mt-1">₹1,499</p>
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
                        Live video walkthrough with inspector + detailed digital
                        report
                      </p>
                      <p className="text-sm font-medium mt-1">₹1,999</p>
                    </div>
                  </label>
                </div>
              </div>

              {/* Schedule Video Inspection */}
              {inspectionType === "video" && (
                <div
                  className="
      mt-5 rounded-xl border border-third/40
      bg-secondary/60 p-4 space-y-4
    "
                >
                  {/* Header */}
                  <div className="flex items-center gap-2">
                    <Calendar size={16} className="text-primary" />
                    <p className="text-sm font-semibold">
                      Schedule Video Inspection
                    </p>
                  </div>

                  {/* Inputs */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Date */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-third">
                        Preferred Date
                      </label>

                      <div
                        className="
            flex items-center gap-2 px-3 py-2 rounded-lg
            border border-third/40 bg-secondary
            focus-within:border-primary
          "
                      >
                        <Calendar size={14} className="text-third" />
                        <input
                          type="date"
                          value={inspectionDate}
                          onChange={(e) => setInspectionDate(e.target.value)}
                          min={new Date().toISOString().split("T")[0]}
                          className="
              w-full text-sm bg-transparent
              focus:outline-none
            "
                        />
                      </div>
                    </div>

                    {/* Time */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-third">
                        Preferred Time
                      </label>

                      <div
                        className="
            flex items-center gap-2 px-3 py-2 rounded-lg
            border border-third/40 bg-secondary
            focus-within:border-primary
          "
                      >
                        <Clock size={14} className="text-third" />
                        <input
                          type="time"
                          value={inspectionTime}
                          onChange={(e) => setInspectionTime(e.target.value)}
                          className="
              w-full text-sm bg-transparent
              focus:outline-none
            "
                        />
                      </div>
                    </div>
                  </div>

                  {/* Helper text */}
                  <p className="text-xs text-third leading-relaxed">
                    Our inspector will confirm the exact slot based on
                    availability.
                  </p>
                </div>
              )}

              {/* Actions */}
              <div className="flex justify-end gap-3">
                <Button
                  variant="outline"
                  size="md"
                  onClick={handleConfirm}
                  showIcon={false}
                >
                  Confirm & Proceed
                </Button>
              </div>
            </div>
            <div className="md:w-[50%]">
              <Image
                src="/bg.jpg"
                alt="avx-payment"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
