import React, { useState } from "react";
import MyInquiryCard from "@/components/ui/MyInquiryCard";
import Button from "@/components/ui/button";
import Link from "next/link";
import { InquiryCardSkeleton } from "@/components/ui/skeleton";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { getMyInquiriesInfiniteQuery } from "@/queries/inquiry.queries";

function MyInquary() {
  const queryClient = useQueryClient();
  const [activeType, setActiveType] = useState("all");

  const {
    data: inquiriesInfiniteData,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
  } = useInfiniteQuery({
    ...getMyInquiriesInfiniteQuery({
      inquiryStatus: activeType === "all" ? undefined : activeType,
      pageSize: 6,
    }),
    staleTime: 15 * 60 * 1000, // 15 minutes
  });

  const inquiries = inquiriesInfiniteData?.pages?.flatMap((page) => page?.data || []) || [];

  const vehicleTypes = [
    { id: "all", label: "All" },
    { id: "PENDING", label: "Pending" },
    { id: "APPROVED", label: "Approved" },
    { id: "REJECTED", label: "Rejected" },
    { id: "CLOSED_BY_INQUIRER", label: "Closed" },
  ];

  const handleUpdateStatus = () => {
    queryClient.invalidateQueries({ queryKey: ["my-inquiries-infinite"] });
  };

  return (
    <section className="w-full container rounded-2xl p-6 space-y-6">
      {/* FILTER */}
      <div className="flex overflow-x-auto no-scrollbar gap-2 pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 flex-nowrap sm:flex-wrap">
        {vehicleTypes.map((type) => (
          <button
            key={type.id}
            onClick={() => setActiveType(type.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium border transition whitespace-nowrap
              ${activeType === type.id
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
        {isLoading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <InquiryCardSkeleton key={i} />
          ))
        ) : inquiries?.length > 0 ? (
          <>
            {inquiries.map((inq) => (
              <MyInquiryCard
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
                  className="px-6 py-2 rounded-full text-sm font-semibold  shadow-md"
                >
                  Load More
                </Button>
              </div>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center rounded-2xl border-2 border-dashed border-third/20 bg-third/5">
            {activeType === "all" ? (
              <>
                <h3 className="text-xl font-bold mb-2">You havent contacted any sellers yet.</h3>
                <p className="text-third mb-6 max-w-sm">
                  Start exploring vehicles and send inquiries.
                </p>
                <Link href="/search">
                  <Button variant="ghost">Browse Vehicles</Button>
                </Link>
              </>
            ) : (
              <>
                <h3 className="text-xl font-bold mb-2">No {activeType.replace(/_/g, " ").toLowerCase()} inquiries found.</h3>
                <p className="text-third max-w-sm">
                  There are currently no inquiries with this status.
                </p>
              </>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

export default MyInquary;