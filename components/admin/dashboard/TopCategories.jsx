"use client";

export default function TopCategories() {
  const categories = [
    { name: "Technology", posts: 45 },
    { name: "Lifestyle", posts: 32 },
    { name: "Productivity", posts: 28 },
    { name: "Travel", posts: 23 },
  ];

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
                style={{ width: `${cat.posts}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}