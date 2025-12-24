import Button from "@/components/ui/button";
import { Check, X, MessageCircle } from "lucide-react";

export default function InquiryCard({ status = "pending" }) {
  const isPending = status === "pending";
  const isAccepted = status === "accepted";

  return (
    <div className="rounded-2xl border border-third/40 bg-secondary px-6 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-6 min-h-34">
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

        {/* BUTTONS UNDER DATE */}
        {isPending && (
          <div className="flex gap-3 pt-3">
            <Button showIcon={false} variant="ghost">
              <Check size={16} className="mr-2" />
              Accept Inquiry
            </Button>
            <Button showIcon={false} variant="outlineSecondary">
              <X size={16} className="mr-2" />
              Reject
            </Button>
          </div>
        )}

        {isAccepted && (
          <div className="pt-3">
            <Button variant="ghost" showIcon={false}>
              <MessageCircle size={16} className="mr-2" />
              Open Chat
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
    pending: "bg-yellow-400/15 text-yellow-400 border-yellow-400/40",
    accepted: "bg-green-500/15 text-green-500 border-green-500/40",
    closed: "bg-red-500/15 text-red-500 border-red-500/40",
  };

  return (
    <span
      className={`text-xs px-4 py-1 rounded-full border font-semibold ${map[status]}`}
    >
      {status.toUpperCase()}
    </span>
  );
}
