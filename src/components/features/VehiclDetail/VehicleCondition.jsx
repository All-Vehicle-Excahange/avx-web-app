"use client";

import { CheckCircle, ChevronDown, Disc } from "lucide-react";

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

// Bike horizontal tyre diagram
function BikeTyreDiagram({ front, rear }) {
  const hasAny = [front, rear].some((v) => v && v.toUpperCase() !== "NA");
  if (!hasAny) return null;

  const flY = 300; // y-level for the horizontal tyres

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Disc size={16} />
        <h4 className="text-sm font-semibold text-primary/80 uppercase tracking-wide">
          Tyre Condition
        </h4>
      </div>

      <svg
        viewBox="-40 230 480 140"
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto max-h-48 ml-0 mr-auto"
      >
        <defs>
          <filter id="bike-shadow" x="-30%" y="-20%" width="160%" height="140%">
            <feDropShadow dx="0" dy="6" stdDeviation="6" floodColor="#000000" floodOpacity="0.3" />
          </filter>
        </defs>

        {/* ── CONNECTOR LINES ── */}
        <line x1="-10" y1={flY} x2="50" y2={flY} stroke="currentColor" strokeOpacity="0.25" strokeWidth="1.5" />
        <line x1="350" y1={flY} x2="410" y2={flY} stroke="currentColor" strokeOpacity="0.25" strokeWidth="1.5" />
        
        {/* ── ARROWS ── */}
        <polygon points="50,297 57,300 50,303" fill="currentColor" fillOpacity="0.6" />
        <polygon points="350,297 343,300 350,303" fill="currentColor" fillOpacity="0.6" />

        {/* ── OUTER ANCHOR DOTS ── */}
        <circle cx="-10" cy={flY} r="3" fill="currentColor" fillOpacity="0.5" />
        <circle cx="410" cy={flY} r="3" fill="currentColor" fillOpacity="0.5" />

        {/* ── LABELS ── */}
        <text x="-20" y={flY - 8} textAnchor="end" fontSize="12" fill="currentColor" fillOpacity="0.5" fontWeight="600">Front</text>
        {condLabel(front) && (
          <text x="-20" y={flY + 16} textAnchor="end" fontSize="14" fontWeight="700" fill={condColor(front)}>{condLabel(front)}</text>
        )}

        <text x="420" y={flY - 8} textAnchor="start" fontSize="12" fill="currentColor" fillOpacity="0.5" fontWeight="600">Rear</text>
        {condLabel(rear) && (
          <text x="420" y={flY + 16} textAnchor="start" fontSize="14" fontWeight="700" fill={condColor(rear)}>{condLabel(rear)}</text>
        )}

        {/* ── ROTATED BIKE DIAGRAM ── */}
        <g transform="rotate(-90 200 300)" filter="url(#bike-shadow)">
          <g id="tyres">
            <rect id="tyre-front" x="180" y="110" width="40" height="110" rx="10" fill={condColor(front)} />
            <rect id="tyre-rear" x="176" y="380" width="48" height="120" rx="10" fill={condColor(rear)} />
          </g>

          <g id="bike-chassis-under">
            <rect x="165" y="265" width="70" height="35" rx="6" fill="#94A3B8" stroke="#64748B" strokeWidth="1.5" />
            <line x1="175" y1="390" x2="182" y2="450" stroke="#94A3B8" strokeWidth="4" strokeLinecap="round" />
            <line x1="225" y1="390" x2="218" y2="450" stroke="#94A3B8" strokeWidth="4" strokeLinecap="round" />
            <path d="M 220 340 L 225 350 L 230 460 L 222 460 Z" fill="#F1F5F9" stroke="#CBD5E1" strokeWidth="1.5" strokeLinejoin="round" />
            <rect x="222" y="460" width="8" height="6" rx="1" fill="#64748B" />
            <rect x="160" y="345" width="15" height="8" rx="3" fill="#64748B" />
            <rect x="225" y="345" width="15" height="8" rx="3" fill="#64748B" />
          </g>

          <g id="bike-body-group">
            <path d="M 188 150 L 212 150 L 216 215 L 184 215 Z" fill="#F5F5F5" stroke="#D9D9D9" strokeWidth="1.5" strokeLinejoin="round" />
            <path d="M 175 210 C 175 185, 225 185, 225 210 Z" fill="#E2E8F0" stroke="#CBD5E1" strokeWidth="1.5" opacity="0.9" />
            <rect x="185" y="200" width="30" height="10" rx="3" fill="#334155" /> 
            
            {/* Shrunk handlebars to save Y-axis space after rotation */}
            <line x1="150" y1="230" x2="165" y2="222" stroke="#334155" strokeWidth="8" strokeLinecap="round" />
            <line x1="250" y1="230" x2="235" y2="222" stroke="#334155" strokeWidth="8" strokeLinecap="round" />
            <path d="M 165 222 Q 200 205 235 222" fill="none" stroke="#D9D9D9" strokeWidth="5" strokeLinecap="round" />
            
            <line x1="160" y1="223" x2="150" y2="190" stroke="#94A3B8" strokeWidth="2" />
            <ellipse cx="145" cy="185" rx="12" ry="7" fill="#F8FAFC" stroke="#D9D9D9" strokeWidth="1.5" transform="rotate(-25 145 185)" />
            <line x1="240" y1="223" x2="250" y2="190" stroke="#94A3B8" strokeWidth="2" />
            <ellipse cx="255" cy="185" rx="12" ry="7" fill="#F8FAFC" stroke="#D9D9D9" strokeWidth="1.5" transform="rotate(25 255 185)" />

            <path d="M 175 235 C 145 250, 160 320, 185 330 L 215 330 C 240 320, 255 250, 225 235 Z" fill="#F5F5F5" stroke="#D9D9D9" strokeWidth="2" strokeLinejoin="round" />
            <line x1="200" y1="240" x2="200" y2="320" stroke="#E2E8F0" strokeWidth="2" />

            <path d="M 185 330 C 175 370, 178 410, 188 430 L 212 430 C 222 410, 225 370, 215 330 Z" fill="#334155" stroke="#1E293B" strokeWidth="1.5" strokeLinejoin="round" />
            <line x1="184" y1="360" x2="216" y2="360" stroke="#475569" strokeWidth="1" />
            <line x1="184" y1="380" x2="216" y2="380" stroke="#475569" strokeWidth="1" />
            <line x1="185" y1="400" x2="215" y2="400" stroke="#475569" strokeWidth="1" />

            <path d="M 188 430 L 212 430 L 206 475 L 194 475 Z" fill="#F5F5F5" stroke="#D9D9D9" strokeWidth="2" strokeLinejoin="round" />
            <rect x="194" y="475" width="12" height="4" rx="2" fill="#EF4444" stroke="#B91C1C" strokeWidth="0.5" />
          </g>
        </g>
      </svg>
    </div>
  );
}

export default function VehicleCondition({ vehicle, open, setOpen, inspectionDetails }) {
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
          className="flex justify-between items-center px-6 py-3 cursor-pointer"
          onClick={() => setOpen((prev) => !prev)}
        >
          <div className="flex items-center gap-2">
            <CheckCircle size={20} />
            <h3 className="text-xl font-semibold">Vehicle Condition  </h3>
            {d?.inspectionScore != null && (
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full ml-1 border border-third/40 text-primary bg-third/10">
                {d.inspectionStatus?.replace(/_/g, " ")}
              </span>
            )}
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
          className={`grid transition-all duration-300 ease-in-out ${
            open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="overflow-hidden">
            <div className="mt-3 pb-6 space-y-6 px-6">
              {!d ? (
                <p className="text-sm text-third py-4 text-center">
                  No inspection data available.
                </p>
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
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
