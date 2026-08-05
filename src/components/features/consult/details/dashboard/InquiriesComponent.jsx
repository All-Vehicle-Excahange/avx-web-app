/* eslint-disable react-hooks/set-state-in-effect */

"use client";

import { useEffect, useState } from "react";
import InquiryCard from "@/components/ui/InquiryCard";
import StatCard from "./components/StateCard";
import { AlertTriangle, EyeOff, Flame, TrendingUp, Clock, MessageCircle, Rocket } from "lucide-react";
import { useQuery, useQueryClient, useInfiniteQuery } from "@tanstack/react-query";
import { getInquiryKpisQuery } from "@/queries/Seller.queries";
import { getInquiriesInfiniteQuery } from "@/queries/inquiry.queries";
import { formatResponseTime, getResponseStatus } from "@/lib/helper";
import Button from "@/components/ui/button";
import StatCardSkeleton from "@/components/ui/skeleton/StatCardSkeleton";
import InquiryCardSkeleton from "@/components/ui/skeleton/InquiryCardSkeleton";
import SkeletonBox from "@/components/ui/skeleton/SkeletonBox";

export default function InquiriesComponent() {
  const [activeType, setActiveType] = useState("all");

  const queryClient = useQueryClient();

  // Fetch KPIs
  const { data: inquiryKpis, isLoading: kpiLoading } = useQuery(getInquiryKpisQuery());

  // Fetch inquiries based on active status type
  const inquiryStatusFilter = activeType === "all" ? undefined
    : activeType === "closed" ? "CLOSED_BY_INQUIRER"
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
  const inquiries = inquiriesInfiniteData?.pages.flatMap((page) => page.data || []) || [];

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

  return (
    <section className="w-full space-y-8">
      {/* TITLE */}
      <div className="flex flex-col gap-4 lg:flex-row justify-between">
        <div>
          <h1 className="text-2xl font-bold">Inquiries</h1>
          <p className="text-third text-sm mt-1">
            Manage buyer inquiries & follow-ups
          </p>
        </div>

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
                <span className="text-xs font-semibold text-primary tracking-tight">Avg Response Time</span>
                <span className={`px-1.5 rounded text-[9px] font-semibold uppercase tracking-wider bg-secondary shadow-sm ${status.color}`}>
                  {status.label}
                </span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="font-semibold text-base font-black tracking-tight">{formattedTime}</span>
                <span className="text-[10px] text-third font-medium leading-tight hidden sm:block">
                  Fast responses increase closing rate.
                </span>
              </div>
            </div>
          </div>
        )}

      </div>

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
                  label="All Inquiries "
                  value={`${inquiryKpis?.totalInquiries || 0} `}
                />
              </div>
              <div>
                <StatCard
                  icon={<Flame className="text-green-500" size={20} />}
                  label="Accepted Inquiries"
                  value={`${inquiryKpis?.totalApprovedInquiries || 0} `}
                />
              </div>

              <div>
                <StatCard
                  icon={<EyeOff className="text-yellow-500" size={20} />}
                  label="Pending Inquiries"
                  value={`${inquiryKpis?.totalPendingInquiries || 0} `}
                />
              </div>

              <div>
                <StatCard
                  icon={<AlertTriangle className="text-blue-500" size={20} />}
                  label="Closed Inquiries"
                  value={`${inquiryKpis?.totalClosedInquiries || 0} `}
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
              className={`px-4 py-2 cursor-pointer rounded-full text-sm font-medium border transition shrink-0
          ${activeType === type.id
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
                  {isFetchingNextPage ? "Loading..." : "Load More"}
                </Button>
              </div>
            )}
          </>
        ) : (
          <div className="rounded-xl border border-dashed border-third/30  p-10 text-center space-y-3 shadow-sm transition-colors duration-200 hover:border-third/40">
            {/* Pending Empty */}
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

            {/* Approved Empty */}
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

            {/* Closed Empty */}
            {activeType === "closed" && (
              <>
                <p className="text-lg font-semibold text-primary">
                  No closed inquiries yet
                </p>
                <p className="text-sm text-third">Your first deal is coming.</p>
              </>
            )}

            {/* Rejected Empty */}
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
    </section>
  );
}
