"use client";

import { useState, useRef, useEffect } from "react";
import {
  Car,
  ClipboardList,
  FileText,
  UserX,
  CreditCard,
  Megaphone,
  LockKeyhole,
  Image,
  FileIcon,
  Video,
  CheckCircle2,
  ChevronDown,
  ArrowRight,
  X,
  Timer,
  AlertCircle,
  ArrowLeft,
} from "lucide-react";
import Button from "@/components/ui/button";
import { useInfiniteQuery, useMutation } from "@tanstack/react-query";
import { getMyInquiriesInfiniteQuery } from "@/queries/inquiry.queries";
import { getAllRequestedInspectionInfiniteQuery } from "@/queries/inspection.queries";
import { getSellerInventoryInfiniteQuery } from "@/queries/user.queries";
import { createHelpTicket } from "@/services/helpCenter.service";
import { toast } from "react-toastify";

const ISSUE_TYPES = [
  { value: "vehicle", label: "Vehicle Inquiry", icon: Car },
  { value: "inspection", label: "Inspection Issue", icon: ClipboardList },
  { value: "listing", label: "Listing Issue", icon: FileText },
  { value: "consultant", label: "Consultant Behavior", icon: UserX },
  { value: "billing", label: "Subscription / Billing", icon: CreditCard },
  { value: "ppc", label: "PPC Campaign", icon: Megaphone },
  { value: "account", label: "Account Access", icon: LockKeyhole },
];

const DYNAMIC_TYPES = ["vehicle", "inspection", "listing"];

const DYNAMIC_HEADINGS = {
  vehicle: "Your Inquiries",
  inspection: "Your Inspection Requests",
  listing: "Your Listed Vehicles",
};

const STEPS = [
  { number: "01", label: "Issue Type", sub: "Select a category" },
  { number: "02", label: "Related Item", sub: "Link to a record" },
  { number: "03", label: "Describe", sub: "Explain the issue" },
  { number: "04", label: "Review", sub: "Confirm & submit" },
];

const SLA_SECONDS = 48 * 60 * 60;

function formatTimer(secs) {
  const h = Math.floor(secs / 3600);
  const m = Math.floor((secs % 3600) / 60);
  const s = secs % 60;
  return [h, m, s].map((v) => String(v).padStart(2, "0")).join(":");
}

function StepHeading({ number, title, sub }) {
  return (
    <div className="flex items-start gap-4">
      <span className="font-primary text-5xl font-black text-primary/5 leading-none select-none">
        {number}
      </span>
      <div>
        <h3 className="font-primary text-xl font-black text-primary tracking-tight uppercase">
          {title}
        </h3>
        <p className="text-third/40 text-sm mt-0.5 font-secondary">{sub}</p>
      </div>
    </div>
  );
}

function SummaryRow({ label, value, padded, border }) {
  return (
    <div
      className={`flex items-start justify-between gap-4 ${padded ? "px-4 py-3" : ""} ${border ? "border-t border-primary/5" : ""}`}
    >
      <span className="text-xs uppercase tracking-widest text-third/35 shrink-0 font-primary font-bold">
        {label}
      </span>
      <span className="text-sm text-primary/80 text-right font-secondary">
        {value}
      </span>
    </div>
  );
}

export default function SupportFlow({ onTicketCreated = () => {}, onBack }) {
  const [step, setStep] = useState(0);
  const [issueType, setIssueType] = useState("");
  const [dropOpen, setDropOpen] = useState(false);
  const [relatedItem, setRelatedItem] = useState(null);
  const [description, setDescription] = useState("");
  const [uploads, setUploads] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [slaElapsed, setSlaElapsed] = useState(0);
  const [ticketId] = useState(
    () => "TKT-" + Math.floor(100000 + Math.random() * 900000),
  );
  const [createdTicketNumber, setCreatedTicketNumber] = useState("");
  const [submitTime] = useState(() => new Date());
  const fileRef = useRef();
  const timerRef = useRef(null);

  const selected = ISSUE_TYPES.find((i) => i.value === issueType);
  const isDynamicType = DYNAMIC_TYPES.includes(issueType);

  // 1. Vehicle inquiries query
  const {
    data: inquiriesData,
    fetchNextPage: fetchNextPageInquiries,
    hasNextPage: hasNextPageInquiries,
    isLoading: isLoadingInquiries,
    isFetchingNextPage: isFetchingNextPageInquiries,
  } = useInfiniteQuery({
    ...getMyInquiriesInfiniteQuery({
      pageSize: 10,
    }),
    enabled: issueType === "vehicle",
    staleTime: 5 * 60 * 1000,
  });

  // 2. Inspection requests query
  const {
    data: inspectionsData,
    fetchNextPage: fetchNextPageInspections,
    hasNextPage: hasNextPageInspections,
    isLoading: isLoadingInspections,
    isFetchingNextPage: isFetchingNextPageInspections,
  } = useInfiniteQuery({
    ...getAllRequestedInspectionInfiniteQuery({
      pageSize: 10,
    }),
    enabled: issueType === "inspection",
    staleTime: 5 * 60 * 1000,
  });

  // 3. Listings query
  const {
    data: listingsData,
    fetchNextPage: fetchNextPageListings,
    hasNextPage: hasNextPageListings,
    isLoading: isLoadingListings,
    isFetchingNextPage: isFetchingNextPageListings,
  } = useInfiniteQuery({
    ...getSellerInventoryInfiniteQuery({
      size: 10,
    }),
    enabled: issueType === "listing",
    staleTime: 5 * 60 * 1000,
  });

  // 4. Create Help Ticket mutation
  const createMutation = useMutation({
    mutationFn: async (bodyFormData) => {
      return createHelpTicket(bodyFormData);
    },
    onSuccess: (data) => {
      toast.success("Support ticket submitted successfully!");
      const ticketResponse = data?.data || {};
      setCreatedTicketNumber(ticketResponse.ticketNumber || ticketResponse.id || ticketId);
      const newTicket = {
        id: ticketResponse.id || ticketId,
        ticketNumber: ticketResponse.ticketNumber || ticketResponse.id || ticketId,
        category: selected?.label || issueType,
        status: "Open",
        updated: "Just now",
        subject: description.slice(0, 72) + (description.length > 72 ? "…" : ""),
        messages: [
          { from: "You", time: "Just now", text: description, mine: true },
        ],
      };
      onTicketCreated(newTicket);
      setSubmitted(true);
    },
    onError: (error) => {
      console.error("Failed to submit support ticket:", error);
      toast.error(
        error?.response?.data?.message ||
          "Failed to submit ticket. Please try again.",
      );
    },
  });

  let items = [];
  let isLoadingItems = false;
  let hasNextPageItems = false;
  let isFetchingNextPageItems = false;
  let fetchNextPageItems = () => {};
  let heading = "";
  let emptyMessage = "";

  if (issueType === "vehicle") {
    const inquiries = inquiriesData?.pages?.flatMap((page) => page?.data || []) || [];
    items = inquiries.map((inq) => {
      const vehicle = inq.inquiryVehicleResponse || {};
      const vehicleName = `${vehicle.makerName || ""} ${vehicle.modelName || ""} ${vehicle.variantName || ""}`.trim() || "Unknown Vehicle";
      return {
        id: inq.id,
        label: inq.inquiryTitle || vehicleName,
        meta: `Inquiry #${inq.id} — ${vehicleName} (${inq.inquiryStatus || "PENDING"})`,
        icon: Car,
        raw: inq,
      };
    });
    isLoadingItems = isLoadingInquiries;
    hasNextPageItems = hasNextPageInquiries;
    isFetchingNextPageItems = isFetchingNextPageInquiries;
    fetchNextPageItems = fetchNextPageInquiries;
    heading = "Your Inquiries";
    emptyMessage = "You haven't sent any vehicle inquiries yet.";
  } else if (issueType === "inspection") {
    const inspections = inspectionsData?.pages?.flatMap((page) => page?.data || []) || [];
    items = inspections.map((ins) => {
      const vehicleName = `${ins.makerName || ""} ${ins.modelName || ""} ${ins.variantName || ""}`.trim() || "Unknown Vehicle";
      return {
        id: ins.id,
        label: `Inspection for ${vehicleName}`,
        meta: `Request #${ins.id} — Status: ${ins.inspectionRequestStatus || "PENDING"}`,
        icon: ClipboardList,
        raw: ins,
      };
    });
    isLoadingItems = isLoadingInspections;
    hasNextPageItems = hasNextPageInspections;
    isFetchingNextPageItems = isFetchingNextPageInspections;
    fetchNextPageItems = fetchNextPageInspections;
    heading = "Your Inspection Requests";
    emptyMessage = "You haven't requested any vehicle inspections yet.";
  } else if (issueType === "listing") {
    const listings = listingsData?.pages?.flatMap((page) => page?.data || []) || [];
    items = listings.map((lst) => {
      const vehicleName = `${lst.makerName || ""} ${lst.modelName || ""} ${lst.variantName || ""}`.trim() || "Unknown Vehicle";
      return {
        id: lst.id,
        label: vehicleName,
        meta: `Listing #${lst.id} — Status: ${lst.listingStatus || "DRAFT"}`,
        icon: FileText,
        raw: lst,
      };
    });
    isLoadingItems = isLoadingListings;
    hasNextPageItems = hasNextPageListings;
    isFetchingNextPageItems = isFetchingNextPageListings;
    fetchNextPageItems = fetchNextPageListings;
    heading = "Your Listed Vehicles";
    emptyMessage = "You don't have any listed vehicles yet.";
  }

  const canNext0 = !!issueType;
  const canNext1 = !isDynamicType || !!relatedItem;
  const canNext2 = description.trim().length > 10;
  const progressPct = submitted ? 100 : (step / 3) * 100;

  useEffect(() => {
    if (submitted) {
      timerRef.current = setInterval(() => setSlaElapsed((e) => e + 1), 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [submitted]);

  const handleFile = (e) => {
    const files = Array.from(e.target.files || []);
    setUploads((prev) => [...prev, ...files]);
  };
  const removeUpload = (i) =>
    setUploads((prev) => prev.filter((_, idx) => idx !== i));

  const handleSubmit = () => {
    const bodyFormData = new FormData();
    bodyFormData.append("category", selected?.label || issueType);
    bodyFormData.append("priority", "MEDIUM");
    bodyFormData.append("subject", description.slice(0, 72) + (description.length > 72 ? "…" : ""));
    bodyFormData.append("description", description);

    if (relatedItem?.id) {
      if (issueType === "vehicle") {
        bodyFormData.append("vehicleInquiryId", relatedItem.id);
      } else if (issueType === "inspection") {
        bodyFormData.append("vehicleInspectionRequestId", relatedItem.id);
      } else if (issueType === "listing") {
        bodyFormData.append("vehicleId", relatedItem.id);
      }
    }

    if (uploads && uploads.length > 0) {
      uploads.forEach((file) => {
        bodyFormData.append("attachments", file);
      });
    }

    createMutation.mutate(bodyFormData);
  };

  /* ── SUCCESS STATE ── */
  if (submitted) {
    const remaining = Math.max(0, SLA_SECONDS - slaElapsed);
    const pctUsed = Math.min(100, (slaElapsed / SLA_SECONDS) * 100);

    return (
      <section className="min-h-[80vh] flex items-center justify-center px-4 py-16 font-secondary">
        <div className="w-full max-w-lg space-y-6">
          <div className="text-center space-y-3">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-fourth/10 border border-fourth/30 text-fourth">
              <CheckCircle2 size={28} />
            </div>
            <div>
              <p className="text-third/50 text-xs tracking-widest uppercase mb-1 font-primary font-bold">
                Ticket Created
              </p>
              <h2 className="font-primary text-4xl font-black text-primary tracking-tight">
                {createdTicketNumber || ticketId}
              </h2>
            </div>
          </div>

          <div className="border border-primary/10 rounded-2xl overflow-hidden bg-primary/5">
            <SummaryRow
              label="Status"
              value={
                <span className="inline-flex items-center gap-1.5 text-fourth font-bold uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-fourth inline-block animate-pulse" />
                  Open
                </span>
              }
              padded
            />
            <SummaryRow label="Issue" value={selected?.label} padded border />
            {relatedItem && (
              <SummaryRow
                label="Related"
                value={relatedItem.label}
                padded
                border
              />
            )}
            <SummaryRow
              label="Created"
              value={submitTime.toLocaleString()}
              padded
              border
            />
          </div>

          <div className="border border-primary/10 rounded-2xl bg-primary/5 overflow-hidden">
            <div className="px-5 pt-5 pb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Timer size={14} className="text-fourth" />
                <span className="text-xs uppercase tracking-widest text-third/50 font-bold font-primary">
                  SLA Timer
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs uppercase tracking-widest text-third/35">
                  Remaining
                </span>
                <span className="font-primary text-lg font-black text-primary tabular-nums tracking-tight">
                  {formatTimer(remaining)}
                </span>
              </div>
            </div>
            <div className="h-1 bg-primary/10 mx-5 mb-5 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-1000 ${pctUsed > 80 ? "bg-warning" : "bg-fourth"}`}
                style={{ width: `${pctUsed}%` }}
              />
            </div>
            <div className="px-5 pb-4 flex items-center gap-2">
              <AlertCircle size={11} className="text-third/30 shrink-0" />
              <p className="text-xs text-third/30 leading-relaxed">
                SLA window is 48 hours from ticket creation. Timer resets if
                ticket is updated.
              </p>
            </div>
          </div>

          <Button
            variant="outline"
            size="sm"
            full
            onClick={onBack}
            className="w-full mt-4"
          >
            Back to My Requests
          </Button>
        </div>
      </section>
    );
  }

  /* ── MAIN FLOW ── */
  return (
    <section className="px-2 sm:px-6 lg:px-4 py-16 font-secondary">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-10">
          <div>
            <p className="text-sm tracking-[0.4em] uppercase text-third/60 font-semibold mb-2 font-primary">
              Support Center
            </p>
            <h1 className="font-primary text-4xl sm:text-5xl font-black text-primary tracking-tight leading-none uppercase">
              How can we <span className="text-fourth">help you?</span>
            </h1>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
          {/* Sidebar */}
          <div className="w-full lg:w-72 shrink-0 lg:sticky lg:top-8">
            <div className="border border-primary/10 rounded-2xl  backdrop-blur-sm overflow-hidden">
              <div className="px-6 py-5 border-b border-primary/5">
                <p className="text-xs uppercase tracking-widest text-third/35 font-bold font-primary">
                  Progress
                </p>
                <div className="mt-3 h-1 bg-primary/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-fourth rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${progressPct}%` }}
                  />
                </div>
                <p className="text-[10px] uppercase font-bold text-third/30 mt-2 tracking-widest">
                  Step {step + 1} of 4
                </p>
              </div>
              <div className="p-3 space-y-0.5">
                {STEPS.map((s, i) => {
                  const isDone = i < step;
                  const isCurrent = i === step;
                  return (
                    <div
                      key={i}
                      className={`flex items-center gap-3.5 px-3 py-3 rounded-xl transition-all duration-300 ${isCurrent ? "bg-primary/5" : ""}`}
                    >
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-black font-primary shrink-0 transition-all duration-300 ${
                          isDone
                            ? "bg-fourth text-primary"
                            : isCurrent
                              ? "border border-fourth text-fourth"
                              : "border border-primary/10 text-third/20"
                        }`}
                      >
                        {isDone ? "✓" : i + 1}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p
                          className={`text-[11px] font-black font-primary uppercase tracking-wider transition-colors duration-300 ${isCurrent ? "text-primary" : isDone ? "text-third/60" : "text-third/25"}`}
                        >
                          {s.label}
                        </p>
                        <p
                          className={`text-[10px] mt-0.5 transition-colors duration-300 ${isCurrent ? "text-third/50" : "text-third/20"}`}
                        >
                          {s.sub}
                        </p>
                      </div>
                      {isCurrent && (
                        <div className="w-1.5 h-1.5 rounded-full bg-fourth shrink-0 shadow-[0_0_8px_rgba(0,123,255,0.5)]" />
                      )}
                    </div>
                  );
                })}
              </div>
              <div className="px-6 pb-5 pt-1">
                <p className="text-[10px] text-third/25 leading-relaxed border-t border-primary/5 pt-4 uppercase font-bold tracking-widest">
                  48-hour SLA response.
                </p>
              </div>
            </div>
          </div>

          {/* Form card */}
          <div className="flex-1 w-full ">
            <div className="border border-primary/10 rounded-2xl  backdrop-blur-sm overflow-visible">
              <div className="p-7 sm:p-10 space-y-8">
                {/* Step 0 */}
                {step === 0 && (
                  <div className="space-y-5">
                    <StepHeading
                      number="01"
                      title="Select Issue Type"
                      sub="What area do you need support with?"
                    />
                    <div className="relative">
                      <button
                        onClick={() => setDropOpen((o) => !o)}
                        className="w-full cursor-pointer flex items-center justify-between px-4 py-3.5 rounded-xl border border-primary/10 bg-primary/5 text-sm text-primary hover:border-primary/20 transition-all outline-none"
                      >
                        {selected ? (
                          <span className="flex items-center gap-2.5 text-primary font-semibold uppercase tracking-wide">
                            <selected.icon
                              size={14}
                              className="text-fourth shrink-0"
                            />
                            {selected.label}
                          </span>
                        ) : (
                          <span className="text-third/40">
                            Choose an issue type…
                          </span>
                        )}
                        <ChevronDown
                          size={14}
                          className={`text-third/40 transition-transform duration-200 shrink-0 ${dropOpen ? "rotate-180" : ""}`}
                        />
                      </button>
                      {dropOpen && (
                        <div className="absolute left-0 right-0 z-50 mt-1.5 border border-primary/10 rounded-xl shadow-2xl overflow-y-auto bg-secondary max-h-[260px] top-full">
                          {ISSUE_TYPES.map(({ value, label, icon: Icon }) => (
                            <button
                              key={value}
                              onClick={() => {
                                setIssueType(value);
                                setDropOpen(false);
                                setRelatedItem(null);
                              }}
                              className={`w-full flex items-center gap-3 px-4 py-3.5 text-sm hover:bg-primary/5 transition-colors text-left border-b border-primary/5 last:border-0 ${value === issueType ? "text-fourth bg-fourth/5" : "text-third/70"}`}
                            >
                              <Icon size={14} className="shrink-0" /> {label}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Step 1 */}
                {step === 1 && (
                  <div className="space-y-5">
                    <StepHeading
                      number="02"
                      title="Select Related Item"
                      sub={
                        isDynamicType
                          ? `Showing ${heading.toLowerCase()}`
                          : "No record link required for this issue."
                      }
                    />
                    {isDynamicType ? (
                      <div className="space-y-3">
                        <p className="text-[10px] uppercase tracking-widest text-third/35 font-bold px-1">
                          {heading}
                        </p>
                        {isLoadingItems ? (
                          <div className="space-y-3">
                            {[1, 2, 3].map((n) => (
                              <div key={n} className="flex items-center gap-4 px-4 py-4 rounded-xl border border-primary/10 bg-primary/3 animate-pulse">
                                <div className="w-9 h-9 rounded-lg bg-primary/5 shrink-0" />
                                <div className="flex-1 space-y-2">
                                  <div className="h-4 bg-primary/10 rounded w-1/3" />
                                  <div className="h-3 bg-primary/10 rounded w-1/4" />
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : items.length > 0 ? (
                          <div className="space-y-2">
                            {items.map((item) => {
                              const Icon = item.icon;
                              const isSelected = relatedItem?.id === item.id;
                              return (
                                <button
                                  key={item.id}
                                  onClick={() => setRelatedItem(item)}
                                  className={`w-full cursor-pointer flex items-center gap-4 px-4 py-4 rounded-xl border transition-all text-left group outline-none ${
                                    isSelected
                                      ? "border-fourth/40 bg-fourth/10"
                                      : "border-primary/10 bg-primary/3 hover:border-primary/20"
                                  }`}
                                >
                                  <div
                                    className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 transition-all ${isSelected ? "bg-fourth/15" : "bg-primary/5"}`}
                                  >
                                    <Icon
                                      size={14}
                                      className={
                                        isSelected
                                          ? "text-fourth"
                                          : "text-third/40"
                                      }
                                    />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <p
                                      className={`text-sm font-semibold truncate transition-colors ${isSelected ? "text-primary" : "text-third/70"}`}
                                    >
                                      {item.label}
                                    </p>
                                    <p className="text-[11px] text-third/35 mt-0.5">
                                      {item.meta}
                                    </p>
                                  </div>
                                  {isSelected && (
                                    <CheckCircle2
                                      size={15}
                                      className="text-fourth shrink-0"
                                    />
                                  )}
                                </button>
                              );
                            })}

                            {hasNextPageItems && (
                              <div className="flex justify-end mt-4">
                                <Button
                                  variant="outline"
                                  onClick={() => fetchNextPageItems()}
                                  loading={isFetchingNextPageItems}
                                  className="px-6 py-2 rounded-full text-xs font-semibold shadow-md"
                                >
                                  Load More
                                </Button>
                              </div>
                            )}
                          </div>
                        ) : (
                          <div className="flex items-start gap-3 px-4 py-4 rounded-xl border border-primary/10 bg-primary/3">
                            <AlertCircle
                              size={14}
                              className="text-third/35 mt-0.5 shrink-0"
                            />
                            <p className="text-sm text-third/50 leading-relaxed">
                              {emptyMessage}
                            </p>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="flex items-start gap-3 px-4 py-4 rounded-xl border border-primary/10 bg-primary/3">
                        <AlertCircle
                          size={14}
                          className="text-third/35 mt-0.5 shrink-0"
                        />
                        <p className="text-sm text-third/50 leading-relaxed">
                          <span className="text-third/70 font-semibold uppercase text-xs">
                            {selected?.label}
                          </span>{" "}
                          doesnt require linking. Continue to description.
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* Step 2 */}
                {step === 2 && (
                  <div className="space-y-5">
                    <StepHeading
                      number="03"
                      title="Describe the Problem"
                      sub="Be as specific as possible to help us resolve faster."
                    />
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      rows={6}
                      placeholder="Describe your issue in detail…"
                      className="w-full bg-primary/5 border border-primary/10 rounded-xl px-4 py-3.5 text-sm text-primary placeholder-third/30 resize-none focus:outline-none focus:border-fourth/40 transition-colors font-secondary"
                    />
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-third/40 mb-3 font-bold">
                        Attachments (optional)
                      </p>
                      <div className="flex  items-center gap-2 flex-wrap mb-3">
                        {[
                          { label: "Images", icon: Image },

                          { label: "Video", icon: Video },
                        ].map(({ label, icon: Icon }) => (
                          <button
                            key={label}
                            onClick={() => fileRef.current?.click()}
                            className="flex cursor-pointer items-center gap-1.5 px-3 py-2 text-xs text-third/50 border border-primary/10 rounded-lg hover:border-primary/20 hover:text-primary transition-all font-primary uppercase font-bold tracking-wider"
                          >
                            <Icon size={12} /> {label}
                          </button>
                        ))}
                        <input
                          ref={fileRef}
                          type="file"
                          multiple
                          className="hidden"
                          onChange={handleFile}
                        />
                      </div>
                      {uploads.length > 0 && (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
                          {uploads.map((file, idx) => {
                            const isImg = file.type && file.type.startsWith("image/");
                            const isVid = file.type && file.type.startsWith("video/");
                            const displayUrl = URL.createObjectURL(file);
                            const fileSize = (file.size / (1024 * 1024)).toFixed(2) + " MB";

                            return (
                              <div
                                key={idx}
                                className="relative group border border-primary/10 rounded-xl overflow-hidden bg-black/40 h-28 flex flex-col justify-between"
                              >
                                {/* Preview Media */}
                                {isImg ? (
                                  <img
                                    src={displayUrl}
                                    alt={file.name}
                                    className="w-full h-full object-cover"
                                  />
                                ) : isVid ? (
                                  <div className="w-full h-full flex items-center justify-center bg-black/60 text-white relative">
                                    <video
                                      src={displayUrl}
                                      className="w-full h-full object-cover opacity-70"
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                      <span className="bg-fourth/80 text-primary text-[10px] font-bold uppercase px-2 py-0.5 rounded">
                                        Video
                                      </span>
                                    </div>
                                  </div>
                                ) : (
                                  <div className="w-full h-full flex flex-col items-center justify-center p-2 text-center text-third">
                                    <FileIcon size={24} />
                                    <span className="text-[10px] truncate max-w-full mt-1">
                                      {file.name}
                                    </span>
                                  </div>
                                )}

                                {/* File details overlay on hover */}
                                <div className="absolute inset-0 bg-black/75 opacity-0 group-hover:opacity-100 transition duration-200 flex flex-col justify-between p-2">
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      removeUpload(idx);
                                    }}
                                    className="self-end p-1 bg-red-500 hover:bg-red-600 text-white rounded-full transition cursor-pointer"
                                  >
                                    <X size={12} />
                                  </button>
                                  <div className="text-[10px] text-white space-y-0.5">
                                    <p className="font-semibold truncate">
                                      {file.name}
                                    </p>
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

                {/* Step 3 */}
                {step === 3 && (
                  <div className="space-y-5">
                    <StepHeading
                      number="04"
                      title="Review & Submit"
                      sub="Confirm your details before submitting."
                    />
                    <div className="border border-primary/10 rounded-xl overflow-hidden bg-primary/2">
                      <SummaryRow
                        label="Issue"
                        value={selected?.label}
                        padded
                      />
                      {relatedItem && (
                        <SummaryRow
                          label="Related"
                          value={`${relatedItem.label} — ${relatedItem.meta}`}
                          padded
                          border
                        />
                      )}
                      <SummaryRow
                        label="Description"
                        value={
                          description.slice(0, 100) +
                          (description.length > 100 ? "…" : "")
                        }
                        padded
                        border
                      />
                      {uploads.length > 0 && (
                        <SummaryRow
                          label="Attachments"
                          value={`${uploads.length} file(s)`}
                          padded
                          border
                        />
                      )}
                    </div>
                    <div className="border border-primary/10 rounded-xl overflow-hidden bg-primary/5">
                      <div className="px-4 pt-4 pb-3 border-b border-primary/5 flex items-center gap-2">
                        <Timer size={13} className="text-fourth" />
                        <p className="text-xs uppercase tracking-widest text-third/50 font-bold font-primary">
                          SLA Tracker
                        </p>
                      </div>
                      <div className="px-4 py-4 space-y-2.5">
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-third/40 uppercase font-bold tracking-wider">
                            Response window
                          </span>
                          <span className="text-xs font-semibold text-primary">
                            48 Hours
                          </span>
                        </div>
                        <div className="h-1 bg-primary/10 rounded-full overflow-hidden">
                          <div className="h-full bg-fourth/20 w-0" />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Nav buttons */}
                <div className="flex items-center justify-between pt-6 border-t border-primary/5">
                  {step > 0 ? (
                    <Button
                      variant="outlineSecondary"
                      size="sm"
                      onClick={() => setStep((s) => s - 1)}
                      disabled={createMutation.isPending}
                    >
                      Previous
                    </Button>
                  ) : (
                    <div />
                  )}

                  {step < 3 ? (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setStep((s) => s + 1)}
                      disabled={
                        step === 0
                          ? !canNext0
                          : step === 1
                            ? !canNext1
                            : !canNext2
                      }
                    >
                      Continue <ArrowRight size={14} className="ml-2" />
                    </Button>
                  ) : (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleSubmit}
                      loading={createMutation.isPending}
                      disabled={createMutation.isPending}
                    >
                      Submit Ticket <ArrowRight size={14} className="ml-2" />
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
