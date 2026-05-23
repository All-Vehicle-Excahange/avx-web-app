import React from "react";
import Image from "next/image";
import {
  ChevronLeft,
  CheckCircle2,
  Truck,
  Clock,
  FileText,
} from "lucide-react";

export default function InspectionTrackingModal({
  inspection,
  onClose,
  animateModal,
}) {
  // Prevent body scroll when open
  React.useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  // Setup timeline dates (placed before early return to obey Hooks rules)
  const baseDate = React.useMemo(() => {
    const dateStr = inspection?.createdAt || "2026-05-23T00:00:00.000Z";
    return new Date(dateStr);
  }, [inspection?.createdAt]);

  const formattedInspectionDate = React.useMemo(() => {
    const dateStr = inspection?.createdAt || "2026-05-23T00:00:00.000Z";
    return new Date(dateStr).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }, [inspection?.createdAt]);

  if (!inspection) return null;

  // Determine helper status variables
  const status = inspection.inspectionRequestStatus?.toUpperCase() || "PENDING";

  // Format createdAt date
  const requestedDateStr = inspection.createdAt
    ? new Date(inspection.createdAt).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      })
    : "-";

  // Determine stage flags
  const isRequested = true;

  const isScheduled = [
    "ASSIGNED",
    "SCHEDULED",
    "IN_PROGRESS",
    "COMPLETED",
    "DONE",
    "SUBMITTED",
    "INSPECTED",
  ].includes(status);

  const isInProgress = [
    "IN_PROGRESS",
    "COMPLETED",
    "DONE",
    "SUBMITTED",
    "INSPECTED",
  ].includes(status);

  const isReportReady = [
    "COMPLETED",
    "DONE",
    "SUBMITTED",
    "INSPECTED",
  ].includes(status);

  // Setup badge classes
  const badgeClasses =
    {
      PENDING: "bg-blue-500/15 text-blue-400 border-blue-500/40",
      REQUESTED: "bg-blue-500/15 text-blue-400 border-blue-500/40",
      PAYMENT_PEND: "bg-yellow-500/15 text-yellow-500 border-yellow-500/40",
      ASSIGNED: "bg-yellow-400/15 text-yellow-400 border-yellow-400/40",
      SCHEDULED: "bg-yellow-400/15 text-yellow-400 border-yellow-400/40",
      IN_PROGRESS: "bg-yellow-400/15 text-yellow-400 border-yellow-400/40",
      PROCESSING: "bg-yellow-400/15 text-yellow-400 border-yellow-400/40",
      ACCEPTED: "bg-green-500/15 text-green-500 border-green-500/40",
      COMPLETED: "bg-green-500/15 text-green-500 border-green-500/40",
      SUBMITTED: "bg-green-500/15 text-green-500 border-green-500/40",
      DONE: "bg-green-500/15 text-green-500 border-green-500/40",
      INSPECTED: "bg-green-500/15 text-green-500 border-green-500/40",
      REJECTED: "bg-red-500/15 text-red-500 border-red-500/40",
      REJECTED_BY_OWNER: "bg-red-500/15 text-red-500 border-red-500/40",
      CANCELLED: "bg-red-500/15 text-red-500 border-red-500/40",
    }[status] || "bg-third/15 text-third border-third/40";

  const formatDateOffset = (days) => {
    const d = new Date(baseDate);
    d.setDate(baseDate.getDate() + days);
    return d.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const scheduledDate = formatDateOffset(1);
  const transitDate = formatDateOffset(2);
  const reportDate = formatDateOffset(3);

  // Scheduled Banner Text
  let bannerText = "Inspection scheduled soon";
  if (status === "PENDING" || status === "REQUESTED") {
    bannerText = "Awaiting owner approval";
  } else if (status === "ACCEPTED") {
    bannerText = "Payment or scheduling in progress";
  } else if (status === "IN_PROGRESS" || status === "PROCESSING") {
    bannerText = "Inspector is inspecting the vehicle";
  } else if (isReportReady) {
    bannerText = "Inspection completed, report is ready";
  } else if (status.startsWith("REJECTED") || status === "CANCELLED") {
    bannerText = "Inspection request was rejected or cancelled";
  }

  return (
    <div
      onClick={onClose}
      className={`fixed inset-0 z-[999] flex items-center justify-center bg-black/75 backdrop-blur-xs p-4 transition-opacity duration-300 ${
        animateModal ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`relative w-2/3 max-w-xl max-h-[490px] bg-secondary border border-white/10 rounded-[24px] shadow-2xl overflow-hidden flex flex-col transition-all duration-300 ease-out ${
          animateModal
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-95 translate-y-4"
        }`}
      >
        {/* HEADER */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-white/5 bg-[#0c0c0e]/95 shrink-0">
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full flex items-center justify-center bg-white/5 hover:bg-white/10 text-white transition cursor-pointer"
          >
            <ChevronLeft size={16} />
          </button>
          <h2 className="text-sm font-bold text-white">Inspection Tracking</h2>
        </div>

        {/* CONTENT */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
          {/* VEHICLE DETAILS CARD */}
          <div className="bg-[#131316] border border-white/[0.04] rounded-xl p-3 flex gap-3">
            {/* Image */}
            <div className="relative w-18 h-18 rounded-lg overflow-hidden bg-white/5 shrink-0">
              <Image
                src={inspection.vehicleCoverImage || "/about2.png"}
                alt="Vehicle Image"
                width={72}
                height={72}
                className="object-cover w-full h-full"
              />
            </div>
            {/* Details */}
            <div className="flex-1 flex flex-col justify-between min-w-0">
              <div className="flex justify-between items-start gap-1">
                <h3 className="font-bold text-white text-[13px] truncate">
                  {`${inspection.makerName} ${inspection.modelName}`}
                </h3>
                <span
                  className={`text-[8px] px-1.5 py-0.5 rounded border font-extrabold shrink-0 ${badgeClasses}`}
                >
                  {status === "DONE" || status === "COMPLETED"
                    ? "INSPECTED"
                    : status.replaceAll("_", " ")}
                </span>
              </div>
              <p className="text-[11px] text-third truncate mt-0.5">
                Inspector:{" "}
                <span className="text-primary font-medium">
                  {inspection.assignedInspectorName || "Amit Verma"}
                </span>
              </p>
              <p className="text-[11px] text-third">
                Date:{" "}
                <span className="text-primary font-medium">
                  {formattedInspectionDate}
                </span>
              </p>
              <div className="flex items-center gap-1 mt-1">
                <span className="text-[9px] text-third font-semibold bg-white/5 border border-white/10 px-1.5 py-0.5 rounded">
                  {inspection.inspectionType === "VIDEO_CALL_WITH_REPORT"
                    ? "Video"
                    : "Report"}
                </span>
                <span className="text-[9px] text-third font-semibold bg-white/5 border border-white/10 px-1.5 py-0.5 rounded">
                  Photo
                </span>
                <span className="text-xs font-black text-white ml-auto">
                  ₹{inspection.amount || "1,999"}
                </span>
              </div>
            </div>
          </div>

          {/* BANNER MESSAGE */}
          <div
            className={`border rounded-lg p-2.5 text-center text-[11px] font-semibold ${
              status.startsWith("REJECTED") || status === "CANCELLED"
                ? "bg-red-500/5 border-red-500/20 text-red-400"
                : isReportReady
                  ? "bg-green-500/5 border-green-500/20 text-green-400"
                  : "bg-fourth/5 border-fourth/20 text-fourth"
            }`}
          >
            {bannerText}
          </div>

          {/* TIMELINE */}
          <div className="space-y-3">
            <h4 className="text-[11px] font-bold text-white/55 uppercase tracking-wider">
              Inspection Status
            </h4>

            <div className="relative pl-7 space-y-4">
              {/* Vertical line connecting steps */}
              <div className="absolute left-2.5 top-2.5 bottom-2.5 w-[1px] border-l border-dashed border-white/10" />

              {/* Step 1: Requested */}
              <div className="relative">
                <span className="absolute -left-7 top-0.5 w-5 h-5 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center">
                  <CheckCircle2 size={10} className="text-green-500" />
                </span>
                <div>
                  <h5 className="text-[13px] font-semibold text-white">
                    Requested
                  </h5>
                  <p className="text-[10px] text-third mt-0.5">
                    Completed • {requestedDateStr}
                  </p>
                </div>
              </div>

              {/* Step 2: Scheduled */}
              <div className="relative">
                <span
                  className={`absolute -left-7 top-0.5 w-5 h-5 rounded-full flex items-center justify-center ${
                    isScheduled
                      ? "bg-green-500/10 border border-green-500/30 text-green-500"
                      : "bg-white/5 border border-white/10 text-third"
                  }`}
                >
                  <Truck size={10} />
                </span>
                <div>
                  <h5
                    className={`text-[13px] font-semibold ${isScheduled ? "text-white" : "text-third"}`}
                  >
                    Scheduled
                  </h5>
                  <p className="text-[10px] text-third mt-0.5">
                    {isScheduled ? `Completed • ${scheduledDate}` : "Pending"}
                  </p>
                </div>
              </div>

              {/* Step 3: In Progress */}
              <div className="relative">
                <span
                  className={`absolute -left-7 top-0.5 w-5 h-5 rounded-full flex items-center justify-center ${
                    isInProgress
                      ? "bg-green-500/10 border border-green-500/30 text-green-500"
                      : "bg-white/5 border border-white/10 text-third"
                  }`}
                >
                  <Clock size={10} />
                </span>
                <div>
                  <h5
                    className={`text-[13px] font-semibold ${isInProgress ? "text-white" : "text-third"}`}
                  >
                    In Progress
                  </h5>
                  <p className="text-[10px] text-third mt-0.5">
                    {isInProgress ? `Completed • ${transitDate}` : "Pending"}
                  </p>
                </div>
              </div>

              {/* Step 4: Report Ready */}
              <div className="relative">
                <span
                  className={`absolute -left-7 top-0.5 w-5 h-5 rounded-full flex items-center justify-center ${
                    isReportReady
                      ? "bg-green-500/10 border border-green-500/30 text-green-500"
                      : "bg-white/5 border border-white/10 text-third"
                  }`}
                >
                  <FileText size={10} />
                </span>
                <div>
                  <h5
                    className={`text-[13px] font-semibold ${isReportReady ? "text-white" : "text-third"}`}
                  >
                    Report Ready
                  </h5>
                  <p className="text-[10px] text-third mt-0.5">
                    {isReportReady ? `Completed • ${reportDate}` : "Pending"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
