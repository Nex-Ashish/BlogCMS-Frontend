"use client";

import { useEffect, useState } from "react";
import { Pencil, Users } from "lucide-react";
import StatsCard from "../../../../../components/admin/dashboard/StatsCard";
import AnalyticsChart from "../../../../../components/admin/dashboard/AnalyticsChart";
import TopCategories from "../../../../../components/admin/dashboard/TopCategories";
import RecentPosts from "../../../../../components/admin/dashboard/RecentPosts";
import { getStats } from "@/utils/blog/helper";

export default function DashboardPage() {
  const [stats, setStats] = useState({ totalUsers: 0, totalBlogs: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const data = await getStats();
        console.log(data,'ddd')
        setStats(data.stats);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  const cardClass = `
    bg-[#a657eaad]
    border-2 border-[#bd79f4]
    shadow-[1px_1px_10px_3px_#a960e5]
    hover:opacity-90
  `;

  return (
    <div className="flex flex-col">
      <div className="p-6 space-y-6">

        <div className="grid grid-cols-2 gap-4">
          <StatsCard
            title="Total Posts"
            value={loading ? "..." : (stats?.totalBlogs ?? 0).toLocaleString()}
            icon={Pencil}
            className={cardClass}
          />
          <StatsCard
            title="Total Users"
            value={loading ? "..." : (stats?.totalUsers ?? 0).toLocaleString()}
            icon={Users}
            className={cardClass}
          />
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="col-span">
            <AnalyticsChart />
          </div>
          <TopCategories />
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="col-span-2">
            <RecentPosts />
          </div>
          <div className="space-y-6"></div>
        </div>

      </div>
    </div>
  );
}