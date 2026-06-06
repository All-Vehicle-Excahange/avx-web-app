"use client";

import React, { useState } from "react";
import { Search, BookOpen } from "lucide-react";
import BlogCard from "./BlogCard";
import CategoryTab from "@/components/ui/tab";
import Pagination from "@/components/ui/Pagination";
import { MOCK_POSTS, CATEGORIES } from "./blogData";

function BlogList() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  // Filter logic
  const filteredPosts = MOCK_POSTS.filter((post) => {
    const matchesCategory =
      selectedCategory === "All" || post.category === selectedCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Pagination calculations
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const paginatedPosts = filteredPosts.slice(
    startIndex,
    startIndex + postsPerPage,
  );

  const getCategoryCount = (category) => {
    if (category === "All") return MOCK_POSTS.length;
    return MOCK_POSTS.filter((post) => post.category === category).length;
  };

  return (
    <section className="relative w-full py-16 sm:py-24 overflow-hidden">
      {/* Background ambient light */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-fourth/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        {/* HEADER */}
        <div className="text-center mb-12">
          {/* <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-fourth/10 border border-fourth/20 text-fourth text-xs font-semibold tracking-wider uppercase mb-4">
            <BookOpen size={12} />
            <span>Our Blog</span>
          </div> */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-primary tracking-tight font-primary">
            Resources and{" "}
            <span className="text-fourth/80  font-secondary relative inline-block">
              Insights
            </span>
          </h1>
          <p className="mt-4 text-base sm:text-lg text-third max-w-xl mx-auto font-secondary leading-relaxed">
            The latest industry news, interviews, technologies, and resources.
          </p>
        </div>

        {/* SEARCH BAR */}
        <div className="relative max-w-md mx-auto w-full mb-12">
          <input
            type="text"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full bg-white/5 border border-white/8 rounded-xl py-3 px-11 text-sm text-primary placeholder:text-third/35 focus:outline-none focus:border-fourth focus:bg-white/8 transition-all"
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-third/35 w-4.5 h-4.5" />
        </div>

        {/* CATEGORY TABS */}
        <div className="flex gap-2 pb-4 overflow-x-auto no-scrollbar justify-start md:justify-center border-b border-white/5 mb-10">
          {CATEGORIES.map((cat) => (
            <CategoryTab
              key={cat}
              label={cat}
              count={getCategoryCount(cat)}
              active={selectedCategory === cat}
              onClick={() => {
                setSelectedCategory(cat);
                setCurrentPage(1);
              }}
            />
          ))}
        </div>

        {/* BLOG CARDS GRID */}
        {paginatedPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
            {paginatedPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-third font-secondary">
              No articles found matching your criteria.
            </p>
          </div>
        )}

        {/* PAGINATION */}
        <div className="mt-12">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </section>
  );
}

export default BlogList;
