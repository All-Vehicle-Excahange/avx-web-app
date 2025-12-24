import React, { useState } from "react";
import InquiryCard from "@/components/ui/InquiryCard";

function Inquiries() {
  const [activeType, setActiveType] = useState("all");

  const vehicleTypes = [
    { id: "all", label: "All" },
    { id: "pending", label: "Pending" },
    { id: "accepted", label: "Accepted" },
    { id: "closed", label: "Closed" },
  ];

  return (
    <section className="w-full container rounded-2xl bg-secondary p-6 space-y-6">
      {/* FILTER */}
      <div className="flex flex-wrap gap-2">
        {vehicleTypes.map((type) => (
          <button
            key={type.id}
            onClick={() => setActiveType(type.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium border transition
              ${
                activeType === type.id
                  ? "bg-primary text-secondary border-primary"
                  : "border-third/50 text-primary hover:bg-third/20"
              }`}
          >
            {type.label}
          </button>
        ))}
      </div>

      {/* CARDS */}
      <div className="grid grid-cols-1 gap-6">
        <InquiryCard status="pending" />
        <InquiryCard status="accepted" />
        <InquiryCard status="closed" />
      </div>
    </section>
  );
}

export default Inquiries;
