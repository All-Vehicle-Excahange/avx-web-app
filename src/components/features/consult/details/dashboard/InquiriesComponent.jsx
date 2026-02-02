"use client";

import { useState } from "react";
import InquiryCard from "@/components/ui/InquiryCard";
import StatCard from "./components/StateCard";
import { AlertTriangle, EyeOff, Flame, TrendingUp } from "lucide-react";

export default function InquiriesComponent() {
  const [activeType, setActiveType] = useState("all");

  // ✅ Dummy Inquiries Data (Replace with API later)
  const [inquiries, setInquiries] = useState([
    {
      id: 1,
      inquiryStatus: "APPROVED",
      inquiryVehicleResponse: {
        makerName: "BMW",
        modelName: "X1",
        variantName: "Sport",
        yearOfMfg: 2022,
      },
      inquirer: {
        firstname: "Nihu",
        lastname: "Chaudhary",
      },
      isInspected: true,
      createdAt: new Date(),
    },
    {
      id: 2,
      inquiryStatus: "APPROVED",
      inquiryVehicleResponse: {
        makerName: "Toyota",
        modelName: "Fortuner",
        variantName: "Legender",
        yearOfMfg: 2023,
      },
      inquirer: {
        firstname: "Rahul",
        lastname: "Sharma",
      },
      isInspected: true,
      createdAt: new Date(),
    },
    {
      id: 2,
      inquiryStatus: "APPROVED",
      inquiryVehicleResponse: {
        makerName: "Toyota",
        modelName: "Fortuner",
        variantName: "Legender",
        yearOfMfg: 2023,
      },
      inquirer: {
        firstname: "Rahul",
        lastname: "Sharma",
      },
      isInspected: false,
      createdAt: new Date(),
    },
    {
      id: 2,
      inquiryStatus: "CLOSED_BY_VEHICLE_OWNER",
      inquiryVehicleResponse: {
        makerName: "Toyota",
        modelName: "Fortuner",
        variantName: "Legender",
        yearOfMfg: 2023,
      },
      inquirer: {
        firstname: "Rahul",
        lastname: "Sharma",
      },
      isInspected: false,
      createdAt: new Date(),
    },
  ]);

  // ✅ Status Update Callback
  const handleStatusChange = (id, newStatus) => {
    setInquiries((prev) =>
      prev.map((inq) =>
        inq.id === id ? { ...inq, inquiryStatus: newStatus } : inq,
      ),
    );
  };

  // ✅ Filter Logic

  const filteredInquiries = inquiries.filter((inq) => {
    if (activeType === "all") return true;

    if (activeType === "pending") {
      return inq.inquiryStatus === "PENDING";
    }

    if (activeType === "approved") {
      return inq.inquiryStatus === "APPROVED";
    }

    if (activeType === "closed") {
      return (
        inq.inquiryStatus === "CLOSED_BY_VEHICLE_OWNER" ||
        inq.inquiryStatus === "CLOSED_BY_INQUIRER"
      );
    }

    return true;
  });

  // ✅ Filter Tabs
  const inquiryTypes = [
    { id: "all", label: "All" },
    { id: "pending", label: "Pending" },
    { id: "approved", label: "Approved" },
    { id: "closed", label: "Closed" },
  ];

  return (
    <section className="w-full space-y-8">
      {/* TITLE */}
      <div>
        <h1 className="text-2xl font-bold">Inquiries</h1>
        <p className="text-third text-sm mt-1">
          Manage buyer inquiries & follow-ups
        </p>
      </div>

      <div className="rounded-2xl p-2 space-y-2">
        <p className="text-sm text-green-600">
          Avg response time: 18 mins (Good) .
        </p>
        <p className="text-sm">Fast responses increase chances of closing.</p>
      </div>
      <div className="rounded-2xl border border-third/30 bg-primary/5 p-6 space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div
            onClick={() => handleSnapshotClick("high")}
            className="cursor-pointer"
          >
            <StatCard
              icon={<Flame className="text-primary" size={20} />}
              label="All Inquiries "
              value="12 inquiries"
            />
          </div>
          <div
            onClick={() => handleSnapshotClick("high")}
            className="cursor-pointer"
          >
            <StatCard
              icon={<Flame className="text-green-500" size={20} />}
              label="Accepted Inquiries"
              value="6 inquiries"
            />
          </div>

          <div
            onClick={() => handleSnapshotClick("low")}
            className="cursor-pointer"
          >
            <StatCard
              icon={<EyeOff className="text-yellow-500" size={20} />}
              label="Pending Inquiries"
              value="3 inquiries"
            />
          </div>

          <div
            onClick={() => handleSnapshotClick("attention")}
            className="cursor-pointer"
          >
            <StatCard
              icon={<AlertTriangle className="text-red-500" size={20} />}
              label="Closed Inquiries"
              value="3 inquiries"
            />
          </div>
        </div>
      </div>

      {/* FILTER BAR */}
      <div className="rounded-2xl border border-third/30 bg-secondary p-5 flex flex-wrap gap-2">
        {inquiryTypes.map((type) => (
          <button
            key={type.id}
            onClick={() => setActiveType(type.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium border transition
              ${
                activeType === type.id
                  ? "bg-primary text-secondary border-primary"
                  : "border-third/50 text-primary hover:bg-primary/10"
              }`}
          >
            {type.label}
          </button>
        ))}
      </div>

      {/* ✅ INQUIRY LIST */}
      <div className="grid grid-cols-1 gap-6">
        {filteredInquiries.length === 0 ? (
          <div className="rounded-2xl border border-third/30 bg-secondary p-10 text-center space-y-3">
            {/* ✅ Pending Empty */}
            {activeType === "pending" && (
              <>
                <p className="text-lg font-semibold text-primary">
                  No pending inquiries 🎉
                </p>
                <p className="text-sm text-third">
                  Responding quickly improves your ranking.
                </p>
              </>
            )}

            {/* ✅ Approved Empty */}
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

            {/* ✅ Closed Empty */}
            {activeType === "closed" && (
              <>
                <p className="text-lg font-semibold text-primary">
                  No closed inquiries yet
                </p>
                <p className="text-sm text-third">Your first deal is coming.</p>
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
        ) : (
          filteredInquiries.map((inq) => (
            <InquiryCard
              key={inq.id}
              inquiry={inq}
              onStatusChange={handleStatusChange}
            />
          ))
        )}
      </div>
    </section>
  );
}
