import React from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import {
  ChevronLeft,
  CheckCircle2,
  Truck,
  Clock,
  FileText,
  X,
  ExternalLink,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getInspectionRefundStatusQuery } from "@/queries/inspection.queries";

export default function InspectionTrackingModal({
  inspection,
  onClose,
  animateModal,
  vehicle,
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

  const status =
    inspection?.inspectionRequestStatus?.toUpperCase() || "PENDING";
  const shouldFetchRefund =
    status === "REJECTED_BY_OWNER" ||
    status === "CANCELLED_DUE_TO_VEHICLE_SOLD";

  const { data: refundData } = useQuery({
    ...getInspectionRefundStatusQuery(inspection?.id),
    enabled: !!inspection?.id && shouldFetchRefund,
  });

  const refundStatus =
    refundData?.data?.refundStatus || refundData?.refundStatus || null;

  if (!inspection) return null;

  const maker = inspection.makerName || vehicle?.makerName || inspection.vehicle?.makerName || "";
  const model = inspection.modelName || vehicle?.modelName || inspection.vehicle?.modelName || "";
  const title = (maker || model) ? `${maker} ${model}`.trim() : "Vehicle Inspection";
  const thumbnail = inspection.thumbnailUrl || vehicle?.thumbnailUrl || inspection.vehicle?.thumbnailUrl || "/bg.jpg";

  // Format createdAt date
  const requestedDateStr = inspection.createdAt
    ? new Date(inspection.createdAt).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      })
    : "-";

  // Determine stage flags
  const isScheduled = [
    "ASSIGNED",
    "SCHEDULED",
    "IN_PROGRESS",
    "COMPLETED",
    "SUBMITTED",
  ].includes(status);

  const isInProgress = ["IN_PROGRESS", "COMPLETED", "SUBMITTED"].includes(
    status,
  );

  const isReportReady = ["COMPLETED", "SUBMITTED"].includes(status);

  // Setup badge classes
  const badgeClasses =
    {
      PAYMENT_PENDING: "bg-yellow-500/15 text-yellow-500 border-yellow-500/40",
      PENDING_OWNER_APPROVAL: "bg-blue-500/15 text-blue-400 border-blue-500/40",
      REJECTED_BY_OWNER: "bg-red-500/15 text-red-500 border-red-500/40",
      CANCELLED_DUE_TO_VEHICLE_SOLD:
        "bg-red-500/15 text-red-500 border-red-500/40",
      REQUESTED: "bg-blue-500/15 text-blue-400 border-blue-500/40",
      ASSIGNED: "bg-yellow-400/15 text-yellow-400 border-yellow-400/40",
      SCHEDULED: "bg-yellow-400/15 text-yellow-400 border-yellow-400/40",
      IN_PROGRESS: "bg-yellow-400/15 text-yellow-400 border-yellow-400/40",
      SUBMITTED: "bg-green-500/15 text-green-500 border-green-500/40",
      COMPLETED: "bg-green-500/15 text-green-500 border-green-500/40",
      REJECTED: "bg-red-500/15 text-red-500 border-red-500/40",
      CANCELLED: "bg-red-500/15 text-red-500 border-red-500/40",
    }[status] || "bg-third/15 text-third border-third/40";

  // Format backend dates
  const scheduledDateStr =
    inspection.scheduledAt || inspection.videoCallScheduledAt
      ? new Date(
          inspection.scheduledAt || inspection.videoCallScheduledAt,
        ).toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "long",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })
      : null;

  const inProgressDateStr =
    (status === "IN_PROGRESS" || isInProgress) && inspection.updatedAt
      ? new Date(inspection.updatedAt).toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        })
      : null;

  const completedDateStr =
    (status === "COMPLETED" ||
      status === "SUBMITTED" ||
      status === "REJECTED" ||
      status === "CANCELLED" ||
      status === "CANCELLED_DUE_TO_VEHICLE_SOLD") &&
    inspection.updatedAt
      ? new Date(inspection.updatedAt).toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        })
      : null;

  // Banner Text
  const bannerText =
    {
      PAYMENT_PENDING: "Waiting for payment",
      PENDING_OWNER_APPROVAL: "Awaiting owner's response",
      REJECTED_BY_OWNER: "Inspection request cancelled by owner",
      CANCELLED_DUE_TO_VEHICLE_SOLD:
        "Inspection request cancelled because vehicle was sold",
      REQUESTED: "Payment completed, inspection request created",
      ASSIGNED: "Inspector assigned to the vehicle",
      SCHEDULED: "Inspection scheduled",
      IN_PROGRESS: "Inspector is currently inspecting the vehicle",
      SUBMITTED: "Inspector submitted the report, preparing final review",
      COMPLETED: "Inspection successfully completed",
      REJECTED: "Inspection request failed or was rejected",
      CANCELLED: "Inspection request was cancelled",
    }[status] || "Inspection request in progress";

  const getStep1Details = () => {
    if (status === "PENDING_OWNER_APPROVAL") {
      return {
        title: "Owner Approval",
        statusText: "Awaiting owner response",
        icon: <Clock size={10} className="text-blue-500" />,
        bgClass: "bg-blue-500/10 border border-blue-500/30",
      };
    }
    if (status === "REJECTED_BY_OWNER") {
      return {
        title: "Owner Approval",
        statusText: "Rejected by owner",
        icon: <X size={10} className="text-red-500" />,
        bgClass: "bg-red-500/10 border border-red-500/30",
      };
    }
    const approvalDate = inspection.updatedAt
      ? new Date(inspection.updatedAt).toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })
      : formattedInspectionDate;

    return {
      title: "Owner Approval",
      statusText: `Approved • ${approvalDate}`,
      icon: <CheckCircle2 size={10} className="text-green-500" />,
      bgClass: "bg-green-500/10 border border-green-500/30",
    };
  };
  const step1 = getStep1Details();

  const getStep2Details = () => {
    if (status === "PENDING_OWNER_APPROVAL" || status === "REJECTED_BY_OWNER") {
      return {
        title: "Request Created",
        statusText: "Pending",
        icon: <Clock size={10} className="text-third" />,
        bgClass: "bg-white/5 border border-white/10",
      };
    }
    if (status === "PAYMENT_PENDING") {
      return {
        title: "Request Created",
        statusText: "Pending Payment",
        icon: <Clock size={10} className="text-yellow-500" />,
        bgClass: "bg-yellow-500/10 border border-yellow-500/30",
      };
    }
    return {
      title: "Request Created",
      statusText: `Completed • ${requestedDateStr}`,
      icon: <CheckCircle2 size={10} className="text-green-500" />,
      bgClass: "bg-green-500/10 border border-green-500/30",
    };
  };
  const step2 = getStep2Details();

  const getStep3Details = () => {
    const isOwnerApproved = [
      "ASSIGNED",
      "SCHEDULED",
      "IN_PROGRESS",
      "COMPLETED",
      "SUBMITTED",
    ].includes(status);

    if (!isOwnerApproved) {
      return {
        title: "Inspection Scheduled",
        statusText: "Pending",
        icon: <Truck size={10} className="text-third" />,
        bgClass: "bg-white/5 border border-white/10",
      };
    }
    if (status === "ASSIGNED") {
      return {
        title: "Inspection Scheduled",
        statusText: "Inspector Assigned",
        icon: <Truck size={10} className="text-yellow-500" />,
        bgClass: "bg-yellow-500/10 border border-yellow-500/30",
      };
    }
    return {
      title: "Inspection Scheduled",
      statusText: scheduledDateStr
        ? `Scheduled • ${scheduledDateStr}`
        : "Scheduled",
      icon: <CheckCircle2 size={10} className="text-green-500" />,
      bgClass: "bg-green-500/10 border border-green-500/30",
    };
  };
  const step3 = getStep3Details();

  const getStep4Details = () => {
    if (status === "IN_PROGRESS") {
      return {
        title: "Inspection In Progress",
        statusText: inProgressDateStr
          ? `Started • ${inProgressDateStr}`
          : "In Progress",
        icon: <Clock size={10} className="text-yellow-500" />,
        bgClass: "bg-yellow-500/10 border border-yellow-500/30",
      };
    }
    const isPastInProgress = ["COMPLETED", "SUBMITTED"].includes(status);

    if (isPastInProgress) {
      return {
        title: "Inspection In Progress",
        statusText: "Completed",
        icon: <CheckCircle2 size={10} className="text-green-500" />,
        bgClass: "bg-green-500/10 border border-green-500/30",
      };
    }
    return {
      title: "Inspection In Progress",
      statusText: "Pending",
      icon: <Clock size={10} className="text-third" />,
      bgClass: "bg-white/5 border border-white/10",
    };
  };
  const step4 = getStep4Details();

  const getStep5Details = () => {
    if (status === "SUBMITTED") {
      return {
        title: "Report Ready",
        statusText: completedDateStr
          ? `Submitted • ${completedDateStr}`
          : "Reviewing Report",
        icon: <FileText size={10} className="text-yellow-500" />,
        bgClass: "bg-yellow-500/10 border border-yellow-500/30",
      };
    }
    if (status === "COMPLETED" || status === "DONE") {
      return {
        title: "Report Ready",
        statusText: completedDateStr
          ? `Completed • ${completedDateStr}`
          : "Ready",
        icon: <CheckCircle2 size={10} className="text-green-500" />,
        bgClass: "bg-green-500/10 border border-green-500/30",
        onClick:
          isReportReady && inspection.reportUrl
            ? () =>
                window.open(
                  inspection.reportUrl,
                  "_blank",
                  "noopener,noreferrer",
                )
            : undefined,
        isClickable: !!(isReportReady && inspection.reportUrl),
      };
    }
    if (status === "REJECTED" || status === "CANCELLED") {
      return {
        title: status === "REJECTED" ? "Failed / Rejected" : "Cancelled",
        statusText: completedDateStr
          ? `Closed • ${completedDateStr}`
          : "Closed",
        icon: <X size={10} className="text-red-500" />,
        bgClass: "bg-red-500/10 border border-red-500/30",
      };
    }
    return {
      title: "Report Ready",
      statusText: "Pending",
      icon: <FileText size={10} className="text-third" />,
      bgClass: "bg-white/5 border border-white/10",
    };
  };
  const step5 = getStep5Details();

  const getRefundStepDetails = (defaultReason) => {
    if (refundStatus === "REFUND_COMPLETED") {
      return {
        title: "Refund Status",
        statusText: "Refunded",
        icon: <CheckCircle2 size={10} className="text-green-500" />,
        bgClass: "bg-green-500/10 border border-green-500/30",
        textClass: "text-white",
      };
    }
    if (refundStatus === "REFUND_FAILED") {
      return {
        title: "Refund Status",
        statusText: "Refund Failed (Contact Support)",
        icon: <X size={10} className="text-red-500" />,
        bgClass: "bg-red-500/10 border border-red-500/30",
        textClass: "text-white",
      };
    }
    if (refundStatus === "REFUND_REQUESTED") {
      return {
        title: "Refund Status",
        statusText: "Refund Initiated",
        icon: <Clock size={10} className="text-yellow-500" />,
        bgClass: "bg-yellow-500/10 border border-yellow-500/30",
        textClass: "text-white",
      };
    }
    return {
      title: "Refund Status",
      statusText: `Refund due to: ${defaultReason}`,
      icon: <Clock size={10} className="text-yellow-500" />,
      bgClass: "bg-yellow-500/10 border border-yellow-500/30",
      textClass: "text-white",
    };
  };

  const getTimelineSteps = () => {
    // If rejected by owner
    if (status === "REJECTED_BY_OWNER") {
      const rejectDate = inspection.updatedAt
        ? new Date(inspection.updatedAt).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })
        : formattedInspectionDate;

      return [
        {
          title: "Owner Approval",
          statusText: `Cancelled by owner • ${rejectDate}`,
          icon: <X size={10} className="text-red-500" />,
          bgClass: "bg-red-500/10 border border-red-500/30",
          textClass: "text-white",
        },
        getRefundStepDetails("Cancelled by owner"),
      ];
    }

    // If cancelled due to vehicle sold
    if (status === "CANCELLED_DUE_TO_VEHICLE_SOLD") {
      const approvalDate = inspection.updatedAt
        ? new Date(inspection.updatedAt).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })
        : formattedInspectionDate;

      const stepsList = [
        {
          title: "Owner Approval",
          statusText: `Approved • ${approvalDate}`,
          icon: <CheckCircle2 size={10} className="text-green-500" />,
          bgClass: "bg-green-500/10 border border-green-500/30",
          textClass: "text-white",
        },
        {
          title: "Request Created",
          statusText: `Completed • ${requestedDateStr}`,
          icon: <CheckCircle2 size={10} className="text-green-500" />,
          bgClass: "bg-green-500/10 border border-green-500/30",
          textClass: "text-white",
        },
      ];

      // Add scheduled step if scheduled
      if (scheduledDateStr) {
        stepsList.push({
          title: "Inspection Scheduled",
          statusText: `Scheduled • ${scheduledDateStr}`,
          icon: <CheckCircle2 size={10} className="text-green-500" />,
          bgClass: "bg-green-500/10 border border-green-500/30",
          textClass: "text-white",
        });
      }

      // Add the final Refund / Vehicle Sold step
      stepsList.push({
        title: "Vehicle Sold",
        statusText: "Refund due to: Vehicle sold",
        icon: <X size={10} className="text-red-500" />,
        bgClass: "bg-red-500/10 border border-red-500/30",
        textClass: "text-white",
      });

      stepsList.push(getRefundStepDetails("Vehicle sold"));

      return stepsList;
    }

    // Default flow (existing steps)
    return [
      {
        ...step1,
        textClass: "text-white",
      },
      {
        ...step2,
        textClass: !["PENDING_OWNER_APPROVAL", "REJECTED_BY_OWNER"].includes(
          status,
        )
          ? "text-white"
          : "text-third",
      },
      {
        ...step3,
        textClass: isScheduled ? "text-white" : "text-third",
      },
      {
        ...step4,
        textClass: isInProgress ? "text-white" : "text-third",
      },
      {
        ...step5,
        textClass: isReportReady ? "text-white" : "text-third",
      },
    ];
  };

  const modalContent = (
    <div
      onClick={onClose}
      className={`fixed inset-0 z-9999 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 transition-opacity duration-300 ${
        animateModal ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`relative w-[96%] md:w-[65%] max-w-4xl h-auto max-h-[85vh] md:max-h-[500px] bg-secondary border border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row transition-all duration-300 ease-out ${
          animateModal
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-95 translate-y-4"
        }`}
      >
        {/* CLOSE */}
        <button
          onClick={onClose}
          className="absolute bg-white cursor-pointer top-4 right-4 z-20 p-1 rounded-full hover:opacity-70 text-secondary"
        >
          <X size={20} />
        </button>

        {/* LEFT SIDE IMAGE */}
        <div className="hidden md:block md:w-[35%] bg-third/10">
          <Image
            width={500}
            height={500}
            src="/bg.jpg"
            alt="inspection-tracking"
            className="w-full h-full object-cover"
          />
        </div>

        {/* RIGHT SIDE CONTENT */}
        <div className="flex-1 flex flex-col w-full md:w-[70%] overflow-hidden">
          {/* HEADER */}
          <div className="flex items-start justify-start px-5 py-4 border-b border-white/5 bg-[#0c0c0e]/95 shrink-0">
            <h2 className="text-sm font-bold text-white">
              Inspection Tracking
            </h2>
          </div>

          {/* CONTENT */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
            {/* VEHICLE DETAILS CARD */}
            <div className="bg-[#131316] border border-white/4 rounded-xl p-3 flex gap-3">
              {/* Image */}
              <div className="relative w-18 h-18 rounded-lg overflow-hidden bg-white/5 shrink-0">
                <Image
                  src={thumbnail}
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
                    {title}
                  </h3>
                  <span
                    className={`hidden sm:inline-block text-[8px] px-1.5 py-0.5 rounded border font-extrabold shrink-0 ${badgeClasses}`}
                  >
                    {status === "DONE" || status === "COMPLETED"
                      ? "INSPECTED"
                      : status.replaceAll("_", " ")}
                  </span>
                </div>
                {(inspection.inspectorName ||
                  inspection.assignedInspectorName) && (
                  <p className="text-[11px] text-third truncate mt-0.5">
                    Inspector:{" "}
                    <span className="text-primary font-medium">
                      {inspection.inspectorName ||
                        inspection.assignedInspectorName}
                    </span>
                  </p>
                )}
                <p className="text-[11px] text-third">
                  Requested Date:{" "}
                  <span className="text-primary font-medium">
                    {formattedInspectionDate}
                  </span>
                </p>
                <div className="flex items-center gap-1 mt-1">
                  {inspection.inspectionType && (
                    <span className="text-[9px] text-third font-semibold bg-white/5 border border-white/10 px-1.5 py-0.5 rounded">
                      {inspection.inspectionType === "VIDEO_CALL_WITH_REPORT"
                        ? "Video + Report"
                        : inspection.inspectionType === "REPORT_ONLY"
                          ? "Report Only"
                          : inspection.inspectionType.replaceAll("_", " ")}
                    </span>
                  )}
                  {inspection.amount && (
                    <span className="text-xs font-black text-white ml-auto">
                      ₹{inspection.amount.toLocaleString("en-IN")}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* BANNER MESSAGE */}
            {/* <div
            className={`border rounded-lg p-2.5 text-center text-[11px] font-semibold ${
              status.startsWith("REJECTED") || status.includes("CANCELLED")
                ? "bg-red-500/5 border-red-500/20 text-red-400"
                : isReportReady
                  ? "bg-green-500/5 border-green-500/20 text-green-400"
                  : "bg-fourth/5 border-fourth/20 text-fourth"
            }`}
          >
            {bannerText}
          </div> */}

            {/* TIMELINE */}
            <div className="space-y-3">
              <h4 className="text-[11px] font-bold text-white/55 uppercase tracking-wider">
                Inspection Status
              </h4>

              <div className="relative pl-7 space-y-4">
                {/* Vertical line connecting steps */}
                <div className="absolute left-2.5 top-2.5 bottom-2.5 w-px border-l border-dashed border-white/10" />

                {getTimelineSteps().map((step, idx) => (
                  <div
                    key={idx}
                    className={`relative ${step.isClickable ? "cursor-pointer hover:opacity-80 transition-opacity" : ""}`}
                    onClick={step.onClick}
                  >
                    <span
                      className={`absolute -left-7 top-0.5 w-5 h-5 rounded-full flex items-center justify-center ${step.bgClass}`}
                    >
                      {step.icon}
                    </span>
                    <div>
                      <h5
                        className={`text-[13px] font-semibold ${step.textClass} ${step.isClickable ? "text-primary flex items-center gap-1.5" : ""}`}
                      >
                        {step.title}
                        {step.isClickable && (
                          <ExternalLink size={12} className="text-primary/70" />
                        )}
                      </h5>
                      <p className="text-[10px] text-third mt-0.5">
                        {step.statusText}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ACTION BUTTON */}
          {isReportReady && inspection.reportUrl && (
            <div className="p-4 border-t border-white/5 bg-[#0c0c0e]/95 shrink-0">
              <button
                onClick={() => window.open(inspection.reportUrl, "_blank")}
                className="w-full bg-white text-black font-bold py-3 rounded-xl hover:bg-white/90 transition-colors"
              >
                View Inspection Report
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return typeof document !== "undefined"
    ? createPortal(modalContent, document.body)
    : null;
}
