"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  PhoneCall,
  Copy,
  Check,
  CarFront,
} from "lucide-react";
import Button from "@/components/ui/button";
import { generateVehicleSlug } from "@/lib/helper";
import { markCallLeadCompletedByOwner } from "@/services/vehicle.service";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export default function CallLeadCard({ lead }) {
  const [isCopied, setIsCopied] = useState(false);
  const [isCompleted, setIsCompleted] = useState(
    () => Boolean(lead?.callCompletedByOwner)
  );
  const [isMarkingCompleted, setIsMarkingCompleted] = useState(false);

  useEffect(() => {
    setIsCompleted(Boolean(lead?.callCompletedByOwner));
  }, [lead?.callCompletedByOwner]);

  const queryClient = useQueryClient();

  if (!lead) return null;

  const {
    inquiryVehicleResponse: vehicle,
    inquirer,
    inquirerAttemptCount = 1,
    createdAt,
    updatedAt,
  } = lead;

  const callerName = inquirer
    ? [inquirer.firstname, inquirer.lastname].filter(Boolean).join(" ") ||
      "Interested Buyer"
    : "Interested Buyer";

  const rawPhone = inquirer?.phoneNumber || "";
  const countryCode = inquirer?.countryCode || "+91";
  const fullPhone = rawPhone
    ? rawPhone.startsWith("+")
      ? rawPhone
      : `${countryCode} ${rawPhone}`.trim()
    : "";
  const cleanPhone = fullPhone.replace(/[^0-9+]/g, "");

  const handleCopyPhone = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!cleanPhone) return;
    navigator.clipboard.writeText(cleanPhone);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleMarkCompleted = async (e) => {
    e?.preventDefault?.();
    e?.stopPropagation?.();
    if (isCompleted || isMarkingCompleted || !lead?.id) return;

    setIsMarkingCompleted(true);
    try {
      await markCallLeadCompletedByOwner(lead.id);
      setIsCompleted(true);
      toast.success("Call lead marked as completed!");
      queryClient.invalidateQueries({
        queryKey: ["received-call-leads-infinite"],
      });
      queryClient.invalidateQueries({
        queryKey: ["call-leads-kpis"],
      });
    } catch (err) {
      console.error("Error marking call lead as completed:", err);
      toast.error(
        err?.response?.data?.message ||
          "Failed to mark call lead as completed. Please try again."
      );
    } finally {
      setIsMarkingCompleted(false);
    }
  };

  const handleCallClick = (e) => {
    e?.preventDefault?.();
    e?.stopPropagation?.();
    if (!cleanPhone) return;
    window.location.href = `tel:${cleanPhone}`;
  };

  const vehicleTitle = vehicle
    ? [
        vehicle.makerName,
        vehicle.modelName,
        vehicle.variantName,
        vehicle.yearOfMfg ? `- ${vehicle.yearOfMfg}` : "",
      ]
        .filter(Boolean)
        .join(" ")
    : "Vehicle Details";

  const vehicleUrl = vehicle
    ? `/vehicle/details/${generateVehicleSlug(vehicle)}/${vehicle.id}`
    : "#";

  const localDate = (updatedAt || createdAt)
    ? new Date(updatedAt || createdAt).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "N/A";

  return (
    <div className="rounded-xl border border-third/40 p-4 lg:px-6 lg:py-5 flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 lg:gap-6 shadow-sm hover:shadow-md transition">
      {/* LEFT IMAGE + INFO (Stacks on mobile & tablet, row on desktop) */}
      <div className="flex flex-col lg:flex-row items-start gap-4 lg:gap-5 w-full">
        {/* Vehicle Image (Full width on mobile/tablet, fixed on desktop) */}
        <Link
          href={vehicleUrl}
          className="w-full lg:w-48 h-48 lg:h-42 rounded-xl overflow-hidden border border-third/30 bg-primary/5 shrink-0 relative block cursor-pointer transition hover:opacity-90"
        >
          {vehicle?.thumbnailUrl ? (
            <Image
              src={vehicle.thumbnailUrl}
              alt={vehicleTitle}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-third">
              <CarFront size={32} />
            </div>
          )}
        </Link>

        {/* Content */}
        <div className="space-y-2 w-full flex-1">
          <div className="flex justify-between items-start gap-2">
            <div className="space-y-1">
              <p className="text-sm text-third">
                Caller / Buyer:{" "}
                <span className="text-primary font-semibold capitalize">
                  {callerName}
                </span>
              </p>

              {cleanPhone && (
                <p className="text-sm text-third">
                  Phone Number:{" "}
                  <span className="text-primary font-semibold">
                    {fullPhone}
                  </span>
                </p>
              )}

              <p className="text-sm text-third">
                Vehicle:{" "}
                <span className="text-primary font-semibold">
                  {vehicleTitle}
                </span>
              </p>

              <p className="text-sm text-third">
                Call Attempts:{" "}
                <span className="text-primary font-semibold">
                  {inquirerAttemptCount}
                </span>
              </p>

              <p className="text-xs text-third/80">
                Date:{" "}
                <span className="text-primary font-semibold">
                  {localDate}
                </span>
              </p>
            </div>

            {/* Status Pill (Visible only on mobile/tablet here) */}
            <div className="block lg:hidden shrink-0">
              <StatusPill isCompleted={isCompleted} />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 pt-3">
            {cleanPhone && (
              <Button
                showIcon={false}
                variant="ghost"
                size="sm"
                onClick={handleCallClick}
              >
                <PhoneCall size={16} className="mr-2" />
                Call Back
              </Button>
            )}

            {!isCompleted && (
              <Button
                showIcon={false}
                variant="outlineSecondary"
                size="sm"
                onClick={handleMarkCompleted}
                loading={isMarkingCompleted}
              >
                <Check size={16} className="mr-2" />
                Mark Completed
              </Button>
            )}

            {cleanPhone && (
              <Button
                showIcon={false}
                variant="outlineSecondary"
                size="sm"
                onClick={handleCopyPhone}
              >
                {isCopied ? (
                  <Check size={16} className="mr-2 text-green-500" />
                ) : (
                  <Copy size={16} className="mr-2" />
                )}
                {isCopied ? "Copied" : "Copy Phone"}
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Status Pill (Visible only on desktop here) */}
      <div className="hidden lg:flex items-center shrink-0">
        <StatusPill isCompleted={isCompleted} />
      </div>
    </div>
  );
}

/* Status Pill */
function StatusPill({ isCompleted }) {
  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-semibold border ${
        isCompleted
          ? "bg-green-500/15 text-green-400 border-green-500/40"
          : "bg-yellow-400/15 text-yellow-400 border-yellow-400/40"
      }`}
    >
      {isCompleted ? "Completed" : "Pending Call"}
    </span>
  );
}

