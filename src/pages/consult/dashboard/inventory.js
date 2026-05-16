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

inventory.fullWidth = true;

export default inventory;
