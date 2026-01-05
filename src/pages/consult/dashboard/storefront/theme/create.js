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

export default create;

export function getServerSideProps() {
  return {
    props: { fullWidth: true },
  };
}
