import React, { useState } from "react";
import { Search, ChevronDown, ChevronUp, ArrowRight, Plus, HelpCircle, BookOpen, Inbox, CheckCircle2, Clock } from "lucide-react";
import Button from "@/components/ui/button";
import { CATEGORIES } from "./mockData";
import * as LucideIcons from "lucide-react";
import StatCard from "../components/StateCard";

export default function HelpCenterHome({
  articles,
  tickets,
  onNavigate,
  onSelectArticle,
  searchQuery,
  setSearchQuery
}) {
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  // Compute stat counters from tickets
  const openCount = tickets.filter(t => t.status === "Open" || t.status === "In Progress" || t.status === "Awaiting Reply").length;
  const resolvedCount = tickets.filter(t => t.status === "Resolved").length;

  const faqs = articles.filter(a => a.categoryId === "inspection" || a.categoryId === "storefront").slice(0, 4);

  const handleFaqToggle = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  // Render a dynamic Lucide Icon helper
  const renderIcon = (iconName, className = "w-6 h-6 text-fourth") => {
    const IconComponent = LucideIcons[iconName] || HelpCircle;
    return <IconComponent className={className} />;
  };

  // Filtered articles based on search
  const filteredArticles = searchQuery.trim()
    ? articles.filter(a =>
        a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.content.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <div className="space-y-8 animate-[fadeUp_0.3s_ease-out]">
      {/* Top Banner / Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Help Center</h1>
          <p className="text-third text-sm">Find answers or raise a support ticket</p>
        </div>
        <Button
          onClick={() => onNavigate("create")}
          variant="ghost"
          className="flex items-center gap-2"
        >
          <Plus className="mr-2" size={16} /> New Ticket
        </Button>
      </div>

      {/* Search Wrap */}
      <div className="relative">
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
          <Search size={18} className="text-third" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for help articles, topics, FAQs..."
          className="w-full bg-primary/5 border border-third/20 rounded-xl py-3.5 pl-12 pr-4 text-sm text-primary placeholder-third/60 focus:outline-none focus:border-fourth transition-colors"
        />

        {/* Live Search Results */}
        {searchQuery.trim() && (
          <div className="absolute z-30 w-full mt-2 bg-primary/10 backdrop-blur-2xl border border-third/20 rounded-xl shadow-2xl max-h-60 overflow-y-auto custom-scrollbar divide-y divide-third/10">
            {filteredArticles.length > 0 ? (
              filteredArticles.map((art) => (
                <div
                  key={art.id}
                  onClick={() => {
                    onSelectArticle(art);
                    onNavigate("article");
                    setSearchQuery("");
                  }}
                  className="p-4 hover:bg-primary/5 cursor-pointer transition-colors"
                >
                  <p className="text-sm font-medium text-primary hover:text-fourth transition-colors">
                    {art.title}
                  </p>
                  <p className="text-xs text-third mt-1 line-clamp-1">
                    {art.content}
                  </p>
                </div>
              ))
            ) : (
              <div className="p-4 text-sm text-third text-center">No articles found matching your query</div>
            )}
          </div>
        )}
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          icon={<BookOpen size={18} />}
          label="Help articles"
          value={articles.length}
        />
        <StatCard
          icon={<Inbox size={18} />}
          label="Open tickets"
          value={openCount}
        />
        <StatCard
          icon={<CheckCircle2 size={18} />}
          label="Resolved tickets"
          value={resolvedCount}
        />
        <StatCard
          icon={<Clock size={18} />}
          label="Avg response time"
          value="~2h"
        />
      </div>

      {/* Browse by Category */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold tracking-tight">Browse by Category</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              onClick={() => {
                // Find first article in category to view
                const catArt = articles.find(a => a.categoryId === cat.id);
                if (catArt) {
                  onSelectArticle(catArt);
                  onNavigate("article");
                }
              }}
              className="bg-primary/5 border border-third/15 rounded-xl p-5 cursor-pointer hover:border-primary/40 hover:bg-primary/10 transition-all group"
            >
              <div className="p-2.5 bg-fourth/10 rounded-lg w-fit mb-4 group-hover:scale-110 transition-transform">
                {renderIcon(cat.icon)}
              </div>
              <h3 className="font-semibold text-sm text-primary transition-colors">
                {cat.title}
              </h3>
              <p className="text-xs text-third mt-1">{cat.count} articles</p>
            </div>
          ))}
        </div>
      </div>

      {/* Popular FAQs */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold tracking-tight">Popular FAQs</h2>
        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={faq.id}
                className="border border-third/15 rounded-xl overflow-hidden bg-primary/5"
              >
                <button
                  onClick={() => handleFaqToggle(idx)}
                  className="w-full flex items-center justify-between p-4 text-left text-sm font-medium text-primary transition-colors cursor-pointer"
                >
                  <span>{faq.title}</span>
                  {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
                <div
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    isOpen ? "max-h-48" : "max-h-0"
                  }`}
                >
                  <div className="p-4 text-sm text-third leading-relaxed whitespace-pre-line">
                    {faq.content}
                    <div className="mt-3 flex justify-end">
                      <button
                        onClick={() => {
                          onSelectArticle(faq);
                          onNavigate("article");
                        }}
                        className="text-xs text-fourth font-medium flex items-center gap-1 hover:underline"
                      >
                        Read full article <ArrowRight size={12} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* View All Tickets Shortcut */}
      <div className="bg-primary/5 border border-third/15 rounded-xl p-4 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div>
          <h3 className="text-sm font-semibold">Have existing tickets?</h3>
          <p className="text-xs text-third mt-1">Track issues and communication with our support team.</p>
        </div>
        <Button
          onClick={() => onNavigate("my-tickets")}
          variant="outlineSecondary"
          size="sm"
          className="w-full sm:w-auto"
        >
          Go to My Tickets
        </Button>
      </div>
    </div>
  );
}
