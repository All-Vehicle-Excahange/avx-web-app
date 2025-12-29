"use client";
import { useEffect, useState } from "react";
import Navbar from "@/components/layout/Navbar";

export default function StickyHeroNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = expanded ? "hidden" : "auto";
  }, [expanded]);

  return (
    <>
      <div className="fixed top-0 inset-x-0 z-[1000]">
        <Navbar
          heroMode
          scrolled={scrolled}
          expanded={expanded}
          setExpanded={setExpanded}
        />
      </div>

      {expanded && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[999]" />
      )}
    </>
  );
}
