import DashboardLayout from "@/components/features/consult/details/dashboard/DashboardLayout";
import InquiriesComponent from "@/components/features/consult/details/dashboard/InquiriesComponent";
import React from "react";

function inquiries() {
  return (
    <>
      <DashboardLayout>
        <InquiriesComponent />
      </DashboardLayout>
    </>
  );
}

inquiries.fullWidth = true;

export default inquiries;
