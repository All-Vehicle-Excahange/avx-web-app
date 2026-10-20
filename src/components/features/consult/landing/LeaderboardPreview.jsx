"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  FiAward,
  FiCheckCircle,
  FiShield,
  FiTag,
  FiClock,
  FiLayers,
  FiFileText,
  FiMapPin,
  FiTrendingUp,
  FiZap,
  FiEye,
} from "react-icons/fi";
import { useQuery } from "@tanstack/react-query";
import Button from "@/components/ui/button";
import DynamicTable from "@/components/ui/DynamicTable";
import { useAuthStore } from "@/stores/useAuthStore";
import { getConsultantRankingsQuery } from "@/queries/user.queries";

const formatResponseTime = (minutes) => {
  if (minutes == null || isNaN(minutes) || minutes <= 0) return "—";
  if (minutes < 1) return "< 1 min";
  if (minutes < 60) return `${Math.round(minutes)} min`;

  const days = Math.floor(minutes / (60 * 24));
  const remainingHours = Math.floor((minutes % (60 * 24)) / 60);
  const remainingMins = Math.round(minutes % 60);

  if (days > 0) {
    return remainingHours > 0 ? `${days}d ${remainingHours}h` : `${days}d`;
  }
  return remainingMins > 0 ? `${remainingHours}h ${remainingMins}m` : `${remainingHours}h`;
};

function ConsultantAvatar({ logoUrl, name, size = "md", className = "" }) {
  const [imgError, setImgError] = useState(false);
  const initial = (name || "C").trim().charAt(0).toUpperCase();

  const sizeClasses = {
    sm: "w-8 h-8 text-xs rounded-lg",
    md: "w-10 h-10 text-sm rounded-xl",
    lg: "w-16 h-16 text-xl rounded-2xl",
  }[size] || "w-10 h-10 text-sm rounded-xl";

  if (logoUrl && !imgError) {
    return (
      <div
        className={`relative overflow-hidden bg-white/5 border border-white/10 shrink-0 flex items-center justify-center ${sizeClasses} ${className}`}
      >
        <img
          src={logoUrl}
          alt={name || "Consultant"}
          className="w-full h-full object-cover"
          onError={() => setImgError(true)}
        />
      </div>
    );
  }

  return (
    <div
      className={`bg-gradient-to-br from-fourth/30 via-fourth/15 to-transparent border border-fourth/30 text-fourth font-black flex items-center justify-center shrink-0 shadow-inner font-[Montserrat] ${sizeClasses} ${className}`}
    >
      {initial}
    </div>
  );
}

export default function LeaderboardPreview() {
  const [rankBy, setRankBy] = useState("INQUIRIES");
  const { user, openLoginPopup } = useAuthStore();
  const isConsultant =
    user?.userRole === "CONSULTATION" || user?.role === "CONSULTATION";

  const { data: rankingResponse, isLoading, isError, refetch } = useQuery(
    getConsultantRankingsQuery({
      pageNo: 1,
      size: 10,
      rankBy,
    }),
  );

  const topTenLeaders = rankingResponse?.data || [];

  const columns = [
    {
      key: "currentRank",
      title: "# Rank",
      width: "10%",
      align: "center",
      render: (_, __, index) => {
        const rank = index + 1;
        if (rank === 1) {
          return (
            <div className="relative w-8 h-8 mx-auto flex items-center justify-center" title="Rank #1 Winner">
              <img
                src="/leader-1.png"
                alt="Rank 1"
                className="w-full h-full object-contain drop-shadow-[0_2px_8px_rgba(245,158,11,0.5)]"
              />
            </div>
          );
        }
        if (rank === 2) {
          return (
            <div className="relative w-8 h-8 mx-auto flex items-center justify-center" title="Rank #2 Runner-up">
              <img
                src="/leader-2.png"
                alt="Rank 2"
                className="w-full h-full object-contain drop-shadow-[0_2px_8px_rgba(148,163,184,0.4)]"
              />
            </div>
          );
        }
        if (rank === 3) {
          return (
            <div className="relative w-8 h-8 mx-auto flex items-center justify-center" title="Rank #3">
              <img
                src="/leader-3.png"
                alt="Rank 3"
                className="w-full h-full object-contain drop-shadow-[0_2px_8px_rgba(217,119,6,0.4)]"
              />
            </div>
          );
        }
        return (
          <div className="w-7 h-7 mx-auto rounded-lg flex items-center justify-center font-semibold text-xs tracking-wider bg-white/5 text-third/80 border border-white/10">
            {rank}
          </div>
        );
      },
    },
    {
      key: "consultationName",
      title: "Consultant / Business",
      width: "27%",
      render: (_, row) => (
        <div className="flex items-center gap-3">
          <ConsultantAvatar
            logoUrl={row.logoUrl}
            name={row.consultationName}
            size="md"
            className="border border-white/10 shadow-sm"
          />
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <Link
                href={
                  row.consultationUsername
                    ? `/auto-consultant/${row.consultationUsername}`
                    : "#"
                }
                className="font-semibold text-sm sm:text-base text-primary hover:text-fourth transition-colors truncate"
              >
                {row.consultationName || "Auto Consultant"}
              </Link>

            </div>
            {row.consultationUsername && (
              <span className="text-xs text-third/60 mt-0.5 truncate">
                @{row.consultationUsername}
              </span>
            )}
          </div>
        </div>
      ),
    },
    {
      key: "city",
      title: "City / Location",
      width: "15%",
      render: (_, row) => (
        <div className="flex items-center gap-1.5 text-xs text-third">
          <FiMapPin className="w-3.5 h-3.5 text-fourth shrink-0" />
          <span className="text-primary/90 font-medium">{row.cityName || "—"}</span>
          {row.stateName && (
            <>
              <span className="text-third/40">&bull;</span>
              <span className="text-third/70">{row.stateName}</span>
            </>
          )}
        </div>
      ),
    },
    {
      key: "totalInquiries",
      title: "Total Inquiries",
      width: "14%",
      align: "center",
      render: (val) => (
        <span className="text-sm font-semibold text-fourth ">
          {val ?? 0}
        </span>
      ),
    },
    {
      key: "activeListings",
      title: "Active Listings",
      width: "12%",
      align: "center",
      render: (val) => (
        <span className="text-xs font-semibold px-2 py-0.5 rounded bg-white/5 text-third">
          {val ?? 0} cars
        </span>
      ),
    },
    {
      key: "avgResponseTimeMinutes",
      title: "Avg Response",
      width: "12%",
      align: "center",
      render: (val) => (
        <span
          className={`text-xs font-semibold px-2 py-1 rounded-md border flex items-center justify-center gap-1.5 mx-auto w-fit ${rankBy === "RESPONSE_TIME"
            ? "bg-fourth/15 text-fourth border-fourth/30 font-bold"
            : "bg-white/5 text-third border-white/10"
            }`}
        >
          <FiClock className="w-3 h-3 shrink-0" />
          {formatResponseTime(val)}
        </span>
      ),
    },
    {
      key: "tierPlanTitle",
      title: "Tier",
      width: "8%",
      align: "center",
      render: (val) => {
        const title = (val || "BASIC").toUpperCase();
        const isPremium = title === "PREMIUM";
        const isPro = title === "PRO";
        return (
          <span
            className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${isPremium
              ? "bg-amber-400/20 text-amber-300 border border-amber-400/30"
              : isPro
                ? "bg-fourth/20 text-sky-400 border border-fourth/30"
                : "bg-white/10 text-third border border-white/10"
              }`}
          >
            {title}
          </span>
        );
      },
    },
    {
      key: "actions",
      title: "Actions",
      width: "5%",
      align: "center",
      render: (_, row) => (
        <Link
          href={
            row.consultationUsername
              ? `/auto-consultant/${row.consultationUsername}`
              : "#"
          }
          title="View Consultant Profile"
          aria-label="View Consultant Profile"
          className="w-8 h-8 mx-auto flex items-center justify-center rounded-xl bg-white/5 hover:bg-fourth hover:text-white border border-white/10 text-third hover:border-fourth/50 transition-all shadow-xs group cursor-pointer"
        >
          <FiEye className="w-4 h-4 text-third group-hover:text-white transition-colors" />
        </Link>
      ),
    },
  ];

  const growthHighlights = [
    {
      icon: <FiTag className="w-5 h-5 text-fourth" />,
      title: "Keep Your Prices Competitive",
      desc: "Set fair prices based on vehicle condition, model year and market demand.",
    },
    {
      icon: <FiLayers className="w-5 h-5 text-fourth" />,
      title: "List Vehicles Buyers Want",
      desc: "Maintain relevant inventory based on popular models and local demand.",
    },
    {
      icon: <FiClock className="w-5 h-5 text-fourth" />,
      title: "Respond Without Delay",
      desc: "Reply promptly and professionally to interested buyers.",
    },
    {
      icon: <FiFileText className="w-5 h-5 text-fourth" />,
      title: "Complete Every Listing",
      desc: "Add clear photos, accurate specifications and complete vehicle details.",
    },
  ];

  return (
    <section className="relative py-10 md:py-16 overflow-hidden">
      <div className="relative z-10 max-w-[1440px] mx-auto w-full">
        {/* HEADER - ELEGANT TITLE & UNIFIED SEGMENTED TABS */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-fourth/10 border border-fourth/30 text-fourth text-xs font-semibold mb-3.5 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Top 10 Consultants &bull; Live Platform Activity</span>
          </div>

          <h2 className="font-[Montserrat] text-3xl sm:text-4xl lg:text-5xl text-primary font-semibold tracking-tight leading-[1.12]">
            Top Consultants on{" "}
            <span className="text-fourth font-semibold">Reecomm</span>
          </h2>

          <p className="text-third mt-3 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Real inquiries. Real opportunities. Growing together across the automotive network.
          </p>

          {/* UNIFIED SEGMENTED TAB CONTROL */}
          <div className="mt-7 inline-flex items-center p-1.5 rounded-2xl bg-[#0f1117]/95 border border-white/10 shadow-xl backdrop-blur-md gap-1">
            <button
              type="button"
              onClick={() => setRankBy("INQUIRIES")}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer ${rankBy === "INQUIRIES"
                ? "bg-fourth text-white shadow-md"
                : "text-third hover:text-white hover:bg-white/5"
                }`}
            >
              <FiTrendingUp
                className={`w-4 h-4 ${rankBy === "INQUIRIES" ? "text-white" : "text-fourth"
                  }`}
              />
              <span>Most Inquiries</span>
            </button>
            <button
              type="button"
              onClick={() => setRankBy("RESPONSE_TIME")}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer ${rankBy === "RESPONSE_TIME"
                ? "bg-fourth text-white shadow-md"
                : "text-third hover:text-white hover:bg-white/5"
                }`}
            >
              <FiZap
                className={`w-4 h-4 ${rankBy === "RESPONSE_TIME" ? "text-white" : "text-fourth"
                  }`}
              />
              <span>Fastest Response</span>
            </button>
          </div>
        </div>

        {/* DYNAMIC TABLE DISPLAY SHOWING TOP 10 RECORDS (NO PAGINATION) */}
        <div className="w-full mx-auto mb-12">
          <DynamicTable
            columns={columns}
            data={topTenLeaders}
            isLoading={isLoading}
            minWidth="min-w-[800px]"
            paginationProps={null}
            emptyStateProps={{
              icon: FiAward,
              title: isError
                ? "Unable to load rankings"
                : "No ranked consultants found",
              subtitle: isError
                ? "There was an error communicating with the rankings server."
                : "Check back later as consultants register verified inquiries.",
              action: isError ? (
                <Button onClick={() => refetch()} variant="outline" size="sm">
                  Try Again
                </Button>
              ) : null,
            }}
          />
        </div>

        {/* PRIMARY CTA: VIEW FULL LEADERBOARD */}
        <div className="text-center mb-16">
          <Button
            href="/leaderboard"
            variant="outlineAnimated"
            size="md"
            showIcon={true}
          >
            View Full Leaderboard
          </Button>
          <p className="text-xs text-third/60 mt-3">
            Use actual verified inquiry counts. Individual buyer records stay completely confidential.
          </p>
        </div>

        {/* WANT MORE BUYER INQUIRIES? GROWTH SECTION */}
        <div className="rounded-3xl bg-gradient-to-b from-[#141822] to-[#0c0d12] border border-[#1f2937] p-8 sm:p-12 mb-16 relative overflow-hidden">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h3 className="font-[Montserrat] text-2xl sm:text-3xl lg:text-4xl text-primary font-semibold leading-[1.1]">
              Want More Buyer <span className="text-fourth font-bold">Inquiries?</span>
            </h3>
            <p className="text-third mt-3 text-[15px] md:text-[16px] leading-relaxed">
              Improve your listings, respond faster and give buyers more reasons to contact you.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {growthHighlights.map((item, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#0f1117]/80 border border-[#1f2937] hover:border-fourth/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-fourth/10 border border-fourth/20 flex items-center justify-center mb-4">
                    {item.icon}
                  </div>
                  <h4 className="font-[Montserrat] text-base font-semibold text-primary mb-2">
                    {item.title}
                  </h4>
                  <p className="text-third text-xs sm:text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-white/10">
            <p className="text-xs sm:text-sm text-third">
              Explore proven strategies to improve vehicle discoverability and conversion.
            </p>
            <Button
              href="/consult/grow-your-business"
              variant="outline"
              size="sm"
              showIcon={true}
            >
              Explore All Growth Tips
            </Button>
          </div>
        </div>

      </div>
    </section>
  );
}
