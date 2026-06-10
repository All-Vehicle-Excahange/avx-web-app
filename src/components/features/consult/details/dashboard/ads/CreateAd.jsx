import React, { useState } from "react";
import { useRouter } from "next/router";
import {
  X,
  ArrowRight,
  ArrowLeft,
  Check,
  Sparkles,
  Rocket,
} from "lucide-react";
import Button from "@/components/ui/button";
import toast from "react-hot-toast";
import {
  createCampion,
  finalSubmit,
  getCampaignsDetails,
  updateCampaign,
} from "@/services/ppc.service";
import { getVehicleOverview } from "@/services/vehicle.service";
import { useEffect } from "react";

// Step Components
import TypeStep from "./components/TypeStep";
import PlacementStep from "./components/PlacementStep";
import BillingStep from "./components/BillingStep";
import VehicleStep from "./components/VehicleStep";
import BudgetStep from "./components/BudgetStep";
import ReviewStep from "./components/ReviewStep";
import SummaryPanel from "./components/SummaryPanel";

export default function CreateAd() {
  const { query, push } = useRouter();
  const campaignIdParam = query?.campaignId;
  const [curStep, setCurStep] = useState(1);
  const [isLaunching, setIsLaunching] = useState(false);
  const [isLaunched, setIsLaunched] = useState(false);
  const [isLoadingDraft, setIsLoadingDraft] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  // Campaign State
  const [state, setState] = useState({
    campaignId: null,
    name: "",
    campaignType: "vehicle", // "vehicle" or "profile"
    placement: [],
    billing: null,
    vehicle: null,
    dailyBudget: 500,
    maxBid: 8,
    startDate: new Date().toISOString().split("T")[0],
    endDate: (() => {
      const d = new Date();
      d.setDate(d.getDate() + 30);
      return d.toISOString().split("T")[0];
    })(),
    activeDays: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  });

  useEffect(() => {
    if (campaignIdParam) {
      setIsLoadingDraft(true);
      getCampaignsDetails(campaignIdParam)
        .then((res) => {
          const adData = Array.isArray(res) 
            ? res[0] 
            : Array.isArray(res?.data) 
              ? res.data[0] 
              : res?.data || res;
          
          if (adData) {
            const revMapping = {
              "HOMEPAGE_FEATURED": "Homepage featured",
              "SEARCH_RESULT_PAGE": "Search result page",
              "VEHICLE_DETAIL_PAGE": "Vehicle detail page"
            };
            
            const statusVal = adData.status || adData.ppcStatus || adData.adStatus;
            const isEdit = statusVal && statusVal.toUpperCase() !== "DRAFT";
            setIsEditMode(isEdit);

            setState((prev) => ({
              ...prev,
              campaignId: adData.campaignId || campaignIdParam || prev.campaignId,
              name: adData.name || prev.name,
              campaignType: adData.campaignType
                ? (adData.campaignType.toUpperCase() === "STOREFRONT" || adData.campaignType.toUpperCase() === "PROFILE" ? "profile" : "vehicle")
                : prev.campaignType,
              placement: adData.placementTypes 
                ? adData.placementTypes.map(p => revMapping[p] || p)
                : prev.placement,
              billing: adData.billingType || prev.billing,
              vehicle: adData.vehicleId ? { id: adData.vehicleId } : prev.vehicle,
              dailyBudget: adData.adDailySpendLimit || adData.dailyBudget || prev.dailyBudget,
              maxBid: adData.maxCpcBid || adData.bidAmount || prev.maxBid,
              startDate: adData.startDate ? adData.startDate.split("T")[0] : prev.startDate,
              endDate: adData.endDate ? adData.endDate.split("T")[0] : prev.endDate,
            }));

            if (adData.vehicleId) {
              getVehicleOverview(adData.vehicleId)
                .then((vehRes) => {
                  const vehData = vehRes?.data || vehRes;
                  if (vehData) {
                    setState((prev) => ({
                      ...prev,
                      vehicle: {
                        id: adData.vehicleId,
                        name: `${vehData.makerName || "-"} ${vehData.modelName || "-"} ${vehData.variantName || ""}`,
                        meta: `${vehData.yearOfMfg || "-"} · ${vehData.fuelType || "-"} · ${vehData.transmissionType || "-"}`,
                        raw: vehData
                      }
                    }));
                  }
                })
                .catch((err) => {
                  console.error("Failed to load vehicle details in edit:", err);
                });
            }
            
            if (adData.draftStep) {
              setCurStep(adData.draftStep);
            } else {
              setCurStep(5);
            }
          }
        })
        .catch((err) => {
          console.error("Failed to load campaign details:", err);
        })
        .finally(() => {
          setIsLoadingDraft(false);
        });
    }
  }, [campaignIdParam]);

  // Handle Placement Selection with Auto-Billing Pre-selection
  const handlePlacementChange = (placementVal) => {
    setState((prev) => {
      const currentPlacements = prev.placement || [];
      const isSelected = currentPlacements.includes(placementVal);
      const nextPlacements = isSelected
        ? currentPlacements.filter((p) => p !== placementVal)
        : [...currentPlacements, placementVal];

      // Auto-preselect billing type based on the updated placements array
      let billingVal = prev.billing;
      const cpcOnly = ["Homepage featured", "Consultant profile page"];
      const cpiOnly = ["Vehicle detail page"];

      const hasCPC = nextPlacements.some((p) => cpcOnly.includes(p));
      const hasCPI = nextPlacements.some((p) => cpiOnly.includes(p));
      const hasBoth = nextPlacements.some((p) => p === "Search result page");

      if (nextPlacements.length === 0) {
        billingVal = null;
      } else if (hasCPC && !hasCPI && !hasBoth) {
        billingVal = "CPC";
      } else if (hasCPI && !hasCPC && !hasBoth) {
        billingVal = "CPI";
      } else if (hasCPC && hasCPI) {
        billingVal = "CPC";
      } else if (hasBoth) {
        billingVal = "CPC";
      }

      return {
        ...prev,
        placement: nextPlacements,
        billing: billingVal,
      };
    });
  };

  const handleBillingChange = (billingVal) => {
    setState((prev) => ({ ...prev, billing: billingVal }));
  };

  const handleVehicleChange = (vehicleVal) => {
    setState((prev) => ({ ...prev, vehicle: vehicleVal }));
  };

  // Navigations
  const goBack = () => {
    if (curStep === 5 && state.campaignType === "profile") {
      setCurStep(3);
    } else if (curStep > 1) {
      setCurStep((prev) => prev - 1);
    }
  };

  const goNext = async () => {
    const nextStep = curStep === 3 && state.campaignType === "profile" ? 5 : curStep + 1;

    if (curStep < 6) {
      if (!isEditMode) {
        try {
          const placementMapping = {
            "Homepage featured": "HOMEPAGE_FEATURED",
            "Search result page": "SEARCH_RESULT_PAGE",
            "Consultant profile page": "HOMEPAGE_FEATURED",
            "Vehicle detail page": "VEHICLE_DETAIL_PAGE",
          };

          // Dynamically build payload based on what fields are filled up to current step
          const payload = {
            campaignId: campaignIdParam || state.campaignId || null,
            name: state.name,
            campaignType: state.campaignType === "profile" ? "STOREFRONT" : state.campaignType.toUpperCase(),
            draftStep: nextStep,
          };

          if (state.placement && state.placement.length > 0) {
            payload.placementTypes = state.placement.map((p) => placementMapping[p] || p);
          }
          if (state.billing) {
            payload.billingType = state.billing;
          }
          if (state.campaignType === "vehicle" && state.vehicle?.id) {
            payload.vehicleId = state.vehicle.id;
          }
          if (curStep >= 5 || (campaignIdParam && state.dailyBudget)) {
            payload.dailyBudget = Number(state.dailyBudget);
            payload.bidAmount = Number(state.maxBid);
            payload.startDate = state.startDate;
            payload.endDate = state.endDate;
          }

          const res = await createCampion(payload);
          const savedCampaignId = res?.campaignId || res?.data?.campaignId || res?.data?.data?.campaignId || res?.id || res?.data?.id || res?.data?.data?.id;
          if (savedCampaignId) {
            setState((prev) => ({ ...prev, campaignId: savedCampaignId }));
          }
        } catch (error) {
          console.error("Failed to auto-save draft:", error);
        }
      }
      setCurStep(nextStep);
    } else {
      // Launch / Update Campaign
      setIsLaunching(true);
      try {
        const placementMapping = {
          "Homepage featured": "HOMEPAGE_FEATURED",
          "Search result page": "SEARCH_RESULT_PAGE",
          "Consultant profile page": "HOMEPAGE_FEATURED",
          "Vehicle detail page": "VEHICLE_DETAIL_PAGE",
        };
        const payload = {
          campaignId: campaignIdParam || state.campaignId || null,
          name: state.name,
          campaignType: state.campaignType === "profile" ? "STOREFRONT" : state.campaignType.toUpperCase(),
          placementTypes: state.placement.map((p) => placementMapping[p] || p),
          billingType: state.billing,
          vehicleId: state.campaignType === "vehicle" ? state.vehicle?.id : null,
          dailyBudget: Number(state.dailyBudget),
          bidAmount: Number(state.maxBid),
          startDate: state.startDate,
          endDate: state.endDate,
          draftStep: 6,
        };

        if (isEditMode) {
          const campaignId = campaignIdParam || state.campaignId;
          await updateCampaign(campaignId, payload);
          setIsLaunched(true);
          toast.success("Campaign updated successfully");
          // After 1.5 seconds, redirect back to PPC dashboard
          setTimeout(() => {
            push("/consult/dashboard/ppc");
          }, 1550);
        } else {
          const res = await createCampion(payload);
          const campaignId = res?.campaignId || res?.data?.campaignId || res?.data?.data?.campaignId || res?.id || res?.data?.id || res?.data?.data?.id || state.campaignId;

          if (campaignId) {
            await finalSubmit(campaignId, payload);
            setIsLaunched(true);
            toast.success("Campaign launched successfully");
            // After 1.5 seconds, redirect back to PPC dashboard
            setTimeout(() => {
              push("/consult/dashboard/ppc");
            }, 1550);
          } else {
            throw new Error("Failed to get campaign ID from draft response");
          }
        }
      } catch (error) {
        console.error("Failed to launch/update boost campaign:", error);
        toast.error(isEditMode ? "Failed to update campaign" : "Failed to launch campaign");
      } finally {
        setIsLaunching(false);
      }
    }
  };

  const handleClose = () => {
    push("/consult/dashboard/ppc");
  };

  // Validation per step
  const isStepValid = () => {
    switch (curStep) {
      case 1:
        return (
          state.campaignType !== null && state.name && state.name.trim() !== ""
        );
      case 2:
        return state.placement && state.placement.length > 0;
      case 3:
        return state.billing !== null;
      case 4:
        return state.campaignType === "profile" || state.vehicle !== null;
      case 5:
        return (
          state.dailyBudget >= 100 &&
          state.maxBid >= 1 &&
          state.startDate !== "" &&
          state.endDate !== "" &&
          state.activeDays.length > 0
        );
      case 6:
        return true;
      default:
        return false;
    }
  };

  if (isLoadingDraft) {
    return (
      <div className="w-full h-96 flex items-center justify-center text-primary">
        <div className="text-center space-y-4">
          <div className="w-8 h-8 border-4 border-fourth border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-sm text-third">Loading campaign draft details...</p>
        </div>
      </div>
    );
  }

  // Step names for stepper
  const steps = [
    { num: 1, label: "Boost type" },
    { num: 2, label: "Placement" },
    { num: 3, label: "Billing type" },
    ...(state.campaignType === "vehicle"
      ? [{ num: 4, label: "Select vehicle" }]
      : []),
    { num: 5, label: "Budget & schedule" },
    { num: 6, label: "Review" },
  ];

  return (
    <div className="w-full space-y-8 text-primary">
      {/* Page Header */}
      <div className="flex items-start justify-between gap-5">
        <div>
          <h1 className="text-2xl font-bold">Create new boost</h1>
          <p className="text-third text-sm mt-1">
            Set up a PPC campaign to increase your vehicle visibility
          </p>
        </div>
        <button
          onClick={handleClose}
          aria-label="Close"
          className="w-8 h-8 rounded-full border border-third/30 bg-transparent hover:bg-white/10 hover:border-third/50 transition-all flex items-center justify-center text-third hover:text-primary cursor-pointer mt-1"
        >
          <X size={16} />
        </button>
      </div>

      {/* Stepper Wizard Container (Clean, Spacious, No outer borders!) */}
      <div className="w-full space-y-6 ">
        {/* Stepper Header (Floating Header with no bottom border) */}
        <div className="w-full flex items-start justify-between pb-8 bg-transparent relative">
          {steps.map((step, idx) => {
            const isActive = curStep === step.num;
            const isDone = curStep > step.num;

            return (
              <div
                key={step.num}
                className="flex-1 flex flex-col items-center relative"
              >
                {/* Horizontal Line connector */}
                {idx < steps.length - 1 && (
                  <div
                    className={`absolute top-3.5 left-[50%] right-[-50%] h-[3px] transition-colors duration-500 z-0 ${
                      isDone ? "bg-primary" : "bg-third/20"
                    }`}
                  />
                )}

                {/* Circle step number */}
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 relative z-10 ${
                    isDone
                      ? "bg-primary text-secondary"
                      : isActive
                        ? "bg-primary text-secondary ring-4 ring-primary/20"
                        : "bg-white/5 border border-third/30 text-third"
                  }`}
                >
                  {isDone ? <Check size={14} strokeWidth={3} /> : step.num}
                </div>

                {/* Step name in next line */}
                <span
                  className={`text-[10px] md:text-xs font-semibold mt-2.5 text-center transition-colors duration-300 max-w-[90px] relative z-10 ${
                    isActive
                      ? "text-primary"
                      : isDone
                        ? "text-primary/80"
                        : "text-third"
                  }`}
                >
                  {step.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Two-Column Spacious Body Area (Form Details on Left, Summary Panel on Right) */}
        <div className="flex border border-primary/40 rounded-2xl  p-6 flex-col lg:flex-row gap-10 lg:gap-14 items-start w-full">
          {/* Left Column: Form Details & Actions */}
          <div className="flex-1 w-full space-y-8 bg-transparent">
            <div className="min-h-[440px] w-full">
              {curStep === 1 && (
                <TypeStep
                  name={state.name || ""}
                  onNameChange={(nameVal) => {
                    setState((prev) => ({
                      ...prev,
                      name: nameVal,
                    }));
                  }}
                  selected={state.campaignType}
                  onChange={(type) => {
                    setState((prev) => ({
                      ...prev,
                      campaignType: type,
                    }));
                  }}
                />
              )}

              {curStep === 2 && (
                <PlacementStep
                  selected={state.placement}
                  onChange={handlePlacementChange}
                  campaignType={state.campaignType}
                />
              )}

              {curStep === 3 && (
                <BillingStep
                  selected={state.billing}
                  onChange={handleBillingChange}
                  placement={state.placement}
                />
              )}

              {curStep === 4 && (
                <VehicleStep
                  selected={state.vehicle}
                  onChange={handleVehicleChange}
                />
              )}

              {curStep === 5 && (
                <BudgetStep
                  dailyBudget={state.dailyBudget}
                  setDailyBudget={(val) =>
                    setState((prev) => ({ ...prev, dailyBudget: val }))
                  }
                  maxBid={state.maxBid}
                  setMaxBid={(val) =>
                    setState((prev) => ({ ...prev, maxBid: val }))
                  }
                  startDate={state.startDate}
                  setStartDate={(val) =>
                    setState((prev) => ({ ...prev, startDate: val }))
                  }
                  endDate={state.endDate}
                  setEndDate={(val) =>
                    setState((prev) => ({ ...prev, endDate: val }))
                  }
                  activeDays={state.activeDays}
                  setActiveDays={(val) =>
                    setState((prev) => ({ ...prev, activeDays: val }))
                  }
                  billing={state.billing}
                />
              )}

              {curStep === 6 && (
                <ReviewStep
                  name={state.name}
                  placement={state.placement}
                  billing={state.billing}
                  vehicle={state.vehicle}
                  dailyBudget={state.dailyBudget}
                  maxBid={state.maxBid}
                  startDate={state.startDate}
                  endDate={state.endDate}
                  activeDays={state.activeDays}
                  campaignType={state.campaignType}
                />
              )}
            </div>

            {/* Footer Area Actions (Clean, margin-topped with no clunky lines) */}
            <div className="flex items-center justify-between pt-6 bg-transparent">
              <Button
                onClick={goBack}
                variant="outlineSecondary"
                size="sm"
                className={curStep === 1 ? "invisible" : ""}
              >
                <ArrowLeft size={14} className="mr-1.5" /> Back
              </Button>

              <span className="text-[11px] font-semibold text-third uppercase tracking-widest">
                Step {steps.findIndex((s) => s.num === curStep) + 1} of{" "}
                {steps.length}
              </span>

              {curStep === 6 ? (
                <Button
                  disabled={isLaunching || isLaunched}
                  onClick={goNext}
                  variant="ghost"
                  size="sm"
                  loading={isLaunching}
                  className="shadow-lg"
                >
                  {isLaunched ? (
                    <>
                      {isEditMode ? "Updated!" : "Launched!"}{" "}
                      <Check size={14} strokeWidth={3} className="ml-1.5" />
                    </>
                  ) : (
                    <>
                      {isEditMode ? "Update Boost" : "Launch Boost"} <Rocket size={14} className="ml-1.5" />
                    </>
                  )}
                </Button>
              ) : (
                <Button
                  disabled={!isStepValid()}
                  onClick={goNext}
                  variant={isStepValid() ? "ghost" : "outlineSecondary"}
                  size="sm"
                  locked={!isStepValid()}
                  className="shadow-lg"
                >
                  Continue <ArrowRight size={14} className="ml-1.5" />
                </Button>
              )}
            </div>
          </div>

          {/* Right Column: Desktop Summary Panel */}
          <SummaryPanel
            placement={state.placement}
            billing={state.billing}
            vehicle={state.vehicle}
            dailyBudget={state.dailyBudget}
            maxBid={state.maxBid}
            campaignType={state.campaignType}
          />
        </div>
      </div>
    </div>
  );
}
