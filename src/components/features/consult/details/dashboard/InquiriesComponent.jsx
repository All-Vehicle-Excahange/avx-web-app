/* eslint-disable react-hooks/set-state-in-effect */

"use client";

import { useEffect, useState, useMemo } from "react";
import InquiryCard from "@/components/ui/InquiryCard";
import CallLeadCard from "./components/CallLeadCard";
import StatCard from "./components/StateCard";
import {
  AlertTriangle,
  EyeOff,
  Flame,
  Clock,
  PhoneCall,
  PhoneIncoming,
  Rocket,
  CheckCircle2,
} from "lucide-react";
import { useQuery, useQueryClient, useInfiniteQuery } from "@tanstack/react-query";
import { getInquiryKpisQuery } from "@/queries/Seller.queries";
import { getInquiriesInfiniteQuery } from "@/queries/inquiry.queries";
import {
  getReceivedCallLeadsInfiniteQuery,
  getCallLeadsKpisQuery,
} from "@/queries/vehicle.queries";
import { formatResponseTime, getResponseStatus } from "@/lib/helper";
import Button from "@/components/ui/button";
import StatCardSkeleton from "@/components/ui/skeleton/StatCardSkeleton";
import InquiryCardSkeleton from "@/components/ui/skeleton/InquiryCardSkeleton";
import CallLeadCardSkeleton from "./components/CallLeadCardSkeleton";
import SkeletonBox from "@/components/ui/skeleton/SkeletonBox";

export default function InquiriesComponent() {
  const queryClient = useQueryClient();

  // Switch between "inquiry" and "call_leads"
  const [activeTab, setActiveTab] = useState("inquiry");

  // ─── INQUIRIES STATE ────────────────────────────────────────────────────────
  const [activeType, setActiveType] = useState("all");

  // Fetch KPIs
  const { data: inquiryKpis, isLoading: kpiLoading } = useQuery(
    getInquiryKpisQuery()
  );

  // Fetch inquiries based on active status type
  const inquiryStatusFilter =
    activeType === "all"
      ? undefined
      : activeType === "closed"
        ? "CLOSED_BY_INQUIRER"
        : activeType.toUpperCase();

  const {
    data: inquiriesInfiniteData,
    isLoading: inquiriesLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery(
    getInquiriesInfiniteQuery({
      inquiryStatus: inquiryStatusFilter,
      pageSize: 6,
    })
  );
  const inquiries =
    inquiriesInfiniteData?.pages.flatMap((page) => page.data || []) || [];

  const handleStatusChange = () => {
    queryClient.invalidateQueries({ queryKey: ["inquiries-infinite"] });
    queryClient.invalidateQueries({ queryKey: ["seller-inquiry-kpis"] });
  };

  const avgTime = inquiryKpis?.averageResponseTime;
  const formattedTime = formatResponseTime(avgTime);
  const status = getResponseStatus(avgTime);

  // Filter Tabs
  const inquiryTypes = [
    { id: "all", label: "All" },
    { id: "pending", label: "Pending" },
    { id: "approved", label: "Approved" },
    { id: "closed", label: "Closed" },
    { id: "rejected", label: "Rejected" },
  ];

  // ─── CALL LEADS STATE ──────────────────────────────────────────────────────
  const [callStatusFilter, setCallStatusFilter] = useState("all"); // "all" | "pending" | "completed"

  // Fetch Call Leads KPIs from API
  const { data: callLeadsKpis, isLoading: isCallLeadsKpisLoading } = useQuery(
    getCallLeadsKpisQuery()
  );

  const callCompletedByOwnerParam =
    callStatusFilter === "pending"
      ? false
      : callStatusFilter === "completed"
        ? true
        : undefined;

  const {
    data: callLeadsInfiniteData,
    isLoading: callLeadsLoading,
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

  const totalCallLeads =
    callLeadsKpis?.totalCallLeads ??
    callLeadsKpis?.totalReceivedLeads ??
    callLeadsInfiniteData?.pages?.[0]?.pageResponse?.totalElements ??
    callLeadsInfiniteData?.pages?.[0]?.totalElements ??
    callLeads.length;

  const totalCallAttempts =
    callLeadsKpis?.totalCallAttempts ??
    callLeads.reduce(
      (acc, item) => acc + (item?.inquirerAttemptCount || 1),
      0
    );

  const pendingCallCount =
    callLeadsKpis?.totalPendingCall ??
    callLeadsKpis?.pendingCalls ??
    0;

  const completedCallCount =
    callLeadsKpis?.totalCompletedCall ??
    callLeadsKpis?.completedCalls ??
    0;

  const callStatusTabs = [
    { id: "all", label: "All Leads", count: totalCallLeads },
    { id: "pending", label: "Pending Call", count: pendingCallCount },
    { id: "completed", label: "Completed", count: completedCallCount },
  ];

  return (
    <section className="w-full space-y-8">
      {/* HEADER & TOP RIGHT TABS */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-third/20 pb-0">
        <div className="pb-3">
          <h1 className="text-2xl md:text-3xl font-semibold font-primary tracking-tight text-primary">
            {activeTab === "inquiry" ? "Inquiries" : "Received Call Leads"}
          </h1>
          <p className="text-third text-sm mt-1">
            {activeTab === "inquiry"
              ? "Manage buyer inquiries, chat conversations & follow-ups"
              : "Track interested buyers who initiated a direct call about your vehicles"}
          </p>
        </div>

        {/* RIGHT SIDE TABS */}
        <div className="flex items-center gap-6 sm:gap-8 overflow-x-auto no-scrollbar">

          <button
            onClick={() => setActiveTab("call_leads")}
            className={`flex cursor-pointer items-center gap-2 pb-3 text-sm sm:text-base font-semibold border-b-2 transition-all whitespace-nowrap ${activeTab === "call_leads"
              ? "border-primary text-primary"
              : "border-transparent text-third hover:text-primary"
              }`}
          >
            <span>Call Leads</span>
            {totalCallLeads > 0 && (
              <span
                className={`px-2 py-0.5 rounded-full text-xs font-bold ${activeTab === "call_leads"
                  ? "bg-primary text-secondary"
                  : "bg-primary/10 text-primary border border-third/20"
                  }`}
              >
                {totalCallLeads}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab("inquiry")}
            className={`flex cursor-pointer items-center gap-2 pb-3 text-sm sm:text-base font-semibold border-b-2 transition-all whitespace-nowrap ${activeTab === "inquiry"
              ? "border-primary text-primary"
              : "border-transparent text-third hover:text-primary"
              }`}
          >
            <span>Inquiries</span>
            {(inquiryKpis?.totalInquiries !== undefined && inquiryKpis?.totalInquiries > 0) && (
              <span
                className={`px-2 py-0.5 rounded-full text-xs font-bold ${activeTab === "inquiry"
                  ? "bg-primary text-secondary"
                  : "bg-primary/10 text-primary border border-third/20"
                  }`}
              >
                {inquiryKpis.totalInquiries}
              </span>
            )}
          </button>


        </div>
      </div>

      {/* ────────────────────────────────────────────────────────────────────────── */}
      {/* TAB 1: INQUIRIES (CHAT)                                                    */}
      {/* ────────────────────────────────────────────────────────────────────────── */}
      {activeTab === "inquiry" && (
        <div className="space-y-8">
          {/* AVG RESPONSE TIME */}
          <div className="flex justify-end">
            {kpiLoading ? (
              <div className="rounded-xl bg-primary/5 px-4 py-2.5 space-y-2 min-w-[200px] border border-transparent">
                <SkeletonBox className="h-4 w-3/4 opacity-20" rounded="rounded-md" />
                <SkeletonBox className="h-3 w-full opacity-20" rounded="rounded-md" />
              </div>
            ) : (
              <div className="flex items-center gap-3 bg-primary/5 border border-third/20 rounded-xl px-4 py-2.5 shadow-sm backdrop-blur-sm w-full md:w-auto">
                <div className="flex items-center justify-center w-9 h-9 rounded-full bg-secondary shadow-inner shrink-0">
                  <Clock className={status.color} size={18} strokeWidth={2.5} />
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-xs font-semibold text-primary tracking-tight">
                      Avg Response Time
                    </span>
                    <span
                      className={`px-1.5 rounded text-[9px] font-semibold uppercase tracking-wider bg-secondary shadow-sm ${status.color}`}
                    >
                      {status.label}
                    </span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="font-semibold text-base font-black tracking-tight">
                      {formattedTime}
                    </span>
                    <span className="text-[10px] text-third font-medium leading-tight hidden sm:block">
                      Fast responses increase closing rate.
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* KPIS SUMMARY */}
          <div className="rounded-xl bg-primary/5 p-6 space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-5 gap-4">
              {kpiLoading ? (
                <>
                  <StatCardSkeleton />
                  <StatCardSkeleton />
                  <StatCardSkeleton />
                  <StatCardSkeleton />
                  <StatCardSkeleton />
                </>
              ) : (
                <>
                  <div>
                    <StatCard
                      icon={<Flame className="text-primary" size={20} />}
                      label="All Inquiries"
                      value={`${inquiryKpis?.totalInquiries || 0}`}
                    />
                  </div>
                  <div>
                    <StatCard
                      icon={<Flame className="text-green-500" size={20} />}
                      label="Accepted Inquiries"
                      value={`${inquiryKpis?.totalApprovedInquiries || 0}`}
                    />
                  </div>

                  <div>
                    <StatCard
                      icon={<EyeOff className="text-yellow-500" size={20} />}
                      label="Pending Inquiries"
                      value={`${inquiryKpis?.totalPendingInquiries || 0}`}
                    />
                  </div>

                  <div>
                    <StatCard
                      icon={<AlertTriangle className="text-blue-500" size={20} />}
                      label="Closed Inquiries"
                      value={`${inquiryKpis?.totalClosedInquiries || 0}`}
                    />
                  </div>

                  <div>
                    <StatCard
                      icon={<AlertTriangle className="text-red-500" size={20} />}
                      label="Rejected Inquiries"
                      value={`${inquiryKpis?.totalRejectedInquiries || 0}`}
                    />
                  </div>
                </>
              )}
            </div>
          </div>

          {/* FILTER BAR */}
          <div className="rounded-xl bg-primary/5 p-4 shadow-sm transition-colors duration-200">
            <div className="flex gap-2 overflow-x-auto whitespace-nowrap scrollbar-hide">
              {inquiryTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setActiveType(type.id)}
                  className={`px-4 py-2 cursor-pointer rounded-full text-sm font-medium border transition shrink-0 ${activeType === type.id
                    ? "bg-primary text-secondary border-primary"
                    : "border-third/50 text-primary hover:bg-primary/10"
                    }`}
                >
                  {type.label}
                </button>
              ))}
            </div>
          </div>

          {/* INQUIRY LIST */}
          <div className="grid grid-cols-1 gap-6">
            {inquiriesLoading && inquiries.length === 0 ? (
              <>
                <InquiryCardSkeleton />
                <InquiryCardSkeleton />
                <InquiryCardSkeleton />
              </>
            ) : inquiries?.length > 0 ? (
              <>
                {inquiries.map((inq) => (
                  <InquiryCard
                    key={inq.id}
                    inquiry={inq}
                    onStatusChange={handleStatusChange}
                    hideReviewButton={true}
                  />
                ))}

                {hasNextPage && (
                  <div className="flex justify-end mt-4">
                    <Button
                      variant="outline"
                      onClick={() => fetchNextPage()}
                      disabled={isFetchingNextPage}
                      className="px-6 py-2 rounded-full text-sm font-semibold shadow-md"
                    >
                      {isFetchingNextPage ? "Loading..." : "View More"}
                    </Button>
                  </div>
                )}
              </>
            ) : (
              <div className="rounded-xl border border-dashed border-third/30 p-10 text-center space-y-3 shadow-sm transition-colors duration-200 hover:border-third/40">
                {activeType === "pending" && (
                  <>
                    <p className="text-lg font-semibold text-primary">
                      No pending inquiries
                    </p>
                    <p className="text-sm text-third">
                      Responding quickly improves your ranking.
                    </p>
                  </>
                )}

                {activeType === "approved" && (
                  <>
                    <p className="text-lg font-semibold text-primary">
                      No active chats yet
                    </p>
                    <p className="text-sm text-third">
                      Accept inquiries to start conversations.
                    </p>
                  </>
                )}

                {activeType === "closed" && (
                  <>
                    <p className="text-lg font-semibold text-primary">
                      No closed inquiries yet
                    </p>
                    <p className="text-sm text-third">Your first deal is coming.</p>
                  </>
                )}

                {activeType === "rejected" && (
                  <>
                    <p className="text-lg font-semibold text-primary">
                      No rejected inquiries
                    </p>
                    <p className="text-sm text-third">
                      No inquiries have been rejected yet.
                    </p>
                  </>
                )}

                {activeType === "all" && (
                  <div className="flex flex-col items-center justify-center text-center space-y-3 max-w-md mx-auto py-2">
                    <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-1">
                      <MessageCircle size={20} strokeWidth={2} />
                    </div>
                    <p className="text-base font-semibold text-white">
                      No inquiries yet
                    </p>
                    <p className="text-xs text-third leading-relaxed">
                      Your buyer inquiries will appear here once someone contacts you about a listing. Keep your listings complete and visible to attract more potential buyers.
                    </p>
                    <Button
                      href="/consult/dashboard/ppc"
                      variant="ghost"
                      className="px-4 py-2 text-xs gap-2 mt-2"
                    >
                      <Rocket size={16} strokeWidth={2} /> Boost a listing
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ────────────────────────────────────────────────────────────────────────── */}
      {/* TAB 2: CALL LEADS                                                          */}
      {/* ────────────────────────────────────────────────────────────────────────── */}
      {activeTab === "call_leads" && (
        <div className="space-y-8">
          {/* KPIS SUMMARY */}
          <div className="rounded-xl bg-primary/5 p-6 space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {isCallLeadsKpisLoading && !callLeadsKpis ? (
                <>
                  <StatCardSkeleton />
                  <StatCardSkeleton />
                  <StatCardSkeleton />
                  <StatCardSkeleton />
                </>
              ) : (
                <>
                  <div>
                    <StatCard
                      icon={<PhoneIncoming className="text-primary" size={20} />}
                      label="Total Received Leads"
                      value={`${totalCallLeads || 0}`}
                    />
                  </div>
                  <div>
                    <StatCard
                      icon={<PhoneCall className="text-blue-500" size={20} />}
                      label="Total Call Attempts"
                      value={`${totalCallAttempts || 0}`}
                    />
                  </div>
                  <div>
                    <StatCard
                      icon={<EyeOff className="text-yellow-500" size={20} />}
                      label="Pending Calls"
                      value={`${pendingCallCount || 0}`}
                    />
                  </div>
                  <div>
                    <StatCard
                      icon={<CheckCircle2 className="text-green-500" size={20} />}
                      label="Completed Calls"
                      value={`${completedCallCount || 0}`}
                    />
                  </div>
                </>
              )}
            </div>
          </div>

          {/* FILTER BAR */}
          <div className="rounded-xl bg-primary/5 p-4 shadow-sm transition-colors duration-200">
            <div className="flex gap-2 overflow-x-auto whitespace-nowrap scrollbar-hide">
              {callStatusTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setCallStatusFilter(tab.id)}
                  className={`px-4 py-2 cursor-pointer rounded-full text-sm font-medium border transition shrink-0 ${callStatusFilter === tab.id
                    ? "bg-primary text-secondary border-primary"
                    : "border-third/50 text-primary hover:bg-primary/10"
                    }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* CALL LEADS LIST */}
          <div className="grid grid-cols-1 gap-6">
            {callLeadsLoading && callLeads.length === 0 ? (
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
                      {isFetchingNextCallLeads ? "Loading..." : "View More"}
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
                      When prospective buyers click &apos;Call Consultant / Seller&apos; on your vehicle listings, their call details and contact info will appear here for easy follow-up.
                    </p>
                    <Button
                      href="/consult/dashboard/inventory"
                      variant="ghost"
                      className="px-4 py-2 text-xs gap-2 mt-2"
                    >
                      <Rocket size={16} strokeWidth={2} /> View Your Inventory
                    </Button>
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
