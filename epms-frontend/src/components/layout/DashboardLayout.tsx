import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../pages/dashboard/Sidebar";
import DashboardNavbar from "../pages/dashboard/DashboardNavbar";

const DashboardLayout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar - Desktop */}
      <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 transition-all duration-300 lg:ml-0">
        <DashboardNavbar onMenuClick={() => setMobileOpen(!mobileOpen)} />
        
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
