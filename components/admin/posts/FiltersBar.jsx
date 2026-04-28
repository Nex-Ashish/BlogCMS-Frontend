"use client";

import { ChevronDown } from "lucide-react";
import { useMemo, useState } from "react";

export default function FiltersBar({ posts, onFilterChange }) {
  const [activeCategoryId, setActiveCategoryId] = useState("");
  const [activeAuthorId, setActiveAuthorId]     = useState("");

  const categories = useMemo(() => {
    const seen = new Set();
    return posts
      .map((p) => p?.category)
      .filter((c) => c && !seen.has(c._id) && seen.add(c._id));
  }, [posts]);

  const authors = useMemo(() => {
    const seen = new Set();
    return posts
      .map((p) => p?.author)
      .filter((a) => a && !seen.has(a._id) && seen.add(a._id));
  }, [posts]);

  const applyFilters = (categoryId, authorId) => {
    let result = posts;
    if (categoryId) result = result.filter((p) => p?.category?._id === categoryId);
    if (authorId)   result = result.filter((p) => p?.author?._id   === authorId);
    onFilterChange(result);
  };

  const handleCategory = (e) => {
    const val = e.target.value;
    setActiveCategoryId(val);
    applyFilters(val, activeAuthorId);
  };

  const handleAuthor = (e) => {
    const val = e.target.value;
    setActiveAuthorId(val);
    applyFilters(activeCategoryId, val);
  };

  return (
    <div className="flex flex-wrap items-center justify-end gap-4">

      <div className="relative flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-2 rounded-lg text-sm text-gray-300 focus-within:border-purple-500/50 focus-within:bg-purple-500/5 transition-colors">
        <select
          value={activeCategoryId}
          onChange={handleCategory}
          className="bg-transparent appearance-none outline-none pr-5 cursor-pointer text-gray-300 [&>option]:bg-[#1a1a2e] [&>option]:text-gray-200"
        >
          <option value="">All Categories</option>
          {categories.map((c) => (
            <option key={c._id} value={c._id}>{c.title}</option>
          ))}
        </select>
        <ChevronDown
          size={16}
          className={`pointer-events-none absolute right-3 transition-colors ${activeCategoryId ? "text-purple-400" : "text-gray-500"}`}
        />
        {activeCategoryId && (
          <span className="absolute -top-1.5 -right-1.5 w-2 h-2 rounded-full bg-purple-500" />
        )}
      </div>

      <div className="relative flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-2 rounded-lg text-sm text-gray-300 focus-within:border-indigo-500/50 focus-within:bg-indigo-500/5 transition-colors">
        <select
          value={activeAuthorId}
          onChange={handleAuthor}
          className="bg-transparent appearance-none outline-none pr-5 cursor-pointer text-gray-300 [&>option]:bg-[#1a1a2e] [&>option]:text-gray-200"
        >
          <option value="">All Authors</option>
          {authors.map((a) => (
            <option key={a._id} value={a._id}>{a.name}</option>
          ))}
        </select>
        <ChevronDown
          size={16}
          className={`pointer-events-none absolute right-3 transition-colors ${activeAuthorId ? "text-indigo-400" : "text-gray-500"}`}
        />
        {activeAuthorId && (
          <span className="absolute -top-1.5 -right-1.5 w-2 h-2 rounded-full bg-indigo-500" />
        )}
      </div>

      {(activeCategoryId || activeAuthorId) && (
        <button
          onClick={() => {
            setActiveCategoryId("");
            setActiveAuthorId("");
            onFilterChange(posts);
          }}
          className="text-xs text-gray-500 hover:text-red-400 transition-colors px-2 py-1 rounded-md hover:bg-red-500/10"
        >
          Clear filters
        </button>
      )}

    </div>
  );
}