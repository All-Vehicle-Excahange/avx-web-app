import Image from "next/image";
import React, { useState } from "react";
import { ChevronRight, Upload, AlertCircle, ArrowLeft, ArrowRight, Check, Paperclip, X } from "lucide-react";
import Button from "@/components/ui/button";
import CustomSelect from "@/components/ui/custom-select";
import InputField from "@/components/ui/inputField";
import DropzoneUpload from "@/components/ui/DropzoneUpload";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createHelpTicket } from "@/services/helpCenter.service";
import { getInventoryVehicleQuery } from "@/queries/Seller.queries";
import { toast } from "react-toastify";

export default function CreateTicket({ onNavigate, onCreateTicket }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    category: "",
    subCategory: "",
    priority: "Medium",
    relatedVehicle: "None",
    subject: "",
    description: "",
    attachments: []
  });

  const { data: apiVehicles } = useQuery(getInventoryVehicleQuery());

  const categories = [
    "Storefront & Profile",
    "Inventory & Listings",
    "Inspection & Trust",
    "Inquiries & Chats",
    "PPC & Boost Campaigns",
    "Billing & Wallet",
    "Account & Verification",
    "Technical Issue",
    "Other"
  ];

  const subCategories = {
    "Storefront & Profile": ["KYC verification issue", "Profile updates", "Logo/branding upload", "Other"],
    "Inventory & Listings": ["Listing not showing", "Edit listing details", "Pricing update issue", "Other"],
    "Inspection & Trust": ["Inspection not showing on listing", "Re-inspection dispute", "Expired inspection not renewing", "Inspection score seems incorrect", "Other"],
    "Inquiries & Chats": ["Chat message delayed", "Buyer inquiry missing", "Block buyer", "Other"],
    "PPC & Boost Campaigns": ["Campaign paused unexpectedly", "CPC billing issue", "Boost not showing", "Other"],
    "Billing & Wallet": ["Wallet top-up not reflected", "Refund request", "Invoice request", "Other"]
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
      // Reset subcategory if category changes
      ...(field === "category" ? { subCategory: "" } : {})
    }));
  };

  // Mock file drop handler
  const handleFileDrop = (e) => {
    e.preventDefault();
    const files = e.target.files ? Array.from(e.target.files) : [];
    if (files.length > 0) {
      setFormData(prev => ({
        ...prev,
        attachments: [...prev.attachments, ...files.map(f => f.name)]
      }));
    }
  };

  const handleFileClick = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.multiple = true;
    input.onchange = (e) => {
      const files = Array.from(e.target.files);
      setFormData(prev => ({
        ...prev,
        attachments: [...prev.attachments, ...files.map(f => f.name)]
      }));
    };
    input.click();
  };

  const removeAttachment = (index) => {
    setFormData(prev => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index)
    }));
  };

  const isStep1Valid = formData.category && formData.subCategory && formData.priority;
  const isStep2Valid = formData.subject.trim().length > 4 && formData.description.trim().length > 10;

  const handleNext = () => {
    if (step === 1 && isStep1Valid) setStep(2);
    else if (step === 2 && isStep2Valid) setStep(3);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const createMutation = useMutation({
    mutationFn: async (bodyFormData) => {
      return createHelpTicket(bodyFormData);
    },
    onSuccess: (data) => {
      toast.success("Help ticket submitted successfully!");
      const ticketResponse = data?.data || {};
      const newTicket = {
        id: ticketResponse.id || `RC-${Math.floor(1000 + Math.random() * 9000)}`,
        subject: formData.subject,
        category: formData.category,
        priority: formData.priority,
        status: "Open",
        lastUpdated: "Just now",
        createdDate: new Date().toLocaleString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
          hour: "numeric",
          minute: "2-digit",
          hour12: true
        }),
        assignedTo: "Support Team",
        relatedVehicle: formData.relatedVehicle === "None" 
          ? "None"
          : (apiVehicles || []).find((v) => v.id === formData.relatedVehicle)
            ? (() => {
                const found = apiVehicles.find((v) => v.id === formData.relatedVehicle);
                return `${found.makerName || ""} ${found.modelName || ""} ${found.variantName || ""}`.trim();
              })()
            : "None",
        description: formData.description,
        messages: [
          {
            sender: "user",
            senderName: "You",
            text: formData.description,
            time: "Just now",
            attachments: formData.attachments.length > 0 
              ? formData.attachments.map(f => typeof f === "string" ? f : f.name) 
              : undefined
          }
        ]
      };
      onCreateTicket(newTicket);
    },
    onError: (error) => {
      console.error("Failed to create ticket:", error);
      toast.error(error?.response?.data?.message || "Failed to submit ticket. Please try again.");
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (step < 3) {
      handleNext();
      return;
    }
    if (!isStep1Valid || !isStep2Valid) return;

    const bodyFormData = new FormData();
    bodyFormData.append("category", formData.category);
    bodyFormData.append("subCategory", formData.subCategory);
    bodyFormData.append("priority", formData.priority.toUpperCase());
    bodyFormData.append("subject", formData.subject);
    bodyFormData.append("description", formData.description);
    if (formData.relatedVehicle && formData.relatedVehicle !== "None") {
      bodyFormData.append("vehicleId", formData.relatedVehicle);
    }
    if (formData.attachments && formData.attachments.length > 0) {
      formData.attachments.forEach((file) => {
        if (typeof file !== "string") {
          bodyFormData.append("attachments", file);
        }
      });
    }

    createMutation.mutate(bodyFormData);
  };

  return (
    <div className="space-y-6 animate-[fadeUp_0.3s_ease-out]">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs text-third">
        <button
          onClick={() => onNavigate("home")}
          className="hover:text-fourth transition-colors"
        >
          Help Center
        </button>
        <ChevronRight size={12} className="text-third/50" />
        <span className="text-primary font-medium">New Support Ticket</span>
      </nav>

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-primary">Raise a Support Ticket</h1>
        <p className="text-third text-sm mt-1">
          Describe your issue and our team will respond within 2–4 hours
        </p>
      </div>

      {/* Progress Stepper */}
      <div className="flex items-center justify-between max-w-3xl mx-auto py-4">
        {/* Step 1 */}
        <div className="flex flex-col items-center flex-1">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold border-2 transition-all ${
              step > 1
                ? "bg-green-500 border-green-500 text-white"
                : step === 1
                ? "bg-primary border-primary text-secondary ring-4 ring-primary/20"
                : "bg-transparent border-third/30 text-third"
            }`}
          >
            {step > 1 ? <Check size={14} /> : "1"}
          </div>
          <span className={`text-[10px] mt-2 font-medium ${step === 1 ? "text-primary" : "text-third"}`}>Category</span>
        </div>

        <div className={`h-0.5 flex-1 mx-2 transition-all duration-300 ${step > 1 ? "bg-green-500" : "bg-third/20"}`} />

        {/* Step 2 */}
        <div className="flex flex-col items-center flex-1">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold border-2 transition-all ${
              step > 2
                ? "bg-green-500 border-green-500 text-white"
                : step === 2
                ? "bg-primary border-primary text-secondary ring-4 ring-primary/20"
                : "bg-transparent border-third/30 text-third"
            }`}
          >
            {step > 2 ? <Check size={14} /> : "2"}
          </div>
          <span className={`text-[10px] mt-2 font-medium ${step === 2 ? "text-primary" : "text-third"}`}>Details</span>
        </div>

        <div className={`h-0.5 flex-1 mx-2 transition-all duration-300 ${step > 2 ? "bg-green-500" : "bg-third/20"}`} />

        {/* Step 3 */}
        <div className="flex flex-col items-center flex-1">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold border-2 transition-all ${
              step === 3
                ? "bg-primary border-primary text-secondary ring-4 ring-primary/20"
                : "bg-transparent border-third/30 text-third"
            }`}
          >
            3
          </div>
          <span className={`text-[10px] mt-2 font-medium ${step === 3 ? "text-primary" : "text-third"}`}>Submit</span>
        </div>
      </div>

      {/* Form Content */}
      <form onSubmit={handleSubmit} className=" border border-third/15 rounded-2xl p-6 space-y-6">
        {step === 1 && (
          <div className="space-y-4 animate-[fadeUp_0.2s_ease-out]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Category */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold text-third">Category *</label>
                <CustomSelect
                  value={formData.category}
                  onChange={(val) => handleInputChange("category", val)}
                  options={categories.map((c) => ({ label: c, value: c }))}
                  placeholder="Select a category"
                  variant="transparent"
                />
              </div>

              {/* Sub-Category */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold text-third">Sub-category *</label>
                <CustomSelect
                  value={formData.subCategory}
                  onChange={(val) => handleInputChange("subCategory", val)}
                  disabled={!formData.category}
                  options={(formData.category && subCategories[formData.category]
                    ? subCategories[formData.category]
                    : []
                  ).map((sc) => ({ label: sc, value: sc }))}
                  placeholder="Select a sub-category"
                  variant="transparent"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Priority */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold text-third">Priority *</label>
                <CustomSelect
                  value={formData.priority}
                  onChange={(val) => handleInputChange("priority", val)}
                  options={[
                    { label: "Low — general question", value: "Low" },
                    { label: "Medium — affecting business", value: "Medium" },
                    { label: "High — urgent issue", value: "High" },
                  ]}
                  placeholder="Select priority"
                  variant="transparent"
                />
              </div>

              {/* Related Vehicle */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold text-third">Related Vehicle (Optional)</label>
                <CustomSelect
                  value={formData.relatedVehicle}
                  onChange={(val) => handleInputChange("relatedVehicle", val)}
                  options={[
                    { label: "None", value: "None" },
                    ...(apiVehicles || []).map((v) => ({
                      label: `${v.makerName || ""} ${v.modelName || ""} ${v.variantName || ""}`.trim() || `Vehicle #${v.id}`,
                      value: v.id
                    }))
                  ]}
                  placeholder="Select related vehicle"
                  variant="transparent"
                />
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4 animate-[fadeUp_0.2s_ease-out]">
            {/* Subject */}
            <div className="space-y-1">
              <InputField
                label="Subject"
                required
                variant="colored"
                value={formData.subject}
                onChange={(e) => handleInputChange("subject", e.target.value)}
                placeholder="Brief description of the issue"
              />
              <p className="text-[10px] text-third/60 ml-1">Minimum 5 characters</p>
            </div>

            {/* Description */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-primary ml-1">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                placeholder="Describe the issue in detail — what happened, when, and any error messages..."
                rows={5}
                className="w-full rounded-lg outline-none placeholder:text-primary/50 transition border border-primary bg-primary/10 text-primary focus:border-primary focus:ring-1 focus:ring-primary px-3 py-2.5 text-sm resize-y"
                required
              />
              <p className="text-[10px] text-third/60 ml-1">Minimum 10 characters. Please provide diagnostic details.</p>
            </div>

            {/* Attachment Upload */}
            <div className="pt-2 space-y-3">
              <label className="text-sm font-semibold text-primary ml-1">
                Attachments (Optional)
              </label>
              
              {/* Drag & Drop Area */}
              <div
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  const files = e.dataTransfer.files ? Array.from(e.dataTransfer.files) : [];
                  const filtered = files.filter(f => f.type.startsWith("image/") || f.type.startsWith("video/"));
                  if (filtered.length > 0) {
                    setFormData(prev => ({
                      ...prev,
                      attachments: [...prev.attachments, ...filtered]
                    }));
                  }
                }}
                onClick={() => {
                  const input = document.createElement("input");
                  input.type = "file";
                  input.multiple = true;
                  input.accept = "image/*,video/*";
                  input.onchange = (e) => {
                    const files = Array.from(e.target.files);
                    setFormData(prev => ({
                      ...prev,
                      attachments: [...prev.attachments, ...files]
                    }));
                  };
                  input.click();
                }}
                className="cursor-pointer rounded-xl border-2 border-dashed border-third/40 bg-primary/5 hover:border-primary transition p-6 text-center w-full"
              >
                <div className="flex flex-col items-center justify-center space-y-2 py-2">
                  <Upload className="w-10 h-10 text-primary/40" />
                  <p className="text-third text-sm font-medium">
                    Drag and drop photos or videos here, or click to browse
                  </p>
                  <p className="text-[11px] text-third/60">
                    Supports multiple image and video files (PNG, JPG, WEBP, MP4, MOV, etc.)
                  </p>
                </div>
              </div>

              {/* Preview Grid */}
              {formData.attachments.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
                  {formData.attachments.map((file, idx) => {
                    const isImg = file.type && file.type.startsWith("image/");
                    const isVid = file.type && file.type.startsWith("video/");
                    const displayUrl = URL.createObjectURL(file);
                    const fileSize = (file.size / (1024 * 1024)).toFixed(2) + " MB";

                    return (
                      <div key={idx} className="relative group border border-third/15 rounded-xl overflow-hidden bg-black/40 h-28 flex flex-col justify-between">
                        {/* Preview Media */}
                        {isImg ? (
                          <Image src={displayUrl} alt={file.name} width={800} height={500} unoptimized className="w-full h-full object-cover" />
                        ) : isVid ? (
                          <div className="w-full h-full flex items-center justify-center bg-black/60 text-white relative">
                            <video src={displayUrl} className="w-full h-full object-cover opacity-70" />
                            <div className="absolute inset-0 flex items-center justify-center">
                              <span className="bg-primary/80 text-secondary text-[10px] font-bold uppercase px-2 py-0.5 rounded">Video</span>
                            </div>
                          </div>
                        ) : (
                          <div className="w-full h-full flex flex-col items-center justify-center p-2 text-center text-third">
                            <Paperclip size={24} />
                            <span className="text-[10px] truncate max-w-full mt-1">{file.name}</span>
                          </div>
                        )}

                        {/* File details overlay on hover */}
                        <div className="absolute inset-0 bg-black/75 opacity-0 group-hover:opacity-100 transition duration-200 flex flex-col justify-between p-2">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setFormData(prev => ({
                                ...prev,
                                attachments: prev.attachments.filter((_, i) => i !== idx)
                              }));
                            }}
                            className="self-end p-1 bg-red-500 hover:bg-red-600 text-white rounded-full transition cursor-pointer"
                          >
                            <X size={12} />
                          </button>
                          <div className="text-[10px] text-white space-y-0.5">
                            <p className="font-semibold truncate">{file.name}</p>
                            <p className="text-gray-400">{fileSize}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6 animate-[fadeUp_0.2s_ease-out] ">
            {/* Ticket Summary Preview */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-third">Ticket Summary Preview</h3>
              
              <div className="border border-third/15 rounded-2xl p-6 space-y-6">
                {/* Header Info */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-4 border-b border-third/10">
                  <div>
                    <span className="text-[10px] text-third/75 font-semibold uppercase tracking-wider">
                      {formData.category || "—"} · {formData.priority} Priority
                    </span>
                    <h2 className="text-lg font-bold text-primary mt-1">{formData.subject || "—"}</h2>
                  </div>
                  {formData.relatedVehicle && formData.relatedVehicle !== "None" && (
                    <div className="text-xs bg-primary/5 border border-third/15 px-3 py-1.5 rounded-lg text-third">
                      Vehicle: <span className="text-primary font-medium">
                        {(apiVehicles || []).find((v) => v.id === formData.relatedVehicle)
                          ? (() => {
                              const found = apiVehicles.find((v) => v.id === formData.relatedVehicle);
                              return `${found.makerName || ""} ${found.modelName || ""} ${found.variantName || ""}`.trim();
                            })()
                          : formData.relatedVehicle}
                      </span>
                    </div>
                  )}
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-third">Description</h4>
                  <div className="bg-primary/5 border border-third/10 rounded-xl p-4 text-sm text-primary leading-relaxed whitespace-pre-line">
                    {formData.description || "—"}
                  </div>
                </div>

                {/* Attachments */}
                {formData.attachments.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-third">Attachments</h4>
                    <div className="flex flex-wrap gap-2">
                      {formData.attachments.map((file, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-1.5 bg-fourth/10 border border-fourth/20 text-fourth px-3 py-1.5 rounded-lg text-xs"
                        >
                          <Paperclip size={12} />
                          <span>{typeof file === "string" ? file : file.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Warning Info Box */}
            <div className="bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 rounded-xl p-4 flex gap-3 text-xs leading-relaxed">
              <AlertCircle size={16} className="shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-primary block mb-0.5">Please Review Before Submitting</span>
                Ensure all information is accurate. Submitting misleading details or multiple tickets for the same issue may delay resolution times.
              </div>
            </div>
          </div>
        )}

        {/* Buttons */}
        <div className="flex justify-between items-center border-t border-third/15 pt-6">
          <Button
            type="button"
            variant="outlineSecondary"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (step === 1) onNavigate("home");
              else handleBack();
            }}
            className="flex items-center gap-1 cursor-pointer"
          >
            {step === 1 ? "Cancel" : <><ArrowLeft size={14} /> Back</>}
          </Button>

          {step < 3 ? (
            <Button
              type="button"
              variant="ghost"
              disabled={step === 1 ? !isStep1Valid : !isStep2Valid}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleNext();
              }}
              className="flex items-center gap-1 disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
            >
              Next <ArrowRight size={14} />
            </Button>
          ) : (
            <Button
              type="submit"
              variant="ghost"
              className="flex items-center gap-1 cursor-pointer"
              disabled={createMutation.isPending}
            >
              {createMutation.isPending ? "Submitting..." : "Submit Ticket"}
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
