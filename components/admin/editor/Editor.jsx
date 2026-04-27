"use client";

import { useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Underline from "@tiptap/extension-underline";

import Toolbar from "./Toolbar";
import ImageUpload from "./ImageUpload";
import TitleInput from "./TitleInput";
import TopBar from "./TopBar";

export default function Editor() {

  // 🔥 STATE (connects to schema)
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const [coverImage, setCoverImage] = useState("");

  const editor = useEditor({
    extensions: [StarterKit, Underline, Image],
    content: "<p>Start writing...</p>",
    immediatelyRender: false,
  });

  if (!editor) return null;

  const handleSubmit = () => {
  const content = editor.getHTML();

  const slug = title
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, ""); // cleaner slug

  const payload = {
    title,
    slug, // ✅ add here
    content,
    coverImage,
    category,
    tags: tags.split(",").map(t => t.trim()),
    isPublic,
  };

  console.log("POST DATA:", payload);
};

  return (
    <div className="flex flex-col h-full">

      <TopBar onPublish={handleSubmit} />

      <div className="flex flex-1">

        {/* LEFT PANEL */}
        <div className="w-72 border-r border-gray-800 p-4 flex flex-col gap-6">

          <div className="bg-[#311950] p-4 rounded-xl border border-gray-700">
            <p className="text-xs text-gray-400 mb-3">TEXT</p>
            <Toolbar editor={editor} />
          </div>

          <div className="bg-[#311950] p-4 rounded-xl border border-gray-700">
            <p className="text-xs text-gray-400 mb-3">IMAGE</p>
            <ImageUpload editor={editor} />
          </div>

        </div>

        {/* RIGHT PANEL */}
        <div className="flex-1 p-10 bg-black overflow-y-auto">

          <TitleInput title={title} setTitle={setTitle} />

          {/* COVER IMAGE */}
          <input
            placeholder="Cover Image URL"
            value={coverImage}
            onChange={(e) => setCoverImage(e.target.value)}
            className="w-full p-2 mt-4 bg-[#311950] border border-gray-700 rounded-lg"
          />

          {/* CATEGORY */}
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-2 mt-4 bg-[#311950] border border-gray-700 rounded-lg"
          >
            <option value="">Select Category</option>
            <option value="tech">Technology</option>
            <option value="life">Lifestyle</option>
          </select>

          {/* TAGS */}
          <input
            placeholder="Tags (comma separated)"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="w-full p-2 mt-4 bg-[#311950] border border-gray-700 rounded-lg"
          />

          {/* PUBLIC TOGGLE */}
          <label className="flex items-center gap-2 mt-4">
            <input
              type="checkbox"
              checked={isPublic}
              onChange={() => setIsPublic(!isPublic)}
            />
            <span className="text-gray-300 text-sm">Public</span>
          </label>

          {/* EDITOR */}
          <div className="bg-[#311950] p-6 rounded-xl border border-gray-700 mt-6 min-h-[300px]">
            <EditorContent editor={editor} />
          </div>

        </div>

      </div>
    </div>
  );
}