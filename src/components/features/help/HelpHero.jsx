import { useState, useRef, useEffect } from "react";
import {
  Search,
  X,
  ArrowUpRight,
  Shield,
  Zap,
  Clock,
  BookOpen,
  MessageSquare,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import SupportFlowModal from "./SupportFlowModal";

const QUICK_LINKS = [
  {
    label: "AVX Inspection Process",
    href: "/help/what-is-avx-inspection",
    tag: "Popular",
  },
  {
    label: "How to list a vehicle",
    href: "/help/how-to-list-your-vehicle",
    tag: "Guide",
  },
  {
    label: "Subscription & billing",
    href: "/help/subscription-tiers-explained",
    tag: "Billing",
  },
  {
    label: "Apply as a Consultant",
    href: "/help/how-to-become-a-consultant",
    tag: "Consultant",
  },
  {
    label: "PPC campaign setup",
    href: "/help/how-ppc-vehicle-boost-works",
    tag: "Boost",
  },
  {
    label: "Request an inspection",
    href: "/help/how-to-request-inspection",
    tag: "Inspection",
  },
];

const STATS = [
  {
    value: "500+",
    label: "Help Articles",
    icon: BookOpen,
    color: "text-fourth",
  },
  {
    value: "24 / 7",
    label: "Live Support",
    icon: MessageSquare,
    color: "text-green-400",
  },
  {
    value: "< 4 hrs",
    label: "Avg Response",
    icon: Clock,
    color: "text-amber-400",
  },
  { value: "98%", label: "Resolved", icon: Shield, color: "text-fourth" },
];

const CATEGORIES = [
  { label: "Inspection", color: "bg-primary/5 text-primary/60 border-primary/10" },
  { label: "Listing", color: "bg-primary/5 text-primary/60 border-primary/10" },
  { label: "Billing", color: "bg-primary/5 text-primary/60 border-primary/10" },
  {
    label: "Consultant",
    color: "bg-primary/5 text-primary/60 border-primary/10",
  },
  { label: "PPC", color: "bg-primary/5 text-primary/60 border-primary/10" },
  { label: "Account", color: "bg-primary/5 text-primary/60 border-primary/10" },
];

export default function HelpHero() {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const [mounted, setMounted] = useState(false);
  const inputRef = useRef(null);
  const [supportOpen, setSupportOpen] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(t);
  }, []);

  const filtered =
    query.length > 0
      ? QUICK_LINKS.filter((l) =>
        l.label.toLowerCase().includes(query.toLowerCase()),
      )
      : QUICK_LINKS;

  const clear = () => {
    setQuery("");
    inputRef.current?.focus();
  };

  return (
    <>
      <section className="relative min-h-[92vh] flex flex-col justify-center overflow-hidden">
        {/* Ambient radial glows */}
        {/* <div
        className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(0,123,255,0.08) 0%, transparent 70%)",
        }}
      />
       */}

        <div
          className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full pointer-events-none"
         
        />

        {/* Fine grid overlay */}
        {/* <div
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      /> */}

        {/* Top edge glow line */}

        {/* ── CONTENT ── */}
        <div
          className={`relative z-10 w-full px-4 sm:px-8 lg:px-0 py-24 transition-all duration-700 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} `}
        >
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
              {/* ── LEFT COLUMN ── */}
              <div className="flex flex-col gap-8">
                {/* Eyebrow badge */}
                <div className="flex items-center gap-3 self-start">
                  <div>
                    <span className="text-sm tracking-[0.4em] uppercase text-third font-semibold">
                      AVX Help Center
                    </span>
                  </div>

                </div>

                {/* Headline */}
                <div className="space-y-2">
                  <h2
                    className="
             text-3xl sm:text-4xl lg:text-5xl
              font-semibold
              leading-[1.05]
              text-primary
              font-[Montserrat]
            "
                  >
                    How Can We Help
                    <br />
                    <span className="text-fourth/80"> You Today?
                    </span>
                  </h2>
                </div>

                {/* Sub */}
                <p className="text-base leading-relaxed text-primary/40 font-secondary max-w-md">
                  Search 500+ articles, guides, and tutorials — or jump straight
                  to our support team.
                </p>

                {/* ── SEARCH BAR ── */}
                <div className="relative">
                  {/* Glow ring on focus */}
                  <div
                    className={`absolute -inset-0.5 rounded-2xl transition-opacity duration-300 pointer-events-none ${focused ? "opacity-100" : "opacity-0"}`}
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(255,254,255,0.01))",
                      filter: "blur(6px)",
                    }}
                  />

                  <div
                    className={`relative flex items-center gap-3 px-5 py-4 rounded-2xl border transition-all duration-300 ${focused ? "border-third/10 " : "border-white/8 bg-white/4"}`}
                   
                  >
                    <Search
                      size={18}
                      className={`shrink-0 transition-colors duration-300 ${focused ? "text-fourth" : "text-primary/25"}`}
                    />
                    <input
                      ref={inputRef}
                      type="text"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      onFocus={() => setFocused(true)}
                      onBlur={() => setTimeout(() => setFocused(false), 200)}
                      placeholder='Try "inspection", "listing", "refund"…'
                      className="flex-1 bg-transparent border-none outline-none text-primary text-sm font-secondary placeholder:text-primary/20"
                    />
                    {query ? (
                      <button
                        onClick={clear}
                        className="text-primary/30 hover:text-primary/60 transition-colors"
                      >
                        <X size={14} />
                      </button>
                    ) : (
                      <span className="text-[10px] px-2 py-1 rounded-md border border-primary/10 text-primary/25 font-primary tracking-widest hidden sm:block">
                        ⌘ K
                      </span>
                    )}
                    <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-[11px] font-black uppercase tracking-[0.18em] font-primary text-secondary bg-primary transition-all duration-200 hover:-translate-y-0.5">
                      <Zap size={11} />
                      Search
                    </button>
                  </div>

                  {/* Dropdown */}
                  {focused && (
                    <div
                      className="absolute top-[calc(100%+8px)] overflow-scroll scrollbar-hide left-0 right-0 z-50 rounded-2xl  border border-white/8"
                      style={{
                        background: "#252424",
                        boxShadow:
                          "0 24px 64px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.04)",
                      }}
                    >
                      <div className="px-4 pt-3 pb-2 text-[9px] tracking-[0.4em] uppercase font-black font-primary text-primary/25 border-b border-white/5">
                        {query ? `Results for "${query}"` : "Quick Links"}
                      </div>
                      {filtered.length > 0 ? (
                        filtered.map((item, i) => (
                          <Link
                            key={i}
                            href={item.href}
                            onMouseDown={(e) => e.preventDefault()}
                            className="flex items-center justify-between px-4 py-3.5 hover:bg-fourth/8 transition-colors group border-b border-white/4 last:border-0"
                            style={{ background: "transparent" }}
                          >
                            <div className="flex items-center gap-3">
                              <Search
                                size={11}
                                className="text-primary/40 shrink-0"
                              />
                              <span className="text-sm text-primary/65 group-hover:text-primary transition-colors font-secondary">
                                {item.label}
                              </span>
                            </div>
                            <span
                              className="text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md font-primary text-primary/80 bg-third/10"
                            
                            >
                              {item.tag}
                            </span>
                          </Link>
                        ))
                      ) : (
                        <div className="px-4 py-6 text-center text-sm text-primary/30">
                          No results for {query}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Category filter chips */}
                <div className="flex flex-wrap gap-2">
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/30 font-primary self-center mr-1">
                    Browse:
                  </span>
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat.label}
                      className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-[0.15em] font-primary border transition-all duration-200 hover:-translate-y-0.5 ${cat.color}`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* ── RIGHT COLUMN ── */}
              <div className="flex flex-col gap-5">
                {/* Stats grid */}
                {/* <div className="grid grid-cols-2 gap-3">
                  {STATS.map((stat, i) => {
                    const Icon = stat.icon;
                    return (
                      <div
                        key={i}
                        className="relative group p-5 rounded-2xl border border-white/6 overflow-hidden transition-all duration-300 "
                        style={{ background: "rgba(255,255,255,0.02)" }}
                      >
                        <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />
                        <div className="flex items-start gap-3">
                          <div
                            className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                            style={{ background: "rgba(0,123,255,0.1)" }}
                          >
                            <Icon size={15} className={stat.color} />
                          </div>
                          <div>
                            <div
                              className={`font-primary font-black text-2xl leading-none ${stat.color}`}
                            >
                              {stat.value}
                            </div>
                            <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-primary/30 mt-1 font-primary">
                              {stat.label}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div> */}
                <div className="grid grid-cols-2 gap-3">
                  {STATS.map((stat, i) => {
                    const Icon = stat.icon;
                    return (
                      <div
                        key={i}
                        className="relative p-5 rounded-2xl border overflow-hidden"
                        style={{
                          background: "rgba(255,255,255,0.03)",
                          borderColor: "rgba(255,255,255,0.07)",
                        }}
                      >
                        <div
                          className="absolute top-0 left-0 right-0 h-px"
                          style={{
                            background:
                              "linear-gradient(to right, transparent, rgba(255,255,255,0.08), transparent)",
                          }}
                        />
                        <div className="flex items-start gap-3">
                          <div
                            className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                            style={{ background: "rgba(255,255,255,0.06)" }}
                          >
                            <Icon size={15} style={{ color: "rgba(255,255,255,0.5)" }} />
                          </div>
                          <div>
                            <div
                              className="font-primary font-black text-2xl leading-none"
                              style={{ color: "#fffef7" }}
                            >
                              {stat.value}
                            </div>
                            <div
                              className="text-[10px] font-bold uppercase tracking-[0.25em] mt-1 font-primary"
                              style={{ color: "rgba(255,254,247,0.28)" }}
                            >
                              {stat.label}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                {/* Quick nav card */}
                <div
                  className="rounded-2xl border border-white/6 overflow-hidden"
                  style={{ background: "rgba(255,255,255,0.02)" }}
                >
                  <div className="px-5 py-4 border-b border-white/5 flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-[0.35em] text-primary/30 font-primary">
                      Top Articles
                    </span>
                    <Link
                      href="/help"
                      className="text-[10px] font-black uppercase tracking-widest text-primary/60 hover:text-primary/90 transition-colors font-primary flex items-center gap-1"
                    >
                      View all <ChevronRight size={10} />
                    </Link>
                  </div>
                  <div className="divide-y divide-white/4">
                    {QUICK_LINKS.slice(0, 4).map((link, i) => (
                      <Link
                        key={i}
                        href={link.href}
                        className="flex items-center justify-between px-5 py-3.5 group hover:bg-white/2 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <span
                            className="w-5 h-5 rounded-md flex items-center justify-center shrink-0 text-[9px] font-black font-primary text-primary/25"
                            style={{ background: "rgba(255,255,255,0.04)" }}
                          >
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <span className="text-sm text-primary/60 group-hover:text-primary transition-colors font-secondary leading-snug">
                            {link.label}
                          </span>
                        </div>
                        <ArrowUpRight
                          size={12}
                          className="text-primary/20 group-hover:text-primary transition-colors shrink-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 duration-200"
                        />
                      </Link>
                    ))}
                  </div>
                </div>

                {/* CTA Strip */}
                <div className="flex gap-3">
                  <Link
                    href="/help"
                    className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl text-[11px] font-black uppercase tracking-[0.18em] font-primary text-secondary transition-all duration-200 hover:-translate-y-0.5 bg-primary/90"
                    style={{
                      // boxShadow: "0 8px 28px rgba(0,123,255,0.3)",
                    }}
                  >
                    Browse All Articles <ArrowUpRight size={12} />
                  </Link>
                  <Link
                    href="/help#support"
                    className="flex items-center gap-2 px-5 py-3.5 rounded-xl text-[11px] font-black uppercase tracking-[0.18em] font-primary text-primary/50 border border-white/8 hover:border-white/15 hover:text-primary transition-all duration-200"
                    onClick={() => setSupportOpen(true)}
                    style={{ background: "rgba(255,255,255,0.03)" }}
                  >
                    <MessageSquare size={12} /> Contact
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {supportOpen && (
        <SupportFlowModal onClose={() => setSupportOpen(true)} />
      )}
    </>
  );
}
