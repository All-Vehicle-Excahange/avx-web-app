import DashboardLayout from "@/components/features/consult/details/dashboard/DashboardLayout";
import ProfileComponent from "@/components/features/consult/details/dashboard/ProfileComponent";
import React from "react";

function index() {
  return (
    <>
      <DashboardLayout>
        <ProfileComponent />
      </DashboardLayout>
    </>
  );
}

export default index;

export function getServerSideProps() {
  return {
    props: { fullWidth: true },
  };
}
