"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

const Editor = dynamic(
  () => import("@/components/admin/editor/Editor"),
  { ssr: false }
);

export default function CreatePostPage() {
  const [content, setContent] = useState("");

  return (
    <div className=" bg-black text-white">

      <div className="max-w-3xl w-full p-6 contents">
        <Editor content={content} setContent={setContent} />
      </div>

    </div>
  );
}