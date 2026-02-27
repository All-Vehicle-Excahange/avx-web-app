// app/avx-help-center/page.jsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, MessageSquare, Search, Shield, ChevronRight } from "lucide-react";
import { articles, tagStyles } from "./Articles.data";

export default function CategoryPage() {
  const [hoveredId, setHoveredId] = useState(null);
  const [search, setSearch] = useState("");

  const filtered = articles.filter(
    (a) =>
      a.question.toLowerCase().includes(search.toLowerCase()) ||
      a.excerpt.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="relative py-10 overflow-hidden font-primary text-primary">
      <div className="max-w-7xl mx-auto relative">

        {/* ── HEADER ─────────────────────────────────────────── */}
        <div className="mb-14">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm tracking-[0.4em] uppercase font-semibold mb-6">
            <span className="text-third/60">Help Center</span>
            <ChevronRight size={13} className="text-third" />
            <span className="text-primary/80">AVX Inspection</span>
          </div>

          {/* Title row */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-fourth/10 text-fourth">
                  <Shield size={18} />
                </div>
                <span className="text-[13px] uppercase tracking-[0.35em] font-bold text-third/30">
                  FAQ Category
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase leading-none tracking-tight text-primary">
                AVX <span className="text-fourth">Inspection</span>
              </h1>
              <p className="mt-3 text-sm leading-relaxed max-w-md text-third/45 font-secondary">
                Everything you need to know about our 200-point vehicle inspection
                process — from request to report.
              </p>
            </div>

            {/* Article count badge */}
            <div className="self-start sm:self-auto flex items-center gap-2 px-4 py-2.5 rounded-2xl border border-primary/10 bg-primary/5">
              <span className="text-2xl font-black leading-none text-fourth">
                {articles.length}
              </span>
              <span className="text-[10px] uppercase tracking-[0.25em] font-semibold leading-tight text-third/50">
                Articles
              </span>
            </div>
          </div>

          {/* Separator */}
          <div className="h-px w-full bg-linear-to-r from-fourth/30 via-primary/10 to-transparent" />
        </div>

        {/* ── SEARCH ─────────────────────────────────────────── */}
        <div className="mb-10 relative">
          <Search
            size={14}
            className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none text-third/30"
          />
          <input
            type="text"
            placeholder="Search inspection articles…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-3.5 rounded-xl text-sm outline-none transition-all duration-300 bg-primary/5 border border-primary/10 text-primary font-secondary focus:border-fourth/40 focus:bg-fourth/5"
          />
        </div>

        {/* ── ARTICLE LIST ───────────────────────────────────── */}
        <div className="flex flex-col mb-14">
          {filtered.length === 0 && (
            <p className="text-sm py-12 text-center text-third/35">
              No articles match your search.
            </p>
          )}

          {filtered.map((article, i) => {
            const isHovered = hoveredId === article.id;
            const tc = tagStyles[article.tag] || {
              bg: "var(--color-third)",
              text: "var(--color-secondary)",
            };

            return (
              <Link
                key={article.id}
                href={`/avx-help-center/${article.slug}`}
                onMouseEnter={() => setHoveredId(article.id)}
                onMouseLeave={() => setHoveredId(null)}
                className="group relative flex items-start gap-4 sm:gap-6 py-5 sm:py-6 border-primary/5 transition-[padding] duration-300 ease-out"
                style={{
                  borderBottomWidth: "1px",
                  borderTopWidth: i === 0 ? "1px" : "0px",
                  paddingLeft: isHovered ? "12px" : "0px",
                }}
              >
                {/* Number */}
                <span className={`shrink-0 font-black tabular-nums leading-none text-[11px] pt-1 min-w-7 transition-colors duration-300 ${
                  isHovered ? "text-fourth/50" : "text-third/20"
                }`}>
                  {String(i + 1).padStart(2, "0")}
                </span>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1.5">
                    <span
                      className="text-[9px] uppercase tracking-[0.25em] font-bold px-2 py-0.5 rounded-md"
                      style={{ backgroundColor: tc.bg, color: tc.text }}
                    >
                      {article.tag}
                    </span>
                    <span className="text-[9px] uppercase tracking-widest text-third/25">
                      {article.readTime} read
                    </span>
                  </div>

                  <h3 className={`font-semibold text-sm sm:text-base leading-snug mb-1.5 transition-colors duration-200 font-secondary ${
                    isHovered ? "text-primary" : "text-primary/75"
                  }`}>
                    {article.question}
                  </h3>

                  <p className={`text-[12px] sm:text-[13px] leading-relaxed line-clamp-2 transition-all duration-350 text-third/40 ${
                    isHovered ? "opacity-100 max-h-16" : "opacity-0 max-h-0"
                  }`}>
                    {article.excerpt}
                  </p>
                </div>

                {/* Arrow */}
                <div className={`shrink-0 flex items-center justify-center w-8 h-8 rounded-xl transition-all duration-300 mt-0.5 ${
                  isHovered ? "bg-fourth/15 text-fourth" : "bg-primary/5 text-third/20"
                }`}>
                  <ArrowUpRight
                    size={14}
                    className={`transition-transform duration-200 ${isHovered ? "translate-x-0.5 -translate-y-0.5" : ""}`}
                  />
                </div>
              </Link>
            );
          })}
        </div>

        {/* ── CONTACT SUPPORT CTA ────────────────────────────── */}
        <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-fourth/15 bg-fourth/5 p-8 sm:p-10 lg:p-12">
          {/* Decorative gradients using utility classes where possible */}
          <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-fourth/45 to-transparent" />
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_60%_80%_at_50%_100%,var(--color-fourth)_0%,transparent_70%)] opacity-10" />

          <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="flex items-center justify-center w-12 h-12 rounded-2xl shrink-0 bg-fourth/15 text-fourth">
                <MessageSquare size={20} />
              </div>
              <div>
                <h3 className="font-black uppercase text-lg sm:text-xl leading-tight mb-1.5 text-primary">
                  Still have questions?
                </h3>
                <p className="text-sm leading-relaxed max-w-sm text-third/50 font-secondary">
                  Our inspection support team is available to walk you through
                  any step of the process.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 self-start sm:self-auto shrink-0 w-full md:w-auto">
              <button className="flex items-center justify-center gap-2.5 px-5 py-3 rounded-xl text-[11px] uppercase tracking-[0.18em] font-bold transition-all duration-300 bg-fourth text-primary shadow-[0_8px_30px_rgba(0,123,255,0.2)] hover:shadow-[0_12px_40px_rgba(0,123,255,0.35)] hover:-translate-y-0.5">
                Contact Support
                <ArrowUpRight size={13} />
              </button>

              <button className="flex items-center justify-center gap-2.5 px-5 py-3 rounded-xl text-[11px] uppercase tracking-[0.18em] font-bold transition-all duration-300 bg-primary/5 text-third/60 border border-primary/10 hover:border-primary/20 hover:text-primary">
                Browse All FAQs
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}