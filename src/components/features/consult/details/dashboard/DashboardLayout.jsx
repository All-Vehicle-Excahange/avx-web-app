import Sidebar from "./Sidebar";
import Navbar from "@/components/layout/Navbar";

export default function DashboardLayout({ children }) {
  return (
    <>
      <Navbar heroMode scrolled={true} />
      <div className="min-h-screen pt-16 flex  text-primary">
        <Sidebar />
        <main className="flex-1 p-8 overflow-y-auto ">{children}</main>
      </div>
    </>
  );
}
