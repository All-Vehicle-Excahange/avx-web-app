"use client";
import React, { useState, useMemo } from "react";
import Image from "next/image";
import {
  Bookmark,
  Calendar,
  Clock,
  ExternalLink,
  Layers,
  Sparkles,
  Newspaper,
} from "lucide-react";
import {
  PRESS_CATEGORIES,
  INITIAL_MEDIA_ENTRIES,
  getPublishedArticles,
} from "@/data/pressMediaData";
import Button from "@/components/ui/button";

export default function PressCoverageHub() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const publishedArticles = useMemo(() => {
    return getPublishedArticles(INITIAL_MEDIA_ENTRIES);
  }, []);

  // Compute counts per category
  const categoryCounts = useMemo(() => {
    const counts = { All: publishedArticles.length };
    PRESS_CATEGORIES.forEach((cat) => {
      if (cat !== "All") {
        counts[cat] = publishedArticles.filter(
          (item) => item.category === cat
        ).length;
      }
    });
    return counts;
  }, [publishedArticles]);

  // Filtered list
  const filteredArticles = useMemo(() => {
    if (selectedCategory === "All") {
      return publishedArticles;
    }
    return publishedArticles.filter(
      (item) => item.category === selectedCategory
    );
  }, [publishedArticles, selectedCategory]);

  // Separate featured article from regular articles (avoid duplicates)
  const featuredArticle = useMemo(() => {
    if (filteredArticles.length === 0) return null;
    const explicitlyFeatured = filteredArticles.find((item) => item.featured);
    if (explicitlyFeatured) return explicitlyFeatured;
    return filteredArticles[0];
  }, [filteredArticles]);

  const regularArticles = useMemo(() => {
    if (!featuredArticle) return [];
    return filteredArticles.filter((item) => item.id !== featuredArticle.id);
  }, [filteredArticles, featuredArticle]);

  return (
    <section
      id="coverage"
      className="relative py-8 md:py-10 border-b border-white/10 bg-transparent"
      aria-label="Media Coverage Hub"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1200px]">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-5">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-semibold tracking-widest uppercase text-fourth mb-2.5">
              <Newspaper className="w-3.5 h-3.5" />
              <span>In The News</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-primary tracking-tight leading-tight mb-2 ">
              Explore Our Stories
            </h2>
            <p className="text-xs sm:text-sm text-third leading-relaxed">
              Every feature offers a different perspective on what we&apos;re
              building, why we&apos;re building it and the people behind the
              journey.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-third self-start md:self-auto px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/10">
            <Layers className="w-3.5 h-3.5 text-fourth" />
            <span>
              Showing {filteredArticles.length} published{" "}
              {filteredArticles.length === 1 ? "story" : "stories"}
            </span>
          </div>
        </div>

        {/* Dynamic Category Filter Pills */}
        <div
          className="flex items-center gap-2 overflow-x-auto pb-2 mb-6 scrollbar-none"
          role="tablist"
          aria-label="Filter media stories by category"
        >
          {PRESS_CATEGORIES.map((category) => {
            const isSelected = selectedCategory === category;
            const count = categoryCounts[category] || 0;
            const isEmpty = count === 0;

            return (
              <button
                key={category}
                role="tab"
                aria-selected={isSelected}
                disabled={isEmpty}
                onClick={() => setSelectedCategory(category)}
                className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-200 border cursor-pointer ${isSelected
                  ? "bg-fourth border-fourth text-white shadow-md shadow-blue-500/20"
                  : isEmpty
                    ? "bg-white/[0.01] border-white/5 text-third/40 cursor-not-allowed"
                    : "bg-white/[0.03] hover:bg-white/[0.06] border-white/10 hover:border-white/20 text-third hover:text-primary"
                  }`}
              >
                <span>{category}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-semibold ${isSelected
                    ? "bg-white/20 text-white"
                    : isEmpty
                      ? "bg-white/5 text-third/40"
                      : "bg-white/10 text-third"
                    }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Featured Story - Black Theme With Clean Border Only */}
        {featuredArticle && (
          <article className="group relative mb-8 rounded-2xl bg-white/[0.02] hover:bg-white/[0.04] border border-white/10 hover:border-white/20 transition-all duration-300 overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 p-4 sm:p-5 lg:p-6 items-center">
              {/* Left Editorial Meta & Content - Tightly Aligned Title, Paragraph & Button */}
              <div className="lg:col-span-7 flex flex-col justify-center">
                <div className="flex flex-wrap items-center gap-2.5 mb-2.5">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-500/10 border border-blue-400/20 text-[11px] font-semibold text-blue-300">
                    <Sparkles className="w-3 h-3 text-blue-400" />
                    FEATURED · {featuredArticle.category.toUpperCase()}
                  </span>
                  {featuredArticle.publicationName === "INC91" ? (
                    <span className="inline-flex items-center text-xs font-semibold tracking-tight px-2.5 py-1 rounded-lg bg-black/90 border border-red-500/40 text-white font-[Montserrat]">
                      INC<span className="text-red-500 font-semibold">91</span>
                    </span>
                  ) : featuredArticle.publicationName === "Startup Times" ? (
                    <span className="inline-flex items-center text-xs font-semibold tracking-tight px-2.5 py-1 rounded-lg bg-black/90 border border-amber-500/40 text-amber-400 font-[Montserrat]">
                      Startup<span className="text-white font-semibold">Times</span>
                    </span>
                  ) : (
                    <span className="text-[11px] font-bold uppercase tracking-wider text-primary px-2 py-0.5 rounded bg-white/10">
                      {featuredArticle.publicationName}
                    </span>
                  )}
                  <span className="text-[11px] text-third flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-fourth" />
                    {featuredArticle.publicationDate}
                  </span>
                  <span className="text-[11px] text-third flex items-center gap-1">
                    <Clock className="w-3 h-3 text-fourth" />
                    {featuredArticle.readTime}
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl lg:text-2xl font-extrabold text-primary tracking-tight leading-snug mb-2.5">
                  <a
                    href={featuredArticle.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cursor-pointer hover:text-fourth transition-colors"
                  >
                    {featuredArticle.title}
                  </a>
                </h3>

                <p className="text-xs sm:text-sm text-third leading-relaxed mb-4 font-normal">
                  {featuredArticle.shortDescription}
                </p>

                <div className="flex flex-wrap items-center gap-3 pt-3.5 border-t border-white/10">
                  <Button
                    variant="ghost"
                    href={featuredArticle.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    size="sm"
                    showIcon={true}
                    className="font-semibold shadow-sm px-3.5 sm:px-4 py-1.5 sm:py-2 text-[11px] sm:text-xs"
                  >
                    Read Full Story
                  </Button>

                  <span className="text-[11px] text-third/70 flex items-center gap-1">
                    <ExternalLink className="w-3 h-3" />
                    Original article on {featuredArticle.publicationName}
                  </span>
                </div>
              </div>

              {/* Right Media Thumbnail Visual - Clean Unobstructed Banner Graphic */}
              <a
                href={featuredArticle.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block lg:col-span-5 relative w-full aspect-[16/9] rounded-xl overflow-hidden bg-black/60 border border-white/10 cursor-pointer"
              >
                <Image
                  src={featuredArticle.coverImage}
                  alt={featuredArticle.title}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 45vw, 42vw"
                  priority
                />
              </a>
            </div>
          </article>
        )}

        {/* Regular Articles Grid + Upcoming Placeholder - Black Theme with clean border */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {/* Regular Published Stories */}
          {regularArticles.map((article) => (
            <article
              key={article.id}
              className="group flex flex-col justify-between rounded-2xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/10 hover:border-white/20 transition-all duration-300 overflow-hidden"
            >
              {/* Thumbnail - Clean Unobstructed Banner Graphic */}
              <a
                href={article.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block relative w-full aspect-[16/9] bg-black/60 overflow-hidden border-b border-white/10 cursor-pointer"
              >
                <Image
                  src={article.coverImage}
                  alt={article.title}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </a>

              {/* Card Body */}
              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-2 text-xs text-third mb-2.5">
                    <span className="text-[10px] font-semibold tracking-wide uppercase text-blue-300 px-2 py-0.5 rounded-md bg-blue-500/10 border border-blue-400/20">
                      {article.category}
                    </span>
                    {article.publicationName === "INC91" ? (
                      <span className="inline-flex items-center text-xs font-semibold tracking-tight px-2 py-0.5 rounded-md bg-black/90 border border-red-500/40 text-white font-[Montserrat]">
                        INC<span className="text-red-500 font-semibold">91</span>
                      </span>
                    ) : article.publicationName === "Startup Times" ? (
                      <span className="inline-flex items-center text-xs font-semibold tracking-tight px-2 py-0.5 rounded-md bg-black/90 border border-amber-500/40 text-amber-400 font-[Montserrat]">
                        Startup<span className="text-white font-semibold">Times</span>
                      </span>
                    ) : (
                      <span className="font-semibold text-primary">
                        {article.publicationName}
                      </span>
                    )}
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-fourth" />
                      {article.publicationDate}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-primary tracking-tight leading-snug mb-2 line-clamp-2">
                    <a
                      href={article.externalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cursor-pointer hover:text-fourth transition-colors"
                    >
                      {article.title}
                    </a>
                  </h3>

                  <p className="text-xs text-third leading-relaxed line-clamp-3 mb-4">
                    {article.shortDescription}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                  <Button
                    variant="outlineSecondary"
                    href={article.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    size="sm"
                    showIcon={true}
                    className="px-3.5 sm:px-4 py-1.5 sm:py-2 text-[11px] sm:text-xs font-semibold border-white/20 text-primary hover:border-fourth hover:text-fourth transition-all"
                  >
                    Read Story
                  </Button>

                  <span className="text-[11px] text-third/70 flex items-center gap-1">
                    <ExternalLink className="w-3 h-3" />
                    External
                  </span>
                </div>
              </div>
            </article>
          ))}

          {/* More stories coming soon editorial card */}
          <div className="flex flex-col justify-between p-5 rounded-2xl bg-white/[0.01] border-2 border-dashed border-white/10 hover:border-white/20 transition-all text-center sm:text-left">
            <div>
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-white/5 border border-white/10 text-fourth mb-4">
                <Bookmark className="w-4 h-4" />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-primary tracking-tight mb-1.5 ">
                More stories coming soon
              </h3>
              <p className="text-xs text-third leading-relaxed mb-4">
                New coverage, interviews, podcasts, founder conversations, and
                milestone announcements will appear here as we continue building.
              </p>
            </div>

            <div className="pt-3 border-t border-white/10">
              <div className="flex flex-wrap gap-1.5 justify-center sm:justify-start">
                <span className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-third">
                  Interviews
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-third">
                  Press Releases
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-third">
                  Podcasts
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
