"use client";

import { useState, useEffect, useCallback } from "react";
import PostsTable from "./PostsTable";
import FiltersBar from "./FiltersBar";
import PostsHeader from "./PostsHeader";
import { getBlogs } from "@/utils/blog/helper";

export default function PostDashboard() {
  const [allPosts, setAllPosts]         = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading]           = useState(true);
  const [error, setError]               = useState(null);
  const [page, setPage]                 = useState(1);
  const [totalPages, setTotalPages]     = useState(1);

  const fetchPosts = useCallback(async (currentPage) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getBlogs("", currentPage);
      const blogs = data.blogs ?? [];
      setAllPosts(blogs);
      setFilteredPosts(blogs);         
      setTotalPages(data.pagination?.pages ?? 1);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPosts(page);
  }, [page, fetchPosts]);

  return (
    <div className="p-6 space-y-6">
      <PostsHeader />
      <FiltersBar
        posts={allPosts}
        onFilterChange={setFilteredPosts}
      />
      <PostsTable
        posts={filteredPosts}
        loading={loading}
        error={error}
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
        onRefresh={() => fetchPosts(page)}
      />
    </div>
  );
}