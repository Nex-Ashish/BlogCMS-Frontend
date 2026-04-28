"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import DashboardNavbar from "../../../../components/admin/dashboardnav";
import Sidebar from "../../../../components/admin/sidebar";

export default function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-[#0B0F1A] text-white">

      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="flex-1 flex flex-col min-w-0">

        <div className="flex items-center gap-3 px-4 py-3 border-b border-purple-900 md:hidden">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-lg bg-[#a657eaad] border border-[#bd79f4] text-white"
          >
            <Menu size={20} />
          </button>
          <span className="text-white font-semibold text-sm">Admin Panel</span>
        </div>

        <DashboardNavbar />

        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>

      </div>

    </div>
  );
}