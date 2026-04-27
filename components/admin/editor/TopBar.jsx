"use client";

export default function TopBar({ onPublish }) {
  return (
    <div className="flex justify-between items-center px-6 py-4 border-b border-gray-800 bg-black">

      <h1 className="text-lg font-semibold">Create Post</h1>

      <div className="flex gap-3">

        <button className="px-4 py-2 border border-gray-600 text-gray-300 rounded-md">
          Save Draft
        </button>

        <button
          onClick={onPublish}
          className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
        >
          Publish
        </button>

      </div>
    </div>
  );
}