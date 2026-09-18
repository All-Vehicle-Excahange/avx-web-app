import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  ClipboardSignature,
  UserCheck,
  MapPin,
  Camera,
  ShieldCheck,
  Eye,
} from "lucide-react";

export default function InspectionWorkFlow() {
  const [isMobile, setIsMobile] = useState(false);
  const [radius, setRadius] = useState(290);

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;

      if (w < 768) {
        setIsMobile(true);
        setRadius(0);
      } else if (w < 1280) {
        setIsMobile(false);
        setRadius(250); // tighter orbit tablet
      } else {
        setIsMobile(false);
        setRadius(290); // full desktop
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const steps = [
    {
      title: "Request Submitted",
      desc: "Buyer or consultant submits inspection request via listing.",
      icon: <ClipboardSignature className="w-5 h-5" />,
      color: "bg-primary/10",
    },
    {
      title: "Inspector Assigned",
      desc: "Reecomm maps nearest verified inspector.",
      icon: <UserCheck className="w-5 h-5" />,
      color: "bg-primary/10",
    },
    {
      title: "Inspection Arrives",
      desc: "Inspector conducts on-site evaluation.",
      icon: <MapPin className="w-5 h-5" />,
      color: "bg-primary/10",
    },
    {
      title: "Photos Uploaded",
      desc: "All evidence photos and videos uploaded in real time.",
      icon: <Camera className="w-5 h-5" />,
      color: "bg-primary/10",
    },
    {
      title: "Report Reviewed",
      desc: "Platform quality check before report is released.",
      icon: <ShieldCheck className="w-5 h-5" />,
      color: "bg-primary/10",
    },
    {
      title: "Report Published",
      desc: "Inspector uploads structured digital report to the platform.",
      icon: <Eye className="w-5 h-5" />,
      color: "bg-primary/10",
    },
  ];

  const totalSteps = steps.length;

  const renderArrows = () => {
    if (isMobile) return null; // hide on mobile

    return steps.map((_, idx) => {
      const nextIdx = (idx + 1) % totalSteps;
      const angle1 = (-90 + idx * 60) * (Math.PI / 180);
      const angle2 = (-90 + nextIdx * 60) * (Math.PI / 180);
      const midAngle = (-90 + (idx + 0.5) * 60) * (Math.PI / 180);

      const startX = Math.cos(angle1 + 0.15) * radius;
      const startY = Math.sin(angle1 + 0.15) * radius;
      const endX = Math.cos(angle2 - 0.15) * radius;
      const endY = Math.sin(angle2 - 0.15) * radius;
      const cpX = Math.cos(midAngle) * (radius * 1.05);
      const cpY = Math.sin(midAngle) * (radius * 1.05);

      return (
        <g key={idx} className="text-primary/40">
          <path
            d={`M ${startX} ${startY} Q ${cpX} ${cpY} ${endX} ${endY}`}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeDasharray="6 6"
            strokeLinecap="round"
          />
        </g>
      );
    });
  };

  return (
    <section className="relative py-10  overflow-hidden">
      {/* rings */}
      {/* <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 md:w-150 h-125 md:h-150 border border-primary/20 rounded-full animate-[spin_60s_linear_infinite]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-175 md:w-212.5 h-175 md:h-212.5 border border-primary/5 rounded-full animate-[spin_90s_linear_infinite_reverse]" />
      </div> */}

      <div className="relative z-20 mx-auto w-full">
        {/* header */}
        <div className="text-center mb-8 md:mb-12">
          <p className="text-xs md:text-sm tracking-[0.4em] uppercase text-third font-semibold mb-3">
            System Operation
          </p>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.05] text-primary font-montserrat">
            Inspection <span className="text-fourth/80">workflow</span>
          </h2>
        </div>

        {/* ===== MOBILE STACK ===== */}
        {isMobile && (
          <div className="space-y-6">
            {steps.map((step, idx) => (
              <div
                key={idx}
                className="w-full rounded-3xl border border-primary/10 p-5 flex gap-4 bg-primary/2 backdrop-blur-md"
              >
                <div
                  className={`w-12 h-12 rounded-2xl ${step.color} flex items-center justify-center text-primary shrink-0`}
                >
                  {step.icon}
                </div>

                <div>
                  <p className="text-[10px] text-primary font-mono mb-1">
                    STEP {String(idx + 1).padStart(2, "0")}
                  </p>
                  <h4 className="text-base font-bold text-primary mb-1">
                    {step.title}
                  </h4>
                  <p className="text-xs text-third/70 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ===== DESKTOP CIRCLE ===== */}
        {!isMobile && (
          <div className="relative flex justify-center items-center min-h-[760px] md:min-h-[820px] my-4">
            {/* core */}
            <div className="absolute z-20 w-44 h-44 md:w-48 md:h-48 rounded-full border-2 border-primary/30 backdrop-blur-md bg-secondary/80 flex flex-col items-center justify-center p-4 shadow-2xl">
              <span className="text-primary/70 font-mono text-[10px] uppercase tracking-widest block mb-2">
                CORE
              </span>
              <Image
                src="/logo/logo.webp"
                alt="Reecomm Logo"
                width={120}
                height={26}
                className="h-6 md:h-7 w-auto object-contain block"
              />
            </div>

            {/* arrows */}
            <svg
              className="absolute inset-0 pointer-events-none overflow-visible z-0"
              style={{ width: "100%", height: "100%" }}
            >
              <g style={{ transform: "translate(50%, 50%)" }}>
                {renderArrows()}
              </g>
            </svg>

            {/* steps */}
            <div className="relative w-full max-w-5xl h-full">
              {steps.map((step, idx) => {
                const angle = (-90 + idx * 60) * (Math.PI / 180);

                return (
                  <div
                    key={idx}
                    className="absolute transition-all duration-500 hover:z-30 group"
                    style={{
                      left: `calc(50% + ${Math.cos(angle) * radius}px - 100px)`,
                      top: `calc(50% + ${Math.sin(angle) * radius}px - 100px)`,
                    }}
                  >
                    <div className="relative w-[200px] h-[200px] rounded-full border border-primary/20 backdrop-blur-xl bg-secondary/60 flex flex-col items-center justify-center text-center p-5 transition-all duration-500 group-hover:border-primary/50 group-hover:-translate-y-2 shadow-xl">
                      <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full border border-primary/20 bg-secondary text-[10px] font-mono text-primary">
                        STEP {String(idx + 1).padStart(2, "0")}
                      </div>

                      <div
                        className={`w-12 h-12 mb-3 rounded-2xl ${step.color} flex items-center justify-center text-primary shadow-lg transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6`}
                      >
                        {step.icon}
                      </div>

                      <h4 className="text-xs font-bold text-primary mb-1.5 uppercase tracking-tight leading-tight">
                        {step.title}
                      </h4>

                      <p className="text-[11px] text-third/70 leading-relaxed max-w-[140px]">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <div className="mt-8 md:mt-12 text-center">
          <p className="text-third/40 font-mono text-xs md:text-sm tracking-widest uppercase">
            Automated Real-Time Tracking Protocol Enabled
          </p>
        </div>
      </div>
    </section>
  );
}
