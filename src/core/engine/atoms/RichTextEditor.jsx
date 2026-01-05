"use client";
import React from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";

const ToolbarBtn = ({ onClick, isActive, label }) => (
  <button
    type="button"
    onClick={onClick}
    className={`w-7 h-7 flex items-center justify-center rounded text-xs font-bold transition
      ${
        isActive
          ? "bg-primary text-secondary"
          : "text-third hover:bg-primary/20"
      }
    `}
  >
    {label}
  </button>
);

export default function RichTextEditor({ label, value, onChange }) {
  const editor = useEditor({
    extensions: [StarterKit, Underline],
    immediatelyRender: false,
    content: value,
    editorProps: {
      attributes: {
        class:
          "prose prose-sm focus:outline-none min-h-[120px] p-3 text-primary leading-relaxed",
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!editor) return null;

  return (
    <div className="flex flex-col gap-1 w-full">
      {label && (
        <label className="text-xs font-bold uppercase text-third">
          {label}
        </label>
      )}

      <div className="border border-third/30 rounded bg-secondary overflow-hidden shadow-sm focus-within:border-primary transition">
        {/* Toolbar */}
        <div className="border-b border-third/30 p-1 flex gap-1 bg-secondary">
          <ToolbarBtn
            label="B"
            onClick={() => editor.chain().focus().toggleBold().run()}
            isActive={editor.isActive("bold")}
          />
          <ToolbarBtn
            label="I"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            isActive={editor.isActive("italic")}
          />
          <ToolbarBtn
            label="U"
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            isActive={editor.isActive("underline")}
          />
          <div className="w-px bg-third/40 mx-1 h-5 self-center"></div>
          <ToolbarBtn
            label="≡"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            isActive={editor.isActive("bulletList")}
          />
        </div>

        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
