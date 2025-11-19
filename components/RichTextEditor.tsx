"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect } from "react";

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
}

export default function RichTextEditor({
  content,
  onChange,
}: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: content,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none min-h-[300px] p-4",
      },
    },
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onChange(html);
    },
  });

  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  if (!editor) {
    return null;
  }

  return (
    <div className="border border-gray-300 rounded overflow-hidden">
      {/* Toolbar */}
      <div className="bg-gray-50 border-b border-gray-300 p-2 flex flex-wrap gap-1">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`px-3 py-1 rounded hover:bg-gray-200 transition-colors ${
            editor.isActive("bold") ? "bg-gray-300" : "bg-white"
          }`}
          title="Bold"
        >
          <strong>B</strong>
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`px-3 py-1 rounded hover:bg-gray-200 transition-colors ${
            editor.isActive("italic") ? "bg-gray-300" : "bg-white"
          }`}
          title="Italic"
        >
          <em>I</em>
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={`px-3 py-1 rounded hover:bg-gray-200 transition-colors ${
            editor.isActive("strike") ? "bg-gray-300" : "bg-white"
          }`}
          title="Strikethrough"
        >
          <s>S</s>
        </button>
        <div className="w-px bg-gray-300 mx-1"></div>
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={`px-3 py-1 rounded hover:bg-gray-200 transition-colors ${
            editor.isActive("heading", { level: 2 }) ? "bg-gray-300" : "bg-white"
          }`}
          title="Heading 2"
        >
          H2
        </button>
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className={`px-3 py-1 rounded hover:bg-gray-200 transition-colors ${
            editor.isActive("heading", { level: 3 }) ? "bg-gray-300" : "bg-white"
          }`}
          title="Heading 3"
        >
          H3
        </button>
        <div className="w-px bg-gray-300 mx-1"></div>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`px-3 py-1 rounded hover:bg-gray-200 transition-colors ${
            editor.isActive("bulletList") ? "bg-gray-300" : "bg-white"
          }`}
          title="Bullet List"
        >
          • List
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`px-3 py-1 rounded hover:bg-gray-200 transition-colors ${
            editor.isActive("orderedList") ? "bg-gray-300" : "bg-white"
          }`}
          title="Numbered List"
        >
          1. List
        </button>
        <div className="w-px bg-gray-300 mx-1"></div>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`px-3 py-1 rounded hover:bg-gray-200 transition-colors ${
            editor.isActive("blockquote") ? "bg-gray-300" : "bg-white"
          }`}
          title="Blockquote"
        >
          " Quote
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          className="px-3 py-1 rounded hover:bg-gray-200 transition-colors bg-white"
          title="Horizontal Rule"
        >
          ―
        </button>
        <div className="w-px bg-gray-300 mx-1"></div>
        <button
          type="button"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          className="px-3 py-1 rounded hover:bg-gray-200 transition-colors bg-white disabled:opacity-50 disabled:cursor-not-allowed"
          title="Undo"
        >
          ↶ Undo
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          className="px-3 py-1 rounded hover:bg-gray-200 transition-colors bg-white disabled:opacity-50 disabled:cursor-not-allowed"
          title="Redo"
        >
          ↷ Redo
        </button>
      </div>

      {/* Editor */}
      <div className="bg-white">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
