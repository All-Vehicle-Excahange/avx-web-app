import DashboardLayout from "@/components/features/consult/details/dashboard/DashboardLayout";
import React from "react";
import AnalyticsComponent from "@/components/features/consult/details/dashboard/AnalyticsComponent";
import HelpCenter from "@/components/features/consult/details/dashboard/HelpCenter";

function helpCenter() {
  return (
    <>
      <DashboardLayout>
        <HelpCenter />
      </DashboardLayout>
    </>
  );
}

helpCenter.fullWidth = true;

export default helpCenter;
