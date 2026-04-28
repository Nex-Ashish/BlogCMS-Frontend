"use client";

import { ChevronDown, Filter } from "lucide-react";

export default function FiltersBar() {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      
      {/* LEFT */}
      <div className="flex items-center gap-3">
        <button className="bg-white/5 border border-white/10 px-3 py-2 rounded-lg text-sm text-gray-300">
          Bulk Actions
        </button>

        <button className="bg-white/10 px-3 py-2 rounded-lg text-sm text-white">
          Apply
        </button>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-3">
        
        <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-2 rounded-lg text-sm text-gray-300">
          All Categories
          <ChevronDown size={16} />
        </div>

        <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-2 rounded-lg text-sm text-gray-300">
          All Authors
          <ChevronDown size={16} />
        </div>

        {/* <button className="flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-2 rounded-lg text-sm text-gray-300">
          <Filter size={16} />
          Filter
        </button> */}
      </div>
    </div>
  );
}