import Button from "@/components/ui/button";
import {
  approveInquiry,
  closeInquiry,
  rejectInquiry,
} from "@/services/inquiry.service";
import { Check, X, Lock } from "lucide-react";
import { useEffect } from "react";

export default function InquiryCard({ inquiry, onStatusChange }) {
  const { inquiryVehicleResponse, inquirer, inquiryStatus, createdAt } =
    inquiry;

  const isPending = inquiryStatus === "PENDING";
  const isApproved = inquiryStatus === "APPROVED";
  const isRejected = inquiryStatus === "REJECTED";

  const vehicleTitle = `${inquiryVehicleResponse.makerName} ${
    inquiryVehicleResponse.modelName
  } ${inquiryVehicleResponse.variantName} - ${
    inquiryVehicleResponse.yearOfMfg
  }`;

  // re render when we click on buttons

  useEffect(() => {}, [isPending, isApproved, isRejected]);

  const handleApprove = async (id) => {
    try {
      const res = await approveInquiry(id);
      onStatusChange(inquiry.id, "APPROVED");
    } catch (error) {
      console.log(error);
    }
  };
  const handleReject = async (id) => {
    try {
      const res = await rejectInquiry(id);
      onStatusChange(inquiry.id, "REJECTED");
    } catch (error) {
      console.log(error);
    }
  };
  const handleClose = async (id) => {
    try {
      const res = await closeInquiry(id);
      onStatusChange(inquiry.id, "CLOSED_BY_VEHICLE_OWNER");
    } catch (error) {
      console.log(error);
    }
  };

  const localDate = new Date(createdAt).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="rounded-2xl border border-third/40 bg-secondary px-6 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
      {/* LEFT INFO */}
      <div className="space-y-2">
        {/* VEHICLE */}
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

        <p className="text-sm text-third">Date: {localDate}</p>

        {isPending && (
          <div className="flex gap-3 pt-3">
            <Button
              showIcon={false}
              variant="ghost"
              onClick={() => handleApprove(inquiry.id)}
            >
              <Check size={16} className="mr-2" />
              Accept Inquiry
            </Button>

            <Button
              showIcon={false}
              variant="outlineSecondary"
              onClick={() => handleReject(inquiry.id)}
            >
              <X size={16} className="mr-2" />
              Reject
            </Button>
          </div>
        )}

        {isApproved && (
          <div className="pt-3">
            <Button
              showIcon={false}
              variant="ghost"
              onClick={() => handleClose(inquiry.id)}
            >
              <Lock size={16} className="mr-2" />
              Close Inquiry
            </Button>
          </div>
        )}

        {isRejected && null}
      </div>

      <div className="flex flex-col items-start md:items-end gap-4">
        <StatusPill status={inquiryStatus} />
      </div>
    </div>
  );
}

function StatusPill({ status }) {
  const map = {
    PENDING: "bg-yellow-400/15 text-yellow-400 border-yellow-400/40",
    APPROVED: "bg-green-500/15 text-green-500 border-green-500/40",
    REJECTED: "bg-red-500/15 text-red-500 border-red-500/40",
    CLOSED_BY_INQUIRER: "bg-gray-500/15 text-gray-400 border-gray-500/40",
    CLOSED_BY_VEHICLE_OWNER: "bg-gray-500/15 text-gray-400 border-gray-500/40",
  };

  return (
    <span
      className={`text-xs px-4 py-1 rounded-full border font-semibold ${
        map[status]
      }`}
    >
      {status.replaceAll("_", " ")}
    </span>
  );
}
