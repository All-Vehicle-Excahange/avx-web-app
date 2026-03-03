"use client";

import { useState, useRef, useEffect } from "react";
import {
  Car,
  Tag,
  UserCheck,
  CreditCard,
  Zap,
  User,
  Flag,
  Plus,
  Minus,
} from "lucide-react";

const categories = [
  { id: "buying", number: "01", icon: Car, label: "Buying", tag: "For Buyers" },
  {
    id: "selling",
    number: "02",
    icon: Tag,
    label: "Selling",
    tag: "For Sellers",
  },
  {
    id: "consultant",
    number: "03",
    icon: UserCheck,
    label: "Consultant",
    tag: "Program",
  },
  {
    id: "billing",
    number: "04",
    icon: CreditCard,
    label: "Billing",
    tag: "Subscription",
  },
  {
    id: "ppc",
    number: "05",
    icon: Zap,
    label: "PPC & Boost",
    tag: "Advertising",
  },
  {
    id: "account",
    number: "06",
    icon: User,
    label: "Account",
    tag: "Login & Access",
  },
  {
    id: "disputes",
    number: "07",
    icon: Flag,
    label: "Disputes",
    tag: "Reporting",
  },
];

const faqData = {
  buying: [
    {
      q: "How do I inquire about a vehicle?",
      a: "Open the vehicle listing and click Inquire. Your inquiry is sent directly to the verified consultant managing that listing. AVX records the interaction for transparency but does not participate in negotiation or pricing.",
    },
    {
      q: "Can I chat with a consultant on web?",
      a: "Yes. Web chat is available for initial inquiries. Continued engagement may require the mobile app for secure and real-time messaging.",
    },
    {
      q: "Why am I asked to download the mobile app?",
      a: "The mobile app enables secure messaging, inspection tracking, and notification alerts. Some features are optimized for mobile use.",
    },
    {
      q: "Can I compare vehicles?",
      a: "Yes. Structured data fields allow side-by-side comparison of specifications, inspection visibility, and consultant information.",
    },
    {
      q: "Can I save vehicles?",
      a: "Logged-in users can save vehicles to review later or monitor updates.",
    },
    {
      q: "Can I request inspection before buying?",
      a: "Yes. If inspection is not already available, you may request one through the platform.",
    },
    {
      q: "Are vehicle prices negotiable?",
      a: "Pricing and negotiation occur directly between buyer and consultant. AVX does not process transactions.",
    },
    {
      q: "Can I see consultant reviews?",
      a: "Consultant profiles display ratings, response metrics, and performance indicators.",
    },
  ],
  selling: [
    {
      q: "How do I list my vehicle?",
      a: "Create an account, select List Vehicle, complete structured details, upload images, and submit for review.",
    },
    {
      q: "Is inspection mandatory?",
      a: "Inspection requirements vary by tier or category. It increases credibility and visibility.",
    },
    {
      q: "Can I edit a listing after submission?",
      a: "Yes. Listings can be updated unless marked sold or under dispute.",
    },
    {
      q: "How many photos can I upload?",
      a: "Multiple high-resolution images are supported for transparency.",
    },
    {
      q: "Can I mark vehicle as sold?",
      a: "Yes. Once the transaction is completed externally, mark it as sold.",
    },
    {
      q: "How do I track inquiries?",
      a: "All inquiries are visible in your dashboard with timestamps and engagement history.",
    },
    {
      q: "Can I relist a vehicle later?",
      a: "Yes. Relisting is subject to current policies.",
    },
    {
      q: "What happens after 2nd vehicle sold?",
      a: "Multiple sales may require consultant enrollment or subscription upgrade.",
    },
  ],
  consultant: [
    {
      q: "Who can become a consultant?",
      a: "Individuals or businesses involved in vehicle resale or consultation may apply.",
    },
    {
      q: "Is GST mandatory?",
      a: "Tax compliance depends on applicable local regulations.",
    },
    {
      q: "How do I apply as a consultant?",
      a: "Submit identity verification and required documentation for review.",
    },
    {
      q: "How long does verification take?",
      a: "Verification typically completes within a few working days.",
    },
    {
      q: "When does my storefront go live?",
      a: "After verification approval and subscription activation.",
    },
    {
      q: "Can I upgrade my tier later?",
      a: "Yes. Tier upgrades are available anytime.",
    },
    {
      q: "Can I downgrade?",
      a: "Downgrades are processed at the end of billing cycle.",
    },
    {
      q: "What happens if my subscription expires?",
      a: "Visibility may reduce or listings may be temporarily suspended.",
    },
  ],
  billing: [
    {
      q: "How do I upgrade my tier?",
      a: "Access dashboard → subscription settings → select upgrade.",
    },
    {
      q: "When will my subscription renew?",
      a: "Subscriptions renew automatically unless cancelled.",
    },
    {
      q: "Can I cancel my subscription?",
      a: "Yes. Cancellation must be initiated before renewal date.",
    },
    {
      q: "What happens if payment fails?",
      a: "Listings may experience limited visibility until payment succeeds.",
    },
    {
      q: "Will listings disappear after expiry?",
      a: "Listings may be hidden or deprioritized until renewal.",
    },
    {
      q: "Can I purchase PPC separately?",
      a: "Yes. PPC campaigns are available as add-ons.",
    },
    {
      q: "Can I get a refund on inspection?",
      a: "Inspection fees are non-refundable once service begins.",
    },
  ],
  ppc: [
    {
      q: "What is vehicle boost?",
      a: "Vehicle Boost increases listing visibility for a defined duration.",
    },
    {
      q: "What is storefront boost?",
      a: "Storefront Boost enhances consultant discovery exposure.",
    },
    {
      q: "How does PPC work?",
      a: "Budget is allocated toward prioritized exposure based on engagement.",
    },
    {
      q: "How is budget deducted?",
      a: "Budget is deducted based on click or engagement metrics.",
    },
    {
      q: "Can I pause a campaign?",
      a: "Yes. Campaigns can be paused or adjusted anytime.",
    },
    {
      q: "Can I see campaign analytics?",
      a: "Real-time campaign analytics are available in dashboard.",
    },
    {
      q: "Can I target by city/category?",
      a: "Targeting options depend on campaign configuration.",
    },
  ],
  account: [
    {
      q: "Can I browse without login?",
      a: "Yes. General browsing is available without authentication.",
    },
    {
      q: "When is login required?",
      a: "Login is required for inquiries, saving vehicles, and listing.",
    },
    {
      q: "How do I reset my password?",
      a: "Use Forgot Password option to receive reset link.",
    },
    {
      q: "Can I use social login?",
      a: "Social login availability depends on configuration.",
    },
    {
      q: "How do I delete my account?",
      a: "Account deletion requests can be submitted through settings.",
    },
  ],
  disputes: [
    {
      q: "How do I report a listing issue?",
      a: "Use Report Listing option available on vehicle page.",
    },
    {
      q: "How do I raise a complaint?",
      a: "Complaints can be submitted via dashboard dispute section.",
    },
    {
      q: "What happens after a complaint?",
      a: "Platform reviews documentation and interaction history.",
    },
    {
      q: "Can AVX suspend a consultant?",
      a: "Yes. Accounts violating policy may be restricted or suspended.",
    },
    {
      q: "Can I request re-inspection?",
      a: "Yes. Re-inspection can be requested if discrepancies arise.",
    },
    {
      q: "How long does dispute review take?",
      a: "Timelines vary based on case complexity.",
    },
  ],
};

function QRow({ item, isOpen, onToggle }) {
  return (
    <div className="border-b border-white/5 transition-colors duration-200">
      <button
        onClick={onToggle}
        className="w-full flex items-start gap-4 text-left py-5 px-5 group transition-colors duration-200 hover:bg-white/2 rounded-xl"
      >
        <div className="flex-1 min-w-0">
          <span
            className="text-[14px] sm:text-[15px] font-semibold leading-snug transition-colors duration-200 font-secondary"
            style={{ color: isOpen ? "#007bff" : "rgba(255,255,255,0.65)" }}
          >
            {item.q}
          </span>
        </div>
        <div
          className="w-6 h-6 rounded-lg flex items-center justify-center shrink-0 mt-0.5 transition-all duration-250"
          style={{
            background: isOpen
              ? "rgba(0,123,255,0.15)"
              : "rgba(255,255,255,0.05)",
            border: "1px solid",
            borderColor: isOpen
              ? "rgba(0,123,255,0.3)"
              : "rgba(255,255,255,0.08)",
          }}
        >
          {isOpen ? (
            <Minus size={11} className="text-fourth" />
          ) : (
            <Plus size={11} style={{ color: "rgba(255,255,255,0.3)" }} />
          )}
        </div>
      </button>

      <div
        className="overflow-hidden transition-[max-height] duration-380 ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{ maxHeight: isOpen ? "260px" : "0" }}
      >
        <p className="px-5 pb-5 text-sm sm:text-[15px] leading-relaxed text-primary/45 font-secondary">
          {item.a}
        </p>
      </div>
    </div>
  );
}

export default function FAQSections() {
  const [activeCat, setActiveCat] = useState(0);
  const [openQ, setOpenQ] = useState(null);
  const [animating, setAnimating] = useState(false);
  const timerRef = useRef(null);

  const cat = categories[activeCat];
  const items = faqData[cat.id] || [];

  const switchCat = (idx) => {
    if (idx === activeCat || animating) return;
    setAnimating(true);
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setActiveCat(idx);
      setOpenQ(null);
      setAnimating(false);
    }, 220);
  };

  useEffect(() => () => clearTimeout(timerRef.current), []);

  return (
    <section
      id="faq"
      className="relative py-20 px-4 sm:px-8 lg:px-16 overflow-hidden"
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-white/5 to-transparent" />

      <div className="max-w-7xl mx-auto">
        {/* ── HEADER ── */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="h-px w-6 bg-fourth/50" />
              <p className="text-[10px] tracking-[0.4em] uppercase font-black font-primary text-fourth/70">
                AVX · Help Center
              </p>
            </div>
            <h2 className="font-primary font-black uppercase leading-none tracking-tight text-primary text-[clamp(2.2rem,6vw,4.5rem)]">
              FAQ
            </h2>
          </div>
          <div className="flex flex-col items-start sm:items-end gap-1">
            <span className="font-primary font-black text-[clamp(2rem,4vw,3rem)] leading-none text-fourth/40">
              {String(items.length).padStart(2, "0")}
            </span>
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/25 font-primary">
              Questions
            </span>
          </div>
        </div>

        <div className="grid lg:grid-cols-[280px_1fr] gap-8 lg:gap-12 items-start">
          {/* ── SIDEBAR CATEGORY TABS ── */}
          <div className="lg:sticky lg:top-8">
            <div
              className="rounded-2xl overflow-hidden border border-white/6"
              style={{ background: "rgba(255,255,255,0.02)" }}
            >
              <div className="px-5 py-4 border-b border-white/5">
                <p className="text-[9px] font-black uppercase tracking-[0.4em] text-primary/25 font-primary">
                  Categories
                </p>
              </div>
              <div className="p-2 space-y-0.5">
                {categories.map((c, idx) => {
                  const Icon = c.icon;
                  const isCurrent = activeCat === idx;
                  return (
                    <button
                      key={c.id}
                      onClick={() => switchCat(idx)}
                      className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-left transition-all duration-250 outline-none group"
                      style={{
                        background: isCurrent
                          ? "rgba(0,123,255,0.1)"
                          : "transparent",
                        border: "1px solid",
                        borderColor: isCurrent
                          ? "rgba(0,123,255,0.2)"
                          : "transparent",
                      }}
                    >
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-all duration-250"
                        style={{
                          background: isCurrent
                            ? "rgba(0,123,255,0.15)"
                            : "rgba(255,255,255,0.04)",
                        }}
                      >
                        <Icon
                          size={14}
                          className={`transition-colors duration-250 ${isCurrent ? "text-fourth" : "text-primary/25"}`}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p
                          className={`text-[12px] font-black uppercase tracking-wide transition-colors duration-250 font-primary ${isCurrent ? "text-fourth" : "text-primary/40 group-hover:text-primary/60"}`}
                        >
                          {c.label}
                        </p>
                        <p className="text-[10px] text-primary/20 font-secondary mt-0.5">
                          {c.tag}
                        </p>
                      </div>
                      <span
                        className="text-[11px] font-black font-primary tabular-nums transition-colors duration-250"
                        style={{
                          color: isCurrent
                            ? "rgba(0,123,255,0.6)"
                            : "rgba(255,255,255,0.1)",
                        }}
                      >
                        {c.number}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ── FAQ CONTENT ── */}
          <div>
            {/* Category heading */}
            <div className="flex items-center gap-4 mb-8">
              <span
                className="font-black text-6xl leading-none select-none font-primary"
                style={{ color: "rgba(0,123,255,0.08)" }}
              >
                {cat.number}
              </span>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-4 h-px bg-fourth/50" />
                  <span className="text-[9px] tracking-[0.45em] uppercase font-black text-fourth/60 font-primary">
                    {cat.tag}
                  </span>
                </div>
                <h3 className="font-black uppercase leading-none tracking-tight text-primary font-primary text-[clamp(1.6rem,3vw,2.8rem)]">
                  {cat.label}
                </h3>
              </div>
            </div>

            {/* Accordion list */}
            <div
              className="transition-all duration-220 rounded-2xl overflow-hidden border border-white/6"
              style={{
                opacity: animating ? 0 : 1,
                transform: animating ? "translateY(10px)" : "translateY(0)",
                background: "rgba(255,255,255,0.015)",
              }}
            >
              {items.map((item, idx) => (
                <QRow
                  key={`${cat.id}-${idx}`}
                  item={item}
                  isOpen={openQ === idx}
                  onToggle={() => setOpenQ(openQ === idx ? null : idx)}
                />
              ))}
            </div>

            {/* Bottom pagination dots */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/5">
              <button
                onClick={() => switchCat(Math.max(0, activeCat - 1))}
                disabled={activeCat === 0}
                className="flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] font-black font-primary transition-all duration-200 disabled:opacity-15 text-primary/30 hover:text-primary"
              >
                <span>←</span>
                <span className="hidden sm:inline">
                  {activeCat > 0 ? categories[activeCat - 1].label : "—"}
                </span>
              </button>

              <div className="flex items-center gap-1.5">
                {categories.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => switchCat(i)}
                    className="h-1 rounded-full transition-all duration-350"
                    style={{
                      width: activeCat === i ? "28px" : "6px",
                      background:
                        activeCat === i ? "#007bff" : "rgba(255,255,255,0.1)",
                    }}
                  />
                ))}
              </div>

              <button
                onClick={() =>
                  switchCat(Math.min(categories.length - 1, activeCat + 1))
                }
                disabled={activeCat === categories.length - 1}
                className="flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] font-black font-primary transition-all duration-200 disabled:opacity-15 text-primary/30 hover:text-primary"
              >
                <span className="hidden sm:inline">
                  {activeCat < categories.length - 1
                    ? categories[activeCat + 1].label
                    : "—"}
                </span>
                <span>→</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  );
}
