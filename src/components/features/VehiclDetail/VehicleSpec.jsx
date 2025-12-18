"use client";

import Button from "@/components/ui/button";
import FeatureGroup from "@/components/ui/FeatureGroup";
import Item from "@/components/ui/Item";
import { Gauge, ArrowUpDown, Briefcase, Cpu, Check } from "lucide-react";

export default function VehicleSpec({ vehicle }) {
  return (
    <section className="relative rounded-2xl overflow-hidden bg-secondary/90 text-primary border border-third/60">
      {/* <div className="absolute inset-0 bg-[url('/bg_blur.jpg')] bg-cover bg-center opacity-40 blur-lg z-0" /> */}

      <div className="relative z-10 p-6 space-y-8">
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Vehicle Specifications</h3>

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

        <div className="md:col-span-3 border-t border border-third/40" />

        {/* ================= AVX INSPECTION REPORT ================= */}
        <div className="space-y-6">
          <h3 className="text-xl font-semibold">AVX Inspection Report</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
            <FeatureGroup title="SAFETY" items={["Side airbags", "Airbags"]} />

            <FeatureGroup
              title="COMFORT & CONVENIENCE"
              items={[
                "Puddle lamp",
                "Cruise control",
                "Ventilated seats",
                "Keyless start",
                "Wireless phone charging",
              ]}
            />

            <FeatureGroup title="EXTERIOR" items={["Sunroof"]} />
          </div>

          {/* BUTTON */}
          <div className="flex justify-end">
            <Button variant="outline" showIcon={true}>
              View All Features
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
