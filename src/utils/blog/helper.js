const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const token= typeof window !== "undefined" ? document.cookie.split(';').find(c => c.trim().startsWith('token='))?.split('=')[1] : null

export async function getBlogs(category = "") {
  const url = category ? `${BASE_URL}/api/blogs?category=${category}` : `${BASE_URL}/api/blogs`;

  // const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.message ?? "Failed to fetch blogs");
  }

  return data;
}

export async function deleteBlog(blogId) {
  // const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const res = await fetch(`${BASE_URL}/api/blogs/${blogId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.message ?? "Failed to delete blog");
  return data;
}

export async function updateBlog(blogId, blogData) {
  // const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const res = await fetch(`${BASE_URL}/api/blogs/${blogId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: JSON.stringify(blogData),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.message ?? "Failed to update blog");
  return data;
}