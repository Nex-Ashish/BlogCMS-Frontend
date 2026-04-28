import Image from "next/image";

async function getSingleBlog(slug) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/blogs`, {
      cache: "no-store",
    });

    const data = await res.json();

    console.log("API DATA:", data);

    const blogs = data.blogs || data?.data || [];

    const blog = blogs.find((item) => {
      const generatedSlug = item.title
        ?.toLowerCase()
        .trim()
        .replace(/\s+/g, "-")
        .replace(/[^\w-]+/g, "");

      return item.slug === slug || generatedSlug === slug;
    });

    return blog ? { blog } : null;
  } catch (error) {
    console.log("Single blog error:", error);
    return null;
  }
}

export default async function BlogPage({ params }) {
  const { slug } = await params;
  const data = await getSingleBlog(slug);

  const blog = data?.blog || data;

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center text-black text-xl">
        Blog not found
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-white py-10 px-6">
      <div className="max-w-4xl mx-auto">

        {/* Cover Image */}
        {blog.coverImage && (
          <div className="mb-8 overflow-hidden rounded-2xl">
            <Image
              src={blog.coverImage}
              alt={blog.title}
              width={1200}
              height={700}
              className="w-full h-100 object-cover rounded-2xl"
            />
          </div>
        )}

        {/* Category */}
        <p className="text-sm font-medium text-purple-600 mb-2">
          {blog.category?.title || "General"}
        </p>

        {/* Title */}
        <h1 className="text-4xl font-bold text-black mb-4 leading-tight">
          {blog.title}
        </h1>

        {/* Author + Date */}
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-8">
          <p>By {blog.author?.name || "Unknown Author"}</p>
          <span>•</span>
          <p>
            {new Date(blog.createdAt).toLocaleDateString()}
          </p>
        </div>

        {/* Content */}
        <div
          className="prose prose-lg max-w-none text-gray-800"
          dangerouslySetInnerHTML={{
            __html: blog.content,
          }}
        />

        {/* Tags */}
        {blog.tags?.length > 0 && (
          <div className="mt-10 flex flex-wrap gap-2">
            {blog.tags.map((tag, index) => (
              <span
                key={index}
                className="px-4 py-1 rounded-full bg-purple-100 text-purple-700 text-sm"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}