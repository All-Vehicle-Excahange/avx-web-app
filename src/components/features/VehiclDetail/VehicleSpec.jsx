"use client";
import { useState } from "react";
import FeatureGroup from "@/components/ui/FeatureGroup";
import Item from "@/components/ui/Item";
import { Gauge, ArrowUpDown, Briefcase, Cpu, ChevronDown } from "lucide-react";
import Button from "@/components/ui/button";

export default function VehicleSpec({ vehicle }) {
  const [open, setOpen] = useState(true);
  return (
    <section className="relative rounded-2xl overflow-hidden bg-secondary/90 text-primary border border-third/60">
      {/* <div className="absolute inset-0 bg-[url('/bg_blur.jpg')] bg-cover bg-center opacity-40 blur-lg z-0" /> */}

      <div className="relative z-10">

        <div className="flex justify-between items-center px-6 py-3 text-primary cursor-pointer" onClick={() => setOpen((prev) => !prev)}>
          <h3 className="text-xl font-semibold">Vehicle Inspection</h3>
          <div className="text-xl">
            <ChevronDown size={20} className={`transition-transform duration-300 ${open ? "rotate-180" : "rotate-0"
              }`} />
          </div>
        </div>
        <div className={`${open ? "block" : "hidden"} mt-8 space-y-8 transition-all duration-500 ease-in-out`}>

          {/* ================= AVX INSPECTION REPORT ================= */}
          <div className="space-y-6 px-6 pb-6">
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
            <div className="flex justify-end">
              <Button variant="outline" showIcon={true}>
                Request For Inspection
              </Button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
