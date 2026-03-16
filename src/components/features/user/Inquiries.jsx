import React, { useEffect, useState } from "react";
import InquiryCard from "@/components/ui/InquiryCard";
import { getInquiries } from "@/services/inquiry.service";

function Inquiries() {
  const [activeType, setActiveType] = useState("all");
  const [inquiries, setInquiries] = useState([]);

  useEffect(() => {
    const fetchInquiries = async () => {
      try {
        const status = activeType === "all" ? undefined : activeType;

        const res = await getInquiries(status);
        setInquiries(res.data || []);
      } catch (error) {
        console.log(error);
      }
    };

    fetchInquiries();
  }, [activeType]);

  const vehicleTypes = [
    { id: "all", label: "All" },
    { id: "PENDING", label: "Pending" },
    { id: "APPROVED", label: "Approved" },
    { id: "REJECTED", label: "Rejected" },
    { id: "CLOSED_BY_INQUIRER", label: "Closed" },
  ];

  const handleUpdateStatus = (id, newStatus) => {
    setInquiries((prev) =>
      prev.map((inq) =>
        inq.id === id ? { ...inq, inquiryStatus: newStatus } : inq
      )
    );
  };

  return (
    <section className="w-full container rounded-2xl p-6 space-y-6">
      {/* FILTER */}
      <div className="flex flex-wrap gap-2">
        {vehicleTypes.map((type) => (
          <button
            key={type.id}
            onClick={() => setActiveType(type.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium border transition
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
        {inquiries?.length > 0 ? (
          inquiries.map((inq) => (
            <InquiryCard
              key={inq.id}
              inquiry={inq}
              onStatusChange={handleUpdateStatus}
            />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center rounded-2xl border-2 border-dashed border-third/20 bg-third/5">
            <h3 className="text-xl font-bold mb-2">No inquiries yet.</h3>
            <p className="text-third mb-6 max-w-sm">
              Once buyers show interest in your vehicle,<br />
              their requests will appear here.
            </p>
            <p className="text-sm text-third/70 max-w-sm font-medium">
              Tip:<br />
              Listings with more photos receive 3x more inquiries.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

export default Inquiries;
