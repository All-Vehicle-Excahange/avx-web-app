import BillingComponent from "@/components/features/consult/details/dashboard/BillingComponent";
import DashboardLayout from "@/components/features/consult/details/dashboard/DashboardLayout";
import React from "react";

function billing() {
  return (
    <>
      <DashboardLayout>
        <BillingComponent />
      </DashboardLayout>
    </>
  );
}

export default billing;

export function getServerSideProps() {
  return {
    props: { fullWidth: true },
  };
}
