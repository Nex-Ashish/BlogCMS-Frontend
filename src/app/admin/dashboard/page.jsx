"use client";

// import DashboardNavbar from "@/components/admin/dashboardnav";
// import QuickDraft from "@/components/admin/dashboard/QuickDraft";
// import RecentComments from "@/components/admin/dashboard/RecentComments";
import { Pencil, Users } from "lucide-react";
import StatsCard from "../../../../components/admin/dashboard/StatsCard";
import AnalyticsChart from "../../../../components/admin/dashboard/AnalyticsChart";
import TopCategories from "../../../../components/admin/dashboard/TopCategories";
import RecentPosts from "../../../../components/admin/dashboard/RecentPosts";

export default function DashboardPage() {
  return (
    <div className="flex flex-col">

      <div className="p-6 space-y-6">
        {/* TOP stats */}
        <div className="grid grid-cols-2 gap-4">
          <StatsCard
            title="Total Posts"
            value="128"
            icon={Pencil}
            className="
    bg-[#a657eaad]
    border-2 border-[#bd79f4]
    shadow-[1px_1px_10px_3px_#a960e5]
    hover:opacity-90
  "
          />
          <StatsCard
            title="Total Users"
            value="1,254"
            // growth="8%"
            icon={Users}
            className="
    bg-[#a657eaad]
    border-2 border-[#bd79f4]
    shadow-[1px_1px_10px_3px_#a960e5]
    hover:opacity-90
  "
          />
          {/* <StatsCard title="Page Views" value="24.8K" />
          <StatsCard title="Comments" value="342" /> */}
        </div>

        {/* MID SECTION */}
        <div className="grid grid-cols-2 gap-6">
          <div className="col-span">
            <AnalyticsChart />
          </div>
          <TopCategories />

          {/* <QuickDraft /> */}
        </div>

        {/* BOTTOM */}
        <div className="grid grid-cols-2 gap-6">
          <div className="col-span-2">
            <RecentPosts />
          </div>

          <div className="space-y-6">
            {/* <RecentComments /> */}

          </div>
        </div>
      </div>
    </div>
  );
}