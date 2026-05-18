/* eslint-disable react-hooks/set-state-in-effect */

"use client";

import { useState, useCallback, useEffect } from "react";
import {
  TrendingUp,
  MousePointerClick,
  Eye,
  Plus,
  SlidersHorizontal,
  X,
  Info,
  MoreHorizontal,
  ChevronDown,
  CheckCircle2,
  Heart,
  Clock,
  CircleDollarSign,
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
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useRouter } from "next/navigation";
import StatCard from "./components/StateCard";
import ResultsModal from "./components/ResultsModal";

// --- Mock Data ---
const audienceData = [
  { day: "M", value: 450, color: "#82ebd9" },
  { day: "T", value: 650, color: "#50d4be" },
  { day: "W", value: 520, color: "#82ebd9" },
  { day: "T", value: 750, color: "#26b29b" },
  { day: "F", value: 850, color: "#1c9682" },
  { day: "S", value: 980, color: "#10695b" },
  { day: "S", value: 800, color: "#1c9682" },
];

// --- Mock Recent Ads Data ---
const initialRecentAds = [
  {
    id: 1,
    title: "BMW X1 — 2023 xDrive20d",
    type: "Homepage featured CPC",
    rate: "₹4.50/click",
    placement: "Homepage featured",
    model: "CPC",
    impressions: "2,840",
    clicksLabel: "Clicks",
    clicksValue: "124",
    ctrLabel: "CTR",
    ctrValue: "4.4%",
    spent: "₹558",
    budget: "₹750/day",
    status: "Active",
    image: "/big_card_car.jpg",
  },
  {
    id: 2,
    title: "Mercedes C-Class — 2022 C200",
    type: "Search result CPI",
    rate: "₹18/inquiry",
    placement: "Search result",
    model: "CPI",
    impressions: "1,640",
    clicksLabel: "Inquiries",
    clicksValue: "12",
    ctrLabel: "INQ rate",
    ctrValue: "0.7%",
    spent: "₹216",
    budget: "₹400/day",
    status: "Active",
    image: "/big_card_car.jpg",
  },
  {
    id: 3,
    title: "Audi A4 — 2021 40 TFSI",
    type: "Consultant page CPC",
    rate: "₹3.20/click",
    placement: "Consultant page",
    model: "CPC",
    impressions: "980",
    clicksLabel: "Clicks",
    clicksValue: "61",
    ctrLabel: "CTR",
    ctrValue: "6.2%",
    spent: "₹195",
    budget: "₹300/day",
    status: "Paused",
    image: "/big_card_car.jpg",
  },
  {
    id: 4,
    title: "Toyota Fortuner — 2022 Legender",
    type: "Search result CPI",
    rate: "₹22/inquiry",
    placement: "Search result",
    model: "CPI",
    impressions: "3,120",
    clicksLabel: "Inquiries",
    clicksValue: "8",
    ctrLabel: "INQ rate",
    ctrValue: "0.3%",
    spent: "₹176",
    budget: "₹500/day",
    status: "Completed",
    image: "/big_card_car.jpg",
  },
];

export default function PpcComponent() {
  const [range, setRange] = useState("60");
  const [openCustomize, setOpenCustomize] = useState(false);
  const [tier, setTier] = useState(null);

  useEffect(() => {
    setTier(getSellerTierTitle() || "BASIC");
  }, []);

  // State for the new "View Results" modal
  const [showResults, setShowResults] = useState(false);
  const [selectedAd, setSelectedAd] = useState(null);

  // States for Recent Ads filtering
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredAds = initialRecentAds.filter((ad) => {
    if (activeFilter === "All") return true;
    if (activeFilter === "CPC" || activeFilter === "CPI") {
      return ad.model === activeFilter;
    }
    return ad.placement.toLowerCase().includes(activeFilter.toLowerCase());
  });

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

  const router = useRouter();

  const handleClick = () => {
    router.push("/consult/dashboard/ads/create");
  };

  const rangeOptions = [
    { label: "Last 7 days", value: "7" },
    { label: "Last 30 days", value: "30" },
    { label: "Last 60 days", value: "60" },
    { label: "Last 90 days", value: "90" },
  ];

  const toggleMetric = (key) =>
    setMetrics((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <section className="w-full space-y-8 relative">
      {/* HEADER */}
      <div className="flex flex-col lg:flex-row items-start gap-5 justify-between">
        <div>
          <h1 className="text-2xl font-bold">PPC & Visibility Boosts</h1>
          <p className="text-third text-sm">Dominance with guardrails</p>
        </div>
        {tier === "BASIC" ? (
          <Button size="sm" variant="outlineSecondary" disabled className="opacity-60 cursor-not-allowed flex items-center gap-1.5 border-third/30 text-third">
            <Lock size={14} /> Create New Boost (Premium)
          </Button>
        ) : (
          <Button onClick={handleClick} size="sm" variant="ghost">
            <Plus size={16} /> Create New Boost
          </Button>
        )}
      </div>

      {/* AD SUMMARY */}
      <div className="rounded-xl border border-third/30  p-6 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

          {/* Left Section */}
          <div>
            <h3 className="font-semibold">Advertising Summary</h3>
            <p className="text-xs text-third">
              ₹5.23K spent on 6 ads in the last 60 days
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
            value="12"
          />
          <StatCard icon={<Eye size={20} />} label="Speed Today" value="9" />
          <StatCard
            icon={<MousePointerClick size={20} />}
            label="Total Clicks"
            value="8"
          />
          <StatCard
            icon={<CheckCircle size={20} />}
            label="Avg.CPC"
            value="6"
          />
        </div>
      </div>

      {/* RECENT ADS */}
      <div className="rounded-xl border border-third/30 p-6 space-y-6">
        {/* Filter Controls Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/5 pb-4">
          <h3 className="font-semibold text-lg text-white">Recent ads</h3>
          
          <div className="flex gap-2 overflow-x-auto whitespace-nowrap scrollbar-hide max-w-full md:max-w-2xl py-1">
            {["All", "Homepage", "Search result", "Consultant page", "CPC", "CPI"].map((f) => (
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

        {/* Recent Ads List */}
        <div className="space-y-4">
          {filteredAds.length > 0 ? (
            filteredAds.map((ad) => (
              <RecentAdCard key={ad.id} ad={ad} onOpenResults={() => { setSelectedAd(ad); setShowResults(true); }} />
            ))
          ) : (
            <div className="py-8 text-center text-zinc-500 text-sm">
              No recent ads match your filter criteria.
            </div>
          )}
        </div>
      </div>

      {/* UNIFIED CAMPAIGN INSIGHTS & RECOMMENDATIONS */}
      <div className="rounded-xl border border-third/30 p-6 lg:p-8 space-y-8  backdrop-blur-sm shadow-sm transition-colors duration-200 hover:border-third/40">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT SIDE: Campaign Performance & Daily Impressions */}
          <div className="lg:col-span-7 space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-lg sm:text-xl text-white">Campaign performance</h3>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/10 text-xs sm:text-sm hover:bg-white/5 cursor-pointer transition-colors text-zinc-300">
                Last 7 days <ChevronDown size={14} />
              </div>
            </div>

            {/* Grid of 6 Metrics */}
            <div className="grid grid-cols-3 gap-6 pt-2">
              {/* Total impressions */}
              <div className="space-y-1">
                <span className="text-[11px] sm:text-xs text-zinc-400 block font-medium">Total impressions</span>
                <span className="text-xl sm:text-2xl font-bold text-white block">12,450</span>
                <span className="text-[10px] sm:text-xs text-emerald-400 flex items-center gap-1 font-medium">
                  ↑ 18% vs last week
                </span>
              </div>

              {/* Total clicks */}
              <div className="space-y-1">
                <span className="text-[11px] sm:text-xs text-zinc-400 block font-medium">Total clicks</span>
                <span className="text-xl sm:text-2xl font-bold text-white block">486</span>
                <span className="text-[10px] sm:text-xs text-emerald-400 flex items-center gap-1 font-medium">
                  ↑ 12% vs last week
                </span>
              </div>

              {/* Click-through rate */}
              <div className="space-y-1">
                <span className="text-[11px] sm:text-xs text-zinc-400 block font-medium">Click-through rate</span>
                <span className="text-xl sm:text-2xl font-bold text-white block">3.9%</span>
                <span className="text-[10px] sm:text-xs text-emerald-400 block font-medium">
                  Above industry avg
                </span>
              </div>

              {/* Total inquiries */}
              <div className="space-y-1">
                <span className="text-[11px] sm:text-xs text-zinc-400 block font-medium">Total inquiries</span>
                <span className="text-xl sm:text-2xl font-bold text-white block">20</span>
                <span className="text-[10px] sm:text-xs text-emerald-400 flex items-center gap-1 font-medium">
                  ↑ 5 vs last week
                </span>
              </div>

              {/* Inquiry rate */}
              <div className="space-y-1">
                <span className="text-[11px] sm:text-xs text-zinc-400 block font-medium">Inquiry rate</span>
                <span className="text-xl sm:text-2xl font-bold text-white block">0.16%</span>
                <span className="text-[10px] sm:text-xs text-zinc-500 block font-medium">
                  Benchmark: 0.2%
                </span>
              </div>

              {/* Total spend */}
              <div className="space-y-1">
                <span className="text-[11px] sm:text-xs text-zinc-400 block font-medium">Total spend</span>
                <span className="text-xl sm:text-2xl font-bold text-white block">₹1,145</span>
                <span className="text-[10px] sm:text-xs text-rose-400 flex items-center gap-1 font-medium">
                  ↑ ₹220 vs last week
                </span>
              </div>
            </div>

            {/* Daily Impressions Chart */}
            <div className="pt-4 border-t border-white/5 space-y-4">
              <h4 className="text-sm font-semibold text-zinc-300">Daily impressions</h4>
              <div className="w-full h-56 sm:h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={audienceData}
                    margin={{ top: 10, right: 10, left: 10, bottom: 5 }}
                    barCategoryGap="28%"
                  >
                    <XAxis
                      dataKey="day"
                      stroke="#555"
                      tick={{ fill: '#888', fontSize: 13, fontWeight: 600 }}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis hide />
                    <Tooltip
                      cursor={{ fill: 'rgba(255,255,255,0.03)' }}
                      contentStyle={{
                        backgroundColor: '#1a1a1a',
                        border: 'none',
                        borderRadius: '10px',
                        boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
                        padding: '10px 14px',
                      }}
                      itemStyle={{ color: '#ccc', fontSize: '12px' }}
                      labelStyle={{ color: '#fff', fontWeight: 600, marginBottom: '4px', fontSize: '13px' }}
                    />
                    <Bar
                      dataKey="value"
                      radius={[6, 6, 0, 0]}
                      name="Impressions"
                    >
                      {audienceData.map((entry, index) => (
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
              <h3 className="font-semibold text-lg sm:text-xl text-white">Boost recommendations</h3>
            </div>

            {/* Recommendations List */}
            <div className="space-y-4">
              {/* Recommendation 1 */}
              <div className="flex gap-3">
                <span className="w-6 h-6 flex items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold shrink-0 mt-0.5">
                  1
                </span>
                <div>
                  <p className="text-xs sm:text-sm font-semibold text-white">Your BMW X1 campaign is performing well</p>
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
                  <p className="text-xs sm:text-sm font-semibold text-white">Weekend traffic is 23% higher</p>
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
                  <p className="text-xs sm:text-sm font-semibold text-white">Feature your Mercedes C-Class on homepage</p>
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
                  <p className="text-xs sm:text-sm font-semibold text-white">Switch Fortuner to CPI billing</p>
                  <p className="text-[10px] sm:text-xs text-emerald-400 font-medium mt-0.5">
                    High impressions but low clicks — pay per inquiry instead
                  </p>
                </div>
              </div>
            </div>

            {/* Placement Performance Breakdown */}
            <div className="space-y-4 pt-6 border-t border-white/10">
              <div>
                <h4 className="font-semibold text-sm sm:text-base text-zinc-300">Placement performance breakdown</h4>
              </div>

              <div className="space-y-3.5">
                {/* Homepage */}
                <div className="flex items-center gap-4 group">
                  <span className="text-xs font-medium text-zinc-400 w-24 group-hover:text-white transition-colors shrink-0">Homepage</span>
                  <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden p-[1px]">
                    <div
                      className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all duration-1000 ease-out"
                      style={{ width: '72%' }}
                    />
                  </div>
                  <span className="text-xs font-bold text-zinc-300 group-hover:text-white transition-colors w-8 text-right shrink-0">72%</span>
                </div>

                {/* Search result */}
                <div className="flex items-center gap-4 group">
                  <span className="text-xs font-medium text-zinc-400 w-24 group-hover:text-white transition-colors shrink-0">Search result</span>
                  <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden p-[1px]">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all duration-1000 ease-out"
                      style={{ width: '54%' }}
                    />
                  </div>
                  <span className="text-xs font-bold text-zinc-300 group-hover:text-white transition-colors w-8 text-right shrink-0">54%</span>
                </div>

                {/* Consultant page */}
                <div className="flex items-center gap-4 group">
                  <span className="text-xs font-medium text-zinc-400 w-24 group-hover:text-white transition-colors shrink-0">Consultant page</span>
                  <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden p-[1px]">
                    <div
                      className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full transition-all duration-1000 ease-out"
                      style={{ width: '38%' }}
                    />
                  </div>
                  <span className="text-xs font-bold text-zinc-300 group-hover:text-white transition-colors w-8 text-right shrink-0">38%</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* CUSTOMIZE MODAL */}
      {(openCustomize || isClosingCustomize) && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          onClick={triggerCloseCustomize}
          style={{
            animation: isClosingCustomize
              ? 'modalBackdropOut 0.25s ease-in forwards'
              : 'modalBackdropIn 0.25s ease-out',
          }}
        >
          <div
            className="w-full max-w-md rounded-2xl bg-secondary border border-white/10 p-5 sm:p-6 space-y-4 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
            style={{
              animation: isClosingCustomize
                ? 'modalCardOut 0.25s ease-in forwards'
                : 'modalCardIn 0.3s ease-out',
            }}
          >
            {/* HEADER */}
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-base sm:text-lg">Customize Advertising Summary</h3>
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
        <ResultsModal onClose={triggerCloseResults} isClosing={isClosingResults} ad={selectedAd} />
      )}
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* SUB COMPONENTS                              */
/* -------------------------------------------------------------------------- */
function RecentAdCard({ ad, onOpenResults }) {
  const isPaused = ad.status === "Paused";
  const isActive = ad.status === "Active";

  // Custom colors for tags based on placement
  let tagClass = "bg-blue-500/10 text-blue-400";
  if (ad.placement === "Search result") {
    tagClass = "bg-emerald-500/10 text-emerald-400";
  } else if (ad.placement === "Consultant page") {
    tagClass = "bg-amber-500/10 text-amber-400";
  }

  // Custom colors for status
  let statusClass = "bg-zinc-500/10 text-zinc-300";
  if (isActive) {
    statusClass = "bg-emerald-500/10 text-emerald-400";
  } else if (isPaused) {
    statusClass = "bg-amber-500/10 text-amber-400";
  }

  const displayTitle = ad.placement === "Consultant page" ? "Adarsh Auto Consultant" : ad.title;

  return (
    <div 
      onClick={onOpenResults}
      className="flex flex-col md:flex-row justify-between items-start md:items-center py-5 border-b border-white/5 hover:bg-white/5 px-2 rounded-xl transition-all duration-200 cursor-pointer gap-6"
    >
      {/* Left side: Vehicle title, placement tag and billing info */}
      <div className="space-y-2 select-none">
        <h4 className="font-semibold text-sm sm:text-base text-white leading-tight">
          {displayTitle}
        </h4>
        <div className="flex items-center gap-2 flex-wrap">
          <span className={`px-2 py-0.5 rounded text-[11px] font-medium ${tagClass}`}>
            {ad.placement}
          </span>
          <span className="text-xs text-zinc-400 font-medium">
            {ad.model} · {ad.rate}
          </span>
        </div>
      </div>

      {/* Right side: Stats, Budget & Status Columns */}
      <div className="flex flex-wrap items-center gap-6 sm:gap-10 md:gap-12 w-full md:w-auto justify-between md:justify-end">
        
        {/* Stats Column 1, 2, 3 */}
        <div className="flex items-center gap-6 sm:gap-8 text-center">
          <div className="space-y-0.5 min-w-[70px]">
            <span className="text-sm sm:text-base font-bold text-white block">{ad.impressions}</span>
            <span className="text-[10px] text-zinc-500 block font-medium">Impressions</span>
          </div>

          <div className="space-y-0.5 min-w-[70px]">
            <span className="text-sm sm:text-base font-bold text-white block">{ad.clicksValue}</span>
            <span className="text-[10px] text-zinc-500 block font-medium">{ad.clicksLabel}</span>
          </div>

          <div className="space-y-0.5 min-w-[70px]">
            <span className="text-sm sm:text-base font-bold text-white block">{ad.ctrValue}</span>
            <span className="text-[10px] text-zinc-500 block font-medium">{ad.ctrLabel}</span>
          </div>
        </div>

        {/* Budget Column */}
        <div className="text-right min-w-[80px] space-y-0.5">
          <span className="text-sm sm:text-base font-bold text-white block">{ad.spent}</span>
          <span className="text-[11px] text-zinc-400 block font-medium">{ad.budget}</span>
        </div>

        {/* Status Column */}
        <div className="min-w-[90px] text-right sm:text-center">
          <span className={`px-3 py-1 rounded text-xs font-semibold inline-block ${statusClass}`}>
            {ad.status}
          </span>
        </div>

      </div>
    </div>
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

