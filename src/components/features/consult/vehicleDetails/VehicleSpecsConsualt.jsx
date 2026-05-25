"use client";
import { useState, forwardRef, useImperativeHandle } from "react";
import FeatureGroup from "@/components/ui/FeatureGroup";
import { ChevronDown } from "lucide-react";
import Button from "@/components/ui/button";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { getActiveInspectionQuery } from "@/queries/vehicle.queries";
import InspectionTrackingModal from "@/components/features/user/InspectionTrackingModal";
import InspectionRequestModal from "@/components/features/user/InspectionRequestModal";

const VehicleSpecsConsualt = forwardRef(function VehicleSpecsConsualt({ open, setOpen, vehicle }, ref) {
  const queryClient = useQueryClient();
  const [showModal, setShowModal] = useState(false);
  const [inspectionType, setInspectionType] = useState("report");
  const [trackingInspection, setTrackingInspection] = useState(null);
  const [animateTrackingModal, setAnimateTrackingModal] = useState(false);
  const [isCheckingActiveInspection, setIsCheckingActiveInspection] = useState(false);

  const inspectionAvailable = true;

  useImperativeHandle(ref, () => ({
    openModal: handleOpenModal,
  }));

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

  const handleOpenModal = async () => {
    if (!vehicle?.id) {
      toast.error("Vehicle information is not available.");
      return;
    }
    setIsCheckingActiveInspection(true);
    try {
      const data = await queryClient.fetchQuery(
        getActiveInspectionQuery(vehicle.id),
      );
      if (data) {
        if (data.inspectionRequestStatus === "PAYMENT_PENDING") {
          setShowModal(true);
        } else {
          handleOpenTracking(data);
        }
      } else {
        setShowModal(true);
      }
    } catch (error) {
      if (error?.response?.status === 404 || error?.status === 404) {
        setShowModal(true);
      } else {
        toast.error(
          error?.response?.data?.message ||
            "Failed to check inspection status.",
        );
      }
    } finally {
      setIsCheckingActiveInspection(false);
    }
  };

  return (
    <section className="relative rounded-2xl overflow-hidden text-primary border border-third/60">
      <div className="relative z-10">
        <div
          className="flex justify-between items-center px-6 py-3 text-primary cursor-pointer"
          onClick={() => setOpen((prev) => !prev)}
        >
          <h3 className="text-xl font-semibold">Reecomm Inspection Report</h3>
          <div className="text-xl">
            <ChevronDown
              size={20}
              className={`transition-transform duration-300 ${
                open ? "rotate-180" : "rotate-0"
              }`}
            />
          </div>
        </div>
        <div
          className={`grid transition-all duration-300 ease-in-out ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
        >
          <div className="overflow-hidden">
            <div className="mt-3 space-y-8">
              {/* ================= AVX INSPECTION REPORT ================= */}
              <div className="space-y-6 px-6 pb-6">
                {inspectionAvailable ? (
                  <>
                    <p className="text-xs text-third font-normal mt-1">
                      Reecomm Inspection Available Last verified on: 12 Jan 2025
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                      <FeatureGroup
                        title="SAFETY"
                        items={["Side airbags", "Airbags"]}
                      />

                      <FeatureGroup
                        title="COMFORT & CONVENIENCE"
                        items={[
                          "Puddle lamp",
                          "Cruise control",
                          "Ventilated seats",
                          "Keyless start",
                          "Wireless phone charging",
                        ]}
                      />

                      <FeatureGroup title="EXTERIOR" items={["Sunroof"]} />
                    </div>
                    <div className="flex justify-end">
                      <Button variant="outline" showIcon={true} locked={true}>
                        View Inspection Report
                      </Button>
                    </div>
                    <div className="md:col-span-3 border-t border border-third/40" />
                    <div>
                      <h3 className="text-xl font-semibold">
                        Reecomm Inspection Available
                      </h3>
                    </div>
                    <div>
                      <h3 className="text-lg font-normal">
                        Want extra assurance before booking?
                      </h3>
                      <p className="text-sm text-primary font-normal mt-1">
                        You can request a fresh inspection or a live video
                        walkthrough for added confidence.
                      </p>
                    </div>
                    {/* Inspection Type */}
                    <div className="space-y-3">
                      <p className="text-sm font-medium">
                        Choose inspection type
                      </p>

                      <div className="space-y-3">
                        {/* Only Report */}
                        <label
                          className={`
                            flex items-start gap-3 p-4 rounded-xl border cursor-pointer
                            transition-all
                            ${
                              inspectionType === "report"
                                ? "border-primary bg-primary/5"
                                : "border-third/40 hover:bg-secondary/80"
                            }
                          `}
                        >
                          <input
                            type="radio"
                            name="inspection"
                            value="report"
                            checked={inspectionType === "report"}
                            onChange={() => setInspectionType("report")}
                            className="mt-1 accent-primary"
                          />

                          <div className="flex-1">
                            <p className="text-sm font-semibold">
                              Inspection Report Only
                            </p>
                            <p className="text-xs text-third mt-0.5">
                              Complete physical inspection with digital report
                            </p>
                            <p className="text-sm font-medium mt-1">₹1,499</p>
                          </div>
                        </label>
                        {/* Video Call + Report */}
                        <label
                          className={`
                            flex items-start gap-3 p-4 rounded-xl border cursor-pointer
                            transition-all
                            ${
                              inspectionType === "video"
                                ? "border-primary bg-primary/5"
                                : "border-third/40 hover:bg-secondary/80"
                            }
                          `}
                        >
                          <input
                            type="radio"
                            name="inspection"
                            value="video"
                            checked={inspectionType === "video"}
                            onChange={() => setInspectionType("video")}
                            className="mt-1 accent-primary"
                          />

                          <div className="flex-1">
                            <p className="text-sm font-semibold">
                              Personalize Video Call + Inspection Report
                            </p>
                            <p className="text-xs text-third mt-0.5">
                              Live video walkthrough with inspector + detailed
                              digital report
                            </p>
                            <p className="text-sm font-medium mt-1">₹1,999</p>
                          </div>
                        </label>
                      </div>
                    </div>
                    <div className="flex flex-col gap-3 md:flex-row justify-between items-center">
                      <p className="text-sm text-primary font-normal mt-1">
                        Recommended for high-value vehicles
                      </p>
                      <div>
                        <Button
                          variant="outline"
                          size="sm"
                          showIcon={false}
                          onClick={handleOpenModal}
                          loading={isCheckingActiveInspection}
                        >
                          Request New Reecomm Inspection
                        </Button>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="space-y-3">
                    {/* Status */}
                    <div className="flex items-center gap-2 text-sm">
                      <span className="px-2 py-0.5 rounded-full bg-yellow-500/15 text-yellow-400 font-medium">
                        Inspection not available
                      </span>
                    </div>

                    {/* Heading */}
                    <div>
                      <p className="text-lg font-semibold text-primary">
                        Want deeper verification before deciding?
                      </p>
                      <p className="text-sm text-third mt-1">
                        Request a fresh Reecomm inspection to get a complete
                        picture of the vehicle’s condition.
                      </p>
                    </div>

                    {/* Benefits */}
                    <div className="rounded-lg bg-secondary/80 border border-third/30 p-4">
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-primary">
                        <li>✔ 200+ point physical inspection</li>
                        <li>✔ Engine, transmission & structure check</li>
                        <li>✔ Odometer & flood verification</li>
                        <li>✔ Detailed digital inspection report</li>
                      </ul>
                    </div>

                    {/* Turnaround */}
                    <div className="flex items-center justify-between text-sm">
                      <p className="font-medium text-primary">
                        Inspection within{" "}
                        <span className="font-semibold">24–48 hours</span>
                      </p>
                      <p className="text-third text-xs">
                        Fee adjusted if you purchase
                      </p>
                    </div>

                    {/* CTA */}
                    <div className="flex justify-end">
                      <Button
                        variant="outline"
                        size="md"
                        showIcon={false}
                        onClick={handleOpenModal}
                        loading={isCheckingActiveInspection}
                      >
                        Request Reecomm Inspection
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <InspectionRequestModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        vehicle={vehicle}
        initialInspectionType={inspectionType}
      />

      {trackingInspection && (
        <InspectionTrackingModal
          inspection={trackingInspection}
          onClose={handleCloseTracking}
          animateModal={animateTrackingModal}
        />
      )}
    </section>
  );
});

export default VehicleSpecsConsualt;
