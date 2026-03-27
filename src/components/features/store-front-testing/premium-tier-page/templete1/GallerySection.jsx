"use client";

import { useState, useEffect, useRef, useCallback } from "react";

function GallerySection() {
  const galleryImages = [
    "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?q=80&w=1200&auto=format&fit=crop",
  ];

  const n = galleryImages.length;
  const [active, setActive] = useState(0);
  const animating = useRef(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const timerRef = useRef(null);

  const mod = (v, m) => ((v % m) + m) % m;

  const goTo = useCallback((idx) => {
    if (animating.current) return;
    animating.current = true;
    setActive(mod(idx, n));
    setTimeout(() => { animating.current = false; }, 650);
  }, [n]);

  const next = useCallback(() => goTo(active + 1), [active, goTo]);
  const prev = useCallback(() => goTo(active - 1), [active, goTo]);

  // AUTO SLIDE
  useEffect(() => {
    timerRef.current = setInterval(next, 2500);
    return () => clearInterval(timerRef.current);
  }, [next]);

  // TOUCH SWIPE
  const handleTouchStart = (e) => { touchStartX.current = e.targetTouches[0].clientX; };
  const handleTouchMove = (e) => { touchEndX.current = e.targetTouches[0].clientX; };
  const handleTouchEnd = () => {
    const dist = touchStartX.current - touchEndX.current;
    if (dist > 50) next();
    else if (dist < -50) prev();
  };

  const getPosition = (i) => {
    const diff = mod(i - active, n);
    if (diff === 0) return "center";
    if (diff === 1) return "right";
    if (diff === n - 1) return "left";
    return diff < n / 2 ? "hidden-right" : "hidden-left";
  };

  const positionStyles = {
    center: "w-[60%] h-[300px] sm:h-[380px] md:h-[420px] left-1/2 -translate-x-1/2 opacity-100 scale-100 z-30 cursor-default",
    left:   "hidden md:block w-[25%] h-[260px] left-0 translate-x-0 opacity-40 scale-95 z-20 cursor-pointer",
    right:  "hidden md:block w-[25%] h-[260px] right-0 translate-x-0 opacity-40 scale-95 z-20 cursor-pointer",
    "hidden-left":  "w-[25%] h-[260px] left-0 -translate-x-full opacity-0 scale-90 z-10",
    "hidden-right": "w-[25%] h-[260px] right-0 translate-x-full opacity-0 scale-90 z-10",
  };

  return (
    <section className="w-full py-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 flex flex-col gap-12">

        {/* HEADER */}
        <div className="flex flex-col gap-4 max-w-2xl">
          <p className="text-sm tracking-[0.4em] uppercase text-third font-semibold">Gallery</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.05] text-primary font-[Montserrat]">
            Our Showroom & <span className="text-fourth/80">Team</span>
          </h2>
        </div>

        {/* STAGE */}
        <div
          className="relative flex items-center justify-center h-[300px] sm:h-[380px] md:h-[420px]"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseEnter={() => clearInterval(timerRef.current)}
          onMouseLeave={() => { timerRef.current = setInterval(next, 2500); }}
        >
          {galleryImages.map((src, i) => {
            const pos = getPosition(i);
            return (
              <div
                key={i}
                onClick={() => {
                  if (pos === "right") next();
                  else if (pos === "left") prev();
                }}
                className={`absolute rounded-2xl overflow-hidden shadow-2xl transition-all duration-600 ease-in-out will-change-transform ${positionStyles[pos]}`}
              >
                <img src={src} className="w-full h-full object-cover" />
              </div>
            );
          })}
        </div>

        {/* DOTS */}
        <div className="flex justify-center gap-3">
          {galleryImages.map((_, i) => (
            <div
              key={i}
              onClick={() => goTo(i)}
              className={`w-2.5 h-2.5 rounded-full cursor-pointer transition-all duration-500 ${
                active === i ? "bg-primary scale-125" : "bg-primary/30"
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}

export default GallerySection;  