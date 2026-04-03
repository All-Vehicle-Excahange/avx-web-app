/* eslint-disable react-hooks/set-state-in-effect */
"use client";
import { Camera, Check, ChevronLeft, ChevronRight, Handshake, MessageCircle, Quote, Search, ShieldCheck, CheckCircle2, Star } from "lucide-react";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { WHY_BUY_PRO_3 } from "../schemas/whybuy/why_buy_pro_3";
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
    setFeaturedReviews
} from "@/services/theme.service";
import { getAllReview } from "@/services/user.service";

const DEFAULT_DATA = WHY_BUY_PRO_3[0].data;

const SVG_OPTIONS = [
    {
        value: `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"/></svg>`,
        label: "Search"
    },
    {
        value: `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="m336-280 144-144 144 144 56-56-144-144 144-144-56-56-144 144-144-144-56 56 144 144-144 144 56 56ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>`,
        label: "Cancel"
    },
    {
        value: `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M300-360q-25 0-42.5-17.5T240-420v-40h60v40h60v-180h60v180q0 25-17.5 42.5T360-360h-60Zm220 0q-17 0-28.5-11.5T480-400v-40h60v20h80v-40H520q-17 0-28.5-11.5T480-500v-60q0-17 11.5-28.5T520-600h120q17 0 28.5 11.5T680-560v40h-60v-20h-80v40h100q17 0 28.5 11.5T680-460v60q0 17-11.5 28.5T640-360H520Z"/></svg>`,
        label: "Layout"
    },
    {
        value: `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M320-240 80-480l240-240 57 57-184 184 183 183-56 56Zm320 0-57-57 184-184-183-183 56-56 240 240-240 240Z"/></svg>`,
        label: "Code"
    },
    {
        value: `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm-40-360v-240h80v207l154 154-57 57-177-178Z"/></svg>`,
        label: "Clock"
    },
    {
        value: `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M480-80q-139-35-229.5-159.5T160-516v-244l320-120 320 120v244q0 152-90.5 276.5T480-80Zm0-84q104-33 172-132t68-220v-189l-240-90-240 90v189q0 121 68 220t172 132Zm0-316Zm-76 112 198-198-57-56-141 142-70-71-57 56 127 127Z"/></svg>`,
        label: "Shield"
    }
];

const selectStyles = {
    control: (base) => ({
        ...base,
        backgroundColor: "transparent",
        borderColor: "rgba(255, 255, 255, 0.2)",
        color: "white",
        minHeight: "44px"
    }),
    indicatorSeparator: () => ({ display: "none" }),
    singleValue: (base) => ({ ...base, color: "white" }),
    option: (base, state) => ({
        ...base,
        backgroundColor: state.isFocused ? "rgba(255,255,255,0.1)" : "#1e1e1e",
        color: "white",
        cursor: "pointer"
    }),
    menu: (base) => ({
        ...base,
        backgroundColor: "#1e1e1e",
        border: "1px solid rgba(255, 255, 255, 0.2)"
    })
};

const formatOptionLabel = ({ value, label }) => (
    <div className="flex items-center gap-3">
        <div className="w-5 h-5 flex items-center justify-center [&>svg]:w-full [&>svg]:h-full" dangerouslySetInnerHTML={{ __html: value }} />
        <span className="text-sm">{label}</span>
    </div>
);

const INTERVAL = 5000;

export default function WhyBuyPro3({ data: rawData, isEditing, onUpdate }) {
    const data = {
        ...DEFAULT_DATA,
        ...Object.fromEntries(
            Object.entries(rawData || {}).filter(([, v]) => v !== undefined && v !== null)
        )
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
        rawData?.featuredReviews?.map((r) => r.id) || []
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
    const prev = () => transition((testimonialsactive - 1 + testimonialsTotal) % testimonialsTotal);
    const next = () => transition((testimonialsactive + 1) % testimonialsTotal);
    useEffect(() => () => clearTimeout(timeoutRef.current), []);
    const item = data.featuredReviews?.[testimonialsactive] || {};

    let consultId = null;
    const storedData = typeof window !== "undefined" ? localStorage.getItem("sellerTierData") : null;
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

    const handleHeroBlur = async () => {
        try {
            const formData = new FormData();
            formData.append("whyBuyHeroTitle", data.whyBuyHeroTitle || "");
            formData.append("whyBuyHeroDescription", data.whyBuyHeroDescription || "");
            if (data.whyBuyHeroTemplate1?.id) formData.append("whyBuyHeroTemplateId1", data.whyBuyHeroTemplate1.id);
            if (data.whyBuyHeroTemplate2?.id) formData.append("whyBuyHeroTemplateId2", data.whyBuyHeroTemplate2.id);
            if (data.whyBuyHeroTemplate3?.id) formData.append("whyBuyHeroTemplateId3", data.whyBuyHeroTemplate3.id);
            if (data.whyBuyHeroTemplate4?.id) formData.append("whyBuyHeroTemplateId4", data.whyBuyHeroTemplate4.id);
            if (data.whyBuyHeroTemplate5?.id) formData.append("whyBuyHeroTemplateId5", data.whyBuyHeroTemplate5.id);
            await setWhyBuyHero(formData);
        } catch (error) { console.error("Error updating hero", error); }
    };

    const handleStoryBlur = async () => {
        try {
            const formData = new FormData();
            formData.append("storyTitle", data.whyBuyStoryTitle || "");
            formData.append("storyDescription", data.whyBuyStoryDescription || "");
            if (data.whyBuyStoryTemplate1?.id) formData.append("storyTemplateId1", data.whyBuyStoryTemplate1.id);
            if (data.whyBuyStoryTemplate2?.id) formData.append("storyTemplateId2", data.whyBuyStoryTemplate2.id);
            if (data.whyBuyStoryTemplate3?.id) formData.append("storyTemplateId3", data.whyBuyStoryTemplate3.id);
            if (data.whyBuyStoryTemplate4?.id) formData.append("storyTemplateId4", data.whyBuyStoryTemplate4.id);
            if (data.whyBuyStoryTemplate5?.id) formData.append("storyTemplateId5", data.whyBuyStoryTemplate5.id);
            await setWhyBuyStory(formData);
        } catch (error) { console.error("Error updating story", error); }
    };

    const handleVehicleSelectionBlur = async () => {
        try {
            const formData = new FormData();
            formData.append("vehicleSelectionTitle", data.whyBuyVehicleSelectionTitle || "");
            formData.append("vehicleSelectionDescription", data.whyBuyVehicleSelectionDescription || "");
            if (data.whyBuyVehicleSelectionTemplate1?.id) formData.append("vehicleSelectionTemplateId1", data.whyBuyVehicleSelectionTemplate1.id);
            if (data.whyBuyVehicleSelectionTemplate2?.id) formData.append("vehicleSelectionTemplateId2", data.whyBuyVehicleSelectionTemplate2.id);
            if (data.whyBuyVehicleSelectionTemplate3?.id) formData.append("vehicleSelectionTemplateId3", data.whyBuyVehicleSelectionTemplate3.id);
            if (data.whyBuyVehicleSelectionTemplate4?.id) formData.append("vehicleSelectionTemplateId4", data.whyBuyVehicleSelectionTemplate4.id);
            if (data.whyBuyVehicleSelectionTemplate5?.id) formData.append("vehicleSelectionTemplateId5", data.whyBuyVehicleSelectionTemplate5.id);
            await setWhyBuyVehicleSelection(formData);
        } catch (error) { console.error("Error updating vehicle selection", error); }
    };

    const handleProcessBlur = async () => {
        try {
            const formData = new FormData();
            formData.append("processTitle", data.whyBuyProcessTitle || "");
            formData.append("processDescription", data.whyBuyProcessDescription || "");
            if (data.processSteps) {
                data.processSteps.forEach((step, i) => {
                    formData.append(`processes[${i}].title`, step.title || "");
                    formData.append(`processes[${i}].desc`, step.description || "");
                    formData.append(`processes[${i}].icon`, step.icon || "");
                });
            }
            if (data.whyBuyProcessTemplate1?.id) formData.append("processTemplateId1", data.whyBuyProcessTemplate1.id);
            if (data.whyBuyProcessTemplate2?.id) formData.append("processTemplateId2", data.whyBuyProcessTemplate2.id);
            if (data.whyBuyProcessTemplate3?.id) formData.append("processTemplateId3", data.whyBuyProcessTemplate3.id);
            if (data.whyBuyProcessTemplate4?.id) formData.append("processTemplateId4", data.whyBuyProcessTemplate4.id);
            await setWhyBuyProcess(formData);
        } catch (error) { console.error("Error updating process", error); }
    };

    const handleInspectionBlur = async () => {
        try {
            const formData = new FormData();
            formData.append("inspectionTitle", data.whyBuyInspectionTitle || "");
            formData.append("inspectionDescription", data.whyBuyInspectionDescription || "");
            if (data.whyBuyInspectionTemplate1?.id) formData.append("inspectionTemplateId1", data.whyBuyInspectionTemplate1.id);
            if (data.whyBuyInspectionTemplate2?.id) formData.append("inspectionTemplateId2", data.whyBuyInspectionTemplate2.id);
            if (data.whyBuyInspectionTemplate3?.id) formData.append("inspectionTemplateId3", data.whyBuyInspectionTemplate3.id);
            if (data.whyBuyInspectionTemplate4?.id) formData.append("inspectionTemplateId4", data.whyBuyInspectionTemplate4.id);
            if (data.inspectionPoints) {
                data.inspectionPoints.forEach((pt, i) => {
                    formData.append(`inspectionPoints[${i}]`, pt || "");
                });
            }
            await setWhyBuyInspection(formData);
        } catch (error) { console.error("Error updating inspection", error); }
    };

    const handleCustomerCommitmentBlur = async () => {
        try {
            const formData = new FormData();
            formData.append("customerCommitmentTitle", data.whyBuyCustomerCommitmentTitle || "");
            formData.append("customerCommitmentDescription", data.whyBuyCustomerCommitmentDescription || "");
            await setWhyBuyCustomerCommitment(formData);
        } catch (error) { console.error("Error updating customer commitment", error); }
    };

    const handleGalleryBlur = async () => {
        console.log("Gallery updated locally.");
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
                    reviewerName: `${r.reviewedBy?.firstname || ""} ${r.reviewedBy?.lastname || ""}`.trim(),
                    rating: r.rating,
                    reviewTitle: r.reviewTitle,
                    reviewText: r.reviewText,
                }));

            updateField("featuredReviews", selectedReviews);

            setFeaturedReviews(updated).catch((err) =>
                console.error("Error saving featured reviews", err)
            );

            return updated;
        });
    };

    const handleTestimonialBlur = async () => {
        try {
            updateField("whyBuyTestimonialTitle", data.whyBuyTestimonialTitle);
        } catch (error) { console.error("Error updating testimonials", error); }
    };


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
                            <p className="text-sm font-semibold text-primary">Hero Images</p>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="h-40 relative">
                                    <ImageUploader label="Image 1" src={data.whyBuyHeroTemplate1?.imageUrl} fieldKey="heroImg1" imageType="WHY_BUY_HERO" onChange={({ imageUrl, id }) => { updateField("whyBuyHeroTemplate1", { ...data.whyBuyHeroTemplate1, imageUrl, id: id ?? data.whyBuyHeroTemplate1?.id }); setTimeout(handleHeroBlur, 100); }} />
                                </div>
                                <div className="h-40 relative">
                                    <ImageUploader label="Image 2" src={data.whyBuyHeroTemplate2?.imageUrl} fieldKey="heroImg2" imageType="WHY_BUY_HERO" onChange={({ imageUrl, id }) => { updateField("whyBuyHeroTemplate2", { ...data.whyBuyHeroTemplate2, imageUrl, id: id ?? data.whyBuyHeroTemplate2?.id }); setTimeout(handleHeroBlur, 100); }} />
                                </div>
                                <div className="h-40 relative col-span-2">
                                    <ImageUploader label="Image 3" src={data.whyBuyHeroTemplate3?.imageUrl} fieldKey="heroImg3" imageType="WHY_BUY_HERO" onChange={({ imageUrl, id }) => { updateField("whyBuyHeroTemplate3", { ...data.whyBuyHeroTemplate3, imageUrl, id: id ?? data.whyBuyHeroTemplate3?.id }); setTimeout(handleHeroBlur, 100); }} />
                                </div>
                                <div className="h-40 relative">
                                    <ImageUploader label="Image 4" src={data.whyBuyHeroTemplate4?.imageUrl} fieldKey="heroImg4" imageType="WHY_BUY_HERO" onChange={({ imageUrl, id }) => { updateField("whyBuyHeroTemplate4", { ...data.whyBuyHeroTemplate4, imageUrl, id: id ?? data.whyBuyHeroTemplate4?.id }); setTimeout(handleHeroBlur, 100); }} />
                                </div>
                                <div className="h-40 relative">
                                    <ImageUploader label="Image 5" src={data.whyBuyHeroTemplate5?.imageUrl} fieldKey="heroImg5" imageType="WHY_BUY_HERO" onChange={({ imageUrl, id }) => { updateField("whyBuyHeroTemplate5", { ...data.whyBuyHeroTemplate5, imageUrl, id: id ?? data.whyBuyHeroTemplate5?.id }); setTimeout(handleHeroBlur, 100); }} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <hr className="border-third/20" />

                {/* EXPERIENCE (STORY) */}
                <div className="space-y-6">
                    <h3 className="text-primary font-bold text-xl mb-4">Experience (Story) Section</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <EditorInput
                                bold
                                label="Story Title"
                                value={data.whyBuyStoryTitle}
                                onChange={(e) => updateField("whyBuyStoryTitle", e.target.value)}
                                onBlur={handleStoryBlur}
                            />
                            <RichTextEditor
                                label="Story Description"
                                value={data.whyBuyStoryDescription}
                                onChange={(v) => updateField("whyBuyStoryDescription", v)}
                                onBlur={handleStoryBlur}
                            />
                        </div>
                        <div className="space-y-4">
                            <p className="text-sm font-semibold text-primary">Story Images</p>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="h-40 relative col-span-2">
                                    <ImageUploader label="Image 1" src={data.whyBuyStoryTemplate1?.imageUrl} fieldKey="storyImg1" imageType="CONSULTANT_STORY" onChange={({ imageUrl, id }) => { updateField("whyBuyStoryTemplate1", { ...data.whyBuyStoryTemplate1, imageUrl, id: id ?? data.whyBuyStoryTemplate1?.id }); setTimeout(handleStoryBlur, 100); }} />
                                </div>
                                <div className="h-40 relative">
                                    <ImageUploader label="Image 2" src={data.whyBuyStoryTemplate2?.imageUrl} fieldKey="storyImg2" imageType="CONSULTANT_STORY" onChange={({ imageUrl, id }) => { updateField("whyBuyStoryTemplate2", { ...data.whyBuyStoryTemplate2, imageUrl, id: id ?? data.whyBuyStoryTemplate2?.id }); setTimeout(handleStoryBlur, 100); }} />
                                </div>
                                <div className="h-40 relative">
                                    <ImageUploader label="Image 3" src={data.whyBuyStoryTemplate3?.imageUrl} fieldKey="storyImg3" imageType="CONSULTANT_STORY" onChange={({ imageUrl, id }) => { updateField("whyBuyStoryTemplate3", { ...data.whyBuyStoryTemplate3, imageUrl, id: id ?? data.whyBuyStoryTemplate3?.id }); setTimeout(handleStoryBlur, 100); }} />
                                </div>
                                <div className="h-40 relative">
                                    <ImageUploader label="Image 4" src={data.whyBuyStoryTemplate4?.imageUrl} fieldKey="storyImg4" imageType="CONSULTANT_STORY" onChange={({ imageUrl, id }) => { updateField("whyBuyStoryTemplate4", { ...data.whyBuyStoryTemplate4, imageUrl, id: id ?? data.whyBuyStoryTemplate4?.id }); setTimeout(handleStoryBlur, 100); }} />
                                </div>
                                <div className="h-40 relative">
                                    <ImageUploader label="Image 5" src={data.whyBuyStoryTemplate5?.imageUrl} fieldKey="storyImg5" imageType="CONSULTANT_STORY" onChange={({ imageUrl, id }) => { updateField("whyBuyStoryTemplate5", { ...data.whyBuyStoryTemplate5, imageUrl, id: id ?? data.whyBuyStoryTemplate5?.id }); setTimeout(handleStoryBlur, 100); }} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <hr className="border-third/20" />

                {/* VEHICLE SELECTION */}
                <div className="space-y-6">
                    <h3 className="text-primary font-bold text-xl mb-4">Vehicle Selection Section</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <EditorInput
                                bold
                                label="Selection Title"
                                value={data.whyBuyVehicleSelectionTitle}
                                onChange={(e) => updateField("whyBuyVehicleSelectionTitle", e.target.value)}
                                onBlur={handleVehicleSelectionBlur}
                            />
                            <RichTextEditor
                                label="Selection Description"
                                value={data.whyBuyVehicleSelectionDescription}
                                onChange={(v) => updateField("whyBuyVehicleSelectionDescription", v)}
                                onBlur={handleVehicleSelectionBlur}
                            />
                        </div>
                        <div className="space-y-4">
                            <p className="text-sm font-semibold text-primary">Selection Images</p>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="h-40 relative">
                                    <ImageUploader label="Image 1" src={data.whyBuyVehicleSelectionTemplate1?.imageUrl} fieldKey="selImg1" imageType="VEHICLE_SELECTION" onChange={({ imageUrl, id }) => { updateField("whyBuyVehicleSelectionTemplate1", { ...data.whyBuyVehicleSelectionTemplate1, imageUrl, id: id ?? data.whyBuyVehicleSelectionTemplate1?.id }); setTimeout(handleVehicleSelectionBlur, 100); }} />
                                </div>
                                <div className="h-40 relative">
                                    <ImageUploader label="Image 2" src={data.whyBuyVehicleSelectionTemplate2?.imageUrl} fieldKey="selImg2" imageType="VEHICLE_SELECTION" onChange={({ imageUrl, id }) => { updateField("whyBuyVehicleSelectionTemplate2", { ...data.whyBuyVehicleSelectionTemplate2, imageUrl, id: id ?? data.whyBuyVehicleSelectionTemplate2?.id }); setTimeout(handleVehicleSelectionBlur, 100); }} />
                                </div>
                                <div className="h-40 relative col-span-2">
                                    <ImageUploader label="Image 3" src={data.whyBuyVehicleSelectionTemplate3?.imageUrl} fieldKey="selImg3" imageType="VEHICLE_SELECTION" onChange={({ imageUrl, id }) => { updateField("whyBuyVehicleSelectionTemplate3", { ...data.whyBuyVehicleSelectionTemplate3, imageUrl, id: id ?? data.whyBuyVehicleSelectionTemplate3?.id }); setTimeout(handleVehicleSelectionBlur, 100); }} />
                                </div>
                                <div className="h-40 relative">
                                    <ImageUploader label="Image 4" src={data.whyBuyVehicleSelectionTemplate4?.imageUrl} fieldKey="selImg4" imageType="VEHICLE_SELECTION" onChange={({ imageUrl, id }) => { updateField("whyBuyVehicleSelectionTemplate4", { ...data.whyBuyVehicleSelectionTemplate4, imageUrl, id: id ?? data.whyBuyVehicleSelectionTemplate4?.id }); setTimeout(handleVehicleSelectionBlur, 100); }} />
                                </div>
                                <div className="h-40 relative">
                                    <ImageUploader label="Image 5" src={data.whyBuyVehicleSelectionTemplate5?.imageUrl} fieldKey="selImg5" imageType="VEHICLE_SELECTION" onChange={({ imageUrl, id }) => { updateField("whyBuyVehicleSelectionTemplate5", { ...data.whyBuyVehicleSelectionTemplate5, imageUrl, id: id ?? data.whyBuyVehicleSelectionTemplate5?.id }); setTimeout(handleVehicleSelectionBlur, 100); }} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <hr className="border-third/20" />

                {/* PROCESS */}
                <div className="space-y-6">
                    <h3 className="text-primary font-bold text-xl mb-4">Process Section</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <EditorInput
                                bold
                                label="Process Title"
                                value={data.whyBuyProcessTitle}
                                onChange={(e) => updateField("whyBuyProcessTitle", e.target.value)}
                                onBlur={handleProcessBlur}
                            />
                            <RichTextEditor
                                label="Process Description"
                                value={data.whyBuyProcessDescription}
                                onChange={(v) => updateField("whyBuyProcessDescription", v)}
                                onBlur={handleProcessBlur}
                            />
                        </div>
                        <div className="space-y-4">
                            <p className="text-sm font-semibold text-primary">Process Images</p>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="h-40 relative">
                                    <ImageUploader label="Image 1" src={data.whyBuyProcessTemplate1?.imageUrl} fieldKey="procImg1" imageType="PROCESS" onChange={({ imageUrl, id }) => { updateField("whyBuyProcessTemplate1", { ...data.whyBuyProcessTemplate1, imageUrl, id: id ?? data.whyBuyProcessTemplate1?.id }); setTimeout(handleProcessBlur, 100); }} />
                                </div>
                                <div className="h-40 relative">
                                    <ImageUploader label="Image 2" src={data.whyBuyProcessTemplate2?.imageUrl} fieldKey="procImg2" imageType="PROCESS" onChange={({ imageUrl, id }) => { updateField("whyBuyProcessTemplate2", { ...data.whyBuyProcessTemplate2, imageUrl, id: id ?? data.whyBuyProcessTemplate2?.id }); setTimeout(handleProcessBlur, 100); }} />
                                </div>
                                <div className="h-40 relative">
                                    <ImageUploader label="Image 3" src={data.whyBuyProcessTemplate3?.imageUrl} fieldKey="procImg3" imageType="PROCESS" onChange={({ imageUrl, id }) => { updateField("whyBuyProcessTemplate3", { ...data.whyBuyProcessTemplate3, imageUrl, id: id ?? data.whyBuyProcessTemplate3?.id }); setTimeout(handleProcessBlur, 100); }} />
                                </div>
                                <div className="h-40 relative">
                                    <ImageUploader label="Image 4" src={data.whyBuyProcessTemplate4?.imageUrl} fieldKey="procImg4" imageType="PROCESS" onChange={({ imageUrl, id }) => { updateField("whyBuyProcessTemplate4", { ...data.whyBuyProcessTemplate4, imageUrl, id: id ?? data.whyBuyProcessTemplate4?.id }); setTimeout(handleProcessBlur, 100); }} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4 mt-6">
                        {data.processSteps?.map((step, i) => (
                            <div key={i} className="border border-primary/30 p-4 rounded bg-primary/5 space-y-4">
                                <div>
                                    <label className="text-sm font-medium text-primary mb-1 block">Title</label>
                                    <EditorInput
                                        value={step.title}
                                        onChange={(e) => updateArrayItem("processSteps", i, "title", e.target.value)}
                                        onBlur={handleProcessBlur}
                                    />
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-primary mb-1 block">Description</label>
                                    <EditorInput
                                        value={step.description}
                                        onChange={(e) => updateArrayItem("processSteps", i, "description", e.target.value)}
                                        onBlur={handleProcessBlur}
                                    />
                                </div>
                                <div className="flex flex-col gap-2 relative mt-4">
                                    <label className="text-sm font-medium text-primary">Icon (Select SVG)</label>
                                    <Select
                                        options={SVG_OPTIONS}
                                        formatOptionLabel={formatOptionLabel}
                                        styles={selectStyles}
                                        value={SVG_OPTIONS.find(opt => opt.value === step.icon) || null}
                                        onChange={(selectedOption) => {
                                            updateArrayItem("processSteps", i, "icon", selectedOption.value);
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
                    <h3 className="text-primary font-bold text-xl mb-4">Inspection Section</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <EditorInput
                                bold
                                label="Inspection Title"
                                value={data.whyBuyInspectionTitle}
                                onChange={(e) => updateField("whyBuyInspectionTitle", e.target.value)}
                                onBlur={handleInspectionBlur}
                            />
                            <RichTextEditor
                                label="Inspection Description"
                                value={data.whyBuyInspectionDescription}
                                onChange={(v) => updateField("whyBuyInspectionDescription", v)}
                                onBlur={handleInspectionBlur}
                            />
                            <div className="space-y-2 mt-4">
                                <label className="text-sm font-medium text-primary">Inspection Points</label>
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
                            <p className="text-sm font-semibold text-primary">Inspection Images</p>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="h-40 relative">
                                    <ImageUploader label="Image 1" src={data.whyBuyInspectionTemplate1?.imageUrl} fieldKey="inspImg1" imageType="INSPECTION_PROCESS" onChange={({ imageUrl, id }) => { updateField("whyBuyInspectionTemplate1", { ...data.whyBuyInspectionTemplate1, imageUrl, id: id ?? data.whyBuyInspectionTemplate1?.id }); setTimeout(handleInspectionBlur, 100); }} />
                                </div>
                                <div className="h-40 relative">
                                    <ImageUploader label="Image 2" src={data.whyBuyInspectionTemplate2?.imageUrl} fieldKey="inspImg2" imageType="INSPECTION_PROCESS" onChange={({ imageUrl, id }) => { updateField("whyBuyInspectionTemplate2", { ...data.whyBuyInspectionTemplate2, imageUrl, id: id ?? data.whyBuyInspectionTemplate2?.id }); setTimeout(handleInspectionBlur, 100); }} />
                                </div>
                                <div className="h-40 relative">
                                    <ImageUploader label="Image 3" src={data.whyBuyInspectionTemplate3?.imageUrl} fieldKey="inspImg3" imageType="INSPECTION_PROCESS" onChange={({ imageUrl, id }) => { updateField("whyBuyInspectionTemplate3", { ...data.whyBuyInspectionTemplate3, imageUrl, id: id ?? data.whyBuyInspectionTemplate3?.id }); setTimeout(handleInspectionBlur, 100); }} />
                                </div>
                                <div className="h-40 relative">
                                    <ImageUploader label="Image 4" src={data.whyBuyInspectionTemplate4?.imageUrl} fieldKey="inspImg4" imageType="INSPECTION_PROCESS" onChange={({ imageUrl, id }) => { updateField("whyBuyInspectionTemplate4", { ...data.whyBuyInspectionTemplate4, imageUrl, id: id ?? data.whyBuyInspectionTemplate4?.id }); setTimeout(handleInspectionBlur, 100); }} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <hr className="border-third/20" />

                {/* CUSTOMER COMMITMENT */}
                <div className="space-y-6">
                    <h3 className="text-primary font-bold text-xl mb-4">Customer Commitment Section</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <EditorInput
                                bold
                                label="Commitment Title"
                                value={data.whyBuyCustomerCommitmentTitle}
                                onChange={(e) => updateField("whyBuyCustomerCommitmentTitle", e.target.value)}
                                onBlur={handleCustomerCommitmentBlur}
                            />
                            <RichTextEditor
                                label="Commitment Text"
                                value={data.whyBuyCustomerCommitmentDescription}
                                onChange={(v) => updateField("whyBuyCustomerCommitmentDescription", v)}
                                onBlur={handleCustomerCommitmentBlur}
                            />
                        </div>
                    </div>
                </div>

                <hr className="border-third/20" />

                {/* GALLERY */}
                <div className="space-y-6">
                    <h3 className="text-primary font-bold text-xl mb-4">Gallery Section</h3>
                    <EditorInput
                        bold
                        label="Gallery Title"
                        value={data.whyBuyGalleryTitle}
                        onChange={(e) => updateField("whyBuyGalleryTitle", e.target.value)}
                        onBlur={handleGalleryBlur}
                    />
                    <br />
                    <div className="grid grid-cols-2 gap-4">
                        <div className="h-40 relative">
                            <ImageUploader label="Gallery Image 1" src={data.whyBuyGalleryTemplate1?.imageUrl} fieldKey="galImg1" imageType="GALLERY" onChange={({ imageUrl, id }) => { updateField("whyBuyGalleryTemplate1", { ...data.whyBuyGalleryTemplate1, imageUrl, id: id ?? data.whyBuyGalleryTemplate1?.id }); setTimeout(handleGalleryBlur, 100); }} />
                        </div>
                        <div className="h-40 relative">
                            <ImageUploader label="Gallery Image 2" src={data.whyBuyGalleryTemplate2?.imageUrl} fieldKey="galImg2" imageType="GALLERY" onChange={({ imageUrl, id }) => { updateField("whyBuyGalleryTemplate2", { ...data.whyBuyGalleryTemplate2, imageUrl, id: id ?? data.whyBuyGalleryTemplate2?.id }); setTimeout(handleGalleryBlur, 100); }} />
                        </div>
                        <div className="h-40 relative">
                            <ImageUploader label="Gallery Image 3" src={data.whyBuyGalleryTemplate3?.imageUrl} fieldKey="galImg3" imageType="GALLERY" onChange={({ imageUrl, id }) => { updateField("whyBuyGalleryTemplate3", { ...data.whyBuyGalleryTemplate3, imageUrl, id: id ?? data.whyBuyGalleryTemplate3?.id }); setTimeout(handleGalleryBlur, 100); }} />
                        </div>
                        <div className="h-40 relative">
                            <ImageUploader label="Gallery Image 4" src={data.whyBuyGalleryTemplate4?.imageUrl} fieldKey="galImg4" imageType="GALLERY" onChange={({ imageUrl, id }) => { updateField("whyBuyGalleryTemplate4", { ...data.whyBuyGalleryTemplate4, imageUrl, id: id ?? data.whyBuyGalleryTemplate4?.id }); setTimeout(handleGalleryBlur, 100); }} />
                        </div>
                    </div>
                </div>

                <hr className="border-third/20" />

                {/* TESTIMONIALS */}
                <div>
                    <h3 className="text-primary font-bold text-xl mb-4">Featured Reviews Title</h3>
                    <EditorInput
                        bold
                        label="Section Title"
                        value={data.whyBuyTestimonialTitle}
                        onChange={(e) => updateField("whyBuyTestimonialTitle", e.target.value)}
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
                            const reviewerName = `${review.reviewedBy?.firstname || ""} ${review.reviewedBy?.lastname || ""}`.trim();

                            return (
                                <div
                                    key={review.id}
                                    onClick={() => toggleReviewSelection(review.id)}
                                    className={`relative p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${isSelected
                                        ? "border-fourth bg-fourth/10 shadow-md"
                                        : "border-third/20 bg-primary/5 hover:border-third/40"
                                        }`}
                                >
                                    <div className={`absolute top-3 right-3 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${isSelected ? "border-fourth bg-fourth" : "border-third/40"}`}>
                                        {isSelected && <CheckCircle2 size={14} className="text-secondary" />}
                                    </div>
                                    <div className="flex gap-0.5 mb-2">
                                        {[...Array(5)].map((_, idx) => (
                                            <Star key={idx} size={13} className={idx < review.rating ? "text-fourth fill-fourth" : "text-third/30"} />
                                        ))}
                                    </div>
                                    {review.reviewTitle && <h4 className="text-primary font-semibold text-sm mb-1">{review.reviewTitle}</h4>}
                                    <p className="text-third text-sm leading-relaxed line-clamp-3">{review.reviewText}</p>
                                    <p className="text-primary/70 text-xs font-medium mt-3">— {reviewerName}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        );
    }

    const rotations = [-6, 8, 4, -5, 10];
    const desktopPositions = [
        { top: "20px", left: "20px" },
        { top: "30px", right: "40px" },
        { top: "200px", left: "0px" },
        { bottom: "10px", left: "160px" },
        { bottom: "120px", right: "30px" },
    ];

    return (
        <>
            {/* ═══════════════════════════════════════
          SECTION 1 — HERO
      ═══════════════════════════════════════ */}
            <section className="py-12 px-2 lg:px-4 relative flex items-center justify-center overflow-hidden min-h-screen">
                <div className="container">
                    <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
                        {/* LEFT CONTENT */}
                        <div>
                            <motion.h1
                                className="text-[clamp(28px,5vw,54px)] font-bold leading-[1.15] text-primary mb-5"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.7 }}
                                viewport={{ once: true }}
                            >
                                {data.whyBuyHeroTitle}
                            </motion.h1>
                            <div
                                className="text-third/70 text-[15px] leading-[1.9]"
                                dangerouslySetInnerHTML={{ __html: data.whyBuyHeroDescription }}
                            />
                        </div>

                        {/* RIGHT — polaroid scatter */}
                        <div className="w-full">
                            {/* MOBILE: 2-col polaroid grid */}
                            <div className="grid grid-cols-2 gap-3 lg:hidden pt-2 pb-4">
                                {heroImages.map((src, i) => (
                                    <motion.div
                                        key={i}
                                        className={i === 2 ? "col-span-2" : "col-span-1"}
                                        initial={{ opacity: 0, y: 20, scale: 0.92 }}
                                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                                        transition={{ duration: 0.45, delay: i * 0.08 }}
                                        viewport={{ once: true }}
                                    >
                                        <div
                                            className="bg-white rounded-xs"
                                            style={{
                                                padding: "6px 6px 22px",
                                                boxShadow: "0 4px 18px rgba(0,0,0,0.12), 0 1px 3px rgba(0,0,0,0.07)",
                                                transform: `rotate(${rotations[i] * 0.4}deg)`,
                                            }}
                                        >
                                            <img
                                                src={src}
                                                alt="car"
                                                loading="lazy"
                                                className="w-full object-cover rounded-[1px] block"
                                                style={{ height: i === 2 ? "140px" : "110px" }}
                                            />
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            {/* DESKTOP: absolute scatter board */}
                            <div className="relative h-[480px] hidden lg:block">
                                {heroImages.map((src, i) => (
                                    <motion.div
                                        key={i}
                                        className="absolute cursor-pointer"
                                        style={{ ...desktopPositions[i], zIndex: 5 + i }}
                                        initial={{ opacity: 0, y: 30, scale: 0.9, rotate: rotations[i] - 3 }}
                                        whileInView={{ opacity: 1, y: 0, scale: 1, rotate: rotations[i] }}
                                        whileHover={{
                                            scale: 1.06, rotate: rotations[i] * 0.25, zIndex: 20, y: -6,
                                            transition: { duration: 0.25, ease: "easeOut" },
                                        }}
                                        transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 0.68, 0, 1.2] }}
                                        viewport={{ once: true }}
                                    >
                                        <div
                                            className="bg-white rounded-xs w-[180px]"
                                            style={{ padding: "7px 7px 26px", boxShadow: "0 6px 28px rgba(0,0,0,0.14), 0 1px 4px rgba(0,0,0,0.07)" }}
                                        >
                                            <img
                                                src={src}
                                                alt="car"
                                                loading="lazy"
                                                className="w-full h-[120px] object-cover rounded-[1px] block"
                                            />
                                        </div>
                                    </motion.div>
                                ))}
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
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.7 }}
                            viewport={{ once: true }}
                        >
                            <p className="text-sm tracking-[0.4em] uppercase text-primary/60 font-semibold mb-2">Our Experience</p>
                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.05] text-primary mb-5">
                                {data.whyBuyStoryTitle}
                            </h2>
                            <div
                                className="text-primary/90 text-[15px] leading-[1.9] whitespace-pre-line"
                                dangerouslySetInnerHTML={{ __html: data.whyBuyStoryDescription }}
                            />
                        </motion.div>

                        {/* RIGHT — stacked images */}
                        <motion.div
                            className="flex flex-col gap-4"
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.7 }}
                            viewport={{ once: true }}
                        >
                            {storyImages.slice(0, 2).map((img, i) => (
                                <div key={i} className="w-full h-40 rounded-xl overflow-hidden">
                                    <img src={img} loading="lazy" className="w-full h-full object-cover" />
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════
          SECTION 3 — VEHICLE SELECTION
      ═══════════════════════════════════════ */}
            <section className="py-12 px-2 lg:px-4">
                <div className="container">
                    <div className="pt-10 grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
                        {/* LEFT — TEXT */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.7 }}
                            viewport={{ once: true }}
                        >
                            <p className="text-sm tracking-[0.4em] uppercase text-third font-semibold mb-2">Selection</p>
                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.05] text-primary mb-5">
                                {data.whyBuyVehicleSelectionTitle}
                            </h2>
                            <div className="w-8 h-px bg-primary/15 my-3" />
                            <div
                                className="text-third/70 text-[15px] leading-[1.9]"
                                dangerouslySetInnerHTML={{ __html: data.whyBuyVehicleSelectionDescription }}
                            />
                        </motion.div>

                        {/* RIGHT — image grid */}
                        <motion.div
                            className="p-3 rounded-2xl w-full h-full"
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.7 }}
                            viewport={{ once: true }}
                        >
                            <div className="grid grid-cols-3 gap-3 w-full h-full">
                                <div className="col-span-2 aspect-4/3 rounded-xl overflow-hidden">
                                    <img src={vehicleSelectionImages[0]} loading="lazy" className="w-full h-full object-cover" />
                                </div>
                                <div className="flex flex-col gap-3">
                                    {vehicleSelectionImages.slice(1, 3).map((img, i) => (
                                        <div key={i} className="aspect-4/3 rounded-xl overflow-hidden">
                                            <img src={img} loading="lazy" className="w-full h-full object-cover" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════
          SECTION 4 — PROCESS
      ═══════════════════════════════════════ */}
            <section className="py-12 px-2 lg:px-4">
                <div className="container">
                    <div className="flex flex-col gap-3 mb-10">
                        <p className="text-sm tracking-[0.4em] uppercase text-third font-semibold">Process</p>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-primary">
                            {data.whyBuyProcessTitle}
                        </h2>
                        <div
                            className="text-third/60 text-[15px] max-w-md"
                            dangerouslySetInnerHTML={{ __html: data.whyBuyProcessDescription }}
                        />
                    </div>

                    <div className="relative">
                        <div className="hidden lg:block absolute top-8 left-0 right-0 h-px bg-third/10" />
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
                            {(data.processSteps || []).map((step, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.15 }}
                                    viewport={{ once: true }}
                                    className="relative flex flex-col gap-4"
                                >
                                    <div className="w-full h-[140px] rounded-xl overflow-hidden">
                                        <img
                                            src={processImages[i % Math.max(processImages.length, 1)]}
                                            alt={step.title}
                                            className="w-full h-full object-cover"
                                            loading="lazy"
                                        />
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="w-10 h-10 rounded-full border border-third/20 flex items-center justify-center overflow-hidden">
                                            {typeof step.icon === "string" && step.icon.startsWith("<svg") ? (
                                                <div
                                                    className="text-primary [&>svg]:w-5 [&>svg]:h-5"
                                                    dangerouslySetInnerHTML={{ __html: step.icon }}
                                                />
                                            ) : (
                                                <div className="w-5 h-5 bg-third/20 rounded flex items-center justify-center text-[10px] text-third">Icon</div>
                                            )}
                                        </div>
                                        <span className="text-[11px] tracking-[0.2em] text-third/40 font-semibold">
                                            {String(i + 1).padStart(2, "0")}
                                        </span>
                                    </div>
                                    <div>
                                        <p className="font-semibold text-[14px] text-primary mb-1">{step.title}</p>
                                        <div
                                            className="text-[13px] text-third/65 leading-[1.7]"
                                            dangerouslySetInnerHTML={{ __html: step.description }}
                                        />
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════
          SECTION 5 — INSPECTION
      ═══════════════════════════════════════ */}
            <section className="py-12 px-2 lg:px-4">
                <div className="container">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-end mb-10">
                        <div>
                            <p className="text-sm tracking-[0.4em] uppercase text-third font-semibold mb-2">Inspection</p>
                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-primary">
                                {data.whyBuyInspectionTitle}
                            </h2>
                        </div>
                        <div>
                            <div className="w-8 h-px bg-primary/15 my-2" />
                            <div
                                className="text-third/70 text-[15px] leading-[1.9]"
                                dangerouslySetInnerHTML={{ __html: data.whyBuyInspectionDescription }}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* LEFT — clickable list */}
                        <div className="border border-third/10 rounded-2xl overflow-hidden">
                            {(data.inspectionPoints || []).map((pt, i) => (
                                <div
                                    key={i}
                                    onClick={() => setAvxInspectionHovered(i)}
                                    className={`flex justify-between items-center px-6 py-5 cursor-pointer transition ${
                                        i === avxInspectionHovered
                                            ? "bg-primary/5 border-l-4 border-primary"
                                            : "hover:bg-primary/3"
                                    }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <span className="text-[10px] font-bold text-primary tracking-[0.2em]">
                                            {String(i + 1).padStart(2, "0")}
                                        </span>
                                        <div className="text-sm text-third/80" dangerouslySetInnerHTML={{ __html: pt }} />
                                    </div>
                                    <span className="text-[10px] uppercase font-bold text-primary">View</span>
                                </div>
                            ))}
                        </div>

                        {/* RIGHT — active image */}
                        <motion.div
                            key={avxInspectionHovered}
                            className="w-full h-[260px] rounded-xl overflow-hidden"
                            initial={{ opacity: 0, scale: 0.96 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.4 }}
                        >
                            <img
                                src={inspectionImages[avxInspectionHovered % Math.max(inspectionImages.length, 1)]}
                                loading="lazy"
                                className="w-full h-full object-cover"
                            />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════
          SECTION 6 — COMMITMENT
      ═══════════════════════════════════════ */}
            <section className="py-12 px-2 lg:px-4 bg-fourth">
                <div className="container">
                    <div className="max-w-5xl mx-auto text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7 }}
                            viewport={{ once: true }}
                        >
                            <p className="text-sm tracking-[0.4em] uppercase text-primary/60 font-semibold mb-3">Commitment</p>
                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-primary mb-5">
                                {data.whyBuyCustomerCommitmentTitle}
                            </h2>
                            <div className="w-10 h-px bg-primary/20 mx-auto my-4" />
                            <div
                                className="text-primary/90 text-[15px] leading-[1.9] max-w-5xl"
                                dangerouslySetInnerHTML={{ __html: data.whyBuyCustomerCommitmentDescription }}
                            />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════
          SECTION 7 — GALLERY
      ═══════════════════════════════════════ */}
            <section className="py-12 px-2 lg:px-4">
                <div className="container">
                    <div className="flex flex-col gap-3 mb-10">
                        <p className="text-sm tracking-[0.4em] uppercase text-third font-semibold">Gallery</p>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-primary">
                            {data.whyBuyGalleryTitle}
                        </h2>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 auto-rows-[120px]">
                        <motion.div
                            className="col-span-2 row-span-2 rounded-xl overflow-hidden"
                            initial={{ opacity: 0, scale: 0.96 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                        >
                            <img src={galleryImages[0]} loading="lazy" className="w-full h-full object-cover hover:scale-105 transition duration-500" />
                        </motion.div>
                        <motion.div
                            className="col-span-1 row-span-1 rounded-xl overflow-hidden"
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            viewport={{ once: true }}
                        >
                            <img src={galleryImages[1]} loading="lazy" className="w-full h-full object-cover hover:scale-105 transition duration-500" />
                        </motion.div>
                        <motion.div
                            className="col-span-1 row-span-2 rounded-xl overflow-hidden"
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            viewport={{ once: true }}
                        >
                            <img src={galleryImages[2]} loading="lazy" className="w-full h-full object-cover hover:scale-105 transition duration-500" />
                        </motion.div>
                        <motion.div
                            className="col-span-1 row-span-1 rounded-xl overflow-hidden"
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            viewport={{ once: true }}
                        >
                            <img src={galleryImages[3]} loading="lazy" className="w-full h-full object-cover hover:scale-105 transition duration-500" />
                        </motion.div>
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
                            <motion.p
                                className="text-sm tracking-[0.4em] uppercase text-third font-semibold mb-2"
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                            >
                                Reviews
                            </motion.p>
                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-primary">
                                {data.whyBuyTestimonialTitle}
                            </h2>
                        </div>
                        {(data.featuredReviews?.length || 0) > 1 && (
                            <div className="flex gap-2">
                                <button onClick={prev} className="w-9 h-9 rounded-full border border-third/20 flex items-center justify-center hover:border-primary transition">
                                    <ChevronLeft size={16} className="text-primary" />
                                </button>
                                <button onClick={next} className="w-9 h-9 rounded-full border border-third/20 flex items-center justify-center hover:border-primary transition">
                                    <ChevronRight size={16} className="text-primary" />
                                </button>
                            </div>
                        )}
                    </div>

                    {data.featuredReviews && data.featuredReviews.length > 0 ? (
                        <div
                            style={{ opacity: visible ? 1 : 0, transition: "opacity 0.35s ease" }}
                            className="grid grid-cols-1 md:grid-cols-2 gap-6"
                        >
                            {[item].map((t, i) => (
                                <div
                                    key={i}
                                    className="group relative rounded-2xl p-7 bg-white/5 backdrop-blur-md border border-white/10 hover:border-primary/30 transition-all duration-300 overflow-hidden"
                                >
                                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-linear-to-br from-primary/10 via-transparent to-transparent" />
                                    <div className="text-primary mb-4 relative z-10">
                                        <Quote size={22} />
                                    </div>
                                    <p className="font-[Poppins] text-[14px] leading-[1.9] text-third/80 italic relative z-10 mb-6">
                                        {t.reviewText}
                                    </p>
                                    <div className="w-full h-px bg-primary/10 mb-5 relative z-10" />
                                    <div className="flex items-center gap-3 relative z-10">
                                        <div className="w-10 h-10 rounded-full bg-linear-to-br from-primary/20 to-primary/5 flex items-center justify-center font-bold text-[14px] text-primary">
                                            {t.reviewerName?.[0] || "?"}
                                        </div>
                                        <div>
                                            <p className="font-[Montserrat] font-semibold text-[13px] text-primary">{t.reviewerName}</p>
                                            <p className="text-[11px] text-third/50">Verified Buyer</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {(data.testimonials || []).slice(0, 2).map((t, i) => (
                                <div
                                    key={i}
                                    className="group relative rounded-2xl p-7 bg-white/5 backdrop-blur-md border border-white/10 hover:border-primary/30 transition-all duration-300 overflow-hidden"
                                >
                                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-linear-to-br from-primary/10 via-transparent to-transparent" />
                                    <div className="text-primary mb-4 relative z-10">
                                        <Quote size={22} />
                                    </div>
                                    <p className="font-[Poppins] text-[14px] leading-[1.9] text-third/80 italic relative z-10 mb-6">
                                        {t.review}
                                    </p>
                                    <div className="w-full h-px bg-primary/10 mb-5 relative z-10" />
                                    <div className="flex items-center gap-3 relative z-10">
                                        <div className="w-10 h-10 rounded-full bg-linear-to-br from-primary/20 to-primary/5 flex items-center justify-center font-bold text-[14px] text-primary">
                                            {t.name?.[0] || "?"}
                                        </div>
                                        <div>
                                            <p className="font-[Montserrat] font-semibold text-[13px] text-primary">{t.name}</p>
                                            <p className="text-[11px] text-third/50">Verified Buyer</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </>
    );
}
