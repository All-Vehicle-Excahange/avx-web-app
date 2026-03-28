/* eslint-disable react-hooks/set-state-in-effect */

"use client";

import { useEffect, useState } from "react";
import InquiryCard from "@/components/ui/InquiryCard";
import StatCard from "./components/StateCard";
import { AlertTriangle, EyeOff, Flame, TrendingUp } from "lucide-react";
import { getInquiryKpis } from "@/services/Seller.service";
import { getInquiries } from "@/services/inquiry.service";
import { formatResponseTime, getResponseStatus } from "@/lib/helper";
import Button from "@/components/ui/button";

export default function InquiriesComponent() {
  const [activeType, setActiveType] = useState("all");
  const [inquiryKpis, setInquiryKpis] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [visibleCount, setVisibleCount] = useState(6);

  const fetchInquiryKpis = async () => {
    try {
      const response = await getInquiryKpis();
      setInquiryKpis(response.data);
    } catch (error) {
      console.error("Error fetching inquiry KPIs:", error);
    }
  };

  // Fetch inquiries from API (same as Inquiries.jsx)
  useEffect(() => {
    const fetchInquiries = async () => {
      try {
        const status = activeType === "all" ? undefined
          : activeType === "closed" ? "CLOSED_BY_INQUIRER"
            : activeType.toUpperCase();

        const res = await getInquiries(status);
        setInquiries(res.data || []);
        setVisibleCount(6);
      } catch (error) {
        console.log(error);
      }
    };

    fetchInquiries();
  }, [activeType]);

  // Fetch KPIs on mount
  useEffect(() => {
    fetchInquiryKpis();
  }, []);

  const handleStatusChange = (id, newStatus) => {
    setInquiries((prev) =>
      prev.map((inq) =>
        inq.id === id ? { ...inq, inquiryStatus: newStatus } : inq,
      ),
    );
    // Re-fetch KPIs after any status change
    fetchInquiryKpis();
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

        <div className="rounded-xl bg-primary p-3 space-y-2">
          <p className={`text-sm ${status.color}`}>
            Avg response time: {formattedTime} ({status.label})
          </p>

          <p className="text-sm text-secondary">
            Fast responses increase chances of closing.
          </p>
        </div>

      </div>

      <div className="rounded-xl border border-third/30 bg-primary/5 p-6 space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
          <div
            className="cursor-pointer"
          >
            <StatCard
              icon={<Flame className="text-primary" size={20} />}
              label="All Inquiries "
              value={`${inquiryKpis?.totalInquiries || 0} `}
            />
          </div>
          <div
            className="cursor-pointer"
          >
            <StatCard
              icon={<Flame className="text-green-500" size={20} />}
              label="Accepted Inquiries"
              value={`${inquiryKpis?.totalApprovedInquiries || 0} `}
            />
          </div>

          <div
            className="cursor-pointer"
          >
            <StatCard
              icon={<EyeOff className="text-yellow-500" size={20} />}
              label="Pending Inquiries"
              value={`${inquiryKpis?.totalPendingInquiries || 0} `}
            />
          </div>

          <div
            className="cursor-pointer"
          >
            <StatCard
              icon={<AlertTriangle className="text-blue-500" size={20} />}
              label="Closed Inquiries"
              value={`${inquiryKpis?.totalClosedInquiries || 0} `}
            />
          </div>

          <div
            className="cursor-pointer"
          >
            <StatCard
              icon={<AlertTriangle className="text-red-500" size={20} />}
              label="Rejected Inquiries"
              value={`${inquiryKpis?.totalRejectedInquiries || 0}`}
            />
          </div>
        </div>
      </div>

      {/* FILTER BAR */}
      <div className="rounded-xl border border-third/30 p-3 shadow-sm transition-colors duration-200 hover:border-third/40">

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
        {inquiries?.length > 0 ? (
          <>
            {inquiries.slice(0, visibleCount).map((inq) => (
              <InquiryCard
                key={inq.id}
                inquiry={inq}
                onStatusChange={handleStatusChange}
              />
            ))}

            {visibleCount < inquiries.length && (
              <div className="flex justify-end mt-4">
                <Button
                  variant="outline"
                  onClick={() => setVisibleCount((prev) => prev + 6)}
                  className="px-6 py-2 rounded-full text-sm font-semibold shadow-md"
                >
                  Load More
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
              <>
                <p className="text-lg font-semibold text-primary">
                  No inquiries found
                </p>
                <p className="text-sm text-third">
                  Once buyers contact you, they will appear here.
                </p>
              </>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
