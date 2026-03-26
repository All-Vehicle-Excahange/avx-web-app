"use client";

import { CheckCircle2 } from "lucide-react";

const inspectionData = {
  inspectionTitle: "AVX Inspection Assurance",
  inspectionText: `
    AVX inspection services provide additional transparency by documenting
    key aspects of the vehicle's condition before purchase.
  `,
  inspectionPoints: [
    "Exterior condition check",
    "Interior condition check",
    "Visible mechanical components",
    "Photo & video documentation",
  ],
  inspectionImages: [
    "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=1200&auto=format&fit=crop",
  ],
};

function InspectionSection() {
  return (
    <section className="w-full py-12">
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-16 items-center">

        {/* ── LEFT CONTENT ───────────────── */}
        <div className="flex flex-col gap-6">

          <p className="text-sm tracking-[0.4em] uppercase text-third font-semibold">
            Independent Verification
          </p>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight text-primary font-[Montserrat]">
            AVX Inspection{" "}
            <span className="text-fourth/80">Assurance</span>
          </h2>

          <p className="text-third text-[17px] font-[Poppins] leading-relaxed max-w-lg">
            {inspectionData.inspectionText.trim()}
          </p>

          {/* POINTS */}
          <div className="flex flex-col gap-4 mt-2">
            {inspectionData.inspectionPoints.map((pt, i) => (
              <div key={i} className="flex items-start gap-3 group">
                <CheckCircle2
                  className="text-primary mt-0.5 group-hover:scale-110 transition"
                  size={18}
                />
                <p className="text-third font-[Poppins] leading-relaxed text-[15px]">
                  {pt}
                </p>
              </div>
            ))}
          </div>

        </div>

        {/* ── RIGHT VISUAL ───────────────── */}
        <div className="relative h-[400px] hidden md:block">

          {/* main image */}
          <div className="absolute inset-0 rounded-2xl overflow-hidden border border-third/10 shadow-sm">
            <img
              src={inspectionData.inspectionImages[0]}
              className="w-full h-full object-cover transition duration-500 hover:scale-105"
            />
          </div>

          {/* small floating image 1 */}
          <div className="absolute top-6 right-6 w-32 h-24 rounded-xl overflow-hidden border border-third/10 shadow-lg backdrop-blur-sm">
            <img
              src={inspectionData.inspectionImages[1]}
              className="w-full h-full object-cover"
            />
          </div>

          {/* small floating image 2 */}
          <div className="absolute bottom-6 left-6 w-36 h-28 rounded-xl overflow-hidden border border-third/10 shadow-lg backdrop-blur-sm">
            <img
              src={inspectionData.inspectionImages[2]}
              className="w-full h-full object-cover"
            />
          </div>

        </div>

      </div>
    </section>
  );
}

export default InspectionSection;