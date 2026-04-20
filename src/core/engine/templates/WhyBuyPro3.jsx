/* eslint-disable react-hooks/set-state-in-effect */
"use client";
import {
  Camera,
  Check,
  ChevronLeft,
  ChevronRight,
  Handshake,
  MessageCircle,
  Quote,
  Search,
  ShieldCheck,
  CheckCircle2,
  Star,
} from "lucide-react";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { WHY_BUY_PRO_3 } from "../schemas/whybuy/why_buy_pro_3";
import RichTextEditor from "../atoms/RichTextEditor";
import Button from "@/components/ui/button";
import GlobalLoader from "@/components/ui/GlobalLoader";
import EditorInput from "../atoms/EditorInput";
import { ImageUploader } from "../atoms/ImageUploader ";
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
import { getAllReviewById } from "@/services/user.service";
const DEFAULT_DATA = WHY_BUY_PRO_3[0].data;
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
const INTERVAL = 5000;
const iconMap = { Search, MessageCircle, ShieldCheck, Handshake };
export default function WhyBuyPro3({
  data: rawData,
  isEditing,
  onUpdate,
  onNextTab,
  errors,
  rules,
}) {
  const [isSaving, setIsSaving] = useState(false);
  const data = {
    ...DEFAULT_DATA,
    ...Object.fromEntries(
      Object.entries(rawData || {}).filter(
        ([, v]) => v !== undefined && v !== null,
      ),
    ),
  };
  const updateField = (field, value) => {
    if (onUpdate) onUpdate({ ...data, [field]: value });
  };
  const updateArrayItem = (arrayName, index, field, value) => {
    const newArray = [...data[arrayName]];
    if (newArray[index]) {
      newArray[index][field] = value;
      updateField(arrayName, newArray);
    }
  };
  const [allReviews, setAllReviews] = useState([]);
  const [selectedReviewIds, setSelectedReviewIds] = useState(
    rawData?.featuredReviews?.map((r) => r.id) || [],
  );
  const [active, setActive] = useState(0);
  const [fading, setFading] = useState(false);
  const [hovered, setHovered] = useState(null);
  const [avxInspectionHovered, setAvxInspectionHovered] = useState(0);
  const [testimonialsactive, setTestimonialsActive] = useState(0);
  const [visible, setVisible] = useState(true);
  const testimonialsTotal = data.featuredReviews?.length || 0;
  const activeHovered = hovered ?? 0;
  const activeRef = useRef(0);
  const timeoutRef = useRef(null);
  const heroImages = [
    data.whyBuyHeroTemplate1?.imageUrl,
    data.whyBuyHeroTemplate2?.imageUrl,
    data.whyBuyHeroTemplate3?.imageUrl,
    data.whyBuyHeroTemplate4?.imageUrl,
    data.whyBuyHeroTemplate5?.imageUrl,
  ].filter(Boolean);
  const storyImages = [
    data.whyBuyStoryTemplate1?.imageUrl,
    data.whyBuyStoryTemplate2?.imageUrl,
    data.whyBuyStoryTemplate3?.imageUrl,
    data.whyBuyStoryTemplate4?.imageUrl,
    data.whyBuyStoryTemplate5?.imageUrl,
  ].filter(Boolean);
  const vehicleSelectionImages = [
    data.whyBuyVehicleSelectionTemplate1?.imageUrl,
    data.whyBuyVehicleSelectionTemplate2?.imageUrl,
    data.whyBuyVehicleSelectionTemplate3?.imageUrl,
    data.whyBuyVehicleSelectionTemplate4?.imageUrl,
    data.whyBuyVehicleSelectionTemplate5?.imageUrl,
  ].filter(Boolean);
  const processImages = [
    data.whyBuyProcessTemplate1?.imageUrl,
    data.whyBuyProcessTemplate2?.imageUrl,
    data.whyBuyProcessTemplate3?.imageUrl,
    data.whyBuyProcessTemplate4?.imageUrl,
  ].filter(Boolean);
  const inspectionImages = [
    data.whyBuyInspectionTemplate1?.imageUrl,
    data.whyBuyInspectionTemplate2?.imageUrl,
    data.whyBuyInspectionTemplate3?.imageUrl,
    data.whyBuyInspectionTemplate4?.imageUrl,
  ].filter(Boolean);
  const galleryImages = [
    data.whyBuyGalleryTemplate1?.imageUrl,
    data.whyBuyGalleryTemplate2?.imageUrl,
    data.whyBuyGalleryTemplate3?.imageUrl,
    data.whyBuyGalleryTemplate4?.imageUrl,
  ].filter(Boolean);
  const total = heroImages.length;
  const goTo = useCallback((index) => {
    setFading(true);
    setTimeout(() => {
      setActive(index);
      activeRef.current = index;
      setFading(false);
    }, 500);
  }, []);
  useEffect(() => {
    const id = setInterval(() => {
      goTo((activeRef.current + 1) % total);
    }, INTERVAL);
    return () => clearInterval(id);
  }, [goTo, total]);
  const transition = (newIndex) => {
    setVisible(false);
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setTestimonialsActive(newIndex);
      setVisible(true);
    }, 350);
  };
  const prev = () =>
    transition(
      (testimonialsactive - 1 + testimonialsTotal) % testimonialsTotal,
    );
  const next = () => transition((testimonialsactive + 1) % testimonialsTotal);
  useEffect(() => () => clearTimeout(timeoutRef.current), []);
  const item = data.featuredReviews?.[testimonialsactive] || {};
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
  }, [consultId, rawData]);
  const handleSaveAndNext = async () => {
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
      storyData.append("storyTitle", data.whyBuyStoryTitle || "");
      storyData.append("storyDescription", data.whyBuyStoryDescription || "");
      if (data.whyBuyStoryTemplate1?.id)
        storyData.append("storyTemplateId1", data.whyBuyStoryTemplate1.id);
      if (data.whyBuyStoryTemplate2?.id)
        storyData.append("storyTemplateId2", data.whyBuyStoryTemplate2.id);
      if (data.whyBuyStoryTemplate3?.id)
        storyData.append("storyTemplateId3", data.whyBuyStoryTemplate3.id);
      if (data.whyBuyStoryTemplate4?.id)
        storyData.append("storyTemplateId4", data.whyBuyStoryTemplate4.id);
      if (data.whyBuyStoryTemplate5?.id)
        storyData.append("storyTemplateId5", data.whyBuyStoryTemplate5.id);

      const vehicleData = new FormData();
      vehicleData.append(
        "vehicleSelectionTitle",
        data.whyBuyVehicleSelectionTitle || "",
      );
      vehicleData.append(
        "vehicleSelectionDescription",
        data.whyBuyVehicleSelectionDescription || "",
      );
      if (data.whyBuyVehicleSelectionTemplate1?.id)
        vehicleData.append(
          "vehicleSelectionTemplateId1",
          data.whyBuyVehicleSelectionTemplate1.id,
        );
      if (data.whyBuyVehicleSelectionTemplate2?.id)
        vehicleData.append(
          "vehicleSelectionTemplateId2",
          data.whyBuyVehicleSelectionTemplate2.id,
        );
      if (data.whyBuyVehicleSelectionTemplate3?.id)
        vehicleData.append(
          "vehicleSelectionTemplateId3",
          data.whyBuyVehicleSelectionTemplate3.id,
        );
      if (data.whyBuyVehicleSelectionTemplate4?.id)
        vehicleData.append(
          "vehicleSelectionTemplateId4",
          data.whyBuyVehicleSelectionTemplate4.id,
        );
      if (data.whyBuyVehicleSelectionTemplate5?.id)
        vehicleData.append(
          "vehicleSelectionTemplateId5",
          data.whyBuyVehicleSelectionTemplate5.id,
        );

      const processData = new FormData();
      processData.append("processTitle", data.whyBuyProcessTitle || "");
      processData.append(
        "processDescription",
        data.whyBuyProcessDescription || "",
      );
      if (data.processSteps) {
        data.processSteps.forEach((step, i) => {
          processData.append(`processes[${i}].title`, step.title || "");
          processData.append(`processes[${i}].desc`, step.description || "");
          processData.append(`processes[${i}].icon`, step.icon || "");
        });
      }
      if (data.whyBuyProcessTemplate1?.id)
        processData.append(
          "processTemplateId1",
          data.whyBuyProcessTemplate1.id,
        );
      if (data.whyBuyProcessTemplate2?.id)
        processData.append(
          "processTemplateId2",
          data.whyBuyProcessTemplate2.id,
        );
      if (data.whyBuyProcessTemplate3?.id)
        processData.append(
          "processTemplateId3",
          data.whyBuyProcessTemplate3.id,
        );
      if (data.whyBuyProcessTemplate4?.id)
        processData.append(
          "processTemplateId4",
          data.whyBuyProcessTemplate4.id,
        );

      const inspectionData = new FormData();
      inspectionData.append(
        "inspectionTitle",
        data.whyBuyInspectionTitle || "",
      );
      inspectionData.append(
        "inspectionDescription",
        data.whyBuyInspectionDescription || "",
      );
      if (data.whyBuyInspectionTemplate1?.id)
        inspectionData.append(
          "inspectionTemplateId1",
          data.whyBuyInspectionTemplate1.id,
        );
      if (data.whyBuyInspectionTemplate2?.id)
        inspectionData.append(
          "inspectionTemplateId2",
          data.whyBuyInspectionTemplate2.id,
        );
      if (data.whyBuyInspectionTemplate3?.id)
        inspectionData.append(
          "inspectionTemplateId3",
          data.whyBuyInspectionTemplate3.id,
        );
      if (data.whyBuyInspectionTemplate4?.id)
        inspectionData.append(
          "inspectionTemplateId4",
          data.whyBuyInspectionTemplate4.id,
        );
      if (data.inspectionPoints) {
        data.inspectionPoints.forEach((pt, i) => {
          inspectionData.append(`inspectionPoints[${i}]`, pt || "");
        });
      }

      const commitmentData = new FormData();
      commitmentData.append(
        "customerCommitmentTitle",
        data.whyBuyCustomerCommitmentTitle || "",
      );
      commitmentData.append(
        "customerCommitmentDescription",
        data.whyBuyCustomerCommitmentDescription || "",
      );

      await Promise.all([
        setWhyBuyHero(heroData),
        setWhyBuyStory(storyData),
        setWhyBuyVehicleSelection(vehicleData),
        setWhyBuyProcess(processData),
        setWhyBuyInspection(inspectionData),
        setWhyBuyCustomerCommitment(commitmentData),
        setFeaturedReviews(selectedReviewIds),
      ]);

      if (onNextTab) onNextTab();
    } catch (error) {
      console.error("Error saving Why Buy sections:", error);
    } finally {
      setIsSaving(false);
    }
  };
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
                value={data.whyBuyStoryTitle}
                onChange={(e) =>
                  updateField("whyBuyStoryTitle", e.target.value)
                }
                maxLength={rules?.whyBuyStoryTitle?.max}
                error={!!errors?.whyBuyStoryTitle}
                errorMsg={errors?.whyBuyStoryTitle}
              />
              <RichTextEditor
                label="Story Description"
                value={data.whyBuyStoryDescription}
                onChange={(v) => updateField("whyBuyStoryDescription", v)}
                maxLength={rules?.whyBuyStoryDescription?.max}
                error={!!errors?.whyBuyStoryDescription}
                errorMsg={errors?.whyBuyStoryDescription}
              />
            </div>
            <div className="space-y-4">
              <p className="text-sm font-semibold text-primary">Story Images</p>
              <div className="grid grid-cols-2 gap-4">
                <div className="h-40 relative col-span-2">
                  <ImageUploader
                    label="Image 1"
                    src={data.whyBuyStoryTemplate1?.imageUrl}
                    fieldKey="storyImg1"
                    imageType="CONSULTANT_STORY"
                    onChange={({ imageUrl, id }) => {
                      updateField("whyBuyStoryTemplate1", {
                        ...data.whyBuyStoryTemplate1,
                        imageUrl,
                        id: id ?? data.whyBuyStoryTemplate1?.id,
                      });
                    }}
                    error={errors?.whyBuyStoryTemplate1}
                    errorMsg={errors?.whyBuyStoryTemplate1}
                  />
                </div>
                <div className="h-40 relative">
                  <ImageUploader
                    label="Image 2"
                    src={data.whyBuyStoryTemplate2?.imageUrl}
                    fieldKey="storyImg2"
                    imageType="CONSULTANT_STORY"
                    onChange={({ imageUrl, id }) => {
                      updateField("whyBuyStoryTemplate2", {
                        ...data.whyBuyStoryTemplate2,
                        imageUrl,
                        id: id ?? data.whyBuyStoryTemplate2?.id,
                      });
                    }}
                    error={errors?.whyBuyStoryTemplate2}
                    errorMsg={errors?.whyBuyStoryTemplate2}
                  />
                </div>
                <div className="h-40 relative">
                  <ImageUploader
                    label="Image 3"
                    src={data.whyBuyStoryTemplate3?.imageUrl}
                    fieldKey="storyImg3"
                    imageType="CONSULTANT_STORY"
                    onChange={({ imageUrl, id }) => {
                      updateField("whyBuyStoryTemplate3", {
                        ...data.whyBuyStoryTemplate3,
                        imageUrl,
                        id: id ?? data.whyBuyStoryTemplate3?.id,
                      });
                    }}
                    error={errors?.whyBuyStoryTemplate3}
                    errorMsg={errors?.whyBuyStoryTemplate3}
                  />
                </div>
                <div className="h-40 relative">
                  <ImageUploader
                    label="Image 4"
                    src={data.whyBuyStoryTemplate4?.imageUrl}
                    fieldKey="storyImg4"
                    imageType="CONSULTANT_STORY"
                    onChange={({ imageUrl, id }) => {
                      updateField("whyBuyStoryTemplate4", {
                        ...data.whyBuyStoryTemplate4,
                        imageUrl,
                        id: id ?? data.whyBuyStoryTemplate4?.id,
                      });
                    }}
                    error={errors?.whyBuyStoryTemplate4}
                    errorMsg={errors?.whyBuyStoryTemplate4}
                  />
                </div>
                <div className="h-40 relative">
                  <ImageUploader
                    label="Image 5"
                    src={data.whyBuyStoryTemplate5?.imageUrl}
                    fieldKey="storyImg5"
                    imageType="CONSULTANT_STORY"
                    onChange={({ imageUrl, id }) => {
                      updateField("whyBuyStoryTemplate5", {
                        ...data.whyBuyStoryTemplate5,
                        imageUrl,
                        id: id ?? data.whyBuyStoryTemplate5?.id,
                      });
                    }}
                    error={errors?.whyBuyStoryTemplate5}
                    errorMsg={errors?.whyBuyStoryTemplate5}
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
                value={data.whyBuyVehicleSelectionTitle}
                onChange={(e) =>
                  updateField("whyBuyVehicleSelectionTitle", e.target.value)
                }
                maxLength={rules?.whyBuyVehicleSelectionTitle?.max}
                error={!!errors?.whyBuyVehicleSelectionTitle}
                errorMsg={errors?.whyBuyVehicleSelectionTitle}
              />
              <RichTextEditor
                label="Selection Description"
                value={data.whyBuyVehicleSelectionDescription}
                onChange={(v) =>
                  updateField("whyBuyVehicleSelectionDescription", v)
                }
                maxLength={rules?.whyBuyVehicleSelectionDescription?.max}
                error={!!errors?.whyBuyVehicleSelectionDescription}
                errorMsg={errors?.whyBuyVehicleSelectionDescription}
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
                    src={data.whyBuyVehicleSelectionTemplate1?.imageUrl}
                    fieldKey="selImg1"
                    imageType="VEHICLE_SELECTION"
                    onChange={({ imageUrl, id }) => {
                      updateField("whyBuyVehicleSelectionTemplate1", {
                        ...data.whyBuyVehicleSelectionTemplate1,
                        imageUrl,
                        id: id ?? data.whyBuyVehicleSelectionTemplate1?.id,
                      });
                    }}
                  />
                </div>
                <div className="h-40 relative">
                  <ImageUploader
                    label="Image 2"
                    src={data.whyBuyVehicleSelectionTemplate2?.imageUrl}
                    fieldKey="selImg2"
                    imageType="VEHICLE_SELECTION"
                    onChange={({ imageUrl, id }) => {
                      updateField("whyBuyVehicleSelectionTemplate2", {
                        ...data.whyBuyVehicleSelectionTemplate2,
                        imageUrl,
                        id: id ?? data.whyBuyVehicleSelectionTemplate2?.id,
                      });
                    }}
                  />
                </div>
                <div className="h-40 relative col-span-2">
                  <ImageUploader
                    label="Image 3"
                    src={data.whyBuyVehicleSelectionTemplate3?.imageUrl}
                    fieldKey="selImg3"
                    imageType="VEHICLE_SELECTION"
                    onChange={({ imageUrl, id }) => {
                      updateField("whyBuyVehicleSelectionTemplate3", {
                        ...data.whyBuyVehicleSelectionTemplate3,
                        imageUrl,
                        id: id ?? data.whyBuyVehicleSelectionTemplate3?.id,
                      });
                    }}
                  />
                </div>
                <div className="h-40 relative">
                  <ImageUploader
                    label="Image 4"
                    src={data.whyBuyVehicleSelectionTemplate4?.imageUrl}
                    fieldKey="selImg4"
                    imageType="VEHICLE_SELECTION"
                    onChange={({ imageUrl, id }) => {
                      updateField("whyBuyVehicleSelectionTemplate4", {
                        ...data.whyBuyVehicleSelectionTemplate4,
                        imageUrl,
                        id: id ?? data.whyBuyVehicleSelectionTemplate4?.id,
                      });
                    }}
                  />
                </div>
                <div className="h-40 relative">
                  <ImageUploader
                    label="Image 5"
                    src={data.whyBuyVehicleSelectionTemplate5?.imageUrl}
                    fieldKey="selImg5"
                    imageType="VEHICLE_SELECTION"
                    onChange={({ imageUrl, id }) => {
                      updateField("whyBuyVehicleSelectionTemplate5", {
                        ...data.whyBuyVehicleSelectionTemplate5,
                        imageUrl,
                        id: id ?? data.whyBuyVehicleSelectionTemplate5?.id,
                      });
                    }}
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
                value={data.whyBuyProcessTitle}
                onChange={(e) =>
                  updateField("whyBuyProcessTitle", e.target.value)
                }
                maxLength={rules?.whyBuyProcessTitle?.max}
                error={!!errors?.whyBuyProcessTitle}
                errorMsg={errors?.whyBuyProcessTitle}
              />
              <RichTextEditor
                label="Process Description"
                value={data.whyBuyProcessDescription}
                onChange={(v) => updateField("whyBuyProcessDescription", v)}
                maxLength={rules?.whyBuyProcessDescription?.max}
                error={!!errors?.whyBuyProcessDescription}
                errorMsg={errors?.whyBuyProcessDescription}
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
                    src={data.whyBuyProcessTemplate1?.imageUrl}
                    fieldKey="procImg1"
                    imageType="PROCESS"
                    onChange={({ imageUrl, id }) => {
                      updateField("whyBuyProcessTemplate1", {
                        ...data.whyBuyProcessTemplate1,
                        imageUrl,
                        id: id ?? data.whyBuyProcessTemplate1?.id,
                      });
                    }}
                  />
                </div>
                <div className="h-40 relative">
                  <ImageUploader
                    label="Image 2"
                    src={data.whyBuyProcessTemplate2?.imageUrl}
                    fieldKey="procImg2"
                    imageType="PROCESS"
                    onChange={({ imageUrl, id }) => {
                      updateField("whyBuyProcessTemplate2", {
                        ...data.whyBuyProcessTemplate2,
                        imageUrl,
                        id: id ?? data.whyBuyProcessTemplate2?.id,
                      });
                    }}
                  />
                </div>
                <div className="h-40 relative">
                  <ImageUploader
                    label="Image 3"
                    src={data.whyBuyProcessTemplate3?.imageUrl}
                    fieldKey="procImg3"
                    imageType="PROCESS"
                    onChange={({ imageUrl, id }) => {
                      updateField("whyBuyProcessTemplate3", {
                        ...data.whyBuyProcessTemplate3,
                        imageUrl,
                        id: id ?? data.whyBuyProcessTemplate3?.id,
                      });
                    }}
                  />
                </div>
                <div className="h-40 relative">
                  <ImageUploader
                    label="Image 4"
                    src={data.whyBuyProcessTemplate4?.imageUrl}
                    fieldKey="procImg4"
                    imageType="PROCESS"
                    onChange={({ imageUrl, id }) => {
                      updateField("whyBuyProcessTemplate4", {
                        ...data.whyBuyProcessTemplate4,
                        imageUrl,
                        id: id ?? data.whyBuyProcessTemplate4?.id,
                      });
                    }}
                  />
                </div>
              </div>
            </div> */}
          </div>
          <div className="grid md:grid-cols-2 gap-4 mt-6">
            {data.processSteps?.map((step, i) => (
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
                value={data.whyBuyInspectionTitle}
                onChange={(e) =>
                  updateField("whyBuyInspectionTitle", e.target.value)
                }
                maxLength={rules?.whyBuyInspectionTitle?.max}
                error={!!errors?.whyBuyInspectionTitle}
                errorMsg={errors?.whyBuyInspectionTitle}
              />
              <RichTextEditor
                label="Inspection Description"
                value={data.whyBuyInspectionDescription}
                onChange={(v) => updateField("whyBuyInspectionDescription", v)}
                maxLength={rules?.whyBuyInspectionDescription?.max}
                error={!!errors?.whyBuyInspectionDescription}
                errorMsg={errors?.whyBuyInspectionDescription}
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
                    src={data.whyBuyInspectionTemplate1?.imageUrl}
                    fieldKey="inspImg1"
                    imageType="INSPECTION_PROCESS"
                    onChange={({ imageUrl, id }) => {
                      updateField("whyBuyInspectionTemplate1", {
                        ...data.whyBuyInspectionTemplate1,
                        imageUrl,
                        id: id ?? data.whyBuyInspectionTemplate1?.id,
                      });
                    }}
                    error={!!errors?.whyBuyInspectionTemplate1}
                  />
                </div>
                <div className="h-40 relative">
                  <ImageUploader
                    label="Image 2"
                    src={data.whyBuyInspectionTemplate2?.imageUrl}
                    fieldKey="inspImg2"
                    imageType="INSPECTION_PROCESS"
                    onChange={({ imageUrl, id }) => {
                      updateField("whyBuyInspectionTemplate2", {
                        ...data.whyBuyInspectionTemplate2,
                        imageUrl,
                        id: id ?? data.whyBuyInspectionTemplate2?.id,
                      });
                    }}
                  />
                </div>
                <div className="h-40 relative">
                  <ImageUploader
                    label="Image 3"
                    src={data.whyBuyInspectionTemplate3?.imageUrl}
                    fieldKey="inspImg3"
                    imageType="INSPECTION_PROCESS"
                    onChange={({ imageUrl, id }) => {
                      updateField("whyBuyInspectionTemplate3", {
                        ...data.whyBuyInspectionTemplate3,
                        imageUrl,
                        id: id ?? data.whyBuyInspectionTemplate3?.id,
                      });
                    }}
                  />
                </div>
                <div className="h-40 relative">
                  <ImageUploader
                    label="Image 4"
                    src={data.whyBuyInspectionTemplate4?.imageUrl}
                    fieldKey="inspImg4"
                    imageType="INSPECTION_PROCESS"
                    onChange={({ imageUrl, id }) => {
                      updateField("whyBuyInspectionTemplate4", {
                        ...data.whyBuyInspectionTemplate4,
                        imageUrl,
                        id: id ?? data.whyBuyInspectionTemplate4?.id,
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
                value={data.whyBuyCustomerCommitmentTitle}
                onChange={(e) =>
                  updateField("whyBuyCustomerCommitmentTitle", e.target.value)
                }
                maxLength={rules?.whyBuyCustomerCommitmentTitle?.max}
                error={!!errors?.whyBuyCustomerCommitmentTitle}
                errorMsg={errors?.whyBuyCustomerCommitmentTitle}
              />
              <RichTextEditor
                label="Commitment Text"
                value={data.whyBuyCustomerCommitmentDescription}
                onChange={(v) =>
                  updateField("whyBuyCustomerCommitmentDescription", v)
                }
                maxLength={rules?.whyBuyCustomerCommitmentDescription?.max}
                error={!!errors?.whyBuyCustomerCommitmentDescription}
                errorMsg={errors?.whyBuyCustomerCommitmentDescription}
              />
            </div>
          </div>
        </div>
        <hr className="border-third/20" />
        {/* GALLERY */}
        <div className="space-y-6">
          <h3 className="text-primary font-bold text-xl mb-4">
            Gallery Section
          </h3>
          <EditorInput
            bold
            label="Gallery Title"
            value={data.whyBuyGalleryTitle}
            onChange={(e) => updateField("whyBuyGalleryTitle", e.target.value)}
            maxLength={rules?.whyBuyGalleryTitle?.max}
            error={!!errors?.whyBuyGalleryTitle}
            errorMsg={errors?.whyBuyGalleryTitle}
          />
          <br />
          <div className="grid grid-cols-2 gap-4">
            <div className="h-40 relative">
              <ImageUploader
                label="Gallery Image 1"
                src={data.whyBuyGalleryTemplate1?.imageUrl}
                fieldKey="galImg1"
                imageType="GALLERY"
                onChange={({ imageUrl, id }) => {
                  updateField("whyBuyGalleryTemplate1", {
                    ...data.whyBuyGalleryTemplate1,
                    imageUrl,
                    id: id ?? data.whyBuyGalleryTemplate1?.id,
                  });
                }}
                error={!!errors?.whyBuyGalleryTemplate1}
              />
            </div>
            <div className="h-40 relative">
              <ImageUploader
                label="Gallery Image 2"
                src={data.whyBuyGalleryTemplate2?.imageUrl}
                fieldKey="galImg2"
                imageType="GALLERY"
                onChange={({ imageUrl, id }) => {
                  updateField("whyBuyGalleryTemplate2", {
                    ...data.whyBuyGalleryTemplate2,
                    imageUrl,
                    id: id ?? data.whyBuyGalleryTemplate2?.id,
                  });
                }}
              />
            </div>
            <div className="h-40 relative">
              <ImageUploader
                label="Gallery Image 3"
                src={data.whyBuyGalleryTemplate3?.imageUrl}
                fieldKey="galImg3"
                imageType="GALLERY"
                onChange={({ imageUrl, id }) => {
                  updateField("whyBuyGalleryTemplate3", {
                    ...data.whyBuyGalleryTemplate3,
                    imageUrl,
                    id: id ?? data.whyBuyGalleryTemplate3?.id,
                  });
                }}
              />
            </div>
            <div className="h-40 relative">
              <ImageUploader
                label="Gallery Image 4"
                src={data.whyBuyGalleryTemplate4?.imageUrl}
                fieldKey="galImg4"
                imageType="GALLERY"
                onChange={({ imageUrl, id }) => {
                  updateField("whyBuyGalleryTemplate4", {
                    ...data.whyBuyGalleryTemplate4,
                    imageUrl,
                    id: id ?? data.whyBuyGalleryTemplate4?.id,
                  });
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
          <EditorInput
            bold
            label="Section Title"
            value={data.whyBuyTestimonialTitle}
            onChange={(e) =>
              updateField("whyBuyTestimonialTitle", e.target.value)
            }
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
          <Button
            onClick={handleSaveAndNext}
            disabled={isSaving}
            variant="ghost"
          >
            {isSaving ? "Saving..." : "Save"}
          </Button>
        </div>
      </div>
    );
  }
  return (
    <>
      {/* ===== Hero Section ===== */}
      <section className="relative w-full overflow-hidden min-h-screen">
        <img
          src={heroImages[active]}
          alt="vehicle"
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            opacity: fading ? 0 : 1,
            transform: fading ? "scale(1.04)" : "scale(1)",
            transition: "opacity 0.5s ease, transform 0.5s ease",
          }}
        />
        <div className="absolute inset-0 bg-linear-to-t from-secondary/70 via-secondary/50 to-secondary/30" />
        <div className="absolute inset-0 flex items-center justify-center px-8">
          <div className="max-w-3xl w-full flex flex-col items-center text-center gap-6">
            <p className="text-sm tracking-[0.4em] uppercase text-third font-semibold">
              Why Choose Us
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.05] text-primary font-[Montserrat]">
              {data.whyBuyHeroTitle}
            </h2>
            <div
              className="text-primary/70 text-base font-[Poppins] leading-relaxed"
              dangerouslySetInnerHTML={{ __html: data.whyBuyHeroDescription }}
            />
            <div className="pt-4">
              <a
                href="#"
                className="font-[Montserrat] font-bold text-sm tracking-[0.15em] uppercase text-primary border-b border-third/40 pb-0.5 hover:border-primary transition-colors duration-200"
              >
                Explore Listings →
              </a>
            </div>
          </div>
        </div>
      </section>
      {/* ===== AboutUs Section ===== */}
      <section className="relative py-12 px-2 lg:px-4">
        <div className="container">
          <div className="mx-auto">
            <div className="flex flex-col lg:flex-row gap-6 items-stretch justify-center">
              <div className="flex flex-col justify-center lg:w-[44%] ">
                <p className="text-sm tracking-[0.4em] uppercase text-third font-semibold">
                  About Us
                </p>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.05] text-primary font-[Montserrat] mt-4">
                  {data.whyBuyStoryTitle}
                </h2>
                <div
                  className="flex flex-col gap-6 mt-8 max-w-md text-primary/75 text-lg leading-relaxed font-[Poppins]"
                  dangerouslySetInnerHTML={{
                    __html: data.whyBuyStoryDescription,
                  }}
                />
              </div>
              <div className="relative overflow-hidden rounded-2xl group lg:w-[26.5%] min-h-[500px] ">
                <img
                  src={storyImages[0]}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-linear-to-t from-secondary/80 via-transparent to-secondary/20" />
              </div>
              <div className="flex lg:flex-col gap-4 lg:w-[26%] ">
                {storyImages.slice(1, 3).map((src, i) => (
                  <div
                    key={i}
                    className="relative flex-1 overflow-hidden rounded-2xl group min-h-60"
                  >
                    <img
                      src={src}
                      alt=""
                      className="absolute inset-0 w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-linear-to-br from-transparent to-secondary/60" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ===== Vehicle Approach Section ===== */}
      <section className="relative py-12 px-2 lg:px-4">
        <div className="container">
          <div className="mx-auto">
            <div className="flex flex-col gap-6 max-w-3xl mx-auto mb-14">
              <span className="text-sm tracking-[0.4em] uppercase text-third font-semibold">
                Vehicle Approach
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.05] text-primary font-[Montserrat]">
                {data.whyBuyVehicleSelectionTitle}
              </h2>
              <div
                className="text-primary/70 text-base font-[Poppins] leading-relaxed max-w-2xl"
                dangerouslySetInnerHTML={{
                  __html: data.whyBuyVehicleSelectionDescription,
                }}
              />
            </div>
            <div className="flex gap-4 h-[260px]">
              <div className="w-[48%] md:w-[35%] rounded-3xl overflow-hidden border border-third/10">
                <img
                  src={vehicleSelectionImages[0]}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-[25%] flex flex-col gap-4  md:block">
                <div className="h-1/2 rounded-2xl overflow-hidden border border-third/10">
                  <img
                    src={vehicleSelectionImages[1]}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="h-1/2 rounded-2xl overflow-hidden border border-third/10">
                  <img
                    src={vehicleSelectionImages[2]}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="w-[48%] md:w-[40%] rounded-3xl overflow-hidden border border-third/10">
                <img
                  src={vehicleSelectionImages[3]}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ===== How Buying Work Section ===== */}
      <section className="relative py-12 px-2 lg:px-4">
        <div className="container">
          <div className="mx-auto">
            <div className="flex flex-col gap-4 mb-8 max-w-lg">
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <p className="text-sm tracking-[0.4em] uppercase text-third font-semibold">
                    Buying Process
                  </p>
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.05] text-primary font-[Montserrat]">
                  {data.whyBuyProcessTitle}
                </h2>
              </div>
              <div
                className="text-third/55 text-base font-[Poppins] leading-relaxed max-w-xs"
                dangerouslySetInnerHTML={{
                  __html: data.whyBuyProcessDescription,
                }}
              />
            </div>
            <div className="border border-third/10 rounded-3xl shadow-2xl overflow-hidden">
              <div className="relative w-full h-[280px] md:h-80">
                {processImages.map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt={data.processSteps?.[i]?.title}
                    className={`absolute inset-0 w-full h-full object-cover transition-all duration-700
                                            ${activeHovered === i ? "opacity-100 scale-100" : "opacity-0 scale-[1.02]"}`}
                  />
                ))}
                <div className="absolute inset-0 bg-secondary/50 pointer-events-none" />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  {data.processSteps?.map((step, i) => {
                    const Icon = iconMap[step.icon] || Search;
                    return (
                      <div
                        key={i}
                        className={`absolute flex flex-col items-center gap-3 text-center px-8 max-w-sm transition-all duration-500
                                                    ${activeHovered === i ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                      >
                        <div className="flex items-center justify-center w-11 h-11 rounded-xl border border-third/50 bg-third/10">
                          <Icon
                            size={18}
                            strokeWidth={1.5}
                            className="text-third/90"
                          />
                        </div>
                        <h3 className="text-primary text-xl md:text-2xl font-semibold font-[Montserrat] tracking-tighter leading-tight">
                          {step.title}
                        </h3>
                        <div
                          className="text-primary/55 text-sm font-[Poppins] leading-[1.8]"
                          dangerouslySetInnerHTML={{ __html: step.description }}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 border-t border-third/10">
                {data.processSteps?.map((step, i) => {
                  const Icon = iconMap[step.icon] || Search;
                  const isHovered = hovered === i;
                  return (
                    <button
                      key={i}
                      onMouseEnter={() => setHovered(i)}
                      onMouseLeave={() => setHovered(null)}
                      className={`group relative flex flex-col gap-2 px-5 py-5 text-left transition-all duration-400 cursor-pointer
                                                ${isHovered ? "bg-third/5" : "hover:bg-third/5"}`}
                    >
                      <div
                        className={`absolute top-0 left-0 right-0 h-0.5 transition-all duration-500
                                                ${isHovered ? "bg-primary/60" : "bg-transparent"}`}
                      />
                      <div className="flex items-center justify-between">
                        <div
                          className={`flex items-center justify-center w-8 h-8 rounded-lg border transition-all duration-400
                                                    ${
                                                      isHovered
                                                        ? "border-third/40 bg-third/10 text-third/80"
                                                        : "border-third/15 text-third/35"
                                                    }`}
                        >
                          <Icon size={14} strokeWidth={1.5} />
                        </div>
                        <span
                          className={`text-[10px] font-bold font-[Montserrat] tabular-nums transition-colors duration-300
                                                    ${isHovered ? "text-third/60" : "text-third/25"}`}
                        >
                          0{i + 1}
                        </span>
                      </div>
                      <h3
                        className={`text-xs font-semibold font-[Montserrat] leading-snug transition-colors duration-300
                                                ${isHovered ? "text-primary" : "text-third/45"}`}
                      >
                        {step.title}
                      </h3>
                      {i < (data.processSteps?.length || 0) - 1 && (
                        <div className="absolute top-4 bottom-4 right-0 w-px bg-third/10" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ===== Avx Inspection Section ===== */}
      <section className="py-12 px-2 lg:px-4">
        <div className="container">
          <div className="mx-auto">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 mb-16">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <p className="text-sm tracking-[0.4em] uppercase text-third font-semibold">
                    Avx Inspection
                  </p>
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.05] text-primary font-[Montserrat]">
                  {data.whyBuyInspectionTitle}
                </h2>
                <div
                  className="max-w-xs text-third/55 text-sm font-[Poppins] leading-[1.8] border-l border-third/10"
                  dangerouslySetInnerHTML={{
                    __html: data.whyBuyInspectionDescription,
                  }}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-px bg-third/10 border border-third/10 rounded-2xl overflow-hidden">
              {data.inspectionPoints?.map((point, i) => (
                <div
                  key={i}
                  onMouseEnter={() => setAvxInspectionHovered(i)}
                  className="relative bg-secondary/10 p-10 flex flex-col gap-12 transition-colors group cursor-default h-full min-h-60"
                >
                  <img
                    src={inspectionImages[i]}
                    alt={point}
                    className="absolute inset-0 w-full h-full object-cover grayscale brightness-[0.15] group-hover:brightness-[0.45] transition-all duration-700"
                  />
                  <div className="relative z-10 flex flex-col justify-between h-full">
                    <div className="flex justify-between items-start">
                      <span className="text-2xl font-black font-[Montserrat] text-third/10 group-hover:text-third/20 transition-colors">
                        0{i + 1}
                      </span>
                      <div
                        className={`w-10 h-10 rounded-xl border border-third/10 flex items-center justify-center transition-all ${avxInspectionHovered === i ? "bg-third/5 border-third" : "bg-secondary/40 backdrop-blur-md"}`}
                      >
                        <Check
                          size={16}
                          className={
                            avxInspectionHovered === i
                              ? "text-primary"
                              : "text-third/20"
                          }
                        />
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-lg font-bold font-[Montserrat] text-primary uppercase tracking-tight leading-tight">
                        {point.split(" ").slice(0, 2).join(" ")}
                      </h3>
                      <div
                        className="text-xs text-third/40 font-[Poppins] leading-relaxed uppercase tracking-wider"
                        dangerouslySetInnerHTML={{ __html: point }}
                      />
                    </div>
                  </div>
                  <div
                    className={`absolute bottom-0 left-0 h-1 bg-third transition-all duration-500 ${avxInspectionHovered === i ? "w-full" : "w-0"}`}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* ===== Customer Commitment Section ===== */}
      <section className="py-12 px-2 lg:px-4">
        <div className="container">
          <div className="mx-auto">
            <div className="bg-secondary/10 border border-third/10 rounded-3xl p-10 md:p-14 text-center shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
              <div className="flex flex-col gap-6 items-center">
                <p className="text-sm tracking-[0.4em] uppercase text-third font-semibold">
                  Our Promise
                </p>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.05] text-primary font-[Montserrat]">
                  {data.whyBuyCustomerCommitmentTitle}
                </h2>
                <div
                  className="text-third/55 text-base md:text-lg font-[Poppins] leading-[1.9] max-w-3xl italic"
                  dangerouslySetInnerHTML={{
                    __html: data.whyBuyCustomerCommitmentDescription,
                  }}
                />
                <div className="h-px w-1/4 bg-linear-to-r from-transparent via-third/10 to-transparent mt-4" />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ===== Gallery Section ===== */}
      <section className="py-12 overflow-hidden px-2 lg:px-4">
        <div className="container">
          <div className="mx-auto">
            <div className="flex items-center justify-between mb-6">
              <div className="flex flex-col gap-6">
                <div>
                  <p className="text-sm tracking-[0.4em] uppercase text-third font-semibold">
                    Gallery
                  </p>
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.05] text-primary font-[Montserrat]">
                  {data.whyBuyGalleryTitle}
                </h2>
              </div>
              <Camera size={32} className="text-third/10 hidden md:block" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {galleryImages.map((img, i) => (
                <div
                  key={i}
                  className={`relative rounded-2xl overflow-hidden border border-third/10 group
                                        ${i % 3 === 0 ? "md:col-span-2 aspect-video" : "aspect-square"}
                                    `}
                >
                  <img
                    src={img}
                    className="w-full h-full object-cover brightness-50 group-hover:brightness-110 group-hover:scale-105 transition-all duration-1000"
                    alt={`Gallery item ${i + 1}`}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* ===== Testimonials Section ===== */}
      <section className="relative py-12 px-2 lg:px-4">
        <div className="container">
          <div className="mx-auto w-full">
            <div className="flex flex-col items-center gap-10">
              <div className="flex flex-col items-center gap-4 text-center">
                <span className="text-sm tracking-[0.4em] uppercase text-third font-semibold">
                  Feedback
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.05] text-primary font-[Montserrat]">
                  {data.whyBuyTestimonialTitle}
                </h2>
              </div>
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
                    {String(testimonialsactive + 1).padStart(2, "0")}
                  </span>
                  <div
                    className="text-xl md:text-2xl lg:text-3xl font-light text-primary/70 font-[Poppins] leading-[1.6] max-w-3xl italic"
                    dangerouslySetInnerHTML={{
                      __html: item.reviewText || item.review,
                    }}
                  />
                  <span className="text-xs font-semibold text-primary/90 font-[Montserrat] uppercase tracking-widest">
                    {item.reviewerName || item.name}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <button
                  onClick={prev}
                  className="w-10 h-10 rounded-full border border-third/20 flex items-center justify-center hover:border-third/40 hover:bg-third/5 transition-all duration-300 group"
                >
                  <ChevronLeft className="w-4 h-4 text-third/50 group-hover:text-third/70 transition-colors duration-300" />
                </button>
                <div className="flex items-center gap-2">
                  {data.featuredReviews?.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => transition(i)}
                      className={`rounded-full transition-all duration-500 ${
                        i === testimonialsactive
                          ? "w-6 h-1.5 bg-primary"
                          : "w-1.5 h-1.5 bg-third/20 hover:bg-third/40"
                      }`}
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
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
