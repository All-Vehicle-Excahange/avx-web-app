"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  X,
  ArrowLeft,
  Edit,
  Pause,
  Play,
  RefreshCw,
  MoreHorizontal,
  Car,
  Info,
  TrendingUp,
  AlertTriangle,
  MessageSquare,
  Calendar,
  DollarSign,
  Clock,
  Activity,
  CheckCircle2,
  ChevronDown,
} from "lucide-react";
import Button from "@/components/ui/button";

const rangeData = {
  "7d": {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    imp: [320, 410, 380, 480, 560, 530, 360],
    clicks: [14, 18, 16, 21, 24, 22, 9],
    spend: [220, 280, 190, 310, 340, 295, 190],
    imp_s: "2,840",
    click_s: "124",
    ctr_s: "4.4%",
    spend_s: "₹558",
    cpc_s: "₹4.50",
  },
  "14d": {
    labels: ["W1 M", "W1 W", "W1 F", "W1 S", "W2 M", "W2 W", "W2 F", "W2 S"],
    imp: [280, 350, 420, 300, 320, 410, 380, 480],
    clicks: [11, 15, 18, 12, 14, 18, 16, 21],
    spend: [180, 220, 250, 160, 220, 280, 190, 310],
    imp_s: "5,830",
    click_s: "242",
    ctr_s: "4.2%",
    spend_s: "₹1,140",
    cpc_s: "₹4.71",
  },
  "30d": {
    labels: ["1", "3", "5", "7", "9", "11", "13", "15", "17", "19", "21", "23", "25", "27", "29", "30"],
    imp: [280, 350, 320, 420, 390, 480, 460, 510, 530, 490, 560, 540, 500, 470, 520, 580],
    clicks: [11, 15, 13, 18, 16, 21, 19, 22, 23, 20, 24, 23, 21, 19, 22, 25],
    spend: [180, 220, 190, 250, 220, 290, 270, 310, 330, 290, 340, 320, 290, 270, 310, 350],
    imp_s: "12,450",
    click_s: "486",
    ctr_s: "3.9%",
    spend_s: "₹2,100",
    cpc_s: "₹4.32",
  },
};

export default function ResultsModal({ onClose, isClosing, ad }) {
  const router = useRouter();
  const [range, setRange] = useState("7d");
  const [isCampaignPaused, setIsCampaignPaused] = useState(ad?.status === "Paused");
  const [hoveredLineIndex, setHoveredLineIndex] = useState(null);
  const [hoveredSpendIndex, setHoveredSpendIndex] = useState(null);

  const currentData = rangeData[range];

  const handleTogglePause = () => {
    setIsCampaignPaused(!isCampaignPaused);
  };

  // Safe Fallback Values from Clicked Card
  const campaignName = ad?.title || "BMW X1 — 2023 xDrive20d";
  const campaignType = ad?.model || "CPC";
  const campaignPlacement = ad?.placement || "Homepage featured";
  const campaignBudget = ad?.budget ? `${ad.budget} budget` : "₹500/day budget";
  const rateValue = ad?.rate || "₹4.50/click";

  // Build SVG points for Line Chart
  const renderLineChartSVG = () => {
    const width = 500;
    const height = 160;
    const padding = 24;

    const maxImp = Math.max(...currentData.imp);
    const minImp = Math.min(...currentData.imp);
    const maxClicks = Math.max(...currentData.clicks);
    const minClicks = Math.min(...currentData.clicks);

    const pointsCount = currentData.labels.length;
    const stepX = (width - padding * 2) / (pointsCount - 1 || 1);

    // Coordinate conversion helpers
    const getX = (index) => padding + index * stepX;
    const getY = (val, max, min) => {
      const range = max - min || 1;
      return height - padding - ((val - min) / range) * (height - padding * 2);
    };

    // Build path strings
    let impPath = "";
    let clicksPath = "";
    let impAreaPath = `M ${getX(0)} ${height - padding}`;
    let clicksAreaPath = `M ${getX(0)} ${height - padding}`;

    currentData.imp.forEach((val, idx) => {
      const x = getX(idx);
      const y = getY(val, maxImp, minImp);
      if (idx === 0) {
        impPath += `M ${x} ${y}`;
      } else {
        impPath += ` L ${x} ${y}`;
      }
      impAreaPath += ` L ${x} ${y}`;
    });
    impAreaPath += ` L ${getX(pointsCount - 1)} ${height - padding} Z`;

    currentData.clicks.forEach((val, idx) => {
      const x = getX(idx);
      const y = getY(val, maxClicks, minClicks);
      if (idx === 0) {
        clicksPath += `M ${x} ${y}`;
      } else {
        clicksPath += ` L ${x} ${y}`;
      }
      clicksAreaPath += ` L ${x} ${y}`;
    });
    clicksAreaPath += ` L ${getX(pointsCount - 1)} ${height - padding} Z`;

    return (
      <svg className="w-full h-full" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none">
        <defs>
          <linearGradient id="impGlow" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#26b29b" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#26b29b" stopOpacity="0.0" />
          </linearGradient>
          <linearGradient id="clicksGlow" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#007bff" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#007bff" stopOpacity="0.0" />
          </linearGradient>
        </defs>

        {/* Grid lines */}
        {[0, 1, 2, 3].map((i) => {
          const yVal = padding + (i * (height - padding * 2)) / 3;
          return (
            <line
              key={i}
              x1={padding}
              y1={yVal}
              x2={width - padding}
              y2={yVal}
              stroke="white"
              strokeOpacity="0.05"
              strokeWidth="0.5"
            />
          );
        })}

        {/* Filled Area Paths */}
        <path d={impAreaPath} fill="url(#impGlow)" />
        <path d={clicksAreaPath} fill="url(#clicksGlow)" />

        {/* Guidelines */}
        {hoveredLineIndex !== null && (
          <line
            x1={getX(hoveredLineIndex)}
            y1={padding}
            x2={getX(hoveredLineIndex)}
            y2={height - padding}
            stroke="white"
            strokeOpacity="0.2"
            strokeWidth="1.5"
            strokeDasharray="2,2"
            className="pointer-events-none"
          />
        )}

        {/* Line Paths */}
        <path d={impPath} fill="none" stroke="#26b29b" strokeWidth="2" strokeDasharray="3,3" />
        <path d={clicksPath} fill="none" stroke="#007bff" strokeWidth="2.5" />

        {/* Point Circles */}
        {currentData.imp.map((val, idx) => (
          <circle
            key={`imp-${idx}`}
            cx={getX(idx)}
            cy={getY(val, maxImp, minImp)}
            r={hoveredLineIndex === idx ? "5" : "3"}
            fill="#26b29b"
            stroke={hoveredLineIndex === idx ? "white" : "none"}
            strokeWidth={hoveredLineIndex === idx ? "1.5" : "0"}
            className="transition-all duration-300"
          />
        ))}
        {currentData.clicks.map((val, idx) => (
          <circle
            key={`clicks-${idx}`}
            cx={getX(idx)}
            cy={getY(val, maxClicks, minClicks)}
            r={hoveredLineIndex === idx ? "5.5" : "3.5"}
            fill="#007bff"
            stroke={hoveredLineIndex === idx ? "white" : "none"}
            strokeWidth={hoveredLineIndex === idx ? "1.5" : "0"}
            className="transition-all duration-300"
          />
        ))}

        {/* Axis Labels */}
        {currentData.labels.map((lbl, idx) => (
          <text
            key={idx}
            x={getX(idx)}
            y={height - 4}
            fill="#a1a1aa"
            fontSize="9"
            textAnchor="middle"
            className="select-none font-medium opacity-80"
          >
            {lbl}
          </text>
        ))}

        {/* Transparent Interactive Hover Triggers */}
        {currentData.imp.map((_, idx) => {
          const triggerWidth = stepX;
          const xStart = getX(idx) - stepX / 2;
          return (
            <rect
              key={`trigger-${idx}`}
              x={xStart}
              y={0}
              width={triggerWidth}
              height={height}
              fill="transparent"
              className="cursor-crosshair opacity-0"
              onMouseEnter={() => setHoveredLineIndex(idx)}
            />
          );
        })}
      </svg>
    );
  };

  // Build SVG bars for Spend Chart
  const renderSpendBarChartSVG = () => {
    const width = 500;
    const height = 180;
    const padding = 24;

    const maxSpend = Math.max(...currentData.spend);
    const pointsCount = currentData.labels.length;
    
    const availableWidth = width - padding * 2;
    const barWidth = Math.max(10, (availableWidth / pointsCount) * 0.65);
    const stepX = availableWidth / (pointsCount - 1 || 1);

    const getX = (index) => padding + index * stepX - barWidth / 2;
    const getY = (val) => {
      return height - padding - (val / (maxSpend || 1)) * (height - padding * 2 - 10);
    };

    return (
      <svg className="w-full h-full" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none">
        {/* Grid lines */}
        {[0, 1, 2, 3].map((i) => {
          const yVal = padding + (i * (height - padding * 2 - 10)) / 3;
          return (
            <line
              key={i}
              x1={padding}
              y1={yVal}
              x2={width - padding}
              y2={yVal}
              stroke="white"
              strokeOpacity="0.05"
              strokeWidth="0.5"
            />
          );
        })}

        {/* Bars */}
        {currentData.spend.map((val, idx) => {
          const x = getX(idx);
          const y = getY(val);
          const barHeight = Math.max(2, height - padding - y);

          return (
            <rect
              key={idx}
              x={x}
              y={y}
              width={barWidth}
              height={barHeight}
              rx={2}
              fill={hoveredSpendIndex === idx ? "#26b29b" : "#007bff"}
              fillOpacity={hoveredSpendIndex === idx ? 1.0 : 0.85}
              className="transition-all duration-150 cursor-pointer"
              onMouseEnter={() => setHoveredSpendIndex(idx)}
              onMouseLeave={() => setHoveredSpendIndex(null)}
            >
              <title>₹{val}</title>
            </rect>
          );
        })}

        {/* Labels */}
        {currentData.labels.map((lbl, idx) => (
          <text
            key={idx}
            x={getX(idx) + barWidth / 2}
            y={height - 4}
            fill="#a1a1aa"
            fontSize="9"
            textAnchor="middle"
            className="select-none font-medium opacity-80"
          >
            {lbl}
          </text>
        ))}
      </svg>
    );
  };

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/75 backdrop-blur-sm p-3 sm:p-4 select-none"
      onClick={onClose}
      style={{
        animation: isClosing
          ? "modalBackdropOut 0.2s ease-in forwards"
          : "modalBackdropIn 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      {/* Central Modal container */}
      <div
        className="w-full max-w-7xl bg-zinc-950 border border-white/10 rounded-2xl shadow-2xl flex flex-col max-h-[92vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        style={{
          animation: isClosing
            ? "modalCardOut 0.2s ease-in forwards"
            : "modalCardIn 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        {/* Top Sticky Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 sm:p-5 border-b border-white/10 gap-4 bg-zinc-900/50">
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-zinc-400 hover:bg-white/5 hover:text-white transition-all cursor-pointer"
              aria-label="Back"
            >
              <ArrowLeft size={16} />
            </button>
            <div className="space-y-0.5">
              <div className="flex items-center flex-wrap gap-2">
                <span className="font-semibold text-sm sm:text-base text-white">{campaignName}</span>
                <span
                  className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    isCampaignPaused
                      ? "bg-amber-500/10 text-amber-400"
                      : "bg-[#26b29b]/10 text-[#26b29b]"
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      isCampaignPaused ? "bg-amber-400" : "bg-[#26b29b] animate-pulse"
                    }`}
                  />
                  {isCampaignPaused ? "Paused" : "Active"}
                </span>
              </div>
              <div className="flex items-center flex-wrap gap-x-2 gap-y-1 text-xs text-zinc-400">
                <span className="bg-blue-500/15 text-blue-400 font-bold px-1.5 py-0.5 rounded text-[10px] uppercase">
                  {campaignType}
                </span>
                <span className="text-zinc-500 font-semibold">{campaignPlacement}</span>
                <span className="text-zinc-600 font-semibold">•</span>
                <span>18 May – 17 Jun 2026</span>
                <span className="text-zinc-600 font-semibold">•</span>
                <span className="text-zinc-300 font-semibold">{campaignBudget}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 self-stretch sm:self-auto justify-end">
            <Button
              variant="outlineSecondary"
              size="sm"
              onClick={() => router.push("/consult/dashboard/ads/create")}
              className="h-9 px-4 text-xs font-semibold flex items-center gap-1.5"
            >
              <Edit className="mr-2" size={14} /> Edit
            </Button>
            <Button
              variant="outlineSecondary"
              size="sm"
              onClick={handleTogglePause}
              className="h-9 px-4 text-xs font-semibold flex items-center gap-1.5"
            >
              {isCampaignPaused ? (
                <>
                  <Play className="mr-2" size={14} fill="currentColor" /> Resume
                </>
              ) : (
                <>
                  <Pause className="mr-2" size={14} fill="currentColor" /> Pause
                </>
              )}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.push("/consult/dashboard/ads/create")}
              className="h-9 px-4 text-xs font-bold flex items-center gap-1.5"
            >
              <RefreshCw className="mr-2" size={14} strokeWidth={3} /> Boost again
            </Button>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-zinc-400 hover:bg-white/5 hover:text-white transition-all cursor-pointer ml-1"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Scrollable Layout Body */}
        <div className="overflow-y-auto p-4 sm:p-5 space-y-5 custom-scrollbar bg-zinc-950">
          
          {/* Vehicle Metadata Header Card */}
          <div className="bg-zinc-900/60 border border-white/5 rounded-xl p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center text-zinc-400 border border-white/5">
                <Car size={24} />
              </div>
              <div>
                <h4 className="font-semibold text-sm sm:text-base text-white">{campaignName}</h4>
                <p className="text-xs text-zinc-400 font-medium mt-0.5">
                  12,400 km · Petrol · Auto · ₹42.0L
                </p>
              </div>
            </div>

            <div className="flex items-center gap-6 sm:gap-10 border-t border-white/5 md:border-t-0 pt-3 md:pt-0 w-full md:w-auto">
              <div className="space-y-0.5">
                <span className="text-[10px] text-zinc-500 block uppercase font-bold tracking-wider">
                  Campaign
                </span>
                <span className="text-sm font-semibold text-white block">Day 1 of 30</span>
              </div>
              <div className="space-y-0.5">
                <span className="text-[10px] text-zinc-500 block uppercase font-bold tracking-wider">
                  Avg Position
                </span>
                <span className="text-sm font-bold text-[#26b29b] block">#2</span>
              </div>
              <div className="space-y-0.5">
                <span className="text-[10px] text-zinc-500 block uppercase font-bold tracking-wider">
                  Spent
                </span>
                <span className="text-sm font-semibold text-zinc-300 block">
                  {currentData.spend_s} / <span className="text-zinc-500">₹15,000</span>
                </span>
              </div>
            </div>
          </div>

          {/* Performance Overview section title and tabs */}
          <div className="flex items-center justify-between gap-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Performance Overview
            </h3>
            <div className="bg-zinc-900 p-0.5 rounded-lg border border-white/5 flex items-center gap-0.5">
              {["7d", "14d", "30d"].map((t) => (
                <button
                  key={t}
                  onClick={() => setRange(t)}
                  className={`text-[11px] px-3 py-1 rounded-md font-semibold transition-all cursor-pointer ${
                    range === t
                      ? "bg-zinc-800 text-white shadow-md border border-white/10"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  {t === "7d" ? "7 Days" : t === "14d" ? "14 Days" : "30 Days"}
                </button>
              ))}
            </div>
          </div>

          {/* 4 Cards Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="bg-zinc-900/40 border border-white/5 rounded-xl p-4 space-y-1 hover:border-white/10 transition-colors">
              <span className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider block">
                Impressions
              </span>
              <span className="text-xl sm:text-2xl font-black text-white block">
                {currentData.imp_s}
              </span>
              <span className="text-[11px] text-[#26b29b] font-semibold block">
                ↑ 18% vs last week
              </span>
            </div>
            <div className="bg-zinc-900/40 border border-white/5 rounded-xl p-4 space-y-1 hover:border-white/10 transition-colors">
              <span className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider block">
                {campaignType === "CPI" ? "Inquiries" : "Clicks"}
              </span>
              <span className="text-xl sm:text-2xl font-black text-white block">
                {currentData.click_s}
              </span>
              <span className="text-[11px] text-[#26b29b] font-semibold block">
                ↑ 12% vs last week
              </span>
            </div>
            <div className="bg-zinc-900/40 border border-white/5 rounded-xl p-4 space-y-1 hover:border-white/10 transition-colors">
              <span className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider block">
                {campaignType === "CPI" ? "INQ Rate" : "CTR"}
              </span>
              <span className="text-xl sm:text-2xl font-black text-white block">
                {currentData.ctr_s}
              </span>
              <span className="text-[11px] text-[#26b29b] font-semibold block">
                Above average (2.1%)
              </span>
            </div>
            <div className="bg-zinc-900/40 border border-white/5 rounded-xl p-4 space-y-1 hover:border-white/10 transition-colors">
              <span className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider block">
                Total Spend
              </span>
              <span className="text-xl sm:text-2xl font-black text-white block">
                {currentData.spend_s}
              </span>
              <span className="text-[11px] text-zinc-400 font-medium block">
                {currentData.cpc_s} avg CPC
              </span>
            </div>
          </div>

          {/* First Two-Column Grid: SVG Line Chart & Conversion Funnel */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {/* Impressions vs Clicks Chart */}
            <div className="bg-zinc-900/40 border border-white/5 rounded-xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                  Daily Impressions vs Clicks
                </h4>
                {hoveredLineIndex !== null ? (
                  <div className="text-[10px] font-bold text-zinc-300 flex items-center gap-2 bg-white/5 px-2 py-0.5 rounded border border-white/5 animate-pulse">
                    <span className="text-zinc-400 font-semibold">{currentData.labels[hoveredLineIndex]}:</span>
                    <span className="text-[#26b29b]">{currentData.imp[hoveredLineIndex]} Imp</span>
                    <span className="text-[#007bff]">{currentData.clicks[hoveredLineIndex]} Clicks</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5 text-[10px] text-zinc-400 font-semibold">
                      <span className="w-2.5 h-2.5 rounded bg-[#26b29b] opacity-80 inline-block" />
                      Impressions
                    </div>
                    <div className="flex items-center gap-1.5 text-[10px] text-zinc-400 font-semibold">
                      <span className="w-2.5 h-2.5 rounded bg-[#007bff] inline-block" />
                      Clicks
                    </div>
                  </div>
                )}
              </div>
              <div 
                className="h-44 w-full relative group"
                onMouseLeave={() => setHoveredLineIndex(null)}
              >
                {renderLineChartSVG()}
                {hoveredLineIndex !== null && (
                  <div 
                    className="absolute z-20 bg-zinc-950/95 border border-white/10 p-2.5 rounded-lg shadow-xl text-[10px] space-y-1 pointer-events-none transition-all duration-75"
                    style={{
                      left: `${((24 + hoveredLineIndex * ((500 - 48) / (currentData.labels.length - 1 || 1))) / 500) * 100}%`,
                      top: "10%",
                      transform: `translateX(-50%)`,
                    }}
                  >
                    <p className="font-bold text-zinc-400 border-b border-white/5 pb-1 mb-1 text-center">
                      {currentData.labels[hoveredLineIndex]}
                    </p>
                    <div className="flex items-center gap-2 justify-between">
                      <span className="text-zinc-500 font-medium">Impressions:</span>
                      <span className="text-[#26b29b] font-bold">{currentData.imp[hoveredLineIndex]}</span>
                    </div>
                    <div className="flex items-center gap-2 justify-between">
                      <span className="text-zinc-500 font-medium">Clicks:</span>
                      <span className="text-[#007bff] font-bold">{currentData.clicks[hoveredLineIndex]}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Conversion Funnel */}
            <div className="bg-zinc-900/40 border border-white/5 rounded-xl p-4 space-y-4">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                Conversion Funnel
              </h4>
              <div className="space-y-3">
                {/* Imp */}
                <div className="flex items-center gap-3">
                  <span className="text-xs text-zinc-400 w-20 shrink-0 font-medium">Impressions</span>
                  <div className="flex-1 h-5 bg-white/5 rounded overflow-hidden relative border border-white/5">
                    <div className="h-full bg-[#26b29b]/10 rounded flex items-center px-2" style={{ width: "100%" }}>
                      <span className="text-[11px] font-bold text-[#26b29b]">{currentData.imp_s}</span>
                    </div>
                  </div>
                  <span className="text-[11px] text-zinc-400 font-bold w-9 text-right shrink-0">100%</span>
                </div>
                {/* Clicks */}
                <div className="flex items-center gap-3">
                  <span className="text-xs text-zinc-400 w-20 shrink-0 font-medium">Clicks</span>
                  <div className="flex-1 h-5 bg-white/5 rounded overflow-hidden relative border border-white/5">
                    <div className="h-full bg-[#007bff]/20 rounded flex items-center px-2" style={{ width: "44%" }}>
                      <span className="text-[11px] font-bold text-[#007bff]">{currentData.click_s}</span>
                    </div>
                  </div>
                  <span className="text-[11px] text-[#26b29b] font-bold w-9 text-right shrink-0">{currentData.ctr_s}</span>
                </div>
                {/* Detail views */}
                <div className="flex items-center gap-3">
                  <span className="text-xs text-zinc-400 w-20 shrink-0 font-medium">Detail Views</span>
                  <div className="flex-1 h-5 bg-white/5 rounded overflow-hidden relative border border-white/5">
                    <div className="h-full bg-[#26b29b]/35 rounded flex items-center px-2" style={{ width: "26%" }}>
                      <span className="text-[11px] font-bold text-[#26b29b]">{currentData.click_s ? "74" : "0"}</span>
                    </div>
                  </div>
                  <span className="text-[11px] text-[#007bff] font-bold w-9 text-right shrink-0">2.6%</span>
                </div>
                {/* Inquiries */}
                <div className="flex items-center gap-3">
                  <span className="text-xs text-zinc-400 w-20 shrink-0 font-medium">Inquiries</span>
                  <div className="flex-1 h-5 bg-white/5 rounded overflow-hidden relative border border-white/5">
                    <div className="h-full bg-[#007bff] rounded flex items-center px-2" style={{ width: "9%" }}>
                      <span className="text-[11px] font-bold text-white">8</span>
                    </div>
                  </div>
                  <span className="text-[11px] text-[#26b29b] font-bold w-9 text-right shrink-0">0.3%</span>
                </div>
                {/* Calls */}
                <div className="flex items-center gap-3">
                  <span className="text-xs text-zinc-400 w-20 shrink-0 font-medium">Calls</span>
                  <div className="flex-1 h-5 bg-white/5 rounded overflow-hidden relative border border-white/5">
                    <div className="h-full bg-[#007bff]/85 rounded flex items-center px-2" style={{ width: "4%" }}>
                      <span className="text-[11px] font-bold text-blue-100">3</span>
                    </div>
                  </div>
                  <span className="text-[11px] text-[#26b29b] font-bold w-9 text-right shrink-0">0.1%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Second Two-Column Grid: Budget Usage vs Daily Spend Bar Chart */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {/* Budget Details & Breakdown */}
            <div className="bg-zinc-900/40 border border-white/5 rounded-xl p-4 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                  Budget Usage
                </h4>
                <span className="text-[10px] text-zinc-400 font-semibold uppercase tracking-wider">
                  Today
                </span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-zinc-400 font-semibold">
                  <span>₹0</span>
                  <span className="text-white">₹340 spent today</span>
                  <span>₹500 limit</span>
                </div>
                <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden border border-white/5">
                  <div className="h-full bg-[#007bff] rounded-full" style={{ width: "68%" }} />
                </div>
                <span className="text-[11px] text-zinc-500 block font-medium">
                  68% of daily budget used · resets at midnight
                </span>
              </div>

              <div className="h-px bg-white/5" />

              <div className="space-y-2.5">
                <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider block">
                  Spend Breakdown
                </span>
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs py-2 px-3 bg-zinc-900/40 border border-white/5 rounded-lg">
                    <span className="text-zinc-400 font-medium">Total Spent (Campaign)</span>
                    <span className="text-white font-bold">{currentData.spend_s}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs py-2 px-3 bg-zinc-900/40 border border-white/5 rounded-lg">
                    <span className="text-zinc-400 font-medium">Remaining Budget</span>
                    <span className="text-[#26b29b] font-bold">₹14,442</span>
                  </div>
                  <div className="flex justify-between items-center text-xs py-2 px-3 bg-zinc-900/40 border border-white/5 rounded-lg">
                    <span className="text-zinc-400 font-medium">Avg. CPC Paid</span>
                    <span className="text-white font-bold">{rateValue}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs py-2 px-3 bg-zinc-900/40 border border-white/5 rounded-lg">
                    <span className="text-zinc-400 font-medium">Cost Per Inquiry</span>
                    <span className="text-white font-bold">₹69.75</span>
                  </div>
                  <div className="flex justify-between items-center text-xs py-2 px-3 bg-zinc-900/40 border border-white/5 rounded-lg">
                    <span className="text-zinc-400 font-medium">Wallet Balance</span>
                    <span className="text-[#26b29b] font-bold">₹7,682</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Spend by Day Bar Chart */}
            <div className="bg-zinc-900/40 border border-white/5 rounded-xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                  Spend By Day
                </h4>
                {hoveredSpendIndex !== null && (
                  <div className="text-[10px] font-bold text-zinc-300 flex items-center gap-1.5 bg-white/5 px-2 py-0.5 rounded border border-white/5 animate-pulse">
                    <span className="text-zinc-400 font-semibold">{currentData.labels[hoveredSpendIndex]}:</span>
                    <span className="text-[#007bff]">₹{currentData.spend[hoveredSpendIndex]} spent</span>
                  </div>
                )}
              </div>
              <div 
                className="h-48 w-full relative"
                onMouseLeave={() => setHoveredSpendIndex(null)}
              >
                {renderSpendBarChartSVG()}
                {hoveredSpendIndex !== null && (
                  <div 
                    className="absolute z-20 bg-zinc-950/95 border border-white/10 p-2.5 rounded-lg shadow-xl text-[10px] space-y-1 pointer-events-none transition-all duration-75"
                    style={{
                      left: `${((24 + hoveredSpendIndex * ((500 - 48) / (currentData.labels.length - 1 || 1))) / 500) * 100}%`,
                      bottom: "35%",
                      transform: `translateX(-50%)`,
                    }}
                  >
                    <p className="font-bold text-zinc-400 border-b border-white/5 pb-1 mb-1 text-center">
                      {currentData.labels[hoveredSpendIndex]}
                    </p>
                    <div className="flex items-center gap-2 justify-between">
                      <span className="text-zinc-500 font-medium">Daily Spend:</span>
                      <span className="text-[#007bff] font-bold">₹{currentData.spend[hoveredSpendIndex]}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Third Two-Column Grid: Recent Activity vs AI Insights */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {/* Live Activity Timeline */}
            <div className="bg-zinc-900/40 border border-white/5 rounded-xl p-4 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                  Recent Activity
                </h4>
                <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">
                  Live Feed
                </span>
              </div>

              <div className="space-y-4">
                <div className="flex gap-3 items-start text-xs border-b border-white/5 pb-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#007bff] mt-1 shrink-0" />
                  <div className="flex-1 space-y-0.5">
                    <p className="font-semibold text-white">New inquiry received</p>
                    <p className="text-zinc-400">Buyer asked about service history</p>
                  </div>
                  <span className="text-[10px] text-zinc-500 font-semibold whitespace-nowrap">2 min ago</span>
                </div>
                <div className="flex gap-3 items-start text-xs border-b border-white/5 pb-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#26b29b] mt-1 shrink-0" />
                  <div className="flex-1 space-y-0.5">
                    <p className="font-semibold text-white">6 new clicks</p>
                    <p className="text-zinc-400">Homepage featured slot · ₹27 spent</p>
                  </div>
                  <span className="text-[10px] text-zinc-500 font-semibold whitespace-nowrap">14 min ago</span>
                </div>
                <div className="flex gap-3 items-start text-xs border-b border-white/5 pb-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#26b29b] mt-1 shrink-0" />
                  <div className="flex-1 space-y-0.5">
                    <p className="font-semibold text-white">11 new clicks</p>
                    <p className="text-zinc-400">Homepage featured slot · ₹49.50 spent</p>
                  </div>
                  <span className="text-[10px] text-zinc-500 font-semibold whitespace-nowrap">1 hr ago</span>
                </div>
                <div className="flex gap-3 items-start text-xs border-b border-white/5 pb-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-zinc-500 mt-1 shrink-0" />
                  <div className="flex-1 space-y-0.5">
                    <p className="font-semibold text-white">340 impressions</p>
                    <p className="text-zinc-400">Morning peak traffic window</p>
                  </div>
                  <span className="text-[10px] text-zinc-500 font-semibold whitespace-nowrap">3 hrs ago</span>
                </div>
                <div className="flex gap-3 items-start text-xs border-b border-white/5 pb-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#007bff] mt-1 shrink-0" />
                  <div className="flex-1 space-y-0.5">
                    <p className="font-semibold text-white">New inquiry received</p>
                    <p className="text-zinc-400">Buyer requested test drive</p>
                  </div>
                  <span className="text-[10px] text-zinc-500 font-semibold whitespace-nowrap">5 hrs ago</span>
                </div>
                <div className="flex gap-3 items-start text-xs pb-1">
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500 mt-1 shrink-0" />
                  <div className="flex-1 space-y-0.5">
                    <p className="font-semibold text-white">Ad resumed automatically</p>
                    <p className="text-zinc-400">Wallet topped up · budget reset at midnight</p>
                  </div>
                  <span className="text-[10px] text-zinc-500 font-semibold whitespace-nowrap">Yesterday</span>
                </div>
              </div>
            </div>

            {/* AI Insights */}
            <div className="bg-zinc-900/40 border border-white/5 rounded-xl p-4 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                  AI Insights
                </h4>
                <TrendingUp size={16} className="text-amber-500" />
              </div>

              <div className="space-y-3">
                <div className="flex gap-3 items-start p-3 rounded-lg bg-[#26b29b]/10 border border-[#26b29b]/20 text-xs">
                  <TrendingUp className="text-[#26b29b] shrink-0 mt-0.5" size={16} />
                  <div>
                    <h5 className="font-bold text-[#26b29b]">CTR is 2× the platform average</h5>
                    <p className="text-zinc-300 mt-0.5 leading-relaxed font-medium">
                      Homepage placement is working well for this vehicle. Consider increasing daily budget to ₹750 for more reach.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 items-start p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 text-xs">
                  <AlertTriangle className="text-amber-400 shrink-0 mt-0.5" size={16} />
                  <div>
                    <h5 className="font-bold text-amber-400">Budget runs out by 4 PM daily</h5>
                    <p className="text-amber-300/80 mt-0.5 leading-relaxed font-medium">
                      You&apos;re missing evening traffic. Raise daily budget or reduce max CPC bid to stretch further.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 items-start p-3 rounded-lg bg-[#007bff]/10 border border-[#007bff]/20 text-xs">
                  <MessageSquare className="text-[#007bff] shrink-0 mt-0.5" size={16} />
                  <div>
                    <h5 className="font-bold text-[#007bff]">8 inquiries in 7 days</h5>
                    <p className="text-zinc-300 mt-0.5 leading-relaxed font-medium">
                      Effective cost per inquiry is ₹69.75. Switching to CPI billing could reduce cost if inquiry rate holds.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 items-start p-3 rounded-lg bg-[#26b29b]/10 border border-[#26b29b]/20 text-xs">
                  <Calendar className="text-[#26b29b] shrink-0 mt-0.5" size={16} />
                  <div>
                    <h5 className="font-bold text-[#26b29b]">Weekends drive 34% more clicks</h5>
                    <p className="text-zinc-300 mt-0.5 leading-relaxed font-medium">
                      Sat–Sun peak confirmed. You have weekend boosting active — good.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
