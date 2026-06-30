import DashboardLayout from "@/components/features/consult/details/dashboard/DashboardLayout";
import NotificationsComponent from "@/components/features/consult/details/dashboard/NotificationsComponent";

function notifications() {
  return (
    <DashboardLayout>
      <NotificationsComponent />
    </DashboardLayout>
  );
}

notifications.fullWidth = true;

export default notifications;
