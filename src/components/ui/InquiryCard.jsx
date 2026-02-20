import Button from "@/components/ui/button";
import {
  approveInquiry,
  closeInquiry,
  rejectInquiry,
} from "@/services/inquiry.service";
import { Check, X, Lock, MessageCircle, Clock, BadgeCheck } from "lucide-react";
import Image from "next/image";
import CloseInqPopup from "../features/consult/details/dashboard/components/CloseInqPopup";
import { useState } from "react";

export default function InquiryCard({ inquiry, onStatusChange }) {
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
    inquirer,
    inquiryStatus,
    createdAt,
    isInspected,
  } = inquiry;

  const isPending = inquiryStatus === "PENDING";
  const isApproved = inquiryStatus === "APPROVED";
  const isRejected = inquiryStatus === "REJECTED";
  const isClosed = inquiryStatus === "CLOSED_BY_VEHICLE_OWNER";

  const vehicleTitle = `${inquiryVehicleResponse.makerName} ${
      inquiryVehicleResponse.modelName
  } ${inquiryVehicleResponse.variantName} - ${
      inquiryVehicleResponse.yearOfMfg
  }`;

  const vehicleImage =
      inquiryVehicleResponse.image ||
      "https://images.pexels.com/photos/831475/pexels-photo-831475.jpeg";

  // ✅ Handlers
  const handleApprove = async () => {
    await approveInquiry(inquiry.id);
    onStatusChange(inquiry.id, "APPROVED");
  };

  const handleReject = async () => {
    await rejectInquiry(inquiry.id);
    onStatusChange(inquiry.id, "REJECTED");
  };

  const handleClose = async () => {
    await closeInquiry(inquiry.id);
    onStatusChange(inquiry.id, "CLOSED_BY_VEHICLE_OWNER");
  };

  // ✅ Date Formatting
  const localDate = new Date(createdAt).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
      <div className="rounded-2xl border border-third/40 bg-secondary p-4 md:px-6 md:py-5 flex flex-col md:flex-row md:items-start md:justify-between gap-4 md:gap-6 shadow-sm hover:shadow-md transition">

        {/* ✅ LEFT IMAGE + INFO (Stacks on mobile, row on desktop) */}
        <div className="flex flex-col md:flex-row items-start gap-4 md:gap-5 w-full">

          {/* ✅ Vehicle Image (Full width on mobile) */}
          <div className="w-full md:w-48 h-48 md:h-42 rounded-xl overflow-hidden border border-third/30 bg-primary/5 shrink-0 relative">
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
                  Vehicle:{" "}
                  <span className="text-primary font-semibold">{vehicleTitle}</span>
                </p>

                <p className="text-sm text-third">
                  From:{" "}
                  <span className="text-primary font-semibold">
                  {inquirer.firstname} {inquirer.lastname}
                </span>
                </p>

                {/* ✅ Date or Closed Date Feature */}
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

              {/* ✅ Status Pill (Visible only on mobile here to save space) */}
              <div className="block md:hidden shrink-0">
                <StatusPill status={inquiryStatus} />
              </div>
            </div>

            {/* ✅ Closed Reason */}
            {isClosed && (
                <p className="text-xs flex items-center gap-2 text-third pt-1">
                  <span className="text-primary font-semibold">Reason:</span>
                  Closed by vehicle owner request
                </p>
            )}

            {/* ✅ Inspection Completed */}
            {isInspected && isApproved && (
                <p className="text-xs flex items-center gap-2 text-green-500 font-semibold pt-1">
                  <BadgeCheck size={15} className="text-green-500" />
                  AVX Inspection Completed
                </p>
            )}

            {/* ✅ Inspection Tip */}
            {isApproved && !isInspected && (
                <p className="text-xs flex items-center gap-2 text-yellow-400 font-semibold pt-1">
                  <Clock size={14} />
                  Tip: AVX-inspected vehicles close faster
                </p>
            )}

            {/* ✅ Pending Section Messages & Buttons */}
            {isPending && (
                <div className="pt-2 space-y-2">
                  <p className="text-xs text-third flex items-center gap-2">
                    <Clock size={14} className="text-yellow-400 shrink-0" />
                    <span>
                  Waiting for response — buyers respond faster within 30 mins
                </span>
                  </p>

                  <p className="text-xs text-third flex items-center gap-2">
                    <MessageCircle size={14} className="text-blue-400 shrink-0" />
                    <span>Chat starts after accepting</span>
                  </p>

                  {/* Buttons wrap cleanly on mobile */}
                  <div className="flex flex-wrap gap-3 pt-3">
                    <Button
                        showIcon={false}
                        variant="ghost"
                        size="md"
                        onClick={handleApprove}
                    >
                      <Check size={16} className="mr-2" />
                      Accept
                    </Button>

                    <Button
                        showIcon={false}
                        variant="outlineSecondary"
                        onClick={handleReject}
                    >
                      <X size={16} className="mr-2" />
                      Reject
                    </Button>
                  </div>
                </div>
            )}

            {/* ✅ Approved Section Buttons */}
            {isApproved && (
                <div className="flex flex-wrap gap-3 pt-4">
                  {!isInspected && (
                      <Button
                          showIcon={false}
                          variant="outlineSecondary"
                          onClick={() => console.log("Request Inspection")}
                      >
                        <BadgeCheck size={16} className="mr-2" />
                        Request Inspection
                      </Button>
                  )}

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
                  Inquiry Rejected
                </p>
            )}
          </div>
        </div>

        {/* ✅ Status Pill (Visible only on desktop here) */}
        <div className="hidden md:flex items-center shrink-0">
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
    CLOSED_BY_VEHICLE_OWNER: "bg-gray-500/15 text-gray-400 border-gray-500/40",
  };

  return (
      <span
          className={`text-[10px] sm:text-xs px-3 py-1 sm:px-4 rounded-full border font-semibold whitespace-nowrap ${
              map[status]
          }`}
      >
      {status.replaceAll("_", " ")}
    </span>
  );
}