"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  CheckCircle2,
  Clock,
  AlertCircle,
  ChevronRight,
  FileText,
  ShieldCheck,
  LayoutDashboard,
  ExternalLink,
  Edit2,
  HelpCircle,
  ShieldAlert,
  Ban,
} from "lucide-react";
import Button from "@/components/ui/button";

export default function Step4Verification({ existing, onEdit }) {
  const router = useRouter();

  const business = existing?.business || {};
  const status = business.verificationStatus; // REQUESTED, REQUEST_CHANGES, REJECTED, VERIFIED
  const remark = business.adminRemark;
  const isVerified = status === "VERIFIED";
  const isChangesRequested = status === "REQUEST_CHANGES";
  const isRejected = status === "REJECTED";

  useEffect(() => {
    if (isVerified) {
      const timer = setTimeout(() => {
        router.push("/consult/dashboard");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVerified, router]);

  // Status mapping for the board
  const applicationSteps = [
    {
      id: "reg",
      label: "Account Registration",
      status: "Completed",
      info: "Done",
      isDone: true,
    },
    {
      id: "biz",
      label: "Dealer Information",
      status: "Completed",
      info: "Verified",
      isDone: true,
    },
    {
      id: "idv",
      label: "Document Verification",
      status: isChangesRequested ? "Request Changes" : "Submitted",
      info: isChangesRequested ? "Fix issues" : "In Queue",
      isDone: !isChangesRequested && !isRejected,
      isWarning: isChangesRequested,
      isError: isRejected,
    },
    {
      id: "rev",
      label: "AVX Admin Review",
      status: isVerified
        ? "Completed"
        : isRejected
          ? "Rejected"
          : "In Progress",
      info: isVerified ? "Approved" : "Verifying...",
      isDone: isVerified,
      isWarning: !isVerified && !isRejected && !isChangesRequested, // Use yellow for In Progress
      isPending: false,
    },
    {
      id: "dash",
      label: "Dealer Dashboard Access",
      status: isVerified ? "Active" : "Pending",
      info: isVerified ? "Ready" : "Wait for approval",
      isDone: isVerified,
      isPending: !isVerified,
    },
  ];

  const visibleSteps = isChangesRequested
    ? applicationSteps.slice(0, 3)
    : applicationSteps;

  return (
    <div className="w-full mx-auto py-12  space-y-12">
      {/* ── TOP HEADER ─────────────────────────────────────────────────── */}
      <div className="flex flex-col items-center text-center space-y-6">
        <div
          className={`w-20 h-20 rounded-full flex items-center justify-center transition-all duration-700
          ${isVerified ? "bg-green-500/10" : isChangesRequested ? "bg-orange-500/10" : isRejected ? "bg-red-500/10" : "bg-primary/10"}`}
        >
          {isVerified ? (
            <ShieldCheck className="w-10 h-10 text-green-500" />
          ) : isChangesRequested ? (
            <AlertCircle className="w-10 h-10 text-yellow-500" />
          ) : isRejected ? (
            <AlertCircle className="w-10 h-10 text-red-500" />
          ) : (
            <Clock className="w-10 h-10 text-primary" />
          )}
        </div>

        <div className="space-y-3">
          <h1 className="text-3xl font-bold text-primary flex items-center justify-center gap-2">
            {isVerified ? (
              <>
                <CheckCircle2 className="w-8 h-8 text-green-500" />
                Approved
              </>
            ) : isChangesRequested ? (
              "Action Required"
            ) : isRejected ? (
              "Application Rejected"
            ) : (
              <>
                <CheckCircle2 className="w-8 h-8 text-primary" />
                Verification Submitted
              </>
            )}
          </h1>
          <p className="text-third text-lg max-w-xl mx-auto leading-relaxed">
            {isVerified
              ? "Your application has been approved! Redirecting to your dashboard..."
              : isChangesRequested
                ? "We found some issues with your submission. Please check the remarks below and update your details."
                : isRejected
                  ? "We regret to inform you that your application was not approved at this time."
                  : "Your partner application is under review. Our team is verifying your documents. This usually takes 24-48 hours."}
          </p>
        </div>
      </div>

      {/* ── ADMIN REMARK (IF CHANGES REQUESTED) ────────────────────────── */}
      {isChangesRequested && (
        <div className="bg-yellow-500/10  rounded-2xl p-6 space-y-4 shadow-sm shadow-orange-500/5">
          <div className="flex items-start gap-4 text-yellow-600">
            <div className="w-12 h-12 bg-yellow-500/10 rounded-xl flex items-center justify-center shrink-0">
              <AlertCircle className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="font-bold text-xl tracking-tight">
                Updates Needed
              </h3>
              <p className="text-primary/70 text-sm leading-relaxed">
                The AVX verification team has requested some changes to your
                application. Please review the feedback below:
              </p>
            </div>
          </div>

          <div className="bg-primary/5 rounded-xl border border-orange-500/20 p-5 ml-0 md:ml-16">
            <p className="text-primary font-medium leading-relaxed">
              <span className="text-primary font-bold">Admin Remark:</span>{" "}
              {remark || "-"}
            </p>
          </div>

          <div className="flex justify-end pt-2">
            <Button
              onClick={onEdit}
              variant="outlineSecondary"
              className="gap-2"
              size="sm"
            >
              <Edit2 className="w-4 h-4 mr-2" /> Update Application
            </Button>
          </div>
        </div>
      )}

      {/* ── APPLICATION STATUS OR SUSPENSION BOARD ────────────────────────── */}
      {false ? (
        <div />
      ) : (
        <div className="bg-primary/5 border border-third/10 rounded-2xl overflow-hidden">
          <div className="p-8 space-y-8">
            <h2 className="text-xl font-bold text-primary tracking-tight">
              Application Status
            </h2>

            <div className="space-y-4">
              {visibleSteps.map((step) => (
                <div
                  key={step.id}
                  className="flex items-center justify-between py-1  group"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform group-hover:scale-110
                      ${
                        step.isDone
                          ? "bg-green-500/20 text-green-500"
                          : step.isWarning ||
                              (step.id === "rev" && !isVerified && !isRejected)
                            ? "bg-amber-500/20 text-amber-500"
                            : step.isError
                              ? "bg-red-500/20 text-red-500"
                              : step.isPending
                                ? "bg-third/10 text-third/30"
                                : "bg-primary/20 text-primary"
                      }`}
                    >
                      {step.isDone ? (
                        <CheckCircle2 className="w-5 h-5" />
                      ) : step.isWarning || step.isError ? (
                        <AlertCircle className="w-5 h-5" />
                      ) : (
                        <Clock className="w-5 h-5" />
                      )}
                    </div>
                    <span
                      className={`font-semibold ${step.isPending ? "text-third/30 font-medium" : "text-primary/90"}`}
                    >
                      {step.label}
                    </span>
                  </div>

                  <div className="flex flex-col items-end">
                    <span
                      className={`text-sm font-bold
                      ${
                        step.isDone
                          ? "text-green-500"
                          : step.isWarning
                            ? "text-yellow-500"
                            : step.isError
                              ? "text-red-500"
                              : step.isPending
                                ? "text-third/20"
                                : "text-primary"
                      }`}
                    >
                      {step.status}
                    </span>
                    <span className="text-[10px] text-third/40 font-medium">
                      {step.info}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-6 border-t border-third/10 flex items-center justify-between text-sm">
              <span className="text-third font-medium tracking-tight">
                Estimated Review Time
              </span>
              <span className="text-primary font-black uppercase text-lg">
                24 – 48 Hours
              </span>
            </div>
          </div>
        </div>
      )}

      {/* ── WHAT HAPPENS NEXT (PREMIUM GRID) ────────────────────────── */}
      <div className="space-y-10">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-primary tracking-tight">
            What happens next?
          </h2>
          <p className="text-third text-sm">
            Follow your journey to becoming an AVX Verified Dealer
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              id: "01",
              title: "Expert Review",
              desc: "Our verification team checks your dealership credentials.",
              icon: ShieldCheck,
              color: "text-blue-500",
              bg: "bg-blue-500/10",
            },
            {
              id: "02",
              title: "Quality Check",
              desc: "We validate your business presence and trade licenses.",
              icon: CheckCircle2,
              color: "text-primary",
              bg: "bg-primary/10",
            },
            {
              id: "03",
              title: "Live on AVX",
              desc: "Start listing your inventory and reach thousands of buyers.",
              icon: LayoutDashboard,
              color: "text-green-500",
              bg: "bg-green-500/10",
            },
          ].map((item) => (
            <div
              key={item.id}
              className="relative p-8 rounded-4xl bg-primary/5 border border-primary/10 hover:border-primary/30 transition-all duration-500 group"
            >
              <div className="absolute top-6 right-8 text-4xl font-black text-primary/5 group-hover:text-primary/10 transition-colors">
                {item.id}
              </div>

              <div
                className={`w-14 h-14 rounded-2xl ${item.bg} flex items-center justify-center mb-6`}
              >
                <item.icon className={`w-7 h-7 ${item.color}`} />
              </div>

              <div className="space-y-3">
                <h3 className="text-xl font-bold text-primary">{item.title}</h3>
                <p className="text-third text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── WHILE YOU WAIT / TIPS ──────────────────────────────────────── */}
      <div className="bg-primary/5 border border-primary/20 rounded-2xl p-8 space-y-6">
        <div className="flex items-center gap-3 text-lg font-bold text-primary">
          <PartyPopperIcon className="text-orange-400" />
          While you wait, prepare your first listing
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {[
            {
              icon: FileText,
              label: "HD Vehicle Photos",
              desc: "Plan your interior & exterior shots",
            },
            {
              icon: CheckCircle2,
              label: "Transparent Pricing",
              desc: "Set competitive car/bike prices",
            },
            {
              icon: LayoutDashboard,
              label: "Inspection Reports",
              desc: "Prepare quality health checks",
            },
            {
              icon: ShieldCheck,
              label: "RC & RTO Details",
              desc: "Verify vehicle document numbers",
            },
          ].map((tip, idx) => (
            <div key={idx} className="flex gap-4">
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                <tip.icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-primary">{tip.label}</h4>
                <p className="text-xs text-third tracking-tight mt-0.5">
                  {tip.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── PARTNER RESOURCES ──────────────────────────────────────────── */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-primary">Partner Resources</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { label: "Partner Policies", icon: HelpCircle },
            { label: "Listing Best Practices", icon: ExternalLink },
            { label: "Vendor Support Guide", icon: HelpCircle },
            { label: "Payment & Escrow System", icon: ExternalLink },
          ].map((item, idx) => (
            <button
              key={idx}
              className="flex items-center justify-between p-5 rounded-xl border border-third/10 hover:border-primary/40 hover:bg-primary/10 transition-all text-left group"
            >
              <div className="flex items-center gap-4">
                <div className="p-2 bg-primary/5 rounded-lg group-hover:bg-primary/10 transition-colors">
                  <item.icon className="w-5 h-5 text-primary" />
                </div>
                <span className="text-sm font-bold text-primary leading-none">
                  {item.label}
                </span>
              </div>
              <ChevronRight className="w-4 h-4 text-third/40 group-hover:text-primary transition-colors" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function PartyPopperIcon({ className }) {
  return (
    <svg
      className={`w-6 h-6 ${className}`}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41m11.32-11.32l1.41-1.41"
      />
    </svg>
  );
}
