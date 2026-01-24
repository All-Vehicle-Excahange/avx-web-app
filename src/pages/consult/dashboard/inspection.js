import DashboardLayout from "@/components/features/consult/details/dashboard/DashboardLayout";
import InspectionTab from "@/components/features/consult/details/dashboard/InspectionTab";
import React from "react";

function inquiries() {
  return (
    <>
      <DashboardLayout>
        <InspectionTab />
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
