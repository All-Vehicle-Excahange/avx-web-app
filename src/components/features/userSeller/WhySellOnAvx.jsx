import React from 'react';
import { Users, BarChart3, ShieldCheck, Zap } from 'lucide-react';

const Features = [
  {
    title: "Reach Verified Buyers",
    desc: "Connect directly with a curated network of serious, pre-qualified automotive enthusiasts.",
    icon: <Users className="text-fourth" size={24} />,
  },
  {
    title: "Track Real Inquiries",
    desc: "Monitor lead performance and consultant interactions through your dedicated seller dashboard.",
    icon: <BarChart3 className="text-fourth" size={24} />,
  },
  {
    title: "Optional Inspection",
    desc: "Boost buyer confidence by opting for a professional multi-point vehicle verification.",
    icon: <ShieldCheck className="text-fourth" size={24} />,
  },
  {
    title: "Performance Visibility",
    desc: "Benefit from high-intent traffic and strategic placement for premium vehicle listings.",
    icon: <Zap className="text-fourth" size={24} />,
  },
];

function WhySellOnAvx() {
  return (
    <section 
      className="w-full py-24 lg:py-32 overflow-hidden"
      style={{ background: "linear-gradient(90deg, #313131 0%, #1a1919 45%, #000000 100%)" }}
    >
      <div className="container mx-auto px-6 lg:px-16">
        
        {/* Section Header */}
        <div className="mb-16 lg:mb-20">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-[1px] bg-fourth" />
            <span className="text-fourth text-[10px] uppercase font-bold tracking-[0.5em]">Advantage</span>
          </div>
          <h2 className="text-4xl lg:text-6xl font-semibold text-primary font-[Montserrat] tracking-tighter">
            WHY SELL <br />
            <span className="text-white/60 italic uppercase">ON AVX</span>
          </h2>
        </div>

        {/* 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 border border-white/10 rounded-[32px] overflow-hidden">
          {Features.map((item, index) => (
            <div 
              key={index} 
              className="bg-[#1a1919] p-8 lg:p-10 hover:bg-white/[0.03] transition-all duration-500 group relative"
            >
              {/* Subtle Top Accent */}
              <div className="absolute top-0 left-0 w-0 h-[2px] bg-fourth group-hover:w-full transition-all duration-700" />
              
              <div className="mb-8 p-3 w-fit rounded-xl bg-white/5 border border-white/5 group-hover:border-fourth/30 transition-colors">
                {item.icon}
              </div>

              <h3 className="text-primary text-xl font-bold font-[Montserrat] mb-4 tracking-tight group-hover:translate-x-1 transition-transform">
                {item.title}
              </h3>
              
              <p className="text-third/50 text-sm font-[Poppins] leading-relaxed group-hover:text-third/80 transition-colors">
                {item.desc}
              </p>

              {/* Decorative Index */}
              <span className="absolute bottom-6 right-8 text-white/[0.03] text-4xl font-black font-[Montserrat] group-hover:text-fourth/10 transition-colors">
                0{index + 1}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default WhySellOnAvx;