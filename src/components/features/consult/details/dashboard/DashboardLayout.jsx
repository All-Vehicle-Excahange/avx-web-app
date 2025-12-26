import NavbarDark from "@/components/layout/NavbarDark";
import Sidebar from "./Sidebar";

export default function DashboardLayout({ children }) {
  return (
    <>
      <NavbarDark />
      <div className="min-h-screen pt-16 flex bg-secondary text-primary">
        <Sidebar />
        <main className="flex-1 p-8 overflow-y-auto ">{children}</main>
      </div>
    </>
  );
}
