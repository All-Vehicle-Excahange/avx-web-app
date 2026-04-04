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
export default function WhyBuyPremium2({ data: rawData, isEditing, onUpdate }) {
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
  const handleHeroBlur = async () => {
    try {
      const formData = new FormData();
      formData.append("whyBuyHeroTitle", data.whyBuyHeroTitle || "");
      formData.append(
        "whyBuyHeroDescription",
        data.whyBuyHeroDescription || "",
      );

      // Hero 1 (Can be video or image)
      if (data.whyBuyHeroTemplate1?.id) {
        formData.append("whyBuyHeroTemplateId1", data.whyBuyHeroTemplate1.id);
      } else if (data.customWhyBuyHero1) {
        const blob = await getBlobFromUrl(data.customWhyBuyHero1);
        if (blob) formData.append("customWhyBuyHero1", blob, "hero1.png");
      }

      // Hero 2
      if (data.whyBuyHeroTemplate2?.id) {
        formData.append("whyBuyHeroTemplateId2", data.whyBuyHeroTemplate2.id);
      } else if (data.customWhyBuyHero2) {
        const blob = await getBlobFromUrl(data.customWhyBuyHero2);
        if (blob) formData.append("customWhyBuyHero2", blob, "hero2.png");
      }

      // Hero 3
      if (data.whyBuyHeroTemplate3?.id) {
        formData.append("whyBuyHeroTemplateId3", data.whyBuyHeroTemplate3.id);
      } else if (data.customWhyBuyHero3) {
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
        if (tmpl?.id) {
          formData.append(`storyTemplateId${i}`, tmpl.id);
        } else if (data[customField]) {
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
        if (tmpl?.id) {
          formData.append(`vehicleSelectionTemplateId${i}`, tmpl.id);
        } else if (data[customField]) {
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

      if (data.processSteps) {
        data.processSteps.forEach((step, i) => {
          formData.append(`processes[${i}].title`, step.title || "");
          formData.append(`processes[${i}].desc`, step.description || "");
          formData.append(`processes[${i}].icon`, step.icon || "");
        });
      }

      for (let i = 1; i <= 4; i++) {
        const tmpl = data[`processTemplate${i}`];
        const customField = `customWhyBuyProcess${i}`;
        if (tmpl?.id) {
          formData.append(`processTemplateId${i}`, tmpl.id);
        } else if (data[customField]) {
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

      if (data.inspectionPoints) {
        data.inspectionPoints.forEach((pt, i) => {
          formData.append(`inspectionPoints[${i}]`, pt || "");
        });
      }

      for (let i = 1; i <= 4; i++) {
        const tmpl = data[`inspectionTemplate${i}`];
        const customField = `customWhyBuyInspection${i}`;
        if (tmpl?.id) {
          formData.append(`inspectionTemplateId${i}`, tmpl.id);
        } else if (data[customField]) {
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

      for (let i = 1; i <= 5; i++) {
        const tmpl = data[`customerCommitmentTemplate${i}`];
        const customField = `customWhyBuyCustomerCommitment${i}`;
        if (tmpl?.id) {
          formData.append(`customerCommitmentTemplateId${i}`, tmpl.id);
        } else if (data[customField]) {
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
        if (tmpl?.id) {
          formData.append(`galleryTemplateId${i}`, tmpl.id);
        } else if (data[customField]) {
          const blob = await getBlobFromUrl(data[customField]);
          if (blob) formData.append(customField, blob, `gallery${i}.png`);
        }
      }
      // Assuming there is a setWhyBuyGallery service, if not, we use the general setState or similar
      // For now, mirroring WhyBuyPremium1 pattern if applicable.
      // await setWhyBuyGallery(formData);
      console.log("Gallery blur handled with custom image support.");
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
                      const updatedData = { ...data };
                      updatedData.whyBuyHeroTemplate1 = {
                        ...data.whyBuyHeroTemplate1,
                        imageUrl,
                        id: id ?? null,
                      };
                      if (!id) {
                        updatedData.customWhyBuyHero1 = imageUrl;
                      } else {
                        delete updatedData.customWhyBuyHero1;
                      }
                      onUpdate(updatedData);
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
                      const updatedData = { ...data };
                      updatedData.whyBuyHeroTemplate2 = {
                        ...data.whyBuyHeroTemplate2,
                        imageUrl,
                        id: id ?? null,
                      };
                      if (!id) {
                        updatedData.customWhyBuyHero2 = imageUrl;
                      } else {
                        delete updatedData.customWhyBuyHero2;
                      }
                      onUpdate(updatedData);
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
                      const updatedData = { ...data };
                      updatedData.whyBuyHeroTemplate3 = {
                        ...data.whyBuyHeroTemplate3,
                        imageUrl,
                        id: id ?? null,
                      };
                      if (!id) {
                        updatedData.customWhyBuyHero3 = imageUrl;
                      } else {
                        delete updatedData.customWhyBuyHero3;
                      }
                      onUpdate(updatedData);
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
                        const updatedData = { ...data };
                        updatedData[`storyTemplate${n}`] = {
                          ...data[`storyTemplate${n}`],
                          imageUrl,
                          id: id ?? null,
                        };
                        const customField = `customWhyBuyStory${n}`;
                        if (!id) {
                          updatedData[customField] = imageUrl;
                        } else {
                          delete updatedData[customField];
                        }
                        onUpdate(updatedData);
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
                        const updatedData = { ...data };
                        updatedData[`vehicleSelectionTemplate${n}`] = {
                          ...data[`vehicleSelectionTemplate${n}`],
                          imageUrl,
                          id: id ?? null,
                        };
                        const customField = `customWhyBuyVehicleSelection${n}`;
                        if (!id) {
                          updatedData[customField] = imageUrl;
                        } else {
                          delete updatedData[customField];
                        }
                        onUpdate(updatedData);
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
                      label={`Step ${n} Image`}
                      src={
                        data[`customWhyBuyProcess${n}`] ||
                        data[`processTemplate${n}`]?.imageUrl
                      }
                      fieldKey={`procImg${n}`}
                      imageType="HOW_BUYING_WORKS"
                      onChange={({ imageUrl, id }) => {
                        const updatedData = { ...data };
                        updatedData[`processTemplate${n}`] = {
                          ...data[`processTemplate${n}`],
                          imageUrl,
                          id: id ?? null,
                        };
                        const customField = `customWhyBuyProcess${n}`;
                        if (!id) {
                          updatedData[customField] = imageUrl;
                        } else {
                          delete updatedData[customField];
                        }
                        onUpdate(updatedData);
                        setTimeout(handleProcessBlur, 100);
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
                      const newArr = [...data.inspectionPoints];
                      newArr[i] = e.target.value;
                      updateField("inspectionPoints", newArr);
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
                        const updatedData = { ...data };
                        updatedData[`inspectionTemplate${n}`] = {
                          ...data[`inspectionTemplate${n}`],
                          imageUrl,
                          id: id ?? null,
                        };
                        const customField = `customWhyBuyInspection${n}`;
                        if (!id) {
                          updatedData[customField] = imageUrl;
                        } else {
                          delete updatedData[customField];
                        }
                        onUpdate(updatedData);
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
                {[1, 2, 3, 4, 5].map((n) => (
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
                        const updatedData = { ...data };
                        updatedData[`customerCommitmentTemplate${n}`] = {
                          ...data[`customerCommitmentTemplate${n}`],
                          imageUrl,
                          id: id ?? null,
                        };
                        const customField = `customWhyBuyCustomerCommitment${n}`;
                        if (!id) {
                          updatedData[customField] = imageUrl;
                        } else {
                          delete updatedData[customField];
                        }
                        onUpdate(updatedData);
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
                    const updatedData = { ...data };
                    updatedData[`galleryTemplate${n}`] = {
                      ...data[`galleryTemplate${n}`],
                      imageUrl,
                      id: id ?? null,
                    };
                    const customField = `customWhyBuyGallery${n}`;
                    if (!id) {
                      updatedData[customField] = imageUrl;
                    } else {
                      delete updatedData[customField];
                    }
                    onUpdate(updatedData);
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
            data.customWhyBuyHero1 || data.whyBuyHeroTemplate1?.imageUrl
          )?.includes(".mp4") ? (
            <video
              src={data.customWhyBuyHero1 || data.whyBuyHeroTemplate1?.imageUrl}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            />
          ) : (
            <img
              src={data.customWhyBuyHero1 || data.whyBuyHeroTemplate1?.imageUrl}
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
                  src={data.customWhyBuyStory1 || data.storyTemplate1?.imageUrl}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="absolute bottom-6 right-6 w-[140px] h-[100px] overflow-hidden border rounded-2xl border-white/20">
                <img
                  src={data.customWhyBuyStory2 || data.storyTemplate2?.imageUrl}
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
                    data.customWhyBuyVehicleSelection1 ||
                    data.vehicleSelectionTemplate1?.imageUrl
                  }
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="absolute top-0 right-0 w-[38%] h-[48%] overflow-hidden">
                <img
                  src={
                    data.customWhyBuyVehicleSelection2 ||
                    data.vehicleSelectionTemplate2?.imageUrl
                  }
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="absolute bottom-0 right-0 w-[38%] h-[48%] overflow-hidden">
                <img
                  src={
                    data.customWhyBuyStory3 ||
                    data.storyTemplate3?.imageUrl ||
                    data.customWhyBuyVehicleSelection1 ||
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
                        data[`customWhyBuyProcess${i + 1}`] ||
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
                  data[`customWhyBuyInspection${activeInspection + 1}`] ||
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
                      data[`customWhyBuyCustomerCommitment${i + 2}`] ||
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
                  data.customWhyBuyGallery1 || data.galleryTemplate1?.imageUrl
                }
                className="absolute inset-0 w-full h-full object-cover transition duration-500 hover:scale-105"
                loading="lazy"
              />
            </div>
            <div className="flex gap-3 lg:contents">
              <div className="relative overflow-hidden rounded-2xl h-[180px] flex-1 lg:h-auto lg:col-span-4 lg:row-span-1">
                <img
                  src={
                    data.customWhyBuyGallery2 || data.galleryTemplate2?.imageUrl
                  }
                  className="absolute inset-0 w-full h-full object-cover transition duration-500 hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="relative overflow-hidden rounded-2xl h-[180px] w-[30%] lg:h-auto lg:w-auto lg:col-span-2 lg:row-span-1">
                <img
                  src={
                    data.customWhyBuyGallery5 || data.galleryTemplate5?.imageUrl
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
                    data.customWhyBuyGallery3 || data.galleryTemplate3?.imageUrl
                  }
                  className="absolute inset-0 w-full h-full object-cover transition duration-500 hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="relative overflow-hidden h-40 rounded-2xl flex-1 lg:h-auto lg:col-span-3 lg:row-span-1">
                <img
                  src={
                    data.customWhyBuyGallery4 || data.galleryTemplate4?.imageUrl
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
