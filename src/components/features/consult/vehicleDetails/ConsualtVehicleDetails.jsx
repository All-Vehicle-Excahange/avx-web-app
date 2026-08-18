"use client";

import { useRef, useState, useLayoutEffect } from "react";

// TOP
import VehicleHeader from "../../VehiclDetail/VehicleHeader";
import VehicleImageGallery from "../../VehiclDetail/VehicleImageGallery";

// LEFT
import VehicleOverview from "../../VehiclDetail/VehicleOverview";
import VehicleCondition from "../../VehiclDetail/VehicleCondition";

// RIGHT
import Navbar from "@/components/layout/Navbar";
import VehicleOverviewMain from "../../VehiclDetail/VehicleOverviewMain";

import { useRouter } from "next/router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getVehicleOverviewQuery,
  getVehicleSummaryQuery,
  getActiveInspectionQuery,
  getVehicleInspectionDetailsQuery,
} from "@/queries/vehicle.queries";
import toast from "react-hot-toast";

import VehicleDetailsSkeleton from "@/components/ui/skeleton/VehicleDetailsSkeleton";
import SummaryRight from "./SummaryRight";
import VehicleSpecsConsualt from "./VehicleSpecsConsualt";
import InspectionTrackingModal from "../../user/InspectionTrackingModal";
import { useEffect } from "react";
import { event } from "@/lib/fpixel";

export default function ConsualtVehicleDetails({
  initialOverview = null,
  initialSummary = null,
}) {
  const specificationRef = useRef(null);
  const conditionRef = useRef(null);
  const inspectionRef = useRef(null);
  const overviewRef = useRef(null);
  const inspectionSpecsRef = useRef(null);
  const queryClient = useQueryClient();
  const [isConditionOpen, setIsConditionOpen] = useState(false);
  const [isSpecOpen, setIsSpecOpen] = useState(false);
  const [isInspectionOpen, setIsInspectionOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  const [trackingInspection, setTrackingInspection] = useState(null);
  const [animateTrackingModal, setAnimateTrackingModal] = useState(false);
  const [isCheckingInspection, setIsCheckingInspection] = useState(false);
  const trackedVehicleIdRef = useRef(null);

  const handleOpenTracking = (data) => {
    setTrackingInspection(data);
    setTimeout(() => setAnimateTrackingModal(true), 10);
  };

  const handleCloseTracking = () => {
    setAnimateTrackingModal(false);
    setTimeout(() => {
      setTrackingInspection(null);
    }, 300);
  };

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

  const handleRequestInspection = async () => {
    if (!id) return;
    setIsCheckingInspection(true);
    try {
      const data = await queryClient.fetchQuery(getActiveInspectionQuery(id));
      if (data) {
        if (data.inspectionRequestStatus === "PAYMENT_PENDING") {
          if (inspectionSpecsRef.current) {
            inspectionSpecsRef.current.openModal();
          }
        } else {
          handleOpenTracking(data);
        }
      } else {
        if (inspectionSpecsRef.current) {
          inspectionSpecsRef.current.openModal();
        }
      }
    } catch (error) {
      if (error?.response?.status === 404 || error?.status === 404) {
        if (inspectionSpecsRef.current) {
          inspectionSpecsRef.current.openModal();
        }
      } else {
        toast.error(
          error?.response?.data?.message ||
            "Failed to check inspection status.",
        );
      }
    } finally {
      setIsCheckingInspection(false);
    }
  };

  const router = useRouter();
  const id = router.query.id;

  const { data: vehicleOverview, isLoading: isOverviewLoading } = useQuery({
    ...getVehicleOverviewQuery(id),
    initialData: initialOverview || undefined,
    enabled: !!id,
  });

  const { data: inspectionDetails } = useQuery({
    ...getVehicleInspectionDetailsQuery(id),
    enabled: !!id,
  });

  const ownerRole = vehicleOverview?.vehicleOwner?.userRole;
  const isConsultation = ownerRole === "CONSULTATION";

  const { data: vehicleSummaryData, isLoading: isSummaryLoading } = useQuery({
    ...getVehicleSummaryQuery(id),
    initialData: initialSummary || undefined,
    enabled: !!id && isConsultation,
  });

  const vehicleSummary = vehicleSummaryData || {};
  const loading = isOverviewLoading || (isConsultation && isSummaryLoading);

  useEffect(() => {
    if (vehicleOverview?.id && trackedVehicleIdRef.current !== vehicleOverview.id) {
      trackedVehicleIdRef.current = vehicleOverview.id;
      const vehicleName = `${vehicleOverview.yearOfMfg || ""} ${vehicleOverview.makerName || ""} ${vehicleOverview.modelName || ""} ${vehicleOverview.variantName || ""}`.trim();
      event("ViewContent", {
        content_type: "vehicle",
        content_ids: [String(vehicleOverview.id)],
        content_name: vehicleName || "Vehicle Details",
        value: Number(vehicleOverview.price) || 0,
        currency: "INR",
      });
    }
  }, [vehicleOverview?.id]);

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
              <VehicleHeader
                vehicle={vehicleOverview}
                vehicleSummary={vehicleSummary}
              />
            </div>

            <section className="grid grid-cols-1 xl:grid-cols-[2.2fr_1fr] gap-6 items-start">
              <div className="flex flex-col gap-6 min-w-0">
                <VehicleImageGallery vehicle={vehicleOverview} />

                <div className="sticky top-16 lg:relative lg:top-0 lg:z-auto z-40 bg-transparent backdrop-blur-lg border-b border-third/40">
                  <div className="overflow-x-auto scrollbar-hide">
                    <div className="flex gap-6 px-2 min-w-max">
                      {[
                        { id: "overview", label: "Overview", ref: overviewRef },
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
                          className={`relative cursor-pointer py-3 text-sm font-medium whitespace-nowrap transition-colors
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
                </div>
                <div ref={overviewRef}>
                  <VehicleOverviewMain vehicle={vehicleOverview} />
                </div>

                <div ref={specificationRef}>
                  <VehicleOverview
                    vehicle={vehicleOverview}
                    open={isSpecOpen}
                    setOpen={setIsSpecOpen}
                  />
                </div>

                <div ref={conditionRef}>
                  <VehicleCondition
                    vehicle={vehicleOverview}
                    open={isConditionOpen}
                    setOpen={setIsConditionOpen}
                    inspectionDetails={inspectionDetails}
                  />
                </div>

                <div ref={inspectionRef}>
                  <VehicleSpecsConsualt
                    ref={inspectionSpecsRef}
                    vehicle={vehicleOverview}
                    open={isInspectionOpen}
                    setOpen={setIsInspectionOpen}
                    inspectionDetails={inspectionDetails}
                  />
                </div>
              </div>

              <aside className="flex flex-col gap-6 lg:sticky lg:top-[102px] h-fit">
                <SummaryRight
                  vehicle={vehicleOverview}
                  summary={vehicleSummary}
                  onRequestInspection={handleRequestInspection}
                  isCheckingInspection={isCheckingInspection}
                />
              </aside>
            </section>
          </section>
        </div>
      </main>

      {trackingInspection && (
        <InspectionTrackingModal
          inspection={trackingInspection}
          onClose={handleCloseTracking}
          animateModal={animateTrackingModal}
          vehicle={vehicleOverview}
        />
      )}
    </>
  );
}
