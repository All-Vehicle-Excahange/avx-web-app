"use client";
import StatCard from "./components/StateCard";
import {
  TrendingUp,
  Zap,
  Calendar,
  Car,
  MessageCircle,
  Tag,
} from "lucide-react";
import { useState } from "react";
import CustomSelect from "@/components/ui/custom-select";

export default function AnalyticsComponent() {
  const [range, setRange] = useState("30");

  const rangeOptions = [
    { label: "Last 7 days", value: "7" },
    { label: "Last 30 days", value: "30" },
    { label: "Last 60 days", value: "60" },
    { label: "Last 90 days", value: "90" },
  ];

  return (
    <section className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white">Analytics</h2>
          <p className="text-sm text-third">
            Strategic insights to justify Premium pricing
          </p>
        </div>

        <div className="w-48">
          <CustomSelect
            value={range}
            onChange={setRange}
            options={rangeOptions}
            placeholder="Select range"
            variant="transparent"
          />
        </div>
      </div>

      {/* Top Stats */}
      <div className="grid md:grid-cols-4 gap-6">
        <StatCard label="Profile Views" value="2,180" change="+12.5%" />
        <StatCard label="Storefront Visits" value="1,420" change="+8.3%" />
        <StatCard label="Total Inquiries" value="86" change="+15.2%" />
        <StatCard label="Conversion Rate" value="6.1%" change="+1.2%" />
      </div>

      {/* Traffic */}
      <div className="bg-secondary border border-third/30 rounded-2xl p-6 grid md:grid-cols-[1fr_320px] gap-6">
        <div className="space-y-4">
          <h3 className="font-semibold text-white">Traffic & Conversion</h3>

          <div>
            <div className="flex justify-between text-xs text-third">
              <span>Inquiry Conversion Rate</span>
              <span>6.1%</span>
            </div>
            <div className="h-2 bg-white/10 rounded-full mt-1">
              <div className="h-full bg-white rounded-full w-[61%]"></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs text-third">
              <span>Chat Response Rate</span>
              <span>94%</span>
            </div>
            <div className="h-2 bg-white/10 rounded-full mt-1">
              <div className="h-full bg-white rounded-full w-[94%]"></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs text-third">
              <span>Visit to Inquiry Rate</span>
              <span>8.2%</span>
            </div>
            <div className="h-2 bg-white/10 rounded-full mt-1">
              <div className="h-full bg-white rounded-full w-[82%]"></div>
            </div>
          </div>
        </div>

        <div className="bg-green-500/10 border border-green-400/20 rounded-xl p-4 text-green-300 text-sm">
          <b>Inspection Impact</b>
          <p className="text-xs mt-1">
            Vehicles with AVX inspection convert significantly better.
          </p>
        </div>
      </div>

      {/* Weekly */}
      <div className="bg-secondary border border-third/30 rounded-2xl p-6 space-y-4">
        <h3 className="font-semibold text-white">Weekly Performance</h3>

        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d, i) => (
          <div key={i} className="flex items-center gap-4">
            <span className="w-10 text-xs text-third">{d}</span>
            <div className="flex-1 h-3 bg-white/10 rounded-full">
              <div
                className="h-full bg-purple-500 rounded-full"
                style={{ width: `${[48, 60, 72, 56, 80, 88, 64][i]}%` }}
              ></div>
            </div>
            <span className="text-xs text-third">
              {[12, 15, 18, 14, 20, 22, 16][i]} inquiries
            </span>
          </div>
        ))}
      </div>

      {/* Demand */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Breakdown */}
        <div className="bg-secondary border border-third/30 rounded-2xl p-6 space-y-4">
          <h3 className="font-semibold text-white">Demand Breakdown</h3>
          {["SUVs", 46, "Sedans", 32, "Luxury", 22].map(
            (v, i) =>
              i % 2 === 0 && (
                <div key={i}>
                  <div className="flex justify-between text-xs text-third">
                    <span>{v}</span>
                    <span>{["46%", "32%", "22%"][i / 2]}</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full mt-1">
                    <div
                      className="h-full bg-white rounded-full"
                      style={{ width: ["46%", "32%", "22%"][i / 2] }}
                    ></div>
                  </div>
                </div>
              ),
          )}
        </div>

        {/* City */}
        <div className="bg-secondary border border-third/30 rounded-2xl p-6 space-y-4">
          <h3 className="font-semibold text-white">City-wise Demand</h3>
          {["Ahmedabad", 58, "Surat", 25, "Vadodara", 17].map((v, i) => (
            <div key={i}>
              <div className="flex justify-between text-xs text-third">
                <span>{v}</span>
                <span>{[58, 25, 17][i]}%</span>
              </div>
              <div className="h-2 bg-white/10 rounded-full mt-1">
                <div
                  className="h-full bg-white rounded-full"
                  style={{ width: `${[58, 25, 17][i]}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Insights */}
      <div className="bg-secondary border border-purple-400/30 rounded-2xl p-7 space-y-5">
        <h3 className="font-semibold text-lg text-purple-300">Key Insights</h3>

        <ul className="grid md:grid-cols-2 gap-4 text-sm">
          <li className="flex items-start gap-3">
            <TrendingUp className="text-purple-400 mt-0.5" size={18} />
            <span>
              <b className="text-white">Featured vehicles</b> perform{" "}
              <b>1.8× better</b> than normal listings.
            </span>
          </li>

          <li className="flex items-start gap-3">
            <Zap className="text-purple-400 mt-0.5" size={18} />
            <span>
              <b className="text-white">Fast responses</b> significantly improve
              your marketplace ranking.
            </span>
          </li>

          <li className="flex items-start gap-3">
            <Calendar className="text-purple-400 mt-0.5" size={18} />
            <span>
              <b className="text-white">Weekend traffic</b> is <b>23% higher</b>{" "}
              — best time to boost listings.
            </span>
          </li>

          <li className="flex items-start gap-3">
            <Car className="text-purple-400 mt-0.5" size={18} />
            <span>
              <b className="text-white">SUV demand</b> is trending upward across
              your city.
            </span>
          </li>

          <li className="flex items-start gap-3">
            <MessageCircle className="text-purple-400 mt-0.5" size={18} />
            <span>
              <b className="text-white">Chat-enabled listings</b> receive up to{" "}
              <b>35% more inquiries</b>.
            </span>
          </li>

          <li className="flex items-start gap-3">
            <Tag className="text-purple-400 mt-0.5" size={18} />
            <span>
              <b className="text-white">Competitive pricing</b> improves
              conversions by up to <b>19%</b>.
            </span>
          </li>
        </ul>
      </div>
    </section>
  );
}
