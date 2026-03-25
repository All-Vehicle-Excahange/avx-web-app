"use client";

import { CheckCircle2 } from "lucide-react";

const points = [
  "Exterior condition check",
  "Interior condition check",
  "Visible mechanical components",
  "Photo & video documentation",
];

function InspectionSection() {
  return (
    <section className="w-full py-12">
      <div className="max-w-7xl mx-4 grid md:grid-cols-2 gap-12">

        {/* ── LEFT SIDE ───────────────── */}
        <div className="flex flex-col gap-4">

          <p className="text-sm tracking-[0.4em] uppercase text-third font-semibold font-[Montserrat]">
            Independent Verification
          </p>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.05] text-primary font-[Montserrat]">
            AVX Inspection <span className="text-fourth/80">Assurance</span>
          </h2>

          <p className="text-third text-lg font-[Poppins] leading-relaxed">
          {"  AVX inspection services provide additional transparency by documenting  key aspects of the vehicle's condition before purchase."}
          </p>

        </div>

        {/* ── RIGHT SIDE (FILLED CLEANLY) ───────────────── */}
        <div className="flex flex-col gap-4">

          {points.map((pt, i) => (
            <div
              key={i}
              className="flex items-start gap-3 p-5 border border-third/10 rounded-lg"
            >
              <CheckCircle2 className="text-primary mt-1" size={16} />

              <p className="text-third font-[Poppins] leading-relaxed">
                {pt}
              </p>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}

export default InspectionSection;