"use client";

export default function RecentPosts() {
  const posts = [
    {
      title: "10 Tips for Better Productivity",
      views: "1.2K",
      comments: 24,
    },
    {
      title: "The Future of Web Development",
      views: "856",
      comments: 18,
    },
    {
      title: "Healthy Food Habits",
      views: "643",
      comments: 12,
    },
  ];

  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-5 shadow-[1px_1px_10px_1px_#800fd1]">
      <h3 className="text-white font-semibold mb-4">Recent Posts</h3>

      <div className="space-y-4">
        {posts.map((post, i) => (
          <div key={i} className="flex justify-between items-center">
            <p className="text-sm text-gray-300">{post.title}</p>

            <div className="flex gap-4 text-xs text-gray-400">
              <span>{post.views} views</span>
              <span>{post.comments} comments</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}