import CreateAd from "@/components/features/consult/details/dashboard/ads/CreateAd";
import DashboardLayout from "@/components/features/consult/details/dashboard/DashboardLayout";
import React from "react";

function create() {
  return (
    <>
      <DashboardLayout>
        <CreateAd />
      </DashboardLayout>
    </>
  );
}

create.fullWidth = true;

export default create;
