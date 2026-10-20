"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FiCheckCircle,
  FiZap,
  FiInfo,
  FiArrowRight,
  FiTrendingUp,
} from "react-icons/fi";
import Button from "@/components/ui/button";
import { useAuthStore } from "@/stores/useAuthStore";
import {
  GROWTH_CHECKLIST_ITEMS,
  GROWTH_TIPS,
} from "@/data/leaderboardData";

export default function GrowYourBusinessMain() {
  const user = useAuthStore((s) => s.user);
  const consultantTier = user?.subscription?.tier || user?.tier || "basic";

  // Checklist state with localStorage lazy initialization
  const [completedItems, setCompletedItems] = useState(() => {
    if (typeof window === "undefined") return {};
    try {
      const saved = localStorage.getItem("reecomm_growth_checklist");
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const toggleCheckItem = (id) => {
    setCompletedItems((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      try {
        localStorage.setItem("reecomm_growth_checklist", JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  const completedCount = Object.values(completedItems).filter(Boolean).length;
  const totalCount = GROWTH_CHECKLIST_ITEMS.length;
  const progressPercent = Math.round((completedCount / totalCount) * 100);

  return (
    <div className="w-full">
      {/* ── SECTION A: HERO ── */}
      <section className="container mb-16 pt-4">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-fourth/10 border border-fourth/20 text-fourth text-xs font-semibold uppercase tracking-wider mb-4">
            <FiZap className="w-4 h-4" />
            <span>Consultant Growth Guide</span>
          </div>

          <h1 className="font-[Montserrat] text-3xl sm:text-4xl lg:text-5xl text-primary font-semibold leading-[1.08]">
            Get More Inquiries on <span className="text-fourth font-semibold">Reecomm</span>
          </h1>

          <p className="text-third mt-4 text-[15px] md:text-[16px] max-w-xl mx-auto leading-relaxed">
            Better listings. Fair prices. Faster responses. More opportunities to connect with buyers.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Button
              href="/consult/dashboard/inventory"
              variant="ghost"
              size="sm"
              showIcon={true}
            >
              Improve My Listings
            </Button>
            <Button
              href="/leaderboard"
              variant="outline"
              size="sm"
              showIcon={true}
            >
              View Full Leaderboard
            </Button>
          </div>
        </div>
      </section>

      {/* ── SECTION B: INQUIRY GROWTH CHECKLIST ── */}
      <section className="container mb-16">
        <div className="max-w-4xl mx-auto rounded-3xl bg-gradient-to-b from-[#141822] to-[#0c0d12] border border-[#1f2937] p-6 sm:p-10 shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-white/10">
            <div>
              <span className="text-xs font-semibold text-fourth uppercase tracking-wider block mb-1">
                Step-by-Step Optimization
              </span>
              <h2 className="font-[Montserrat] text-2xl font-semibold text-primary">
                Your Inquiry Growth Checklist
              </h2>
              <p className="text-third text-sm mt-1">
                Work through these actions to strengthen your storefront and inventory.
              </p>
            </div>

            {/* Progress Widget */}
            <div className="bg-black/40 border border-white/10 rounded-2xl p-4 sm:min-w-[190px] text-right">
              <span className="text-xs text-third font-medium block">
                Your progress
              </span>
              <div className="text-xl font-semibold font-[Montserrat] text-primary mt-0.5">
                <span className="text-fourth">{completedCount}</span> of {totalCount} completed
              </div>
              <div className="w-full h-2 bg-white/10 rounded-full mt-2.5 overflow-hidden">
                <div
                  className="h-full bg-fourth rounded-full transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          </div>

          {/* Checklist Items */}
          <div className="space-y-3">
            {GROWTH_CHECKLIST_ITEMS.map((item) => {
              const isChecked = !!completedItems[item.id];
              return (
                <div
                  key={item.id}
                  className={`rounded-2xl p-4 sm:p-5 border transition-all flex items-start justify-between gap-4 ${
                    isChecked
                      ? "bg-fourth/5 border-fourth/30"
                      : "bg-[#0f1117]/80 border-[#1f2937] hover:border-fourth/40"
                  }`}
                >
                  <div
                    className="flex items-start gap-3.5 flex-1 cursor-pointer select-none"
                    onClick={() => toggleCheckItem(item.id)}
                  >
                    <button
                      type="button"
                      aria-label={item.label}
                      className={`w-6 h-6 mt-0.5 rounded-lg border flex items-center justify-center flex-shrink-0 transition-colors ${
                        isChecked
                          ? "bg-fourth border-fourth text-white"
                          : "border-white/20 hover:border-white/40"
                      }`}
                    >
                      {isChecked && <FiCheckCircle className="w-4 h-4" />}
                    </button>

                    <div>
                      <h3
                        className={`font-[Montserrat] text-sm sm:text-base font-semibold ${
                          isChecked ? "text-primary line-through opacity-70" : "text-primary"
                        }`}
                      >
                        {item.label}
                      </h3>
                      <p className="text-xs sm:text-sm text-third mt-0.5 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  <Button
                    href={item.actionUrl}
                    variant="outlineSecondary"
                    size="xs"
                    showIcon={true}
                    className="hidden sm:inline-flex flex-shrink-0 text-xs px-3.5 py-1.5"
                  >
                    {item.actionLabel}
                  </Button>
                </div>
              );
            })}
          </div>

          <p className="text-[11px] text-third/60 mt-4 text-center">
            Prototype checklist: selections are temporary. Production progress should be based on verified account data.
          </p>
        </div>
      </section>

      {/* ── SECTION C: 6 WAYS TO IMPROVE YOUR INQUIRIES ── */}
      <section className="container mb-20">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-semibold text-fourth uppercase tracking-wider">
            Actionable Playbook
          </span>
          <h2 className="font-[Montserrat] text-3xl sm:text-4xl lg:text-5xl text-primary font-semibold leading-[1.08] mt-2">
            6 Ways to Improve <span className="text-fourth font-semibold">Your Inquiries</span>
          </h2>
          <p className="text-third mt-4 text-[15px] md:text-[16px] max-w-xl mx-auto leading-relaxed">
            Practical actions you can take to improve the quality and discoverability of your listings.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {GROWTH_TIPS.map((tip) => (
            <motion.div
              key={tip.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-3xl bg-[#0f1117]/90 border border-[#1f2937] p-7 sm:p-8 flex flex-col justify-between hover:border-fourth/50 hover:shadow-[0_10px_40px_-10px_rgba(230,230,230,0.12)] transition duration-500 group"
            >
              <div>
                {/* Eyebrow number */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-semibold text-fourth uppercase tracking-wider bg-fourth/10 px-3 py-1 rounded-full border border-fourth/20">
                    GROWTH TIP {tip.number}
                  </span>
                </div>

                <h3 className="font-[Montserrat] text-xl font-semibold text-primary group-hover:text-fourth transition-colors mb-2">
                  {tip.title}
                </h3>

                <p className="text-sm text-third/90 mb-5 leading-relaxed">
                  {tip.summary}
                </p>

                <ul className="space-y-2.5 mb-8">
                  {tip.points.map((point, pIdx) => (
                    <li key={pIdx} className="text-xs sm:text-sm text-third flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-fourth mt-1.5 flex-shrink-0" />
                      <span className="leading-relaxed">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-5 border-t border-white/10">
                <Button
                  href={tip.ctaUrl}
                  variant="outline"
                  size="sm"
                  showIcon={true}
                  full={true}
                >
                  {tip.ctaText}
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── SECTION D: PRO & PREMIUM UPGRADE PLACEMENT ── */}
      <section className="container mb-16">
        <div className="max-w-5xl mx-auto rounded-3xl bg-gradient-to-r from-fourth/20 via-[#12151e] to-fourth/10 border border-fourth/30 p-8 sm:p-12 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-8">
          <div className="max-w-2xl">
            <span className="text-xs font-semibold text-fourth uppercase tracking-wider block mb-1">
              Consultant Business Solutions
            </span>
            <h3 className="font-[Montserrat] text-2xl sm:text-3xl font-semibold text-primary">
              Ready to Take Your Business Further?
            </h3>
            <p className="text-third text-sm sm:text-base mt-2 leading-relaxed">
              Explore the tools and benefits available with Reecomm Pro and Premium to find the right fit for your business.
            </p>
          </div>

          <div className="flex-shrink-0">
            {consultantTier === "premium" ? (
              <Button
                href="/consult/dashboard/analytics"
                variant="ghost"
                size="sm"
                showIcon={true}
              >
                Review My Performance
              </Button>
            ) : consultantTier === "pro" ? (
              <Button
                href="/consult/pricing"
                variant="ghost"
                size="sm"
                showIcon={true}
              >
                Explore Premium
              </Button>
            ) : (
              <Button
                href="/consult/pricing"
                variant="ghost"
                size="sm"
                showIcon={true}
              >
                Compare Consultant Plans
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* ── SECTION E: TRUST & COMPLIANCE DISCLAIMER ── */}
      <section className="container mb-8">
        <div className="max-w-3xl mx-auto text-center p-6 rounded-2xl bg-white/[0.02] border border-white/5 text-xs text-third/70 leading-relaxed">
          <FiInfo className="w-4 h-4 text-third/50 mx-auto mb-2" />
          <p>
            Reecomm provides a platform to connect consultants with potential buyers. Inquiry volume depends on buyer demand, inventory, pricing, listing quality and other factors; results are not guaranteed.
          </p>
        </div>
      </section>
    </div>
  );
}
