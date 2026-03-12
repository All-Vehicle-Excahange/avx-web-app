import Button from "@/components/ui/button";
import { closeInquiry } from "@/services/inquiry.service";
import { Lock, MessageCircle, Clock, BadgeCheck } from "lucide-react";
import Image from "next/image";
import CloseInqPopup from "../features/consult/details/dashboard/components/CloseInqPopup";
import { useState } from "react";

export default function MyInquiryCard({ inquiry, onStatusChange }) {
  const [showClosePopup, setShowClosePopup] = useState(false);

  if (!inquiry) {
    return (
      <div className="rounded-xl border border-third/30 bg-secondary p-5 text-third">
        Loading Inquiry...
      </div>
    );
  }

  const {
    inquiryVehicleResponse,
    inquiryStatus,
    createdAt,
    isInspected,
  } = inquiry;

  const isPending = inquiryStatus === "PENDING";
  const isApproved = inquiryStatus === "APPROVED";
  const isRejected = inquiryStatus === "REJECTED";
  const isClosed = inquiryStatus === "CLOSED_BY_INQUIRER";

  const vehicleTitle = `${inquiryVehicleResponse.makerName} ${inquiryVehicleResponse.modelName
    } ${inquiryVehicleResponse.variantName} - ${inquiryVehicleResponse.yearOfMfg
    }`;

  const vehicleImage =
    inquiryVehicleResponse.thumbnailUrl ||
    "https://images.pexels.com/photos/831475/pexels-photo-831475.jpeg";

  // ✅ Handlers
  const handleClose = async () => {
    await closeInquiry(inquiry.id);
    onStatusChange(inquiry.id, "CLOSED_BY_INQUIRER");
  };

  // ✅ Date Formatting
  const localDate = new Date(createdAt).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="rounded-2xl border border-third/40  p-4 lg:px-6 lg:py-5 flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 lg:gap-6 shadow-sm hover:shadow-md transition">

      {/* ✅ LEFT IMAGE + INFO */}
      <div className="flex flex-col lg:flex-row items-start gap-4 lg:gap-5 w-full">

        {/* ✅ Vehicle Image */}
        <div className="w-full lg:w-48 h-48 lg:h-42 rounded-xl overflow-hidden border border-third/30 bg-primary/5 shrink-0 relative">
          <Image
            src={vehicleImage}
            alt="Vehicle"
            fill
            className="object-cover"
          />
        </div>

        {/* ✅ Content */}
        <div className="space-y-2 w-full flex-1">

          <div className="flex justify-between items-start gap-2">
            <div className="space-y-1">
              <p className="text-sm text-third">
                Inquiry Title:{" "}
                <span className="text-primary font-semibold">{inquiry.inquiryTitle || "N/A"}</span>
              </p>

              <p className="text-sm text-third">
                Inquiry Description
                <span className="text-primary font-semibold">{inquiry.inquiryDescription || "N/A"}</span>
              </p>

              <p className="text-sm text-third">
                Vehicle:{" "}
                <span className="text-primary font-semibold">{vehicleTitle}</span>
              </p>

              {/* ✅ Date or Closed Date */}
              {isClosed ? (
                <p className="text-xs text-third/80">
                  Closed on:{" "}
                  <span className="text-primary font-semibold">{localDate}</span>
                </p>
              ) : (
                <p className="text-xs text-third/80">
                  Date:{" "}
                  <span className="text-primary font-semibold">{localDate}</span>
                </p>
              )}
            </div>

            {/* ✅ Status Pill (mobile/tablet) */}
            <div className="block lg:hidden shrink-0">
              <StatusPill status={inquiryStatus} />
            </div>
          </div>

          {/* ✅ Closed Reason */}
          {isClosed && (
            <p className="text-xs flex items-center gap-2 text-third pt-1">
              <span className="text-primary font-semibold">Reason:</span>
              Closed by you
            </p>
          )}

          {/* ✅ Inspection Completed */}
          {isInspected && isApproved && (
            <p className="text-xs flex items-center gap-2 text-green-500 font-semibold pt-1">
              <BadgeCheck size={15} className="text-green-500" />
              AVX Inspection Completed
            </p>
          )}

          {/* ✅ Pending Section */}
          {isPending && (
            <div className="pt-2 space-y-2">
              <p className="text-xs text-third flex items-center gap-2">
                <Clock size={14} className="text-yellow-400 shrink-0" />
                <span>
                  Waiting for the vehicle owner to respond
                </span>
              </p>
            </div>
          )}

          {/* ✅ Approved Section */}
          {isApproved && (
            <div className="flex flex-wrap gap-3 pt-4">
              <Button
                showIcon={false}
                variant="ghost"
                onClick={() => setShowClosePopup(true)}
              >
                <Lock size={16} className="mr-2" />
                Close Inquiry
              </Button>

              <Button showIcon={false} variant="ghost">
                <MessageCircle size={16} className="mr-2" />
                Open Chat
              </Button>
            </div>
          )}

          {/* ✅ Rejected Section */}
          {isRejected && (
            <p className="text-sm text-red-400 font-semibold pt-2">
              Inquiry Rejected by Owner
            </p>
          )}
        </div>
      </div>

      {/* ✅ Status Pill (desktop) */}
      <div className="hidden lg:flex items-center shrink-0">
        <StatusPill status={inquiryStatus} />
      </div>

      {/* ✅ Close Popup */}
      {showClosePopup && (
        <CloseInqPopup
          onClose={() => setShowClosePopup(false)}
          onConfirm={() => {
            handleClose();
            setShowClosePopup(false);
          }}
        />
      )}
    </div>
  );
}

/* ✅ Status Pill */
function StatusPill({ status }) {
  const map = {
    PENDING: "bg-yellow-400/15 text-yellow-400 border-yellow-400/40",
    APPROVED: "bg-green-500/15 text-green-500 border-green-500/40",
    REJECTED: "bg-red-500/15 text-red-500 border-red-500/40",
    CLOSED_BY_INQUIRER: "bg-gray-500/15 text-gray-400 border-gray-500/40",
  };

  return (
    <span
      className={`text-[10px] sm:text-xs px-3 py-1 sm:px-4 rounded-full border font-semibold whitespace-nowrap ${map[status]
        }`}
    >
      {status.replaceAll("_", " ")}
    </span>
  );
}
