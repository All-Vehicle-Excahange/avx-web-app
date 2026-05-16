import DashboardLayout from "@/components/features/consult/details/dashboard/DashboardLayout";
import CreateTheme from "@/components/features/consult/details/dashboard/storeFrontTheme/CreateTheme";
import React from "react";

function create() {
  return (
    <>
      <DashboardLayout>
        <CreateTheme />
      </DashboardLayout>
    </>
  );
}

create.fullWidth = true;

export default create;
