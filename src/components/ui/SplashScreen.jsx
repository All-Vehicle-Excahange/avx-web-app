import { useEffect, useState } from "react";
import Image from "next/image";

export default function SplashScreen({ onComplete }) {
  const [stage, setStage] = useState(0);
  const [progress, setProgress] = useState(0);

  // Total animation time: 2s (all stages compressed)
  useEffect(() => {
    const TOTAL = 1300; // ms to reach 100%
    const interval = 20;
    let elapsed = 0;

    const ticker = setInterval(() => {
      elapsed += interval;
      const pct = Math.min(100, Math.round((elapsed / TOTAL) * 100));
      setProgress(pct);
      if (pct >= 100) clearInterval(ticker);
    }, interval);

    const timers = [
      setTimeout(() => setStage(1), 100),     // logo + bar enter
      setTimeout(() => setStage(2), 600),     // slide left + REECOMM letters
      setTimeout(() => setStage(3), 1400),    // curtain lifts
      setTimeout(() => { window.scrollTo(0, 0); onComplete(); }, 2000),
    ];

    return () => {
      timers.forEach(clearTimeout);
      clearInterval(ticker);
    };
  }, [onComplete]);

  // SVG letter files for "EECOMM" (R logo is separate)
  const svgLetters = [
    // { src: "/logo/r.svg", alt: "R" },
    { src: "/logo/e.svg", alt: "E" },
    { src: "/logo/e.svg", alt: "E" },
    { src: "/logo/c.svg", alt: "C" },
    { src: "/logo/o.svg", alt: "O" },
    { src: "/logo/m.svg", alt: "M", wide: true },
    { src: "/logo/m.svg", alt: "M", wide: true },
  ];

  return (
    <>
      <style>{`
        /* ================= LOGO ENTRY ================= */
        @keyframes logo-depth-in {
          0%   { opacity: 0; transform: scale(0.4); filter: blur(12px); }
          100% { opacity: 1; transform: scale(1);   filter: blur(0); }
        }

        /* ================= LETTER ENTRY ================= */
        @keyframes letter-in {
          0%   { opacity: 0; transform: translateY(12px) scale(0.9); }
          100% { opacity: 1; transform: translateY(0)    scale(1); }
        }

        /* ================= SLIDE GROUP ================= */
        @keyframes slide-group-left {
          0%   { transform: translateX(70px); }
          100% { transform: translateX(0); }
        }
        @media (min-width: 768px) {
          @keyframes slide-group-left {
            0%   { transform: translateX(160px); }
            100% { transform: translateX(0); }
          }
        }

        /* ================= CURTAIN LIFT ================= */
        @keyframes curtain-lift {
          0%   { transform: translateY(0); }
          100% { transform: translateY(-100%); }
        }

        /* ================= WHEEL SPIN ================= */
        @keyframes wheel-spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }

        /* ================= PROGRESS BAR SHIMMER ================= */
        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position: 200% center; }
        }

        /* ================= BOTTOM SECTION FADE IN ================= */
        @keyframes fade-up {
          0%   { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        .logo-in     { animation: logo-depth-in 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .letter-in   { opacity: 0; animation: letter-in 0.25s cubic-bezier(0.22, 1, 0.36, 1) forwards; }
        .slide-group { animation: slide-group-left 0.6s cubic-bezier(0.25, 1, 0.5, 1) forwards; }
        .curtain-lift { animation: curtain-lift 0.6s cubic-bezier(0.76, 0, 0.24, 1) forwards; }

        .wheel-spin {
          animation: wheel-spin 0.6s linear infinite;
          transform-origin: center;
        }

        .bar-fill {
          background: linear-gradient(90deg, #555 0%, #fff 45%, #aaa 55%, #555 100%);
          background-size: 200% auto;
          animation: shimmer 0.8s linear infinite;
        }

        .bottom-fade {
          animation: fade-up 0.4s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
      `}</style>

      {/* WHOLE SPLASH SCREEN */}
      <div
        className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden ${stage === 3 ? "curtain-lift" : ""
          }`}
        style={{ background: "linear-gradient(90deg, #313131 0%, #1a1919 45%, #000000 100%)" }}
      >
        {/* ── CENTER GROUP: logo + REECOMM SVGs ── */}
        <div
          className={`flex items-center justify-center gap-0 ${stage >= 2 ? "slide-group" : ""
            }`}
        >
          {/* R LOGO */}
          {stage >= 1 && (
            <div className="relative w-[80px] h-[80px] md:w-[130px] md:h-[130px] -mr-2  logo-in">
              <Image
                src="/logo/r-main.svg"
                alt="Reecomm logo"
                fill
                className="object-contain"
                priority
              />
            </div>
          )}

          {/* EECOMM SVG LETTERS */}
          {stage >= 2 && (
            <div className="flex items-center gap-[2px] md:gap-[3px]">
              {svgLetters.map((letter, i) => (
                <div
                  key={i}
                  className={`letter-in ${letter.wide ? "w-[42px] h-[24px] md:w-[80px] md:h-[44px]" : "w-[22px] h-[24px] md:w-[42px] md:h-[44px]"}`}
                  style={{ animationDelay: `${i * 0.05}s` }}
                >
                  <img
                    src={letter.src}
                    alt={letter.alt}
                    className="w-full h-full  object-contain"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ── BOTTOM LOADING SECTION ── */}
        {stage >= 1 && (
          <div className="absolute bottom-30 md:bottom-25 left-0 right-0 px-6 md:px-16 lg:px-28 flex flex-col items-center gap-5 bottom-fade">

            {/* Tagline */}
            <p className="text-white/30 text-[10px] md:text-xs tracking-[0.35em] uppercase font-medium">
              Your trusted vehicle marketplace
            </p>

            {/* Progress Bar Container */}
            <div className="w-full max-w-[500px] relative">
              {/* Track */}
              <div className="w-full h-[5px] rounded-full bg-white/10 overflow-hidden backdrop-blur-sm">
                {/* Fill */}
                <div
                  className="h-full rounded-full bar-fill relative transition-all duration-75 ease-linear"
                  style={{ width: `${progress}%` }}
                >
                  {/* Glow dot at end */}
                  <span
                    className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white shadow-[0_0_12px_rgba(255,255,255,0.8),0_0_30px_rgba(255,255,255,0.4)]"
                    style={{ opacity: progress > 2 ? 1 : 0 }}
                  />
                </div>
              </div>

              {/* Percentage + spinner row */}
              <div className="flex items-center justify-between mt-3">
                {/* Left: spinner + status */}
                <div className="flex items-center gap-2.5">
                  {/* Minimal ring spinner */}
                  <div className="w-4 h-4 rounded-full border-2 border-white/20 border-t-white wheel-spin" />
                  <span className="text-white/50 text-[11px] md:text-xs tracking-wider font-medium">
                    {progress < 30
                      ? "Initializing…"
                      : progress < 70
                        ? "Loading assets…"
                        : progress < 95
                          ? "Almost ready…"
                          : "Launching!"}
                  </span>
                </div>

                {/* Right: Percentage pill */}
                <span className="text-white/70 text-[11px] md:text-xs tabular-nums tracking-widest bg-white/5 border border-white/10 px-3 py-1 rounded-full backdrop-blur-sm font-semibold">
                  {progress}%
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}