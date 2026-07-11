"use client";

import React from "react";
import { Zap, ShieldAlert, BadgeCheck } from "lucide-react";

export default function ReInspectionOptions() {
  return (
    <section className="relative py-10 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-fourth/20 opacity-30" />

      <div className="relative w-full mx-auto">
        <div className="flex flex-col lg:flex-row border border-primary/20 rounded-4xl backdrop-blur-md overflow-hidden">
          {/* LEFT PANEL — Existing Report */}
          <div className="lg:w-1/2 p-6 md:p-10 xl:p-14 lg:border-r border-primary/20 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-8 md:mb-10">
                <Zap className="w-4 h-4 text-primary" />
                <span className="text-xs md:text-sm tracking-[0.35em] uppercase text-third font-semibold">
                  In Your Potential
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.05] text-primary font-montserrat mb-8 md:mb-10">
                Existing Report <br />
                <span className="text-fourth/80">Upgrades</span>
              </h2>

              <p className="text-sm md:text-base text-third/80 leading-relaxed mb-8">
                Consultants who have already had their vehicle inspected elsewhere can submit that report for Reecomm review. If it meets our verification standards, it will be tagged on the listing.
              </p>

              <div className="mt-8">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-primary mb-4">
                  What Reecomm checks:
                </h4>
                <ul className="space-y-3">
                  {[
                    "Fresh inspection (not older than 60 days)",
                    "Issued by a recognised inspection body",
                    "Complete photo documentation",
                    "No evidence of alteration",
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-third/80">
                      <span className="text-fourth mt-1.5">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-8 p-4 rounded-xl border border-primary/10 bg-primary/3 flex gap-3 items-start">
              <ShieldAlert className="w-4 h-4 text-fourth shrink-0 mt-0.5" />
              <p className="text-xs text-third/70 leading-relaxed">
                <strong>Note:</strong> Reecomm reserves the right to require a new inspection if the submitted report is incomplete or does not meet platform standards.
              </p>
            </div>
          </div>

          {/* RIGHT PANEL — Full Multi-Point Scan */}
          <div className="lg:w-1/2 p-6 md:p-10 xl:p-14 bg-linear-to-br from-transparent to-primary/5 flex flex-col justify-between relative">
            <div>
              <div className="mb-5 md:mb-6 inline-flex items-center gap-3 px-3 md:px-4 py-1.5 rounded-full border border-primary/20">
                <span className="text-[10px] md:text-sm tracking-[0.35em] uppercase text-third font-semibold">
                  Custom Examination
                </span>
              </div>

              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.05] text-primary font-montserrat mb-8 md:mb-10">
                Full Multi-Point <br />
                <span className="text-fourth/80">Scan</span>
              </h3>

              <p className="text-sm md:text-base text-third/80 leading-relaxed mb-8">
                A fresh, independent inspection carried out by a Reecomm-assigned inspector — covering all 11 categories from engine to modifications.
              </p>

              <div className="mt-8">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-primary mb-4">
                  Covers:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
                  {[
                    "Engine & Powertrain",
                    "Mechanical System",
                    "Exterior Panels (per panel)",
                    "Interior & Cabin",
                    "Structural History",
                    "Tyres (tread depth in mm)",
                    "OBD Diagnostics",
                    "Modifications Assessment",
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm text-third/80">
                      <span className="text-fourth">•</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 p-4 rounded-xl border border-primary/10 bg-primary/3 flex gap-3 items-start">
              <BadgeCheck className="w-4 h-4 text-fourth shrink-0 mt-0.5" />
              <p className="text-xs text-primary/80 font-medium leading-relaxed">
                Recommended for all buyers requesting inspection on a listed vehicle.
              </p>
            </div>
          </div>
        </div>

        {/* bottom note */}
        <div className="mt-8 md:mt-10 text-center px-2">
          <p className="text-[10px] md:text-[11px] text-third/50 uppercase tracking-[0.22em]">
            Re-inspection facilitates risk mitigation closer to transaction finalized date
          </p>
        </div>
      </div>
    </section>
  );
}
  