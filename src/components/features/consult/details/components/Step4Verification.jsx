"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  FileCheck,
  ShieldCheck,
  CheckCircle,
  Edit,
  Clock,
  AlertCircle,
  PartyPopper,
} from "lucide-react";
import Button from "@/components/ui/button";

export default function Step4Verification({ existing, onEdit }) {
  const router = useRouter();

  const status = existing?.business?.verificationStatus;
  const remark = existing?.business?.adminRemark;
  const isVerified = status === "VERIFIED";

  // Handle the delayed redirect only if verified
  useEffect(() => {
    if (isVerified) {
      const timer = setTimeout(() => {
        router.push("/consult/dashboard");
      }, 3000); // 3 seconds delay to show the visual success
      return () => clearTimeout(timer);
    }
  }, [isVerified, router]);

  const steps = [
    {
      title: "Details Submitted",
      description: "We have received your application",
      icon: FileCheck,
      state: "done", // Always done by the time they reach this step
    },
    {
      title: isVerified
        ? "Identity Verified"
        : status === "REJECTED"
          ? "Verification Rejected"
          : status === "REQUEST_CHANGES"
            ? "Changes Required"
            : "Admin Review",
      description: isVerified
        ? "Your documents were approved"
        : status === "REQUESTED"
          ? "Reviewing your documents"
          : "Action required from your end",
      icon: status === "REJECTED" ? AlertCircle : ShieldCheck,
      state: isVerified ? "done" : "current",
    },
    {
      title: isVerified ? "Dashboard Ready" : "Access Granted",
      description: isVerified
        ? "Redirecting you now..."
        : "Start using your dashboard",
      icon: isVerified ? PartyPopper : CheckCircle,
      state: isVerified ? "done" : "pending",
    },
  ];

  return (
    <div className="max-w-md mx-auto py-8 px-4 bg-transparent">
      <div className="space-y-0">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          const isLast = idx === steps.length - 1;

          return (
            <div key={idx} className="relative flex gap-4 pb-8">
              {/* Vertical Line Connector */}
              {!isLast && (
                <div
                  className={`absolute left-5 top-10 w-[2px] h-full -ml-[1px] transition-colors duration-1000 ${
                    step.state === "done" ? "bg-green-500/40" : "bg-zinc-800"
                  }`}
                />
              )}

              {/* Icon Circle */}
              <div className="relative z-10">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-700 ${
                    step.state === "done"
                      ? "bg-green-600 border-green-600 text-white shadow-[0_0_15px_rgba(22,163,74,0.4)]"
                      : step.state === "current"
                        ? "bg-zinc-950 border-primary text-primary shadow-[0_0_15px_rgba(59,130,246,0.2)]"
                        : "bg-zinc-900 border-zinc-800 text-zinc-500"
                  }`}
                >
                  {step.state === "done" ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    <Icon className="w-5 h-5" />
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 pt-1">
                <h3
                  className={`font-semibold text-base transition-colors duration-500 ${
                    step.state === "pending" ? "text-zinc-500" : "text-zinc-100"
                  }`}
                >
                  {step.title}
                </h3>
                <p
                  className={`text-xs mt-0.5 transition-colors duration-500 ${
                    isVerified && idx === 2
                      ? "text-primary animate-pulse"
                      : "text-zinc-400"
                  }`}
                >
                  {step.description}
                </p>

                {/* Status Specific UI */}
                {idx === 1 && !isVerified && (
                  <div className="mt-4">
                    {status === "REQUEST_CHANGES" && (
                      <div className="bg-zinc-900/50 border border-orange-500/30 rounded-xl p-4">
                        <p className="text-xs text-orange-400 font-medium mb-2 uppercase tracking-wider">
                          Admin Remarks
                        </p>
                        <p className="text-sm text-zinc-300 italic mb-4">
                          &quot;
                          {remark ||
                            "Please update your details as per instructions."}
                          &quot;
                        </p>
                        <Button
                          onClick={onEdit}
                          variant="ghost"
                          className="w-full sm:w-auto flex items-center justify-center gap-2 border-orange-500/50 text-orange-400 hover:bg-orange-500/10"
                        >
                          <Edit className="w-4 h-4 mr-2" /> Edit My Details
                        </Button>
                      </div>
                    )}

                    {status === "REJECTED" && (
                      <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 text-sm text-red-400">
                        <span className="font-bold block mb-1">
                          Rejection Reason:
                        </span>
                        {remark ||
                          "Your application does not meet our requirements."}
                      </div>
                    )}

                    {status === "REQUESTED" && (
                      <div className="inline-flex items-center gap-2 text-[11px] font-medium text-primary bg-primary/10 px-3 py-1.5 rounded-lg border border-primary/20">
                        <Clock className="w-3.5 h-3.5" />
                        ESTIMATED TIME: 24 HOURS
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Success State Footer */}
      {isVerified ? (
        <div className="mt-10 p-5 rounded-2xl bg-green-500/10 border border-green-500/20 text-center animate-in fade-in zoom-in duration-700">
          <p className="text-green-400 text-sm font-medium">
            Verification Successful! <br />
            <span className="text-zinc-400 text-xs font-normal">
              Setting up your workspace...
            </span>
          </p>
        </div>
      ) : (
        <div className="mt-10 p-5 rounded-2xl bg-zinc-900/40 border border-zinc-800/60 text-center">
          <p className="text-zinc-400 text-xs leading-relaxed">
            Need help with your verification? <br />
            <button className="text-primary font-medium mt-1 hover:underline">
              Chat with Support
            </button>
          </p>
        </div>
      )}
    </div>
  );
}
