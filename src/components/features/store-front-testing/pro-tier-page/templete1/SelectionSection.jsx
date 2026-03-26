"use client";

import { useEffect, useRef } from "react";

function SelectionSection() {
  const scrollRef = useRef(null);

  const selectionData = {
    selectionTitle: "Our Approach to Vehicle Selection",
    selectionDescription: `
      Every vehicle listed through our storefront goes through a basic
      internal evaluation before being presented to buyers. This helps
      ensure that vehicles listed are suitable for serious buyers and
      provides a smoother vehicle buying experience.
    `,
    selectionImages: [
      "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?q=80&w=1200",
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=1200",
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200",
      "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=1200",
      "https://images.unsplash.com/photo-1583267746897-2cf415887172?q=80&w=1200",
    ],
  };

  // 🔥 AUTO SCROLL LOGIC
  useEffect(() => {
    const container = scrollRef.current;
    let scrollAmount = 0;

    const scroll = () => {
      if (!container) return;

      scrollAmount += 1; // speed control

      container.scrollLeft = scrollAmount;

      // loop back smoothly
      if (scrollAmount >= container.scrollWidth / 2) {
        scrollAmount = 0;
      }

      requestAnimationFrame(scroll);
    };

    scroll();
  }, []);

  return (
    <section className="w-full py-12">
      <div className="max-w-7xl   sm:px-6 flex flex-col gap-10">

        {/* ── HEADER ───────────────── */}
        <p className="text-sm tracking-[0.4em] uppercase text-third font-semibold">
          Our Standards
        </p>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.05] text-primary font-[Montserrat]">
          Our Approach to{" "}
          <span className="text-fourth/80">Vehicle Selection</span>
        </h2>

        {/* ── CONTENT GRID ───────────────── */}
        <div className="grid md:grid-cols-2 gap-10 items-center">

          {/* LEFT TEXT */}
          <div className="flex flex-col gap-4 border-l-2 border-primary/40 pl-5">
            {selectionData.selectionDescription
              .trim()
              .split("\n\n")
              .map((para, i) => (
                <p
                  key={i}
                  className="text-third text-lg font-[Poppins] leading-relaxed"
                >
                  {para.trim()}
                </p>
              ))}
          </div>

          {/* RIGHT IMAGES (AUTO SCROLL) */}
          <div
            ref={scrollRef}
            className="flex gap-3 overflow-x-scroll no-scrollbar"
          >
            {[...selectionData.selectionImages, ...selectionData.selectionImages].map((img, i) => (
              <div
                key={i}
                className="min-w-[180px] h-[220px] overflow-hidden rounded-lg border border-third/10 shrink-0"
              >
                <img
                  src={img}
                  alt="selection"
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>

        </div>

      </div>

      {/* ── HIDE SCROLLBAR STYLE ───────────────── */}
    

    </section>
  );
}

export default SelectionSection;