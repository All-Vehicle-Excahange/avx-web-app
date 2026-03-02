"use client";

import { motion, useInView } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import {
  FiTrendingUp,
  FiActivity,
  FiEye,
  FiMessageSquare,
  FiCheckCircle,
} from "react-icons/fi";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  Tooltip,
  CartesianGrid,
  XAxis,
} from "recharts";

const WEEKS = ["W1","W2","W3","W4","W5","W6","W7","W8"];

const METRICS = [
  {
    key: "views",
    label: "Vehicle Views",
    value: "24.8K",
    delta: "+18%",
    color: "#3b82f6",
    icon: <FiEye />,
    data: [30, 42, 38, 55, 50, 68, 74, 90],
  },
  {
    key: "inquiries",
    label: "Inquiry Count",
    value: "1.2K",
    delta: "+31%",
    color: "#10b981",
    icon: <FiMessageSquare />,
    data: [18, 25, 22, 35, 38, 50, 60, 78],
  },
  {
    key: "inspections",
    label: "Inspection Engagement",
    value: "87%",
    delta: "+9%",
    color: "#a78bfa",
    icon: <FiActivity />,
    data: [55, 58, 52, 62, 65, 70, 75, 87],
  },
  {
    key: "response",
    label: "Response Performance",
    value: "92%",
    delta: "+4pt",
    color: "#f59e0b",
    icon: <FiCheckCircle />,
    data: [72, 75, 70, 78, 80, 85, 88, 92],
  },
  {
    key: "conversion",
    label: "Conversion Trends",
    value: "6.4%",
    delta: "+2.1%",
    color: "#6366f1",
    icon: <FiTrendingUp />,
    data: [2, 2.5, 2.2, 3, 3.5, 4.2, 5.1, 6.4],
  },
];

function MetricBarChart({ data, color }) {
  const chartData = data.map((v, i) => ({
    name: `W${i + 1}`,
    value: v,
  }));

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={chartData} barCategoryGap={18}>
        <CartesianGrid stroke="#1f2937" strokeDasharray="3 3" vertical={false} />

        <XAxis
          dataKey="name"
          axisLine={false}
          tickLine={false}
          tick={{ fill: "#6b7280", fontSize: 10 }}
        />

        <Tooltip
          cursor={{ fill: "rgba(255,255,255,0.03)" }}
          contentStyle={{
            background: "#0f1117",
            border: "1px solid #1f2937",
            borderRadius: "8px",
            color: "#fff",
          }}
        />

        <Bar dataKey="value" radius={[6,6,2,2]} fill={color} maxBarSize={28} />
      </BarChart>
    </ResponsiveContainer>
  );
}

function useCountUp(target, duration = 1000, active = false) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active) return;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(ease * target));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [active, target, duration]);
  return value;
}

export default function PerformanceDashboard() {
  const [activeMetric, setActiveMetric] = useState(0);
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true });

  const active = METRICS[activeMetric];

  const viewCount = useCountUp(248, 900, inView);
  const inqCount = useCountUp(12, 900, inView);

  const peakIndex = active.data.indexOf(Math.max(...active.data));

  return (
    <section ref={sectionRef} className="relative py-16 overflow-hidden">

      <div className="relative z-10 max-w-[1480px] mx-auto px-6">

        {/* HEADER */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-14">

          <div className="max-w-xl">
            <span className="text-sm tracking-[0.4em] uppercase text-third font-semibold mb-4">
              Analytics & Insights
            </span>

            <h2 className="text-[32px] sm:text-[42px] md:text-[52px] font-bold leading-[1.08] text-primary mt-5">
              Operate with Data,
              <br className="hidden sm:block" />
              <span className="text-fourth">
                Not Guesswork.
              </span>
            </h2>
          </div>

          <div className="lg:max-w-xs">
            <p className="text-third text-[14px] leading-relaxed mb-6">
              AVX gives every consultant a real-time visibility layer — from first view to final sale.
            </p>

            <div className="flex gap-6">
              <div className="border-l-2 border-fourth pl-4">
                <p className="text-[28px] font-bold text-fourth">{viewCount}×</p>
                <p className="text-[10px] text-third uppercase mt-1">More visibility</p>
              </div>

              <div className="border-l-2 border-[#10b981] pl-4">
                <p className="text-[28px] font-bold text-[#10b981]">{inqCount}K+</p>
                <p className="text-[10px] text-third uppercase mt-1">Inquiries tracked</p>
              </div>
            </div>
          </div>

        </div>

        {/* PANEL */}
        <div className="rounded-2xl border border-primary/20  overflow-hidden">

          <div className="grid lg:grid-cols-[240px_1fr] divide-y lg:divide-y-0 lg:divide-x divide-primary/20">

            {/* LEFT */}
            <div className="flex flex-row lg:flex-col overflow-x-auto p-3 gap-1.5">
              {METRICS.map((m, i) => (
                <button
                  key={m.key}
                  onClick={() => setActiveMetric(i)}
                  className={`rounded-xl px-4 py-3 border ${
                    activeMetric === i
                      ? "border-[#1e3a5f] bg-[#0d1b2e]"
                      : "border-transparent hover:border-[#1f2937]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-7 h-7 rounded-lg flex items-center justify-center"
                      style={{ background: `${m.color}18`, color: m.color }}
                    >
                      {m.icon}
                    </div>
                    <span className="text-xs text-primary hidden lg:block">
                      {m.label}
                    </span>
                  </div>
                </button>
              ))}
            </div>

            {/* RIGHT */}
            <div className="p-6 flex flex-col gap-6">

              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[11px] text-third uppercase mb-1">{active.label}</p>
                  <p className="text-[44px] font-bold" style={{ color: active.color }}>
                    {active.value}
                  </p>
                </div>

                <span
                  className="text-[11px] font-bold px-3 py-1.5 rounded-full border"
                  style={{
                    color: active.color,
                    background: `${active.color}12`,
                    borderColor: `${active.color}30`,
                  }}
                >
                  {active.delta}
                </span>
              </div>

              {/* CHART */}
              <div className="h-[220] w-full">
                <MetricBarChart data={active.data} color={active.color} />
              </div>

              <div className="grid grid-cols-3 gap-3 pt-2 border-t border-primary/20">
               {[
                  { l: "Peak Week", v: `W${peakIndex + 1}` },
                  { l: "Avg / Week", v: `${(active.data.reduce((a,b)=>a+b,0)/active.data.length).toFixed(1)}` },
                  { l: "Growth", v: active.delta },
                ].map(({ l, v }) => (
                  <div key={l} className=" border border-primary/20 rounded-xl p-3 text-center">
                    <p className="text-[10px] text-third uppercase mb-1">{l}</p>
                    <p className="text-sm font-bold" style={{ color: active.color }}>{v}</p>
                  </div>
                ))}
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
