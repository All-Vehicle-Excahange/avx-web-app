import { useEffect, useState } from "react";
import Image from "next/image";

export default function SplashScreen({ onComplete }) {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStage(1), 200),    // logo enters
      setTimeout(() => setStage(2), 1400),   // slide left + show text
      setTimeout(() => setStage(3), 2800),   // curtain lifts up (whole screen with content)
      setTimeout(() => { window.scrollTo(0, 0); onComplete(); }, 3800),  // scroll to top + done
    ];

    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  const letters = "REECOMM".split("");

  return (
    <>
      <style>{`
        /* ================= LOGO ENTRY ================= */
        @keyframes logo-depth-in {
          0% {
            opacity: 0;
            transform: scale(0.4);
            filter: blur(12px);
          }
          100% {
            opacity: 1;
            transform: scale(1);
            filter: blur(0);
          }
        }

        /* ================= TEXT ================= */
        @keyframes letter-in {
          0% {
            opacity: 0;
            transform: translateY(12px) scale(0.9);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        /* ================= SLIDE GROUP ================= */
        @keyframes slide-group-left {
          0% { transform: translateX(70px); }
          100% { transform: translateX(0); }
        }
        @media (min-width: 768px) {
          @keyframes slide-group-left {
            0% { transform: translateX(160px); }
            100% { transform: translateX(0); }
          }
        }

        /* ================= CURTAIN LIFT (solid black slides up cleanly) ================= */
        @keyframes curtain-lift {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(-100%);
          }
        }

        .logo-in {
          animation: logo-depth-in 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .letter-in {
          opacity: 0;
          animation: letter-in 0.5s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        .slide-group {
          animation: slide-group-left 1.2s cubic-bezier(0.25, 1, 0.5, 1) forwards;
        }

        .curtain-lift {
          animation: curtain-lift 1s cubic-bezier(0.76, 0, 0.24, 1) forwards;
        }
      `}</style>

      {/* WHOLE SPLASH SCREEN — lifts up like a curtain with content still visible */}
      <div
        className={`fixed inset-0 z-[9999] bg-black flex items-center justify-center overflow-hidden ${
          stage === 3 ? "curtain-lift" : ""
        }`}
      >
        {/* GROUP CENTER */}
        <div
          className={`flex items-center justify-center gap-3 md:gap-6
            ${stage === 2 ? "slide-group" : ""}
          `}
        >
          {/* LOGO */}
          {stage >= 1 && (
            <div className="relative w-[90px] h-[90px] md:w-[150px] md:h-[150px] logo-in">
              <Image
                src="/logo/animate-logo.png"
                alt="logo"
                fill
                className="object-contain"
                priority
              />
            </div>
          )}

          {/* TEXT */}
          {stage >= 2 && (
            <div className="flex items-center">
              {letters.map((letter, i) => (
                <span
                  key={i}
                  className="text-3xl md:text-[4rem] font-black text-white tracking-[0.05em] letter-in"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  {letter}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}