import React, { useState } from "react";
import Image from "next/image";
import { X, Upload, ImageIcon } from "lucide-react";

const demoImages = ["/demo/1.jpg", "/demo/2.jpg", "/demo/3.jpg", "/demo/4.jpg"];

export default function MediaPickerModal({ open, onClose, onSelect }) {
  const [tab, setTab] = useState("library");
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* BLUR */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-md"
        onClick={onClose}
      />

      {/* MODAL */}
      <div className="relative w-full max-w-6xl bg-secondary rounded-3xl border border-primary p-10 z-10">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-third hover:text-primary"
        >
          <X />
        </button>

        {/* TABS */}
        <div className="flex gap-6 mb-8 border-b border-third/20 pb-3">
          {["library", "upload"].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`uppercase text-sm font-bold tracking-widest pb-2 border-b-2 transition ${
                tab === t
                  ? "border-primary text-primary"
                  : "border-transparent text-third hover:text-primary"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* TAB CONTENT */}
        {tab === "library" && (
          <div className="grid grid-cols-4 gap-6">
            {demoImages.map((img, i) => (
              <div
                key={i}
                onClick={() => onSelect(img)}
                className="relative h-44 rounded-2xl overflow-hidden border border-third/30 hover:border-primary cursor-pointer group"
              >
                <Image
                  src={img}
                  alt="Media"
                  fill
                  className="object-cover group-hover:scale-105 transition"
                />
              </div>
            ))}
          </div>
        )}

        {tab === "upload" && (
          <label className="relative block border-2 border-dashed border-primary rounded-3xl p-20 text-center cursor-pointer hover:bg-primary/10 transition">
            <div className="flex flex-col items-center justify-center gap-4 text-primary">
              <div className="w-16 h-16 bg-primary text-secondary rounded-2xl flex items-center justify-center">
                <ImageIcon className="w-8 h-8" />
              </div>

              <h3 className="text-xl font-bold">Drag & Drop Image</h3>
              <p className="text-third text-sm">
                or click to select from device
              </p>
            </div>

            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) onSelect(URL.createObjectURL(file));
              }}
            />
          </label>
        )}
      </div>
    </div>
  );
}
