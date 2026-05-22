import { useState } from "react";
import InquiryCard from "@/components/ui/InquiryCard";
import InspectionCard from "@/components/ui/InspectionCard";
import Image from "next/image";
import React from "react";

function Inspection() {
  const [activeTab, setActiveTab] = useState("sent");

  return (
    <>
      <section className="w-full container rounded-2xl  p-6 space-y-6">
        <div className="relative w-full overflow-hidden rounded-xl">
          <Image
            src={"/about2.png"}
            alt={`Banner`}
            width={1200}
            height={600}
            className="w-full h-auto object-cover"
            priority
          />
        </div>

        {/* TABS */}
        <div className="flex gap-10   overflow-x-auto no-scrollbar whitespace-nowrap">
          {[
            { id: "sent", label: "Sent Inspections" },
            { id: "received", label: "Received Inspection Requests" },
          ].map((tab) => (
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
            <>
              <InspectionCard
                status="pending"
                type="sent"
                inspectionType="Video + Report"
              />
              <InspectionCard
                status="accepted"
                type="sent"
                inspectionType="Report Only"
              />
              <InspectionCard
                status="done"
                type="sent"
                inspectionType="Video + Report"
              />
              <InspectionCard
                status="cancelled"
                type="sent"
                inspectionType="Report Only"
              />
            </>
          ) : (
            <>
              <InspectionCard status="pending" type="received" />
              <InspectionCard status="accepted" type="received" />
              <InspectionCard status="done" type="received" />
              <InspectionCard status="cancelled" type="received" />
            </>
          )}
        </div>
      </section>
    </>
  );
}

export default Inspection;
