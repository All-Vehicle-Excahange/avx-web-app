import Button from "@/components/ui/button";
import { Check, File, Search } from "lucide-react";

export default function InspectionCard({ status = "processing" }) {
  const isInspected = status === "inspected";
  const isNotInspected = status === "not_inspected";
  const isProcessing = status === "processing";

  return (
    <div className="rounded-2xl border border-third/40  px-6 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-6 min-h-34">
      {/* LEFT INFO */}
      <div className="space-y-2">
        <p className="text-sm text-third">
          Vehicle:{" "}
          <span className="text-primary font-semibold">Maruti Baleno 2021</span>
        </p>
        <p className="text-sm text-third">
          From:{" "}
          <span className="text-primary font-semibold">Rahul (Buyer)</span>
        </p>
        <p className="text-sm text-third">Date: 12 Aug</p>

        {/* ACTIONS */}
        {isInspected && (
          <div className="pt-3">
            <Button variant="ghost" showIcon={false}>
              <File size={16} className="mr-2" />
              View Inspection Report
            </Button>
          </div>
        )}

        {isNotInspected && (
          <div className="pt-3">
            <Button variant="ghost" showIcon={false}>
              <Check size={16} className="mr-2" />
              Request AVX Inspection
            </Button>
          </div>
        )}

        {isProcessing && (
          <div className="pt-3">
            <Button
              variant="ghost"
              showIcon={false}
              className="pointer-events-none opacity-50 cursor-not-allowed"
            >
              In Processing
            </Button>
          </div>
        )}
      </div>

      {/* RIGHT SIDE */}
      <div className="flex flex-col items-start md:items-end gap-4">
        <StatusPill status={status} />
      </div>
    </div>
  );
}

/* ================= STATUS PILL ================= */

function StatusPill({ status }) {
  const map = {
    processing: "bg-yellow-400/15 text-yellow-400 border-yellow-400/40",
    inspected: "bg-green-500/15 text-green-500 border-green-500/40",
    not_inspected: "bg-red-500/15 text-red-500 border-red-500/40",
  };

  return (
    <span
      className={`text-xs px-4 py-1 rounded-full border font-semibold ${map[status]}`}
    >
      {status.replace("_", " ").toUpperCase()}
    </span>
  );
}
