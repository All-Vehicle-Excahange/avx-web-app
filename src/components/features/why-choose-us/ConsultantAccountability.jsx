"use client";

import { 
  Store, 
  ShieldCheck, 
  Star, 
  Activity, 
  Info, 
  ChevronRight,
  Package,
  Trophy
} from "lucide-react";

export default function ConsultantAccountability() {
  const storefrontFeatures = [
    { label: "Inventory Overview", icon: <Package size={14} />, desc: "Live stock tracking" },
    { label: "Reviews", icon: <Star size={14} />, desc: "Verified client feedback" },
    { label: "Performance Signals", icon: <Activity size={14} />, desc: "Response & reliability" },
    { label: "Business Information", icon: <Info size={14} />, desc: "Verified credentials" },
  ];

  return (
    <section className="relative py-10  overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute -top-[10%] -right-[5%] w-125 h-125 bg-fourth/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* LEFT CONTENT: THE LOGIC */}
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-6">
              <p className="text-sm tracking-[0.4em] uppercase text-third font-semibold">
                Consultant Accountability
              </p>
            </div>
            
            <h2 className="font-primary text-3xl sm:text-4xl lg:text-5xl font-bold uppercase tracking-tighter leading-[0.9] mb-8 text-primary">
              Storefront <br />
              <span className="text-third/30 italic font-light">Transparency.</span>
            </h2>

            <p className="text-third/80 text-base leading-relaxed mb-10 max-w-lg">
              We eliminate the hidden middleman. Every consultant operates through a transparent 
              digital storefront where visibility is a direct result of performance, not preference.
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              {storefrontFeatures.map((item, i) => (
                <div key={i} className="group p-4 rounded-xl border border-white/5 bg-white/2 hover:bg-white/5 transition-all">
                  <div className="flex items-center gap-3 mb-2 text-fourth">
                    {item.icon}
                    <span className="text-[13px] font-bold uppercase tracking-wider text-primary">
                      {item.label}
                    </span>
                  </div>
                  <p className="text-[12px] text-third/50 uppercase tracking-[0.5px] ">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT CONTENT: THE VISUAL UI PREVIEW */}
          <div className="relative">
            {/* The "Storefront" Mockup */}
            <div className="relative  border border-white/10 rounded-3xl p-1 overflow-hidden shadow-2xl backdrop-blur-md">
              <div className=" rounded-[22px] p-8">
                
                {/* Store Header */}
                <div className="flex items-start justify-between mb-8 pb-8 border-b border-white/5">
                  <div className="flex gap-5 items-center">
                    <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-white/10 to-white/5 border border-white/10 flex items-center justify-center text-fourth">
                      <Store size={32} />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-primary mb-1 uppercase tracking-tight">Verified Consultant</h4>
                      <div className="flex items-center gap-2">
                        <ShieldCheck size={14} className="text-fourth" />
                        <span className="text-[10px] uppercase tracking-widest text-third/60 font-bold">ID: AVX-9920-X</span>
                      </div>
                    </div>
                  </div>
                  <div className="px-3 py-1 rounded-full bg-fourth/10 border border-fourth/20 text-fourth text-[10px] font-black uppercase tracking-tighter">
                    Tier 01 Priority
                  </div>
                </div>

                {/* Performance Grid */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                  <StatBox label="Inventory" value="24 Units" />
                  <StatBox label="Rating" value="4.9 / 5.0" />
                  <StatBox label="Status" value="Verified" highlight />
                </div>

                {/* Tier Visibility Logic */}
                <div className="p-5 rounded-2xl bg-white/3 border border-white/5">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[12px] font-bold uppercase tracking-[0.2em] text-third/50">Visibility Structure</span>
                    <Trophy size={16} className="text-fourth" />
                  </div>
                  <div className="space-y-3">
                    <TierBar level="High Priority" width="w-full" active />
                    <TierBar level="Standard Market" width="w-[60%]" />
                    <TierBar level="Reduced Reach" width="w-[30%]" faded />
                  </div>
                </div>
                
                <p className="mt-6 text-center text-[9px] uppercase tracking-[0.3em] text-third/30">
                  Visibility is earned and structured.
                </p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}

function StatBox({ label, value, highlight }) {
  return (
    <div className="text-center p-3 rounded-lg bg-white/2 border border-white/5">
      <p className="text-[8px] uppercase tracking-[0.2em] text-third/40 mb-1">{label}</p>
      <p className={`text-xs font-bold uppercase tracking-tight ${highlight ? 'text-fourth' : 'text-primary'}`}>{value}</p>
    </div>
  );
}

function TierBar({ level, width, active, faded }) {
  return (
    <div className={`space-y-1.5 ${faded ? 'opacity-30' : 'opacity-100'}`}>
      <div className="flex justify-between items-center">
        <span className="text-[11px] uppercase font-bold tracking-widest text-primary/80">{level}</span>
        {active && <span className="text-[8px] text-fourth font-black uppercase italic">Current Rank</span>}
      </div>
      <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
        <div className={`h-full rounded-full transition-all duration-1000 ${active ? 'bg-fourth shadow-[0_0_8px_rgba(0,123,255,0.5)]' : 'bg-white/20'} ${width}`} />
      </div>
    </div>
  );
}