"use client";

import React from "react";

import {
  Car,
  Clock,
  AlertTriangle,
  RefreshCcw,
  Star,
  BadgeCheck,
  TrendingUp,
  CheckCircle2,
  Video,
  Download,
  Search,
  Shield,
  MessageSquare,
  FileText,
  CheckCircle,
} from "lucide-react";
import StatCard from "./components/StateCard";
import Button from "@/components/ui/button";
import CustomSelect from "@/components/ui/custom-select";
import Pagination from "@/components/ui/Pagination";
import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { InspectionSkeleton } from "@/components/ui/skeleton";
import { generateVehicleSlug } from "@/lib/helper";
import {
  getInspectionSnapShotQuery,
  getVehiclesRequiringAttentionQuery,
  getRequestedFromBuyersQuary,
  getScoreBreakdownInfiniteQuery,
  getReportHistoryQuery,
} from "@/queries/inspection.queries";
import {
  acceptInspectionRequest,
  rejectInspectionRequest,
} from "@/services/inspection.service";
import InspectionTrackingModal from "@/components/features/user/InspectionTrackingModal";

function InspectionTab() {
  const { push } = useRouter();
  const [range, setRange] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState("");
  const [searchQuery, setSearchQuery] = React.useState("");
  const [historyPage, setHistoryPage] = React.useState(1);
  const [hasLoadedOnce, setHasLoadedOnce] = React.useState(false);
  const [localRequestStatuses, setLocalRequestStatuses] = React.useState({});
  const [loadingRequests, setLoadingRequests] = React.useState({});
  const [selectedInspection, setSelectedInspection] = React.useState(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [animateModal, setAnimateModal] = React.useState(false);

  const openInspectionModal = (inspectionData) => {
    const mappedInspection = {
      ...inspectionData,
      inspectionRequestStatus:
        inspectionData.inspectionRequestStatus || inspectionData.status,
    };
    setSelectedInspection(mappedInspection);
    setIsModalOpen(true);
    setTimeout(() => setAnimateModal(true), 10);
  };

  const closeInspectionModal = () => {
    setAnimateModal(false);
    setTimeout(() => {
      setIsModalOpen(false);
      setSelectedInspection(null);
    }, 300);
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "N/A";
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return dateStr;
    const day = date.getDate();
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  };

  const getStatusStyles = (status) => {
    const s = status?.toLowerCase() || "";
    if (s.includes("progress")) {
      return "bg-yellow-500/10 text-yellow-400";
    }
    if (s.includes("request")) {
      return "bg-primary/10 text-primary";
    }
    if (s.includes("expired") || s.includes("fail")) {
      return "bg-red-500/10 text-red-400";
    }
    return "bg-primary/10 text-primary";
  };

  const formatType = (type) => {
    if (!type) return "N/A";
    if (type === "VIDEO_CALL_WITH_REPORT") return "Video + Report";
    if (type === "REPORT_ONLY") return "Report Only";
    return type
      .split("_")
      .map((w) => w.charAt(0) + w.slice(1).toLowerCase())
      .join(" ");
  };

  const getTypeIcon = (type) => {
    if (type?.toLowerCase().includes("video")) {
      return <Video size={16} className="text-purple-400" />;
    }
    return <FileText size={16} className="text-blue-400" />;
  };

  const { data: snapShotData, isFetching: snapShotIsFetching } = useQuery(
    getInspectionSnapShotQuery(),
  );

  const {
    data: vehiclesRequiringAttentionData,
    isFetching: vehiclesRequiringAttentionIsFetching,
  } = useQuery(getVehiclesRequiringAttentionQuery());

  const {
    data: requestedFromBuyersData,
    isFetching: requestedFromBuyersIsFetching,
  } = useQuery(getRequestedFromBuyersQuary());

  const {
    data: scoreBreakdownInfiniteData,
    isFetching: scoreBreakdownLoading,
    isFetchingNextPage: scoreBreakdownFetchingNextPage,
    fetchNextPage: fetchNextScoreBreakdownPage,
    hasNextPage: hasNextScoreBreakdownPage,
  } = useInfiniteQuery(
    getScoreBreakdownInfiniteQuery({
      pageSize: 4,
    }),
  );

  const scoreBreakdowns =
    scoreBreakdownInfiniteData?.pages?.flatMap((page) => page?.data || []) ||
    [];

  const handleScoreScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    if (
      scrollHeight - scrollTop - clientHeight < 10 &&
      hasNextScoreBreakdownPage &&
      !scoreBreakdownLoading &&
      !scoreBreakdownFetchingNextPage
    ) {
      fetchNextScoreBreakdownPage();
    }
  };

  const {
    data: historyData,
    isFetching: historyLoading,
  } = useQuery(
    getReportHistoryQuery({
      pageNo: historyPage,
      pageSize: 10,
      daysRange: range,
      overallRiskLevel: statusFilter || undefined,
    }),
  );

  const reports = historyData?.data || [];

  const filteredReports = reports.filter((r) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    const maker = r.makerName?.toLowerCase() || "";
    const model = r.modelName?.toLowerCase() || "";
    const variant = r.variantName?.toLowerCase() || "";
    const inspector = r.inspectorName?.toLowerCase() || "";
    return (
      maker.includes(q) ||
      model.includes(q) ||
      variant.includes(q) ||
      inspector.includes(q)
    );
  });

  const getAgeStatus = (dateStr) => {
    if (!dateStr) return { label: "Unknown", styles: "bg-third/10 text-third" };
    const date = new Date(dateStr);
    if (isNaN(date.getTime()))
      return { label: "Unknown", styles: "bg-third/10 text-third" };

    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays <= 30) {
      return {
        label: "Fresh (0–30 days)",
        styles: "bg-green-500/10 text-green-400 border border-green-500/20",
      };
    }
    if (diffDays <= 60) {
      return {
        label: "Aging (31–60 days)",
        styles: "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20",
      };
    }
    return {
      label: "Expired (60+ days)",
      styles: "bg-red-500/10 text-red-400 border border-red-500/20",
    };
  };

  const getRiskStyles = (risk) => {
    const r = risk?.toUpperCase() || "";
    if (r === "LOW")
      return "bg-green-500/10 text-green-400 border border-green-500/20";
    if (r === "MODERATE")
      return "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20";
    if (r === "HIGH")
      return "bg-red-500/10 text-red-400 border border-red-500/20";
    return "bg-third/10 text-third border border-third/20";
  };

  const rangeOptions = [
    { label: "All Time", value: "" },
    { label: "Last 7 days", value: "LAST_7_DAYS" },
    { label: "Last 30 days", value: "LAST_30_DAYS" },
    { label: "Last 90 days", value: "LAST_90_DAYS" },
  ];

  const statusOptions = [
    { label: "All Risks", value: "" },
    { label: "Low Risk", value: "LOW" },
    { label: "Moderate Risk", value: "MODERATE" },
    { label: "High Risk", value: "HIGH" },
  ];

  const isLoading =
    (!snapShotData && snapShotIsFetching) ||
    (!vehiclesRequiringAttentionData && vehiclesRequiringAttentionIsFetching) ||
    (!requestedFromBuyersData && requestedFromBuyersIsFetching) ||
    (scoreBreakdowns.length === 0 && scoreBreakdownLoading) ||
    (reports.length === 0 && historyLoading);

  React.useEffect(() => {
    if (!isLoading) {
      setHasLoadedOnce(true);
    }
  }, [isLoading]);

  if (isLoading && !hasLoadedOnce) {
    return <InspectionSkeleton />;
  }

  return (
    <section className="w-full space-y-10">
      {/* ================= HEADER ================= */}
      <div className="flex flex-col lg:flex-row sm:items-start justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-bold">
            Inspection
          </h1>
          <p className="text-xs md:text-sm text-third">
            Manage vehicle inspections and maintain trust score
          </p>
        </div>
      </div>

      {/* ================= SNAPSHOT ================= */}
      <div className="rounded-xl bg-primary/5 p-6 space-y-5">
        <h2 className="text-lg font-semibold">
          Inspection Performance Snapshot
        </h2>

        {/* Stat Cards */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <StatCard
            icon={<Car className="text-primary" size={20} />}
            label="Reecomm Inspection"
            value={snapShotData?.vehiclesWithAvxInspection}
          />

          <StatCard
            icon={<Clock className="text-orange-400" size={20} />}
            label="Pending Inspections"
            value={snapShotData?.pendingInspections}
          />

          <StatCard
            icon={<AlertTriangle className="text-red-400" size={20} />}
            label="Expired Reports"
            value={snapShotData?.expiredReports}
          />

          {/* <StatCard
            icon={<RefreshCcw className="text-purple-400" size={20} />}
            label="Re-inspection Requests"
            value="2"
          /> */}

          <StatCard
            icon={<Star className="text-yellow-400" size={20} />}
            label="Inspection Rating Score"
            value={snapShotData?.inspectionRatingScore}
          />
        </div>
      </div>

      {/* ================= TRUST SCORE BANNER ================= */}

      {/* ================= HOW INSPECTION AFFECTS RANKING ================= */}
      <div className="rounded-2xl overflow-hidden shadow-sm border border-third/10 my-4 transition">
        <img
          src="/seller/inspection.png"
          alt="How inspection affects ranking"
          className="w-full h-auto object-cover"
        />
      </div>

      {/* ================= VEHICLES REQUIRING ATTENTION ================= */}
      <div className="rounded-xl bg-primary/5 p-6 space-y-6 shadow-sm transition-colors duration-200">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-lg font-semibold">
              Inspection Status Overview
            </h2>
            <p className="text-sm text-third">
              Review vehicles where inspection is underway or renewal is due.
            </p>
          </div>

          {/* Urgent Badge */}
          {/* <span className="px-4 py-1 rounded-full bg-red-500/10 text-red-400 text-sm font-semibold">
            {vehiclesRequiringAttentionData?.urgentCount || 0} Urgent
          </span> */}
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            {/* Table Head */}
            <thead className="text-left text-third border-b border-third/30">
              <tr className="whitespace-nowrap">
                <th className="py-3 pr-4">Vehicle</th>
                <th className="pr-4">Status</th>
                <th className="pr-4">Last Inspection</th>
                <th className="text-right">Action</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-third/20 whitespace-nowrap">
              {vehiclesRequiringAttentionIsFetching ? (
                [...Array(3)].map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td className="py-4 pr-4 flex items-center gap-2">
                      <div className="w-4 h-4 bg-third/20 rounded-full animate-pulse" />
                      <div className="h-4 bg-third/20 rounded w-32 animate-pulse" />
                    </td>
                    <td className="pr-4">
                      <div className="h-6 bg-third/20 rounded-full w-24 animate-pulse" />
                    </td>
                    <td className="pr-4">
                      <div className="h-4 bg-third/20 rounded w-20 animate-pulse" />
                    </td>
                    <td className="text-right">
                      <div className="h-8 bg-third/20 rounded ml-auto w-24 animate-pulse" />
                    </td>
                  </tr>
                ))
              ) : !vehiclesRequiringAttentionData?.vehicles ||
                vehiclesRequiringAttentionData.vehicles.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-8 text-center text-third">
                    No vehicles require attention.
                  </td>
                </tr>
              ) : (
                vehiclesRequiringAttentionData.vehicles.map((vehicle, idx) => (
                  <tr key={vehicle.vehicleId || idx}>
                    <td className="py-4 pr-4 flex items-center gap-2 font-medium">
                      <div
                        className="flex flex-col cursor-pointer hover:text-primary transition-colors"
                        onClick={() =>
                          push(
                            `/vehicle/details/${generateVehicleSlug(vehicle)}/${vehicle.vehicleId}`,
                          )
                        }
                      >
                        <span className="text-white font-semibold">
                          {vehicle.makerName} {vehicle.modelName}
                        </span>
                        {vehicle.variantName && (
                          <span className="text-[11px] text-third font-normal">
                            {vehicle.variantName}
                          </span>
                        )}
                      </div>
                    </td>

                    <td className="pr-4">
                      <span
                        className={`px-3 py-1 rounded-full text-[11px] font-medium ${getStatusStyles(
                          vehicle.status,
                        )}`}
                      >
                        {vehicle.status}
                      </span>
                    </td>

                    <td className="text-third pr-4">
                      {formatDate(vehicle.lastInspection)}
                    </td>

                    <td className="text-right">
                      <Button
                        variant="ghost"
                        className="px-5 text-xs h-8"
                        onClick={() => openInspectionModal(vehicle)}
                      >
                        {vehicle.action || "View Details"}
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ================= INSPECTION REQUESTS FROM BUYERS ================= */}
      <div className="rounded-xl bg-primary/5 p-6 space-y-6 shadow-sm transition-colors duration-200">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          {/* Title */}
          <div>
            <h2 className="text-base sm:text-lg font-semibold leading-tight">
              Inspection Requests From Buyers
            </h2>
            <p className="text-sm text-third">
              Approve or decline buyer-requested inspections
            </p>
          </div>

          {/* Badge */}
          <span className="w-fit px-3 py-1 rounded-full bg-yellow-500/10 text-yellow-500 text-xs sm:text-sm font-semibold">
            {requestedFromBuyersData?.count || 0} Pending
          </span>
        </div>
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            {/* Head */}
            <thead className="text-left text-third border-b border-third/30 whitespace-nowrap">
              <tr>
                <th className="py-3 pr-4">Vehicle</th>
                <th className="pr-4">Buyer</th>
                <th className="pr-4">Type</th>

                <th className="pr-4">Status</th>
                <th className="text-right">Action</th>
              </tr>
            </thead>

            {/* Body */}
            <tbody className="whitespace-nowrap">
              {requestedFromBuyersIsFetching ? (
                [...Array(2)].map((_, i) => (
                  <tr
                    key={i}
                    className="border-b border-third/20 animate-pulse"
                  >
                    <td className="py-4 pr-4 flex items-center gap-2">
                      <div className="w-4 h-4 bg-third/20 rounded-full animate-pulse" />
                      <div className="h-4 bg-third/20 rounded w-32 animate-pulse" />
                    </td>
                    <td className="pr-4">
                      <div className="h-4 bg-third/20 rounded w-20 animate-pulse" />
                    </td>
                    <td className="pr-4">
                      <div className="h-4 bg-third/20 rounded w-24 animate-pulse" />
                    </td>
                    <td className="pr-4">
                      <div className="h-6 bg-third/20 rounded-full w-24 animate-pulse" />
                    </td>
                    <td className="flex justify-end gap-3 py-4">
                      <div className="h-8 bg-third/20 rounded w-16 animate-pulse" />
                      <div className="h-8 bg-third/20 rounded w-16 animate-pulse" />
                    </td>
                  </tr>
                ))
              ) : !requestedFromBuyersData?.requests ||
                requestedFromBuyersData.requests.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-third">
                    No pending inspection requests.
                  </td>
                </tr>
              ) : (
                requestedFromBuyersData.requests.map((request, idx) => (
                  <tr
                    key={request.id || idx}
                    className="border-b border-third/20"
                  >
                    {/* Vehicle */}
                    <td className="py-4 pr-4 flex items-center gap-2 font-medium">
                      <div
                        className="flex flex-col cursor-pointer hover:text-primary transition-colors"
                        onClick={() =>
                          push(
                            `/vehicle/details/${generateVehicleSlug(request)}/${request.vehicleId}`,
                          )
                        }
                      >
                        <span className="text-white font-semibold">
                          {request.makerName} {request.modelName}
                        </span>
                        {request.variantName && (
                          <span className="text-[11px] text-third font-normal">
                            {request.variantName}
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Buyer */}
                    <td className="text-third pr-4">
                      {request.requestedUserName || "N/A"}
                    </td>

                    {/* Type */}
                    <td className="flex items-center gap-2 text-primary font-medium pr-4">
                      {getTypeIcon(request.inspectionType)}
                      {formatType(request.inspectionType)}
                    </td>

                    {/* Status */}
                    <td className="pr-4">
                      {(() => {
                        const currentStatus =
                          localRequestStatuses[request.id] ||
                          request.inspectionRequestStatus ||
                          "PENDING_OWNER_APPROVAL";
                        if (
                          currentStatus === "ACCEPTED" ||
                          currentStatus === "APPROVED"
                        ) {
                          return (
                            <span className="px-3 py-1 rounded-full bg-green-500/10 text-green-500 text-[11px] font-medium">
                              ACCEPTED
                            </span>
                          );
                        } else if (currentStatus === "REJECTED") {
                          return (
                            <span className="px-3 py-1 rounded-full bg-red-500/10 text-red-500 text-[11px] font-medium">
                              REJECTED
                            </span>
                          );
                        } else {
                          return (
                            <span className="px-3 py-1 rounded-full bg-yellow-500/10 text-yellow-400 text-[11px] font-medium">
                              Awaiting approval
                            </span>
                          );
                        }
                      })()}
                    </td>

                    {/* Action Buttons */}
                    <td className="flex justify-end gap-3 py-4">
                      {(() => {
                        const currentStatus =
                          localRequestStatuses[request.id] ||
                          request.inspectionRequestStatus ||
                          "PENDING_OWNER_APPROVAL";
                        if (
                          currentStatus === "ACCEPTED" ||
                          currentStatus === "APPROVED"
                        ) {
                          return (
                            <span className="text-green-500 text-xs font-semibold px-4 py-1.5">
                              Accepted
                            </span>
                          );
                        } else if (currentStatus === "REJECTED") {
                          return (
                            <span className="text-red-500 text-xs font-semibold px-4 py-1.5">
                              Rejected
                            </span>
                          );
                        } else {
                          return (
                            <>
                              <Button
                                variant="ghost"
                                className="px-6 text-xs h-8"
                                loading={
                                  loadingRequests[request.id] === "accept"
                                }
                                locked={!!loadingRequests[request.id]}
                                onClick={async () => {
                                  try {
                                    setLoadingRequests((prev) => ({
                                      ...prev,
                                      [request.id]: "accept",
                                    }));
                                    await acceptInspectionRequest(request.id);
                                    setLocalRequestStatuses((prev) => ({
                                      ...prev,
                                      [request.id]: "ACCEPTED",
                                    }));
                                  } catch (err) {
                                    console.error(err);
                                  } finally {
                                    setLoadingRequests((prev) => ({
                                      ...prev,
                                      [request.id]: null,
                                    }));
                                  }
                                }}
                              >
                                Accept
                              </Button>

                              <Button
                                variant="outlineSecondary"
                                className="px-6 text-xs h-8"
                                loading={
                                  loadingRequests[request.id] === "reject"
                                }
                                locked={!!loadingRequests[request.id]}
                                onClick={async () => {
                                  try {
                                    setLoadingRequests((prev) => ({
                                      ...prev,
                                      [request.id]: "reject",
                                    }));
                                    await rejectInspectionRequest(request.id);
                                    setLocalRequestStatuses((prev) => ({
                                      ...prev,
                                      [request.id]: "REJECTED",
                                    }));
                                  } catch (err) {
                                    console.error(err);
                                  } finally {
                                    setLoadingRequests((prev) => ({
                                      ...prev,
                                      [request.id]: null,
                                    }));
                                  }
                                }}
                              >
                                Reject
                              </Button>
                            </>
                          );
                        }
                      })()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Info Process Box */}
        <div className="rounded-xl border border-primary/20 bg-primary/5 p-5 space-y-3">
          <div className="flex items-center gap-2 font-semibold">
            <AlertTriangle size={18} className="text-primary" />
            Inspection Request Process
          </div>

          <ul className="text-sm text-third space-y-1 list-disc pl-6">
            <li>Consultant must approve slot</li>
            <li>Reecomm inspector will be assigned</li>
            <li>Payment collected before scheduling</li>
          </ul>
        </div>
      </div>

      {/* ================= INSPECTION HISTORY ================= */}
      <div className="rounded-xl bg-primary/5 p-6 space-y-6 shadow-sm transition-colors duration-200">
        {/* Header */}
        <div>
          <h2 className="text-xl font-semibold">Inspection History</h2>
          <p className="text-sm text-third">
            Complete history of all inspections
          </p>
        </div>

        {/* Search + Filters Row */}
        <div className="flex flex-col lg:flex-row lg:items-center gap-4 justify-between">
          {/* Search Bar */}
          <div className="relative w-full">
            <Search
              size={16}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-third"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by vehicle..."
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-third/30 bg-transparent text-sm outline-none focus:border-primary/50"
            />
          </div>

          {/* Filters */}
          <div className="flex gap-3 w-full lg:w-auto">
            <CustomSelect
              value={statusFilter}
              onChange={setStatusFilter}
              options={statusOptions}
              placeholder="Status"
              variant="transparent"
            />

            <CustomSelect
              value={range}
              onChange={setRange}
              options={rangeOptions}
              placeholder="Select range"
              variant="transparent"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-auto custom-scrollbar pr-2 pb-4">
          <table className="w-full text-sm">
            {/* Table Head */}
            <thead className="border-b border-third/30 text-third text-left whitespace-nowrap sticky top-0  backdrop-blur-sm z-10">
              <tr>
                <th className="py-3 pr-4">Vehicle</th>
                <th className="pr-4">Inspection Date</th>
                <th className="pr-4">Inspector Name</th>
                <th className="pr-4">Score</th>
                <th className="pr-4">Age Status</th>
                <th className="pr-4">Status</th>
                <th className="text-right">Action</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-third/20 whitespace-nowrap">
              {historyLoading && reports.length === 0 ? (
                [...Array(4)].map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td className="py-4 pr-6 flex items-center gap-2">
                      <div className="w-4 h-4 bg-third/20 rounded-full animate-pulse" />
                      <div className="h-4 bg-third/20 rounded w-24 animate-pulse" />
                    </td>
                    <td className="pr-6">
                      <div className="h-4 bg-third/20 rounded w-20 animate-pulse" />
                    </td>
                    <td className="pr-6">
                      <div className="h-4 bg-third/20 rounded w-28 animate-pulse" />
                    </td>
                    <td className="pr-6">
                      <div className="h-4 bg-third/20 rounded w-16 animate-pulse" />
                    </td>
                    <td className="pr-6">
                      <div className="h-6 bg-third/20 rounded-full w-32 animate-pulse" />
                    </td>
                    <td className="pr-6">
                      <div className="h-6 bg-third/20 rounded-full w-20 animate-pulse" />
                    </td>
                    <td className="text-right">
                      <div className="h-8 bg-third/20 rounded ml-auto w-16 animate-pulse" />
                    </td>
                  </tr>
                ))
              ) : filteredReports.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-third">
                    {reports.length === 0
                      ? "No reports found in history."
                      : "No reports match your search query."}
                  </td>
                </tr>
              ) : (
                filteredReports.map((report, idx) => {
                  const ageStatus = getAgeStatus(report.inspectionSubmittedAt);
                  const isOutOfFive = report.inspectionScore <= 5;
                  const maxScore = isOutOfFive ? 5 : 100;
                  const showOrange =
                    report.inspectionScore < (isOutOfFive ? 3.5 : 75);

                  return (
                    <tr
                      key={report.vehicleId || idx}
                      className="hover:bg-primary/5 transition-colors"
                    >
                      {/* Vehicle */}
                      <td className="py-4 pr-6 flex items-center gap-2 font-medium">
                        <Car size={16} className="text-third" />
                        <div
                          className="flex flex-col cursor-pointer hover:text-primary transition-colors"
                          onClick={() =>
                            push(
                              `/vehicle/details/${generateVehicleSlug(report)}/${report.vehicleId}`,
                            )
                          }
                        >
                          <span className="text-white">
                            {report.makerName} {report.modelName}
                          </span>
                          {report.variantName && (
                            <span className="text-[11px] text-third font-normal">
                              {report.variantName}
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Inspection Date */}
                      <td className="text-third pr-6">
                        {formatDate(report.inspectionSubmittedAt)}
                      </td>

                      {/* Inspector Name */}
                      <td className="text-third pr-6">
                        {report.inspectorName || "N/A"}
                      </td>

                      {/* Score */}
                      <td className="font-semibold flex items-center gap-2 pr-6">
                        {report.inspectionScore !== undefined &&
                          report.inspectionScore !== null
                          ? `${report.inspectionScore}/${maxScore}`
                          : "N/A"}
                        {report.inspectionScore !== undefined &&
                          report.inspectionScore !== null && (
                            <CheckCircle2
                              size={16}
                              className={
                                showOrange
                                  ? "text-orange-400"
                                  : "text-green-500"
                              }
                            />
                          )}
                      </td>

                      {/* Age Status */}
                      <td className="pr-6">
                        <span
                          className={`px-3 py-1 rounded-full text-[11px] font-medium ${ageStatus.styles}`}
                        >
                          {ageStatus.label}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="pr-6">
                        <span
                          className={`px-3 py-1 rounded-full text-[11px] font-medium uppercase ${getRiskStyles(
                            report.overallRiskLevel,
                          )}`}
                        >
                          {report.overallRiskLevel || "N/A"}
                        </span>
                      </td>

                      {/* Action */}
                      <td className="text-right">
                        {report.reportPdfUrl ? (
                          <a
                            href={report.reportPdfUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-primary hover:underline ml-auto text-xs"
                          >
                            <Download size={14} />
                            Download
                          </a>
                        ) : (
                          <span className="text-xs text-third">N/A</span>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}

            </tbody>
          </table>
        </div>

        {(historyData?.pageResponse?.totalPages > 1 || historyData?.pagination?.totalPages > 1) && (
          <div className="flex justify-end mt-2 pr-2">
            <div className="transform scale-[0.8] origin-right -mt-2">
              <Pagination
                currentPage={historyPage}
                totalPages={historyData?.pageResponse?.totalPages || historyData?.pagination?.totalPages || 1}
                onPageChange={setHistoryPage}
              />
            </div>
          </div>
        )}
      </div>

      {/* ================= RE-INSPECTION CONTROL PANEL ================= */}
      <div className="rounded-xl bg-primary/5 p-6 space-y-6 shadow-sm transition-colors duration-200">
        {/* Header */}
        <div>
          <h2 className="text-xl font-semibold">Re-Inspection Control Panel</h2>
          <p className="text-sm text-third">
            Monitor inspection freshness and schedule re-inspections
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* ================= LEFT SIDE ================= */}
          <div className="space-y-5">
            {/* Freshness Top */}
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-lg">Inspection Freshness</h3>
              <span className="font-bold text-primary">35 Days</span>
            </div>

            {/* Aging Box */}
            <div className="rounded-xl bg-yellow-500/5 p-6 space-y-4">
              {/* Current Status */}
              <div className="flex items-start gap-3">
                <Clock className="w-6 h-6 text-yellow-400 mt-1" />
                <div>
                  <p className="font-semibold text-yellow-400">Aging</p>
                  <p className="text-sm text-third">
                    Current inspection age:{" "}
                    <span className="font-medium text-primary">35 days</span>
                  </p>
                </div>
              </div>

              {/* Legend */}
              <div className="space-y-3 text-sm">
                <p className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Fresh (0–30 days)
                </p>

                <p className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-yellow-500" />
                  Aging (31–60 days)
                </p>

                <p className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-red-500" />
                  Expired (60+ days)
                </p>
              </div>
            </div>

            {/* Schedule Button */}

            {/* Warning Note */}
            <div className="rounded-xl border border-yellow-500/30 bg-yellow-500/10 px-4 py-3 flex items-center gap-2 text-sm text-yellow-400">
              <AlertTriangle size={18} />
              Vehicles with expired inspections rank{" "}
              <span className="font-semibold">18% lower</span>
            </div>
          </div>

          {/* ================= RIGHT SIDE ================= */}
          <div className="space-y-5">
            {/* Score Header */}
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-lg">
                Inspection Score Breakdown
              </h3>
              {snapShotData?.inspectionRatingScore && (
                <span className="font-bold text-primary">
                  {snapShotData.inspectionRatingScore}
                </span>
              )}
            </div>

            {/* Cars Breakdown */}
            <div
              className="space-y-6 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar"
              onScroll={handleScoreScroll}
            >
              {scoreBreakdowns.map((vehicle, idx) => (
                <div
                  key={vehicle.vehicleId || idx}
                  className="cursor-pointer hover:opacity-80 transition-opacity"
                  onClick={() =>
                    push(
                      `/vehicle/details/${generateVehicleSlug(vehicle)}/${vehicle.vehicleId}`,
                    )
                  }
                >
                  <VehicleScore
                    name={`${vehicle.makerName} ${vehicle.modelName}`}
                    score={vehicle.inspectionScore}
                  />
                </div>
              ))}

              {scoreBreakdownFetchingNextPage && (
                <div className="py-2 text-center text-xs text-third animate-pulse">
                  Loading more...
                </div>
              )}

              {!scoreBreakdownLoading && scoreBreakdowns.length === 0 && (
                <div className="py-8 text-center text-sm text-third">
                  No vehicle scores found.
                </div>
              )}

              {scoreBreakdownLoading && (
                <div className="space-y-6">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="animate-pulse space-y-2">
                      <div className="h-4 bg-third/20 rounded w-24" />
                      <div className="w-full h-3 rounded-full bg-third/20" />
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>
        </div>
      </div>

      {/* ================= DISPUTE & ISSUE CENTER ================= */}

      {/* ================= UPGRADE YOUR TRUST VISIBILITY ================= */}

      {isModalOpen && (
        <InspectionTrackingModal
          inspection={selectedInspection}
          vehicle={selectedInspection}
          onClose={closeInspectionModal}
          animateModal={animateModal}
        />
      )}
    </section>
  );
}

export default InspectionTab;

function VehicleScore({ name, score, orange }) {
  const isOutOfFive = score <= 5;
  const maxScore = isOutOfFive ? 5 : 100;
  const percentage = (score / maxScore) * 100;
  const showOrange =
    orange !== undefined ? orange : score < (isOutOfFive ? 3.5 : 75);

  return (
    <div className="space-y-2 ">
      {/* Top Line */}
      <div className="flex justify-between text-sm font-medium">
        <span>{name}</span>
        <span>
          {score}/{maxScore}
        </span>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-3 rounded-full bg-third/20 overflow-hidden">
        <div
          className={`h-full rounded-full ${showOrange ? "bg-orange-400" : "bg-green-500"
            }`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

function PremiumFeatureCard({ icon, title, desc, tag }) {
  return (
    <div className="group rounded-2xl bg-primary/5 p-6 transition-all">
      {/* Top Row: Icon + Text + Badge */}
      <div className="flex items-start gap-4">
        {/* 1. Icon */}
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/5 text-white border border-zinc-800">
          {icon}
        </div>

        {/* 2. Content (Title & Desc) - flex-1 pushes the badge to the right */}
        <div className="flex-1 min-w-0">
          <h3 className="text-base font-semibold text-white leading-tight">
            {title}
          </h3>
          <p className="mt-1 text-sm text-zinc-400 line-clamp-2">{desc}</p>
        </div>

        {/* 3. The Badge - shrink-0 prevents it from getting crushed */}
        {tag && (
          <div className="shrink-0">
            <span className="inline-flex items-center justify-center rounded-full bg-emerald-500/10 px-3 py-1 text-[11px] font-bold text-emerald-500 border border-emerald-500/20 whitespace-nowrap">
              {tag}
            </span>
          </div>
        )}
      </div>

      {/* Bottom Row: CTA Button */}
      <div className="mt-6 flex justify-end">
        <Button variant="ghost" size="sm" className="w-auto sm:w-auto px-6">
          Add to Inspection
        </Button>
      </div>
    </div>
  );
}
