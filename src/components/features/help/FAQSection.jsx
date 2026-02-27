"use client";

import { useState, useRef, useEffect } from "react";
import { Car, Tag, UserCheck, CreditCard, Zap, User, Flag } from "lucide-react";

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
      q: "Can I chat with consultant on web?",
      a: "Yes. Web chat is available for initial inquiries. Continued engagement may require the mobile app for secure and real-time messaging.",
    },
    {
      q: "Why am I asked to download mobile app?",
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
      q: "Can I chat with multiple consultants?",
      a: "Yes. Each conversation remains independent and transparent within your account.",
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
      q: "Can I edit listing after submission?",
      a: "Yes. Listings can be updated unless marked sold or under dispute.",
    },
    {
      q: "How many photos can I upload?",
      a: "Multiple high-resolution images are supported for transparency.",
    },
    {
      q: "Can I mark vehicle as sold?",
      a: "Yes. Once transaction is completed externally, mark it as sold.",
    },
    {
      q: "How do I track inquiries?",
      a: "All inquiries are visible in your dashboard with timestamps and engagement history.",
    },
    {
      q: "Can I relist vehicle later?",
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
      q: "How to apply as consultant?",
      a: "Submit identity verification and required documentation for review.",
    },
    {
      q: "How long does verification take?",
      a: "Verification typically completes within a few working days.",
    },
    {
      q: "When does storefront go live?",
      a: "After verification approval and subscription activation.",
    },
    {
      q: "Can I upgrade tier later?",
      a: "Yes. Tier upgrades are available anytime.",
    },
    {
      q: "Can I downgrade?",
      a: "Downgrades are processed at the end of billing cycle.",
    },
    {
      q: "What happens if subscription expires?",
      a: "Visibility may reduce or listings may be temporarily suspended.",
    },
    {
      q: "Can I use WhatsApp integration?",
      a: "Integration availability depends on compliance and platform policy.",
    },
    {
      q: "Can I request inspection for vehicles?",
      a: "Yes. Consultants may request inspections to enhance credibility.",
    },
  ],
  billing: [
    {
      q: "How do I upgrade tier?",
      a: "Access dashboard → subscription settings → select upgrade.",
    },
    {
      q: "When will subscription renew?",
      a: "Subscriptions renew automatically unless cancelled.",
    },
    {
      q: "Can I cancel subscription?",
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
      q: "Can I get refund on inspection?",
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
      q: "Can I pause campaign?",
      a: "Yes. Campaigns can be paused or adjusted anytime.",
    },
    {
      q: "Can I see campaign analytics?",
      a: "Real-time campaign analytics are available in dashboard.",
    },
    {
      q: "Can I target city/category?",
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
      q: "How to reset password?",
      a: "Use Forgot Password option to receive reset link.",
    },
    {
      q: "Can I use social login?",
      a: "Social login availability depends on configuration.",
    },
    {
      q: "How to delete account?",
      a: "Account deletion requests can be submitted through settings.",
    },
  ],
  disputes: [
    {
      q: "How do I report listing issue?",
      a: "Use Report Listing option available on vehicle page.",
    },
    {
      q: "How do I raise complaint?",
      a: "Complaints can be submitted via dashboard dispute section.",
    },
    {
      q: "What happens after complaint?",
      a: "Platform reviews documentation and interaction history.",
    },
    {
      q: "Can AVX suspend consultant?",
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

export default function FAQSections() {
  const [activeCat, setActiveCat] = useState(0);
  const [openQ, setOpenQ] = useState(null);
  const [dir, setDir] = useState(1);
  const [animating, setAnimating] = useState(false);
  const tabsRef = useRef(null);
  const timerRef = useRef(null);

  const cat = categories[activeCat];
  const items = faqData[cat.id] || [];

  const switchCat = (idx) => {
    if (idx === activeCat || animating) return;
    setDir(idx > activeCat ? 1 : -1);
    setAnimating(true);
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setActiveCat(idx);
      setOpenQ(null);
      setAnimating(false);
    }, 260);

    const tabEl = tabsRef.current?.children[idx];
    tabEl?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  };

  useEffect(() => () => clearTimeout(timerRef.current), []);

  return (
    <section className="relative overflow-hidden flex flex-col font-primary">
      <div className="relative z-10 flex flex-col flex-1  mx-auto w-full   py-12 sm:py-16">
        {/* TOP: TITLE + META */}
        <div className="flex items-end justify-between mb-8 sm:mb-10">
          <div>
            <p className="text-sm tracking-[0.4em] uppercase text-third/60 font-semibold mb-2">
              AVX · Help Center
            </p>
            <h2 className="font-black uppercase leading-none tracking-tight text-primary text-[clamp(2rem,6vw,4.5rem)]">
              FAQ
            </h2>
          </div>

          <div className="flex flex-col items-end gap-0.5 transition-all duration-300">
            <span className="font-black leading-none text-[clamp(2rem,5vw,3.5rem)] text-fourth/50 transition-colors duration-400">
              {String(items.length).padStart(2, "0")}
            </span>
            <span className="text-[12px] text-third/40 uppercase tracking-[0.3em] font-bold">
              Questions
            </span>
          </div>
        </div>

        {/* HORIZONTAL CATEGORY TAB STRIP */}
        <div className="relative border-y border-primary/10">
          <div
            className="absolute bottom-0 h-0.5 bg-fourth transition-all duration-400 ease-[cubic-bezier(0.65,0,0.35,1)]"
            style={{
              width: `${100 / categories.length}%`,
              left: `${(activeCat / categories.length) * 100}%`,
            }}
          />

          <div ref={tabsRef} className="flex overflow-x-auto no-scrollbar">
            {categories.map((c, idx) => {
              const Icon = c.icon;
              const isCurrent = activeCat === idx;
              return (
                <button
                  key={c.id}
                  onClick={() => switchCat(idx)}
                  className="flex-1 min-w-25 sm:min-w-0 flex flex-col items-center gap-1.5 py-4 sm:py-5 px-2 sm:px-4 transition-all duration-250 relative outline-none group"
                >
                  <Icon
                    size={16}
                    className={`transition-colors duration-250 ${isCurrent ? "text-fourth" : "text-third/20"}`}
                  />
                  <span
                    className={`font-black uppercase text-[10px] sm:text-[13px] tracking-wider whitespace-nowrap transition-colors duration-250 ${isCurrent ? "text-fourth" : "text-third/25"}`}
                  >
                    {c.label}
                  </span>
                  <span
                    className={`text-[15px] tabular-nums transition-colors duration-250 ${isCurrent ? "text-fourth/50" : "text-third/10"}`}
                  >
                    {c.number}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* MAIN: TWO-COLUMN QUESTION LIST */}
        <div
          className="flex-1 mt-8 sm:mt-10 transition-all duration-260"
          style={{
            opacity: animating ? 0 : 1,
            transform: animating
              ? `translateY(${dir > 0 ? "18px" : "-18px"})`
              : "translateY(0)",
          }}
        >
          <div className="flex items-center gap-4 mb-7 sm:mb-9">
            <span className="font-black text-5xl sm:text-7xl leading-none select-none text-fourth/10">
              {cat.number}
            </span>

            <div>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-4 h-px bg-fourth/60" />
                <span className="text-[10px] tracking-[0.45em] uppercase font-semibold text-fourth/60">
                  {cat.tag}
                </span>
              </div>
              <h3 className="font-black uppercase leading-none tracking-tight text-primary text-[clamp(1.6rem,3vw,3rem)]">
                {cat.label}
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-x-12 xl:gap-x-20">
            <div>
              {items
                .filter((_, i) => i % 2 === 0)
                .map((item, colIdx) => {
                  const globalIdx = colIdx * 2;
                  return (
                    <QRow
                      key={`${cat.id}-L-${colIdx}`}
                      item={item}
                      index={globalIdx}
                      isOpen={openQ === globalIdx}
                      onToggle={() =>
                        setOpenQ(openQ === globalIdx ? null : globalIdx)
                      }
                      delay={colIdx * 0.06}
                    />
                  );
                })}
            </div>
            <div>
              {items
                .filter((_, i) => i % 2 === 1)
                .map((item, colIdx) => {
                  const globalIdx = colIdx * 2 + 1;
                  return (
                    <QRow
                      key={`${cat.id}-R-${colIdx}`}
                      item={item}
                      index={globalIdx}
                      isOpen={openQ === globalIdx}
                      onToggle={() =>
                        setOpenQ(openQ === globalIdx ? null : globalIdx)
                      }
                      delay={0.03 + colIdx * 0.06}
                    />
                  );
                })}
            </div>
          </div>
        </div>

        {/* BOTTOM NAV */}
        <div className="flex items-center justify-between pt-8 mt-6 border-t border-primary/5">
          <button
            onClick={() => switchCat(Math.max(0, activeCat - 1))}
            disabled={activeCat === 0}
            className="flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] font-bold transition-all duration-200 disabled:opacity-10 text-third/30 hover:text-primary"
          >
            <span className="text-base">←</span>
            <span className="hidden sm:inline">
              {activeCat > 0 ? categories[activeCat - 1].label : "—"}
            </span>
          </button>

          <div className="flex items-center gap-2">
            {categories.map((_, i) => (
              <button
                key={i}
                onClick={() => switchCat(i)}
                className={`h-1 rounded-full transition-all duration-350 ${activeCat === i ? "w-7 bg-fourth" : "w-1.5 bg-primary/10"}`}
              />
            ))}
          </div>

          <button
            onClick={() =>
              switchCat(Math.min(categories.length - 1, activeCat + 1))
            }
            disabled={activeCat === categories.length - 1}
            className="flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] font-bold transition-all duration-200 disabled:opacity-10 text-third/30 hover:text-primary"
          >
            <span className="hidden sm:inline">
              {activeCat < categories.length - 1
                ? categories[activeCat + 1].label
                : "—"}
            </span>
            <span className="text-base">→</span>
          </button>
        </div>
      </div>

      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        @keyframes qRowIn {
          from {
            opacity: 0;
            transform: translateX(-10px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </section>
  );
}

function QRow({ item, index, isOpen, onToggle, delay }) {
  return (
    <div
      className="relative border-b border-primary/5 transition-colors duration-200"
      style={{
        animation: `qRowIn 0.4s ${delay}s cubic-bezier(0.22,1,0.36,1) both`,
      }}
    >
      <div
        className={`absolute left-0 top-0 bottom-0 w-[2.5px] bg-fourth rounded-full transition-transform duration-320 origin-top ${isOpen ? "scale-y-100" : "scale-y-0"}`}
      />

      <button
        onClick={onToggle}
        className="w-full flex items-start gap-4 text-left py-5 pl-4 pr-2 group"
      >
        <span
          className={`font-black text-xs shrink-0 mt-0.5 w-6 text-right tabular-nums transition-colors duration-200 ${isOpen ? "text-fourth/60" : "text-primary/10"}`}
        >
          {String(index + 1).padStart(2, "0")}
        </span>

        <span
          className={`flex-1 text-[14px] sm:text-[15px] font-semibold leading-snug transition-colors duration-200 font-secondary ${isOpen ? "text-fourth" : "text-primary/60"}`}
        >
          {item.q}
        </span>

        <div
          className={`shrink-0 mt-0.5 w-5 h-5 rounded-md flex items-center justify-center transition-all duration-250 ${isOpen ? "bg-fourth/15 text-fourth" : "bg-primary/5 text-third/20"}`}
        >
          <span className="text-m font-light leading-none">
            {isOpen ? "−" : "+"}
          </span>
        </div>
      </button>

      <div
        className="overflow-hidden transition-[max-height] duration-380 ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{ maxHeight: isOpen ? "260px" : "0" }}
      >
        <p className="pl-10 pr-4 pb-5 text-sm sm:text-[15px] leading-relaxed text-third/50 font-secondary">
          {item.a}
        </p>
      </div>
    </div>
  );
}
