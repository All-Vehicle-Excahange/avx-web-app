"use client";

import { useState, useCallback } from "react";
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
} from "lucide-react";
import Button from "@/components/ui/button";
import CustomSelect from "@/components/ui/custom-select";
import Image from "next/image";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useRouter } from "next/navigation";
import StatCard from "./components/StateCard";

// --- Mock Data ---
const audienceData = [
  { age: "18-24", women: 5, men: 10, unknown: 1 },
  { age: "25-34", women: 15, men: 22, unknown: 2 },
  { age: "35-44", women: 16, men: 14, unknown: 1 },
  { age: "45-54", women: 6, men: 5, unknown: 0.5 },
  { age: "55-64", women: 1.2, men: 1.5, unknown: 0.2 },
  { age: "65+", women: 0.5, men: 0.8, unknown: 0.1 },
];

export default function PpcComponent() {
  const [range, setRange] = useState("60");
  const [openCustomize, setOpenCustomize] = useState(false);

  // State for the new "View Results" modal
  const [showResults, setShowResults] = useState(false);

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
        <Button onClick={handleClick} size="sm" variant="ghost">
          <Plus size={16} /> Create New Boost
        </Button>
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
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-12 shrink-0 rounded-md"
              onClick={() => setOpenCustomize(true)}
            >
              <SlidersHorizontal size={16} />
            </Button>

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
      <div className="rounded-xl border border-third/30  p-6 space-y-6">
        <h3 className="font-semibold text-lg">Recent Ads</h3>
        {/* Pass the handler to open the modal */}
        <RecentAdCard onOpenResults={() => setShowResults(true)} />
        <RecentAdCard paused onOpenResults={() => setShowResults(true)} />
      </div>

      {/* AUDIENCE SECTION */}
      <div className="rounded-xl border border-third/30 p-4 sm:p-6 space-y-5 sm:space-y-6">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h3 className="font-semibold text-lg">Audience</h3>
            <p className="text-xs text-third">Post engagement</p>
            <p className="text-2xl font-bold mt-1">3.9K</p>
          </div>

          <div className="w-full sm:w-56">
            <CustomSelect
              value={range}
              onChange={setRange}
              variant="transparent"
              options={[
                { label: "Last 30 days", value: "30" },
                { label: "Last 60 days", value: "60" },
                { label: "Last 90 days", value: "90" },
                { label: "Lifetime", value: "life" },
              ]}
            />
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 sm:gap-3 text-sm overflow-x-auto scrollbar-hide pb-1">
          <button className="px-4 py-1.5 rounded-full bg-primary/10 text-primary whitespace-nowrap cursor-pointer transition-colors">
            Age & Gender
          </button>
          <button className="px-4 py-1.5 rounded-full border border-third/30 hover:bg-primary/10 hover:text-primary whitespace-nowrap cursor-pointer transition-colors">
            Placements
          </button>
          <button className="px-4 py-1.5 rounded-full border border-third/30 hover:bg-primary/10 hover:text-primary whitespace-nowrap cursor-pointer transition-colors">
            Locations
          </button>
        </div>

        {/* Chart */}
        <div className="w-full h-56 sm:h-64 md:h-72 -ml-2 sm:ml-0">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={audienceData}
              margin={{ top: 5, right: 5, left: -15, bottom: 0 }}
              barCategoryGap="20%"
              barGap={2}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(255,255,255,0.06)"
                vertical={false}
              />
              <XAxis
                dataKey="age"
                stroke="#555"
                tick={{ fill: '#888', fontSize: 12 }}
                tickLine={false}
                axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
              />
              <YAxis
                stroke="#555"
                tick={{ fill: '#888', fontSize: 12 }}
                tickLine={false}
                axisLine={false}
                width={35}
              />
              <Tooltip
                cursor={{ fill: 'rgba(255,255,255,0.04)' }}
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
              <Legend
                iconType="circle"
                iconSize={8}
                wrapperStyle={{ fontSize: '12px', color: '#888', paddingTop: '12px' }}
              />
              <Bar dataKey="women" fill="#22c55e" radius={[6, 6, 0, 0]} />
              <Bar dataKey="men" fill="#6366f1" radius={[6, 6, 0, 0]} />
              <Bar dataKey="unknown" fill="#0ea5e9" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* AI CAMPAIGN PERFORMANCE */}
      <div className="rounded-xl border border-third/30  p-6 space-y-6 shadow-sm transition-colors duration-200 hover:border-third/40">
        <h3 className="font-semibold text-lg">
          Campaign Performance (Last 7 Days)
        </h3>

        {/* Metric Cards */}
        <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="rounded-xl bg-purple-500/10 p-5 space-y-1">
            <div className="flex items-center justify-between text-purple-300">
              <span className="text-sm">Total Impressions</span>
              <Eye size={16} />
            </div>
            <p className="text-2xl font-bold text-white">12,450</p>
            <p className="text-xs text-purple-300">+18% from last week</p>
          </div>

          <div className="rounded-xl bg-blue-500/10 p-5 space-y-1">
            <div className="flex items-center justify-between text-blue-300">
              <span className="text-sm">Total Clicks</span>
              <MousePointerClick size={16} />
            </div>
            <p className="text-2xl font-bold text-white">486</p>
            <p className="text-xs text-blue-300">+12% from last week</p>
          </div>

          <div className="rounded-xl bg-green-500/10 p-5 space-y-1">
            <div className="flex items-center justify-between text-green-300">
              <span className="text-sm">Click-through Rate</span>
              <TrendingUp size={16} />
            </div>
            <p className="text-2xl font-bold text-white">3.9%</p>
            <p className="text-xs text-green-300">Above industry avg</p>
          </div>
        </div>

        {/* BOOST RECOMMENDATIONS */}
        <div className="rounded-xl bg-blue-500/10 border border-blue-500/20 p-6 space-y-4">
          <h4 className="font-semibold text-blue-300 flex items-center gap-2">
            💡 Boost Recommendations
          </h4>

          <div className="space-y-4 text-sm text-blue-100">
            <div className="flex gap-3">
              <span className="w-6 h-6 flex items-center justify-center rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold">
                1
              </span>
              <div>
                <p>
                  Your <b>BMW X1</b> campaign is performing well
                </p>
                <p className="text-xs text-blue-300">
                  Consider increasing daily budget to ₹750 for maximum reach
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <span className="w-6 h-6 flex items-center justify-center rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold">
                2
              </span>
              <div>
                <p>
                  Weekend traffic is <b>23% higher</b>
                </p>
                <p className="text-xs text-blue-300">
                  Schedule boosts for Friday–Sunday for better ROI
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <span className="w-6 h-6 flex items-center justify-center rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold">
                3
              </span>
              <div>
                <p>
                  Feature your <b>Mercedes C-Class</b>
                </p>
                <p className="text-xs text-blue-300">
                  Luxury vehicles convert 1.8× better when boosted
                </p>
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
        <ResultsModal onClose={triggerCloseResults} isClosing={isClosingResults} />
      )}
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* SUB COMPONENTS                              */
/* -------------------------------------------------------------------------- */
function RecentAdCard({ paused, onOpenResults }) {
  return (
    <div className="rounded-xl border border-third/30 p-4 md:p-6 space-y-5 shadow-sm transition-all duration-200 hover:border-third/40 bg-white/5 backdrop-blur-sm">

      {/* --- HEADER SECTION --- */}
      <div className="flex flex-col gap-3">

        {/* Top Row */}
        <div className="flex justify-between items-center gap-3">
          <div className="flex items-center gap-2">
            <span
              className={`px-3 py-1 text-xs rounded-full whitespace-nowrap ${paused
                ? "bg-yellow-500/20 text-yellow-400"
                : "bg-primary/10 text-primary"
                }`}
            >
              {paused ? "Paused" : "Completed"}
            </span>
            <span className="text-xs text-third">Dec 10</span>
          </div>
        </div>

        {/* Buttons Row → ALWAYS ONE LINE */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          {paused ? (
            <Button variant="outlineSecondary" size="sm" className="whitespace-nowrap shrink-0">
              Resume
            </Button>
          ) : (
            <>
              <Button variant="outlineSecondary" size="sm" className="whitespace-nowrap shrink-0">
                Edit
              </Button>
              <Button variant="outlineSecondary" size="sm" className="whitespace-nowrap shrink-0">
                Boost again
              </Button>
            </>
          )}
          <Button
            variant="outlineSecondary"
            size="sm"
            onClick={onOpenResults}
            className="whitespace-nowrap shrink-0"
          >
            View results
          </Button>
        </div>
      </div>

      {/* --- MAIN CONTENT --- */}
      <div className="flex flex-col sm:flex-row gap-4">

        {/* Image */}
        <div className="shrink-0">
          <Image
            alt="card image"
            src="/big_card_car.jpg"
            width={80}
            height={80}
            className="w-20 h-20 rounded-xl object-cover border border-third/10"
          />
        </div>

        {/* Content */}
        <div className="flex-1 space-y-2">
          <p className="text-xs text-third">Boosted Instagram reel</p>

          <h4 className="font-semibold text-sm sm:text-base leading-tight">
            Boosted Instagram media
          </h4>

          <p className="text-xs text-third line-clamp-2">
            Time to Act: Is Your Clinic Ready for Growth?...
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 text-sm">
            <StatMini label="Views" value="6,220" />
            <StatMini label="Viewers" value="5,761" />
            <StatMini label="Follows" value="8" />
            <StatMini label="Link Clicks" value="45" />
          </div>
        </div>

        {/* Pricing */}
        <div className="flex sm:flex-col justify-between sm:justify-start items-start sm:items-end text-sm border-t sm:border-none border-third/10 pt-3 sm:pt-0">
          <p className="text-base font-semibold text-primary sm:text-inherit">
            ₹82.11
          </p>
          <p className="text-xs text-third">
            Spent at ₹200/day
          </p>
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

/* -------------------------------------------------------------------------- */
/* NEW RESULTS MODAL                               */
/* -------------------------------------------------------------------------- */

function ResultsModal({ onClose, isClosing }) {
  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-3 sm:p-4"
      onClick={onClose}
      style={{
        animation: isClosing
          ? 'modalBackdropOut 0.25s ease-in forwards'
          : 'modalBackdropIn 0.25s ease-out',
      }}
    >
      {/* Container */}
      <div
        className="w-full max-w-5xl bg-secondary border border-white/10 rounded-2xl shadow-2xl flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
        style={{
          animation: isClosing
            ? 'modalCardOut 0.25s ease-in forwards'
            : 'modalCardIn 0.3s ease-out',
        }}
      >
        {/* Header */}
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-white/10">
          <h2 className="text-lg sm:text-xl font-bold">View results</h2>

          <div className="flex items-center gap-2 sm:gap-3">

            {/* Mobile Layout */}
            <div className="flex sm:hidden items-center gap-2">
              <Button
                variant="outlineSecondary"
                size="sm"
                className="h-8 px-3 text-xs"
              >
                Boost again
              </Button>

              <Button
                variant="outlineSecondary"
                size="icon"
                className="h-8 w-8"
              >
                <MoreHorizontal size={16} />
              </Button>
            </div>

            {/* Desktop Layout (unchanged) */}
            <Button
              variant="outlineSecondary"
              size="sm"
              className="cursor-pointer hidden sm:inline-flex"
            >
              Boost again
            </Button>

            <Button
              variant="outlineSecondary"
              size="icon"
              className="cursor-pointer p-1 hidden sm:inline-flex"
            >
              <MoreHorizontal size={20} />
            </Button>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="bg-white cursor-pointer p-1 rounded-full hover:opacity-70 text-secondary transition-opacity"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-4 sm:p-6 custom-scrollbar">

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
            {/* LEFT COLUMN: Performance */}
            <div className="space-y-6">
              {/* Header Section */}
              <div className="flex flex-col sm:flex-row justify-between items-start gap-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-lg">Performance</h3>
                    <Info size={14} className="text-zinc-500" />
                  </div>
                  <p className="text-sm text-zinc-400">
                    ₹82.11 spent over 2 days.
                  </p>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/10 text-sm hover:bg-white/5 cursor-pointer transition-colors">
                  Lifetime <ChevronDown size={14} />
                </div>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <MetricBox label="Link clicks" value="45" />
                <MetricBox label="Cost per Link Click" value="₹1.82" />
                <MetricBox label="Views" value="6,220" />
                <MetricBox label="Viewers" value="5,761" />
              </div>

              {/* Activity Section */}
              <div className="space-y-4 pt-4">
                <h4 className="text-zinc-400 text-sm font-medium">Activity</h4>
                <div className="space-y-4">
                  <ActivityRow label="3-second video plays" />
                  <ActivityRow label="Link clicks" />
                  <ActivityRow label="Post reactions" />
                  <ActivityRow label="Follows" />
                </div>
                <button className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-white/10 hover:bg-white/5 text-sm font-medium transition-colors cursor-pointer">
                  See all <ChevronDown size={14} />
                </button>
              </div>

              {/* Audience Placeholder */}
              <div className="pt-4 border-t border-white/10">
                <h4 className="font-semibold mb-2">Audience</h4>
                <div className="h-32 bg-white/5 rounded-xl flex items-center justify-center text-zinc-500 text-sm border border-white/5">
                  Audience Demographics Chart
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Sidebar */}
            <div className="space-y-6">
              {/* Ad Rating Card */}
              <div className="rounded-xl bg-[#121214] border border-white/10 p-4 sm:p-5 space-y-4">
                <div className="space-y-1">
                  <h4 className="font-semibold text-sm">Ad rating</h4>
                  <p className="text-sm text-zinc-400">
                    Are you satisfied with this ad?
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <button className="py-2 rounded-lg border border-white/10 hover:bg-white/5 text-sm font-medium cursor-pointer transition-colors">
                    No
                  </button>
                  <button className="py-2 rounded-lg border border-white/10 hover:bg-white/5 text-sm font-medium cursor-pointer transition-colors">
                    Yes
                  </button>
                </div>
              </div>

              {/* Details Card */}
              <div className="rounded-xl bg-[#121214] border border-white/10 p-4 sm:p-5 space-y-5">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-base">Details</h4>
                </div>

                <div className="space-y-5">
                  <DetailRow
                    icon={<CheckCircle2 size={18} className="text-zinc-400" />}
                    label="Status"
                    value="Completed"
                  />
                  <div className="h-px bg-white/5" />

                  <DetailRow
                    icon={<Heart size={18} className="text-zinc-400" />}
                    label="Goal"
                    value="Get more profile visits"
                  />
                  <div className="h-px bg-white/5" />

                  <DetailRow
                    icon={
                      <CircleDollarSign size={18} className="text-zinc-400" />
                    }
                    label="Daily budget"
                    value="₹200.00"
                  />
                  <div className="h-px bg-white/5" />

                  <DetailRow
                    icon={<Clock size={18} className="text-zinc-400" />}
                    label="Duration"
                    value="2 days"
                  />
                </div>

                <button className="w-full flex items-center justify-center gap-2 py-2 mt-2 rounded-lg border border-white/10 hover:bg-white/5 text-sm transition-colors cursor-pointer">
                  See all <ChevronDown size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper for the gray metric boxes in the modal
function MetricBox({ label, value }) {
  return (
    <div className="bg-[#18181b] p-4 rounded-xl flex flex-col justify-between h-24 border border-white/5">
      <div className="flex items-center justify-between text-zinc-400">
        <span className="text-xs font-medium">{label}</span>
        <Info size={12} />
      </div>
      <span className="text-xl font-bold">{value}</span>
    </div>
  );
}

// Helper for Activity rows
function ActivityRow({ label }) {
  return (
    <div className="flex items-center justify-between text-sm group cursor-pointer">
      <span className="text-zinc-300">{label}</span>
      {/* Visual placeholder for the bar/graph usually seen here, hidden initially */}
      <div className="w-32 h-2 bg-white/5 rounded-full overflow-hidden">
        <div className="h-full bg-blue-500/50 w-1/2"></div>
      </div>
    </div>
  );
}

// Helper for Details rows
function DetailRow({ icon, label, value }) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5">{icon}</div>
      <div>
        <p className="text-xs text-zinc-500 mb-0.5">{label}</p>
        <p className="text-sm font-medium">{value}</p>
      </div>
    </div>
  );
}
