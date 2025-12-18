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
import SimulerVehicle from "./SimulerVehicle";
import AutoConsultPicsSection from "../home/AutoConsultPicsSection";
import AvxProcess from "./AvxProcess";
import SpecialOffer from "./SpecialOffer";

export default function VehicleDetails() {
  return (
    <>
      <NavbarDark />

      <main className="bg-secondary text-secondary w-full">
        <div className="w-full py-6">
          <section className="w-full space-y-4 mb-6">
            <VehicleHeader />
          </section>

          <section className="grid  grid-cols-1 xl:grid-cols-[2.2fr_1fr] 3xl:grid-cols-[2.4fr_1fr]  gap-6 items-start">
            {/* LEFT */}
            <div className="flex flex-col gap-6 min-w-0">
              <VehicleImageGallery />
              <VehicleOverview />
              <VehicleSpec />
              <VehicleCondition />
            </div>

            {/* RIGHT (STICKY) */}
            <aside className="flex flex-col gap-6 min-w-0 lg:sticky lg:top-24 h-fit">
              <VehicleSummaryRight />
              <Testimonials />
              <SpecialOffer />
            </aside>
          </section>

          <section className="py-12 flex flex-col gap-12">
            <SimulerVehicle />
            <AutoConsultPicsSection limit={4} />
          </section>
          {/* We need to imrpove this in futue  */}
          <AvxProcess />
        </div>
      </main>
    </>
  );
}
