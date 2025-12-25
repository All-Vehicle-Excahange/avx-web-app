import { FileCheck, ShieldCheck, Star, CheckCircle } from "lucide-react";

export default function Step4Verification() {
  const items = [
    { title: "Verifying credentials", icon: <FileCheck />, status: "done" },
    { title: "Background check", icon: <ShieldCheck />, status: "working" },
    { title: "Quality assessment", icon: <Star />, status: "pending" },
    { title: "Final approval", icon: <CheckCircle />, status: "pending" },
  ];

  return (
    <div className="space-y-4">
      {items.map((i, idx) => (
        <div
          key={idx}
          className={`flex items-center justify-between rounded-xl p-4 border transition
          ${
            i.status === "working"
              ? "bg-primary/10 border-primary"
              : "bg-primary/5 border-third/30"
          }`}
        >
          <div className="flex items-center gap-3">
            {/* ICON */}
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center
              ${
                i.status === "done"
                  ? "bg-green-500 text-white"
                  : i.status === "working"
                  ? "bg-primary text-secondary"
                  : "bg-secondary text-third"
              }`}
            >
              {i.status === "done" ? "✓" : i.icon}
            </div>

            <span className="text-sm text-primary">{i.title}</span>
          </div>

          {/* STATUS TEXT */}
          <span
            className={`text-xs font-medium
            ${
              i.status === "done"
                ? "text-green-400"
                : i.status === "working"
                ? "text-primary"
                : "text-third"
            }`}
          >
            {i.status === "done"
              ? "Completed"
              : i.status === "working"
              ? "In Progress"
              : "Pending"}
          </span>
        </div>
      ))}

      <div className="mt-10 rounded-xl bg-primary/10 p-5 text-center text-sm text-third">
        <span className="font-semibold text-primary block mb-1">
          What happens next?
        </span>
        Once approved, you will get instant access to your dashboard and mobile
        app with full features.
      </div>
    </div>
  );
}
