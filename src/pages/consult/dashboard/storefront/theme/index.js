import DashboardLayout from "@/components/features/consult/details/dashboard/DashboardLayout";
import ThemeListing from "@/components/features/consult/details/dashboard/storeFrontTheme/ThemeListing";
import React from "react";

export default function index() {
  return (
    <>
      <DashboardLayout>
        <ThemeListing />
      </DashboardLayout>
    </>
  );
}

export function getServerSideProps() {
  return {
    props: { fullWidth: true },
  };
}
