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
} from "lucide-react";

const ITEMS = [
  {
    id: "engine",
    title: "Engine & drivetrain",
    desc: "Mechanical performance and drivetrain health.",
    icon: Settings,
    angle: 0,
  },
  {
    id: "structure",
    title: "Structural integrity",
    desc: "Frame alignment, load paths, and impact indicators.",
    icon: Layers,
    angle: 72,
  },
  {
    id: "electrical",
    title: "Electrical systems",
    desc: "Sensors, electronics, wiring, and battery health.",
    icon: Zap,
    angle: 144,
  },
  {
    id: "cosmetic",
    title: "Cosmetic condition",
    desc: "Exterior panels, paint quality, and interior wear.",
    icon: Paintbrush,
    angle: 216,
  },
  {
    id: "verification",
    title: "Flood & odometer",
    desc: "Water exposure signals and mileage consistency checks.",
    icon: ShieldCheck,
    angle: 288,
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
            Reecomm enables buyers to request an independent third-party inspection of any vehicle — before negotiations begin, before money moves. You see the real condition of the vehicle, not just the seller&apos;s version of it.
          </p>
          <div className="mt-6">
            <Link
              href="/inspections"
              className="inline-flex items-center text-fourth hover:underline font-semibold tracking-wide"
            >
              → Learn how inspections work
            </Link>
          </div>
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-center">
          {/* RADIAL SYSTEM */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="relative h-105 w-105">
              {/* CORE */}
              <div className="absolute inset-24 rounded-full overflow-hidden border border-neutral-700">
                {/* IMAGE */}
                <Image
                  src="/car-inspection.avif"
                  alt="Inspection Core"
                  width={800}
                  height={500}
                  className="w-full h-full object-cover scale-105"
                />

                {/* DARK OVERLAY */}
                <div className="absolute inset-0 bg-black/20" />
              </div>

              {/* NODES */}
              {ITEMS.map((item) => {
                const Icon = item.icon;
                const isActive = active.id === item.id;

                return (
                  <button
                    key={item.id}
                    onMouseEnter={() => setActive(item)}
                    onClick={() => setActive(item)}
                    className={`absolute top-1/2 left-1/2
                      h-14 w-14 rounded-full
                      flex items-center justify-center
                      transition-all duration-300 ease-out
                      ${
                        isActive
                          ? "bg-fourth text-black scale-110"
                          : "bg-transparent text-third border border-neutral-700 hover:scale-105"
                      }`}
                    style={{
                      transform: `
                        rotate(${item.angle}deg)
                        translate(${isActive ? 188 : 176}px)
                        rotate(-${item.angle}deg)
                        translate(-50%, -50%)
                      `,
                    }}
                  >
                    <Icon size={20} />
                  </button>
                );
              })}
            </div>
          </div>

          {/* CONTEXT PANEL */}
          <div className="lg:col-span-6">
            <div
              className="rounded-3xl border border-primary/20 
              p-10 flex flex-col"
            >
              <p className="text-xs tracking-widest uppercase text-neutral-500 mb-2">
                Inspection focus
              </p>

              <h3 className="text-2xl font-semibold text-fourth mb-4">
                {active.title}
              </h3>

              <p className="text-lg leading-relaxed text-third max-w-xl">
                {active.desc}
              </p>

              <div className="my-6 h-px w-full bg-neutral-800/60" />

              <div className="flex items-center gap-3">
                {active.id === "verification" ? (
                  <>
                    <AlertCircle size={18} className="text-neutral-500" />
                    <span className="text-sm text-third">
                      Inspection available on request
                    </span>
                  </>
                ) : (
                  <>
                    <CheckCircle size={18} className="text-fourth" />
                    <span className="text-sm text-fourth">
                      Inspection summary visible on listing
                    </span>
                  </>
                )}
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
          absolute top-6 right-6
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
