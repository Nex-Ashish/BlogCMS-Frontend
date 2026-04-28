"use client";

import { Loader2, Trash2 } from "lucide-react";

export default function DeleteConfirmModal({ onConfirm, onCancel, title = "Delete Item", description = "Are you sure you want to delete this? This action cannot be undone.", loading = false }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-[#1a1a2e] border border-white/10 rounded-2xl p-6 w-[320px] flex flex-col items-center text-center shadow-xl">
        <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center mb-4">
          <Trash2 size={20} className="text-red-400" />
        </div>
        <h3 className="text-white font-semibold text-base mb-1">{title}</h3>
        <p className="text-gray-400 text-sm mb-6">{description}</p>
        <div className="flex gap-3 w-full">
          <button
            onClick={onCancel}
            disabled={loading}
            className="flex-1 py-2 rounded-full border border-white/10 text-gray-400 text-sm hover:bg-white/5 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="flex-1 py-2 rounded-full bg-red-500 text-white text-sm hover:bg-red-600 transition-colors"
          >
            {loading ? 
              (
                <span className="flex items-center justify-center gap-1">
                  <Loader2 size={14} className="animate-spin" />
                  Deleting...
                </span>
              ) : (
                "Delete"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}