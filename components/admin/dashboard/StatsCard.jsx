"use client";

import { ArrowUpRight, ArrowDownRight } from "lucide-react";

export default function StatsCard({
  title,
  value,
  icon: Icon,
  growth,
  className="",
}) {
  const isPositive = growth && !growth.startsWith("-");

  return (
    <div className="bg-[#0f172a] border border-white/10 rounded-xl p-5 flex items-center justify-between 
      hover:bg-[#111827] transition-all duration-200 shadow-md">

      {/* LEFT CONTENT */}
      <div className="space-y-1">
        <p className="text-sm text-gray-400">{title}</p>

        <h3 className="text-2xl font-bold text-white">{value}</h3>

        {growth && (
          <p
            className={`text-xs flex items-center gap-1 ${
              isPositive ? "text-green-400" : "text-red-400"
            }`}
          >
            {isPositive ? (
              <ArrowUpRight size={14} />
            ) : (
              <ArrowDownRight size={14} />
            )}
            {growth} this week
          </p>
        )}
      </div>

      {/* ICON */}
      {Icon && (
        <div
          className={`p-3 rounded-xl bg-gradient-to-br ${className} shadow-[1px_1px_10px_3px_#a960e5]`}
        >
          <Icon className="w-5 h-5 text-white" />
        </div>
      )}
    </div>
  );
}