"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";

// ─── helpers ──────────────────────────────────────────────────────────────────
const Avatar = ({ initials, color }) => (
  <div
    className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold text-white shrink-0"
    style={{ background: color }}
  >
    {initials}
  </div>
);

function useCountUp(target, duration = 1200, delay = 400) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    const timeout = setTimeout(() => {
      const start = performance.now();
      const tick = (now) => {
        const p = Math.min((now - start) / duration, 1);
        const ease = 1 - Math.pow(1 - p, 3);
        setValue(Math.round(ease * target));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, delay);
    return () => clearTimeout(timeout);
  }, [target, duration, delay]);
  return value;
}

const INQUIRY_POOL = [
  { name: "James R.", vehicle: "2023 BMW M4", avatar: "JR", color: "#2563eb" },
  {
    name: "Sofia K.",
    vehicle: "2022 Porsche 911",
    avatar: "SK",
    color: "#7c3aed",
  },
  {
    name: "Marcus T.",
    vehicle: "2024 Mercedes G63",
    avatar: "MT",
    color: "#059669",
  },
  {
    name: "Priya N.",
    vehicle: "2023 Tesla Model S",
    avatar: "PN",
    color: "#dc2626",
  },
  {
    name: "Luca F.",
    vehicle: "2022 Lamborghini Urus",
    avatar: "LF",
    color: "#d97706",
  },
];

const BARS = [
  { m: "J", v: 30 },
  { m: "F", v: 45 },
  { m: "M", v: 28 },
  { m: "A", v: 60 },
  { m: "M", v: 50 },
  { m: "J", v: 75 },
  { m: "J", v: 65 },
  { m: "A", v: 90 },
  { m: "S", v: 70 },
  { m: "O", v: 85 },
  { m: "N", v: 80 },
  { m: "D", v: 100 },
];

const TABS = ["Overview", "Inquiries", "Score"];

const SUB_SCORES = [
  { label: "Photos", pct: 95 },
  { label: "Description", pct: 82 },
  { label: "Pricing", pct: 78 },
  { label: "Response", pct: 91 },
];

// ══════════════════════════════════════════════════════════════════════════════
export default function ConsultantHeroSection() {
  const [activeTab, setActiveTab] = useState(0);
  const [inquiries, setInquiries] = useState(
    INQUIRY_POOL.slice(0, 3).map((inq, i) => ({
      ...inq,
      time: ["just now", "2 min ago", "5 min ago"][i],
      _key: i,
    })),
  );
  const [hoveredBar, setHoveredBar] = useState(null);
  const [pulse, setPulse] = useState(false);
  const [liveCount, setLiveCount] = useState(38);
  const poolIndex = useRef(3);
  const keyRef = useRef(100);

  const views = useCountUp(245, 1400, 300);
  const rate = useCountUp(92, 1000, 700);

  useEffect(() => {
    const id = setInterval(() => {
      const next = INQUIRY_POOL[poolIndex.current % INQUIRY_POOL.length];
      poolIndex.current += 1;
      keyRef.current += 1;
      setInquiries((prev) => [
        { ...next, time: "just now", _key: keyRef.current },
        ...prev.slice(0, 2),
      ]);
      setLiveCount((c) => c + 1);
      setPulse(true);
      setTimeout(() => setPulse(false), 800);
    }, 4500);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-b from-secondary via-[#0b0e13] to-secondary" />
      <motion.div
        animate={{ y: [0, -25, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-40 -left-40 w-150 h-150 bg-fourth/10 blur-[160px] rounded-full"
      />
      <motion.div
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-40 -right-40 w-150 h-150 bg-fourth/10 blur-[160px] rounded-full"
      />

      <div className="relative z-10 mx-auto   py-20 w-full max-w-[1400px]">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* ── LEFT ── */}
          <div className="max-w-xl space-y-8">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#60a5fa]/30 text-sm tracking-[0.35em] uppercase text-third font-semibold bg-[#044596]/10 backdrop-blur-md">
              Consultant Program
            </span>
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-5xl lg:text-[58px] font-bold leading-[1.05] text-primary tracking-tight">
                Grow Your Automotive
              </h1>
              <h1 className="text-4xl sm:text-5xl lg:text-[58px] font-bold leading-[1.05] tracking-tight text-fourth">
                Business on AVX
              </h1>
            </div>
            <p className="text-[15px] text-third leading-relaxed max-w-lg">
              AVX helps automotive consultants build visibility, generate
              serious inquiries, and operate with structured performance
              transparency.
            </p>
            <div className="w-24 h-0.5 bg-fourth rounded-full" />
            <div className="flex flex-col sm:flex-row gap-4 pt-3">
              <a
                href="/consultant/register"
                className="relative group inline-flex items-center justify-center px-7 py-3.5 rounded-xl text-sm font-semibold text-primary bg-linear-to-r from-[#044596] to-fourth shadow-lg shadow-blue-900/40 transition duration-300 hover:shadow-blue-600/40 hover:-translate-y-px"
              >
                Become a Consultant
              </a>
              <a
                href="/pricing"
                className="px-7 py-3.5 rounded-xl text-center text-sm font-semibold border-[#374151] border-2 text-primary bg-[#111318] transition duration-300 hover:border-fourth hover:text-fourth hover:bg-[#151922] hover:shadow-[0_10px_40px_-10px_rgba(255,255,255,0.25)]"
              >
                View Pricing
              </a>
            </div>
          </div>

          {/* ── RIGHT – interactive panel ── */}
          <div className="relative h-117.5 select-none">
            <div className="absolute inset-0 bg-linear-to-r from-fourth/10 to-transparent blur-3xl rounded-3xl" />

            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="absolute inset-0 rounded-2xl border border-[#1f2937] bg-[#0f1117]/95 backdrop-blur-xl shadow-[0_40px_100px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col"
            >
              {/* header */}
              <div className="flex items-center justify-between px-5 pt-4 pb-3 border-b border-[#1f2937]">
                <div className="flex items-center gap-2">
                  <motion.span
                    animate={{
                      opacity: pulse ? [1, 0.2, 1] : 1,
                      scale: pulse ? [1, 1.6, 1] : 1,
                    }}
                    transition={{ duration: 0.5 }}
                    className="inline-block w-2 h-2 rounded-full bg-emerald-400"
                  />
                  <span className="text-xs font-semibold text-primary tracking-wide">
                    Consultant Dashboard
                  </span>
                </div>
                <motion.div
                  animate={pulse ? { scale: [1, 1.12, 1] } : {}}
                  transition={{ duration: 0.4 }}
                  className="flex items-center gap-1.5 text-[10px] bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-2.5 py-1 rounded-full"
                >
                  <motion.span
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 1.4, repeat: Infinity }}
                    className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400"
                  />
                  <span className="font-bold">{liveCount}</span>
                  <span>inquiries today</span>
                </motion.div>
              </div>

              {/* tabs */}
              <div className="flex gap-1 px-5 pt-3">
                {TABS.map((tab, i) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(i)}
                    className={`relative px-3.5 py-1.5 text-[11px] font-semibold rounded-lg transition-colors duration-200 ${
                      activeTab === i
                        ? "text-primary"
                        : "text-third hover:text-primary/70"
                    }`}
                  >
                    {activeTab === i && (
                      <motion.div
                        layoutId="tabBg"
                        className="absolute inset-0 bg-[#1a2535] border border-fourth/30 rounded-lg"
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 30,
                        }}
                      />
                    )}
                    <span className="relative z-10">{tab}</span>
                  </button>
                ))}
              </div>

              {/* tab body */}
              <div className="flex-1 overflow-hidden px-5 pb-5 pt-3">
                <AnimatePresence mode="wait">
                  {/* OVERVIEW */}
                  {activeTab === 0 && (
                    <motion.div
                      key="overview"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.22 }}
                      className="h-full flex flex-col gap-3"
                    >
                      <div className="grid grid-cols-3 gap-2.5">
                        {[
                          {
                            v: views,
                            suffix: "",
                            l: "Vehicle Views",
                            delta: "+12%",
                            color: "#3b82f6",
                          },
                          {
                            v: liveCount,
                            suffix: "",
                            l: "Inquiries",
                            delta: `+${liveCount - 33}`,
                            color: "#10b981",
                          },
                          {
                            v: rate,
                            suffix: "%",
                            l: "Response Rate",
                            delta: "↑3pt",
                            color: "#a78bfa",
                          },
                        ].map((item, i) => (
                          <motion.div
                            key={i}
                            whileHover={{
                              scale: 1.03,
                              borderColor: "rgba(59,130,246,0.4)",
                            }}
                            transition={{ duration: 0.15 }}
                            className="bg-[#0b0e13] border border-[#1f2937] rounded-xl p-3 cursor-default"
                          >
                            <p
                              className="text-[22px] font-bold leading-none mb-0.5"
                              style={{ color: item.color }}
                            >
                              {item.v}
                              {item.suffix}
                            </p>
                            <p className="text-[9px] text-third uppercase mb-1.5">
                              {item.l}
                            </p>
                            <span className="text-[9px] font-semibold text-emerald-400 bg-emerald-400/10 px-1.5 py-0.5 rounded-full">
                              {item.delta}
                            </span>
                          </motion.div>
                        ))}
                      </div>

                      {/* interactive bar chart */}
                      <div className="flex-1 bg-[#0b0e13] border border-[#1f2937] rounded-xl p-3 flex flex-col ">
                        <div className="flex items-center justify-between mb-2 h-5">
                          <span className="text-[10px] text-third uppercase tracking-wide">
                            Monthly Inquiries
                          </span>
                          <AnimatePresence mode="wait">
                            {hoveredBar !== null ? (
                              <motion.span
                                key="hov"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="text-[10px] text-fourth font-bold"
                              >
                                {BARS[hoveredBar].m}: {BARS[hoveredBar].v}{" "}
                                inquiries
                              </motion.span>
                            ) : (
                              <motion.span
                                key="def"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="text-[10px] text-fourth font-semibold"
                              >
                                ↑ 34% vs last month
                              </motion.span>
                            )}
                          </AnimatePresence>
                        </div>
                        <div className="flex items-end gap-1 flex-1">
                          {BARS.map((bar, i) => (
                            <div
                              key={i}
                              className="flex-1 flex flex-col items-center gap-1 h-full justify-end cursor-pointer"
                              onMouseEnter={() => setHoveredBar(i)}
                              onMouseLeave={() => setHoveredBar(null)}
                            >
                              <motion.div
                                initial={{ scaleY: 0 }}
                                animate={{
                                  scaleY: 1,
                                  background:
                                    hoveredBar === i
                                      ? "#3b82f6"
                                      : hoveredBar !== null
                                        ? "#0d1f33"
                                        : "#1e3a5f",
                                  boxShadow:
                                    hoveredBar === i
                                      ? "0 0 14px #3b82f680"
                                      : "none",
                                }}
                                transition={{
                                  duration: hoveredBar !== null ? 0.12 : 0.5,
                                  delay: hoveredBar !== null ? 0 : 0.04 * i,
                                  ease: "easeOut",
                                }}
                                style={{
                                  height: `${bar.v}%`,
                                  transformOrigin: "bottom",
                                }}
                                className="w-full rounded-sm"
                              />
                              <span
                                className={`text-[8px] transition-colors duration-100 ${hoveredBar === i ? "text-fourth" : "text-[#374151]"}`}
                              >
                                {bar.m}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* INQUIRIES */}
                  {activeTab === 1 && (
                    <motion.div
                      key="inquiries"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.22 }}
                      className="h-full flex flex-col gap-2"
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <motion.span
                          animate={{ opacity: [1, 0.3, 1] }}
                          transition={{ duration: 1.2, repeat: Infinity }}
                          className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400"
                        />
                        <p className="text-[10px] text-third uppercase tracking-widest">
                          Live Feed · updating
                        </p>
                      </div>

                      <div className="flex-1 flex flex-col gap-2 overflow-hidden">
                        <AnimatePresence initial={false}>
                          {inquiries.map((inq) => (
                            <motion.div
                              key={inq._key}
                              initial={{ opacity: 0, y: -28, scale: 0.96 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{
                                opacity: 0,
                                scale: 0.95,
                                height: 0,
                                marginBottom: 0,
                              }}
                              transition={{ duration: 0.35 }}
                              whileHover={{
                                x: 3,
                                borderColor: "rgba(59,130,246,0.4)",
                              }}
                              className="flex items-center gap-3 bg-[#0b0e13] border border-[#1f2937] rounded-xl p-3 cursor-default group"
                            >
                              <Avatar initials={inq.avatar} color={inq.color} />
                              <div className="flex-1 min-w-0">
                                <p className="text-[12px] text-primary font-semibold truncate">
                                  {inq.name}
                                </p>
                                <p className="text-[10px] text-third truncate">
                                  {inq.vehicle}
                                </p>
                              </div>
                              <div className="flex flex-col items-end gap-1.5 shrink-0">
                                <span className="text-[9px] text-[#4b5563]">
                                  {inq.time}
                                </span>
                                <span className="text-[9px] bg-fourth/10 text-fourth border border-fourth/20 px-2 py-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                  Reply →
                                </span>
                              </div>
                            </motion.div>
                          ))}
                        </AnimatePresence>
                      </div>

                      <div className="grid grid-cols-2 gap-2 mt-auto pt-1">
                        {[
                          { label: "Avg Response", value: "4.2 min" },
                          { label: "Open Rate", value: "97%" },
                        ].map(({ label, value }) => (
                          <motion.div
                            key={label}
                            whileHover={{ scale: 1.03 }}
                            transition={{ duration: 0.15 }}
                            className="bg-[#0b0e13] border border-[#1f2937] rounded-lg p-2.5 text-center cursor-default"
                          >
                            <p className="text-sm font-bold text-fourth">
                              {value}
                            </p>
                            <p className="text-[9px] text-third uppercase">
                              {label}
                            </p>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* SCORE */}
                  {activeTab === 2 && (
                    <motion.div
                      key="score"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.22 }}
                      className="h-full flex flex-col gap-3"
                    >
                      <div className="flex items-center gap-5 bg-[#0b0e13] border border-[#1f2937] rounded-xl p-4">
                        <div className="relative w-20 h-20 shrink-0">
                          <svg
                            viewBox="0 0 80 80"
                            className="w-full h-full -rotate-90"
                          >
                            <circle
                              cx="40"
                              cy="40"
                              r="32"
                              fill="none"
                              stroke="#1f2937"
                              strokeWidth="6"
                            />
                            <motion.circle
                              cx="40"
                              cy="40"
                              r="32"
                              fill="none"
                              stroke="#3b82f6"
                              strokeWidth="6"
                              strokeLinecap="round"
                              strokeDasharray={`${2 * Math.PI * 32}`}
                              initial={{ strokeDashoffset: 2 * Math.PI * 32 }}
                              animate={{
                                strokeDashoffset: 2 * Math.PI * 32 * (1 - 0.87),
                              }}
                              transition={{
                                duration: 1.2,
                                delay: 0.1,
                                ease: "easeOut",
                              }}
                            />
                          </svg>
                          <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-xl font-bold text-fourth leading-none">
                              87
                            </span>
                            <span className="text-[8px] text-third">/100</span>
                          </div>
                        </div>
                        <div>
                          <p className="text-sm font-bold text-primary mb-0.5">
                            Excellent
                          </p>
                          <p className="text-[10px] text-third mb-2">
                            Top 8% of consultants on AVX
                          </p>
                          <span className="text-[9px] bg-fourth/10 text-fourth border border-fourth/20 px-2 py-1 rounded-full">
                            +4 pts this month
                          </span>
                        </div>
                      </div>

                      <div className="flex-1 bg-[#0b0e13] border border-[#1f2937] rounded-xl p-4 flex flex-col justify-center gap-3">
                        <p className="text-[10px] text-third uppercase tracking-widest mb-1">
                          Score Breakdown
                        </p>
                        {SUB_SCORES.map(({ label, pct }, i) => (
                          <motion.div
                            key={label}
                            whileHover={{ x: 2 }}
                            transition={{ duration: 0.12 }}
                            className="group/score cursor-default"
                          >
                            <div className="flex justify-between mb-1">
                              <span className="text-[11px] text-primary group-hover/score:text-fourth transition-colors duration-150">
                                {label}
                              </span>
                              <span className="text-[11px] font-bold text-fourth">
                                {pct}%
                              </span>
                            </div>
                            <div className="h-1.5 bg-[#1f2937] rounded-full overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${pct}%` }}
                                transition={{
                                  duration: 0.9,
                                  delay: 0.1 + i * 0.12,
                                  ease: "easeOut",
                                }}
                                className="h-full rounded-full bg-fourth group-hover/score:brightness-125 transition-all duration-150"
                              />
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
