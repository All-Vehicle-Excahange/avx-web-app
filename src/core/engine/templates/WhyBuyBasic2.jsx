"use client";

import { useState, useEffect } from "react";
import { Quote, CheckCircle2, Star } from "lucide-react";
import EditorInput from "@/core/engine/atoms/EditorInput";
import RichTextEditor from "@/core/engine/atoms/RichTextEditor";
import Select from "react-select";
import Button from "@/components/ui/button";
import GlobalLoader from "@/components/ui/GlobalLoader";
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
import { WHY_BUY_BASIC_2 } from "@/core/engine/schemas/whybuy/why_buy_basic_2";

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
  indicatorSeparator: () => ({ display: "none" }),
  singleValue: (base) => ({ ...base, color: "white" }),
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

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const EyeBrow = ({ children, center = false }) => (
  <p
    className={`text-sm tracking-[0.4em] uppercase text-third font-semibold font-[Montserrat] mb-2 ${center ? "text-center" : ""}`}
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true }}
  >
    {children}
  </p>
);

const Divider = ({ light = false }) => (
  <div
    className={`w-8 h-px my-2 ${light ? "bg-primary/30" : "bg-primary/15"}`}
  />
);

const DEFAULT_DATA = WHY_BUY_BASIC_2[0].data;

export default function WhyBuyHereBasic2({
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

  // Map 'processes' and 'inspectionDescription' from draft/backend to UI fields
  // Only apply mapping if the target UI fields don't exist yet to avoid overwriting user edits
  if (
    !rawData?.processSteps &&
    rawData?.processes &&
    Array.isArray(rawData.processes) &&
    rawData.processes.length > 0
  ) {
    data.processSteps = rawData.processes.map((p) => ({
      title: p.title || "",
      description: p.desc || p.description || "",
      icon: p.icon || "",
    }));
  }
  if (!rawData?.inspectionText && rawData?.inspectionDescription) {
    data.inspectionText = rawData.inspectionDescription;
  }

  const [allReviews, setAllReviews] = useState([]);
  const [selectedReviewIds, setSelectedReviewIds] = useState([]);

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

  // Fetch all reviews
  useEffect(() => {
    if (!rawData) return;
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

  if (!rawData) return null;

  const updateField = (field, value) => {
    onUpdate({ ...data, [field]: value });
  };

  const updateArrayItem = (arrayName, index, field, value) => {
    const newArray = [...data[arrayName]];
    if (typeof newArray[index] === "object" && newArray[index] !== null) {
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
      console.error("Error updating Why Buy sections", error);
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

  // ── EDIT MODE ──

  if (isEditing) {
    return (
      <div className="w-full max-w-[1480px] mx-auto p-8 rounded-xl space-y-10">
        <GlobalLoader isLoading={isSaving} />
        {/* HERO */}
        <div className="space-y-6">
          <h3 className="text-white font-bold mb-4">Hero Section</h3>
          <EditorInput
            label="Hero Title"
            value={data.whyBuyHeroTitle}
            onChange={(e) => updateField("whyBuyHeroTitle", e.target.value)}
            maxLength={rules?.whyBuyHeroTitle?.max}
            error={!!errors?.whyBuyHeroTitle}
            errorMsg={errors?.whyBuyHeroTitle}
          />
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
          <h3 className="text-white font-bold mb-4">Story Section</h3>
          <EditorInput
            label="Story Title"
            value={data.storyTitle}
            onChange={(e) => updateField("storyTitle", e.target.value)}
            maxLength={rules?.storyTitle?.max}
            error={!!errors?.storyTitle}
            errorMsg={errors?.storyTitle}
          />
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
          <h3 className="text-white font-bold mb-4">
            Vehicle Selection Section
          </h3>
          <EditorInput
            label="Vehicle Selection Title"
            value={data.vehicleSelectionTitle}
            onChange={(e) =>
              updateField("vehicleSelectionTitle", e.target.value)
            }
            maxLength={rules?.vehicleSelectionTitle?.max}
            error={!!errors?.vehicleSelectionTitle}
            errorMsg={errors?.vehicleSelectionTitle}
          />
          <RichTextEditor
            label="Vehicle Selection Description"
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
          <h3 className="text-white font-bold mb-4">Process Section</h3>
          <EditorInput
            label="Process Title"
            value={data.processTitle}
            onChange={(e) => updateField("processTitle", e.target.value)}
            maxLength={rules?.processTitle?.max}
            error={!!errors?.processTitle}
            errorMsg={errors?.processTitle}
          />
          <RichTextEditor
            label="Process Description"
            value={data.processDescription}
            onChange={(v) => updateField("processDescription", v)}
            maxLength={rules?.processDescription?.max}
            error={!!errors?.processDescription}
            errorMsg={errors?.processDescription}
          />

          <h4 className="text-white font-semibold mt-6 mb-4">Process Steps</h4>
          <div className="grid md:grid-cols-2 gap-4">
            {data.processSteps.map((step, i) => (
              <div
                key={i}
                className="border border-white/10 p-4 rounded-lg space-y-4"
              >
                <div>
                  <label className="text-sm font-medium text-white mb-1 block">
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
                <div>
                  <label className="text-sm font-medium text-white mb-1 block">
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
                    maxLength={
                      rules?.arrayRules?.processSteps?.description?.max
                    }
                    error={!!errors?.processSteps?.[i]?.description}
                    errorMsg={errors?.processSteps?.[i]?.description}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-white mb-1 block">
                    Icon
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
          <h3 className="text-white font-bold mb-4">Inspection Section</h3>
          <EditorInput
            label="Inspection Title"
            value={data.inspectionTitle}
            onChange={(e) => updateField("inspectionTitle", e.target.value)}
            maxLength={rules?.inspectionTitle?.max}
            error={!!errors?.inspectionTitle}
            errorMsg={errors?.inspectionTitle}
          />
          <RichTextEditor
            label="Inspection Text"
            value={data.inspectionText}
            onChange={(v) => updateField("inspectionText", v)}
            maxLength={rules?.inspectionText?.max}
            error={!!errors?.inspectionText}
            errorMsg={errors?.inspectionText}
          />
          <h4 className="text-white font-semibold mt-4">Inspection Points</h4>
          {data.inspectionPoints.map((pt, i) => (
            <EditorInput
              key={i}
              label={`Point ${i + 1}`}
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
          <h3 className="text-white font-bold mb-4">
            Customer Commitment Section
          </h3>
          <EditorInput
            label="Commitment Title"
            value={data.customerCommitmentTitle}
            onChange={(e) =>
              updateField("customerCommitmentTitle", e.target.value)
            }
            maxLength={rules?.customerCommitmentTitle?.max}
            error={!!errors?.customerCommitmentTitle}
            errorMsg={errors?.customerCommitmentTitle}
          />
          <RichTextEditor
            label="Commitment Description"
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
          <h3 className="text-white font-bold mb-4">Featured Reviews</h3>

          {/* <EditorInput
            label="Section Title"
            value={data.testimonialTitle}
            onChange={(e) => updateField("testimonialTitle", e.target.value)}
            maxLength={rules?.testimonialTitle?.max}
            error={!!errors?.testimonialTitle}
            errorMsg={errors?.testimonialTitle}
          /> */}

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

  // ── FRONT MODE ──

  return (
    <>
      {/* SECTION 1 — HERO */}
      <section className="relative flex items-center justify-center overflow-hidden min-h-screen py-12">
        <div className="w-[70%] mx-auto text-center">
          <EyeBrow center>Why Choose Us</EyeBrow>
          <h1 className="text-[clamp(28px,5vw,54px)] font-bold leading-[1.15] text-primary font-[Montserrat] mb-6">
            {data.whyBuyHeroTitle}
          </h1>
          <div
            className="text-third/70 text-[15px] leading-[1.9] font-[Poppins]"
            dangerouslySetInnerHTML={{ __html: data.whyBuyHeroDescription }}
          />
        </div>
      </section>

      {/* SECTION 2 — STORY */}
      <section className="py-12 px-2 lg:px-4 bg-fourth">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
            <div>
              <EyeBrow>Our Story</EyeBrow>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.05] text-primary font-[Montserrat]">
                <span className="text-secondary">{data.storyTitle}</span>
              </h2>
            </div>
            <div className="flex flex-col gap-4">
              <div
                className="text-primary/90 text-[15px] leading-[1.9] font-[Poppins]"
                dangerouslySetInnerHTML={{ __html: data.storyDescription }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3 — SELECTION */}
      <section className="py-12 px-2 lg:px-4">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
            <div>
              <EyeBrow>Selection</EyeBrow>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.05] text-primary font-[Montserrat]">
                Our Approach to
                <br />
                <span className="text-primary">Vehicle Selection</span>
              </h2>
            </div>
            <div>
              <Divider />
              <div
                className="text-third/70 text-[15px] leading-[1.9] font-[Poppins]"
                dangerouslySetInnerHTML={{
                  __html: data.vehicleSelectionDescription,
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4 — PROCESS */}
      <section className="py-12 px-2 lg:px-4">
        <div className="container">
          <div className="flex flex-col gap-3 mb-10">
            <EyeBrow>Process</EyeBrow>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.05] text-primary font-[Montserrat]">
              {data.processTitle} <span className="text-primary">Works</span>
            </h2>
            <div
              className="text-third/60 text-[15px] font-[Poppins] leading-relaxed max-w-md"
              dangerouslySetInnerHTML={{ __html: data.processDescription }}
            />
          </div>

          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3"
            variants={stagger}
          >
            {data.processSteps.map((s, i) => (
              <div
                key={i}
                variants={fadeUp}
                className="group relative border border-third/10 rounded-2xl p-7 flex flex-col gap-5 hover:border-primary/30 transition-all duration-300 hover:shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
              >
                <span className="font-[Montserrat] font-bold text-[11px] tracking-[0.18em] text-third/40 absolute top-5 right-5">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="w-10 h-10 border border-third/20 rounded-xl flex items-center justify-center shrink-0 group-hover:border-primary/30 transition-colors duration-300">
                  {s.icon ? (
                    <div
                      className="text-fourth flex items-center justify-center [&>svg]:w-5 [&>svg]:h-5"
                      dangerouslySetInnerHTML={{ __html: s.icon }}
                    />
                  ) : (
                    <div className="w-5 h-5 bg-third/20 rounded flex items-center justify-center text-xs text-fourth" />
                  )}
                </div>
                <div>
                  <p className="font-[Montserrat] font-semibold text-[13px] text-fourth mb-2">
                    {s.title}
                  </p>
                  <p className="font-[Poppins] text-[12px] text-third/65 leading-[1.8]">
                    {s.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5 — INSPECTION */}
      <section className="py-12 px-2 lg:px-4">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-end mb-12">
            <div>
              <EyeBrow>Inspection</EyeBrow>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.05] text-primary font-[Montserrat]">
                {data.inspectionTitle}
              </h2>
            </div>
            <div>
              <Divider />
              <div
                className="text-third/70 text-[15px] leading-[1.9] font-[Poppins]"
                dangerouslySetInnerHTML={{ __html: data.inspectionText }}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 items-stretch">
            <div className="grid grid-cols-2 gap-3" variants={stagger}>
              {data.inspectionPoints.map((pt) => (
                <div
                  key={pt}
                  variants={fadeUp}
                  className="group flex flex-col gap-4 p-6 border border-third/10 rounded-2xl hover:border-primary/25 transition-all duration-300 hover:shadow-[0_6px_28px_rgba(0,0,0,0.35)]"
                >
                  <div className="w-8 h-8 rounded-lg border-[1.5px] border-fourth flex items-center justify-center shrink-0">
                    <svg width="12" height="10" viewBox="0 0 10 8" fill="none">
                      <path
                        d="M1 4L3.8 7L9 1"
                        stroke="#007bff"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <span className="font-[Poppins] text-sm text-third/70 leading-[1.7] group-hover:text-primary/80 transition-colors duration-300">
                    {pt}
                  </span>
                </div>
              ))}
            </div>

            <div className="border border-third/10 rounded-2xl overflow-hidden hover:border-primary/25 transition-all duration-300 hover:shadow-[0_8px_40px_rgba(0,0,0,0.4)]">
              <div className="px-6 py-5 border-b border-primary/[0.07] flex items-center justify-between">
                <p className="font-[Montserrat] font-bold text-[9px] tracking-[0.26em] uppercase text-primary/50">
                  {"What's Covered"}
                </p>
                <span className="font-[Montserrat] font-bold text-[9px] tracking-[0.16em] uppercase text-primary">
                  Status
                </span>
              </div>
              {data.inspectionPoints.map((pt, i, arr) => (
                <div
                  key={pt}
                  className={`flex justify-between items-center px-6 py-[18px] transition-colors duration-150 hover:bg-primary/4 ${i < arr.length - 1 ? "border-b border-primary/6" : ""}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="font-[Montserrat] font-bold text-[10px] tracking-[0.14em] text-fourth">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-[Poppins] text-sm text-third/70">
                      {pt}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-fourth" />
                    <span className="font-[Montserrat] font-bold text-[9px] tracking-[0.16em] uppercase text-primary">
                      Included
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6 — COMMITMENT */}
      <section className="py-12 px-2 lg:px-4 bg-fourth">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
            <div>
              <EyeBrow>Commitment</EyeBrow>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.05] text-primary font-[Montserrat]">
                {data.customerCommitmentTitle}{" "}
              </h2>
            </div>
            <div>
              <Divider light />
              <div
                className="text-primary/90 text-[15px] leading-[1.9] font-[Poppins]"
                dangerouslySetInnerHTML={{
                  __html: data.customerCommitmentDescription,
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7 — FEATURED REVIEWS */}
      {(data.featuredReviews?.length > 0 || data.testimonials?.length > 0) && (
        <section className="py-12 px-2 lg:px-4">
          <div className="container">
            <div className="flex flex-col gap-3 mb-12">
              <EyeBrow>Reviews</EyeBrow>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.05] text-primary font-[Montserrat]">
                {data.testimonialTitle}
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {(data.featuredReviews || data.testimonials || []).map((t, i) => (
                <div
                  key={t.id || i}
                  className="group border border-primary/40 rounded-2xl p-8 flex flex-col gap-5 hover:border-primary/25 transition-all duration-300 hover:shadow-[0_8px_36px_rgba(0,0,0,0.4)] h-full"
                >
                  {/* Stars */}
                  {t.rating && (
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, idx) => (
                        <Star
                          key={idx}
                          size={15}
                          className={
                            idx < (t.rating || 0)
                              ? "text-fourth fill-fourth"
                              : "text-third/30"
                          }
                        />
                      ))}
                    </div>
                  )}

                  {!t.rating && (
                    <Quote size={20} className="text-fourth" strokeWidth={1.4} />
                  )}

                  {/* Review Title */}
                  {t.reviewTitle && (
                    <h4 className="font-[Montserrat] font-semibold text-[13px] text-primary">
                      {t.reviewTitle}
                    </h4>
                  )}

                  {/* Review Text */}
                  <p className="font-[Poppins] text-sm leading-[1.86] text-third/70 italic flex-1">
                    {t.reviewText || t.review}
                  </p>

                  <div className="w-full h-px bg-primary/[0.07]" />

                  {/* Reviewer Info */}
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full border border-third/20 flex items-center justify-center font-bold text-[13px] text-fourth shrink-0">
                      {(t.reviewerName || t.name)?.[0] || "?"}{" "}
                    </div>
                    <div>
                      <p className="font-[Montserrat] font-semibold text-[13px] text-primary">
                        {t.reviewerName || t.name}
                      </p>
                      <p className="font-[Poppins] text-[11px] text-third/50">
                        Verified Buyer
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
