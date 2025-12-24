import InquiryCard from "@/components/ui/InquiryCard";
import InspectionCard from "@/components/ui/InspectionCard";
import React from "react";

function Inspection() {
  return (
    <>
      <section className="w-full container rounded-2xl bg-secondary p-6 space-y-6">
        <div className="grid grid-cols-1 gap-6">
          <InspectionCard status="processing" />
          <InspectionCard status="inspected" />
          <InspectionCard status="not_inspected" />
        </div>
      </section>
    </>
  );
}

export default Inspection;
