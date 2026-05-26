"use client";

import React, { useState } from "react";
import HelpCenterHome from "./help-center/HelpCenterHome";
import HelpArticleView from "./help-center/HelpArticleView";
import CreateTicket from "./help-center/CreateTicket";
import MyTickets from "./help-center/MyTickets";
import TicketDetail from "./help-center/TicketDetail";
import { ARTICLES } from "./help-center/mockData";
import { BookOpen, Inbox } from "lucide-react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getAllHelpTicketsQuery } from "@/queries/helpCenter.queries";
import { markHelpTicketResolved } from "@/services/helpCenter.service";
import { toast } from "react-toastify";

export default function HelpCenter() {
  const [view, setView] = useState("home"); // 'home' | 'article' | 'create' | 'my-tickets' | 'detail'
  const [selectedArticle, setSelectedArticle] = useState(ARTICLES[4]); // Default to ranking article
  const [selectedTicketId, setSelectedTicketId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [page, setPage] = useState(1);

  // Map UI filter to API ticketStatus parameter
  const getApiStatus = (filter) => {
    if (filter === "Open" || filter === "In Progress") return "OPEN";
    if (filter === "Resolved") return "RESOLVED";
    return null;
  };

  const { data: ticketsResponse, isLoading: isLoadingTickets, refetch: refetchTickets } = useQuery(
    getAllHelpTicketsQuery({
      pageNo: page,
      size: 10,
      ticketStatus: getApiStatus(activeFilter),
    })
  );

  const resolveMutation = useMutation({
    mutationFn: async (ticketId) => {
      return markHelpTicketResolved(ticketId);
    },
    onSuccess: () => {
      toast.success("Ticket marked as resolved successfully!");
      refetchTickets();
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || "Failed to mark ticket as resolved.");
      console.error(err);
    }
  });

  const rawTickets = ticketsResponse?.data || [];
  
  // Map raw API tickets to UI-compatible ticket objects
  const tickets = rawTickets.map((t) => {
    const priorityFormatted = t.priority
      ? t.priority.charAt(0).toUpperCase() + t.priority.slice(1).toLowerCase()
      : "Low";
      
    const statusFormatted = t.ticketStatus === "OPEN" ? "Open" : "Resolved";

    let relatedVehicle = "None";
    if (t.makerName || t.modelName) {
      relatedVehicle = `${t.makerName || ""} ${t.modelName || ""} ${t.variantName || ""}`.trim();
    } else if (t.vehicleId) {
      relatedVehicle = `Listing #${t.vehicleId}`;
    }

    return {
      id: t.id,
      ticketNumber: t.ticketNumber,
      subject: t.subject,
      category: t.category,
      subCategory: t.subCategory,
      priority: priorityFormatted,
      status: statusFormatted,
      lastUpdated: "Recently",
      createdDate: t.createdAt 
        ? new Date(t.createdAt).toLocaleString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
            hour: "numeric",
            minute: "2-digit",
            hour12: true
          })
        : "Just now",
      assignedTo: "Support Team",
      relatedVehicle,
      description: t.description,
      attachments: t.attachments || [],
      messages: [
        {
          sender: "user",
          senderName: "You",
          text: t.description,
          time: t.createdAt 
            ? new Date(t.createdAt).toLocaleString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
                hour: "numeric",
                minute: "2-digit",
                hour12: true
              })
            : "Just now",
          attachments: t.attachments || []
        }
      ]
    };
  });

  const activeTicket = tickets.find((t) => t.id === selectedTicketId);

  // Tab navigation helpers
  const isBrowseActive = view === "home" || view === "article";
  const isTicketsActive = view === "my-tickets" || view === "detail";

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
            onCreateTicket={() => {
              refetchTickets();
              setView("my-tickets");
            }}
          />
        )}

        {view === "my-tickets" && (
          <MyTickets
            tickets={tickets}
            onNavigate={setView}
            onSelectTicket={setSelectedTicketId}
            currentPage={page}
            totalPages={ticketsResponse?.pageResponse?.totalPages || 1}
            onPageChange={setPage}
            activeFilter={activeFilter}
            setActiveFilter={setActiveFilter}
            totalCount={ticketsResponse?.pageResponse?.totalElements || 0}
            isLoading={isLoadingTickets}
          />
        )}

        {view === "detail" && (
          <TicketDetail
            ticket={activeTicket}
            onNavigate={setView}
            onCloseTicket={(ticketId) => {
              resolveMutation.mutate(ticketId);
            }}
          />
        )}
      </div>
    </section>
  );
}