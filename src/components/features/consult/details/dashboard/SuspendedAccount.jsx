import React from "react";
import {
  Ban,
  Mail,
  AlertCircle,
  Calendar,
  Clock,
  ExternalLink,
} from "lucide-react";
import { useRouter } from "next/navigation";

const SuspendedAccount = ({ data }) => {
  const { reason, consultSuspenseType, suspendUntil } = data || {};
  const router = useRouter();
  const isTemporary = consultSuspenseType === "TEMPORARY";

  const formatDate = (dateString) => {
    if (!dateString) return "Indefinite";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const handlePartnerPolicies = () => {
    router.push("/help");
  };

  return (
    <div className="w-full max-w-4xl mx-auto py-12 space-y-12">
      {/* ── TOP HEADER ─────────────────────────────────────────────────── */}
      <div className="flex flex-col items-center text-center space-y-6">
        <div className="w-20 h-20 rounded-full flex items-center justify-center transition-all duration-700 bg-red-500/10">
          <Ban className="w-10 h-10 text-red-500" />
        </div>

        <div className="space-y-3 flex flex-col items-center">
          <div className="flex items-center justify-center gap-2 mb-1">
            <span
              className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                isTemporary
                  ? "bg-amber-500/10 border-amber-500/20 text-amber-500"
                  : "bg-red-500/10 border-red-500/20 text-red-500"
              }`}
            >
              {consultSuspenseType || "Account Restricted"}
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-primary flex items-center justify-center gap-2">
            Account Suspended
          </h1>
          <p className="text-third text-lg max-w-xl mx-auto leading-relaxed">
            Your consultant access has been restricted due to policy violations.
            Please review the details below regarding this action.
          </p>
        </div>
      </div>

      {/* ── SUSPENSION DETAILS BOX ─────────────────────────────────────── */}
      <div className="bg-red-500/5  rounded-2xl p-6 md:p-8 space-y-6 shadow-sm shadow-red-500/5">
        <div className="flex items-start gap-4 text-red-600">
          <div className="w-12 h-12 bg-red-500/10 rounded-xl flex items-center justify-center shrink-0">
            <AlertCircle className="w-6 h-6" />
          </div>
          <div className="space-y-1 text-left">
            <h3 className="font-bold text-xl tracking-tight text-red-500">
              Suspension Details
            </h3>
            <p className="text-primary/70 text-sm leading-relaxed max-w-2xl">
              We have detected activity that violates the AVX platform
              guidelines. Below is the official reason provided by the
              moderation team.
            </p>
          </div>
        </div>

        <div className="bg-primary/5 rounded-xl border border-red-500/20 p-5 ml-0 md:ml-16 text-left">
          <p className="text-primary font-medium leading-relaxed">
            <span className="text-primary font-bold">Reason:</span>{" "}
            {reason ||
              "The specific reason has not been specified by the administrator."}
          </p>
        </div>
      </div>

      {/* ── TIMELINE DETAILS ────────────────────────────────────────────── */}
      <div className="bg-primary/5 border border-third/10 rounded-2xl overflow-hidden">
        <div className="p-8 space-y-6">
          <h2 className="text-xl font-bold text-primary tracking-tight text-left">
            Suspension Timeline
          </h2>

          <div className="space-y-4">
            <div className="flex items-center justify-between py-2 border-b border-third/10">
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-amber-500/20 text-amber-500 flex items-center justify-center shrink-0">
                  <Calendar className="w-4 h-4" />
                </div>
                <span className="font-semibold text-primary/90">
                  Restricted Until
                </span>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-sm font-bold text-amber-500 text-right">
                  {formatDate(suspendUntil)}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between py-2">
              <div className="flex items-center gap-4">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${isTemporary ? "bg-amber-500/20 text-amber-500" : "bg-red-500/20 text-red-500"}`}
                >
                  <Clock className="w-4 h-4" />
                </div>
                <span className="font-semibold text-primary/90">
                  Status Type
                </span>
              </div>
              <div className="flex flex-col items-end">
                <span
                  className={`text-sm font-bold text-right ${isTemporary ? "text-amber-500" : "text-red-500"}`}
                >
                  {isTemporary ? "Temporary Restriction" : "Permanent Ban"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── ACTIONS & RESOURCES ─────────────────────────────────────────── */}
      <div className="space-y-6 pb-12">
        <h2 className="text-xl font-bold text-primary text-left">Need Help?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            onClick={() => (window.location.href = "mailto:compliance@avx.com")}
            className="cursor-pointer flex items-center justify-between p-5 rounded-xl border border-third/10 hover:border-primary/40 hover:bg-primary/5 transition-all text-left group"
          >
            <div className="flex items-center gap-4">
              <div className="p-2 bg-primary/5 rounded-lg group-hover:bg-primary/10 transition-colors">
                <Mail className="w-5 h-5 text-primary" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-primary leading-none mb-1">
                  Submit an Appeal
                </span>
                <span className="text-xs text-third">
                  Contact our compliance team.
                </span>
              </div>
            </div>
          </button>

          <button
            onClick={handlePartnerPolicies}
            className="cursor-pointer flex items-center justify-between p-5 rounded-xl border border-third/10 hover:border-primary/40 hover:bg-primary/5 transition-all text-left group"
          >
            <div className="flex items-center gap-4">
              <div className="p-2 bg-primary/5 rounded-lg group-hover:bg-primary/10 transition-colors">
                <ExternalLink className="w-5 h-5 text-primary" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-primary leading-none mb-1">
                  Partner Policies
                </span>
                <span className="text-xs text-third">
                  Review our platform rules.
                </span>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuspendedAccount;
