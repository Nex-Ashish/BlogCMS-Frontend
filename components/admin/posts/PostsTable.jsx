"use client";

import { useEffect, useState } from "react";
import { getBlogs, deleteBlog } from "@/utils/blog/helper";
import DeleteConfirmModal from "../../Card/DeleteConfirmModal";
import PostRow from "./PostRow";
import SuccessMessageCard from "../../Card/SuccessMessageCard";
import CreateBlogForm from "../../Card/CreateBlogForm";

export default function PostsTable() {
  const [posts, setPosts]       = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(null);
  const [page, setPage]         = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [deleteId, setDeleteId] = useState(null); 
  const [successMsg, setSuccessMsg] = useState(null);
  const [editId, setEditId]     = useState(null);
  const [deleting, setDeleting] = useState(false); 

  useEffect(() => {
    let cancelled = false;

    async function fetchPosts() {
      setLoading(true);
      setError(null);
      try {
        const data = await getBlogs("", page);
        if (!cancelled) {
          setPosts(data.blogs ?? []);
          setTotalPages(data.pagination?.pages ?? 1);
        }
      } catch (err) {
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchPosts();
    return () => { cancelled = true; };
  }, [page]);

  const handleConfirmDelete = async () => {
    setDeleting(true);
    try {
      await deleteBlog(deleteId);
      setPosts((prev) => prev.filter((p) => p._id !== deleteId));

      setSuccessMsg("Post deleted successfully!");
      setTimeout(() => setSuccessMsg(null), 3000);
    } catch (err) {
      console.error(err);
    } finally {
      setDeleting(false);
      setDeleteId(null);
    }
  };

  const handleEditSuccess = async () => {
    setEditId(null);
    setSuccessMsg("Post updated successfully!");
    setTimeout(() => setSuccessMsg(null), 3000);
    const data = await getBlogs("", page);
    setPosts(data.blogs ?? []);
    setTotalPages(data.pagination?.pages ?? 1);
  };

  return (
    <> 
      <div className="space-y-4">
        <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
          <table className="w-full text-left">
            <thead className="hidden md:table-header-group bg-white/5 text-gray-400 text-sm">
              <tr>
                <th className="p-3"></th>
                <th className="p-3">Post</th>
                <th className="p-3">Author</th>
                <th className="p-3">Category</th>
                <th className="p-3">Status</th>
                <th className="p-3">Date</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>

            <tbody>
              {loading && Array.from({ length: 3 }).map((_, i) => (
                <tr key={i} className="border-t border-white/10 animate-pulse">
                  {Array.from({ length: 7 }).map((__, j) => (
                    <td key={j} className="p-3">
                      <div className="h-4 bg-white/10 rounded w-3/4" />
                    </td>
                  ))}
                </tr>
              ))}

              {!loading && error && (
                <tr>
                  <td colSpan={7} className="p-6 text-center text-red-400">{error}</td>
                </tr>
              )}

              {!loading && !error && posts.length === 0 && (
                <tr>
                  <td colSpan={7} className="p-6 text-center text-gray-500">No posts found.</td>
                </tr>
              )}

              {!loading && !error && posts.map((post) => (
                <PostRow
                  key={post._id}
                  post={post}
                  onDelete={() => setDeleteId(post._id)}
                  onEdit={() => setEditId(post._id)} 
                />
              ))}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-end gap-2 text-sm text-gray-400">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-3 py-1 rounded-lg bg-white/10 disabled:opacity-40 hover:bg-white/20"
            >
              Prev
            </button>
            <span>Page {page} of {totalPages}</span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="px-3 py-1 rounded-lg bg-white/10 disabled:opacity-40 hover:bg-white/20"
            >
              Next
            </button>
          </div>
        )}
      </div>

      {deleteId && (
        <DeleteConfirmModal
          title="Delete Post"
          description="Are you sure you want to delete this post?"
          onConfirm={handleConfirmDelete}
          onCancel={() => setDeleteId(null)}
          loading={deleting}
        />
      )}

      {editId && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm overflow-y-auto">
          <div className="relative max-w-3xl mx-auto mt-10 mb-10 px-4">
            <button
              onClick={() => setEditId(null)}
              className="absolute top-2 right-6 text-white/40 hover:text-white text-2xl z-10"
            >
              X
            </button>
            <CreateBlogForm
              blogId={editId}
              onSuccess={handleEditSuccess}
            />
          </div>
        </div>
      )}

      {successMsg && <SuccessMessageCard message={successMsg} />}
    </>
  );
}