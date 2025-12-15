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
} from "lucide-react";

export default function VehicleOverview({ vehicle }) {
  return (
    <section className="relative rounded-2xl overflow-hidden bg-secondary/90 text-primary">
      {/* 🔥 Blur Background (same as aside) */}
      <div className="absolute inset-0 bg-[url('/bg_blur.jpg')] bg-cover bg-center opacity-40 blur-lg z-0" />

      {/* CONTENT */}
      <div className="relative z-10 p-6 space-y-6">
        {/* HEADER */}
        <div className="space-y-2">
          <h3 className="text-xl font-semibold">Vehicle overview</h3>
          <p className="text-sm text-third leading-relaxed max-w-5xl">
            Lorem ipsum dolor sit amet consectetur. Elementum enim eget hac
            aliquet eu. Ornare risus habitant etiam urna augue venenatis vel
            sit. Sit auctor adipiscing sollicitudin convallis. Elementum enim
            eget hac aliquet eu. Ornare risus habitant etiam urna augue.
          </p>
        </div>

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
      </div>
    </section>
  );
}

function Divider() {
  return (
    <div className="md:col-span-3 border-t-4 border-dashed border-third/40" />
  );
}
