"use client";

import React, { useMemo, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar } from "lucide-react";
import BlogCard from "./BlogCard";
import { MOCK_POSTS } from "./blogData";

const FALLBACK_SECTION_IMAGES = [
  "/engine-core.jpg",
  "/car-hero-2.jpg",
  "/car-hero-21.jpg",
  "/verification.jpg",
  "/small_car.jpg",
  "/car-showroom.avif",
  "/car-inspection.avif",
  "/business-address.jpg",
  "/safety-car-inspect.jpg",
  "/safety-inventry.jpg",
];

export default function BlogDetails({ id }) {
  const post = useMemo(() => {
    return MOCK_POSTS.find(
      (p) => String(p.id) === String(id) || p.slug === `/blog/${id}` || p.slug === id
    );
  }, [id]);

  const relatedPosts = useMemo(() => {
    if (!post) return [];
    const sameCategory = MOCK_POSTS.filter(
      (p) => p.category === post.category && p.id !== post.id,
    );
    const others = MOCK_POSTS.filter(
      (p) => p.category !== post.category && p.id !== post.id,
    );
    return [...sameCategory, ...others].slice(0, 3);
  }, [post]);

  // Parse the content dynamically line-by-line into introduction and sections
  const { intro, sections } = useMemo(() => {
    if (!post || !post.content) return { intro: [], sections: [] };

    const rawLines = post.content
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.length > 0);

    const intro = [];
    const sections = [];
    let currentSection = null;

    rawLines.forEach((line) => {
      if (line.startsWith("###")) {
        if (currentSection) {
          sections.push(currentSection);
        }
        currentSection = {
          id: `sec-${sections.length + 1}`,
          title: line.replace("###", "").trim(),
          lines: [],
        };
      } else {
        if (currentSection) {
          currentSection.lines.push(line);
        } else {
          intro.push(line);
        }
      }
    });

    if (currentSection) {
      sections.push(currentSection);
    }

    return { intro, sections };
  }, [post]);

  // Extract unique images for the small top collage/row
  const topImages = useMemo(() => {
    if (!post) return [];
    const list = [post.image].filter(Boolean);
    if (post.sectionImages) {
      post.sectionImages.forEach((img) => {
        if (!list.includes(img)) list.push(img);
      });
    }
    let idx = 0;
    while (list.length < 3 && idx < FALLBACK_SECTION_IMAGES.length) {
      const fallback = FALLBACK_SECTION_IMAGES[idx];
      if (!list.includes(fallback)) list.push(fallback);
      idx++;
    }
    return list.slice(0, 3);
  }, [post]);

  // Scroll spy state to track the active section ID
  const [activeSectionId, setActiveSectionId] = useState("");

  useEffect(() => {
    if (sections.length === 0) return;

    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -60% 0px", // triggers when section is in middle of viewport
      threshold: 0,
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSectionId(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions,
    );

    sections.forEach((sec) => {
      const el = document.getElementById(sec.id);
      if (el) observer.observe(el);
    });

    // Also observe the intro block to highlight introduction when at the top
    const introEl = document.getElementById("intro-section");
    if (introEl) observer.observe(introEl);

    return () => {
      observer.disconnect();
    };
  }, [sections]);

  if (!post) {
    return (
      <section className="min-h-[60vh] flex flex-col items-center justify-center text-center p-4 bg-transparent">
        <h2 className="text-2xl font-bold text-primary mb-4">Post Not Found</h2>
        <p className="text-third mb-6">
          The article you are looking for does not exist or has been moved.
        </p>
        <Link
          href="/blog"
          className="px-6 py-2.5 rounded-xl border border-white/10 hover:border-fourth text-primary hover:text-fourth transition-all font-semibold"
        >
          Back to Blogs
        </Link>
      </section>
    );
  }

  const handleTocClick = (e, targetId) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      const offset = 100; // Offset for header/navbar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      setActiveSectionId(targetId);
    }
  };

  const parseInlineMarkdown = (text) => {
    if (!text) return "";
    const regex = /(\*\*.*?\*\*|\[.*?\]\(.*?\))/g;
    const matches = [...text.matchAll(regex)];
    const parts = [];
    let lastIndex = 0;

    matches.forEach((match) => {
      const matchIndex = match.index;
      const matchText = match[0];

      if (matchIndex > lastIndex) {
        parts.push(text.substring(lastIndex, matchIndex));
      }

      if (matchText.startsWith("**") && matchText.endsWith("**")) {
        const boldText = matchText.slice(2, -2);
        parts.push(
          <strong key={matchIndex} className="text-primary font-bold">
            {boldText}
          </strong>
        );
      } else if (matchText.startsWith("[") && matchText.includes("](")) {
        const linkText = matchText.substring(1, matchText.indexOf("]("));
        const linkUrl = matchText.substring(matchText.indexOf("](") + 2, matchText.length - 1);

        if (linkUrl.startsWith("http") || linkUrl.startsWith("//")) {
          parts.push(
            <a
              key={matchIndex}
              href={linkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-fourth hover:underline transition-all font-semibold"
            >
              {linkText}
            </a>
          );
        } else {
          parts.push(
            <Link
              key={matchIndex}
              href={linkUrl}
              className="text-fourth hover:underline transition-all font-semibold"
            >
              {linkText}
            </Link>
          );
        }
      }

      lastIndex = matchIndex + matchText.length;
    });

    if (lastIndex < text.length) {
      parts.push(text.substring(lastIndex));
    }

    return parts.length > 0 ? parts : text;
  };

  const renderSectionLines = (lines) => {
    const elements = [];
    let currentList = [];

    lines.forEach((line, idx) => {
      if (line.startsWith("-")) {
        currentList.push(line.replace(/^-/, "").trim());
      } else {
        if (currentList.length > 0) {
          elements.push(
            <ul
              key={`list-${idx}`}
              className="list-disc list-inside text-third/80 space-y-2.5 my-4 pl-4 text-sm sm:text-base leading-relaxed"
            >
              {currentList.map((item, i) => (
                <li key={i}>{parseInlineMarkdown(item)}</li>
              ))}
            </ul>
          );
          currentList = [];
        }

        elements.push(
          <p
            key={idx}
            className="text-third/85 text-sm sm:text-base leading-relaxed mb-4 font-secondary"
          >
            {parseInlineMarkdown(line)}
          </p>
        );
      }
    });

    if (currentList.length > 0) {
      elements.push(
        <ul
          key="list-final"
          className="list-disc list-inside text-third/80 space-y-2.5 my-4 pl-4 text-sm sm:text-base leading-relaxed"
        >
          {currentList.map((item, i) => (
            <li key={i}>{parseInlineMarkdown(item)}</li>
          ))}
        </ul>
      );
    }

    return elements;
  };

  return (
    <section className="relative w-full py-12 sm:py-20 overflow-visible bg-transparent">
      {/* Background ambient lighting */}
    
      <div className="relative z-10 max-w-7xl mx-auto px-4">
        {/* BACK TO BLOGS LINK */}
        <div className="mb-8 flex">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold uppercase tracking-wider text-third hover:text-fourth transition-colors"
          >
            <ArrowLeft size={16} />
            <span>Back to Articles</span>
          </Link>
        </div>

        {/* Category Tag */}
        <div className="mb-4">
          <span className="inline-block px-3 py-1 rounded-full bg-fourth/10 border border-fourth/20 text-fourth text-xs font-bold uppercase tracking-wider">
            {post.category}
          </span>
        </div>

        {/* 1. SPLIT HEADER LAYOUT */}
        <div
          id="intro-section"
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 pb-10 border-b border-white/5 items-start"
        >
          <div className="lg:col-span-5 space-y-4">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-primary tracking-tight font-primary leading-tight">
              {post.title}
            </h1>
            <div className="flex items-center gap-1.5 text-xs sm:text-sm text-third/60">
              <Calendar size={14} className="text-fourth" />
              <span>{post.date}</span>
            </div>
          </div>
          <div className="lg:col-span-7 text-third/85 text-sm sm:text-base leading-relaxed font-secondary space-y-4 pt-1">
            {intro.map((para, idx) => (
              <p key={idx}>{para}</p>
            ))}
          </div>
        </div>

        {/* MULTIPLE SMALL COVER IMAGES GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-8">
          {topImages.map((imgSrc, imgIdx) => (
            <div
              key={imgIdx}
              className="relative aspect-video rounded-2xl overflow-hidden border border-white/8 shadow-xl group/top-img"
            >
              <Image
                src={imgSrc}
                alt={`Article illustration ${imgIdx + 1}`}
                fill
                className="object-cover transition-transform duration-500 group-hover/top-img:scale-105"
                sizes="(max-width: 640px) 100vw, 33vw"
              />
            </div>
          ))}
        </div>

        {/* 2. TWO-COLUMN MAIN BODY GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-12 items-start">
          {/* SIDEBAR TABLE OF CONTENTS */}
          <aside className="lg:col-span-3 lg:sticky lg:top-24 self-start space-y-6">
            <div className="rounded-2xl border border-white/5 bg-white/2 p-5 backdrop-blur-md">
              <h4 className="text-xs font-bold uppercase tracking-wider text-fourth mb-4">
                Table of Contents
              </h4>
              <nav className="flex flex-col gap-1.5">
                <a
                  href="#intro-section"
                  onClick={(e) => handleTocClick(e, "intro-section")}
                  className={`px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 ${
                    activeSectionId === "intro-section" ||
                    activeSectionId === ""
                      ? "bg-fourth text-white font-bold shadow-md shadow-fourth/20"
                      : "text-third hover:text-primary hover:bg-white/5"
                  }`}
                >
                  Introduction
                </a>
                {sections.map((sec) => (
                  <a
                    key={sec.id}
                    href={`#${sec.id}`}
                    onClick={(e) => handleTocClick(e, sec.id)}
                    className={`px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 block truncate ${
                      activeSectionId === sec.id
                        ? "bg-fourth text-white font-bold shadow-md shadow-fourth/20"
                        : "text-third hover:text-primary hover:bg-white/5"
                    }`}
                    title={sec.title}
                  >
                    {sec.title}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          {/* MAIN CONTENT WORK AREA */}
          <div className="lg:col-span-9 space-y-16">
            {sections.map((sec, idx) => {
              const imageSrc =
                post.sectionImages?.[idx] ||
                FALLBACK_SECTION_IMAGES[idx % FALLBACK_SECTION_IMAGES.length];
              const isEven = idx % 2 === 0;

              return (
                <article
                  key={sec.id}
                  id={sec.id}
                  data-section
                  className="scroll-mt-28 border-b border-white/5 pb-12 last:border-0 last:pb-0"
                >
                  {/* Section Title with accent line */}
                  <div className="mb-6 group">
                    <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-primary font-primary inline-block relative pb-2">
                      {sec.title}
                    </h3>
                    {/* Horizontal accent line under the heading */}
                    <div className="h-0.5 w-16 bg-fourth transition-all duration-500 group-hover:w-24 mt-1" />
                  </div>

                  {/* Alternating image/text layout */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                    {/* Even index: Text on left (7 cols), Image on right (5 cols) */}
                    {isEven ? (
                      <>
                        <div className="md:col-span-7 text-third/85 text-sm sm:text-base leading-relaxed font-secondary">
                          {renderSectionLines(sec.lines)}
                        </div>
                        <div className="md:col-span-5">
                          <div className="relative aspect-video sm:aspect-4/3 w-full rounded-2xl overflow-hidden border border-white/8 shadow-xl group/img">
                            <Image
                              src={imageSrc}
                              alt={sec.title}
                              fill
                              className="object-cover transition-transform duration-500 group-hover/img:scale-105"
                            />
                          </div>
                        </div>
                      </>
                    ) : (
                      /* Odd index: Image on left (5 cols), Text on right (7 cols) */
                      <>
                        <div className="md:col-span-5 order-last md:order-first">
                          <div className="relative aspect-video sm:aspect-4/3 w-full rounded-2xl overflow-hidden border border-white/8 shadow-xl group/img">
                            <Image
                              src={imageSrc}
                              alt={sec.title}
                              fill
                              className="object-cover transition-transform duration-500 group-hover/img:scale-105"
                            />
                          </div>
                        </div>
                        <div className="md:col-span-7 text-third/85 text-sm sm:text-base leading-relaxed font-secondary">
                          {renderSectionLines(sec.lines)}
                        </div>
                      </>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        {/* RELATED ARTICLES */}
        {relatedPosts.length > 0 && (
          <div className="pt-16 mt-16 border-t border-white/5">
            <h2 className="text-xl sm:text-2xl font-bold font-primary text-primary mb-8 text-center sm:text-left">
              Related Articles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
              {relatedPosts.map((rPost) => (
                <BlogCard key={rPost.id} post={rPost} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
