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
} from "lucide-react";

export default function VehicleOverview({ vehicle }) {
  return (
    <section className="relative rounded-2xl overflow-hidden  text-primary border border-third/60">
      {/* 🔥 Blur Background (same as aside) */}

      {/* CONTENT */}
      <div className="relative z-10 p-6 space-y-6">
        {/* HEADER */}
        <h3 className="text-xl font-semibold">Vehicle Specification</h3>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-6 text-sm">
          {/* ROW 1 */}
          <Item
            icon={<Calendar />}
            label="Reg. year"
            value={vehicle?.regYear || "Mar 2018"}
          />
          <Item
            icon={<Fuel />}
            label="Fuel"
            value={vehicle?.fuelType || "Petrol"}
          />
          <Item
            icon={<Gauge />}
            label="KM driven"
            value={`${vehicle?.kmsDriven || "25,125"} km`}
          />

          <Divider />

          {/* ROW 2 */}
          <Item
            icon={<GitFork />}
            label="Transmission"
            value={vehicle?.transmission || "Manual"}
          />
          <Item
            icon={<Cpu />}
            label="Engine capacity"
            value={vehicle?.engineCapacity || "799cc"}
          />
          <Item
            icon={<User />}
            label="Ownership"
            value={vehicle?.ownership || "1st"}
          />

          <Divider />

          {/* ROW 3 */}
          <Item
            icon={<Calendar />}
            label="Make year"
            value={vehicle?.makeYear || "Mar 2018"}
          />
          <Item
            icon={<Key />}
            label="Spare key"
            value={vehicle?.spareKey || "NO"}
          />
          <Item
            icon={<Hash />}
            label="Reg number"
            value={vehicle?.regNumber || "GJ08BH6585"}
          />
        </div>
        <div className="md:col-span-3 border-t border border-third/40" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-sm">
          <Item
            icon={<Gauge />}
            label="Mileage (ARAI)"
            value={`${vehicle?.mileage || "16.3"} kmpl`}
          />

          <Item
            icon={<ArrowUpDown />}
            label="Ground clearance"
            value={`${vehicle?.groundClearance || "205"} mm`}
          />

          <Item
            icon={<Briefcase />}
            label="Boot space"
            value={`${vehicle?.bootSpace || "425"} liters`}
          />

          <Item
            icon={<Cpu />}
            label="Displacement"
            value={`${vehicle?.displacement || "1956"} cc`}
          />
        </div>
      </div>
    </section>
  );
}

function Divider() {
  return (
    <div className="md:col-span-3 border border-third/40" />
  );
}
