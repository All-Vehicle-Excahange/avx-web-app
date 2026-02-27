"use client";

import { useState } from "react";
import {
  ChevronRight,
  MessageSquare,
  ArrowUpRight,
  Filter,
  Search,
  Send,
} from "lucide-react";

const STATUS_CONFIG = {
  Open: {
    color: "text-primary/60",
    bg: "bg-primary/5",
    border: "border-primary/10",
    dot: "bg-primary/40",
  },
  "In Progress": {
    color: "text-fourth",
    bg: "bg-fourth/10",
    border: "border-fourth/20",
    dot: "bg-fourth",
  },
  Escalated: {
    color: "text-warning",
    bg: "bg-warning/10",
    border: "border-warning/20",
    dot: "bg-warning",
  },
  Resolved: {
    color: "text-third/70",
    bg: "bg-third/5",
    border: "border-third/10",
    dot: "bg-third/50",
  },
  Closed: {
    color: "text-third/40",
    bg: "bg-primary/3",
    border: "border-primary/5",
    dot: "bg-third/25",
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
    <section className="relative py-10  overflow-hidden font-secondary text-primary flex flex-col justify-center bg-transparent">
      {/* Ambient Glow */}
      <div className="absolute inset-0 pointer-events-none " />

      <div className=" mx-auto w-full relative">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-10">
          <div>
            <p className="text-sm tracking-[0.4em] uppercase text-third/60 font-semibold mb-1 font-primary">
              Support Center
            </p>
            <h2 className="font-primary text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight leading-none text-primary">
              My <span className="text-fourth">Requests</span>
            </h2>
          </div>
          <button
            onClick={onNewRequest}
            className="self-start sm:self-auto flex items-center gap-2 px-4 py-2.5 rounded-xl font-primary text-xs font-bold uppercase tracking-[0.18em] bg-fourth text-primary shadow-[0_8px_30px_rgba(0,123,255,0.2)] hover:opacity-90 transition-all duration-300"
          >
            New Request <ArrowUpRight size={13} />
          </button>
        </div>

        {/* Panel */}
        <div className="relative border border-primary/10 rounded-2xl sm:rounded-3xl overflow-hidden ">
          {" "}
          {/* Top Top Edge highlight */}
          <div className="absolute top-0 left-0 right-0 h-px " />
          {/* Toolbar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-6 sm:px-8 py-5 border-b border-primary/5">
            <div className="relative flex-1 max-w-xs">
              <Search
                size={13}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-third/30"
              />
              <input
                type="text"
                placeholder="Search tickets..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-4 py-2 rounded-xl text-sm bg-primary/5 border border-primary/10 text-primary placeholder-third/30 outline-none focus:border-fourth/40 transition-colors duration-200"
              />
            </div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <Filter size={11} className="text-third/30 mr-1" />
              {FILTERS.map((f) => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-[0.15em] transition-all duration-200 border ${
                    activeFilter === f
                      ? "bg-fourth/15 text-fourth border-fourth/25"
                      : "text-third/40 hover:text-third/70 border-transparent"
                  }`}
                >
                  {f}
                  {counts[f] > 0 && (
                    <span
                      className={`ml-1.5 text-[10px] font-black ${activeFilter === f ? "text-fourth/70" : "text-third/25"}`}
                    >
                      {counts[f]}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
          {/* Table header */}
          <div
            className="hidden sm:grid px-6 sm:px-8 py-3 border-b border-primary/5"
            style={{ gridTemplateColumns: "140px 1fr 150px 130px 44px" }}
          >
            {[
              "Ticket ID",
              "Subject / Category",
              "Status",
              "Last Updated",
              "",
            ].map((h, i) => (
              <span
                key={i}
                className="text-[12px] uppercase tracking-[0.3em] font-bold text-third/30 font-primary"
              >
                {h}
              </span>
            ))}
          </div>
          {/* Rows */}
          <div className="divide-y divide-primary/5">
            {filtered.length === 0 && (
              <div className="px-8 py-14 text-center text-third/30 text-sm">
                No tickets found.
              </div>
            )}
            {filtered.map((ticket) => {
              const cfg = STATUS_CONFIG[ticket.status];
              const isActive = activeTicket === ticket.id;
              const isHovered = hoveredRow === ticket.id;

              return (
                <div key={ticket.id}>
                  <div
                    className={`relative px-6 sm:px-8 py-4 sm:py-5 cursor-pointer transition-all duration-200 ${
                      isActive
                        ? "bg-fourth/5"
                        : isHovered
                          ? "bg-primary/5"
                          : "bg-transparent"
                    }`}
                    onMouseEnter={() => setHoveredRow(ticket.id)}
                    onMouseLeave={() => setHoveredRow(null)}
                    onClick={() => setActiveTicket(isActive ? null : ticket.id)}
                  >
                    {isActive && (
                      <div className="absolute left-0 top-3 bottom-3 w-0.5 rounded-full bg-fourth" />
                    )}

                    {/* Desktop */}
                    <div
                      className="hidden sm:grid items-center gap-4"
                      style={{
                        gridTemplateColumns: "140px 1fr 150px 130px 44px",
                      }}
                    >
                      <span className="font-primary text-xs font-black text-third/50 tracking-widest">
                        {ticket.id}
                      </span>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-primary/80 truncate">
                          {ticket.subject}
                        </p>
                        <p className="text-xs text-third/35 mt-0.5 uppercase tracking-widest font-primary">
                          {ticket.category}
                        </p>
                      </div>
                      <div>
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs uppercase tracking-[0.15em] font-bold border ${cfg.color} ${cfg.bg} ${cfg.border}`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${cfg.dot} ${ticket.status === "In Progress" ? "animate-pulse" : ""}`}
                          />
                          {ticket.status}
                        </span>
                      </div>
                      <span className="text-xs text-third/35 font-secondary">
                        {ticket.updated}
                      </span>
                      <div className="flex justify-end">
                        <ChevronRight
                          size={14}
                          className={`text-third/25 transition-all duration-200 ${isActive ? "rotate-90 text-fourth/60" : isHovered ? "text-third/50 translate-x-0.5" : ""}`}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Thread */}
                  {isActive && (
                    <div className="px-6 sm:px-8 pb-6 border-t border-fourth/10 bg-secondary/40">
                      <div className="pt-4 flex items-center justify-center gap-2 mb-5">
                        <MessageSquare size={13} className="text-fourth/60" />
                        <span className="text-xs uppercase tracking-[0.3em] font-bold text-third/35 font-primary">
                          Conversation Thread · {ticket.messages.length}{" "}
                          messages
                        </span>
                      </div>

                      <div className="flex flex-col gap-4">
                        {ticket.messages.map((msg, mi) => (
                          <div
                            key={mi}
                            className={`flex flex-col gap-1 ${msg.mine ? "items-end" : "items-start"}`}
                          >
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-bold text-third/40 uppercase tracking-wider font-primary">
                                {msg.from}
                              </span>
                              <span className="text-xs text-third/25">
                                {msg.time}
                              </span>
                            </div>
                            <div
                              className={`px-4 py-2.5 rounded-xl text-sm text-primary/80 max-w-md leading-relaxed border ${
                                msg.mine
                                  ? "bg-fourth/15 border-fourth/20"
                                  : "bg-primary/5 border-primary/10"
                              }`}
                            >
                              {msg.text}
                            </div>
                          </div>
                        ))}
                      </div>

                      {ticket.status !== "Closed" ? (
                        <div className="mt-5 flex items-center justify-center gap-2">
                          <input
                            type="text"
                            placeholder="Write a reply..."
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
                            className="flex-1 px-4 py-2.5 rounded-xl text-sm bg-primary/5 border border-primary/10 text-primary placeholder-third/25 outline-none focus:border-fourth/40 transition-colors duration-200"
                          />
                          <button
                            onClick={() => handleSend(ticket.id)}
                            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest bg-fourth text-primary shadow-[0_4px_16px_rgba(0,123,255,0.2)] hover:opacity-90 font-primary"
                          >
                            <Send size={13} /> Send
                          </button>
                        </div>
                      ) : (
                        <p className="mt-4 text-xs text-third/30 uppercase tracking-[0.2em] font-bold text-center font-primary">
                          This ticket is closed. Open a new request to continue.
                        </p>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          {/* Footer */}
          <div className="px-6 sm:px-8 py-4 flex items-center justify-between border-t border-primary/5">
            <span className="text-xs uppercase tracking-[0.3em] text-third/25 font-semibold font-primary">
              Showing {filtered.length} of {tickets.length} tickets
            </span>
            <button className="w-7 h-7 rounded-lg text-xs font-bold bg-fourth/15 text-fourth border border-fourth/25 font-primary">
              1
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
