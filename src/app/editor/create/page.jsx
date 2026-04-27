"use client";

import dynamic from "next/dynamic";
import TopBar from "@/components/admin/editor/TopBar";

const Editor = dynamic(() => import("@/components/admin/editor/Editor"), {
  ssr: false,
});
export default function CreatePost() {
  return (
    <div className="h-screen flex flex-col bg-black text-white">

      <TopBar />

      <div className="flex-1 overflow-hidden">
        <Editor />
      </div>

    </div>
  );
}