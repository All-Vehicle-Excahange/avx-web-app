import DashboardLayout from "@/components/features/consult/details/dashboard/DashboardLayout";
import StoreFrontComponent from "@/components/features/consult/details/dashboard/StoreFrontComponent";
import React from "react";

function storefront() {
  return (
    <>
      <DashboardLayout>
        <StoreFrontComponent />
      </DashboardLayout>
    </>
  );
}

export default storefront;

export function getServerSideProps() {
  return {
    props: { fullWidth: true },
  };
}
