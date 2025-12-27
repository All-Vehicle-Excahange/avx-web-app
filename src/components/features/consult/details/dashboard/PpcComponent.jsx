"use client";

import { useState } from "react";
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
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">PPC & Visibility Boosts</h1>
          <p className="text-third text-sm">Dominance with guardrails</p>
        </div>
        <Button onClick={handleClick} variant="ghost">
          <Plus size={16} /> Create New Boost
        </Button>
      </div>

      {/* AD SUMMARY */}
      <div className="rounded-2xl border border-third/30 bg-primary/5 p-6 space-y-5">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-semibold">Advertising Summary</h3>
            <p className="text-xs text-third">
              ₹5.23K spent on 6 ads in the last 60 days
            </p>
          </div>

          <div className="flex gap-3 w-72">
            <CustomSelect
              value={range}
              onChange={setRange}
              options={rangeOptions}
              placeholder="Select range"
              variant="transparent"
            />
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-14"
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
      <div className="rounded-2xl border border-third/30 bg-primary/5 p-6 space-y-6">
        <h3 className="font-semibold text-lg">Recent Ads</h3>
        {/* Pass the handler to open the modal */}
        <RecentAdCard onOpenResults={() => setShowResults(true)} />
        <RecentAdCard paused onOpenResults={() => setShowResults(true)} />
      </div>

      {/* AUDIENCE SECTION */}
      <div className="rounded-2xl border border-third/30 bg-primary/5 p-6 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div>
            <h3 className="font-semibold text-lg">Audience</h3>
            <p className="text-xs text-third">Post engagement</p>
            <p className="text-2xl font-bold mt-1">3.9K</p>
          </div>

          <div className="w-56">
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

        <div className="flex gap-4 text-sm">
          <button className="px-4 py-1 rounded-full bg-primary/10 text-primary">
            Age & Gender
          </button>
          <button className="px-4 py-1 rounded-full border border-third/30 hover:bg-primary/10">
            Placements
          </button>
          <button className="px-4 py-1 rounded-full border border-third/30 hover:bg-primary/10">
            Locations
          </button>
        </div>

        <div className="w-full h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={audienceData}>
              <XAxis dataKey="age" stroke="#888" />
              <YAxis />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#111",
                  border: "1px solid #333",
                }}
              />
              <Bar dataKey="women" fill="#22c55e" radius={[6, 6, 0, 0]} />
              <Bar dataKey="men" fill="#6366f1" radius={[6, 6, 0, 0]} />
              <Bar dataKey="unknown" fill="#0ea5e9" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* AI CAMPAIGN PERFORMANCE */}
      <div className="rounded-2xl border border-third/30 bg-secondary p-6 space-y-6">
        <h3 className="font-semibold text-lg">
          Campaign Performance (Last 7 Days)
        </h3>

        {/* Metric Cards */}
        <div className="grid md:grid-cols-3 gap-6">
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
      {openCustomize && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-2xl bg-black border border-white/10 p-6 space-y-4 shadow-2xl">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold">Customize Advertising Summary</h3>
              <button onClick={() => setOpenCustomize(false)}>
                <X size={18} />
              </button>
            </div>
            <p className="text-xs text-third">Show or hide metrics</p>
            <div className="space-y-2">
              {Object.entries(metrics).map(([key, val]) => (
                <label key={key} className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={val}
                    onChange={() => toggleMetric(key)}
                    className="accent-primary"
                  />
                  <span className="text-sm capitalize">
                    {key.replace(/([A-Z])/g, " $1")}
                  </span>
                </label>
              ))}
            </div>
            <div className="flex justify-end gap-3 pt-3">
              <Button
                variant="outlineSecondary"
                size="sm"
                onClick={() => setOpenCustomize(false)}
              >
                Cancel
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setOpenCustomize(false)}
              >
                Apply
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* RESULTS MODAL (THE NEW COMPONENT) */}
      {showResults && <ResultsModal onClose={() => setShowResults(false)} />}
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* SUB COMPONENTS                              */
/* -------------------------------------------------------------------------- */

function RecentAdCard({ paused, onOpenResults }) {
  return (
    <div className="rounded-2xl border border-third/30 bg-secondary p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <span
            className={`px-3 py-1 text-xs rounded-full ${
              paused
                ? "bg-yellow-500/20 text-yellow-400"
                : "bg-primary/10 text-primary"
            }`}
          >
            {paused ? "Paused" : "Completed"}
          </span>
          <span className="text-xs text-third">Dec 10</span>
        </div>

        <div className="flex gap-3">
          {paused ? (
            <Button variant="outlineSecondary" size="sm">
              Resume
            </Button>
          ) : (
            <>
              <Button variant="outlineSecondary" size="sm">
                Edit
              </Button>
              <Button variant="outlineSecondary" size="sm">
                Boost again
              </Button>
            </>
          )}
          <Button variant="outlineSecondary" size="sm" onClick={onOpenResults}>
            View results
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr_auto] gap-6 items-start">
        <Image
          alt="card image"
          src="/big_card_car.jpg" // Ensure this image exists in your public folder
          width={80}
          height={80}
          className="w-20 h-20 rounded-xl object-cover"
        />

        <div className="space-y-1">
          <p className="text-sm text-third">Boosted Instagram reel</p>
          <h4 className="font-semibold leading-tight">
            Boosted Instagram media
          </h4>
          <p className="text-xs text-third">
            Time to Act: Is Your Clinic Ready for Growth?...
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 text-sm">
            <StatMini label="Views" value="6,220" />
            <StatMini label="Viewers" value="5,761" />
            <StatMini label="Follows" value="8" />
            <StatMini label="Link Clicks" value="45" />
          </div>
        </div>

        <div className="text-right space-y-1">
          <p className="text-sm font-semibold">₹82.11</p>
          <p className="text-xs text-third">Spent at ₹200/day</p>
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

function ResultsModal({ onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
      {/* Container */}
      <div className="w-full max-w-5xl bg-[#09090b] border border-white/10 rounded-2xl shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <h2 className="text-xl font-bold">View results</h2>
          <div className="flex items-center gap-3">
            <Button variant="outlineSecondary" size="sm">
              Boost again
            </Button>
            <Button variant="outlineSecondary" size="icon">
              <MoreHorizontal size={18} />
            </Button>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X size={20} />
            </Button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-6">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
            {/* LEFT COLUMN: Performance */}
            <div className="space-y-6">
              {/* Header Section */}
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-lg">Performance</h3>
                    <Info size={14} className="text-zinc-500" />
                  </div>
                  <p className="text-sm text-zinc-400">
                    ₹82.11 spent over 2 days.
                  </p>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/10 text-sm hover:bg-white/5 cursor-pointer">
                  Lifetime <ChevronDown size={14} />
                </div>
              </div>

              {/* Metrics Grid (The gray cards in screenshot) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                <button className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-white/10 hover:bg-white/5 text-sm font-medium transition-colors">
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
              <div className="rounded-xl bg-[#121214] border border-white/10 p-5 space-y-4">
                <div className="space-y-1">
                  <h4 className="font-semibold text-sm">Ad rating</h4>
                  <p className="text-sm text-zinc-400">
                    Are you satisfied with this ad?
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <button className="py-2 rounded-lg border border-white/10 hover:bg-white/5 text-sm font-medium">
                    No
                  </button>
                  <button className="py-2 rounded-lg border border-white/10 hover:bg-white/5 text-sm font-medium">
                    Yes
                  </button>
                </div>
              </div>

              {/* Details Card */}
              <div className="rounded-xl bg-[#121214] border border-white/10 p-5 space-y-5">
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

                <button className="w-full flex items-center justify-center gap-2 py-2 mt-2 rounded-lg border border-white/10 hover:bg-white/5 text-sm transition-colors">
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
