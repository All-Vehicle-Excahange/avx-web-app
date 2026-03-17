import React, { useEffect, useState } from "react";
import MyInquiryCard from "@/components/ui/MyInquiryCard";
import { getMyInquiries } from "@/services/inquiry.service";
import Button from "@/components/ui/button";
import Link from "next/link";

function MyInquary() {
  const [activeType, setActiveType] = useState("all");
  const [inquiries, setInquiries] = useState([]);
  const [visibleCount, setVisibleCount] = useState(6);

  useEffect(() => {
    const fetchInquiries = async () => {
      try {
        const status = activeType === "all" ? undefined : activeType;

        const res = await getMyInquiries(status);
        setInquiries(res.data || []);
        setVisibleCount(6);
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
          <>
            {inquiries.slice(0, visibleCount).map((inq) => (
              <MyInquiryCard
                key={inq.id}
                inquiry={inq}
                onStatusChange={handleUpdateStatus}
              />
            ))}

            {visibleCount < inquiries.length && (
              <div className="flex justify-end mt-4">
                <Button
                  variant="outline"
                  onClick={() => setVisibleCount((prev) => prev + 6)}
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
                <h3 className="text-xl font-bold mb-2">No {activeType.toLowerCase()} inquiries found.</h3>
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