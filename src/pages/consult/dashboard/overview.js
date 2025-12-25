import DashboardLayout from "@/components/features/consult/details/dashboard/DashboardLayout";
import OverviewComponent from "@/components/features/consult/details/dashboard/OverviewComponent";

export default function overview() {
  return (
    <DashboardLayout>
      <OverviewComponent />
    </DashboardLayout>
  );
}
export function getServerSideProps() {
  return {
    props: { fullWidth: true },
  };
}
