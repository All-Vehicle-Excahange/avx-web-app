"use client";
import {
  Search,
  MessageCircle,
  ShieldCheck,
  Handshake,
  Quote,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Star,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import EditorInput from "@/core/engine/atoms/EditorInput";
import RichTextEditor from "@/core/engine/atoms/RichTextEditor";
import Select from "react-select";
import {
  setWhyBuyHero,
  setWhyBuyStory,
  setWhyBuyVehicleSelection,
  setWhyBuyProcess,
  setWhyBuyInspection,
  setWhyBuyCustomerCommitment,
  setFeaturedReviews,
} from "@/services/theme.service";
import { getAllReview } from "@/services/user.service";
const SVG_OPTIONS = [
  {
    value: `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"/></svg>`,
    label: "Search",
  },
  {
    value: `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M880-300 760-420l-80 80q-83 0-141.5-58.5T480-620q0-83 58.5-141.5T680-820q83 0 141.5 58.5T880-620v200ZM480-160q33 0 56.5-23.5T560-240v-240q0-33-23.5-56.5T480-560q-33 0-56.5 23.5T400-480v240q0 33 23.5 56.5T480-160Z"/></svg>`,
    label: "MessageCircle",
  },
  {
    value: `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M440-280v-280q0-17-11.5-28.5T400-600h80q17 0 28.5 11.5T520-560v168q0 13-3.5 25t-10.5 21-17 13-21.5 4.5H440Zm-80-320v-40h160v40h-40v160h-80v-160h-40Zm400-80h-80v-80h-80v80h-80v-80h-80v120q0 17 11.5 28.5T240-460h240q17 0 28.5-11.5T520-500v-80Z"/></svg>`,
    label: "ShieldCheck",
  },
  {
    value: `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M760-260q-50 0-85-35t-35-85q0-35 18.5-64.5T700-498l58-118q17 31 49 51.5t69 20.5h30q8 0 14-6t6-14q0-33-23.5-56.5T760-740q-33 0-56.5 23.5T680-660q0 8 6 14t14 6h30q50 0 89.5 25.5T870-547l-58 118q-17-8-37-12.5t-43-4.5q-50 0-85 35t-35 85q0 35 18.5 64.5T700-262l-58 118q-17-31-49-51.5T524-230H494q-8 0-14 6t-6 14q0 33 23.5 56.5T440-120q33 0 56.5-23.5T520-200q0-8-6-14t-14-6h-30q-50 0-89.5-25.5T330-313l58-118q17 8 37 12.5T470-410q50 0 85-35t35-85q0-35-18.5-64.5T520-662l58-118q17 31 49 51.5T696-694h30q8 0 14-6t6-14q0-33-23.5-56.5T760-800q-33 0-56.5 23.5T680-720q0 8 6 14t14 6h30q50 0 89.5 25.5T870-607l-58 118q-17-8-37-12.5T730-510Z"/></svg>`,
    label: "Handshake",
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
const iconMap = {
  Search,
  MessageCircle,
  ShieldCheck,
  Handshake,
};
export default function WhyBuyBasic3({ data: rawData, isEditing, onUpdate }) {
  const [allReviews, setAllReviews] = useState([]);
  const [selectedReviewIds, setSelectedReviewIds] = useState([]);

  const data = {
    ...Object.fromEntries(
      Object.entries(rawData || {}).filter(
        ([, v]) => v !== undefined && v !== null,
      ),
    ),
  };

  const [active, setActive] = useState(0);
  const [visible, setVisible] = useState(true);
  const total = data.featuredReviews?.length || data.testimonials?.length || 0;
  const timeoutRef = useRef(null);

  useEffect(() => () => clearTimeout(timeoutRef.current), []);

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
        const response = await getAllReview(consultId, params);
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
    newArray[index][field] = value;
    updateField(arrayName, newArray);
  };

  // ── API HANDLERS ──

  const handleHeroBlur = async () => {
    try {
      const formData = new FormData();
      formData.append("whyBuyHeroTitle", data.whyBuyHeroTitle || "");
      formData.append(
        "whyBuyHeroDescription",
        data.whyBuyHeroDescription || "",
      );
      await setWhyBuyHero(formData);
    } catch (error) {
      console.error("Error updating hero", error);
    }
  };

  const handleStoryBlur = async () => {
    try {
      const formData = new FormData();
      formData.append("storyTitle", data.storyTitle || "");
      formData.append("storyDescription", data.storyDescription || "");
      await setWhyBuyStory(formData);
    } catch (error) {
      console.error("Error updating story", error);
    }
  };

  const handleVehicleSelectionBlur = async () => {
    try {
      const formData = new FormData();
      formData.append(
        "vehicleSelectionTitle",
        data.vehicleSelectionTitle || "",
      );
      formData.append(
        "vehicleSelectionDescription",
        data.vehicleSelectionDescription || "",
      );
      await setWhyBuyVehicleSelection(formData);
    } catch (error) {
      console.error("Error updating vehicle selection", error);
    }
  };

  const handleProcessBlur = async () => {
    try {
      const formData = new FormData();
      formData.append("processTitle", data.processTitle || "");
      formData.append("processDescription", data.processDescription || "");
      if (data.processSteps) {
        data.processSteps.forEach((step, i) => {
          formData.append(`processes[${i}].title`, step.title || "");
          formData.append(`processes[${i}].desc`, step.description || "");
          formData.append(`processes[${i}].icon`, step.icon || "");
        });
      }
      await setWhyBuyProcess(formData);
    } catch (error) {
      console.error("Error updating process", error);
    }
  };

  const handleInspectionBlur = async () => {
    try {
      const formData = new FormData();
      formData.append("inspectionTitle", data.inspectionTitle || "");
      formData.append("inspectionDescription", data.inspectionText || "");
      formData.append("inspectionTemplateId1", "1");
      if (data.inspectionPoints) {
        data.inspectionPoints.forEach((pt, i) => {
          formData.append(`inspectionPoints[${i}]`, pt || "");
        });
      }
      await setWhyBuyInspection(formData);
    } catch (error) {
      console.error("Error updating inspection", error);
    }
  };

  const handleCustomerCommitmentBlur = async () => {
    try {
      const formData = new FormData();
      formData.append(
        "customerCommitmentTitle",
        data.customerCommitmentTitle || "",
      );
      formData.append(
        "customerCommitmentDescription",
        data.customerCommitmentDescription || "",
      );
      await setWhyBuyCustomerCommitment(formData);
    } catch (error) {
      console.error("Error updating customer commitment", error);
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

      // Auto-save to API with review IDs
      setFeaturedReviews(updated).catch((err) =>
        console.error("Error saving featured reviews", err),
      );

      return updated;
    });
  };

  const handleTestimonialBlur = async () => {
    try {
      await setFeaturedReviews(selectedReviewIds);
    } catch (error) {
      console.error("Error updating featured reviews", error);
    }
  };

  const transition = (newIndex) => {
    setVisible(false);
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setActive(newIndex);
      setVisible(true);
    }, 350);
  };
  const prev = () => transition((active - 1 + total) % total);
  const next = () => transition((active + 1) % total);

  const testimonials = data.featuredReviews?.length
    ? data.featuredReviews
    : data.testimonials;
  const item = testimonials[active];
  const getIcon = (icon) => {
    if (typeof icon === "string" && icon.startsWith("<svg")) {
      return (
        <div
          className="w-4 h-4 text-third/40 group-hover:text-primary/60 transition-colors duration-300 [&>svg]:w-full [&>svg]:h-full"
          dangerouslySetInnerHTML={{ __html: icon }}
        />
      );
    }
    const Icon = iconMap[icon] || Search;
    return (
      <Icon className="w-4 h-4 text-third/40 group-hover:text-primary/60 transition-colors duration-300" />
    );
  };
  if (isEditing) {
    return (
      <div className="w-full max-w-[1480px] mx-auto p-8 rounded-xl space-y-10 ">
        <div className="space-y-6">
          <h3 className="text-white font-bold mb-4">Hero Section</h3>
          <EditorInput
            label="Hero Title"
            value={data.whyBuyHeroTitle}
            onChange={(e) => updateField("whyBuyHeroTitle", e.target.value)}
            onBlur={handleHeroBlur}
          />
          <RichTextEditor
            label="Hero Description"
            value={data.whyBuyHeroDescription}
            onChange={(v) => updateField("whyBuyHeroDescription", v)}
            onBlur={handleHeroBlur}
          />
        </div>
        <hr className="border-white/10" />
        <div className="space-y-6">
          <h3 className="text-white font-bold mb-4">Story Section</h3>
          <EditorInput
            label="Story Title"
            value={data.storyTitle}
            onChange={(e) => updateField("storyTitle", e.target.value)}
            onBlur={handleStoryBlur}
          />
          <RichTextEditor
            label="Story Description"
            value={data.storyDescription}
            onChange={(v) => updateField("storyDescription", v)}
            onBlur={handleStoryBlur}
          />
        </div>
        <hr className="border-white/10" />
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
            onBlur={handleVehicleSelectionBlur}
          />
          <RichTextEditor
            label="Vehicle Selection Description"
            value={data.vehicleSelectionDescription}
            onChange={(v) => updateField("vehicleSelectionDescription", v)}
            onBlur={handleVehicleSelectionBlur}
          />
        </div>
        <hr className="border-white/10" />
        <div className="space-y-6">
          <h3 className="text-white font-bold mb-4">Process Section</h3>
          <EditorInput
            label="Process Title"
            value={data.processTitle}
            onChange={(e) => updateField("processTitle", e.target.value)}
            onBlur={handleProcessBlur}
          />
          <RichTextEditor
            label="Process Description"
            value={data.processDescription}
            onChange={(v) => updateField("processDescription", v)}
            onBlur={handleProcessBlur}
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
                    onBlur={handleProcessBlur}
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
                    onBlur={handleProcessBlur}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-white mb-1 block">
                    Icon
                  </label>
                  <Select
                    options={SVG_OPTIONS}
                    formatOptionLabel={formatOptionLabel}
                    styles={selectStyles}
                    value={
                      SVG_OPTIONS.find((opt) => opt.value === step.icon) || null
                    }
                    onChange={(selectedOption) => {
                      updateArrayItem(
                        "processSteps",
                        i,
                        "icon",
                        selectedOption.value,
                      );
                      handleProcessBlur();
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        <hr className="border-white/10" />
        <div className="space-y-6">
          <h3 className="text-white font-bold mb-4">Inspection Section</h3>
          <EditorInput
            label="Inspection Title"
            value={data.inspectionTitle}
            onChange={(e) => updateField("inspectionTitle", e.target.value)}
            onBlur={handleInspectionBlur}
          />
          <RichTextEditor
            label="Inspection Text"
            value={data.inspectionText}
            onChange={(v) => updateField("inspectionText", v)}
            onBlur={handleInspectionBlur}
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
              onBlur={handleInspectionBlur}
            />
          ))}
        </div>
        <hr className="border-white/10" />
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
            onBlur={handleCustomerCommitmentBlur}
          />
          <RichTextEditor
            label="Commitment Description"
            value={data.customerCommitmentDescription}
            onChange={(v) => updateField("customerCommitmentDescription", v)}
            onBlur={handleCustomerCommitmentBlur}
          />
        </div>
        <hr className="border-white/10" />
        <div>
          <h3 className="text-white font-bold mb-4">Featured Reviews</h3>

          <EditorInput
            label="Section Title"
            value={data.testimonialTitle}
            onChange={(e) => updateField("testimonialTitle", e.target.value)}
            onBlur={handleTestimonialBlur}
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
      </div>
    );
  }
  return (
    <>
      {/* ===== Hero Section ===== */}
      <section className="relative flex items-center justify-center overflow-hidden min-h-screen py-12">
        <div className="relative flex flex-col items-center text-center gap-8 max-w-3xl">
          <p className="text-sm tracking-[0.4em] uppercase text-third font-semibold">
            Why Choose Us
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.05] text-primary font-[Montserrat]">
           {data.whyBuyHeroTitle}
          </h2>
          <div
            className="text-third/55 text-base sm:text-lg font-[Poppins] leading-relaxed max-w-xl"
            dangerouslySetInnerHTML={{ __html: data.whyBuyHeroDescription }}
          />
        </div>
      </section>
      {/* ===== AboutUs Section ===== */}
      <section className="relative flex flex-col justify-center items-center py-12">
        <div className="mx-auto w-full flex flex-col gap-13">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-start">
            <div className="flex flex-col gap-6">
              <p className="text-sm tracking-[0.4em] uppercase text-third font-semibold">
                About Us
              </p> 
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.05] text-primary font-[Montserrat]">
                <span className="text-primary"> {data.storyTitle}</span>
              </h2>
            </div>
            <div className="flex flex-col gap-10">
              <div className="flex flex-col gap-6">
                <div
                  className="text-third/70 text-lg md:text-xl font-[Poppins] leading-relaxed"
                  dangerouslySetInnerHTML={{
                    __html:
                      data.storyDescription.split(/(?<=[.!?])\s+/)[0] ||
                      data.storyDescription,
                  }}
                />
                <div
                  className="text-third/50 text-md font-[Poppins] leading-relaxed max-w-md"
                  dangerouslySetInnerHTML={{
                    __html:
                      data.storyDescription.split(/(?<=[.!?])\s+/)[1] || "",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ===== Vehicle Approach Section ===== */}
      <section className="relative py-12">
        <div className="max-w-6xl mx-auto">
          <div className="border border-third/10 rounded-3xl p-10 md:p-16 relative shadow-2xl">
            <div className="flex flex-col items-center text-center gap-8 max-w-3xl mx-auto">
              <div className="flex items-center gap-3">
                <p className="text-sm tracking-[0.4em] uppercase text-third font-semibold">
                  Vehicle Approach
                </p>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.05] text-primary font-[Montserrat]">
                {data.vehicleSelectionTitle.split("Vehicle Selection")[0]}
                <span className="text-primary">{data.vehicleSelectionTitle}</span>
              </h2>
              <div
                className="text-third/60 text-base md:text-lg font-[Poppins] leading-[1.9] max-w-2xl"
                dangerouslySetInnerHTML={{
                  __html: data.vehicleSelectionDescription,
                }}
              />
            </div>
          </div>
        </div>
      </section>
      {/* ===== How Buying Work Section ===== */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto flex flex-col gap-15">
          <div className="flex flex-col sm:justify-between gap-8 pb-12 border-b border-third/10">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <p className="text-sm tracking-[0.4em] uppercase text-third font-semibold">
                  Buying Process
                </p>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.05] text-primary font-[Montserrat]">
              
                <span className="text-primary">{data.processTitle}</span>
              </h2>
            </div>
            <div
              className="text-third/55 text-base font-[Poppins] leading-relaxed max-w-xs"
              dangerouslySetInnerHTML={{ __html: data.processDescription }}
            />
          </div>
          <div className="flex flex-col gap-2">
            {data.processSteps.map((step, i) => {
              const isEven = i % 2 === 0;
              return (
                <div
                  key={i}
                  className={`group flex flex-col sm:flex-row items-stretch gap-0 border border-third/10 rounded-2xl overflow-hidden hover:border-third/25 transition-all duration-300 ${isEven ? "" : "sm:flex-row-reverse"}`}
                >
                  <div
                    className="flex sm:flex-col items-center justify-between sm:justify-center gap-4 px-8 py-6 sm:py-10 sm:w-48 border-b sm:border-b-0 border-third/10 sm:border-r group-hover:bg-primary/4 transition-colors duration-300"
                    style={
                      isEven
                        ? {}
                        : {
                            borderRight: "none",
                            borderLeft: "1px solid rgba(190,190,190,0.1)",
                          }
                    }
                  >
                    <span className="text-[13px] font-bold tracking-[3px] text-third/25 font-[Montserrat]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="w-10 h-10 rounded-xl border border-third/15 flex items-center justify-center group-hover:border-primary/30 transition-colors duration-300">
                      {getIcon(step.icon)}
                    </div>
                  </div>
                  <div className="flex flex-col justify-center gap-2 px-8 py-8 flex-1">
                    <h3 className="text-lg font-semibold text-primary font-[Montserrat]">
                      {step.title}
                    </h3>
                    <p className="text-third/55 text-sm font-[Poppins] leading-relaxed max-w-lg">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      {/* ===== Avx Inspection Section ===== */}
      <section className="py-12 overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col gap-16">
          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-20 items-start">
            <div className="flex flex-col gap-8">
              <p className="text-sm tracking-[0.4em] uppercase text-third font-semibold font-[Montserrat]">
                Avx Inspection
              </p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.05] text-primary font-[Montserrat]">
                {data.inspectionTitle}
                
              </h2>
              <div
                className="text-third/55 text-base font-[Poppins] leading-[1.9] max-w-md"
                dangerouslySetInnerHTML={{ __html: data.inspectionText }}
              />
            </div>
            <div className="flex flex-col divide-y divide-third/10">
              {data.inspectionPoints.map((point, i) => (
                <div
                  key={i}
                  className="group flex items-center justify-between gap-6 py-5 hover:translate-x-1 transition-transform duration-300"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-[10px] font-bold tracking-[2px] text-third/25 font-[Montserrat] shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-primary/80 text-base font-[Poppins]">
                      {point}
                    </span>
                  </div>
                  <svg
                    className="w-4.5 h-4.5 text-third/20 group-hover:text-third/90 shrink-0 transition-colors duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* ===== Customer Commitment Section ===== */}
      <section className="py-12 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative flex flex-col lg:flex-row items-center lg:items-stretch gap-0 border border-third/10 rounded-2xl overflow-hidden">
            <div className="flex flex-col justify-between gap-8 p-10 lg:p-14 lg:w-[45%] border-b lg:border-b-0 lg:border-r border-third/10">
              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-3">
                  <p className="text-sm tracking-[0.4em] uppercase text-third font-semibold font-[Montserrat]">
                    Our Promise
                  </p>
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.05] text-primary font-[Montserrat]">
                  {data.customerCommitmentTitle}
                </h2>
              </div>
              <div className="flex items-center gap-4">
                <div className="h-px flex-1 bg-linear-to-r from-third/30 to-transparent" />
                <span className="text-[10px] tracking-[0.3em] uppercase text-third/30 font-[Poppins] whitespace-nowrap">
                  Every Buyer
                </span>
              </div>
            </div>
            <div className="relative flex flex-col justify-center gap-8 p-10 lg:p-14 flex-1 overflow-hidden">
              <Quote
                size={40}
                className="absolute top-6 right-8 text-third/20"
              />
              <div
                className="relative text-third/55 text-base font-[Poppins] leading-[1.9] max-w-md"
                dangerouslySetInnerHTML={{
                  __html: data.customerCommitmentDescription,
                }}
              />
              <div className="flex items-center gap-3 pt-4 border-t border-third/10">
                <div className="w-6 h-6 rounded-full border border-third/20 flex items-center justify-center">
                  <svg
                    className="w-3 h-3 text-third/60"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <span className="text-xs tracking-[0.2em] uppercase text-third/35 font-[Poppins]">
                  Adarsh Auto Consultants
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ===== Testimonials Section ===== */}
      <section className="relative py-12">
        <div className="mx-auto w-full">
          <div className="flex flex-col items-center gap-10">
            <div className="flex flex-col items-center gap-4 text-center">
              <span className="text-sm tracking-[0.4em] uppercase text-third font-semibold">
                Feedback
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.05] text-primary font-[Montserrat]">
               {data.testimonialTitle}
              </h2>
            </div>
            {testimonials.length > 0 && (
              <>
                <div
                  className="w-full"
                  style={{
                    opacity: visible ? 1 : 0,
                    transform: visible ? "translateY(0px)" : "translateY(12px)",
                    transition: "opacity 0.35s ease, transform 0.35s ease",
                  }}
                >
                  <div className="relative flex flex-col items-center text-center gap-8 px-10 py-12 border border-third/15 rounded-2xl">
                    <div className="absolute top-5 right-6 w-9 h-9 rounded-full flex items-center justify-center">
                      <Quote className="w-6 h-6 text-third/30" />
                    </div>
                    <span className="text-[13px] font-bold text-third/30 font-[Montserrat] tracking-[0.5em]">
                      {String(active + 1).padStart(2, "0")}
                    </span>
                    <p className="text-xl md:text-2xl lg:text-3xl font-light text-primary/70 font-[Poppins] leading-[1.6] max-w-3xl italic">
                      {item.review || item.reviewText}
                    </p>
                    <span className="text-xs font-semibold text-primary/90 font-[Montserrat] uppercase tracking-widest">
                      {item.name || item.reviewerName}
                    </span>
                  </div>
                </div>
                {testimonials.length > 1 && (
                  <div className="flex items-center gap-6">
                    <button
                      onClick={prev}
                      className="w-10 h-10 rounded-full border border-third/20 flex items-center justify-center hover:border-third/40 hover:bg-third/5 transition-all duration-300 group"
                    >
                      <ChevronLeft className="w-4 h-4 text-third/50 group-hover:text-third/70 transition-colors duration-300" />
                    </button>
                    <div className="flex items-center gap-2">
                      {testimonials.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => transition(i)}
                          className={`rounded-full transition-all duration-500 ${i === active ? "w-6 h-1.5 bg-primary" : "w-1.5 h-1.5 bg-third/20 hover:bg-third/40"}`}
                        />
                      ))}
                    </div>
                    <button
                      onClick={next}
                      className="w-10 h-10 rounded-full border border-third/20 flex items-center justify-center hover:border-third/40 hover:bg-third/5 transition-all duration-300 group"
                    >
                      <ChevronRight className="w-4 h-4 text-third/50 group-hover:text-third/70 transition-colors duration-300" />
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
