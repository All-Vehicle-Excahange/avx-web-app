"use client";

import {useEffect, useRef, useState} from "react";

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
import overview from "@/pages/consult/dashboard/overview";
import VehicleOverviewMain from "./VehicleOverviewMain";


import {useParams} from "next/navigation";
import {getVehicleOverview, getVehicleSummary} from "@/services/vehicle.service";

export default function VehicleDetails() {
  const specificationRef = useRef(null);
  const conditionRef = useRef(null);
  const inspectionRef = useRef(null);
  const overviewRef = useRef(null);
  const [isConditionOpen, setIsConditionOpen] = useState(false);
  const [isSpecOpen, setIsSpecOpen] = useState(false);
  const [isInspectionOpen, setIsInspectionOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  const NAVBAR_OFFSET = 210;

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

    const top =
      ref.current.getBoundingClientRect().top + window.scrollY - NAVBAR_OFFSET;

    window.scrollTo({
      top,
      behavior: "smooth",
    });
  };
  const params = useParams();
  const id = params.id;
  const [vehicleOverview, setVehicleOverview] = useState({});
  const  [vehicleSummary, setVehicleSummary] = useState({});

  useEffect(() => {
    const  fetchOverview = async () => {
      try {
        const  res = await  getVehicleOverview(id)
        setVehicleOverview(res.data)
      }catch (error) {
        console.log(error);
      }
    }
    fetchOverview();
  }, [id])

  useEffect(() => {
    const  fetchSummary = async () => {
      try {
        const  res = await  getVehicleSummary(id)
        setVehicleSummary(res.data)
      }catch (error) {
        console.log(error);
      }
    }
    if (id) {
      fetchSummary();
    }
  }, [id])


  return (
    <>
      <div className="fixed top-0 inset-x-0 z-1000">
        <Navbar heroMode scrolled={true} />
      </div>

      <main className=" text-secondary w-full">
        <div className="w-full py-6">
          {/* HEADER */}
          <section className="relative">
            <div className="sticky top-16 pb-4 z-40 ">
              <VehicleHeader vehicle={vehicleOverview} />
            </div>

            <section className="grid grid-cols-1 xl:grid-cols-[2.2fr_1fr] gap-6 items-start">
              <div className="flex flex-col gap-6 min-w-0">
                <VehicleImageGallery vehicle={vehicleOverview} />

                <div className="">
                  <div className="flex gap-8 border-b border-third/40">
                    {[
                      {
                        id: "overview",
                        label: "Overview",
                        ref: overviewRef,
                      },
                      {
                        id: "specification",
                        label: "Specifications",
                        ref: specificationRef,
                      },
                      {
                        id: "condition",
                        label: "Condition",
                        ref: conditionRef,
                      },
                      {
                        id: "inspection",
                        label: "Inspection",
                        ref: inspectionRef,
                      },
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => scrollToSection(tab.ref, tab.id)}
                        className={`relative pb-3 text-sm font-medium transition-colors cursor-pointer
                        ${
                          activeTab === tab.id
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
                </div>

                <div ref={overviewRef}>
                  <VehicleOverviewMain vehicle={vehicleOverview} />
                </div>

                <div ref={specificationRef}>
                  <VehicleOverview open={isSpecOpen} setOpen={setIsSpecOpen} />
                </div>

                <div ref={conditionRef}>
                  <VehicleCondition
                    open={isConditionOpen}
                    setOpen={setIsConditionOpen}
                  />
                </div>

                <div ref={inspectionRef}>
                  <VehicleSpec
                    open={isInspectionOpen}
                    setOpen={setIsInspectionOpen}
                  />
                </div>
              </div>

              <aside className="flex flex-col gap-6 lg:sticky lg:top-[102px] h-fit">
                <VehicleSummaryRight vehicle={vehicleOverview} summary={vehicleSummary} />
                <Testimonials summary={vehicleSummary}  />
                <SpecialOffer />
              </aside>
            </section>
          </section>
          <section className="pt-12 flex flex-col gap-12">
            <SimulerVehicle />
            <AutoConsultPicsSection limit={4} />
          </section>
        </div>
      </main>
    </>
  );
}
