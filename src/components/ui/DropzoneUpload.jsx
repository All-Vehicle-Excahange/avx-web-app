"use client";
import Image from "next/image";
import { useRef, useState } from "react";

export default function DropzoneUpload({ label }) {
  const inputRef = useRef();
  const [file, setFile] = useState(null);

  const handleFile = (f) => {
    if (!f) return;
    setFile(f);
  };

  return (
    <div>
      <label className="text-sm font-semibold text-primary mb-2 block">
        {label}
      </label>

      <div
        onClick={() => inputRef.current.click()}
        className="cursor-pointer rounded-xl border-2 border-dashed border-third/40 bg-primary/5 hover:border-primary transition p-6 text-center"
      >
        {!file ? (
          <div className="space-y-2">
            <p className="text-third text-sm uppercase tracking-wide">
              Drop your image here, or browse (required)
            </p>
            <p className="text-xs text-third">Supports: JPG, PNG</p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3">
            {/* PREVIEW BOX */}
            <div className="relative w-full max-w-xs aspect-4/3">
              <Image
                src={URL.createObjectURL(file)}
                alt="Preview"
                fill
                className="rounded-lg object-contain"
                unoptimized
              />
            </div>

            <p className="text-xs text-primary">{file.name}</p>
            <p className="text-xs text-third">Click to change</p>
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
