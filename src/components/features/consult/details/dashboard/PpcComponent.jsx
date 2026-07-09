/* eslint-disable react-hooks/set-state-in-effect */

"use client";

import { useState, useCallback, useEffect } from "react";
import {
  TrendingUp,
  MousePointerClick,
  Eye,
  Plus,
  X,
  ChevronDown,
  CheckCircle,
  Lock,
} from "lucide-react";
import { getSellerTierTitle } from "@/lib/helper";
import Button from "@/components/ui/button";
import CustomSelect from "@/components/ui/custom-select";
import Image from "next/image";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useRouter } from "next/navigation";
import StatCard from "./components/StateCard";
import ResultsModal from "./components/ResultsModal";
import UpgradeTierPopup from "./components/UpgradeTierPopup";
import {
  getAllDraftCampions,
  getAllCampaigns,
  changeCampaignStatus,
  getDashboardSummary,
  getDashboardPerformance,
} from "@/services/ppc.service";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

// --- Mock Data ---
const mockAudienceData = [
  { day: "M", value: 450, color: "#7cb5ff" },
  { day: "T", value: 650, color: "#4da6ff" },
  { day: "W", value: 520, color: "#7cb5ff" },
  { day: "T", value: 750, color: "#007bff" },
  { day: "F", value: 850, color: "#0062cc" },
  { day: "S", value: 980, color: "#004b9b" },
  { day: "S", value: 800, color: "#0062cc" },
];

export default function PpcComponent() {
  const [range, setRange] = useState("30");
  const [openCustomize, setOpenCustomize] = useState(false);
  const [tier, setTier] = useState(null);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  useEffect(() => {
    const currentTier = getSellerTierTitle() || "BASIC";
    setTier(currentTier);
    if (currentTier === "BASIC") {
      setShowUpgradeModal(true);
    }
  }, []);

  // State for the new "View Results" modal
  const [showResults, setShowResults] = useState(false);
  const [selectedAd, setSelectedAd] = useState(null);

  // Status toggle handler
  const [toggledStatuses, setToggledStatuses] = useState({});

  const handleToggleAd = async (id, currentStatus) => {
    const current = toggledStatuses[id] || currentStatus;
    const next =
      current === "Active" || current === "In Review" || current === "Completed"
        ? "Paused"
        : "Active";

    const apiStatus = next === "Active" ? "ACTIVE" : "PAUSED";

    // Optimistically update the UI status
    setToggledStatuses((prev) => ({ ...prev, [id]: next }));

    try {
      await changeCampaignStatus(id, apiStatus);
      toast.success(
        next === "Active"
          ? "Campaign activated successfully"
          : "Campaign paused successfully",
      );
    } catch (error) {
      console.error("Failed to change campaign status:", error);
      // Revert the status on error
      setToggledStatuses((prev) => ({ ...prev, [id]: current }));
      toast.error("Failed to update campaign status");
    }
  };

  // States for Recent Ads filtering
  const [activeFilter, setActiveFilter] = useState("All");
  const [drafts, setDrafts] = useState([]);
  const [isLoadingDrafts, setIsLoadingDrafts] = useState(false);

  useEffect(() => {
    if (activeFilter === "Draft") {
      setIsLoadingDrafts(true);
      getAllDraftCampions()
        .then((res) => {
          const dataList = Array.isArray(res)
            ? res
            : Array.isArray(res?.data)
              ? res.data
              : Array.isArray(res?.data?.data)
                ? res.data.data
                : res?.data
                  ? [res.data]
                  : [];
          setDrafts(dataList);
        })
        .catch((err) => {
          console.error("Failed to fetch drafts:", err);
          setDrafts([]);
        })
        .finally(() => {
          setIsLoadingDrafts(false);
        });
    }
  }, [activeFilter]);

  const mappedDrafts = drafts.map((d) => ({
    id: d.campaignId || d.id,
    title: d.name || "Untitled Draft",
    placement:
      d.placementTypes && d.placementTypes.length > 0
        ? d.placementTypes
            .map((p) => p.toLowerCase().replace(/_/g, " "))
            .join(", ")
        : "No placements selected",
    model: d.billingType || "—",
    rate: d.bidAmount ? `₹${d.bidAmount}` : "—",
    spent: "₹0",
    budget: d.dailyBudget ? `₹${d.dailyBudget}/day` : "—",
    impressions: "—",
    clicksValue: "—",
    clicksLabel: d.billingType === "CPI" ? "Inquiries" : "Clicks",
    ctrValue: "—",
    ctrLabel: d.billingType === "CPI" ? "INQ rate" : "CTR",
    status: "Draft",
    isDraft: true,
  }));

  // 1. Fetch campaigns using useInfiniteQuery
  const {
    data: campaignsInfiniteData,
    isFetching: campaignsLoading,
    fetchNextPage: fetchNextCampaignsPage,
    hasNextPage: hasNextCampaignsPage,
  } = useInfiniteQuery({
    queryKey: ["campaigns-infinite", range],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await getAllCampaigns({
        pageNo: pageParam,
        pageSize: 10,
        daysRange: `LAST_${range}_DAYS`,
      });
      return res;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const pagination = lastPage?.pageResponse || lastPage?.data?.pageResponse || lastPage?.pagination;
      const totalPages = pagination?.totalPages || 1;
      const currentPage = pagination?.currentPage || 1;
      return currentPage < totalPages ? currentPage + 1 : undefined;
    },
  });

  // Fetch Summary
  const { data: summaryData } = useQuery({
    queryKey: ["dashboard-summary", range],
    queryFn: async () => {
      const res = await getDashboardSummary(`LAST_${range}_DAYS`);
      return res?.data || {};
    },
  });

  // Fetch Performance
  const { data: performanceData } = useQuery({
    queryKey: ["dashboard-performance", range],
    queryFn: async () => {
      const res = await getDashboardPerformance(`LAST_${range}_DAYS`);
      return res?.data || {};
    },
  });

  const finalAudienceData =
    performanceData?.dailyMetrics?.length > 0
      ? performanceData.dailyMetrics.map((d) => ({
          day: new Date(d.date)
            .toLocaleDateString("en-US", { weekday: "short" })
            .charAt(0),
          value: d.impressions || 0,
          color: "#7cb5ff",
        }))
      : mockAudienceData;

  const campaigns =
    campaignsInfiniteData?.pages?.flatMap((page) => page?.data || []) || [];

  const mappedCampaigns = campaigns.map((c) => {
    // Map placementTypes list to friendly readable string
    const placementStr =
      c.placementTypes && c.placementTypes.length > 0
        ? c.placementTypes
            .map((p) => {
              const lower = p.toLowerCase().replace(/_/g, " ");
              return lower.replace(/\b\w/g, (char) => char.toUpperCase());
            })
            .join(", ")
        : "No placements";

    // Rate format
    const rateVal = c.bidAmount
      ? `₹${c.bidAmount}/${c.billingType === "CPI" ? "inquiry" : "click"}`
      : "—";

    // Status mapping
    let statusText = c.status;
    if (c.status === "ACTIVE" || c.adStatus === "ACTIVE") {
      statusText = "Active";
    } else if (c.status === "INREVIEW" || c.ppcStatus === "INREVIEW") {
      statusText = "In Review";
    } else if (c.status === "DRAFT" || c.ppcStatus === "DRAFT") {
      statusText = "Draft";
    } else if (c.status === "COMPLETED") {
      statusText = "Completed";
    } else if (c.status === "PAUSED") {
      statusText = "Paused";
    } else {
      statusText = c.status
        ? c.status.charAt(0).toUpperCase() + c.status.slice(1).toLowerCase()
        : "Unknown";
    }

    const campId = c.campaignId || c.id;
    if (toggledStatuses[campId]) {
      statusText = toggledStatuses[campId];
    }

    return {
      id: c.campaignId || c.id,
      title: c.name || "Untitled Campaign",
      placement: placementStr,
      model: c.billingType || "—",
      rate: rateVal,
      spent: c.spentAmount !== undefined ? `₹${c.spentAmount}` : "₹0",
      budget: c.dailyBudget ? `₹${c.dailyBudget}/day` : "—",
      impressions: c.impressionsCount !== undefined ? c.impressionsCount : "0",
      clicksValue: c.clicksCount !== undefined ? c.clicksCount : "0",
      clicksLabel: c.billingType === "CPI" ? "Inquiries" : "Clicks",
      ctrValue: c.ctr !== undefined ? `${c.ctr}%` : "0%",
      ctrLabel: c.billingType === "CPI" ? "INQ rate" : "CTR",
      status: statusText,
      isDraft: c.status === "DRAFT" || c.ppcStatus === "DRAFT",
    };
  });

  const filteredAds = mappedCampaigns.filter((ad) => {
    if (activeFilter === "All") return true;
    if (activeFilter === "CPC" || activeFilter === "CPI") {
      return ad.model === activeFilter;
    }
    return ad.placement.toLowerCase().includes(activeFilter.toLowerCase());
  });

  const displayAds = activeFilter === "Draft" ? mappedDrafts : filteredAds;

  // Animated close for Customize modal (mirrors LoginPopup pattern)
  const [isClosingCustomize, setIsClosingCustomize] = useState(false);
  const triggerCloseCustomize = useCallback(() => {
    setIsClosingCustomize(true);
    setTimeout(() => {
      setIsClosingCustomize(false);
      setOpenCustomize(false);
    }, 250);
  }, []);

  // Animated close for Results modal (mirrors LoginPopup pattern)
  const [isClosingResults, setIsClosingResults] = useState(false);
  const triggerCloseResults = useCallback(() => {
    setIsClosingResults(true);
    setTimeout(() => {
      setIsClosingResults(false);
      setShowResults(false);
    }, 250);
  }, []);

  const [metrics, setMetrics] = useState({
    views: true,
    viewers: true,
    impressions: false,
    clicks: true,
    leads: false,
    messages: false,
    pageEngagements: false,
    postEngagements: true,
    likes: false,
    comments: false,
    shares: false,
    videos: false,
  });

  const { push } = useRouter();

  const handleClick = () => {
    push("/consult/dashboard/ads/create");
  };

  const rangeOptions = [
    { label: "Last 7 days", value: "7" },
    { label: "Last 30 days", value: "30" },
    { label: "Last 90 days", value: "90" },
  ];

  const toggleMetric = (key) =>
    setMetrics((prev) => ({ ...prev, [key]: !prev[key] }));

  if (tier === "BASIC") {
    return (
      <section className="w-full space-y-8 relative">
        {/* HEADER */}
        <div className="flex flex-col lg:flex-row items-start gap-5 justify-between">
          <div>
            <h1 className="text-2xl font-bold">PPC & Visibility Boosts</h1>
            <p className="text-third text-sm">Dominance with guardrails</p>
          </div>
          <Button
            size="sm"
            variant="outlineSecondary"
            disabled
            className="opacity-60 cursor-not-allowed flex items-center gap-1.5 border-third/30 text-third"
          >
            <Lock size={14} className="mr-2" /> Create New Boost (Premium)
          </Button>
        </div>

        {/* Beautiful lock screen */}
        <div className="flex flex-col items-center justify-center text-center p-12 py-20 space-y-6 max-w-2xl mx-auto relative">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20 shadow-[0_0_15px_rgba(var(--color-primary),0.1)]">
            <Lock size={24} className="animate-pulse" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-primary">
              Unlock PPC & Visibility Boosts
            </h2>
            <p className="text-sm text-third max-w-md mx-auto leading-relaxed">
              Visibility boost campaigns, PPC ads, and advanced metrics are
              exclusive features for Pro and Premium tier consultants.
            </p>
          </div>

          <div className="pt-4">
            <Button
              variant="ghost"
              size="md"
              href="/consult/subscription"
              className="px-8 py-3 font-semibold tracking-wide cursor-pointer flex items-center gap-2"
            >
              Upgrade Your Plan
            </Button>
          </div>
        </div>

        {/* UPGRADE PLAN POPUP FOR BASIC TIER */}
        <UpgradeTierPopup isOpen={showUpgradeModal} />
      </section>
    );
  }

  return (
    <section className="w-full space-y-8 relative">
      {/* HEADER */}
      <div className="flex flex-col lg:flex-row items-start gap-5 justify-between">
        <div>
          <h1 className="text-2xl font-bold">PPC & Visibility Boosts</h1>
          <p className="text-third text-sm">Dominance with guardrails</p>
        </div>
        {tier === "BASIC" ? (
          <Button
            size="sm"
            variant="outlineSecondary"
            disabled
            className="opacity-60 cursor-not-allowed flex items-center gap-1.5 border-third/30 text-third "
          >
            <Lock size={14} className="mr-2" /> Create New Boost (Premium)
          </Button>
        ) : (
          <Button onClick={handleClick} size="sm" variant="ghost">
            <Plus size={16} /> Create New Boost
          </Button>
        )}
      </div>

      {/* AD SUMMARY */}
      <div className="rounded-xl bg-primary/5 p-6 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          {/* Left Section */}
          <div>
            <h3 className="font-semibold">Advertising Summary</h3>
            <p className="text-xs text-third">
              ₹{summaryData?.totalSpent ?? 0} spent on {summaryData?.totalAdsInRange ?? 0} ads in the last {range} days
            </p>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-2 w-full sm:w-72">
            {/* Dropdown takes full width on mobile */}
            <div className="flex-1">
              <CustomSelect
                value={range}
                onChange={setRange}
                options={rangeOptions}
                placeholder="Select range"
                variant="transparent"
              />
            </div>

            {/* Filter Button (square, not rounded) */}
            {/* <Button
              variant="ghost"
              size="icon"
              className="h-10 w-12 shrink-0 rounded-md"
              onClick={() => setOpenCustomize(true)}
            >
              <SlidersHorizontal size={16} />
            </Button> */}
          </div>
        </div>

        {/* METRICS */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          <StatCard
            icon={<TrendingUp size={20} />}
            label="Active Campaigns"
            value={summaryData?.activeCampaigns ?? 0}
          />
          <StatCard icon={<Eye size={20} />} label="Spent Today" value={`₹${summaryData?.speedToday ?? 0}`} />
          <StatCard
            icon={<MousePointerClick size={20} />}
            label="Total Clicks"
            value={summaryData?.totalClicks ?? 0}
          />
          <StatCard
            icon={<CheckCircle size={20} />}
            label="Avg.CPC"
            value={`₹${summaryData?.avgCpc ?? 0}`}
          />
        </div>
      </div>

      {/* RECENT ADS */}
      <div className="rounded-xl bg-primary/5 p-6 space-y-6">
        {/* Filter Controls Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/5 pb-4">
          <h3 className="font-semibold text-lg text-white">Recent ads</h3>

          <div className="flex gap-2 overflow-x-auto whitespace-nowrap scrollbar-hide max-w-full md:max-w-2xl py-1">
            {[
              "All",
              "Homepage",
              "Search result",
              "Consultant page",
              "CPC",
              "CPI",
              "Draft",
            ].map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-4 py-2 cursor-pointer rounded-full text-xs font-semibold border transition shrink-0 ${
                  activeFilter === f
                    ? "bg-primary text-secondary border-primary"
                    : "border-third/50 text-primary hover:bg-primary/10"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Recent Ads List Table */}
        <div className="space-y-4">
          {isLoadingDrafts ||
          (activeFilter !== "Draft" &&
            campaignsLoading &&
            campaigns.length === 0) ? (
            <>
              {/* Desktop Table Skeleton */}
              <div className="hidden md:block overflow-x-auto border border-white/10 rounded-2xl bg-secondary/30 backdrop-blur-sm">
                <table className="w-full text-left border-collapse text-sm">
                  <thead>
                    <tr className="border-b border-white/10 text-third font-medium">
                      <th className="p-4 w-12 text-center"></th>
                      <th className="p-4 text-xs tracking-wider uppercase">
                        Campaign
                      </th>
                      <th className="p-4 text-xs tracking-wider uppercase">
                        Placement
                      </th>
                      <th className="p-4 text-xs tracking-wider uppercase">
                        Status
                      </th>
                      <th className="p-4 text-xs tracking-wider uppercase">
                        Billing
                      </th>
                      <th className="p-4 text-xs tracking-wider uppercase">
                        Budget
                      </th>
                      <th className="p-4 text-xs tracking-wider uppercase text-center">
                        Impressions
                      </th>
                      <th className="p-4 text-xs tracking-wider uppercase text-center">
                        Results
                      </th>
                      <th className="p-4 text-xs tracking-wider uppercase text-center">
                        CTR
                      </th>
                      <th className="p-4 text-xs tracking-wider uppercase text-right">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <tr
                        key={idx}
                        className="border-b border-white/5 last:border-0 animate-pulse"
                      >
                        {/* Toggle switch skeleton */}
                        <td className="p-4 w-12 text-center">
                          <div className="inline-block h-5 w-9 rounded-full bg-zinc-800" />
                        </td>
                        {/* Title skeleton */}
                        <td className="p-4">
                          <div className="h-4 bg-zinc-800 rounded-md w-36 animate-pulse" />
                        </td>
                        {/* Placement skeleton */}
                        <td className="p-4">
                          <div className="flex gap-2">
                            <div className="h-3.5 bg-zinc-800 rounded-full w-16" />
                            <div className="h-3.5 bg-zinc-800 rounded-full w-12" />
                          </div>
                        </td>
                        {/* Status badge skeleton */}
                        <td className="p-4">
                          <div className="h-6 bg-zinc-800 rounded-md w-16" />
                        </td>
                        {/* Billing model and rate skeleton */}
                        <td className="p-4">
                          <div className="space-y-1.5">
                            <div className="h-3.5 bg-zinc-800 rounded-md w-10" />
                            <div className="h-3 bg-zinc-800/60 rounded-md w-14" />
                          </div>
                        </td>
                        {/* Budget skeleton */}
                        <td className="p-4">
                          <div className="space-y-1.5">
                            <div className="h-3.5 bg-zinc-800 rounded-md w-16" />
                            <div className="h-3 bg-zinc-800/60 rounded-md w-12" />
                          </div>
                        </td>
                        {/* Impressions skeleton */}
                        <td className="p-4 text-center">
                          <div className="inline-block h-3.5 bg-zinc-800 rounded-md w-8" />
                        </td>
                        {/* Results skeleton */}
                        <td className="p-4 text-center">
                          <div className="space-y-1.5 inline-block">
                            <div className="h-3.5 bg-zinc-800 rounded-md w-6 mx-auto" />
                            <div className="h-2.5 bg-zinc-800/60 rounded-md w-8 mx-auto" />
                          </div>
                        </td>
                        {/* CTR skeleton */}
                        <td className="p-4 text-center">
                          <div className="space-y-1.5 inline-block">
                            <div className="h-3.5 bg-zinc-800 rounded-md w-8 mx-auto" />
                            <div className="h-2.5 bg-zinc-800/60 rounded-md w-6 mx-auto" />
                          </div>
                        </td>
                        {/* Action skeleton */}
                        <td className="p-4 text-right">
                          <div className="inline-block h-6 bg-zinc-800 rounded-md w-16" />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Card Grid Skeleton */}
              <div className="grid grid-cols-1 gap-4 md:hidden">
                {Array.from({ length: 3 }).map((_, idx) => (
                  <div
                    key={idx}
                    className="bg-primary/5 border border-third/15 rounded-xl p-4 space-y-4 animate-pulse"
                  >
                    <div className="flex justify-between items-start gap-2">
                      <div className="space-y-2 flex-1">
                        {/* Title */}
                        <div className="h-4 bg-zinc-800 rounded-md w-3/4 animate-pulse" />
                        {/* Placements */}
                        <div className="flex gap-2">
                          <div className="h-3 bg-zinc-800 rounded-full w-14 animate-pulse" />
                          <div className="h-3 bg-zinc-800 rounded-full w-16 animate-pulse" />
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-5 w-9 rounded-full bg-zinc-800 animate-pulse" />
                        <div className="h-5 w-14 rounded-md bg-zinc-800 animate-pulse" />
                      </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-3 gap-2 bg-white/2 rounded-lg p-2.5 text-center">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="space-y-1.5">
                          <div className="h-2.5 bg-zinc-800/60 rounded-md w-12 mx-auto animate-pulse" />
                          <div className="h-3.5 bg-zinc-800 rounded-md w-8 mx-auto animate-pulse" />
                        </div>
                      ))}
                    </div>

                    {/* Footer Details */}
                    <div className="flex justify-between items-center pt-2 border-t border-white/5">
                      <div className="flex items-center gap-1.5">
                        <div className="h-3 bg-zinc-800 rounded-md w-8 animate-pulse" />
                        <div className="h-3 bg-zinc-800/60 rounded-md w-10 animate-pulse" />
                      </div>
                      <div className="flex items-center gap-1.5">
                        <div className="h-3 bg-zinc-800 rounded-md w-12 animate-pulse" />
                        <div className="h-3 bg-zinc-800/60 rounded-md w-10 animate-pulse" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : displayAds.length > 0 ? (
            <>
              {/* Desktop Table View */}
              <div className="hidden md:block overflow-x-auto border border-white/10 rounded-2xl bg-secondary/30 backdrop-blur-sm">
                <table className="w-full text-left border-collapse text-sm">
                  <thead>
                    <tr className="border-b border-white/10 text-third font-medium">
                      <th className="p-4 w-12 text-center"></th>
                      <th className="p-4 text-xs tracking-wider uppercase">
                        Campaign
                      </th>
                      <th className="p-4 text-xs tracking-wider uppercase">
                        Placement
                      </th>
                      <th className="p-4 text-xs tracking-wider uppercase">
                        Status
                      </th>
                      <th className="p-4 text-xs tracking-wider uppercase">
                        Billing
                      </th>
                      <th className="p-4 text-xs tracking-wider uppercase">
                        Budget
                      </th>
                      <th className="p-4 text-xs tracking-wider uppercase text-center">
                        Impressions
                      </th>
                      <th className="p-4 text-xs tracking-wider uppercase text-center">
                        Results
                      </th>
                      <th className="p-4 text-xs tracking-wider uppercase text-center">
                        CTR
                      </th>
                      <th className="p-4 text-xs tracking-wider uppercase text-right">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {displayAds.map((ad) => {
                      const isPaused = ad.status === "Paused";
                      const isActive =
                        ad.status === "Active" ||
                        ad.status === "In Review" ||
                        ad.status === "Completed";

                      // Custom colors for status badge
                      let statusClass =
                        "bg-zinc-500/10 text-zinc-300 border border-zinc-500/20";
                      if (ad.status === "Active") {
                        statusClass =
                          "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20";
                      } else if (ad.status === "Paused") {
                        statusClass =
                          "bg-amber-500/10 text-amber-400 border border-amber-500/20";
                      } else if (ad.status === "Draft") {
                        statusClass =
                          "bg-yellow-500/10 text-yellow-500 border border-yellow-500/20";
                      } else if (ad.status === "In Review") {
                        statusClass =
                          "bg-blue-500/10 text-blue-400 border border-blue-500/20";
                      }

                      // Check title
                      const displayTitle =
                        typeof ad.placement === "string" &&
                        ad.placement.toLowerCase().includes("consultant page")
                          ? "Adarsh Auto Consultant"
                          : ad.title;

                      const placements =
                        typeof ad.placement === "string"
                          ? ad.placement
                              .split(",")
                              .map((p) => p.trim())
                              .filter(Boolean)
                          : [];

                      return (
                        <tr
                          key={ad.id}
                          onClick={() => {
                            if (ad.isDraft) return;
                            setSelectedAd(ad);
                            setShowResults(true);
                          }}
                          className="transition-colors hover:bg-white/5 cursor-pointer"
                        >
                          {/* Toggle Switch */}
                          <td
                            className="p-4 text-center w-12"
                            onClick={(e) => e.stopPropagation()}
                          >
                            {!ad.isDraft && (
                              <button
                                onClick={() => handleToggleAd(ad.id, ad.status)}
                                className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-hidden ${
                                  ad.status === "Active"
                                    ? "bg-primary"
                                    : "bg-zinc-700"
                                }`}
                              >
                                <span
                                  className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-secondary shadow-lg ring-0 transition duration-200 ease-in-out ${
                                    ad.status === "Active"
                                      ? "translate-x-4"
                                      : "translate-x-0"
                                  }`}
                                />
                              </button>
                            )}
                          </td>

                          {/* Campaign */}
                          <td className="p-4">
                            <h4 className="font-semibold text-sm sm:text-base text-white leading-tight">
                              {displayTitle}
                            </h4>
                          </td>

                          {/* Placement column */}
                          <td className="p-4">
                            <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-hide py-0.5 whitespace-nowrap max-w-40 sm:max-w-[220px] md:max-w-[260px] lg:max-w-[320px]">
                              {placements.map((p, idx) => {
                                let tagClass = "text-blue-400";
                                if (p.toLowerCase().includes("search")) {
                                  tagClass = "text-emerald-400";
                                } else if (
                                  p.toLowerCase().includes("consult") ||
                                  p.toLowerCase().includes("detail") ||
                                  p.toLowerCase().includes("vehicle")
                                ) {
                                  tagClass = "text-amber-400";
                                }
                                return (
                                  <div key={idx} className="flex items-center">
                                    {idx > 0 && (
                                      <span className="text-zinc-600 mx-1.5">
                                        •
                                      </span>
                                    )}
                                    <span
                                      className={`text-[10px] font-semibold inline-block shrink-0 ${tagClass}`}
                                    >
                                      {p}
                                    </span>
                                  </div>
                                );
                              })}
                            </div>
                          </td>

                          {/* Status column */}
                          <td className="p-4 whitespace-nowrap">
                            <span
                              className={`px-2.5 py-1 rounded text-xs font-semibold inline-block whitespace-nowrap ${statusClass}`}
                            >
                              {ad.status}
                            </span>
                          </td>

                          {/* Billing */}
                          <td className="p-4 whitespace-nowrap">
                            <div className="space-y-0.5">
                              <span className="text-sm font-bold text-white block">
                                {ad.model}
                              </span>
                              <span className="text-xs text-zinc-400 block font-medium">
                                {ad.rate}
                              </span>
                            </div>
                          </td>

                          {/* Budget & Spent */}
                          <td className="p-4 whitespace-nowrap">
                            <div className="space-y-0.5">
                              <span className="text-sm font-bold text-white block">
                                {ad.budget}
                              </span>
                              <span className="text-xs text-zinc-400 block font-medium">
                                {ad.spent} spent
                              </span>
                            </div>
                          </td>

                          {/* Impressions */}
                          <td className="p-4 text-center">
                            <span className="text-sm font-bold text-white">
                              {ad.impressions}
                            </span>
                          </td>

                          {/* Results */}
                          <td className="p-4 text-center">
                            <div className="space-y-0.5">
                              <span className="text-sm font-bold text-white block">
                                {ad.clicksValue}
                              </span>
                              <span className="text-[10px] text-zinc-500 block font-medium">
                                {ad.clicksLabel}
                              </span>
                            </div>
                          </td>

                          {/* CTR */}
                          <td className="p-4 text-center">
                            <div className="space-y-0.5">
                              <span className="text-sm font-bold text-white block">
                                {ad.ctrValue}
                              </span>
                              <span className="text-[10px] text-zinc-500 block font-medium">
                                {ad.ctrLabel}
                              </span>
                            </div>
                          </td>

                          {/* Action Column */}
                          <td className="p-4 text-right whitespace-nowrap">
                            <div className="flex items-center justify-end">
                              {ad.isDraft ? (
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    push(
                                      `/consult/dashboard/ads/create?campaignId=${ad.id}`,
                                    );
                                  }}
                                  className="px-3 py-1 bg-fourth hover:bg-fourth/80 text-white rounded text-xs font-semibold cursor-pointer transition-colors"
                                >
                                  Complete
                                </button>
                              ) : ad.status === "Paused" ? (
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    push(
                                      `/consult/dashboard/ads/create?campaignId=${ad.id}`,
                                    );
                                  }}
                                  className="px-3 py-1 bg-fourth hover:bg-fourth/80 text-white rounded text-xs font-semibold cursor-pointer transition-colors"
                                >
                                  Edit
                                </button>
                              ) : (
                                <span className="text-zinc-500 text-xs">—</span>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Mobile Card Grid View */}
              <div className="grid grid-cols-1 gap-4 md:hidden">
                {displayAds.map((ad) => {
                  const isPaused = ad.status === "Paused";
                  const isActive =
                    ad.status === "Active" ||
                    ad.status === "In Review" ||
                    ad.status === "Completed";

                  let statusClass =
                    "bg-zinc-500/10 text-zinc-300 border border-zinc-500/20";
                  if (ad.status === "Active") {
                    statusClass =
                      "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20";
                  } else if (ad.status === "Paused") {
                    statusClass =
                      "bg-amber-500/10 text-amber-400 border border-amber-500/20";
                  } else if (ad.status === "Draft") {
                    statusClass =
                      "bg-yellow-500/10 text-yellow-500 border border-yellow-500/20";
                  } else if (ad.status === "In Review") {
                    statusClass =
                      "bg-blue-500/10 text-blue-400 border border-blue-500/20";
                  }

                  const displayTitle =
                    typeof ad.placement === "string" &&
                    ad.placement.toLowerCase().includes("consultant page")
                      ? "Adarsh Auto Consultant"
                      : ad.title;

                  const placements =
                    typeof ad.placement === "string"
                      ? ad.placement
                          .split(",")
                          .map((p) => p.trim())
                          .filter(Boolean)
                      : [];

                  return (
                    <div
                      key={ad.id}
                      onClick={() => {
                        if (ad.isDraft) return;
                        setSelectedAd(ad);
                        setShowResults(true);
                      }}
                      className="bg-primary/5 border border-third/15 rounded-xl p-4 space-y-4 hover:border-fourth/40 active:bg-primary/10 transition-all cursor-pointer"
                    >
                      <div className="flex justify-between items-start gap-2">
                        <div className="space-y-1 flex-1">
                          <h4 className="font-semibold text-sm text-white line-clamp-2 leading-tight">
                            {displayTitle}
                          </h4>
                          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-hide py-0.5 whitespace-nowrap max-w-[200px]">
                            {placements.map((p, idx) => {
                              let tagClass = "text-blue-400";
                              if (p.toLowerCase().includes("search")) {
                                tagClass = "text-emerald-400";
                              } else if (
                                p.toLowerCase().includes("consult") ||
                                p.toLowerCase().includes("detail") ||
                                p.toLowerCase().includes("vehicle")
                              ) {
                                tagClass = "text-amber-400";
                              }
                              return (
                                <div key={idx} className="flex items-center">
                                  {idx > 0 && (
                                    <span className="text-zinc-600 mx-1">
                                      •
                                    </span>
                                  )}
                                  <span
                                    className={`text-[9px] font-semibold inline-block shrink-0 ${tagClass}`}
                                  >
                                    {p}
                                  </span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                        <div
                          className="shrink-0 flex items-center gap-2"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {!ad.isDraft && (
                            <button
                              onClick={() => handleToggleAd(ad.id, ad.status)}
                              className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-hidden ${
                                ad.status === "Active"
                                  ? "bg-primary"
                                  : "bg-zinc-700"
                              }`}
                            >
                              <span
                                className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-secondary shadow-lg ring-0 transition duration-200 ease-in-out ${
                                  ad.status === "Active"
                                    ? "translate-x-4"
                                    : "translate-x-0"
                                }`}
                              />
                            </button>
                          )}
                          {ad.isDraft ? (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                push(
                                  `/consult/dashboard/ads/create?campaignId=${ad.id}`,
                                );
                              }}
                              className="px-2.5 py-0.5 bg-fourth hover:bg-fourth/80 text-white rounded text-xs font-semibold cursor-pointer transition-colors"
                            >
                              Complete
                            </button>
                          ) : (
                            <div className="flex items-center gap-2">
                              <span
                                className={`px-2 py-0.5 rounded text-[10px] font-semibold ${statusClass}`}
                              >
                                {ad.status}
                              </span>
                              {ad.status === "Paused" && (
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    push(
                                      `/consult/dashboard/ads/create?campaignId=${ad.id}`,
                                    );
                                  }}
                                  className="px-2.5 py-0.5 bg-fourth hover:bg-fourth/80 text-white rounded text-[10px] font-semibold cursor-pointer transition-colors"
                                >
                                  Edit
                                </button>
                              )}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Stats Grid */}
                      <div className="grid grid-cols-3 gap-2 bg-white/2 rounded-lg p-2.5 text-center text-xs">
                        <div>
                          <span className="text-zinc-500 block text-[10px] uppercase tracking-wider font-semibold">
                            Impressions
                          </span>
                          <span className="text-white font-bold mt-0.5 block">
                            {ad.impressions}
                          </span>
                        </div>
                        <div>
                          <span className="text-zinc-500 block text-[10px] uppercase tracking-wider font-semibold">
                            {ad.clicksLabel}
                          </span>
                          <span className="text-white font-bold mt-0.5 block">
                            {ad.clicksValue}
                          </span>
                        </div>
                        <div>
                          <span className="text-zinc-500 block text-[10px] uppercase tracking-wider font-semibold">
                            {ad.ctrLabel}
                          </span>
                          <span className="text-white font-bold mt-0.5 block">
                            {ad.ctrValue}
                          </span>
                        </div>
                      </div>

                      {/* Footer Details */}
                      <div className="flex justify-between items-center text-xs text-zinc-400 pt-2 border-t border-white/5">
                        <div>
                          <span className="font-semibold text-white">
                            {ad.model}
                          </span>
                          <span className="mx-1.5">·</span>
                          <span>{ad.rate}</span>
                        </div>
                        <div className="text-right">
                          <span className="text-white font-bold">
                            {ad.budget}
                          </span>
                          <span className="mx-1.5">·</span>
                          <span>{ad.spent} spent</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          ) : (
            <div className="py-8 text-center text-zinc-500 text-sm">
              No recent ads match your filter criteria.
            </div>
          )}
        </div>

        {activeFilter !== "Draft" && hasNextCampaignsPage && (
          <div className="flex justify-end mt-4">
            <Button
              variant="outline"
              onClick={() => fetchNextCampaignsPage()}
              disabled={campaignsLoading}
              className="px-6 py-2 rounded-full text-sm font-semibold shadow-md cursor-pointer"
            >
              {campaignsLoading ? "Loading..." : "Load More"}
            </Button>
          </div>
        )}
      </div>

      {/* UNIFIED CAMPAIGN INSIGHTS & RECOMMENDATIONS */}
      <div className="rounded-xl bg-primary/5 p-6 lg:p-8 space-y-8  backdrop-blur-sm shadow-sm transition-colors duration-200">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT SIDE: Campaign Performance & Daily Impressions */}
          <div className="lg:col-span-7 space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-lg sm:text-xl text-white">
                Campaign performance
              </h3>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/10 text-xs sm:text-sm hover:bg-white/5 cursor-pointer transition-colors text-zinc-300">
                Last 7 days <ChevronDown size={14} />
              </div>
            </div>

            {/* Grid of 6 Metrics */}
            <div className="grid grid-cols-3 gap-6 pt-2">
              {/* Total impressions */}
              <div className="space-y-1">
                <span className="text-[11px] sm:text-xs text-zinc-400 block font-medium">
                  Total impressions
                </span>
                <span className="text-xl sm:text-2xl font-bold text-white block">
                  {performanceData?.totalImpressions?.toLocaleString() ?? 0}
                </span>
                {performanceData?.impressionsChangePercent !== undefined && (
                  <span className={`text-[10px] sm:text-xs block font-medium ${performanceData.impressionsChangePercent >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {performanceData.impressionsChangePercent >= 0 ? '↑' : '↓'} {Math.abs(performanceData.impressionsChangePercent)}% vs last week
                  </span>
                )}
              </div>

              {/* Total clicks */}
              <div className="space-y-1">
                <span className="text-[11px] sm:text-xs text-zinc-400 block font-medium">
                  Total clicks
                </span>
                <span className="text-xl sm:text-2xl font-bold text-white block">
                  {performanceData?.totalClicks?.toLocaleString() ?? 0}
                </span>
                {performanceData?.clicksChangePercent !== undefined && (
                  <span className={`text-[10px] sm:text-xs block font-medium ${performanceData.clicksChangePercent >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {performanceData.clicksChangePercent >= 0 ? '↑' : '↓'} {Math.abs(performanceData.clicksChangePercent)}% vs last week
                  </span>
                )}
              </div>

              {/* Click-through rate */}
              <div className="space-y-1">
                <span className="text-[11px] sm:text-xs text-zinc-400 block font-medium">
                  Click-through rate
                </span>
                <span className="text-xl sm:text-2xl font-bold text-white block">
                  {performanceData?.ctr ?? 0}%
                </span>
              </div>

              {/* Total inquiries */}
              <div className="space-y-1">
                <span className="text-[11px] sm:text-xs text-zinc-400 block font-medium">
                  Total inquiries
                </span>
                <span className="text-xl sm:text-2xl font-bold text-white block">
                  {performanceData?.totalInquiries?.toLocaleString() ?? 0}
                </span>
                {performanceData?.inquiriesChangePercent !== undefined && (
                  <span className={`text-[10px] sm:text-xs block font-medium ${performanceData.inquiriesChangePercent >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {performanceData.inquiriesChangePercent >= 0 ? '↑' : '↓'} {Math.abs(performanceData.inquiriesChangePercent)}% vs last week
                  </span>
                )}
              </div>

              {/* Inquiry rate */}
              <div className="space-y-1">
                <span className="text-[11px] sm:text-xs text-zinc-400 block font-medium">
                  Inquiry rate
                </span>
                <span className="text-xl sm:text-2xl font-bold text-white block">
                  {performanceData?.inquiryRate ?? 0}%
                </span>
              </div>

              {/* Total spend */}
              <div className="space-y-1">
                <span className="text-[11px] sm:text-xs text-zinc-400 block font-medium">
                  Total spend
                </span>
                <span className="text-xl sm:text-2xl font-bold text-white block">
                  ₹{performanceData?.totalSpend?.toLocaleString() ?? 0}
                </span>
                {performanceData?.spendChangePercent !== undefined && (
                  <span className={`text-[10px] sm:text-xs block font-medium ${performanceData.spendChangePercent >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {performanceData.spendChangePercent >= 0 ? '↑' : '↓'} {Math.abs(performanceData.spendChangePercent)}% vs last week
                  </span>
                )}
              </div>
            </div>

            {/* Daily Impressions Chart */}
            <div className="pt-4 border-t border-white/5 space-y-4">
              <h4 className="text-sm font-semibold text-zinc-300">
                Daily impressions
              </h4>
              <div className="w-full h-56 sm:h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={finalAudienceData}
                    margin={{ top: 10, right: 10, left: 10, bottom: 5 }}
                    barCategoryGap="28%"
                  >
                    <XAxis
                      dataKey="day"
                      stroke="#555"
                      tick={{ fill: "#888", fontSize: 13, fontWeight: 600 }}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis hide />
                    <Tooltip
                      cursor={{ fill: "rgba(255,255,255,0.03)" }}
                      contentStyle={{
                        backgroundColor: "#1a1a1a",
                        border: "none",
                        borderRadius: "10px",
                        boxShadow: "0 8px 24px rgba(0,0,0,0.5)",
                        padding: "10px 14px",
                      }}
                      itemStyle={{ color: "#ccc", fontSize: "12px" }}
                      labelStyle={{
                        color: "#fff",
                        fontWeight: 600,
                        marginBottom: "4px",
                        fontSize: "13px",
                      }}
                    />
                    <Bar
                      dataKey="value"
                      radius={[6, 6, 0, 0]}
                      name="Impressions"
                    >
                      {finalAudienceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: Boost Recommendations & Placement Performance Breakdown */}
          <div className="lg:col-span-5 space-y-6 lg:border-l lg:border-white/10 lg:pl-8">
            <div>
              <h3 className="font-semibold text-lg sm:text-xl text-white">
                Boost recommendations
              </h3>
            </div>

            {/* Recommendations List */}
            <div className="space-y-4">
              {/* Recommendation 1 */}
              <div className="flex gap-3">
                <span className="w-6 h-6 flex items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold shrink-0 mt-0.5">
                  1
                </span>
                <div>
                  <p className="text-xs sm:text-sm font-semibold text-white">
                    Your BMW X1 campaign is performing well
                  </p>
                  <p className="text-[10px] sm:text-xs text-emerald-400 font-medium mt-0.5">
                    Consider increasing daily budget to ₹750 for maximum reach
                  </p>
                </div>
              </div>

              {/* Recommendation 2 */}
              <div className="flex gap-3">
                <span className="w-6 h-6 flex items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold shrink-0 mt-0.5">
                  2
                </span>
                <div>
                  <p className="text-xs sm:text-sm font-semibold text-white">
                    Weekend traffic is 23% higher
                  </p>
                  <p className="text-[10px] sm:text-xs text-emerald-400 font-medium mt-0.5">
                    Schedule boosts for Friday–Sunday for better ROI
                  </p>
                </div>
              </div>

              {/* Recommendation 3 */}
              <div className="flex gap-3">
                <span className="w-6 h-6 flex items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold shrink-0 mt-0.5">
                  3
                </span>
                <div>
                  <p className="text-xs sm:text-sm font-semibold text-white">
                    Feature your Mercedes C-Class on homepage
                  </p>
                  <p className="text-[10px] sm:text-xs text-emerald-400 font-medium mt-0.5">
                    Luxury vehicles convert 1.8× better when boosted
                  </p>
                </div>
              </div>

              {/* Recommendation 4 */}
              <div className="flex gap-3">
                <span className="w-6 h-6 flex items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold shrink-0 mt-0.5">
                  4
                </span>
                <div>
                  <p className="text-xs sm:text-sm font-semibold text-white">
                    Switch Fortuner to CPI billing
                  </p>
                  <p className="text-[10px] sm:text-xs text-emerald-400 font-medium mt-0.5">
                    High impressions but low clicks — pay per inquiry instead
                  </p>
                </div>
              </div>
            </div>

            {/* Placement Performance Breakdown */}
            <div className="space-y-4 pt-6 border-t border-white/10">
              <div>
                <h4 className="font-semibold text-sm sm:text-base text-zinc-300">
                  Placement performance breakdown
                </h4>
              </div>

              <div className="space-y-3.5">
                {performanceData?.placementBreakdown?.length > 0 ? (
                  performanceData.placementBreakdown.map((item, idx) => {
                    // Decide color based on index or placement name
                    let colors = "from-emerald-500 to-teal-500";
                    if (idx % 3 === 1) colors = "from-blue-500 to-indigo-500";
                    if (idx % 3 === 2) colors = "from-amber-500 to-orange-500";

                    return (
                      <div key={idx} className="flex items-center gap-4 group">
                        <span className="text-xs font-medium text-zinc-400 w-32 sm:w-40 lg:w-48 group-hover:text-white transition-colors shrink-0 truncate">
                          {item.placement?.replace(/_/g, " ").toLowerCase().replace(/\b\w/g, c => c.toUpperCase())}
                        </span>
                        <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
                          <div
                            className={`h-full bg-linear-to-r ${colors} rounded-full transition-all duration-1000 ease-out`}
                            style={{ width: `${item.percentage || 0}%` }}
                          />
                        </div>
                        <span className="text-xs font-bold text-zinc-300 group-hover:text-white transition-colors w-8 text-right shrink-0">
                          {item.percentage || 0}%
                        </span>
                      </div>
                    );
                  })
                ) : (
                  <div className="text-xs text-zinc-500">No placement data available.</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CUSTOMIZE MODAL */}
      {(openCustomize || isClosingCustomize) && (
        <div
          className="fixed inset-0 z-9999  flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          onClick={triggerCloseCustomize}
          style={{
            animation: isClosingCustomize
              ? "modalBackdropOut 0.25s ease-in forwards"
              : "modalBackdropIn 0.25s ease-out",
          }}
        >
          <div
            className="w-full max-w-md rounded-2xl bg-secondary border border-white/10 p-5 sm:p-6 space-y-4 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
            style={{
              animation: isClosingCustomize
                ? "modalCardOut 0.25s ease-in forwards"
                : "modalCardIn 0.3s ease-out",
            }}
          >
            {/* HEADER */}
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-base sm:text-lg">
                Customize Advertising Summary
              </h3>
              <button
                onClick={triggerCloseCustomize}
                className="bg-white cursor-pointer p-1 rounded-full hover:opacity-70 text-secondary transition-opacity"
              >
                <X size={20} />
              </button>
            </div>

            <p className="text-xs text-third">Show or hide metrics</p>

            {/* METRICS LIST */}
            <div className="space-y-2 max-h-[50vh] overflow-y-auto custom-scrollbar pr-1">
              {Object.entries(metrics).map(([key, val]) => (
                <label
                  key={key}
                  className="flex items-center gap-3 cursor-pointer hover:bg-white/5 rounded-lg px-2 py-1.5 transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={val}
                    onChange={() => toggleMetric(key)}
                    className="accent-primary cursor-pointer"
                  />
                  <span className="text-sm capitalize select-none">
                    {key.replace(/([A-Z])/g, " $1")}
                  </span>
                </label>
              ))}
            </div>

            {/* FOOTER BUTTONS */}
            <div className="flex justify-end gap-3 pt-3">
              <Button
                variant="outlineSecondary"
                size="sm"
                className="cursor-pointer"
                onClick={triggerCloseCustomize}
              >
                Cancel
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="cursor-pointer"
                onClick={triggerCloseCustomize}
              >
                Apply
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* RESULTS MODAL (THE NEW COMPONENT) */}
      {(showResults || isClosingResults) && (
        <ResultsModal
          onClose={triggerCloseResults}
          isClosing={isClosingResults}
          ad={selectedAd}
        />
      )}

      {/* UPGRADE PLAN POPUP FOR BASIC TIER */}
      <UpgradeTierPopup isOpen={showUpgradeModal} />
    </section>
  );
}

function StatMini({ label, value }) {
  return (
    <div>
      <p className="text-xs text-third">{label}</p>
      <p className="font-semibold">{value}</p>
    </div>
  );
}

// ResultsModal and its sub-components have been modularized to components/ResultsModal.jsx
