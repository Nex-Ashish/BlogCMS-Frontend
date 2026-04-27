import { useState } from "react";

export default function ImageUpload({ editor }) {
  const [preview, setPreview] = useState(null);

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    setPreview(url);

    editor.chain().focus().setImage({ src: url }).run();
  };

  return (
    <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-600 p-6 rounded-lg text-center">

      <input type="file" onChange={handleUpload} className="hidden" id="upload" />

      <label htmlFor="upload" className="cursor-pointer text-gray-400">
        Click to upload <br />
        <span className="text-xs">or drag & drop</span>
      </label>

      {preview && (
        <img src={preview} className="mt-4 rounded-md" />
      )}
    </div>
  );
}