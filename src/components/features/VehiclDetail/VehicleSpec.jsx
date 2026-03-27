"use client";
import { useState } from "react";
import FeatureGroup from "@/components/ui/FeatureGroup";
import { Calendar, ChevronDown, Clock, X } from "lucide-react";
import Button from "@/components/ui/button";
import Image from "next/image";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";

export default function VehicleSpec({ open, setOpen }) {
  const [showModal, setShowModal] = useState(false);
  const [animateModal, setAnimateModal] = useState(false);
  const [inspectionType, setInspectionType] = useState("report");
  const [inspectionDate, setInspectionDate] = useState(null);
  const [inspectionTime, setInspectionTime] = useState(null);

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

  const closeModal = () => {
    setAnimateModal(false);
    setTimeout(() => setShowModal(false), 300); // match duration
  };

  const handleConfirm = () => {
    const payload = {
      inspectionType,
      ...(inspectionType === "video" && {
        inspectionDate: inspectionDate ? inspectionDate.toLocaleDateString() : "",
        inspectionTime: inspectionTime ? inspectionTime.value : "",
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
              className={`transition-transform duration-300 ${open ? "rotate-180" : "rotate-0"
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
        ${inspectionType === "report"
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
        ${inspectionType === "video"
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
                    <div className="flex flex-col gap-3 md:flex-row justify-between items-center">
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
        relative z-50 mx-3
        w-full md:w-[60%]  
        max-w-md md:max-w-none
        h-[70vh] md:h-auto  
        md:max-h-[60%]
        flex md:flex
        rounded-2xl md:rounded-2xl
        bg-secondary overflow-hidden text-primary
        border border-third/50 shadow-2xl
        transition-all duration-300 ease-out
        ${animateModal
                ? "opacity-100 scale-100 translate-y-0"
                : "opacity-0 scale-95 translate-y-4"
              }
      `}
          >

            {/* CLOSE */}
            <div
              className="absolute right-3 top-3 cursor-pointer bg-primary text-secondary md:bg-secondary md:text-primary w-8 h-8 rounded-full flex items-center justify-center z-10"
              onClick={closeModal}
            >
              <X size={20} />
            </div>

            {/* CONTENT */}
            <div className="p-4 md:p-6 space-y-5 w-full md:w-[50%] overflow-y-auto custom-scrollbar">

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
        ${inspectionType === "report"
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
        ${inspectionType === "video"
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
                    {/* Date Picker */}
                    <div className="space-y-1.5 text-primary">
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
                        <DatePicker
                          selected={inspectionDate}
                          onChange={(date) => setInspectionDate(date)}
                          dateFormat="MMMM d, yyyy"
                          minDate={new Date()}
                          placeholderText="Select Date"
                          className="w-full text-sm bg-transparent focus:outline-none text-primary cursor-pointer"
                          calendarClassName="dark-datepicker"
                        />
                      </div>
                    </div>

                    {/* Time Picker */}
                    <div className="space-y-1.5 text-primary">
                      <label className="text-xs font-medium text-third">
                        Preferred Time
                      </label>

                      <div
                        className="
            flex items-center gap-2 px-3 py-1 rounded-lg
            border border-third/40 bg-secondary
            focus-within:border-primary
          "
                      >
                        <Clock size={14} className="text-third" />
                        <Select
                          options={timeOptions}
                          value={inspectionTime}
                          onChange={(option) => setInspectionTime(option)}
                          placeholder="Select Time"
                          className="w-full text-sm"
                          styles={{
                            control: (base, state) => ({
                              ...base,
                              backgroundColor: "transparent",
                              border: "none",
                              boxShadow: "none",
                              minHeight: "auto",
                            }),
                            singleValue: (base) => ({
                              ...base,
                              color: "#ffffff",
                            }),
                            placeholder: (base) => ({
                              ...base,
                              color: "#bebebe",
                            }),
                            menu: (base) => ({
                              ...base,
                              backgroundColor: "#121212",
                              borderRadius: "12px",
                              border: "1px solid #2f2e2e",
                              zIndex: 100,
                            }),
                            menuList: (base) => ({
                              ...base,
                              padding: "0",
                              "&::-webkit-scrollbar": {
                                display: "none",
                              },
                              msOverflowStyle: "none",
                              scrollbarWidth: "none",
                            }),
                            option: (base, state) => ({
                              ...base,
                              backgroundColor: state.isFocused
                                ? "rgba(255,255,255,0.1)"
                                : state.isSelected
                                  ? "rgba(255,255,255,0.2)"
                                  : "transparent",
                              color: "#ffffff",
                              cursor: "pointer",
                            }),
                            indicatorSeparator: () => ({ display: "none" }),
                            dropdownIndicator: (base) => ({
                              ...base,
                              color: "#bebebe",
                              padding: "0 4px",
                              "&:hover": { color: "#ffffff" },
                            }),
                          }}
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
            <div className="hidden md:block md:w-[50%]">
              <Image
                width={500}
                height={500}
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
