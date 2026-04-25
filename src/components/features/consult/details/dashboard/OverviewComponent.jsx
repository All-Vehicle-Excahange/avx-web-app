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
  Inbox,
  Shield,
  Rocket,
  Lightbulb,
  BadgeDollarSign,
  User,
} from "lucide-react";
import StatCard from "./components/StateCard";
import Activity from "./components/Activity";
import Button from "@/components/ui/button";
import TopPerformingCard from "./components/TopPerformingCard";
import { useState } from "react";
import CustomSelect from "@/components/ui/custom-select";
import DownloadAppPopup from "@/components/ui/DownloadAppPopup";
import {
  getInquiryKpis,
  getNeedAttenctionVehicles,
  getTopPerformingVehicles,
} from "@/services/Seller.service";
import { useEffect } from "react";
import TopPerformingCardSkeleton from "@/components/ui/skeleton/TopPerformingCardSkeleton";
import { getInventoryOverview, getOverviewSummaryData } from "@/services/overview.service";
import { formatResponseTime, getResponseStatus } from "@/lib/helper";
import SkeletonBox from "@/components/ui/skeleton/SkeletonBox";
import StatCardSkeleton from "@/components/ui/skeleton/StatCardSkeleton";
import { getAnalyticsKips } from "@/services/analytics.service";
  

const rangeOptions = [
  { label: "Last 7 days", value: "7" },
  { label: "Last 30 days", value: "30" },
  { label: "Last 90 days", value: "90" },
];

const DATE_3_DAYS_AGO = new Date(Date.now() - 86400000 * 3).toISOString();
const DATE_12_DAYS_AGO = new Date(Date.now() - 86400000 * 12).toISOString();
const DATE_18_DAYS_AGO = new Date(Date.now() - 86400000 * 18).toISOString();

export default function OverviewComponent() {
  const [range, setRange] = useState("30");
  const [isDownloadOpen, setIsDownloadOpen] = useState(false);

  // API Data States
  const [topPerforming, setTopPerforming] = useState([]);
  const [needAttention, setNeedAttention] = useState([]);
  const [inventoryOverview, setInventoryOverview] = useState(null);
  const [inquiryKpis, setInquiryKpis] = useState(null);
  const [topPerformingLoading, setTopPerformingLoading] = useState(false);
  const [needAttentionLoading, setNeedAttentionLoading] = useState(false);
  const [overviewLoading, setOverviewLoading] = useState(false);
  const [inquiryLoading, setInquiryLoading] = useState(false);
  const [summaryData, setSummaryData] = useState(null);
  const [summaryLoading, setSummaryLoading] = useState(false);
  const [analyticsData, setAnalyticsData] = useState(null);
  const [analyticsLoading, setAnalyticsLoading] = useState(false);

  useEffect(() => {
    const fetchInquiryKpis = async () => {
      try {
        setInquiryLoading(true);
        const res = await getInquiryKpis();
        setInquiryKpis(res.data);
      } catch (error) {
        console.error("Error fetching inquiry KPIs:", error);
      } finally {
        setInquiryLoading(false);
      }
    };
    const fetchInventoryOverview = async () => {
      try {
        setOverviewLoading(true);
        const res = await getInventoryOverview();
        setInventoryOverview(res.data);
      } catch (error) {
        console.error("Error fetching inventory overview:", error);
      } finally {
        setOverviewLoading(false);
      }
    };
    const fetchTopPerforming = async () => {
      try {
        setTopPerformingLoading(true);
        const res = await getTopPerformingVehicles();
        // Updated to fetch 5 records and show first two (scrollable for rest)
        setTopPerforming(res.data?.slice(0, 5) || []);
      } catch (error) {
        console.error("Error fetching top performing vehicles:", error);
      } finally {
        setTopPerformingLoading(false);
      }
    };

    const fetchNeedAttention = async () => {
      try {
        setNeedAttentionLoading(true);
        // Updated to fetch 5 records from backend
        const res = await getNeedAttenctionVehicles({ pageNo: 1, size: 5 });
        setNeedAttention(res.data || []);
      } catch (error) {
        console.error("Error fetching need attention vehicles:", error);
      } finally {
        setNeedAttentionLoading(false);
      }
    };

    const fetchOverviewSummary = async () => {
      try {
        setSummaryLoading(true);
        const res = await getOverviewSummaryData();
        setSummaryData(res.data);
      } catch (error) {
        console.error("Error fetching overview summary data:", error);
      } finally {
        setSummaryLoading(false);
      }
    };

    fetchTopPerforming();
    fetchNeedAttention();
    fetchInventoryOverview();
    fetchInquiryKpis();
    fetchOverviewSummary();
  }, []);

  useEffect(() => {
    const fetchAnalytics = async () => {
      let daysParam = "LAST_7_DAYS";
      if (range === "30") {
        daysParam = "LAST_30_DAYS";
      } else if (range === "90") {
        daysParam = "LAST_90_DAYS";
      }

      setAnalyticsLoading(true);
      try {
        const res = await getAnalyticsKips(daysParam);
        if (res.success) {
          setAnalyticsData(res.data);
        }
      } catch (error) {
        console.error("Failed to fetch analytics KPIs:", error);
      } finally {
        setAnalyticsLoading(false);
      }
    };

    fetchAnalytics();
  }, [range]);

  const isInitialLoading =
    topPerformingLoading ||
    needAttentionLoading ||
    overviewLoading ||
    inquiryLoading ||
    summaryLoading ||
    analyticsLoading;

  const avgTime = inquiryKpis?.averageResponseTime;
  const formattedTime = formatResponseTime(avgTime);
  const responseStatus = getResponseStatus(avgTime);

  if (isInitialLoading) {
    return <OverviewSkeleton />;
  }

  return (
    <>
      <div className="space-y-8">
        {/* HEADER */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-xl lg:text-2xl font-bold">
                Welcome, Adarsh Auto Consultants
              </h1>
              <span className="w-fit inline-flex items-center px-4 py-1.5 rounded-full bg-primary text-secondary text-[10px] md:text-xs font-bold tracking-wider">
                PREMIUM PARTNER
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs md:text-sm text-third mt-1">
              <span className="flex items-center gap-1 text-green-400 font-medium">
                <BadgeCheck size={16} />
                Verified
              </span>
              <span className="flex items-center gap-2">
                <MapPin size={16} />
                City: Ahmedabad
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            {/* Day range filter */}
            <div className="w-44">
              <CustomSelect
                value={range}
                onChange={setRange}
                options={rangeOptions}
                placeholder="Select range"
                variant="transparent"
              />
            </div>
          </div>
        </div>

        {/* PERFORMANCE */}
        <div className="rounded-xl border border-third/30  p-6">
          <h3 className="font-semibold mb-5">
            Performance Snapshot (Last {range} Days)
          </h3>
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Action 1: New Inquiries */}
          <div className="rounded-2xl border border-primary/20  p-6 flex flex-col justify-between transition hover:border-primary/40 group">
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
          </div>

          {/* Action 2: Chats Pending */}
          <div className="rounded-2xl border border-primary/20  p-6 flex flex-col justify-between transition hover:border-primary/40 group">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="h-11 w-11 shrink-0 rounded-xl bg-orange-500/20 flex items-center justify-center text-orange-500 border border-orange-500/20">
                  <MessageSquare size={22} strokeWidth={2.5} />
                </div>
                <h4 className="font-bold text-white text-lg tracking-tight">
                  3 Chats Pending
                </h4>
              </div>
              <p className="mb-4 text-xs text-third leading-relaxed font-medium">
                Active conversations waiting
              </p>
            </div>
            <Button
              onClick={() => setIsDownloadOpen(true)}
              variant="ghost"
              className="w-full"
            >
              View Chats
            </Button>
          </div>

          {/* Action 3: Fix Listings */}
          <div className="rounded-2xl border border-primary/20  p-6 flex flex-col justify-between transition hover:border-primary/40 group">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="h-11 w-11 shrink-0 rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-500 border border-amber-500/20">
                  <AlertCircle size={22} strokeWidth={2.5} />
                </div>
                <h4 className="font-bold text-white text-lg tracking-tight">
                  {summaryData?.lowVisibilityVehicleCount ?? 0} Fix Listings
                </h4>
              </div>
              <p className="mb-4 text-xs text-third leading-relaxed font-medium">
                Low visibility detected
              </p>
            </div>
            <Button
              href={"/consult/dashboard/inventory"}
              variant="ghost"
              className="w-full"
            >
              Fix Listings
            </Button>
          </div>
        </div>

        {/* INQUIRIES & CHATS DETAILS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-white">
          {/* Inquiries Detail */}
          <div className="rounded-2xl border border-third/20  p-6 flex flex-col space-y-6 transition">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-primary/10 rounded-lg text-primary">
                <Inbox size={20} />
              </div>
              <h3 className="font-bold text-lg tracking-tight">Inquiries</h3>
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

              <div className="bg-primary/5 border border-primary/20 p-3.5 rounded-xl flex items-center gap-3">
                <Zap
                  size={16}
                  className={`text-green-500 fill-green-500/20 ${responseStatus.color}`}
                />
                <span
                  className={`text-xs font-bold uppercase tracking-wider ${responseStatus.color}`}
                >
                  Response Time:{" "}
                  {inquiryLoading ? (
                    <SkeletonBox className="h-3 w-16 inline-block" />
                  ) : (
                    formattedTime
                  )}
                </span>
              </div>
            </div>

            <Button
              href={"/consult/dashboard/inquiries"}
              variant="ghost"
              className="self-end"
            >
              View All
            </Button>
          </div>

          {/* Chats Detail */}
          <div className="rounded-2xl border border-third/20  p-6 flex flex-col space-y-6 transition ">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-primary/10 rounded-lg text-primary">
                <MessageSquare size={20} />
              </div>
              <h3 className="font-bold text-lg tracking-tight">Chats</h3>
            </div>

            <div className="space-y-4 flex-1">
              <div className="flex justify-between items-center text-sm border-b border-third/5 pb-3">
                <span className="text-third font-medium">Started</span>
                <span className="font-bold text-base">18</span>
              </div>
              <div className="flex justify-between items-center text-sm border-b border-third/5 pb-3">
                <span className="text-third font-medium">Replied</span>
                <span className="font-bold text-base">16</span>
              </div>
              <div className="flex justify-between items-center text-sm pb-2">
                <span className="text-third font-medium">Pending</span>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-base">2</span>
                  <AlertTriangle size={16} className="text-orange-500" />
                </div>
              </div>

              <div className="bg-primary/10 border border-primary/20 p-3.5 rounded-xl flex items-center gap-3">
                <span className="text-xs font-bold text-primary uppercase tracking-wider">
                  Response Rate: 89%
                </span>
              </div>
            </div>

            <Button
              onClick={() => setIsDownloadOpen(true)}
              variant="outlineSecondary"
              className=" self-end"
            >
              Open Inbox
            </Button>
          </div>
        </div>

        {/* INVENTORY & INSPECTION */}
        {/* INVENTORY STATUS */}
        <div className="rounded-xl border border-third/30  p-6 space-y-6">
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
              <span className="text-third font-medium">Featured Vehicles(DD)</span>
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
            <div className="bg-white/5 border-l-2 border-green-500 p-3 rounded-r-lg">
              <p className="text-[10px] font-bold text-green-500 uppercase tracking-widest mb-0.5">
                Insight
              </p>
              <p className="text-xs text-white leading-relaxed">
                Listings with inspection are performing 30% better. Active
                vehicles are healthy, but 5 vehicles need attention to improve
                overall conversion.
              </p>
            </div>
            <Button
              href={"/consult/dashboard/inventory"}
              variant="ghost"
              className="self-end"
            >
              Manage Inventory
            </Button>
          </div>
        </div>

        {/* TOP PERFORMING LISTINGS + NEEDS ATTENTION */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* TOP PERFORMING LISTINGS */}
          <div className="rounded-xl border border-third/30  p-6 flex flex-col gap-4">
            <h3 className="font-semibold">Top Performing Listings</h3>

            <div className="flex-1 h-[380px] overflow-y-auto custom-scrollbar pr-1">
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
                  <div className="flex flex-col items-center justify-center h-full text-center py-8">
                    <p className="text-sm text-third">
                      No top performing vehicles yet.
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="pt-3 border-t border-third/10 self-end">
              <Button
                href={"/consult/dashboard/inventory"}
                variant="ghost"
                className="w-full"
              >
                View All
              </Button>
            </div>
          </div>

          {/* NEEDS ATTENTION */}
          <div className="rounded-xl border border-third/30  p-6 flex flex-col gap-4">
            <h3 className="font-semibold text-primary">Needs Attention</h3>

            <div className="flex-1 h-[380px] overflow-y-auto custom-scrollbar pr-1">
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
                  <div className="flex flex-col items-center justify-center h-full text-center py-8">
                    <p className="text-sm text-third">
                      No vehicles need attention.
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="pt-3 border-t border-amber-500/20 self-end">
              <Button
                href={"/consult/dashboard/inventory"}
                variant="outlineSecondary"
                className="w-full"
              >
                Improve Listing
              </Button>
            </div>
          </div>
        </div>

        {/* INSPECTION STATUS + VISIBILITY */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* INSPECTION STATUS */}
          <div className="rounded-xl border border-third/30 p-6 flex flex-col gap-5">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-primary/10 rounded-lg text-primary">
                <Shield size={20} />
              </div>
              <h3 className="font-bold text-lg tracking-tight">
                Inspection Status
              </h3>
            </div>

            <div className="flex flex-col gap-3 flex-1">
              <div className="flex justify-between items-center text-sm border-b border-third/10 pb-3">
                <span className="text-third font-medium">Inspected</span>
                <span className="font-bold text-base">9</span>
              </div>
              <div className="flex justify-between items-center text-sm pb-3">
                <span className="text-third font-medium">Not Inspected</span>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-base">19</span>
                  <AlertTriangle size={15} className="text-amber-400" />
                </div>
              </div>

              <div className="bg-primary/5 border border-primary/20 p-3 rounded-xl flex items-center gap-2">
                <TrendingUp size={15} className="text-green-500" />
                <span className="text-xs font-bold text-green-500">
                  +30% better performance
                </span>
              </div>
            </div>

            <div className="pt-3 border-t border-third/10 self-end">
              <Button
                href={"/consult/dashboard/inspection"}
                className=" bg-primary  text-secondary  hover:bg-transparent hover:text-white hover:border-primary "
              >
                Request Inspection
              </Button>
            </div>
          </div>

          {/* VISIBILITY */}
          <div className="rounded-xl border border-third/30 p-6 flex flex-col gap-5">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-primary/10 rounded-lg text-primary">
                <Eye size={20} />
              </div>
              <h3 className="font-bold text-lg tracking-tight">Visibility</h3>
            </div>

            <div className="flex flex-col gap-3 flex-1">
              <div className="flex justify-between items-center text-sm border-b border-third/10 pb-3">
                <span className="text-third font-medium">Featured</span>
                <span className="font-bold text-base">6</span>
              </div>
              <div className="flex justify-between items-center text-sm border-b border-third/10 pb-3">
                <span className="text-third font-medium">Boost Active</span>
                <span className="font-bold text-base">3</span>
              </div>
              <div className="flex justify-between items-center text-sm pb-3">
                <span className="text-third font-medium">Impressions</span>
                <span className="font-bold text-base">8,300</span>
              </div>
            </div>

            <div className="pt-3 border-t border-third/10 self-end">
              <Button
                href={"/consult/dashboard/ppc"}
                variant="outlineSecondary"
              >
                Manage Boost
              </Button>
            </div>
          </div>
        </div>

        {/* RECENT ACTIVITY */}
        <div className="rounded-xl border border-third/30    p-6 space-y-3">
          <h3 className="font-semibold">Recent Activity</h3>

          <Activity text="New inquiry on BMW X1" time="5m ago" />
          <Activity text="Vehicle marked sold: Honda City" time="2h ago" />
          <Activity text="Inspection completed: Baleno" time="4h ago" />
          <Activity
            text="Featured slot impression spike (+18%)"
            time="6h ago"
          />
        </div>

        {/* RECOMMENDED ACTIONS */}
        <div className="rounded-xl border border-primary/20  p-6 flex flex-col gap-5 transition-colors duration-200 ">
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
          <div className="flex flex-col divide-y divide-third/10">
            {/* Row 1 */}
            <button className="cursor-pointer flex items-center gap-4 py-3.5 group/row text-left hover:bg-white/2 transition px-1 rounded-lg">
              <div className="h-9 w-9 shrink-0 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                <Car size={18} />
              </div>
              <span className="flex-1 text-sm font-medium text-primary">
                Add more SUVs —{" "}
                <span className="text-blue-400 font-semibold">high demand</span>
              </span>
            </button>

            {/* Row 2 */}
            <button className="cursor-pointer flex items-center gap-4 py-3.5 group/row text-left hover:bg-white/2 transition px-1 rounded-lg">
              <div className="h-9 w-9 shrink-0 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                <BadgeDollarSign size={18} />
              </div>
              <span className="flex-1 text-sm font-medium text-primary">
                Reduce price for{" "}
                <span className="text-amber-400 font-semibold">1 listing</span>
              </span>
            </button>

            {/* Row 3 */}
            <button className="cursor-pointer flex items-center gap-4 py-3.5 group/row text-left hover:bg-white/2 transition px-1 rounded-lg">
              <div className="h-9 w-9 shrink-0 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                <Rocket size={18} />
              </div>
              <span className="flex-1 text-sm font-medium text-primary">
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
    <div className="space-y-8 animate-pulse">
      {/* HEADER SKELETON */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <SkeletonBox className="h-8 w-64" />
            <SkeletonBox className="h-6 w-32 rounded-full" />
          </div>
          <SkeletonBox className="h-4 w-48" />
        </div>
        <div className="flex items-center gap-3">
          <SkeletonBox className="h-10 w-44 rounded-xl" />
        </div>
      </div>

      {/* PERFORMANCE SNAPSHOT SKELETON */}
      <div className="rounded-xl border border-third/30 p-6 space-y-5">
        <SkeletonBox className="h-6 w-48" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCardSkeleton />
          <StatCardSkeleton />
          <StatCardSkeleton />
          <StatCardSkeleton />
        </div>
      </div>

      {/* RECOMMENDED ACTIONS SKELETON */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="rounded-2xl border border-third/20 p-6 space-y-4"
          >
            <div className="flex items-center gap-4">
              <SkeletonBox className="h-11 w-11 rounded-xl" />
              <SkeletonBox className="h-6 w-32" />
            </div>
            <SkeletonBox className="h-4 w-full" />
            <SkeletonBox className="h-10 w-full rounded-xl" />
          </div>
        ))}
      </div>

      {/* INQUIRIES & CHATS SKELETON */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {[...Array(2)].map((_, i) => (
          <div
            key={i}
            className="rounded-2xl border border-third/20 p-6 space-y-6"
          >
            <div className="flex items-center gap-3">
              <SkeletonBox className="h-10 w-10 rounded-lg" />
              <SkeletonBox className="h-6 w-24" />
            </div>
            <div className="space-y-4">
              <div className="flex justify-between pb-3 border-b border-third/5">
                <SkeletonBox className="h-4 w-16" />
                <SkeletonBox className="h-4 w-8" />
              </div>
              <div className="flex justify-between pb-3 border-b border-third/5">
                <SkeletonBox className="h-4 w-16" />
                <SkeletonBox className="h-4 w-8" />
              </div>
              <div className="flex justify-between">
                <SkeletonBox className="h-4 w-16" />
                <SkeletonBox className="h-4 w-8" />
              </div>
              <SkeletonBox className="h-12 w-full rounded-xl" />
            </div>
          </div>
        ))}
      </div>

      {/* INVENTORY STATUS SKELETON */}
      <div className="rounded-xl border border-third/30 p-6 space-y-6">
        <SkeletonBox className="h-5 w-40" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
          <div
            key={i}
            className="rounded-xl border border-third/30 p-6 space-y-4"
          >
            <SkeletonBox className="h-6 w-48" />
            <div className="space-y-3">
              <TopPerformingCardSkeleton />
              <TopPerformingCardSkeleton />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
