"use client";

import PostRow from "./PostRow";

export default function PostsTable() {

  const posts = [
    {
      id: 125,
      title: "10 Tips for Better Productivity",
      author: "Riya Sharma",
      category: "Productivity",
      status: "Published",
      date: "Apr 23, 2026",
      views: "1.2K",
      image: "https://source.unsplash.com/100x100/?mountain",
      avatar: "https://i.pravatar.cc/40?img=1",
    },
    {
      id: 124,
      title: "Future of Web Development",
      author: "John Doe",
      category: "Technology",
      status: "Published",
      date: "Apr 22, 2026",
      views: "856",
      image: "https://source.unsplash.com/100x100/?laptop",
      avatar: "https://i.pravatar.cc/40?img=2",
    },
    {
      id: 123,
      title: "Healthy Food Habits",
      author: "Sarah Wilson",
      category: "Lifestyle",
      status: "Draft",
      date: "Apr 21, 2026",
      views: "—",
      image: "https://source.unsplash.com/100x100/?food",
      avatar: "https://i.pravatar.cc/40?img=3",
    },
  ];

  return (
    <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
      
      <table className="w-full text-left">
        
        <thead className="bg-white/5 text-gray-400 text-sm">
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
          {posts.map((post) => (
            <PostRow key={post.id} post={post} />
          ))}
        </tbody>

      </table>
    </div>
  );
}