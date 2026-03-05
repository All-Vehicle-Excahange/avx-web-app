import { useState } from "react";
import Link from "next/link";
import {
  Car,
  Tag,
  ClipboardCheck,
  UserCheck,
  CreditCard,
  Megaphone,
  KeyRound,
  ShieldAlert,
  ArrowUpRight,
  ChevronRight,
} from "lucide-react";

const topics = [
  {
    id: "buying",
    label: "Buying a Vehicle",
    icon: Car,
    index: "01",
    desc: "Find, compare and secure your next vehicle with confidence.",
  },
  {
    id: "selling",
    label: "Selling Your Vehicle",
    icon: Tag,
    index: "02",
    desc: "List your vehicle, set the right price and reach verified buyers.",
  },
  {
    id: "inspection",
    label: "AVX Inspection",
    icon: ClipboardCheck,
    index: "03",
    desc: "Understand our 200-point inspection layer and what it covers.",
  },
  {
    id: "consultant",
    label: "Consultant Program",
    icon: UserCheck,
    index: "04",
    desc: "Learn how to join, get verified and build your storefront.",
  },
  {
    id: "billing",
    label: "Subscription & Billing",
    icon: CreditCard,
    index: "05",
    desc: "Manage your plan, invoices and payment methods.",
  },
  {
    id: "ppc",
    label: "PPC & Boost Campaigns",
    icon: Megaphone,
    index: "06",
    desc: "Amplify your listings with targeted boost and PPC tools.",
  },
  {
    id: "account",
    label: "Account & Login",
    icon: KeyRound,
    index: "07",
    desc: "Account setup, security settings and login troubleshooting.",
  },
  {
    id: "disputes",
    label: "Disputes & Reporting",
    icon: ShieldAlert,
    index: "08",
    desc: "Report issues, raise disputes and understand resolution flows.",
  },
];

export default function PopularTopicsGrid() {
  const [hovered, setHovered] = useState(null);

  return (
    <section className="relative py-20 px-4 sm:px-8 lg:px-16 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-white/6 to-transparent" />

      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="h-px w-6 bg-fourth/50" />
              <p className="text-[10px] tracking-[0.4em] uppercase font-black font-primary text-fourth/70">
                Help Center
              </p>
            </div>
            <h2 className="font-primary text-[clamp(2.2rem,5vw,4rem)] font-black uppercase tracking-tight leading-none text-primary">
              Popular <span className="text-fourth">Topics.</span>
            </h2>
          </div>
          <div className="flex flex-col gap-2 items-start sm:items-end">
            <p className="text-sm text-primary/40 max-w-xs leading-relaxed font-secondary">
              Browse the most visited help categories or search for something
              specific.
            </p>
            <Link
              href="/help#faq"
              className="flex items-center gap-1.5 text-[11px] font-black uppercase tracking-[0.2em] font-primary text-primary hover:gap-2.5 transition-all duration-200"
            >
              Browse all FAQs <ChevronRight size={11} />
            </Link>
          </div>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {topics.map((topic) => {
            const Icon = topic.icon;
            const isHovered = hovered === topic.id;

            return (
              <button
                key={topic.id}
                onMouseEnter={() => setHovered(topic.id)}
                onMouseLeave={() => setHovered(null)}
                className="group relative flex flex-col justify-between p-6 text-left transition-all duration-350 overflow-hidden rounded-2xl border outline-none"
                style={{
                  minHeight: "200px",
                  background: isHovered
                    ? "rgba(255,255,255,0.04)"
                    : "rgba(255,255,255,0.02)",
                  borderColor: isHovered
                    ? "rgba(255,255,255,0.12)"
                    : "rgba(255,255,255,0.06)",
                  transform: isHovered ? "translateY(-2px)" : "translateY(0)",
                  boxShadow: isHovered ? "0 8px 30px rgba(0,0,0,0.4)" : "none",
                }}
                aria-label={`Go to ${topic.label}`}
              >
                {/* Top hover line */}
                <div
                  className={`absolute top-0 left-0 right-0 h-[1.5px] transition-opacity duration-300 ${
                    isHovered ? "opacity-100" : "opacity-0"
                  }`}
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
                  }}
                />

                {/* Ghost index */}
                <div
                  className="absolute bottom-3 right-4 font-primary font-black select-none leading-none pointer-events-none transition-all duration-300 text-[4.5rem]"
                  style={{
                    color: isHovered
                      ? "rgba(255,255,255,0.06)"
                      : "rgba(255,255,255,0.03)",
                  }}
                >
                  {topic.index}
                </div>

                {/* Icon + Arrow */}
                <div className="flex items-start justify-between mb-6 relative z-10">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300"
                    style={{
                      background: isHovered
                        ? "rgba(255,255,255,0.1)"
                        : "rgba(255,255,255,0.05)",
                    }}
                  >
                    <Icon
                      size={16}
                      className={`transition-colors duration-300 ${
                        isHovered ? "text-primary" : "text-primary/35"
                      }`}
                    />
                  </div>

                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-300 ${
                      isHovered
                        ? "opacity-100 translate-x-0"
                        : "opacity-0 translate-x-2"
                    }`}
                    style={{
                      background: "rgba(255,255,255,0.08)",
                    }}
                  >
                    <ArrowUpRight size={12} className="text-primary/60" />
                  </div>
                </div>

                {/* Label & Desc */}
                <div className="relative z-10">
                  <p
                    className={`font-primary font-black uppercase text-[13px] tracking-wide leading-snug mb-2 transition-colors duration-300 ${
                      isHovered ? "text-primary" : "text-primary/70"
                    }`}
                  >
                    {topic.label}
                  </p>
                  <p
                    className={`text-[12px] leading-relaxed transition-colors duration-300 font-secondary ${
                      isHovered ? "text-primary/65" : "text-primary/35"
                    }`}
                  >
                    {topic.desc}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
