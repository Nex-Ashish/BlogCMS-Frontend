"use client";

export default function TitleInput({ title, setTitle }) {
  return (
    <input
      type="text"
      placeholder="Untitled"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      className="w-full text-4xl font-bold bg-transparent outline-none"
    />
  );
}