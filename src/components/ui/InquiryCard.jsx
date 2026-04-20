import Link from "next/link";
import Button from "@/components/ui/button";
import {
  approveInquiry,
  closeInquiry,
  rejectInquiry,
} from "@/services/inquiry.service";
import {
  Check,
  X,
  Lock,
  MessageCircle,
  Clock,
  BadgeCheck,
  Loader2,
} from "lucide-react";
import Image from "next/image";
import CloseInqPopup from "../features/consult/details/dashboard/components/CloseInqPopup";
import { useState } from "react";
import { createSlug } from "@/lib/helper";
import { markAsSoldVehicle } from "@/services/vehicle.service";
import MarkSoldPopup from "./MarkSoldPopup";

export default function InquiryCard({ inquiry, onStatusChange }) {
  const [showClosePopup, setShowClosePopup] = useState(false);
  const [showMarkSoldPopup, setShowMarkSoldPopup] = useState(false);
  const [loadingAction, setLoadingAction] = useState(null); // 'APPROVE', 'REJECT', 'CLOSE', 'MARK_SOLD'

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
    inquiryCloseReason,
  } = inquiry;



  const isPending = inquiryStatus === "PENDING";
  const isApproved = inquiryStatus === "APPROVED";
  const isRejected = inquiryStatus === "REJECTED";
  const isClosed = inquiryStatus?.startsWith("CLOSED");

  const vehicleTitle = `${inquiryVehicleResponse.makerName} ${inquiryVehicleResponse.modelName
    } ${inquiryVehicleResponse.variantName} - ${inquiryVehicleResponse.yearOfMfg
    }`;

  const vehicleImage =
    inquiryVehicleResponse.thumbnailUrl ||
    "https://images.pexels.com/photos/831475/pexels-photo-831475.jpeg";

  //   Handlers
  const handleApprove = async () => {
    if (loadingAction) return;
    try {
      setLoadingAction("APPROVE");
      await approveInquiry(inquiry.id);
      onStatusChange(inquiry.id, "APPROVED");
    } catch (error) {
      console.error("Approve error:", error);
    } finally {
      setLoadingAction(null);
    }
  };

  const handleReject = async () => {
    if (loadingAction) return;
    try {
      setLoadingAction("REJECT");
      await rejectInquiry(inquiry.id);
      onStatusChange(inquiry.id, "REJECTED");
    } catch (error) {
      console.error("Reject error:", error);
    } finally {
      setLoadingAction(null);
    }
  };

  const handleClose = async (closeReason) => {
    if (loadingAction) return;
    try {
      setLoadingAction("CLOSE");
      await closeInquiry(inquiry.id, closeReason);
      onStatusChange(inquiry.id, "CLOSED_BY_VEHICLE_OWNER");
    } catch (error) {
      console.error("Close error:", error);
    } finally {
      setLoadingAction(null);
    }
  };

  const handleMarkSold = async (closingPrice) => {
    if (loadingAction) return;
    try {
      setLoadingAction("MARK_SOLD");
      await markAsSoldVehicle(inquiryVehicleResponse.id, closingPrice);
      // Update local state by telling parent the vehicle is sold
      // This is slightly tricky as onStatusChange usually takes a status string for the inquiry
      // But we can trigger a refresh or handle it if onStatusChange allows.
      // For now, we assume the parent will handle the refresh or we can manually 
      // update the inquiry object if we had local state for it.
      // Since it's passed as a prop, we usually rely on onStatusChange.
      // Let's call onStatusChange with the current status to trigger a refresh in parent.
      onStatusChange(inquiry.id, inquiryStatus);
    } catch (error) {
      console.error("Mark as sold error:", error);
    } finally {
      setLoadingAction(null);
      setShowMarkSoldPopup(false);
    }
  };

  //   Date Formatting
  const localDate = new Date(createdAt).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="rounded-xl border border-third/40  p-4 lg:px-6 lg:py-5 flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 lg:gap-6 shadow-sm hover:shadow-md transition">

      {/*   LEFT IMAGE + INFO (Stacks on mobile & tablet, row on desktop) */}
      <div className="flex flex-col lg:flex-row items-start gap-4 lg:gap-5 w-full">

        {/*   Vehicle Image (Full width on mobile/tablet, fixed on desktop) */}
        <Link
          href={`/vehicle/details/${createSlug(vehicleTitle)}/${inquiryVehicleResponse.id}`}
          className="w-full lg:w-48 h-48 lg:h-42 rounded-xl overflow-hidden border border-third/30 bg-primary/5 shrink-0 relative block cursor-pointer transition hover:opacity-90"
        >
          <Image
            src={vehicleImage}
            alt="Vehicle"
            fill
            className="object-cover"
          />
        </Link>

        {/*   Content */}
        <div className="space-y-2 w-full flex-1">

          <div className="flex justify-between items-start gap-2">
            <div className="space-y-1">
              <p className="text-sm text-third">
                Inquiry Title:{" "}
                <span className="text-primary font-semibold">{inquiry.inquiryTitle || "N/A"}</span>
              </p>

              <p className="text-sm text-third">
                Inquiry Description:{" "}
                <span className="text-primary font-semibold">{inquiry.inquiryDescription || "N/A"}</span>
              </p>

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

              {/*   Date or Closed Date Feature */}
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

            {/*  Status Pill (Visible only on mobile/tablet here) */}
            <div className="block lg:hidden shrink-0">
              <StatusPill status={inquiryStatus} />
            </div>
          </div>

          {/*  Closed Reason */}
          {isClosed && (
            <p className="text-xs flex items-center gap-2 text-third pt-1">
              <span className="text-primary font-semibold">Reason: {inquiryCloseReason || "N/A"}</span>
            </p>
          )}

          {/*   Inspection Completed */}
          {isInspected && isApproved && (
            <p className="text-xs flex items-center gap-2 text-green-500 font-semibold pt-1">
              <BadgeCheck size={15} className="text-green-500" />
              AVX Inspection Completed
            </p>
          )}

          {/*   Inspection Tip */}
          {isApproved && !isInspected && (
            <p className="text-xs flex items-center gap-2 text-yellow-400 font-semibold pt-1">
              <Clock size={14} />
              Tip: AVX-inspected vehicles close faster
            </p>
          )}

          {/*   Pending Section Messages & Buttons */}
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

              <div className="flex flex-wrap gap-3 pt-3">
                <Button
                  showIcon={false}
                  variant="ghost"
                  size="md"
                  onClick={handleApprove}
                  loading={loadingAction === "APPROVE"}
                >
                  <Check size={16} className="mr-2" />
                  Accept
                </Button>

                <Button
                  showIcon={false}
                  variant="outlineSecondary"
                  onClick={handleReject}
                  loading={loadingAction === "REJECT"}
                >
                  <X size={16} className="mr-2" />
                  Reject
                </Button>
              </div>
            </div>
          )}

          {/*   Approved Section Buttons */}
          {isApproved && (
            <div className="flex flex-wrap gap-3 pt-4">
              {!isInspected && (
                <Button
                  showIcon={false}
                  size="sm"
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
                size="sm"
                onClick={() => setShowClosePopup(true)}
                loading={loadingAction === "CLOSE"}
              >
                <Lock size={16} className="mr-2" />
                Close Inquiry
              </Button>

              <Button
                showIcon={false}
                variant="ghost"
                size="sm"
              >
                <MessageCircle size={16} className="mr-2" />
                Open Chat
              </Button>
            </div>
          )}

          {/*   Rejected Section */}
          {isRejected && (
            <p className="text-sm text-red-400 font-semibold pt-2">
              Inquiry Rejected
            </p>
          )}

          {/*   Closed & Not Sold Section */}
          {isClosed && !inquiryVehicleResponse.isVehicleSold && (
            <div className="pt-4">
              <Button
                showIcon={false}
                variant="ghost"
                size="sm"
                onClick={() => setShowMarkSoldPopup(true)}
                loading={loadingAction === "MARK_SOLD"}
              >
                Mark as Sold
              </Button>
            </div>
          )}

          {/*   Sold Badge */}
          {inquiryVehicleResponse.isVehicleSold && (
            <p className="text-xs flex items-center gap-2 text-green-600 font-bold pt-2 uppercase tracking-wide">
              <BadgeCheck size={16} />
              Vehicle Sold
            </p>
          )}
        </div>
      </div>

      {/*   Status Pill (Visible only on desktop here) */}
      <div className="hidden lg:flex items-center shrink-0">
        <StatusPill status={inquiryStatus} />
      </div>

      {/*   Close Popup */}
      {showClosePopup && (
        <CloseInqPopup
          loading={loadingAction === "CLOSE"}
          onClose={() => setShowClosePopup(false)}
          onConfirm={async ({ reason, comment }) => {
            const closeReason = reason === "Other" ? comment : reason;
            await handleClose(closeReason);
            setShowClosePopup(false);
          }}
        />
      )}

      {/*   Mark as Sold Popup */}
      {showMarkSoldPopup && (
        <MarkSoldPopup
          loading={loadingAction === "MARK_SOLD"}
          onClose={() => setShowMarkSoldPopup(false)}
          onConfirm={handleMarkSold}
        />
      )}
    </div>
  );
}

/*   Status Pill */
function StatusPill({ status }) {
  const map = {
    PENDING: "bg-yellow-400/15 text-yellow-400 border-yellow-400/40",
    APPROVED: "bg-green-500/15 text-green-500 border-green-500/40",
    REJECTED: "bg-red-500/15 text-red-500 border-red-500/40",
    CLOSED_BY_VEHICLE_OWNER: "bg-gray-500/15 text-gray-400 border-gray-500/40",
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