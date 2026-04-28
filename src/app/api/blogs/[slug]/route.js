import { NextResponse } from "next/server";

const blogs = [
  {
    title: "My First Blog",
    slug: "my-first-blog",
    content: "<p>This is my first real blog content.</p>",
    coverImage: "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg",
    createdAt: new Date(),
    author: { name: "Riya" },
    category: { title: "Technology" },
    tags: ["nextjs", "blog"],
  },
  {
    title: "Gen Z Men Will Never Be Bread",
    slug: "gen-z-men-will-never",
    content: "<p>This is Gen Z blog content.</p>",
    coverImage: "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg",
    createdAt: new Date(),
    author: { name: "Riya" },
    category: { title: "Lifestyle" },
    tags: ["genz", "lifestyle"],
  },
];

export async function GET(request, { params }) {
  try {
    const { slug } = await params;

    const blog = blogs.find((item) => item.slug === slug);

    if (!blog) {
      return NextResponse.json(
        { message: "Blog not found", receivedSlug: slug },
        { status: 404 }
      );
    }

    return NextResponse.json({ blog });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch blog" },
      { status: 500 }
    );
  }
}