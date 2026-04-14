/* eslint-disable react-hooks/set-state-in-effect */
"use client";
import { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import {
  Quote,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Star,
} from "lucide-react";
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
} from "@/services/theme.service";
import { getAllReview } from "@/services/user.service";
import { WHY_BUY_PREMIUM_2 } from "../schemas/whybuy/why_buy_premium_2";
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
const DEFAULT_DATA = WHY_BUY_PREMIUM_2[0].data;
export default function WhyBuyPremium2({ data: rawData, isEditing, onUpdate, onNextTab }) {
  const [isSaving, setIsSaving] = useState(false);
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
        const reviews = response?.data?.reviews || [];
        setAllReviews(reviews);
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
  /* ================== API HANDLERS ================== */
  const handleSaveAndNext = async () => {
    setIsSaving(true);
    try {
      const heroData = new FormData();
      heroData.append("whyBuyHeroTitle", data.whyBuyHeroTitle || "");
      heroData.append("whyBuyHeroDescription", data.whyBuyHeroDescription || "");

      for (let i = 1; i <= 3; i++) {
        const customField = `customWhyBuyHero${i}`;
        const tmpl = data[`whyBuyHeroTemplate${i}`];
        if (data[customField] && data[customField].startsWith("blob:")) {
          const blob = await getBlobFromUrl(data[customField]);
          if (blob) heroData.append(customField, blob, `hero${i}.png`);
        } else if (tmpl?.id) {
          heroData.append(`whyBuyHeroTemplateId${i}`, tmpl.id);
        }
      }

      const storyData = new FormData();
      storyData.append("storyTitle", data.storyTitle || "");
      storyData.append("storyDescription", data.storyDescription || "");
      for (let i = 1; i <= 4; i++) {
        const customField = `customStory${i}`;
        const tmpl = data[`storyTemplate${i}`];
        if (data[customField] && data[customField].startsWith("blob:")) {
          const blob = await getBlobFromUrl(data[customField]);
          if (blob) storyData.append(customField, blob, `story${i}.png`);
        } else if (tmpl?.id) {
          storyData.append(`storyTemplateId${i}`, tmpl.id);
        }
      }

      const vehicleData = new FormData();
      vehicleData.append("vehicleSelectionTitle", data.vehicleSelectionTitle || "");
      vehicleData.append("vehicleSelectionDescription", data.vehicleSelectionDescription || "");
      for (let i = 1; i <= 2; i++) {
        const customField = `customVehicleSelection${i}`;
        const tmpl = data[`vehicleSelectionTemplate${i}`];
        if (data[customField] && data[customField].startsWith("blob:")) {
          const blob = await getBlobFromUrl(data[customField]);
          if (blob) vehicleData.append(customField, blob, `selection${i}.png`);
        } else if (tmpl?.id) {
          vehicleData.append(`vehicleSelectionTemplateId${i}`, tmpl.id);
        }
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
      for (let i = 1; i <= 4; i++) {
        const customField = `customProcess${i}`;
        const tmpl = data[`processTemplate${i}`];
        if (data[customField] && data[customField].startsWith("blob:")) {
          const blob = await getBlobFromUrl(data[customField]);
          if (blob) processData.append(customField, blob, `process${i}.png`);
        } else if (tmpl?.id) {
          processData.append(`processTemplateId${i}`, tmpl.id);
        }
      }

      const inspectionData = new FormData();
      inspectionData.append("inspectionTitle", data.inspectionTitle || "");
      inspectionData.append("inspectionDescription", data.inspectionText || "");
      if (data.inspectionPoints) {
        data.inspectionPoints.forEach((pt, i) => {
          inspectionData.append(`inspectionPoints[${i}]`, pt || "");
        });
      }
      for (let i = 1; i <= 4; i++) {
        const customField = `customInspection${i}`;
        const tmpl = data[`inspectionTemplate${i}`];
        if (data[customField] && data[customField].startsWith("blob:")) {
          const blob = await getBlobFromUrl(data[customField]);
          if (blob) inspectionData.append(customField, blob, `inspection${i}.png`);
        } else if (tmpl?.id) {
          inspectionData.append(`inspectionTemplateId${i}`, tmpl.id);
        }
      }

      const commitmentData = new FormData();
      commitmentData.append("customerCommitmentTitle", data.customerCommitmentTitle || "");
      commitmentData.append("customerCommitmentDescription", data.customerCommitmentDescription || "");
      for (let i = 1; i <= 5; i++) {
        const customField = `customCustomerCommitment${i}`;
        const tmpl = data[`customerCommitmentTemplate${i}`];
        if (data[customField] && data[customField].startsWith("blob:")) {
          const blob = await getBlobFromUrl(data[customField]);
          if (blob) commitmentData.append(customField, blob, `commitment${i}.png`);
        } else if (tmpl?.id) {
          commitmentData.append(`customerCommitmentTemplateId${i}`, tmpl.id);
        }
      }

      // Testimonial
      try {
         updateField("testimonialTitle", data.testimonialTitle || "");
      } catch(e) {}

      await Promise.all([
        setWhyBuyHero(heroData),
        setWhyBuyStory(storyData),
        setWhyBuyVehicleSelection(vehicleData),
        setWhyBuyProcess(processData),
        setWhyBuyInspection(inspectionData),
        setWhyBuyCustomerCommitment(commitmentData),
        setFeaturedReviews(selectedReviewIds)
      ]);

      if (onNextTab) onNextTab();
    } catch (error) {
      console.error("Error saving sections:", error);
    } finally {
      setIsSaving(false);
    }
  };

  /* ================== PREVIEW STATE ================== */
  const [activeInspection, setActiveInspection] = useState(0);
  const [activeCommitment, setActiveCommitment] = useState(1);
  const swiperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
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
  const slidesPerView = isDesktop ? 2 : 1;
  const total = (data.testimonials || []).length;
  const maxIndex = total - slidesPerView;
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
                      data.customWhyBuyHeroUrl1 ||
                      data.whyBuyHeroTemplate1?.imageUrl
                    }
                    fieldKey="heroVid"
                    imageType="WHY_BUY_HERO"
                    onChange={({ imageUrl, id }) => {
                      const updatedData = { ...data };
                      if (id) {
                        // Template selected
                        updatedData.whyBuyHeroTemplate1 = { imageUrl, id };
                        delete updatedData.customWhyBuyHero1;
                      } else {
                        // Custom image uploaded
                        updatedData.customWhyBuyHero1 = imageUrl;
                        delete updatedData.whyBuyHeroTemplate1;
                      }
                      onUpdate(updatedData);
                    }}
                  />
                </div>
                <div className="h-40 relative">
                  <ImageUploader
                    label="Image 1"
                    src={
                      data.customWhyBuyHero2 ||
                      data.customWhyBuyHeroUrl2 ||
                      data.whyBuyHeroTemplate2?.imageUrl
                    }
                    fieldKey="heroImg1"
                    imageType="WHY_BUY_HERO"
                    onChange={({ imageUrl, id }) => {
                      const updatedData = { ...data };
                      if (id) {
                        // Template selected
                        updatedData.whyBuyHeroTemplate2 = { imageUrl, id };
                        delete updatedData.customWhyBuyHero2;
                      } else {
                        // Custom image uploaded
                        updatedData.customWhyBuyHero2 = imageUrl;
                        delete updatedData.whyBuyHeroTemplate2;
                      }
                      onUpdate(updatedData);
                    }}
                  />
                </div>
                <div className="h-40 relative col-span-2">
                  <ImageUploader
                    label="Image 2"
                    src={
                      data.customWhyBuyHero3 ||
                      data.customWhyBuyHeroUrl3 ||
                      data.whyBuyHeroTemplate3?.imageUrl
                    }
                    fieldKey="heroImg2"
                    imageType="WHY_BUY_HERO"
                    onChange={({ imageUrl, id }) => {
                      const updatedData = { ...data };
                      if (id) {
                        // Template selected
                        updatedData.whyBuyHeroTemplate3 = { imageUrl, id };
                        delete updatedData.customWhyBuyHero3;
                      } else {
                        // Custom image uploaded
                        updatedData.customWhyBuyHero3 = imageUrl;
                        delete updatedData.whyBuyHeroTemplate3;
                      }
                      onUpdate(updatedData);
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
                {[1, 2, 3, 4].map((n) => (
                  <div
                    key={n}
                    className={`h-40 relative ${n === 1 ? "col-span-2" : ""}`}
                  >
                    <ImageUploader
                      label={`Image ${n}`}
                      src={
                        data[`customStory${n}`] ||
                        data[`customStoryUrl${n}`] ||
                        data[`storyTemplate${n}`]?.imageUrl
                      }
                      fieldKey={`storyImg${n}`}
                      imageType="CONSULTANT_STORY"
                      onChange={({ imageUrl, id }) => {
                        const updatedData = { ...data };
                        if (id) {
                          // Template selected
                          updatedData[`storyTemplate${n}`] = { imageUrl, id };
                          delete updatedData[`customStory${n}`];
                        } else {
                          // Custom image uploaded
                          updatedData[`customStory${n}`] = imageUrl;
                          delete updatedData[`storyTemplate${n}`];
                        }
                        onUpdate(updatedData);
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
                {[1, 2].map((n) => (
                  <div key={n} className="h-40 relative">
                    <ImageUploader
                      label={`Image ${n}`}
                      src={
                        data[`customVehicleSelection${n}`] ||
                        data[`customVehicleSelectionUrl${n}`] ||
                        data[`vehicleSelectionTemplate${n}`]?.imageUrl
                      }
                      fieldKey={`selImg${n}`}
                      imageType="VEHICLE_SELECTION"
                      onChange={({ imageUrl, id }) => {
                        const updatedData = { ...data };
                        if (id) {
                          // Template selected
                          updatedData[`vehicleSelectionTemplate${n}`] = { imageUrl, id };
                          delete updatedData[`customVehicleSelection${n}`];
                        } else {
                          // Custom image uploaded
                          updatedData[`customVehicleSelection${n}`] = imageUrl;
                          delete updatedData[`vehicleSelectionTemplate${n}`];
                        }
                        onUpdate(updatedData);
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
              />
              <RichTextEditor
                label="Process Description"
                value={data.processDescription}
                onChange={(v) => updateField("processDescription", v)}
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
                      label={`Step ${n} Image`}
                      src={
                        data[`customProcess${n}`] ||
                        data[`customProcessUrl${n}`] ||
                        data[`processTemplate${n}`]?.imageUrl
                      }
                      fieldKey={`procImg${n}`}
                      imageType="HOW_BUYING_WORKS"
                      onChange={({ imageUrl, id }) => {
                        const updatedData = { ...data };
                        if (id) {
                          // Template selected
                          updatedData[`processTemplate${n}`] = { imageUrl, id };
                          delete updatedData[`customProcess${n}`];
                        } else {
                          // Custom image uploaded
                          updatedData[`customProcess${n}`] = imageUrl;
                          delete updatedData[`processTemplate${n}`];
                        }
                        onUpdate(updatedData);
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
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
                {[1, 2, 3, 4].map((n) => (
                  <div
                    key={n}
                    className={`h-40 relative ${n === 1 ? "col-span-2" : ""}`}
                  >
                    <ImageUploader
                      label={`Image ${n}`}
                      src={
                        data[`customInspection${n}`] ||
                        data[`customInspectionUrl${n}`] ||
                        data[`inspectionTemplate${n}`]?.imageUrl
                      }
                      fieldKey={`inspImg${n}`}
                      imageType="INSPECTION_PROCESS"
                      onChange={({ imageUrl, id }) => {
                        const updatedData = { ...data };
                        if (id) {
                          // Template selected
                          updatedData[`inspectionTemplate${n}`] = { imageUrl, id };
                          delete updatedData[`customInspection${n}`];
                        } else {
                          // Custom image uploaded
                          updatedData[`customInspection${n}`] = imageUrl;
                          delete updatedData[`inspectionTemplate${n}`];
                        }
                        onUpdate(updatedData);
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
                {[1, 2, 3, 4, 5].map((n) => (
                  <div
                    key={n}
                    className={`h-40 relative ${n === 1 ? "col-span-2" : ""}`}
                  >
                    <ImageUploader
                      label={`Image ${n}`}
                      src={
                        data[`customCustomerCommitment${n}`] ||
                        data[`customCustomerCommitmentUrl${n}`] ||
                        data[`customerCommitmentTemplate${n}`]?.imageUrl
                      }
                      fieldKey={`commImg${n}`}
                      imageType="CUSTOMER_COMMITMENT"
                      onChange={({ imageUrl, id }) => {
                        const updatedData = { ...data };
                        if (id) {
                          // Template selected
                          updatedData[`customerCommitmentTemplate${n}`] = { imageUrl, id };
                          delete updatedData[`customCustomerCommitment${n}`];
                        } else {
                          // Custom image uploaded
                          updatedData[`customCustomerCommitment${n}`] = imageUrl;
                          delete updatedData[`customerCommitmentTemplate${n}`];
                        }
                        onUpdate(updatedData);
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
                    data[`customGallery${n}`] ||
                    data[`customGalleryUrl${n}`] ||
                    data[`galleryTemplate${n}`]?.imageUrl
                  }
                  fieldKey={`galImg${n}`}
                  imageType="GALLERY"
                  onChange={({ imageUrl, id }) => {
                    const updatedData = { ...data };
                    if (id) {
                      // Template selected
                      updatedData[`galleryTemplate${n}`] = { imageUrl, id };
                      delete updatedData[`customGallery${n}`];
                    } else {
                      // Custom image uploaded
                      updatedData[`customGallery${n}`] = imageUrl;
                      delete updatedData[`galleryTemplate${n}`];
                    }
                    onUpdate(updatedData);
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
          />
          <p className="text-third text-sm">
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
  /* ================== LIVE PREVIEW ================== */
  return (
    <>
      {/* ═══════════════════════════════════════
          SECTION 1 — HERO (image background)
      ═══════════════════════════════════════ */}
      <section className="py-12 px-2 lg:px-4 relative min-h-screen flex items-center overflow-hidden">
        {/* HERO BACKGROUND (Video/Image) */}
        <div className="absolute inset-0 w-full h-full">
          {(
            data.customWhyBuyHero1 || data.customWhyBuyHeroUrl1 || data.whyBuyHeroTemplate1?.imageUrl
          )?.includes(".mp4") ? (
            <video
              src={data.customWhyBuyHero1 || data.customWhyBuyHeroUrl1 || data.whyBuyHeroTemplate1?.imageUrl}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            />
          ) : (
            <img
              src={data.customWhyBuyHero1 || data.customWhyBuyHeroUrl1 || data.whyBuyHeroTemplate1?.imageUrl}
              className="w-full h-full object-cover"
              alt="Hero Background"
            />
          )}
        </div>
        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/40 to-transparent" />
        <div className="container">
          <div className="relative z-10 w-full max-w-6xl">
            <div className="max-w-xl">
              <h1 className="sm:text-4xl lg:text-5xl text-4xl font-semibold leading-[1.05] text-primary font-[Montserrat] mb-6">
                {data.whyBuyHeroTitle}
              </h1>
              <div
                className="text-white/80 leading-[1.9] text-[15px]"
                dangerouslySetInnerHTML={{ __html: data.whyBuyHeroDescription }}
              />
            </div>
          </div>
        </div>
      </section>
      {/* ═══════════════════════════════════════
          SECTION 2 — STORY
      ═══════════════════════════════════════ */}
      <section className="py-12 px-2 lg:px-4 bg-fourth">
        <div className="container">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <p className="text-xs tracking-[0.35em] uppercase text-primary/60 mb-4">
                Our Story
              </p>
              <h2 className="text-4xl lg:text-5xl font-semibold text-primary leading-[1.1] mb-6">
                {data.storyTitle}
              </h2>
              <div
                className="text-primary/85 text-[15px] leading-loose max-w-md"
                dangerouslySetInnerHTML={{ __html: data.storyDescription }}
              />
            </div>
            <div className="relative w-full h-[420px]">
              <div className="absolute inset-0 overflow-hidden rounded-2xl">
                <img
                  src={data.customStory1 || data.customStoryUrl1 || data.storyTemplate1?.imageUrl}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="absolute bottom-6 right-6 w-[140px] h-[100px] overflow-hidden border rounded-2xl border-white/20">
                <img
                  src={data.customStory2 || data.customStoryUrl2 || data.storyTemplate2?.imageUrl}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
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
            <div>
              <p className="text-sm tracking-[0.4em] uppercase text-third font-semibold mb-3">
                Selection
              </p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.05] text-primary mb-5">
                {data.vehicleSelectionTitle}
              </h2>
              <div className="w-10 h-px bg-primary/20 my-4" />
              <div
                className="text-third/70 text-[15px] leading-[1.9] max-w-md"
                dangerouslySetInnerHTML={{
                  __html: data.vehicleSelectionDescription,
                }}
              />
            </div>
            <div className="relative w-full h-80 lg:h-[380px]">
              <div className="absolute top-0 left-0 w-[75%] h-full overflow-hidden">
                <img
                  src={
                    data.customVehicleSelection1 ||
                    data.customVehicleSelectionUrl1 ||
                    data.vehicleSelectionTemplate1?.imageUrl
                  }
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="absolute top-0 right-0 w-[38%] h-[48%] overflow-hidden">
                <img
                  src={
                    data.customVehicleSelection2 ||
                    data.customVehicleSelectionUrl2 ||
                    data.vehicleSelectionTemplate2?.imageUrl
                  }
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="absolute bottom-0 right-0 w-[38%] h-[48%] overflow-hidden">
                <img
                  src={
                    data.customStory3 ||
                    data.customStoryUrl3 ||
                    data.storyTemplate3?.imageUrl ||
                    data.customVehicleSelection1 ||
                    data.customVehicleSelectionUrl1 ||
                    data.vehicleSelectionTemplate1?.imageUrl
                  }
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
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
          <div className="mb-16 max-w-2xl">
            <p className="text-sm tracking-[0.4em] uppercase text-third mb-3">
              Process
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-primary mb-4">
              {data.processTitle}
            </h2>
            <div
              className="text-third/60 text-[15px] leading-[1.9]"
              dangerouslySetInnerHTML={{ __html: data.processDescription }}
            />
          </div>
          <div className="flex flex-col gap-16">
            {data.processSteps.map((step, i) => {
              const isLeft = i % 2 === 0;
              return (
                <div
                  key={i}
                  className={`grid lg:grid-cols-2 gap-10 items-center ${
                    !isLeft ? "lg:[&>*:first-child]:order-2" : ""
                  }`}
                >
                  <div className="w-full h-[260px] lg:h-80 rounded-2xl overflow-hidden">
                    <img
                      src={
                        data[`customProcess${i + 1}`] ||
                        data[`customProcessUrl${i + 1}`] ||
                        data[`processTemplate${i + 1}`]?.imageUrl
                      }
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 border border-primary/20 flex items-center justify-center [&>svg]:w-4 [&>svg]:h-4 [&>svg]:text-fourth"
                        dangerouslySetInnerHTML={{ __html: step.icon }}
                      />
                      <span className="text-[11px] tracking-[0.2em] text-third/40">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold text-primary">
                      {step.title}
                    </h3>
                    <div
                      className="text-third/65 text-[14px] leading-[1.8] max-w-md"
                      dangerouslySetInnerHTML={{ __html: step.description }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      {/* ═══════════════════════════════════════
          SECTION 5 — INSPECTION
      ═══════════════════════════════════════ */}
      <section className="py-12 px-2 lg:px-4">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-10 mb-14">
            <div>
              <p className="text-sm tracking-[0.4em] uppercase text-third mb-3">
                Inspection
              </p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-primary leading-[1.1]">
                {data.inspectionTitle}
              </h2>
            </div>
            <div className="flex items-end">
              <div
                className="text-third/70 text-[15px] leading-[1.9] max-w-md"
                dangerouslySetInnerHTML={{ __html: data.inspectionText }}
              />
            </div>
          </div>
          <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-12 items-center">
            <div
              key={activeInspection}
              className="w-full h-60 sm:h-[300px] md:h-[340px] lg:h-[270px] rounded-2xl overflow-hidden"
            >
              <img
                src={
                  data[`customInspection${activeInspection + 1}`] ||
                  data[`customInspectionUrl${activeInspection + 1}`] ||
                  data[`inspectionTemplate${activeInspection + 1}`]?.imageUrl
                }
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col gap-8">
              {data.inspectionPoints.map((item, i) => (
                <div
                  key={i}
                  onClick={() => setActiveInspection(i)}
                  className="cursor-pointer group"
                >
                  <div className="flex items-start gap-4">
                    <span
                      className={`text-[14px] font-bold ${
                        i === activeInspection
                          ? "text-fourth"
                          : "text-primary/40 group-hover:text-primary"
                      }`}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={`text-[16px] leading-[1.6] transition ${
                        i === activeInspection
                          ? "text-primary font-medium"
                          : "text-primary/60 group-hover:text-primary"
                      }`}
                    >
                      {item}
                    </span>
                  </div>
                  <div
                    className={`mt-3 h-px transition-all duration-300 ${
                      i === activeInspection
                        ? "bg-fourth w-full"
                        : "bg-primary/10 w-0 group-hover:w-full"
                    }`}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* ═══════════════════════════════════════
          SECTION 6 — COMMITMENT
      ═══════════════════════════════════════ */}
      <section className="py-12 px-2 lg:px-4 bg-fourth">
        <div className="container">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-5 items-center">
            <div className="max-w-md">
              <p className="text-xs tracking-[0.35em] uppercase text-primary/60 mb-4">
                Commitment
              </p>
              <h2 className="text-4xl lg:text-5xl font-semibold text-primary leading-[1.1] mb-6">
                {data.customerCommitmentTitle}
              </h2>
              <div
                className="text-primary/90 text-[15px] leading-loose"
                dangerouslySetInnerHTML={{
                  __html: data.customerCommitmentDescription,
                }}
              />
            </div>
            <div className="flex gap-3 h-80">
              {[
                data.customerCommitmentTemplate2,
                data.customerCommitmentTemplate3,
                data.customerCommitmentTemplate4,
              ].map((tmpl, i) => (
                <div
                  key={i}
                  onMouseEnter={() => setActiveCommitment(i)}
                  className="relative overflow-hidden rounded-2xl cursor-pointer transition-all duration-500"
                  style={{ flex: i === activeCommitment ? 3 : 1 }}
                >
                  <img
                    src={
                      data[`customCustomerCommitment${i + 2}`] ||
                      data[`customCustomerCommitmentUrl${i + 2}`] ||
                      data[`customerCommitmentTemplate${i + 2}`]?.imageUrl
                    }
                    className="w-full h-full object-cover transition duration-700"
                    loading="lazy"
                  />
                  <div
                    className={`absolute inset-0 transition duration-500 ${
                      i === activeCommitment ? "bg-black/10" : "bg-black/30"
                    }`}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* ═══════════════════════════════════════
          SECTION 7 — GALLERY
      ═══════════════════════════════════════ */}
      <section className="py-12 px-2 lg:px-4">
        <div className="container">
          <div className="flex flex-col gap-3 mb-14">
            <p className="text-sm tracking-[0.4em] uppercase text-third font-semibold">
              Gallery
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-primary">
              Our Showroom <span className="text-primary">& Team</span>
            </h2>
          </div>
          <div className="flex flex-col gap-3 lg:grid lg:grid-cols-12 lg:grid-rows-[400px_220px] lg:gap-3">
            <div className="relative overflow-hidden rounded-2xl h-[300px] lg:h-auto lg:col-span-6 lg:row-span-2">
              <img
                src={
                  data.customGallery1 || data.customGalleryUrl1 || data.galleryTemplate1?.imageUrl
                }
                className="absolute inset-0 w-full h-full object-cover transition duration-500 hover:scale-105"
                loading="lazy"
              />
            </div>
            <div className="flex gap-3 lg:contents">
              <div className="relative overflow-hidden rounded-2xl h-[180px] flex-1 lg:h-auto lg:col-span-4 lg:row-span-1">
                <img
                  src={
                    data.customGallery2 || data.customGalleryUrl2 || data.galleryTemplate2?.imageUrl
                  }
                  className="absolute inset-0 w-full h-full object-cover transition duration-500 hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="relative overflow-hidden rounded-2xl h-[180px] w-[30%] lg:h-auto lg:w-auto lg:col-span-2 lg:row-span-1">
                <img
                  src={
                    data.customGallery5 || data.customGalleryUrl5 || data.galleryTemplate5?.imageUrl
                  }
                  className="absolute inset-0 w-full h-full object-cover transition duration-500 hover:scale-105"
                  loading="lazy"
                />
              </div>
            </div>
            <div className="flex gap-3 lg:contents">
              <div className="relative overflow-hidden h-40 rounded-2xl flex-1 lg:h-auto lg:col-span-3 lg:row-span-1">
                <img
                  src={
                    data.customGallery3 || data.customGalleryUrl3 || data.galleryTemplate3?.imageUrl
                  }
                  className="absolute inset-0 w-full h-full object-cover transition duration-500 hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="relative overflow-hidden h-40 rounded-2xl flex-1 lg:h-auto lg:col-span-3 lg:row-span-1">
                <img
                  src={
                    data.customGallery4 || data.customGalleryUrl4 || data.galleryTemplate4?.imageUrl
                  }
                  className="absolute inset-0 w-full h-full object-cover transition duration-500 hover:scale-105"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ═══════════════════════════════════════
          SECTION 8 — TESTIMONIALS
      ═══════════════════════════════════════ */}
      <section className="py-12 px-2 lg:px-4">
        <div className="container">
          <div className="flex items-end justify-between mb-12">
            <div className="flex flex-col gap-3">
              <p className="text-sm tracking-[0.4em] uppercase text-third font-semibold mb-2">
                Reviews
              </p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-primary">
                {data.testimonialTitle}
              </h2>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => swiperRef.current?.slidePrev()}
                className="w-10 h-10 rounded-xl border border-primary/30 flex items-center justify-center text-fourth hover:bg-primary/10"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={() => swiperRef.current?.slideNext()}
                className="w-10 h-10 rounded-xl border border-primary/30 flex items-center justify-center text-fourth hover:bg-primary/10"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
          <Swiper
            modules={[Autoplay]}
            slidesPerView={slidesPerView}
            spaceBetween={24}
            loop={true}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
            className="rounded-2xl overflow-hidden"
          >
            {(data.featuredReviews || data.testimonials || []).map((t, i) => {
              const reviewText = t.reviewText || t.review;
              const reviewerName = t.reviewerName || t.name;
              const rating = t.rating || 5;
              return (
                <SwiperSlide key={`${reviewerName}-${i}`}>
                  <div className="group relative rounded-2xl p-7 bg-white/5 backdrop-blur-md border border-white/10 hover:border-primary/30 transition-all duration-300 overflow-hidden">
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-linear-to-br from-primary/10 via-transparent to-transparent" />
                    <Quote
                      size={22}
                      className="text-fourth mb-4 relative z-10"
                      strokeWidth={1.4}
                    />
                    <div
                      className="font-[Poppins] text-[14px] leading-[1.9] text-third/80 italic relative z-10 mb-6"
                      dangerouslySetInnerHTML={{ __html: reviewText }}
                    />
                    <div className="w-full h-px bg-primary/10 mb-5 relative z-10" />
                    <div className="flex items-center gap-3 relative z-10">
                      <div className="w-10 h-10 rounded-full bg-linear-to-br from-fourth/30 to-fourth/10 flex items-center justify-center font-bold text-[14px] text-fourth">
                        {reviewerName?.[0] || "?"}
                      </div>
                      <div>
                        <p className="font-[Montserrat] font-semibold text-[13px] text-primary">
                          {reviewerName}
                        </p>
                        <p className="text-[11px] text-third/50">
                          Verified Buyer
                        </p>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
          <div className="flex items-center gap-2 mt-8">
            {Array.from({ length: maxIndex + 1 }).map((_, i) => (
              <button
                key={i}
                onClick={() => swiperRef.current?.slideToLoop(i)}
                className={`h-1 rounded-full transition-all duration-300 ${
                  i === activeIndex ? "w-6 bg-primary/60" : "w-2 bg-primary/15"
                }`}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
