"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
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
  Cell,
} from "recharts";

const METRICS = [
  {
    key: "views",
    label: "Vehicle Views",
    value: "24.8K",
    delta: "+18%",
    color: "#3b82f6",
    icon: <FiEye size={15} />,
    data: [30, 42, 38, 55, 50, 68, 74, 90],
  },
  {
    key: "inquiries",
    label: "Inquiry Count",
    value: "1.2K",
    delta: "+31%",
    color: "#10b981",
    icon: <FiMessageSquare size={15} />,
    data: [18, 25, 22, 35, 38, 50, 60, 78],
  },
  {
    key: "inspections",
    label: "Inspection Engagement",
    value: "87%",
    delta: "+9%",
    color: "#a78bfa",
    icon: <FiActivity size={15} />,
    data: [55, 58, 52, 62, 65, 70, 75, 87],
  },
  {
    key: "response",
    label: "Response Performance",
    value: "92%",
    delta: "+4pt",
    color: "#f59e0b",
    icon: <FiCheckCircle size={15} />,
    data: [72, 75, 70, 78, 80, 85, 88, 92],
  },
  {
    key: "conversion",
    label: "Conversion Trends",
    value: "6.4%",
    delta: "+2.1%",
    color: "#6366f1",
    icon: <FiTrendingUp size={15} />,
    data: [2, 2.5, 2.2, 3, 3.5, 4.2, 5.1, 6.4],
  },
];

const CustomTooltip = ({ active, payload, label, color }) => {
  if (active && payload && payload.length) {
    return (
      <div
        className="px-3 py-2 rounded-lg text-[11px]"
        style={{
          background: "#0d0f14",
          border: `1px solid ${color}45`,
          color: "#fff",
        }}
      >
        <p style={{ color: "#6b7280" }} className="mb-0.5">
          {label}
        </p>
        <p className="font-bold" style={{ color }}>
          {payload[0].value}
        </p>
      </div>
    );
  }
  return null;
};

function MetricBarChart({ data, color }) {
  const [hovered, setHovered] = useState(null);
  const chartData = data.map((v, i) => ({ name: `W${i + 1}`, value: v }));

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={chartData}
        barCategoryGap={14}
        onMouseLeave={() => setHovered(null)}
      >
        <CartesianGrid
          stroke="rgba(255,255,255,0.04)"
          strokeDasharray="1 5"
          vertical={false}
        />
        <XAxis
          dataKey="name"
          axisLine={false}
          tickLine={false}
          tick={{ fill: "#374151", fontSize: 9, letterSpacing: "0.08em" }}
        />
        <Tooltip cursor={false} content={<CustomTooltip color={color} />} />
        <Bar
          dataKey="value"
          radius={[3, 3, 0, 0]}
          maxBarSize={22}
          onMouseEnter={(_, i) => setHovered(i)}
        >
          {chartData.map((_, i) => (
            <Cell
              key={i}
              fill={hovered === i ? color : `${color}50`}
              style={{ transition: "fill 0.12s ease" }}
            />
          ))}
        </Bar>
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
  const avg = (
    active.data.reduce((a, b) => a + b, 0) / active.data.length
  ).toFixed(1);

  return (
    <section ref={sectionRef} className="relative py-20 overflow-hidden">
      <div className="relative z-10 max-w-[1480px] mx-auto px-6">
        {/* ── HEADER ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10 mb-16"
        >
          <div className="max-w-xl">
            <span className="text-sm tracking-[0.4em] uppercase text-third font-semibold block mb-5">
              Analytics & Insights
            </span>
            <h2 className="text-[32px] sm:text-[42px] md:text-[52px] font-bold leading-[1.05] text-primary">
              Operate with Data,
              <br className="hidden sm:block" />
              <span className="text-fourth">Not Guesswork.</span>
            </h2>
          </div>

          <div className="lg:max-w-xs">
            <p className="text-third text-[14px] leading-relaxed mb-8">
              AVX gives every consultant a real-time visibility layer — from
              first view to final sale.
            </p>
            <div className="flex gap-10">
              <div className="relative pl-5">
                <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-primary/30" />
                <p className="text-[32px] font-bold text-primary leading-none">
                  {viewCount}×
                </p>
                <p className="text-[9px] text-third uppercase mt-2 tracking-[0.2em]">
                  More visibility
                </p>
              </div>
              <div className="relative pl-5">
                <div
                  className="absolute left-0 top-0 bottom-0 w-[1px]"
                  style={{ background: "#10b98145" }}
                />
                <p
                  className="text-[32px] font-bold leading-none"
                  style={{ color: "#10b981" }}
                >
                  {inqCount}K+
                </p>
                <p className="text-[9px] text-third uppercase mt-2 tracking-[0.2em]">
                  Inquiries tracked
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── PANEL ── */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.12 }}
          className="rounded-2xl overflow-hidden"
          style={{
            border: "1px solid rgba(255,255,255,0.07)",
            background: "transparent",
          }}
        >
          <div className="grid lg:grid-cols-[260px_1fr] divide-y lg:divide-y-0 lg:divide-x divide-white/[0.06]">
            {/* ── LEFT NAV ── */}
            <div className="flex flex-row lg:flex-col overflow-x-auto p-3 gap-1">
              {METRICS.map((m, i) => {
                const isActive = activeMetric === i;
                return (
                  <button
                    key={m.key}
                    onClick={() => setActiveMetric(i)}
                    className={`relative group text-left rounded-xl px-5 py-4 transition-all duration-200 shrink-0 overflow-hidden border
          ${
            isActive
              ? "bg-primary/5 border-primary/10"
              : "bg-transparent border-transparent hover:border-primary/[0.06] hover:bg-primary/[0.03]"
          }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="navAccent"
                        className="absolute left-0 top-2.5 bottom-2.5 w-[2px] rounded-r-full"
                        style={{ background: m.color }}
                        transition={{
                          type: "spring",
                          stiffness: 420,
                          damping: 34,
                        }}
                      />
                    )}

                    <div className="flex items-center gap-4">
                      {/* icon */}
                      <div
                        className="shrink-0 transition-all duration-200"
                        style={{ color: isActive ? m.color : undefined }}
                      >
                        <span
                          className={`w-5 h-5 flex items-center justify-center ${!isActive && "text-third"}`}
                        >
                          {m.icon}
                        </span>
                      </div>

                      {/* label */}
                      <p
                        className={`text-[14px] font-semibold leading-snug transition-colors hidden lg:block
            ${isActive ? "text-primary" : "text-third group-hover:text-primary/80"}`}
                      >
                        {m.label}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* ── RIGHT ── */}
            <div className="p-7 flex flex-col gap-7">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.key + "-head"}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.18 }}
                  className="flex items-end justify-between"
                >
                  <div>
                    <p
                      className="text-[10px] uppercase tracking-[0.3em] mb-2.5 font-medium text-primary"
                    >
                      {active.label}
                    </p>
                    <p
                      className="text-[52px] font-bold leading-none tracking-tight"
                      style={{ color: active.color }}
                    >
                      {active.value}
                    </p>
                  </div>

                  <div className="flex flex-col items-end gap-3 pb-1">
                    <span
                      className="text-[11px] font-bold px-3 py-1.5 rounded-full"
                      style={{
                        color: active.color,
                        background: `${active.color}18`,
                        border: `1px solid ${active.color}40`,
                      }}
                    >
                      {active.delta}
                    </span>
                    <span
                      className="text-[9px] tracking-[0.2em] uppercase text-primary"
                    >
                      8-week trend
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* colored rule */}
              <div
                className="h-px w-full"
                style={{
                  background: `linear-gradient(to right, ${active.color}55, ${active.color}10, transparent)`,
                  transition: "background 0.4s ease",
                }}
              />

              {/* chart */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.key + "-chart"}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="h-[190px] w-full"
                >
                  <MetricBarChart data={active.data} color={active.color} />
                </motion.div>
              </AnimatePresence>

              {/* bottom stats */}
              <div className="grid grid-cols-3 gap-3 pt-1 border-t border-white/[0.05]">
                {[
                  { l: "Peak Week", v: `W${peakIndex + 1}` },
                  { l: "Avg / Week", v: avg },
                  { l: "Growth", v: active.delta },
                ].map(({ l, v }) => (
                  <div
                    key={l}
                    className="rounded-xl p-3.5 text-center"
                    style={{
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.07)",
                    }}
                  >
                    <p
                      className="text-[9px] uppercase tracking-[0.2em] mb-2 text-primary"
                    >
                      {l}
                    </p>
                    <p
                      className="text-[15px] font-bold"
                      style={{ color: active.color }}
                    >
                      {v}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
