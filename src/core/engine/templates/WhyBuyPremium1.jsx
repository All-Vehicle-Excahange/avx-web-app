/* eslint-disable react-hooks/set-state-in-effect */
"use client";
import { ArrowRight, CheckCircle2, Star, Plus, Trash } from "lucide-react";
import { useState, useEffect, useRef, useCallback } from "react";
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
import { WHY_BUY_PREMIUM_1 } from "../schemas/whybuy/why_buy_premium_1";
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
const DEFAULT_DATA = WHY_BUY_PREMIUM_1[0].data;
export default function WhyBuyPremium1({
  data: rawData,
  isEditing,
  onUpdate,
  onNextTab,
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
  const [active, setActive] = useState(0);
  const scrollRef = useRef(null);
  const [hovered, setHovered] = useState(null);
  const rightRef = useRef(null);
  const [allReviews, setAllReviews] = useState([]);
  const [selectedReviewIds, setSelectedReviewIds] = useState(
    (data.featuredReviews || []).map((r) => r.id),
  );
  /* ================== HELPERS ================== */
  const getBlobFromUrl = async (url) => {
    if (!url || !url.startsWith("blob:")) return null;
    try {
      const response = await fetch(url);
      return await response.blob();
    } catch (e) {
      console.error("Error fetching blob from URL:", e);
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
  const addArrayItem = (arrayName, item) => {
    updateField(arrayName, [...(data[arrayName] || []), item]);
  };
  const removeArrayItem = (arrayName, index) => {
    const copy = [...(data[arrayName] || [])];
    copy.splice(index, 1);
    updateField(arrayName, copy);
  };
  const toggleReviewSelection = (id) => {
    setSelectedReviewIds((prev) =>
      prev.includes(id) ? prev.filter((rid) => rid !== id) : [...prev, id],
    );
  };
  /* ================== EFFECTS ================== */
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
  /* ================== API HANDLERS ================== */
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
      else if (data.whyBuyHeroTemplate1?.imageUrl) {
        const b = await getBlobFromUrl(data.whyBuyHeroTemplate1.imageUrl);
        if (b) heroData.append("customWhyBuyHero1", b, "hero1.png");
      }
      if (data.whyBuyHeroTemplate2?.id)
        heroData.append("whyBuyHeroTemplateId2", data.whyBuyHeroTemplate2.id);
      else if (data.whyBuyHeroTemplate2?.imageUrl) {
        const b = await getBlobFromUrl(data.whyBuyHeroTemplate2.imageUrl);
        if (b) heroData.append("customWhyBuyHero2", b, "hero2.png");
      }
      if (data.whyBuyHeroTemplate3?.id)
        heroData.append("whyBuyHeroTemplateId3", data.whyBuyHeroTemplate3.id);
      else if (data.whyBuyHeroTemplate3?.imageUrl) {
        const b = await getBlobFromUrl(data.whyBuyHeroTemplate3.imageUrl);
        if (b) heroData.append("customWhyBuyHero3", b, "hero3.png");
      }

      const storyData = new FormData();
      storyData.append("storyTitle", data.storyTitle || "");
      storyData.append("storyDescription", data.storyDescription || "");
      if (data.storyTemplate1?.id)
        storyData.append("storyTemplateId1", data.storyTemplate1.id);
      else if (data.storyTemplate1?.imageUrl) {
        const b = await getBlobFromUrl(data.storyTemplate1.imageUrl);
        if (b) storyData.append("customStory1", b, "story1.png");
      }
      if (data.storyTemplate2?.id)
        storyData.append("storyTemplateId2", data.storyTemplate2.id);
      else if (data.storyTemplate2?.imageUrl) {
        const b = await getBlobFromUrl(data.storyTemplate2.imageUrl);
        if (b) storyData.append("customStory2", b, "story2.png");
      }
      if (data.storyTemplate3?.id)
        storyData.append("storyTemplateId3", data.storyTemplate3.id);
      else if (data.storyTemplate3?.imageUrl) {
        const b = await getBlobFromUrl(data.storyTemplate3.imageUrl);
        if (b) storyData.append("customStory3", b, "story3.png");
      }

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
      else if (data.vehicleSelectionTemplate1?.imageUrl) {
        const b = await getBlobFromUrl(data.vehicleSelectionTemplate1.imageUrl);
        if (b)
          vehicleData.append("customVehicleSelection1", b, "sel1.png");
      }
      if (data.vehicleSelectionTemplate2?.id)
        vehicleData.append(
          "vehicleSelectionTemplateId2",
          data.vehicleSelectionTemplate2.id,
        );
      else if (data.vehicleSelectionTemplate2?.imageUrl) {
        const b = await getBlobFromUrl(data.vehicleSelectionTemplate2.imageUrl);
        if (b)
          vehicleData.append("customVehicleSelection2", b, "sel2.png");
      }

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
      const procImages = [
        { key: "customWhyBuyProcess1", val: data.customWhyBuyProcess1 },
        { key: "customWhyBuyProcess2", val: data.customWhyBuyProcess2 },
        { key: "customWhyBuyProcess3", val: data.customWhyBuyProcess3 },
        { key: "customWhyBuyProcess4", val: data.customWhyBuyProcess4 },
      ];
      for (const img of procImages) {
        if (img.val && img.val.startsWith("blob:")) {
          const b = await getBlobFromUrl(img.val);
          if (b) processData.append(img.key, b, `${img.key}.png`);
        }
      }

      const inspectionData = new FormData();
      inspectionData.append("inspectionTitle", data.inspectionTitle || "");
      inspectionData.append("inspectionDescription", data.inspectionText || "");
      if (data.inspectionTemplate1?.id)
        inspectionData.append(
          "inspectionTemplateId1",
          data.inspectionTemplate1.id,
        );
      else if (data.inspectionTemplate1?.imageUrl) {
        const b = await getBlobFromUrl(data.inspectionTemplate1.imageUrl);
        if (b) inspectionData.append("customInspection1", b, "insp1.png");
      }
      if (data.inspectionTemplate2?.id)
        inspectionData.append(
          "inspectionTemplateId2",
          data.inspectionTemplate2.id,
        );
      else if (data.inspectionTemplate2?.imageUrl) {
        const b = await getBlobFromUrl(data.inspectionTemplate2.imageUrl);
        if (b) inspectionData.append("customInspection2", b, "insp2.png");
      }
      if (data.inspectionTemplate3?.id)
        inspectionData.append(
          "inspectionTemplateId3",
          data.inspectionTemplate3.id,
        );
      else if (data.inspectionTemplate3?.imageUrl) {
        const b = await getBlobFromUrl(data.inspectionTemplate3.imageUrl);
        if (b) inspectionData.append("customInspection3", b, "insp3.png");
      }
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
      for (let i = 1; i <= 5; i++) {
        const tmpl = data[`customerCommitmentTemplate${i}`];
        if (tmpl?.id)
          commitmentData.append(`customerCommitmentTemplateId${i}`, tmpl.id);
        else if (tmpl?.imageUrl) {
          const b = await getBlobFromUrl(tmpl.imageUrl);
          if (b)
            commitmentData.append(
              `customCustomerCommitment${i}`,
              b,
              `comm${i}.png`,
            );
        }
      }

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
      // Note: Backend might not use galleryData directly in WhyBuyPremium. Keeping consistent with existing logic.

      await Promise.all([
        setWhyBuyHero(heroData),
        setWhyBuyStory(storyData),
        setWhyBuyVehicleSelection(vehicleData),
        setWhyBuyProcess(processData),
        setWhyBuyInspection(inspectionData),
        setWhyBuyCustomerCommitment(commitmentData),
        setWhyBuyGallery(galleryData),
        setFeaturedReviews(selectedReviewIds),
      ]);

      if (onNextTab) onNextTab();
    } catch (error) {
      console.error("Error saving sections:", error);
    } finally {
      setIsSaving(false);
    }
  };

  /* ================== AUTO SCROLL ================== */
  useEffect(() => {
    if (isEditing) return;
    let scrollAmount = 0;
    const scroll = () => {
      if (!scrollRef.current) return;
      scrollAmount += 1;
      scrollRef.current.scrollLeft = scrollAmount;
      if (scrollAmount >= scrollRef.current.scrollWidth / 2) scrollAmount = 0;
      requestAnimationFrame(scroll);
    };
    const handle = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(handle);
  }, [isEditing]);
  /* ================== GALLERY CAROUSEL ================== */
  const galleryImages = [
    data.customGallery1 || data.galleryTemplate1?.imageUrl,
    data.customGallery2 || data.galleryTemplate2?.imageUrl,
    data.customGallery3 || data.galleryTemplate3?.imageUrl,
    data.customGallery4 || data.galleryTemplate4?.imageUrl,
    data.customGallery5 || data.galleryTemplate5?.imageUrl,
  ].filter(Boolean);
  const n = galleryImages.length;
  const animating = useRef(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const timerRef = useRef(null);
  const mod = (v, m) => ((v % m) + m) % m;
  const goTo = useCallback(
    (idx) => {
      if (animating.current) return;
      animating.current = true;
      setActive(mod(idx, n));
      setTimeout(() => {
        animating.current = false;
      }, 650);
    },
    [n],
  );
  const next = useCallback(() => goTo(active + 1), [active, goTo]);
  const prev = useCallback(() => goTo(active - 1), [active, goTo]);
  useEffect(() => {
    timerRef.current = setInterval(next, 2500);
    return () => clearInterval(timerRef.current);
  }, [next]);
  const handleTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };
  const handleTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };
  const handleTouchEnd = () => {
    const dist = touchStartX.current - touchEndX.current;
    if (dist > 50) next();
    else if (dist < -50) prev();
  };
  const getPosition = (i) => {
    const diff = mod(i - active, n);
    if (diff === 0) return "center";
    if (diff === 1) return "right";
    if (diff === n - 1) return "left";
    return diff < n / 2 ? "hidden-right" : "hidden-left";
  };
  const positionStyles = {
    center:
      "w-[60%] h-[300px] sm:h-[380px] md:h-[420px] left-1/2 -translate-x-1/2 opacity-100 scale-100 z-30 cursor-default",
    left: "hidden md:block w-[25%] h-[260px] left-0 translate-x-0 opacity-40 scale-95 z-20 cursor-pointer",
    right:
      "hidden md:block w-[25%] h-[260px] right-0 translate-x-0 opacity-40 scale-95 z-20 cursor-pointer",
    "hidden-left":
      "w-[25%] h-[260px] left-0 -translate-x-full opacity-0 scale-90 z-10",
    "hidden-right":
      "w-[25%] h-[260px] right-0 translate-x-full opacity-0 scale-90 z-10",
  };
  /* ================== EDITOR ================== */
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
              />
              <RichTextEditor
                label="Hero Description"
                value={data.whyBuyHeroDescription}
                onChange={(v) => updateField("whyBuyHeroDescription", v)}
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
                      const updated = {
                        ...data,
                        whyBuyHeroTemplate1: {
                          ...data.whyBuyHeroTemplate1,
                          imageUrl,
                          id: id || null,
                        },
                      };
                      if (id) delete updated.customWhyBuyHero1;
                      if (onUpdate) onUpdate(updated);
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
                      const updated = {
                        ...data,
                        whyBuyHeroTemplate2: {
                          ...data.whyBuyHeroTemplate2,
                          imageUrl,
                          id: id || null,
                        },
                      };
                      if (id) delete updated.customWhyBuyHero2;
                      if (onUpdate) onUpdate(updated);
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
                      const updated = {
                        ...data,
                        whyBuyHeroTemplate3: {
                          ...data.whyBuyHeroTemplate3,
                          imageUrl,
                          id: id || null,
                        },
                      };
                      if (id) delete updated.customWhyBuyHero3;
                      if (onUpdate) onUpdate(updated);
                    }}
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
              />
              <RichTextEditor
                label="Story Description"
                value={data.storyDescription}
                onChange={(v) => updateField("storyDescription", v)}
              />
            </div>
            <div className="space-y-4">
              <p className="text-sm font-semibold text-primary">Story Images</p>
              <div className="grid grid-cols-2 gap-4">
                <div className="h-40 relative col-span-2">
                  <ImageUploader
                    label="Image 1"
                    src={
                      data.customWhyBuyStory1 || data.storyTemplate1?.imageUrl
                    }
                    fieldKey="storyImg1"
                    imageType="CONSULTANT_STORY"
                    onChange={({ imageUrl, id }) => {
                      const updated = {
                        ...data,
                        storyTemplate1: {
                          ...data.storyTemplate1,
                          imageUrl,
                          id: id || null,
                        },
                      };
                      if (id) delete updated.customWhyBuyStory1;
                      if (onUpdate) onUpdate(updated);
                    }}
                  />
                </div>
                <div className="h-40 relative">
                  <ImageUploader
                    label="Image 2"
                    src={
                      data.customWhyBuyStory2 || data.storyTemplate2?.imageUrl
                    }
                    fieldKey="storyImg2"
                    imageType="CONSULTANT_STORY"
                    onChange={({ imageUrl, id }) => {
                      const updated = {
                        ...data,
                        storyTemplate2: {
                          ...data.storyTemplate2,
                          imageUrl,
                          id: id || null,
                        },
                      };
                      if (id) delete updated.customWhyBuyStory2;
                      if (onUpdate) onUpdate(updated);
                    }}
                  />
                </div>
                <div className="h-40 relative">
                  <ImageUploader
                    label="Image 3"
                    src={
                      data.customWhyBuyStory3 || data.storyTemplate3?.imageUrl
                    }
                    fieldKey="storyImg3"
                    imageType="CONSULTANT_STORY"
                    onChange={({ imageUrl, id }) => {
                      const updated = {
                        ...data,
                        storyTemplate3: {
                          ...data.storyTemplate3,
                          imageUrl,
                          id: id || null,
                        },
                      };
                      if (id) delete updated.customWhyBuyStory3;
                      if (onUpdate) onUpdate(updated);
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
              />
              <RichTextEditor
                label="Selection Description"
                value={data.vehicleSelectionDescription}
                onChange={(v) => updateField("vehicleSelectionDescription", v)}
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
                    src={
                      data.customWhyBuyVehicleSelection1 ||
                      data.vehicleSelectionTemplate1?.imageUrl
                    }
                    fieldKey="selImg1"
                    imageType="VEHICLE_SELECTION"
                    onChange={({ imageUrl, id }) => {
                      const updated = {
                        ...data,
                        vehicleSelectionTemplate1: {
                          ...data.vehicleSelectionTemplate1,
                          imageUrl,
                          id: id || null,
                        },
                      };
                      if (id) delete updated.customWhyBuyVehicleSelection1;
                      if (onUpdate) onUpdate(updated);
                    }}
                  />
                </div>
                <div className="h-40 relative">
                  <ImageUploader
                    label="Image 2"
                    src={
                      data.customWhyBuyVehicleSelection2 ||
                      data.vehicleSelectionTemplate2?.imageUrl
                    }
                    fieldKey="selImg2"
                    imageType="VEHICLE_SELECTION"
                    onChange={({ imageUrl, id }) => {
                      const updated = {
                        ...data,
                        vehicleSelectionTemplate2: {
                          ...data.vehicleSelectionTemplate2,
                          imageUrl,
                          id: id || null,
                        },
                      };
                      if (id) delete updated.customWhyBuyVehicleSelection2;
                      if (onUpdate) onUpdate(updated);
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
                value={data.processTitle}
                onChange={(e) => updateField("processTitle", e.target.value)}
              />
              <RichTextEditor
                label="Process Description"
                value={data.processDescription}
                onChange={(v) => updateField("processDescription", v)}
              />
            </div>
            {/* <div className="space-y-4">
              <p className="text-sm font-semibold text-primary">
                Process Images
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="h-40 relative">
                  <ImageUploader
                    label="Step 1 Image"
                    src={
                      data.customWhyBuyProcess1 ||
                      data.processTemplate1?.imageUrl
                    }
                    fieldKey="procImg1"
                    imageType="HOW_BUYING_WORKS"
                    onChange={({ imageUrl, id }) => {
                      const updated = {
                        ...data,
                        processTemplate1: {
                          ...data.processTemplate1,
                          imageUrl,
                          id: id || null,
                        },
                      };
                      if (id) delete updated.customWhyBuyProcess1;
                      else updated.customWhyBuyProcess1 = imageUrl;
                      if (onUpdate) onUpdate(updated);
                    }}
                  />
                </div>
                <div className="h-40 relative">
                  <ImageUploader
                    label="Step 2 Image"
                    src={
                      data.customWhyBuyProcess2 ||
                      data.processTemplate2?.imageUrl
                    }
                    fieldKey="procImg2"
                    imageType="HOW_BUYING_WORKS"
                    onChange={({ imageUrl, id }) => {
                      const updated = {
                        ...data,
                        processTemplate2: {
                          ...data.processTemplate2,
                          imageUrl,
                          id: id || null,
                        },
                      };
                      if (id) delete updated.customWhyBuyProcess2;
                      else updated.customWhyBuyProcess2 = imageUrl;
                      if (onUpdate) onUpdate(updated);
                    }}
                  />
                </div>
                <div className="h-40 relative">
                  <ImageUploader
                    label="Step 3 Image"
                    src={
                      data.customWhyBuyProcess3 ||
                      data.processTemplate3?.imageUrl
                    }
                    fieldKey="procImg3"
                    imageType="HOW_BUYING_WORKS"
                    onChange={({ imageUrl, id }) => {
                      const updated = {
                        ...data,
                        processTemplate3: {
                          ...data.processTemplate3,
                          imageUrl,
                          id: id || null,
                        },
                      };
                      if (id) delete updated.customWhyBuyProcess3;
                      else updated.customWhyBuyProcess3 = imageUrl;
                      if (onUpdate) onUpdate(updated);
                    }}
                  />
                </div>
                <div className="h-40 relative">
                  <ImageUploader
                    label="Step 4 Image"
                    src={
                      data.customWhyBuyProcess4 ||
                      data.processTemplate4?.imageUrl
                    }
                    fieldKey="procImg4"
                    imageType="HOW_BUYING_WORKS"
                    onChange={({ imageUrl, id }) => {
                      const updated = {
                        ...data,
                        processTemplate4: {
                          ...data.processTemplate4,
                          imageUrl,
                          id: id || null,
                        },
                      };
                      if (id) delete updated.customWhyBuyProcess4;
                      else updated.customWhyBuyProcess4 = imageUrl;
                      if (onUpdate) onUpdate(updated);
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
                value={data.inspectionTitle}
                onChange={(e) => updateField("inspectionTitle", e.target.value)}
              />
              <RichTextEditor
                label="Inspection Description"
                value={data.inspectionText}
                onChange={(v) => updateField("inspectionText", v)}
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
                  />
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <p className="text-sm font-semibold text-primary">
                Inspection Images
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="h-40 relative col-span-2">
                  <ImageUploader
                    label="Main Image"
                    src={
                      data.customWhyBuyInspection1 ||
                      data.inspectionTemplate1?.imageUrl
                    }
                    fieldKey="inspImg1"
                    imageType="INSPECTION_PROCESS"
                    onChange={({ imageUrl, id }) => {
                      const updated = {
                        ...data,
                        inspectionTemplate1: {
                          ...data.inspectionTemplate1,
                          imageUrl,
                          id: id || null,
                        },
                      };
                      if (id) delete updated.customWhyBuyInspection1;
                      if (onUpdate) onUpdate(updated);
                    }}
                  />
                </div>
                <div className="h-40 relative">
                  <ImageUploader
                    label="Focus Image"
                    src={
                      data.customWhyBuyInspection2 ||
                      data.inspectionTemplate2?.imageUrl
                    }
                    fieldKey="inspImg2"
                    imageType="INSPECTION_PROCESS"
                    onChange={({ imageUrl, id }) => {
                      const updated = {
                        ...data,
                        inspectionTemplate2: {
                          ...data.inspectionTemplate2,
                          imageUrl,
                          id: id || null,
                        },
                      };
                      if (id) delete updated.customWhyBuyInspection2;
                      if (onUpdate) onUpdate(updated);
                    }}
                  />
                </div>
                <div className="h-40 relative">
                  <ImageUploader
                    label="Mini Image"
                    src={
                      data.customWhyBuyInspection3 ||
                      data.inspectionTemplate3?.imageUrl
                    }
                    fieldKey="inspImg3"
                    imageType="INSPECTION_PROCESS"
                    onChange={({ imageUrl, id }) => {
                      const updated = {
                        ...data,
                        inspectionTemplate3: {
                          ...data.inspectionTemplate3,
                          imageUrl,
                          id: id || null,
                        },
                      };
                      if (id) delete updated.customWhyBuyInspection3;
                      if (onUpdate) onUpdate(updated);
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
              />
              <RichTextEditor
                label="Commitment Description"
                value={data.customerCommitmentDescription}
                onChange={(v) =>
                  updateField("customerCommitmentDescription", v)
                }
              />
            </div>
            <div className="space-y-4">
              <p className="text-sm font-semibold text-primary">
                Commitment Images
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="h-40 relative col-span-2">
                  <ImageUploader
                    label="Background"
                    src={
                      data.customWhyBuyCustomerCommitment1 ||
                      data.customerCommitmentTemplate1?.imageUrl
                    }
                    fieldKey="commBg"
                    imageType="CUSTOMER_COMMITMENT"
                    onChange={({ imageUrl, id }) => {
                      const updated = {
                        ...data,
                        customerCommitmentTemplate1: {
                          ...data.customerCommitmentTemplate1,
                          imageUrl,
                          id: id || null,
                        },
                      };
                      if (id) delete updated.customWhyBuyCustomerCommitment1;
                      if (onUpdate) onUpdate(updated);
                    }}
                  />
                </div>
                <div className="h-40 relative">
                  <ImageUploader
                    label="Main Image"
                    src={
                      data.customWhyBuyCustomerCommitment2 ||
                      data.customerCommitmentTemplate2?.imageUrl
                    }
                    fieldKey="commImg2"
                    imageType="CUSTOMER_COMMITMENT"
                    onChange={({ imageUrl, id }) => {
                      const updated = {
                        ...data,
                        customerCommitmentTemplate2: {
                          ...data.customerCommitmentTemplate2,
                          imageUrl,
                          id: id || null,
                        },
                      };
                      if (id) delete updated.customWhyBuyCustomerCommitment2;
                      if (onUpdate) onUpdate(updated);
                    }}
                  />
                </div>
                <div className="h-40 relative">
                  <ImageUploader
                    label="Offset Image"
                    src={
                      data.customWhyBuyCustomerCommitment3 ||
                      data.customerCommitmentTemplate3?.imageUrl
                    }
                    fieldKey="commImg3"
                    imageType="CUSTOMER_COMMITMENT"
                    onChange={({ imageUrl, id }) => {
                      const updated = {
                        ...data,
                        customerCommitmentTemplate3: {
                          ...data.customerCommitmentTemplate3,
                          imageUrl,
                          id: id || null,
                        },
                      };
                      if (id) delete updated.customWhyBuyCustomerCommitment3;
                      if (onUpdate) onUpdate(updated);
                    }}
                  />
                </div>
                <div className="h-40 relative">
                  <ImageUploader
                    label="Circle Image"
                    src={
                      data.customWhyBuyCustomerCommitment4 ||
                      data.customerCommitmentTemplate4?.imageUrl
                    }
                    fieldKey="commImg4"
                    imageType="CUSTOMER_COMMITMENT"
                    onChange={({ imageUrl, id }) => {
                      const updated = {
                        ...data,
                        customerCommitmentTemplate4: {
                          ...data.customerCommitmentTemplate4,
                          imageUrl,
                          id: id || null,
                        },
                      };
                      if (id) delete updated.customWhyBuyCustomerCommitment4;
                      if (onUpdate) onUpdate(updated);
                    }}
                  />
                </div>
                <div className="h-40 relative">
                  <ImageUploader
                    label="Accent Image"
                    src={
                      data.customWhyBuyCustomerCommitment5 ||
                      data.customerCommitmentTemplate5?.imageUrl
                    }
                    fieldKey="commImg5"
                    imageType="CUSTOMER_COMMITMENT"
                    onChange={({ imageUrl, id }) => {
                      const updated = {
                        ...data,
                        customerCommitmentTemplate5: {
                          ...data.customerCommitmentTemplate5,
                          imageUrl,
                          id: id || null,
                        },
                      };
                      if (id) delete updated.customWhyBuyCustomerCommitment5;
                      if (onUpdate) onUpdate(updated);
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
                src={
                  data.customGallery1 || data.galleryTemplate1?.imageUrl
                }
                fieldKey="galImg1"
                imageType="GALLERY"
                onChange={({ imageUrl, id }) => {
                  const updated = {
                    ...data,
                    galleryTemplate1: {
                      ...data.galleryTemplate1,
                      imageUrl,
                      id: id || null,
                    },
                  };
                  if (id) delete updated.customGallery1;
                  if (onUpdate) onUpdate(updated);
                }}
              />
            </div>
            <div className="h-40 relative">
              <ImageUploader
                label="Gallery Image 2"
                src={
                  data.customGallery2 || data.galleryTemplate2?.imageUrl
                }
                fieldKey="galImg2"
                imageType="GALLERY"
                onChange={({ imageUrl, id }) => {
                  const updated = {
                    ...data,
                    galleryTemplate2: {
                      ...data.galleryTemplate2,
                      imageUrl,
                      id: id || null,
                    },
                  };
                  if (id) delete updated.customGallery2;
                  if (onUpdate) onUpdate(updated);
                }}
              />
            </div>
            <div className="h-40 relative">
              <ImageUploader
                label="Gallery Image 3"
                src={
                  data.customGallery3 || data.galleryTemplate3?.imageUrl
                }
                fieldKey="galImg3"
                imageType="GALLERY"
                onChange={({ imageUrl, id }) => {
                  const updated = {
                    ...data,
                    galleryTemplate3: {
                      ...data.galleryTemplate3,
                      imageUrl,
                      id: id || null,
                    },
                  };
                  if (id) delete updated.customGallery3;
                  if (onUpdate) onUpdate(updated);
                }}
              />
            </div>
            <div className="h-40 relative">
              <ImageUploader
                label="Gallery Image 4"
                src={
                  data.customGallery4 || data.galleryTemplate4?.imageUrl
                }
                fieldKey="galImg4"
                imageType="GALLERY"
                onChange={({ imageUrl, id }) => {
                  const updated = {
                    ...data,
                    galleryTemplate4: {
                      ...data.galleryTemplate4,
                      imageUrl,
                      id: id || null,
                    },
                  };
                  if (id) delete updated.customGallery4;
                  if (onUpdate) onUpdate(updated);
                }}
              />
            </div>
            <div className="h-40 relative col-span-2">
              <ImageUploader
                label="Gallery Image 5"
                src={
                  data.customGallery5 || data.galleryTemplate5?.imageUrl
                }
                fieldKey="galImg5"
                imageType="GALLERY"
                onChange={({ imageUrl, id }) => {
                  const updated = {
                    ...data,
                    galleryTemplate5: {
                      ...data.galleryTemplate5,
                      imageUrl,
                      id: id || null,
                    },
                  };
                  if (id) delete updated.customGallery5;
                  if (onUpdate) onUpdate(updated);
                }}
              />
            </div>
          </div>
        </div>
        <hr className="border-third/20" />
        {/* TESTIMONIALS */}
        <div className="space-y-6">
          <h3 className="text-primary font-bold text-xl mb-4">
            Select Featured Reviews
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[600px] overflow-y-auto p-2 border border-primary/20 rounded-lg">
            {allReviews.length > 0 ? (
              allReviews.map((review) => {
                const isSelected = selectedReviewIds.includes(review.id);
                return (
                  <div
                    key={review.id}
                    onClick={() => toggleReviewSelection(review.id)}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      isSelected
                        ? "border-fourth bg-fourth/10"
                        : "border-primary/20 bg-primary/5 hover:border-primary/40"
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-bold text-primary truncate">
                        {review.reviewedBy?.firstname}{" "}
                        {review.reviewedBy?.lastname}
                      </h4>
                      {isSelected && (
                        <CheckCircle2 className="text-fourth" size={18} />
                      )}
                    </div>
                    <div className="flex gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={12}
                          className={
                            i < review.rating
                              ? "fill-fourth text-fourth"
                              : "text-gray-400"
                          }
                        />
                      ))}
                    </div>
                    <p className="text-sm text-primary/70 line-clamp-3 italic">
                      {review.reviewText}
                    </p>
                  </div>
                );
              })
            ) : (
              <p className="text-primary/60 col-span-full py-8 text-center italic">
                No reviews available to select.
              </p>
            )}
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
  /* ================== LIVE PREVIEW ================== */
  return (
    <>
      {/* ═════════ HERO ═════════ */}
      <section className="relative w-full min-h-screen flex items-center overflow-hidden px-2 lg:px-4 py-12">
        <div className="container mx-auto max-w-7xl grid lg:grid-cols-2 gap-12 items-center">
          {/* LEFT CONTENT */}
          <div>
            <p className="mb-4 text-sm tracking-[0.4em] uppercase text-third font-semibold">
              Trusted Auto Consultants
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.05] text-primary font-[Montserrat]">
              {data.whyBuyHeroTitle}
            </h2>
            <div
              className="text-[#a89f94] text-base md:text-lg leading-relaxed font-[Poppins] max-w-lg mb-10"
              dangerouslySetInnerHTML={{ __html: data.whyBuyHeroDescription }}
            />
            {/* CTA */}
          </div>
          {/* RIGHT SIDE */}
          <div className="flex flex-col gap-5 mt-10 lg:mt-0">
            {/* VIDEO */}
            <div className="group relative rounded-2xl overflow-hidden border border-secondary/20 transition-all duration-500 hover:shadow-[0_20px_60px_rgba(184,150,62,0.25)]">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-[220px] sm:h-[260px] object-cover transition-transform duration-700 group-hover:scale-105"
                src={
                  data.customWhyBuyHero1 || data.whyBuyHeroTemplate1?.imageUrl
                }
              />
              <div className="absolute inset-0 bg-linear-to-t from-[#0a0a0c]/70 to-transparent" />
            </div>
            {/* IMAGE GRID */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {[
                {
                  tmpl: data.whyBuyHeroTemplate2,
                  custom: data.customWhyBuyHero2,
                },
                {
                  tmpl: data.whyBuyHeroTemplate3,
                  custom: data.customWhyBuyHero3,
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="group relative rounded-xl overflow-hidden border border-secondary/15 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_15px_40px_rgba(0,0,0,0.6)]"
                >
                  <img
                    src={item.custom || item.tmpl?.imageUrl}
                    className="w-full h-[110px] sm:h-[130px] object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-[#0a0a0c]/70 via-secondary/10 to-transparent opacity-70 group-hover:opacity-90 transition duration-300" />
                  <div className="absolute inset-0 border border-transparent group-hover:border-secondary/40 transition-all duration-300 rounded-xl" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* ═════════ EXPERIENCE ═════════ */}
      <section className="w-full py-12 bg-primary border-y border-secondary/10 px-4 lg:px-8">
        <div className="container max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          {/* LEFT */}
          <div className="flex flex-col gap-6">
            <p className="text-sm tracking-[0.4em] uppercase text-secondary/70 font-semibold">
              Consultant Story
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold leading-[1.1] text-secondary font-[Montserrat]">
              {data.storyTitle}
            </h2>
            <div className="w-10 h-px bg-secondary/30" />
            <div
              className="text-secondary/80 font-[Poppins] leading-relaxed text-base md:text-lg"
              dangerouslySetInnerHTML={{ __html: data.storyDescription }}
            />
          </div>
          {/* RIGHT */}
          <div
            ref={rightRef}
            onMouseLeave={() => setHovered(null)}
            className="relative h-[500px] hidden md:block"
          >
            {[
              { tmpl: data.storyTemplate1, custom: data.customWhyBuyStory1 },
              { tmpl: data.storyTemplate2, custom: data.customWhyBuyStory2 },
              { tmpl: data.storyTemplate3, custom: data.customWhyBuyStory3 },
            ].map((item, i) => {
              const src = item.custom || item.tmpl?.imageUrl;
              if (!src) return null;
              const positions = [
                "top-0 left-0 w-[68%] h-[62%]",
                "bottom-0 right-0 w-[60%] h-[58%]",
                "top-[28%] left-[22%] w-[52%] h-[44%]",
              ];
              return (
                <div
                  key={i}
                  onMouseEnter={() => setHovered(i)}
                  className={`
                  absolute ${positions[i]}
                  rounded-xl overflow-hidden
                  transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]
                  ${hovered === i ? "z-20 scale-[1.03]" : "z-10"}
                `}
                  style={{
                    transform:
                      hovered === i
                        ? "translateY(-10px) rotate(0deg)"
                        : i === 0
                          ? "rotate(-2deg)"
                          : i === 1
                            ? "rotate(2deg)"
                            : "rotate(-1deg)",
                  }}
                >
                  <img
                    src={src}
                    alt=""
                    className={`
                    w-full h-full object-cover
                    transition-all duration-700
                    ${hovered === i ? "brightness-105 saturate-110 scale-105" : "brightness-90 saturate-90"}
                  `}
                  />
                  <div className="absolute inset-0 border border-white/10 rounded-xl pointer-events-none" />
                  <div
                    className={`absolute inset-0 bg-black/30 transition-opacity duration-500 ${
                      hovered === i ? "opacity-0" : "opacity-100"
                    }`}
                  />
                </div>
              );
            })}
            {/* YEAR BADGE */}
            <div className="absolute bottom-6 right-6 flex flex-col items-end z-30 pointer-events-none">
              <span className="text-[52px] font-light text-white/10 leading-none tracking-tight">
                12
              </span>
              <span className="text-[10px] tracking-[0.3em] uppercase text-white/30">
                Years
              </span>
            </div>
          </div>
        </div>
      </section>
      {/* ═════════ VEHICLE SELECTION ═════════ */}
      <section className="relative w-full py-12 overflow-hidden px-2 sm:px-4">
        <div className="container">
          {/* BACKGROUND IMAGE STRIP */}
          <div
            ref={scrollRef}
            className="absolute inset-0 flex overflow-hidden pointer-events-none"
          >
            {[
              data.customWhyBuyVehicleSelection1 ||
                data.vehicleSelectionTemplate1?.imageUrl,
              data.customWhyBuyVehicleSelection2 ||
                data.vehicleSelectionTemplate2?.imageUrl,
              data.customWhyBuyVehicleSelection1 ||
                data.vehicleSelectionTemplate1?.imageUrl,
              data.customWhyBuyVehicleSelection2 ||
                data.vehicleSelectionTemplate2?.imageUrl,
            ].map((img, i) => (
              <div
                key={i}
                className="min-w-[350px] h-full overflow-hidden rounded-2xl opacity-[0.3]"
              >
                <img
                  src={img}
                  className="w-full h-full object-cover grayscale"
                />
              </div>
            ))}
          </div>
          {/* CONTENT */}
          <div className="relative z-20 max-w-7xl mx-auto flex flex-col gap-10">
            <p className="text-sm tracking-[0.4em] uppercase text-third font-semibold">
              Our Standards
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.05] text-primary font-[Montserrat]">
              {data.vehicleSelectionTitle}
            </h2>
            <div
              className="max-w-2xl border-l-2 border-primary/40 pl-5 text-third text-lg font-[Poppins] leading-relaxed"
              dangerouslySetInnerHTML={{
                __html: data.vehicleSelectionDescription,
              }}
            />
          </div>
        </div>
      </section>
      {/* ═════════ PROCESS ═════════ */}
      <section className="w-full py-12 px-2 sm:px-4">
        <div className="container max-w-7xl mx-auto flex flex-col gap-12 lg:gap-20">
          {/* HEADER */}
          <div className="max-w-2xl flex flex-col gap-4">
            <p className="text-xs tracking-[0.5em] uppercase text-third/60 font-semibold">
              Simple Process
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight text-primary font-[Montserrat]">
              {data.processTitle}
            </h2>
            <div
              className="text-third text-sm sm:text-base lg:text-lg font-[Poppins] leading-relaxed"
              dangerouslySetInnerHTML={{ __html: data.processDescription }}
            />
          </div>
          {/* MOBILE VIEW (STACKED) */}
          <div className="flex flex-col gap-6 lg:hidden">
            {data.processSteps.map((step, i) => (
              <div key={i} className="relative rounded-2xl overflow-hidden">
                <img
                  src={
                    data[`customWhyBuyProcess${i + 1}`] ||
                    data[`processTemplate${i + 1}`]?.imageUrl
                  }
                  className="w-full h-[220px] object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent" />
                <div className="absolute top-4 left-4">
                  <div
                    className="w-10 h-10 flex items-center justify-center rounded-full border border-white/30 bg-white/10 [&>svg]:w-5 [&>svg]:h-5 [&>svg]:text-white"
                    dangerouslySetInnerHTML={{ __html: step.icon }}
                  />
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-base font-semibold text-white font-[Montserrat] mb-1">
                    {step.title}
                  </h3>
                  <p className="text-xs text-white/80 font-[Poppins] leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
          {/* DESKTOP VIEW (INTERACTIVE) */}
          <div className="hidden lg:flex h-[420px] gap-4">
            {data.processSteps.map((step, i) => {
              const isActive = active === i;
              return (
                <div
                  key={i}
                  onMouseEnter={() => setActive(i)}
                  className={`relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 ease-out
                  ${isActive ? "flex-3" : "flex-1"}
                `}
                >
                  <img
                    src={
                      data[`customWhyBuyProcess${i + 1}`] ||
                      data[`processTemplate${i + 1}`]?.imageUrl
                    }
                    className={`absolute inset-0 w-full h-full object-cover transition duration-700
                    ${isActive ? "scale-105" : "scale-100 grayscale"}
                  `}
                  />
                  <div
                    className={`absolute inset-0 transition duration-500
                  ${
                    isActive
                      ? "bg-linear-to-t from-black/70 via-black/40 to-transparent"
                      : "bg-black/40"
                  }
                `}
                  />
                  <div className="relative z-10 h-full p-6 flex flex-col justify-end">
                    <div className="absolute top-6 left-6">
                      <div
                        className={`flex items-center justify-center w-10 h-10 rounded-full border transition [&>svg]:w-5 [&>svg]:h-5 [&>svg]:text-white
                      ${isActive ? "border-white/40 bg-white/10" : "border-white/20"}
                    `}
                        dangerouslySetInnerHTML={{ __html: step.icon }}
                      />
                    </div>
                    <div
                      className={`transition-all duration-500
                    ${isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
                  `}
                    >
                      <h3 className="text-lg font-semibold text-white font-[Montserrat] mb-2">
                        {step.title}
                      </h3>
                      <p className="text-sm text-white/80 font-[Poppins] leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      {/* ═════════ INSPECTION ═════════ */}
      <section className="w-full py-12 overflow-hidden px-2 sm:px-4">
        <div className="container max-w-7xl mx-auto">
          {/* TOP HEADER */}
          <div className="flex flex-col items-center text-center mb-20 gap-4">
            <p className="text-sm tracking-[0.5em] uppercase text-third font-semibold">
              Independent Verification
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight text-primary font-[Montserrat] max-w-3xl">
              {data.inspectionTitle}
            </h2>
            <div className="h-1 w-20 bg-primary mt-2 rounded-full" />
          </div>
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            {/* LEFT: DYNAMIC IMAGE ARCHITECTURE */}
            <div className="lg:col-span-7 relative h-[500px] lg:h-[650px]">
              {/* 1. The "Base" Image */}
              <div className="absolute top-0 left-0 w-[75%] h-[70%] rounded-4xl overflow-hidden shadow-2xl z-10 group">
                <img
                  src={
                    data.customWhyBuyInspection1 ||
                    data.inspectionTemplate1?.imageUrl
                  }
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  alt="Main"
                />
                <div className="absolute inset-0 group-hover:bg-transparent transition-colors" />
              </div>
              {/* 2. The "Focus" Image */}
              <div className="absolute top-[20%] right-0 w-[45%] h-[60%] rounded-4xl overflow-hidden border-12 border-white shadow-[-20px_20px_60px_rgba(0,0,0,0.15)] z-20 group">
                <img
                  src={
                    data.customWhyBuyInspection2 ||
                    data.inspectionTemplate2?.imageUrl
                  }
                  className="w-full h-full object-cover"
                  alt="Detail"
                />
              </div>
              {/* 3. The "Abstract" Image */}
              <div className="absolute bottom-0 left-[15%] w-[35%] h-[25%] rounded-2xl overflow-hidden border-4 border-white shadow-xl z-30 transition-transform hover:-translate-y-2.5">
                <img
                  src={
                    data.customWhyBuyInspection3 ||
                    data.inspectionTemplate3?.imageUrl
                  }
                  className="w-full h-full object-cover"
                  alt="Mini Detail"
                />
              </div>
            </div>
            {/* RIGHT: INFO & INTERACTIVE LIST */}
            <div className="lg:col-span-5 flex flex-col gap-10 lg:pt-12">
              <div
                className="text-third text-[18px] font-[Poppins] leading-relaxed italic border-l-4 border-primary/30 pl-6"
                dangerouslySetInnerHTML={{ __html: data.inspectionText }}
              />
              {/* ICON-BASED POINTS */}
              <div className="flex flex-col gap-6">
                {data.inspectionPoints.map((pt, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-5 group cursor-default"
                  >
                    <div className="shrink-0 w-12 h-12 rounded-2xl border border-fourth/10 flex items-center justify-center group-hover:rotate-10 transition-all duration-300">
                      <CheckCircle2
                        className="text-primary group-hover:text-white transition-colors"
                        size={22}
                      />
                    </div>
                    <div className="flex flex-col">
                      <p className="text-third font-[Poppins] font-medium text-[16px] group-hover:text-primary transition-colors">
                        {pt}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ═════════ COMMITMENT ═════════ */}
      <section className="relative w-full min-h-[800px] flex items-center px-3 justify-center py-12 overflow-hidden bg-secondary">
        {/* BACKGROUND */}
        <div className="absolute inset-0 z-0">
          <img
            src={
              data.customWhyBuyCustomerCommitment1 ||
              data.customerCommitmentTemplate1?.imageUrl
            }
            className="w-full h-full object-cover opacity-40"
            alt="Main Background"
          />
          <div className="absolute inset-0 bg-linear-to-b from-secondary via-transparent to-secondary" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* LEFT SIDE: CONTENT */}
          <div className="flex flex-col items-start gap-6 text-left">
            <div className="flex flex-col gap-2">
              <p className="text-sm tracking-[0.4em] uppercase text-third font-semibold">
                Our Promise
              </p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-primary font-[Montserrat]">
                {data.customerCommitmentTitle}
              </h2>
              <div className="w-20 h-1 bg-primary mt-2 rounded-full" />
            </div>
            <div className="backdrop-blur-md p-8 rounded-3xl border border-primary/10 shadow-xl">
              <div
                className="text-primary/90 text-base sm:text-lg md:text-[16px] font-[Poppins] leading-relaxed"
                dangerouslySetInnerHTML={{
                  __html: data.customerCommitmentDescription,
                }}
              />
            </div>
          </div>
          {/* RIGHT SIDE: IMAGE STACK */}
          <div className="relative h-[500px] hidden md:block">
            {/* Main image */}
            <div className="absolute top-0 left-0 w-4/5 h-[350px] rounded-2xl overflow-hidden border-4 border-primary shadow-2xl z-20 group">
              <img
                src={
                  data.customWhyBuyCustomerCommitment2 ||
                  data.customerCommitmentTemplate2?.imageUrl
                }
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                alt=""
              />
              {/* Circle overlap */}
              <div className="absolute bottom-4 left-4 w-28 h-28 rounded-full border-4 border-primary overflow-hidden z-40 transition-transform duration-500 group-hover:translate-x-2 group-hover:-translate-y-1 shadow-xl">
                <img
                  src={
                    data.customWhyBuyCustomerCommitment4 ||
                    data.customerCommitmentTemplate4?.imageUrl
                  }
                  className="w-full h-full object-cover"
                  alt=""
                />
              </div>
            </div>
            {/* Offset image */}
            <div className="absolute bottom-0 right-0 w-3/5 h-[280px] rounded-2xl overflow-hidden border-4 border-primary shadow-2xl z-30 transform translate-x-4 -translate-y-10">
              <img
                src={
                  data.customWhyBuyCustomerCommitment3 ||
                  data.customerCommitmentTemplate3?.imageUrl
                }
                className="w-full h-full object-cover"
                alt=""
              />
            </div>
            {/* Small accent */}
            <div className="absolute -top-6 right-20 w-24 h-24 rounded-2xl rotate-12 border-2 border-primary overflow-hidden z-10 opacity-60">
              <img
                src={
                  data.customWhyBuyCustomerCommitment5 ||
                  data.customerCommitmentTemplate5?.imageUrl
                }
                className="w-full h-full object-cover"
                alt=""
              />
            </div>
          </div>
        </div>
        {/* Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-fourth/10 rounded-full blur-[120px] pointer-events-none" />
      </section>
      {/* ═════════ GALLERY ═════════ */}
      <section className="w-full py-12 overflow-hidden px-4 sm:px-8">
        <div className="container max-w-7xl mx-auto flex flex-col gap-12">
          {/* HEADER */}
          <div className="flex flex-col gap-4 max-w-2xl">
            <p className="text-sm tracking-[0.4em] uppercase text-third font-semibold">
              Gallery
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.05] text-primary font-[Montserrat]">
              Our Showroom & <span className="text-primary">Team</span>
            </h2>
          </div>
          {/* STAGE */}
          <div
            className="relative flex items-center justify-center h-[300px] sm:h-[380px] md:h-[420px]"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onMouseEnter={() => clearInterval(timerRef.current)}
            onMouseLeave={() => {
              timerRef.current = setInterval(next, 2500);
            }}
          >
            {galleryImages.map((src, i) => {
              const pos = getPosition(i);
              return (
                <div
                  key={i}
                  onClick={() => {
                    if (pos === "right") next();
                    else if (pos === "left") prev();
                  }}
                  className={`absolute rounded-2xl overflow-hidden shadow-2xl transition-all duration-600 ease-in-out will-change-transform ${positionStyles[pos]}`}
                >
                  <img src={src} className="w-full h-full object-cover" />
                </div>
              );
            })}
          </div>
          {/* DOTS */}
          <div className="flex justify-center gap-3">
            {galleryImages.map((_, i) => (
              <div
                key={i}
                onClick={() => goTo(i)}
                className={`w-2.5 h-2.5 rounded-full cursor-pointer transition-all duration-500 ${
                  active === i ? "bg-primary scale-125" : "bg-primary/30"
                }`}
              />
            ))}
          </div>
        </div>
      </section>
      {/* ═════════ TESTIMONIALS ═════════ */}
      <section className="w-full py-12 bg-primary px-2 lg:px-4">
        <div className="container max-w-7xl mx-3 flex flex-col gap-12">
          {/* HEADER */}
          <div className="flex flex-col gap-4 max-w-2xl">
            <p className="text-sm tracking-[0.35em] uppercase text-secondary/70 font-semibold font-[Montserrat]">
              Real Buyers
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.1] text-secondary font-[Montserrat]">
              {data.testimonialTitle}
            </h2>
          </div>
          {/* TESTIMONIALS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.featuredReviews && data.featuredReviews.length > 0 ? (
              data.featuredReviews.map((r, i) => (
                <div
                  key={i}
                  className="p-6 md:p-7 rounded-xl border border-secondary/15 bg-primary flex flex-col gap-4 hover:border-secondary/30 transition-all duration-300"
                >
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, idx) => (
                      <Star
                        key={idx}
                        size={15}
                        className={
                          idx < r.rating
                            ? "fill-fourth text-fourth"
                            : "text-gray-400"
                        }
                      />
                    ))}
                  </div>
                  <div
                    className="text-secondary/80 font-[Poppins] leading-relaxed text-[15px]"
                    dangerouslySetInnerHTML={{ __html: r.reviewText }}
                  />
                  <h4 className="text-secondary font-[Montserrat] font-semibold text-sm tracking-wide">
                    {r.reviewerName}
                  </h4>
                </div>
              ))
            ) : (
              <p className="text-secondary/60 col-span-full py-8 text-center italic">
                No featured reviews selected.
              </p>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
