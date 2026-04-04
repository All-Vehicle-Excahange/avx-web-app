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
    <section className="relative py-16 px-2 sm:px-8 lg:px-4 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-white/5 to-transparent" />

      <div className="max-w-7xl mx-auto">
        {/* ── HEADER ── */}
        <div className="mb-12">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm tracking-[0.4em] uppercase text-third font-semibold mb-5">

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
             
              <h2
                className="
             text-3xl sm:text-4xl lg:text-5xl
              font-semibold
              leading-[1.05]
              text-primary
              font-[Montserrat]
            "
              >
               AVX
                <span className="text-fourth/80"> Inspection
                </span>
              </h2>
              <p className="mt-3 text-sm leading-relaxed max-w-md text-primary/40 font-secondary">
                Everything you need to know about our 200-point vehicle
                inspection — from request to report.
              </p>
            </div>

            {/* Article count badge */}
            <div className="self-start sm:self-auto flex items-center gap-3 px-5 py-3 rounded-2xl border border-white/8 bg-primary/5">
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
            className="w-full pl-11 pr-10 py-3.5 rounded-xl text-sm outline-none transition-all duration-300 font-secondary text-primary/70 bg-third/5 border border-third/15"
        
            onFocus={(e) => {
              e.target.style.borderColor = "rgba(255,254,255,0.1)";
              e.target.style.background = " rgba(255,254,255,0.07)";
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
              bgClass: "bg-primary/10",
              textClass: "text-primary/50",
            };

            return (
              <Link
                key={article.id}
                href={`/help/${article.slug}`}
                onMouseEnter={() => setHoveredId(article.id)}
                onMouseLeave={() => setHoveredId(null)}
                className={`group relative flex items-start gap-4 sm:gap-6 py-5 sm:py-6 transition-all duration-300 ease-out border-b border-white/5 first:border-t first:border-white/5 pl-0 hover:pl-3`}
              >
                {/* Left accent bar on hover */}
                {isHovered && (
                  <div className="absolute left-0 top-4 bottom-4 w-[2px] rounded-full bg-primary/50" />
                )}

                {/* Number */}
                <span
                  className={`shrink-0 font-black tabular-nums leading-none text-[11px] pt-1 min-w-7 transition-colors duration-300 font-primary ${isHovered ? "text-primary" : "text-primary/10"}`}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className={`text-[9px] uppercase tracking-[0.25em] font-black px-2 py-0.5 rounded-md font-primary ${tc.bgClass} ${tc.textClass}`}>
                      {article.tag}
                    </span>
                    <span className="flex items-center gap-1 text-[9px] uppercase tracking-widest text-primary/20 font-primary">
                      <Clock size={8} /> {article.readTime} read
                    </span>
                  </div>

                  <h3
                    className={`font-semibold text-sm sm:text-base leading-snug mb-1.5 transition-colors duration-200 font-secondary ${isHovered ? "text-primary" : "text-primary/65"}`}
                  >
                    {article.question}
                  </h3>

                  <p
                    className={`text-[12px] sm:text-[13px] leading-relaxed line-clamp-2 text-primary/30 transition-all duration-300 font-secondary overflow-hidden ${isHovered ? "max-h-16 opacity-100" : "max-h-0 opacity-0"}`}
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
                    className={`transition-all duration-200 ${isHovered ? "text-primary translate-x-1 -translate-y-1" : "text-primary/20"}`}
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
