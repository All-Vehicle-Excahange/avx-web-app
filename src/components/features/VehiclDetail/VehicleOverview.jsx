"use client";

import Item from "@/components/ui/Item";
import {
  Calendar,
  Fuel,
  Gauge,
  GitFork,
  Cpu,
  User,
  Key,
  Hash,
  ArrowUpDown,
  Briefcase,
  CheckCircle,
  ChevronDown,
  Zap,
  RotateCw,
  Settings,
  ArrowLeftRight,
  Scale,
  Users,
  Droplet,
  MoveHorizontal,
  ShieldCheck,
  Shield,
  TrendingUp,
  Wind,
  Sun,
  Armchair,
  Smartphone,
  Camera,
  Radar,
  ActivityIcon,
} from "lucide-react";
import Activity from "../consult/details/dashboard/components/Activity";
import Button from "@/components/ui/button";
import { useState } from "react";
import SpecificationPopup from "./SpecificationPopup";

export default function VehicleOverview({ vehicle, open, setOpen }) {
  const [openSpec, setOpenSpec] = useState(false);

  return (
      <section className="relative rounded-2xl overflow-hidden text-primary border border-third/60">
        {/* 🔥 Blur Background (same as aside) */}
        {/* Adjusted padding to px-4 on mobile and px-6 on md screens */}
        <div
            className="flex justify-between items-center px-4 md:px-6 py-3 text-primary cursor-pointer"
            onClick={() => setOpen((prev) => !prev)}
        >
          <div className="flex items-center gap-2">
            <CheckCircle size={20} className="w-4 h-4 md:w-5 md:h-5" />
            <h3 className="text-lg md:text-xl font-semibold">Vehicle Specification</h3>
          </div>
          <div>
            <ChevronDown
                size={20}
                className={`transition-transform duration-300 w-4 h-4 md:w-5 md:h-5 ${open ? "rotate-180" : "rotate-0"}
              }`}
            />
          </div>
        </div>

        {/* CONTENT */}
        {/* Adjusted outer and inner padding to be smaller on mobile */}
        <div
            className={`${open ? "block" : "hidden"} mt-3 pb-4 md:pb-6 space-y-4 md:space-y-6 px-4 md:px-6 transition-all duration-500 ease-in-out`}
        >
          <div className="relative z-10 p-0 sm:p-2 md:p-6 space-y-4 md:space-y-6">
            {/* GRID: Changed to grid-cols-2 for mobile, reduced gaps and text size */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-4 md:gap-x-8 md:gap-y-6 text-xs md:text-sm">

              {/* SECTION TITLE: Added col-span-2 for mobile, md:col-span-3 for desktop */}
              <div className="col-span-2 md:col-span-3">
                <h4 className="text-xs md:text-sm font-semibold text-third uppercase tracking-wide">
                  Engine & Performance
                </h4>
              </div>

              <Item
                  icon={<Cpu />}
                  label="Engine"
                  value={`${vehicle?.engineCapacity || "1956"} cc`}
              />

              <Item
                  icon={<Zap />}
                  label="Power"
                  value={`${vehicle?.power || "170"} bhp`}
              />

              <Item
                  icon={<RotateCw />}
                  label="Torque"
                  value={`${vehicle?.torque || "350"} Nm`}
              />

              <Item
                  icon={<Settings />}
                  label="Transmission"
                  value={vehicle?.transmission || "Manual"}
              />

              <Item
                  icon={<ArrowLeftRight />}
                  label="Drive Type"
                  value={vehicle?.driveType || "FWD"}
              />

              {/* VIEW FULL REPORT BUTTON: Added col-span-2 for mobile, md:col-span-3 for desktop */}
              <div className="col-span-2 md:col-span-3 flex justify-end pt-2">
                <Button
                    onClick={() => setOpenSpec(true)}
                    type="button"
                    showIcon={true}
                    variant="outline"
                >
                  View Full Specification
                </Button>
              </div>
            </div>
          </div>
        </div>
        <SpecificationPopup open={openSpec} onClose={() => setOpenSpec(false)} />
      </section>
  );
}

// Updated the divider just in case you use it here later!
function Divider() {
  return <div className="col-span-2 md:col-span-3 border border-third/40" />;
}