import React, { useEffect, useState } from "react";
import InquiryCard from "@/components/ui/InquiryCard";
import { getInquiries } from "@/services/inquiry.service";

function Inquiries() {
  const [activeType, setActiveType] = useState("all");
  const [inquiries, setInquiries] = useState([]);

  useEffect(() => {
    const fetchInquiries = async () => {
      try {
        const res = await getInquiries();
        setInquiries(res.data || []);
      } catch (error) {
        console.log(error);
      }
    };

    fetchInquiries();
  }, []);

  const vehicleTypes = [
    { id: "all", label: "All" },
    { id: "PENDING", label: "Pending" },
    { id: "APPROVED", label: "Approved" },
    { id: "REJECTED", label: "Rejected" },
    { id: "CLOSED_BY_INQUIRER", label: "Closed" },
  ];

  const filteredInquiries =
    activeType === "all"
      ? inquiries
      : inquiries.filter((inq) => inq.inquiryStatus === activeType);

  const handleUpdateStatus = (id, newStatus) => {
    setInquiries((prev) =>
      prev.map((inq) =>
        inq.id === id ? { ...inq, inquiryStatus: newStatus } : inq,
      ),
    );
  };

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

      <div className="grid grid-cols-1 gap-6">
        {filteredInquiries?.length > 0 ? (
          filteredInquiries.map((inq) => (
            <InquiryCard
              key={inq.id}
              inquiry={inq}
              onStatusChange={handleUpdateStatus}
            />
          ))
        ) : (
          <p className="text-third text-sm">No inquiries found.</p>
        )}
      </div>
    </section>
  );
}

export default Inquiries;
