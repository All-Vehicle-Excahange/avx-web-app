import DashboardLayout from "@/components/features/consult/details/dashboard/DashboardLayout";
import ProfileComponent from "@/components/features/consult/details/dashboard/ProfileComponent";
import React from "react";

function profile() {
  return (
    <>
      <DashboardLayout>
        <ProfileComponent />
      </DashboardLayout>
    </>
  );
}

export default profile;

export function getServerSideProps() {
  return {
    props: { fullWidth: true },
  };
}
