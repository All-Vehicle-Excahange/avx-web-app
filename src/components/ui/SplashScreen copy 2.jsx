import { useEffect, useState } from "react";
import Image from "next/image";

export default function SplashScreen({ onComplete }) {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStage(1), 700),   // logo center done → move left
      setTimeout(() => setStage(2), 1200),  // show text
      setTimeout(() => setStage(3), 2200),  // exit text
      setTimeout(() => onComplete(), 3000),
    ];

    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  const letters = "REECOMM".split("");

  return (
    <>
      <style>{`
        @keyframes logo-drop {
          0% { transform: translateY(-60vh); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }

        @keyframes logo-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-120px); }
        }

        @media (min-width: 768px) {
          @keyframes logo-left {
            100% { transform: translateX(-180px); }
          }
        }

        @keyframes letter-in {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        @keyframes letter-out {
          0% { opacity: 1; transform: translateY(0); }
          100% { opacity: 0; transform: translateY(-80px); }
        }

        .logo-drop {
          animation: logo-drop 0.7s ease-out forwards;
        }

        .logo-left {
          animation: logo-left 0.5s ease-in-out forwards;
        }

        .letter-in {
          opacity: 0;
          animation: letter-in 0.4s ease-out forwards;
        }

        .letter-out {
          animation: letter-out 0.4s ease-in forwards;
        }
      `}</style>

      <div className="fixed inset-0 z-[9999] bg-black flex items-center justify-center overflow-hidden">
        <div className="flex items-center justify-center gap-3 md:gap-6">

          {/* LOGO */}
          <div
            className={`relative w-[100px] h-[100px] md:w-[160px] md:h-[160px]
        ${stage === 0 ? "logo-drop" : ""}
        ${stage === 1 ? "logo-left" : ""}
        ${stage === 3 ? "letter-out" : ""}
      `}
          >
            <Image
              src="/logo/animate-logo.png"
              alt="logo"
              fill
              className="object-contain"
              priority
            />
          </div>

          {/* TEXT (NOW NEXT TO LOGO, NOT CENTER ABSOLUTE) */}
          {stage >= 2 && (
            <div className="flex items-center">
              {letters.map((letter, i) => {
                const delay =
                  stage === 2
                    ? `${i * 0.1}s`
                    : `${i * 0.08}s`;

                return (
                  <span
                    key={i}
                    className={`text-3xl md:text-[4rem] font-black text-white tracking-[0.05em]
                ${stage === 2 ? "letter-in" : ""}
                ${stage === 3 ? "letter-out" : ""}
              `}
                    style={{ animationDelay: delay }}
                  >
                    {letter}
                  </span>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
}