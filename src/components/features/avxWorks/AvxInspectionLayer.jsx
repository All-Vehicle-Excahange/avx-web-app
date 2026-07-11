"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  Settings,
  Layers,
  Zap,
  Paintbrush,
  ShieldCheck,
  CheckCircle,
  AlertCircle,
  Wrench,
  ScanLine,
  Car,
  CircleDashed,
  Activity,
  Search,
} from "lucide-react";

const ITEMS = [
  {
    id: "engine",
    title: "Engine & Powertrain",
    desc: "Complete evaluation of engine health, transmission shifts, and powertrain performance.",
    icon: Settings,
    image: "/How-recomm-work/engine & powertrain final.png",
  },
  {
    id: "mechanical",
    title: "Mechanical Components",
    desc: "Thorough inspection of suspension, brakes, steering, and underbody mechanics.",
    icon: Wrench,
    image: "/How-recomm-work/Mechanical Components final.png",
  },
  {
    id: "exterior",
    title: "Exterior Panel Inspection",
    desc: "Analysis of paint quality, body gaps, and identification of any replaced panels.",
    icon: ScanLine,
    image: "/How-recomm-work/Exterior Panel Inspection.png",
  },
  {
    id: "glass",
    title: "Glass & Exterior Electronics",
    desc: "Checking all windows, mirrors, lighting systems, and exterior sensors.",
    icon: Zap,
    image: "/How-recomm-work/Glass & Exterior Electronics.png",
  },
  {
    id: "interior",
    title: "Interior & Cabin",
    desc: "Assessment of upholstery, cabin electronics, air conditioning, and overall wear.",
    icon: Car,
    image: "/How-recomm-work/Interior & Cabin.png",
  },
  {
    id: "structural",
    title: "Structural History",
    desc: "Frame alignment, load paths, and impact indicators to verify chassis integrity.",
    icon: ShieldCheck,
    image: "/How-recomm-work/Structural History  Final.png",
  },
  {
    id: "tyres",
    title: "Tyres",
    desc: "Tread depth measurement, wear patterns, and wheel alloy inspection.",
    icon: CircleDashed,
    image: "/How-recomm-work/typers final.png",
  },
  {
    id: "obd",
    title: "OBD Diagnostics",
    desc: "Computerized scan for hidden fault codes, sensor data, and emission readiness.",
    icon: Activity,
    image: "/How-recomm-work/OBD Diagnostics.png",
  },
  {
    id: "modification",
    title: "Modification Check",
    desc: "Identifying aftermarket modifications and ensuring they meet safety standards.",
    icon: Search,
    image: "/How-recomm-work/Modification Check.png",
  },
];

export default function AvxInspectionLayer() {
  const [active, setActive] = useState(ITEMS[0]);

  return (
    <section>
      <div className="mx-auto w-full ">
        {/* HEADER */}
        <div className="max-w-4xl mb-14">
          <p className="text-sm tracking-[0.4em] uppercase text-third font-semibold">
            Reecomm Inspection Layer
          </p>

          <h2 className="mt-6 text-5xl xl:text-6xl font-medium leading-tight">
            Independent inspection,
            <span className="block text-fourth">visible before decisions</span>
          </h2>

          <p className="mt-6 text-xl leading-relaxed text-third">
            Reecomm enables buyers to request an independent third-party
            inspection of any vehicle — before negotiations begin, before money
            moves. You see the real condition of the vehicle, not just the
            seller&apos;s version of it.
          </p>
          {/* <div className="mt-6">
            <Link
              href="/inspections"
              className="inline-flex items-center text-fourth hover:underline font-semibold tracking-wide"
            >
              → Learn how inspections work
            </Link>
          </div> */}
        </div>

        {/* KEY PRINCIPLES — THIS WAS MISSING */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-10">
          <SignalPoint
            index="01"
            title="Inspection by Design"
            desc="Every vehicle listing on Reecomm supports an inspection request. Buyers initiate the process directly from the listing — no follow-up required."
          />
          <SignalPoint
            index="02"
            title="Deep Condition Coverage"
            desc="Inspections cover engine health, body condition, service history, odometer verification, and known defect disclosure — documented in a structured report."
          />
          <SignalPoint
            index="03"
            title="Visible Before Contact"
            desc="The inspection report is shared before the buyer speaks to the consultant. You enter every conversation informed."
          />
        </div>

        {/* SYSTEM */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* STEPS LIST */}
          <div className="lg:col-span-5 flex flex-col gap-3 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
            {ITEMS.map((item, index) => {
              const isActive = active.id === item.id;
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActive(item)}
                  className={`text-left p-5 rounded-2xl border transition-all duration-300 group flex items-start gap-4 ${
                    isActive
                      ? "border-fourth bg-fourth/5"
                      : "border-primary/10 hover:border-primary/20 hover:bg-primary/5"
                  }`}
                >
                  <div
                    className={`shrink-0 w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-300 ${
                      isActive
                        ? "bg-fourth text-black"
                        : "bg-primary/5 text-third group-hover:text-primary"
                    }`}
                  >
                    <Icon size={20} />
                  </div>
                  <div>
                    <h4
                      className={`font-semibold text-lg transition-colors duration-300 ${
                        isActive ? "text-fourth" : "text-primary"
                      }`}
                    >
                      {item.title}
                    </h4>
                    {isActive && (
                      <p className="text-sm text-third mt-1 leading-relaxed animate-in fade-in slide-in-from-top-1">
                        {item.desc}
                      </p>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* CONTEXT PANEL & IMAGE */}
          <div className="lg:col-span-7 sticky top-24">
            <div className="relative rounded-3xl overflow-hidden border border-primary/20 aspect-video lg:aspect-auto lg:h-[600px]">
              {/* IMAGE */}
              <Image
                src={active.image}
                alt={active.title}
                width={800}
                height={500}
                className="w-full h-full object-cover scale-105"
              />

              {/* DARK OVERLAY */}

              {/* OVERLAY CONTENT */}
              <div className="absolute bottom-0 left-0 w-full p-8 lg:p-12">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-fourth/20 border border-fourth/30 text-fourth text-xs uppercase tracking-widest font-semibold mb-4 backdrop-blur-md">
                  <CheckCircle size={14} /> Step{" "}
                  {ITEMS.findIndex((i) => i.id === active.id) + 1} of{" "}
                  {ITEMS.length}
                </div>
                <h3 className="text-3xl lg:text-4xl font-bold text-white mb-3 shadow-black/50 drop-shadow-md">
                  {active.title}
                </h3>
                <p className="text-lg text-white/90 max-w-xl leading-relaxed shadow-black/50 drop-shadow-md">
                  {active.desc}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* KEY POINT COMPONENT */
function KeyPoint({ title, desc }) {
  return (
    <div>
      <h4 className="text-lg font-semibold text-primary mb-2">{title}</h4>
      <p className="text-third leading-relaxed">{desc}</p>
    </div>
  );
}

function SignalPoint({ index, title, desc }) {
  return (
    <div
      className="
        group relative overflow-hidden
        rounded-2xl
        p-8
        transition-all duration-300 ease-out
        border-2 border-third/10  hover:border-third/5 hover:shadow-[0_10px_40px_-10px_rgba(230,230,230,0.15)]    "
    >
      {/* GHOST INDEX */}
      <span
        className="
          pointer-events-none
          absolute top-0 right-6
          text-[72px]
          font-semibold
          tracking-tight
          text-neutral-100/30
          transition-colors duration-300
          group-hover:text-fourth/20
        "
      >
        {index}
      </span>

      {/* CONTENT */}
      <h4
        className="
          relative z-10
          text-xl font-semibold text-primary mb-3
          transition-colors duration-300
          group-hover:text-fourth
        "
      >
        {title}
      </h4>

      <p
        className="
          relative z-10
          text-third leading-relaxed max-w-sm
        "
      >
        {desc}
      </p>
    </div>
  );
}
