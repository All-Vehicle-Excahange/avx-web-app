import DashboardLayout from "@/components/features/consult/details/dashboard/DashboardLayout";
import OverviewComponent from "@/components/features/consult/details/dashboard/OverviewComponent";

function overview() {
  return (
    <DashboardLayout>
      <OverviewComponent />
    </DashboardLayout>
  );
}

overview.fullWidth = true;

export default overview;
