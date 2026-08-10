"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, animate } from "framer-motion";
import { ArrowLeftRight } from "lucide-react";
import { useRouter } from "next/router";
import { useCompareStore } from "@/stores/useCompareStore";
import VehicleComparePopup from "@/components/ui/VehicleComparePopup";
import { useUIStore } from "@/stores/useUIStore";

const BTN = 56; // 14 * 4 = 56px (w-14 h-14)
const MARGIN_X = 16;
const MARGIN_TOP = 90;
const MARGIN_BOTTOM = 90;

export default function GlobalCompareButton() {
  const router = useRouter();
  const { isOpen, closeCompare, openCompare, selectedVehicle } =
    useCompareStore();
  const { isSearchDropdownOpen } = useUIStore();

  const isDetailPage = router.pathname.includes("/vehicle/details/");

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Track which corner the button is resting at
  // 0 = bottom-left (default), 1 = bottom-right, 2 = top-right, 3 = top-left
  const [corner, setCorner] = useState(0);

  const snapToNearestCorner = () => {
    const W = window.innerWidth;
    const H = window.innerHeight;

    // Base position is right: MARGIN_X, bottom: MARGIN_BOTTOM
    // x = 0 is right. Negative x moves left.
    const targetX_Right = 0;
    const targetX_Left = -(W - (MARGIN_X * 2) - BTN);
    
    // y = 0 is bottom. Negative y moves up.
    const targetY_Bottom = 0;
    const targetY_Top = -(H - MARGIN_TOP - MARGIN_BOTTOM - BTN);

    const currentX = x.get();
    const currentY = y.get();

    const corners = [
      { x: targetX_Left, y: targetY_Bottom, id: 0 }, // bottom-left
      { x: targetX_Right, y: targetY_Bottom, id: 1 }, // bottom-right
      { x: targetX_Right, y: targetY_Top, id: 2 }, // top-right
      { x: targetX_Left, y: targetY_Top, id: 3 }, // top-left
    ];

    let nearest = corners[0];
    let minDist = Infinity;
    for (const c of corners) {
      const d = Math.hypot(currentX - c.x, currentY - c.y);
      if (d < minDist) { minDist = d; nearest = c; }
    }

    animate(x, nearest.x, { type: "spring", stiffness: 400, damping: 30 });
    animate(y, nearest.y, { type: "spring", stiffness: 400, damping: 30 });
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
            right: MARGIN_X,
            bottom: MARGIN_BOTTOM,
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
