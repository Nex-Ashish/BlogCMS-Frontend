"use client";

import { useEffect, useState } from "react";
import { getBlogs } from "@/utils/blog/helper";

function processData(blogs) {
  const map = {};

  blogs.forEach(({ category }) => {
    const name = category?.title || "Unknown";
    map[name] = (map[name] || 0) + 1;
  });

  return Object.entries(map)
    .map(([name, posts]) => ({ name, posts }))
    .sort((a, b) => b.posts - a.posts) 
    .slice(0, 4); 
}

export default function TopCategories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const first = await getBlogs("", 1);
        const totalPages = first?.pagination?.pages || 1;

        const promises = Array.from({ length: totalPages }, (_, i) =>
          getBlogs("", i + 1)
        );

        const results = await Promise.all(promises);
        const allBlogs = results.flatMap((r) => r?.blogs || []);

        setCategories(processData(allBlogs));
      } catch (err) {
        console.error(err);
      }
    }

    fetchData();
  }, []);

  const maxPosts = Math.max(...categories.map((c) => c.posts), 1);

  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-5 shadow-[1px_1px_10px_1px_#800fd1]">
      <h3 className="text-white font-semibold mb-4">Top Categories</h3>

      <div className="space-y-3">
        {categories.map((cat, i) => (
          <div key={i}>
            <div className="flex justify-between text-sm text-gray-300">
              <span>{cat.name}</span>
              <span>{cat.posts}</span>
            </div>

            <div className="w-full bg-white/10 h-2 rounded mt-1">
              <div
                className="bg-purple-500 h-2 rounded"
                style={{
                  width: `${(cat.posts / maxPosts) * 100}%`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}