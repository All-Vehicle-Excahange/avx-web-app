"use client";

import NavbarDark from "@/components/layout/NavbarDark";

// TOP PART
import VehicleHeader from "./VehicleHeader";
import VehicleImageGallery from "./VehicleImageGallery";

// LEFT SIDE COMPONENTS
import VehicleOverview from "./VehicleOverview";
import VehicleSpec from "./VehicleSpec";

// RIGHT SIDE COMPONENTS
import VehicleSummaryRight from "./VehicleSummaryRight";
import Testimonials from "./Testimonials";
import VehicleCondition from "./VehicleCondition";

export default function VehicleDetails() {
  return (
    <>
      <NavbarDark />

      <main className="bg-primary text-secondary w-full">
        <div className="w-full py-6">
          <section className="w-full space-y-4 mb-6">
            <VehicleHeader />
          </section>

          <section
            className="
              grid
              grid-cols-1
              xl:grid-cols-[2.2fr_1fr]
              2xl:grid-cols-[2.4fr_1fr]
              gap-6
              items-start
            "
          >
            {/* ================= LEFT ================= */}
            <div className="flex flex-col gap-6 min-w-0">
              <VehicleImageGallery />
              <VehicleOverview />
              <VehicleSpec />
              <VehicleCondition />
            </div>

            {/* ================= RIGHT ================= */}
            <aside className="flex flex-col gap-6 min-w-0">
              <VehicleSummaryRight />
              <Testimonials />
            </aside>
          </section>
        </div>
      </main>
    </>
  );
}
