"use client";

import { useState, useEffect, useRef } from "react";
import {
  BarChart2,
  ShieldCheck,
  Users,
  AlignLeft,
  TrendingUp,
  Store,
  Layers,
  PieChart,
  Zap,
  BadgeCheck,
  ArrowUpRight,
} from "lucide-react";

const personas = {
  buyer: {
    id: "buyer",
    label: "Buyer",
    role: "For Buyers",
    headline: ["Find the", "Right Car,", "First Time."],
    sub: "Every listing built for clarity. Every consultant verified for trust.",
    cta: "Explore Vehicles",
    features: [
      {
        icon: BarChart2,
        text: "Structured comparison tools",
        note: "Side-by-side specs",
      },
      {
        icon: ShieldCheck,
        text: "Inspection reassurance",
        note: "200-point layer",
      },
      {
        icon: Users,
        text: "Verified consultant ecosystem",
        note: "Identity checked",
      },
      { icon: AlignLeft, text: "Clear listing format", note: "Standardized" },
      {
        icon: TrendingUp,
        text: "Performance transparency",
        note: "Score visible",
      },
    ],
    index: "01",
    accent: "white",
  },
  consultant: {
    id: "consultant",
    label: "Consultant",
    role: "For Consultants",
    headline: ["Build Your", "Storefront.", "Get Found."],
    sub: "Tier-based visibility, analytics, and credibility tools in one platform.",
    cta: "Become a Consultant",
    features: [
      { icon: Store, text: "Public storefront", note: "Branded page" },
      {
        icon: Layers,
        text: "Tier-based visibility",
        note: "Performance-ranked",
      },
      { icon: PieChart, text: "Analytics dashboard", note: "Real-time data" },
      { icon: Zap, text: "Boost campaigns", note: "Priority access" },
      {
        icon: BadgeCheck,
        text: "Inspection credibility layer",
        note: "Trust signal",
      },
    ],
    index: "02",
    accent: "blue",
  },
};

export default function PerspectiveSwitcher() {
  const [active, setActive] = useState("buyer");
  const [displayed, setDisplayed] = useState("buyer");
  const [phase, setPhase] = useState("idle");
  const [direction, setDirection] = useState(1);
  const timerRef = useRef(null);

  const data = personas[displayed];
  const isBlue = displayed === "consultant";

  const switchTo = (id) => {
    if (id === active || phase !== "idle") return;
    setActive(id);
    setDirection(id === "consultant" ? 1 : -1);
    setPhase("exit");

    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setDisplayed(id);
      setPhase("enter");
      timerRef.current = setTimeout(() => setPhase("idle"), 520);
    }, 380);
  };

  useEffect(() => () => clearTimeout(timerRef.current), []);

  const exitY = direction === 1 ? "-20px" : "20px";
  const enterY = direction === 1 ? "20px" : "-20px";

  const headlineStyle = (i) => {
    const base = {
      fontSize: "clamp(1.8rem, 5vw, 3.8rem)",
      color:
        i === 1 ? (isBlue ? "#007bff" : "rgba(255,254,247,0.45)") : "#fffef7",
      display: "block",
    };
    if (phase === "exit")
      return {
        ...base,
        opacity: 0,
        transform: `translateY(${exitY})`,
        transition: `opacity 0.28s ${i * 0.04}s ease-in, transform 0.28s ${i * 0.04}s ease-in`,
      };
    if (phase === "enter")
      return {
        ...base,
        animation: `slideInLine 0.42s ${0.06 + i * 0.07}s cubic-bezier(0.22,1,0.36,1) both`,
        "--from-y": enterY,
      };
    return {
      ...base,
      opacity: 1,
      transform: "translateY(0)",
      transition: "color 0.5s",
    };
  };

  const featureStyle = (i) => {
    if (phase === "exit")
      return {
        opacity: 0,
        transform: `translateX(${direction === 1 ? "-16px" : "16px"})`,
        transition: `opacity 0.22s ${i * 0.03}s ease-in, transform 0.22s ${i * 0.03}s ease-in`,
      };
    if (phase === "enter")
      return {
        animation: `slideInFeature 0.44s ${0.1 + i * 0.06}s cubic-bezier(0.22,1,0.36,1) both`,
        "--from-x": direction === 1 ? "18px" : "-18px",
      };
    return { opacity: 1, transform: "translateX(0)" };
  };

  const leftMetaStyle = () => {
    if (phase === "exit")
      return {
        opacity: 0,
        transform: `translateY(${exitY})`,
        transition:
          "opacity 0.25s 0.05s ease-in, transform 0.25s 0.05s ease-in",
      };
    if (phase === "enter")
      return {
        animation: `fadeSlideIn 0.44s 0.32s cubic-bezier(0.22,1,0.36,1) both`,
        "--from-y": enterY,
      };
    return { opacity: 1 };
  };

  const indexStyle = () => {
    if (phase === "exit")
      return {
        opacity: 0,
        transform: "scale(0.85)",
        transition: "opacity 0.3s ease-in, transform 0.3s ease-in",
      };
    if (phase === "enter")
      return {
        animation: "scaleIn 0.55s 0.15s cubic-bezier(0.22,1,0.36,1) both",
      };
    return { opacity: 1, transform: "scale(1)" };
  };

  return (
    <section className="relative py-10  overflow-hidden font-secondary text-primary min-h-screen flex flex-col justify-center">
      {/* Grid texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.018) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.018) 1px,transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />

      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: isBlue
            ? "radial-gradient(ellipse 70% 60% at 75% 50%, rgba(0,123,255,0.08) 0%, transparent 70%)"
            : "radial-gradient(ellipse 60% 60% at 25% 50%, rgba(255,255,255,0.04) 0%, transparent 70%)",
          transition: "background 0.7s ease",
        }}
      />

      {/* Wipe flash overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: isBlue
            ? "linear-gradient(105deg, transparent 40%, rgba(0,123,255,0.04) 100%)"
            : "linear-gradient(105deg, rgba(255,255,255,0.02) 0%, transparent 60%)",
          opacity: phase === "enter" ? 1 : 0,
          transition: "opacity 0.5s ease",
        }}
      />

      <div className=" mx-auto w-full relative">
        {/* ── TOP TOGGLE BAR ── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 sm:gap-0 mb-10 sm:mb-14">
          <div>
            <p className="text-[11px] sm:text-sm tracking-[0.4em] uppercase text-third font-semibold mb-1">
              Choose Your Path
            </p>
            <h2 className="font-primary text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight leading-none text-primary">
              Your{" "}
              <span
                style={{
                  ...(isBlue
                    ? { color: "#007bff" }
                    : {
                        WebkitTextStroke: "1px rgba(255,254,247,0.5)",
                        color: "transparent",
                      }),
                  transition:
                    "color 0.5s ease, -webkit-text-stroke-color 0.5s ease",
                  display: "inline-block",
                }}
              >
                Platform.
              </span>
            </h2>
          </div>

          {/* Pill toggle */}
          <div className="relative flex items-center p-1 rounded-2xl border border-white/10 bg-white/3 backdrop-blur-sm gap-1 self-start sm:self-auto">
            {["buyer", "consultant"].map((id) => (
              <button
                key={id}
                onClick={() => switchTo(id)}
                className={`relative z-10 px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] transition-all duration-300 ${
                  active === id
                    ? id === "consultant"
                      ? "bg-fourth text-primary shadow-lg shadow-fourth/20"
                      : "bg-white/15 text-primary"
                    : "text-third/50 hover:text-third/80"
                }`}
              >
                {personas[id].label}
              </button>
            ))}
          </div>
        </div>

        {/* ── MAIN PANEL ── */}
        <div
          className="relative border rounded-2xl sm:rounded-3xl overflow-hidden backdrop-blur-sm bg-black/10"
          style={{
            borderColor: isBlue
              ? "rgba(0,123,255,0.2)"
              : "rgba(255,255,255,0.07)",
            transition: "border-color 0.6s ease",
          }}
        >
          {/* Top accent line */}
          <div
            className="absolute top-0 left-0 right-0 h-px"
            style={{
              background: isBlue
                ? "linear-gradient(90deg, transparent, rgba(0,123,255,0.5), transparent)"
                : "linear-gradient(90deg, transparent, rgba(255,254,247,0.2), transparent)",
              transition: "background 0.6s ease",
            }}
          />

          {/* Sliding column highlight — desktop only */}
          <div
            className="hidden lg:block absolute top-0 bottom-0 w-1/2 pointer-events-none"
            style={{
              left: isBlue ? "50%" : "0%",
              background: isBlue
                ? "linear-gradient(90deg, transparent, rgba(0,123,255,0.04))"
                : "linear-gradient(90deg, rgba(255,255,255,0.015), transparent)",
              transition:
                "left 0.55s cubic-bezier(0.65,0,0.35,1), background 0.55s ease",
            }}
          />

          {/* On mobile: stacked. On desktop: side-by-side with divider */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1px_1fr]">
            {/* ── LEFT: ROLE IDENTITY ── */}
            <div className="relative p-8 sm:p-10 lg:p-14 flex flex-col justify-between min-h-90 sm:min-h-105 lg:min-h-120">
              {/* Ghost index */}
              <div
                className="absolute top-6 right-6 sm:top-8 sm:right-10 font-primary font-black select-none leading-none"
                style={{
                  fontSize: "clamp(4rem, 12vw, 9rem)",
                  color: isBlue
                    ? "rgba(0,123,255,0.06)"
                    : "rgba(255,254,247,0.04)",
                  transition: "color 0.5s ease",
                  ...indexStyle(),
                }}
              >
                {data.index}
              </div>

              {/* Role pill */}
              <div
                className="inline-flex items-center gap-2 self-start px-3 py-1.5 rounded-full border text-[10px] uppercase tracking-[0.25em] font-semibold"
                style={{
                  borderColor: isBlue
                    ? "rgba(0,123,255,0.3)"
                    : "rgba(255,255,255,0.15)",
                  backgroundColor: isBlue
                    ? "rgba(0,123,255,0.1)"
                    : "rgba(255,255,255,0.05)",
                  color: isBlue
                    ? "rgba(0,123,255,0.8)"
                    : "rgba(190,190,190,0.6)",
                  transition: "all 0.5s ease",
                  ...leftMetaStyle(),
                }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{
                    backgroundColor: isBlue
                      ? "#007bff"
                      : "rgba(255,255,255,0.5)",
                    transition: "background-color 0.5s ease",
                  }}
                />
                {data.role}
              </div>

              {/* Headline */}
              <div className="mt-5 sm:mt-6 flex-1 flex flex-col justify-center">
                {data.headline.map((line, i) => (
                  <div key={`${displayed}-${i}`} className="overflow-hidden">
                    <span
                      className="font-primary font-black uppercase leading-[1.05]"
                      style={headlineStyle(i)}
                    >
                      {line}
                    </span>
                  </div>
                ))}
              </div>

              {/* Sub + CTA */}
              <div className="mt-8 sm:mt-10" style={leftMetaStyle()}>
                <p className="text-third/60 text-sm leading-relaxed mb-5 sm:mb-6 max-w-xs">
                  {data.sub}
                </p>
                <button
                  className="group flex items-center gap-3 px-5 sm:px-6 py-3 sm:py-3.5 rounded-xl font-primary text-[11px] sm:text-[12px] font-bold uppercase tracking-[0.18em] transition-all duration-300"
                  style={{
                    backgroundColor: isBlue
                      ? "#007bff"
                      : "rgba(255,255,255,0.10)",
                    color: "#fffef7",
                    border: isBlue
                      ? "none"
                      : "1px solid rgba(255,255,255,0.15)",
                    boxShadow: isBlue
                      ? "0 8px 30px rgba(0,123,255,0.2)"
                      : "none",
                    transition: "all 0.4s ease",
                  }}
                >
                  {data.cta}
                  <ArrowUpRight
                    size={14}
                    className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </button>
              </div>
            </div>

            {/* ── CENTER DIVIDER — desktop only ── */}
            <div
              className="hidden lg:block w-px self-stretch"
              style={{
                background: isBlue
                  ? "linear-gradient(to bottom, transparent, rgba(0,123,255,0.25) 30%, rgba(0,123,255,0.25) 70%, transparent)"
                  : "linear-gradient(to bottom, transparent, rgba(255,255,255,0.08) 30%, rgba(255,255,255,0.08) 70%, transparent)",
                transition: "background 0.6s ease",
              }}
            />

            {/* Horizontal divider — mobile only */}
            <div
              className="block lg:hidden h-px mx-8 sm:mx-10"
              style={{
                background: isBlue
                  ? "linear-gradient(to right, transparent, rgba(0,123,255,0.2), transparent)"
                  : "linear-gradient(to right, transparent, rgba(255,255,255,0.07), transparent)",
                transition: "background 0.6s ease",
              }}
            />

            {/* ── RIGHT: FEATURES ── */}
            <div className="p-8 sm:p-10 lg:p-14 flex flex-col justify-center">
              <p className="text-[11px] sm:text-[12px] tracking-[0.3em] uppercase text-third/40 font-semibold mb-6 sm:mb-7">
                Platform Features
              </p>

              <div className="flex flex-col gap-0">
                {data.features.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={`${displayed}-feat-${i}`}
                      className={`group flex items-center gap-3 sm:gap-5 py-3.5 sm:py-4 border-b -mx-2 px-2 rounded-lg ${
                        i === 0 ? "border-t" : ""
                      }`}
                      style={{
                        borderColor: isBlue
                          ? "rgba(0,123,255,0.08)"
                          : "rgba(255,255,255,0.06)",
                        transition: "border-color 0.5s ease",
                        ...featureStyle(i),
                      }}
                    >
                      {/* Number */}
                      <span className="font-primary text-[10px] sm:text-[11px] font-black text-third/40 w-5 shrink-0 tabular-nums">
                        {String(i + 1).padStart(2, "0")}
                      </span>

                      {/* Icon */}
                      <div
                        className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-xl shrink-0 transition-all duration-300"
                        style={{
                          backgroundColor: isBlue
                            ? "rgba(0,123,255,0.10)"
                            : "rgba(255,255,255,0.05)",
                          color: isBlue
                            ? "rgba(0,123,255,0.6)"
                            : "rgba(190,190,190,0.4)",
                        }}
                      >
                        <Icon size={14} />
                      </div>

                      {/* Text */}
                      <div className="flex-1 min-w-0">
                        <p className="text-[12px] sm:text-[13px] font-semibold text-primary/80 group-hover:text-primary transition-colors duration-200 truncate">
                          {item.text}
                        </p>
                      </div>

                      {/* Note tag — hidden on very small screens */}
                      <span
                        className="hidden xs:inline-block text-[9px] sm:text-[10px] uppercase tracking-[0.2em] font-bold px-2 py-1 rounded-md shrink-0 transition-all duration-300"
                        style={{
                          color: isBlue
                            ? "rgba(0,123,255,0.5)"
                            : "rgba(190,190,190,0.5)",
                          backgroundColor: isBlue
                            ? "rgba(0,123,255,0.06)"
                            : "rgba(255,255,255,0.03)",
                        }}
                      >
                        {item.note}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Persona indicator dots */}
              <div className="flex items-center gap-3 mt-7 sm:mt-8">
                {["buyer", "consultant"].map((id) => (
                  <button
                    key={id}
                    onClick={() => switchTo(id)}
                    className="rounded-full"
                    style={{
                      height: "4px",
                      width: active === id ? "32px" : "12px",
                      backgroundColor:
                        active === id
                          ? isBlue
                            ? "#007bff"
                            : "rgba(255,255,255,0.4)"
                          : "rgba(255,255,255,0.08)",
                      transition: "width 0.4s ease, background-color 0.4s ease",
                    }}
                  />
                ))}
                <span className="text-[9px] uppercase tracking-widest text-third/25 ml-1">
                  {active === "buyer" ? "1 of 2" : "2 of 2"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── KEYFRAMES ── */}
      <style>{`
        @keyframes slideInLine {
          from { opacity: 0; transform: translateY(var(--from-y, 20px)); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideInFeature {
          from { opacity: 0; transform: translateX(var(--from-x, 18px)); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(var(--from-y, 16px)); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.82); }
          to   { opacity: 1; transform: scale(1); }
        }

        /* xs breakpoint for note tags */
        @media (min-width: 480px) {
          .xs\\:inline-block { display: inline-block; }
        }
      `}</style>
    </section>
  );
}
