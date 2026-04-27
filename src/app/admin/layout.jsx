"use client";

import Sidebar from "@/components/admin/sidebar";
import DashboardNavbar from "@/components/admin/dashboardnav";

export default function AdminLayout({ children }) {
  return (
    <div className="flex h-screen bg-[#0B0F1A] text-white">
      
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <DashboardNavbar />

        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>

    </div>
  );
}