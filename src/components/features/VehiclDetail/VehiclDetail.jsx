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

import { useRouter } from "next/router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getVehicleOverviewQuery,
  getVehicleSummaryQuery,
  getVehicleInspectionDetailsQuery,
  getActiveInspectionQuery,
} from "@/queries/vehicle.queries";
import ReletedConsualt from "./ReletedConsualt";
import SeoInternalLinkHub from "./SeoInternalLinkHub";
import VehicleDetailsSkeleton from "@/components/ui/skeleton/VehicleDetailsSkeleton";
import SpecialOffer from "./SpecialOffer";
import InspectionTrackingModal from "@/components/features/user/InspectionTrackingModal";
import toast from "react-hot-toast";

export default function VehicleDetails({
  initialOverview = null,
  initialSummary = null,
}) {
  const specificationRef = useRef(null);
  const conditionRef = useRef(null);
  const inspectionRef = useRef(null);
  const overviewRef = useRef(null);
  const headerRef = useRef(null);
  const [headerHeight, setHeaderHeight] = useState(120);
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
  const router = useRouter();
  const queryClient = useQueryClient();
  const id = router.query?.id;
  const sponsored = router.query?.sponsored;
  const billingType = router.query?.billingType;
  const adId = router.query?.adId;

  const { data: vehicleOverview, isLoading: isOverviewLoading } = useQuery({
    ...getVehicleOverviewQuery(id),
    initialData: initialOverview || undefined,
    enabled: !!id,
  });

  const ownerRole = vehicleOverview?.vehicleOwner?.userRole;
  const isConsultation = ownerRole === "CONSULTATION";

  const { data: vehicleSummaryData, isLoading: isSummaryLoading } = useQuery({
    ...getVehicleSummaryQuery(id),
    initialData: initialSummary || undefined,
    enabled: !!id && isConsultation,
  });

  const { data: inspectionDetails } = useQuery({
    ...getVehicleInspectionDetailsQuery(id),
    enabled: !!id && (isConditionOpen || isInspectionOpen),
  });

  const [trackingInspection, setTrackingInspection] = useState(null);
  const [animateTrackingModal, setAnimateTrackingModal] = useState(false);
  const [isCheckingInspection, setIsCheckingInspection] = useState(false);
  const inspectionSpecsRef = useRef(null);

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

  const vehicleSummary = vehicleSummaryData || {};
  const loading = isOverviewLoading || (isConsultation && isSummaryLoading);

  useEffect(() => {
    if (!headerRef.current) return;
    const updateHeight = () => {
      if (headerRef.current) {
        setHeaderHeight(headerRef.current.offsetHeight);
      }
    };
    updateHeight();
    const observer = new ResizeObserver(updateHeight);
    observer.observe(headerRef.current);
    return () => observer.disconnect();
  }, [loading]);

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
            <div ref={headerRef} className="lg:sticky top-16 md:pb-4 z-40">
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
                  <VehicleSpec
                    ref={inspectionSpecsRef}
                    vehicle={vehicleOverview}
                    open={isInspectionOpen}
                    setOpen={setIsInspectionOpen}
                    inspectionDetails={inspectionDetails}
                  />
                </div>
              </div>

              <aside
                className="flex flex-col gap-6 lg:sticky h-fit"
                style={{ top: `${64 + headerHeight}px` }}
              >
                <VehicleSummaryRight
                  vehicle={vehicleOverview}
                  summary={vehicleSummary}
                  adId={adId}
                  sponsored={sponsored}
                  billingType={billingType}
                  onRequestInspection={handleRequestInspection}
                  isCheckingInspection={isCheckingInspection}
                />
                <Testimonials summary={vehicleSummary} />
                <SpecialOffer />
              </aside>
            </section>
          </section>
          <section className="pt-12 flex flex-col gap-12">
            <SimulerVehicle vehicleOverview={vehicleOverview} />
            <ReletedConsualt
              limit={4}
              vehicleOverview={vehicleOverview}
              vehicleSummary={vehicleSummary}
            />
            <SeoInternalLinkHub
              vehicleOverview={vehicleOverview}
              vehicleSummary={vehicleSummary}
            />
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
