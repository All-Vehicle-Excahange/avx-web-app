"use client";

import { CheckCircle, ChevronDown, Disc, FileSearch } from "lucide-react";
import Button from "@/components/ui/button";
import Image from "next/image";

// Score → status label
function scoreStatus(score) {
  if (score >= 90) return "Excellent";
  if (score >= 70) return "Good";
  if (score >= 40) return "Average";
  return "Bad";
}

// Mini score bar card
function ScoreCard({ label, score }) {
  if (score === null || score === undefined) return null;
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-2 text-sm">
        <span className="text-third">{label}</span>
        <span className="font-semibold text-xs text-primary">
          {scoreStatus(score)}
        </span>
      </div>
    </div>
  );
}

// Condition helpers
function condColor(c) {
  if (!c || c.toUpperCase() === "NA") return "#9CA3AF"; // grey = unknown
  switch (c.toUpperCase()) {
    case "GOOD":
      return "#43A047";
    case "FAIR":
      return "#FB8C00";
    case "POOR":
      return "#E53935";
    case "EXCELLENT":
      return "#22c55e";
    default:
      return "#9CA3AF";
  }
}
function condLabel(c) {
  if (!c || c.toUpperCase() === "NA") return null;
  return c.charAt(0) + c.slice(1).toLowerCase();
}

// Car top-view tyre diagram
function TyreDiagram({ fl, fr, rl, rr, spareWheel }) {
  const hasAny = [fl, fr, rl, rr].some((v) => v && v.toUpperCase() !== "NA");
  if (!hasAny) return null;

  // Coordinate setup for horizontal car: viewBox -70 130 440 160
  // Car is rotated -90deg (270deg) clockwise around (130, 275) to shift the whole car far left.
  // Left labels (Front tyres) at x=-60, right labels (Rear tyres) at x=340.
  // Right side of car (FR and RR tyres) center y at 151 (top on screen).
  // Left side of car (FL and RL tyres) center y at 259 (bottom on screen).
  const lx = -60;
  const rx = 340;

  // Right side of car (Top of screen)
  const frY = 151;
  const rrY = 151;

  // Left side of car (Bottom of screen)
  const flY = 259;
  const rlY = 259;

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Disc size={16} />
        <h4 className="text-sm font-semibold text-primary/80 uppercase tracking-wide">
          Tyre Condition
        </h4>
      </div>

      <svg
        viewBox="-70 130 440 180"
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto max-h-48 ml-0 mr-auto"
      >
        <defs>
          <filter id="car-shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow
              dx="0"
              dy="6"
              stdDeviation="6"
              floodColor="#000000"
              floodOpacity="0.3"
            />
          </filter>
        </defs>

        {/* ── CONNECTOR LINES ── */}
        {/* Front Right (Top-Left) */}
        <line
          x1={-30}
          y1={frY}
          x2={8}
          y2={frY}
          stroke="currentColor"
          strokeOpacity="0.25"
          strokeWidth="1.2"
        />
        {/* Front Left (Bottom-Left) */}
        <line
          x1={-30}
          y1={flY}
          x2={8}
          y2={flY}
          stroke="currentColor"
          strokeOpacity="0.25"
          strokeWidth="1.2"
        />
        {/* Rear Right (Top-Right) */}
        <line
          x1={232}
          y1={rrY}
          x2={290}
          y2={rrY}
          stroke="currentColor"
          strokeOpacity="0.25"
          strokeWidth="1.2"
        />
        {/* Rear Left (Bottom-Right) */}
        <line
          x1={232}
          y1={rlY}
          x2={290}
          y2={rlY}
          stroke="currentColor"
          strokeOpacity="0.25"
          strokeWidth="1.2"
        />

        {/* ── ARROWS (pointing to tyres) ── */}
        {/* Front Right (Top-Left) */}
        <polygon
          points="8,147 15,151 8,155"
          fill="currentColor"
          fillOpacity="0.6"
        />
        {/* Front Left (Bottom-Left) */}
        <polygon
          points="8,255 15,259 8,263"
          fill="currentColor"
          fillOpacity="0.6"
        />
        {/* Rear Right (Top-Right) */}
        <polygon
          points="272,147 265,151 272,155"
          fill="currentColor"
          fillOpacity="0.6"
        />
        {/* Rear Left (Bottom-Right) */}
        <polygon
          points="272,255 265,259 272,263"
          fill="currentColor"
          fillOpacity="0.6"
        />

        {/* ── OUTER ANCHOR DOTS ── */}
        <circle cx="-30" cy={frY} r="3" fill="currentColor" fillOpacity="0.5" />
        <circle cx="-30" cy={flY} r="3" fill="currentColor" fillOpacity="0.5" />
        <circle cx="290" cy={rrY} r="3" fill="currentColor" fillOpacity="0.5" />
        <circle cx="290" cy={rlY} r="3" fill="currentColor" fillOpacity="0.5" />

        {/* ── LEFT LABELS (Front Tyres) ── */}
        <text
          x={lx}
          y={frY - 10}
          textAnchor="start"
          fontSize="11"
          fill="currentColor"
          fillOpacity="0.5"
          fontWeight="600"
        >
          Front R
        </text>
        {condLabel(fr) && (
          <text
            x={lx}
            y={frY + 18}
            textAnchor="start"
            fontSize="13"
            fontWeight="700"
            fill={condColor(fr)}
          >
            {condLabel(fr)}
          </text>
        )}
        <text
          x={lx}
          y={flY - 10}
          textAnchor="start"
          fontSize="11"
          fill="currentColor"
          fillOpacity="0.5"
          fontWeight="600"
        >
          Front L
        </text>
        {condLabel(fl) && (
          <text
            x={lx}
            y={flY + 18}
            textAnchor="start"
            fontSize="13"
            fontWeight="700"
            fill={condColor(fl)}
          >
            {condLabel(fl)}
          </text>
        )}

        {/* ── RIGHT LABELS (Rear Tyres) ── */}
        <text
          x={rx}
          y={rrY - 10}
          textAnchor="end"
          fontSize="11"
          fill="currentColor"
          fillOpacity="0.5"
          fontWeight="600"
        >
          Rear R
        </text>
        {condLabel(rr) && (
          <text
            x={rx}
            y={rrY + 18}
            textAnchor="end"
            fontSize="13"
            fontWeight="700"
            fill={condColor(rr)}
          >
            {condLabel(rr)}
          </text>
        )}
        <text
          x={rx}
          y={rlY - 10}
          textAnchor="end"
          fontSize="11"
          fill="currentColor"
          fillOpacity="0.5"
          fontWeight="600"
        >
          Rear L
        </text>
        {condLabel(rl) && (
          <text
            x={rx}
            y={rlY + 18}
            textAnchor="end"
            fontSize="13"
            fontWeight="700"
            fill={condColor(rl)}
          >
            {condLabel(rl)}
          </text>
        )}

        {/* ── VEHICLE DIAGRAM GROUP (Rotated -90deg Clockwise around car center 130, 275) ── */}
        <g
          id="vehicle-diagram"
          filter="url(#car-shadow)"
          transform="rotate(-90, 130, 275)"
        >
          <g id="tyres">
            {/* Front Left */}
            <rect
              id="tyre-front-left"
              x="135"
              y="160"
              width="22"
              height="50"
              rx="5"
              fill={condColor(fl)}
            />
            {/* Front Right */}
            <rect
              id="tyre-front-right"
              x="243"
              y="160"
              width="22"
              height="50"
              rx="5"
              fill={condColor(fr)}
            />
            {/* Rear Left */}
            <rect
              id="tyre-rear-left"
              x="135"
              y="320"
              width="22"
              height="50"
              rx="5"
              fill={condColor(rl)}
            />
            {/* Rear Right */}
            <rect
              id="tyre-rear-right"
              x="243"
              y="320"
              width="22"
              height="50"
              rx="5"
              fill={condColor(rr)}
            />
          </g>

          <g id="car-body-group">
            <rect
              x="145"
              y="140"
              width="110"
              height="270"
              rx="30"
              fill="currentColor"
              fillOpacity="0.05"
              stroke="currentColor"
              strokeOpacity="0.25"
              strokeWidth="2"
            />

            <rect
              x="155"
              y="143"
              width="18"
              height="6"
              rx="3"
              fill="currentColor"
              fillOpacity="0.4"
              stroke="currentColor"
              strokeOpacity="0.25"
            />
            <rect
              x="227"
              y="143"
              width="18"
              height="6"
              rx="3"
              fill="currentColor"
              fillOpacity="0.4"
              stroke="currentColor"
              strokeOpacity="0.25"
            />
            <rect
              x="180"
              y="141"
              width="40"
              height="4"
              rx="2"
              fill="currentColor"
              fillOpacity="0.2"
            />
            <path
              d="M146 155 Q200 145 254 155"
              fill="none"
              stroke="currentColor"
              strokeOpacity="0.25"
              strokeWidth="1.5"
            />

            <path
              d="M160 150 Q165 180 170 200"
              fill="none"
              stroke="currentColor"
              strokeOpacity="0.25"
              strokeWidth="1.5"
            />
            <path
              d="M240 150 Q235 180 230 200"
              fill="none"
              stroke="currentColor"
              strokeOpacity="0.25"
              strokeWidth="1.5"
            />

            <path
              d="M 155 200 L 245 200 L 235 230 L 165 230 Z"
              fill="currentColor"
              fillOpacity="0.12"
              stroke="currentColor"
              strokeOpacity="0.25"
              strokeWidth="2"
              strokeLinejoin="round"
            />

            <rect
              x="138"
              y="205"
              width="8"
              height="14"
              rx="3"
              fill="currentColor"
              fillOpacity="0.05"
              stroke="currentColor"
              strokeOpacity="0.25"
              strokeWidth="1.5"
            />
            <rect
              x="254"
              y="205"
              width="8"
              height="14"
              rx="3"
              fill="currentColor"
              fillOpacity="0.05"
              stroke="currentColor"
              strokeOpacity="0.25"
              strokeWidth="1.5"
            />

            {/* Cabin & Steering Wheel */}
            <rect
              x="165"
              y="230"
              width="70"
              height="80"
              rx="10"
              fill="currentColor"
              fillOpacity="0.08"
              stroke="currentColor"
              strokeOpacity="0.25"
              strokeWidth="1.5"
            />
            <circle
              cx="215"
              cy="245"
              r="7"
              stroke="currentColor"
              strokeWidth="1.2"
              fill="none"
              strokeOpacity="0.5"
            />
            <line
              x1="208"
              y1="245"
              x2="222"
              y2="245"
              stroke="currentColor"
              strokeWidth="1.0"
              strokeOpacity="0.5"
            />
            <line
              x1="215"
              y1="245"
              x2="215"
              y2="252"
              stroke="currentColor"
              strokeWidth="1.0"
              strokeOpacity="0.5"
            />

            <path
              d="M 165 310 L 235 310 L 155 330 L 245 330 Z"
              fill="currentColor"
              fillOpacity="0.12"
              stroke="currentColor"
              strokeOpacity="0.25"
              strokeWidth="2"
              strokeLinejoin="round"
            />

            <path
              d="M 155 370 Q 200 380 245 370"
              fill="none"
              stroke="currentColor"
              strokeOpacity="0.25"
              strokeWidth="1.5"
            />

            <rect
              x="155"
              y="401"
              width="22"
              height="6"
              rx="3"
              fill="#E53935"
              fillOpacity="0.2"
              stroke="#E53935"
              strokeOpacity="0.6"
              strokeWidth="1.5"
            />
            <rect
              x="223"
              y="401"
              width="22"
              height="6"
              rx="3"
              fill="#E53935"
              fillOpacity="0.2"
              stroke="#E53935"
              strokeOpacity="0.6"
              strokeWidth="1.5"
            />
            <path
              d="M146 395 Q200 405 254 395"
              fill="none"
              stroke="currentColor"
              strokeOpacity="0.25"
              strokeWidth="1.5"
            />
          </g>
        </g>
        {spareWheel && (
          <text
            x={rx}
            y={rlY + 36}
            textAnchor="end"
            fontSize="12"
            fontWeight="600"
            fill="#43A047"
          >
            Spare Wheel Available
          </text>
        )}
      </svg>
    </div>
  );
}

// Bike side profile tyre diagram
function BikeTyreDiagram({ front, rear }) {
  const hasAny = [front, rear].some((v) => v && v.toUpperCase() !== "NA");
  if (!hasAny) return null;

  const frontColor = condColor(front);
  const rearColor = condColor(rear);

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Disc size={16} />
        <h4 className="text-sm font-semibold text-primary/80 uppercase tracking-wide">
          Tyre Condition (2-Wheeler)
        </h4>
      </div>

      <svg
        viewBox="0 0 400 185"
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto max-h-52 ml-0 mr-auto"
      >
        <defs>
          <filter id="bike-shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow
              dx="0"
              dy="6"
              stdDeviation="6"
              floodColor="#000000"
              floodOpacity="0.35"
            />
          </filter>
        </defs>

        {/* ── TOP LABELS & CONNECTORS ── */}
        {/* Front Tyre Label */}
        <text
          x="90"
          y="20"
          textAnchor="middle"
          fontSize="11"
          fill="currentColor"
          fillOpacity="0.5"
          fontWeight="600"
        >
          Front Tyre
        </text>
        {condLabel(front) && (
          <text
            x="90"
            y="38"
            textAnchor="middle"
            fontSize="13"
            fontWeight="700"
            fill={frontColor}
          >
            {condLabel(front)}
          </text>
        )}
        <line
          x1="90"
          y1="44"
          x2="90"
          y2="78"
          stroke="currentColor"
          strokeOpacity="0.3"
          strokeWidth="1.5"
          strokeDasharray="3 3"
        />
        <polygon
          points="90,83 86,76 94,76"
          fill="currentColor"
          fillOpacity="0.6"
        />

        {/* Rear Tyre Label */}
        <text
          x="310"
          y="20"
          textAnchor="middle"
          fontSize="11"
          fill="currentColor"
          fillOpacity="0.5"
          fontWeight="600"
        >
          Rear Tyre
        </text>
        {condLabel(rear) && (
          <text
            x="310"
            y="38"
            textAnchor="middle"
            fontSize="13"
            fontWeight="700"
            fill={rearColor}
          >
            {condLabel(rear)}
          </text>
        )}
        <line
          x1="310"
          y1="44"
          x2="310"
          y2="78"
          stroke="currentColor"
          strokeOpacity="0.3"
          strokeWidth="1.5"
          strokeDasharray="3 3"
        />
        <polygon
          points="310,83 306,76 314,76"
          fill="currentColor"
          fillOpacity="0.6"
        />

        {/* ── MOTORCYCLE SILHOUETTE ── */}
        <g filter="url(#bike-shadow)">
          {/* Main Body Fairing & Fuel Tank */}
          <path
            d="M 125 105 L 140 75 Q 165 55 195 62 Q 220 68 235 80 L 290 68 Q 305 65 315 72 L 320 85 Q 300 95 270 95 Q 240 95 210 98 L 180 120 Q 155 130 140 120 Z"
            fill="currentColor"
            fillOpacity="0.15"
            stroke="currentColor"
            strokeOpacity="0.4"
            strokeWidth="2"
            strokeLinejoin="round"
          />

          {/* Windshield & Headlight Mask */}
          <path
            d="M 125 105 L 132 65 L 145 55 L 152 75 Z"
            fill="currentColor"
            fillOpacity="0.25"
            stroke="currentColor"
            strokeOpacity="0.5"
            strokeWidth="1.5"
          />

          {/* ── ENHANCED STEERING ASSEMBLY & HANDLEBAR ── */}
          {/* Steering Riser & Bar Stem */}
          <path
            d="M 136 60 L 140 48 L 126 44"
            fill="none"
            stroke="currentColor"
            strokeOpacity="0.9"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Rubber Handlebar Grip */}
          <rect
            x="118"
            y="41"
            width="10"
            height="5"
            rx="1.5"
            transform="rotate(-12 123 43.5)"
            fill="currentColor"
            fillOpacity="0.8"
          />

          {/* Brake Lever */}
          <line
            x1="124"
            y1="45"
            x2="114"
            y2="47"
            stroke="currentColor"
            strokeOpacity="0.9"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* Digital Instrument Cluster / Speedometer Meter Pod */}
          <rect
            x="134"
            y="45"
            width="12"
            height="8"
            rx="2.5"
            transform="rotate(-15 140 49)"
            fill="currentColor"
            fillOpacity="0.35"
            stroke="currentColor"
            strokeOpacity="0.7"
            strokeWidth="1.2"
          />

          {/* Seat Cushion */}
          <path
            d="M 215 82 Q 245 80 270 85 Q 285 78 298 74 L 275 92 Q 245 92 215 82 Z"
            fill="currentColor"
            fillOpacity="0.4"
          />

          {/* Engine & Transmission Block */}
          <path
            d="M 165 110 L 215 105 L 225 135 L 175 140 Z"
            fill="currentColor"
            fillOpacity="0.2"
            stroke="currentColor"
            strokeOpacity="0.4"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          {/* Engine Cooling Fins */}
          <line
            x1="172"
            y1="118"
            x2="218"
            y2="114"
            stroke="currentColor"
            strokeOpacity="0.3"
            strokeWidth="1.5"
          />
          <line
            x1="174"
            y1="124"
            x2="220"
            y2="120"
            stroke="currentColor"
            strokeOpacity="0.3"
            strokeWidth="1.5"
          />
          <line
            x1="176"
            y1="130"
            x2="222"
            y2="126"
            stroke="currentColor"
            strokeOpacity="0.3"
            strokeWidth="1.5"
          />

          {/* Front Telescopic Forks */}
          <line
            x1="90"
            y1="130"
            x2="136"
            y2="60"
            stroke="currentColor"
            strokeOpacity="0.6"
            strokeWidth="4.5"
            strokeLinecap="round"
          />
          <line
            x1="94"
            y1="130"
            x2="140"
            y2="60"
            stroke="currentColor"
            strokeOpacity="0.4"
            strokeWidth="3"
            strokeLinecap="round"
          />

          {/* Front Fender / Mudguard */}
          <path
            d="M 64 125 A 32 32 0 0 1 115 110"
            fill="none"
            stroke="currentColor"
            strokeOpacity="0.5"
            strokeWidth="3.5"
            strokeLinecap="round"
          />

          {/* Rear Swingarm */}
          <line
            x1="205"
            y1="128"
            x2="310"
            y2="130"
            stroke="currentColor"
            strokeOpacity="0.6"
            strokeWidth="5"
            strokeLinecap="round"
          />

          {/* Rear Shock Absorber */}
          <line
            x1="245"
            y1="92"
            x2="285"
            y2="128"
            stroke="currentColor"
            strokeOpacity="0.5"
            strokeWidth="3.5"
            strokeLinecap="round"
          />

          {/* Exhaust Pipe & Muffler */}
          <path
            d="M 190 135 L 240 142 L 315 132"
            fill="none"
            stroke="currentColor"
            strokeOpacity="0.45"
            strokeWidth="6"
            strokeLinecap="round"
          />
          <path
            d="M 260 140 L 320 128"
            fill="none"
            stroke="currentColor"
            strokeOpacity="0.7"
            strokeWidth="9"
            strokeLinecap="round"
          />

          {/* ── FRONT TYRE ── */}
          <g transform="translate(90, 130)">
            {/* Outer Tread */}
            <circle
              cx="0"
              cy="0"
              r="32"
              fill="none"
              stroke={frontColor}
              strokeWidth="10"
            />
            <circle
              cx="0"
              cy="0"
              r="27"
              fill="none"
              stroke="currentColor"
              strokeOpacity="0.2"
              strokeWidth="1"
            />
            {/* Inner Hub / Rim */}
            <circle
              cx="0"
              cy="0"
              r="19"
              fill="currentColor"
              fillOpacity="0.12"
              stroke="currentColor"
              strokeOpacity="0.3"
              strokeWidth="1.5"
            />
            {/* Alloy Spokes (6-spoke design) */}
            <path
              d="M 0 -19 L 0 19 M -16 -9 L 16 9 M -16 9 L 16 -9"
              stroke="currentColor"
              strokeOpacity="0.35"
              strokeWidth="2"
            />
            {/* Brake Disc Rotors */}
            <circle
              cx="0"
              cy="0"
              r="12"
              fill="none"
              stroke="currentColor"
              strokeOpacity="0.4"
              strokeWidth="1.5"
              strokeDasharray="3 2"
            />
            <circle cx="0" cy="0" r="5" fill="currentColor" fillOpacity="0.6" />
          </g>

          {/* ── REAR TYRE ── */}
          <g transform="translate(310, 130)">
            {/* Outer Tread */}
            <circle
              cx="0"
              cy="0"
              r="32"
              fill="none"
              stroke={rearColor}
              strokeWidth="11"
            />
            <circle
              cx="0"
              cy="0"
              r="26.5"
              fill="none"
              stroke="currentColor"
              strokeOpacity="0.2"
              strokeWidth="1"
            />
            {/* Inner Hub / Rim */}
            <circle
              cx="0"
              cy="0"
              r="18"
              fill="currentColor"
              fillOpacity="0.12"
              stroke="currentColor"
              strokeOpacity="0.3"
              strokeWidth="1.5"
            />
            {/* Alloy Spokes (6-spoke design) */}
            <path
              d="M 0 -18 L 0 18 M -15 -9 L 15 9 M -15 9 L 15 -9"
              stroke="currentColor"
              strokeOpacity="0.35"
              strokeWidth="2"
            />
            {/* Rear Sprocket / Disc */}
            <circle
              cx="0"
              cy="0"
              r="11"
              fill="none"
              stroke="currentColor"
              strokeOpacity="0.4"
              strokeWidth="1.5"
              strokeDasharray="3 2"
            />
            <circle cx="0" cy="0" r="5" fill="currentColor" fillOpacity="0.6" />
          </g>
        </g>
      </svg>
    </div>
  );
}

export default function VehicleCondition({
  vehicle,
  open,
  setOpen,
  inspectionDetails,
}) {
  // handleResponse already unwraps api.data, so inspectionDetails IS the inspection object directly
  const d = inspectionDetails ?? null;

  // Score sections — null scores are filtered out inside ScoreCard
  const scoreGroups = [
    {
      title: "Overall Inspection Score",
      scores: [{ label: "Overall Score", key: "inspectionScore" }],
    },
    {
      title: "Engine & Drivetrain",
      scores: [
        { label: "Engine & Powertrain", key: "engineAndPowertrainScore" },
        { label: "EV Battery", key: "evBatteryScore" },
        { label: "Mechanical", key: "mechanicalScore" },
        { label: "OBD Diagnostics", key: "obdDiagnosticsScore" },
      ],
    },
    {
      title: "Exterior & Structure",
      scores: [
        { label: "Exterior Panels", key: "exteriorPanelScore" },
        {
          label: "Glass & Ext. Electronics",
          key: "glassAndExteriorElectronicsScore",
        },
        { label: "Structural History", key: "structuralHistoryScore" },
      ],
    },
    {
      title: "Interior & Comfort",
      scores: [
        { label: "Interior & Cabin", key: "interiorAndCabinScore" },
        { label: "Comfort & Electronics", key: "comfortAndElectronicsScore" },
      ],
    },
    {
      title: "Tyres & Modifications",
      scores: [
        { label: "Tyres", key: "tyresScore" },
        { label: "Modifications", key: "modificationsScore" },
      ],
    },
  ];

  const hasTyreCondition =
    d?.frontLeftTyreCondition ||
    d?.frontRightTyreCondition ||
    d?.rearLeftTyreCondition ||
    d?.rearRightTyreCondition ||
    d?.frontTyreCondition ||
    d?.rearTyreCondition;

  return (
    <section className="relative rounded-2xl overflow-hidden text-primary border border-third/60">
      <div className="relative z-10">
        {/* ================= HEADER ================= */}
        <div
          className="flex justify-between items-center px-4 md:px-6 py-3 cursor-pointer select-none"
          onClick={() => setOpen((prev) => !prev)}
        >
          {/* LEFT SIDE */}
          <div className="flex items-center gap-2 min-w-0">
            <CheckCircle size={20} className="shrink-0" />
            <h3 className="text-lg md:text-xl font-semibold truncate">
              Vehicle Condition
            </h3>

            {/* Desktop Badge: shown next to title on large screens */}
            <div className="hidden md:flex items-center gap-2">
              {(d?.inspectionStatus || vehicle?.inspectionStatus) ===
              "AVX_INSPECTED" ? (
                <div className="relative w-28 h-6 ml-1">
                  <Image
                    src="/inspection_small.svg"
                    alt="Reecomm Inspected"
                    fill
                    className="object-contain object-left"
                  />
                </div>
              ) : (d?.inspectionStatus || vehicle?.inspectionStatus) &&
                (d?.inspectionStatus || vehicle?.inspectionStatus) !==
                  "NOT_INSPECTED" ? (
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full ml-1.5 border border-fourth text-white bg-fourth shadow-sm whitespace-nowrap">
                  {(d?.inspectionStatus || vehicle?.inspectionStatus).replace(
                    /_/g,
                    " ",
                  )}
                </span>
              ) : null}
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Mobile Badge: shown next to arrow on small screens */}
            <div className="md:hidden flex items-center gap-1.5">
              {(d?.inspectionStatus || vehicle?.inspectionStatus) ===
              "AVX_INSPECTED" ? (
                <div className="relative w-24 h-6">
                  <Image
                    src="/inspection_small.svg"
                    alt="Reecomm Inspected"
                    fill
                    className="object-contain object-right"
                  />
                </div>
              ) : (d?.inspectionStatus || vehicle?.inspectionStatus) &&
                (d?.inspectionStatus || vehicle?.inspectionStatus) !==
                  "NOT_INSPECTED" ? (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full border border-fourth text-white bg-fourth shadow-sm whitespace-nowrap">
                  {(d?.inspectionStatus || vehicle?.inspectionStatus).replace(
                    /_/g,
                    " ",
                  )}
                </span>
              ) : null}
            </div>

            <ChevronDown
              size={20}
              className={`transition-transform duration-300 shrink-0 ${
                open ? "rotate-180" : "rotate-0"
              }`}
            />
          </div>
        </div>

        {/* ================= CONTENT ================= */}
        <div
          className={`grid transition-all duration-300 ease-in-out ${
            open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="overflow-hidden">
            <div className="mt-3 pb-6 space-y-6 px-6">
              {!d ? (
                <div className="flex flex-col items-center justify-center py-10 px-4 text-center">
                  <FileSearch
                    className="w-10 h-10 text-third/50 mb-3"
                    strokeWidth={1.5}
                  />
                  <p className="text-sm font-semibold text-primary">
                    No condition data available for this vehicle.
                  </p>
                  <p className="text-xs text-third mt-1">
                    Want to know the real condition? Get it inspected.
                  </p>
                </div>
              ) : (
                <>
                  {/* Inspection Status Badge */}
                  {/* <div className="flex items-center gap-2 text-sm">
                    <span className="text-third">Overall Inspection Score</span>
                    <span className="font-semibold text-primary capitalize">
                      {scoreStatus(d.inspectionScore)}
                    </span>
                  </div> */}

                  {/* Score Groups */}
                  {scoreGroups.map((group) => {
                    // Only show groups where at least one score is non-null
                    const hasData = group.scores.some(
                      (s) => d[s.key] !== null && d[s.key] !== undefined,
                    );
                    if (!hasData) return null;
                    return (
                      <div key={group.title} className="space-y-3">
                        <h4 className="text-sm font-semibold text-primary/80 uppercase tracking-wide">
                          {group.title}
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-8 gap-y-3">
                          {group.scores.map((s) => (
                            <ScoreCard
                              key={s.key}
                              label={s.label}
                              score={d[s.key]}
                            />
                          ))}
                        </div>
                        <div className="border-t border-third/30 pt-1" />
                      </div>
                    );
                  })}

                  {/* ===== TYRE CONDITIONS ===== */}
                  {vehicle?.vehicleType === "TWO_WHEELER" ? (
                    <BikeTyreDiagram
                      front={d.frontTyreCondition}
                      rear={d.rearTyreCondition}
                    />
                  ) : (
                    <TyreDiagram
                      fl={d.frontLeftTyreCondition ?? d.frontTyreCondition}
                      fr={d.frontRightTyreCondition ?? d.frontTyreCondition}
                      rl={d.rearLeftTyreCondition ?? d.rearTyreCondition}
                      rr={d.rearRightTyreCondition ?? d.rearTyreCondition}
                      spareWheel={vehicle?.spareWheel || d?.spareWheel}
                    />
                  )}

                  {/* ===== VIEW INSPECTION REPORT BUTTON ===== */}
                  {d?.reportUrl && (
                    <div className="flex justify-end mt-6">
                      <Button
                        variant="outline"
                        showIcon={true}
                        onClick={() => window.open(d.reportUrl, "_blank")}
                      >
                        View Inspection Report
                      </Button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
