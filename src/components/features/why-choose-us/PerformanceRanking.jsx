"use client";

import {
  CheckCircle2,
  Zap,
  ShieldCheck,
  BarChart4,
  ArrowRight,
  Gauge,
} from "lucide-react";

export default function RankingDiagram() {
  const criteria = [
    { label: "Inspection Status", icon: <ShieldCheck size={16} /> },
    { label: "Engagement Signals", icon: <BarChart4 size={16} /> },
    { label: "Listing Freshness", icon: <Gauge size={16} /> },
    { label: "Seller Performance", icon: <CheckCircle2 size={16} /> },
  ];

  return (
    <section className="relative py-10  font-secondary">
      <div className="w-full mx-auto">
        {/* HEADER */}
        <div className="max-w-2xl mb-16">
          <p className="text-sm tracking-[0.4em] uppercase text-third font-semibold mb-3">
            PERFORMANCE & RANKING
          </p>
          <h2 className="font-primary text-3xl sm:text-4xl lg:text-5xl font-bold uppercase tracking-tight font-primary leading-none mb-6">
            Visibility <span className="text-fourth">Defined.</span>
          </h2>
          <p className="text-third text-base opacity-70">
            We dont hide our logic. Here is exactly how we determine which
            vehicles appear first.
          </p>
        </div>

        {/* --- THE VISUAL DIAGRAM --- */}
        {/* --- CONTAINED DIAGRAM WRAPPER --- */}
        <div className="relative border border-white/20 rounded-3xl p-10  backdrop-blur-sm">
          <div className="grid lg:grid-cols-12 gap-6 items-center relative">
            {/* LEFT SIGNALS */}
            <div className="lg:col-span-4 space-y-4 relative">
              <h4 className="text-[14px] uppercase tracking-[0.2em] text-third/90 mb-1">
                Data Signals
              </h4>
              <p className="text-[13px] text-third/70 mb-6 ">
                These measurable inputs contribute directly to each listings
                composite ranking score.
              </p>

              {criteria.map((item, i) => (
                <div
                  key={i}
                  className="group flex items-center justify-between p-4 rounded-xl border border-white/5 bg-white/3 hover:bg-white/6 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-fourth">{item.icon}</span>
                    <span className="text-xs font-bold uppercase tracking-wider text-primary">
                      {item.label}
                    </span>
                  </div>

                  <div className="text-[9px] text-third/40 uppercase tracking-widest">
                    Weighted
                  </div>
                </div>
              ))}

              {/* subtle connector */}
              <div className="hidden lg:block absolute top-0 -right-5 h-full w-px bg-white/10"></div>
            </div>

            {/* ENGINE CORE */}
            <div className="lg:col-span-4 flex flex-col items-center justify-center relative">
              {/* Glow pulse */}
              {/* <div className="absolute w-40 h-40 rounded-full bg-fourth/5 blur-2xl animate-pulse"></div> */}

              <div className="group relative w-28 h-28 rounded-2xl overflow-hidden border border-fourth/20">
                <img
                  src="engine-core.jpg"
                  alt="Ranking system core"
                  className="w-full h-full object-cover transition-all duration-500 group-hover:filter-[blur(0px)_grayscale(0)] filter-[blur(1px)_grayscale(100%)]"
                />
              </div>

              <h3 className="text-sm font-bold uppercase tracking-[0.3em] mt-6">
                AVX Engine
              </h3>

              <p className="text-[10px] text-third/50 uppercase mt-2">
                Computing Composite Score
              </p>
            </div>

            {/* RIGHT OUTPUT */}
            <div className="lg:col-span-4 relative">
              <div className="absolute -left-5 top-0 h-full w-px bg-white/10 hidden lg:block"></div>

              <div className="bg-black/40 border border-white/10 rounded-2xl p-6 shadow-2xl">
                <h4 className="text-[14px] uppercase tracking-[0.2em] text-third/90 mb-1">
                  Ranked Results
                </h4>
                <p className="text-[13px] text-third/70 mb-6 ">
                  Listings are positioned based on calculated quality score —
                  highest score appears first.
                </p>

                <div className="space-y-4">
                  <Result score="9.8" highlight />
                  <Result score="8.4" />
                  <Result score="7.2" faded />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* LEGEND / SUMMARY */}
        {/* BOTTOM DEFINITIONS: FILLING THE EMPTY SPACE */}
        {/* BOTTOM DEFINITIONS */}
        <div className="mt-8  border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
          <div className="grid md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-white/10">
            {[
              {
                title: "Inspection Impact",
                info: "Verified reports increase ranking priority by a fixed 15% multiplier to reward transparency.",
                highlight: "15% Bonus",
                isPremium: false,
              },
              {
                title: "Freshness Decay",
                info: "Algorithm triggers visibility reduction exactly after 14 days of listing inactivity.",
                highlight: "14-Day Cycle",
                isPremium: false,
              },
              {
                title: "Engagement Weight",
                info: "Real-time click velocity and inquiry volume directly influence organic strength.",
                highlight: "Active Signal",
                isPremium: false,
              },
              {
                title: "Boost Integration",
                info: "Premium placement protocol that bypasses standard decay for immediate top-tier visibility.",
                highlight: "Priority Access",
                isPremium: true,
              },
            ].map((def, i) => (
              <div
                key={i}
                className={`p-8 transition-all group relative h-full flex flex-col ${
                  def.isPremium
                    ? "bg-fourth/5 z-10 shadow-[inset_0_0_20px_rgba(0,123,255,0.1)]"
                    : "bg-secondary hover:bg-white/3"
                }`}
              >
                {/* TOP STATUS BAR */}
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className={`text-[10px] font-black px-2 py-1 rounded-md uppercase tracking-tighter ${
                      def.isPremium
                        ? "bg-fourth/70 text-primary"
                        : "bg-white/10 text-third"
                    }`}
                  >
                    {def.highlight}
                  </div>
                  <div
                    className={`h-px flex-1 ${def.isPremium ? "bg-fourth/30" : "bg-white/5"}`}
                  ></div>
                </div>

                {/* CONTENT */}
                <div className="flex-1">
                  <h5
                    className={`text-[13px] font-bold uppercase tracking-widest mb-3 font-primary ${
                      def.isPremium ? "text-fourth" : "text-primary"
                    }`}
                  >
                    {def.title}
                  </h5>

                  <p
                    className={`text-sm leading-relaxed ${
                      def.isPremium ? "text-primary/90" : "text-third/70"
                    }`}
                  >
                    {def.info}
                  </p>
                </div>

                {/* DECORATIVE CORNER FOR BOOST */}
                {def.isPremium && (
                  <div className="absolute top-0 right-0 p-2">
                    <Zap
                      size={12}
                      className="text-fourth "
                      fill="currentColor"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Result({ score, label, highlight, faded }) {
  return (
    <div
      className={`relative p-3 rounded-xl border transition-all duration-500 ${
        highlight
          ? "border-fourth/50 bg-fourth/5 scale-105 shadow-[0_10px_30px_rgba(0,123,255,0.15)] z-10"
          : "border-white/5 bg-white/5"
      } ${faded ? "opacity-30" : "opacity-100"}`}
    >
      <div className="flex gap-4 items-center">
        <div
          className={`w-12 h-10 rounded flex flex-col items-center justify-center font-black transition-colors ${
            highlight ? "bg-fourth/30 text-primary" : "bg-white/10 text-third"
          }`}
        >
          <span className="text-[10px] leading-none">{score}</span>
          <span className="text-[6px] uppercase tracking-tighter mt-0.5">
            Score
          </span>
        </div>
        <div className="flex-1">
          <div
            className={`h-1.5 w-full rounded mb-2 ${highlight ? "bg-fourth/30" : "bg-white/10"}`}
          >
            <div
              className="h-full bg-fourth/30 rounded"
              style={{ width: `${parseFloat(score) * 10}%` }}
            ></div>
          </div>
          <p className="text-[9px] uppercase font-bold tracking-widest text-primary/60">
            {label}
          </p>
        </div>
      </div>
    </div>
  );
}
