import CreateAd from "@/components/features/consult/details/dashboard/ads/CreateAd";
import DashboardLayout from "@/components/features/consult/details/dashboard/DashboardLayout";
import React from "react";

export default function create() {
  return (
    <>
      <DashboardLayout>
        <CreateAd />
      </DashboardLayout>
    </>
  );
}

export function getServerSideProps() {
  return {
    props: { fullWidth: true },
  };
}
