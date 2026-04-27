export default function Toolbar({ editor }) {
  if (!editor) return null;

  const btn =
    "w-full text-left px-3 py-2 rounded-lg hover:bg-gray-700 text-sm flex items-center gap-2";

  return (
    <div className="flex flex-col gap-4">

      <div>

        <button className={btn} onClick={() => editor.chain().focus().toggleBold().run()}>
          <b>B</b> Bold
        </button>

        <button className={btn} onClick={() => editor.chain().focus().toggleItalic().run()}>
          <i>I</i> Italic
        </button>

        <button className={btn} onClick={() => editor.chain().focus().toggleUnderline().run()}>
          <u>U</u> Underline
        </button>

        <button className={btn} onClick={() => editor.chain().focus().toggleStrike().run()}>
          <s>S</s> Strike
        </button>
      </div>

      <div>
        <p className="text-xs text-gray-400 mb-2">HEADINGS</p>

        <button className={btn} onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}>
          H1 Heading
        </button>

        <button className={btn} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>
          H2 Heading
        </button>
      </div>

      {/* <div>
        <p className="text-xs text-gray-400 mb-2">LISTS</p>

        <button className={btn} onClick={() => editor.chain().focus().toggleBulletList().run()}>
          • Bullet List
        </button>

        <button className={btn} onClick={() => editor.chain().focus().toggleOrderedList().run()}>
          1. Numbered List
        </button>
      </div> */}

      {/* <div>
        <p className="text-xs text-gray-400 mb-2">BLOCK</p>

        <button className={btn} onClick={() => editor.chain().focus().toggleBlockquote().run()}>
          ❝ Quote
        </button>

        <button className={btn} onClick={() => editor.chain().focus().toggleCodeBlock().run()}>
          {"</>"} Code Block
        </button>
      </div> */}

      <div>
        <p className="text-xs text-gray-400 mb-2">HISTORY</p>

        <button className={btn} onClick={() => editor.chain().focus().undo().run()}>
          ↺ Undo
        </button>

        <button className={btn} onClick={() => editor.chain().focus().redo().run()}>
          ↻ Redo
        </button>
      </div>

    </div>
  );
}