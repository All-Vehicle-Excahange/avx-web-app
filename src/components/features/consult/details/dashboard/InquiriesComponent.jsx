"use client";

import { useState } from "react";
import InquiryCard from "@/components/ui/InquiryCard";
import StatCard from "./components/StateCard";
import { CheckCircle, Eye, MousePointerClick, TrendingUp } from "lucide-react";

export default function InquiriesComponent() {
  const [activeType, setActiveType] = useState("all");

  const inquiryTypes = [
    { id: "all", label: "All" },
    { id: "pending", label: "Pending" },
    { id: "accepted", label: "Accepted" },
    { id: "closed", label: "Closed" },
  ];

  const topVehicles = [
    { name: "BMW X1" },
    { name: "Fortuner" },
    { name: "Honda City" },
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

      <div className="rounded-2xl border border-third/30 bg-primary/5 p-6 space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <StatCard
            icon={<TrendingUp size={20} />}
            label="All"
            value="12 inquiries"
          />
          <StatCard
            icon={<Eye size={20} />}
            label="Pending"
            value="9 inquiries"
          />
          <StatCard
            icon={<MousePointerClick size={20} />}
            label="Accepted"
            value="8 inquiries"
          />
          <StatCard
            icon={<CheckCircle size={20} />}
            label="Closed"
            value="6 inquiries"
          />
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

      {/* INQUIRY CARDS */}
      <div className="grid grid-cols-1 gap-6">
        {(activeType === "all" || activeType === "pending") && (
          <InquiryCard status="pending" />
        )}
        {(activeType === "all" || activeType === "accepted") && (
          <InquiryCard status="accepted" />
        )}
        {(activeType === "all" || activeType === "closed") && (
          <InquiryCard status="closed" />
        )}
      </div>

      <div className="rounded-2xl border border-third/30 bg-primary/5 p-6 space-y-4">
        <div className="flex items-center gap-2">
          <TrendingUp className="text-primary" size={18} />
          <h3 className="font-semibold">Tips For Better Conversations</h3>
        </div>

        {topVehicles.map((v) => (
          <div
            key={v.rank}
            className="flex justify-between items-center bg-secondary/50 rounded-xl p-4"
          >
            <div className="flex items-center gap-4">
              <ul className="list-disc list-inside">
                <li>{v.name}</li>
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
