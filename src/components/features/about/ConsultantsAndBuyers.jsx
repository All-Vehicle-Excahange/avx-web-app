// app/about/components/ConsultantsAndBuyers.jsx
"use client";

import { useState, useRef, useEffect } from "react";
import {
  Store,
  BarChart3,
  Megaphone,
  Layers,
  ShieldCheck,
  CheckCircle,
  Sliders,
  MessageSquare,
} from "lucide-react";

/* ===================== */
/* DATA */
/* ===================== */

const DATA = {
  buyers: {
    label: "For Buyers",
    titleTop: "A marketplace designed",
    titleBottom: "for confident buying decisions",
    desc: "AVX helps buyers navigate pre-owned vehicles with clarity. Verified consultants, structured listings, and transparent communication replace guesswork with confidence.",
    cta: { text: "Browse Vehicles →", href: "/vehicles" },
    features: [
      {
        icon: <CheckCircle size={22} />,
        title: "Verified consultant storefronts",
        desc: "Browse vehicles through consultant profiles that reflect identity, credibility, and standards.",
      },
      {
        icon: <Layers size={22} />,
        title: "Structured vehicle detail pages",
        desc: "Consistent, information-rich listings designed to reduce ambiguity.",
      },
      {
        icon: <ShieldCheck size={22} />,
        title: "Optional inspection reassurance",
        desc: "Inspection-backed confidence signals available where reassurance matters.",
      },
      {
        icon: <MessageSquare size={22} />,
        title: "Inquiry & communication transparency",
        desc: "Clear visibility into inquiry status, responses, and engagement.",
      },
      {
        icon: <Sliders size={22} />,
        title: "Marketplace-level filtering",
        desc: "Advanced filters across consultants, vehicles, and attributes.",
      },
    ],
  },

  consultants: {
    label: "For Consultants",
    titleTop: "A platform built",
    titleBottom: "for serious automotive consultants",
    desc: "AVX empowers consultants with structured visibility, measurable performance, and scalable growth — without compromising credibility.",
    cta: { text: "Become a Consultant →", href: "/consultant" },
    features: [
      {
        icon: <Store size={22} />,
        title: "Public storefront with brand visibility",
        desc: "A permanent public presence representing your inventory, reputation, and operating discipline.",
      },
      {
        icon: <BarChart3 size={22} />,
        title: "Performance dashboard & analytics",
        desc: "Clear insight into views, leads, engagement, and conversion outcomes.",
      },
      {
        icon: <Megaphone size={22} />,
        title: "PPC & featured placements",
        desc: "Optional paid amplification designed to increase reach without diluting trust.",
      },
      {
        icon: <Layers size={22} />,
        title: "Tier-based growth tools",
        desc: "Advanced capabilities unlocked progressively as performance compounds.",
      },
      {
        icon: <ShieldCheck size={22} />,
        title: "Inspection credibility layer",
        desc: "Inspection-backed trust signals that increase buyer confidence and reduce friction.",
      },
    ],
  },
};

/* ===================== */
/* MAIN COMPONENT */
/* ===================== */

export default function ConsultantsAndBuyers() {
  const [active, setActive] = useState("buyers");
  const current = DATA[active];

  // refs for auto-width slider
  const buyersRef = useRef(null);
  const consultantsRef = useRef(null);
  const sliderRef = useRef(null);

  useEffect(() => {
    const activeBtn =
      active === "buyers" ? buyersRef.current : consultantsRef.current;

    if (activeBtn && sliderRef.current) {
      sliderRef.current.style.width = `${activeBtn.offsetWidth}px`;
      sliderRef.current.style.transform = `translateX(${activeBtn.offsetLeft}px)`;
    }
  }, [active]);

  return (
    <section className="">
      <div className="mx-auto w-full py-10">
        {/* ===================== */}
        {/* TOGGLE */}
        {/* ===================== */}
        <div className="mb-24 flex justify-center">
          <div className="relative inline-flex rounded-full border border-neutral-700 p-1">
            {/* Slider */}
            <div
              ref={sliderRef}
              className="absolute top-1 left-1 h-[calc(100%-8px)] rounded-full bg-white transition-all duration-300"
            />

            <button
              ref={buyersRef}
              onClick={() => setActive("buyers")}
              className={`relative z-10 px-8 py-3 text-sm uppercase tracking-widest transition
                ${
                  active === "buyers"
                    ? "text-black"
                    : "text-neutral-300 hover:text-white"
                }`}
            >
              For Buyers
            </button>

            <button
              ref={consultantsRef}
              onClick={() => setActive("consultants")}
              className={`relative z-10 px-10 py-3 text-sm uppercase tracking-widest transition
                ${
                  active === "consultants"
                    ? "text-black"
                    : "text-neutral-300 hover:text-white"
                }`}
            >
              For Consultants
            </button>
          </div>
        </div>

        {/* ===================== */}
        {/* CONTENT */}
        {/* ===================== */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-28">
          {/* LEFT — STICKY */}
          <StickyBlock {...current} />

          {/* RIGHT — FEATURES */}
          <div className="space-y-24">
            {current.features.map((f, i) => (
              <Capability key={i} {...f} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ===================== */
/* SUB COMPONENTS */
/* ===================== */

function StickyBlock({ label, titleTop, titleBottom, desc, cta }) {
  return (
    <div className="lg:sticky lg:top-32 h-fit">
      <p className="mb-8 inline-block text-sm tracking-[0.4em] uppercase text-third font-semibold relative">
        {label}
        <span className="absolute left-0 -bottom-3 h-0.5 w-16 bg-linear-to-r from-neutral-100 to-transparent" />
      </p>

      <h2 className="text-4xl sm:text-5xl xl:text-5xl font-medium leading-[1.15] text-white font-[Montserrat]">
        {titleTop}
        <span className="block  text-fourth mt-2">
          {titleBottom}
        </span>
      </h2>

      <p className="mt-12 max-w-xl text-xl leading-relaxed text-neutral-300 ">
        {desc}
      </p>

      <div className="mt-20">
        <a
          href={cta.href}
          className="inline-flex items-center gap-2 text-lg text-white underline underline-offset-8 decoration-neutral-600 hover:decoration-neutral-300 transition"
        >
          {cta.text}
        </a>
      </div>
    </div>
  );
}

function Capability({ title, desc, icon }) {
  return (
    <div className="border-l border-neutral-700 pl-10 flex gap-6">
      <div className="mt-1 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-fourth text-fourth">
        {icon}
      </div>

      <div>
        <h3 className="text-2xl font-medium text-white">{title}</h3>
        <p className="mt-4 text-lg leading-relaxed text-neutral-400">{desc}</p>
      </div>
    </div>
  );
}
