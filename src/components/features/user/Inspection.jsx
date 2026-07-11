import { useState } from "react";
import InspectionCard from "@/components/ui/InspectionCard";
import React from "react";
import Button from "@/components/ui/button";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useAuthStore } from "@/stores/useAuthStore";
import InspectionTrackingModal from "./InspectionTrackingModal";
import { useRouter } from "next/router";
import { FileText, UserCheck, Video } from "lucide-react";
import {
  getAllRequestedInspectionInfiniteQuery,
  getAllInsprectionRequestInfiniteQuery,
} from "@/queries/inspection.queries";
import {
  acceptInspectionRequest,
  rejectInspectionRequest,
} from "@/services/inspection.service";

function Inspection() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("sent");
  const [localStatuses, setLocalStatuses] = useState({});
  const [selectedInspection, setSelectedInspection] = useState(null);
  const [animateModal, setAnimateModal] = useState(false);

  const handleOpenTracking = (item) => {
    setSelectedInspection(item);
    setTimeout(() => setAnimateModal(true), 10);
  };

  const handleCloseTracking = () => {
    setAnimateModal(false);
    setTimeout(() => {
      setSelectedInspection(null);
    }, 300);
  };

  const user = useAuthStore((state) => state.user);

  // Sent Inspections Query
  const {
    data: inspectionsInfiniteData,
    fetchNextPage: fetchNextPageSent,
    hasNextPage: hasNextPageSent,
    isLoading: isLoadingSent,
    isFetchingNextPage: isFetchingNextPageSent,
  } = useInfiniteQuery({
    ...getAllRequestedInspectionInfiniteQuery({
      pageSize: 6,
    }),
  });

  const inspections =
    inspectionsInfiniteData?.pages?.flatMap((page) => page?.data || []) || [];

  // Received Inspections Query
  const {
    data: receivedInfiniteData,
    fetchNextPage: fetchNextPageReceived,
    hasNextPage: hasNextPageReceived,
    isLoading: isLoadingReceived,
    isFetchingNextPage: isFetchingNextPageReceived,
  } = useInfiniteQuery({
    ...getAllInsprectionRequestInfiniteQuery({
      pageSize: 6,
    }),
  });

  const receivedRequests =
    receivedInfiniteData?.pages?.flatMap((page) => page?.data || []) || [];

  return (
    <>
      <section className="w-full container rounded-2xl p-6 space-y-6">
        {/* NEW INSPECTION HEADER CARD */}
        <div className="w-full bg-fourth text-white rounded-2xl overflow-hidden shadow-lg border border-fourth">
          {/* Top section: 3 Columns */}
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/20">
            {/* Column 1 */}
            <div className="p-6 md:p-8 flex flex-col items-start space-y-3">
              <div className="p-3 bg-white/10 rounded-xl">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold tracking-wide">Full condition report</h3>
              <p className="text-white/80 text-sm leading-relaxed">
                Scored across 200+ checkpoints with photo evidence.
              </p>
            </div>

            {/* Column 2 */}
            <div className="p-6 md:p-8 flex flex-col items-start space-y-3">
              <div className="p-3 bg-white/10 rounded-xl">
                <UserCheck className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold tracking-wide">Independent inspector</h3>
              <p className="text-white/80 text-sm leading-relaxed">
                Not the seller. Not the consultant. Assigned by Reecomm.
              </p>
            </div>

            {/* Column 3 */}
            <div className="p-6 md:p-8 flex flex-col items-start space-y-3">
              <div className="p-3 bg-white/10 rounded-xl">
                <Video className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold tracking-wide">Live video option</h3>
              <p className="text-white/80 text-sm leading-relaxed">
                Walk through the vehicle live with the inspector before committing.
              </p>
            </div>
          </div>

          {/* Bottom section: Banner */}
          <div className="border-t border-white/20 p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-white/5">
            <div>
              <h4 className="text-xl md:text-2xl font-bold tracking-wide">
                Inspection report from ₹699. Video call from ₹899.
              </h4>
              <p className="text-white/85 text-sm mt-1">
                The cost of not knowing is usually higher.
              </p>
            </div>
            <button
              onClick={() => router.push("/search")}
              className="px-6 py-3 border border-white rounded-xl text-white font-medium hover:bg-white/10 transition-all duration-300 shadow-sm cursor-pointer whitespace-nowrap"
            >
              Get this vehicle inspected
            </button>
          </div>
        </div>

        {/* TABS */}
        <div className="flex gap-10   overflow-x-auto no-scrollbar whitespace-nowrap">
          {[
            { id: "sent", label: "Sent Inspections" },
            { id: "received", label: "Received Inspection Requests" },
          ].filter(tab => !(user?.userRole === "CONSULTATION" && tab.id === "received"))
          .map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative py-4 text-sm font-medium transition hover:cursor-pointer ${
                activeTab === tab.id
                  ? "text-primary"
                  : "text-third hover:text-primary"
              }`}
            >
              {tab.label}

              {activeTab === tab.id && (
                <span className="absolute left-0 bottom-0 h-0.5 w-full bg-primary rounded-full" />
              )}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-6">
          {activeTab === "sent" ? (
            isLoadingSent ? (
              Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="animate-pulse rounded-2xl border border-third/10 bg-primary/5 p-6 h-34"
                >
                  <div className="h-5 w-1/3 bg-third/20 rounded mb-3"></div>
                  <div className="h-4 w-1/4 bg-third/20 rounded mb-3"></div>
                  <div className="h-4 w-1/5 bg-third/20 rounded"></div>
                </div>
              ))
            ) : inspections.length > 0 ? (
              <>
                 {inspections.map((item) => (
                  <InspectionCard
                    key={item.id}
                    onClick={() => handleOpenTracking(item)}
                    status={
                      localStatuses[item.id] || item.inspectionRequestStatus
                    }
                    type="sent"
                    inspectionType={
                      item.inspectionType === "VIDEO_CALL_WITH_REPORT"
                        ? "Video + Report"
                        : item.inspectionType === "REPORT_ONLY"
                          ? "Report Only"
                          : item.inspectionType?.replaceAll("_", " ")
                    }
                    vehicleName={`${item.makerName} ${item.modelName} ${item.variantName || ""}`}
                    date={
                      item.createdAt
                        ? new Date(item.createdAt).toLocaleDateString("en-IN", {
                            day: "2-digit",
                            month: "short",
                          })
                        : "-"
                    }
                    onViewReport={() => {
                      if (item.reportUrl) {
                        window.open(item.reportUrl, "_blank");
                      }
                    }}
                  />
                ))}

                {hasNextPageSent && (
                  <div className="flex justify-end mt-4">
                    <Button
                      variant="outline"
                      onClick={() => fetchNextPageSent()}
                      loading={isFetchingNextPageSent}
                      className="px-6 py-2 rounded-full text-sm font-semibold shadow-md"
                    >
                      Load More
                    </Button>
                  </div>
                )}
              </>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-center rounded-2xl border-2 border-dashed border-third/20 bg-third/5">
                <h3 className="text-xl font-bold mb-2">
                  No sent inspection requests.
                </h3>
                <p className="text-third max-w-sm">
                  You haven&apos;t requested any vehicle inspections yet.
                </p>
              </div>
            )
          ) : isLoadingReceived ? (
            Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="animate-pulse rounded-2xl border border-third/10 bg-primary/5 p-6 h-34"
              >
                <div className="h-5 w-1/3 bg-third/20 rounded mb-3"></div>
                <div className="h-4 w-1/4 bg-third/20 rounded mb-3"></div>
                <div className="h-4 w-1/5 bg-third/20 rounded"></div>
              </div>
            ))
          ) : receivedRequests.length > 0 ? (
            <>
              {receivedRequests.map((item) => (
                <InspectionCard
                  key={item.id}
                  onClick={() => handleOpenTracking(item)}
                  status={
                    localStatuses[item.id] || item.inspectionRequestStatus
                  }
                  type="received"
                  vehicleName={`${item.makerName} ${item.modelName} ${item.variantName || ""}`}
                  fromName={item.requestedUserName || "Buyer"}
                  date={
                    item.createdAt
                      ? new Date(item.createdAt).toLocaleDateString("en-IN", {
                          day: "2-digit",
                          month: "short",
                        })
                      : "-"
                  }
                  onAccept={async () => {
                    try {
                      await acceptInspectionRequest(item.id);
                      setLocalStatuses((prev) => ({
                        ...prev,
                        [item.id]: "ACCEPTED",
                      }));
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                  onReject={async () => {
                    try {
                      await rejectInspectionRequest(item.id);
                      setLocalStatuses((prev) => ({
                        ...prev,
                        [item.id]: "REJECTED",
                      }));
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                />
              ))}

              {hasNextPageReceived && (
                <div className="flex justify-end mt-4">
                  <Button
                    variant="outline"
                    onClick={() => fetchNextPageReceived()}
                    loading={isFetchingNextPageReceived}
                    className="px-6 py-2 rounded-full text-sm font-semibold shadow-md"
                  >
                    Load More
                  </Button>
                </div>
              )}
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-center rounded-2xl border-2 border-dashed border-third/20 bg-third/5">
              <h3 className="text-xl font-bold mb-2">
                No received inspection requests.
              </h3>
              <p className="text-third max-w-sm">
                You haven&apos;t received any vehicle inspection requests yet.
              </p>
            </div>
          )}
        </div>
      </section>

      {selectedInspection && (
        <InspectionTrackingModal
          inspection={selectedInspection}
          onClose={handleCloseTracking}
          animateModal={animateModal}
        />
      )}
    </>
  );
}

export default Inspection;
