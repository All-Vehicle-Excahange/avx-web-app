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

billing.fullWidth = true;

export default billing;
