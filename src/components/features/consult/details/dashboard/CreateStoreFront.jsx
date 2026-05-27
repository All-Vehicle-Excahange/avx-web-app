"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
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
  Award,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { THEME_STORE } from "@/core/engine/themeStore";
import PreviewPopup from "./storeFrontTheme/components/PreviewPopup";
import { setConsualtTheme, getThemeListing } from "@/services/theme.service";

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

const getThemeMetadata = (theme) => {
  const idStr = String(theme.themeId || theme.id || "").toLowerCase();

  if (idStr.includes("premium")) {
    return {
      description: "Premium layout with high-converting custom widgets",
      tier: "Premium",
      usedCount: "512+",
    };
  } else if (idStr.includes("pro")) {
    return {
      description: "Professional multi-column grid with deep customizations",
      tier: "Pro",
      usedCount: "284+",
    };
  } else {
    return {
      description: "Simple clean layout for starters",
      tier: "Basic",
      usedCount: "346+",
    };
  }
};

export default function CreateStoreFront({ storeData, onView }) {
  const { push } = useRouter();
  const [previewTheme, setPreviewTheme] = useState(null);
  const [themes, setThemes] = useState([]);
  const [loadingThemes, setLoadingThemes] = useState(true);

  const statusBadge = storeData
    ? getStatusBadge(storeData.verificationStatus)
    : null;

  const isStatusLocked =
    storeData?.verificationStatus &&
    !["VERIFIED", "REQUEST_CHANGES"].includes(storeData.verificationStatus);

  const USER_TIER = getSellerTierTitle() || "BASIC";

  useEffect(() => {
    const fetchThemes = async () => {
      setLoadingThemes(true);
      try {
        const data = await getThemeListing();
        setThemes(data.data || []);
      } catch (error) {
        console.error("Failed to fetch themes:", error);
      } finally {
        setLoadingThemes(false);
      }
    };
    fetchThemes();
  }, []);

  const tierThemes = themes.filter((theme) => {
    const idLower = String(theme.themeId || theme.id || "").toLowerCase();
    if (USER_TIER === "PRO") return idLower.includes("pro");
    if (USER_TIER === "PREMIUM" || USER_TIER === "ADVANCE")
      return idLower.includes("premium");
    return (
      idLower.includes("basic") ||
      (!idLower.includes("pro") && !idLower.includes("premium"))
    );
  });

  const handleExploreAll = () => {
    if (isStatusLocked) return;
    push(`storefront/theme`);
  };

  return (
    <section className="space-y-10">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Choose a Storefront Theme</h1>
          <p className="text-third text-sm">
            Select a template designed specifically for your subscription tier
            to start building your brand.
          </p>
        </div>
        <Button
          onClick={handleExploreAll}
          variant="outlineSecondary"
          size="sm"
          disabled={isStatusLocked}
        >
          Explore All Themes
        </Button>
      </div>

      {/* THEMES GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {loadingThemes
          ? Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="relative rounded-3xl border border-third/30 overflow-hidden h-[300px] bg-secondary animate-pulse"
              >
                <div className="h-full w-full bg-third/10" />
              </div>
            ))
          : tierThemes.map((theme) => {
              const meta = getThemeMetadata(theme);

              return (
                <div
                  key={theme.id}
                  onClick={() => !isStatusLocked && setPreviewTheme(theme)}
                  className={`relative group h-[300px] rounded-3xl overflow-hidden border transition-all duration-300 hover:scale-[1.01] bg-secondary flex flex-col justify-end
                    ${
                      isStatusLocked
                        ? "border-third/20 opacity-80 cursor-not-allowed"
                        : "border-third/30 hover:border-primary hover:shadow-[0_8px_30px_rgb(0,0,0,0.5)] cursor-pointer shadow-lg"
                    }`}
                >
                  {/* Background Image */}
                  <div className="absolute inset-0">
                    <Image
                      src={theme.thumbnail}
                      alt={theme.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-linear-to-t from-black/95 via-black/40 to-transparent transition-opacity duration-300 group-hover:from-black" />

                  {/* Top-Right Pill (Theme Tier) */}
                  <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md text-white/90 text-xs border border-white/10 select-none">
                    <Award size={12} className="text-white/80" />
                    <span className="font-semibold">{meta.tier} Theme</span>
                  </div>

                  {/* Info Overlay */}
                  <div className="relative z-10 p-6 flex flex-col gap-1.5 select-none w-full">
                    <h3 className="text-lg font-bold text-white leading-tight">
                      {theme.name}
                    </h3>
                    <p className="text-xs text-white/70 font-normal line-clamp-2">
                      {meta.description}
                    </p>
                  </div>
                </div>
              );
            })}
      </div>

      {previewTheme && (
        <PreviewPopup
          theme={previewTheme}
          onClose={() => setPreviewTheme(null)}
          onSelect={(selected) => {
            push(
              `/consult/dashboard/storefront/theme/create?theme=${selected.themeId || selected.id}`,
            );
          }}
        />
      )}

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
          Your Storefront is your public brand page on Reecomm. This is what
          buyers see when they click your profile, listings, and ads. A
          well-designed storefront builds instant trust, improves conversions,
          and positions your dealership as a verified premium seller.
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
