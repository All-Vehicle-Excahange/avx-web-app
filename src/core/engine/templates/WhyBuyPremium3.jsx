/* eslint-disable react-hooks/set-state-in-effect */
"use client";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { CheckCircle2, Star } from "lucide-react";
import RichTextEditor from "../atoms/RichTextEditor";
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
import { getAllReview } from "@/services/user.service";
import { WHY_BUY_PREMIUM_2 } from "../schemas/whybuy/why_buy_premium_2";
import { WHY_BUY_PREMIUM_3 } from "../schemas/whybuy/why_buy_premium_3";
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
const DEFAULT_DATA = WHY_BUY_PREMIUM_3[0].data;

export default function WhyBuyPremium3({ data: rawData, isEditing, onUpdate }) {
  const data = {
    ...DEFAULT_DATA,
    ...Object.fromEntries(
      Object.entries(rawData || {}).filter(
        ([, v]) => v !== undefined && v !== null,
      ),
    ),
  };
  /* ================== REVIEW SELECTION ================== */
  const [allReviews, setAllReviews] = useState([]);
  const [selectedReviewIds, setSelectedReviewIds] = useState(
    (data.featuredReviews || []).map((r) => r.id),
  );

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
        const response = await getAllReview(consultId, params);
        setAllReviews(response?.data?.reviews || []);
      } catch (error) {
        console.error("Error fetching reviews", error);
      }
    };
    if (consultId) fetchReviews();
  }, [consultId, rawData]);
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
      setFeaturedReviews(updated).catch((err) =>
        console.error("Error saving featured reviews", err),
      );
      return updated;
    });
  };
  /* ================== HELPERS ================== */
  const getBlobFromUrl = async (url) => {
    if (!url || !url.startsWith("blob:")) return null;
    try {
      const response = await fetch(url);
      return await response.blob();
    } catch (e) {
      console.error("Error fetching blob:", e);
      return null;
    }
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
  /* ================== API HANDLERS ================== */
  const handleHeroBlur = async () => {
    try {
      const formData = new FormData();
      formData.append("whyBuyHeroTitle", data.whyBuyHeroTitle || "");
      formData.append(
        "whyBuyHeroDescription",
        data.whyBuyHeroDescription || "",
      );
      if (data.whyBuyHeroTemplate1?.id)
        formData.append("whyBuyHeroTemplateId1", data.whyBuyHeroTemplate1.id);
      else if (data.customWhyBuyHero1) {
        const blob = await getBlobFromUrl(data.customWhyBuyHero1);
        if (blob) formData.append("customWhyBuyHero1", blob, "hero1.png");
      }
      if (data.whyBuyHeroTemplate2?.id)
        formData.append("whyBuyHeroTemplateId2", data.whyBuyHeroTemplate2.id);
      else if (data.customWhyBuyHero2) {
        const blob = await getBlobFromUrl(data.customWhyBuyHero2);
        if (blob) formData.append("customWhyBuyHero2", blob, "hero2.png");
      }
      if (data.whyBuyHeroTemplate3?.id)
        formData.append("whyBuyHeroTemplateId3", data.whyBuyHeroTemplate3.id);
      else if (data.customWhyBuyHero3) {
        const blob = await getBlobFromUrl(data.customWhyBuyHero3);
        if (blob) formData.append("customWhyBuyHero3", blob, "hero3.png");
      }
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
      for (let i = 1; i <= 4; i++) {
        const tmpl = data[`storyTemplate${i}`];
        const customField = `customWhyBuyStory${i}`;
        if (tmpl?.id) formData.append(`storyTemplateId${i}`, tmpl.id);
        else if (data[customField]) {
          const blob = await getBlobFromUrl(data[customField]);
          if (blob) formData.append(customField, blob, `story${i}.png`);
        }
      }
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
      for (let i = 1; i <= 2; i++) {
        const tmpl = data[`vehicleSelectionTemplate${i}`];
        const customField = `customWhyBuyVehicleSelection${i}`;
        if (tmpl?.id)
          formData.append(`vehicleSelectionTemplateId${i}`, tmpl.id);
        else if (data[customField]) {
          const blob = await getBlobFromUrl(data[customField]);
          if (blob) formData.append(customField, blob, `selection${i}.png`);
        }
      }
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
      if (data.processSteps)
        data.processSteps.forEach((step, i) => {
          formData.append(`processes[${i}].title`, step.title || "");
          formData.append(`processes[${i}].desc`, step.description || "");
          formData.append(`processes[${i}].icon`, step.icon || "");
        });
      for (let i = 1; i <= 4; i++) {
        const tmpl = data[`processTemplate${i}`];
        const customField = `customWhyBuyProcess${i}`;
        if (tmpl?.id) formData.append(`processTemplateId${i}`, tmpl.id);
        else if (data[customField]) {
          const blob = await getBlobFromUrl(data[customField]);
          if (blob) formData.append(customField, blob, `process${i}.png`);
        }
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
      if (data.inspectionPoints)
        data.inspectionPoints.forEach((pt, i) =>
          formData.append(`inspectionPoints[${i}]`, pt || ""),
        );
      for (let i = 1; i <= 4; i++) {
        const tmpl = data[`inspectionTemplate${i}`];
        const customField = `customWhyBuyInspection${i}`;
        if (tmpl?.id) formData.append(`inspectionTemplateId${i}`, tmpl.id);
        else if (data[customField]) {
          const blob = await getBlobFromUrl(data[customField]);
          if (blob) formData.append(customField, blob, `inspection${i}.png`);
        }
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
      for (let i = 1; i <= 3; i++) {
        const tmpl = data[`customerCommitmentTemplate${i}`];
        const customField = `customWhyBuyCustomerCommitment${i}`;
        if (tmpl?.id)
          formData.append(`customerCommitmentTemplateId${i}`, tmpl.id);
        else if (data[customField]) {
          const blob = await getBlobFromUrl(data[customField]);
          if (blob) formData.append(customField, blob, `commitment${i}.png`);
        }
      }
      await setWhyBuyCustomerCommitment(formData);
    } catch (error) {
      console.error("Error updating customer commitment", error);
    }
  };
  const handleGalleryBlur = async () => {
    try {
      const formData = new FormData();
      for (let i = 1; i <= 5; i++) {
        const tmpl = data[`galleryTemplate${i}`];
        const customField = `customWhyBuyGallery${i}`;
        if (tmpl?.id) formData.append(`galleryTemplateId${i}`, tmpl.id);
        else if (data[customField]) {
          const blob = await getBlobFromUrl(data[customField]);
          if (blob) formData.append(customField, blob, `gallery${i}.png`);
        }
      }
      console.log("Gallery blur handled.");
    } catch (error) {
      console.error("Error updating gallery", error);
    }
  };
  const handleTestimonialBlur = async () => {
    try {
      updateField("testimonialTitle", data.testimonialTitle);
    } catch (error) {
      console.error("Error updating testimonials", error);
    }
  };
  /* ================== PREVIEW STATE ================== */
  const AUTOPLAY_DURATION = 4000;
  const [activeIndex, setActiveIndex] = useState(0);
  const [howBuyingWorksActive, setHowBuyingWorksActive] = useState(0);
  const [avxInspectionActive, setAvxInspectionActive] = useState(0);
  const [commitmentActive, setCommitmentActive] = useState(0);
  const [testimonialsactive, setTestimonialsActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const [hoverIndex, setHoverIndex] = useState(null);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(null);
  const [spread, setSpread] = useState(false);
  const [visible, setVisible] = useState(true);
  const progressRef = useRef(null);
  const startTimeRef = useRef(null);
  const elapsedRef = useRef(0);
  const timeoutRef = useRef(null);
  const swiperRef = useRef(null);
  const [activeSwiperIndex, setActiveSwiperIndex] = useState(0);
  const [isDesktop, setIsDesktop] = useState(() =>
    typeof window !== "undefined"
      ? window.matchMedia("(min-width: 1024px)").matches
      : true,
  );
  useEffect(() => {
    if (isEditing) return;
    const mq = window.matchMedia("(min-width: 1024px)");
    const handler = (e) => setIsDesktop(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [isEditing]);
  const fanConfig = [
    { rotate: -8, translateX: -180, translateY: 12, scale: 0.88, zIndex: 1 },
    { rotate: -3, translateX: -70, translateY: 4, scale: 0.93, zIndex: 2 },
    { rotate: 3, translateX: 70, translateY: 4, scale: 0.93, zIndex: 3 },
    { rotate: 8, translateX: 180, translateY: 12, scale: 0.88, zIndex: 4 },
  ];
  const paragraphs = (data.storyDescription || "")
    .replace(/<[^>]*>/g, "")
    .split("\n\n")
    .map((p) => p.trim())
    .filter(Boolean);
  const displayIndex = hoverIndex !== null ? hoverIndex : activeIndex;
  const testimonialsTotal = (data.testimonials || []).length;
  const inspectionPoints = data.inspectionPoints || [];
  const current = inspectionPoints[avxInspectionActive];
  const nextStep = () => {
    if (howBuyingWorksActive < (data.processSteps || []).length - 1)
      setHowBuyingWorksActive(howBuyingWorksActive + 1);
  };
  const prevStep = () => {
    if (howBuyingWorksActive > 0)
      setHowBuyingWorksActive(howBuyingWorksActive - 1);
  };
  const startProgress = () => {
    startTimeRef.current = performance.now() - elapsedRef.current;
    progressRef.current = requestAnimationFrame(function tick(now) {
      const elapsed = now - startTimeRef.current;
      const pct = Math.min((elapsed / AUTOPLAY_DURATION) * 100, 100);
      setProgress(pct);
      elapsedRef.current = elapsed;
      if (pct < 100) progressRef.current = requestAnimationFrame(tick);
      else {
        elapsedRef.current = 0;
        setAvxInspectionActive((prev) => (prev + 1) % inspectionPoints.length);
      }
    });
  };
  const stopProgress = () => {
    if (progressRef.current) cancelAnimationFrame(progressRef.current);
  };
  useEffect(() => {
    if (!paused) startProgress();
    return () => stopProgress();
  }, [avxInspectionActive, paused]);
  const handleSelect = (i) => {
    stopProgress();
    elapsedRef.current = 0;
    setProgress(0);
    setAvxInspectionActive(i);
    setPaused(false);
  };
  useEffect(() => {
    const interval = setInterval(() => {
      setCommitmentActive(
        (prev) => (prev + 1) % (data.customerCommitmentTemplate1 ? 3 : 1),
      );
    }, 5000);
    return () => clearInterval(interval);
  }, []);
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
  const item =
    (data.featuredReviews || data.testimonials || [])[testimonialsactive] || {};
  const reviewText = item.reviewText || item.review || "";
  const reviewerName = item.reviewerName || item.name || "";
  const rating = item.rating || 5;
  const galleryImages = [
    data.customWhyBuyGallery1 || data.galleryTemplate1?.imageUrl,
    data.customWhyBuyGallery2 || data.galleryTemplate2?.imageUrl,
    data.customWhyBuyGallery3 || data.galleryTemplate3?.imageUrl,
    data.customWhyBuyGallery4 || data.galleryTemplate4?.imageUrl,
  ].filter(Boolean);
  const captions = [
    "Showroom Floor",
    "Vehicle Detail",
    "Our Team",
    "Showroom Interior",
  ];
  /* ================== EDITOR ================== */
  if (isEditing) {
    return (
      <div className="w-full max-w-[1480px] mx-auto p-8 rounded-xl space-y-10">
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
                onBlur={handleHeroBlur}
              />
              <RichTextEditor
                label="Hero Description"
                value={data.whyBuyHeroDescription}
                onChange={(v) => updateField("whyBuyHeroDescription", v)}
                onBlur={handleHeroBlur}
              />
            </div>
            <div className="space-y-4">
              <p className="text-sm font-semibold text-primary">Hero Media</p>
              <div className="grid grid-cols-2 gap-4">
                <div className="h-40 relative">
                  <ImageUploader
                    label="Video"
                    src={
                      data.customWhyBuyHero1 ||
                      data.whyBuyHeroTemplate1?.imageUrl
                    }
                    fieldKey="heroVid"
                    imageType="WHY_BUY_HERO"
                    onChange={({ imageUrl, id }) => {
                      const u = {
                        ...data,
                        whyBuyHeroTemplate1: {
                          ...data.whyBuyHeroTemplate1,
                          imageUrl,
                          id: id ?? null,
                        },
                      };
                      if (!id) u.customWhyBuyHero1 = imageUrl;
                      else delete u.customWhyBuyHero1;
                      onUpdate(u);
                      setTimeout(handleHeroBlur, 100);
                    }}
                  />
                </div>
                <div className="h-40 relative">
                  <ImageUploader
                    label="Image 1"
                    src={
                      data.customWhyBuyHero2 ||
                      data.whyBuyHeroTemplate2?.imageUrl
                    }
                    fieldKey="heroImg1"
                    imageType="WHY_BUY_HERO"
                    onChange={({ imageUrl, id }) => {
                      const u = {
                        ...data,
                        whyBuyHeroTemplate2: {
                          ...data.whyBuyHeroTemplate2,
                          imageUrl,
                          id: id ?? null,
                        },
                      };
                      if (!id) u.customWhyBuyHero2 = imageUrl;
                      else delete u.customWhyBuyHero2;
                      onUpdate(u);
                      setTimeout(handleHeroBlur, 100);
                    }}
                  />
                </div>
                <div className="h-40 relative col-span-2">
                  <ImageUploader
                    label="Image 2"
                    src={
                      data.customWhyBuyHero3 ||
                      data.whyBuyHeroTemplate3?.imageUrl
                    }
                    fieldKey="heroImg2"
                    imageType="WHY_BUY_HERO"
                    onChange={({ imageUrl, id }) => {
                      const u = {
                        ...data,
                        whyBuyHeroTemplate3: {
                          ...data.whyBuyHeroTemplate3,
                          imageUrl,
                          id: id ?? null,
                        },
                      };
                      if (!id) u.customWhyBuyHero3 = imageUrl;
                      else delete u.customWhyBuyHero3;
                      onUpdate(u);
                      setTimeout(handleHeroBlur, 100);
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr className="border-third/20" />
        {/* STORY */}
        <div className="space-y-6">
          <h3 className="text-primary font-bold text-xl mb-4">Story Section</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <EditorInput
                bold
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
            <div className="space-y-4">
              <p className="text-sm font-semibold text-primary">Story Images</p>
              <div className="grid grid-cols-2 gap-4">
                {[1, 2, 3, 4].map((n) => (
                  <div
                    key={n}
                    className={`h-40 relative ${n === 1 ? "col-span-2" : ""}`}
                  >
                    <ImageUploader
                      label={`Image ${n}`}
                      src={
                        data[`customWhyBuyStory${n}`] ||
                        data[`storyTemplate${n}`]?.imageUrl
                      }
                      fieldKey={`storyImg${n}`}
                      imageType="CONSULTANT_STORY"
                      onChange={({ imageUrl, id }) => {
                        const u = {
                          ...data,
                          [`storyTemplate${n}`]: {
                            ...data[`storyTemplate${n}`],
                            imageUrl,
                            id: id ?? null,
                          },
                        };
                        const cf = `customWhyBuyStory${n}`;
                        if (!id) u[cf] = imageUrl;
                        else delete u[cf];
                        onUpdate(u);
                        setTimeout(handleStoryBlur, 100);
                      }}
                    />
                  </div>
                ))}
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
                onBlur={handleVehicleSelectionBlur}
              />
              <RichTextEditor
                label="Selection Description"
                value={data.vehicleSelectionDescription}
                onChange={(v) => updateField("vehicleSelectionDescription", v)}
                onBlur={handleVehicleSelectionBlur}
              />
            </div>
            <div className="space-y-4">
              <p className="text-sm font-semibold text-primary">
                Selection Images
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[1, 2].map((n) => (
                  <div key={n} className="h-40 relative">
                    <ImageUploader
                      label={`Image ${n}`}
                      src={
                        data[`customWhyBuyVehicleSelection${n}`] ||
                        data[`vehicleSelectionTemplate${n}`]?.imageUrl
                      }
                      fieldKey={`selImg${n}`}
                      imageType="VEHICLE_SELECTION"
                      onChange={({ imageUrl, id }) => {
                        const u = {
                          ...data,
                          [`vehicleSelectionTemplate${n}`]: {
                            ...data[`vehicleSelectionTemplate${n}`],
                            imageUrl,
                            id: id ?? null,
                          },
                        };
                        const cf = `customWhyBuyVehicleSelection${n}`;
                        if (!id) u[cf] = imageUrl;
                        else delete u[cf];
                        onUpdate(u);
                        setTimeout(handleVehicleSelectionBlur, 100);
                      }}
                    />
                  </div>
                ))}
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <EditorInput
                bold
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
            </div>
            <div className="space-y-4">
              <p className="text-sm font-semibold text-primary">
                Process Images
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[1, 2, 3, 4].map((n) => (
                  <div key={n} className="h-40 relative">
                    <ImageUploader
                      label={`Step ${n}`}
                      src={
                        data[`customWhyBuyProcess${n}`] ||
                        data[`processTemplate${n}`]?.imageUrl
                      }
                      fieldKey={`procImg${n}`}
                      imageType="HOW_BUYING_WORKS"
                      onChange={({ imageUrl, id }) => {
                        const u = {
                          ...data,
                          [`processTemplate${n}`]: {
                            ...data[`processTemplate${n}`],
                            imageUrl,
                            id: id ?? null,
                          },
                        };
                        const cf = `customWhyBuyProcess${n}`;
                        if (!id) u[cf] = imageUrl;
                        else delete u[cf];
                        onUpdate(u);
                        setTimeout(handleProcessBlur, 100);
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4 mt-6">
            {(data.processSteps || []).map((step, i) => (
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
                    onBlur={handleProcessBlur}
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
                    onBlur={handleProcessBlur}
                  />
                </div>
                <div className="flex flex-col gap-2 relative mt-4">
                  <label className="text-sm font-medium text-primary">
                    Icon
                  </label>
                  <Select
                    options={SVG_OPTIONS}
                    formatOptionLabel={formatOptionLabel}
                    styles={selectStyles}
                    value={
                      SVG_OPTIONS.find((opt) => opt.value === step.icon) || null
                    }
                    onChange={(sel) => {
                      updateArrayItem("processSteps", i, "icon", sel.value);
                      handleProcessBlur();
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
                onBlur={handleInspectionBlur}
              />
              <RichTextEditor
                label="Inspection Description"
                value={data.inspectionText}
                onChange={(v) => updateField("inspectionText", v)}
                onBlur={handleInspectionBlur}
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
                      const a = [...data.inspectionPoints];
                      a[i] = e.target.value;
                      updateField("inspectionPoints", a);
                    }}
                    onBlur={handleInspectionBlur}
                  />
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <p className="text-sm font-semibold text-primary">
                Inspection Images
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[1, 2, 3, 4].map((n) => (
                  <div
                    key={n}
                    className={`h-40 relative ${n === 1 ? "col-span-2" : ""}`}
                  >
                    <ImageUploader
                      label={`Image ${n}`}
                      src={
                        data[`customWhyBuyInspection${n}`] ||
                        data[`inspectionTemplate${n}`]?.imageUrl
                      }
                      fieldKey={`inspImg${n}`}
                      imageType="INSPECTION_PROCESS"
                      onChange={({ imageUrl, id }) => {
                        const u = {
                          ...data,
                          [`inspectionTemplate${n}`]: {
                            ...data[`inspectionTemplate${n}`],
                            imageUrl,
                            id: id ?? null,
                          },
                        };
                        const cf = `customWhyBuyInspection${n}`;
                        if (!id) u[cf] = imageUrl;
                        else delete u[cf];
                        onUpdate(u);
                        setTimeout(handleInspectionBlur, 100);
                      }}
                    />
                  </div>
                ))}
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
                onBlur={handleCustomerCommitmentBlur}
              />
              <RichTextEditor
                label="Commitment Description"
                value={data.customerCommitmentDescription}
                onChange={(v) =>
                  updateField("customerCommitmentDescription", v)
                }
                onBlur={handleCustomerCommitmentBlur}
              />
            </div>
            <div className="space-y-4">
              <p className="text-sm font-semibold text-primary">
                Commitment Images
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[1, 2, 3].map((n) => (
                  <div
                    key={n}
                    className={`h-40 relative ${n === 1 ? "col-span-2" : ""}`}
                  >
                    <ImageUploader
                      label={`Image ${n}`}
                      src={
                        data[`customWhyBuyCustomerCommitment${n}`] ||
                        data[`customerCommitmentTemplate${n}`]?.imageUrl
                      }
                      fieldKey={`commImg${n}`}
                      imageType="CUSTOMER_COMMITMENT"
                      onChange={({ imageUrl, id }) => {
                        const u = {
                          ...data,
                          [`customerCommitmentTemplate${n}`]: {
                            ...data[`customerCommitmentTemplate${n}`],
                            imageUrl,
                            id: id ?? null,
                          },
                        };
                        const cf = `customWhyBuyCustomerCommitment${n}`;
                        if (!id) u[cf] = imageUrl;
                        else delete u[cf];
                        onUpdate(u);
                        setTimeout(handleCustomerCommitmentBlur, 100);
                      }}
                    />
                  </div>
                ))}
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
            {[1, 2, 3, 4, 5].map((n) => (
              <div
                key={n}
                className={`h-40 relative ${n === 5 ? "col-span-2" : ""}`}
              >
                <ImageUploader
                  label={`Gallery Image ${n}`}
                  src={
                    data[`customWhyBuyGallery${n}`] ||
                    data[`galleryTemplate${n}`]?.imageUrl
                  }
                  fieldKey={`galImg${n}`}
                  imageType="GALLERY"
                  onChange={({ imageUrl, id }) => {
                    const u = {
                      ...data,
                      [`galleryTemplate${n}`]: {
                        ...data[`galleryTemplate${n}`],
                        imageUrl,
                        id: id ?? null,
                      },
                    };
                    const cf = `customWhyBuyGallery${n}`;
                    if (!id) u[cf] = imageUrl;
                    else delete u[cf];
                    onUpdate(u);
                    setTimeout(handleGalleryBlur, 100);
                  }}
                />
              </div>
            ))}
          </div>
        </div>
        <hr className="border-third/20" />
        {/* TESTIMONIALS */}
        <div className="space-y-6">
          <h3 className="text-primary font-bold text-xl mb-4">
            Select Featured Reviews
          </h3>
          <EditorInput
            bold
            label="Section Title"
            value={data.testimonialTitle}
            onChange={(e) => updateField("testimonialTitle", e.target.value)}
            onBlur={handleTestimonialBlur}
          />
          <p className="text-third text-sm">
            Select which customer reviews to feature.
          </p>
          {allReviews.length === 0 && (
            <p className="text-third/60 text-sm italic">No reviews found.</p>
          )}
          <div className="grid md:grid-cols-2 gap-4">
            {allReviews.map((review) => {
              const isSelected = selectedReviewIds.includes(review.id);
              const rn =
                `${review.reviewedBy?.firstname || ""} ${review.reviewedBy?.lastname || ""}`.trim();
              return (
                <div
                  key={review.id}
                  onClick={() => toggleReviewSelection(review.id)}
                  className={`relative p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${isSelected ? "border-fourth bg-fourth/10 shadow-md" : "border-third/20 bg-primary/5 hover:border-third/40"}`}
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
                    — {rn}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
  /* ================== LIVE PREVIEW ================== */
  return (
    <>
      {/* ===== Hero Section ===== */}
      <section className="w-full flex flex-col">
        <div className="w-full flex flex-col items-center">
          <div className="relative w-full h-screen min-h-screen">
            {(
              data.customWhyBuyHero1 || data.whyBuyHeroTemplate1?.imageUrl
            )?.includes(".mp4") ? (
              <video
                src={
                  data.customWhyBuyHero1 || data.whyBuyHeroTemplate1?.imageUrl
                }
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
              />
            ) : (
              <img
                src={
                  data.customWhyBuyHero1 || data.whyBuyHeroTemplate1?.imageUrl
                }
                className="absolute inset-0 w-full h-full object-cover"
                alt="Hero"
              />
            )}
            <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/50 to-black/30" />
            <div className="relative z-10 h-full flex items-center justify-center">
              <div className="max-w-5xl px-6 sm:px-10 lg:px-16 flex flex-col gap-6 items-center text-center">
                <p className="text-sm tracking-[0.4em] uppercase text-third font-semibold">
                  Why Choose Us
                </p>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.05] text-primary font-[Montserrat] max-w-3xl">
                  {data.whyBuyHeroTitle}
                </h2>
                <div
                  className="text-primary/55 text-base sm:text-lg font-[Poppins] leading-relaxed"
                  dangerouslySetInnerHTML={{
                    __html: data.whyBuyHeroDescription,
                  }}
                />
              </div>
            </div>
            <div className="absolute bottom-0 left-0 w-full translate-y-1/2 z-20 px-2 md:px-6 lg:px-4">
              <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 px-2 lg:px-4">
                  {[
                    data.customWhyBuyHero2 ||
                      data.whyBuyHeroTemplate2?.imageUrl,
                    data.customWhyBuyHero3 ||
                      data.whyBuyHeroTemplate3?.imageUrl,
                    data.customWhyBuyStory1 || data.storyTemplate1?.imageUrl,
                    data.customWhyBuyStory2 || data.storyTemplate2?.imageUrl,
                  ]
                    .filter(Boolean)
                    .map((img, index) => (
                      <div
                        key={index}
                        className="overflow-hidden rounded-2xl bg-white/10 backdrop-blur-md border border-white/10"
                      >
                        <div className="aspect-4/3">
                          <img
                            src={img}
                            alt="premium"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
          <div className="h-40"></div>
        </div>
      </section>
      {/* ===== AboutUs Section ===== */}
      <section className="relative flex flex-col justify-center items-center py-12 px-2 lg:px-4 overflow-hidden">
        <div className="container">
          <div className="relative z-10 mx-auto w-full">
            <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-3">
                  <p className="text-sm tracking-[0.4em] uppercase text-third font-semibold">
                    About Us
                  </p>
                </div>
                <div className="flex flex-col gap-3">
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.05] text-primary font-[Montserrat]">
                    Our <span className="text-primary">Experience</span>
                  </h2>
                </div>
                <div className="flex flex-col gap-6">
                  {paragraphs[0] && (
                    <p className="text-third/70 text-lg md:text-xl font-[Poppins] leading-relaxed">
                      {paragraphs[0]}
                    </p>
                  )}
                  {paragraphs[1] && (
                    <p className="text-third/50 text-base font-[Poppins] leading-relaxed max-w-md">
                      {paragraphs[1]}
                    </p>
                  )}
                </div>
              </div>
              <div className="relative h-[460px] sm:h-[520px]">
                <div className="absolute top-0 left-0 w-[75%] h-[72%] rounded-2xl border border-third/10 shadow-2xl overflow-hidden">
                  <img
                    src={
                      data.customWhyBuyStory1 || data.storyTemplate1?.imageUrl
                    }
                    alt="Our story"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-secondary/55 to-transparent pointer-events-none" />
                </div>
                <div className="absolute bottom-0 right-0 w-[58%] h-[55%] rounded-2xl shadow-2xl overflow-hidden">
                  <img
                    src={
                      data.customWhyBuyStory2 || data.storyTemplate2?.imageUrl
                    }
                    alt="Our story"
                    className="w-full h-full object-cover rounded-2xl"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-secondary/55 to-transparent pointer-events-none" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ===== Vehicle Approach Section ===== */}
      <section className="relative flex flex-col justify-center items-center py-12 overflow-hidden">
        <div className="container">
          <div className="mx-auto w-full px-2 lg:px-4">
            <div className="relative w-full h-[500px] sm:h-[460px] lg:h-[520px] rounded-3xl overflow-hidden">
              {[
                data.customWhyBuyVehicleSelection1 ||
                  data.vehicleSelectionTemplate1?.imageUrl,
                data.customWhyBuyVehicleSelection2 ||
                  data.vehicleSelectionTemplate2?.imageUrl,
                data.customWhyBuyStory3 || data.storyTemplate3?.imageUrl,
                data.customWhyBuyStory4 || data.storyTemplate4?.imageUrl,
                data.customWhyBuyProcess1 || data.processTemplate1?.imageUrl,
              ]
                .filter(Boolean)
                .map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt={`Vehicle ${i + 1}`}
                    className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-700 ${displayIndex === i ? "opacity-100" : "opacity-0"}`}
                  />
                ))}
              <div className="absolute inset-0 bg-linear-to-t from-black/95 via-black/40 to-black/10" />
              <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 flex flex-col gap-6 px-8 sm:px-12 lg:px-14 pb-8">
                <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
                  <div className="flex flex-col gap-5 max-w-xl">
                    <div className="flex items-center gap-3">
                      <p className="text-sm tracking-[0.4em] uppercase text-third font-semibold">
                        Vehicle Approach
                      </p>
                    </div>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.05] text-primary font-[Montserrat]">
                      Our Approach to{" "}
                      <span className="text-primary">Vehicle Selection</span>
                    </h2>
                    <div
                      className="text-third/60 text-sm sm:text-base font-[Poppins] leading-relaxed"
                      dangerouslySetInnerHTML={{
                        __html: data.vehicleSelectionDescription,
                      }}
                    />
                  </div>
                  <div className="flex gap-3 shrink-0 overflow-x-scroll no-scrollbar">
                    {[
                      data.customWhyBuyVehicleSelection1 ||
                        data.vehicleSelectionTemplate1?.imageUrl,
                      data.customWhyBuyVehicleSelection2 ||
                        data.vehicleSelectionTemplate2?.imageUrl,
                      data.customWhyBuyStory3 || data.storyTemplate3?.imageUrl,
                      data.customWhyBuyStory4 || data.storyTemplate4?.imageUrl,
                      data.customWhyBuyProcess1 ||
                        data.processTemplate1?.imageUrl,
                    ]
                      .filter(Boolean)
                      .map((img, i) => (
                        <div
                          key={i}
                          className={`relative overflow-hidden rounded-xl border shrink-0 cursor-pointer transition-all duration-300 ${activeIndex === i ? "border-primary/30 w-24 h-[76px] sm:w-[108px] sm:h-[86px]" : "border-white/10 hover:border-third/40 w-[74px] h-[60px] sm:w-[84px] sm:h-[68px] opacity-50 hover:opacity-90"}`}
                          onClick={() => setActiveIndex(i)}
                          onMouseEnter={() => setHoverIndex(i)}
                          onMouseLeave={() => setHoverIndex(null)}
                        >
                          <img
                            src={img}
                            alt={`Thumb ${i + 1}`}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent pointer-events-none" />
                          {activeIndex === i && (
                            <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-5 h-0.5 rounded-full bg-third/80" />
                          )}
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ===== How Buying Work Section ===== */}
      <section className="w-full py-12 flex justify-center px-2 lg:px-4">
        <div className="container">
          <div className="w-full flex flex-col gap-8">
            <div className="max-w-2xl flex flex-col gap-4">
              <p className="text-sm tracking-[0.4em] uppercase text-third font-semibold">
                Buying Process
              </p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.05] text-primary font-[Montserrat]">
                {data.processTitle}
              </h2>
              <div
                className="text-white/60 text-lg font-[Poppins]"
                dangerouslySetInnerHTML={{ __html: data.processDescription }}
              />
            </div>
            <div className="relative w-full max-h-[350px] h-[60vh] overflow-hidden rounded-3xl">
              {(data.processSteps || []).map((step, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-all duration-700 ease-in-out ${index === howBuyingWorksActive ? "translate-y-0 z-20" : index < howBuyingWorksActive ? "-translate-y-full z-10" : "translate-y-full z-0"}`}
                >
                  <img
                    src={
                      data[`customWhyBuyProcess${index + 1}`] ||
                      data[`processTemplate${index + 1}`]?.imageUrl
                    }
                    alt="step"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/60" />
                  <div className="absolute bottom-10 left-10 max-w-md flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                      <p className="text-white/30 text-sm font-[Poppins]">{`0${index + 1}`}</p>
                      <div
                        className="w-5 h-5 text-white/70 [&>svg]:w-5 [&>svg]:h-5"
                        dangerouslySetInnerHTML={{ __html: step.icon }}
                      />
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-semibold text-white font-[Montserrat]">
                      {step.title}
                    </h3>
                    <div
                      className="text-white/60 text-sm sm:text-base font-[Poppins] leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: step.description }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-between items-center">
              <div className="text-white/40 text-sm">{`0${howBuyingWorksActive + 1} / 0${(data.processSteps || []).length}`}</div>
              <div className="flex gap-4">
                <button
                  onClick={prevStep}
                  disabled={howBuyingWorksActive === 0}
                  className={`text-sm px-5 py-2 rounded-full border transition ${howBuyingWorksActive === 0 ? "border-white/10 text-white/20 cursor-not-allowed" : "border-white/20 text-white hover:bg-white/10"}`}
                >
                  Prev
                </button>
                <button
                  onClick={nextStep}
                  disabled={
                    howBuyingWorksActive ===
                    (data.processSteps || []).length - 1
                  }
                  className={`text-sm px-5 py-2 rounded-full border transition ${howBuyingWorksActive === (data.processSteps || []).length - 1 ? "border-white/10 text-white/20 cursor-not-allowed" : "border-white/20 text-white hover:bg-white/10"}`}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ===== Avx Inspection Section ===== */}
      <section className="relative flex flex-col justify-center items-center py-12 overflow-hidden px-2 lg:px-4">
        <div className="container">
          <div className="mx-auto w-full flex flex-col gap-8 relative z-10">
            <div className="flex flex-col gap-4">
              <p className="text-sm tracking-[0.4em] uppercase text-third font-semibold">
                Avx Inspection
              </p>
              <div className="flex flex-col gap-4">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.05] text-primary font-[Montserrat]">
                  {data.inspectionTitle}
                </h2>
                <div
                  className="text-third/60 text-base font-[Poppins] leading-relaxed max-w-md"
                  dangerouslySetInnerHTML={{ __html: data.inspectionText }}
                />
              </div>
            </div>
            <div className="grid lg:grid-cols-[1fr_360px] gap-4 items-stretch">
              <div
                className="relative overflow-hidden rounded-2xl aspect-16/10 lg:aspect-auto bg-secondary cursor-pointer"
                onMouseEnter={() => setPaused(true)}
                onMouseLeave={() => setPaused(false)}
              >
                {inspectionPoints.map((_, i) => (
                  <img
                    key={i}
                    src={
                      data[`customWhyBuyInspection${i + 1}`] ||
                      data[`inspectionTemplate${i + 1}`]?.imageUrl
                    }
                    alt={inspectionPoints[i]}
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${i === avxInspectionActive ? "opacity-100" : "opacity-0"}`}
                  />
                ))}
                <div className="absolute inset-0 bg-linear-to-t from-black/75 via-black/10 to-transparent" />
                <div className="absolute inset-0 bg-linear-to-r from-black/30 to-transparent" />
                <div className="absolute top-5 left-5 flex items-center gap-2">
                  <span className="text-xs font-[Poppins] text-primary/80 tracking-[0.3em] uppercase">
                    {String(avxInspectionActive + 1).padStart(2, "0")} —{" "}
                    {inspectionPoints[avxInspectionActive]?.split(" ")[0]}
                  </span>
                </div>
                <div className="absolute top-5 right-5">
                  <div className="w-8 h-8 rounded-full border border-white/20 bg-black/30 backdrop-blur-sm flex items-center justify-center">
                    {paused ? (
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                      >
                        <path
                          d="M4.5 2.5v7M7.5 2.5v7"
                          stroke="white"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                      </svg>
                    ) : (
                      <svg
                        width="10"
                        height="12"
                        viewBox="0 0 10 12"
                        fill="none"
                      >
                        <path d="M1.5 1.5l7 4.5-7 4.5V1.5z" fill="white" />
                      </svg>
                    )}
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 px-5 pb-5 flex flex-col gap-3">
                  <p className="text-primary font-[Montserrat] font-semibold text-lg sm:text-xl">
                    {inspectionPoints[avxInspectionActive]}
                  </p>
                  <div className="w-full h-0.5 bg-white/20 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full"
                      style={{ width: `${progress}%`, transition: "none" }}
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    {inspectionPoints.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => handleSelect(i)}
                        className={`rounded-full transition-all duration-300 ${i === avxInspectionActive ? "w-6 h-1.5 bg-primary" : "w-1.5 h-1.5 bg-white/30 hover:bg-white/60"}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-between gap-3">
                {inspectionPoints.map((point, i) => (
                  <button
                    key={i}
                    onClick={() => handleSelect(i)}
                    className={`relative flex items-start gap-4 rounded-xl px-5 py-4 text-left transition-all duration-300 overflow-hidden border cursor-pointer ${i === avxInspectionActive ? "border-third/30 bg-third/5" : "border-white/6 bg-white/2 hover:border-white/12"}`}
                  >
                    <div
                      className={`absolute left-0 top-3 bottom-3 w-0.5 rounded-full transition-all duration-300 ${i === avxInspectionActive ? "bg-third" : "bg-transparent"}`}
                    />
                    <div className="shrink-0 w-14 h-14 rounded-lg overflow-hidden">
                      <img
                        src={
                          data[`customWhyBuyInspection${i + 1}`] ||
                          data[`inspectionTemplate${i + 1}`]?.imageUrl
                        }
                        alt={point}
                        className={`w-full h-full object-cover transition-all duration-500 ${i === avxInspectionActive ? "scale-110" : "scale-100 grayscale opacity-50"}`}
                      />
                    </div>
                    <div className="flex flex-col gap-1 flex-1 min-w-0">
                      <span
                        className={`text-[10px] tracking-[0.3em] uppercase font-[Poppins] font-medium transition-colors duration-300 ${i === avxInspectionActive ? "text-primary/90" : "text-third/40"}`}
                      >
                        {String(i + 1).padStart(2, "0")} — {point.split(" ")[0]}
                      </span>
                      <span
                        className={`text-sm font-[Poppins] leading-snug transition-colors duration-300 ${i === avxInspectionActive ? "text-primary" : "text-third/60"}`}
                      >
                        {point}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ===== Customer Commitment Section ===== */}
      <section className="py-12 px-2 lg:px-4">
        <div className="container">
          <div className="relative flex items-center justify-center">
            <div className="absolute inset-0 overflow-hidden rounded-2xl">
              {[
                data.customWhyBuyCustomerCommitment1 ||
                  data.customerCommitmentTemplate1?.imageUrl,
                data.customWhyBuyCustomerCommitment2 ||
                  data.customerCommitmentTemplate2?.imageUrl,
                data.customWhyBuyCustomerCommitment3 ||
                  data.customerCommitmentTemplate3?.imageUrl,
              ]
                .filter(Boolean)
                .map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt=""
                    aria-hidden
                    className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ${i === commitmentActive ? "opacity-100 scale-100" : "opacity-0 scale-[1.04]"}`}
                  />
                ))}
              <div className="absolute inset-0 bg-black/55" />
              <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-black/30" />
            </div>
            <div className="relative z-10 max-w-3xl mx-auto w-full flex flex-col items-center gap-8 px-4 py-20 text-center">
              <div className="flex items-center gap-3">
                <p className="text-sm tracking-[0.4em] uppercase text-third font-semibold">
                  Our Promise
                </p>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.05] text-primary font-[Montserrat]">
                {data.customerCommitmentTitle}
              </h2>
              <div
                className="text-white/70 text-lg md:text-xl font-[Poppins] leading-relaxed max-w-2xl"
                dangerouslySetInnerHTML={{
                  __html: data.customerCommitmentDescription,
                }}
              />
            </div>
          </div>
        </div>
      </section>
      {/* ===== Gallery Section ===== */}
      <section className="w-full flex justify-center pt-12 px-4 sm:px-6 lg:px-0">
        <div className="container">
          <div className="w-full flex flex-col gap-9 lg:gap-3">
            <div className="flex flex-col gap-4 justify-center items-center">
              <p className="text-sm tracking-[0.4em] uppercase text-third font-semibold">
                Gallery
              </p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.05] text-primary font-[Montserrat]">
                Our Showroom <span className="text-primary">& Team</span>
              </h2>
            </div>
            <div
              className="hidden md:flex relative items-center justify-center h-80 lg:h-[380px]"
              onMouseEnter={() => setSpread(true)}
              onMouseLeave={() => {
                setSpread(false);
                setHovered(null);
              }}
            >
              {galleryImages.map((src, i) => {
                const fan = fanConfig[i];
                const isHovered = hovered === i;
                const tx = spread ? fan.translateX * 1.8 : fan.translateX * 1;
                const ty = spread
                  ? isHovered
                    ? -28
                    : fan.translateY
                  : fan.translateY;
                const rot = spread
                  ? isHovered
                    ? 0
                    : fan.rotate * 1
                  : fan.rotate;
                const sc = spread ? (isHovered ? 1.05 : fan.scale) : fan.scale;
                return (
                  <div
                    key={i}
                    className="absolute transition-all duration-500 w-[260px] h-80"
                    style={{
                      zIndex: isHovered ? 10 : fan.zIndex,
                      transform: `translateX(${tx}px) translateY(${ty}px) rotate(${rot}deg) scale(${sc})`,
                    }}
                    onMouseEnter={() => setHovered(i)}
                    onMouseLeave={() => setHovered(null)}
                  >
                    <div className="relative w-full h-full rounded-2xl overflow-hidden cursor-pointer">
                      <img
                        src={src}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4">
                        <p className="text-primary font-[Montserrat] font-semibold text-base">
                          {captions[i]}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="md:hidden flex gap-4 overflow-x-auto pb-4">
              {galleryImages.map((img, i) => (
                <div
                  key={i}
                  className="min-w-[260px] h-80 rounded-2xl overflow-hidden shrink-0"
                >
                  <img
                    src={img}
                    alt=""
                    className="w-full h-full object-cover"
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
                  {data.testimonialTitle}
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
                    dangerouslySetInnerHTML={{ __html: reviewText }}
                  />
                  <span className="text-xs font-semibold text-primary/90 font-[Montserrat] uppercase tracking-widest">
                    {reviewerName}
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
                  {(data.featuredReviews || data.testimonials || []).map(
                    (_, i) => (
                      <button
                        key={i}
                        onClick={() => transition(i)}
                        className={`rounded-full transition-all duration-500 ${i === testimonialsactive ? "w-6 h-1.5 bg-primary" : "w-1.5 h-1.5 bg-third/20 hover:bg-third/40"}`}
                      />
                    ),
                  )}
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
