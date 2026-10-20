"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiAward,
  FiCheckCircle,
  FiMapPin,
  FiLayers,
  FiClock,
  FiTag,
  FiFileText,
  FiAlertCircle,
  FiChevronDown,
  FiTrendingUp,
  FiZap,
  FiSearch,
  FiX,
  FiCheck,
  FiFilter,
  FiDownload,
  FiBarChart2,
  FiMessageSquare,
  FiShield,
  FiRefreshCw,
  FiChevronRight,
  FiArrowRight,
  FiStar,
  FiEye,
  FiGlobe,
} from "react-icons/fi";
import { useQuery } from "@tanstack/react-query";
import Button from "@/components/ui/button";
import DynamicTable from "@/components/ui/DynamicTable";
import { getConsultantRankingsQuery } from "@/queries/user.queries";
import { getPopularCityAndState, getAllCities } from "@/services/filter";

const TIME_PERIODS = [
  { id: "this_month", label: "This Month" },
  { id: "last_30_days", label: "Last 30 Days" },
  { id: "this_year", label: "This Year" },
  { id: "all_time", label: "All Time" },
];

const RANKING_METRICS = [
  { id: "INQUIRIES", label: "Most Inquiries", icon: FiTrendingUp },
  { id: "RESPONSE_TIME", label: "Fastest Response", icon: FiZap },
];

/**
 * Enhanced response time formatter:
 * Handles minutes, hours, and days (e.g. 15130 min -> 10d 12h)
 */
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

/**
 * Reusable consultant avatar with logoUrl and fallback initial
 */
function ConsultantAvatar({ logoUrl, name, size = "md", className = "" }) {
  const [imgError, setImgError] = useState(false);
  const initial = (name || "C").trim().charAt(0).toUpperCase();

  const sizeClasses = {
    sm: "w-8 h-8 text-xs rounded-lg",
    md: "w-10 h-10 text-sm rounded-xl",
    lg: "w-20 h-20 text-2xl rounded-full",
    xl: "w-24 h-24 text-3xl rounded-full",
  }[size] || "w-10 h-10 text-sm rounded-xl";

  if (logoUrl && !imgError) {
    return (
      <div
        className={`relative overflow-hidden bg-black/40 border border-white/10 shrink-0 flex items-center justify-center ${sizeClasses} ${className}`}
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
      className={`bg-gradient-to-br from-fourth/30 via-fourth/15 to-transparent border border-fourth/30 text-fourth font-black flex items-center justify-center shrink-0 shadow-inner  ${sizeClasses} ${className}`}
    >
      {initial}
    </div>
  );
}

/**
 * 3D Trophy Badge sitting on the top border (Gold #1, Silver #2, Bronze #3)
 */
function PodiumCrown({ rank = 1 }) {
  const isFirst = rank === 1;
  const isSecond = rank === 2;
  const imgSrc = isFirst ? "/leader-1.png" : isSecond ? "/leader-2.png" : "/leader-3.png";
  const glow = isFirst
    ? "drop-shadow-[0_10px_24px_rgba(245,158,11,0.85)]"
    : isSecond
      ? "drop-shadow-[0_10px_22px_rgba(56,189,248,0.75)]"
      : "drop-shadow-[0_10px_22px_rgba(249,115,22,0.75)]";

  const sizeClass = isFirst
    ? "w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 -top-10 sm:-top-12 lg:-top-14"
    : "w-18 h-18 sm:w-20 sm:h-20 lg:w-24 lg:h-24 -top-9 sm:-top-10 lg:-top-12";

  return (
    <div
      className={`absolute left-1/2 -translate-x-1/2 z-20 flex items-center justify-center pointer-events-none select-none ${sizeClass}`}
    >
      <img
        src={imgSrc}
        alt={`Rank #${rank} Trophy`}
        className={`w-full h-full object-contain ${glow} filter`}
      />
    </div>
  );
}

/**
 * Championship Medallion Avatar with metallic glowing ring & floating rank badge
 */
function PodiumAvatar({ logoUrl, name, rank = 1 }) {
  const [imgError, setImgError] = useState(false);
  const isFirst = rank === 1;
  const isSecond = rank === 2;

  const glowColor = isFirst
    ? "shadow-[0_0_35px_rgba(245,158,11,0.45)] ring-amber-400/40"
    : isSecond
      ? "shadow-[0_0_30px_rgba(148,163,184,0.35)] ring-slate-300/40"
      : "shadow-[0_0_30px_rgba(217,119,6,0.35)] ring-amber-600/40";

  const ringGradient = isFirst
    ? "bg-gradient-to-tr from-amber-500 via-yellow-200 to-amber-600 p-[3px]"
    : isSecond
      ? "bg-gradient-to-tr from-slate-200 via-white to-slate-400 p-[3px]"
      : "bg-gradient-to-tr from-amber-600 via-orange-300 to-amber-700 p-[3px]";

  const badgeBg = isFirst
    ? "bg-gradient-to-r from-amber-400 to-yellow-500 text-black shadow-amber-400/50"
    : isSecond
      ? "bg-gradient-to-r from-slate-200 to-slate-300 text-black shadow-slate-300/40"
      : "bg-gradient-to-r from-amber-600 to-orange-500 text-white shadow-amber-600/40";

  const size = isFirst ? "w-22 h-22 sm:w-24 sm:h-24" : "w-18 h-18 sm:w-20 sm:h-20";

  return (
    <div className="relative mt-7 sm:mt-9 mb-4 flex flex-col items-center justify-center">
      {/* Outer Ambient Glow */}
      <div
        className={`absolute -inset-2 rounded-full blur-xl opacity-60 pointer-events-none ${isFirst
          ? "bg-amber-400/25"
          : isSecond
            ? "bg-sky-400/20"
            : "bg-orange-500/20"
          }`}
      />

      {/* Main Medallion Ring */}
      <div className={`relative rounded-full ${ringGradient} ${glowColor} ring-4`}>
        <div className="p-1 rounded-full bg-[#0d111a]">
          <div className={`${size} rounded-full overflow-hidden bg-black/40 relative flex items-center justify-center shrink-0`}>
            {logoUrl && !imgError ? (
              <img
                src={logoUrl}
                alt={name || "Consultant"}
                className="w-full h-full object-cover rounded-full"
                onError={() => setImgError(true)}
              />
            ) : (
              <span className="text-white font-black  text-xl">
                {(name || "C").trim().charAt(0).toUpperCase()}
              </span>
            )}
          </div>
        </div>

        {/* Rank Badge Floating on Bottom of Medallion */}
        <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 z-10">
          <span
            className={`inline-flex items-center justify-center w-7 h-7 rounded-full text-[11px] font-black shadow-lg uppercase tracking-wider ${badgeBg}`}
          >
            #{rank}
          </span>
        </div>
      </div>
    </div>
  );
}

/**
 * Skeleton Loader matching the 3 Top Performer Podium Cards
 */
function PodiumCardSkeleton({ rank = 1 }) {
  const isFirst = rank === 1;
  const isSecond = rank === 2;

  const orderClass = isFirst
    ? "order-1 md:order-2 md:-translate-y-4"
    : isSecond
      ? "order-2 md:order-1"
      : "order-3 md:order-3";

  const borderColor = isFirst
    ? "border-amber-400/50 shadow-[0_16px_50px_rgba(0,0,0,0.6),0_0_50px_rgba(245,158,11,0.25)]"
    : isSecond
      ? "border-slate-300/50 shadow-[0_12px_40px_rgba(0,0,0,0.5),0_0_35px_rgba(148,163,184,0.18)]"
      : "border-amber-600/50 shadow-[0_12px_40px_rgba(0,0,0,0.5),0_0_35px_rgba(217,119,6,0.18)]";

  const bgGradient = isFirst
    ? "bg-gradient-to-b from-amber-400/[0.12] via-[#161a26]/90 to-[#0b0e17]/95"
    : isSecond
      ? "bg-gradient-to-b from-white/[0.08] via-[#141824]/85 to-[#0b0e17]/95"
      : "bg-gradient-to-b from-amber-700/[0.12] via-[#141824]/85 to-[#0b0e17]/95";

  const avatarSize = isFirst
    ? "w-22 h-22 sm:w-24 sm:h-24"
    : "w-18 h-18 sm:w-20 sm:h-20";

  return (
    <div
      className={`rounded-3xl ${bgGradient} backdrop-blur-2xl border-2 ${borderColor} p-4 sm:p-5 lg:p-6 flex flex-col items-center text-center relative transition-all ${orderClass} animate-pulse`}
    >
      {/* Top Glass Highlight */}
      <div className="absolute inset-x-8 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />

      {/* Crown Badge */}
      <PodiumCrown rank={rank} />

      {/* Medallion Avatar Placeholder */}
      <div className="relative mt-7 sm:mt-9 mb-4 flex items-center justify-center">
        <div
          className={`${avatarSize} rounded-full bg-white/10 ring-4 ${isFirst
            ? "ring-amber-400/20"
            : isSecond
              ? "ring-sky-400/20"
              : "ring-orange-500/20"
            } flex items-center justify-center relative`}
        >
          <div className="w-12 h-12 rounded-full bg-white/5" />
          <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-white/20" />
        </div>
      </div>

      {/* Name skeleton */}
      <div className="h-6 w-36 sm:w-44 rounded-lg bg-white/15 my-1" />

      {/* Tier Badge skeleton */}
      <div className="mt-2">
        <div
          className={`h-5 w-20 rounded-full ${isFirst
            ? "bg-amber-400/25"
            : isSecond
              ? "bg-slate-300/25"
              : "bg-amber-600/25"
            }`}
        />
      </div>

      {/* City skeleton */}
      <div className="flex items-center gap-1.5 mt-2.5">
        <div className="w-3.5 h-3.5 rounded-full bg-sky-400/30 shrink-0" />
        <div className="h-3.5 w-24 rounded bg-white/10" />
      </div>

      {/* Frosted Glass Stats Box skeleton */}
      <div className="mt-5 sm:mt-6 w-full rounded-2xl bg-white/[0.05] backdrop-blur-xl border border-white/10 px-2 py-3 sm:px-3 sm:py-3.5 lg:px-4 lg:py-4 grid grid-cols-3 divide-x divide-white/10 text-center shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]">
        <div className="px-0.5 sm:px-1 flex flex-col items-center">
          <div className="h-5 sm:h-6 w-8 sm:w-10 rounded bg-white/20 mb-1.5" />
          <div className="h-2.5 w-12 sm:w-14 rounded bg-white/5" />
        </div>
        <div className="px-0.5 sm:px-1 flex flex-col items-center">
          <div className="h-5 sm:h-6 w-6 sm:w-8 rounded bg-white/20 mb-1.5" />
          <div className="h-2.5 w-12 sm:w-14 rounded bg-white/5" />
        </div>
        <div className="px-0.5 sm:px-1 flex flex-col items-center">
          <div className="h-5 sm:h-6 w-10 sm:w-12 rounded bg-white/20 mb-1.5" />
          <div className="h-2.5 w-12 sm:w-14 rounded bg-white/5" />
        </div>
      </div>
    </div>
  );
}

function PodiumSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 items-end pt-14 sm:pt-16 lg:pt-20">
      <PodiumCardSkeleton rank={2} />
      <PodiumCardSkeleton rank={1} />
      <PodiumCardSkeleton rank={3} />
    </div>
  );
}

const getDateRangeForPeriod = (period) => {
  const now = new Date();
  const pad = (n) => String(n).padStart(2, "0");
  const formatDate = (d, endOfDay = false) =>
    `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${endOfDay ? "23:59:59" : "00:00:00"
    }`;

  if (period === "this_month") {
    const start = new Date(now.getFullYear(), now.getMonth(), 1);
    return {
      fromDate: formatDate(start),
      toDate: formatDate(now, true),
    };
  }

  if (period === "last_30_days") {
    const past = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    return {
      fromDate: formatDate(past),
      toDate: formatDate(now, true),
    };
  }

  if (period === "this_year") {
    const start = new Date(now.getFullYear(), 0, 1);
    return {
      fromDate: formatDate(start),
      toDate: formatDate(now, true),
    };
  }

  return { fromDate: null, toDate: null };
};

export default function LeaderboardMain() {
  const [selectedPeriod, setSelectedPeriod] = useState("this_month");
  const [selectedCityId, setSelectedCityId] = useState("");
  const [selectedCityName, setSelectedCityName] = useState("All Cities");
  const [rankBy, setRankBy] = useState("INQUIRIES");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // City Search & Dropdown State
  const [isCityDropdownOpen, setIsCityDropdownOpen] = useState(false);
  const [isMetricDropdownOpen, setIsMetricDropdownOpen] = useState(false);
  const [citySearchQuery, setCitySearchQuery] = useState("");
  const cityDropdownRef = useRef(null);
  const metricDropdownRef = useRef(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        cityDropdownRef.current &&
        !cityDropdownRef.current.contains(e.target)
      ) {
        setIsCityDropdownOpen(false);
      }
      if (
        metricDropdownRef.current &&
        !metricDropdownRef.current.contains(e.target)
      ) {
        setIsMetricDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Load Popular Cities and All Cities from the API
  const { data: popularCitiesRes, isLoading: isLoadingPopular } = useQuery({
    queryKey: ["popular-cities-states"],
    queryFn: getPopularCityAndState,
    staleTime: 30 * 60 * 1000,
  });

  const { data: allCitiesRes } = useQuery({
    queryKey: ["all-cities-list"],
    queryFn: getAllCities,
    staleTime: 60 * 60 * 1000,
  });

  const popularCities = useMemo(() => {
    const list = popularCitiesRes?.data;
    return Array.isArray(list) ? list : [];
  }, [popularCitiesRes]);

  const allCities = useMemo(() => {
    const list = allCitiesRes?.data;
    return Array.isArray(list) ? list : [];
  }, [allCitiesRes]);

  const filteredCities = useMemo(() => {
    const q = citySearchQuery.trim().toLowerCase();
    if (!q) return [];
    return allCities
      .filter((c) => {
        const name = (c.cityName || c.name || "").toLowerCase();
        const state = (c.stateName || c.state || "").toLowerCase();
        return name.includes(q) || state.includes(q);
      })
      .slice(0, 30);
  }, [allCities, citySearchQuery]);

  const handleSelectCity = (cId, cName) => {
    setSelectedCityId(cId || "");
    setSelectedCityName(cName || "All Cities");
    setCurrentPage(1);
    setIsCityDropdownOpen(false);
    setCitySearchQuery("");
  };

  const queryParams = useMemo(() => {
    const dates = getDateRangeForPeriod(selectedPeriod);
    return {
      ...(dates.fromDate ? { fromDate: dates.fromDate } : {}),
      ...(dates.toDate ? { toDate: dates.toDate } : {}),
      ...(selectedCityId ? { cityId: selectedCityId } : {}),
      rankBy,
      pageNo: currentPage,
      size: pageSize,
    };
  }, [selectedPeriod, selectedCityId, rankBy, currentPage, pageSize]);

  const {
    data: rankingResponse,
    isLoading,
    isFetching,
    isError,
    refetch,
  } = useQuery(getConsultantRankingsQuery(queryParams));

  const consultants = useMemo(
    () => rankingResponse?.data || [],
    [rankingResponse?.data],
  );
  const pageResponse =
    rankingResponse?.pagination ||
    rankingResponse?.pageResponse ||
    {};
  const totalElements =
    typeof pageResponse?.totalElements === "number"
      ? pageResponse.totalElements
      : consultants.length;
  const totalPages =
    typeof pageResponse?.totalPages === "number"
      ? pageResponse.totalPages
      : Math.max(1, Math.ceil(totalElements / pageSize));

  // Dedicated query for Top 3 Podium so it remains constant when table is paginated
  const topThreeParams = useMemo(() => {
    const dates = getDateRangeForPeriod(selectedPeriod);
    return {
      ...(dates.fromDate ? { fromDate: dates.fromDate } : {}),
      ...(dates.toDate ? { toDate: dates.toDate } : {}),
      ...(selectedCityId ? { cityId: selectedCityId } : {}),
      rankBy,
      pageNo: 1,
      size: 3,
    };
  }, [selectedPeriod, selectedCityId, rankBy]);

  const {
    data: topThreeRes,
    isLoading: isLoadingTopThree,
    isFetching: isFetchingTopThree,
    refetch: refetchTopThree,
  } = useQuery(getConsultantRankingsQuery(topThreeParams));
  const topThree = useMemo(() => topThreeRes?.data || [], [topThreeRes?.data]);

  const handlePeriodChange = (pId) => {
    setSelectedPeriod(pId);
    setCurrentPage(1);
  };

  const handleRankByChange = (metric) => {
    setRankBy(metric);
    setCurrentPage(1);
    setIsMetricDropdownOpen(false);
  };

  const handlePageSizeChange = (newSize) => {
    setPageSize(newSize);
    setCurrentPage(1);
  };

  const resetFilters = () => {
    setSelectedPeriod("this_month");
    setSelectedCityId("");
    setSelectedCityName("All Cities");
    setRankBy("INQUIRIES");
    setCurrentPage(1);
    setCitySearchQuery("");
  };

  // Export CSV handler
  const handleExportCSV = () => {
    if (!consultants.length) return;
    const headers = [
      "Rank",
      "Consultant Name",
      "Username",
      "City",
      "State",
      "Active Listings",
      "Total Inquiries",
      "Avg Response Time (Mins)",
      "Tier Plan",
    ];
    const rows = consultants.map((c, i) => [
      (currentPage - 1) * pageSize + i + 1,
      `"${(c.consultationName || "").replace(/"/g, '""')}"`,
      `"${c.consultationUsername || ""}"`,
      `"${c.cityName || ""}"`,
      `"${c.stateName || ""}"`,
      c.activeListings ?? 0,
      c.totalInquiries ?? 0,
      c.avgResponseTimeMinutes ?? 0,
      `"${c.tierPlanTitle || "BASIC"}"`,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `reecomm_leaderboard_${selectedPeriod}_${new Date().toISOString().slice(0, 10)}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const columns = [
    {
      key: "currentRank",
      title: "#",
      width: "7%",
      align: "center",
      render: (_, __, index) => {
        const rank = (currentPage - 1) * pageSize + index + 1;
        if (rank === 1) {
          return (
            <div className="relative w-8 h-8 mx-auto flex items-center justify-center" title="Rank #1 Leader">
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
      width: "28%",
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
      width: "13%",
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
      width: "13%",
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
      width: "10%",
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
      width: "6%",
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

  return (
    <div className="w-full">
      {/* ── 1. CINEMATIC HERO SECTION WITH LEADER-BG BACKGROUND ── */}
      <section className="relative pt-3 sm:pt-4 pb-6 sm:pb-8 overflow-hidden">
        {/* Natural Background with leader-bg.png */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden select-none">
          <img
            src="/leader-bg.png"
            alt="Reecomm Consultant Vehicles"
            className="w-full h-full object-cover object-right sm:object-right-bottom"
          />

          {/* Left Side: Soft ambient gray transition matching the site's natural #313131 -> #1a1919 background */}
          <div className="absolute inset-y-0 left-0 w-full lg:w-3/5 bg-gradient-to-r from-[#313131]/75 via-[#1a1919]/50 to-transparent z-10" />

          {/* Soft light glow behind text */}
          <div className="absolute -left-20 top-1/4 w-[480px] h-[320px] rounded-full bg-slate-300/10 blur-[130px] z-10" />

          {/* Bottom Gray Effect: Seamlessly fades into the site's dark gray body */}
          <div className="absolute inset-x-0 bottom-0 h-28 sm:h-36 bg-gradient-to-t from-[#1a1919] via-[#1a1919]/70 to-transparent z-10" />
          <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-white/10 via-white/15 to-transparent z-20" />
        </div>

        <div className="container relative z-20">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs font-medium text-third/70 mb-3">
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <FiChevronRight className="w-3 h-3 text-third/40" />
            <Link href="/consult" className="hover:text-primary transition-colors">
              Consultant
            </Link>
            <FiChevronRight className="w-3 h-3 text-third/40" />
            <span className="text-fourth font-semibold">Leaderboard</span>
          </nav>

          {/* Hero Titles & Showcase Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[190px] sm:min-h-[230px]">
            {/* Left Column: Titles & Description */}
            <div className="lg:col-span-7 xl:col-span-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-fourth/10 border border-fourth/30 text-fourth text-xs font-semibold mb-2.5">
                <FiAward className="w-3.5 h-3.5" />
                <span>Verified Automotive Performance</span>
              </div>

              <h1 className=" text-3xl sm:text-4xl lg:text-5xl font-semibold text-primary tracking-tight leading-[1.12]">
                Reecomm Consultant{" "}
                <span className="text-fourth font-semibold">Leaderboard</span>
              </h1>

              <p className="text-third mt-3 text-sm sm:text-base leading-relaxed max-w-xl">
                Recognising top performing consultants. Celebrating growth, verified
                inquiries and successful connections across the automotive network.
              </p>

              {/* Action Badges / Links */}
              <div className="flex flex-wrap items-center gap-3 mt-5">
                <a
                  href="#rankings-table"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-fourth hover:bg-fourth/90 text-white font-semibold text-xs shadow-md shadow-fourth/25 transition-all cursor-pointer"
                >
                  <FiTrendingUp className="w-4 h-4" />
                  <span>Explore Rankings</span>
                </a>
                <Link
                  href="/consult/grow-your-business"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-primary font-semibold text-xs transition-all cursor-pointer backdrop-blur-sm"
                >
                  <span>Rankings Guide</span>
                  <FiChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Right Column: Kept clear for the vehicle showcase in leader-bg.png */}
            <div className="hidden lg:block lg:col-span-5 xl:col-span-6 min-h-[170px] pointer-events-none" />
          </div>

          {/* 4 Trust & Ranking Badges Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-6 pt-4 border-t border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-fourth/15 border border-fourth/30 flex items-center justify-center text-fourth shrink-0">
                <FiCheckCircle className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-semibold text-primary ">
                  Verified Activity
                </h4>
                <p className="text-[11px] text-third/70">Real Performance</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-fourth/15 border border-fourth/30 flex items-center justify-center text-fourth shrink-0">
                <FiShield className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-semibold text-primary ">
                  Fair & Transparent
                </h4>
                <p className="text-[11px] text-third/70">Ranking System</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-fourth/15 border border-fourth/30 flex items-center justify-center text-fourth shrink-0">
                <FiRefreshCw className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-semibold text-primary ">
                  Regular Updates
                </h4>
                <p className="text-[11px] text-third/70">Stay Informed</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-fourth/15 border border-fourth/30 flex items-center justify-center text-fourth shrink-0">
                <FiTrendingUp className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-semibold text-primary ">
                  More Opportunities
                </h4>
                <p className="text-[11px] text-third/70">Grow Your Business</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. LEADERBOARD FILTERS SECTION ── */}
      <section className="container mb-14">
        <div className="rounded-2xl bg-[#0f121a]/95 border border-white/10 p-5 sm:p-6 shadow-2xl relative overflow-visible">
          {/* Filter Header */}
          <div className="flex items-center justify-between flex-wrap gap-3 mb-5 pb-4 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-fourth/15 text-fourth flex items-center justify-center shrink-0">
                <FiFilter className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-semibold text-primary ">
                  Leaderboard Filters
                </h3>
                <p className="text-xs text-third/70">
                  Filter by timeframe, city, territory and ranking metric.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-full">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>{totalElements} Eligible Consultants</span>
              </span>
            </div>
          </div>

          {/* Filter Inputs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 items-end">
            {/* TIMEFRAME */}
            <div className="lg:col-span-4">
              <label className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-third mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-fourth inline-block" />
                TIMEFRAME
              </label>
              <div className="grid grid-cols-4 gap-1 p-1 bg-black/50 rounded-xl border border-white/10">
                {TIME_PERIODS.map((p) => {
                  const isSelected = selectedPeriod === p.id;
                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => handlePeriodChange(p.id)}
                      className={`py-2 px-1 text-[11px] font-semibold rounded-lg transition-all text-center cursor-pointer truncate ${isSelected
                        ? "bg-fourth text-white shadow-md shadow-fourth/30 font-bold"
                        : "text-third hover:text-white"
                        }`}
                    >
                      {p.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* TERRITORY / CITY SELECTOR */}
            <div className="lg:col-span-3 relative" ref={cityDropdownRef}>
              <label className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-third mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-fourth inline-block" />
                TERRITORY / CITY
              </label>
              <button
                type="button"
                onClick={() => setIsCityDropdownOpen((prev) => !prev)}
                className="w-full h-[42px] bg-black/50 border border-white/10 hover:border-fourth/40 rounded-xl px-3.5 text-xs text-primary flex items-center justify-between transition-colors cursor-pointer text-left"
              >
                <div className="flex items-center gap-2 truncate">
                  <FiMapPin className="w-3.5 h-3.5 text-fourth shrink-0" />
                  <span className="truncate font-medium">{selectedCityName}</span>
                </div>
                <div className="flex items-center gap-1 ml-1 shrink-0">
                  {selectedCityId ? (
                    <span
                      role="button"
                      tabIndex={0}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelectCity("", "All Cities");
                      }}
                      className="p-1 hover:bg-white/10 rounded text-third hover:text-white"
                    >
                      <FiX className="w-3 h-3" />
                    </span>
                  ) : null}
                  <FiChevronDown
                    className={`w-3.5 h-3.5 text-third transition-transform ${isCityDropdownOpen ? "rotate-180 text-fourth" : ""
                      }`}
                  />
                </div>
              </button>

              {/* City Dropdown Popover */}
              <AnimatePresence>
                {isCityDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -6, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -6, scale: 0.98 }}
                    transition={{ duration: 0.15 }}
                    className="absolute left-0 top-full mt-2 w-full min-w-[300px] max-w-[360px] bg-[#141822] border border-[#2b3548] rounded-2xl shadow-2xl z-50 p-3.5 overflow-hidden backdrop-blur-2xl"
                  >
                    <div className="relative mb-2.5">
                      <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-third" />
                      <input
                        type="text"
                        placeholder="Search city or state..."
                        value={citySearchQuery}
                        onChange={(e) => setCitySearchQuery(e.target.value)}
                        autoFocus
                        className="w-full bg-black/60 border border-white/10 rounded-xl pl-9 pr-7 py-2 text-xs text-primary placeholder-third/60 focus:outline-none focus:border-fourth"
                      />
                      {citySearchQuery && (
                        <button
                          type="button"
                          onClick={() => setCitySearchQuery("")}
                          className="absolute right-2.5 top-1/2 -translate-y-1/2 text-third hover:text-white"
                        >
                          <FiX className="w-3 h-3" />
                        </button>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={() => handleSelectCity("", "All Cities")}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold mb-2 transition-colors cursor-pointer ${selectedCityId === ""
                        ? "bg-fourth/15 text-fourth border border-fourth/30"
                        : "text-third hover:text-primary hover:bg-white/5"
                        }`}
                    >
                      <div className="flex items-center gap-2">
                        <FiGlobe className="w-3.5 h-3.5" />
                        <span>All Cities</span>
                      </div>
                      {selectedCityId === "" && (
                        <FiCheck className="w-3.5 h-3.5 text-fourth" />
                      )}
                    </button>

                    {!citySearchQuery.trim() ? (
                      <div>
                        <div className="text-[10px] font-bold text-third/70 uppercase tracking-wider mb-1.5 px-1">
                          Popular Cities
                        </div>
                        {isLoadingPopular ? (
                          <div className="text-center py-3 text-xs text-third">
                            Loading...
                          </div>
                        ) : (
                          <div className="flex flex-wrap gap-1.5 max-h-44 overflow-y-auto custom-scrollbar pr-1">
                            {popularCities.map((c) => {
                              const cId = c.cityId || c.id;
                              const cName = c.cityName || c.name;
                              const isSelected =
                                String(selectedCityId) === String(cId);
                              return (
                                <button
                                  key={cId}
                                  type="button"
                                  onClick={() => handleSelectCity(cId, cName)}
                                  className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer ${isSelected
                                    ? "bg-fourth text-white font-bold"
                                    : "bg-white/5 text-third hover:text-primary hover:bg-white/10 border border-white/5"
                                    }`}
                                >
                                  {cName}
                                </button>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="space-y-1 max-h-52 overflow-y-auto custom-scrollbar pr-1">
                        {filteredCities.length > 0 ? (
                          filteredCities.map((c) => {
                            const cId = c.id || c.cityId;
                            const cName = c.cityName || c.name;
                            const sName = c.stateName || c.state;
                            const isSelected =
                              String(selectedCityId) === String(cId);
                            return (
                              <button
                                key={cId}
                                type="button"
                                onClick={() => handleSelectCity(cId, cName)}
                                className={`w-full flex items-center justify-between px-3 py-1.5 rounded-xl text-left text-xs transition-colors cursor-pointer ${isSelected
                                  ? "bg-fourth/15 text-fourth font-bold"
                                  : "text-primary hover:bg-white/5"
                                  }`}
                              >
                                <div>
                                  <div className="font-semibold">{cName}</div>
                                  {sName && (
                                    <div className="text-[10px] text-third/60">
                                      {sName}
                                    </div>
                                  )}
                                </div>
                                {isSelected && (
                                  <FiCheck className="w-3.5 h-3.5 text-fourth shrink-0" />
                                )}
                              </button>
                            );
                          })
                        ) : (
                          <div className="text-center py-4 text-xs text-third">
                            No cities matching &ldquo;{citySearchQuery}&rdquo;
                          </div>
                        )}
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* RANK METRIC SELECTOR */}
            <div className="lg:col-span-3 relative" ref={metricDropdownRef}>
              <label className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-third mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-fourth inline-block" />
                RANK METRIC
              </label>
              <button
                type="button"
                onClick={() => setIsMetricDropdownOpen((prev) => !prev)}
                className="w-full h-[42px] bg-black/50 border border-white/10 hover:border-fourth/40 rounded-xl px-3.5 text-xs text-primary flex items-center justify-between transition-colors cursor-pointer text-left"
              >
                <div className="flex items-center gap-2 truncate font-medium">
                  <FiBarChart2 className="w-3.5 h-3.5 text-fourth shrink-0" />
                  <span>
                    {rankBy === "RESPONSE_TIME"
                      ? "Fastest Response"
                      : "Most Inquiries"}
                  </span>
                </div>
                <FiChevronDown
                  className={`w-3.5 h-3.5 text-third transition-transform ${isMetricDropdownOpen ? "rotate-180 text-fourth" : ""
                    }`}
                />
              </button>

              <AnimatePresence>
                {isMetricDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -6, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -6, scale: 0.98 }}
                    transition={{ duration: 0.15 }}
                    className="absolute left-0 top-full mt-2 w-full bg-[#141822] border border-[#2b3548] rounded-xl shadow-2xl z-50 p-2 overflow-hidden"
                  >
                    {RANKING_METRICS.map((metric) => {
                      const isSelected = rankBy === metric.id;
                      const Icon = metric.icon;
                      return (
                        <button
                          key={metric.id}
                          type="button"
                          onClick={() => handleRankByChange(metric.id)}
                          className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${isSelected
                            ? "bg-fourth text-white"
                            : "text-third hover:text-primary hover:bg-white/5"
                            }`}
                        >
                          <span className="flex items-center gap-2">
                            <Icon className="w-3.5 h-3.5" />
                            {metric.label}
                          </span>
                          {isSelected && <FiCheck className="w-3.5 h-3.5" />}
                        </button>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* APPLY / RESET ACTION BUTTON */}
            <div className="lg:col-span-2">
              <button
                type="button"
                onClick={() => {
                  refetch();
                  refetchTopThree();
                }}
                className="w-full h-[42px] bg-fourth hover:bg-fourth/90 active:scale-[0.98] text-white font-semibold text-xs rounded-xl shadow-md shadow-fourth/25 flex items-center justify-center gap-1.5 transition-all cursor-pointer"
              >
                <span>Apply Filters</span>
                <FiArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. TOP PERFORMERS (PODIUM - 3 CARDS) ── */}
      {currentPage === 1 && (isLoadingTopThree || isFetchingTopThree || topThree.length >= 3) && (
        <section className="container mb-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className=" text-2xl sm:text-3xl font-semibold text-primary flex items-center gap-2">
                🏆 Top Performers
              </h2>
              <p className="text-third text-xs sm:text-sm mt-1">
                Top ranked consultants based on verified platform activity.
              </p>
            </div>

            <a
              href="#rankings-table"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-xl border border-white/10 hover:border-fourth/40 bg-white/5 hover:bg-white/10 text-primary transition-all cursor-pointer"
            >
              <span>View Full Leaderboard</span>
              <FiArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {isLoadingTopThree || isFetchingTopThree ? (
            <PodiumSkeleton />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4 lg:gap-6 items-end pt-14 sm:pt-16 lg:pt-20">
              {/* ── #2 Rank (Silver - Left) ── */}
              <div className="order-2 md:order-1 rounded-3xl bg-gradient-to-b from-white/[0.08] via-[#141824]/85 to-[#0b0e17]/95 backdrop-blur-2xl border-2 border-slate-300/80 p-4 sm:p-5 lg:p-6 flex flex-col items-center text-center relative shadow-[0_12px_40px_rgba(0,0,0,0.5),0_0_35px_rgba(148,163,184,0.18)]">
                {/* Top Glass Highlight */}
                <div className="absolute inset-x-8 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none z-10" />

                {/* Crown Badge on Top Border */}
                <PodiumCrown rank={2} />

                {/* Background Ambient Rays */}
                <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none">
                  <div className="absolute -top-10 -right-10 w-44 h-80 bg-gradient-to-b from-slate-300/10 via-transparent to-transparent -rotate-45 blur-lg" />
                  <div className="absolute top-20 -left-10 w-32 h-72 bg-gradient-to-b from-slate-300/10 via-transparent to-transparent -rotate-45 blur-lg" />
                  <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-48 h-48 bg-slate-300/10 rounded-full blur-[60px]" />
                </div>

                {/* Avatar Flanked with Silver Laurel Wreath */}
                <PodiumAvatar
                  logoUrl={topThree[1].logoUrl}
                  name={topThree[1].consultationName}
                  rank={2}
                />

                <Link
                  href={
                    topThree[1].consultationUsername
                      ? `/auto-consultant/${topThree[1].consultationUsername}`
                      : "#"
                  }
                  className="text-base sm:text-lg lg:text-xl font-semibold text-primary hover:text-fourth transition-colors line-clamp-1 relative z-10"
                >
                  {topThree[1].consultationName}
                </Link>

                {/* Tier Badge */}
                <div className="mt-2 relative z-10">
                  <span className="text-[11px] font-bold px-3.5 py-1 rounded-full bg-slate-200 text-black uppercase tracking-wider shadow-md shadow-slate-300/20">
                    {topThree[1].tierPlanTitle || "PRO"}
                  </span>
                </div>

                {/* City with Blue Location Pin */}
                <div className="flex items-center gap-1.5 text-xs text-third mt-2.5 relative z-10">
                  <FiMapPin className="w-3.5 h-3.5 text-sky-400" />
                  <span className="font-medium text-primary/90">{topThree[1].cityName || "—"}</span>
                </div>

                {/* Frosted Glass Bottom Stats Container */}
                <div className="mt-5 sm:mt-6 w-full rounded-2xl bg-gradient-to-b from-white/[0.08] to-white/[0.02] backdrop-blur-xl border border-white/15 px-2 py-3 sm:px-3 sm:py-3.5 lg:px-4 lg:py-4 grid grid-cols-3 divide-x divide-white/10 text-center relative z-10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.25),0_8px_20px_rgba(0,0,0,0.35)]">
                  <div className="px-0.5 sm:px-1 min-w-0 flex flex-col items-center justify-center">
                    <div className="text-sm sm:text-base lg:text-lg xl:text-xl font-bold text-white whitespace-nowrap tracking-tight">
                      {topThree[1].totalInquiries ?? 0}
                    </div>
                    <div className="text-[9px] sm:text-[10px] font-semibold text-third/75 mt-1 leading-tight truncate w-full">
                      Verified Inquiries
                    </div>
                  </div>
                  <div className="px-0.5 sm:px-1 min-w-0 flex flex-col items-center justify-center">
                    <div className="text-sm sm:text-base lg:text-lg xl:text-xl font-bold text-white whitespace-nowrap tracking-tight">
                      {topThree[1].activeListings ?? 0}
                    </div>
                    <div className="text-[9px] sm:text-[10px] font-semibold text-third/75 mt-1 leading-tight truncate w-full">
                      Active Listings
                    </div>
                  </div>
                  <div className="px-0.5 sm:px-1 min-w-0 flex flex-col items-center justify-center">
                    <div className="text-sm sm:text-base lg:text-lg xl:text-xl font-bold text-white whitespace-nowrap tracking-tight">
                      {formatResponseTime(topThree[1].avgResponseTimeMinutes)}
                    </div>
                    <div className="text-[9px] sm:text-[10px] font-semibold text-third/75 mt-1 leading-tight truncate w-full">
                      Avg Response
                    </div>
                  </div>
                </div>
              </div>

              {/* ── #1 Rank (Gold - Center - Elevated) ── */}
              <div className="order-1 md:order-2 rounded-3xl bg-gradient-to-b from-amber-400/[0.14] via-[#161a26]/90 to-[#0b0e17]/95 backdrop-blur-2xl border-2 border-amber-400 p-4 sm:p-5 lg:p-6 flex flex-col items-center text-center relative shadow-[0_16px_50px_rgba(0,0,0,0.6),0_0_50px_rgba(245,158,11,0.3)] md:-translate-y-4">
                {/* Top Glass Highlight */}
                <div className="absolute inset-x-8 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-amber-300/60 to-transparent pointer-events-none z-10" />

                {/* Crown Badge on Top Border */}
                <PodiumCrown rank={1} />

                {/* Background Ambient Rays */}
                <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none">
                  <div className="absolute -top-10 -right-10 w-48 h-96 bg-gradient-to-b from-amber-400/15 via-transparent to-transparent -rotate-45 blur-lg" />
                  <div className="absolute top-20 -left-10 w-36 h-80 bg-gradient-to-b from-amber-400/15 via-transparent to-transparent -rotate-45 blur-lg" />
                  <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-56 h-56 bg-amber-400/15 rounded-full blur-[65px]" />
                </div>

                {/* Avatar Flanked with Golden Laurel Wreath */}
                <PodiumAvatar
                  logoUrl={topThree[0].logoUrl}
                  name={topThree[0].consultationName}
                  rank={1}
                />

                <Link
                  href={
                    topThree[0].consultationUsername
                      ? `/auto-consultant/${topThree[0].consultationUsername}`
                      : "#"
                  }
                  className="text-lg sm:text-xl lg:text-2xl font-semibold text-primary hover:text-fourth transition-colors line-clamp-1 relative z-10"
                >
                  {topThree[0].consultationName}
                </Link>

                {/* Tier Badge */}
                <div className="mt-2 relative z-10">
                  <span className="text-[11px] font-bold px-3.5 py-1 rounded-full bg-amber-400 text-black uppercase tracking-wider shadow-md shadow-amber-400/25">
                    {topThree[0].tierPlanTitle || "PREMIUM"}
                  </span>
                </div>

                {/* City with Blue Location Pin */}
                <div className="flex items-center gap-1.5 text-xs text-third mt-2.5 relative z-10">
                  <FiMapPin className="w-3.5 h-3.5 text-sky-400" />
                  <span className="font-medium text-primary/90">{topThree[0].cityName || "—"}</span>
                </div>

                {/* Frosted Glass Bottom Stats Container */}
                <div className="mt-5 sm:mt-6 w-full rounded-2xl bg-gradient-to-b from-amber-400/[0.10] to-white/[0.02] backdrop-blur-xl border border-amber-400/35 px-2 py-3 sm:px-3 sm:py-3.5 lg:px-4 lg:py-4 grid grid-cols-3 divide-x divide-white/10 text-center relative z-10 shadow-[inset_0_1px_1px_rgba(251,191,36,0.3),0_8px_24px_rgba(0,0,0,0.4)]">
                  <div className="px-0.5 sm:px-1 min-w-0 flex flex-col items-center justify-center">
                    <div className="text-sm sm:text-base lg:text-lg xl:text-xl font-bold text-amber-400 whitespace-nowrap tracking-tight">
                      {topThree[0].totalInquiries ?? 0}
                    </div>
                    <div className="text-[9px] sm:text-[10px] font-semibold text-third/75 mt-1 leading-tight truncate w-full">
                      Verified Inquiries
                    </div>
                  </div>
                  <div className="px-0.5 sm:px-1 min-w-0 flex flex-col items-center justify-center">
                    <div className="text-sm sm:text-base lg:text-lg xl:text-xl font-bold text-white whitespace-nowrap tracking-tight">
                      {topThree[0].activeListings ?? 0}
                    </div>
                    <div className="text-[9px] sm:text-[10px] font-semibold text-third/75 mt-1 leading-tight truncate w-full">
                      Active Listings
                    </div>
                  </div>
                  <div className="px-0.5 sm:px-1 min-w-0 flex flex-col items-center justify-center">
                    <div className="text-sm sm:text-base lg:text-lg xl:text-xl font-bold text-white whitespace-nowrap tracking-tight">
                      {formatResponseTime(topThree[0].avgResponseTimeMinutes)}
                    </div>
                    <div className="text-[9px] sm:text-[10px] font-semibold text-third/75 mt-1 leading-tight truncate w-full">
                      Avg Response
                    </div>
                  </div>
                </div>
              </div>

              {/* ── #3 Rank (Bronze - Right) ── */}
              <div className="order-3 md:order-3 rounded-3xl bg-gradient-to-b from-amber-700/[0.12] via-[#141824]/85 to-[#0b0e17]/95 backdrop-blur-2xl border-2 border-amber-600/80 p-4 sm:p-5 lg:p-6 flex flex-col items-center text-center relative shadow-[0_12px_40px_rgba(0,0,0,0.5),0_0_35px_rgba(217,119,6,0.18)]">
                {/* Top Glass Highlight */}
                <div className="absolute inset-x-8 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none z-10" />

                {/* Crown Badge on Top Border */}
                <PodiumCrown rank={3} />

                {/* Background Ambient Rays */}
                <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none">
                  <div className="absolute -top-10 -right-10 w-44 h-80 bg-gradient-to-b from-amber-600/10 via-transparent to-transparent -rotate-45 blur-lg" />
                  <div className="absolute top-20 -left-10 w-32 h-72 bg-gradient-to-b from-amber-600/10 via-transparent to-transparent -rotate-45 blur-lg" />
                  <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-48 h-48 bg-amber-600/10 rounded-full blur-[60px]" />
                </div>

                {/* Avatar Flanked with Bronze Laurel Wreath */}
                <PodiumAvatar
                  logoUrl={topThree[2].logoUrl}
                  name={topThree[2].consultationName}
                  rank={3}
                />

                <Link
                  href={
                    topThree[2].consultationUsername
                      ? `/auto-consultant/${topThree[2].consultationUsername}`
                      : "#"
                  }
                  className="text-base sm:text-lg lg:text-xl font-semibold text-primary hover:text-fourth transition-colors line-clamp-1 relative z-10"
                >
                  {topThree[2].consultationName}
                </Link>

                {/* Tier Badge */}
                <div className="mt-2 relative z-10">
                  <span className="text-[11px] font-bold px-3.5 py-1 rounded-full bg-amber-600 text-white uppercase tracking-wider shadow-md shadow-amber-600/20">
                    {topThree[2].tierPlanTitle || "BASIC"}
                  </span>
                </div>

                {/* City with Blue Location Pin */}
                <div className="flex items-center gap-1.5 text-xs text-third mt-2.5 relative z-10">
                  <FiMapPin className="w-3.5 h-3.5 text-sky-400" />
                  <span className="font-medium text-primary/90">{topThree[2].cityName || "—"}</span>
                </div>

                {/* Frosted Glass Bottom Stats Container */}
                <div className="mt-5 sm:mt-6 w-full rounded-2xl bg-gradient-to-b from-amber-600/[0.10] to-white/[0.02] backdrop-blur-xl border border-amber-600/35 px-2 py-3 sm:px-3 sm:py-3.5 lg:px-4 lg:py-4 grid grid-cols-3 divide-x divide-white/10 text-center relative z-10 shadow-[inset_0_1px_1px_rgba(245,158,11,0.25),0_8px_20px_rgba(0,0,0,0.35)]">
                  <div className="px-0.5 sm:px-1 min-w-0 flex flex-col items-center justify-center">
                    <div className="text-sm sm:text-base lg:text-lg xl:text-xl font-bold text-white whitespace-nowrap tracking-tight">
                      {topThree[2].totalInquiries ?? 0}
                    </div>
                    <div className="text-[9px] sm:text-[10px] font-semibold text-third/75 mt-1 leading-tight truncate w-full">
                      Verified Inquiries
                    </div>
                  </div>
                  <div className="px-0.5 sm:px-1 min-w-0 flex flex-col items-center justify-center">
                    <div className="text-sm sm:text-base lg:text-lg xl:text-xl font-bold text-white whitespace-nowrap tracking-tight">
                      {topThree[2].activeListings ?? 0}
                    </div>
                    <div className="text-[9px] sm:text-[10px] font-semibold text-third/75 mt-1 leading-tight truncate w-full">
                      Active Listings
                    </div>
                  </div>
                  <div className="px-0.5 sm:px-1 min-w-0 flex flex-col items-center justify-center">
                    <div className="text-sm sm:text-base lg:text-lg xl:text-xl font-bold text-white whitespace-nowrap tracking-tight">
                      {formatResponseTime(topThree[2].avgResponseTimeMinutes)}
                    </div>
                    <div className="text-[9px] sm:text-[10px] font-semibold text-third/75 mt-1 leading-tight truncate w-full">
                      Avg Response
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>
      )}

      {/* ── 4. CONSULTANT RANKINGS DYNAMIC TABLE ── */}
      <section id="rankings-table" className="container mb-16">
        <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-fourth/15 text-fourth flex items-center justify-center shrink-0">
              <FiBarChart2 className="w-4 h-4" />
            </div>
            <div>
              <h2 className=" text-xl sm:text-2xl font-semibold text-primary">
                Consultant Rankings
              </h2>
              <p className="text-xs text-third/70 mt-0.5">
                Verified activity for{" "}
                <span className="text-primary font-semibold">
                  {selectedCityId ? selectedCityName : "all cities"}
                </span>
                .
              </p>
            </div>
          </div>

        </div>

        <DynamicTable
          columns={columns}
          data={consultants}
          isLoading={isLoading || isFetching}
          minWidth="min-w-[840px]"
          emptyStateProps={{
            icon: FiAward,
            title: isError
              ? "Failed to load leaderboard data"
              : "No eligible data for this selection",
            subtitle: isError
              ? "There was an error communicating with the rankings server."
              : "Try switching cities or selecting This Month to view recent platform activity.",
            action: (
              <Button
                onClick={isError ? () => refetch() : resetFilters}
                variant="outline"
                size="sm"
              >
                {isError ? "Try Again" : "Reset Filters"}
              </Button>
            ),
          }}
          paginationProps={{
            currentPage,
            totalPages,
            totalElements,
            pageSize,
            onPageChange: (p) => setCurrentPage(p),
            onPageSizeChange: handlePageSizeChange,
          }}
        />
      </section>

      {/* ── 5. RANKING INSIGHTS (4 CARDS) ── */}
      <section className="container mb-16">
        <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-fourth/15 text-fourth flex items-center justify-center shrink-0">
              <FiTrendingUp className="w-4 h-4" />
            </div>
            <div>
              <h3 className=" text-lg sm:text-xl font-semibold text-primary">
                Ranking Insights
              </h3>
              <p className="text-xs text-third/70 mt-0.5">
                Key metrics that influence your leaderboard position.
              </p>
            </div>
          </div>

          <Link
            href="/consult/grow-your-business"
            className="inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-xl border border-white/10 hover:border-fourth/40 bg-white/5 hover:bg-white/10 text-primary transition-all cursor-pointer"
          >
            <span>Learn How Rankings Work</span>
            <FiArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1 */}
          <div className="p-5 rounded-2xl bg-[#0f121a]/95 border border-white/10 hover:border-fourth/40 transition-all flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-blue-400 mb-3.5 shrink-0">
                <FiMessageSquare className="w-5 h-5" />
              </div>
              <h4 className=" font-semibold text-sm text-primary mb-1">
                Verified Inquiries
              </h4>
              <p className="text-xs text-third/70 leading-relaxed">
                Genuine customer inquiries from verified buyers on the platform.
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="p-5 rounded-2xl bg-[#0f121a]/95 border border-white/10 hover:border-fourth/40 transition-all flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-3.5 shrink-0">
                <FiCheckCircle className="w-5 h-5" />
              </div>
              <h4 className=" font-semibold text-sm text-primary mb-1">
                Active Listings
              </h4>
              <p className="text-xs text-third/70 leading-relaxed">
                Maintain relevant, well-priced inventory that matches local buyer demand.
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="p-5 rounded-2xl bg-[#0f121a]/95 border border-white/10 hover:border-fourth/40 transition-all flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-3.5 shrink-0">
                <FiZap className="w-5 h-5" />
              </div>
              <h4 className=" font-semibold text-sm text-primary mb-1">
                Response Time
              </h4>
              <p className="text-xs text-third/70 leading-relaxed">
                How quickly you respond to buyer inquiries and follow up professionally.
              </p>
            </div>
          </div>

          {/* Card 4 */}
          <div className="p-5 rounded-2xl bg-[#0f121a]/95 border border-white/10 hover:border-fourth/40 transition-all flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-3.5 shrink-0">
                <FiStar className="w-5 h-5" />
              </div>
              <h4 className=" font-semibold text-sm text-primary mb-1">
                Account Tier
              </h4>
              <p className="text-xs text-third/70 leading-relaxed">
                Your membership tier and digital storefront visibility across Reecomm.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. BOTTOM CTA BANNER ("Want to be on the Leaderboard?") ── */}
      <section className="container mb-8">
        <div className="rounded-2xl bg-gradient-to-r from-fourth/15 via-[#0e1320] to-[#0a0d14] border border-fourth/30 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="flex flex-col sm:flex-row items-center text-center sm:text-left gap-4">
            <div className="w-12 h-12 rounded-2xl bg-fourth/20 border border-fourth/40 flex items-center justify-center text-fourth shrink-0 shadow-lg shadow-fourth/20">
              <FiTrendingUp className="w-6 h-6" />
            </div>
            <div>
              <h3 className=" text-lg sm:text-xl font-semibold text-primary">
                Want to be on the Leaderboard?
              </h3>
              <p className="text-xs sm:text-sm text-third/80 mt-1 leading-relaxed">
                Complete your profile, respond to inquiries quickly and provide the best service to rank higher.
              </p>
            </div>
          </div>

          <div className="flex-shrink-0 w-full sm:w-auto">
            <Link
              href="/become-consultant"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-fourth hover:bg-fourth/90 active:scale-[0.98] text-white font-semibold text-sm rounded-xl shadow-lg shadow-fourth/30 transition-all cursor-pointer"
            >
              <span>Join as Consultant</span>
              <FiArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
