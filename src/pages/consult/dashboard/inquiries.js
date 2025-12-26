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

export default inquiries;

export function getServerSideProps() {
  return {
    props: { fullWidth: true },
  };
}
