import DashboardLayout from "@/components/features/consult/details/dashboard/DashboardLayout";
import ReviewComponent from "@/components/features/consult/details/dashboard/ReviewComponent";
import React from "react";

function inquiries() {
  return (
    <>
      <DashboardLayout>
        <ReviewComponent />
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
