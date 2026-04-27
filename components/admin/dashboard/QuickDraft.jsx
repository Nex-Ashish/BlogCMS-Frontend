"use client";

export default function QuickDraft() {
  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-5 space-y-3 shadow-[1px_1px_10px_1px_#800fd1]">
      <h3 className="text-white font-semibold">Quick Draft</h3>

      <input
        type="text"
        placeholder="Post title..."
        className="w-full bg-white/10 border border-white/10 rounded-lg p-2 text-sm text-white outline-none"
      />

      <textarea
        placeholder="Write something..."
        className="w-full bg-white/10 border border-white/10 rounded-lg p-2 text-sm text-white outline-none h-20"
      />

      <button className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg text-sm text-white">
        Save Draft
      </button>
    </div>
  );
}