/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import {
  Search,
  MessageCircle,
  ShieldCheck,
  Handshake,
  CheckCircle2,
  Star,
} from "lucide-react";
import RichTextEditor from "../atoms/RichTextEditor";
import EditorInput from "../atoms/EditorInput";
import {
  setWhyBuyHero,
  setWhyBuyStory,
  setWhyBuyVehicleSelection,
  setWhyBuyProcess,
  setWhyBuyInspection,
  setWhyBuyCustomerCommitment,
  setFeaturedReviews,
} from "@/services/theme.service";
import { getAllReviewById } from "@/services/user.service";
import { useEffect, useState } from "react";
import Select from "react-select";
import { WHY_BUY_BASIC_1 } from "@/core/engine/schemas/whybuy/why_buy_basic_1";
import Button from "@/components/ui/button";
import GlobalLoader from "@/components/ui/GlobalLoader";

const SVG_OPTIONS = [
  {
    value: `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"/></svg>`,
    label: "Search",
  },
  {
    value: `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="m336-280 144-144 144 144 56-56-144-144 144-144-56-56-144 144-144-144-56 56 144 144-144 144 56 56ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>`,
    label: "Cancel",
  },
  {
    value: `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M300-360q-25 0-42.5-17.5T240-420v-40h60v40h60v-180h60v180q0 25-17.5 42.5T360-360h-60Zm220 0q-17 0-28.5-11.5T480-400v-40h60v20h80v-40H520q-17 0-28.5-11.5T480-500v-60q0-17 11.5-28.5T520-600h120q17 0 28.5 11.5T680-560v40h-60v-20h-80v40h100q17 0 28.5 11.5T680-460v60q0 17-11.5 28.5T640-360H520Z"/></svg>`,
    label: "Layout",
  },
  {
    value: `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M320-240 80-480l240-240 57 57-184 184 183 183-56 56Zm320 0-57-57 184-184-183-183 56-56 240 240-240 240Z"/></svg>`,
    label: "Code",
  },
  {
    value: `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm-40-360v-240h80v207l154 154-57 57-177-178Z"/></svg>`,
    label: "Clock",
  },
];

const selectStyles = {
  control: (base) => ({
    ...base,
    backgroundColor: "transparent",
    borderColor: "rgba(255, 255, 255, 0.2)",
    color: "white",
    minHeight: "44px",
  }),
  indicatorSeparator: () => ({
    display: "none",
  }),
  singleValue: (base) => ({
    ...base,
    color: "white",
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isFocused ? "rgba(255,255,255,0.1)" : "#1e1e1e",
    color: "white",
    cursor: "pointer",
  }),
  menu: (base) => ({
    ...base,
    backgroundColor: "#1e1e1e",
    border: "1px solid rgba(255, 255, 255, 0.2)",
  }),
};

const formatOptionLabel = ({ value, label }) => (
  <div className="flex items-center gap-3">
    <div
      className="w-5 h-5 flex items-center justify-center [&>svg]:w-full [&>svg]:h-full"
      dangerouslySetInnerHTML={{ __html: value }}
    />
    <span className="text-sm">{label}</span>
  </div>
);

const ICON_MAP = {
  Search,
  MessageCircle,
  ShieldCheck,
  Handshake,
};

const DEFAULT_DATA = WHY_BUY_BASIC_1[0].data;

function WhyBuyBasic1({
  data: rawData,
  isEditing,
  onUpdate,
  onNextTab,
  errors,
  rules,
  storeIcons,
}) {
  const [isSaving, setIsSaving] = useState(false);

  const iconOptions = storeIcons?.length > 0
    ? storeIcons.map((icon) => ({ value: icon.svgIcon, label: icon.title }))
    : SVG_OPTIONS;

  const data = {
    ...DEFAULT_DATA,
    ...Object.fromEntries(
      Object.entries(rawData || {}).filter(
        ([, v]) => v !== undefined && v !== null,
      ),
    ),
  };

  // Map 'processes' from backend/draft to 'processSteps' used in UI
  // Only apply mapping if the target UI field doesn't exist yet to avoid overwriting user edits
  if (!data.processSteps && rawData?.processes && Array.isArray(rawData.processes) && rawData.processes.length > 0) {
    data.processSteps = rawData.processes.map(p => ({
      title: p.title || "",
      description: p.desc || p.description || "",
      icon: p.icon || ""
    }));
  }

  // Synchronize transformed draft data with the parent state once on load
  useEffect(() => {
    if (!rawData || !onUpdate) return;
    
    let hasChanges = false;
    const updatedData = { ...data };

    if (!rawData.processSteps && rawData.processes && Array.isArray(rawData.processes) && rawData.processes.length > 0) {
      updatedData.processSteps = rawData.processes.map(p => ({
        title: p.title || "",
        description: p.desc || p.description || "",
        icon: p.icon || ""
      }));
      hasChanges = true;
    }

    if (hasChanges) {
      onUpdate(updatedData);
    }
  }, []);

  const [allReviews, setAllReviews] = useState([]);
  const [selectedReviewIds, setSelectedReviewIds] = useState([]);

  const updateField = (field, value) => {
    onUpdate({ ...data, [field]: value });
  };

  // Get consultationId from localStorage
  let consultId = null;
  const storedData =
    typeof window !== "undefined"
      ? localStorage.getItem("sellerTierData")
      : null;
  if (storedData) {
    const parsed = JSON.parse(storedData);
    consultId = parsed?.consultationId;
  }

  // Fetch all reviews (no auto-selection)
  useEffect(() => {
    if (!rawData) return null;
    const fetchReviews = async () => {
      try {
        const params = { pageNo: 1, size: 20 };
        const response = await getAllReviewById(consultId, params);
        const reviews = response?.data?.reviews || [];
        setAllReviews(reviews);
      } catch (error) {
        console.error("Error fetching reviews", error);
      }
    };
    if (consultId) fetchReviews();
  }, [consultId]);

  const updateArrayItem = (arrayName, index, field, value) => {
    const newArray = [...data[arrayName]];
    if (typeof newArray[index] === 'object' && newArray[index] !== null) {
      newArray[index] = { ...newArray[index], [field]: value };
    } else {
      newArray[index] = value;
    }
    updateField(arrayName, newArray);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const heroData = new FormData();
      heroData.append("whyBuyHeroTitle", data.whyBuyHeroTitle || "");
      heroData.append(
        "whyBuyHeroDescription",
        data.whyBuyHeroDescription || "",
      );

      const storyData = new FormData();
      storyData.append("storyTitle", data.storyTitle || "");
      storyData.append("storyDescription", data.storyDescription || "");

      const vehicleData = new FormData();
      vehicleData.append(
        "vehicleSelectionTitle",
        data.vehicleSelectionTitle || "",
      );
      vehicleData.append(
        "vehicleSelectionDescription",
        data.vehicleSelectionDescription || "",
      );

      const processData = new FormData();
      processData.append("processTitle", data.processTitle || "");
      processData.append("processDescription", data.processDescription || "");
      if (data.processSteps) {
        data.processSteps.forEach((step, i) => {
          processData.append(`processes[${i}].title`, step.title || "");
          processData.append(`processes[${i}].desc`, step.description || "");
          processData.append(`processes[${i}].icon`, step.icon || "");
        });
      }

      const inspectionData = new FormData();
      inspectionData.append("inspectionTitle", data.inspectionTitle || "");
      inspectionData.append("inspectionDescription", data.inspectionText || "");
      inspectionData.append("inspectionTemplateId1", "1");
      if (data.inspectionPoints) {
        data.inspectionPoints.forEach((pt, i) => {
          inspectionData.append(`inspectionPoints[${i}]`, pt || "");
        });
      }

      const commitmentData = new FormData();
      commitmentData.append(
        "customerCommitmentTitle",
        data.customerCommitmentTitle || "",
      );
      commitmentData.append(
        "customerCommitmentDescription",
        data.customerCommitmentDescription || "",
      );

      await setWhyBuyHero(heroData);
      await setWhyBuyStory(storyData);
      await setWhyBuyVehicleSelection(vehicleData);
      await setWhyBuyProcess(processData);
      await setWhyBuyInspection(inspectionData);
      await setWhyBuyCustomerCommitment(commitmentData);
      await setFeaturedReviews(selectedReviewIds);
    } catch (error) {
      console.error("Error updating Why Buy sections:", error);
    } finally {
      setIsSaving(false);
    }
  };

  // Toggle review selection
  const toggleReviewSelection = (reviewId) => {
    setSelectedReviewIds((prev) => {
      const updated = prev.includes(reviewId)
        ? prev.filter((id) => id !== reviewId)
        : [...prev, reviewId];

      // Build featuredReviews from selected IDs
      const selectedReviews = allReviews
        .filter((r) => updated.includes(r.id))
        .map((r) => ({
          id: r.id,
          reviewerName:
            `${r.reviewedBy?.firstname || ""} ${r.reviewedBy?.lastname || ""}`.trim(),
          rating: r.rating,
          reviewTitle: r.reviewTitle,
          reviewText: r.reviewText,
        }));

      updateField("featuredReviews", selectedReviews);

      return updated;
    });
  };

  if (isEditing) {
    return (
      <div className="w-full max-w-[1480px] mx-auto p-8 rounded-xl space-y-10">
        <GlobalLoader isLoading={isSaving} />
        {/* HERO */}
        <div className="space-y-6">
          <h3 className="text-primary font-bold mb-4">Hero Section</h3>

          <EditorInput
            bold
            label="Hero Title"
            value={data.whyBuyHeroTitle}
            onChange={(e) => updateField("whyBuyHeroTitle", e.target.value)}
            maxLength={rules?.whyBuyHeroTitle?.max}
            error={!!errors?.whyBuyHeroTitle}
            errorMsg={errors?.whyBuyHeroTitle}
          />
          <h3 className="text-primary font-bold mb-4">Hero Description</h3>
          <RichTextEditor
            label="Hero Description"
            value={data.whyBuyHeroDescription}
            onChange={(v) => updateField("whyBuyHeroDescription", v)}
            maxLength={rules?.whyBuyHeroDescription?.max}
            error={!!errors?.whyBuyHeroDescription}
            errorMsg={errors?.whyBuyHeroDescription}
          />
        </div>

        <hr className="border-white/10" />

        {/* STORY */}
        <div className="space-y-6">
          <h3 className="text-primary font-bold mb-4">Story Title</h3>

          <EditorInput
            bold
            label="Story Title"
            value={data.storyTitle}
            onChange={(e) => updateField("storyTitle", e.target.value)}
            maxLength={rules?.storyTitle?.max}
            error={!!errors?.storyTitle}
            errorMsg={errors?.storyTitle}
          />
          <h3 className="text-primary font-bold mb-4">Story Description</h3>

          <RichTextEditor
            label="Story Description"
            value={data.storyDescription}
            onChange={(v) => updateField("storyDescription", v)}
            maxLength={rules?.storyDescription?.max}
            error={!!errors?.storyDescription}
            errorMsg={errors?.storyDescription}
          />
        </div>

        <hr className="border-white/10" />

        {/* VEHICLE SELECTION */}
        <div className="space-y-6">
          <h3 className="text-primary font-bold mb-4">
            Vehicle Selection Title
          </h3>

          <EditorInput
            bold
            label="Selection Title"
            value={data.vehicleSelectionTitle}
            onChange={(e) =>
              updateField("vehicleSelectionTitle", e.target.value)
            }
            maxLength={rules?.vehicleSelectionTitle?.max}
            error={!!errors?.vehicleSelectionTitle}
            errorMsg={errors?.vehicleSelectionTitle}
          />
          <h3 className="text-primary font-bold mb-4">
            Vehicle Selection Description
          </h3>
          <RichTextEditor
            label="Selection Description"
            value={data.vehicleSelectionDescription}
            onChange={(v) => updateField("vehicleSelectionDescription", v)}
            maxLength={rules?.vehicleSelectionDescription?.max}
            error={!!errors?.vehicleSelectionDescription}
            errorMsg={errors?.vehicleSelectionDescription}
          />
        </div>

        <hr className="border-white/10" />

        {/* PROCESS */}
        <div className="space-y-6">
          <h3 className="text-primary font-bold mb-4">Process Title</h3>

          <EditorInput
            bold
            label="Process Title"
            value={data.processTitle}
            onChange={(e) => updateField("processTitle", e.target.value)}
            maxLength={rules?.processTitle?.max}
            error={!!errors?.processTitle}
            errorMsg={errors?.processTitle}
          />
          <h3 className="text-primary font-bold mb-4">Process Description</h3>
          <RichTextEditor
            label="Process Description"
            value={data.processDescription}
            onChange={(v) => updateField("processDescription", v)}
            maxLength={rules?.processDescription?.max}
            error={!!errors?.processDescription}
            errorMsg={errors?.processDescription}
          />

          <div className="grid md:grid-cols-2 gap-4 mt-6">
            {data.processSteps.map((step, i) => (
              <div
                key={i}
                className="border border-primary/30 p-4 rounded bg-primary/5 space-y-4"
              >
                {/* Title */}
                <div>
                  <label className="text-sm font-medium text-primary mb-1 block">
                    Title
                  </label>
                  <EditorInput
                    value={step.title}
                    onChange={(e) =>
                      updateArrayItem(
                        "processSteps",
                        i,
                        "title",
                        e.target.value,
                      )
                    }
                    maxLength={rules?.arrayRules?.processSteps?.title?.max}
                    error={!!errors?.processSteps?.[i]?.title}
                    errorMsg={errors?.processSteps?.[i]?.title}
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="text-sm font-medium text-primary mb-1 block">
                    Description
                  </label>
                  <EditorInput
                    value={step.description}
                    onChange={(e) =>
                      updateArrayItem(
                        "processSteps",
                        i,
                        "description",
                        e.target.value,
                      )
                    }
                    maxLength={rules?.arrayRules?.processSteps?.description?.max}
                    error={!!errors?.processSteps?.[i]?.description}
                    errorMsg={errors?.processSteps?.[i]?.description}
                  />
                </div>

                {/* Icon */}
                <div className="flex flex-col gap-2 relative">
                  <label className="text-sm font-medium text-primary">
                    Icon (Select SVG)
                  </label>
                  <Select
                    options={iconOptions}
                    formatOptionLabel={formatOptionLabel}
                    styles={selectStyles}
                    value={
                      iconOptions.find((opt) => opt.value === step.icon) || null
                    }

                    onChange={(selectedOption) => {
                      updateArrayItem(
                        "processSteps",
                        i,
                        "icon",
                        selectedOption.value,
                      );
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <hr className="border-white/10" />

        {/* INSPECTION */}
        <div className="space-y-6">
          <h3 className="text-primary font-bold mb-4">Inspection Title</h3>

          <EditorInput
            bold
            value={data.inspectionTitle}
            onChange={(e) => updateField("inspectionTitle", e.target.value)}
            maxLength={rules?.inspectionTitle?.max}
            error={!!errors?.inspectionTitle}
            errorMsg={errors?.inspectionTitle}
          />
          <h3 className="text-primary font-bold mb-4">
            Inspection Description
          </h3>

          <RichTextEditor
            value={data.inspectionText}
            onChange={(v) => updateField("inspectionText", v)}
            maxLength={rules?.inspectionText?.max}
            error={!!errors?.inspectionText}
            errorMsg={errors?.inspectionText}
          />
          <h3 className="text-primary font-bold mb-4">Inspection Points</h3>

          {data.inspectionPoints.map((pt, i) => (
            <EditorInput
              key={i}
              value={pt}
              onChange={(e) => {
                const newArr = [...data.inspectionPoints];
                newArr[i] = e.target.value;
                updateField("inspectionPoints", newArr);
              }}
              maxLength={rules?.arrayRules?.inspectionPoints?.text?.max}
              error={!!errors?.inspectionPoints?.[i]?.text}
              errorMsg={errors?.inspectionPoints?.[i]?.text}
            />
          ))}
        </div>

        <hr className="border-white/10" />

        {/* CUSTOMER COMMITMENT */}
        <div className="space-y-6">
          <h3 className="text-primary font-bold mb-4">
            Customer Commitment Title
          </h3>

          <EditorInput
            bold
            label="Commitment Title"
            value={data.customerCommitmentTitle}
            onChange={(e) =>
              updateField("customerCommitmentTitle", e.target.value)
            }
            maxLength={rules?.customerCommitmentTitle?.max}
            error={!!errors?.customerCommitmentTitle}
            errorMsg={errors?.customerCommitmentTitle}
          />
          <h3 className="text-primary font-bold mb-4">
            Customer Commitment Description
          </h3>

          <RichTextEditor
            label="Commitment Text"
            value={data.customerCommitmentDescription}
            onChange={(v) => updateField("customerCommitmentDescription", v)}
            maxLength={rules?.customerCommitmentDescription?.max}
            error={!!errors?.customerCommitmentDescription}
            errorMsg={errors?.customerCommitmentDescription}
          />
        </div>

        <hr className="border-white/10" />

        {/* TESTIMONIALS — select from real reviews */}
        <div>
          <h3 className="text-primary font-bold mb-4">
            Featured Reviews Title
          </h3>

          <EditorInput
            bold
            label="Section Title"
            value={data.testimonialTitle}
            onChange={(e) => updateField("testimonialTitle", e.target.value)}
            maxLength={rules?.testimonialTitle?.max}
            error={!!errors?.testimonialTitle}
            errorMsg={errors?.testimonialTitle}
          />

          <p className="text-third text-sm mb-4 mt-2">
            Select which customer reviews to feature on your storefront.
          </p>

          {allReviews.length === 0 && (
            <p className="text-third/60 text-sm italic">No reviews found.</p>
          )}

          <div className="grid md:grid-cols-2 gap-4">
            {allReviews.map((review) => {
              const isSelected = selectedReviewIds.includes(review.id);
              const reviewerName =
                `${review.reviewedBy?.firstname || ""} ${review.reviewedBy?.lastname || ""}`.trim();

              return (
                <div
                  key={review.id}
                  onClick={() => toggleReviewSelection(review.id)}
                  className={`relative p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                    isSelected
                      ? "border-fourth bg-fourth/10 shadow-md"
                      : "border-third/20 bg-primary/5 hover:border-third/40"
                  }`}
                >
                  {/* Selection indicator */}
                  <div
                    className={`absolute top-3 right-3 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                      isSelected ? "border-fourth bg-fourth" : "border-third/40"
                    }`}
                  >
                    {isSelected && (
                      <CheckCircle2 size={14} className="text-secondary" />
                    )}
                  </div>

                  {/* Stars */}
                  <div className="flex gap-0.5 mb-2">
                    {[...Array(5)].map((_, idx) => (
                      <Star
                        key={idx}
                        size={13}
                        className={
                          idx < review.rating
                            ? "text-fourth fill-fourth"
                            : "text-third/30"
                        }
                      />
                    ))}
                  </div>

                  {/* Review Title */}
                  {review.reviewTitle && (
                    <h4 className="text-primary font-semibold text-sm mb-1">
                      {review.reviewTitle}
                    </h4>
                  )}

                  {/* Review Text */}
                  <p className="text-third text-sm leading-relaxed line-clamp-3">
                    {review.reviewText}
                  </p>

                  {/* Reviewer */}
                  <p className="text-primary/70 text-xs font-medium mt-3">
                    — {reviewerName}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex justify-end mt-8 border-t border-third/30 pt-6">
          <Button onClick={handleSave} disabled={isSaving} variant="ghost">
            {isSaving ? "Saving..." : "Save"}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <section className="relative container w-full overflow-hidden flex items-center min-h-fit py-12 md:py-36">
        <div className="container relative">
          <p className="mb-4 text-sm tracking-[0.4em] uppercase text-third font-semibold">
            Trusted Auto Consultants
          </p>

          <h2
            className="text-3xl sm:text-4xl lg:text-5xl
              font-semibold
              leading-[1.05]
              text-primary
              font-[Montserrat]"
          >
            {data.whyBuyHeroTitle}
          </h2>

          <div
            className="max-w-2xl text-base leading-relaxed text-third md:text-lg font-[Poppins]"
            dangerouslySetInnerHTML={{ __html: data.whyBuyHeroDescription }}
          />
        </div>
      </section>

      <section className="w-full py-12  bg-primary border-y border-secondary/10">
        <div className="w-full max-w-[1480px]   mx-auto px-4 sm:px-6 flex flex-col gap-6 ">
          {/* HEADER */}
          <p className="text-xs sm:text-sm tracking-[0.3em] sm:tracking-[0.4em] uppercase text-secondary/70 font-semibold font-[Montserrat]">
            Consultant Story
          </p>

          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold leading-[1.1] text-secondary font-[Montserrat]">
            <span className="text-secondary">{data.storyTitle}</span>
          </h2>

          {/* TEXT */}
          <div className="flex flex-col gap-4 sm:gap-5">
            <div
              className="text-secondary/80 font-[Poppins] leading-relaxed"
              dangerouslySetInnerHTML={{ __html: data.storyDescription }}
            />
          </div>
        </div>
      </section>

      <section className="container w-full py-12">
        <div className="max-w-7xl mx-4 flex flex-col gap-8">
          {/* ── HEADER ───────────────── */}
          <p className="text-sm tracking-[0.4em] uppercase text-third font-semibold font-[Montserrat]">
            Our Standards
          </p>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.05] text-primary font-[Montserrat]">
            {data.vehicleSelectionTitle}
            <span className="text-primary/80">Vehicle Selection</span>
          </h2>

          {/* ── DESCRIPTION ───────────────── */}
          <div
            className="flex flex-col gap-4 border-l-2 border-primary/40 pl-5 text-third text-lg font-[Poppins] leading-relaxed"
            dangerouslySetInnerHTML={{ __html: data.vehicleSelectionDescription }}
          />
        </div>
      </section>

      <section className="container w-full py-12 ">
        <div className="max-w-7xl mx-auto px-4 flex flex-col gap-12 md:gap-16">
          {/* HEADER */}
          <div className="flex flex-col gap-3 sm:gap-4 max-w-xl md:max-w-2xl">
            <p className="text-xs sm:text-sm tracking-[0.3em] sm:tracking-[0.4em] uppercase text-third font-semibold font-[Montserrat]">
              Simple Process
            </p>

            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold leading-[1.1] text-primary font-[Montserrat]">
              {data.processTitle}
            </h2>

            <div
              className="text-sm sm:text-base md:text-lg text-third leading-relaxed font-[Poppins]"
              dangerouslySetInnerHTML={{ __html: data.processDescription }}
            />
          </div>

          {/* STEPS GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {data.processSteps.map((step, i) => {
              const Icon = ICON_MAP[step.icon];
              return (
                <div
                  key={i}
                  className="flex flex-col gap-3 md:gap-4 p-5 sm:p-6 md:p-6 lg:p-8 border border-primary/20 rounded-xl md:rounded-2xl hover:border-primary/40 transition-all duration-300"
                >
                  {/* ICON */}
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 md:h-11 md:w-11 lg:h-12 lg:w-12 items-center justify-center border border-primary/20 rounded-lg">
                      {typeof step.icon === "string" &&
                      step.icon.startsWith("<svg") ? (
                        <div
                          className="text-primary [&>svg]:w-5 [&>svg]:h-5 transition-colors duration-300"
                          dangerouslySetInnerHTML={{ __html: step.icon }}
                        />
                      ) : Icon ? (
                        <Icon className="text-primary" size={18} />
                      ) : (
                        <div className="text-primary text-[10px]">Icon</div>
                      )}
                    </div>
                  </div>

                  {/* TITLE */}
                  <h3 className="text-base sm:text-lg font-semibold text-primary font-[Montserrat] leading-snug">
                    {step.title}
                  </h3>

                  {/* DESCRIPTION */}
                  <p className="text-sm md:text-[15px] text-third/70 leading-relaxed font-[Poppins]">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className=" container w-full py-12">
        <div className="max-w-7xl mx-4 grid md:grid-cols-2 gap-12">
          {/* ── LEFT SIDE ───────────────── */}
          <div className="flex flex-col gap-4">
            <p className="text-sm tracking-[0.4em] uppercase text-third font-semibold font-[Montserrat]">
              Independent Verification
            </p>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.05] text-primary font-[Montserrat]">
              {data.inspectionTitle}
            </h2>

            <div
              className="text-third text-lg font-[Poppins] leading-relaxed"
              dangerouslySetInnerHTML={{ __html: data.inspectionText }}
            />
          </div>

          {/* ── RIGHT SIDE (FILLED CLEANLY) ───────────────── */}
          <div className="flex flex-col gap-4">
            {data.inspectionPoints.map((pt, i) => (
              <div
                key={i}
                className="flex items-start gap-3 p-5 border border-third/10 rounded-lg"
              >
                <CheckCircle2 className="text-primary mt-1" size={16} />

                <p className="text-third font-[Poppins] leading-relaxed">
                  {pt}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container w-full py-12">
        <div className="max-w-7xl mx-4 flex justify-center">
          {/* ── CENTER BLOCK ───────────────── */}
          <div className="max-w-2xl text-center flex flex-col gap-6">
            <p className="text-sm tracking-[0.4em] uppercase text-third font-semibold font-[Montserrat]">
              Our Promise
            </p>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.05] text-primary font-[Montserrat]">
              {data.customerCommitmentTitle}{" "}
            </h2>

            {/* subtle divider */}
            <div className="w-12 h-px bg-primary/40 mx-auto" />

            <div
              className="text-third text-lg font-[Poppins] leading-relaxed"
              dangerouslySetInnerHTML={{
                __html: data.customerCommitmentDescription,
              }}
            />
          </div>
        </div>
      </section>

      <section className="w-full py-12 bg-primary px-4">
        <div className=" container max-w-7xl mx-3 px-4 sm:px-6 flex flex-col gap-12">
          {/* HEADER */}
          <div className="flex flex-col gap-4 max-w-2xl">
            <p className="text-sm tracking-[0.35em] uppercase text-secondary/70 font-semibold font-[Montserrat]">
              Real Buyers
            </p>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.1] text-secondary font-[Montserrat]">
              {data.testimonialTitle}{" "}
            </h2>
          </div>

          {/* FEATURED REVIEWS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {(data.featuredReviews || []).map((review, i) => (
              <div
                key={review.id || i}
                className="p-6 md:p-7 rounded-xl border border-secondary/15 bg-primary flex flex-col gap-4 hover:border-secondary/30 transition-all duration-300"
              >
                {/* Stars */}
                <div className="flex gap-1">
                  {[...Array(5)].map((_, idx) => (
                    <Star
                      key={idx}
                      size={15}
                      className={
                        idx < (review.rating || 0)
                          ? "text-fourth fill-fourth"
                          : "text-secondary/30"
                      }
                    />
                  ))}
                </div>

                {/* Review Title */}
                {review.reviewTitle && (
                  <h4 className="text-secondary font-[Montserrat] font-semibold text-sm">
                    {review.reviewTitle}
                  </h4>
                )}

                {/* Review Text */}
                <p className="text-secondary/80 font-[Poppins] leading-relaxed text-[15px]">
                  {review.reviewText}
                </p>

                {/* Reviewer Name */}
                <h4 className="text-secondary font-[Montserrat] font-semibold text-sm tracking-wide">
                  — {review.reviewerName}
                </h4>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default WhyBuyBasic1;
