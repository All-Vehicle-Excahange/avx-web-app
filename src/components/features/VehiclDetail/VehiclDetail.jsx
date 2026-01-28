"use client";

import { useRef, useState } from "react";
// TOP
import VehicleHeader from "./VehicleHeader";
import VehicleImageGallery from "./VehicleImageGallery";

// LEFT
import VehicleOverview from "./VehicleOverview";
import VehicleSpec from "./VehicleSpec";
import VehicleCondition from "./VehicleCondition";

// RIGHT
import VehicleSummaryRight from "./VehicleSummaryRight";
import Testimonials from "./Testimonials";
import SimulerVehicle from "./SimulerVehicle";
import AutoConsultPicsSection from "../home/AutoConsultPicsSection";
import AvxProcess from "./AvxProcess";
import SpecialOffer from "./SpecialOffer";
import Navbar from "@/components/layout/Navbar";

export default function VehicleDetails() {
  const overviewRef = useRef(null);
  const specRef = useRef(null);
  const conditionRef = useRef(null);

  const [activeTab, setActiveTab] = useState("overview");

  const NAVBAR_OFFSET = 96;

  const scrollToSection = (ref, tab) => {
    setActiveTab(tab);

    if (!ref.current) return;

    const top =
      ref.current.getBoundingClientRect().top + window.scrollY - NAVBAR_OFFSET;

    window.scrollTo({
      top,
      behavior: "smooth",
    });
  };

  return (
    <>
      <div className="fixed top-0 inset-x-0 z-[1000]">
        <Navbar heroMode scrolled={true} />
      </div>

      <main className="bg-secondary text-secondary w-full">
        <div className="w-full py-6">
          {/* HEADER */}
          <section className="mb-6">
            <VehicleHeader />
          </section>

          <section className="grid grid-cols-1 xl:grid-cols-[2.2fr_1fr] gap-6 items-start">
            <div className="flex flex-col gap-6 min-w-0">
              <VehicleImageGallery />

              {/* <div className="bg-secondary">
                <div className="flex gap-8 border-b border-third/40">
                  {[
                    { id: "overview", label: "Overview", ref: overviewRef },
                    { id: "spec", label: "Specifications", ref: specRef },
                    { id: "condition", label: "Condition", ref: conditionRef },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => scrollToSection(tab.ref, tab.id)}
                      className={`relative pb-3 text-sm font-medium transition-colors cursor-pointer
                        ${activeTab === tab.id
                          ? "text-primary"
                          : "text-third hover:text-primary"
                        }`}
                    >
                      {tab.label}

                      {activeTab === tab.id && (
                        <span className="absolute left-0 bottom-0 h-0.5 w-full bg-primary rounded-full" />
                      )}
                    </button>
                  ))}
                </div>
              </div> */}

              <div ref={overviewRef}>
                <VehicleOverview />
              </div>


              <div ref={conditionRef}>
                <VehicleCondition />
              </div>
              <div ref={specRef}>
                <VehicleSpec />
              </div>
            </div>

            <aside className="flex flex-col gap-6 lg:sticky lg:top-24 h-fit">
              <VehicleSummaryRight />
              <Testimonials />
              <SpecialOffer />
            </aside>
          </section>

          <section className="py-12 flex flex-col gap-12">
            <SimulerVehicle />
            <AutoConsultPicsSection limit={4} />
          </section>

          <AvxProcess />
        </div>
      </main>
    </>
  );
}
