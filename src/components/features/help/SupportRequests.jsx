"use client";

import { useState } from "react";
import {
  ChevronRight,
  MessageSquare,
  ArrowUpRight,
  Filter,
  Search,
  Send,
  Plus,
  X,
  Clock,
} from "lucide-react";

const STATUS_CONFIG = {
  Open: {
    textClass: "text-primary",
    bgClass: "bg-primary/5",
    borderClass: "border-white/10",
    dotClass: "bg-primary",
    pulse: false,
  },
  "In Progress": {
    textClass: "text-fourth",
    bgClass: "bg-fourth/10",
    borderClass: "border-fourth/25",
    dotClass: "bg-fourth",
    pulse: true,
  },
  Escalated: {
    textClass: "text-[#f59e0b]",
    bgClass: "bg-[#f59e0b]/10",
    borderClass: "border-[#f59e0b]/25",
    dotClass: "bg-[#f59e0b]",
    pulse: true,
  },
  Resolved: {
    textClass: "text-primary/50",
    bgClass: "bg-primary/10",
    borderClass: "border-white/20",
    dotClass: "bg-primary/40",
    pulse: false,
  },
  Closed: {
    textClass: "text-primary/25",
    bgClass: "bg-primary/5",
    borderClass: "border-white/10",
    dotClass: "bg-primary/20",
    pulse: false,
  },
};

const FILTERS = [
  "All",
  "Open",
  "In Progress",
  "Escalated",
  "Resolved",
  "Closed",
];

export default function SupportRequests({
  tickets = [],
  setTickets,
  onNewRequest,
}) {
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTicket, setActiveTicket] = useState(null);
  const [hoveredRow, setHoveredRow] = useState(null);
  const [replyText, setReplyText] = useState({});

  const filtered = tickets.filter((t) => {
    const matchFilter = activeFilter === "All" || t.status === activeFilter;
    const matchSearch =
      searchQuery === "" ||
      t.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchFilter && matchSearch;
  });

  const counts = FILTERS.reduce((acc, f) => {
    acc[f] =
      f === "All"
        ? tickets.length
        : tickets.filter((t) => t.status === f).length;
    return acc;
  }, {});

  const handleSend = (ticketId) => {
    const text = (replyText[ticketId] || "").trim();
    if (!text) return;
    setTickets((prev) =>
      prev.map((t) =>
        t.id === ticketId
          ? {
            ...t,
            updated: "Just now",
            messages: [
              ...t.messages,
              { from: "You", time: "Just now", text, mine: true },
            ],
          }
          : t,
      ),
    );
    setReplyText((prev) => ({ ...prev, [ticketId]: "" }));
  };

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
            <span className="text-fourth/80"> Requests
            </span>
          </h2>
        </div>
        <button
          onClick={onNewRequest}
          className="self-start sm:self-auto flex items-center gap-2 px-5 py-3 rounded-xl font-primary text-[11px] font-black uppercase tracking-[0.18em] text-secondary transition-all duration-300 hover:-translate-y-0.5 
          bg-primary
          "
        >
          <Plus size={13} /> New Request
        </button>
      </div>

      {/* ── TOOLBAR ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
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
              className="absolute right-3 top-1/2 -translate-y-1/2 text-primary/30 hover:text-primary/60 transition-colors"
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
              className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-[0.15em] font-primary transition-all duration-200 border ${activeFilter === f ? "bg-fourth/10 border-fourth/30 text-fourth" : "bg-transparent border-white/5 text-primary/35"}`}
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

      {/* ── TABLE HEADER (desktop) ── */}
      <div className="hidden sm:grid grid-cols-[140px_1fr_160px_120px_44px] px-5 py-3 mb-1 rounded-xl bg-primary/5 border border-white/5">
        {["Ticket ID", "Subject / Category", "Status", "Updated", ""].map(
          (h, i) => (
            <span
              key={i}
              className="text-[10px] uppercase tracking-[0.3em] font-black font-primary text-primary/20"
            >
              {h}
            </span>
          ),
        )}
      </div>

      {/* ── ROWS ── */}
      <div className="flex flex-col gap-1">
        {filtered.length === 0 && (
          <div className="py-14 text-center text-sm text-primary/20">
            No tickets found.
          </div>
        )}

        {filtered.map((ticket) => {
          const cfg = STATUS_CONFIG[ticket.status];
          const isActive = activeTicket === ticket.id;
          const isHovered = hoveredRow === ticket.id;

          return (
            <div
              key={ticket.id}
              className={`rounded-2xl overflow-hidden transition-all duration-200 border ${isActive ? "border-white/10 bg-transparent" : isHovered ? "border-white/10 bg-primary/10" : "border-white/5 bg-primary/5"}`}
            >
              {/* Row */}
              <div
                className="relative px-5 py-4 sm:py-5 cursor-pointer"
                onMouseEnter={() => setHoveredRow(ticket.id)}
                onMouseLeave={() => setHoveredRow(null)}
                onClick={() => setActiveTicket(isActive ? null : ticket.id)}
              >
                {/* Active left bar */}
                {isActive && (
                  <div className="absolute left-0 top-3 bottom-3 w-[2.5px] rounded-full bg-third" />
                )}

                {/* Desktop grid */}
                <div className="hidden sm:grid items-center gap-4 sm:grid-cols-[140px_1fr_160px_120px_44px]">
                  <span className="font-primary text-[11px] font-black tracking-widest text-primary/35">
                    {ticket.id}
                  </span>
                  <div className="min-w-0">
                    <p
                      className={`text-sm font-semibold truncate ${isActive ? 'text-primary' : 'text-primary/65'}`}
                    >
                      {ticket.subject}
                    </p>
                    <p className="text-[10px] mt-0.5 uppercase tracking-widest font-primary text-primary/20">
                      {ticket.category}
                    </p>
                  </div>
                  <div>
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] uppercase tracking-[0.15em] font-black font-primary border ${cfg.textClass} ${cfg.bgClass} ${cfg.borderClass}`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${cfg.pulse ? "animate-pulse" : ""} ${cfg.dotClass}`}
                      />
                      {ticket.status}
                    </span>
                  </div>
                  <span className="text-xs font-secondary flex items-center gap-1 text-primary/25">
                    <Clock size={9} /> {ticket.updated}
                  </span>
                  <div className="flex justify-end">
                    <ChevronRight
                      size={14}
                      className={`transition-all duration-200 ${isActive ? "text-fourth rotate-90" : "text-primary/20"}`}
                    />
                  </div>
                </div>

                {/* Mobile layout */}
                <div className="sm:hidden">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <span className="font-primary text-[10px] font-black tracking-widest text-primary/30">
                      {ticket.id}
                    </span>
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[9px] uppercase tracking-widest font-black font-primary border ${cfg.textClass} ${cfg.bgClass} ${cfg.borderClass}`}
                    >
                      <span
                        className={`w-1 h-1 rounded-full ${cfg.pulse ? 'animate-pulse' : ''} ${cfg.dotClass}`}
                      />
                      {ticket.status}
                    </span>
                  </div>
                  <p className="text-sm font-semibold leading-snug text-primary/70">
                    {ticket.subject}
                  </p>
                  <p className="text-[10px] mt-1 uppercase tracking-widest font-primary text-primary/20">
                    {ticket.category}
                  </p>
                </div>
              </div>

              {/* Thread */}
              {isActive && (
                <div className="px-5 pb-6 border-t border-fourth/20">
                  <div className="pt-5 flex items-center justify-center gap-2 mb-5">
                    <MessageSquare size={12} className="text-fourth/50" />
                    <span className="text-[10px] uppercase tracking-[0.3em] font-black font-primary text-primary/20">
                      Conversation Thread · {ticket.messages.length} messages
                    </span>
                  </div>

                  <div className="flex flex-col gap-4">
                    {ticket.messages.map((msg, mi) => (
                      <div
                        key={mi}
                        className={`flex flex-col gap-1 ${msg.mine ? "items-end" : "items-start"}`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-black uppercase tracking-wider font-primary text-primary/30">
                            {msg.from}
                          </span>
                          <span className="text-[10px] text-primary/15">
                            {msg.time}
                          </span>
                        </div>
                        <div
                          className={`px-4 py-2.5 rounded-xl text-sm max-w-md leading-relaxed border ${msg.mine ? 'bg-fourth/10 border-fourth/20' : 'bg-primary/5 border-white/6'} text-primary/75`}
                        >
                          {msg.text}
                        </div>
                      </div>
                    ))}
                  </div>

                  {ticket.status !== "Closed" ? (
                    <div className="mt-5 flex flex-wrap items-center gap-2">
                      <input
                        type="text"
                        placeholder="Write a reply…"
                        value={replyText[ticket.id] || ""}
                        onChange={(e) =>
                          setReplyText((prev) => ({
                            ...prev,
                            [ticket.id]: e.target.value,
                          }))
                        }
                        onKeyDown={(e) => {
                          if (e.key === "Enter") handleSend(ticket.id);
                        }}
                        className="flex-1 min-w-0 px-4 py-2.5 rounded-xl text-sm outline-none transition-colors duration-200 font-secondary bg-primary/5 border border-white/10 text-primary/80"
                      />
                      <button
                        onClick={() => handleSend(ticket.id)}
                        className="flex items-center gap-2 whitespace-nowrap px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest font-primary text-secondary transition-all duration-200 bg-fourth hover:opacity-90 shadow-[0_4px_16px_rgba(0,123,255,0.25)]"
                      >
                        <Send size={12} /> Send
                      </button>
                    </div>
                  ) : (
                    <p className="mt-4 text-[10px] uppercase tracking-[0.2em] font-black text-center font-primary text-primary/20">
                      This ticket is closed. Open a new request to continue.
                    </p>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer count */}
      <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/5">
        <span className="text-[10px] uppercase tracking-[0.3em] font-black font-primary text-primary/20">
          Showing {filtered.length} of {tickets.length} tickets
        </span>
        <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest font-primary text-fourth hover:gap-3 transition-all duration-200">
          View All <ArrowUpRight size={10} />
        </button>
      </div>
    </section>
  );
}
