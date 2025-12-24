import InquiryCard from "@/components/ui/InquiryCard";
import InspectionCard from "@/components/ui/InspectionCard";
import Image from "next/image";
import React from "react";

function Inspection() {
  return (
    <>
      <section className="w-full container rounded-2xl bg-secondary p-6 space-y-6">
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
