import DashboardLayout from "@/components/features/consult/details/dashboard/DashboardLayout";
import ThemeListing from "@/components/features/consult/details/dashboard/storeFrontTheme/ThemeListing";
import React from "react";

function index() {
  return (
    <>
      <DashboardLayout>
        <ThemeListing />
      </DashboardLayout>
    </>
  );
}

index.fullWidth = true;

export default index;
