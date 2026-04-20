"use client";
import Button from "@/components/ui/button";
import { getSellerTierTitle } from "@/lib/helper";
import {
  CheckCircle2,
  Lock,
  Eye,
  AlertCircle,
  Clock,
  ShieldCheck,
  XCircle,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { THEME_STORE } from "@/core/engine/themeStore";
const TIERS = [
  {
    id: "BASIC",
    name: "Tier 1",
    label: "Basic",
    features: ["1 Banner", "Basic About Section", "Single Image"],
  },
  {
    id: "PRO",
    name: "Tier 2",
    label: "Pro",
    features: [
      "Custom Banner",
      "All Sections",
      "Multiple Images",
      "Priority Listing",
    ],
  },
  {
    id: "PREMIUM",
    name: "Tier 3",
    label: "Advance",
    features: [
      "Everything in Pro",
      "Featured Store",
      "Homepage Slot",
      "Analytics",
    ],
  },
];

// 🔐 Backend will send this later
const USER_TIER = getSellerTierTitle();

/**
 * Returns a display label + color class for the verification status
 */
function getStatusBadge(status) {
  switch (status) {
    case "VERIFIED":
      return {
        label: "Verified",
        icon: ShieldCheck,
        cls: "text-green-400 bg-green-400/10 border-green-400/30",
      };
    case "PENDING":
    case "REQUESTED":
      return {
        label: "Requested",
        icon: Clock,
        cls: "text-yellow-400 bg-yellow-400/10 border-yellow-400/30",
      };
    case "REQUEST_CHANGES":
      return {
        label: "Changes Requested",
        icon: AlertCircle,
        cls: "text-orange-400 bg-orange-400/10 border-orange-400/30",
      };
    case "REJECTED":
      return {
        label: "Rejected",
        icon: XCircle,
        cls: "text-red-400 bg-red-400/10 border-red-400/30",
      };
    default:
      return {
        label: status || "Draft",
        icon: Clock,
        cls: "text-third bg-third/10 border-third/30",
      };
  }
}

export default function CreateStoreFront({ storeData, onView }) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`storefront/theme`);
  };

  const statusBadge = storeData
    ? getStatusBadge(storeData.verificationStatus)
    : null;

  const isStatusLocked =
    storeData?.verificationStatus &&
    !["VERIFIED", "REQUEST_CHANGES"].includes(storeData.verificationStatus);

  return (
    <section className="space-y-10">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold">Your Storefront Plan</h1>
        <p className="text-third text-sm">
          Your subscription defines your storefront capabilities
        </p>
      </div>

      {/* TIERS */}
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
        {TIERS.map((tier) => {
          const isAllowed = USER_TIER === tier.id;

          return (
            <div
              key={tier.id}
              className={`rounded-xl border p-6 flex flex-col min-h-[320px] md:h-auto lg:h-[340px] transition-all duration-300
                ${
                  isAllowed
                    ? isStatusLocked
                      ? "border-primary/50 opacity-80 cursor-not-allowed"
                      : "hover:-translate-y-2 hover:shadow-[0_8px_30px_rgb(0,0,0,0.5)] border-primary ring-2 ring-primary/50 shadow-[0_0_20px_rgba(255,255,255,0.1)] cursor-pointer"
                    : "border-third/30 opacity-60 pointer-events-none"
                }`}
            >
              {/* Top */}
              <div className="space-y-6 flex-1">
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-bold leading-tight">
                    {tier.name}
                    <div className="text-sm text-third font-normal mt-1">
                      {tier.label} Listing
                    </div>
                  </h3>
                  {isAllowed ? (
                    <CheckCircle2 className="text-primary mt-1" size={20} />
                  ) : (
                    <Lock size={18} className="text-third mt-1" />
                  )}
                </div>

                {/* FEATURES */}
                <ul className="text-sm text-third space-y-3 leading-relaxed">
                  {tier.features.map((f, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="text-primary">•</span> {f}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bottom fixed */}
              <div className="mt-6 pt-4 border-t border-third/10">
                {isAllowed ? (
                  <Button
                    onClick={handleClick}
                    variant="ghost"
                    full
                    size="sm"
                    showIcon={!isStatusLocked}
                    locked={isStatusLocked}
                  >
                    {isStatusLocked
                      ? storeData.verificationStatus === "REQUESTED" ||
                        storeData.verificationStatus === "PENDING"
                        ? `Use ${tier.label} Storefront`
                        : "Locked"
                      : `Use ${tier.label} Storefront`}
                  </Button>
                ) : (
                  <Button full disabled size="sm" variant="ghost">
                    Locked <Lock className="ml-3" size={16} />
                  </Button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* ─── STOREFRONT DRAFT TABLE (only when data exists) ─── */}
      {storeData && (
        <div className="border border-third/30 rounded-xl p-6 space-y-6 transition-all duration-300">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-semibold">Your Storefront</h2>
              <p className="text-third text-sm mt-1">
                Preview and manage your storefront pages
              </p>
            </div>

            {/* Status Badge */}
            <div className="flex items-center gap-3 flex-wrap">
              {statusBadge && (
                <span
                  className={`inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full border ${statusBadge.cls}`}
                >
                  <statusBadge.icon size={14} />
                  {statusBadge.label}
                </span>
              )}
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-third/20">
                  <th className="text-left py-3 px-4 font-medium text-third">
                    Theme Name
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-third">
                    Created At
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-third">
                    Verified At
                  </th>
                  <th className="text-right py-3 px-4 font-medium text-third">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-third/10 hover:bg-third/5 transition-colors">
                  <td className="py-4 px-4 font-medium whitespace-nowrap">
                    {THEME_STORE.find((t) => t.id === storeData.themeId)
                      ?.name ||
                      storeData.themeId ||
                      "Default Theme"}
                  </td>
                  <td className="py-4 px-4 text-third">
                    {storeData.createdAt
                      ? new Date(storeData.createdAt).toLocaleDateString(
                          "en-US",
                          { year: "numeric", month: "short", day: "numeric" },
                        )
                      : "—"}
                  </td>
                  <td className="py-4 px-4 text-third">
                    {storeData.verifiedAt
                      ? new Date(storeData.verifiedAt).toLocaleDateString(
                          "en-US",
                          { year: "numeric", month: "short", day: "numeric" },
                        )
                      : "—"}
                  </td>
                  <td className="py-4 px-4 text-right">
                    <Button
                      onClick={() => onView?.("about")}
                      variant="outlineSecondary"
                      size="sm"
                    >
                      <Eye size={14} className="mr-1.5" />
                      View
                    </Button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Admin Remark */}
          {storeData.adminRemark && (
            <div className="border border-orange-400/30 bg-orange-400/5 rounded-lg p-4 space-y-1.5">
              <p className="text-sm font-medium text-orange-400 flex items-center gap-2">
                <AlertCircle size={16} />
                Admin Remark
              </p>
              <p className="text-sm text-third leading-relaxed">
                {storeData.adminRemark}
              </p>
            </div>
          )}
        </div>
      )}

      {/* WHY STOREFRONT MATTERS */}
      <div className="border border-third/30 rounded-xl p-8 space-y-6 transition-all duration-300">
        <h2 className="text-xl font-semibold">Why your Storefront matters</h2>

        <p className="text-third text-sm leading-relaxed max-w-4xl">
          Your Storefront is your public brand page on AVX. This is what buyers
          see when they click your profile, listings, and ads. A well-designed
          storefront builds instant trust, improves conversions, and positions
          your dealership as a verified premium seller.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
          <div className="border border-third/20 rounded-xl p-5 space-y-2">
            <h4 className="font-semibold">Higher Buyer Trust</h4>
            <p className="text-sm text-third">
              Professional branding increases buyer confidence and reduces
              hesitation.
            </p>
          </div>

          <div className="border border-third/20 rounded-2xl p-5 space-y-2">
            <h4 className="font-semibold">More Leads</h4>
            <p className="text-sm text-third">
              Verified storefronts receive up to 3× more buyer inquiries.
            </p>
          </div>

          <div className="border border-third/20 rounded-2xl p-5 space-y-2">
            <h4 className="font-semibold">Featured Visibility</h4>
            <p className="text-sm text-third">
              Higher tiers unlock homepage slots and premium discovery sections.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
