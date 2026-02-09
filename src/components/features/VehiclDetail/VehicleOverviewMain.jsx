"use client";

import Item from "@/components/ui/Item";
import {
  Calendar,
  Fuel,
  Gauge,
  Settings,
  MapPin,
  Users,
  ShieldX,
  Key,
  BadgeCheck,
  FileText,
  Receipt,
  Truck,
  ShieldCheck,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { FileDoc, CarProfile } from "@phosphor-icons/react";
export default function VehicleOverview({ vehicle }) {
  return (
    <section className="relative rounded-2xl overflow-hidden  text-primary border border-third/60">
      {/* 🔥 Blur Background (same as aside) */}

      {/* CONTENT */}
      <div className="relative z-10 p-6 space-y-6">
        {/* HEADER */}
        <h3 className="text-xl font-semibold">Vehicle Overview</h3>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-6 text-sm">
          {/* ROW 1 */}
          <Item
            icon={<Calendar />}
            label="Reg. year"
            value={vehicle?.regYear || "Mar 2018"}
          />

          <Item
            icon={<BadgeCheck />}
            label="Reg number"
            value={vehicle?.regNumber || "GJ08BH6585"}
          />

          <Item
            icon={<MapPin />}
            label="Registered State"
            value={vehicle?.registeredState || "Gujarat"}
          />

          <Divider />

          {/* ROW 2 */}

          <Item
            icon={<Gauge />}
            label="KM driven"
            value={`${vehicle?.kmsDriven || "25,125"} km`}
          />

          <Item
            icon={<Users />}
            label="Ownership"
            value={vehicle?.ownership || "1st"}
          />
          <Item
            icon={<Settings />}
            label="Transmission"
            value={vehicle?.transmission || "Manual"}
          />

          <Divider />

          {/* ROW 3 */}
          <Item
            icon={
              vehicle?.insuranceStatus === "Active" ? (
                <ShieldCheck />
              ) : (
                <ShieldX />
              )
            }
            label="Insurance Status"
            value={vehicle?.insuranceStatus || "Expired"}
          />
          <Item
            icon={<FileText />}
            label="Insurance Type"
            value={vehicle?.insuranceType || "Third Party"}
          />

          <Item
            icon={
              vehicle?.challanStatus === "Clear" ? (
                <CheckCircle />
              ) : (
                <AlertCircle />
              )
            }
            label="Challan Status"
            value={vehicle?.challanStatus || "Clear"}
          />
          <Divider />

          {/* ROW 4 */}

          <Item
            icon={<Key />}
            label="Spare key"
            value={vehicle?.spareKey || "NO"}
          />

          <Item
            icon={<Fuel />}
            label="Fuel"
            value={vehicle?.fuelType || "Petrol"}
          />
          <Item
            icon={<Truck />}
            label="Commercial Vehicle"
            value={vehicle?.isCommercial ? "Yes" : "No"}
          />
        </div>
      </div>
    </section>
  );
}

function Divider() {
  return <div className="md:col-span-3 border border-third/40" />;
}
