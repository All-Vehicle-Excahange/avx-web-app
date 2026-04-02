"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { ArrowLeftRight } from "lucide-react";
import { useRouter } from "next/router";
import { useCompareStore } from "@/stores/useCompareStore";
import VehicleComparePopup from "@/components/ui/VehicleComparePopup";

export default function GlobalCompareButton() {
    const router = useRouter();
    const dragConstraintsRef = useRef(null);
    const { isOpen, closeCompare, openCompare, selectedVehicle } = useCompareStore();

    const isDetailPage = router.pathname.includes("/vehicle/details/");

    return (
        <>
            {/* Draggable Button Wrapper */}
            <div className="fixed inset-x-0 bottom-0 top-16 pointer-events-none z-[2000]" ref={dragConstraintsRef}>
                <motion.button
                    drag
                    dragConstraints={dragConstraintsRef}
                    dragElastic={0.05}
                    dragMomentum={false}
                    onClick={() => openCompare(isDetailPage)}
                    className="absolute right-4 bottom-32 sm:right-6 lg:bottom-24 bg-fourth text-primary p-3 sm:p-4 rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.5)] cursor-grab active:cursor-grabbing hover:bg-fourth/90 border border-primary/20 flex flex-col items-center justify-center gap-1 w-14 h-14 transition-colors pointer-events-auto"
                    whileTap={{ scale: 0.95 }}
                    title="Compare Vehicles (Drag me!)"
                >
                    <ArrowLeftRight size={24} />
                </motion.button>
            </div>

            {/* Global Popup */}
            <VehicleComparePopup
                isOpen={isOpen}
                onClose={closeCompare}
                selectedVehicle={selectedVehicle}
            />
        </>
    );
}
