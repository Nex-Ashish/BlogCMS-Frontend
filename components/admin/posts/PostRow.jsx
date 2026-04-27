"use client";

import { Edit, MoreVertical, Trash2 } from "lucide-react";
import { useState } from "react";

export default function PostRow({ post }) {
  const [open, setOpen] = useState(false);

  return (
    <tr className="border-t border-white/10 hover:bg-white/5 transition relative">

      <td className="p-3">
        <input type="checkbox" />
      </td>

      {/* POST */}
      <td className="p-3">
        <div className="flex items-center gap-3">
          <img
            src={post.image}
            className="w-12 h-12 rounded-md object-cover"
          />
          <div>
            <p className="text-sm text-white">{post.title}</p>
            <p className="text-xs text-gray-400">ID: {post.id}</p>
          </div>
        </div>
      </td>

      {/* AUTHOR */}
      <td className="p-3">
        <div className="flex items-center gap-2">
          <img
            src={post.avatar}
            className="w-8 h-8 rounded-full"
          />
          <span className="text-sm text-gray-300">{post.author}</span>
        </div>
      </td>

      {/* CATEGORY */}
      <td className="p-3">
        <span className="text-xs bg-purple-600/20 text-purple-400 px-2 py-1 rounded-md">
          {post.category}
        </span>
      </td>

      {/* STATUS */}
      <td className="p-3">
        <span
          className={`text-xs px-2 py-1 rounded-md ${post.status === "Published"
            ? "bg-green-600/20 text-green-400"
            : "bg-yellow-600/20 text-yellow-400"
            }`}
        >
          {post.status}
        </span>
      </td>

      {/* DATE */}
      <td className="p-3 text-sm text-gray-400">{post.date}</td>

      {/* ACTIONS */}
      <td className="p-3">
        <div className="flex gap-2">

          {/* Edit */}
          <button className="p-2 bg-white/5 rounded-md hover:bg-white/10 transition">
            <Edit size={16} />
          </button>

          {/* Delete */}
          <button className="p-2 bg-red-500/10 rounded-md hover:bg-red-500/20 transition">
            <Trash2 size={16} className="text-red-400" />
          </button>

        </div>
      </td>
    </tr>
  );
}