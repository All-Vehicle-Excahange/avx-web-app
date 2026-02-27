"use client";

import { useState } from "react";
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
} from "lucide-react";

const topics = [
  {
    id: "buying",
    label: "Buying a Vehicle",
    icon: Car,
    index: "01",
    desc: "Find, compare and secure your next vehicle with confidence.",
    accent: false,
  },
  {
    id: "selling",
    label: "Selling Your Vehicle",
    icon: Tag,
    index: "02",
    desc: "List your vehicle, set the right price and reach verified buyers.",
    accent: false,
  },
  {
    id: "inspection",
    label: "AVX Inspection",
    icon: ClipboardCheck,
    index: "03",
    desc: "Understand our 200-point inspection layer and what it covers.",
    accent: true,
  },
  {
    id: "consultant",
    label: "Consultant Program",
    icon: UserCheck,
    index: "04",
    desc: "Learn how to join, get verified and build your storefront.",
    accent: false,
  },
  {
    id: "billing",
    label: "Subscription & Billing",
    icon: CreditCard,
    index: "05",
    desc: "Manage your plan, invoices and payment methods.",
    accent: false,
  },
  {
    id: "ppc",
    label: "PPC & Boost Campaigns",
    icon: Megaphone,
    index: "06",
    desc: "Amplify your listings with targeted boost and PPC tools.",
    accent: true,
  },
  {
    id: "account",
    label: "Account & Login",
    icon: KeyRound,
    index: "07",
    desc: "Account setup, security settings and login troubleshooting.",
    accent: false,
  },
  {
    id: "disputes",
    label: "Disputes & Reporting",
    icon: ShieldAlert,
    index: "08",
    desc: "Report issues, raise disputes and understand resolution flows.",
    accent: false,
  },
];

export default function PopularTopicsGrid() {
  const [hovered, setHovered] = useState(null);

  return (
    <section className="relative py-16 overflow-hidden font-secondary text-primary">
      <div className="w-full mx-auto relative">
        {/* ── HEADER ── */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 sm:mb-14">
          <div>
            <p className="text-sm tracking-[0.4em] uppercase text-third/60 font-semibold mb-1 font-primary">
              Help Center
            </p>
            <h2 className="font-primary text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight leading-none text-primary">
              Popular <span className="text-fourth">Topics.</span>
            </h2>
          </div>

          <p className="text-third/60 text-sm max-w-xs leading-relaxed">
            Browse the most visited help categories or search for something
            specific.
          </p>
        </div>

        {/* ── GRID ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-primary/10 rounded-2xl overflow-hidden border border-primary/5">
          {topics.map((topic) => {
            const Icon = topic.icon;
            const isHovered = hovered === topic.id;
            const isBlue = topic.accent;

            return (
              <button
                key={topic.id}
                onMouseEnter={() => setHovered(topic.id)}
                onMouseLeave={() => setHovered(null)}
                className={`group relative flex flex-col justify-between p-7 sm:p-8 text-left transition-all duration-300 min-h-50 overflow-hidden bg-secondary outline-none ${
                  isHovered
                    ? isBlue
                      ? "bg-fourth/10"
                      : "bg-primary/5"
                    : "bg-secondary"
                }`}
                aria-label={`Go to ${topic.label}`}
              >
                {/* Top accent line on hover */}
                <div
                  className={`absolute top-0 left-0 right-0 h-px transition-opacity duration-300 ${
                    isHovered ? "opacity-100" : "opacity-0"
                  } ${
                    isBlue
                      ? "bg-linear-to-r from-transparent via-fourth/70 to-transparent"
                      : "bg-linear-to-r from-transparent via-primary/25 to-transparent"
                  }`}
                />

                {/* Ghost index number */}
                <div
                  className={`absolute bottom-4 right-5 font-primary font-black select-none leading-none pointer-events-none transition-all duration-300 text-[clamp(3rem,6vw,5rem)] ${
                    isHovered
                      ? isBlue
                        ? "text-fourth/15"
                        : "text-primary/10"
                      : isBlue
                        ? "text-fourth/5"
                        : "text-primary/5"
                  }`}
                >
                  {topic.index}
                </div>

                {/* Icon + Arrow row */}
                <div className="flex items-start justify-between mb-5 relative z-10">
                  <div
                    className={`flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-300 ${
                      isHovered
                        ? isBlue
                          ? "bg-fourth/20 text-fourth"
                          : "bg-primary/10 text-primary"
                        : isBlue
                          ? "bg-fourth/10 text-fourth/60"
                          : "bg-primary/5 text-third/30"
                    }`}
                  >
                    <Icon size={16} />
                  </div>

                  {/* Arrow — appears on hover */}
                  <div
                    className={`flex items-center justify-center w-7 h-7 rounded-lg transition-all duration-300 ${
                      isHovered
                        ? "opacity-100 translate-x-0 translate-y-0"
                        : "opacity-0 translate-x-1 -translate-y-1"
                    } ${
                      isBlue
                        ? "bg-fourth/15 text-fourth"
                        : "bg-primary/10 text-primary/50"
                    }`}
                  >
                    <ArrowUpRight size={12} />
                  </div>
                </div>

                {/* Label & Desc */}
                <div className="relative z-10">
                  <p
                    className={`font-primary font-black uppercase text-[13px] sm:text-[14px] tracking-wide leading-snug mb-2 transition-colors duration-300 ${
                      isHovered
                        ? isBlue
                          ? "text-fourth"
                          : "text-primary"
                        : "text-primary/75"
                    }`}
                  >
                    {topic.label}
                  </p>
                  <p
                    className={`text-[11px] sm:text-[14px] leading-relaxed transition-colors duration-300 font-secondary ${
                      isHovered ? "text-third/80" : "text-third/60"
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
