"use client";
import { useEffect, useState } from "react";
import Navbar from "@/components/layout/Navbar";

export default function StickyHeroNavbar({ onScrollChange }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const s = window.scrollY > 80;
          setScrolled(s);
          onScrollChange?.(s);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [onScrollChange]);

  return (
    <div className="fixed top-0 inset-x-0 z-[1000]">
      <Navbar heroMode scrolled={scrolled} />
    </div>
  );
}
