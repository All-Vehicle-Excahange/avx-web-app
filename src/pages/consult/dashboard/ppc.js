import DashboardLayout from "@/components/features/consult/details/dashboard/DashboardLayout";
import PpcComponent from "@/components/features/consult/details/dashboard/PpcComponent";
import React from "react";

function ppc() {
  return (
    <>
      <DashboardLayout>
        <PpcComponent />
      </DashboardLayout>
    </>
  );
}

export default ppc;

export function getServerSideProps() {
  return {
    props: { fullWidth: true },
  };
}
