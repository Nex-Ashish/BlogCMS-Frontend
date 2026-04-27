"use client";

export default function RecentComments() {
  const comments = [
    { name: "John", text: "Great article!" },
    { name: "Sarah", text: "Very helpful" },
    { name: "Mike", text: "I have a question" },
  ];

  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-5 shadow-[1px_1px_10px_1px_#800fd1]">
      <h3 className="text-white font-semibold mb-4">Recent Comments</h3>

      <div className="space-y-3">
        {comments.map((c, i) => (
          <div key={i}>
            <p className="text-sm text-white">{c.name}</p>
            <p className="text-xs text-gray-400">{c.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}