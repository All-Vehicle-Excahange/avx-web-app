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
    <section className="relative rounded-2xl overflow-hidden  text-primary border border-third/60">
      {/* 🔥 Blur Background (same as aside) */}
      <div
        className="flex justify-between items-center px-6 py-3 text-primary cursor-pointer"
        onClick={() => setOpen((prev) => !prev)}
      >
        <div className="flex items-center gap-2">
          <CheckCircle size={20} />
          <h3 className="text-xl font-semibold">Vehicle Specification</h3>
        </div>
        <div className="text-xl">
          <ChevronDown
            size={20}
            className={`transition-transform duration-300 ${open ? "rotate-180" : "rotate-0"}
              }`}
          />
        </div>
      </div>

      {/* CONTENT */}
      <div
        className={`${open ? "block" : "hidden"} mt-3 pb-6 space-y-6 px-6 transition-all duration-500 ease-in-out`}
      >
        <div className="relative z-10 p-6 space-y-6">
          {/* GRID */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-6 text-sm">
            {/* SECTION TITLE */}
            <div className="md:col-span-3">
              <h4 className="text-sm font-semibold text-third uppercase tracking-wide">
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

            {/* VIEW FULL REPORT BUTTON */}
            <div className="md:col-span-3 flex justify-end pt-2">
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

function Divider() {
  return <div className="md:col-span-3 border border-third/40" />;
}
