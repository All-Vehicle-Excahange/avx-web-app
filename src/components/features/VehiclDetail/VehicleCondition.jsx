"use client";

import ChipGroup from "@/components/ui/chipGroup";
import { CheckCircle, Wrench, Settings, Disc, ChevronDown } from "lucide-react";

export default function VehicleCondition({ open, setOpen }) {
  return (
    <section className="relative rounded-2xl overflow-hidden text-primary border border-third/60">
      <div className="relative z-10">
        {/* ================= HEADER ================= */}
        <div
          className="flex justify-between items-center px-6 py-3 cursor-pointer"
          onClick={() => setOpen((prev) => !prev)}
        >
          <div className="flex items-center gap-2">
            <CheckCircle size={20} />
            <h3 className="text-xl font-semibold">Car Condition</h3>
          </div>

          <ChevronDown
            size={20}
            className={`transition-transform duration-300 ${
              open ? "rotate-180" : "rotate-0"
            }`}
          />
        </div>

        {/* ================= CONTENT ================= */}
        <div
          className={`${open ? "block" : "hidden"} mt-3 pb-6 space-y-8 px-6`}
        >
          {/* ================= INSPECTION SUMMARY ================= */}
          <div className="space-y-3">
            <p className="text-sm text-third">Based on 200-point inspection</p>

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

          <div className="border-t border-third/30" />

          {/* ================= BLOCK 1 — EXTERIOR SUMMARY ================= */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Exterior Summary</h3>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-x-6 gap-y-2 text-sm">
              <p>
                <span className="text-third">Repainted Panels:</span> Rear Left
                Door
              </p>
              <p>
                <span className="text-third">Dent Severity:</span> Minor
              </p>
              <p>
                <span className="text-third">Scratch Severity:</span> Minor
              </p>
              <p>
                <span className="text-third">Rust:</span> None
              </p>
            </div>
          </div>

          <div className="border-t border-third/30" />

          {/* ================= BLOCK 2 — MECHANICAL HEALTH ================= */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Mechanical Health</h3>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-y-2 text-sm">
              <p>
                <span className="text-third">Engine Condition:</span> Good
              </p>
              <p>
                <span className="text-third">Gearbox:</span> Smooth
              </p>
              <p>
                <span className="text-third">Clutch Life:</span> 70%
              </p>
              <p>
                <span className="text-third">Suspension:</span> Good
              </p>
              <p>
                <span className="text-third">Steering:</span> Good
              </p>
            </div>
          </div>

          <div className="border-t border-third/30" />

          {/* ================= BLOCK 3 — CONSUMABLES ================= */}
          <div className="space-y-4 text-sm">
            {/* ===== TYRE LIFE ===== */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Disc size={18} />
                <h3 className="text-lg font-semibold">Tyre Life Remaining</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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
            </div>

            {/* ===== CONSUMABLE SUMMARY (MATCH WIDTH) ===== */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <p className="text-third">Brake Pads</p>
                <p className="font-semibold">60%</p>
              </div>

              <div>
                <p className="text-third">Battery Age</p>
                <p className="font-semibold">18 months</p>
              </div>

              {/* Empty cell to preserve alignment */}
              <div />
            </div>
          </div>

          <div className="border-t border-third/30" />

          {/* ================= BLOCK 4 — MODIFICATIONS ================= */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Modifications</h3>

            <div className="text-sm space-y-1">
              <p>
                <span className="text-third">Modifications Detected:</span> No
              </p>

              {/* If YES, replace above with list */}
              {/*
              <ul className="list-disc ml-5">
                <li>Aftermarket Exhaust</li>
                <li>Non-OEM Alloy Wheels</li>
              </ul>
              */}
            </div>
          </div>

          <div className="border-t border-third/30" />

          {/* ================= BLOCK 5 — FIXES DONE ================= */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Wrench size={18} />
              <h3 className="text-lg font-semibold">Fixes Done</h3>
            </div>

            <div className="text-sm space-y-1">
              <p>
                <span className="text-third">Repaired & Repainted:</span> Rear
                door
              </p>
              <p>
                <span className="text-third">Parts Replaced:</span> Battery
                (2024)
              </p>
            </div>
          </div>

          <div className="border-t border-third/30" />

          {/* ================= TIRE LIFE ================= */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Disc size={18} />
              <h3 className="text-lg font-semibold">Tyre Life Remaining</h3>
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
