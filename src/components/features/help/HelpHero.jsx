"use client";

import { useState, useRef, useEffect } from "react";
import { Search, Zap, X } from "lucide-react";

const TAGS = [
  "Inspection",
  "Listing",
  "PPC",
  "Subscription",
  "Inquiry",
  "Storefront",
];

const SUGGESTIONS = [
  "How to schedule a vehicle inspection?",
  "Why is my listing not showing up?",
  "How do I upgrade my consultant tier?",
  "Request a refund for subscription",
  "PPC campaign setup guide",
  "Storefront customization options",
];

export default function HelpHero() {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const [activeTag, setActiveTag] = useState(null);
  const [mounted, setMounted] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 10);

    return () => clearTimeout(timer);
  }, []);

  const filtered =
    query.length > 0
      ? SUGGESTIONS.filter((s) => s.toLowerCase().includes(query.toLowerCase()))
      : SUGGESTIONS;

  const handleTag = (tag) => {
    setActiveTag(activeTag === tag ? null : tag);
    setQuery(tag);
    inputRef.current?.focus();
  };

  const clearQuery = () => {
    setQuery("");
    setActiveTag(null);
    inputRef.current?.focus();
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-2  py-16 overflow-hidden font-secondary">
      {/* Background grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Radial ambient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 65% 55% at 50% 40%, rgba(0,123,255,0.06) 0%, transparent 70%)",
        }}
      />

      {/* Content wrapper */}
      <div
        className={`relative z-10 w-full max-w-2xl transition-all duration-700 ease-out ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        {/* Label */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <div className="h-px w-10 bg-linear-to-r from-transparent to-blue-500/50" />
          <span className="text-sm tracking-[0.4em] uppercase text-third font-semibold">
            Help Hero
          </span>
          <div className="h-px w-10 bg-linear-to-l from-transparent to-blue-500/50" />
        </div>

        {/* Main Title */}
        <h1 className="font-primary text-3xl sm:text-4xl lg:text-5xl font-black text-center uppercase leading-[1.1] text-primary tracking-tight mb-2">
          How can we <span className="inline-block text-fourth">help</span> you
          today?
        </h1>

        <p className="text-center text-m mb-8 text-primary/40 tracking-wide">
          Search articles, guides, and support resources across AVX.
        </p>

        {/* Search Box */}
        <div className="relative">
          {/* Outer glow */}
          <div
            className={`absolute -inset-0.5 rounded-[18px] pointer-events-none transition-opacity duration-300 bg-linear-to-br from-blue-500/40 to-blue-800/20 ${
              focused ? "opacity-100" : "opacity-0"
            }`}
          />

          {/* Inner bar */}
          <div
            className={`relative z-10 flex items-center gap-3.5 px-5 py-4 rounded-2xl backdrop-blur-md transition-all duration-300 border ${
              focused
                ? "border-blue-500/35 bg-[#000514]/75"
                : "border-primary/10 bg-black/45"
            }`}
          >
            <Search
              size={18}
              className={`shrink-0 transition-colors duration-300 ${focused ? "text-blue-500/80" : "text-primary/30"}`}
            />

            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setTimeout(() => setFocused(false), 200)}
              placeholder='Try "inspection", "listing issue", "tier upgrade", "refund"'
              className="flex-1 min-w-0 bg-transparent border-none outline-none text-primary text-[0.92rem] font-secondary tracking-wide placeholder:text-primary/20 placeholder:tracking-[0.08em]"
            />

            {query && (
              <button
                onClick={clearQuery}
                className="flex items-center shrink-0 bg-transparent text-primary/40 hover:text-primary/60 transition-colors"
              >
                <X size={14} />
              </button>
            )}

            <button className="shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-[10px] bg-blue-600 text-primary border-none cursor-pointer text-[11px] font-bold uppercase font-primary tracking-[0.15em] transition-all duration-200 hover:-translate-y-0.5 shadow-[0_4px_20px_rgba(0,123,255,0.25)] hover:shadow-[0_6px_28px_rgba(0,123,255,0.45)]">
              <Zap size={11} />
              Search
            </button>
          </div>

          {/* Dropdown */}
          {focused && (
            <div className="absolute top-[calc(100%+8px)] left-0 right-0 z-50 rounded-[14px] overflow-scroll h-53.5 backdrop-blur-xl border border-blue-500/15 bg-[#0a0a14]/95 shadow-[0_20px_60px_rgba(0,0,0,0.6),0_0_0_1px_rgba(255,255,255,0.04)]">
              <div className="px-4 pt-2.5 pb-2 text-[9px] tracking-[0.35em] uppercase font-bold font-primary text-primary/30 border-b border-primary/5 sticky top-0 bg-[#0a0a14]/95 z-10">
                {query ? "Results" : "Suggested"}
              </div>

              {filtered.length > 0 ? (
                filtered.map((s, i) => (
                  <button
                    key={i}
                    // CHANGED: Use onMouseDown to prevent the input's onBlur from hiding the menu before click
                    onMouseDown={(e) => {
                      e.preventDefault(); // Prevents input from losing focus immediately
                      setQuery(s);
                      setFocused(false);
                    }}
                    className={`flex items-center gap-3 w-full px-4 py-3 bg-transparent text-primary/70 hover:bg-blue-500/10 hover:text-primary text-[0.85rem] font-secondary text-left transition-all duration-150 ${
                      i < filtered.length - 1 ? "border-b border-primary/3" : ""
                    }`}
                  >
                    <Search size={12} className="shrink-0 text-blue-500/40" />
                    {s}
                  </button>
                ))
              ) : (
                <div className="px-4 py-4 text-[0.83rem] text-center text-primary/30">
                  No results for {query}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Popular Tags */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2.5">
          <span className="text-[10px] tracking-[0.35em] uppercase font-bold font-primary mr-1 text-primary/40">
            Popular:
          </span>

          {TAGS.map((tag, i) => {
            const isActive = activeTag === tag;
            return (
              <button
                key={tag}
                onClick={() => handleTag(tag)}
                className={`px-3.5 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-[0.15em] font-primary transition-all duration-200 ${
                  mounted
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-2"
                } ${
                  isActive
                    ? "border-blue-500/50 bg-blue-500/10 text-blue-500/90"
                    : "border-primary/10 bg-primary/5 text-primary/50 hover:border-primary/20 hover:text-primary/80 hover:bg-primary/10"
                } border`}
                style={{ transitionDelay: `${0.1 + i * 0.06}s` }}
              >
                {tag}
              </button>
            );
          })}
        </div>

        {/* Bottom Stats */}
        <div className="mt-14 flex items-center justify-center">
          {[
            { value: "500+", label: "Articles" },
            { value: "24/7", label: "Support" },
            { value: "98%", label: "Resolved" },
          ].map((stat, i) => (
            <div
              key={i}
              className={`px-10 text-center ${i > 0 ? "border-l border-primary/10" : "border-none"}`}
            >
              <div
                className={`font-primary font-black text-2xl leading-none tracking-[1px] ${i === 1 ? "text-blue-500" : "text-primary"}`}
              >
                {stat.value}
              </div>
              <div className="text-[9px] tracking-[0.3em] uppercase font-semibold mt-1 text-primary/30">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
