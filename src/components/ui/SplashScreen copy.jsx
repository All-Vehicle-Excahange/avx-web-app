import { useEffect, useState } from "react";
import Image from "next/image";

export default function SplashScreen({ onComplete }) {
  const [isClosing, setIsClosing] = useState(false);
  const [isBgClosing, setIsBgClosing] = useState(false);

  useEffect(() => {
    // Start exit
    const textExitTimer = setTimeout(() => {
      setIsClosing(true);
    }, 1800);

    // Background exit
    const bgExitTimer = setTimeout(() => {
      setIsBgClosing(true);
    }, 2300);

    // Remove splash
    const removeTimer = setTimeout(() => {
      onComplete();
    }, 3000);

    return () => {
      clearTimeout(textExitTimer);
      clearTimeout(bgExitTimer);
      clearTimeout(removeTimer);
    };
  }, [onComplete]);

  // Breakdown the letters to animate them iteratively
  const letters = "Reecomm".split("");

  return (
    <>
      <style>{`
        /* Stage 1 & 2: Ultra smooth drop from top -> Zoom out -> Zoom in -> Settle */
       @keyframes drop-bounce-smooth {
  0% { transform: translateY(-50vh); opacity: 0; }
  40% { transform: translateY(0); opacity: 1; }
  60% { transform: scale(0.9); }
  80% { transform: scale(1.05); }
  100% { transform: scale(1); }
}

@keyframes slide-left-smooth {
  0%, 70% { transform: translateX(0); }
  100% { transform: translateX(-100px); }
}

@media (min-width: 768px) {
  @keyframes slide-left-smooth {
    0%, 70% { transform: translateX(0); }
    100% { transform: translateX(-160px); }
  }
}

@keyframes letter-reveal-smooth {
  0% { opacity: 0; transform: translateY(15px) scale(0.9); }
  100% { opacity: 1; transform: translateY(0) scale(1); }
}

@keyframes item-exit-up {
  0% { transform: translateY(0); opacity: 1; }
  100% { transform: translateY(-60vh); opacity: 0; }
}

.animate-logo {
  animation: drop-bounce-smooth 1.2s ease-in-out forwards;
}

.animate-slide {
  animation: slide-left-smooth 2s ease-in-out forwards;
}

.animate-letter {
  opacity: 0;
  animation: letter-reveal-smooth 0.5s ease-out forwards;
}

.animate-exit-up {
  animation: item-exit-up 0.6s ease-in forwards !important;
}

.curtain-exit {
  transition: transform 0.7s ease-in-out;
}
      `}</style>

      <div
        className={`fixed inset-0 z-10000 bg-black flex flex-col items-center justify-center curtain-exit overflow-hidden ${isBgClosing ? "-translate-y-full pointer-events-none" : "translate-y-0"
          }`}
      >
        <div className="flex flex-col items-center justify-center -mt-16 w-full">
          <div className="relative flex items-center justify-center animate-slide">

            {/* Animated Logo Image */}
            <div
              className={`relative w-[90px] h-[90px] sm:w-[110px] sm:h-[110px] md:w-[180px] md:h-[180px] z-10 ${isClosing ? "animate-exit-up" : "animate-logo"
                }`}
              style={isClosing ? { animationDelay: "0s" } : {}}
            >
              <Image
                src="/logo/animate-logo.png"
                alt="Reecomm Animated Logo"
                fill
                className="object-contain"
                priority
              />
            </div>

            {/* Revealed Text "Reecomm" */}
            <div className="absolute left-full ml-3 md:ml-6 flex items-center pt-1 md:pt-4">
              {letters.map((letter, i) => {
                // If closing: Delay starts at 0.3s (so logo leaves first), then staggering letters.
                // If opening: Delay relies on the 2.8s staggered sequence.
                const delay = isClosing
                  ? `${0.1 + i * 0.08}s`
                  : `${1.0 + i * 0.08}s`;
                return (
                  <span
                    key={i}
                    className={`text-3xl sm:text-4xl md:text-[4rem] font-black text-white hover:text-gray-200 uppercase tracking-[0.05em] inline-block ${isClosing ? "animate-exit-up" : "animate-letter"
                      }`}
                    style={{ animationDelay: delay }}
                  >
                    {letter}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
