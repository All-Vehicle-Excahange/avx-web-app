"use client";
import StatCard from "./components/StateCard";
import {
  TrendingUp,
  Zap,
  Calendar,
  Car,
  MessageCircle,
  Tag,
  User,
  StoreIcon,
  SquareMousePointer,
  BadgePercent,
} from "lucide-react";
import { useEffect, useState } from "react";
import CustomSelect from "@/components/ui/custom-select";
import Button from "@/components/ui/button";
import { getSellerTierTitle } from "@/lib/helper";
import {
  getAnalyticsKips,
  getTrafficConversion,
} from "@/services/analytics.service";

export default function AnalyticsComponent() {
  const [range, setRange] = useState("7");
  const [tier, setTier] = useState(null);
  const [analyticsData, setAnalyticsData] = useState(null);
  const [trafficData, setTrafficData] = useState(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      let daysParam = "LAST_7_DAYS";
      if (range === "30") {
        daysParam = "LAST_30_DAYS";
      } else if (range === "90") {
        daysParam = "LAST_90_DAYS";
      }

      try {
        const [kpiRes, trafficRes] = await Promise.all([
          getAnalyticsKips(daysParam),
          getTrafficConversion(daysParam),
        ]);

        if (kpiRes.success) {
          setAnalyticsData(kpiRes.data);
        }
        if (trafficRes.success) {
          setTrafficData(trafficRes.data);
        }
      } catch (error) {
        console.error("Failed to fetch analytics:", error);
      }
    };

    fetchAnalytics();
  }, [range]);
  const isProOrPremium = tier === "PRO" || tier === "PREMIUM";
  const isBasic = tier === "BASIC";
  const isPro = tier === "PRO";

  useEffect(() => {
    setTier(getSellerTierTitle() || "BASIC");
  }, []);

  if (tier === null) return null;

  const rangeOptions = [
    { label: "Last 7 days", value: "7" },
    { label: "Last 30 days", value: "30" },
    { label: "Last 90 days", value: "90" },
  ];

  const performanceData = {
    7: {
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      percentages: [48, 60, 72, 56, 80, 88, 64],
      inquiries: [12, 15, 18, 14, 20, 22, 16],
    },
    30: {
      labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
      percentages: [60, 85, 75, 92],
      inquiries: [45, 68, 55, 82],
    },
    90: {
      labels: ["Jan", "Feb", "Mar"],
      percentages: [70, 95, 65],
      inquiries: [120, 180, 110],
    },
  };

  const currentPerformance = performanceData[range] || performanceData["7"];

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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
        <StatCard
          icon={<Car size={20} />}
          label="Vehicle Views"
          value={analyticsData?.totalVehicleView || 0}
          trend={analyticsData?.totalVehicleViewChange || 0}
        />
        <StatCard
          icon={<StoreIcon size={20} />}
          label="Storefront Visits"
          value={analyticsData?.totalProfileVisit || 0}
          trend={analyticsData?.totalProfileVisitChange || 0}
        />
        <StatCard
          icon={<SquareMousePointer size={20} />}
          label="Total Inquiries"
          value={analyticsData?.totalInquiry || 0}
          trend={analyticsData?.totalInquiryChange || 0}
        />
        <StatCard
          icon={<BadgePercent size={20} />}
          label="Conversion Rate"
          value={analyticsData?.conversionRate || 0}
          trend={analyticsData?.conversionRateChange || 0}
        />
      </div>
      {/* Traffic */}
      <div className=" border border-third/20 rounded-xl p-6 grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-8 shadow-sm transition-colors duration-200 hover:border-third/40">
        <div className="space-y-4">
          <h3 className="font-semibold text-white">Traffic & Conversion</h3>

          <div>
            <div className="flex justify-between text-xs text-third">
              <span>Inquiry Conversion Rate</span>
              <span>{trafficData?.inquiryConversionRate || 0}%</span>
            </div>
            <div className="h-2 bg-white/10 rounded-full mt-1">
              <div
                className="h-full bg-white rounded-full transition-all duration-500"
                style={{
                  width: `${Math.min(trafficData?.inquiryConversionRate || 0, 100)}%`,
                }}
              ></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs text-third">
              <span>Chat Conversion Rate</span>
              <span>{trafficData?.chatConversionRate || 0}%</span>
            </div>
            <div className="h-2 bg-white/10 rounded-full mt-1">
              <div
                className="h-full bg-white rounded-full transition-all duration-500"
                style={{
                  width: `${Math.min(trafficData?.chatConversionRate || 0, 100)}%`,
                }}
              ></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs text-third">
              <span>Visit to Inquiry Rate</span>
              <span>{trafficData?.visitToInquiryRate || 0}%</span>
            </div>
            <div className="h-2 bg-white/10 rounded-full mt-1">
              <div
                className="h-full bg-white rounded-full transition-all duration-500"
                style={{
                  width: `${Math.min(trafficData?.visitToInquiryRate || 0, 100)}%`,
                }}
              ></div>
            </div>
          </div>
        </div>

        <div className="bg-green-500/10 border border-green-400/20 rounded-xl p-4 text-green-300 text-sm">
          <b>Inspection Impact</b>

          <p className="text-xs mt-1 text-green-200">
            Vehicles with AVX inspection:
          </p>

          <ul className="text-xs mt-2 space-y-1 list-disc list-inside text-green-200">
            <li>+31% more inquiries</li>
            <li>+22% faster closure</li>
            <li>Higher buyer trust</li>
          </ul>

          <Button className="mt-4 px-4 py-2 rounded-lg bg-green-500/20 border border-green-400/30 text-green-200 text-xs font-semibold hover:bg-green-500/30 transition cursor-pointer">
            Inspect more vehicles
          </Button>
        </div>
      </div>
      {isProOrPremium && (
        <div className=" border border-third/20 rounded-xl p-6 space-y-4 shadow-sm transition-colors duration-200 hover:border-third/40">
          <h3 className="font-semibold text-white">Performance Overview</h3>

          {currentPerformance.labels.map((label, i) => (
            <div key={i} className="flex items-center gap-4">
              <span className="w-12 text-xs text-third">{label}</span>

              <div className="flex-1 h-3 bg-white/10 rounded-full">
                <div
                  className="h-full bg-fourth rounded-full transition-all duration-500"
                  style={{ width: `${currentPerformance.percentages[i]}%` }}
                ></div>
              </div>

              <span className="text-xs text-third w-20 text-right">
                {currentPerformance.inquiries[i]} inquiries
              </span>
            </div>
          ))}

          <p className="text-xs text-third pt-4 border-t border-third/20">
            <span className="text-primary font-semibold">Insight:</span> Demand
            peaks Fri–Sun. Boosting listings on weekends improves visibility.
          </p>

          {isPro && (
            <Button className="w-fit px-4 py-2 rounded-lg bg-primary/10 border border-primary/20 text-primary text-xs font-semibold hover:bg-primary/20 transition">
              Boost listings
            </Button>
          )}
        </div>
      )}
      <div
        className={`grid gap-6 ${isBasic ? "grid-cols-1" : "md:grid-cols-2"}`}
      >
        {/* ✅ Left: Demand Breakdown (Hide for BASIC) */}
        {!isBasic && (
          <div className=" border border-third/20 rounded-xl p-6 space-y-4 shadow-sm transition-colors duration-200 hover:border-third/40">
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
        )}

        {/* ✅ Right: City-wise Demand (Full Width for BASIC) */}
        <div className=" border border-third/20 rounded-xl p-6 space-y-4 shadow-sm transition-colors duration-200 hover:border-third/40">
          <h3 className="font-semibold text-white">City-wise Demand</h3>

          {["Ahmedabad", "Surat", "Vadodara"].map((city, i) => (
            <div key={city}>
              <div className="flex justify-between text-xs text-third">
                <span>{city}</span>
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
      <div className=" border border-primary/20 rounded-xl p-7 space-y-5 shadow-sm transition-colors duration-200 hover:border-fourth/40">
        <h3 className="font-semibold text-lg text-fourth">Key Insights</h3>

        <ul className="grid md:grid-cols-2 gap-4 text-sm">
          <li className="flex items-start gap-3">
            <TrendingUp className="text-fourth mt-0.5" size={18} />
            <span>
              <b className="text-white">Featured vehicles</b> perform{" "}
              <b>1.8× better</b> than normal listings.
            </span>
          </li>

          <li className="flex items-start gap-3">
            <Zap className="text-fourth mt-0.5" size={18} />
            <span>
              <b className="text-white">Fast responses</b> significantly improve
              your marketplace ranking.
            </span>
          </li>

          <li className="flex items-start gap-3">
            <Calendar className="text-fourth mt-0.5" size={18} />
            <span>
              <b className="text-white">Weekend traffic</b> is <b>23% higher</b>{" "}
              — best time to boost listings.
            </span>
          </li>

          <li className="flex items-start gap-3">
            <Car className="text-fourth mt-0.5" size={18} />
            <span>
              <b className="text-white">SUV demand</b> is trending upward across
              your city.
            </span>
          </li>

          <li className="flex items-start gap-3">
            <MessageCircle className="text-fourth mt-0.5" size={18} />
            <span>
              <b className="text-white">Chat-enabled listings</b> receive up to{" "}
              <b>35% more inquiries</b>.
            </span>
          </li>

          <li className="flex items-start gap-3">
            <Tag className="text-fourth mt-0.5" size={18} />
            <span>
              <b className="text-white">Competitive pricing</b> improves
              conversions by up to <b>19%</b>.
            </span>
          </li>
        </ul>
      </div>{" "}
      {/* Recommended Actions (Only BASIC Users) */}
      {isBasic && (
        <div className=" border border-blue-400/20 rounded-xl p-7 space-y-5 shadow-sm transition-colors duration-200 hover:border-blue-400/40">
          <h3 className="font-semibold text-lg text-blue-300">
            Recommended Actions
          </h3>

          <ul className="grid md:grid-cols-2 gap-4 text-sm">
            <li className="flex items-start gap-3">
              <TrendingUp className="text-blue-400 mt-0.5" size={18} />
              <span>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa,
                repellat. Adipisci
              </span>
            </li>

            <li className="flex items-start gap-3">
              <Zap className="text-blue-400 mt-0.5" size={18} />
              <span>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa,
                repellat. Adipisci
              </span>
            </li>

            <li className="flex items-start gap-3">
              <Calendar className="text-blue-400 mt-0.5" size={18} />
              <span>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa,
                repellat. Adipisci
              </span>
            </li>

            <li className="flex items-start gap-3">
              <Car className="text-blue-400 mt-0.5" size={18} />
              <span>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa,
                repellat. Adipisci
              </span>
            </li>

            <li className="flex items-start gap-3">
              <MessageCircle className="text-blue-400 mt-0.5" size={18} />
              <span>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa,
                repellat. Adipisci
              </span>
            </li>

            <li className="flex items-start gap-3">
              <Tag className="text-blue-400 mt-0.5" size={18} />
              <span>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa,
                repellat. Adipisci
              </span>
            </li>
          </ul>

          {/* ✅ CTA Buttons Bottom Right */}
          <div className="flex justify-end gap-3 pt-5 border-t border-third/20">
            <button className="px-4 py-2 rounded-lg border border-third/30 bg-primary/5 text-primary text-xs font-semibold hover:bg-primary/10 transition">
              Inspect 2 high-interest listings
            </button>

            <button className="px-4 py-2 rounded-lg border border-yellow-400/30 bg-yellow-400/10 text-yellow-300 text-xs font-semibold hover:bg-yellow-400/20 transition">
              Upgrade to Premium
            </button>
          </div>
        </div>
      )}
      {/* ✅ Recommended Actions (Only PRO + PREMIUM) */}
      {isProOrPremium && (
        <div className=" border border-third/20 rounded-xl p-7 space-y-5 shadow-sm transition-colors duration-200 hover:border-third/40">
          {/* Title */}
          <h3 className="font-semibold text-lg text-primary">
            Recommended Actions
          </h3>

          <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="rounded-xl border border-third/20 bg-primary/5 p-5 hover:bg-primary/10 transition cursor-pointer">
              <p className="text-sm font-semibold text-primary">
                Boost 3 top-performing vehicles
              </p>
              <p className="text-xs text-third mt-1">
                Increase weekend visibility instantly.
              </p>
            </div>

            <div className="rounded-xl border border-third/20 bg-primary/5 p-5 hover:bg-primary/10 transition cursor-pointer">
              <p className="text-sm font-semibold text-primary">
                Inspect 2 high-interest listings
              </p>
              <p className="text-xs text-third mt-1">
                Inspected vehicles close faster.
              </p>
            </div>

            <div className="rounded-xl border border-yellow-400/30 bg-yellow-400/5 p-5 hover:bg-yellow-400/10 transition cursor-pointer">
              <p className="text-sm font-semibold text-yellow-300">
                Upgrade to Premium for higher visibility
              </p>
              <p className="text-xs text-third mt-1">
                Get priority placement & more inquiries.
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
