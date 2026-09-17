"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import InquiryCard from "@/components/ui/InquiryCard";
import CallLeadCard from "@/components/features/consult/details/dashboard/components/CallLeadCard";
import Button from "@/components/ui/button";
import { InquiryCardSkeleton } from "@/components/ui/skeleton";
import CallLeadCardSkeleton from "@/components/features/consult/details/dashboard/components/CallLeadCardSkeleton";
import { PhoneIncoming } from "lucide-react";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { getInquiriesInfiniteQuery } from "@/queries/inquiry.queries";
import { getReceivedCallLeadsInfiniteQuery } from "@/queries/vehicle.queries";

function Inquiries() {
  const queryClient = useQueryClient();

  // Top sub-tab: "inquiries" | "call_leads"
  const [subTab, setSubTab] = useState("inquiries");

  // ─── INQUIRIES STATE ────────────────────────────────────────────────────────
  const [activeType, setActiveType] = useState("all");

  const inquiryStatusFilter =
    activeType === "all"
      ? undefined
      : activeType === "closed"
        ? "CLOSED_BY_INQUIRER"
        : activeType.toUpperCase();

  const {
    data: inquiriesInfiniteData,
    fetchNextPage,
    hasNextPage,
    isLoading: isInquiriesLoading,
    isFetchingNextPage,
  } = useInfiniteQuery({
    ...getInquiriesInfiniteQuery({
      inquiryStatus: inquiryStatusFilter,
      pageSize: 6,
    }),
    staleTime: 15 * 60 * 1000,
  });

  const inquiries =
    inquiriesInfiniteData?.pages?.flatMap((page) => page?.data || []) || [];

  const totalInquiries =
    inquiriesInfiniteData?.pages?.[0]?.pageResponse?.totalElements ??
    inquiriesInfiniteData?.pages?.[0]?.totalElements ??
    inquiries.length;

  const inquiryTypes = [
    { id: "all", label: "All" },
    { id: "pending", label: "Pending" },
    { id: "approved", label: "Approved" },
    { id: "closed", label: "Closed" },
    { id: "rejected", label: "Rejected" },
  ];

  const handleUpdateStatus = () => {
    queryClient.invalidateQueries({ queryKey: ["inquiries-infinite"] });
  };

  // ─── CALL LEADS STATE ──────────────────────────────────────────────────────
  const [callStatusFilter, setCallStatusFilter] = useState("all"); // "all" | "pending" | "completed"

  const callCompletedByOwnerParam =
    callStatusFilter === "pending"
      ? false
      : callStatusFilter === "completed"
        ? true
        : undefined;

  const {
    data: callLeadsInfiniteData,
    isLoading: isCallLeadsLoading,
    fetchNextPage: fetchNextCallLeads,
    hasNextPage: hasNextCallLeads,
    isFetchingNextPage: isFetchingNextCallLeads,
  } = useInfiniteQuery(
    getReceivedCallLeadsInfiniteQuery({
      size: 10,
      sortBy: "updatedAt",
      direction: "desc",
      callCompletedByOwner: callCompletedByOwnerParam,
    })
  );

  const callLeads =
    callLeadsInfiniteData?.pages.flatMap((page) => page.data || []) || [];

  const callStatusTabs = [
    { id: "all", label: "All Leads" },
    { id: "pending", label: "Pending Call" },
    { id: "completed", label: "Completed" },
  ];

  return (
    <section className="w-full rounded-2xl py-6 px-2 sm:px-0 space-y-6">
      {/* TOP SUB-NAVIGATION TABS */}
      <div className="flex items-center justify-between border-b border-third/20 pb-0">
        <div className="flex items-center gap-6 sm:gap-8 overflow-x-auto no-scrollbar">
          <button
            type="button"
            onClick={() => setSubTab("inquiries")}
            className={`cursor-pointer pb-2 text-sm sm:text-base font-semibold border-b-2 transition-all whitespace-nowrap ${subTab === "inquiries"
              ? "border-primary text-primary"
              : "border-transparent text-third hover:text-primary"
              }`}
          >
            Inquiries
          </button>

          <button
            type="button"
            onClick={() => setSubTab("call_leads")}
            className={`cursor-pointer pb-2 text-sm sm:text-base font-semibold border-b-2 transition-all whitespace-nowrap ${subTab === "call_leads"
              ? "border-primary text-primary"
              : "border-transparent text-third hover:text-primary"
              }`}
          >
            Call Leads
          </button>
        </div>
      </div>

      {/* ────────────────────────────────────────────────────────────────────────── */}
      {/* SUB-TAB 1: INQUIRIES                                                       */}
      {/* ────────────────────────────────────────────────────────────────────────── */}
      {subTab === "inquiries" && (
        <div className="space-y-6">
          {/* FILTER */}
          <div className="flex overflow-x-auto no-scrollbar gap-2 pb-2 flex-nowrap sm:flex-wrap">
            {inquiryTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setActiveType(type.id)}
                className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium border transition whitespace-nowrap cursor-pointer ${activeType === type.id
                  ? "bg-primary text-secondary border-primary"
                  : "border-third/50 text-primary hover:bg-third/20"
                  }`}
              >
                {type.label}
              </button>
            ))}
          </div>

          {/* INQUIRIES LIST */}
          <div className="grid grid-cols-1 gap-6">
            {isInquiriesLoading && inquiries.length === 0 ? (
              Array.from({ length: 3 }).map((_, i) => (
                <InquiryCardSkeleton key={i} />
              ))
            ) : inquiries?.length > 0 ? (
              <>
                {inquiries.map((inq) => (
                  <InquiryCard
                    key={inq.id}
                    inquiry={inq}
                    onStatusChange={handleUpdateStatus}
                  />
                ))}

                {hasNextPage && (
                  <div className="flex justify-end mt-4">
                    <Button
                      variant="outline"
                      onClick={() => fetchNextPage()}
                      loading={isFetchingNextPage}
                      className="px-6 py-2 rounded-full text-sm font-semibold shadow-md"
                    >
                      {isFetchingNextPage ? "Loading..." : "View More"}
                    </Button>
                  </div>
                )}
              </>
            ) : (
              <div className="flex flex-col items-center justify-center py-8 sm:py-15 text-center w-full">
                {activeType === "all" ? (
                  <>
                    <div className="relative w-32 h-32 mb-2 opacity-60">
                      <Image
                        src="/empty2.svg"
                        alt="Empty State"
                        fill
                        className="object-contain"
                      />
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-primary">
                      No inquiries yet.
                    </h3>
                    <p className="text-third mb-6 max-w-sm px-4">
                      Once buyers show interest in your vehicle,
                      <br />
                      their requests will appear here.
                    </p>
                    <p className="text-sm text-third/70 max-w-sm font-medium px-4">
                      Tip:
                      <br />
                      Listings with more photos receive 3x more inquiries.
                    </p>
                  </>
                ) : (
                  <>
                    <div className="relative w-32 h-32 mb-2 opacity-60">
                      <Image
                        src="/empty2.svg"
                        alt="Empty State"
                        fill
                        className="object-contain"
                      />
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-primary">
                      No {activeType.replace(/_/g, " ").toLowerCase()} inquiries
                      found.
                    </h3>
                    <p className="text-third max-w-sm px-4">
                      There are currently no inquiries with this status.
                    </p>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ────────────────────────────────────────────────────────────────────────── */}
      {/* SUB-TAB 2: CALL LEADS                                                      */}
      {/* ────────────────────────────────────────────────────────────────────────── */}
      {subTab === "call_leads" && (
        <div className="space-y-6">
          {/* FILTER */}
          <div className="flex overflow-x-auto no-scrollbar gap-2 pb-2 flex-nowrap sm:flex-wrap">
            {callStatusTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setCallStatusFilter(tab.id)}
                className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium border transition whitespace-nowrap cursor-pointer ${callStatusFilter === tab.id
                  ? "bg-primary text-secondary border-primary"
                  : "border-third/50 text-primary hover:bg-third/20"
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* CALL LEADS LIST */}
          <div className="grid grid-cols-1 gap-6">
            {isCallLeadsLoading && callLeads.length === 0 ? (
              <>
                <CallLeadCardSkeleton />
                <CallLeadCardSkeleton />
                <CallLeadCardSkeleton />
              </>
            ) : callLeads.length > 0 ? (
              <>
                {callLeads.map((lead) => (
                  <CallLeadCard key={lead.id} lead={lead} />
                ))}

                {hasNextCallLeads && (
                  <div className="flex justify-end mt-4">
                    <Button
                      variant="outline"
                      onClick={() => fetchNextCallLeads()}
                      disabled={isFetchingNextCallLeads}
                      className="px-6 py-2 rounded-full text-sm font-semibold shadow-md"
                    >
                      {isFetchingNextCallLeads
                        ? "Loading..."
                        : "Load More"}
                    </Button>
                  </div>
                )}
              </>
            ) : (
              <div className="rounded-xl border border-dashed border-third/30 p-10 text-center space-y-3 shadow-sm transition-colors duration-200 hover:border-third/40">
                {callStatusFilter === "pending" && (
                  <>
                    <p className="text-lg font-semibold text-primary">
                      No pending call leads
                    </p>
                    <p className="text-sm text-third">
                      Great job! You have responded to all received call leads.
                    </p>
                  </>
                )}

                {callStatusFilter === "completed" && (
                  <>
                    <p className="text-lg font-semibold text-primary">
                      No completed call leads yet
                    </p>
                    <p className="text-sm text-third">
                      Calls marked as completed will show up here.
                    </p>
                  </>
                )}

                {callStatusFilter === "all" && (
                  <div className="flex flex-col items-center justify-center text-center space-y-3 max-w-md mx-auto py-2">
                    <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-1">
                      <PhoneIncoming size={20} strokeWidth={2} />
                    </div>
                    <p className="text-base font-semibold text-white">
                      No call leads yet
                    </p>
                    <p className="text-xs text-third leading-relaxed">
                      When prospective buyers click &apos;Call Seller&apos; on
                      your vehicle listings, their call details and contact info
                      will appear here for easy follow-up.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

export default Inquiries;
