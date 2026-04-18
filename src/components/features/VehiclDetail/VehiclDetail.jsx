"use client";

import { useEffect, useRef, useState, useLayoutEffect } from "react";

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
import Navbar from "@/components/layout/Navbar";
import VehicleOverviewMain from "./VehicleOverviewMain";


import { useParams } from "next/navigation";
import { getVehicleOverview, getVehicleSummary } from "@/services/vehicle.service";
import ReletedConsualt from "./ReletedConsualt";
import VehicleDetailsSkeleton from "@/components/ui/skeleton/VehicleDetailsSkeleton";
import SpecialOffer from "./SpecialOffer";

export default function VehicleDetails() {
  const specificationRef = useRef(null);
  const conditionRef = useRef(null);
  const inspectionRef = useRef(null);
  const overviewRef = useRef(null);
  const [isConditionOpen, setIsConditionOpen] = useState(false);
  const [isSpecOpen, setIsSpecOpen] = useState(false);
  const [isInspectionOpen, setIsInspectionOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  useLayoutEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);


  const scrollToSection = (ref, tab) => {
    setActiveTab(tab);
    if (tab === "specification") {
      setIsSpecOpen(true);
      setIsConditionOpen(false);
      setIsInspectionOpen(false);
    }
    if (tab === "inspection") {
      setIsInspectionOpen(true);
      setIsSpecOpen(false);
      setIsConditionOpen(false);
    }

    if (tab === "condition") {
      setIsConditionOpen(true);
      setIsSpecOpen(false);
      setIsInspectionOpen(false);
    }

    if (tab === "overview") {
      setIsConditionOpen(false);
      setIsSpecOpen(false);
      setIsInspectionOpen(false);
    }

    if (!ref.current) return;

    // Adjust offset based on screen size (lg breakpoint)
    const isMobile = window.innerWidth < 1024;
    const dynamicOffset = isMobile ? 130 : 220; // 130 for navbar + sticky tabs on mobile, 220 for desktop sticky header

    const top =
      ref.current.getBoundingClientRect().top + window.scrollY - dynamicOffset;

    window.scrollTo({
      top,
      behavior: "smooth",
    });
  };
  const params = useParams();
  const id = params.id;
  const [vehicleOverview, setVehicleOverview] = useState({});
  const [vehicleSummary, setVehicleSummary] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      try {
        // Step 1: Always fetch overview first
        const overviewRes = await getVehicleOverview(id);
        const overviewData = overviewRes.data;
        setVehicleOverview(overviewData);

        // Step 2: Only fetch consultation meta if the owner is a CONSULTATION
        const ownerRole = overviewData?.vehicleOwner?.userRole;
        if (ownerRole === "CONSULTATION") {
          try {
            const summaryRes = await getVehicleSummary(id);
            setVehicleSummary(summaryRes.data);
          } catch (summaryErr) {
            console.warn("Consultation meta not available:", summaryErr?.message);
            setVehicleSummary({});
          }
        } else {
          setVehicleSummary({});
        }
      } catch (error) {
        console.error("Failed to load vehicle details:", error);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchAll();
  }, [id]);

  //  Stricter loading check to prevent "Labels without values" UI flash
  if (loading || !vehicleOverview?.id) {
    return (
      <>
        <div className="fixed top-0 inset-x-0 z-1000">
          <Navbar heroMode scrolled={true} />
        </div>
        <main className="text-secondary w-full">
          <div className="w-full py-6 pb-24 lg:pb-6">
            <VehicleDetailsSkeleton />
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <div className="fixed top-0 inset-x-0 z-1000">
        <Navbar heroMode scrolled={true} />
      </div>

      <main className=" text-secondary w-full">
        <div className="w-full py-6 pb-24 lg:pb-6">
          {/* HEADER */}
          <section className="relative">
            <div className="lg:sticky top-16 md:pb-4 z-40">
              <VehicleHeader vehicle={vehicleOverview} vehicleSummary={vehicleSummary} />
            </div>

            <section className="grid grid-cols-1 xl:grid-cols-[2.2fr_1fr] gap-6 items-start">
              <div className="flex flex-col gap-6 min-w-0">
                <VehicleImageGallery vehicle={vehicleOverview} />

                <div className="sticky top-[64px] lg:relative lg:top-0 lg:z-auto z-40 bg-transparent backdrop-blur-lg border-b border-third/40">
                  <div className="overflow-x-auto scrollbar-hide">
                    <div className="flex gap-6 px-2 min-w-max">
                      {[
                        { id: "overview", label: "Overview", ref: overviewRef },
                        { id: "specification", label: "Specifications", ref: specificationRef },
                        { id: "condition", label: "Condition", ref: conditionRef },
                        { id: "inspection", label: "Inspection", ref: inspectionRef },
                      ].map((tab) => (
                        <button
                          key={tab.id}
                          onClick={() => scrollToSection(tab.ref, tab.id)}
                          className={`relative cursor-pointer py-3 text-sm font-medium whitespace-nowrap transition-colors
          ${activeTab === tab.id
                              ? "text-primary"
                              : "text-third hover:text-primary"
                            }`}
                        >
                          {tab.label}

                          {activeTab === tab.id && (
                            <span className="absolute left-0 bottom-0 h-[2px] w-full bg-primary rounded-full" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                <div ref={overviewRef}>
                  <VehicleOverviewMain vehicle={vehicleOverview} />
                </div>

                <div ref={specificationRef}>
                  <VehicleOverview vehicle={vehicleOverview} open={isSpecOpen} setOpen={setIsSpecOpen} />
                </div>

                <div ref={conditionRef}>
                  <VehicleCondition
                    vehicle={vehicleOverview}
                    open={isConditionOpen}
                    setOpen={setIsConditionOpen}
                  />
                </div>

                <div ref={inspectionRef}>
                  <VehicleSpec
                    vehicle={vehicleOverview}
                    open={isInspectionOpen}
                    setOpen={setIsInspectionOpen}
                  />
                </div>
              </div>

              <aside className="flex flex-col gap-6 lg:sticky lg:top-[102px] h-fit">
                <VehicleSummaryRight vehicle={vehicleOverview} summary={vehicleSummary} />
                <Testimonials summary={vehicleSummary} />
                <SpecialOffer />
              </aside>
            </section>
          </section>
          <section className="pt-12 flex flex-col gap-12">
            <SimulerVehicle vehicleOverview={vehicleOverview} />
            <ReletedConsualt limit={4} vehicleOverview={vehicleOverview} vehicleSummary={vehicleSummary} />
          </section>
        </div>
      </main>
    </>
  );
}
