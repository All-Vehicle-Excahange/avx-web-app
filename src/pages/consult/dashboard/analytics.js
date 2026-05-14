import DashboardLayout from "@/components/features/consult/details/dashboard/DashboardLayout";
import React from "react";
import AnalyticsComponent from "@/components/features/consult/details/dashboard/AnalyticsComponent";

function analytics() {
  return (
    <>
      <DashboardLayout>
        <AnalyticsComponent />
      </DashboardLayout>
    </>
  );
}

analytics.fullWidth = true;

export default analytics;
