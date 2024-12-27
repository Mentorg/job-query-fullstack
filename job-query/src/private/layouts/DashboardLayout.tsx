import { Outlet } from "react-router-dom";
import Navigation from "../../public/components/Navigation";
import Sidebar from "./Sidebar";

function DashboardLayout() {
  return (
    <>
      <Navigation />
      <main className="flex pt-[4.5rem]">
        <Sidebar />
        <Outlet />
      </main>
    </>
  );
}

export default DashboardLayout;
