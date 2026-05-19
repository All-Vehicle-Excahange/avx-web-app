"use client";

import React, { useState } from "react";
import HelpCenterHome from "./help-center/HelpCenterHome";
import HelpArticleView from "./help-center/HelpArticleView";
import CreateTicket from "./help-center/CreateTicket";
import MyTickets from "./help-center/MyTickets";
import TicketDetail from "./help-center/TicketDetail";
import { ARTICLES, INITIAL_TICKETS } from "./help-center/mockData";
import { BookOpen, Inbox, PlusCircle } from "lucide-react";

export default function HelpCenter() {
  const [view, setView] = useState("home"); // 'home' | 'article' | 'create' | 'my-tickets' | 'detail'
  const [tickets, setTickets] = useState(INITIAL_TICKETS);
  const [selectedArticle, setSelectedArticle] = useState(ARTICLES[4]); // Default to ranking article
  const [selectedTicketId, setSelectedTicketId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const activeTicket = tickets.find((t) => t.id === selectedTicketId);

  // Tab navigation helpers
  const isBrowseActive = view === "home" || view === "article";
  const isTicketsActive = view === "my-tickets" || view === "detail";
  const isCreateActive = view === "create";

  return (
    <section className="w-full space-y-6 max-w-full mx-auto pb-12">
      {/* Sub-navigation Tabs */}
      <div className="flex border-b border-third/15 gap-4 sm:gap-6 overflow-x-auto no-scrollbar">
        <button
          onClick={() => setView("home")}
          className={`flex cursor-pointer items-center gap-2 pb-3 text-xs sm:text-sm font-semibold border-b-2 transition-all whitespace-nowrap ${
            isBrowseActive
              ? "border-primary text-primary"
              : "border-transparent text-third hover:text-primary"
          }`}
        >
          <BookOpen size={16} /> Browse Help & FAQs
        </button>

        <button
          onClick={() => setView("my-tickets")}
          className={`flex cursor-pointer items-center gap-2 pb-3 text-xs sm:text-sm font-semibold border-b-2 transition-all whitespace-nowrap ${
            isTicketsActive
              ? "border-primary text-primary"
              : "border-transparent text-third hover:text-primary"
          }`}
        >
          <Inbox size={16} /> My Tickets
          {/* {tickets.filter(t => t.status === "Open" || t.status === "Awaiting Reply").length > 0 && (
            <span className="w-2 h-2 rounded-full bg-primary inline-block" />
          )} */}
        </button>

        <button
          onClick={() => setView("create")}
          className={`flex cursor-pointer items-center gap-2 pb-3 text-xs sm:text-sm font-semibold border-b-2 transition-all whitespace-nowrap ${
            isCreateActive
              ? "border-primary text-primary"
              : "border-transparent text-third hover:text-primary"
          }`}
        >
          <PlusCircle size={16} /> New Support Ticket
        </button>
      </div>

      {/* Main View Container */}
      <div className="min-h-[450px]">
        {view === "home" && (
          <HelpCenterHome
            articles={ARTICLES}
            tickets={tickets}
            onNavigate={setView}
            onSelectArticle={setSelectedArticle}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        )}

        {view === "article" && (
          <HelpArticleView
            article={selectedArticle}
            articles={ARTICLES}
            onNavigate={setView}
            onSelectArticle={setSelectedArticle}
          />
        )}

        {view === "create" && (
          <CreateTicket
            onNavigate={setView}
            onCreateTicket={(newTicket) => {
              setTickets((prev) => [newTicket, ...prev]);
              setView("my-tickets");
            }}
          />
        )}

        {view === "my-tickets" && (
          <MyTickets
            tickets={tickets}
            onNavigate={setView}
            onSelectTicket={setSelectedTicketId}
          />
        )}

        {view === "detail" && (
          <TicketDetail
            ticket={activeTicket}
            onNavigate={setView}
            onAddReply={(ticketId, replyMessage) => {
              setTickets((prev) =>
                prev.map((t) =>
                  t.id === ticketId
                    ? {
                        ...t,
                        messages: [...t.messages, replyMessage],
                        lastUpdated: "Just now",
                        status: replyMessage.sender === "admin" ? "In Progress" : "Awaiting Reply"
                      }
                    : t
                )
              );
            }}
            onCloseTicket={(ticketId) => {
              setTickets((prev) =>
                prev.map((t) =>
                  t.id === ticketId
                    ? {
                        ...t,
                        status: "Resolved",
                        lastUpdated: "Just now"
                      }
                    : t
                )
              );
            }}
          />
        )}
      </div>
    </section>
  );
}