"use client";

import { Plus } from "lucide-react";

export default function PostsHeader() {
  return (
    <div className="space-y-4">
      
      {/* TOP ROW */}
      <div className="flex items-center justify-between">

        <div className="flex items-center gap-6 text-sm border-b border-white/10 pb-3">
        
        <button className="text-purple-400 border-b-2 border-purple-500 pb-2">
          All Posts <span className="ml-1 text-xs bg-purple-600/20 px-2 py-0.5 rounded-full">128</span>
        </button>

        <button className="text-gray-400 hover:text-white">
          Published <span className="ml-1 text-xs bg-green-600/20 px-2 py-0.5 rounded-full">102</span>
        </button>

        <button className="text-gray-400 hover:text-white">
          Drafts <span className="ml-1 text-xs bg-yellow-600/20 px-2 py-0.5 rounded-full">18</span>
        </button>

        <button className="text-gray-400 hover:text-white">
          Trash <span className="ml-1 text-xs bg-red-600/20 px-2 py-0.5 rounded-full">8</span>
        </button>

      </div>
        <button className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg text-white text-sm">
          <Plus size={16} />
          Add New Post
        </button>
      </div>

    </div>
  );
}