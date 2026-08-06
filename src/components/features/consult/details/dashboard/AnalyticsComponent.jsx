/* eslint-disable react-hooks/set-state-in-effect */
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
  Lock,
  BarChart3,
  MapPin,
} from "lucide-react";
import { useEffect, useState } from "react";
import CustomSelect from "@/components/ui/custom-select";
import Button from "@/components/ui/button";
import { getSellerTierTitle } from "@/lib/helper";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getAnalyticsKipsQuery,
  getTrafficConversionQuery,
  getWeeklyAnalyticsQuery,
  getSubTypeDemandBreakdownQuery,
  getCityDemandBreakdownQuery,
  getKeyInsightsQuery,
} from "@/queries/analytics.queries";
import AnalyticsSkeleton from "@/components/ui/skeleton/AnalyticsSkeleton";
import UpgradeTierPopup from "./components/UpgradeTierPopup";

export default function AnalyticsComponent() {
  const [range, setRange] = useState("7");
  const [tier, setTier] = useState(null);
  const [isUpgradeTierOpen, setIsUpgradeTierOpen] = useState(false);

  const queryClient = useQueryClient();

  const daysParam =
    range === "30"
      ? "LAST_30_DAYS"
      : range === "90"
        ? "LAST_90_DAYS"
        : "LAST_7_DAYS";

  const isProOrPremium = tier === "PRO" || tier === "PREMIUM";
  const isBasic = tier === "BASIC";
  const isPro = tier === "PRO";

  const { data: analyticsData, isFetching: kpisLoading } = useQuery(
    getAnalyticsKipsQuery(daysParam),
  );
  const { data: trafficData, isFetching: trafficLoading } = useQuery(
    getTrafficConversionQuery(daysParam),
  );
  const { data: weeklyData = [], isFetching: weeklyLoading } = useQuery(
    getWeeklyAnalyticsQuery(daysParam),
  );
  const { data: demandBreakdown = [], isFetching: demandLoading } = useQuery(
    getSubTypeDemandBreakdownQuery(daysParam),
  );
  const { data: cityDemand = [], isFetching: cityLoading } = useQuery({
    ...getCityDemandBreakdownQuery(daysParam),
    enabled: isProOrPremium,
  });
  const { data: insights = [], isFetching: insightsLoading } = useQuery(
    getKeyInsightsQuery(daysParam),
  );

  const isLoading =
    kpisLoading ||
    trafficLoading ||
    weeklyLoading ||
    demandLoading ||
    cityLoading ||
    insightsLoading;

  const handleRangeChange = (newRange) => {
    setRange(newRange);
    let targetDaysParam = "LAST_7_DAYS";
    if (newRange === "30") {
      targetDaysParam = "LAST_30_DAYS";
    } else if (newRange === "90") {
      targetDaysParam = "LAST_90_DAYS";
    }

    queryClient.invalidateQueries({
      queryKey: ["analytics-kips", targetDaysParam],
    });
    queryClient.invalidateQueries({
      queryKey: ["analytics-traffic-conversion", targetDaysParam],
    });
    queryClient.invalidateQueries({
      queryKey: ["analytics-weekly-performance", targetDaysParam],
    });
    queryClient.invalidateQueries({
      queryKey: ["analytics-subtype-demand-breakdown", targetDaysParam],
    });
    queryClient.invalidateQueries({
      queryKey: ["analytics-city-demand-breakdown", targetDaysParam],
    });
    queryClient.invalidateQueries({
      queryKey: ["analytics-key-insights", targetDaysParam],
    });
  };

  useEffect(() => {
    setTier(getSellerTierTitle() || "BASIC");
  }, []);

  if (tier === null) return null;
  const rangeOptions = [
    { label: "Last 7 days", value: "7" },
    { label: "Last 30 days", value: "30" },
    { label: "Last 90 days", value: "90" },
  ];

  const getProcessedWeeklyData = () => {
    if (!weeklyData || weeklyData.length === 0)
      return { labels: [], inquiries: [], percentages: [] };

    const maxInquiries =
      Math.max(...weeklyData.map((d) => d.totalInquires || 0), 0) + 6;

    // Get month names for Range 90
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const now = new Date();
    const lastThreeMonths = [
      months[(now.getMonth() - 2 + 12) % 12],
      months[(now.getMonth() - 1 + 12) % 12],
      months[now.getMonth()],
    ];

    return {
      labels: weeklyData.map((item) => {
        const day = item.day || "";
        if (range === "30" && day.startsWith("week")) {
          return day.replace("week", "Week ");
        }
        if (range === "90" && day.startsWith("month")) {
          const mIndex = parseInt(day.replace("month", "")) - 1;
          return lastThreeMonths[mIndex] || day;
        }
        return day; // Default for days (7 range)
      }),
      inquiries: weeklyData.map((item) => item.totalInquires || 0),
      percentages: weeklyData.map(
        (item) => ((item.totalInquires || 0) / maxInquiries) * 100,
      ),
    };
  };

  const getProcessedDemandData = () => {
    if (!demandBreakdown || demandBreakdown.length === 0) return [];

    const sortedData = [...demandBreakdown].sort(
      (a, b) => (b.demandPercentage || 0) - (a.demandPercentage || 0),
    );

    let displayData = sortedData.slice(0, 6);

    if (sortedData.length > 6) {
      const otherSum = sortedData
        .slice(6)
        .reduce((acc, curr) => acc + (curr.demandPercentage || 0), 0);
      if (otherSum > 0) {
        displayData.push({
          subtype: "Other",
          demandPercentage: otherSum,
        });
      }
    }

    return displayData;
  };

  const getProcessedCityData = () => {
    if (!cityDemand || cityDemand.length === 0) return [];

    let unknownPercentage = 0;
    const filteredData = cityDemand.filter((item) => {
      if ((item.subtype || "").toLowerCase() === "unknown") {
        unknownPercentage += item.demandPercentage || 0;
        return false;
      }
      return true;
    });

    const sortedData = filteredData.sort(
      (a, b) => (b.demandPercentage || 0) - (a.demandPercentage || 0),
    );

    let displayData = sortedData.slice(0, 9);
    const remainder = sortedData.slice(9);

    const otherSum =
      remainder.reduce((acc, curr) => acc + (curr.demandPercentage || 0), 0) +
      unknownPercentage;

    if (otherSum > 0) {
      displayData.push({
        subtype: "Other",
        demandPercentage: otherSum,
      });
    }

    return displayData;
  };

  const getProcessedInsights = () => {
    const staticInsights = [
      {
        icon: <TrendingUp className="text-fourth mt-0.5" size={18} />,
        text: (
          <span>
            <b className="text-white">Featured vehicles</b> perform{" "}
            <b>1.8× better</b> than normal listings.
          </span>
        ),
      },
      {
        icon: <Zap className="text-fourth mt-0.5" size={18} />,
        text: (
          <span>
            <b className="text-white">Fast responses</b> significantly improve
            your marketplace ranking.
          </span>
        ),
      },
      {
        icon: <Calendar className="text-fourth mt-0.5" size={18} />,
        text: (
          <span>
            <b className="text-white">Weekend traffic</b> is <b>23% higher</b> —
            best time to boost listings.
          </span>
        ),
      },
      {
        icon: <Car className="text-fourth mt-0.5" size={18} />,
        text: (
          <span>
            <b className="text-white">SUV demand</b> is trending upward across
            your city.
          </span>
        ),
      },
      {
        icon: <MessageCircle className="text-fourth mt-0.5" size={18} />,
        text: (
          <span>
            <b className="text-white">Chat-enabled listings</b> receive up to{" "}
            <b>35% more inquiries</b>.
          </span>
        ),
      },
      {
        icon: <Tag className="text-fourth mt-0.5" size={18} />,
        text: (
          <span>
            <b className="text-white">Competitive pricing</b> improves
            conversions by up to <b>19%</b>.
          </span>
        ),
      },
    ];

    const iconMap = {
      WEEKDAY_TRAFFIC: <Calendar className="text-fourth mt-0.5" size={18} />,
      WEEKEND_TRAFFIC: <Calendar className="text-fourth mt-0.5" size={18} />,
      FEATURE_PERFORMANCE: (
        <TrendingUp className="text-fourth mt-0.5" size={18} />
      ),
      RESPONSE_TIME: <Zap className="text-fourth mt-0.5" size={18} />,
      CATEGORY_DEMAND: <Car className="text-fourth mt-0.5" size={18} />,
      CHAT_ENGAGEMENT: (
        <MessageCircle className="text-fourth mt-0.5" size={18} />
      ),
      PRICING_STRATEGY: <Tag className="text-fourth mt-0.5" size={18} />,
    };

    const dynamicInsights = insights.slice(0, 2).map((item) => ({
      icon: iconMap[item.type] || (
        <TrendingUp className="text-fourth mt-0.5" size={18} />
      ),
      text: <span>{item.insightText}</span>,
    }));

    const finalInsights = [...staticInsights];
    dynamicInsights.forEach((item, idx) => {
      finalInsights[idx] = item;
    });

    return finalInsights;
  };

  const currentPerformance = getProcessedWeeklyData();
  const currentDemand = getProcessedDemandData();
  const currentCityDemand = getProcessedCityData();
  const currentInsights = getProcessedInsights();

  return (
    <section className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white">Analytics</h2>
          <p className="text-sm text-third">
            Track performance, identify opportunities, and grow your business
          </p>
        </div>

        <div className="w-48">
          <CustomSelect
            value={range}
            onChange={handleRangeChange}
            options={rangeOptions}
            placeholder="Select range"
            variant="transparent"
          />
        </div>
      </div>

      {isLoading ? (
        <AnalyticsSkeleton isBasic={isBasic} />
      ) : (
        <>
          {/* Top Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
            <StatCard
              icon={<Car size={20} />}
              label="Vehicle Views"
              value={analyticsData?.totalVehicleView || 0}
              trend={analyticsData?.totalVehicleViewChange}
            />
            <StatCard
              icon={<StoreIcon size={20} />}
              label="Storefront Visits"
              value={analyticsData?.totalProfileVisit || 0}
              trend={analyticsData?.totalProfileVisitChange}
            />
            <StatCard
              icon={<SquareMousePointer size={20} />}
              label="Total Inquiries"
              value={analyticsData?.totalInquiry || 0}
              trend={analyticsData?.totalInquiryChange}
            />
            <StatCard
              icon={<BadgePercent size={20} />}
              label="Conversion Rate"
              value={analyticsData?.conversionRate || 0}
              trend={analyticsData?.conversionRateChange}
            />
          </div>
          {/* Traffic */}
          <div className="bg-primary/5 rounded-xl p-6 grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-8 shadow-sm transition-colors duration-200">
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
                Vehicles with Reecomm inspection:
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
          <div className="bg-primary/5 rounded-xl p-6 space-y-4 shadow-sm transition-colors duration-200">
            <h3 className="font-semibold text-white">Performance Overview</h3>

            {currentPerformance.labels.length > 0 ? (
              currentPerformance.labels.map((label, i) => (
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
              ))
            ) : (
              <div className="text-xs text-third italic py-4">
                No performance data available for this range.
              </div>
            )}

            <p className="text-xs text-third pt-4 border-t border-third/20">
              <span className="text-primary font-semibold">Insight:</span>{" "}
              Demand peaks Fri–Sun. Boosting listings on weekends improves
              visibility.
            </p>

            {isPro && (
              <Button className="w-fit px-4 py-2 rounded-lg bg-primary/10 border border-primary/20 text-primary text-xs font-semibold hover:bg-primary/20 transition">
                Boost listings
              </Button>
            )}
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {/* ✅ Demand Breakdown (Show for everyone now as per request for basic) */}
            <div className="bg-primary/5 rounded-xl p-6 space-y-4 shadow-sm transition-colors duration-200">
              <h3 className="font-semibold text-white">Demand Breakdown</h3>

              {currentDemand.length > 0 ? (
                <div
                  className={`space-y-4 ${
                    currentDemand.length > 4
                      ? "max-h-[320px] overflow-y-auto custom-scrollbar pr-2"
                      : ""
                  }`}
                >
                  {currentDemand.map((item, i) => (
                    <div key={item.subtype || i}>
                      <div className="flex justify-between text-xs text-third">
                        <span>{(item.subtype || "").replace(/_/g, " ")}</span>
                        <span>
                          {parseFloat(item.demandPercentage || 0).toFixed(1)}%
                        </span>
                      </div>

                      <div className="h-2 bg-white/10 rounded-full mt-1">
                        <div
                          className="h-full bg-white rounded-full transition-all duration-500"
                          style={{
                            width: `${Math.min(item.demandPercentage || 0, 100)}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center text-center space-y-3 py-2">
                  <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-1">
                    <Car size={20} strokeWidth={2} />
                  </div>
                  <div className="space-y-1 max-w-xs">
                    <p className="text-sm font-semibold text-white">
                      No demand data yet
                    </p>
                    <p className="text-xs text-third leading-relaxed">
                      Once your listings start receiving inquiries, this section
                      will show which vehicle categories &mdash; SUV, Sedan,
                      Hatchback, MUV, and more &mdash; are getting the most
                      interest from buyers.
                    </p>
                  </div>
                  <div className="pt-3 border-t border-white/10 space-y-2 w-full text-left">
                    <p className="text-[11px] font-bold tracking-wider text-third uppercase">
                      WHAT YOU'LL SEE HERE
                    </p>
                    <ul className="text-xs text-white/80 space-y-1.5 list-disc list-inside">
                      <li>Inquiry count by vehicle type</li>
                      <li>Which categories are trending</li>
                      <li>Where your inventory has gaps</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>

            {/* ✅ City-wise Demand (Locked for BASIC, Unlocked for PRO/PREMIUM) */}
            <div className="relative bg-primary/5 rounded-xl p-6 space-y-4 shadow-sm transition-colors duration-200 overflow-hidden">
              {isBasic && (
                <div
                  onClick={() => setIsUpgradeTierOpen(true)}
                  className="absolute inset-0 z-10 bg-black/75 backdrop-blur-[2px] flex flex-col items-center justify-center text-center p-4 cursor-pointer group"
                >
                  <div className="flex flex-col items-center gap-2.5 max-w-[280px]">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                      <Lock size={18} />
                    </div>
                    <h4 className="font-semibold text-white text-sm">
                      City-wise Demand
                    </h4>
                    <p className="text-xs text-third leading-relaxed">
                      Upgrade to Pro or Premium to unlock detailed city-wise
                      demand analytics for your listings.
                    </p>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsUpgradeTierOpen(true);
                      }}
                      className="mt-2 px-4 py-2 w-full rounded-lg border border-yellow-400/30 bg-yellow-400/10 text-yellow-300 text-xs font-semibold hover:bg-yellow-400/20 transition cursor-pointer"
                    >
                      Upgrade to Pro
                    </button>
                  </div>
                </div>
              )}
              <h3 className="font-semibold text-white">City-wise Demand</h3>

              {currentCityDemand.length > 0 ? (
                <div
                  className={`space-y-4 ${
                    currentCityDemand.length > 4
                      ? "max-h-[320px] overflow-y-auto custom-scrollbar pr-2"
                      : ""
                  }`}
                >
                  {currentCityDemand.map((item, i) => (
                    <div key={item.city || i}>
                      <div className="flex justify-between text-xs text-third">
                        <span>{item.city}</span>
                        <span>
                          {parseFloat(item.demandPercentage || 0).toFixed(1)}%
                        </span>
                      </div>

                      <div className="h-2 bg-white/10 rounded-full mt-1">
                        <div
                          className="h-full bg-white rounded-full transition-all duration-500"
                          style={{
                            width: `${Math.min(item.demandPercentage || 0, 100)}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center text-center space-y-3 py-2">
                  <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-1">
                    <MapPin size={20} strokeWidth={2} />
                  </div>
                  <div className="space-y-1 max-w-xs">
                    <p className="text-sm font-semibold text-white">
                      No city data yet
                    </p>
                    <p className="text-xs text-third leading-relaxed">
                      As buyers from different cities inquire about your
                      listings, this section will show exactly which cities are
                      driving the most interest &mdash; so you know where your
                      buyers are coming from.
                    </p>
                  </div>
                  <div className="pt-3 border-t border-white/10 space-y-2 w-full text-left">
                    <p className="text-[11px] font-bold tracking-wider text-third uppercase">
                      WHAT YOU'LL SEE HERE
                    </p>
                    <ul className="text-xs text-white/80 space-y-1.5 list-disc list-inside">
                      <li>Inquiries received per city</li>
                      <li>Your highest demand locations</li>
                      <li>Which cities to target more</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
          {/* Insights */}
          <div className="bg-primary/5 rounded-xl p-7 space-y-5 shadow-sm transition-colors duration-200">
            <h3 className="font-semibold text-lg text-fourth">Key Insights</h3>

            <ul className="grid md:grid-cols-2 gap-4 text-sm">
              {currentInsights.map((insight, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  {insight.icon}
                  {insight.text}
                </li>
              ))}
            </ul>

            {/* ✅ CTA Buttons Bottom Right (Only BASIC Users) */}
            {isBasic && (
              <div className="flex flex-wrap justify-end gap-3 pt-5 border-t border-third/20">
                <Button
                  href="/consult/dashboard/inspection"
                  variant="outline"
                  size="sm"
                  showIcon={false}
                  className="px-4 py-2 rounded-lg border border-third/30 bg-primary/5 text-primary text-xs font-semibold hover:bg-primary/10 transition cursor-pointer"
                >
                  Inspect 2 high-interest listings
                </Button>

                <button
                  onClick={() => setIsUpgradeTierOpen(true)}
                  className="px-4 py-2 rounded-lg border border-yellow-400/30 bg-yellow-400/10 text-yellow-300 text-xs font-semibold hover:bg-yellow-400/20 transition cursor-pointer"
                >
                  Upgrade your Plan
                </button>
              </div>
            )}
          </div>
        </>
      )}
      <UpgradeTierPopup
        isOpen={isUpgradeTierOpen}
        onClose={() => setIsUpgradeTierOpen(false)}
      />
    </section>
  );
}
