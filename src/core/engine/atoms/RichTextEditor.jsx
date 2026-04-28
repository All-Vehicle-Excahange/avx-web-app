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

// Strip HTML tags to count plain text characters
function stripHtml(html) {
  if (!html) return "";
  return html.replace(/<[^>]*>/g, "");
}

export default function RichTextEditor({ label, value, onChange, onBlur, error, errorMsg, maxLength, minLength }) {
  const [touched, setTouched] = React.useState(false);
  const plainLen = stripHtml(value).length;

  // Max logic
  const charsLeft = maxLength ? maxLength - plainLen : null;
  const isAtMax = charsLeft !== null && charsLeft <= 0;
  const showMaxWarning = !isAtMax && charsLeft !== null && charsLeft <= 20;

  // Min logic
  const isBelowMin = minLength && plainLen > 0 && plainLen < minLength;

  // Only show validation messages after user has focused the editor
  const showMessages = touched;

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
      const html = editor.getHTML();
      const plain = stripHtml(html);
      if (maxLength && plain.length > maxLength) {
        // Delete excess characters from the end, preserving formatting
        const excess = plain.length - maxLength;
        const { doc } = editor.state;
        const end = doc.content.size - 1; // -1 to stay inside the doc
        editor.commands.deleteRange({ from: end - excess, to: end });
        onChange(editor.getHTML());
        return;
      }
      onChange(html);
    },
    onFocus: () => setTouched(true),
    onBlur: ({ editor }) => {
      if (onBlur) onBlur(editor.getHTML());
    },
  });

  if (!editor) return null;

  return (
    <div className="flex flex-col gap-1 w-full">
      <div className={`border rounded bg-primary/5 overflow-hidden shadow-sm transition
        ${error ? "border-primary/30 focus-within:border-primary/60" : "border-third/30 focus-within:border-primary"}
      `}>
        {/* Toolbar */}
        <div className="border-b border-third/30 p-1 flex gap-1">
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

      <div className="flex items-center justify-between min-h-[16px]">
        {/* Left: messages in priority order — only after focus */}
        {showMessages && (error && errorMsg) ? (
          <span className="text-[11px] text-red-500 font-medium ml-1">{errorMsg}</span>
        ) : showMessages && isAtMax ? (
          <span className="text-[11px] text-red-400 font-medium ml-1">
            Maximum character limit reached
          </span>
        ) : showMessages && isBelowMin ? (
          <span className="text-[11px] text-fourth font-medium ml-1">
            Minimum {minLength} characters required
          </span>
        ) : showMessages && showMaxWarning ? (
          <span className="text-[11px] text-yellow-400/80 font-medium ml-1">
            {charsLeft} character{charsLeft === 1 ? "" : "s"} left
          </span>
        ) : (
          <span />
        )}

        {/* Right: counter — always visible if maxLength set */}
        {maxLength && (
          <span className={`text-[11px] font-medium mr-1 ${isAtMax ? "text-red-400" : "text-third/40"}`}>
            {plainLen}/{maxLength}
          </span>
        )}
      </div>
    </div>
  );
}
