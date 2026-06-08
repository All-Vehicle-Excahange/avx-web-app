"use client";

import { useState } from "react";
import {
  ChevronRight,
  Filter,
  Search,
  Plus,
  X,
  Clock,
  Paperclip,
} from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAllHelpTicketsQuery } from "@/queries/helpCenter.queries";
import { markHelpTicketResolved } from "@/services/helpCenter.service";
import { toast } from "react-toastify";
import Button from "@/components/ui/button";

const STATUS_CONFIG = {
  Open: {
    textClass: "text-fourth",
    bgClass: "bg-fourth/5",
    borderClass: "border-fourth/20",
    dotClass: "bg-fourth",
    pulse: false,
  },
  Resolved: {
    textClass: "text-green-500/80",
    bgClass: "bg-green-500/10",
    borderClass: "border-green-500/20",
    dotClass: "bg-green-500/60",
    pulse: false,
  },
};

const FILTERS = ["All", "Open", "Resolved"];

export default function SupportRequests({ onNewRequest }) {
  const queryClient = useQueryClient();
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTicket, setActiveTicket] = useState(null);
  const [hoveredRow, setHoveredRow] = useState(null);

  // Fetch help tickets
  const { data: ticketsResponse, isLoading } = useQuery(
    getAllHelpTicketsQuery(),
  );
  const apiTickets = ticketsResponse?.data || [];

  // Close ticket mutation
  const closeMutation = useMutation({
    mutationFn: async (ticketId) => {
      return markHelpTicketResolved(ticketId);
    },
    onSuccess: () => {
      toast.success("Ticket marked as resolved successfully!");
      queryClient.invalidateQueries({ queryKey: ["help-tickets"] });
    },
    onError: (error) => {
      console.error("Failed to close ticket:", error);
      toast.error(
        error?.response?.data?.message ||
          "Failed to close ticket. Please try again.",
      );
    },
  });

  const handleCloseTicket = (ticketId) => {
    closeMutation.mutate(ticketId);
  };

  const filtered = apiTickets.filter((t) => {
    const displayStatus = t.ticketStatus === "RESOLVED" ? "Resolved" : "Open";
    const matchFilter =
      activeFilter === "All" || displayStatus === activeFilter;
    const matchSearch =
      searchQuery === "" ||
      (t.ticketNumber &&
        t.ticketNumber.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (t.subject &&
        t.subject.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (t.category &&
        t.category.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchFilter && matchSearch;
  });

  const counts = FILTERS.reduce((acc, f) => {
    acc[f] =
      f === "All"
        ? apiTickets.length
        : apiTickets.filter((t) => {
            const displayStatus =
              t.ticketStatus === "RESOLVED" ? "Resolved" : "Open";
            return displayStatus === f;
          }).length;
    return acc;
  }, {});

  return (
    <section className="relative py-16 font-secondary text-primary">
      {/* ── HEADER ── */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <p className="text-sm tracking-[0.4em] uppercase text-third font-semibold">
              Support Center
            </p>
          </div>
          <h2
            className="
             text-3xl sm:text-4xl lg:text-5xl
              font-semibold
              leading-[1.05]
              text-primary
              font-[Montserrat]
            "
          >
            My
            <span className="text-fourth/80 font-[Montserrat]"> Requests</span>
          </h2>
        </div>
        <button
          onClick={onNewRequest}
          className="self-start sm:self-auto flex items-center gap-2 px-5 py-3 rounded-xl font-primary text-[11px] font-black uppercase tracking-[0.18em] text-secondary transition-all duration-300 hover:-translate-y-0.5 bg-primary cursor-pointer"
        >
          <Plus size={13} /> New Request
        </button>
      </div>

      {/* ── TOOLBAR ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        {/* Search */}
        <div className="relative flex-1 max-w-xs">
          <Search
            size={13}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-primary/25"
          />
          <input
            type="text"
            placeholder="Search tickets…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm outline-none transition-colors duration-200 font-secondary bg-primary/5 border border-white/10 text-primary/80"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-primary/30 hover:text-primary/60 transition-colors cursor-pointer"
            >
              <X size={12} />
            </button>
          )}
        </div>

        {/* Filter chips */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <Filter size={11} className="mr-1 text-primary/20" />
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-[0.15em] font-primary transition-all duration-200 border cursor-pointer ${activeFilter === f ? "bg-fourth/10 border-fourth/30 text-fourth" : "bg-transparent border-white/5 text-primary/35"}`}
            >
              {f}
              {counts[f] > 0 && (
                <span
                  className={`ml-1.5 text-[9px] font-black ${activeFilter === f ? "text-fourth" : "text-primary/20"}`}
                >
                  {counts[f]}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* ── TABLE CONTAINER ── */}
      <div className="border border-white/10 rounded-2xl bg-white/[0.01] backdrop-blur-md overflow-hidden">
        {/* ── TABLE HEADER (desktop) ── */}
        <div className="hidden sm:grid grid-cols-[140px_1fr_160px_120px_44px] px-6 py-4 border-b border-white/10 bg-white/[0.02]">
          {["Ticket ID", "Subject / Category", "Status", "Updated", ""].map(
            (h, i) => (
              <span
                key={i}
                className="text-[10px] uppercase tracking-[0.3em] font-black font-primary text-primary/30"
              >
                {h}
              </span>
            ),
          )}
        </div>

        {/* ── ROWS ── */}
        <div className="flex flex-col">
          {isLoading ? (
            Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="px-6 py-5 border-b border-white/5 animate-pulse flex flex-col gap-3"
              >
                <div className="flex justify-between items-center">
                  <div className="h-4 bg-white/10 rounded w-24" />
                  <div className="h-4 bg-white/10 rounded w-16" />
                </div>
                <div className="h-5 bg-white/10 rounded w-1/2" />
                <div className="h-3 bg-white/10 rounded w-1/4" />
              </div>
            ))
          ) : filtered.length === 0 ? (
            <div className="py-14 text-center text-sm text-primary/25 bg-white/[0.01]">
              No tickets found.
            </div>
          ) : (
            filtered.map((ticket) => {
              const displayStatus =
                ticket.ticketStatus === "RESOLVED" ? "Resolved" : "Open";
              const cfg = STATUS_CONFIG[displayStatus] || STATUS_CONFIG.Open;
              const isActive = activeTicket === ticket.id;
              const isHovered = hoveredRow === ticket.id;

              const timeAgo =
                ticket.updatedAt || ticket.createdAt
                  ? (() => {
                      const diffMs =
                        new Date() -
                        new Date(ticket.updatedAt || ticket.createdAt);
                      const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
                      if (diffHrs < 1) return "Just now";
                      if (diffHrs < 24) return `${diffHrs} hrs ago`;
                      const diffDays = Math.floor(diffHrs / 24);
                      return `${diffDays} days ago`;
                    })()
                  : "Recent";

              const hasVehicle = ticket.makerName || ticket.modelName;
              const vehicleText = hasVehicle
                ? `${ticket.makerName || ""} ${ticket.modelName || ""} ${ticket.variantName || ""}`.trim()
                : null;

              return (
                <div
                  key={ticket.id}
                  className={`transition-all duration-200 border-b border-white/5 last:border-b-0 ${isActive ? "bg-white/[0.02]" : isHovered ? "bg-white/[0.04]" : ""}`}
                >
                  {/* Row Trigger */}
                  <div
                    className="relative px-6 py-5 cursor-pointer select-none"
                    onMouseEnter={() => setHoveredRow(ticket.id)}
                    onMouseLeave={() => setHoveredRow(null)}
                    onClick={() => setActiveTicket(isActive ? null : ticket.id)}
                  >
                    {/* Active left indicator */}
                    {isActive && (
                      <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-fourth" />
                    )}

                    {/* Desktop grid */}
                    <div className="hidden sm:grid items-center gap-4 sm:grid-cols-[140px_1fr_160px_120px_44px]">
                      <span className="font-primary text-[11px] font-black tracking-widest text-primary/40">
                        {ticket.ticketNumber || ticket.id}
                      </span>
                      <div className="min-w-0">
                        <p
                          className={`text-sm font-semibold truncate ${isActive ? "text-primary" : "text-primary/75"}`}
                        >
                          {ticket.subject}
                        </p>
                        <p className="text-[10px] mt-1 uppercase tracking-widest font-primary text-primary/30 flex items-center gap-1.5 flex-wrap">
                          <span>{ticket.category}</span>
                          {ticket.subCategory && (
                            <>
                              <span className="text-primary/10">•</span>
                              <span>{ticket.subCategory}</span>
                            </>
                          )}
                          {ticket.priority && (
                            <span
                              className={`text-[8px] font-black uppercase px-1.5 py-0.5 rounded border leading-none ${
                                ticket.priority === "HIGH"
                                  ? "bg-red-500/15 border-red-500/30 text-red-500"
                                  : ticket.priority === "MEDIUM"
                                    ? "bg-yellow-400/15 border-yellow-400/30 text-yellow-400"
                                    : "bg-green-500/15 border-green-500/30 text-green-500"
                              }`}
                            >
                              {ticket.priority}
                            </span>
                          )}
                        </p>
                        {vehicleText && (
                          <p className="text-xs text-fourth mt-1.5 font-semibold flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-fourth" />
                            Vehicle:{" "}
                            <span className="text-primary/80 font-medium">
                              {vehicleText}
                            </span>
                          </p>
                        )}
                        {ticket.vehicleInquiryId && (
                          <p className="text-[10px] text-third/60 mt-0.5 font-medium">
                            Inquiry ID: {ticket.vehicleInquiryId}
                          </p>
                        )}
                        {ticket.vehicleInspectionRequestId && (
                          <p className="text-[10px] text-third/60 mt-0.5 font-medium">
                            Inspection ID: {ticket.vehicleInspectionRequestId}
                          </p>
                        )}
                      </div>
                      <div>
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] uppercase tracking-[0.15em] font-black font-primary border ${cfg.textClass} ${cfg.bgClass} ${cfg.borderClass}`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${cfg.pulse ? "animate-pulse" : ""} ${cfg.dotClass}`}
                          />
                          {displayStatus}
                        </span>
                      </div>
                      <span className="text-xs font-secondary flex items-center gap-1 text-primary/30">
                        <Clock size={9} /> {timeAgo}
                      </span>
                      <div className="flex justify-end">
                        <ChevronRight
                          size={14}
                          className={`transition-all duration-200 ${isActive ? "text-fourth rotate-90" : "text-primary/20"}`}
                        />
                      </div>
                    </div>

                    {/* Mobile layout */}
                    <div className="sm:hidden cursor-pointer space-y-2">
                      <div className="flex items-start justify-between gap-3">
                        <span className="font-primary text-[10px] font-black tracking-widest text-primary/40">
                          {ticket.ticketNumber || ticket.id}
                        </span>
                        <div className="flex items-center gap-1.5">
                          {ticket.priority && (
                            <span
                              className={`text-[8px] font-black uppercase px-1.5 py-0.5 rounded border leading-none ${
                                ticket.priority === "HIGH"
                                  ? "bg-red-500/15 border-red-500/30 text-red-500"
                                  : ticket.priority === "MEDIUM"
                                    ? "bg-yellow-400/15 border-yellow-400/30 text-yellow-400"
                                    : "bg-green-500/15 border-green-500/30 text-green-500"
                              }`}
                            >
                              {ticket.priority}
                            </span>
                          )}
                          <span
                            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[9px] uppercase tracking-widest font-black font-primary border ${cfg.textClass} ${cfg.bgClass} ${cfg.borderClass}`}
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${cfg.pulse ? "animate-pulse" : ""} ${cfg.dotClass}`}
                            />
                            {displayStatus}
                          </span>
                        </div>
                      </div>
                      <p className="text-sm font-semibold leading-snug text-primary/75">
                        {ticket.subject}
                      </p>
                      <p className="text-[10px] uppercase tracking-widest font-primary text-primary/30">
                        {ticket.category}{" "}
                        {ticket.subCategory ? `— ${ticket.subCategory}` : ""}
                      </p>
                      {vehicleText && (
                        <p className="text-xs text-fourth font-semibold flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-fourth" />
                          Vehicle:{" "}
                          <span className="text-primary/80 font-medium">
                            {vehicleText}
                          </span>
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Ticket Details Panel */}
                  {isActive && (
                    <div className="px-6 pb-6 bg-white/[0.01]">
                      <div className="pt-5 space-y-5 border-t border-white/5">
                        {/* Meta Details */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                          <div>
                            <h4 className="text-[10px] uppercase tracking-[0.2em] font-black font-primary text-primary/20 mb-1.5">
                              Category
                            </h4>
                            <p className="text-sm font-semibold text-primary">
                              {ticket.category}
                            </p>
                            {ticket.subCategory && (
                              <p className="text-xs text-third mt-0.5">
                                {ticket.subCategory}
                              </p>
                            )}
                          </div>

                          {ticket.priority && (
                            <div>
                              <h4 className="text-[10px] uppercase tracking-[0.2em] font-black font-primary text-primary/20 mb-1.5">
                                Priority
                              </h4>
                              <span
                                className={`inline-flex items-center text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded border ${
                                  ticket.priority === "HIGH"
                                    ? "bg-red-500/15 border-red-500/30 text-red-500"
                                    : ticket.priority === "MEDIUM"
                                      ? "bg-yellow-400/15 border-yellow-400/30 text-yellow-400"
                                      : "bg-green-500/15 border-green-500/30 text-green-500"
                                }`}
                              >
                                {ticket.priority} Priority
                              </span>
                            </div>
                          )}

                          {vehicleText && (
                            <div>
                              <h4 className="text-[10px] uppercase tracking-[0.2em] font-black font-primary text-primary/20 mb-1.5">
                                Related Vehicle
                              </h4>
                              <p className="text-sm font-bold text-fourth">
                                {vehicleText}
                              </p>
                            </div>
                          )}
                        </div>

                        {/* Description */}
                        <div>
                          <h4 className="text-xs font-semibold uppercase tracking-wider text-third/50 mb-2">
                            Description
                          </h4>
                          <p className="text-sm text-primary/80 leading-relaxed bg-primary/5 border border-white/5 p-4 rounded-xl whitespace-pre-wrap">
                            {ticket.description || "No description provided."}
                          </p>
                        </div>

                        {/* Attachments */}
                        {ticket.attachments &&
                          ticket.attachments.length > 0 && (
                            <div>
                              <h4 className="text-xs font-semibold uppercase tracking-wider text-third/50 mb-2">
                                Attachments
                              </h4>
                              <div className="flex flex-wrap gap-2">
                                {ticket.attachments.map((url, idx) => (
                                  <a
                                    key={idx}
                                    href={url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-1.5 bg-fourth/10 border border-fourth/20 text-fourth hover:bg-fourth/20 px-3 py-1.5 rounded-lg text-xs transition-colors cursor-pointer font-medium"
                                  >
                                    <Paperclip size={12} />
                                    <span className="max-w-[200px] truncate">
                                      {url.split("/").pop()}
                                    </span>
                                  </a>
                                ))}
                              </div>
                            </div>
                          )}

                        {/* Close Ticket Button */}
                        {ticket.ticketStatus !== "RESOLVED" && (
                          <div className="pt-2 flex justify-end">
                            <Button
                              variant="outlineSecondary"
                              size="sm"
                              onClick={() => handleCloseTicket(ticket.id)}
                              loading={closeMutation.isPending}
                              disabled={closeMutation.isPending}
                              className="border-red-500/50 text-red-500 hover:bg-red-500 hover:text-white"
                            >
                              Close Request
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Footer count */}
      <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/5">
        <span className="text-[10px] uppercase tracking-[0.3em] font-black font-primary text-primary/20">
          Showing {filtered.length} of {apiTickets.length} tickets
        </span>
      </div>
    </section>
  );
}
