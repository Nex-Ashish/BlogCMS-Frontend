"use client";




// just add to check
export default function AnalyticsChart() {
  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-5 shadow-[1px_1px_10px_1px_#800fd1]">
      <div className="flex justify-between mb-4">
        <h3 className="text-white font-semibold">Analytics Overview</h3>
        <span className="text-xs text-gray-400">Last 7 Days</span>
      </div>

      <div className="h-40 flex items-end gap-2">
        {[40, 60, 30, 70, 55, 65, 35].map((h, i) => (
          <div
            key={i}
            className="flex-1 bg-linear-to-t from-purple-600 to-[#b070de] rounded-md"
            style={{ height: `${h}%` }}
          />
        ))}
      </div>
    </div>
  );
}