/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import Image from "next/image";
import { useRef, useState, useMemo, useEffect } from "react";
import { UploadCloud, CheckCircle2, Trash2 } from "lucide-react";

export default function DropzoneUpload({ label, onChange, preview }) {
  const inputRef = useRef();
  const [localFile, setLocalFile] = useState(null);

  useEffect(() => {
    if (preview === null || preview === undefined) {
      setLocalFile(null);
    }
  }, [preview]);

  // ✅ Derived State: Use local selection if it exists, otherwise use parent preview
  const currentFile = localFile || preview;

  // ✅ Memoize the display URL to prevent unnecessary re-creations
  const displayUrl = useMemo(() => {
    if (!currentFile) return null;
    if (typeof currentFile === "string") return currentFile;
    return URL.createObjectURL(currentFile);
  }, [currentFile]);

  const handleFile = (f) => {
    if (!f) return;
    setLocalFile(f);
    if (onChange) {
      onChange(f);
    }
  };

  return (
    <div>
      <label className="text-sm font-semibold text-primary mb-2 block">
        {label}
      </label>

      <div
        onClick={() => inputRef.current.click()}
        className="cursor-pointer rounded-xl border-2 border-dashed border-third/40 bg-primary/5 hover:border-primary transition p-6 text-center w-full relative"
      >
        {!currentFile ? (
          <div className="flex flex-col items-center justify-center space-y-3 py-4">
            <UploadCloud className="w-10 h-10 text-primary/40" />
            <p className="text-third text-sm tracking-wide">
              Drop your image here, or click to browse
            </p>
            <p className="text-xs text-third/70">Supports: JPG, PNG, PDF</p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4 w-full relative ">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setLocalFile(null);
                if (onChange) onChange(null);
                if (inputRef.current) inputRef.current.value = "";
              }}
              className="cursor-pointer absolute -top-4 -right-4 p-2 bg-red-500/40 hover:bg-red-600 text-white rounded-full transition-colors z-10 shadow-md"
              title="Clear"
            >
              <Trash2 size={16} />
            </button>

            <div className="relative w-full max-w-sm h-48 rounded-lg overflow-hidden bg-black/5 shadow-inner">
              <Image
                src={displayUrl}
                alt="preview"
                fill
                className="object-contain p-2"
                unoptimized
              />
            </div>

            <div className="flex flex-col items-center justify-center gap-1">
              <div className="flex items-center justify-center gap-2 text-primary">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <p className="text-sm font-medium truncate max-w-[250px]">
                  {typeof currentFile === "string"
                    ? "Existing document loaded"
                    : currentFile.name}
                </p>
              </div>
              <p className="text-xs text-third/80">
                Click anywhere here to change
              </p>
            </div>
          </div>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={(e) => handleFile(e.target.files[0])}
      />
    </div>
  );
}
