"use client";

import { Edit, Trash2 } from "lucide-react";

export default function PostRow({ post, onDelete, onEdit }) {
  const statusLabel = post?.isPublic ? "Published" : "Draft";

  const statusClass =
    statusLabel === "Published"
      ? "bg-green-600/20 text-green-400"
      : "bg-yellow-600/20 text-yellow-400";

  const avatar = post?.coverImage ? (
    <img
      src={post?.coverImage}
      alt={post?.title}
      className="w-12 h-12 rounded-md object-cover flex-shrink-0"
    />
  ) : (
    <div className="w-12 h-12 rounded-md bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-white/10 flex items-center justify-center flex-shrink-0">
      <span className="text-sm font-semibold text-indigo-300">
        {post?.author?.name?.charAt(0).toUpperCase()}
      </span>
    </div>
  );

  const authorAvatar = (
    <div className="w-7 h-7 rounded-full bg-indigo-600/30 flex items-center justify-center text-xs text-indigo-300 font-medium flex-shrink-0">
      {post?.author?.name?.charAt(0).toUpperCase()}
    </div>
  );

  return (
    <>
      {/* ── MOBILE CARD (hidden on md+) ── */}
      <tr className="md:hidden border-t border-white/10">
        <td colSpan={7} className="p-3">
          <div className="flex gap-3">
            {avatar}

            <div className="flex-1 min-w-0">
              {/* Title + status */}
              <div className="flex items-start justify-between gap-2">
                <p className="text-sm text-white font-medium truncate">{post?.title}</p>
                <span className={`text-xs px-2 py-0.5 rounded-md whitespace-nowrap flex-shrink-0 ${statusClass}`}>
                  {statusLabel}
                </span>
              </div>

              {/* Author */}
              <div className="flex items-center gap-1.5 mt-1.5">
                {authorAvatar}
                <span className="text-xs text-gray-400">{post?.author?.name}</span>
              </div>

              {/* Category + Date + Actions */}
              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs bg-purple-600/20 text-purple-400 px-2 py-0.5 rounded-md">
                    {post?.category?.title}
                  </span>
                  <span className="text-xs text-gray-500">
                    {new Date(post?.createdAt).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </div>

                <div className="flex gap-1.5">
                  <button onClick={onEdit} className="p-1.5 bg-white/5 rounded-md hover:bg-white/10 transition">
                    <Edit size={14} />
                  </button>
                  <button onClick={onDelete} className="p-1.5 bg-red-500/10 rounded-md hover:bg-red-500/20 transition">
                    <Trash2 size={14} className="text-red-400" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </td>
      </tr>

      {/* ── DESKTOP ROW (hidden below md) ── */}
      <tr className="hidden md:table-row border-t border-white/10 hover:bg-white/5 transition">
        <td className="p-3">
          <input type="checkbox" />
        </td>

        <td className="p-3">
          <div className="flex items-center gap-3">
            {avatar}
            <div>
              <p className="text-sm text-white font-medium">{post?.title}</p>
              <p className="text-xs text-gray-400">ID: {post?._id}</p>
            </div>
          </div>
        </td>

        <td className="p-3">
          <div className="flex items-center gap-2">
            {authorAvatar}
            <span className="text-sm text-gray-300">{post?.author?.name}</span>
          </div>
        </td>

        <td className="p-3">
          <span className="text-xs bg-purple-600/20 text-purple-400 px-2 py-1 rounded-md">
            {post?.category?.title}
          </span>
        </td>

        <td className="p-3">
          <span className={`text-xs px-2 py-1 rounded-md ${statusClass}`}>
            {statusLabel}
          </span>
        </td>

        <td className="p-3 text-sm text-gray-400">
          {new Date(post?.createdAt).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}
        </td>

        <td className="p-3">
          <div className="flex gap-2">
            <button onClick={onEdit} className="p-2 bg-white/5 rounded-md hover:bg-white/10 transition">
              <Edit size={16} />
            </button>
            <button onClick={onDelete} className="p-2 bg-red-500/10 rounded-md hover:bg-red-500/20 transition">
              <Trash2 size={16} className="text-red-400" />
            </button>
          </div>
        </td>
      </tr>
    </>
  );
}