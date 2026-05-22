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
  const lowerStatus = status?.toLowerCase();
  const isPending = lowerStatus === "pending" || lowerStatus === "requested";
  const isAccepted = lowerStatus === "accepted" || lowerStatus === "processing";
  const isInspected = lowerStatus === "inspected" || lowerStatus === "done";
  const isNotInspected =
    lowerStatus === "not_inspected" || lowerStatus === "rejected";

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
            <Button variant="ghost" showIcon={false} onClick={onAccept}>
              Accept
            </Button>
            <Button
              variant="outlineSecondary"
              showIcon={false}
              onClick={onReject}
            >
              Reject
            </Button>
          </div>
        )}

        {isAccepted && (
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

        {isNotInspected && (
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
    accepted: "bg-yellow-400/15 text-yellow-400 border-yellow-400/40",
    processing: "bg-yellow-400/15 text-yellow-400 border-yellow-400/40",
    inspected: "bg-green-500/15 text-green-500 border-green-500/40",
    done: "bg-green-500/15 text-green-500 border-green-500/40",
    not_inspected: "bg-red-500/15 text-red-500 border-red-500/40",
    rejected: "bg-red-500/15 text-red-500 border-red-500/40",
  };

  const displayText =
    status === "done"
      ? "INSPECTED"
      : status === "processing"
        ? "IN PROGRESS"
        : status === "accepted"
          ? "ACCEPTED"
          : status.replace("_", " ").toUpperCase();

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
