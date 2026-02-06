"use client";
import { useState } from "react";
import ChipGroup from "@/components/ui/chipGroup";
import { CheckCircle, Wrench, Settings, Disc, ChevronDown } from "lucide-react";

export default function VehicleCondition({ open, setOpen }) {
  return (
    <section className="relative rounded-2xl overflow-hidden  text-primary border border-third/60">
      {/* 🔥 Blur background */}
      {/* <div className="absolute inset-0 bg-[url('/bg_blur.jpg')] bg-cover bg-center opacity-40 blur-lg z-0" /> */}

      <div className="relative z-10">
        {/* ================= CAR CONDITION ================= */}
        <div className="flex justify-between items-center px-6 py-3 text-primary cursor-pointer" onClick={() => setOpen((prev) => !prev)}>
          <div className="flex items-center gap-2">
            <CheckCircle size={20} />
            <h3 className="text-xl font-semibold">Car condition</h3>
          </div>
          <div className="text-xl">
            <ChevronDown size={20} className={`transition-transform duration-300 ${open ? "rotate-180" : "rotate-0"}
              }`} />
          </div>
        </div>

        <div className={`${open ? "block" : "hidden"} mt-3 pb-6 space-y-6 px-6 transition-all duration-500 ease-in-out`}>



          <div>
            <p className="text-sm text-third">Based on 200 points inspection</p>

            <ChipGroup
              title=""
              variant="outline"
              items={[
                { label: "Core structure intact", value: "core" },
                { label: "Non-tampered odometer", value: "odo" },
                { label: "Non flooded", value: "flood" },
                { label: "Engine", value: "engine" },
                { label: "Drivetrain", value: "drive" },
                { label: "Body structure", value: "body" },
                { label: "Interior", value: "interior" },
                { label: "Minor scratches", value: "scratches" },
                { label: "Minor dent", value: "dent" },
                { label: "Moisture ingress", value: "moisture" },
              ]}
            />
          </div>

          {/* ================= FIXES DONE ================= */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Wrench size={20} />
              <h3 className="text-lg font-semibold">Fixes done</h3>
            </div>

            <p className="text-sm text-third">
              Quality-driven fixes and upgrades
            </p>

            <ChipGroup
              title=""
              variant="outline"
              allowMultiple={false}
              items={[{ label: "Repaired & repainted", value: "repair" }]}
            />
          </div>

          {/* ================= CUSTOMIZED ACCESSORIES ================= */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Settings size={20} />
              <h3 className="text-lg font-semibold">Customized accessories</h3>
            </div>

            <p className="text-sm text-third">
              This car comes with additional customized features beyond original
              specifications.
            </p>

            <ChipGroup
              title=""
              variant="outline"
              allowMultiple={false}
              items={[{ label: "Floor carpet", value: "floor" }]}
            />
          </div>

          {/* ================= TIRE LIFE ================= */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Disc size={20} />
              <h3 className="text-lg font-semibold">Tire life remaining</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
              <div>
                <p className="text-third">Front</p>
                <p className="font-semibold">L-85% &nbsp; R-50%</p>
              </div>

              <div>
                <p className="text-third">Rear</p>
                <p className="font-semibold">L-85% &nbsp; R-30%</p>
              </div>

              <div>
                <p className="text-third">Spare</p>
                <p className="font-semibold">85%</p>
              </div>
            </div>

            <p className="text-sm text-green-400">
              Next service due after 12 months or 15,000 km
            </p>

            <p className="text-xs text-third">
              (whichever comes first post delivery)
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
