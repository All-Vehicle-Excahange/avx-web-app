"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  MessageSquare,
  Search,
  Shield,
  ChevronRight,
  Clock,
  X,
} from "lucide-react";
import { articles, tagStyles } from "./Articles.data";

export default function CategoryPage() {
  const [hoveredId, setHoveredId] = useState(null);
  const [search, setSearch] = useState("");

  const filtered = articles.filter(
    (a) =>
      a.question.toLowerCase().includes(search.toLowerCase()) ||
      a.excerpt.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <section className="relative py-16 px-4 sm:px-8 lg:px-16 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-white/5 to-transparent" />

      <div className="max-w-7xl mx-auto">
        {/* ── HEADER ── */}
        <div className="mb-12">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-[10px] tracking-[0.35em] uppercase font-black mb-5 font-primary">
            <Link
              href="/help"
              className="text-primary/30 hover:text-primary transition-colors"
            >
              Help Center
            </Link>
            <ChevronRight size={10} className="text-primary/20" />
            <span className="text-primary/60">AVX Inspection</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-11 h-11 rounded-2xl flex items-center justify-center shrink-0"
                  
                >
                  <Shield size={22} className="text-primary" />
                </div>
                <p className="text-[11px] uppercase tracking-[0.35em] font-black text-primary/25 font-primary">
                  FAQ Category
                </p>
              </div>
              <h1 className="font-primary text-[clamp(2.2rem,5vw,4rem)] font-black uppercase leading-none tracking-tight text-primary">
                AVX <span className="text-fourth">Inspection</span>
              </h1>
              <p className="mt-3 text-sm leading-relaxed max-w-md text-primary/40 font-secondary">
                Everything you need to know about our 200-point vehicle
                inspection — from request to report.
              </p>
            </div>

            {/* Article count badge */}
            <div
              className="self-start sm:self-auto flex items-center gap-3 px-5 py-3 rounded-2xl border border-white/8"
              style={{ background: "rgba(255,255,255,0.03)" }}
            >
              <span className="font-primary font-black text-3xl leading-none text-primary">
                {articles.length}
              </span>
              <div>
                <div className="text-[9px] uppercase tracking-widest font-black text-primary/40 font-primary">
                  Articles
                </div>
                <div className="text-[9px] uppercase tracking-widest text-primary/40 font-primary">
                  Available
                </div>
              </div>
            </div>
          </div>

          {/* Separator */}
          <div className="h-px w-full mt-8 bg-linear-to-r from-fourth/25 via-white/5 to-transparent" />
        </div>

        {/* ── SEARCH ── */}
        <div className="mb-8 relative">
          <Search
            size={14}
            className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none text-primary/25"
          />
          <input
            type="text"
            placeholder="Search inspection articles…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 pr-10 py-3.5 rounded-xl text-sm outline-none transition-all duration-300 font-secondary"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.07)",
              color: "rgba(255,255,255,0.8)",
            }}
            onFocus={(e) => {
              e.target.style.borderColor = "rgba(0,123,255,0.4)";
              e.target.style.background = "rgba(0,123,255,0.04)";
            }}
            onBlur={(e) => {
              e.target.style.borderColor = "rgba(255,255,255,0.07)";
              e.target.style.background = "rgba(255,255,255,0.03)";
            }}
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-primary/30 hover:text-primary/60 transition-colors"
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* ── ARTICLE LIST ── */}
        <div className="flex flex-col mb-14">
          {filtered.length === 0 && (
            <p className="text-sm py-14 text-center text-primary/25">
              No articles match your search.
            </p>
          )}

          {filtered.map((article, i) => {
            const isHovered = hoveredId === article.id;
            const tc = tagStyles[article.tag] || {
              bg: "rgba(255,255,255,0.06)",
              text: "rgba(255,255,255,0.5)",
            };

            return (
              <Link
                key={article.id}
                href={`/help/${article.slug}`}
                onMouseEnter={() => setHoveredId(article.id)}
                onMouseLeave={() => setHoveredId(null)}
                className="group relative flex items-start gap-4 sm:gap-6 py-5 sm:py-6 transition-all duration-300 ease-out"
                style={{
                  borderBottom: "1px solid rgba(255,255,255,0.05)",
                  borderTop:
                    i === 0 ? "1px solid rgba(255,255,255,0.05)" : "none",
                  paddingLeft: isHovered ? "14px" : "0px",
                }}
              >
                {/* Left accent bar on hover */}
                {isHovered && (
                  <div className="absolute left-0 top-4 bottom-4 w-[2px] rounded-full bg-primary/50" />
                )}

                {/* Number */}
                <span
                  className="shrink-0 font-black tabular-nums leading-none text-[11px] pt-1 min-w-7 transition-colors duration-300 font-primary"
                  style={{
                    color: isHovered
                      ? ""
                      : "rgba(255,255,255,0.12)",
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span
                      className="text-[9px] uppercase tracking-[0.25em] font-black px-2 py-0.5 rounded-md font-primary"
                      style={{ backgroundColor: tc.bg, color: tc.text }}
                    >
                      {article.tag}
                    </span>
                    <span className="flex items-center gap-1 text-[9px] uppercase tracking-widest text-primary/20 font-primary">
                      <Clock size={8} /> {article.readTime} read
                    </span>
                  </div>

                  <h3
                    className="font-semibold text-sm sm:text-base leading-snug mb-1.5 transition-colors duration-200 font-secondary"
                    style={{
                      color: isHovered
                        ? "rgba(255,255,255,0.95)"
                        : "rgba(255,255,255,0.65)",
                    }}
                  >
                    {article.question}
                  </h3>

                  <p
                    className="text-[12px] sm:text-[13px] leading-relaxed line-clamp-2 text-primary/30 transition-all duration-300 font-secondary"
                    style={{
                      maxHeight: isHovered ? "60px" : "0px",
                      overflow: "hidden",
                      opacity: isHovered ? 1 : 0,
                    }}
                  >
                    {article.excerpt}
                  </p>
                </div>

                {/* Arrow */}
                <div
                  className="shrink-0 flex items-center justify-center w-9 h-9 rounded-xl transition-all duration-300 mt-0.5 "
                  
                >
                  <ArrowUpRight
                    size={18}
                    className="transition-all duration-200"
                    style={{
                      color: isHovered ? "#fff" : "rgba(255,255,255,0.2)",
                      transform: isHovered ? "translate(1px,-1px)" : "none",
                    }}
                  />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
