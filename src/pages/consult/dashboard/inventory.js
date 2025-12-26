import DashboardLayout from "@/components/features/consult/details/dashboard/DashboardLayout";
import InventoryComponent from "@/components/features/consult/details/dashboard/InventoryComponent";
import React from "react";

function inventory() {
  return (
    <>
      <DashboardLayout>
        <InventoryComponent />
      </DashboardLayout>
    </>
  );
}

export default inventory;

export function getServerSideProps() {
  return {
    props: { fullWidth: true },
  };
}
