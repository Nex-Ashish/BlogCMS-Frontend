"use client";

import { getBlogs } from "@/utils/blog/helper";
import { useEffect, useState } from "react";

function processData(blogs) {
  const byCat = {};
  blogs.forEach(({ category }) => {
    const title = category?.title || "Unknown";
    byCat[title] = (byCat[title] || 0) + 1;
  });
  return Object.entries(byCat).map(([cat, count]) => ({ cat, count }));
}

export default function AnalyticsChart() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchAll() {
      try {
        const first = await getBlogs("", 1);
        const totalPages = first?.pagination?.pages || 1;

        const promises = Array.from({ length: totalPages }, (_, i) =>
          getBlogs("", i + 1)
        );
        const results = await Promise.all(promises);

        const allBlogs = results.flatMap((r) => r?.blogs || []);
        setData(processData(allBlogs));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchAll();
  }, []);

  const maxCount = Math.max(...data.map((d) => d.count), 1);

  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-5 shadow-[1px_1px_10px_1px_#800fd1]">
      <div className="flex justify-between md:flex-row flex-col items-center gap-2 mb-4">
        <h3 className="text-white font-semibold">Analytics Overview</h3>
        <span className="text-xs text-gray-400">By Category</span>
      </div>

      {loading ? (
        <div className="h-40 flex items-end gap-2">
          {[60, 40, 70, 50, 65, 45, 55, 35].map((h, i) => (
            <div
              key={i}
              className="flex-1 bg-white/10 rounded-md animate-pulse"
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
      ) : error ? (
        <div className="h-40 flex items-center justify-center">
          <p className="text-red-400 text-xs">{error}</p>
        </div>
      ) : (
        /* Scrollable wrapper — bars never squish below min-width on small screens */
        <div className="overflow-x-auto -mx-1 px-1">
          <div
            className="flex items-end gap-2"
            style={{ minWidth: `${data.length * 48}px` }} /* 48px min per bar */
          >
            {data.map(({ cat, count }) => (
              <div
                key={cat}
                className="flex flex-col items-center gap-1"
                style={{ flex: "1 0 40px" }} /* grow but never shrink below 40px */
              >
                {/* Count label */}
                <span className="text-[10px] text-purple-300 font-medium leading-none">
                  {count}
                </span>

                {/* Bar track */}
                <div className="w-full bg-white/10 rounded-md overflow-hidden flex items-end h-32">
                  <div
                    className="w-full bg-gradient-to-t from-purple-600 to-[#b070de] transition-all duration-700 rounded-md"
                    style={{ height: `${(count / maxCount) * 100}%` }}
                  />
                </div>

                {/* Category label — sits below bar, truncates with tooltip */}
                <span
                  className="text-[10px] text-gray-400 w-full text-center leading-tight block truncate"
                  title={cat}          /* native tooltip shows full name on hover */
                >
                  {cat}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}