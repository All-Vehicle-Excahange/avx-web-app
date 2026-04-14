/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useRef, useState } from "react";
import {
    CheckCircle2,
    Star
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
    setFeaturedReviews
} from "@/services/theme.service";
import { getAllReview } from "@/services/user.service";
import { WHY_BUY_PRO_1 } from "../schemas/whybuy/why_buy_pro_1";

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

const DEFAULT_DATA = WHY_BUY_PRO_1[0].data;

export default function WhyBuyPro1({ data: rawData, isEditing, onUpdate }) {
    const scrollRef = useRef(null);

    const data = {
        ...DEFAULT_DATA,
        ...Object.fromEntries(
            Object.entries(rawData || {}).filter(([, v]) => v !== undefined && v !== null)
        )
    };

    const [allReviews, setAllReviews] = useState([]);
    const [selectedReviewIds, setSelectedReviewIds] = useState(
        (data.featuredReviews || []).map(r => r.id)
    );
    const [isSaving, setIsSaving] = useState(false);

    const updateField = (field, value) => {
        if (onUpdate) onUpdate({ ...data, [field]: value });
    };

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

    const updateArrayItem = (arrayName, index, field, value) => {
        const newArray = [...data[arrayName]];
        if (newArray[index]) {
            newArray[index][field] = value;
            updateField(arrayName, newArray);
        }
    };

    const handleSave = async () => {
        setIsSaving(true);
        try {
            const heroData = new FormData();
            heroData.append("whyBuyHeroTitle", data.whyBuyHeroTitle || "");
            heroData.append("whyBuyHeroDescription", data.whyBuyHeroDescription || "");
            if (data.whyBuyHeroTemplate1?.id) heroData.append("whyBuyHeroTemplateId1", data.whyBuyHeroTemplate1.id);
            if (data.whyBuyHeroTemplate2?.id) heroData.append("whyBuyHeroTemplateId2", data.whyBuyHeroTemplate2.id);
            if (data.whyBuyHeroTemplate3?.id) heroData.append("whyBuyHeroTemplateId3", data.whyBuyHeroTemplate3.id);

            const storyData = new FormData();
            storyData.append("storyTitle", data.storyTitle || "");
            storyData.append("storyDescription", data.storyDescription || "");
            if (data.storyTemplate1?.id) storyData.append("storyTemplateId1", data.storyTemplate1.id);
            if (data.storyTemplate2?.id) storyData.append("storyTemplateId2", data.storyTemplate2.id);
            if (data.storyTemplate3?.id) storyData.append("storyTemplateId3", data.storyTemplate3.id);

            const vehicleData = new FormData();
            vehicleData.append("vehicleSelectionTitle", data.vehicleSelectionTitle || "");
            vehicleData.append("vehicleSelectionDescription", data.vehicleSelectionDescription || "");
            if (data.vehicleSelectionTemplate1?.id) vehicleData.append("vehicleSelectionTemplateId1", data.vehicleSelectionTemplate1.id);
            if (data.vehicleSelectionTemplate2?.id) vehicleData.append("vehicleSelectionTemplateId2", data.vehicleSelectionTemplate2.id);

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
            if (data.inspectionTemplate1?.id) inspectionData.append("inspectionTemplateId1", data.inspectionTemplate1.id);
            if (data.inspectionPoints) {
                data.inspectionPoints.forEach((pt, i) => {
                    inspectionData.append(`inspectionPoints[${i}]`, pt || "");
                });
            }

            const commitmentData = new FormData();
            commitmentData.append("customerCommitmentTitle", data.customerCommitmentTitle || "");
            commitmentData.append("customerCommitmentDescription", data.customerCommitmentDescription || "");
            if (data.customerCommitmentTemplate1?.id) commitmentData.append("customerCommitmentTemplateId1", data.customerCommitmentTemplate1.id);

            await Promise.all([
                setWhyBuyHero(heroData),
                setWhyBuyStory(storyData),
                setWhyBuyVehicleSelection(vehicleData),
                setWhyBuyProcess(processData),
                setWhyBuyInspection(inspectionData),
                setWhyBuyCustomerCommitment(commitmentData),
                setFeaturedReviews(selectedReviewIds),
                // Gallery endpoint goes here if needed.
            ]);
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
                    reviewerName: `${r.reviewedBy?.firstname || ""} ${r.reviewedBy?.lastname || ""}`.trim(),
                    rating: r.rating,
                    reviewTitle: r.reviewTitle,
                    reviewText: r.reviewText,
                }));

            updateField("featuredReviews", selectedReviews);
            return updated;
        });
    };

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
                            <p className="text-sm font-semibold text-primary">Hero Images</p>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="h-40 relative">
                                    <ImageUploader label="Image 1" src={data.whyBuyHeroTemplate1?.imageUrl} fieldKey="heroImg1" imageType="WHY_BUY_HERO" onChange={({ imageUrl, id }) => { updateField("whyBuyHeroTemplate1", { ...data.whyBuyHeroTemplate1, imageUrl, id: id ?? data.whyBuyHeroTemplate1?.id }); }} />
                                </div>
                                <div className="h-40 relative">
                                    <ImageUploader label="Image 2" src={data.whyBuyHeroTemplate2?.imageUrl} fieldKey="heroImg2" imageType="WHY_BUY_HERO" onChange={({ imageUrl, id }) => { updateField("whyBuyHeroTemplate2", { ...data.whyBuyHeroTemplate2, imageUrl, id: id ?? data.whyBuyHeroTemplate2?.id }); }} />
                                </div>
                                <div className="h-40 relative col-span-2">
                                    <ImageUploader label="Image 3" src={data.whyBuyHeroTemplate3?.imageUrl} fieldKey="heroImg3" imageType="WHY_BUY_HERO" onChange={({ imageUrl, id }) => { updateField("whyBuyHeroTemplate3", { ...data.whyBuyHeroTemplate3, imageUrl, id: id ?? data.whyBuyHeroTemplate3?.id }); }} />
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
                                    <ImageUploader label="Image 1" src={data.storyTemplate1?.imageUrl} fieldKey="storyImg1" imageType="CONSULTANT_STORY" onChange={({ imageUrl, id }) => { updateField("storyTemplate1", { ...data.storyTemplate1, imageUrl, id: id ?? data.storyTemplate1?.id }); }} />
                                </div>
                                <div className="h-40 relative">
                                    <ImageUploader label="Image 2" src={data.storyTemplate2?.imageUrl} fieldKey="storyImg2" imageType="CONSULTANT_STORY" onChange={({ imageUrl, id }) => { updateField("storyTemplate2", { ...data.storyTemplate2, imageUrl, id: id ?? data.storyTemplate2?.id }); }} />
                                </div>
                                <div className="h-40 relative">
                                    <ImageUploader label="Image 3" src={data.storyTemplate3?.imageUrl} fieldKey="storyImg3" imageType="CONSULTANT_STORY" onChange={({ imageUrl, id }) => { updateField("storyTemplate3", { ...data.storyTemplate3, imageUrl, id: id ?? data.storyTemplate3?.id }); }} />
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
                                value={data.vehicleSelectionTitle}
                                onChange={(e) => updateField("vehicleSelectionTitle", e.target.value)}
                            />
                            <RichTextEditor
                                label="Selection Description"
                                value={data.vehicleSelectionDescription}
                                onChange={(v) => updateField("vehicleSelectionDescription", v)}
                            />
                        </div>
                        <div className="space-y-4">
                            <p className="text-sm font-semibold text-primary">Selection Images</p>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="h-40 relative">
                                    <ImageUploader label="Image 1" src={data.vehicleSelectionTemplate1?.imageUrl} fieldKey="selImg1" imageType="VEHICLE_SELECTION" onChange={({ imageUrl, id }) => { updateField("vehicleSelectionTemplate1", { ...data.vehicleSelectionTemplate1, imageUrl, id: id ?? data.vehicleSelectionTemplate1?.id }); }} />
                                </div>
                                <div className="h-40 relative">
                                    <ImageUploader label="Image 2" src={data.vehicleSelectionTemplate2?.imageUrl} fieldKey="selImg2" imageType="VEHICLE_SELECTION" onChange={({ imageUrl, id }) => { updateField("vehicleSelectionTemplate2", { ...data.vehicleSelectionTemplate2, imageUrl, id: id ?? data.vehicleSelectionTemplate2?.id }); }} />
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
                                value={data.processTitle}
                                onChange={(e) => updateField("processTitle", e.target.value)}
                            />
                            <RichTextEditor
                                label="Process Description"
                                value={data.processDescription}
                                onChange={(v) => updateField("processDescription", v)}
                            />
                        </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4 mt-6">
                        {data.processSteps.map((step, i) => (
                            <div key={i} className="border border-primary/30 p-4 rounded bg-primary/5 space-y-4">
                                <div>
                                    <label className="text-sm font-medium text-primary mb-1 block">Title</label>
                                    <EditorInput
                                        value={step.title}
                                        onChange={(e) => updateArrayItem("processSteps", i, "title", e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-primary mb-1 block">Description</label>
                                    <EditorInput
                                        value={step.description}
                                        onChange={(e) => updateArrayItem("processSteps", i, "description", e.target.value)}
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
                                value={data.inspectionTitle}
                                onChange={(e) => updateField("inspectionTitle", e.target.value)}
                            />
                            <RichTextEditor
                                label="Inspection Description"
                                value={data.inspectionText}
                                onChange={(v) => updateField("inspectionText", v)}
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
                                    />
                                ))}
                            </div>
                        </div>
                        <div className="space-y-4">
                            <p className="text-sm font-semibold text-primary">Inspection Image</p>
                            <div className="h-64 relative">
                                <ImageUploader label="Image" src={data.inspectionTemplate1?.imageUrl} fieldKey="inspImg1" imageType="INSPECTION_PROCESS" onChange={({ imageUrl, id }) => { updateField("inspectionTemplate1", { ...data.inspectionTemplate1, imageUrl, id: id ?? data.inspectionTemplate1?.id }); }} />
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
                                value={data.customerCommitmentTitle}
                                onChange={(e) => updateField("customerCommitmentTitle", e.target.value)}
                            />
                            <RichTextEditor
                                label="Commitment Text"
                                value={data.customerCommitmentDescription}
                                onChange={(v) => updateField("customerCommitmentDescription", v)}
                            />
                        </div>
                        <div className="space-y-4">
                            <p className="text-sm font-semibold text-primary">Commitment Background Image</p>
                            <div className="h-40 relative">
                                <ImageUploader label="Image" src={data.customerCommitmentTemplate1?.imageUrl} fieldKey="commImg1" imageType="CUSTOMER_COMMITMENT" onChange={({ imageUrl, id }) => { updateField("customerCommitmentTemplate1", { ...data.customerCommitmentTemplate1, imageUrl, id: id ?? data.customerCommitmentTemplate1?.id }); }} />
                            </div>
                        </div>
                    </div>
                </div>

                <hr className="border-third/20" />

                {/* GALLERY */}
                <div className="space-y-6">
                    <h3 className="text-primary font-bold text-xl mb-4">Gallery Section</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="h-40 relative">
                            <ImageUploader label="Gallery Image 1" src={data.galleryTemplate1?.imageUrl} fieldKey="galImg1" imageType="GALLERY" onChange={({ imageUrl, id }) => { updateField("galleryTemplate1", { ...data.galleryTemplate1, imageUrl, id: id ?? data.galleryTemplate1?.id }); }} />
                        </div>
                        <div className="h-40 relative">
                            <ImageUploader label="Gallery Image 2" src={data.galleryTemplate2?.imageUrl} fieldKey="galImg2" imageType="GALLERY" onChange={({ imageUrl, id }) => { updateField("galleryTemplate2", { ...data.galleryTemplate2, imageUrl, id: id ?? data.galleryTemplate2?.id }); }} />
                        </div>
                        <div className="h-40 relative">
                            <ImageUploader label="Gallery Image 3" src={data.galleryTemplate3?.imageUrl} fieldKey="galImg3" imageType="GALLERY" onChange={({ imageUrl, id }) => { updateField("galleryTemplate3", { ...data.galleryTemplate3, imageUrl, id: id ?? data.galleryTemplate3?.id }); }} />
                        </div>
                        <div className="h-40 relative">
                            <ImageUploader label="Gallery Image 4" src={data.galleryTemplate4?.imageUrl} fieldKey="galImg4" imageType="GALLERY" onChange={({ imageUrl, id }) => { updateField("galleryTemplate4", { ...data.galleryTemplate4, imageUrl, id: id ?? data.galleryTemplate4?.id }); }} />
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
                        value={data.testimonialTitle}
                        onChange={(e) => updateField("testimonialTitle", e.target.value)}
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

                <div className="flex justify-end mt-8 border-t border-third/30 pt-6">
                    <Button 
                        onClick={handleSave} 
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
            {/* HERO */}
            <section className="relative px-4 w-full min-h-screen flex items-center overflow-hidden py-12 md:py-32">
                <div className="container relative grid md:grid-cols-2 gap-1 items-center">
                    {/* ── LEFT CONTENT ───────────────── */}
                    <div className="relative z-10 md:pr-10">
                        <p className="mb-4 text-sm tracking-[0.4em] uppercase text-third font-semibold">
                            Trusted Auto Consultants
                        </p>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.05] text-primary font-[Montserrat]">
                            {data.whyBuyHeroTitle}
                        </h2>
                        <div
                            className="max-w-2xl text-base leading-relaxed text-third md:text-lg font-[Poppins] mt-2"
                            dangerouslySetInnerHTML={{ __html: data.whyBuyHeroDescription }}
                        />
                        {/* ── MOBILE IMAGES (ONLY 2) ───────────────── */}
                        <div className="grid grid-cols-2 gap-3 mt-8 md:hidden">
                            {[data.whyBuyHeroTemplate1, data.whyBuyHeroTemplate2].map((img, i) => (
                                <div key={i} className="w-full h-36 rounded-xl overflow-hidden">
                                    <img
                                        src={img?.imageUrl}
                                        className="w-full h-full object-cover"
                                        alt={`car-${i}`}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* ── RIGHT VISUAL (DESKTOP COLLAGE ONLY) ───────────────── */}
                    <div className="relative hidden md:block h-[500px]">
                        {/* center main */}
                        <div className="absolute top-[10%] left-[20%] w-[55%] h-[60%] rounded-2xl overflow-hidden shadow-xl z-10">
                            <img src={data.whyBuyHeroTemplate1?.imageUrl} className="w-full h-full object-cover" />
                        </div>
                        {/* tilted right */}
                        <div className="absolute top-[5%] right-[0%] w-[38%] h-[42%] rounded-2xl overflow-hidden rotate-6 opacity-90">
                            <img src={data.whyBuyHeroTemplate2?.imageUrl} className="w-full h-full object-cover" />
                        </div>
                        {/* bottom left */}
                        <div className="absolute bottom-[0%] left-[10%] w-[40%] h-[35%] rounded-2xl overflow-hidden rotate-[4deg] opacity-90">
                            <img src={data.whyBuyHeroTemplate3?.imageUrl} className="w-full h-full object-cover" />
                        </div>
                    </div>
                </div>
            </section>

            {/* EXPERIENCE */}
            <section className="w-full py-12 bg-primary border-y border-secondary/10 px-4">
                <div className=" container max-w-7xl  sm:px-6 grid md:grid-cols-2 gap-14 items-center">
                    {/* ── LEFT CONTENT ───────────────── */}
                    <div className="flex flex-col gap-6">
                        <p className="text-sm tracking-[0.4em] uppercase text-secondary/70 font-semibold">
                            Consultant Story
                        </p>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold leading-[1.1] text-secondary font-[Montserrat]">
                            {data.storyTitle}
                        </h2>
                        <div
                            className="text-secondary/80 font-[Poppins] leading-relaxed text-base md:text-lg space-y-4"
                            dangerouslySetInnerHTML={{ __html: data.storyDescription }}
                        />
                    </div>

                    {/* ── RIGHT IMAGES (CLEAN GRID) ───────────────── */}
                    <div className="grid grid-cols-2 gap-4">
                        {/* big image */}
                        <div className="col-span-2 h-60 overflow-hidden rounded-xl border border-secondary/10">
                            <img
                                src={data.storyTemplate1?.imageUrl}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        {/* small images */}
                        <div className="h-40 overflow-hidden rounded-xl border border-secondary/10">
                            <img
                                src={data.storyTemplate2?.imageUrl}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="h-40 overflow-hidden rounded-xl border border-secondary/10">
                            <img
                                src={data.storyTemplate3?.imageUrl}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* SELECTION */}
            <section className="w-full py-12 px-2 lg:px-4">
                <div className="container">
                    <div className="max-w-7xl    flex flex-col gap-10">
                        {/* ── HEADER ───────────────── */}
                        <p className="text-sm tracking-[0.4em] uppercase text-third font-semibold">
                            Our Standards
                        </p>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.05] text-primary font-[Montserrat]">
                            {data.vehicleSelectionTitle}
                        </h2>

                        {/* ── CONTENT GRID ───────────────── */}
                        <div className="grid md:grid-cols-2 gap-10 items-center">
                            {/* LEFT TEXT */}
                            <div
                                className="flex flex-col gap-4 border-l-2 border-primary/40 pl-5 text-third text-lg font-[Poppins] leading-relaxed space-y-2"
                                dangerouslySetInnerHTML={{ __html: data.vehicleSelectionDescription }}
                            />

                            {/* RIGHT IMAGES (AUTO SCROLL) */}
                            <div
                                ref={scrollRef}
                                className="flex gap-3 overflow-x-scroll no-scrollbar"
                            >
                                {[
                                    data.vehicleSelectionTemplate1?.imageUrl,
                                    data.vehicleSelectionTemplate2?.imageUrl,
                                    data.vehicleSelectionTemplate1?.imageUrl,
                                    data.vehicleSelectionTemplate2?.imageUrl,
                                ].map((img, i) => (
                                    <div
                                        key={i}
                                        className="min-w-[180px] h-[220px] overflow-hidden rounded-lg border border-third/10 shrink-0"
                                    >
                                        <img
                                            src={img}
                                            alt="selection"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* PROCESS */}
            <section className="w-full py-12 sm:py-16 lg:py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-12 lg:gap-16">
                    {/* HEADER */}
                    <div className="max-w-2xl flex flex-col gap-4">
                        <p className="text-xs sm:text-sm tracking-[0.3em] sm:tracking-[0.4em] uppercase text-third font-semibold">
                            Simple Process
                        </p>
                        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight text-primary font-[Montserrat]">
                            {data.processTitle}
                        </h2>
                        <div
                            className="text-sm sm:text-base lg:text-lg text-third font-[Poppins] leading-relaxed"
                            dangerouslySetInnerHTML={{ __html: data.processDescription }}
                        />
                    </div>

                    {/* PROCESS GRID */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
                        {data.processSteps.map((step, i) => {
                            return (
                                <div
                                    key={i}
                                    className="group flex flex-col justify-between border border-primary/20 rounded-xl overflow-hidden transition-all duration-300 hover:border-primary/40 hover:-translate-y-1"
                                >
                                    {/* CONTENT */}
                                    <div className="p-5 sm:p-6 flex flex-col gap-3">
                                        <div className="flex items-center justify-between">
                                            <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center border border-primary/20 rounded-full">
                                                {typeof step.icon === 'string' && step.icon.startsWith('<svg') ? (
                                                    <div
                                                        className="text-primary [&>svg]:w-4 [&>svg]:h-4 sm:[&>svg]:w-[18px] sm:[&>svg]:h-[18px]"
                                                        dangerouslySetInnerHTML={{ __html: step.icon }}
                                                    />
                                                ) : (
                                                    <div className="w-10 h-10 bg-primary/20 rounded flex items-center justify-center text-xs text-primary">
                                                        Icon
                                                    </div>
                                                )}
                                            </div>
                                            <span className="text-[10px] sm:text-xs tracking-[2px] text-third font-[Montserrat]">
                                                0{i + 1}
                                            </span>
                                        </div>
                                        <h3 className="text-sm sm:text-base font-semibold text-primary font-[Montserrat]">
                                            {step.title}
                                        </h3>
                                        <div
                                            className="text-xs sm:text-sm text-third font-[Poppins] leading-relaxed"
                                            dangerouslySetInnerHTML={{ __html: step.description }}
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* inspection section */}
            <section className="w-full py-12 px-2 lg:px-4">
                <div className="container max-w-7xl mx-auto  grid md:grid-cols-2 gap-16 items-center">
                    {/* ── LEFT CONTENT ───────────────── */}
                    <div className="flex flex-col gap-6">
                        <p className="text-sm tracking-[0.4em] uppercase text-third font-semibold">
                            Independent Verification
                        </p>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight text-primary font-[Montserrat]">
                            {data.inspectionTitle}
                        </h2>
                        <div
                            className="text-third text-[17px] font-[Poppins] leading-relaxed max-w-lg"
                            dangerouslySetInnerHTML={{ __html: data.inspectionText }}
                        />

                        {/* POINTS */}
                        <div className="flex flex-col gap-4 mt-2">
                            {data.inspectionPoints.map((pt, i) => (
                                <div key={i} className="flex items-start gap-3 group">
                                    <CheckCircle2
                                        className="text-primary mt-0.5 group-hover:scale-110 transition"
                                        size={18}
                                    />
                                    <div
                                        className="text-third font-[Poppins] leading-relaxed text-[15px]"
                                        dangerouslySetInnerHTML={{ __html: pt }}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* ── RIGHT VISUAL ───────────────── */}
                    <div className="relative h-[400px] hidden md:block">
                        {/* main image */}
                        <div className="absolute inset-0 rounded-2xl overflow-hidden border border-third/10 shadow-sm">
                            <img
                                src={data.inspectionTemplate1?.imageUrl}
                                className="w-full h-full object-cover transition duration-500 hover:scale-105"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* SERVICES */}
            <section className="relative w-full py-12 overflow-hidden">
                {/* ── BACKGROUND ───────────────── */}
                <div className="absolute inset-0">
                    {/* image */}
                    <img
                        src={data.customerCommitmentTemplate1?.imageUrl}
                        className="w-full h-full object-cover scale-105"
                        alt="background"
                    />
                    {/* dark overlay */}
                    <div className="absolute inset-0 " />
                    {/* left fade */}
                    <div className="absolute inset-0 bg-linear-to-r from-black via-black/60 to-transparent" />
                    {/* center soft glow */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.06),transparent_60%)]" />
                </div>

                {/* ── CONTENT ───────────────── */}
                <div className="relative z-10 flex items-center justify-center text-center px-4">
                    <div className="max-w-3xl flex flex-col items-center gap-6">
                        {/* small label */}
                        <p className="text-sm tracking-[0.4em] uppercase text-third font-semibold">
                            Commitment
                        </p>
                        {/* heading */}
                        <h2 className="text-sm tracking-[0.4em] uppercase text-third font-semibold">
                            {data.customerCommitmentTitle}
                        </h2>
                        {/* divider */}
                        <div className="w-16 bg-white/30" />
                        {/* description */}
                        <div
                            className="text-white/80 text-base sm:text-lg md:text-xl font-[Poppins] leading-relaxed max-w-2xl"
                            dangerouslySetInnerHTML={{ __html: data.customerCommitmentDescription }}
                        />
                    </div>
                </div>
            </section>

            {/* GALLERY */}
            <section className="w-full py-12 px-2 lg:px-4 ">
                <div className="container max-w-7xl  flex flex-col gap-10">
                    {/* ── HEADER (CSS UNCHANGED) ── */}
                    <div className="flex flex-col gap-4 max-w-2xl">
                        <p className="text-sm tracking-[0.4em] uppercase text-third font-semibold">
                            Gallery
                        </p>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.05] text-primary font-[Montserrat]">
                            Our Showroom & <span className="text-primary">Team</span>
                        </h2>
                    </div>

                    {/* ── UNIQUE ARCHITECTURAL GRID ── */}
                    <div className="flex flex-col md:grid md:grid-cols-12 md:grid-rows-2 gap-3 h-auto md:h-[600px]">
                        {/* Image 1: The Tall Vertical Anchor (Left) */}
                        <div className="md:col-span-3 md:row-span-2 group relative overflow-hidden rounded-2xl border border-third/10">
                            <img
                                src={data.galleryTemplate1?.imageUrl}
                                alt="Showroom Vertical"
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                        </div>
                        {/* Image 2: The Main Landscape Feature (Top Right) */}
                        <div className="md:col-span-9 md:row-span-1 group relative overflow-hidden rounded-2xl border border-third/10">
                            <img
                                src={data.galleryTemplate2?.imageUrl}
                                alt="Main Showroom"
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                        </div>
                        {/* Image 3: Detail Shot (Bottom Middle) */}
                        <div className="md:col-span-5 md:row-span-1 group relative overflow-hidden rounded-2xl border border-third/10">
                            <img
                                src={data.galleryTemplate3?.imageUrl}
                                alt="Team Detail"
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                        </div>
                        {/* Image 4: The Wide End Cap (Bottom Right) */}
                        <div className="md:col-span-4 md:row-span-1 group relative overflow-hidden rounded-2xl border border-third/10">
                            <img
                                src={data.galleryTemplate4?.imageUrl}
                                alt="Interior View"
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-fourth/10 group-hover:bg-transparent transition-colors duration-500" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Testinomal section */}
            <section className="w-full py-12 bg-primary px-4">
                <div className=" container max-w-7xl mx-3 px-4 sm:px-6 flex flex-col gap-12">
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
                        {(data.featuredReviews || data.testimonials || []).map((t, i) => {
                            const reviewText = t.reviewText || t.review;
                            const reviewerName = t.reviewerName || t.name;
                            const rating = t.rating || 5;

                            return (
                                <div
                                    key={i}
                                    className="p-6 md:p-7 rounded-xl border border-secondary/15 bg-primary flex flex-col gap-4 hover:border-secondary/30 transition-all duration-300"
                                >
                                    {/* Stars */}
                                    <div className="flex gap-1">
                                        {[...Array(5)].map((_, idx) => (
                                            <Star key={idx} size={15} className={idx < rating ? "text-fourth fill-fourth" : "text-fourth"} />
                                        ))}
                                    </div>

                                    {/* Review */}
                                    <div
                                        className="text-secondary/80 font-[Poppins] leading-relaxed text-[15px]"
                                        dangerouslySetInnerHTML={{ __html: reviewText }}
                                    />

                                    {/* Name */}
                                    <h4 className="text-secondary font-[Montserrat] font-semibold text-sm tracking-wide">
                                        {reviewerName}
                                    </h4>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>
        </>
    );
}
