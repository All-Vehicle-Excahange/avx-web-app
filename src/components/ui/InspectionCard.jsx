import { useState } from "react";
import Button from "@/components/ui/button";
import { Check, File } from "lucide-react";

export default function InspectionCard({
  status = "processing",
  type = "received", // "received" or "sent"
  inspectionType = "Report Only", // "Video + Report" or "Report Only"
  vehicleName = "Maruti Baleno 2021",
  fromName = "Rahul (Buyer)",
  date = "12 Aug",
  onAccept,
  onReject,
  onViewReport,
}) {
  const [activeLoading, setActiveLoading] = useState(null);

  const handleAccept = async () => {
    if (!onAccept) return;
    try {
      setActiveLoading("accept");
      await onAccept();
    } finally {
      setActiveLoading(null);
    }
  };

  const handleReject = async () => {
    if (!onReject) return;
    try {
      setActiveLoading("reject");
      await onReject();
    } finally {
      setActiveLoading(null);
    }
  };

  const lowerStatus = status?.toLowerCase();
  const isPending =
    lowerStatus === "pending" ||
    lowerStatus === "pending_owner_approval";
  const isAccepted =
    lowerStatus === "accepted" ||
    lowerStatus === "processing" ||
    lowerStatus === "in_progress" ||
    lowerStatus === "assigned" ||
    lowerStatus === "scheduled" ||
    lowerStatus === "requested" ||
    lowerStatus === "payment_pending";
  const isInspected =
    lowerStatus === "inspected" ||
    lowerStatus === "done" ||
    lowerStatus === "completed" ||
    lowerStatus === "submitted";
  const isNotInspected =
    lowerStatus === "not_inspected" ||
    lowerStatus === "rejected" ||
    lowerStatus === "rejected_by_owner" ||
    lowerStatus === "cancelled";

  return (
    <div className="rounded-2xl border border-third/40 px-6 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-6 min-h-34">
      {/* LEFT INFO */}
      <div className="space-y-2">
        <p className="text-sm text-third">
          Vehicle:{" "}
          <span className="text-primary font-semibold">{vehicleName}</span>
        </p>
        {type === "sent" ? (
          <p className="text-sm text-third">
            Inspection Type:{" "}
            <span className="text-primary font-semibold">{inspectionType}</span>
          </p>
        ) : (
          <p className="text-sm text-third">
            From:{" "}
            <span className="text-primary font-semibold">{fromName}</span>
          </p>
        )}
        <p className="text-sm text-third">Date: {date}</p>

        {/* ACTIONS */}
        {isPending && type !== "sent" && (
          <div className="pt-3 flex flex-wrap items-center gap-3">
            <Button
              variant="ghost"
              showIcon={false}
              onClick={handleAccept}
              loading={activeLoading === "accept"}
              locked={!!activeLoading}
            >
              Accept
            </Button>
            <Button
              variant="outlineSecondary"
              showIcon={false}
              onClick={handleReject}
              loading={activeLoading === "reject"}
              locked={!!activeLoading}
            >
              Reject
            </Button>
          </div>
        )}

        {isAccepted && !(type === "received" && lowerStatus === "accepted") && (
          <div className="pt-3">
            <Button
              variant="outline"
              showIcon={false}
              className="pointer-events-none opacity-50 cursor-not-allowed text-yellow-500 border-yellow-500/30 py-1.5 px-4 text-sm"
              locked={true}
            >
              In Progress
            </Button>
          </div>
        )}

        {isInspected && type === "sent" && (
          <div className="pt-3">
            <Button
              variant="ghost"
              showIcon={false}
              onClick={onViewReport}
              className="py-1.5 px-4 text-sm"
            >
              <File size={16} className="mr-2" />
              View Report
            </Button>
          </div>
        )}

        {isNotInspected && type !== "received" && (
          <div className="pt-3">
            <Button
              variant="ghost"
              showIcon={false}
              className="py-1.5 px-4 text-sm"
            >
              <Check size={16} className="mr-2" />
              Request Reecomm Inspection
            </Button>
          </div>
        )}
      </div>

      {/* RIGHT SIDE */}
      <div className="flex flex-col items-start md:items-end gap-4 shrink-0">
        <StatusPill status={lowerStatus} />
      </div>
    </div>
  );
}

/* ================= STATUS PILL ================= */

function StatusPill({ status }) {
  const map = {
    pending: "bg-blue-500/15 text-blue-400 border-blue-500/40",
    requested: "bg-blue-500/15 text-blue-400 border-blue-500/40",
    pending_owner_approval: "bg-blue-500/15 text-blue-400 border-blue-500/40",
    payment_pending: "bg-yellow-500/15 text-yellow-500 border-yellow-500/40",
    assigned: "bg-yellow-400/15 text-yellow-400 border-yellow-400/40",
    scheduled: "bg-yellow-400/15 text-yellow-400 border-yellow-400/40",
    in_progress: "bg-yellow-400/15 text-yellow-400 border-yellow-400/40",
    processing: "bg-yellow-400/15 text-yellow-400 border-yellow-400/40",
    accepted: "bg-green-500/15 text-green-500 border-green-500/40",
    completed: "bg-green-500/15 text-green-500 border-green-500/40",
    submitted: "bg-green-500/15 text-green-500 border-green-500/40",
    done: "bg-green-500/15 text-green-500 border-green-500/40",
    inspected: "bg-green-500/15 text-green-500 border-green-500/40",
    rejected: "bg-red-500/15 text-red-500 border-red-500/40",
    rejected_by_owner: "bg-red-500/15 text-red-500 border-red-500/40",
    cancelled: "bg-red-500/15 text-red-500 border-red-500/40",
  };

  const displayText =
    status === "done" || status === "completed"
      ? "INSPECTED"
      : status === "processing" || status === "in_progress"
        ? "IN PROGRESS"
        : status === "accepted"
          ? "ACCEPTED"
          : status.replaceAll("_", " ").toUpperCase();

  return (
    <span
      className={`text-xs px-4 py-1 rounded-full border font-semibold ${
        map[status] || "bg-third/15 text-third border-third/40"
      }`}
    >
      {displayText}
    </span>
  );
}
