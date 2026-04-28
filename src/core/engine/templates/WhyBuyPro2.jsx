/* eslint-disable react-hooks/set-state-in-effect */

"use client";

import { useEffect, useRef, useState } from "react";
import { CheckCircle2, Star } from "lucide-react";
import RichTextEditor from "../atoms/RichTextEditor";
import EditorInput from "../atoms/EditorInput";
import { ImageUploader } from "../atoms/ImageUploader ";
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
  setWhyBuyGallery,
} from "@/services/theme.service";
import { getAllReviewById } from "@/services/user.service";

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
  {
    value: `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M480-80q-139-35-229.5-159.5T160-516v-244l320-120 320 120v244q0 152-90.5 276.5T480-80Zm0-84q104-33 172-132t68-220v-189l-240-90-240 90v189q0 121 68 220t172 132Zm0-316Zm-76 112 198-198-57-56-141 142-70-71-57 56 127 127Z"/></svg>`,
    label: "Shield",
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

const rotations = [-6, 8, 4, -5, 10];
const desktopPositions = [
  { top: "20px", left: "20px" },
  { top: "30px", right: "40px" },
  { top: "200px", left: "0px" },
  { bottom: "10px", left: "160px" },
  { bottom: "120px", right: "30px" },
];

export default function WhyBuyPro2({
  data: rawData,
  isEditing,
  onUpdate,
  errors,
  rules,
  storeIcons,
}) {
  const [activeIndex, setActiveIndex] = useState(0);

  const iconOptions = storeIcons?.length > 0
    ? storeIcons.map((icon) => ({ value: icon.svgIcon, label: icon.title }))
    : SVG_OPTIONS;

  const data = (() => {
    const merged = {
      processSteps: [],
      inspectionPoints: [],
      testimonials: [],
      featuredReviews: [],
      ...Object.fromEntries(
        Object.entries(rawData || {}).filter(
          ([, v]) => v !== undefined && v !== null,
        ),
      ),
    };

    // Map backend 'processes' → 'processSteps'
    if (!rawData?.processSteps?.length && rawData?.processes && Array.isArray(rawData.processes) && rawData.processes.length > 0) {
      merged.processSteps = rawData.processes.map(p => ({
        title: p.title || "",
        description: p.desc || p.description || "",
        icon: p.icon || "",
      }));
    }

    // Map 'inspectionDescription' → 'inspectionText'
    if (rawData?.inspectionDescription && !rawData?.inspectionText) {
      merged.inspectionText = rawData.inspectionDescription;
    }

    // Map 'featuredReviews' → 'testimonials' for display
    if (!rawData?.testimonials?.length && rawData?.featuredReviews && Array.isArray(rawData.featuredReviews) && rawData.featuredReviews.length > 0) {
      merged.testimonials = rawData.featuredReviews.map(r => ({
        name: r.reviewerName || "",
        review: r.reviewText || "",
        rating: r.rating || 0,
        title: r.reviewTitle || "",
      }));
    }

    return merged;
  })();

  const [allReviews, setAllReviews] = useState([]);
  const [selectedReviewIds, setSelectedReviewIds] = useState(
    rawData?.featuredReviews?.map((r) => r.id) || [],
  );

  const [isSaving, setIsSaving] = useState(false);

  const updateField = (field, value) => {
    if (onUpdate) onUpdate({ ...data, [field]: value });
  };

  let consultId = null;
  const storedData =
    typeof window !== "undefined"
      ? localStorage.getItem("sellerTierData")
      : null;
  if (storedData) {
    const parsed = JSON.parse(storedData);
    consultId = parsed?.consultationId;
  }

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

  const updateArrayItem = (arrayName, index, field, value) => {
    const newArray = [...data[arrayName]];
    if (typeof newArray[index] === 'object' && newArray[index] !== null) {
      newArray[index] = { ...newArray[index], [field]: value };
    } else {
      newArray[index] = value;
    }
    updateField(arrayName, newArray);
  };

  const getBlobFromUrl = async (url) => {
    if (!url || !url.startsWith("blob:")) return null;
    try {
      const res = await fetch(url);
      return await res.blob();
    } catch {
      return null;
    }
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
      if (data.whyBuyHeroTemplate1?.id)
        heroData.append("whyBuyHeroTemplateId1", data.whyBuyHeroTemplate1.id);
      if (data.whyBuyHeroTemplate2?.id)
        heroData.append("whyBuyHeroTemplateId2", data.whyBuyHeroTemplate2.id);
      if (data.whyBuyHeroTemplate3?.id)
        heroData.append("whyBuyHeroTemplateId3", data.whyBuyHeroTemplate3.id);
      if (data.whyBuyHeroTemplate4?.id)
        heroData.append("whyBuyHeroTemplateId4", data.whyBuyHeroTemplate4.id);
      if (data.whyBuyHeroTemplate5?.id)
        heroData.append("whyBuyHeroTemplateId5", data.whyBuyHeroTemplate5.id);

      const storyData = new FormData();
      storyData.append("storyTitle", data.storyTitle || "");
      storyData.append("storyDescription", data.storyDescription || "");
      if (data.storyTemplate1?.id)
        storyData.append("storyTemplateId1", data.storyTemplate1.id);
      if (data.storyTemplate2?.id)
        storyData.append("storyTemplateId2", data.storyTemplate2.id);
      if (data.storyTemplate3?.id)
        storyData.append("storyTemplateId3", data.storyTemplate3.id);
      if (data.storyTemplate4?.id)
        storyData.append("storyTemplateId4", data.storyTemplate4.id);

      const vehicleData = new FormData();
      vehicleData.append(
        "vehicleSelectionTitle",
        data.vehicleSelectionTitle || "",
      );
      vehicleData.append(
        "vehicleSelectionDescription",
        data.vehicleSelectionDescription || "",
      );
      if (data.vehicleSelectionTemplate1?.id)
        vehicleData.append(
          "vehicleSelectionTemplateId1",
          data.vehicleSelectionTemplate1.id,
        );
      if (data.vehicleSelectionTemplate2?.id)
        vehicleData.append(
          "vehicleSelectionTemplateId2",
          data.vehicleSelectionTemplate2.id,
        );
      if (data.vehicleSelectionTemplate3?.id)
        vehicleData.append(
          "vehicleSelectionTemplateId3",
          data.vehicleSelectionTemplate3.id,
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
      if (data.processTemplate1?.id)
        processData.append("processTemplateId1", data.processTemplate1.id);
      if (data.processTemplate2?.id)
        processData.append("processTemplateId2", data.processTemplate2.id);
      if (data.processTemplate3?.id)
        processData.append("processTemplateId3", data.processTemplate3.id);
      if (data.processTemplate4?.id)
        processData.append("processTemplateId4", data.processTemplate4.id);

      const inspectionData = new FormData();
      inspectionData.append("inspectionTitle", data.inspectionTitle || "");
      inspectionData.append("inspectionDescription", data.inspectionText || "");
      if (data.inspectionTemplate1?.id)
        inspectionData.append(
          "inspectionTemplateId1",
          data.inspectionTemplate1.id,
        );
      if (data.inspectionTemplate2?.id)
        inspectionData.append(
          "inspectionTemplateId2",
          data.inspectionTemplate2.id,
        );
      if (data.inspectionTemplate3?.id)
        inspectionData.append(
          "inspectionTemplateId3",
          data.inspectionTemplate3.id,
        );
      if (data.inspectionTemplate4?.id)
        inspectionData.append(
          "inspectionTemplateId4",
          data.inspectionTemplate4.id,
        );
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
      if (data.customerCommitmentTemplate1?.id)
        commitmentData.append(
          "customerCommitmentTemplateId1",
          data.customerCommitmentTemplate1.id,
        );
      if (data.customerCommitmentTemplate2?.id)
        commitmentData.append(
          "customerCommitmentTemplateId2",
          data.customerCommitmentTemplate2.id,
        );
      if (data.customerCommitmentTemplate3?.id)
        commitmentData.append(
          "customerCommitmentTemplateId3",
          data.customerCommitmentTemplate3.id,
        );

      await setWhyBuyHero(heroData);
      await setWhyBuyStory(storyData);
      await setWhyBuyVehicleSelection(vehicleData);
      await setWhyBuyProcess(processData);
      await setWhyBuyInspection(inspectionData);
      await setWhyBuyCustomerCommitment(commitmentData);
      await setFeaturedReviews(selectedReviewIds);

      const galleryData = new FormData();
      for (let i = 1; i <= 5; i++) {
        const customField = `customGallery${i}`;
        const tmpl = data[`galleryTemplate${i}`];
        const imageUrl = data[customField] || tmpl?.imageUrl;
        if (imageUrl && imageUrl.startsWith("blob:")) {
          const blob = await getBlobFromUrl(imageUrl);
          if (blob) galleryData.append(customField, blob, `gal${i}.png`);
        } else if (tmpl?.id) {
          galleryData.append(`galleryTemplateId${i}`, tmpl.id);
        }
      }
      await setWhyBuyGallery(galleryData);

      if (onNextTab) onNextTab();
    } catch (error) {
      console.error("Error saving Why Buy sections:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const toggleReviewSelection = (reviewId) => {
    setSelectedReviewIds((prev) => {
      const updated = prev.includes(reviewId)
        ? prev.filter((id) => id !== reviewId)
        : [...prev, reviewId];

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

  const heroImages = [
    data.whyBuyHeroTemplate1?.imageUrl,
    data.whyBuyHeroTemplate2?.imageUrl,
    data.whyBuyHeroTemplate3?.imageUrl,
    data.whyBuyHeroTemplate4?.imageUrl,
    data.whyBuyHeroTemplate5?.imageUrl,
  ].filter(Boolean);

  const storyImages = [
    data.storyTemplate1?.imageUrl,
    data.storyTemplate2?.imageUrl,
    data.storyTemplate3?.imageUrl,
    data.storyTemplate4?.imageUrl,
  ].filter(Boolean);

  const selectionImages = [
    data.vehicleSelectionTemplate1?.imageUrl,
    data.vehicleSelectionTemplate2?.imageUrl,
    data.vehicleSelectionTemplate3?.imageUrl,
  ].filter(Boolean);

  const commitmentImages = [
    data.customerCommitmentTemplate1?.imageUrl,
    data.customerCommitmentTemplate2?.imageUrl,
    data.customerCommitmentTemplate3?.imageUrl,
  ].filter(Boolean);

  const galleryImages = [
    data.customGallery1 || data.galleryTemplate1?.imageUrl,
    data.customGallery2 || data.galleryTemplate2?.imageUrl,
    data.customGallery3 || data.galleryTemplate3?.imageUrl,
    data.customGallery4 || data.galleryTemplate4?.imageUrl,
    data.customGallery5 || data.galleryTemplate5?.imageUrl,
  ].filter(Boolean);

  const processImages = [
    data.processTemplate1?.imageUrl,
    data.processTemplate2?.imageUrl,
    data.processTemplate3?.imageUrl,
    data.processTemplate4?.imageUrl,
  ].filter(Boolean);

  const inspectionImages = [
    data.inspectionTemplate1?.imageUrl,
    data.inspectionTemplate2?.imageUrl,
    data.inspectionTemplate3?.imageUrl,
    data.inspectionTemplate4?.imageUrl,
  ].filter(Boolean);

  if (isEditing) {
    return (
      <div className="w-full max-w-[1480px] mx-auto p-8 rounded-xl space-y-10">
        <GlobalLoader isLoading={isSaving} />
        {/* HERO */}
        <div className="space-y-6">
          <h3 className="text-primary font-bold text-xl mb-4">Hero Section</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <EditorInput
                bold
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
            <div className="space-y-4">
              <p className="text-sm font-semibold text-primary">Hero Images</p>
              <div className="grid grid-cols-2 gap-4">
                <div className="h-40 relative">
                  <ImageUploader
                    label="Image 1"
                    src={data.whyBuyHeroTemplate1?.imageUrl}
                    fieldKey="heroImg1"
                    imageType="WHY_BUY_HERO"
                    onChange={({ imageUrl, id }) => {
                      updateField("whyBuyHeroTemplate1", {
                        ...data.whyBuyHeroTemplate1,
                        imageUrl,
                        id: id ?? data.whyBuyHeroTemplate1?.id,
                      });
                    }}
                    error={errors?.whyBuyHeroTemplate1}
                    errorMsg={errors?.whyBuyHeroTemplate1}
                  />
                </div>
                <div className="h-40 relative">
                  <ImageUploader
                    label="Image 2"
                    src={data.whyBuyHeroTemplate2?.imageUrl}
                    fieldKey="heroImg2"
                    imageType="WHY_BUY_HERO"
                    onChange={({ imageUrl, id }) => {
                      updateField("whyBuyHeroTemplate2", {
                        ...data.whyBuyHeroTemplate2,
                        imageUrl,
                        id: id ?? data.whyBuyHeroTemplate2?.id,
                      });
                    }}
                    error={errors?.whyBuyHeroTemplate2}
                    errorMsg={errors?.whyBuyHeroTemplate2}
                  />
                </div>

                <div className="h-40 relative col-span-2">
                  <ImageUploader
                    label="Image 3"
                    src={data.whyBuyHeroTemplate3?.imageUrl}
                    fieldKey="heroImg3"
                    imageType="WHY_BUY_HERO"
                    onChange={({ imageUrl, id }) => {
                      updateField("whyBuyHeroTemplate3", {
                        ...data.whyBuyHeroTemplate3,
                        imageUrl,
                        id: id ?? data.whyBuyHeroTemplate3?.id,
                      });
                    }}
                    error={errors?.whyBuyHeroTemplate3}
                    errorMsg={errors?.whyBuyHeroTemplate3}
                  />
                </div>
                <div className="h-40 relative">
                  <ImageUploader
                    label="Image 4"
                    src={data.whyBuyHeroTemplate4?.imageUrl}
                    fieldKey="heroImg4"
                    imageType="WHY_BUY_HERO"
                    onChange={({ imageUrl, id }) => {
                      updateField("whyBuyHeroTemplate4", {
                        ...data.whyBuyHeroTemplate4,
                        imageUrl,
                        id: id ?? data.whyBuyHeroTemplate4?.id,
                      });
                    }}
                    error={errors?.whyBuyHeroTemplate4}
                    errorMsg={errors?.whyBuyHeroTemplate4}
                  />
                </div>
                <div className="h-40 relative">
                  <ImageUploader
                    label="Image 5"
                    src={data.whyBuyHeroTemplate5?.imageUrl}
                    fieldKey="heroImg5"
                    imageType="WHY_BUY_HERO"
                    onChange={({ imageUrl, id }) => {
                      updateField("whyBuyHeroTemplate5", {
                        ...data.whyBuyHeroTemplate5,
                        imageUrl,
                        id: id ?? data.whyBuyHeroTemplate5?.id,
                      });
                    }}
                    error={errors?.whyBuyHeroTemplate5}
                    errorMsg={errors?.whyBuyHeroTemplate5}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <hr className="border-third/20" />

        {/* EXPERIENCE (STORY) */}
        <div className="space-y-6">
          <h3 className="text-primary font-bold text-xl mb-4">
            Experience (Story) Section
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <EditorInput
                bold
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
            <div className="space-y-4">
              <p className="text-sm font-semibold text-primary">Story Images</p>
              <div className="grid grid-cols-2 gap-4">
                <div className="h-40 relative col-span-2">
                  <ImageUploader
                    label="Image 1"
                    src={data.storyTemplate1?.imageUrl}
                    fieldKey="storyImg1"
                    imageType="CONSULTANT_STORY"
                    onChange={({ imageUrl, id }) => {
                      updateField("storyTemplate1", {
                        ...data.storyTemplate1,
                        imageUrl,
                        id: id ?? data.storyTemplate1?.id,
                      });
                    }}
                    error={errors?.storyTemplate1}
                    errorMsg={errors?.storyTemplate1}
                  />
                </div>
                <div className="h-40 relative col-span-2">
                  <ImageUploader
                    label="Image 2"
                    src={data.storyTemplate2?.imageUrl}
                    fieldKey="storyImg2"
                    imageType="CONSULTANT_STORY"
                    onChange={({ imageUrl, id }) => {
                      updateField("storyTemplate2", {
                        ...data.storyTemplate2,
                        imageUrl,
                        id: id ?? data.storyTemplate2?.id,
                      });
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <hr className="border-third/20" />

        {/* VEHICLE SELECTION */}
        <div className="space-y-6">
          <h3 className="text-primary font-bold text-xl mb-4">
            Vehicle Selection Section
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
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
              <RichTextEditor
                label="Selection Description"
                value={data.vehicleSelectionDescription}
                onChange={(v) => updateField("vehicleSelectionDescription", v)}
                maxLength={rules?.vehicleSelectionDescription?.max}
                error={!!errors?.vehicleSelectionDescription}
                errorMsg={errors?.vehicleSelectionDescription}
              />
            </div>
            <div className="space-y-4">
              <p className="text-sm font-semibold text-primary">
                Selection Images
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="h-40 relative">
                  <ImageUploader
                    label="Image 1"
                    src={data.vehicleSelectionTemplate1?.imageUrl}
                    fieldKey="selImg1"
                    imageType="VEHICLE_SELECTION"
                    onChange={({ imageUrl, id }) => {
                      updateField("vehicleSelectionTemplate1", {
                        ...data.vehicleSelectionTemplate1,
                        imageUrl,
                        id: id ?? data.vehicleSelectionTemplate1?.id,
                      });
                    }}
                    error={errors?.vehicleSelectionTemplate1}
                    errorMsg={errors?.vehicleSelectionTemplate1}
                  />
                </div>
                <div className="h-40 relative">
                  <ImageUploader
                    label="Image 2"
                    src={data.vehicleSelectionTemplate2?.imageUrl}
                    fieldKey="selImg2"
                    imageType="VEHICLE_SELECTION"
                    onChange={({ imageUrl, id }) => {
                      updateField("vehicleSelectionTemplate2", {
                        ...data.vehicleSelectionTemplate2,
                        imageUrl,
                        id: id ?? data.vehicleSelectionTemplate2?.id,
                      });
                    }}
                    error={errors?.vehicleSelectionTemplate2}
                    errorMsg={errors?.vehicleSelectionTemplate2}
                  />
                </div>
                <div className="h-40 relative col-span-2">
                  <ImageUploader
                    label="Image 3"
                    src={data.vehicleSelectionTemplate3?.imageUrl}
                    fieldKey="selImg3"
                    imageType="VEHICLE_SELECTION"
                    onChange={({ imageUrl, id }) => {
                      updateField("vehicleSelectionTemplate3", {
                        ...data.vehicleSelectionTemplate3,
                        imageUrl,
                        id: id ?? data.vehicleSelectionTemplate3?.id,
                      });
                    }}
                    error={errors?.vehicleSelectionTemplate3}
                    errorMsg={errors?.vehicleSelectionTemplate3}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <hr className="border-third/20" />

        {/* PROCESS */}
        <div className="space-y-6">
          <h3 className="text-primary font-bold text-xl mb-4">
            Process Section
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-1 gap-8">
            <div className="space-y-4">
              <EditorInput
                bold
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
            </div>
            {/* <div className="space-y-4">
              <p className="text-sm font-semibold text-primary">
                Process Images
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="h-40 relative">
                  <ImageUploader
                    label="Image 1"
                    src={data.processTemplate1?.imageUrl}
                    fieldKey="procImg1"
                    imageType="PROCESS"
                    onChange={({ imageUrl, id }) => {
                      updateField("processTemplate1", {
                        ...data.processTemplate1,
                        imageUrl,
                        id: id ?? data.processTemplate1?.id,
                      });
                    }}
                  />
                </div>
                <div className="h-40 relative">
                  <ImageUploader
                    label="Image 2"
                    src={data.processTemplate2?.imageUrl}
                    fieldKey="procImg2"
                    imageType="PROCESS"
                    onChange={({ imageUrl, id }) => {
                      updateField("processTemplate2", {
                        ...data.processTemplate2,
                        imageUrl,
                        id: id ?? data.processTemplate2?.id,
                      });
                    }}
                  />
                </div>
                <div className="h-40 relative">
                  <ImageUploader
                    label="Image 3"
                    src={data.processTemplate3?.imageUrl}
                    fieldKey="procImg3"
                    imageType="PROCESS"
                    onChange={({ imageUrl, id }) => {
                      updateField("processTemplate3", {
                        ...data.processTemplate3,
                        imageUrl,
                        id: id ?? data.processTemplate3?.id,
                      });
                    }}
                  />
                </div>
                <div className="h-40 relative">
                  <ImageUploader
                    label="Image 4"
                    src={data.processTemplate4?.imageUrl}
                    fieldKey="procImg4"
                    imageType="PROCESS"
                    onChange={({ imageUrl, id }) => {
                      updateField("processTemplate4", {
                        ...data.processTemplate4,
                        imageUrl,
                        id: id ?? data.processTemplate4?.id,
                      });
                    }}
                  />
                </div>
              </div>
            </div> */}
          </div>
          <div className="grid md:grid-cols-2 gap-4 mt-6">
            {data.processSteps.map((step, i) => (
              <div
                key={i}
                className="border border-primary/30 p-4 rounded bg-primary/5 space-y-4"
              >
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
                <div className="flex flex-col gap-2 relative mt-4">
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

        <hr className="border-third/20" />

        {/* INSPECTION */}
        <div className="space-y-6">
          <h3 className="text-primary font-bold text-xl mb-4">
            Inspection Section
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <EditorInput
                bold
                label="Inspection Title"
                value={data.inspectionTitle}
                onChange={(e) => updateField("inspectionTitle", e.target.value)}
                maxLength={rules?.inspectionTitle?.max}
                error={!!errors?.inspectionTitle}
                errorMsg={errors?.inspectionTitle}
              />
              <RichTextEditor
                label="Inspection Description"
                value={data.inspectionText}
                onChange={(v) => updateField("inspectionText", v)}
                maxLength={rules?.inspectionText?.max}
                error={!!errors?.inspectionText}
                errorMsg={errors?.inspectionText}
              />
              <div className="space-y-2 mt-4">
                <label className="text-sm font-medium text-primary">
                  Inspection Points
                </label>
                {(data.inspectionPoints || []).map((pt, i) => (
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
            </div>
            <div className="space-y-4">
              <p className="text-sm font-semibold text-primary">
                Inspection Images
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="h-40 relative">
                  <ImageUploader
                    label="Image 1"
                    src={data.inspectionTemplate1?.imageUrl}
                    fieldKey="inspImg1"
                    imageType="INSPECTION_PROCESS"
                    onChange={({ imageUrl, id }) => {
                      updateField("inspectionTemplate1", {
                        ...data.inspectionTemplate1,
                        imageUrl,
                        id: id ?? data.inspectionTemplate1?.id,
                      });
                    }}
                    error={!!errors?.inspectionTemplate1}
                  />
                </div>
                <div className="h-40 relative">
                  <ImageUploader
                    label="Image 2"
                    src={data.inspectionTemplate2?.imageUrl}
                    fieldKey="inspImg2"
                    imageType="INSPECTION_PROCESS"
                    onChange={({ imageUrl, id }) => {
                      updateField("inspectionTemplate2", {
                        ...data.inspectionTemplate2,
                        imageUrl,
                        id: id ?? data.inspectionTemplate2?.id,
                      });
                    }}
                    error={!!errors?.inspectionTemplate2}
                  />
                </div>
                <div className="h-40 relative">
                  <ImageUploader
                    label="Image 3"
                    src={data.inspectionTemplate3?.imageUrl}
                    fieldKey="inspImg3"
                    imageType="INSPECTION_PROCESS"
                    onChange={({ imageUrl, id }) => {
                      updateField("inspectionTemplate3", {
                        ...data.inspectionTemplate3,
                        imageUrl,
                        id: id ?? data.inspectionTemplate3?.id,
                      });
                    }}
                  />
                </div>
                <div className="h-40 relative">
                  <ImageUploader
                    label="Image 4"
                    src={data.inspectionTemplate4?.imageUrl}
                    fieldKey="inspImg4"
                    imageType="INSPECTION_PROCESS"
                    onChange={({ imageUrl, id }) => {
                      updateField("inspectionTemplate4", {
                        ...data.inspectionTemplate4,
                        imageUrl,
                        id: id ?? data.inspectionTemplate4?.id,
                      });
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <hr className="border-third/20" />

        {/* CUSTOMER COMMITMENT */}
        <div className="space-y-6">
          <h3 className="text-primary font-bold text-xl mb-4">
            Customer Commitment Section
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
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
              <RichTextEditor
                label="Commitment Text"
                value={data.customerCommitmentDescription}
                onChange={(v) =>
                  updateField("customerCommitmentDescription", v)
                }
                maxLength={rules?.customerCommitmentDescription?.max}
                error={!!errors?.customerCommitmentDescription}
                errorMsg={errors?.customerCommitmentDescription}
              />
            </div>
            <div className="space-y-4">
              <p className="text-sm font-semibold text-primary">
                Commitment Images
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="h-40 relative">
                  <ImageUploader
                    label="Image 1"
                    src={data.customerCommitmentTemplate1?.imageUrl}
                    fieldKey="commImg1"
                    imageType="CUSTOMER_COMMITMENT"
                    onChange={({ imageUrl, id }) => {
                      updateField("customerCommitmentTemplate1", {
                        ...data.customerCommitmentTemplate1,
                        imageUrl,
                        id: id ?? data.customerCommitmentTemplate1?.id,
                      });
                    }}
                    error={!!errors?.customerCommitmentTemplate1}
                  />
                </div>
                <div className="h-40 relative">
                  <ImageUploader
                    label="Image 2"
                    src={data.customerCommitmentTemplate2?.imageUrl}
                    fieldKey="commImg2"
                    imageType="CUSTOMER_COMMITMENT"
                    onChange={({ imageUrl, id }) => {
                      updateField("customerCommitmentTemplate2", {
                        ...data.customerCommitmentTemplate2,
                        imageUrl,
                        id: id ?? data.customerCommitmentTemplate2?.id,
                      });
                    }}
                  />
                </div>
                <div className="h-40 relative col-span-2">
                  <ImageUploader
                    label="Image 3"
                    src={data.customerCommitmentTemplate3?.imageUrl}
                    fieldKey="commImg3"
                    imageType="CUSTOMER_COMMITMENT"
                    onChange={({ imageUrl, id }) => {
                      updateField("customerCommitmentTemplate3", {
                        ...data.customerCommitmentTemplate3,
                        imageUrl,
                        id: id ?? data.customerCommitmentTemplate3?.id,
                      });
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <hr className="border-third/20" />

        {/* GALLERY */}
        <div className="space-y-6">
          <h3 className="text-primary font-bold text-xl mb-4">
            Gallery Section
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="h-40 relative">
              <ImageUploader
                label="Gallery Image 1"
                src={data.customGallery1 || data.galleryTemplate1?.imageUrl}
                fieldKey="galImg1"
                imageType="GALLERY"
                onChange={({ imageUrl, id }) => {
                  const updated = { ...data, galleryTemplate1: { ...data.galleryTemplate1, imageUrl, id: id ?? data.galleryTemplate1?.id } };
                  if (id) delete updated.customGallery1; else updated.customGallery1 = imageUrl;
                  if (onUpdate) onUpdate(updated);
                }}
                error={!!errors?.galleryTemplate1}
              />
            </div>
            <div className="h-40 relative">
              <ImageUploader
                label="Gallery Image 2"
                src={data.customGallery2 || data.galleryTemplate2?.imageUrl}
                fieldKey="galImg2"
                imageType="GALLERY"
                onChange={({ imageUrl, id }) => {
                  const updated = { ...data, galleryTemplate2: { ...data.galleryTemplate2, imageUrl, id: id ?? data.galleryTemplate2?.id } };
                  if (id) delete updated.customGallery2; else updated.customGallery2 = imageUrl;
                  if (onUpdate) onUpdate(updated);
                }}
              />
            </div>
            <div className="h-40 relative">
              <ImageUploader
                label="Gallery Image 3"
                src={data.customGallery3 || data.galleryTemplate3?.imageUrl}
                fieldKey="galImg3"
                imageType="GALLERY"
                onChange={({ imageUrl, id }) => {
                  const updated = { ...data, galleryTemplate3: { ...data.galleryTemplate3, imageUrl, id: id ?? data.galleryTemplate3?.id } };
                  if (id) delete updated.customGallery3; else updated.customGallery3 = imageUrl;
                  if (onUpdate) onUpdate(updated);
                }}
              />
            </div>
            <div className="h-40 relative">
              <ImageUploader
                label="Gallery Image 4"
                src={data.customGallery4 || data.galleryTemplate4?.imageUrl}
                fieldKey="galImg4"
                imageType="GALLERY"
                onChange={({ imageUrl, id }) => {
                  const updated = { ...data, galleryTemplate4: { ...data.galleryTemplate4, imageUrl, id: id ?? data.galleryTemplate4?.id } };
                  if (id) delete updated.customGallery4; else updated.customGallery4 = imageUrl;
                  if (onUpdate) onUpdate(updated);
                }}
              />
            </div>
            <div className="h-40 relative">
              <ImageUploader
                label="Gallery Image 5"
                src={data.customGallery5 || data.galleryTemplate5?.imageUrl}
                fieldKey="galImg5"
                imageType="GALLERY"
                onChange={({ imageUrl, id }) => {
                  const updated = { ...data, galleryTemplate5: { ...data.galleryTemplate5, imageUrl, id: id ?? data.galleryTemplate5?.id } };
                  if (id) delete updated.customGallery5; else updated.customGallery5 = imageUrl;
                  if (onUpdate) onUpdate(updated);
                }}
              />
            </div>
          </div>
        </div>

        <hr className="border-third/20" />

        {/* TESTIMONIALS */}
        <div>
          <h3 className="text-primary font-bold text-xl mb-4">
            Featured Reviews Title
          </h3>
          {/* <EditorInput
            bold
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
                  className={`relative p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${isSelected
                    ? "border-fourth bg-fourth/10 shadow-md"
                    : "border-third/20 bg-primary/5 hover:border-third/40"
                    }`}
                >
                  <div
                    className={`absolute top-3 right-3 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${isSelected ? "border-fourth bg-fourth" : "border-third/40"}`}
                  >
                    {isSelected && (
                      <CheckCircle2 size={14} className="text-secondary" />
                    )}
                  </div>
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
                  {review.reviewTitle && (
                    <h4 className="text-primary font-semibold text-sm mb-1">
                      {review.reviewTitle}
                    </h4>
                  )}
                  <p className="text-third text-sm leading-relaxed line-clamp-3">
                    {review.reviewText}
                  </p>
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
      {/* ═══════════════════════════════════════
          SECTION 1 — HERO
      ═══════════════════════════════════════ */}
      <section className=" py-12 px-2 lg:px-4 relative flex items-center justify-center overflow-hidden min-h-screen">
        <div className="container">
          <div className=" grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* LEFT CONTENT */}
            <div>
              <h1 className="text-[clamp(28px,5vw,54px)] font-bold leading-[1.15] text-primary mb-5">
                {data.whyBuyHeroTitle}
              </h1>
              <div
                className="text-third/70 text-[15px] leading-[1.9]"
                dangerouslySetInnerHTML={{ __html: data.whyBuyHeroDescription }}
              />
            </div>

            {/* RIGHT — polaroid scatter */}
            <div className="w-full">
              {/* MOBILE: 2-col polaroid grid */}
              <div className="grid grid-cols-2 gap-3 lg:hidden pt-2 pb-4">
                {heroImages.length > 0 ? heroImages.map((src, i) => (
                  <div key={i} className={i === 2 ? "col-span-2" : "col-span-1"}>
                    <div className="bg-white rounded-xs" style={{ padding: "6px 6px 22px", boxShadow: "0 4px 18px rgba(0,0,0,0.12), 0 1px 3px rgba(0,0,0,0.07)", transform: `rotate(${rotations[i] * 0.4}deg)` }}>
                      <img src={src} alt="car" loading="lazy" className="w-full object-cover rounded-[1px] block" style={{ height: i === 2 ? "140px" : "110px" }} />
                    </div>
                  </div>
                )) : (
                  <div className="col-span-2 h-36 bg-third/10 border-2 border-dashed border-third/20 rounded-xl flex items-center justify-center">
                    <span className="text-third/40 text-sm">Hero images not set</span>
                  </div>
                )}
              </div>

              {/* DESKTOP: absolute scatter board */}
              <div className="relative h-[480px] hidden lg:block">
                {heroImages.length > 0 ? heroImages.map((src, i) => (
                  <div key={i} className="absolute cursor-pointer" style={{ ...desktopPositions[i], zIndex: 5 + i }}>
                    <div className="bg-white rounded-xs w-[180px]" style={{ padding: "7px 7px 26px", boxShadow: "0 6px 28px rgba(0,0,0,0.14), 0 1px 4px rgba(0,0,0,0.07)" }}>
                      <img src={src} alt="car" loading="lazy" className="w-full h-[120px] object-cover rounded-[1px] block" />
                    </div>
                  </div>
                )) : (
                  <div className="w-full h-full bg-third/10 border-2 border-dashed border-third/20 rounded-xl flex items-center justify-center">
                    <span className="text-third/40 text-sm">Hero images not set</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SECTION 2 — STORY
      ═══════════════════════════════════════ */}
      <section className="py-12 px-2 lg:px-4 bg-fourth">
        <div className="container">
          <div className="grid max-w-7xl mx-auto grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
            {/* LEFT — text */}
            <div>
              <p className="text-sm tracking-[0.4em] uppercase text-primary/60 font-semibold mb-2">
                Our Story
              </p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.05] text-primary mb-5">
                {data.storyTitle}
              </h2>
              <div
                className="text-primary/90 text-[15px] leading-[1.9] whitespace-pre-line"
                dangerouslySetInnerHTML={{ __html: data.storyDescription }}
              />
            </div>

            {/* RIGHT — stacked images */}
            <div className="flex flex-col gap-4">
              {storyImages.length > 0 ? storyImages.slice(0, 2).map((img, i) => (
                <div key={i} className="w-full h-40 rounded-xl overflow-hidden">
                  <img src={img} loading="lazy" className="w-full h-full object-cover" />
                </div>
              )) : (
                <div className="w-full h-40 bg-primary/10 border-2 border-dashed border-primary/20 rounded-xl flex items-center justify-center">
                  <span className="text-primary/30 text-sm">Story images not set</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SECTION 3 — SELECTION
      ═══════════════════════════════════════ */}
      <section className="py-12 px-2 lg:px-4">
        <div className="container">
          <div className="pt-10 grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
            {/* LEFT — TEXT */}
            <div>
              <p className="text-sm tracking-[0.4em] uppercase text-third font-semibold mb-2">
                Selection
              </p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.05] text-primary mb-5">
                {data.vehicleSelectionTitle}
              </h2>
              <div className="w-8 h-px bg-primary/15 my-3" />
              <div
                className="text-third/70 text-[15px] leading-[1.9]"
                dangerouslySetInnerHTML={{
                  __html: data.vehicleSelectionDescription,
                }}
              />
            </div>

            {/* RIGHT — image grid */}
            <div className="p-3 rounded-2xl w-full h-full">
              <div className="grid grid-cols-3 gap-3 w-full h-full">
                <div className="col-span-2 aspect-4/3 rounded-xl overflow-hidden">
                  {selectionImages[0] ? (
                    <img src={selectionImages[0]} loading="lazy" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-third/10 border-2 border-dashed border-third/20 flex items-center justify-center">
                      <span className="text-third/40 text-xs">Image 1</span>
                    </div>
                  )}
                </div>
                <div className="flex flex-col gap-3">
                  {[1, 2].map((idx) => (
                    <div key={idx} className="aspect-4/3 rounded-xl overflow-hidden">
                      {selectionImages[idx] ? (
                        <img src={selectionImages[idx]} loading="lazy" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full bg-third/10 border-2 border-dashed border-third/20 flex items-center justify-center">
                          <span className="text-third/40 text-xs">Image {idx + 1}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SECTION 4 — PROCESS
      ═══════════════════════════════════════ */}
      <section className="py-12 px-2 lg:px-4">
        <div className="container">
          <div className="flex flex-col gap-3 mb-10">
            <p className="text-sm tracking-[0.4em] uppercase text-third font-semibold">
              Process
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-primary">
              {data.processTitle}
            </h2>
            <div
              className="text-third/60 text-[15px] max-w-md"
              dangerouslySetInnerHTML={{ __html: data.processDescription }}
            />
          </div>

          <div className="relative">
            {/* timeline line */}
            <div className="hidden lg:block absolute top-8 left-0 right-0 h-px bg-third/10" />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
              {data.processSteps.map((step, i) => {
                return (
                  <div key={i} className="relative flex flex-col gap-4">
                    <div className="w-full h-[140px] rounded-xl overflow-hidden">
                      {processImages[i % Math.max(processImages.length, 1)] ? (
                        <img src={processImages[i % processImages.length]} alt={step.title} className="w-full h-full object-cover" loading="lazy" />
                      ) : (
                        <div className="w-full h-full bg-third/10 border-2 border-dashed border-third/20 flex items-center justify-center">
                          <span className="text-third/40 text-xs">Image</span>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-full border border-third/20 flex items-center justify-center overflow-hidden">
                        {typeof step.icon === "string" &&
                          step.icon.startsWith("<svg") ? (
                          <div
                            className="text-primary [&>svg]:w-5 [&>svg]:h-5 transition-colors duration-300"
                            dangerouslySetInnerHTML={{ __html: step.icon }}
                          />
                        ) : (
                          <div className="w-5 h-5 bg-third/20 rounded flex items-center justify-center text-[10px] text-third">
                            Icon
                          </div>
                        )}
                      </div>
                      <span className="text-[11px] tracking-[0.2em] text-third/40 font-semibold">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-[14px] text-primary mb-1">
                        {step.title}
                      </p>
                      <div
                        className="text-[13px] text-third/65 leading-[1.7]"
                        dangerouslySetInnerHTML={{ __html: step.description }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SECTION 5 — INSPECTION
      ═══════════════════════════════════════ */}
      <section className="py-12 px-2 lg:px-4">
        <div className="container">
          {/* header */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-end mb-10">
            <div>
              <p className="text-sm tracking-[0.4em] uppercase text-third font-semibold mb-2">
                Inspection
              </p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-primary">
                {data.inspectionTitle}
              </h2>
            </div>
            <div>
              <div className="w-8 h-px bg-primary/15 my-2" />
              <div
                className="text-third/70 text-[15px] leading-[1.9]"
                dangerouslySetInnerHTML={{ __html: data.inspectionText }}
              />
            </div>
          </div>

          {/* main */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* LEFT — clickable list */}
            <div className="border border-third/10 rounded-2xl overflow-hidden">
              {data.inspectionPoints.map((item, i) => (
                <div
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={`flex justify-between items-center px-6 py-5 cursor-pointer transition ${i === activeIndex
                    ? "bg-primary/5 border-l-4 border-primary"
                    : "hover:bg-primary/3"
                    }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-bold text-primary tracking-[0.2em]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div
                      className="text-sm text-third/80"
                      dangerouslySetInnerHTML={{ __html: item }}
                    />
                  </div>
                  <span className="text-[10px] uppercase font-bold text-primary">
                    View
                  </span>
                </div>
              ))}
            </div>

            {/* RIGHT — active image */}
            <div key={activeIndex} className="w-full h-[260px] rounded-xl overflow-hidden">
              {inspectionImages[activeIndex % Math.max(inspectionImages.length, 1)] ? (
                <img src={inspectionImages[activeIndex % inspectionImages.length]} loading="lazy" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-third/10 border-2 border-dashed border-third/20 flex items-center justify-center">
                  <span className="text-third/40 text-sm">Inspection image not set</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SECTION 6 — COMMITMENT  (bg-fourth)
      ═══════════════════════════════════════ */}
      <section className="py-12 px-2 lg:px-4 bg-fourth">
        <div className="container">
          <div className=" max-w-5xl mx-auto text-center">
            <div>
              <p className="text-sm tracking-[0.4em] uppercase text-primary/60 font-semibold mb-3">
                Commitment
              </p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-primary mb-5">
                {data.customerCommitmentTitle}
              </h2>
              <div className="w-10 h-px bg-primary/20 mx-auto my-4" />
              <div
                className="text-primary/90 text-[15px] leading-[1.9] max-w-5xl"
                dangerouslySetInnerHTML={{
                  __html: data.customerCommitmentDescription,
                }}
              />
            </div>

            {/* image strip */}
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {commitmentImages.length > 0 ? commitmentImages.map((img, i) => (
                <div key={i} className={`relative rounded-xl overflow-hidden ${i === 1 ? "lg:scale-105 lg:-translate-y-2 z-10" : ""}`}>
                  <div className="w-full aspect-4/3">
                    <img src={img} loading="lazy" className="w-full h-full object-cover transition duration-500 hover:scale-105" />
                  </div>
                </div>
              )) : (
                <div className="col-span-3 h-40 bg-primary/10 border-2 border-dashed border-primary/20 rounded-xl flex items-center justify-center">
                  <span className="text-primary/30 text-sm">Commitment images not set</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SECTION 7 — GALLERY
      ═══════════════════════════════════════ */}
      <section className="py-12 px-2 lg:px-4">
        <div className="container">
          <div className="flex flex-col gap-3 mb-10">
            <p className="text-sm tracking-[0.4em] uppercase text-third font-semibold">
              Gallery
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-primary">
              Our Showcase
            </h2>
          </div>

          {/* masonry grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 auto-rows-[120px]">
            <div className="col-span-2 row-span-2 rounded-xl overflow-hidden">
              {galleryImages[0] ? (
                <img src={galleryImages[0]} loading="lazy" className="w-full h-full object-cover hover:scale-105 transition duration-500" />
              ) : (
                <div className="w-full h-full bg-third/10 border-2 border-dashed border-third/20 flex items-center justify-center">
                  <span className="text-third/40 text-xs">Gallery 1</span>
                </div>
              )}
            </div>
            <div className="col-span-1 row-span-1 rounded-xl overflow-hidden">
              {galleryImages[1] ? (
                <img src={galleryImages[1]} loading="lazy" className="w-full h-full object-cover hover:scale-105 transition duration-500" />
              ) : (
                <div className="w-full h-full bg-third/10 border-2 border-dashed border-third/20 flex items-center justify-center">
                  <span className="text-third/40 text-xs">Gallery 2</span>
                </div>
              )}
            </div>
            <div className="col-span-1 row-span-2 rounded-xl overflow-hidden">
              {galleryImages[2] ? (
                <img src={galleryImages[2]} loading="lazy" className="w-full h-full object-cover hover:scale-105 transition duration-500" />
              ) : (
                <div className="w-full h-full bg-third/10 border-2 border-dashed border-third/20 flex items-center justify-center">
                  <span className="text-third/40 text-xs">Gallery 3</span>
                </div>
              )}
            </div>
            <div className="col-span-1 row-span-1 rounded-xl overflow-hidden">
              {galleryImages[3] ? (
                <img src={galleryImages[3]} loading="lazy" className="w-full h-full object-cover hover:scale-105 transition duration-500" />
              ) : (
                <div className="w-full h-full bg-third/10 border-2 border-dashed border-third/20 flex items-center justify-center">
                  <span className="text-third/40 text-xs">Gallery 4</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SECTION 8 — TESTIMONIALS
      ═══════════════════════════════════════ */}
      {data.testimonials && data.testimonials.length > 0 && (
        <section className="py-12 px-2 lg:px-4">
          <div className="container">
            {/* header */}
            <div className="flex items-end justify-between mb-12">
              <div className="flex flex-col gap-3">
                <p className="text-sm tracking-[0.4em] uppercase text-third font-semibold mb-2">
                  Reviews
                </p>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-primary">
                  What Our Customers Say
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {data.testimonials.slice(0, 2).map((t, i) => (
                <div
                  key={`${t.name}-${i}`}
                  className="group relative rounded-2xl p-7 bg-white/5 backdrop-blur-md border border-white/10 hover:border-primary/30 transition-all duration-300 overflow-hidden"
                >
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-linear-to-br from-primary/10 via-transparent to-transparent" />

                  {/* Rating Stars */}
                  {t.rating && (
                    <div className="flex gap-1 mb-4 relative z-10">
                      {[...Array(5)].map((_, idx) => (
                        <Star
                          key={idx}
                          size={16}
                          className={
                            idx < t.rating
                              ? "text-fourth fill-fourth"
                              : "text-third/30"
                          }
                        />
                      ))}
                    </div>
                  )}

                  {/* Review Title */}
                  {t.title && (
                    <h4 className="font-semibold text-primary mb-3 relative z-10">
                      {t.title}
                    </h4>
                  )}

                  {/* Review Text */}
                  <div
                    className="font-[Poppins] text-[14px] leading-[1.9] text-third/80 italic relative z-10 mb-6"
                    dangerouslySetInnerHTML={{ __html: t.review }}
                  />

                  <div className="w-full h-px bg-primary/10 mb-5 relative z-10" />

                  {/* Reviewer Info */}
                  <div className="flex items-center gap-3 relative z-10">
                    <div className="w-10 h-10 rounded-full bg-linear-to-br from-primary/20 to-primary/5 flex items-center justify-center font-bold text-[14px] text-primary">
                      {t.name?.[0] || "?"}
                    </div>
                    <div>
                      <p className="font-[Montserrat] font-semibold text-[13px] text-primary">
                        {t.name}
                      </p>
                      <p className="text-[11px] text-third/50">Verified Buyer</p>
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
