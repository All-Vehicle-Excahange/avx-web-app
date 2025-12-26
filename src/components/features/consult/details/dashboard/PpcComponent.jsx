"use client";

import { useState } from "react";
import {
  TrendingUp,
  DollarSign,
  MousePointerClick,
  Percent,
  Eye,
  Pause,
  Settings,
  Plus,
  SlidersHorizontal,
  X,
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
        <Button variant="ghost">
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
          {metrics.views && (
            <Summary title="Views" value="61,064" change="-60.6%" down />
          )}
          {metrics.viewers && (
            <Summary title="Viewers" value="35,986" change="-40.2%" down />
          )}
          {metrics.postEngagements && (
            <Summary
              title="Post Engagements"
              value="17,302"
              change="+100%"
              up
            />
          )}
          {metrics.clicks && <Summary title="Link Clicks" value="45" />}
        </div>
      </div>

      {/* RECENT ADS */}
      <div className="rounded-2xl border border-third/30 bg-primary/5 p-6 space-y-6">
        <h3 className="font-semibold text-lg">Recent Ads</h3>
        <RecentAdCard />
        <RecentAdCard paused />
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
              <Tooltip />
              <Bar dataKey="women" fill="#22c55e" radius={[6, 6, 0, 0]} />
              <Bar dataKey="men" fill="#6366f1" radius={[6, 6, 0, 0]} />
              <Bar dataKey="unknown" fill="#0ea5e9" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* CUSTOMIZE MODAL */}
      {openCustomize && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl bg-secondary border border-third/30 p-6 space-y-4">
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
              <Button variant="outlineSecondary" size="sm" onClick={() => setOpenCustomize(false)}>
                Cancel
              </Button>
              <Button variant="ghost" size="sm" onClick={() => setOpenCustomize(false)}>
                Apply
              </Button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}


function Summary({ title, value, change, up, down }) {
  return (
    <div className="rounded-2xl border border-third/30 bg-secondary p-5 space-y-2">
      <div className="flex justify-between text-sm text-third">
        <span>{title}</span>
        {change && (
          <span className={up ? "text-green-400" : down ? "text-red-400" : ""}>
            {change}
          </span>
        )}
      </div>
      <p className="text-2xl font-bold">{value}</p>
      <Button variant="outlineSecondary" className="mt-2 text-xs" full>
        See more
      </Button>
    </div>
  );
}

function RecentAdCard({ paused }) {
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
          <Button variant="outlineSecondary" size="sm">
            View results
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr_auto] gap-6 items-start">
        <Image
          alt="card image"
          src="/big_card_car.jpg"
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
