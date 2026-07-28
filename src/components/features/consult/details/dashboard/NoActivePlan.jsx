import React from "react";
import { Crown, Sparkles, ArrowRight } from "lucide-react";
import Button from "@/components/ui/button";
import { useRouter } from "next/router";

export default function NoActivePlan() {
  const router = useRouter();

  const handleUpgradeClick = () => {
    router.push("/consult/pricing");
  };

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center max-w-lg mx-auto space-y-5">
      {/* DECORATIVE CROWN ICON */}
      <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shadow-sm transition-transform duration-300 hover:scale-105">
        <Crown className="w-8 h-8 text-amber-400" />
      </div>

      {/* BADGE */}
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-medium tracking-wide">
        <Sparkles className="w-3.5 h-3.5" />
        <span>Subscription Required</span>
      </div>

      {/* HEADING & DESCRIPTION */}
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-primary tracking-tight">
          Your Current Plan Does Not Exist
        </h2>
        <p className="text-sm text-third leading-relaxed">
          You currently do not have an active consultant plan assigned to your account. Please choose a subscription plan to access dashboard features.
        </p>
      </div>

      {/* GLOBAL GHOST BUTTON */}
      <div className="pt-2">
        <Button variant="ghost" size="md" onClick={handleUpgradeClick}>
          <span>Explore Plans & Upgrade</span>
          <ArrowRight className="w-4 h-4 ml-1" />
        </Button>
      </div>
    </div>
  );
}
