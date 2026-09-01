import Image from "next/image";
import {
  Car,
  MessageCircle,
  MessageSquare,
  Eye,
  TrendingUp,
  MapPin,
  BadgeCheck,
  BarChart3,
  Zap,
  AlertTriangle,
  AlertCircle,
  CheckCircle2,
  Inbox,
  Rocket,
  Lightbulb,
  BadgeDollarSign,
  User,
  Smartphone,
  Crown,
} from "lucide-react";
import StatCard from "./components/StateCard";
import Activity from "./components/Activity";
import Button from "@/components/ui/button";
import TopPerformingCard from "./components/TopPerformingCard";
import { useState } from "react";
import Pagination from "@/components/ui/Pagination";
import CustomSelect from "@/components/ui/custom-select";
import DownloadAppPopup from "@/components/ui/DownloadAppPopup";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getInquiryKpisQuery,
  getNeedAttenctionVehiclesQuery,
  getTopPerformingVehiclesQuery,
  getSellerTierQuery,
} from "@/queries/Seller.queries";
import {
  getInspectionStatusQuery,
  getInventoryOverviewQuery,
  getOverviewSummaryDataQuery,
  getLowDemandVehiclesQuery,
} from "@/queries/overview.queries";
import { getAnalyticsKipsQuery } from "@/queries/analytics.queries";
import TopPerformingCardSkeleton from "@/components/ui/skeleton/TopPerformingCardSkeleton";
import { formatResponseTime, getResponseStatus } from "@/lib/helper";
import SkeletonBox from "@/components/ui/skeleton/SkeletonBox";
import StatCardSkeleton from "@/components/ui/skeleton/StatCardSkeleton";
import { useAuthStore } from "@/stores/useAuthStore";

const rangeOptions = [
  { label: "Last 7 days", value: "7" },
  { label: "Last 30 days", value: "30" },
  { label: "Last 90 days", value: "90" },
];

function formatRelativeTime(dateString) {
  if (!dateString) return "";
  try {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHrs = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHrs / 24);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHrs < 24) return `${diffHrs}h ago`;
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays}d ago`;

    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
    });
  } catch (e) {
    return "";
  }
}

export default function OverviewComponent() {
  const user = useAuthStore((state) => state.user);
  const [range, setRange] = useState("30");
  const [isDownloadOpen, setIsDownloadOpen] = useState(false);
  const [lowDemandPage, setLowDemandPage] = useState(1);
  const [needAttentionPage, setNeedAttentionPage] = useState(1);
  const queryClient = useQueryClient();

  const handleRangeChange = (newRange) => {
    setRange(newRange);
    let daysParam = "LAST_7_DAYS";
    if (newRange === "30") {
      daysParam = "LAST_30_DAYS";
    } else if (newRange === "90") {
      daysParam = "LAST_90_DAYS";
    }
    queryClient.invalidateQueries({ queryKey: ["analytics-kips", daysParam] });
  };

  // React Query calls
  const { data: inquiryKpis, isLoading: inquiryLoading } = useQuery(
    getInquiryKpisQuery(),
  );
  const { data: inventoryOverview, isLoading: overviewLoading } = useQuery(
    getInventoryOverviewQuery(),
  );
  const { data: topPerformingVehiclesData, isLoading: topPerformingLoading } =
    useQuery(getTopPerformingVehiclesQuery({ pageNo: 1, size: 3 }));
  const { data: needAttentionData, isLoading: needAttentionLoading } = useQuery(
    getNeedAttenctionVehiclesQuery({ pageNo: needAttentionPage, size: 3 }),
  );
  const { data: lowDemandVehiclesData, isLoading: lowDemandLoading } = useQuery(
    getLowDemandVehiclesQuery({ pageNo: lowDemandPage, size: 3 }),
  );
  const { data: summaryData, isLoading: summaryLoading } = useQuery(
    getOverviewSummaryDataQuery(),
  );
  const { data: sellerTierData } = useQuery(getSellerTierQuery());

  const { data: inspectionStatusData, isLoading: inspectionStatusLoading } =
    useQuery(getInspectionStatusQuery());

  let daysParam = "LAST_7_DAYS";
  if (range === "30") {
    daysParam = "LAST_30_DAYS";
  } else if (range === "90") {
    daysParam = "LAST_90_DAYS";
  }
  const { data: analyticsData, isLoading: analyticsLoading } = useQuery(
    getAnalyticsKipsQuery(daysParam),
  );

  // Mapped/Derived variables
  const topPerforming = topPerformingVehiclesData?.data || [];
  const needAttention = needAttentionData?.data || [];
  const lowDemandVehicles = lowDemandVehiclesData?.data || [];
  const sellerTier =
    sellerTierData?.tierTitle ||
    (typeof window !== "undefined" ? localStorage.getItem("sellerTier") : null);

  const isInitialLoading =
    topPerformingLoading ||
    needAttentionLoading ||
    lowDemandLoading ||
    overviewLoading ||
    inquiryLoading ||
    summaryLoading ||
    analyticsLoading ||
    inspectionStatusLoading;

  const avgTime = inquiryKpis?.averageResponseTime;
  const formattedTime = formatResponseTime(avgTime);
  const responseStatus = getResponseStatus(avgTime);

  if (isInitialLoading) {
    return <OverviewSkeleton />;
  }

  return (
    <>
      <div className="space-y-6">
        {/* HEADER */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <div className="flex items-center flex-wrap gap-3">
              <h1 className="text-xl lg:text-2xl font-bold capitalize">
                Welcome,{" "}
                {user?.consultationName ||
                  `${user?.firstname || ""} ${user?.lastname || ""}`.trim() ||
                  "Guest"}
              </h1>

              {(() => {
                const tierVal = sellerTier || user?.sellerTier;
                if (!tierVal) return null;

                const tierTitle =
                  typeof tierVal === "string"
                    ? tierVal.toUpperCase()
                    : "CONSULTANT";
                const badgeText =
                  tierTitle === "CONSULTANT"
                    ? "CONSULTANT"
                    : `${tierTitle} CONSULTANT`;
                let badgeClasses = "";

                if (tierTitle === "PRO" || tierTitle === "PREMIUM") {
                  badgeClasses =
                    "bg-amber-400/15 text-amber-400 border border-amber-500/30 shadow-[0_2px_12px_rgba(245,158,11,0.1)]";
                } else {
                  badgeClasses =
                    "bg-blue-500/15 text-blue-400 border border-blue-500/30";
                }

                return (
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-[5px] rounded-full text-[10px] md:text-xs font-bold tracking-widest uppercase ${badgeClasses}`}
                  >
                    <Crown size={14} className="fill-current" />
                    {badgeText}
                  </span>
                );
              })()}
            </div>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            {/* Day range filter */}
            <div className="w-44">
              <CustomSelect
                value={range}
                onChange={handleRangeChange}
                options={rangeOptions}
                placeholder="Select range"
                variant="transparent"
              />
            </div>
          </div>
        </div>

        {/* PERFORMANCE */}
        <div className="rounded-xl bg-primary/5 p-6">
          <h3 className="font-semibold mb-5">Performance Snapshot</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
              icon={<Eye />}
              label="Vehicle Views"
              value={analyticsData?.totalVehicleView || 0}
              trend={analyticsData?.totalVehicleViewChange}
            />
            <StatCard
              icon={<MessageCircle />}
              label="Inquiries"
              value={analyticsData?.totalInquiry || 0}
              trend={analyticsData?.totalInquiryChange}
            />
            <StatCard
              icon={<BarChart3 />}
              label="Conversion"
              value={`${analyticsData?.conversionRate || 0}%`}
              trend={analyticsData?.conversionRateChange}
            />
            <StatCard
              icon={<User />}
              label="Follower Count"
              value={analyticsData?.totalFollowerCount || 0}
              trend={analyticsData?.totalFollowerCountChange}
            />
          </div>
        </div>

        {/* RECOMMENDED ACTIONS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Action 1: New Inquiries */}
          {/* <div className="rounded-2xl border border-primary/20  p-6 flex flex-col justify-between transition hover:border-primary/40 group">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="h-11 w-11 shrink-0 rounded-xl bg-rose-500/20 flex items-center justify-center text-rose-500 border border-rose-500/20">
                  <AlertTriangle size={22} strokeWidth={2.5} />
                </div>
                <h4 className="font-bold text-white text-lg tracking-tight">
                  {summaryData?.totalPendingInquiryCount ?? 0} New Inquiries
                </h4>
              </div>
              <p className="mb-4 text-xs text-third leading-relaxed font-medium">
                Respond within 15 min for better leads
              </p>
            </div>
            <Button
              href={"/consult/dashboard/inquiries"}
              variant="ghost"
              className="w-full"
            >
              Respond Now
            </Button>
          </div> */}

          <div className="relative rounded-2xl overflow-hidden transition shadow-sm border border-third/10 min-h-[320px] flex items-center bg-[#0A58F9]">
            {/* Background Image */}
            <Image
              src="/seller/chatsbg.webp"
              alt="Background"
              loading="lazy"
              fill
              className="object-cover"
            />

            {/* Mobile Phone Image */}
            <Image
              src="/seller/mobile.webp"
              alt="Mobile App"
              loading="lazy"
              width={400}
              height={700}
              className="absolute right-[-10%] md:right-4 bottom-0 h-[85%] md:h-[95%] w-auto object-right-bottom drop-shadow-2xl opacity-20 md:opacity-100 transition-transform duration-500 pointer-events-none"
            />

            {/* Content */}
            <div className="relative z-10 flex flex-col p-6 md:p-8 md:pr-[45%]">
              <h3 className="text-3xl md:text-4xl font-extrabold text-white leading-[1.1] tracking-tight mb-4 drop-shadow-md">
                Chats are
                <br />
                Mobile Only
              </h3>
              <p className="text-[13px] md:text-sm text-white/95 leading-relaxed font-medium mb-6 drop-shadow-md">
                Download the Reecomm mobile app to chat with buyers in real time
                and receive instant notifications. All conversations are managed
                through the mobile app.
              </p>
            </div>
          </div>

          {/* Action 3: Fix Listings */}
          <div className="rounded-2xl bg-primary/5 p-6 flex flex-col gap-4 transition group">
            <div className="flex items-center gap-4">
              <div className="h-11 w-11 shrink-0 rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-500 border border-amber-500/20">
                <AlertCircle size={22} strokeWidth={2.5} />
              </div>
              <div>
                <h4 className="font-bold text-white text-lg tracking-tight">
                  Fix Listings
                </h4>
                <p className="text-xs text-third leading-relaxed font-medium">
                  {lowDemandVehicles.length > 0
                    ? "Low visibility detected"
                    : ""}
                </p>
              </div>
            </div>

            <div className="flex-1 mt-2">
              <div className="flex flex-col gap-4">
                {lowDemandLoading ? (
                  <>
                    <TopPerformingCardSkeleton />
                    <TopPerformingCardSkeleton />
                  </>
                ) : lowDemandVehicles.length > 0 ? (
                  lowDemandVehicles.map((vehicle) => (
                    <TopPerformingCard key={vehicle.id} vehicle={vehicle} />
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-center py-6 px-4 space-y-2">
                    <div className="h-10 w-10 rounded-full bg-emerald-500/20 text-emerald-500 border border-emerald-500/20 flex items-center justify-center mb-1">
                      <CheckCircle2 size={22} strokeWidth={2.5} />
                    </div>
                    <p className="text-base font-semibold text-white">
                      All listings are performing well
                    </p>
                    <p className="text-xs text-third leading-relaxed max-w-xs">
                      No vehicles are showing low demand right now. Keep
                      responding to inquiries and your visibility stays healthy.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {lowDemandVehicles.length > 0 && (
              <div className="flex items-center justify-between mt-2 pt-2 ">
                {lowDemandVehicles.length <= 1 && (
                  <Button
                    href={"/consult/dashboard/inventory"}
                    variant="ghost"
                    className="px-3 py-1.5 text-xs"
                  >
                    View All
                  </Button>
                )}
                <div className="transform scale-[0.8] origin-right -mt-4 -mr-2 ml-auto">
                  <Pagination
                    currentPage={lowDemandPage}
                    totalPages={
                      lowDemandVehiclesData?.pageResponse?.totalPages || 1
                    }
                    onPageChange={setLowDemandPage}
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* INQUIRIES & CHATS DETAILS */}
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-6 text-white">
          {/* Inquiries Detail */}
          <div className="rounded-2xl bg-primary/5 p-6 flex flex-col space-y-6 transition">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-primary/5 rounded-lg text-primary">
                  <Inbox size={20} />
                </div>
                <h3 className="font-bold text-lg tracking-tight">Inquiries</h3>
              </div>

              {/* Response Time Badge */}
              <div
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full border text-[11px] font-bold uppercase tracking-wider ${responseStatus.color.includes("green")
                    ? "text-green-400 border-green-500/25 bg-green-500/10"
                    : responseStatus.color.includes("yellow")
                      ? "text-amber-400 border-amber-500/25 bg-amber-500/10"
                      : responseStatus.color.includes("red")
                        ? "text-red-400 border-red-500/25 bg-red-500/10"
                        : "text-third border-third/25 bg-third/10"
                  }`}
              >
                <Zap
                  size={12}
                  className={
                    responseStatus.color.includes("green")
                      ? "text-green-400 fill-green-400/20"
                      : responseStatus.color.includes("yellow")
                        ? "text-amber-400 fill-amber-400/20"
                        : responseStatus.color.includes("red")
                          ? "text-red-400 fill-red-400/20"
                          : "text-third"
                  }
                />
                <span>
                  Avg Response:{" "}
                  {inquiryLoading ? (
                    <SkeletonBox className="h-3 w-12 inline-block opacity-40" />
                  ) : (
                    formattedTime
                  )}
                </span>
              </div>
            </div>

            <div className="space-y-4 flex-1">
              <div className="flex justify-between items-center text-sm border-b border-third/5 pb-3">
                <span className="text-third font-medium">New</span>
                {inquiryLoading ? (
                  <SkeletonBox className="h-5 w-10" />
                ) : (
                  <span className="font-bold text-base">
                    {inquiryKpis?.totalPendingInquiries ?? 0}
                  </span>
                )}
              </div>
              <div className="flex justify-between items-center text-sm border-b border-third/5 pb-3">
                <span className="text-third font-medium">Active</span>
                {inquiryLoading ? (
                  <SkeletonBox className="h-5 w-10" />
                ) : (
                  <span className="font-bold text-base">
                    {inquiryKpis?.totalApprovedInquiries ?? 0}
                  </span>
                )}
              </div>
              <div className="flex justify-between items-center text-sm pb-2">
                <span className="text-third font-medium">Closed</span>
                {inquiryLoading ? (
                  <SkeletonBox className="h-5 w-10" />
                ) : (
                  <span className="font-bold text-base">
                    {inquiryKpis?.totalClosedInquiries ?? 0}
                  </span>
                )}
              </div>
            </div>

            <Button
              href={"/consult/dashboard/inquiries"}
              variant="ghost"
              className="self-end px-4 py-1.5 text-sm"
            >
              View All
            </Button>
          </div>

          {/* Chats Detail */}
          {/* <div className="rounded-2xl border border-third/20  p-6 flex flex-col space-y-6 transition ">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-primary/5 rounded-lg text-primary">
                <MessageSquare size={20} />
              </div>
              <h3 className="font-bold text-lg tracking-tight">Chats</h3>
            </div>

            <div className="flex-1 flex flex-col justify-center">
              <div className="flex flex-col items-center justify-center text-center p-6 border border-dashed border-third/20 rounded-xl bg-white/2 space-y-3 my-auto">
                <div className="p-3 bg-primary/5 rounded-full text-primary">
                  <Smartphone size={24} />
                </div>
                <div className="space-y-1">
                  <h4 className="font-semibold text-sm text-white">Chats are Mobile Only</h4>
                  <p className="text-xs text-third max-w-[280px] leading-relaxed mx-auto">
                    Download the Reecomm mobile app to chat with buyers in real-time and get instant notifications.
                  </p>
                </div>
              </div>
            </div>

            <Button
              onClick={() => setIsDownloadOpen(true)}
              variant="outlineSecondary"
              className="self-end"
            >
              Download App
            </Button>
          </div> */}
        </div>

        {/* INVENTORY & INSPECTION */}
        {/* INVENTORY STATUS */}
        <div className="rounded-xl bg-primary/5 p-6 space-y-6">
          <h3 className="font-semibold text-sm uppercase tracking-wider">
            Inventory Status
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex justify-between items-center text-sm p-4 bg-white/5 rounded-xl border border-third/10">
              <span className="text-third font-medium">Active Vehicles</span>
              {overviewLoading ? (
                <SkeletonBox className="h-6 w-10" />
              ) : (
                <span className="font-bold text-blue-500 text-lg">
                  {inventoryOverview?.activeVehicleCount ?? 0}
                </span>
              )}
            </div>
            <div className="flex justify-between items-center text-sm p-4 bg-white/5 rounded-xl border border-third/10">
              <span className="text-third font-medium">Inspected Vehicles</span>
              {overviewLoading ? (
                <SkeletonBox className="h-6 w-10" />
              ) : (
                <span className="font-bold text-green-500 text-lg">
                  {inventoryOverview?.inspectedVehicleCount ?? 0}
                </span>
              )}
            </div>
            <div className="flex justify-between items-center text-sm p-4 bg-white/5 rounded-xl border border-third/10">
              <span className="text-third font-medium">
                Featured Vehicles(DD)
              </span>
              <span className="font-bold text-orange-500 text-lg">0</span>
            </div>
            <div className="flex justify-between items-center text-sm p-4 bg-white/5 rounded-xl border border-third/10">
              <span className="text-third font-medium">Low Performance</span>
              {overviewLoading ? (
                <SkeletonBox className="h-6 w-10" />
              ) : (
                <span className="font-bold text-yellow-500 text-lg">
                  {inventoryOverview?.lowVisibilityVehicleCount ?? 0}
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-4 pt-4 border-t border-third/10">
            <div className="flex items-start gap-3 bg-primary/10 border border-primary/20 p-4 rounded-xl">
              <div className="p-2 bg-primary/15 text-yellow-400 rounded-lg shrink-0">
                <Lightbulb size={18} className="fill-yellow-400/20" />
              </div>
              <div className="space-y-1">
                <p className="text-xs font-bold text-primary uppercase tracking-wider">
                  Insight
                </p>
                <p className="text-xs text-white leading-relaxed">
                  Listings with inspection are performing 30% better. Active
                  vehicles are healthy, but 5 vehicles need attention to improve
                  overall conversion.
                </p>
              </div>
            </div>
            <Button
              href={"/consult/dashboard/inventory"}
              variant="ghost"
              className="self-end px-4 py-1.5 text-sm"
            >
              Manage Inventory
            </Button>
          </div>
        </div>

        {/* TOP PERFORMING LISTINGS + NEEDS ATTENTION */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* TOP PERFORMING LISTINGS */}
          <div className="rounded-xl bg-primary/5 p-6 flex flex-col gap-4 transition group">
            <h3 className="font-semibold">Top Performing Listings</h3>

            <div className="flex-1 mt-2">
              <div className="flex flex-col gap-4">
                {topPerformingLoading ? (
                  <>
                    <TopPerformingCardSkeleton />
                    <TopPerformingCardSkeleton />
                  </>
                ) : topPerforming.length > 0 ? (
                  topPerforming.map((vehicle, index) => (
                    <TopPerformingCard
                      key={vehicle.id}
                      rank={index + 1}
                      vehicle={vehicle}
                    />
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-center py-6 px-4 space-y-2">
                    <div className="h-10 w-10 rounded-full bg-amber-500/20 text-amber-500 border border-amber-500/20 flex items-center justify-center mb-1">
                      <Zap size={14} />
                    </div>
                    <p className="text-base font-semibold text-white">
                      No top performers yet
                    </p>
                    <p className="text-xs text-third leading-relaxed max-w-xs">
                      Listings that receive the most inquiries will appear here.
                      Add inspection reports and complete your listing details
                      to get more traction.
                    </p>
                    <Button
                      href="/consult/dashboard/ppc"
                      variant="ghost"
                      className="px-3 py-1.5 text-xs  gap-1.5 mt-2"
                    >
                      <Rocket size={20} strokeWidth={2} />
                      Boost your vehicles
                    </Button>
                  </div>
                )}
              </div>
            </div>

            {topPerforming.length > 0 && (
              <div className="flex items-center justify-start mt-2 pt-2">
                <Button
                  href={"/consult/dashboard/inventory"}
                  variant="ghost"
                  className="px-3 py-1.5 text-xs"
                >
                  View All
                </Button>
              </div>
            )}
          </div>

          {/* NEEDS ATTENTION */}
          <div className="rounded-xl bg-primary/5 p-6 flex flex-col gap-4 transition group">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-primary">Needs Attention</h3>
              {/* {needAttention.length === 0 && !needAttentionLoading && (
                <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full">
                  All good
                </span>
              )} */}
            </div>

            <div className="flex-1 mt-2">
              <div className="flex flex-col gap-4">
                {needAttentionLoading ? (
                  <>
                    <TopPerformingCardSkeleton />
                    <TopPerformingCardSkeleton />
                  </>
                ) : needAttention.length > 0 ? (
                  needAttention.map((vehicle) => (
                    <TopPerformingCard key={vehicle.id} vehicle={vehicle} />
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-center py-6 px-4 space-y-2">
                    <div className="h-10 w-10 rounded-full bg-emerald-500/20 text-emerald-500 border border-emerald-500/20 flex items-center justify-center mb-1">
                      <CheckCircle2 size={22} strokeWidth={2.5} />
                    </div>
                    <p className="text-base font-semibold text-white">
                      Nothing needs attention right now
                    </p>
                    <p className="text-xs text-third leading-relaxed max-w-xs">
                      All your active listings are in good shape. We'll flag
                      anything that needs a fix &mdash; expired inspections, low
                      visibility.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {needAttention.length > 0 && (
              <div className="flex items-center justify-between mt-2 pt-2">
                <div className="transform scale-[0.8] origin-right -mt-4 -mr-2 ml-auto">
                  <Pagination
                    currentPage={needAttentionPage}
                    totalPages={
                      needAttentionData?.pageResponse?.totalPages || 1
                    }
                    onPageChange={setNeedAttentionPage}
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* INSPECTION STATUS + VISIBILITY */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* INSPECTION STATUS */}
          <div className="rounded-xl bg-primary/5 p-6 flex flex-col gap-5">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-primary/5 rounded-lg text-primary flex items-center justify-center">
                <Image
                  src="/inspection_small.svg"
                  alt="Inspection Status"
                  width={20}
                  height={20}
                  className="w-5 h-5 object-contain"
                />
              </div>
              <h3 className="font-bold text-lg tracking-tight">
                Inspection Status
              </h3>
            </div>

            <div className="flex flex-col gap-3 flex-1">
              <div className="flex justify-between items-center text-sm border-b border-third/10 pb-3">
                <span className="text-third font-medium">Inspected</span>
                {inspectionStatusLoading ? (
                  <SkeletonBox className="h-5 w-10" />
                ) : (
                  <span className="font-bold text-base">
                    {inspectionStatusData?.avxInspectedVehicleCount ?? 0}
                  </span>
                )}
              </div>
              <div className="flex justify-between items-center text-sm pb-3">
                <span className="text-third font-medium">Not Inspected</span>
                <div className="flex items-center gap-2">
                  {inspectionStatusLoading ? (
                    <SkeletonBox className="h-5 w-10" />
                  ) : (
                    <span className="font-bold text-base">
                      {inspectionStatusData?.avxNotInspectedVehicleCount ?? 0}
                    </span>
                  )}
                </div>
              </div>

              <div className="bg-primary/5 border border-primary/20 p-3 rounded-xl flex items-center gap-2">
                <TrendingUp size={15} className="text-green-500" />
                <span className="text-xs font-bold text-green-500">
                  Inspected listings often perform better than non-inspected
                  ones.
                </span>
              </div>
            </div>

            <div className="pt-3 border-t border-third/10 self-end w-full flex justify-end">
              <Button
                href={"/consult/dashboard/inspection"}
                className=" bg-primary  text-secondary  hover:bg-transparent hover:text-white hover:border-primary px-4 py-1.5 text-sm "
              >
                Request Inspection
              </Button>
            </div>
          </div>

          {/* VISIBILITY */}
          <div className="rounded-xl bg-primary/5 p-6 flex flex-col gap-5">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-primary/5 rounded-lg text-primary">
                <Eye size={20} />
              </div>
              <h3 className="font-bold text-lg tracking-tight">Visibility</h3>
            </div>

            <div className="flex flex-col gap-3 flex-1">
              <div className="flex justify-between items-center text-sm border-b border-third/10 pb-3">
                <span className="text-third font-medium">Featured</span>
                <span className="font-bold text-base">N/A</span>
              </div>
              <div className="flex justify-between items-center text-sm border-b border-third/10 pb-3">
                <span className="text-third font-medium">Boost Active</span>
                <span className="font-bold text-base">N/A</span>
              </div>
              <div className="flex justify-between items-center text-sm pb-3">
                <span className="text-third font-medium">Impressions</span>
                <span className="font-bold text-base">N/A</span>
              </div>
            </div>

            <div className="pt-3 border-t border-third/10 self-end w-full flex justify-end">
              <Button
                href={"/consult/dashboard/ppc"}
                variant="outlineSecondary"
                className="px-4 py-1.5 text-sm"
              >
                Manage Boost
              </Button>
            </div>
          </div>
        </div>

        {/* RECOMMENDED ACTIONS */}
        <div className="rounded-xl bg-primary/5 p-6 flex flex-col gap-5 transition-colors duration-200 ">
          {/* Header */}
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-primary/15 rounded-lg text-yellow-400">
              <Lightbulb size={18} />
            </div>
            <h3 className="font-bold text-base tracking-tight">
              Recommended Actions
            </h3>
          </div>

          {/* Action rows */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Row 1 */}
            <button className="cursor-pointer flex items-center gap-4 p-4 rounded-xl bg-white/2 border border-third/10 hover:bg-white/5 hover:border-blue-500/30 transition duration-300 group text-left">
              <div className="h-10 w-10 shrink-0 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 transition-transform duration-300 group-hover:scale-110">
                <Car size={18} />
              </div>
              <span className="text-sm font-medium text-primary">
                Add more SUVs —{" "}
                <span className="text-blue-400 font-semibold">high demand</span>
              </span>
            </button>

            {/* Row 2 */}
            <button className="cursor-pointer flex items-center gap-4 p-4 rounded-xl bg-white/2 border border-third/10 hover:bg-white/5 hover:border-amber-500/30 transition duration-300 group text-left">
              <div className="h-10 w-10 shrink-0 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 transition-transform duration-300 group-hover:scale-110">
                <BadgeDollarSign size={18} />
              </div>
              <span className="text-sm font-medium text-primary">
                Reduce price for{" "}
                <span className="text-amber-400 font-semibold">1 listing</span>
              </span>
            </button>

            {/* Row 3 */}
            <button className="cursor-pointer flex items-center gap-4 p-4 rounded-xl bg-white/2 border border-third/10 hover:bg-white/5 hover:border-purple-500/30 transition duration-300 group text-left">
              <div className="h-10 w-10 shrink-0 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 transition-transform duration-300 group-hover:scale-110">
                <Rocket size={18} />
              </div>
              <span className="text-sm font-medium text-primary">
                Boost top{" "}
                <span className="text-purple-400 font-semibold">
                  2 vehicles
                </span>
              </span>
            </button>
          </div>
        </div>
      </div>

      <DownloadAppPopup
        isOpen={isDownloadOpen}
        onClose={() => setIsDownloadOpen(false)}
      />
    </>
  );
}

function OverviewSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* HEADER SKELETON */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <SkeletonBox className="h-8 w-64" />
          </div>
          <div className="mt-2">
            <SkeletonBox className="h-6 w-32 rounded-full" />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <SkeletonBox className="h-10 w-44 rounded-xl" />
        </div>
      </div>

      {/* PERFORMANCE SNAPSHOT SKELETON */}
      <div className="rounded-xl bg-primary/5 p-6 space-y-5">
        <SkeletonBox className="h-6 w-48" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCardSkeleton />
          <StatCardSkeleton />
          <StatCardSkeleton />
          <StatCardSkeleton />
        </div>
      </div>

      {/* RECOMMENDED ACTIONS SKELETON */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="flex items-center gap-4 p-4 rounded-xl bg-white/2 border border-third/10 animate-pulse"
          >
            <SkeletonBox className="h-10 w-10 rounded-xl shrink-0" />
            <SkeletonBox className="h-4 w-3/4" />
          </div>
        ))}
      </div>

      {/* INQUIRIES & CHATS SKELETON */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Inquiries Skeleton */}
        <div className="rounded-2xl bg-primary/5 p-6 flex flex-col space-y-6">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <SkeletonBox className="h-10 w-10 rounded-lg" />
              <SkeletonBox className="h-6 w-24" />
            </div>
            <SkeletonBox className="h-6 w-28 rounded-full" />
          </div>
          <div className="space-y-4 flex-1">
            <div className="flex justify-between pb-3 border-b border-third/5">
              <SkeletonBox className="h-4 w-16" />
              <SkeletonBox className="h-4 w-8" />
            </div>
            <div className="flex justify-between pb-3 border-b border-third/5">
              <SkeletonBox className="h-4 w-16" />
              <SkeletonBox className="h-4 w-8" />
            </div>
            <div className="flex justify-between pb-2">
              <SkeletonBox className="h-4 w-16" />
              <SkeletonBox className="h-4 w-8" />
            </div>
          </div>
          <div className="self-end">
            <SkeletonBox className="h-9 w-24 rounded-lg" />
          </div>
        </div>

        {/* Chats Skeleton */}
        <div className="rounded-2xl bg-primary/5 p-6 flex flex-col space-y-6">
          <div className="flex items-center gap-3">
            <SkeletonBox className="h-10 w-10 rounded-lg" />
            <SkeletonBox className="h-6 w-24" />
          </div>
          <div className="flex flex-col items-center justify-center text-center p-6 border border-dashed border-third/20 rounded-xl bg-white/2 flex-1 space-y-4">
            <SkeletonBox className="h-12 w-12 rounded-full" />
            <div className="space-y-2 flex flex-col items-center">
              <SkeletonBox className="h-4 w-32" />
              <SkeletonBox className="h-3 w-56" />
              <SkeletonBox className="h-3 w-40" />
            </div>
          </div>
          <div className="self-end">
            <SkeletonBox className="h-9 w-28 rounded-lg" />
          </div>
        </div>
      </div>

      {/* INVENTORY STATUS SKELETON */}
      <div className="rounded-xl bg-primary/5 p-6 space-y-6">
        <SkeletonBox className="h-5 w-40" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-4 rounded-xl border border-third/10 flex justify-between items-center">
            <SkeletonBox className="h-4 w-24" />
            <SkeletonBox className="h-6 w-10" />
          </div>
          <div className="p-4 rounded-xl border border-third/10 flex justify-between items-center">
            <SkeletonBox className="h-4 w-24" />
            <SkeletonBox className="h-6 w-10" />
          </div>
          <div className="p-4 rounded-xl border border-third/10 flex justify-between items-center">
            <SkeletonBox className="h-4 w-24" />
            <SkeletonBox className="h-6 w-10" />
          </div>
          <div className="p-4 rounded-xl border border-third/10 flex justify-between items-center">
            <SkeletonBox className="h-4 w-24" />
            <SkeletonBox className="h-6 w-10" />
          </div>
        </div>
      </div>

      {/* LISTINGS SKELETON */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="rounded-xl bg-primary/5 p-6 space-y-4">
            <SkeletonBox className="h-6 w-48" />
            <div className="space-y-3">
              <TopPerformingCardSkeleton />
              <TopPerformingCardSkeleton />
            </div>
          </div>
        ))}
      </div>

      {/* INSPECTION STATUS + VISIBILITY SKELETON */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Inspection Status Skeleton */}
        <div className="rounded-xl bg-primary/5 p-6 space-y-5 flex flex-col justify-between">
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <SkeletonBox className="h-10 w-10 rounded-lg" />
              <SkeletonBox className="h-6 w-36" />
            </div>
            <div className="space-y-4">
              <div className="flex justify-between pb-3 border-b border-third/10">
                <SkeletonBox className="h-4 w-20" />
                <SkeletonBox className="h-4 w-8" />
              </div>
              <div className="flex justify-between pb-3">
                <SkeletonBox className="h-4 w-24" />
                <SkeletonBox className="h-4 w-8" />
              </div>
              <SkeletonBox className="h-10 w-full rounded-xl" />
            </div>
          </div>
          <div className="pt-3 border-t border-third/10 self-end w-full flex justify-end">
            <SkeletonBox className="h-9 w-36 rounded-lg" />
          </div>
        </div>

        {/* Visibility Skeleton */}
        <div className="rounded-xl bg-primary/5 p-6 space-y-5 flex flex-col justify-between">
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <SkeletonBox className="h-10 w-10 rounded-lg" />
              <SkeletonBox className="h-6 w-24" />
            </div>
            <div className="space-y-4">
              <div className="flex justify-between pb-3 border-b border-third/10">
                <SkeletonBox className="h-4 w-16" />
                <SkeletonBox className="h-4 w-8" />
              </div>
              <div className="flex justify-between pb-3 border-b border-third/10">
                <SkeletonBox className="h-4 w-20" />
                <SkeletonBox className="h-4 w-8" />
              </div>
              <div className="flex justify-between pb-3">
                <SkeletonBox className="h-4 w-24" />
                <SkeletonBox className="h-4 w-8" />
              </div>
            </div>
          </div>
          <div className="pt-3 border-t border-third/10 self-end w-full flex justify-end">
            <SkeletonBox className="h-9 w-28 rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
}
