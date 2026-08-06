"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, animate } from "framer-motion";
import { ArrowLeftRight } from "lucide-react";
import { useRouter } from "next/router";
import { useCompareStore } from "@/stores/useCompareStore";
import VehicleComparePopup from "@/components/ui/VehicleComparePopup";
import { useUIStore } from "@/stores/useUIStore";

// Button size
const BTN = 56; // 14 * 4 = 56px (w-14 h-14)
const MARGIN = 16; // gap from screen edge

export default function GlobalCompareButton() {
  const router = useRouter();
  const { isOpen, closeCompare, openCompare, selectedVehicle } =
    useCompareStore();
  const { isSearchDropdownOpen } = useUIStore();

  const isDetailPage = router.pathname.includes("/vehicle/details/");

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Track which corner the button is resting at (for initial placement)
  // 0 = bottom-left (default), 1 = bottom-right, 2 = top-right, 3 = top-left
  const [corner, setCorner] = useState(0);

  const snapToNearestCorner = () => {
    const W = window.innerWidth;
    const H = window.innerHeight;

    // Current centre of button in viewport coords
    const cx = x.get() + MARGIN + BTN / 2; // default anchor is bottom-left
    const cy = y.get() + H - MARGIN - BTN / 2;

    // Four corner centres
    const corners = [
      { x: MARGIN + BTN / 2,     y: H - MARGIN - BTN / 2, id: 0 }, // bottom-left
      { x: W - MARGIN - BTN / 2, y: H - MARGIN - BTN / 2, id: 1 }, // bottom-right
      { x: W - MARGIN - BTN / 2, y: MARGIN + BTN / 2,     id: 2 }, // top-right
      { x: MARGIN + BTN / 2,     y: MARGIN + BTN / 2,     id: 3 }, // top-left
    ];

    // Find nearest corner
    let nearest = corners[0];
    let minDist = Infinity;
    for (const c of corners) {
      const d = Math.hypot(cx - c.x, cy - c.y);
      if (d < minDist) { minDist = d; nearest = c; }
    }

    // Convert nearest corner to offset relative to bottom-left anchor
    const targetX = nearest.x - (MARGIN + BTN / 2);
    const targetY = nearest.y - (H - MARGIN - BTN / 2);

    animate(x, targetX, { type: "spring", stiffness: 400, damping: 30 });
    animate(y, targetY, { type: "spring", stiffness: 400, damping: 30 });
    setCorner(nearest.id);
  };

  return (
    <>
      {!isSearchDropdownOpen && (
        <motion.button
          drag
          dragMomentum={false}
          dragElastic={0.08}
          style={{
            x,
            y,
            position: "fixed",
            left: MARGIN,
            bottom: MARGIN,
            zIndex: 2000,
          }}
          onDragEnd={snapToNearestCorner}
          onClick={() => openCompare(isDetailPage)}
          className="bg-fourth text-primary p-3 sm:p-4 rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.5)] cursor-grab active:cursor-grabbing hover:bg-fourth/90 border border-primary/20 flex flex-col items-center justify-center gap-1 w-14 h-14 transition-colors"
          whileTap={{ scale: 0.95 }}
          title="Compare Vehicles (Drag me!)"
        >
          <ArrowLeftRight size={24} />
        </motion.button>
      )}

      {/* Global Popup */}
      <VehicleComparePopup
        isOpen={isOpen}
        onClose={closeCompare}
        selectedVehicle={selectedVehicle}
      />
    </>
  );
}
