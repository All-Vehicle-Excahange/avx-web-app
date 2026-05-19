import React, { useState } from "react";
import { ChevronRight, Upload, AlertCircle, ArrowLeft, ArrowRight, Check, Paperclip } from "lucide-react";
import Button from "@/components/ui/button";
import CustomSelect from "@/components/ui/custom-select";
import InputField from "@/components/ui/inputField";
import DropzoneUpload from "@/components/ui/DropzoneUpload";

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

  const vehicles = [
    "None",
    "Ford Ecosport TITANIUM 1.5L (Live)",
    "Audi A6 2.0 TDI (Live)",
    "BMW X1 sDrive20d (Live)",
    "Hyundai i20 Asta (Draft)"
  ];

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (step < 3) {
      handleNext();
      return;
    }
    if (!isStep1Valid || !isStep2Valid) return;

    // Create the ticket object
    const newTicket = {
      id: `RC-${Math.floor(1000 + Math.random() * 9000)}`,
      subject: formData.subject,
      category: formData.category.replace(" Campaigns", "").replace(" & Profile", "").replace(" & Listings", "").replace(" & Trust", "").replace(" & Chats", "").replace(" & Wallet", ""),
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
      relatedVehicle: formData.relatedVehicle,
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
                  options={vehicles.map((v) => ({ label: v, value: v }))}
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

            {/* Attachment Upload (Using global DropzoneUpload component) */}
            <div className="pt-2">
              <DropzoneUpload
                label="Attachments (Optional)"
                onChange={(file) => {
                  setFormData(prev => ({
                    ...prev,
                    attachments: file ? [file] : []
                  }));
                }}
                preview={formData.attachments[0] || null}
              />
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
                  {formData.relatedVehicle && (
                    <div className="text-xs bg-primary/5 border border-third/15 px-3 py-1.5 rounded-lg text-third">
                      Vehicle: <span className="text-primary font-medium">{formData.relatedVehicle}</span>
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
            >
              Submit Ticket
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
